# terraform/environments/dev/variables.tf
variable "project_name" { type = string }
variable "aws_region" { type = string }
variable "vpc_cidr" { type = string }
variable "public_subnets" { type = list(string) }
variable "private_subnets" { type = list(string) }
variable "azs" { type = list(string) }
variable "db_allocated_storage" { type = number }
variable "db_engine_version" { type = string }
variable "db_instance_class" { type = string }
variable "db_name" { type = string }
variable "backend_cpu" { type = number }
variable "backend_memory" { type = number }
variable "backend_image" { type = string }
variable "db_multi_az" { type = bool }
variable "db_backup_retention_period" { type = number }
variable "db_skip_final_snapshot" { type = bool }
variable "db_maintenance_window" { type = string }
variable "db_parameter_group_family" { type = string }
variable "db_storage_encrypted" { type = bool }
variable "frontend_domain_name" { type = string }
variable "frontend_hosting_type" { type = string }
variable "tags" { type = map(string) }

# Required sensitive variables
variable "db_username" {
  description = "Username for database access"
  type        = string
  sensitive   = true
}

variable "db_password" {
  description = "Password for database access"
  type        = string
  sensitive   = true
}

# Frontend CloudFront configuration
variable "frontend_cloudfront_price_class" {
  description = "CloudFront distribution price class"
  type        = string
  default     = "PriceClass_100"
}

variable "frontend_enable_waf" {
  description = "Whether to enable WAF for the frontend"
  type        = bool
  default     = false
}

# Additional database configuration in your prod tfvars
variable "db_final_snapshot_identifier" {
  description = "The name of the final snapshot when this DB instance is deleted"
  type        = string
  default     = null
}

variable "db_monitoring_interval" {
  description = "The interval, in seconds, between points when Enhanced Monitoring metrics are collected"
  type        = number
  default     = 0
}

variable "db_performance_insights_enabled" {
  description = "Specifies whether Performance Insights are enabled"
  type        = bool
  default     = false
}

variable "db_deletion_protection" {
  description = "If the DB instance should have deletion protection enabled"
  type        = bool
  default     = false
}