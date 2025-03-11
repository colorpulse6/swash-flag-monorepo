# Swash Flag

A modern web application built with React frontend and containerized backend, managed in a Turborepo monorepo structure with infrastructure as code using Terraform.

## 🏗️ Architecture Overview

This application uses a modern cloud-native architecture:

- **Frontend**: React application built with Vite, hosted on AWS S3
- **Backend**: Node.js API running in Docker containers, hosted in AWS
- **Database**: PostgreSQL with Prisma ORM
- **Infrastructure**: Defined using Terraform (IaC)
- **CI/CD**: Automated deployments via GitHub Actions

## 📂 Repository Structure

```
.
├── .github/                  # GitHub Actions workflows
│   └── workflows/            # CI/CD pipeline definitions
├── apps/                     # Application code (Turborepo)
│   ├── frontend/             # React frontend application
│   │   ├── src/              # Frontend source code
│   │   ├── public/           # Static assets
│   │   ├── .env.example      # Environment variables example
│   │   └── vite.config.ts    # Vite configuration
│   └── backend/              # Node.js backend application
│       ├── src/              # Backend source code
│       ├── prisma/           # Database schema and migrations
│       ├── Dockerfile        # Container definition
│       └── .env.example      # Environment variables example
├── packages/                 # Shared packages (Turborepo)
│   ├── eslint-config/        # Shared ESLint configuration
│   ├── tsconfig/             # Shared TypeScript configuration
│   └── ui/                   # Shared UI component library
├── terraform/                # Infrastructure as Code
│   ├── modules/              # Terraform modules
│   │   ├── frontend/         # S3 bucket configuration
│   │   ├── backend/          # ECR and ECS configuration
│   │   ├── database/         # RDS configuration
│   │   └── networking/       # VPC, subnets, and security groups
│   ├── main.tf               # Main Terraform configuration
│   ├── variables.tf          # Input variables
│   └── outputs.tf            # Output variables
├── turbo.json                # Turborepo configuration
├── package.json              # Root package.json for monorepo
└── README.md                 # This file
```

## 🚀 Deployment Structure

The application is deployed to AWS with the following architecture:

### Frontend
- Hosted in an S3 bucket
- Served through CloudFront CDN (optional)
- Deployed automatically via GitHub Actions when changes are pushed to the main branch

### Backend
- Containerized using Docker
- Container images stored in Amazon ECR
- Deployed as containers in Amazon ECS/Fargate
- Connected to a PostgreSQL database in Amazon RDS
- Deployed automatically via GitHub Actions

### Infrastructure
- Defined and managed using Terraform
- State file stored in an S3 bucket
- Key resources:
  - VPC and networking components
  - S3 bucket for frontend hosting
  - ECR repository for backend container images
  - ECS/Fargate for running containers
  - RDS for PostgreSQL database

## 🔧 Local Development Setup

### Prerequisites

- Node.js (v16 or later)
- Docker and Docker Compose
- Git
- AWS CLI (for deployment)
- Terraform CLI (for infrastructure management)

### Setting Up the Development Environment

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name
```

2. **Install dependencies**

```bash
# Install root dependencies
npm install

# Install all workspace dependencies
npm run install:all
```

3. **Set up environment variables**

```bash
# Frontend
cp apps/frontend/.env.example apps/frontend/.env.local

# Backend
cp apps/backend/.env.example apps/backend/.env
```

4. **Start the development database**

```bash
# Start a local PostgreSQL instance
docker-compose up -d db
```

5. **Run database migrations**

```bash
# Navigate to backend
cd apps/backend

# Run Prisma migrations
npx prisma migrate dev
```

6. **Start the development servers**

```bash
# From the root directory
npm run dev
```

This will start:
- Frontend: http://localhost:3000
- Backend: http://localhost:8000
- Storybook (UI components): http://localhost:6006 (if configured)

## 🧪 Testing

```bash
# Run all tests
npm run test

# Run frontend tests
npm run test:frontend

# Run backend tests
npm run test:backend
```

## 📦 Building for Production

```bash
# Build all packages and apps
npm run build

# Build only frontend
npm run build:frontend

# Build only backend
npm run build:backend
```

## 🛠️ Infrastructure Management

### Initialize Terraform

```bash
cd terraform
terraform init
```

### Plan Infrastructure Changes

```bash
terraform plan -out=tfplan
```

### Apply Infrastructure Changes

```bash
terraform apply tfplan
```

### Destroy Infrastructure (Use with Caution)

```bash
terraform destroy
```

## 🔄 CI/CD Pipelines

GitHub Actions workflows automatically:

1. Run tests on pull requests
2. Deploy the frontend to S3 when changes are pushed to main
3. Build and push the backend Docker image to ECR when changes are pushed to main

## 📝 Environment Variables

### Frontend (.env.local)

```
VITE_API_URL=http://localhost:8000/api
VITE_AUTH_DOMAIN=your-auth-domain
VITE_AUTH_CLIENT_ID=your-auth-client-id
```

### Backend (.env)

```
# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/app

# Authentication
JWT_SECRET=your-jwt-secret

# AWS (for production)
AWS_REGION=us-east-1
S3_BUCKET=your-s3-bucket

# API Configuration
PORT=8000
NODE_ENV=development
```

## 📚 Technology Stack

### Frontend
- React 18+
- TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- React Router for routing
- GraphQL client (Apollo/Relay)

### Backend
- Node.js
- TypeScript
- Express/Fastify
- Prisma ORM
- PostgreSQL
- GraphQL API
- Docker

### DevOps
- Turborepo for monorepo management
- Docker for containerization
- Terraform for infrastructure as code
- GitHub Actions for CI/CD
- AWS (S3, ECR, ECS, RDS)

## 👨‍💻 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
