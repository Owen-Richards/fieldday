# Backend API

GraphQL and REST API gateway serving mobile and web applications.

## Purpose

Unified API layer providing data access, business logic orchestration, and integration with backend microservices.

## Architecture

### API Gateway Pattern

- **GraphQL**: Primary API for complex queries and real-time subscriptions
- **REST**: Webhooks, simple CRUD, external integrations
- **WebSocket**: Real-time features (messaging, live updates)

### Tech Stack

- **Runtime**: Node.js 20+
- **Framework**: Express + Apollo Server
- **Language**: TypeScript
- **Schema**: GraphQL with Code-First approach
- **Validation**: Zod for input validation
- **ORM**: Prisma
- **Authentication**: JWT with passport
- **Rate Limiting**: express-rate-limit + Redis

## Project Structure

```
api/
├── src/
│   ├── schema/           # GraphQL schema definitions
│   │   ├── user.ts       # User types and resolvers
│   │   ├── session.ts    # Session types and resolvers
│   │   ├── payment.ts    # Payment types and resolvers
│   │   └── index.ts      # Schema composition
│   ├── resolvers/        # GraphQL resolvers
│   ├── controllers/      # REST controllers
│   ├── middleware/       # Express middleware
│   ├── services/         # Business logic services
│   ├── models/           # Prisma models
│   ├── utils/            # Utility functions
│   └── types/            # TypeScript types
├── prisma/
│   ├── schema.prisma     # Database schema
│   └── migrations/       # Database migrations
├── tests/
│   ├── unit/             # Unit tests
│   ├── integration/      # Integration tests
│   └── e2e/              # End-to-end tests
└── app.ts                # Application entry point
```

## GraphQL Schema

### Core Types

```graphql
"""
User profile with authentication and preferences
"""
type User {
  id: ID!
  email: String!
  name: String!
  phone: String
  avatar: String
  bio: String
  sports: [Sport!]!
  location: Location
  reliabilityScore: ReliabilityScore!
  registrations: [Registration!]!
  organizedSessions: [Session!]!
  children: [Child!]!
  createdAt: DateTime!
  updatedAt: DateTime!
}

"""
Session (pickup game, league, clinic, etc.)
"""
type Session {
  id: ID!
  sport: Sport!
  type: SessionType!
  title: String!
  description: String
  venue: Venue!
  startTime: DateTime!
  endTime: DateTime!
  capacity: Int!
  price: Float
  skillLevel: SkillLevel
  organizer: User!
  attendees: [User!]!
  waitlist: [User!]!
  conditions: Conditions
  floatPlan: FloatPlan
  status: SessionStatus!
  createdAt: DateTime!
  updatedAt: DateTime!
}

"""
Registration for a session
"""
type Registration {
  id: ID!
  user: User!
  session: Session!
  status: RegistrationStatus!
  attendedAt: DateTime
  checkedInAt: DateTime
  paymentStatus: PaymentStatus!
  transaction: Transaction
  createdAt: DateTime!
}

"""
Reliability score tracking
"""
type ReliabilityScore {
  userId: ID!
  score: Int!
  attended: Int!
  total: Int!
  onTime: Int!
  cancelled: Int!
  incidentFree: Int!
  badges: [Badge!]!
  lastUpdated: DateTime!
}

"""
Weather and water conditions
"""
type Conditions {
  location: Location!
  timestamp: DateTime!
  weather: WeatherConditions!
  marine: MarineConditions
  safe: Boolean!
  warnings: [String!]
}

"""
Float plan for water sports safety
"""
type FloatPlan {
  id: ID!
  session: Session!
  emergencyContact: Contact!
  vhfChannel: String
  departureTime: DateTime!
  returnTime: DateTime!
  lastCheckIn: DateTime
  status: FloatPlanStatus!
  createdAt: DateTime!
}
```

### Queries

```graphql
type Query {
  """
  Get current authenticated user
  """
  me: User!

  """
  Get user by ID
  """
  user(id: ID!): User

  """
  Discover nearby sessions based on filters
  Performance target: <200ms p95
  """
  discoverSessions(filter: SessionFilter!): SessionConnection!

  """
  Get session by ID
  """
  session(id: ID!): Session

  """
  Get user's active registrations
  """
  myRegistrations(status: RegistrationStatus): [Registration!]!

  """
  Get reliability score for user
  """
  reliabilityScore(userId: ID!): ReliabilityScore!

  """
  Get weather/water conditions for location
  """
  conditions(location: Location!, sport: Sport!): Conditions!

  """
  Get float plan by ID
  """
  floatPlan(id: ID!): FloatPlan
}
```

