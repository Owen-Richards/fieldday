# GitHub Copilot Instructions for FieldDay

## Project Overview

FieldDay is a comprehensive Sports OS platform enabling instant pickup games, partner-finding for water sports, youth logistics, and facility management.

**Mission**: Play anything, anywhere, with people you trust.

**Tagline**: Sports OS unifying adult pickup, partner-finding, youth logistics, and facility inventory through a trust-first Reliability/Skill/Conditions Graph.

## What Makes FieldDay Unique

### Four-Vertical Strategy

1. **Adult Pickup Games**: Instant discovery engine (<200ms) matches players to nearby games in <20s end-to-end
2. **Water Sports Partner-Finding**: Real-time condition matching (wind, swell, tide, visibility) for surf, kite, spearfishing, sailing with auto-cancel safety
3. **Youth Sports Logistics**: Multi-child Family OS with carpool QR handoff, volunteer scheduling, medical cards, guardian-controlled messaging
4. **Facility Management**: Inventory optimization (courts/fields/ramps), dynamic pricing, staff scheduling, utilization analytics

### Trust-First Data Moat

- **Reliability Graph**: 0-100 score tracking attendance, punctuality, cancellations, incident-free rate with decay function
- **Skill Graph**: 1-10 per-sport skill levels with coach verification and progression tracking
- **Conditions Graph**: Historical weather/water data enables predictive matching and safety alerts
- **City-by-City Playbook**: Local trust networks create defensibility (hard to replicate in new markets)

### Core Value Proposition

- **For Players**: Find trusted games faster with reliability scores, no more no-shows
- **For Organizers**: Fill sessions 2x faster with pricing intelligence and auto-waitlists
- **For Parents**: Single dashboard for multiple kids with automated carpool/volunteer coordination
- **For Facilities**: 30%+ utilization gains through dynamic pricing and API integrations

## Core Principles

1. **Trust-First**: Every feature must enhance reliability and safety
2. **Mobile-First**: Optimize for quick actions on mobile devices (<20s user flows)
3. **Family-Centric**: Support multi-child households with complex logistics
4. **Condition-Aware**: Real-time weather/water conditions affect availability
5. **City-by-City**: Local playbook with data moats

## Architecture

### Monorepo Structure

```
fieldday/
├── apps/
│   ├── mobile/           # React Native (iOS/Android)
│   └── web/
│       ├── marketing/    # Next.js marketing site
│       ├── organizer-console/  # Organizer dashboard
│       ├── facility-console/   # Facility management
│       └── family-os/    # Family dashboard
├── backend/
│   ├── api/              # GraphQL/REST gateway
│   └── services/         # Microservices
│       ├── discovery/    # Session matching engine
│       ├── conditions/   # Weather/water API
│       ├── payments/     # Stripe Connect
│       └── messaging/    # Real-time chat
└── packages/
    ├── shared/           # Domain types
    ├── ui/              # Design system
    └── config/          # Shared configs
```

## Code Standards

### TypeScript/React

- **Always use TypeScript** with strict mode enabled
- Functional components with hooks (no class components)
- React Query for server state management
- Zustand for client state
- Error boundaries on all route boundaries
- Accessibility: WCAG 2.1 AA minimum (use semantic HTML, ARIA labels, keyboard nav)
- Use `type` over `interface` for props and return types (better composition)
- Avoid `any` - use `unknown` and type guards instead
- Prefer `const` over `let`, never use `var`
- Use optional chaining (`?.`) and nullish coalescing (`??`) for safety

### Naming Conventions

- Components: PascalCase (`SessionCard`, `UserProfile`)
- Files: kebab-case for files (`session-card.tsx`, `use-sessions.ts`)
- Hooks: prefix with `use` (`useSession`, `useReliability`)
- Types: PascalCase with `I` prefix for interfaces when needed
- Constants: UPPER_SNAKE_CASE for true constants
- Boolean props/variables: prefix with `is`, `has`, `should` (`isLoading`, `hasAccess`)
- Event handlers: prefix with `handle` or `on` (`handleSubmit`, `onClick`)
- API routes: RESTful naming (`/api/sessions/:id`, not `/api/getSession`)

### API Design

- **GraphQL** for complex queries (Apollo Server/Client)
- **REST** for simple CRUD and webhooks
- Rate limiting: tier-based (player/organizer/facility)
- JWT auth with 15min access + 7day refresh tokens
- API versioning: `/api/v1/...`
- Always return consistent response format

