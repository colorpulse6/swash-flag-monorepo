output "db_instance_endpoint" {
  description = "Endpoint of the database instance"
  value       = aws_db_instance.database.endpoint
}

output "db_instance_name" {
  description = "Name of the database"
  value       = aws_db_instance.database.db_name
}