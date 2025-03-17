# This main.tf file is intentionally minimal as we are using existing AWS resources
# Its primary purpose is to define data sources for our existing infrastructure

# Reference existing VPC
data "aws_vpc" "main" {
  id = var.vpc_id
}

# Reference existing subnets
data "aws_subnet" "selected" {
  count = length(var.subnet_ids)
  id    = var.subnet_ids[count.index]
}

# Reference existing security groups
data "aws_security_group" "database" {
  id = var.db_security_group_id
}

data "aws_security_group" "backend" {
  id = var.backend_security_group_id
}

# Locals for resource naming and tagging
locals {
  common_tags = {
    Project     = var.project_name
    Environment = "production"
    ManagedBy   = "Terraform"
    Owner       = "DevOps"
  }
}
