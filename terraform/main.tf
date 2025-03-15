# Provider configuration
provider "aws" {
  region = var.aws_region
}

# Get the current Terraform workspace for environment
locals {
  # Default to dev if not running in Terraform Cloud/Enterprise
  workspace_name = terraform.workspace == "default" ? "dev" : terraform.workspace
  
  # Define environment-specific settings
  env_settings = {
    dev = {
      instance_type = "t2.micro"  # Free tier eligible
      tags = merge(var.tags, {
        Environment = "dev"
      })
    }
    staging = {
      instance_type = "t2.micro"  # Still using t2.micro for cost optimization
      tags = merge(var.tags, {
        Environment = "staging"
      })
    }
    prod = {
      instance_type = "t2.micro"  # For a real prod environment, consider t2.small or larger
      tags = merge(var.tags, {
        Environment = "prod"
      })
    }
  }
  
  # Settings for current environment
  current_env     = local.env_settings[local.workspace_name]
  instance_type   = local.current_env.instance_type
  resource_prefix = "${var.project_name}-${local.workspace_name}"
  tags            = local.current_env.tags
}

# Simple networking with a single VPC and two public subnets
resource "aws_vpc" "main" {
  cidr_block           = var.vpc_cidr
  enable_dns_support   = true
  enable_dns_hostnames = true
  tags = merge(local.tags, { Name = "${local.resource_prefix}-vpc" })
}

resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id
  tags   = merge(local.tags, { Name = "${local.resource_prefix}-igw" })
}

resource "aws_subnet" "public" {
  count             = length(var.availability_zones)
  vpc_id            = aws_vpc.main.id
  cidr_block        = cidrsubnet(var.vpc_cidr, 8, count.index)
  availability_zone = var.availability_zones[count.index]
  map_public_ip_on_launch = true
  
  tags = merge(local.tags, { 
    Name = "${local.resource_prefix}-public-subnet-${count.index + 1}"
  })
}

resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id
  
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.main.id
  }
  
  tags = merge(local.tags, { Name = "${local.resource_prefix}-public-rt" })
}

resource "aws_route_table_association" "public" {
  count          = length(aws_subnet.public)
  subnet_id      = aws_subnet.public[count.index].id
  route_table_id = aws_route_table.public.id
}

# Security group for the EC2 instance
resource "aws_security_group" "app" {
  name        = "${local.resource_prefix}-app-sg"
  description = "Security group for the application"
  vpc_id      = aws_vpc.main.id

  # HTTP access
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # HTTPS access
  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  # SSH access
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]  # Consider restricting to your IP for production
  }

  # All outbound traffic
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = merge(local.tags, { Name = "${local.resource_prefix}-app-sg" })
}

# EC2 instance running both frontend and backend
resource "aws_instance" "app" {
  ami                    = var.ami_id
  instance_type          = local.instance_type
  subnet_id              = aws_subnet.public[0].id
  vpc_security_group_ids = [aws_security_group.app.id]
  key_name               = var.key_name
  
  user_data = <<-EOF
    #!/bin/bash
    # Update packages
    apt-get update -y
    apt-get install -y docker.io nginx awscli

    # Start Docker service
    systemctl start docker
    systemctl enable docker
    
    # Configure Nginx as reverse proxy
    cat > /etc/nginx/sites-available/default << 'EOL'
    server {
      listen 80;
      
      # Environment banner for non-production environments
      ${local.workspace_name != "prod" ? "add_header X-Environment \"${local.workspace_name}\";" : ""}
      
      location /api/ {
        proxy_pass http://localhost:4000/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
      }
      
      location / {
        root /var/www/html;
        try_files $uri $uri/ /index.html;
      }
    }
    EOL
    
    systemctl restart nginx
    
    # Add environment tag to the instance metadata
    mkdir -p /var/www/html/env
    echo '{"environment": "${local.workspace_name}"}' > /var/www/html/env/info.json
  EOF
  
  tags = merge(local.tags, { 
    Name = "${local.resource_prefix}-app" 
  })
}

# S3 bucket for storing frontend assets and deployment scripts
resource "aws_s3_bucket" "deployment" {
  bucket = "${local.resource_prefix}-deployment"
  tags   = local.tags
}

# Output the instance public IP
output "app_public_ip" {
  value = aws_instance.app.public_ip
}

output "s3_deployment_bucket" {
  value = aws_s3_bucket.deployment.bucket
}