### Mutations

```graphql
type Mutation {
  """
  Authenticate user with email and password
  """
  login(email: String!, password: String!): AuthPayload!

  """
  Refresh access token
  """
  refreshToken(token: String!): AuthPayload!

  """
  Register new user
  """
  signup(input: SignupInput!): AuthPayload!

  """
  Create a new session
  """
  createSession(input: CreateSessionInput!): Session!

  """
  Update existing session
  """
  updateSession(id: ID!, input: UpdateSessionInput!): Session!

  """
  Cancel session
  """
  cancelSession(id: ID!, reason: String): Session!

  """
  Join a session (with optional payment)
  Target: <3s for payment processing
  """
  joinSession(sessionId: ID!, paymentMethodId: String): Registration!

  """
  Leave a session (with refund handling)
  """
  leaveSession(registrationId: ID!): Registration!

  """
  Check in to a session
  """
  checkIn(registrationId: ID!): Registration!

  """
  Create payment method
  """
  createPaymentMethod(input: PaymentMethodInput!): PaymentMethod!

  """
  Create float plan for water sports session
  """
  createFloatPlan(input: FloatPlanInput!): FloatPlan!

  """
  Check in to float plan (safety confirmation)
  """
  checkInFloatPlan(id: ID!): FloatPlan!

  """
  Report incident
  """
  reportIncident(input: IncidentInput!): Incident!
}
```

### Subscriptions

```graphql
type Subscription {
  """
  Subscribe to session updates
  """
  sessionUpdated(sessionId: ID!): Session!

  """
  Subscribe to new messages in channel
  """
  messageReceived(channelId: ID!): Message!

  """
  Subscribe to condition changes for location
  """
  conditionsChanged(location: Location!): Conditions!

  """
  Subscribe to roster changes for session
  """
  rosterChanged(sessionId: ID!): RosterUpdate!
}
```

## REST Endpoints

### Authentication

```
POST   /api/v1/auth/login
POST   /api/v1/auth/signup
POST   /api/v1/auth/refresh
POST   /api/v1/auth/logout
POST   /api/v1/auth/reset-password
```

### Sessions

```
GET    /api/v1/sessions/discover
GET    /api/v1/sessions/:id
POST   /api/v1/sessions
PUT    /api/v1/sessions/:id
DELETE /api/v1/sessions/:id
```

### Users

```
GET    /api/v1/users/me
PUT    /api/v1/users/me
GET    /api/v1/users/:id
```

### Webhooks

```
POST   /api/v1/webhooks/stripe
POST   /api/v1/webhooks/facility/:provider
POST   /api/v1/webhooks/background-check
```

## Resolvers

### Example Resolver Pattern

```typescript
// resolvers/session.ts
import { AuthenticationError, ForbiddenError } from 'apollo-server-express';
import { sessionService } from '../services/sessionService';
import { notificationService } from '../services/notificationService';
import { analyticsService } from '../services/analyticsService';

export const sessionResolvers = {
  Query: {
    discoverSessions: async (_: any, { filter }: { filter: SessionFilter }, { user }: Context) => {
      if (!user) throw new AuthenticationError('Must be logged in');

      const startTime = Date.now();

      try {
        const sessions = await sessionService.discover({
          userId: user.id,
          ...filter,
        });

        const duration = Date.now() - startTime;

        // Track performance
        if (duration > 200) {
          logger.warn('Discovery exceeded SLA', { duration, filter });
        }

        analyticsService.timing('query.discoverSessions', duration);

        return {
          edges: sessions.map((session) => ({ node: session })),
          pageInfo: {
            hasNextPage: false, // Implement pagination
          },
        };
      } catch (error) {
        logger.error('Discovery failed', { error, filter, userId: user.id });
        throw error;
      }
    },
  },

  Mutation: {
    joinSession: async (
      _: any,
      { sessionId, paymentMethodId }: { sessionId: string; paymentMethodId?: string },
      { user }: Context
    ) => {
      if (!user) throw new AuthenticationError('Must be logged in');

      try {
        // Check capacity
        const session = await sessionService.getById(sessionId);
        if (!session) throw new Error('Session not found');

        if (session.attendees.length >= session.capacity) {
          // Add to waitlist instead
          return await sessionService.addToWaitlist(sessionId, user.id);
        }

        // Process payment if required
        let transaction = null;
        if (session.price && session.price > 0) {
          if (!paymentMethodId) {
            throw new Error('Payment method required for paid session');
          }

          transaction = await paymentService.processPayment({
            userId: user.id,
            sessionId,
            amount: session.price,
            paymentMethodId,
          });
        }

        // Create registration
        const registration = await sessionService.join({
          sessionId,
          userId: user.id,
          transactionId: transaction?.id,
        });

        // Add to calendar
        await calendarService.addEvent({
          userId: user.id,
          session,
        });

        // Notify organizer
        await notificationService.send({
          userId: session.organizerId,
          type: 'NEW_REGISTRATION',
          data: {
            sessionId,
            userName: user.name,
            userReliability: user.reliabilityScore.score,
          },
        });

        // Track analytics
        analyticsService.track('session_joined', {
          userId: user.id,
          sessionId,
          sport: session.sport,
          paymentRequired: !!session.price,
        });

        return registration;
      } catch (error) {
        logger.error('Failed to join session', {
          error,
          sessionId,
          userId: user.id,
        });
        throw error;
      }
    },
  },

  Session: {
    // Field resolvers
    attendees: async (session: Session) => {
      return await sessionService.getAttendees(session.id);
    },

    conditions: async (session: Session) => {
      if (!session.venue.location) return null;

      return await conditionsService.getConditions({
        location: session.venue.location,
        sport: session.sport,
        time: session.startTime,
      });
    },
  },
};
```

