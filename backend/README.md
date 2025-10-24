# Backend Services

Microservices and API gateway powering the FieldDay platform.

## Purpose

Provide scalable, reliable, and secure backend infrastructure for mobile and web applications with specialized services for each domain.

## Architecture

### API Gateway

- **GraphQL Gateway**: Unified API for client applications
- **REST Endpoints**: Webhooks, integrations, simple CRUD
- **Authentication**: JWT validation, session management
- **Rate Limiting**: Tier-based limits (player/organizer/facility)
- **Request Logging**: Structured logs for debugging and analytics

### Microservices Architecture

Loosely coupled services communicating via REST APIs and message queues.

## Service Categories

### Core Services

#### 1. Discovery Service

**Purpose**: Fast session matching engine (<200ms p95)

**Features**:

- Geospatial search with PostGIS
- Multi-criteria filtering (sport, time, skill, price)
- Relevance scoring and ranking
- Cache warming for popular searches
- Real-time availability updates

**Tech Stack**: Node.js, PostgreSQL + PostGIS, Redis

**Performance Optimization**:

- Spatial indexes for location queries
- Redis caching (5min TTL)
- Query result pagination
- Background index updates

---

#### 2. Conditions Service

**Purpose**: Real-time weather and water condition monitoring

**Features**:

- Weather API integration (OpenWeather, Weather.com)
- Marine data (NOAA, Surfline)
- Tide predictions
- Wind/wave/swell monitoring
- Visibility tracking (spearfishing)
- Auto-cancel triggers based on thresholds
- Historical condition data (TimescaleDB)

**Tech Stack**: Node.js, TimescaleDB, Redis

**Data Sources**:

- NOAA Marine API
- OpenWeather API
- Surfline API
- Tide prediction APIs

---

#### 3. Payments Service

**Purpose**: Handle all financial transactions with Stripe Connect

**Features**:

- Payment processing (credit card, Apple Pay, Google Pay)
- Stripe Connect onboarding for organizers/facilities
- Deposit collection and holds
- Automatic payouts
- Refund processing with policy enforcement
- Transaction history and receipts
- 1099 tax form generation
- Split payments and promo codes

**Tech Stack**: Node.js, PostgreSQL, Stripe API

**Security**:

- PCI compliance via Stripe
- Idempotency keys for all transactions
- Webhook verification
- Audit trail for all transactions

---

#### 4. Messaging Service

**Purpose**: Real-time chat and notifications

**Features**:

- WebSocket connections (Socket.io)
- Direct messages (adult-to-adult only)
- Team/group channels
- Guardian-visible youth channels
- Push notifications (FCM)
- Email notifications (Resend/SendGrid)
- SMS alerts (Twilio)
- Message history and search

**Tech Stack**: Node.js, Redis (pub/sub), PostgreSQL, Socket.io

**Safety Features**:

- Adult-to-minor DM blocking
- Profanity filtering
- Spam detection
- Report/block functionality

---

#### 5. Authentication Service

**Purpose**: User authentication and authorization

**Features**:

- JWT token generation and validation
- Refresh token rotation
- Biometric authentication (mobile)
- OAuth integrations (Google, Apple, Facebook)
- Multi-factor authentication (2FA)
- Session management
- Password reset flows
- Role-based access control (RBAC)

**Tech Stack**: Node.js, PostgreSQL, Redis (token store)

**Security**:

- bcrypt password hashing
- Rate limiting on login attempts
- Session invalidation on logout
- Token expiration (15min access, 7day refresh)

---

### Supporting Services

#### 6. Reliability Service

**Purpose**: Calculate and track user reliability scores

**Features**:

- Attendance tracking
- Punctuality monitoring
- Cancellation penalties
- Incident-free rate calculation
- Score decay function
- Badge progression
- Leaderboards (optional)

**Algorithm**:

```
Reliability Score (0-100) =
  (Attendance Rate × 40) +
  (Punctuality Rate × 30) +
  (Cancellation Penalty × 20) +
  (Incident-Free Rate × 10)
```

