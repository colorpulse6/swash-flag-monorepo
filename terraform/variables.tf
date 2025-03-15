variable "project_name" {
  description = "The name of the project"
  type        = string
  default     = "swashflag"
}

variable "aws_region" {
  description = "The AWS region to deploy resources"
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
  description = "Database username - should be provided via environment variables or secrets, not defaults"
  type        = string
  sensitive   = true
  # No default value - force explicit setting
}

variable "db_password" {
  description = "Database password - should be provided via environment variables or secrets, not defaults"
  type        = string
  sensitive   = true
  # No default value - force explicit setting
}