### Database Patterns

- **PostgreSQL**: transactional data, use JSONB for flexible fields
- **Redis**: caching, real-time presence, rate limiting
- **TimescaleDB**: analytics, conditions history
- Always use parameterized queries (prevent SQL injection)
- Soft deletes with `deleted_at` timestamp
- Audit logs for sensitive operations (payments, youth data)
- Use transactions for multi-step mutations
- Add database indexes for frequently queried fields (location, sport, time)
- Use composite indexes for multi-column queries
- Include `created_at` and `updated_at` timestamps on all tables
- Use UUIDs for public-facing IDs, auto-increment integers for internal
- Always add foreign key constraints with appropriate `ON DELETE` behavior
- Use database-level constraints for data integrity (NOT NULL, CHECK, UNIQUE)
- Implement row-level security (RLS) for multi-tenant isolation

## Performance Targets

- **Session discovery**: <200ms p95
- **Join flow**: <20s end-to-end (tap → calendar)
- **Payment processing**: <3s
- **Calendar sync**: <30s
- **Push notifications**: <5s
- **Page load**: <1.5s on 3G

## User Roles & Capabilities

### User Types

1. **Player**: Individual looking to join activities
2. **Organizer**: Creates and manages sessions/leagues/clinics
3. **Parent/Guardian**: Manages family activities, carpools, volunteers
4. **Facility**: Manages venue inventory and staff
5. **Admin**: Platform oversight and trust/safety

### Core Features

1. **Discovery Engine**: Location-based, condition-aware session matching
2. **Session Composer**: Create pickup/clinic/league/boat sessions with templates
3. **Reliability Graph**: Track attendance, punctuality, safety (0-100 score)
4. **Family OS**: Multi-child scheduling, carpools, volunteers, medical cards
5. **Conditions Engine**: Weather/water safety integration with auto-cancel
6. **Payment System**: Deposits, splits, payouts, refunds (Stripe Connect)
7. **Messaging**: Role-scoped chat with guardian-visible youth channels
8. **Float Plans**: Emergency contacts, check-ins for water sports

## Safety Requirements (CRITICAL)

- **Youth Protection**: All adult↔minor DM attempts BLOCKED
- All team messages with minors are guardian-visible
- Media sharing requires guardian consent toggle
- Water activities REQUIRE float plans with emergency contacts
- Background check tracking for coaches (status visible to parents)
- Incident reporting with return-to-play workflows
- MPA (Marine Protected Area) blocking for illegal activities

## Common Patterns

### Component Structure

```typescript
// session-card.tsx - Follow this structure for all components
import { type FC } from 'react';
import { type Session } from '@fieldday/shared/types';

// 1. Type definitions at top
type SessionCardProps = {
  session: Session;
  onJoin?: (sessionId: string) => void;
  isLoading?: boolean;
  className?: string;
};

// 2. Component with clear return type
export const SessionCard: FC<SessionCardProps> = ({
  session,
  onJoin,
  isLoading = false,
  className = '',
}) => {
  // 3. Hooks at top (React Query, state, etc.)
  const { data: reliability } = useReliabilityScore(session.organizerId);

  // 4. Event handlers
  const handleJoinClick = () => {
    onJoin?.(session.id);
  };

  // 5. Derived state/memoized values
  const spotsLeft = session.capacity - session.registered;
  const isFull = spotsLeft <= 0;

  // 6. Early returns for loading/error states
  if (isLoading) return <SessionCardSkeleton />;

  // 7. Main render
  return (
    <div className={cn('rounded-lg border p-4', className)}>
      <h3>{session.title}</h3>
      <p>{session.sport} • {spotsLeft} spots left</p>
      <button onClick={handleJoinClick} disabled={isFull}>
        {isFull ? 'Full' : 'Join Session'}
      </button>
    </div>
  );
};

// 8. Sub-components at bottom (if small, otherwise separate file)
const SessionCardSkeleton: FC = () => (
  <div className="animate-pulse rounded-lg border p-4">
    <div className="h-6 bg-gray-200 rounded" />
  </div>
);
```

### Custom Hooks Pattern