**Tech Stack**: Node.js, PostgreSQL

---

#### 7. Calendar Service

**Purpose**: Sync sessions to native device calendars

**Features**:

- iCal/CalDAV integration
- Google Calendar API
- Apple Calendar sync
- Event creation and updates
- Reminder configuration
- Timezone handling
- Conflict detection

**Tech Stack**: Node.js, PostgreSQL

---

#### 8. Float Plan Service

**Purpose**: Water sports safety management

**Features**:

- Float plan creation and storage
- Emergency contact management
- Check-in timer reminders
- Overdue alerts (notify emergency contacts)
- VHF channel tracking
- GPS location sharing
- MPA (Marine Protected Area) violation checks
- SAR (Search and Rescue) integration

**Tech Stack**: Node.js, PostgreSQL, Redis

---

#### 9. Analytics Service

**Purpose**: Event tracking and user analytics

**Features**:

- Event ingestion (high volume)
- User property tracking
- Funnel analysis
- Cohort analysis
- A/B test variant assignment
- Real-time dashboards
- Custom report generation

**Tech Stack**: Node.js, ClickHouse or BigQuery, Redis

---

#### 10. Notification Service

**Purpose**: Multi-channel notification delivery

**Features**:

- Push notifications (FCM)
- Email (Resend/SendGrid)
- SMS (Twilio)
- In-app notifications
- Notification preferences
- Delivery status tracking
- Rate limiting per user
- Template management

**Tech Stack**: Node.js, PostgreSQL, Redis (queue)

---

### Integration Services

#### 11. Facility Integration Service

**Purpose**: Sync with external facility management systems

**Supported Systems**:

- CourtReserve
- EZFacility
- PerfectMind
- Jonas Club Management
- Club Automation

**Features**:

- Bi-directional booking sync
- Real-time availability updates
- Member verification
- Payment reconciliation

---

#### 12. Background Check Service

**Purpose**: Coach and staff verification

**Providers**:

- Checkr
- Sterling
- GoodHire

**Features**:

- Background check initiation
- Status polling and updates
- Expiration tracking
- Parent-visible verification status

---

#### 13. Email/SMS Service

**Purpose**: Transactional communication

**Features**:

- Template management (Handlebars)
- Personalization and variables
- Delivery tracking (opens, clicks)
- Bounce and spam handling
- Unsubscribe management
- Compliance (CAN-SPAM, GDPR)

**Tech Stack**: Node.js, Resend or SendGrid, Twilio

---

## Database Architecture

### PostgreSQL (Primary)

- **Users**: Profiles, auth, preferences
- **Sessions**: Pickups, leagues, clinics
- **Registrations**: Enrollments and attendance
- **Transactions**: Payments, refunds, payouts
- **Venues**: Facilities and assets
- **Messages**: Chat history

**Extensions**:

- PostGIS for geospatial queries
- pg_cron for scheduled tasks
- uuid-ossp for UUID generation

### Redis (Caching & Queues)

- Session discovery cache (5min TTL)
- Rate limiting counters
- Real-time presence
- Message queues (Bull)
- WebSocket pub/sub

### TimescaleDB (Time-Series)

- Weather/water condition history
- Analytics events
- Performance metrics
- Audit logs

### S3 (Object Storage)

- User profile photos
- Medical cards
- Document storage (waivers, insurance)
- Receipt PDFs

## API Design

### GraphQL Schema

```graphql
type Query {
  # Discovery
  discoverSessions(filter: SessionFilter!): [Session!]!
  session(id: ID!): Session

  # User
  me: User!
  user(id: ID!): User

  # Conditions
  conditions(location: Location!, sport: Sport!): Conditions!

  # Reliability
  reliabilityScore(userId: ID!): ReliabilityScore!
}

type Mutation {
  # Authentication
  login(email: String!, password: String!): AuthPayload!
  refreshToken(token: String!): AuthPayload!

  # Sessions
  createSession(input: CreateSessionInput!): Session!
  joinSession(sessionId: ID!, paymentMethodId: String): Registration!
  leaveSession(sessionId: ID!): Boolean!

  # Payments
  createPaymentMethod(input: PaymentMethodInput!): PaymentMethod!
  processPayment(registrationId: ID!, paymentMethodId: ID!): Transaction!

  # Float Plans
  createFloatPlan(input: FloatPlanInput!): FloatPlan!
  checkInFloatPlan(id: ID!): Boolean!
}

type Subscription {
  sessionUpdated(sessionId: ID!): Session!
  messageReceived(channelId: ID!): Message!
  conditionsChanged(location: Location!): Conditions!
}
```

