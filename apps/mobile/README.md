# FieldDay Mobile App

React Native application for iOS and Android platforms.

## Purpose

Primary mobile experience for FieldDay users, optimizing for quick actions and real-time discovery.

## Target Performance

- **Session discovery**: <200ms p95
- **Join flow**: <20s end-to-end (tap → calendar)
- **Push notifications**: <5s
- **Offline-first**: Core features work without connectivity

## Key Features

### Adult Players

- Instant session discovery with location-based matching
- Quick join flow with calendar integration
- Real-time condition monitoring for outdoor sports
- Reliability score tracking and badges

### Water Sports

- Real-time weather/water conditions
- Float plan creation and check-ins
- Partner matching based on skill and conditions
- MPA (Marine Protected Area) safety blocking

### Parents/Guardians

- Multi-child scheduling at a glance
- Carpool coordination with QR code handoff
- Volunteer shift management
- Emergency medical cards access

### Organizers

- Quick session creation with templates
- Roster management and check-ins
- Payment collection and splits
- Attendance tracking

## Tech Stack

- **Framework**: React Native
- **Navigation**: React Navigation
- **State Management**: Zustand (client), React Query (server)
- **API**: GraphQL (Apollo Client)
- **Authentication**: JWT with biometric support
- **Maps**: Google Maps API
- **Push Notifications**: Firebase Cloud Messaging
- **Offline**: AsyncStorage + React Query persistence
- **Analytics**: Mixpanel

## Project Structure

```
mobile/
├── android/          # Android native code and configuration
├── ios/              # iOS native code and configuration
├── shared/           # Shared React Native code
│   ├── components/   # Reusable UI components
│   ├── screens/      # Screen components
│   ├── navigation/   # Navigation configuration
│   ├── hooks/        # Custom React hooks
│   ├── services/     # API clients and business logic
│   ├── stores/       # Zustand stores
│   ├── utils/        # Utility functions
│   └── types/        # TypeScript types
├── assets/           # Images, fonts, icons
└── __tests__/        # Test files
```

## Getting Started

### Prerequisites

- Node.js 18+
- React Native CLI
- Xcode 14+ (for iOS)
- Android Studio (for Android)
- CocoaPods (for iOS dependencies)

### Installation

```bash
# Install dependencies
npm install

# Install iOS pods
cd ios && pod install && cd ..

# Run on iOS
npm run ios

# Run on Android
npm run android
```

## Development

### Running Tests

```bash
# Unit tests
npm test

# E2E tests (iOS)
npm run e2e:ios

# E2E tests (Android)
npm run e2e:android
```

### Building for Production

```bash
# iOS
npm run build:ios

# Android
npm run build:android
```

## Key User Flows

### Instant Join (<20s target)

1. Open app → auto-location detected
2. See nearby sessions (filtered by sport preferences)
3. Tap session → review details
4. Tap "Join" → payment (if required)
5. Calendar event added + push notification to organizer

### Water Sports Session

1. Create session with conditions thresholds
2. Add float plan (emergency contact, VHF channel)
3. Invite partners with matching skill level
4. Auto-cancel if conditions exceed safety limits
5. Check-in timer starts when session begins

### Carpool Handoff

1. Parent assigns driver for carpool
2. Driver arrives → taps "Check In"
3. QR code generated (one-time use)
4. Guardian scans QR to confirm pickup
5. Audit log recorded

## Safety Features

### Youth Protection

- All adult↔minor DMs are **BLOCKED**
- Team messages with minors are guardian-visible
- Media sharing requires guardian consent toggle
- Background check status visible for coaches

### Water Sports Safety

- Float plans required for offshore activities
- Auto-cancel when conditions exceed thresholds
- Emergency contact notifications
- MPA blocking for illegal activities
- Check-in timers with alerts

## Architecture Decisions

### Offline-First

- Core discovery cached for 5 minutes
- Session details cached for 1 hour
- Optimistic UI updates with rollback on failure
- Background sync when connectivity restored

### Push Notifications

- Session invites and updates
- Carpool reminders (30 min before)
- Condition alerts for water sports
- Float plan check-in reminders
- Reliability score updates

### Performance Optimization

- Image lazy loading with progressive enhancement
- Virtualized lists for session discovery
- Debounced search input (300ms)
- Request deduplication
- Background geolocation with battery optimization

## Contributing

See [CONTRIBUTING.md](../../CONTRIBUTING.md) for development guidelines.

## Related Documentation

- [Architecture Overview](../../docs/ARCHITECTURE.md)
- [API Documentation](../../backend/api/README.md)
- [Design System](../../packages/ui/README.md)
