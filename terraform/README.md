# Swashflag Simplified Terraform Workflow

This directory contains Terraform configuration for deploying to existing AWS infrastructure. Unlike traditional Terraform setups that manage the entire infrastructure lifecycle, this configuration focuses solely on deploying application code to manually created AWS resources.

## Infrastructure Overview

The Swashflag application uses the following AWS resources that were manually created:

- **VPC and Networking**: VPC, subnets, security groups
- **Database**: PostgreSQL on RDS 
- **Backend**: EC2 instance running Node.js
- **Frontend**: S3 bucket with CloudFront distribution

## Setup Instructions

1. **Configure AWS CLI**:
   ```bash
   aws configure
   ```

2. **Update terraform.tfvars**:
   - Copy `terraform.tfvars.example` to `terraform.tfvars` if not already done
   - Verify that the resource IDs match your AWS resources
   - Update the SSH key path to point to your private key for EC2 access

3. **Set Required Environment Variables**:
   ```bash
   export TF_VAR_db_password="your-db-password"
   export TF_VAR_encryption_key="your-encryption-key"
   export TF_VAR_jwt_secret="your-jwt-secret"
   ```

4. **Initialize Terraform**:
   ```bash
   terraform init
   ```

5. **Deploy**:
   ```bash
   terraform apply
   ```

## GitHub Actions Workflow

The GitHub Actions workflow in `.github/workflows/front-and-back-deploy.yml` automates the deployment process. To use it, set the following repository secrets:

- `AWS_ACCESS_KEY_ID`: AWS access key
- `AWS_SECRET_ACCESS_KEY`: AWS secret key
- `DB_PASSWORD`: Database password
- `ENCRYPTION_KEY`: Backend encryption key
- `JWT_SECRET`: JWT authentication secret
- `EC2_SSH_PRIVATE_KEY`: Private SSH key for EC2 access
- `CLOUDFRONT_DISTRIBUTION_ID`: CloudFront distribution ID (optional)

## Backend Deployment

The backend is deployed via SSH to the EC2 instance. The deployment process:

1. Creates environment variables file on the EC2 instance
2. Zips and uploads the code
3. Installs dependencies
4. Starts/restarts the application using PM2

## Frontend Deployment

The frontend is built locally and synced to the S3 bucket. The deployment process:

1. Builds the frontend with the appropriate API URL
2. Syncs the built files to the S3 bucket
3. Invalidates the CloudFront cache (if distribution ID is provided)

## Manual Operations

While this Terraform setup handles deployments, you may still need to perform some manual operations:

- Database schema migrations
- SSL certificate management
- Security group rule updates
- Access control and IAM management

## Security Notes

- Sensitive values like database credentials, encryption keys, and JWT secrets should never be committed to version control
- Always use environment variables or GitHub secrets to provide these values
- Consider using AWS Secrets Manager or Parameter Store for production environments

## Troubleshooting

- **SSH Connection Issues**: Verify your key path and EC2 security group rules
- **Database Connection Errors**: Check the database endpoint and security group rules
- **Build Failures**: Verify the Node.js version and dependencies
- **Deployment Failures**: Check AWS credentials and permissions 