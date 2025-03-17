variable "project_name" {
  description = "Project name"
  type        = string
  default     = "swashflag"
}

variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-west-2"
}

variable "vpc_cidr" {
  description = "CIDR block for the VPC"
  type        = string
  default     = "10.0.0.0/16"
}

variable "availability_zones" {
  description = "List of availability zones to use"
  type        = list(string)
  default     = ["us-west-2a", "us-west-2b"]
}

variable "ami_id" {
  description = "AMI ID for the EC2 instance"
  type        = string
  default     = "ami-0efcece6bed30fd98" # Ubuntu 22.04 LTS in us-west-2 (replace with the correct AMI ID for your region)
}

variable "key_name" {
  description = "Name of the SSH key pair"
  type        = string
  default     = ""
}

variable "tags" {
  description = "Tags to apply to resources"
  type        = map(string)
  default     = {}
}

# Variables mentioned in warnings - made secure
variable "db_username" {
  description = "Database username"
  type        = string
  sensitive   = true
  default     = "postgres"
}

variable "db_password" {
  description = "Database password"
  type        = string
  sensitive   = true
  default     = ""  # Should be provided via environment variable or terraform.tfvars
}

# Security variables
variable "encryption_key" {
  description = "Encryption key for the backend application"
  type        = string
  sensitive   = true
  default     = ""  # Should be provided via environment variable TF_VAR_encryption_key
}

variable "jwt_secret" {
  description = "JWT secret for the backend application"
  type        = string
  sensitive   = true
  default     = ""  # Should be provided via environment variable TF_VAR_jwt_secret
}

# Existing resource IDs
variable "vpc_id" {
  description = "Existing VPC ID"
  type        = string
  default     = null  # Must be provided in terraform.tfvars or via environment variable
}

variable "subnet_ids" {
  description = "Existing subnet IDs"
  type        = list(string)
  default     = []  # Must be provided in terraform.tfvars or via environment variable
}

variable "db_security_group_id" {
  description = "Database security group ID"
  type        = string
  default     = null  # Must be provided in terraform.tfvars or via environment variable
}

variable "backend_security_group_id" {
  description = "Backend security group ID"
  type        = string
  default     = null  # Must be provided in terraform.tfvars or via environment variable
}

variable "ec2_instance_id" {
  description = "Backend EC2 instance ID"
  type        = string
  default     = null  # Must be provided in terraform.tfvars or via environment variable
}

variable "s3_bucket_name" {
  description = "Frontend S3 bucket name"
  type        = string
  default     = null  # Must be provided in terraform.tfvars or via environment variable
}

variable "cloudfront_distribution_id" {
  description = "CloudFront distribution ID for cache invalidation"
  type        = string
  default     = ""  # Optional, can be provided in terraform.tfvars or via environment variable
}

variable "db_endpoint" {
  description = "RDS endpoint"
  type        = string
  default     = null  # Must be provided in terraform.tfvars or via environment variable
}

variable "db_name" {
  description = "Database name"
  type        = string
  default     = "swashflag"
}

variable "ssh_key_path" {
  description = "Path to SSH private key for EC2 access"
  default     = "~/.ssh/id_rsa"  # Update to actual path
}