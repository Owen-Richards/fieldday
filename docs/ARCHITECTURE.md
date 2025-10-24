# FieldDay Architecture

## Mission & Vision

**Mission**: Play anything, anywhere, with people you trust.

FieldDay is building a defensible, multi-modal **Sports OS** that unifies four critical verticals:

1. **Adult Pickup Games** - Instant discovery (<200ms) and joining (<20s end-to-end)
2. **Water Sports Partner-Finding** - Condition-aware matching with real-time weather/water data
3. **Youth Sports Logistics** - Family OS for multi-child households with carpool coordination
4. **Facility Management** - Inventory optimization with dynamic pricing and utilization analytics

**Core Differentiation**: A trust-first **Reliability/Skill/Conditions Graph** that creates a data moat:

- **Reliability Graph**: 0-100 score (attendance, punctuality, incident-free rate)
- **Skill Graph**: 1-10 per-sport levels with coach verification
- **Conditions Graph**: Real-time + historical weather/water data for safety
- **City-by-City Playbook**: Local trust networks = hard to replicate

This leads to superior **liquidity** (faster matching), **retention** (reliability reduces no-shows), and **margins** (city-level defensibility).

## Overview

FieldDay is a comprehensive Sports OS platform built as a monorepo with multiple applications and services working together to enable instant pickup games, partner-finding for water sports, youth logistics, and facility management.

## Repository Structure

```
fieldday/
├── apps/
│   ├── mobile/                    # React Native mobile app
│   │   ├── ios/                  # Swift iOS native code
│   │   ├── android/              # Kotlin Android native code
│   │   └── shared/               # Shared React Native components
│   │       ├── components/       # UI components
│   │       ├── screens/          # Screen components
│   │       ├── navigation/       # Navigation setup
│   │       └── services/         # API clients, storage
│   └── web/
│       ├── marketing/            # Next.js marketing site
│       │   ├── pages/           # Next.js pages
│       │   ├── components/      # React components
│       │   └── public/          # Static assets
│       ├── organizer-console/    # Organizer dashboard (React)
│       │   ├── src/
│       │   │   ├── features/    # Feature-based modules
│       │   │   ├── components/  # Shared components
│       │   │   └── hooks/       # Custom React hooks
│       │   └── public/
│       ├── facility-console/     # Facility management (React)
│       │   └── src/
│       └── family-os/            # Family dashboard (React)
│           └── src/
├── backend/
│   ├── api/                      # API Gateway (Express + GraphQL)
│   │   ├── app.ts               # Express app setup
│   │   ├── schema.graphql       # GraphQL schema
│   │   ├── resolvers/           # GraphQL resolvers
│   │   ├── controllers/         # REST controllers
│   │   ├── middleware/          # Auth, validation, etc.
│   │   └── routes/              # REST routes
│   └── services/                 # Microservices
│       ├── discovery/           # Session matching engine
│       │   ├── src/
│       │   │   ├── algorithms/  # Matching algorithms
│       │   │   ├── scoring/     # Score calculation
│       │   │   └── cache/       # Redis integration
│       │   └── tests/
│       ├── conditions/          # Weather/water data service
│       │   ├── src/
│       │   │   ├── providers/   # Weather API integrations
│       │   │   ├── processors/  # Data processing
│       │   │   └── alerts/      # Safety alerts
│       │   └── tests/
│       ├── payments/            # Stripe Connect integration
│       │   ├── src/
│       │   │   ├── stripe/      # Stripe SDK wrapper
│       │   │   ├── webhooks/    # Webhook handlers
│       │   │   └── payouts/     # Payout logic
│       │   └── tests/
│       └── messaging/           # Real-time chat service
│           ├── src/
│           │   ├── websocket/   # WebSocket server
│           │   ├── guards/      # Safety guards (youth protection)
│           │   └── notifications/ # Push notifications
│           └── tests/
├── packages/
│   ├── shared/                   # Shared domain types and utilities
│   │   ├── types/               # TypeScript type definitions
│   │   │   ├── index.ts        # Main exports
│   │   │   ├── user.ts         # User-related types
│   │   │   ├── session.ts      # Session types
│   │   │   ├── payment.ts      # Payment types
│   │   │   └── ...
│   │   └── utils/               # Utility functions
│   │       ├── validators.ts    # Input validation
│   │       ├── formatters.ts    # Data formatting
│   │       └── calculations.ts  # Business logic calculations
│   ├── ui/                       # Design system
│   │   ├── components/          # React components
│   │   │   ├── Button/
│   │   │   ├── Card/
│   │   │   ├── Input/
│   │   │   └── ...
│   │   ├── styles/              # Theme and global styles
│   │   └── icons/               # Icon components
│   └── config/                   # Shared configurations
│       ├── eslint/              # ESLint config
│       ├── typescript/          # TypeScript config
│       └── jest/                # Jest config
├── infrastructure/               # Infrastructure as Code
│   ├── terraform/               # Terraform configs
│   ├── k8s/                     # Kubernetes manifests
│   └── docker/                  # Dockerfiles
└── docs/                         # Documentation
    ├── api/                     # API documentation
    ├── architecture/            # Architecture diagrams
    └── guides/                  # Development guides
```