```typescript
// use-sessions.ts - Follow this pattern for data hooks
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { type Session, type SessionFilter } from '@fieldday/shared/types';

export const useSessions = (filter: SessionFilter) => {
  return useQuery({
    queryKey: ['sessions', filter],
    queryFn: () => sessionService.discover(filter),
    staleTime: 30_000, // 30 seconds
    gcTime: 5 * 60_000, // 5 minutes
    enabled: !!filter.location, // Only run if location exists
  });
};

export const useJoinSession = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (sessionId: string) => sessionService.join(sessionId),
    onSuccess: (data, sessionId) => {
      // Optimistic update
      queryClient.invalidateQueries({ queryKey: ['sessions'] });
      queryClient.invalidateQueries({ queryKey: ['session', sessionId] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
```

### API Response Format

```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    field?: string;
  };
  metadata?: {
    timestamp: number;
    version: string;
    requestId: string;
  };
}
```

### Error Handling

```typescript
// Custom error classes for type-safe error handling
export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 400,
    public meta?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export class ValidationError extends AppError {
  constructor(message: string, field?: string) {
    super(message, 'VALIDATION_ERROR', 400, { field });
    this.name = 'ValidationError';
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = 'Not authenticated') {
    super(message, 'AUTH_ERROR', 401);
    this.name = 'AuthenticationError';
  }
}

// Usage in controllers
try {
  // operation
  const result = await sessionService.join(sessionId, userId);
  return res.json({ success: true, data: result });
} catch (error) {
  // Structured logging with context
  logger.error('Session join failed', {
    error: error instanceof Error ? error.message : 'Unknown error',
    errorStack: error instanceof Error ? error.stack : undefined,
    userId,
    sessionId,
    timestamp: new Date().toISOString(),
  });

  // Type-safe error responses
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      success: false,
      error: {
        code: error.code,
        message: error.message,
        ...error.meta,
      },
    });
  }

  // Unexpected errors - don't leak details
  return res.status(500).json({
    success: false,
    error: {
      code: 'INTERNAL_ERROR',
      message: 'An unexpected error occurred',
    },
  });
}

// Frontend error handling with React Query
const { mutate: joinSession } = useJoinSession({
  onError: (error) => {
    if (error.code === 'SESSION_FULL') {
      toast.error('This session is now full');
    } else if (error.code === 'PAYMENT_REQUIRED') {
      navigate('/payment', { state: { sessionId } });
    } else {
      toast.error(error.message ?? 'Failed to join session');
    }
  },
});
```

### Database Queries

```typescript
// Always use parameterized queries
const result = await db.query('SELECT * FROM sessions WHERE id = $1 AND deleted_at IS NULL', [
  sessionId,
]);

// Use transactions for multi-step operations
await db.transaction(async (trx) => {
  await trx.insert('registrations', registration);
  await trx.update('sessions', { capacity: session.capacity - 1 });
  await trx.insert('transactions', payment);
});
```

### GraphQL Patterns

```typescript
// Type-safe resolver with DataLoader for N+1 prevention
const resolvers = {
  Query: {
    discoverSessions: async (
      _: unknown,
      { filter }: { filter: SessionFilter },
      { user, dataloaders }: Context
    ) => {
      if (!user) throw new AuthenticationError('Must be logged in');

      // Input validation
      if (filter.radius && (filter.radius < 1 || filter.radius > 50)) {
        throw new ValidationError('Radius must be between 1-50 miles', 'radius');
      }

      const sessions = await sessionService.discover({
        userId: user.id,
        location: filter.location,
        radius: filter.radius ?? 5,
        sport: filter.sport,
        timeWindow: filter.timeWindow,
      });

      return sessions;
    },
  },

  Session: {
    // Use DataLoader to batch and cache database queries
    organizer: async (session: Session, _: unknown, { dataloaders }: Context) => {
      return dataloaders.userLoader.load(session.organizerId);
    },

    venue: async (session: Session, _: unknown, { dataloaders }: Context) => {
      if (!session.venueId) return null;
      return dataloaders.venueLoader.load(session.venueId);
    },

    // Computed field with caching
    spotsLeft: (session: Session) => {
      return Math.max(0, session.capacity - session.registered);
    },
  },

  Mutation: {
    joinSession: async (
      _: unknown,
      { sessionId }: { sessionId: string },
      { user, dataloaders }: Context
    ) => {
      if (!user) throw new AuthenticationError('Must be logged in');

      // Optimistic locking for race conditions
      const registration = await sessionService.join(sessionId, user.id);

      // Invalidate cache
      dataloaders.sessionLoader.clear(sessionId);

      return registration;
    },
  },
};

// DataLoader setup for efficient batching
import DataLoader from 'dataloader';

const createUserLoader = () =>
  new DataLoader(async (userIds: readonly string[]) => {
    const users = await db.query('SELECT * FROM users WHERE id = ANY($1)', [userIds]);
    const userMap = new Map(users.rows.map((u) => [u.id, u]));
    return userIds.map((id) => userMap.get(id) ?? null);
  });
```

