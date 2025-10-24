# Mobile Services

Business logic, API clients, and platform integrations for the FieldDay mobile app.

## Purpose

Encapsulate data fetching, state management, and third-party integrations to keep components focused on UI.

## Service Categories

### API Services

- **sessionService**: Session CRUD, discovery, join/leave operations
- **userService**: Profile management, authentication, preferences
- **paymentService**: Stripe integration, deposits, refunds
- **reliabilityService**: Score tracking, badge progression
- **conditionsService**: Weather/water data fetching
- **messagingService**: Real-time chat, notifications

### Platform Services

- **authService**: JWT management, biometric authentication, token refresh
- **locationService**: GPS tracking, geofencing, venue proximity
- **calendarService**: Native calendar integration (iOS/Android)
- **notificationService**: Push notification registration and handling
- **storageService**: AsyncStorage wrapper with encryption
- **analyticsService**: Event tracking, user properties, screen views

### Safety Services

- **floatPlanService**: Float plan creation, check-ins, emergency alerts
- **guardianService**: Youth protection, approval workflows
- **incidentService**: Safety reporting, return-to-play workflows
- **backgroundCheckService**: Coach verification status

### Integration Services

- **stripeService**: Payment processing, Connect onboarding
- **mapsService**: Google Maps integration, geocoding
- **weatherService**: Weather API integration
- **noaaService**: Marine conditions data
- **tidePredictionsService**: Tide data for water sports

## Architecture Pattern

### Service Layer Structure

```typescript
// Example service structure
import { apolloClient } from './apollo';
import { GET_SESSIONS, JOIN_SESSION } from './queries';
import { SessionFilter, Session } from '@fieldday/shared/types';

class SessionService {
  /**
   * Discover nearby sessions based on user preferences
   * Performance target: <200ms p95
   */
  async discover(filter: SessionFilter): Promise<Session[]> {
    const { data } = await apolloClient.query({
      query: GET_SESSIONS,
      variables: { filter },
      fetchPolicy: 'cache-first',
      context: {
        timeout: 200, // Enforce performance SLA
      },
    });

    return data.sessions;
  }

  /**
   * Join a session with payment if required
   * Target: <3s for payment processing
   */
  async join(sessionId: string, paymentMethodId?: string): Promise<void> {
    try {
      const { data } = await apolloClient.mutate({
        mutation: JOIN_SESSION,
        variables: { sessionId, paymentMethodId },
        optimisticResponse: {
          joinSession: {
            __typename: 'Session',
            id: sessionId,
            attendees: [...currentAttendees, currentUser],
          },
        },
      });

      // Add to native calendar
      await calendarService.addEvent(data.joinSession);

      // Track analytics
      analyticsService.track('session_joined', {
        sessionId,
        sport: data.joinSession.sport,
        paymentRequired: !!paymentMethodId,
      });

      return data.joinSession;
    } catch (error) {
      logger.error('Failed to join session', { sessionId, error });
      throw error;
    }
  }
}

export const sessionService = new SessionService();
```

### React Query Hooks

Services are wrapped with React Query hooks for declarative data fetching:

```typescript
// hooks/useDiscoverSessions.ts
import { useQuery } from '@tanstack/react-query';
import { sessionService } from '../services/sessionService';

export const useDiscoverSessions = (filter: SessionFilter) => {
  return useQuery({
    queryKey: ['sessions', 'discover', filter],
    queryFn: () => sessionService.discover(filter),
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 60 * 60 * 1000, // 1 hour
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 5000),
  });
};
```

## Key Services

### Location Service

```typescript
// services/locationService.ts
import Geolocation from '@react-native-community/geolocation';
import { Location } from '@fieldday/shared/types';

class LocationService {
  private watchId: number | null = null;

  async getCurrentLocation(): Promise<Location> {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        (position) =>
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            accuracy: position.coords.accuracy,
          }),
        reject,
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 10000 }
      );
    });
  }

  startTracking(callback: (location: Location) => void): void {
    this.watchId = Geolocation.watchPosition(
      (position) =>
        callback({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy,
        }),
      (error) => logger.error('Location tracking error', { error }),
      { enableHighAccuracy: false, distanceFilter: 100 } // Battery optimization
    );
  }

  stopTracking(): void {
    if (this.watchId !== null) {
      Geolocation.clearWatch(this.watchId);
      this.watchId = null;
    }
  }
}

export const locationService = new LocationService();
```

### Notification Service

```typescript
// services/notificationService.ts
import messaging from '@react-native-firebase/messaging';
import { notificationStore } from '../stores/notificationStore';

class NotificationService {
  async initialize(): Promise<void> {
    // Request permission
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (!enabled) return;

    // Get FCM token
    const token = await messaging().getToken();
    await this.registerToken(token);

    // Handle foreground notifications
    messaging().onMessage(async (remoteMessage) => {
      notificationStore.addNotification(remoteMessage);
    });

    // Handle background notifications
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      logger.info('Background notification', { remoteMessage });
    });
  }

  private async registerToken(token: string): Promise<void> {
    // Register with backend
    await apolloClient.mutate({
      mutation: REGISTER_PUSH_TOKEN,
      variables: { token, platform: Platform.OS },
    });
  }
}

export const notificationService = new NotificationService();
```

## Error Handling

All services implement consistent error handling:

```typescript
try {
  const result = await service.operation();
  return result;
} catch (error) {
  logger.error('Operation failed', {
    context: 'service.operation',
    userId: currentUser?.id,
    error: error instanceof Error ? error.message : 'Unknown error',
    stack: error instanceof Error ? error.stack : undefined,
  });

  // Convert to user-friendly error
  if (error.code === 'NETWORK_ERROR') {
    throw new AppError('Check your internet connection', 'NETWORK_ERROR');
  }

  throw error;
}
```

## Performance Monitoring

Services include performance tracking for SLA monitoring:

```typescript
const startTime = Date.now();

try {
  const result = await operation();

  const duration = Date.now() - startTime;
  analyticsService.timing('session.discover', duration);

  if (duration > 200) {
    logger.warn('Discovery exceeded SLA', { duration, filter });
  }

  return result;
} catch (error) {
  // ...
}
```

## Testing

Services use dependency injection for testability:

```typescript
// services/sessionService.test.ts
import { SessionService } from './sessionService';
import { mockApolloClient } from '../__mocks__/apollo';

describe('SessionService', () => {
  let service: SessionService;

  beforeEach(() => {
    service = new SessionService(mockApolloClient);
  });

  it('discovers sessions within performance SLA', async () => {
    const startTime = Date.now();

    const sessions = await service.discover({
      location: { lat: 37.7749, lng: -122.4194 },
      radius: 5,
      sport: 'Soccer',
    });

    const duration = Date.now() - startTime;

    expect(sessions).toHaveLength(5);
    expect(duration).toBeLessThan(200);
  });
});
```

## Related

- [Mobile Components](../components/README.md)
- [Backend API](../../../../backend/api/README.md)
- [Shared Types](../../../../packages/shared/types/README.md)
