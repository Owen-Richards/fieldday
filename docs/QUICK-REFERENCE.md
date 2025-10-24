# FieldDay Quick Reference

> **Mission**: Play anything, anywhere, with people you trust.
>
> Quick patterns and snippets aligned with our trust-first Sports OS architecture.

## Mission-Aligned Principles

When writing code for FieldDay, always remember:

1. **Trust-First**: Every feature enhances reliability and safety
2. **Performance**: Session discovery <200ms p95, join flow <20s
3. **Safety**: Youth protection is non-negotiable (guardian controls, background checks)
4. **Conditions-Aware**: Weather/water data drives safety and auto-cancellation
5. **Data Moat**: Build Reliability/Skill/Conditions Graph with every interaction

---

## API Response Format

```typescript
import { ApiResponse, ApiError } from '@fieldday/shared/types';

// Success response
const successResponse: ApiResponse<Session> = {
  success: true,
  data: session,
  metadata: {
    timestamp: Date.now(),
    version: 'v1',
    requestId: req.id,
  },
};

// Error response
const errorResponse: ApiResponse<null> = {
  success: false,
  error: {
    code: 'INVALID_INPUT',
    message: 'Session capacity must be between 2 and 100',
    field: 'capacity.max',
  },
};
```

## Error Handling

```typescript
import { logger } from '@fieldday/shared/utils';

try {
  const session = await sessionService.create(input);
  return session;
} catch (error) {
  logger.error('Failed to create session', {
    error,
    userId: req.user.id,
    input,
    context: 'SessionController.create',
  });

  if (error instanceof ValidationError) {
    throw new AppError('Invalid session data', 'VALIDATION_ERROR', {
      field: error.field,
    });
  }

  throw new AppError('Failed to create session', 'INTERNAL_ERROR');
}
```

## Database Queries

```typescript
import { db } from '@fieldday/backend/db';

// Parameterized query (ALWAYS use this)
const session = await db.query(
  `SELECT * FROM sessions 
   WHERE id = $1 
   AND deleted_at IS NULL`,
  [sessionId]
);

// Transaction for multi-step operations
await db.transaction(async (trx) => {
  // Create registration
  const registration = await trx.insert('registrations', {
    session_id: sessionId,
    user_id: userId,
    status: 'registered',
  });

  // Update session capacity
  await trx.query(
    `UPDATE sessions 
     SET capacity_current = capacity_current + 1 
     WHERE id = $1`,
    [sessionId]
  );

  // Create transaction record
  await trx.insert('transactions', {
    user_id: userId,
    session_id: sessionId,
    amount: session.pricing.deposit,
    type: 'deposit',
  });
});

// Geospatial query (PostGIS)
const nearbySessions = await db.query(
  `SELECT *, 
    ST_Distance(
      ST_GeogFromText('POINT(' || $1 || ' ' || $2 || ')'),
      location
    ) / 1609.34 AS distance_miles
   FROM sessions
   WHERE ST_DWithin(
     location,
     ST_GeogFromText('POINT(' || $1 || ' ' || $2 || ')'),
     $3 * 1609.34
   )
   AND deleted_at IS NULL
   AND start_time > NOW()
   ORDER BY distance_miles
   LIMIT 20`,
  [longitude, latitude, radiusMiles]
);
```

## GraphQL Resolver

```typescript
import { AuthenticationError, ValidationError } from 'apollo-server-express';

const resolvers = {
  Query: {
    discoverSessions: async (_, { filter }: { filter: SessionFilter }, { user }: Context) => {
      // Authentication check
      if (!user) {
        throw new AuthenticationError('Must be logged in');
      }

      // Input validation
      if (filter.radius < 0 || filter.radius > 50) {
        throw new ValidationError('Radius must be between 0 and 50 miles');
      }

      // Business logic
      const sessions = await sessionService.discover({
        userId: user.id,
        location: filter.location,
        radius: filter.radius || 5,
        sport: filter.sport,
        timeWindow: filter.timeWindow,
      });

      return sessions;
    },
  },

  Mutation: {
    joinSession: async (_, { sessionId }: { sessionId: string }, { user }: Context) => {
      if (!user) throw new AuthenticationError('Must be logged in');

      const registration = await sessionService.join({
        sessionId,
        userId: user.id,
      });

      return registration;
    },
  },

  Subscription: {
    sessionUpdated: {
      subscribe: (_, { id }, { pubsub }) => pubsub.asyncIterator(`SESSION_${id}`),
    },
  },
};
```