### REST Endpoints

```
POST   /api/v1/auth/login
POST   /api/v1/auth/refresh
POST   /api/v1/auth/logout

GET    /api/v1/sessions/discover
GET    /api/v1/sessions/:id
POST   /api/v1/sessions
PUT    /api/v1/sessions/:id
DELETE /api/v1/sessions/:id

POST   /api/v1/webhooks/stripe
POST   /api/v1/webhooks/facility/:provider
```

## Performance Targets

- **Session Discovery**: <200ms p95
- **Payment Processing**: <3s
- **API Response Time**: <100ms p95 (cached), <500ms p95 (database)
- **WebSocket Latency**: <100ms
- **Throughput**: 10,000 requests/second (peak)

## Security

### Authentication

- JWT with RS256 signing
- Short-lived access tokens (15min)
- Long-lived refresh tokens (7 days)
- Secure HTTP-only cookies for web

### Authorization

- Role-based access control (RBAC)
- Resource-level permissions
- Guardian approval for youth actions
- API key authentication for integrations

### Data Protection

- Encryption at rest (AES-256)
- Encryption in transit (TLS 1.3)
- PII redaction in logs
- GDPR compliance (right to deletion)
- COPPA compliance (youth data)

### Rate Limiting

```
Player: 100 req/min
Organizer: 500 req/min
Facility: 1000 req/min
Admin: 5000 req/min
```

## Monitoring & Observability

### Logging

- Structured JSON logs (Pino)
- Centralized log aggregation (Datadog, CloudWatch)
- Request ID tracing
- Error tracking (Sentry)

### Metrics

- Prometheus metrics export
- Grafana dashboards
- SLA monitoring
- Alerting (PagerDuty, Opsgenie)

### Tracing

- Distributed tracing (Jaeger, Datadog APM)
- Performance profiling
- Database query analysis

## Deployment

### Infrastructure

- **Cloud Provider**: AWS or GCP
- **Container Orchestration**: Kubernetes (EKS/GKE)
- **Database**: RDS PostgreSQL + ElastiCache Redis
- **Load Balancer**: ALB or Cloud Load Balancer
- **CDN**: CloudFront or Cloud CDN

### CI/CD

- GitHub Actions for CI
- Docker containers
- Helm charts for Kubernetes
- Blue-green deployments
- Automated rollback on errors

## Development

### Running Locally

```bash
cd backend
npm install

# Start all services
docker-compose up -d

# Run API gateway
npm run dev:api

# Run specific service
npm run dev:discovery
npm run dev:payments
```

### Environment Variables

```env
DATABASE_URL=postgresql://user:pass@localhost:5432/fieldday
REDIS_URL=redis://localhost:6379
JWT_SECRET=xxx
STRIPE_SECRET_KEY=sk_test_xxx
OPENWEATHER_API_KEY=xxx
NOAA_API_KEY=xxx
SENDGRID_API_KEY=xxx
TWILIO_ACCOUNT_SID=xxx
TWILIO_AUTH_TOKEN=xxx
```

### Testing

```bash
npm run test              # Unit tests
npm run test:integration  # Integration tests
npm run test:e2e          # End-to-end tests
npm run test:load         # Load testing (k6)
```

## Related

- [API Documentation](./api/README.md)
- [Mobile App](../apps/mobile/README.md)
- [Web Apps](../apps/web/README.md)
- [Architecture Overview](../docs/ARCHITECTURE.md)
