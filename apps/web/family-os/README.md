# Family OS

Centralized web dashboard for parents/guardians managing multiple children's sports activities.

## Purpose

Single source of truth for families with youth athletes, streamlining registration, scheduling, carpools, volunteers, and communication across multiple sports and organizations.

## Target Users

- **Parents/Guardians**: Managing 1-4 children's sports schedules
- **Multi-Sport Families**: Kids in different sports/leagues simultaneously
- **Busy Parents**: Need quick overview and automated coordination
- **Carpool Coordinators**: Organizing rides with other families
- **Team Parents**: Volunteer coordinators for teams

## Core Features

### 1. Multi-Child Dashboard

#### Family Calendar

- Unified view of all children's activities
- Color-coded by child
- Month/week/day views
- Filter by child, sport, or type (practice/game/carpool)
- Conflict detection (overlapping activities)
- Export to Google/Apple Calendar
- Print-friendly view

#### Child Profiles

- Name, age, school, sports
- Emergency contacts
- Medical information (allergies, conditions, medications)
- Insurance details
- Skill levels per sport
- Dietary restrictions
- Photo and jersey numbers

### 2. Registration Management

#### Active Registrations

- View all active leagues/clinics/camps
- Registration status (pending, confirmed, waitlisted)
- Payment status and reminders
- Required forms (waivers, medical, consent)
- Uniform and equipment needs

#### Registration Workflow

1. Browse available programs (by sport, age, location)
2. Select child(ren) to register
3. Complete required forms
4. Upload medical cards and documents
5. Process payment (deposit or full)
6. Receive confirmation and calendar sync

#### Waitlist Management

- Auto-promotion notifications
- Set preferences for backup options
- Payment hold until confirmed

### 3. Carpool Coordination

#### Carpool Dashboard

- Active carpools for each child
- Upcoming pickups/drop-offs
- Driver assignments per session
- QR code generation for handoff
- Route optimization
- Shared notes (parking, entrance, etc.)

#### Create Carpool

1. Select session(s) to share rides
2. Invite other families from team roster
3. Set pickup location and time
4. Assign driver rotation
5. Send calendar invites to all participants

#### QR Code Handoff

- Driver checks in → generates one-time QR code
- Guardian scans to confirm pickup
- Photo capture option
- Audit log recorded
- Push notifications to all parties

#### Safety Features

- Only guardian-approved drivers
- Background check status visible
- Insurance verification
- Real-time location sharing (optional)
- Emergency contact always available

### 4. Volunteer Management

#### Volunteer Dashboard

- Required volunteer hours per child/team
- Available shifts (team parent, snack duty, field setup)
- Completed hours tracking
- Upcoming commitments
- Swap shift requests

#### Sign Up for Shifts

1. View team volunteer calendar
2. Select open shifts
3. Confirm commitment
4. Receive reminders (24h before)
5. Check in at event
6. Hours automatically tracked

#### Team Parent Tools

- Create volunteer schedule
- Send shift reminders
- Track participation rates
- Generate reports for league
- Recognize top volunteers

### 5. Medical & Safety

#### Medical Cards

- Digital storage of medical forms
- Allergies and medications highlighted
- Emergency contact quick access
- Share with coaches (guardian-controlled)
- Expiration date reminders
- Photo upload of physical cards

#### Incident Reporting

- Report injuries or safety concerns
- Track return-to-play status
- Coach/facility communication
- Insurance claim documentation
- Medical clearance uploads

#### Background Checks

- View coach/staff verification status
- Expiration alerts
- Request verification for new staff

### 6. Communication

#### Team Messaging

- Separate channels per team
- Guardian-visible for all youth messages
- Announcement-only or discussion modes
- Media sharing (with consent toggle)
- Push notifications
- Mute/unmute options

#### Direct Messages

- Parent-to-parent (carpool coordination)
- Guardian-to-coach (private questions)
- **BLOCKED**: Adult-to-minor DMs
- Read receipts
- Message history

#### Notifications

- Practice/game reminders
- Carpool confirmations
- Volunteer shift reminders
- Payment due alerts
- Weather cancellations
- Injury reports

### 7. Payments & Financials

#### Payment Dashboard

- All registrations and fees by child
- Upcoming payments and due dates
- Payment history and receipts
- Refund requests and status
- Split payments over time
- Tax documents (dependent care receipts)

#### Multi-Child Discounts

- Automatic sibling discounts
- Family payment plans
- Promo code application

### 8. Document Management

#### Document Library