## React Component (TypeScript)

```typescript
import { useState, useEffect } from 'react';
import { Session } from '@fieldday/shared/types';
import { useSession } from '@/hooks/use-session';
import { Button } from '@fieldday/ui';

interface SessionCardProps {
  sessionId: string;
  onJoin?: (session: Session) => void;
}

/**
 * Session card component displaying session details and join button
 */
export function SessionCard({ sessionId, onJoin }: SessionCardProps) {
  const { session, isLoading, join } = useSession(sessionId);
  const [isJoining, setIsJoining] = useState(false);

  const handleJoin = async () => {
    try {
      setIsJoining(true);
      const registration = await join();
      onJoin?.(session);
    } catch (error) {
      console.error('Failed to join session:', error);
      // Show error toast
    } finally {
      setIsJoining(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="session-card" role="article" aria-label={`Session: ${session.title}`}>
      <h3>{session.title}</h3>
      <p>{session.description}</p>

      <div className="session-details">
        <span>{new Date(session.startTime).toLocaleDateString()}</span>
        <span>{session.capacity.current}/{session.capacity.max} players</span>
      </div>

      <Button
        onClick={handleJoin}
        disabled={isJoining || session.capacity.current >= session.capacity.max}
        aria-label={`Join ${session.title}`}
      >
        {isJoining ? 'Joining...' : 'Join Session'}
      </Button>
    </div>
  );
}
```

## React Hook (Custom)

```typescript
import { useState, useEffect } from 'react';
import { useQuery, useMutation } from 'react-query';
import { Session, Registration } from '@fieldday/shared/types';
import { api } from '@/lib/api';

/**
 * Hook for managing session data and actions
 */
export function useSession(sessionId: string) {
  const {
    data: session,
    isLoading,
    error,
    refetch,
  } = useQuery<Session>(['session', sessionId], () => api.sessions.get(sessionId), {
    staleTime: 60000, // 1 minute
    cacheTime: 300000, // 5 minutes
  });

  const joinMutation = useMutation<Registration, Error, void>(() => api.sessions.join(sessionId), {
    onSuccess: () => {
      refetch();
    },
  });

  return {
    session,
    isLoading,
    error,
    join: joinMutation.mutate,
    isJoining: joinMutation.isLoading,
    refetch,
  };
}
```

## Stripe Payment

```typescript
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

/**
 * Create a deposit payment intent
 * ALWAYS use idempotency keys for payments
 */
async function createDepositIntent(
  sessionId: string,
  userId: string,
  amount: number
): Promise<Stripe.PaymentIntent> {
  const idempotencyKey = `deposit-${sessionId}-${userId}`;

  const paymentIntent = await stripe.paymentIntents.create(
    {
      amount,
      currency: 'usd',
      metadata: {
        sessionId,
        userId,
        type: 'deposit',
      },
      description: `Deposit for session ${sessionId}`,
    },
    { idempotencyKey }
  );

  // Store transaction record
  await db.insert('transactions', {
    id: paymentIntent.id,
    user_id: userId,
    session_id: sessionId,
    amount,
    type: 'deposit',
    status: 'pending',
    stripe_id: paymentIntent.id,
  });

  return paymentIntent;
}

/**
 * Handle Stripe webhook
 */
async function handleStripeWebhook(req: Request, res: Response) {
  const sig = req.headers['stripe-signature']!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      await handlePaymentSuccess(paymentIntent);
      break;

    case 'payment_intent.payment_failed':
      const failedIntent = event.data.object as Stripe.PaymentIntent;
      await handlePaymentFailure(failedIntent);
      break;
  }

  res.json({ received: true });
}
```

