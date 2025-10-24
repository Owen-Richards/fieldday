# FieldDay Web Apps

Collection of web applications serving different user types in the FieldDay ecosystem.

## Purpose

Web-based interfaces optimized for desktop and tablet experiences, focusing on complex workflows and administrative tasks.

## Applications

### 1. Marketing Site

**Path**: `apps/web/marketing`

Public-facing website for player acquisition and education.

**Key Features**:

- Hero landing page with value proposition
- How it works sections for each user type
- Pricing and plans
- Blog/content marketing
- SEO optimization
- Email capture and conversion funnels

**Tech Stack**: Next.js, TypeScript, Tailwind CSS

---

### 2. Organizer Console

**Path**: `apps/web/organizer-console`

Dashboard for session organizers to manage leagues, clinics, and pickup games.

**Key Features**:

- Session composer with templates
- Roster management and attendance tracking
- Payment collection and payout dashboard
- Schedule builder with recurring sessions
- Pricing intelligence and suggestions
- Referee assignment and payouts
- Communication tools (email, SMS, in-app)
- Analytics and reporting

**Tech Stack**: React, TypeScript, React Query, Recharts

---

### 3. Facility Console

**Path**: `apps/web/facility-console`

Management dashboard for sports facilities and venues.

**Key Features**:

- Inventory management (courts, fields, ramps)
- Dynamic pricing by time/day/season
- Staff scheduling and access control
- Utilization analytics and heatmaps
- API integrations (scheduling software)
- Revenue reporting
- Maintenance tracking
- Member management

**Tech Stack**: React, TypeScript, React Query, D3.js

---

### 4. Family OS

**Path**: `apps/web/family-os`

Centralized dashboard for parents managing multiple children's sports activities.

**Key Features**:

- Multi-child calendar view
- Carpool coordination and QR handoff
- Volunteer shift scheduling
- Medical cards and emergency contacts
- Team communication (guardian-visible)
- Payment management across kids
- Registration and waiver tracking
- Coach/facility reviews

**Tech Stack**: React, TypeScript, React Query, FullCalendar

## Shared Architecture

### Common Stack

- **Framework**: React 18+ with TypeScript
- **Build Tool**: Vite (fast dev server, optimized builds)
- **State Management**:
  - Server state: React Query
  - Client state: Zustand
- **Styling**: Tailwind CSS + CSS Modules
- **API**: GraphQL (Apollo Client)
- **Authentication**: JWT with HTTP-only cookies
- **Forms**: React Hook Form + Zod validation
- **Routing**: React Router v6
- **Testing**: Vitest + React Testing Library

### Design System

All web apps use the shared design system from `@fieldday/ui`:

- Consistent color palette and typography
- Reusable components (Button, Input, Modal, etc.)
- Accessibility compliance (WCAG 2.1 AA)
- Responsive grid system
- Dark mode support

### Performance Targets

- **First Contentful Paint**: <1.5s on 3G
- **Time to Interactive**: <3s
- **Lighthouse Score**: >90
- **Core Web Vitals**: Pass all metrics

## Development

### Running Locally

```bash
# Run all web apps
npm run dev:web

# Run specific app
npm run dev:marketing
npm run dev:organizer
npm run dev:facility
npm run dev:family
```

### Building for Production

```bash
# Build all web apps
npm run build:web

# Build specific app
npm run build:marketing
npm run build:organizer
npm run build:facility
npm run build:family
```

### Testing

```bash
# Run all web app tests
npm run test:web

# Run specific app tests
npm run test:marketing
npm run test:organizer
npm run test:facility
npm run test:family
```

## Deployment

Each web app is deployed independently:

- **Marketing**: Vercel (Next.js optimized)
- **Organizer Console**: AWS Amplify or Vercel
- **Facility Console**: AWS Amplify or Vercel
- **Family OS**: AWS Amplify or Vercel

### Environment Variables

Each app requires:

```env
VITE_API_URL=https://api.fieldday.com/graphql
VITE_STRIPE_PUBLIC_KEY=pk_...
VITE_GOOGLE_MAPS_KEY=AIza...
VITE_ANALYTICS_ID=G-...
```

## Key User Flows

### Organizer Console: Create Session

1. Click "Create Session" → Select template or start fresh
2. Choose sport, venue, date/time
3. Set capacity, pricing (with AI suggestions)
4. Configure registration options (waitlist, deposits)
5. Add description and requirements
6. Publish → Notify nearby players

### Family OS: Coordinate Carpool

1. View week calendar with all children's activities
2. Select session → Click "Coordinate Carpool"
3. Invite other families or assign driver
4. Driver confirms → QR code generated at pickup time
5. Guardian scans QR to confirm handoff
6. Audit trail recorded

### Facility Console: Dynamic Pricing

1. View utilization heatmap by court/time
2. Identify low-demand slots (e.g., weekday mornings)
3. Apply dynamic pricing (-20% off-peak, +50% prime time)
4. Monitor booking rate changes
5. Adjust pricing rules based on demand

## Security Considerations

### Authentication

- HTTP-only cookies for JWT storage (XSS protection)
- CSRF tokens for state-changing operations
- Session timeout after 15 minutes of inactivity
- Re-authentication for sensitive actions (payments, youth data)

### Authorization

- Role-based access control (RBAC)
- Resource-level permissions (can only edit own sessions)
- Guardian approval required for youth-related actions

### Data Protection

- No PII in client-side logs or analytics
- Sensitive data encrypted in transit (HTTPS) and at rest
- Payment data handled by Stripe (PCI compliance)
- Youth data access logged for audit

## Accessibility

All web apps meet WCAG 2.1 AA standards:

- Keyboard navigation support
- Screen reader compatibility
- Sufficient color contrast (4.5:1 minimum)
- Focus indicators on interactive elements
- ARIA labels for complex interactions
- Semantic HTML structure

## Analytics

Track key metrics across all web apps:

- Page views and user journeys
- Conversion funnels (signup, session creation, payment)
- Error rates and API latency
- User engagement (session duration, return visits)
- Feature adoption rates

## Related Documentation

- [Architecture Overview](../../docs/ARCHITECTURE.md)
- [Backend API](../../backend/api/README.md)
- [Design System](../../packages/ui/README.md)
- [Mobile App](../mobile/README.md)
