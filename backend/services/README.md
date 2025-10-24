# Backend Services

Microservices powering specific domains of the FieldDay platform.

## Purpose

Specialized services handling distinct business capabilities with clear boundaries and independent deployment.

## Service Architecture

Each service follows a consistent structure:

```
service-name/
├── src/
│   ├── handlers/      # Request handlers
│   ├── models/        # Data models
│   ├── utils/         # Utility functions
│   ├── config/        # Configuration
│   └── index.ts       # Service entry point
├── tests/             # Service tests
├── Dockerfile         # Container definition
└── package.json       # Dependencies
```

## Services

### 1. Discovery Service

**Path**: `backend/services/discovery`

Fast session matching engine with geospatial search.

**Key Features**:

- Sub-200ms response time (p95)
- PostGIS spatial queries
- Multi-criteria filtering
- Relevance scoring
- Redis caching

**Endpoints**:

- `GET /discover` - Find nearby sessions
- `GET /trending` - Popular sessions in area

---

### 2. Conditions Service

**Path**: `backend/services/conditions`

Real-time weather and marine data integration.

**Key Features**:

- Weather API integration
- Marine condition monitoring (NOAA)
- Tide predictions
- Safety threshold checks
- Historical data storage (TimescaleDB)

**Endpoints**:

- `GET /conditions/:location` - Current conditions
- `GET /forecast/:location` - Conditions forecast
- `GET /history/:location` - Historical data

---

### 3. Payments Service

**Path**: `backend/services/payments`

Financial transaction processing with Stripe Connect.

**Key Features**:

- Stripe integration
- Payment processing
- Payout management
- Refund handling
- Transaction history
- 1099 generation

**Endpoints**:

- `POST /charges` - Process payment
- `POST /refunds` - Issue refund
- `GET /payouts` - List payouts
- `POST /webhooks/stripe` - Stripe webhooks

---

### 4. Messaging Service

**Path**: `backend/services/messaging`

Real-time chat and notifications.

**Key Features**:

- WebSocket connections
- Direct messaging (adult-to-adult)
- Team channels
- Push notifications (FCM)
- Email/SMS integration
- Guardian visibility for youth

**Endpoints**:

- `WS /connect` - WebSocket connection
- `POST /messages` - Send message
- `GET /channels/:id/messages` - Message history
- `POST /notifications` - Send notification

---

### 5. Float Plan Service

**Path**: `backend/services/float-plan`

Water sports safety management.

**Key Features**:

- Float plan creation
- Check-in tracking
- Emergency contact management
- Overdue alerts
- MPA violation checking

**Endpoints**:

- `POST /float-plans` - Create float plan
- `PUT /float-plans/:id/check-in` - Check in
- `GET /float-plans/:id` - Get float plan details
- `POST /float-plans/:id/emergency` - Trigger emergency

---

### 6. Reliability Service

**Path**: `backend/services/reliability`

User reliability score calculation and tracking.

**Key Features**:

- Attendance tracking
- Punctuality monitoring
- Score calculation (0-100)
- Badge progression
- Leaderboards

**Algorithm**:

```
Score = (Attendance × 40%) +
        (Punctuality × 30%) +
        (Cancellation Penalty × 20%) +
        (Incident-Free × 10%)
```

**Endpoints**:

- `GET /reliability/:userId` - Get user score
- `POST /reliability/track` - Track attendance
- `GET /badges/:userId` - Get user badges

---

### 7. Calendar Service

**Path**: `backend/services/calendar`

Native calendar integration.

**Key Features**:

- iCal/CalDAV support
- Google Calendar API
- Apple Calendar sync
- Event CRUD operations
- Reminder configuration

**Endpoints**:

- `POST /calendar/events` - Add event
- `PUT /calendar/events/:id` - Update event
- `DELETE /calendar/events/:id` - Remove event

---

### 8. Analytics Service

**Path**: `backend/services/analytics`

Event tracking and user analytics.

**Key Features**:

- High-volume event ingestion
- User property tracking
- Funnel analysis
- A/B test variant assignment
- Custom reports

**Endpoints**:

- `POST /events` - Track event
- `POST /user-properties` - Update user properties
- `GET /funnels/:funnelId` - Get funnel data
- `GET /experiments/:experimentId` - Get experiment results

---

## Common Patterns

### Service Communication

Services communicate via:

- **REST APIs**: For synchronous requests
- **Message Queues** (Bull/Redis): For async operations
- **Events** (pub/sub): For real-time updates

```typescript
// Example: Publishing an event
import { eventBus } from '@fieldday/events';

eventBus.publish('session.joined', {
  sessionId: 'xxx',
  userId: 'yyy',
  timestamp: Date.now(),
});

// Example: Subscribing to events
eventBus.subscribe('session.joined', async (data) => {
  await notificationService.notifyOrganizer(data);
});
```

### Error Handling

```typescript
try {
  const result = await operation();
  return result;
} catch (error) {
  logger.error('Operation failed', {
    service: 'discovery',
    operation: 'discover',
    error: error.message,
    stack: error.stack,
    context: {
      /* relevant data */
    },
  });

  throw new ServiceError('Discovery failed', 'DISCOVERY_ERROR', 500);
}
```

### Configuration Management

