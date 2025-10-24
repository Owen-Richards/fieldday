# Organizer Console

Web dashboard for session organizers to manage leagues, clinics, pickup games, and ladders.

## Purpose

Empower organizers to create, manage, and grow sports communities with tools for scheduling, payments, communication, and analytics.

## User Types

- **Pickup Game Hosts**: Organize one-off or recurring pickup sessions
- **League Commissioners**: Manage multi-week leagues with standings
- **Clinic Directors**: Run youth/adult clinics with skill progression
- **Ladder Coordinators**: Manage competitive ladder systems
- **Boat Captains**: Organize water sports outings

## Core Features

### 1. Session Management

#### Session Composer

Multi-step form with templates for quick creation:

- Sport selection with sport-specific fields
- Venue selection (search or add new)
- Date/time picker with recurring options
- Capacity and waitlist settings
- Pricing with deposit options
- Registration deadline and cancellation policy
- Requirements (skill level, equipment, waivers)

#### Templates

Pre-configured templates for common scenarios:

- "Monday Night Soccer" (recurring weekly)
- "8-Week Basketball League"
- "Youth Soccer Clinic"
- "Weekend Surf Session"
- "Competitive Tennis Ladder"

#### Roster Management

- Real-time attendee list with check-in status
- Waitlist management with auto-promotion
- Manual add/remove participants
- Send messages to roster
- Export attendee data (CSV)

### 2. Scheduling

#### Calendar View

- Month/week/day views
- Drag-and-drop rescheduling
- Bulk session creation
- Conflict detection (venue, staff)
- Weather integration for outdoor sports

#### Recurring Sessions

- Weekly, biweekly, monthly patterns
- Season builder (e.g., 8-week spring league)
- Blackout dates (holidays, maintenance)
- Auto-registration carryover

### 3. Payments & Financials

#### Payment Collection

- Credit card, debit, Apple Pay, Google Pay
- Deposit options (percentage or flat fee)
- Split payments (pay per session or full season)
- Refund management with policy enforcement
- Promo codes and discounts

#### Payout Dashboard

- Available balance
- Payout schedule and history
- Transaction details with filters
- Revenue reports by session/sport/venue
- Tax reporting (1099 forms)

#### Pricing Intelligence

AI-powered pricing suggestions based on:

- Historical fill rates
- Similar sessions in area
- Time of day/week seasonality
- Participant skill level
- Venue costs

### 4. Communication

#### Messaging Tools

- In-app announcements to roster
- Email notifications (automatic + manual)
- SMS alerts for urgent updates
- Push notifications via mobile app
- Guardian-visible channels for youth sessions

#### Notification Templates

- Session reminders (24h, 1h before)
- Waitlist promotions
- Cancellation notices
- Weather alerts
- Payment reminders

### 5. Staff Management

#### Roles

- **Referees**: Assign to sessions, track hours, process payouts
- **Coaches**: Skill verification, background checks, certifications
- **Assistants**: Co-organizer permissions
- **Volunteers**: Parent volunteers for youth sessions

#### Scheduling

- Staff availability calendars
- Conflict detection
- Auto-assignment based on availability
- Payment tracking and invoicing

### 6. Analytics & Reporting

#### Key Metrics

- Fill rate by session/venue/time
- Revenue trends over time
- Participant retention rate
- Average session size
- No-show/cancellation rate
- Reliability score distribution

#### Reports

- Attendance reports
- Financial summaries
- Participant demographics
- Growth metrics (week-over-week, month-over-month)
- Custom date ranges and filters

#### Dashboards

- Real-time session status
- Upcoming sessions pipeline
- Revenue forecasts
- Alerts for low-fill sessions

### 7. Safety & Compliance

#### Waivers

- Digital waiver collection
- Template library (general, youth, water sports)
- E-signature capture
- Audit trail and storage

#### Background Checks

