# Facility Console

Web dashboard for sports facilities and venues to manage inventory, staff, pricing, and analytics.

## Purpose

Optimize facility utilization, automate scheduling, implement dynamic pricing, and maximize revenue through data-driven insights.

## Target Users

- **Facility Managers**: Oversee operations and revenue
- **Booking Coordinators**: Manage reservations and scheduling
- **Staff Schedulers**: Coordinate staff shifts and access
- **Maintenance Teams**: Track repairs and equipment status
- **Facility Owners**: Review analytics and financial reports

## Core Features

### 1. Inventory Management

#### Venue Assets

- Courts (tennis, basketball, pickleball, volleyball)
- Fields (soccer, baseball, football, lacrosse)
- Ramps (skateparks, boat launches)
- Studios (yoga, dance, martial arts)
- Pools (lap, recreational, diving)
- Specialty spaces (climbing walls, batting cages, etc.)

#### Asset Configuration

- Name and type
- Capacity and dimensions
- Surface type (grass, turf, court surface)
- Amenities (lights, nets, scoreboards)
- Accessibility features
- Condition status
- Photos and virtual tours

#### Availability Management

- Default hours by day of week
- Seasonal adjustments (winter/summer)
- Maintenance blackouts
- Weather-dependent closures
- Holiday schedules
- Special events

### 2. Scheduling & Reservations

#### Calendar View

- Grid view of all assets
- Drag-and-drop booking
- Recurring reservation templates
- Conflict detection
- Color-coded by booking type (league, clinic, rental, maintenance)

#### Booking Types

- **Leagues**: Multi-week recurring blocks
- **Clinics/Camps**: Structured programs
- **Rentals**: One-off reservations
- **Maintenance**: Downtime for repairs
- **Private Events**: Exclusive facility use

#### Booking Management

- Approval workflows (auto-approve vs. manual)
- Waitlist for popular slots
- Cancellation policies and fees
- Buffer time between bookings
- Equipment reservations (goals, nets, cones)

### 3. Dynamic Pricing

#### Pricing Rules

- Base rates by asset type
- Time-based pricing (prime time vs. off-peak)
- Day-based pricing (weekday vs. weekend)
- Season-based pricing (summer premium)
- Duration discounts (2+ hours)
- Member vs. non-member rates

#### Demand-Based Pricing

- Historical utilization analysis
- Real-time demand monitoring
- Automatic price adjustments
- Surge pricing for peak times
- Discount promotions for low-demand slots

#### Pricing Intelligence Dashboard

- Recommended rates based on fill rate
- Competitor pricing data (if available)
- Revenue optimization suggestions
- A/B testing price points
- ROI calculator for price changes

### 4. Staff Management

#### Staff Profiles

- Name, role, certifications
- Availability calendar
- Hourly rate or salary
- Background check status
- Training and certifications
- Performance ratings

#### Roles

- **Front Desk**: Check-in, customer service
- **Maintenance**: Repairs, setup, cleanup
- **Coaches**: Instruct clinics and lessons
- **Lifeguards**: Pool supervision
- **Security**: Facility access control
- **Management**: Administrative oversight

#### Scheduling

- Staff availability input
- Auto-scheduling based on bookings
- Conflict detection (double-booking)
- Overtime alerts
- Shift swapping requests
- Time tracking and payroll export

### 5. Member Management

#### Membership Tiers

- Basic (discounted booking rates)
- Premium (priority access, free amenities)
- Family (multi-user accounts)
- Youth/Senior (discounted rates)
- Corporate (bulk booking credits)

#### Member Features

- Profile and payment info
- Booking history
- Membership status and renewal
- Credits and packages
- Guest passes
- Auto-billing and invoicing

### 6. Analytics & Reporting

#### Utilization Metrics

- Court/field usage percentage by hour/day/week
- Peak vs. off-peak utilization
- Asset-level performance
- Booking source analysis (web, mobile, phone, walk-in)
- Cancellation rate and reasons

#### Financial Reports

- Revenue by asset, booking type, time period
- Revenue per available hour (RevPAH)
- Average booking value
- Payment method breakdown
- Refund and discount tracking
- Profit margins after costs

#### Forecasting

- Demand predictions by season
- Revenue projections
- Capacity planning (add new courts?)
- Staffing needs forecast
- Maintenance schedule optimization

#### Custom Dashboards

- Real-time facility status
- Upcoming bookings pipeline
- Staff shift coverage
- Maintenance alerts
- KPI tracking (revenue, utilization, satisfaction)

### 7. Integrations & APIs

#### External Integrations

