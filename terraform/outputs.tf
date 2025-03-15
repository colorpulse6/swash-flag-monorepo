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
  value       = "ssh ubuntu@${aws_instance.app.public_ip}"
}

output "app_url" {
  description = "URL of the application"
  value       = "http://${aws_instance.app.public_dns}"
}

# Adding API URL output that's used in the deployment workflow
output "api_url" {
  description = "URL of the API endpoint"
  value       = "http://${aws_instance.app.public_ip}/api"
}
