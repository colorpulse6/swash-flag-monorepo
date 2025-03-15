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

variable "vpc_cidr" {
  description = "CIDR block for the VPC"
  type        = string
  default     = "10.0.0.0/16"
}

variable "availability_zones" {
  description = "List of availability zones"
  type        = list(string)
  default     = ["us-west-2a", "us-west-2b"]
}

variable "ami_id" {
  description = "AMI ID for the EC2 instance (Ubuntu 22.04 LTS)"
  type        = string
  default     = "ami-0efcece6bed30fd98" # Ubuntu 22.04 LTS in us-west-2 (replace with the correct AMI ID for your region)
}

variable "key_name" {
  description = "Name of the SSH key pair to use for the EC2 instance"
  type        = string
  default     = null
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