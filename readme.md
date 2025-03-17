# SwashFlag 

This repository contains a minimalist AWS deployment strategy for a full-stack web application. The infrastructure is designed to showcase AWS knowledge while minimizing costs.

## Architecture Overview

The simplified architecture consists of:

1. **Single EC2 Instance (t2.micro)**: Hosts both frontend and backend applications
   - Nginx as a reverse proxy to route traffic
   - Docker for running the backend service
   - Static frontend files served directly from Nginx

2. **Simple VPC Setup**:
   - 1 VPC with public subnets across 2 availability zones
   - Internet Gateway for public internet access
   - Security group with necessary rules

3. **S3 Bucket**: For deployment artifacts and file storage

4. **CI/CD Pipeline**: GitHub Actions workflow for automated deployment

5. **Multi-Environment Support**:
   - Uses Terraform workspaces for environment isolation
   - Development environment runs locally only (not deployed to AWS)
   - Supports staging and production environments in AWS
   - Environment-specific configuration and deployment

## Development Environment Setup

The development environment runs locally to save costs and AWS resources:

1. **Local Setup**:
   ```bash
   # Install dependencies
   pnpm install
   
   # Start local development servers
   pnpm dev
   ```

2. **Local Database**:
   - Use a local PostgreSQL instance for development
   - Configure connection details in your local `.env` file

## Deployment Environments

This project uses two AWS deployment environments:

1. **Staging**: For pre-production testing and validation
   - Hosts the shared PostgreSQL database for both environments
   - Deployed from the `develop` branch

2. **Production**: For live application
   - Uses the database hosted on the staging environment
   - Deployed from tagged releases (`v*` tags)

## GitHub Secrets Configuration

This project requires the following GitHub secrets to be configured for successful deployment:

### Required Secrets

1. **`AWS_ACCESS_KEY_ID`** (Required)
   - Your AWS IAM user access key
   - The IAM user must have permissions to create EC2, VPC, and S3 resources

2. **`AWS_SECRET_ACCESS_KEY`** (Required)
   - The secret key associated with your AWS access key ID

3. **`SSH_PRIVATE_KEY`** (Required)
   - Your private SSH key for connecting to the EC2 instance
   - Include the entire key including BEGIN/END lines

### Optional Secrets

4. **`EC2_KEY_NAME`** (Optional but recommended)
   - The name of your EC2 key pair in the AWS region
   - Required for SSH access to your instance
   - Example: `my-aws-keypair`

5. **`AMI_ID`** (Optional)
   - Custom AMI ID if you want to use a different base image
   - Defaults to Ubuntu 22.04 LTS in us-west-2 if not provided

### Database Configuration Secrets

6. **`DB_USERNAME`** (Required)
   - Username for the PostgreSQL database
   - Example: `swashflag_user`

7. **`DB_PASSWORD`** (Required)
   - Password for the PostgreSQL database user
   - Should be a secure, random password
   - Example: Generate with: `openssl rand -base64 16`

### Setting Up Secrets

1. Go to your GitHub repository
2. Click on "Settings" tab
3. In the left sidebar, click "Secrets and variables" > "Actions"
4. Click "New repository secret" and add each secret with its value

### Setting Up Environment-Specific Secrets

For proper environment isolation, this project uses GitHub Environments to store environment-specific secrets:

1. Go to your GitHub repository
2. Click on "Settings" tab
3. In the left sidebar, click "Environments"
4. Create three environments: `dev`, `staging`, and `prod`
5. For each environment, add the following secrets:
   - `DB_USERNAME`: Environment-specific database username (e.g., `swashflag_dev_user` for dev)
   - `DB_PASSWORD`: Environment-specific secure password
   - `JWT_SECRET`: Environment-specific JWT secret for authentication
   - `ENCRYPTION_KEY`: Environment-specific encryption key

This ensures each environment has its own set of credentials and secrets, improving security and isolation.

## Cost Optimization

This infrastructure is specifically designed to minimize AWS costs while still showcasing AWS services:

- Uses only free tier eligible resources (t2.micro instance)
- Eliminates expensive managed services (RDS, ECS, etc.)
- Consolidates frontend and backend on a single instance
- Minimizes data transfer costs
- Avoids costly multi-AZ deployments
- Shares infrastructure code across environments with minimal duplication

## Prerequisites

1. AWS account with appropriate permissions
2. GitHub repository with necessary secrets (see GitHub Secrets Configuration section)
3. AWS EC2 Key Pair for SSH access
4. Local environment for development

## Multi-Environment Strategy

The infrastructure supports two AWS environments plus local development:

- **Development**: Runs locally, not deployed to AWS
  - Use local server and database
  - Run with `pnpm dev` command
  - Saves costs by avoiding AWS resources for development

- **Staging (staging)**: For pre-production validation
  - Deployed automatically from the `develop` branch
  - Prefix: `swashflag-staging`
  - Hosts the PostgreSQL database used by both environments

- **Production (prod)**: For live application
  - Deployed when a version tag is pushed (e.g., `v1.0.0`)
  - Prefix: `swashflag-prod`
  - Connects to the database hosted in the staging environment

