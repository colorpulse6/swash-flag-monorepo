# Swashflag Monorepo - Simplified AWS Deployment

This repository contains the Swashflag application, structured as a monorepo with frontend and backend applications. This document explains the simplified AWS deployment workflow using manually created AWS resources.

## Repository Structure

```
swash-flag-monorepo/
├── apps/
│   ├── frontend/     # React/Vite frontend application
│   ├── backend/      # Node.js backend application
├── terraform/        # Deployment configuration
├── .github/
│   └── workflows/    # GitHub Actions workflows
├── docs/             # Documentation
└── packages/         # Shared packages (if any)
```

## AWS Infrastructure

Instead of creating infrastructure via Terraform, we now use manually created AWS resources:

- **VPC**: Created manually in AWS Console
- **Subnets**: 
  - Created subnets across multiple availability zones
  - Example: `subnet-example123` in us-west-2a
- **Security Groups**:
  - Database SG: For PostgreSQL access
  - Backend SG: For application access
- **RDS Database**:
  - Endpoint: `your-database.region.rds.amazonaws.com`
  - Database name: Example `swashflag`
- **EC2 Instance**:
  - Hosts the Node.js backend application
  - Example public DNS: `ec2-xx-xxx-xxx-xx.region.compute.amazonaws.com`
- **S3 & CloudFront**:
  - S3 Bucket: For static frontend assets
  - CloudFront: For content delivery

> **Note**: For security reasons, actual resource IDs, endpoints, and URIs have been replaced with examples in this documentation. When you create your own resources, you'll have your specific values to use.

## Deployment Workflow

The deployment is automated using GitHub Actions:

1. **Backend Deployment**:
   - Code is packaged and uploaded to the EC2 instance
   - Environment variables are configured
   - Application is started/restarted using PM2

2. **Frontend Deployment**:
   - Code is built with the correct backend API URL
   - Built files are synced to S3
   - CloudFront cache is invalidated

## Terraform Usage

Terraform is now used only for deployment orchestration, not infrastructure creation. The configuration:

1. References existing AWS resources via data sources
2. Defines deployment processes for both frontend and backend
3. Provides outputs for important URLs and connection details

## Getting Started

### Prerequisites

- AWS CLI configured with appropriate permissions
- Node.js and npm/pnpm installed
- SSH key for EC2 access

### Development Setup

1. Clone the repository:
   ```
   git clone <repository-url>
   cd swash-flag-monorepo
   ```

2. Install dependencies:
   ```
   pnpm install
   ```

3. Configure environment:
   - Copy `.env.example` files to `.env` in both frontend and backend directories
   - Update with appropriate values for local development

4. Start development servers:
   ```
   pnpm run dev --filter=frontend
   pnpm run dev --filter=backend
   ```

### Deployment

#### Manual Deployment

1. Set up AWS credentials:
   ```
   export AWS_ACCESS_KEY_ID=your-access-key
   export AWS_SECRET_ACCESS_KEY=your-secret-key
   ```

2. Set environment variables for sensitive information:
   ```
   export TF_VAR_db_password=your-db-password
   export TF_VAR_encryption_key=your-encryption-key
   export TF_VAR_jwt_secret=your-jwt-secret
   ```

3. Deploy using Terraform:
   ```
   cd terraform
   terraform init
   terraform apply
   ```

#### Automated Deployment

Push to the `main` branch to trigger the GitHub Actions workflow.

## Configuration Files

- **Backend**: `apps/backend/.env.production`
- **Frontend**: `apps/frontend/.env.production`
- **Terraform**: `terraform/terraform.tfvars`
- **GitHub Actions**: `.github/workflows/front-and-back-deploy.yml`

## GitHub Secrets Required

For the GitHub Actions workflow to function, set these repository secrets:

- `AWS_ACCESS_KEY_ID`: AWS access key
- `AWS_SECRET_ACCESS_KEY`: AWS secret key
- `DB_PASSWORD`: Database password
- `ENCRYPTION_KEY`: Backend encryption key
- `JWT_SECRET`: JWT authentication secret
- `EC2_SSH_PRIVATE_KEY`: Private SSH key for EC2 access
- `CLOUDFRONT_DISTRIBUTION_ID`: CloudFront distribution ID (optional)

## Security Notes

- Sensitive values are stored in GitHub secrets and passed securely to the deployment process
- Local development should use separate environment variables from production
- Never commit sensitive credentials or resource identifiers to the repository
- Do not include actual AWS resource IDs in documentation in public repositories
- Restrict access to your AWS resources using appropriate IAM policies and security groups

## Troubleshooting

See the `terraform/README.md` file for detailed troubleshooting steps. 