## Tech Stack

### Frontend

#### Mobile

- **React Native** - Cross-platform mobile framework
- **TypeScript** - Type safety
- **React Navigation** - Navigation
- **React Query** - Server state management
- **Zustand** - Client state management
- **React Native Maps** - Map integration
- **Stripe React Native SDK** - Payments

#### Web

- **Next.js 14** - React framework (marketing site)
- **React 18** - UI library (dashboards)
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Radix UI** - Accessible components
- **React Query** - Data fetching
- **Apollo Client** - GraphQL client
- **Recharts** - Data visualization

### Backend

#### API Layer

- **Node.js 18+** - Runtime
- **Express.js** - HTTP server
- **Apollo Server** - GraphQL server
- **TypeScript** - Type safety
- **JWT** - Authentication
- **Passport.js** - OAuth strategies

#### Databases

- **PostgreSQL 14** - Primary relational database
  - User accounts, sessions, registrations
  - Transactions, venues, facilities
  - Uses PostGIS extension for geospatial queries
- **Redis 6** - Caching and real-time features
  - Session caching
  - Real-time presence
  - Rate limiting
  - Job queues (Bull)
- **TimescaleDB** - Time-series data
  - Conditions history
  - Analytics events
  - Performance metrics

#### External Services

- **Stripe Connect** - Payment processing
- **Twilio** - SMS notifications
- **SendGrid** - Email
- **Firebase Cloud Messaging** - Push notifications
- **Weather APIs** - NOAA, OpenWeather, Windy
- **AWS S3** - File storage
- **DataDog** - Monitoring
- **Sentry** - Error tracking

### Infrastructure

- **AWS EKS** - Kubernetes cluster
- **AWS RDS** - Managed PostgreSQL
- **AWS ElastiCache** - Managed Redis
- **AWS CloudFront** - CDN
- **GitHub Actions** - CI/CD
- **Docker** - Containerization
- **Terraform** - Infrastructure as Code

## Data Models

### Core Entities

#### User

```typescript
User {
  id: UUID
  email: String (unique)
  username: String (unique)
  roles: UserRole[] (player, organizer, parent, facility, admin)
  profile: UserProfile
  reliability: ReliabilityScore
  createdAt: Timestamp
  updatedAt: Timestamp
  deletedAt: Timestamp? (soft delete)
}

UserProfile {
  firstName: String
  lastName: String
  dateOfBirth: Date?
  phone: String?
  avatar: String? (S3 URL)
  bio: String?
  sports: SportProfile[]
  location: GeoLocation
  preferences: UserPreferences
}

SportProfile {
  sportId: UUID
  skillLevel: 1-10
  yearsExperience: Number
  certifications: String[]
  gear: String[]
}

ReliabilityScore {
  overall: 0-100
  attendance: Number
  punctuality: Number
  cancellations: Number
  lastUpdated: Timestamp
  badges: Badge[]
}
```

#### Session

