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