## Middleware

### Authentication Middleware

```typescript
// middleware/auth.ts
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      throw new Error('No token provided');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    const user = await userService.getById(decoded.userId);

    if (!user) {
      throw new Error('User not found');
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' });
  }
};
```

### Rate Limiting Middleware

```typescript
// middleware/rateLimit.ts
import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import { redisClient } from '../config/redis';

export const createRateLimiter = (max: number, windowMs: number) => {
  return rateLimit({
    store: new RedisStore({
      client: redisClient,
      prefix: 'rl:',
    }),
    max,
    windowMs,
    message: 'Too many requests',
    standardHeaders: true,
    legacyHeaders: false,
  });
};

// Tier-based rate limits
export const playerRateLimit = createRateLimiter(100, 60 * 1000); // 100 req/min
export const organizerRateLimit = createRateLimiter(500, 60 * 1000); // 500 req/min
export const facilityRateLimit = createRateLimiter(1000, 60 * 1000); // 1000 req/min
```

## Error Handling

```typescript
// utils/errors.ts
export class AppError extends Error {
  constructor(
    public message: string,
    public code: string,
    public statusCode: number = 400,
    public metadata?: any
  ) {
    super(message);
    this.name = 'AppError';
  }
}

// Error handler middleware
export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error('API error', {
    error: error.message,
    stack: error.stack,
    url: req.url,
    method: req.method,
    userId: req.user?.id,
  });

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      success: false,
      error: {
        code: error.code,
        message: error.message,
        metadata: error.metadata,
      },
    });
  }

  // Generic error
  res.status(500).json({
    success: false,
    error: {
      code: 'INTERNAL_ERROR',
      message: 'An unexpected error occurred',
    },
  });
};
```

## Testing

```typescript
// tests/integration/session.test.ts
import { createTestClient } from 'apollo-server-testing';
import { server } from '../../src/app';

describe('Session API', () => {
  const { query, mutate } = createTestClient(server);

  it('discovers sessions within 200ms', async () => {
    const startTime = Date.now();

    const { data } = await query({
      query: DISCOVER_SESSIONS,
      variables: {
        filter: {
          location: { lat: 37.7749, lng: -122.4194 },
          radius: 5,
          sport: 'SOCCER',
        },
      },
    });

    const duration = Date.now() - startTime;

    expect(data.discoverSessions.edges).toHaveLength(5);
    expect(duration).toBeLessThan(200);
  });

  it('joins session with payment', async () => {
    const { data } = await mutate({
      mutation: JOIN_SESSION,
      variables: {
        sessionId: 'test-session-id',
        paymentMethodId: 'pm_test_xxx',
      },
    });

    expect(data.joinSession.status).toBe('CONFIRMED');
    expect(data.joinSession.paymentStatus).toBe('PAID');
  });
});
```

## Related

- [Backend Services](../README.md)
- [Mobile App](../../apps/mobile/README.md)
- [Web Apps](../../apps/web/README.md)
