# Reference existing EC2 instance
data "aws_instance" "backend_instance" {
  instance_id = var.ec2_instance_id
}

# Define how to deploy to EC2 (using null_resource with provisioners)
resource "null_resource" "deploy_backend" {
  triggers = {
    always_run = "${timestamp()}"
  }

  # Example of deploying backend via SSH
  provisioner "remote-exec" {
    connection {
      type        = "ssh"
      user        = "ec2-user"  # Amazon Linux 2 default user
      host        = data.aws_instance.backend_instance.public_ip
      private_key = file(var.ssh_key_path)
    }

    inline = [
      "cd /home/ec2-user/app || mkdir -p /home/ec2-user/app",
      "echo 'NODE_ENV=production' > /home/ec2-user/app/.env",
      "echo 'PORT=3000' >> /home/ec2-user/app/.env",
      "echo 'DATABASE_URL=postgresql://${var.db_username}:${var.db_password}@${var.db_endpoint}:5432/${var.db_name}' >> /home/ec2-user/app/.env",
      "echo 'ENCRYPTION_KEY=\"${var.encryption_key}\"' >> /home/ec2-user/app/.env",
      "echo 'JWT_SECRET=\"${var.jwt_secret}\"' >> /home/ec2-user/app/.env",
      "echo 'CLIENT_URL=https://dbjawnbr16knq.cloudfront.net' >> /home/ec2-user/app/.env"
    ]
  }
}

# Deploy the backend application code
resource "null_resource" "deploy_backend_code" {
  depends_on = [null_resource.deploy_backend]
  
  triggers = {
    always_run = "${timestamp()}"
  }
  
  provisioner "local-exec" {
    command = <<-EOT
      cd ${path.module}/../apps/backend
      zip -r ../../backend.zip .
      aws s3 cp ../../backend.zip s3://${var.s3_bucket_name}/backend.zip
      rm -f ../../backend.zip
      
      # Create a deployment script
      cat > ../../deploy.sh << 'SCRIPT'
      #!/bin/bash
      aws s3 cp s3://${var.s3_bucket_name}/backend.zip /home/ec2-user/backend.zip
      cd /home/ec2-user
      unzip -o backend.zip -d app
      cd app
      npm install --production
      pm2 restart all || pm2 start npm --name "${var.project_name}" -- start
      SCRIPT
      
      chmod +x ../../deploy.sh
      
      # Execute the deployment script on the EC2 instance
      ssh -o StrictHostKeyChecking=no -i ${var.ssh_key_path} ec2-user@${data.aws_instance.backend_instance.public_ip} 'bash -s' < ../../deploy.sh
      
      rm -f ../../deploy.sh
    EOT
  }
} 