- Waivers (signed and archived)
- Medical forms
- Registration confirmations
- Schedules and rosters
- Volunteer agreements
- Code of conduct acknowledgments

#### Auto-Reminders

- Form expiration alerts
- Annual waiver renewals
- Medical card updates
- Background check renewals

## Tech Stack

- **Framework**: React 18 + TypeScript
- **Build**: Vite
- **Routing**: React Router v6
- **State**: React Query + Zustand
- **Calendar**: FullCalendar
- **Forms**: React Hook Form + Zod
- **UI**: @fieldday/ui + Headless UI
- **QR Codes**: qrcode.react
- **Maps**: Google Maps API
- **File Upload**: AWS S3 with presigned URLs

## Project Structure

```
family-os/
├── src/
│   ├── components/       # Reusable UI components
│   ├── features/         # Feature modules
│   │   ├── calendar/     # Multi-child calendar
│   │   ├── children/     # Child profile management
│   │   ├── carpools/     # Carpool coordination
│   │   ├── volunteers/   # Volunteer scheduling
│   │   ├── medical/      # Medical cards and safety
│   │   ├── messaging/    # Team communication
│   │   └── payments/     # Payment management
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

### Coordinate Carpool

1. Family OS Dashboard → Select child's upcoming game
2. Click "Coordinate Carpool"
3. View other families attending
4. Invite families to carpool
5. Assign driver (self or rotation)
6. Set pickup location and time
7. Send calendar invites
8. On game day: Driver checks in → QR code generated
9. Guardian scans QR to confirm pickup
10. Driver completes drop-off → logs end time

### Add Medical Information

1. Child Profile → Medical tab
2. Click "Add Medical Card"
3. Fill out form:
   - Allergies (food, medication, environmental)
   - Current medications
   - Medical conditions (asthma, diabetes, etc.)
   - Emergency contacts (2 required)
   - Insurance information
4. Upload photo of physical medical card
5. Set expiration date
6. Toggle "Share with coaches"
7. Save → Auto-sync to all registrations

### Manage Family Calendar

1. Dashboard → Calendar view
2. See all children's activities color-coded
3. Filter by child (deselect others)
4. Click event → View details
5. Actions: Carpool, Message Team, Add to Device Calendar
6. Export week view for refrigerator print

## Development

### Running Locally

```bash
cd apps/web/family-os
npm install
npm run dev
```

Access at `http://localhost:5174`

### Environment Variables

```env
VITE_API_URL=https://api.fieldday.com/graphql
VITE_STRIPE_PUBLIC_KEY=pk_test_xxx
VITE_GOOGLE_MAPS_KEY=AIza_xxx
VITE_AWS_S3_BUCKET=fieldday-documents-dev
VITE_SENTRY_DSN=https://xxx@sentry.io/xxx
```

### Testing

```bash
npm run test           # Unit tests
npm run test:e2e       # E2E tests (Playwright)
npm run test:a11y      # Accessibility tests
```

## Safety & Privacy

### Youth Protection

- All adult-to-minor DMs **BLOCKED**
- Team messages are guardian-visible
- Media sharing requires consent toggle
- Background check status visible for all coaches
- Incident reporting with mandatory fields

### Data Privacy

- Medical data encrypted at rest
- PII not shared without explicit consent
- COPPA compliance (Children's Online Privacy Protection Act)
- Granular privacy settings per child
- Right to delete all data

### Audit Trail

All sensitive actions logged:

- Medical card access
- Document downloads
- Carpool handoffs (QR scans)
- Consent toggles
- Privacy setting changes

## Accessibility

- Keyboard navigation for all features
- Screen reader support (calendar, forms)
- High contrast mode
- Large touch targets (mobile-responsive)
- ARIA labels for complex interactions
- Focus management in modals

## Performance

- Route-based code splitting
- Virtual scrolling for large event lists
- Optimistic UI updates (calendar actions)
- Image optimization for medical cards
- Prefetch next week's calendar data

## Analytics Events

```typescript
// Track carpool coordination
analytics.track('Carpool Created', {
  childCount: 2,
  families: 3,
  sessions: 5,
});

// Track QR handoff
analytics.track('QR Handoff Completed', {
  carpoolId: 'xxx',
  scanTime: 2.3, // seconds to scan
});

// Track volunteer signup
analytics.track('Volunteer Shift Claimed', {
  shiftType: 'team_parent',
  childTeamId: 'xxx',
});
```

## Related

- [Web Apps Overview](../README.md)
- [Backend API](../../../backend/api/README.md)
- [Mobile App](../../mobile/README.md)