## Testing Requirements

- **Unit tests**: All utilities and business logic (80%+ coverage)
- **Integration tests**: API endpoints with database (critical paths)
- **E2E tests**: Critical user journeys (instant join, session create, carpool)
- **Accessibility tests**: Automated a11y checks with jest-axe or similar
- **Performance tests**: Session discovery must meet <200ms p95 target
- **Test file naming**: `*.test.ts` for unit, `*.integration.test.ts` for integration, `*.e2e.test.ts` for E2E
- **Use `describe` blocks** to group related tests logically
- **One assertion per test** when possible (or clearly related assertions)
- **AAA pattern**: Arrange, Act, Assert

### Test Patterns

```typescript
// Unit test with comprehensive coverage
describe('calculateReliabilityScore', () => {
  it('should calculate score based on attendance and punctuality', () => {
    const score = calculateReliabilityScore({
      attended: 45,
      total: 50,
      onTime: 42,
      cancelled: 5,
    });
    expect(score).toBe(84);
  });

  it('should return 100 for perfect attendance', () => {
    const score = calculateReliabilityScore({
      attended: 50,
      total: 50,
      onTime: 50,
      cancelled: 0,
    });
    expect(score).toBe(100);
  });

  it('should handle zero total sessions', () => {
    const score = calculateReliabilityScore({
      attended: 0,
      total: 0,
      onTime: 0,
      cancelled: 0,
    });
    expect(score).toBe(0);
  });

  it('should penalize cancellations more heavily', () => {
    const withCancellations = calculateReliabilityScore({
      attended: 40,
      total: 50,
      onTime: 40,
      cancelled: 10,
    });
    const withoutCancellations = calculateReliabilityScore({
      attended: 40,
      total: 50,
      onTime: 40,
      cancelled: 0,
    });
    expect(withCancellations).toBeLessThan(withoutCancellations);
  });
});

// Integration test with database cleanup
describe('POST /api/sessions', () => {
  let testUser: User;
  let testVenue: Venue;

  beforeEach(async () => {
    // Setup test data
    testUser = await createTestUser({ role: 'organizer' });
    testVenue = await createTestVenue({ capacity: 20 });
  });

  afterEach(async () => {
    // Cleanup
    await cleanupTestData();
  });

  it('should create session and notify nearby players', async () => {
    const sessionData = {
      title: 'Pickup Soccer',
      sport: 'Soccer',
      venueId: testVenue.id,
      startTime: new Date(Date.now() + 86400000).toISOString(),
      capacity: 20,
    };

    const response = await request(app)
      .post('/api/sessions')
      .set('Authorization', `Bearer ${testUser.token}`)
      .send(sessionData)
      .expect(201);

    expect(response.body.success).toBe(true);
    expect(response.body.data.id).toBeDefined();
    expect(response.body.data.organizerId).toBe(testUser.id);
    expect(notificationService.send).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'NEW_SESSION_NEARBY',
      })
    );
  });

  it('should reject invalid capacity', async () => {
    const sessionData = {
      title: 'Pickup Soccer',
      sport: 'Soccer',
      venueId: testVenue.id,
      startTime: new Date(Date.now() + 86400000).toISOString(),
      capacity: -1, // Invalid
    };

    const response = await request(app)
      .post('/api/sessions')
      .set('Authorization', `Bearer ${testUser.token}`)
      .send(sessionData)
      .expect(400);

    expect(response.body.success).toBe(false);
    expect(response.body.error.code).toBe('VALIDATION_ERROR');
  });
});

// React component test with React Testing Library
describe('SessionCard', () => {
  const mockSession: Session = {
    id: '123',
    title: 'Pickup Basketball',
    sport: 'Basketball',
    capacity: 10,
    registered: 7,
    startTime: new Date(Date.now() + 86400000).toISOString(),
    organizerId: 'org-1',
  };

  it('should display session details', () => {
    render(<SessionCard session={mockSession} />);

    expect(screen.getByText('Pickup Basketball')).toBeInTheDocument();
    expect(screen.getByText(/3 spots left/i)).toBeInTheDocument();
  });

  it('should call onJoin when join button clicked', async () => {
    const handleJoin = jest.fn();
    render(<SessionCard session={mockSession} onJoin={handleJoin} />);

    const joinButton = screen.getByRole('button', { name: /join session/i });
    await userEvent.click(joinButton);

    expect(handleJoin).toHaveBeenCalledWith('123');
  });

  it('should disable join button when full', () => {
    const fullSession = { ...mockSession, registered: 10 };
    render(<SessionCard session={fullSession} />);

    const joinButton = screen.getByRole('button', { name: /full/i });
    expect(joinButton).toBeDisabled();
  });

  it('should meet accessibility standards', async () => {
    const { container } = render(<SessionCard session={mockSession} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

// E2E test with Playwright
test.describe('Instant Join Flow', () => {
  test('should allow user to discover and join a session', async ({ page }) => {
    // Login
    await page.goto('/login');
    await page.fill('[name="email"]', 'test@example.com');
    await page.click('button[type="submit"]');

    // Discover sessions
    await page.goto('/discover');
    await page.waitForSelector('[data-testid="session-card"]');

    // Join session
    const firstSession = page.locator('[data-testid="session-card"]').first();
    await firstSession.locator('button:has-text("Join")').click();

    // Verify confirmation
    await expect(page.locator('[data-testid="join-confirmation"]')).toBeVisible();
    await expect(page.locator('text=Added to calendar')).toBeVisible();

    // Check performance
    const navigationTiming = await page.evaluate(() =>
      JSON.stringify(performance.getEntriesByType('navigation')[0])
    );
    const timing = JSON.parse(navigationTiming);
    expect(timing.responseEnd - timing.requestStart).toBeLessThan(200); // <200ms
  });
});
```