```typescript
Session {
  id: UUID
  type: SessionType (pickup, league, clinic, ladder, boat, tournament)
  sport: Sport
  title: String
  description: String
  venue: Venue
  organizer: User
  startTime: Timestamp
  endTime: Timestamp
  capacity: Capacity
  pricing: SessionPricing
  requirements: SessionRequirements
  conditions: ConditionRequirements?
  status: SessionStatus
  registrations: Registration[]
  waitlist: WaitlistEntry[]
  createdAt: Timestamp
  updatedAt: Timestamp
  deletedAt: Timestamp?
}

Capacity {
  min: Number
  max: Number
  current: Number
}

SessionPricing {
  amount: Number (cents)
  currency: String (USD, EUR, etc.)
  deposit: Number? (cents)
  refundPolicy: RefundPolicy
  siblingDiscount: Number? (percentage)
  earlyBirdDiscount: Number? (percentage)
}

SessionRequirements {
  ageMin: Number?
  ageMax: Number?
  skillMin: 1-10?
  skillMax: 1-10?
  genderMix: 'any' | 'balanced' | 'separate'
  reliabilityMin: 0-100?
  gear: String[]
  certifications: String[]
  backgroundCheck: Boolean
  insurance: Boolean
}
```

#### Venue & Facility

```typescript
Venue {
  id: UUID
  name: String
  type: VenueType (public, private, school, club)
  location: GeoLocation
  address: Address
  facilities: Facility[]
  amenities: String[]
  rules: String?
  manager: User?
  hours: OpeningHours[]
  pricing: VenuePricing
  createdAt: Timestamp
  updatedAt: Timestamp
}

Facility {
  id: UUID
  venueId: UUID
  name: String
  type: 'court' | 'field' | 'rink' | 'pool' | 'beach' | 'ramp' | 'gym'
  capacity: Number
  dimensions: String?
  surface: String?
  lights: Boolean
  covered: Boolean
  availability: AvailabilitySlot[]
}

GeoLocation {
  latitude: Number
  longitude: Number
  geohash: String (for efficient proximity searches)
}

Address {
  street: String
  city: String
  state: String
  zipCode: String
  country: String
}
```

#### Conditions (Water/Weather)

```typescript
ConditionRequirements {
  windMin: Number? (knots)
  windMax: Number? (knots)
  windDirection: String[]? (N, NE, E, SE, S, SW, W, NW)
  swellMin: Number? (feet)
  swellMax: Number? (feet)
  tideWindow: TideWindow?
  visibility: Number? (feet)
  temperature: TemperatureRange?
  precipitation: 'none' | 'light' | 'any'
}

CurrentConditions {
  timestamp: Timestamp
  location: GeoLocation
  wind: WindData
  swell: SwellData?
  tide: TideData?
  visibility: Number
  temperature: TemperatureData
  precipitation: Number
  alerts: SafetyAlert[]
}

WindData {
  speed: Number (knots)
  direction: String
  gusts: Number (knots)
}

SwellData {
  height: Number (feet)
  period: Number (seconds)
  direction: String
}

TideData {
  current: Number (feet)
  direction: 'rising' | 'falling'
  next: { time: Timestamp, height: Number }
}
```

#### Family & Youth

```typescript
Family {
  id: UUID
  guardians: User[]
  children: Child[]
  preferences: FamilyPreferences
  medicalInfo: MedicalInfo[]
  emergencyContacts: EmergencyContact[]
  createdAt: Timestamp
  updatedAt: Timestamp
}

Child {
  id: UUID
  familyId: UUID
  firstName: String
  lastName: String
  dateOfBirth: Date
  medicalInfo: MedicalInfo?
  teams: Team[]
  activities: Session[]
  createdAt: Timestamp
  updatedAt: Timestamp
}

Carpool {
  id: UUID
  sessionId: UUID
  driver: User
  riders: Child[]
  pickupTime: Timestamp
  pickupLocation: GeoLocation
  dropoffLocation: GeoLocation?
  qrCode: String (one-time use)
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled'
  auditLog: AuditEntry[]
}
```

#### Payments

```typescript
Transaction {
  id: UUID
  type: 'deposit' | 'payment' | 'refund' | 'payout'
  amount: Number (cents)
  currency: String
  status: 'pending' | 'processing' | 'completed' | 'failed'
  user: User
  session: Session?
  stripeId: String
  stripeStatus: String
  metadata: JSON
  createdAt: Timestamp
  completedAt: Timestamp?
}
```

#### Safety & Compliance