The AWS environments are isolated using Terraform workspaces and have:
- Their own set of AWS resources
- Environment-specific resource naming
- Environment-specific configuration
- Visual indicators in the UI to distinguish environments

## Deployment Instructions

### Manual Deployment to a Specific Environment

1. Navigate to the terraform directory:
   ```
   cd terraform
   ```

2. Initialize Terraform:
   ```
   terraform init
   ```

3. Select the target environment workspace:
   ```
   terraform workspace select dev  # or staging or prod
   ```
   (Create it first with `terraform workspace new dev` if it doesn't exist)

4. Apply the Terraform configuration:
   ```
   terraform apply
   ```

5. Build and deploy your applications to the EC2 instance

### Automated Deployment via GitHub Actions

The GitHub Actions workflow automatically determines the target environment:

1. **Development Environment**:
   - Trigger: Push to `develop` branch
   - Command: `git push origin develop`

2. **Staging Environment**:
   - Trigger: Push to `main` branch
   - Command: `git push origin main`

3. **Production Environment**:
   - Trigger: Push a version tag
   - Command: `git tag v1.0.0 && git push origin v1.0.0`

4. **Manual Deployment**:
   - Trigger: Manual workflow dispatch
   - Select the environment in GitHub Actions UI

The workflow will:
- Build the frontend and backend applications with environment-specific configuration
- Deploy the infrastructure to the appropriate environment
- Package and deploy the applications to the EC2 instance

## Local Development

This repository is set up as a monorepo using PNPM workspaces:

1. Install dependencies:
   ```
   pnpm install
   ```

2. Run development servers:
   ```
   pnpm run dev
   ```

## Project Structure

```
.
├── .github/workflows      # GitHub Actions workflows
│   └── front-and-back-deploy.yml         # Multi-environment deployment workflow
├── apps                   # Application code
│   ├── backend            # Backend application (Node.js)
│   └── frontend           # Frontend application (React)
├── packages               # Shared packages
└── terraform              # Infrastructure as Code
    ├── main.tf            # Main Terraform configuration with environment support
    ├── variables.tf       # Variable definitions
    └── terraform.tfvars   # Default variable values
```

## Extending the Infrastructure

This minimalist infrastructure can be extended to include more AWS services as needed:

1. Add RDS for a managed database
2. Implement S3 + CloudFront for static content delivery
3. Add Auto Scaling for high availability
4. Implement ECS/Fargate for container orchestration

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Application Overview

**SwashFlag** is a full-stack web application designed to manage feature flags efficiently. It provides a user-friendly interface for developers and product managers to toggle features on and off without deploying new code. This capability is crucial for A/B testing, gradual feature rollouts, and quick rollbacks.

### Key Features

- **Feature Management**: Easily create, update, and delete feature flags.
- **User Authentication**: Secure login and signup functionality.
- **API Token Management**: Generate and manage API tokens for secure access.
- **Environment-Specific Configurations**: Automatically adapts to different environments (development, staging, production) using dynamic configuration.

### Technology Stack

- **Frontend**: Built with modern JavaScript frameworks, providing a responsive and intuitive user interface.
- **Backend**: Node.js-based API server, handling authentication, feature flag operations, and more.
- **Infrastructure**: Deployed on AWS using a cost-effective architecture, leveraging EC2, S3, and Terraform for infrastructure as code.

### Use Cases

- **A/B Testing**: Enable or disable features for specific user segments to test different versions of a feature.
- **Gradual Rollouts**: Roll out new features to a small percentage of users before a full release.
- **Quick Rollbacks**: Instantly disable a feature if issues are detected, without redeploying the application.

## Shared Database Strategy

To optimize costs while maintaining proper environment isolation, this project uses a shared database strategy:

1. **Single Database Host**: The `staging` environment hosts a PostgreSQL database server that is used by both AWS environments.
   - Reduces costs by running only one database instance
   - Development uses a local database for faster development
   - All AWS database connections are secured within the VPC

2. **Environment-Specific Databases**: While sharing the same database server, each environment has its own dedicated database:
   - Local database for development (not on AWS)
   - `swash_flag_staging` for staging
   - `swash_flag_prod` for production

3. **Proper Isolation**: Each environment is fully isolated from others:
   - Local development runs entirely on your machine
   - Separate EC2 instances for staging and production
   - Individual S3 buckets for deployment artifacts
   - Environment-specific databases on the shared database server

This approach allows you to maintain a complete testing workflow (local → staging → prod) while minimizing AWS costs by:
- Eliminating the AWS dev environment entirely
- Consolidating database resources in the staging environment

## Simplified AWS Deployment Workflow

We have implemented a simplified AWS deployment workflow that uses manually created AWS resources instead of Terraform-managed infrastructure. This new approach:

- Reduces complexity and deployment times
- Leverages existing manually created AWS resources
- Uses Terraform only for deployment orchestration, not infrastructure creation
- Securely manages secrets through GitHub Actions secrets

For detailed documentation on the new workflow, see [Simplified AWS Workflow Documentation](docs/simplified-aws-workflow.md).
