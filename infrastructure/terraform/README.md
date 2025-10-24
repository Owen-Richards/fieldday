# Terraform Infrastructure

Infrastructure as Code for FieldDay cloud resources.

## Directory Structure

```
terraform/
├── environments/      # Environment-specific configurations
│   ├── development/
│   ├── staging/
│   └── production/
├── modules/          # Reusable Terraform modules
│   ├── vpc/
│   ├── eks/
│   ├── rds/
│   ├── redis/
│   ├── s3/
│   └── monitoring/
├── main.tf           # Main configuration
├── variables.tf      # Input variables
├── outputs.tf        # Output values
└── terraform.tfvars  # Default values
```

## Prerequisites

- Terraform >= 1.5
- AWS CLI configured with credentials
- kubectl for Kubernetes cluster access

## Quick Start

### Initialize Terraform

```bash
cd infrastructure/terraform
terraform init
```

### Plan Changes

```bash
# Development
terraform plan -var-file=environments/development/terraform.tfvars

# Production
terraform plan -var-file=environments/production/terraform.tfvars
```

### Apply Changes

```bash
# Development
terraform apply -var-file=environments/development/terraform.tfvars

# Production (requires approval)
terraform apply -var-file=environments/production/terraform.tfvars
```

### Destroy Resources (DANGER!)

```bash
terraform destroy -var-file=environments/production/terraform.tfvars
```

## Modules

### VPC Module

Creates network infrastructure:

- VPC with public and private subnets
- NAT Gateway for private subnet internet access
- Internet Gateway
- Route tables
- Security groups

**Usage:**

```hcl
module "vpc" {
  source = "./modules/vpc"

  environment = "production"
  vpc_cidr    = "10.0.0.0/16"
  azs         = ["us-east-1a", "us-east-1b", "us-east-1c"]
}
```

### EKS Module

Creates Kubernetes cluster:

- EKS control plane
- Node groups with auto-scaling
- IAM roles and policies
- Cluster autoscaler
- AWS Load Balancer Controller

**Usage:**

```hcl
module "eks" {
  source = "./modules/eks"

  cluster_name    = "fieldday-production"
  cluster_version = "1.28"
  vpc_id          = module.vpc.vpc_id
  subnet_ids      = module.vpc.private_subnet_ids
}
```

### RDS Module

Creates PostgreSQL database:

- RDS PostgreSQL instance
- Multi-AZ deployment
- Automated backups
- Parameter groups
- Security groups

**Usage:**

```hcl
module "rds" {
  source = "./modules/rds"

  identifier     = "fieldday-production"
  engine_version = "15.4"
  instance_class = "db.r6g.xlarge"
  storage_size   = 100
  multi_az       = true
}
```

### Redis Module

Creates ElastiCache Redis cluster:

- Redis cluster with replication
- Parameter groups
- Security groups
- Automatic failover

**Usage:**

```hcl
module "redis" {
  source = "./modules/redis"

  cluster_id     = "fieldday-production"
  node_type      = "cache.r6g.large"
  num_cache_nodes = 2
}
```

### S3 Module

Creates S3 buckets with CDN:

- S3 buckets for assets
- CloudFront distribution
- Lifecycle policies
- Versioning and encryption

**Usage:**

```hcl
module "s3" {
  source = "./modules/s3"

  bucket_name = "fieldday-production-assets"
  enable_cdn  = true
}
```

## State Management

Terraform state is stored remotely in S3 with DynamoDB locking:

```hcl
terraform {
  backend "s3" {
    bucket         = "fieldday-terraform-state"
    key            = "production/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    dynamodb_table = "terraform-state-lock"
  }
}
```

## Environment Configurations

### Development

- Smaller instance sizes
- Single AZ deployments
- Minimal redundancy
- Cost-optimized

### Staging

- Production-like configuration
- Multi-AZ for testing
- Moderate redundancy

### Production

- High availability (Multi-AZ)
- Auto-scaling enabled
- Full redundancy
- Performance-optimized

## Security Best Practices

1. **Secrets**: Never commit secrets to Git
2. **State**: Use remote state with encryption
3. **IAM**: Follow least-privilege principle
4. **Encryption**: Enable encryption at rest and in transit
5. **Network**: Use private subnets for databases
6. **Logging**: Enable CloudTrail and VPC Flow Logs

## Cost Optimization

- Use Reserved Instances for predictable workloads
- Enable auto-scaling to match demand
- Use S3 lifecycle policies
- Monitor with AWS Cost Explorer
- Tag all resources for cost allocation

## Disaster Recovery

### Backup Strategy

- RDS automated backups (30-day retention)
- Point-in-time recovery enabled
- Cross-region replication for critical data
- S3 versioning enabled

### Recovery Procedures

1. Database restore from snapshot
2. Kubernetes cluster recreation
3. Application redeployment
4. DNS failover (if multi-region)

## Monitoring

### CloudWatch Alarms

- High CPU/memory usage
- Low disk space
- Database connection errors
- High error rates

### Dashboards

- Infrastructure health
- Database performance
- Cache hit rates
- Cost tracking

## Related

- [Infrastructure Overview](../README.md)
- [Kubernetes](../kubernetes/README.md)
- [Docker](../docker/README.md)
