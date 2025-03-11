output "backend_url" {
  description = "URL of the deployed backend"
  value       = aws_lb.api.dns_name
}

output "backend_ecs_cluster_id" {
  description = "ID of the ECS cluster"
  value       = aws_ecs_cluster.backend_cluster.id
}