## AI Assistant Guidelines

When generating code:

1. **Multi-tenant**: Always filter by organization/facility/user context
2. **Validation**: Include proper input validation and sanitization with Zod or Yup schemas
3. **Error Handling**: Comprehensive try-catch with logging and user-friendly messages
4. **JSDoc**: Add comments for complex functions and public APIs
5. **Offline-First**: Consider offline mobile experience with optimistic updates
6. **Caching**: Implement proper caching strategies (React Query, Redis)
7. **Analytics**: Add telemetry hooks for key events (mixpanel, segment)
8. **Accessibility**: Include ARIA labels, semantic HTML, keyboard navigation
9. **Security**: Never expose PII, validate all inputs, sanitize outputs
10. **Performance**: Consider query optimization, N+1 problems, pagination
11. **Type Safety**: Leverage TypeScript's type system - avoid `any`, use generics
12. **Code Organization**: Follow the established folder structure and file naming
13. **Dependencies**: Use workspace packages (`@fieldday/shared`, `@fieldday/ui`) for shared code
14. **Git Commits**: Write descriptive commit messages following conventional commits
15. **Documentation**: Update README files when adding new features or patterns

### Code Generation Checklist

Before submitting generated code, ensure:

- [ ] TypeScript types are properly defined (no `any`)
- [ ] Error handling is implemented with user-friendly messages
- [ ] Input validation is present (especially for API endpoints)
- [ ] Loading and error states are handled in UI
- [ ] Accessibility attributes are included (ARIA labels, semantic HTML)
- [ ] Mobile responsiveness is considered (if UI component)
- [ ] Security checks are in place (auth, rate limiting, input sanitization)
- [ ] Performance is optimized (indexes, caching, pagination)
- [ ] Tests are included or test-ready structure is used
- [ ] Documentation/comments explain complex logic

### Feature-Specific Guidelines

#### Discovery/Search

- Use geospatial indexes for location queries (`CREATE INDEX idx_sessions_location ON sessions USING GIST(location)`)
- Cache popular searches in Redis with 5-minute TTL
- Return match scores with explainers (distance, skill match, reliability)
- Implement cursor-based pagination (not offset) for performance
- Include faceted search filters (sport, time, skill level, price)
- Debounce search input (300ms) to reduce API calls
- Show skeleton loaders during search (<200ms target)

