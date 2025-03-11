# Provider configuration
provider "aws" {
  region = var.aws_region
}

# Networking module - must be created first
module "networking" {
  source          = "./modules/networking"
  project_name    = var.project_name
  vpc_cidr        = var.vpc_cidr
  public_subnets  = var.public_subnets
  private_subnets = var.private_subnets
  azs             = var.azs
  tags            = var.tags
}

# Create DB subnet group for database module
resource "aws_db_subnet_group" "main" {
  name       = "${var.project_name}-db-subnet-group"
  subnet_ids = module.networking.private_subnet_ids
  tags       = merge(var.tags, { Name = "${var.project_name}-db-subnet-group" })
}

# Database module
module "database" {
  source                = "./modules/database"
  project_name          = var.project_name
  db_allocated_storage  = var.db_allocated_storage
  db_engine_version     = var.db_engine_version
  db_instance_class     = var.db_instance_class
  db_username           = var.db_username
  db_password           = var.db_password
  db_name               = var.db_name
  db_security_group_id  = module.networking.db_security_group_id
  db_subnet_group_name  = aws_db_subnet_group.main.name

  # Pass only the parameters defined in the database module
  multi_az                    = var.db_multi_az
  backup_retention_period     = var.db_backup_retention_period
  skip_final_snapshot         = var.db_skip_final_snapshot
  storage_encrypted           = var.db_storage_encrypted

  tags                        = var.tags
  depends_on                  = [module.networking]
}

# Backend module
module "backend" {
  source            = "./modules/backend"
  project_name      = var.project_name
  aws_region        = var.aws_region
  backend_cpu       = var.backend_cpu
  backend_memory    = var.backend_memory
  backend_image     = var.backend_image
  database_url      = "postgres://${var.db_username}:${var.db_password}@${module.database.db_instance_endpoint}/${var.db_name}"
  vpc_id            = module.networking.vpc_id
  private_subnet_ids = module.networking.private_subnet_ids
  public_subnet_ids = module.networking.public_subnet_ids
  client_url        = var.client_url
  tags              = var.tags

  depends_on = [module.database]
}

# Frontend module - defined after backend to resolve circular dependency
module "frontend" {
  source                  = "./modules/frontend"
  project_name            = var.project_name
  domain_name             = var.frontend_domain_name
  hosting_type            = var.frontend_hosting_type
  cloudfront_price_class  = var.frontend_cloudfront_price_class
  enable_waf              = var.frontend_enable_waf
  api_endpoint            = module.backend.backend_url
  tags                    = var.tags
}