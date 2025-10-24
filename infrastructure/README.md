# Infrastructure

Infrastructure as Code (IaC) for FieldDay platform deployment and operations.

## Directory Structure

```
infrastructure/
├── docker/           # Docker configurations
├── kubernetes/       # Kubernetes manifests and Helm charts
└── terraform/        # Terraform configurations for cloud resources
```

## Docker

Container definitions for local development and production deployments.

### Services

- **API Gateway**: GraphQL/REST API
- **Discovery Service**: Session matching engine
- **Conditions Service**: Weather/water monitoring
- **Payments Service**: Stripe Connect integration
- **Messaging Service**: Real-time chat
- **Auth Service**: Authentication & authorization
- **Reliability Service**: Score tracking
- **Calendar Service**: Calendar sync
- **Float Plan Service**: Water sports safety
- **Analytics Service**: Event tracking
- **Notification Service**: Push/email/SMS
- **Background Jobs**: Cron tasks

### Usage

```bash
# Start all services
docker-compose up -d

# Start specific service
docker-compose up api

# View logs
docker-compose logs -f api

# Stop all services
docker-compose down
```

## Kubernetes

Production-ready Kubernetes manifests and Helm charts.

### Components

- **Deployments**: Service definitions with replicas
- **Services**: Internal networking
- **Ingress**: External routing (ALB/NGINX)
- **ConfigMaps**: Non-sensitive configuration
- **Secrets**: Sensitive credentials
- **HPA**: Horizontal Pod Autoscaling
- **PDB**: Pod Disruption Budgets
- **NetworkPolicies**: Service mesh security

### Namespaces

- `production`: Live production environment
- `staging`: Pre-production testing
- `development`: Dev environment

### Helm Charts

Custom Helm charts for FieldDay services:

```bash
# Install/upgrade release
helm upgrade --install fieldday-api ./helm/api \
  --namespace production \
  --values ./helm/api/values-production.yaml

# List releases
helm list --all-namespaces

# Rollback
helm rollback fieldday-api 1
```

## Terraform

Cloud infrastructure provisioning for AWS/GCP.

### Resources

#### Compute

- **EKS/GKE**: Kubernetes cluster
- **EC2/Compute Engine**: Jump boxes, bastion hosts
- **Lambda/Cloud Functions**: Serverless functions

#### Networking

- **VPC**: Virtual Private Cloud
- **Subnets**: Public/private network segmentation
- **NAT Gateway**: Outbound internet for private subnets
- **Load Balancers**: ALB/NLB for traffic distribution
- **CloudFront/Cloud CDN**: Content delivery

#### Data

- **RDS PostgreSQL**: Primary database
- **ElastiCache Redis**: Caching layer
- **S3/Cloud Storage**: Object storage
- **CloudWatch/Cloud Logging**: Logs and metrics

#### Security

- **IAM**: Identity and access management
- **KMS**: Key management
- **Secrets Manager**: Sensitive credentials
- **WAF**: Web application firewall
- **Security Groups**: Firewall rules

### Environment Management

```bash
cd infrastructure/terraform

# Initialize
terraform init

# Plan changes
terraform plan -var-file=environments/production.tfvars

# Apply changes
terraform apply -var-file=environments/production.tfvars

# Destroy (DANGER!)
terraform destroy -var-file=environments/production.tfvars
```

### Modules

Reusable Terraform modules for common patterns:

- `modules/vpc`: Network infrastructure
- `modules/eks`: Kubernetes cluster
- `modules/rds`: PostgreSQL database
- `modules/redis`: ElastiCache setup
- `modules/s3`: Object storage with CDN
- `modules/monitoring`: CloudWatch/Datadog setup

## Monitoring & Observability

### Metrics (Prometheus/CloudWatch)

- Request rate, latency, error rate (RED metrics)
- CPU, memory, disk usage
- Database connections, query performance
- Cache hit/miss ratios
- Queue depths

### Logging (Datadog/ELK)

- Structured JSON logs with request IDs
- Error tracking with stack traces
- Audit logs for sensitive operations
- Performance profiling

### Tracing (Jaeger/Datadog APM)

- Distributed tracing across services
- Database query analysis
- External API call tracking

### Alerts

- High error rates (>1%)
- Slow responses (p95 > 500ms)
- Low disk space (<20%)
- High CPU/memory (>80%)
- Database connection pool exhaustion
- Payment failures

## CI/CD Pipeline

### GitHub Actions Workflows

1. **Build**: Lint, test, build Docker images
2. **Security Scan**: Dependency vulnerabilities, SAST
3. **Deploy Staging**: Auto-deploy to staging on merge to `main`
4. **Integration Tests**: Run E2E tests in staging
5. **Deploy Production**: Manual approval for production
6. **Rollback**: Automated rollback on health check failure

### Deployment Strategy

- **Blue-Green**: Zero-downtime deployments
- **Canary**: Gradual rollout with traffic shifting
- **Rolling**: Sequential pod replacement

## Disaster Recovery

### Backups

- **Database**: Automated daily snapshots (30-day retention)
- **Redis**: AOF persistence with replication
- **S3**: Cross-region replication

### Recovery Time Objective (RTO)

- Critical services: < 1 hour
- Non-critical services: < 4 hours

### Recovery Point Objective (RPO)

- Transactional data: < 5 minutes
- Analytics data: < 1 hour

## Security

### Network Security

- Private subnets for databases and services
- Jump boxes for SSH access
- VPN for administrative access
- Network policies for pod-to-pod communication

### Application Security

- OAuth 2.0 / OIDC for authentication
- JWT tokens with short expiration
- Rate limiting per user/IP
- Input validation and sanitization
- SQL injection prevention (parameterized queries)
- XSS protection (Content Security Policy)

### Compliance

- GDPR: Data encryption, right to deletion
- COPPA: Youth data protection
- PCI DSS: Payment data security (via Stripe)
- SOC 2: Security controls and auditing

## Scaling Strategy

### Horizontal Scaling

- Auto-scaling based on CPU/memory/request rate
- Min 2 replicas for high availability
- Max replicas based on load testing

### Vertical Scaling

- Pod resource requests/limits tuned per service
- Database instance sizing based on workload

### Caching Strategy

- Session discovery: 5min TTL
- User profiles: 15min TTL
- Conditions data: 10min TTL
- Static assets: CDN with long cache

## Cost Optimization

- Reserved instances for predictable workloads
- Spot instances for batch jobs
- Auto-scaling to match demand
- S3 lifecycle policies for old data
- RDS snapshot retention policies

## Related Documentation

- [Architecture Overview](../docs/ARCHITECTURE.md)
- [Backend Services](../backend/README.md)
- [Deployment Runbook](./runbooks/deployment.md)
- [Incident Response](./runbooks/incident-response.md)