```typescript
// Discovery query example
const discoverSessions = async (filter: SessionFilter) => {
  const cacheKey = `discover:${JSON.stringify(filter)}`;
  const cached = await redis.get(cacheKey);
  if (cached) return JSON.parse(cached);

  const sessions = await db.query(
    `
    SELECT s.*, 
           ST_Distance(s.location, ST_MakePoint($1, $2)) as distance,
           u.reliability_score
    FROM sessions s
    JOIN users u ON s.organizer_id = u.id
    WHERE s.sport = $3
      AND s.start_time BETWEEN $4 AND $5
      AND ST_DWithin(s.location, ST_MakePoint($1, $2), $6)
      AND s.deleted_at IS NULL
    ORDER BY distance ASC, s.start_time ASC
    LIMIT 50
  `,
    [
      filter.lng,
      filter.lat,
      filter.sport,
      filter.startTime,
      filter.endTime,
      filter.radius * 1609.34,
    ]
  );

  await redis.setex(cacheKey, 300, JSON.stringify(sessions.rows));
  return sessions.rows;
};
```

#### Payments

- Always use idempotency keys for Stripe (`idempotencyKey: `req-${userId}-${timestamp}`)
- Store transaction audit trail with before/after states
- Handle webhooks asynchronously with retry logic (3 attempts, exponential backoff)
- Implement proper refund windows (24hr full, 7day partial)
- Capture payments only when session is confirmed (auth first)
- Split payments for facility cuts (use Stripe Connect)
- Handle failed payments gracefully (retry, notification, grace period)

```typescript
// Payment flow example
const processSessionPayment = async (sessionId: string, userId: string) => {
  const idempotencyKey = `session-${sessionId}-user-${userId}-${Date.now()}`;

  try {
    // 1. Create payment intent (authorized but not captured)
    const paymentIntent = await stripe.paymentIntents.create(
      {
        amount: session.price * 100,
        currency: 'usd',
        customer: user.stripeCustomerId,
        payment_method: user.defaultPaymentMethod,
        capture_method: 'manual', // Capture later when confirmed
        metadata: { sessionId, userId },
      },
      { idempotencyKey }
    );

    // 2. Store transaction record
    await db.query(
      `
      INSERT INTO transactions (id, user_id, session_id, amount, status, stripe_payment_intent_id)
      VALUES ($1, $2, $3, $4, $5, $6)
    `,
      [uuidv4(), userId, sessionId, session.price, 'authorized', paymentIntent.id]
    );

    return paymentIntent;
  } catch (error) {
    logger.error('Payment failed', { error, sessionId, userId });
    throw new AppError('Payment processing failed', 'PAYMENT_ERROR', 402);
  }
};
```

#### Real-time Features

- Use WebSockets for live updates (Socket.io or native WebSocket)
- Implement presence system with Redis (TTL-based heartbeats)
- Add optimistic UI updates with rollback on failure
- Handle connection recovery with exponential backoff
- Batch updates to reduce message frequency (max 1/sec)
- Use rooms for scoped broadcasts (session-123, facility-456)

```typescript
// WebSocket presence example
io.on('connection', (socket) => {
  socket.on('join_session', async (sessionId) => {
    await socket.join(`session:${sessionId}`);

    // Add to presence set
    await redis.sadd(`presence:session:${sessionId}`, socket.userId);
    await redis.expire(`presence:session:${sessionId}`, 300);

    // Broadcast to room
    io.to(`session:${sessionId}`).emit('user_joined', {
      userId: socket.userId,
      count: await redis.scard(`presence:session:${sessionId}`),
    });
  });

  socket.on('disconnect', async () => {
    // Remove from all presence sets
    const sessions = await redis.smembers(`user:${socket.userId}:sessions`);
    for (const sessionId of sessions) {
      await redis.srem(`presence:session:${sessionId}`, socket.userId);
      io.to(`session:${sessionId}`).emit('user_left', { userId: socket.userId });
    }
  });
});
```

#### Youth Safety

- Block all adult-to-minor direct messages at API level (not just UI)
- Make guardian visibility non-optional (database constraint)
- Log all youth interactions with audit trail (who, what, when)
- Require guardian approval for media with toggle in settings
- Age-verify using birthdate (not self-reported age)
- Implement reporting system with immediate escalation

```typescript
// Youth safety middleware
const checkYouthSafety = async (req, res, next) => {
  const { recipientId } = req.body;
  const senderId = req.user.id;

  const [sender, recipient] = await Promise.all([
    getUserWithAge(senderId),
    getUserWithAge(recipientId),
  ]);

  const senderIsMinor = sender.age < 18;
  const recipientIsMinor = recipient.age < 18;

  // Block adult → minor DMs
  if (!senderIsMinor && recipientIsMinor) {
    await logSecurityEvent('YOUTH_DM_BLOCKED', { senderId, recipientId });
    throw new AppError('Cannot message minors directly', 'YOUTH_SAFETY_VIOLATION', 403);
  }

  next();
};
```

#### Water Sports

- Validate condition thresholds against real-time APIs (wind, swell, tide)
- Block MPA violations with geofencing (GeoJSON polygons)
- Require float plans for offshore activities (>1 mile from shore)
- Implement check-in timers with emergency contact auto-notify
- Show condition forecasts with safety warnings
- Auto-cancel sessions when conditions exceed limits

```typescript
// Condition validation example
const validateWaterConditions = async (session: WaterSession) => {
  const conditions = await weatherService.getMarineConditions(session.location);

  // Check against sport-specific thresholds
  const limits = SPORT_CONDITION_LIMITS[session.sport];

  if (conditions.windSpeed > limits.maxWind) {
    throw new AppError(
      `Wind speed ${conditions.windSpeed}kts exceeds safe limit ${limits.maxWind}kts`,
      'UNSAFE_CONDITIONS',
      400
    );
  }

  // Check MPA boundaries
  const mpas = await getMPAPolygons();
  const isInMPA = mpas.some((mpa) => turf.booleanPointInPolygon(session.location, mpa.polygon));

  if (isInMPA && session.activity === 'spearfishing') {
    throw new AppError('This location is within a Marine Protected Area', 'MPA_VIOLATION', 403, {
      nearbyAlternatives: await findNearbyNonMPALocations(session.location),
    });
  }

  return conditions;
};
```

## Domain Model Summary

### Core Entities

- **User**: Player, organizer, parent, facility, admin
- **Session**: Pickup, league, clinic, ladder, boat
- **Venue**: Facility with inventory (courts, fields, ramps)
- **Registration**: User enrollment in session
- **Transaction**: Payments, deposits, refunds, payouts
- **Reliability**: Score tracking with badges
- **Condition**: Weather/water data
- **FloatPlan**: Safety plan for water activities
- **Carpool**: Ride coordination with QR handoff
- **Incident**: Safety reports with RTP workflow

### Key Relationships

```
User 1-* Registration *-1 Session
Session *-1 Venue
User 1-* Child (Family)
Session 1-* Condition
User 1-1 ReliabilityScore
Session 1-* WaitlistEntry
User 1-* Transaction
Session 1-1 FloatPlan (optional)
```

## Acceptance Criteria Examples

### Instant Join

From Home, a user with sport=Soccer, time=Tonight, distance=3mi must see ≥5 sessions (if supply exists) within 200ms p95; joining one adds calendar pass and sends host notification within 30s.

### Water Safety

Creating a spearfishing session inside an MPA is blocked with alternative suggestions within 500m; float plan requires emergency contact.

### Youth Messaging

Adult↔minor DM attempts are blocked; all team messages are guardian-visible; media sharing requires guardian consent toggle.

### Carpool

Driver check-in generates one-time QR that must be scanned by an approved guardian at pickup; audit log recorded.

## Roadmap Context

### R0 (MVP - 8 weeks)

- Organizer OS v1
- Instant Join flow
- Conditions v1 (water sports)
- Family OS core (registration, calendar, carpool/volunteer)
- Payments/waivers
- Facility slots basic

### R1

- Ladders & seasons
- Ref assigning/payouts
- Reliability badges
- Price suggestions

### R2

- Facility APIs
- Open data for conditions partners
- Coach practice builder
- Sponsor tools

### R3

- Social graph import
- Used gear marketplace
- Team insurance bundles

## Example Code Generation Prompts

### Excellent Prompts ✅

- "Create a session discovery API endpoint that filters by location, sport, and time window with <200ms performance using geospatial indexes and Redis caching"
- "Implement youth messaging guard middleware that blocks adult-to-minor DMs at the API level, logs all attempts, and returns appropriate error codes"
- "Build React component for carpool QR code generation with one-time use, expiry timer, guardian verification, and loading/error states"
- "Create TypeScript service for float plan with Zod validation, emergency contact verification, VHF channel format check, and automated check-in reminders"
- "Build a session card component with reliability badge, spots remaining, join button with optimistic updates, and skeleton loader"
- "Create database migration to add geospatial indexes on sessions table for location-based queries with GIST index"
- "Implement Stripe Connect payment flow with authorization hold, facility split, webhook handling, and idempotency"

### Good Prompts ✓

- "Create user authentication with magic link"
- "Add session filtering by sport type"
- "Build notification system for session updates"

### Avoid ❌

- "Make a search feature" (too vague - what type? what filters? performance requirements?)
- "Add messaging" (missing safety requirements, real-time needs, UI specs)
- "Create payment system" (missing provider, flow details, error handling)
- "Fix the bug" (no context about which bug or what symptoms)
- "Make it better" (subjective without criteria)

### Prompt Tips

- Include specific technologies/libraries to use
- Mention performance requirements if applicable
- Specify error handling and edge cases
- Include UI states (loading, error, empty)
- Reference existing patterns or components
- Mention mobile/responsive needs for UI
- Specify security/safety requirements

## Environment Setup

### Local Development

```bash
# Install dependencies
npm install

# Setup environment variables
cp .env.example .env

# Start PostgreSQL and Redis via Docker
docker-compose up -d

# Run database migrations
npm run db:migrate

# Start development servers
npm run dev

# Run tests
npm run test

# Check types
npm run type-check

# Lint and format
npm run lint
npm run format
```

### Environment Variables

```bash
# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/fieldday
REDIS_URL=redis://localhost:6379

# Auth
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=15m
REFRESH_TOKEN_EXPIRES_IN=7d

# External Services
STRIPE_SECRET_KEY=sk_test_...
WEATHER_API_KEY=...
MAPS_API_KEY=...

# Feature Flags
ENABLE_WATER_SPORTS=true
ENABLE_YOUTH_PROTECTION=true
```

## Useful Commands

```bash
# Generate new migration
npm run db:migrate:create -- --name add_session_indexes

# Run specific tests
npm run test -- session.test.ts

# Build for production
npm run build

# Start production server
npm run start

# Database console
npm run db:console

# GraphQL playground
npm run graphql:playground

# Check bundle size
npm run analyze
```

## Debugging Tips

1. **Performance Issues**: Use Chrome DevTools Performance tab, React Profiler
2. **Database Queries**: Enable query logging in PostgreSQL config
3. **API Issues**: Use GraphQL Playground or Postman with request logging
4. **Mobile Issues**: Use React Native Debugger, Flipper
5. **Type Errors**: Run `npm run type-check` for detailed error output

## Common Pitfalls to Avoid

1. **N+1 Queries**: Always use DataLoader or JOIN queries, not sequential queries in loops
2. **Missing Indexes**: Add indexes for frequently filtered columns (location, sport, time)
3. **No Error Boundaries**: Wrap route components in error boundaries
4. **Hardcoded Values**: Use environment variables for configuration
5. **Missing Loading States**: Always show loading indicators for async operations
6. **No Input Validation**: Validate all user inputs on both client and server
7. **Exposing Secrets**: Never commit `.env` files or hardcode API keys
8. **Ignoring Mobile**: Test on actual devices, not just browser dev tools
9. **No Rate Limiting**: Always rate limit public APIs
10. **Missing Accessibility**: Use semantic HTML and ARIA labels

## Resources

- Type definitions: `packages/shared/types/index.ts`
- API schemas: `backend/api/schema.graphql`
- Design system: `packages/ui/src/components/`
- Mobile components: `apps/mobile/shared/components/`
- Documentation: `docs/`
- Architecture: `docs/ARCHITECTURE.md`
- Roadmap: `docs/ROADMAP.md`

## Quick Reference Links

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [React Query Docs](https://tanstack.com/query/latest/docs/react/overview)
- [GraphQL Best Practices](https://graphql.org/learn/best-practices/)
- [Stripe API Reference](https://stripe.com/docs/api)
- [PostGIS Documentation](https://postgis.net/documentation/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

**Remember**: Every feature must enhance trust, safety, and reliability. When in doubt, prioritize user safety over convenience.

**Core Philosophy**: Build features that would make you trust FieldDay with your own kids' sports activities.
