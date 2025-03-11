variable "project_name" {
  description = "Name of the project"
  type        = string
}

variable "aws_region" {
  description = "AWS region to deploy to"
  type        = string
  default     = "us-west-2"
}

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

variable "database_url" {
  description = "Database connection string"
  type        = string
  sensitive   = true
}

variable "client_url" {
  description = "URL of the frontend client"
  type        = string
}

variable "tags" {
  description = "Tags to attach to resources"
  type        = map(string)
  default     = {}
}

variable "vpc_id" {
  description = "ID of the VPC"
  type        = string
}

variable "public_subnet_ids" {
  description = "List of public subnet IDs"
  type        = list(string)
}

variable "private_subnet_ids" {
  description = "List of private subnet IDs"
  type        = list(string)
}