output "vpc_id" {
  description = "ID of the VPC"
  value       = module.networking.vpc_id
}

output "db_endpoint" {
  description = "Endpoint of the database instance"
  value       = module.database.db_instance_endpoint
}

output "backend_url" {
  description = "URL of the deployed backend"
  value       = module.backend.backend_url
}

output "frontend_url" {
  description = "URL of the frontend"
  value       = module.frontend.frontend_url
}

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