- Integration with background check providers
- Status tracking per coach/staff
- Expiration reminders
- Parent-visible verification status

#### Incident Reporting

- Safety incident forms
- Return-to-play workflows
- Insurance claim documentation

## Tech Stack

- **Framework**: React 18 + TypeScript
- **Build**: Vite
- **Routing**: React Router v6
- **State**: React Query + Zustand
- **Forms**: React Hook Form + Zod
- **UI**: @fieldday/ui + Headless UI
- **Charts**: Recharts
- **Calendar**: FullCalendar
- **Tables**: TanStack Table
- **Notifications**: React Hot Toast

## Project Structure

```
organizer-console/
├── src/
│   ├── components/       # Reusable UI components
│   ├── features/         # Feature modules
│   │   ├── sessions/     # Session management
│   │   ├── schedule/     # Calendar and scheduling
│   │   ├── payments/     # Payment and payout management
│   │   ├── communication/ # Messaging tools
│   │   ├── analytics/    # Reports and dashboards
│   │   └── staff/        # Staff management
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utilities and helpers
│   ├── pages/            # Route pages
│   ├── services/         # API clients
│   ├── stores/           # Zustand stores
│   └── types/            # TypeScript types
├── public/               # Static assets
└── tests/                # Test files
```

## Key User Flows

### Create Recurring Pickup Game

1. Dashboard → "Create Session"
2. Select template: "Recurring Pickup"
3. Choose sport (Soccer), venue, time (Mondays 7pm)
4. Set capacity (20), pricing ($10), waitlist (5)
5. Configure recurring: Weekly, 12 weeks
6. Add description and requirements
7. Review → Publish
8. Notify nearby players (auto-matching)

### Manage League

1. Create "8-Week Spring League" template
2. Add teams (manual or registration-based)
3. Generate schedule (round-robin algorithm)
4. Track scores and standings
5. Send weekly recaps to participants
6. Process playoffs and finals

### Handle Waitlist

1. Session reaches capacity
2. New registration → auto-added to waitlist
3. Current participant cancels
4. Waitlist #1 promoted automatically
5. Push notification sent to promoted user
6. Payment processed if required

## Development

### Running Locally

```bash
cd apps/web/organizer-console
npm install
npm run dev
```

Access at `http://localhost:5173`

### Environment Variables

```env
VITE_API_URL=https://api.fieldday.com/graphql
VITE_STRIPE_PUBLIC_KEY=pk_test_xxx
VITE_GOOGLE_MAPS_KEY=AIza_xxx
VITE_SENTRY_DSN=https://xxx@sentry.io/xxx
```

### Testing

```bash
npm run test           # Unit tests
npm run test:e2e       # E2E tests (Playwright)
npm run test:a11y      # Accessibility tests
```

## Performance Optimization

- Route-based code splitting
- React Query caching (5min stale time for sessions)
- Virtual scrolling for large rosters
- Optimistic UI updates
- Background data prefetching

## Security

- Role-based access control (only own sessions)
- CSRF protection on mutations
- Input sanitization (XSS prevention)
- Rate limiting on API calls
- PII redaction in logs

## Accessibility

- Keyboard navigation (Tab, Enter, Escape)
- Screen reader announcements for status changes
- ARIA labels on interactive elements
- Focus management in modals
- Color contrast WCAG AA compliant

## Analytics Events

```typescript
// Track session creation
analytics.track('Session Created', {
  sport: 'Soccer',
  type: 'pickup',
  recurring: true,
  weeks: 12,
  pricing: 10,
});

// Track roster actions
analytics.track('Participant Added', {
  source: 'manual',
  sessionId: 'xxx',
});

// Track payment actions
analytics.track('Payout Requested', {
  amount: 450,
  sessionCount: 3,
});
```

## Related

- [Web Apps Overview](../README.md)
- [Backend API](../../../backend/api/README.md)
- [Mobile App](../../mobile/README.md)