```typescript
Incident {
  id: UUID
  sessionId: UUID
  reportedBy: User
  involved: User[]
  type: 'injury' | 'behavior' | 'equipment' | 'weather' | 'other'
  severity: 'minor' | 'moderate' | 'severe'
  description: String
  actions: String[]
  returnToPlay: ReturnToPlay?
  createdAt: Timestamp
  resolvedAt: Timestamp?
}

FloatPlan {
  id: UUID
  sessionId: UUID
  submittedBy: User
  participants: User[]
  route: GeoLocation[]?
  expectedReturn: Timestamp
  emergencyContact: EmergencyContact
  vhfChannel: Number?
  equipment: String[]
  checkInInterval: Number? (minutes)
  status: 'active' | 'completed' | 'overdue' | 'emergency'
  checkIns: CheckIn[]
}
```

### Key Relationships

```
User 1-* Registration *-1 Session
Session *-1 Venue
Venue 1-* Facility
User 1-* Child (Family)
Session 1-* Condition
User 1-1 ReliabilityScore
Session 1-* WaitlistEntry
User 1-* Transaction
Session 1-1 FloatPlan (optional)
Session 1-* Incident
User 1-* Message *-1 Conversation
```

## API Design

### REST Endpoints

#### Sessions

```
GET    /api/v1/sessions/nearby?lat={lat}&lng={lng}&radius={miles}&sport={sport}
POST   /api/v1/sessions
GET    /api/v1/sessions/:id
PUT    /api/v1/sessions/:id
DELETE /api/v1/sessions/:id
POST   /api/v1/sessions/:id/join
POST   /api/v1/sessions/:id/leave
GET    /api/v1/sessions/:id/waitlist
POST   /api/v1/sessions/:id/waitlist
```

#### Users

```
GET    /api/v1/users/:id
PUT    /api/v1/users/:id
GET    /api/v1/users/:id/calendar
GET    /api/v1/users/:id/reliability
POST   /api/v1/users/:id/sports
```

#### Payments

```
POST   /api/v1/payments/deposit
POST   /api/v1/payments/refund
GET    /api/v1/payments/payouts
POST   /api/v1/webhooks/stripe
```

#### Conditions

```
GET    /api/v1/conditions/current?lat={lat}&lng={lng}
GET    /api/v1/conditions/forecast?lat={lat}&lng={lng}&hours={hours}
```

### GraphQL Schema

```graphql
type Query {
  # Discovery
  discoverSessions(filter: SessionFilter!): SessionConnection!
  session(id: ID!): Session

  # User
  me: User!
  user(id: ID!): User
  myCalendar(start: DateTime!, end: DateTime!): [Session!]!

  # Conditions
  currentConditions(location: GeoLocationInput!): Conditions!
  forecastConditions(location: GeoLocationInput!, hours: Int!): [Conditions!]!

  # Family
  myFamily: Family
  carpools(sessionId: ID!): [Carpool!]!
}

type Mutation {
  # Sessions
  createSession(input: CreateSessionInput!): Session!
  updateSession(id: ID!, input: UpdateSessionInput!): Session!
  deleteSession(id: ID!): Boolean!
  joinSession(sessionId: ID!): Registration!
  leaveSession(sessionId: ID!): Boolean!

  # Payments
  createDeposit(sessionId: ID!, amount: Int!): Transaction!
  requestRefund(transactionId: ID!): Transaction!

  # Family
  addChild(input: AddChildInput!): Child!
  createCarpool(input: CreateCarpoolInput!): Carpool!

  # Safety
  reportIncident(input: IncidentInput!): Incident!
  submitFloatPlan(input: FloatPlanInput!): FloatPlan!
}

type Subscription {
  sessionUpdated(id: ID!): Session!
  conditionsChanged(location: GeoLocationInput!): Conditions!
  messageReceived(conversationId: ID!): Message!
}
```

## Security Patterns

### Authentication

- JWT tokens with RS256 signing
- Access tokens: 15 minutes expiry
- Refresh tokens: 7 days expiry
- Token rotation on refresh
- Blacklist for revoked tokens (Redis)

### Authorization

- Role-Based Access Control (RBAC)
- Resource-based permissions
- Guardian approval for minor accounts
- API rate limiting per tier:
  - Player: 100 req/min
  - Organizer: 500 req/min
  - Facility: 1000 req/min
  - Admin: Unlimited

### Data Protection