```typescript
// config/index.ts
import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const configSchema = z.object({
  PORT: z.string().default('3000'),
  DATABASE_URL: z.string(),
  REDIS_URL: z.string(),
  STRIPE_SECRET_KEY: z.string(),
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
});

export const config = configSchema.parse(process.env);
```

### Health Checks

```typescript
// Every service exposes health check endpoint
app.get('/health', async (req, res) => {
  try {
    // Check database connection
    await db.query('SELECT 1');

    // Check Redis connection
    await redis.ping();

    res.json({
      status: 'healthy',
      service: 'discovery',
      timestamp: Date.now(),
      version: process.env.VERSION,
    });
  } catch (error) {
    res.status(503).json({
      status: 'unhealthy',
      error: error.message,
    });
  }
});
```

## Development

### Running Services Locally

```bash
# Start all services
docker-compose up -d

# Run specific service
cd backend/services/discovery
npm install
npm run dev

# Run with hot reload
npm run dev:watch
```

### Docker Compose

```yaml
# docker-compose.yml
version: '3.8'

services:
  discovery:
    build: ./services/discovery
    ports:
      - '3001:3000'
    environment:
      - DATABASE_URL=postgresql://user:pass@postgres:5432/fieldday
      - REDIS_URL=redis://redis:6379
    depends_on:
      - postgres
      - redis

  payments:
    build: ./services/payments
    ports:
      - '3002:3000'
    environment:
      - DATABASE_URL=postgresql://user:pass@postgres:5432/fieldday
      - STRIPE_SECRET_KEY=${STRIPE_SECRET_KEY}
    depends_on:
      - postgres

  postgres:
    image: postgis/postgis:15
    ports:
      - '5432:5432'
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
      - POSTGRES_DB=fieldday

  redis:
    image: redis:7-alpine
    ports:
      - '6379:6379'
```

## Testing

### Unit Tests

```typescript
// tests/discovery.test.ts
import { discoverSessions } from '../src/handlers/discover';

describe('Discovery Service', () => {
  it('returns sessions within radius', async () => {
    const result = await discoverSessions({
      location: { lat: 37.7749, lng: -122.4194 },
      radius: 5,
      sport: 'SOCCER',
    });

    expect(result).toHaveLength(5);
    result.forEach((session) => {
      expect(session.distance).toBeLessThanOrEqual(5);
    });
  });

  it('meets performance SLA', async () => {
    const startTime = Date.now();

    await discoverSessions({
      location: { lat: 37.7749, lng: -122.4194 },
      radius: 10,
    });

    const duration = Date.now() - startTime;
    expect(duration).toBeLessThan(200);
  });
});
```

### Integration Tests

```typescript
// tests/integration/payments.test.ts
import request from 'supertest';
import { app } from '../src/index';

describe('Payments Service Integration', () => {
  it('processes payment and returns transaction', async () => {
    const response = await request(app)
      .post('/charges')
      .send({
        amount: 1000, // $10.00
        currency: 'usd',
        paymentMethodId: 'pm_test_visa',
        customerId: 'cus_test_123',
      })
      .expect(200);

    expect(response.body.status).toBe('succeeded');
    expect(response.body.amount).toBe(1000);
  });
});
```

### Load Testing

```javascript
// tests/load/discovery.k6.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '30s', target: 100 }, // Ramp up to 100 users
    { duration: '1m', target: 100 }, // Stay at 100 users
    { duration: '30s', target: 0 }, // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<200'], // 95% of requests < 200ms
  },
};

export default function () {
  const response = http.get('http://localhost:3001/discover', {
    params: {
      lat: 37.7749,
      lng: -122.4194,
      radius: 5,
      sport: 'SOCCER',
    },
  });

  check(response, {
    'status is 200': (r) => r.status === 200,
    'response time < 200ms': (r) => r.timings.duration < 200,
  });

  sleep(1);
}
```

## Deployment

### Kubernetes

```yaml
# k8s/discovery-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: discovery-service
spec:
  replicas: 3
  selector:
    matchLabels:
      app: discovery
  template:
    metadata:
      labels:
        app: discovery
    spec:
      containers:
        - name: discovery
          image: fieldday/discovery:latest
          ports:
            - containerPort: 3000
          env:
            - name: DATABASE_URL
              valueFrom:
                secretKeyRef:
                  name: db-credentials
                  key: url
          resources:
            requests:
              memory: '256Mi'
              cpu: '200m'
            limits:
              memory: '512Mi'
              cpu: '500m'
          livenessProbe:
            httpGet:
              path: /health
              port: 3000
            initialDelaySeconds: 30
            periodSeconds: 10
```

## Monitoring

### Prometheus Metrics

```typescript
// utils/metrics.ts
import { Counter, Histogram, Registry } from 'prom-client';

export const register = new Registry();

export const httpRequestDuration = new Histogram({
  name: 'http_request_duration_ms',
  help: 'Duration of HTTP requests in ms',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [10, 50, 100, 200, 500, 1000, 2000],
  registers: [register],
});

export const httpRequestTotal = new Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code'],
  registers: [register],
});

// Expose metrics endpoint
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});
```

## Related

- [Backend Overview](../README.md)
- [API Gateway](../api/README.md)
- [Mobile App](../../apps/mobile/README.md)
