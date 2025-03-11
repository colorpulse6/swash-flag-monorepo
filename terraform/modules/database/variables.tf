variable "project_name" {
  description = "Name of the project"
  type        = string
}

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

variable "db_security_group_id" {
  description = "Security group ID for the database"
  type        = string
}

variable "db_subnet_group_name" {
  description = "Subnet group name for the database"
  type        = string
}

variable "tags" {
  description = "Tags to attach to resources"
  type        = map(string)
  default     = {}
}

variable "backup_retention_period" {
  description = "Number of days to retain backups"
  type        = number
  default     = 7
}

variable "multi_az" {
  description = "Enable Multi-AZ deployment"
  type        = bool
  default     = false
}

variable "skip_final_snapshot" {
  description = "Skip final snapshot before deleting"
  type        = bool
  default     = false
}

variable "storage_encrypted" {
  description = "Enable storage encryption"
  type        = bool
  default     = true
}