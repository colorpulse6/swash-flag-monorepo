resource "aws_db_instance" "database" {
  identifier             = "${var.project_name}-db"
  allocated_storage      = var.db_allocated_storage
  engine                 = "postgres"
  engine_version         = var.db_engine_version
  instance_class         = var.db_instance_class
  username               = var.db_username
  password               = var.db_password
  db_name                = var.db_name
  parameter_group_name   = "default.postgres14"
  skip_final_snapshot    = true
  vpc_security_group_ids = [var.db_security_group_id]
  db_subnet_group_name   = var.db_subnet_group_name

  tags = var.tags
}