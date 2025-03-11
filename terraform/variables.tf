variable "project_name" {
  description = "Name of the project"
  type        = string
  default     = "swashflag"
}

variable "aws_region" {
  description = "AWS region to deploy to"
  type        = string
  default     = "us-west-2"
}

# Networking variables
variable "vpc_cidr" {
  description = "CIDR block for the VPC"
  type        = string
  default     = "10.0.0.0/16"
}

variable "public_subnets" {
  description = "List of public subnet CIDR blocks"
  type        = list(string)
  default     = ["10.0.1.0/24", "10.0.2.0/24"]
}

variable "private_subnets" {
  description = "List of private subnet CIDR blocks"
  type        = list(string)
  default     = ["10.0.10.0/24", "10.0.11.0/24"]
}

variable "azs" {
  description = "List of availability zones"
  type        = list(string)
  default     = ["us-west-2a", "us-west-2b"]
}

# Database variables
variable "db_allocated_storage" {
  description = "Allocated storage for the database in GB"
  type        = number
  default     = 20
}

variable "db_engine_version" {
  description = "Database engine version"
  type        = string
  default     = "14.7"
}

variable "db_instance_class" {
  description = "Instance class for the database"
  type        = string
  default     = "db.t3.micro"
}

variable "db_username" {
  description = "Database master username"
  type        = string
  sensitive   = true
}

variable "db_password" {
  description = "Database master password"
  type        = string
  sensitive   = true
}

variable "db_name" {
  description = "Name of the database"
  type        = string
  default     = "swashflag"
}

# Backend variables
variable "backend_cpu" {
  description = "CPU units for backend task"
  type        = number
  default     = 256
}

variable "backend_memory" {
  description = "Memory for backend task in MB"
  type        = number
  default     = 512
}

variable "backend_image" {
  description = "Docker image for backend"
  type        = string
}

variable "tags" {
  description = "Tags to attach to resources"
  type        = map(string)
  default     = {
    Environment = "dev"
    Project     = "swashflag"
    Terraform   = "true"
  }
}

# Frontend variables
variable "frontend_domain_name" {
  description = "Domain name for the frontend application"
  type        = string
}

variable "frontend_hosting_type" {
  description = "Type of hosting for frontend (s3_only or cloudfront)"
  type        = string
  default     = "s3_only"
}

variable "frontend_cloudfront_price_class" {
  description = "Price class for CloudFront distribution"
  type        = string
  default     = "PriceClass_100"
}

variable "frontend_enable_waf" {
  description = "Enable AWS WAF for CloudFront"
  type        = bool
  default     = false
}

# Additional database variables
variable "db_multi_az" {
  description = "Enable Multi-AZ deployment for RDS"
  type        = bool
  default     = false
}

variable "db_backup_retention_period" {
  description = "Number of days to retain backups"
  type        = number
  default     = 7
}

variable "db_skip_final_snapshot" {
  description = "Skip final snapshot when destroying database"
  type        = bool
  default     = true
}

variable "db_final_snapshot_identifier" {
  description = "Identifier for final snapshot"
  type        = string
  default     = null
}

variable "db_maintenance_window" {
  description = "Preferred maintenance window"
  type        = string
  default     = "Sun:02:00-Sun:03:00"
}

variable "db_parameter_group_family" {
  description = "Database parameter group family"
  type        = string
  default     = "postgres14"
}

variable "db_storage_encrypted" {
  description = "Enable storage encryption"
  type        = bool
  default     = true
}

variable "db_monitoring_interval" {
  description = "Monitoring interval in seconds (0 to disable)"
  type        = number
  default     = 0
}

variable "db_performance_insights_enabled" {
  description = "Enable performance insights"
  type        = bool
  default     = false
}

variable "db_deletion_protection" {
  description = "Enable deletion protection"
  type        = bool
  default     = false
}

variable "client_url" {
  description = "URL of the client/frontend application (for CORS)"
  type        = string
  default     = "https://your-frontend-domain.com"  # Replace with your actual domain or use var.frontend_domain_name
}