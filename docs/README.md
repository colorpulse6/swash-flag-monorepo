# Swashflag Documentation

This folder contains documentation for the Swashflag project.

## Deployment Documentation

- [Simplified AWS Workflow](simplified-aws-workflow.md) - Documentation for the simplified AWS deployment workflow that uses manually created AWS resources

## Infrastructure

- [Infrastructure Overview](../terraform/README.md) - Details on the Terraform configuration for deployment orchestration

## Development

- Frontend - React/Vite application in `apps/frontend`
- Backend - Node.js application in `apps/backend`

## Security Notes

⚠️ **Important Security Information**

1. **Public Repository Security**:
   - Never commit actual AWS resource IDs or credentials to this public repository
   - All documentation should use placeholder values instead of actual identifiers
   - Store sensitive information only in GitHub Secrets or environment variables

2. **Resource ID Handling**:
   - AWS resource IDs, endpoints, and other identifying information should not be exposed in code or documentation
   - Use terraform.tfvars (which is git-ignored) to store actual resource identifiers
   - Reference terraform.tfvars.example for the required variable format

3. **Secrets Management**:
   - All sensitive values should be stored in GitHub Secrets
   - Required secrets are documented in the deployment workflow guide
   - Local testing should use environment variables instead of hardcoded values 