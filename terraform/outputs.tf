# Output definitions for the SwashFlag infrastructure

output "vpc_id" {
  description = "ID of the VPC"
  value       = aws_vpc.main.id
}

# Removing db_endpoint output as there's no database module or resource

# Removing backend_url output as there's no backend module

# Removing frontend_url output as there's no frontend module

output "app_public_ip" {
  description = "Public IP address of the EC2 instance"
  value       = aws_instance.app.public_ip
}

output "app_public_dns" {
  description = "Public DNS name of the EC2 instance"
  value       = aws_instance.app.public_dns
}

output "s3_deployment_bucket" {
  description = "Name of the S3 bucket used for deployment artifacts"
  value       = aws_s3_bucket.deployment.bucket
}

output "ssh_connection_string" {
  description = "SSH connection string for the EC2 instance"
  value       = "ssh ec2-user@${data.aws_instance.backend_instance.public_ip}"
}

output "app_url" {
  description = "URL of the application"
  value       = "http://${aws_instance.app.public_dns}"
}

# Add API URL output that's used in the deployment workflow
output "api_url" {
  description = "URL of the API endpoint"
  value       = "http://${aws_instance.app.public_ip}/api"
}

# Add database host outputs
output "is_db_host" {
  description = "Whether this instance hosts the shared database"
  value       = local.is_db_host
}

output "shared_db_host" {
  description = "Hostname or IP of the shared database"
  value       = local.shared_db_host
}

output "backend_public_ip" {
  description = "Public IP address of the backend EC2 instance"
  value       = data.aws_instance.backend_instance.public_ip
}

output "backend_public_dns" {
  description = "Public DNS of the backend EC2 instance"
  value       = data.aws_instance.backend_instance.public_dns
}

output "backend_api_url" {
  description = "API URL for the backend"
  value       = "http://${data.aws_instance.backend_instance.public_dns}:3000"
}

output "frontend_s3_bucket" {
  description = "S3 bucket hosting the frontend"
  value       = data.aws_s3_bucket.frontend_bucket.bucket
}

output "frontend_url" {
  description = "CloudFront URL for the frontend"
  value       = "https://dbjawnbr16knq.cloudfront.net"
}

output "database_endpoint" {
  description = "RDS database endpoint"
  value       = var.db_endpoint
  sensitive   = true
}

output "database_connection_string" {
  description = "Database connection string (without password)"
  value       = "postgresql://${var.db_username}:****@${var.db_endpoint}:5432/${var.db_name}"
  sensitive   = true
}
