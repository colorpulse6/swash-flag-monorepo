# Reference the existing S3 bucket
data "aws_s3_bucket" "frontend_bucket" {
  bucket = var.s3_bucket_name
}

# Resource to sync frontend build to S3
resource "null_resource" "deploy_frontend" {
  triggers = {
    always_run = "${timestamp()}"
  }

  # Build frontend
  provisioner "local-exec" {
    command = <<-EOT
      cd ${path.module}/../apps/frontend
      npm install
      VITE_API_URL='http://ec2-44-246-246-231.us-west-2.compute.amazonaws.com:3000' npm run build
    EOT
  }
  
  # Deploy frontend to S3
  provisioner "local-exec" {
    command = <<-EOT
      cd ${path.module}/../apps/frontend
      aws s3 sync dist/ s3://${var.s3_bucket_name} --delete
    EOT
  }

  # Invalidate CloudFront cache if distribution ID is provided
  provisioner "local-exec" {
    command = <<-EOT
      if [ -n "${var.cloudfront_distribution_id}" ]; then
        aws cloudfront create-invalidation --distribution-id ${var.cloudfront_distribution_id} --paths "/*"
      fi
    EOT
  }
} 