- Encryption at rest (AES-256)
- Encryption in transit (TLS 1.3)
- PII minimization
- GDPR/CCPA compliance
- Audit logs for sensitive operations
- Data retention policies

### Youth Protection (CRITICAL)

- All adult↔minor DMs blocked at API level
- Guardian-visible messaging enforced
- Media sharing requires guardian consent
- COPPA-compliant flows
- Background check verification

## Performance Optimization

### Caching Strategy

1. **CDN** (CloudFront)

   - Static assets
   - Marketing pages
   - Public session listings

2. **Redis**

   - Session data (user sessions)
   - API response cache (5-60 min TTL)
   - Real-time presence
   - Leaderboards/rankings

3. **Database**
   - Query result caching
   - Materialized views for analytics
   - Read replicas for scaling

### Database Optimization

- Geospatial indexes (PostGIS)
- Composite indexes on common queries
- Partitioning for large tables (sessions, transactions)
- Connection pooling (pgBouncer)
- Query optimization with EXPLAIN ANALYZE

### Real-time Features

- WebSocket connections (Socket.io)
- Redis Pub/Sub for scaling
- Message queuing (Bull/Redis)
- Server-sent events for live updates
- Optimistic UI updates

## Monitoring & Observability

### Metrics (DataDog)

- Request latency (p50, p95, p99)
- Error rates
- Database query performance
- Cache hit rates
- Custom business metrics (fill rates, no-shows)

### Logging (DataDog)

- Structured logging (JSON)
- Request correlation IDs
- Error stack traces
- Audit logs for sensitive operations

### Alerting

- High error rates
- Slow queries (>1s)
- Failed payments
- Youth safety violations
- Condition-based alerts

## Deployment

### CI/CD Pipeline (GitHub Actions)

1. **Pull Request**

   - Lint (ESLint, Prettier)
   - Type check (TypeScript)
   - Unit tests
   - Integration tests
   - Security scan (Snyk)

2. **Merge to Main**

   - Build Docker images
   - Push to ECR
   - Deploy to staging
   - E2E tests
   - Performance tests

3. **Production Deploy**
   - Manual approval
   - Blue-green deployment
   - Health checks
   - Rollback capability

### Kubernetes Architecture

```
┌─────────────────┐
│   CloudFront    │ (CDN)
└────────┬────────┘
         │
┌────────▼────────┐
│  Load Balancer  │ (ALB)
└────────┬────────┘
         │
    ┌────▼────┐
    │  Ingress │
    └────┬─────┘
         │
┌────────▼────────────┐
│  API Gateway Pods   │ (Autoscaling 2-10)
└────────┬────────────┘
         │
    ┌────┴────┬──────────┬──────────┐
    │         │          │          │
┌───▼───┐ ┌──▼──┐ ┌─────▼─────┐ ┌──▼────┐
│Discovery│ │Cond.│ │ Payments  │ │Messaging│
│ Service │ │Svc  │ │  Service  │ │ Service │
└───┬─────┘ └──┬──┘ └─────┬─────┘ └──┬────┘
    │          │          │          │
    └──────────┴──────────┴──────────┘
               │
        ┌──────▼──────┐
        │  PostgreSQL │ (RDS Multi-AZ)
        │    Redis    │ (ElastiCache)
        └─────────────┘
```

## Development Workflow

### Local Development

```bash
# Start all services
npm run dev

# Start specific app
npm run dev --filter=@fieldday/mobile
npm run dev --filter=@fieldday/marketing

# Run tests
npm run test

# Type check
npm run typecheck

# Lint
npm run lint

# Format
npm run format
```

### Git Workflow

- **main**: Production-ready code
- **develop**: Integration branch
- **feature/\***: Feature branches
- **hotfix/\***: Emergency fixes

### Commit Convention

```
feat: Add session discovery endpoint
fix: Fix payment webhook handling
docs: Update API documentation
test: Add tests for reliability scoring
refactor: Simplify condition matching logic
chore: Update dependencies
```

---

This architecture is designed to be:

- **Scalable**: Microservices can scale independently
- **Maintainable**: Clear separation of concerns
- **Secure**: Multiple layers of security
- **Performant**: Caching and optimization at every level
- **Observable**: Comprehensive monitoring and logging
- **Resilient**: Fault tolerance and graceful degradation