## Youth Safety Guards

```typescript
/**
 * CRITICAL: Block all adult-to-minor direct messages
 */
async function validateMessageRecipients(senderId: string, recipientIds: string[]): Promise<void> {
  const sender = await userService.getById(senderId);
  const recipients = await userService.getByIds(recipientIds);

  for (const recipient of recipients) {
    // Check if recipient is a minor
    const isMinor =
      recipient.dateOfBirth &&
      Date.now() - recipient.dateOfBirth.getTime() < 18 * 365 * 24 * 60 * 60 * 1000;

    if (isMinor && !sender.roles.includes('parent')) {
      // BLOCK: Adult trying to DM a minor
      logger.warn('Blocked adult-to-minor DM attempt', {
        senderId,
        recipientId: recipient.id,
        timestamp: new Date(),
      });

      throw new ForbiddenError(
        'Direct messages to minors are not allowed',
        'YOUTH_PROTECTION_VIOLATION'
      );
    }
  }
}

/**
 * Ensure guardian visibility for youth team messages
 */
async function createTeamConversation(teamId: string, participants: User[]): Promise<Conversation> {
  // Check if any participants are minors
  const hasMinors = participants.some((p) => isMinor(p));

  // If minors, add their guardians
  let allParticipants = [...participants];
  if (hasMinors) {
    const guardians = await getGuardiansForTeam(teamId);
    allParticipants = [...allParticipants, ...guardians];
  }

  const conversation = await db.insert('conversations', {
    team_id: teamId,
    type: 'team',
    guardian_visible: hasMinors, // REQUIRED if minors
    participants: allParticipants.map((p) => p.id),
  });

  return conversation;
}
```

## Testing Patterns

```typescript
import { describe, it, expect, beforeEach } from '@jest/globals';
import { calculateReliabilityScore } from './reliability';

describe('calculateReliabilityScore', () => {
  it('should calculate score based on attendance and punctuality', () => {
    const score = calculateReliabilityScore({
      attended: 45,
      total: 50,
      onTime: 42,
      cancelled: 2,
    });

    expect(score).toBe(84);
  });

  it('should penalize cancellations', () => {
    const score = calculateReliabilityScore({
      attended: 40,
      total: 50,
      onTime: 38,
      cancelled: 10,
    });

    expect(score).toBeLessThan(70);
  });
});

// Integration test
describe('POST /api/sessions', () => {
  it('should create session and notify nearby players', async () => {
    const response = await request(app)
      .post('/api/sessions')
      .set('Authorization', `Bearer ${authToken}`)
      .send(mockSessionData)
      .expect(201);

    expect(response.body.success).toBe(true);
    expect(response.body.data.id).toBeDefined();
    expect(notificationService.send).toHaveBeenCalled();
  });

  it('should reject invalid capacity', async () => {
    await request(app)
      .post('/api/sessions')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ ...mockSessionData, capacity: { max: 0 } })
      .expect(400);
  });
});
```

## Common Constants

```typescript
// Performance targets
export const PERFORMANCE_TARGETS = {
  SESSION_DISCOVERY_MS: 200,
  JOIN_FLOW_SECONDS: 20,
  PAYMENT_PROCESSING_SECONDS: 3,
  CALENDAR_SYNC_SECONDS: 30,
  PUSH_NOTIFICATION_SECONDS: 5,
} as const;

// Reliability thresholds
export const RELIABILITY = {
  NO_FLAKE_THRESHOLD: 95,
  SAFETY_FIRST_THRESHOLD: 90,
  MIN_SESSIONS_FOR_BADGE: 10,
} as const;

// Capacity limits
export const CAPACITY = {
  MIN: 2,
  MAX: 100,
  DEFAULT_MIN: 6,
  DEFAULT_MAX: 20,
} as const;

// Distance limits
export const DISTANCE = {
  DEFAULT_RADIUS_MILES: 5,
  MAX_RADIUS_MILES: 50,
} as const;
```

---

**Remember**: Always prioritize safety, validate inputs, handle errors gracefully, and keep performance targets in mind!