- **Scheduling Software**: CourtReserve, EZFacility, PerfectMind
- **Payment Processors**: Stripe, Square, PayPal
- **Access Control**: RFID, keycard systems
- **Accounting**: QuickBooks, Xero
- **CRM**: Salesforce, HubSpot
- **Marketing**: Mailchimp, Constant Contact

#### FieldDay API

- Expose available slots to FieldDay discovery
- Real-time booking confirmations
- Pricing and capacity sync
- Member verification
- Revenue sharing and payouts

### 8. Maintenance & Operations

#### Maintenance Tracking

- Asset condition logs
- Repair requests and work orders
- Scheduled maintenance calendar
- Equipment inventory (nets, goals, etc.)
- Vendor management
- Cost tracking per asset

#### Incident Reporting

- Facility damage or safety issues
- User incident reports
- Insurance claim documentation
- Resolution tracking

### 9. Customer Communication

#### Automated Notifications

- Booking confirmations
- Reminder emails (24h before)
- Cancellation notices
- Waitlist promotions
- Membership renewal reminders
- Maintenance closures

#### Feedback & Reviews

- Post-session surveys
- Facility ratings
- Staff performance feedback
- Feature requests
- Response management

## Tech Stack

- **Framework**: React 18 + TypeScript
- **Build**: Vite
- **Routing**: React Router v6
- **State**: React Query + Zustand
- **Calendar**: FullCalendar
- **Charts**: D3.js + Recharts
- **Tables**: TanStack Table
- **UI**: @fieldday/ui + Headless UI
- **Maps**: Google Maps API (for multi-facility view)

## Project Structure

```
facility-console/
├── src/
│   ├── components/       # Reusable UI components
│   ├── features/         # Feature modules
│   │   ├── inventory/    # Asset management
│   │   ├── scheduling/   # Calendar and bookings
│   │   ├── pricing/      # Dynamic pricing
│   │   ├── staff/        # Staff management
│   │   ├── members/      # Membership management
│   │   ├── analytics/    # Reports and dashboards
│   │   ├── integrations/ # API integrations
│   │   └── maintenance/  # Maintenance tracking
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

### Dynamic Pricing Setup

1. Analytics Dashboard → Identify low-utilization slots
2. Pricing → Select asset (Tennis Court 1)
3. View current utilization heatmap
4. Set pricing rules:
   - Weekday 9am-5pm: $30/hr (off-peak, -25%)
   - Weekday 5pm-9pm: $50/hr (prime time, +25%)
   - Weekend all day: $45/hr (standard)
5. Enable demand-based adjustments (±20% range)
6. Save and publish
7. Monitor booking rate changes over 2 weeks
8. Adjust rules based on results

### Staff Scheduling

1. Staff → Calendar view
2. See upcoming bookings requiring staff
3. Auto-suggest staff based on availability
4. Assign staff to shifts
5. Send shift confirmations
6. Staff can view in mobile app
7. Track time in/out for payroll

### Multi-Facility Management

1. Dashboard → Facility selector
2. View aggregate metrics across all locations
3. Compare utilization and revenue
4. Identify top and bottom performers
5. Share best practices across locations

## Development

### Running Locally

```bash
cd apps/web/facility-console
npm install
npm run dev
```

Access at `http://localhost:5175`

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
```

## Performance

- Route-based code splitting
- Virtual scrolling for large booking lists
- Debounced calendar interactions
- Background data sync (every 5 min)
- Optimistic UI updates

## Security

- Multi-facility access control
- Role-based permissions (view/edit/admin)
- Staff-level permissions
- Payment data handled by Stripe (PCI compliance)
- Audit logs for financial transactions

## Accessibility

- Keyboard navigation (Tab, Arrow keys)
- Screen reader support
- ARIA labels for complex calendar
- Focus management in modals
- WCAG 2.1 AA compliant

## Analytics Events

```typescript
// Track dynamic pricing changes
analytics.track('Pricing Rule Updated', {
  assetId: 'court-1',
  timeSlot: 'weekday_evening',
  oldPrice: 40,
  newPrice: 50,
  priceChange: 25, // percent
});

// Track utilization improvements
analytics.track('Utilization Milestone', {
  assetId: 'field-2',
  utilizationRate: 75, // percent
  improvement: 15, // percentage points
});

// Track booking actions
analytics.track('Booking Created', {
  source: 'web',
  type: 'league',
  duration: 8, // weeks
  revenue: 1200,
});
```

## Value Proposition

### ROI for Facilities

- **30%+ utilization increase** through dynamic pricing
- **20% revenue growth** in off-peak hours
- **50% reduction** in manual scheduling time
- **15% staff cost savings** through optimized scheduling
- **Real-time insights** for data-driven decisions

## Related

- [Web Apps Overview](../README.md)
- [Backend API](../../../backend/api/README.md)
- [Organizer Console](../organizer-console/README.md)
