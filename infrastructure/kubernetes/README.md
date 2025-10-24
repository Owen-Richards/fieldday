# Kubernetes Manifests

Production-ready Kubernetes configurations for FieldDay services.

## Directory Structure

```
kubernetes/
├── base/              # Base manifests (environment-agnostic)
│   ├── api/
│   ├── discovery/
│   ├── conditions/
│   ├── payments/
│   └── messaging/
├── overlays/          # Environment-specific overlays
│   ├── development/
│   ├── staging/
│   └── production/
├── helm/              # Helm charts
│   └── fieldday/
└── scripts/           # Deployment scripts
```

## Quick Start

### Using kubectl

```bash
# Apply base configuration
kubectl apply -k base/

# Apply environment-specific overlay
kubectl apply -k overlays/production/

# Check deployment status
kubectl get pods -n fieldday-production

# View logs
kubectl logs -f deployment/api -n fieldday-production

# Port forward for local testing
kubectl port-forward svc/api 8080:80 -n fieldday-production
```

### Using Helm

```bash
# Add FieldDay Helm repository
helm repo add fieldday ./helm

# Install/upgrade release
helm upgrade --install fieldday fieldday/fieldday \
  --namespace fieldday-production \
  --create-namespace \
  --values ./helm/fieldday/values-production.yaml

# List releases
helm list -n fieldday-production

# Rollback to previous version
helm rollback fieldday 1 -n fieldday-production
```

## Namespaces

- `fieldday-production`: Live production environment
- `fieldday-staging`: Pre-production testing
- `fieldday-development`: Development environment

## Resources

### Deployments

Each microservice has its own deployment with:

- Multiple replicas for high availability
- Resource requests and limits
- Liveness and readiness probes
- Rolling update strategy
- Pod disruption budgets

### Services

- ClusterIP for internal communication
- LoadBalancer for external APIs
- Headless services for stateful workloads

### Ingress

- NGINX or AWS ALB Ingress Controller
- TLS termination with cert-manager
- Path-based routing to services
- Rate limiting and WAF rules

### ConfigMaps & Secrets

- ConfigMaps for non-sensitive configuration
- Secrets for credentials, API keys
- External Secrets Operator for cloud secret management

### Autoscaling

- Horizontal Pod Autoscaler (HPA) based on CPU/memory/custom metrics
- Vertical Pod Autoscaler (VPA) for resource optimization
- Cluster Autoscaler for node scaling

## Monitoring

### Prometheus

```yaml
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: api
spec:
  selector:
    matchLabels:
      app: api
  endpoints:
    - port: metrics
      interval: 30s
```

### Datadog

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: datadog-config
data:
  dd_agent_config: |
    logs_enabled: true
    apm_enabled: true
```

## Best Practices

1. **Resource Limits**: Always set resource requests and limits
2. **Health Checks**: Configure liveness and readiness probes
3. **Pod Disruption Budgets**: Ensure availability during updates
4. **Network Policies**: Restrict pod-to-pod communication
5. **Secrets**: Never commit secrets to Git (use External Secrets)
6. **Labels**: Use consistent labeling for monitoring and alerts
7. **Namespaces**: Isolate environments with namespaces
8. **RBAC**: Implement least-privilege access control

## Troubleshooting

### Pod not starting

```bash
# Check pod events
kubectl describe pod <pod-name> -n fieldday-production

# Check logs
kubectl logs <pod-name> -n fieldday-production

# Check previous container logs (if crashed)
kubectl logs <pod-name> --previous -n fieldday-production
```

### Service not accessible

```bash
# Check service endpoints
kubectl get endpoints <service-name> -n fieldday-production

# Check ingress
kubectl describe ingress -n fieldday-production

# Test from within cluster
kubectl run -it --rm debug --image=curlimages/curl --restart=Never -- sh
curl http://<service-name>.<namespace>.svc.cluster.local
```

### High resource usage

```bash
# Check resource usage
kubectl top pods -n fieldday-production
kubectl top nodes

# Check HPA status
kubectl get hpa -n fieldday-production
```

## Related

- [Infrastructure Overview](../README.md)
- [Helm Charts](./helm/README.md)
- [Terraform](../terraform/README.md)
