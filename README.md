# FieldDay - Sports OS Platform

> **Play anything, anywhere, with people you trust.**

[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)](https://www.typescriptlang.org/)
[![Node](https://img.shields.io/badge/Node-18+-green)](https://nodejs.org/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## 🎯 Mission

**FieldDay is building the Sports OS that unifies recreational sports across four critical verticals:**

1. **Adult Pickup Games** - Instant discovery and joining of local pickup games (<20s from tap to calendar)
2. **Partner-Finding for Water Sports** - Real-time condition-aware matching for surf, kite, spearfishing, sailing
3. **Youth Sports Logistics** - Family OS managing multi-child schedules, carpools, volunteers, medical cards
4. **Facility Inventory Management** - Dynamic pricing, staff scheduling, utilization optimization

**Core Differentiation**: A **trust-first Reliability/Skill/Conditions Graph** creates a data moat that:

- Tracks user reliability (0-100 score based on attendance, punctuality, incident-free rate)
- Validates skill levels per sport (1-10 scale with coach verification)
- Integrates real-time weather/water conditions for safety and auto-cancellation
- Enforces youth protection (guardian-visible messaging, background checks, incident reporting)

**Result**: Superior liquidity (players find games faster), retention (reliability scoring reduces no-shows), and margins (city-by-city data moats create defensibility).

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm 9+
- Docker Desktop (for local development)
- PostgreSQL 14+
- Redis 6+

### Development Setup

```bash
# Clone the repository
git clone https://github.com/fieldday/fieldday.git
cd fieldday

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Start development servers
npm run dev

# Run tests
npm run test

# Build for production
npm run build
```

## 🏗️ Architecture

This is a **monorepo** managed with **Turborepo** and **Lerna** containing:

### Apps

- **Mobile** (`apps/mobile/`) - React Native with iOS/Android native code
- **Marketing Site** (`apps/web/marketing/`) - Next.js public website
- **Organizer Console** (`apps/web/organizer-console/`) - React dashboard for session organizers
- **Facility Console** (`apps/web/facility-console/`) - React dashboard for venue managers
- **Family OS** (`apps/web/family-os/`) - React dashboard for parents

### Backend Services

- **API Gateway** (`backend/api/`) - GraphQL/REST unified API
- **Discovery Service** (`backend/services/discovery/`) - Session matching engine
- **Conditions Service** (`backend/services/conditions/`) - Weather/water data integration
- **Payments Service** (`backend/services/payments/`) - Stripe Connect integration
- **Messaging Service** (`backend/services/messaging/`) - Real-time chat with safety controls

### Shared Packages

- **Types** (`packages/shared/`) - Domain types and utilities
- **UI Components** (`packages/ui/`) - Design system
- **Config** (`packages/config/`) - Shared configurations

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for detailed technical documentation.

## 🎨 Key Features

### For Players 🏃

- 🔍 **Instant Discovery** - Find games near you in <200ms
- 🌊 **Condition Matching** - Real-time weather/water conditions for surf, kite, spearo
- 📅 **Smart Calendar** - Sync with Apple/Google calendars, conflict detection
- ⭐ **Reliability System** - Build your reputation (0-100 score)
- 💬 **Safe Messaging** - Role-scoped chat with guardian controls
- 🏆 **Badges** - No-Flake, Safety-First, Coach-Verified, Cold-Water

### For Organizers 📋

- 📝 **Session Composer** - Create any type of activity (pickup/clinic/league/boat)
- 💰 **Automated Payments** - Deposits, splits, and payouts via Stripe Connect
- 📊 **Fill-Rate Analytics** - Optimize pricing and timing
- 👥 **Waitlist Management** - Auto-fill cancellations
- 🎟️ **Coupons & Discounts** - Sibling, early-bird, scholarship pricing
- 📈 **Insights Dashboard** - Fill-rate streaks reduce platform fees

### For Families 👨‍👩‍👧‍👦

- 📱 **Family OS** - Manage multiple children's activities in one place
- 🚗 **Carpool Planner** - Coordinate rides with QR code handoff
- 📱 **Guardian Controls** - Monitor all youth interactions (COPPA-compliant)
- 🏥 **Medical Tracking** - Store medical cards and incident reports
- 🗓️ **Conflict Resolution** - Auto-detect scheduling conflicts
- 🤝 **Volunteer Matrix** - Fair distribution of team duties

### For Facilities 🏟️

- 📍 **Inventory Management** - Control courts/fields/ramps/ice
- 💵 **Dynamic Pricing** - Maximize utilization with pricing rules
- 👷 **Staff Assignment** - Manage refs and personnel
- 📈 **Utilization Reports** - Track performance and revenue
- ⚡ **Light Controls** - API integration for field lighting
- ✅ **Booking Approvals** - Review and approve organizer requests

## 🛡️ Safety & Trust

FieldDay is **trust-first** with comprehensive safety features:

- ✅ Background check tracking for coaches and volunteers
- 👨‍👩‍👧 Guardian-visible youth messaging (adult-to-minor DMs blocked)
- 🌊 Float plans for water activities with emergency contacts
- 📋 Incident reporting system with return-to-play workflows
- 🚫 MPA (Marine Protected Area) blocking for illegal activities
- 📄 Insurance verification and waiver management
- 📊 Reliability scoring to reduce no-shows and flakes

## 📊 Performance Targets

| Metric                     | Target       |
| -------------------------- | ------------ |
| Session discovery          | <200ms p95   |
| Join flow (tap → calendar) | <20 seconds  |
| Payment processing         | <3 seconds   |
| Calendar sync              | <30 seconds  |
| Push notifications         | <5 seconds   |
| Page load (3G)             | <1.5 seconds |

## 🧪 Testing

```bash
# Unit tests
npm run test:unit

# Integration tests
npm run test:integration

# E2E tests
npm run test:e2e

# Accessibility tests
npm run test:a11y

# All tests with coverage
npm run test -- --coverage
```

## 📚 Documentation

- [Architecture Overview](docs/ARCHITECTURE.md)
- [API Documentation](docs/api/README.md)
- [Mobile Development](apps/mobile/README.md)
- [Web Development](apps/web/README.md)
- [Backend Services](backend/README.md)
- [Type Definitions](packages/shared/types/README.md)
- [Deployment Guide](docs/deployment.md)
- [Contributing Guide](CONTRIBUTING.md)
- [Security Policy](SECURITY.md)

## 🔧 Development with AI

This repository is **optimized for AI-assisted development**:

- ✅ Comprehensive JSDoc comments
- ✅ TypeScript with strict mode for better context
- ✅ Structured architecture documentation
- ✅ Clear naming conventions (see [.github/copilot-instructions.md](.github/copilot-instructions.md))
- ✅ Example patterns and tests
- ✅ Domain model documentation

See [.github/copilot-instructions.md](.github/copilot-instructions.md) for detailed AI coding guidelines.

## 🗺️ Roadmap

### R0 (MVP - 8 weeks) 🚀

- [x] Monorepo setup with Turborepo
- [ ] Organizer OS v1 (session composer, roster management)
- [ ] Instant Join flow (<20s)
- [ ] Conditions v1 (wind, swell, tide, visibility)
- [ ] Family OS core (registration, calendar, carpool/volunteer)
- [ ] Payments/waivers (Stripe Connect)
- [ ] Facility slots basic

### R1 (Months 3-4) 📈

- [ ] Ladders & seasons
- [ ] Ref assigning/payouts
- [ ] Reliability badges (No-Flake, Safety-First, etc.)
- [ ] Price suggestions based on fill-rate analytics

### R2 (Months 5-6) 🔌

- [ ] Facility APIs for external integrations
- [ ] Open data for conditions partners
- [ ] Coach practice builder
- [ ] Sponsor tools and placements

### R3 (Months 7-8) 🌐

- [ ] Social graph import (contacts, teams)
- [ ] Used gear marketplace
- [ ] Team insurance bundles

## 🚢 Deployment

The platform is deployed using:

- **Container Orchestration**: AWS EKS (Kubernetes)
- **CDN**: CloudFront for global distribution
- **Database**: RDS PostgreSQL (primary), ElastiCache Redis (caching)
- **Object Storage**: S3 for media and documents
- **Monitoring**: DataDog (metrics), Sentry (errors)
- **CI/CD**: GitHub Actions

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Quality

- All code must pass TypeScript type checking
- All tests must pass
- Code coverage must be >80%
- All PRs require review from at least one maintainer

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

Built with ❤️ by the FieldDay team for the global sports community.

Special thanks to:

- Our early adopters and beta testers
- The open-source community
- All contributors who help make sports accessible to everyone

---

## 📞 Contact & Support

- **Website**: [fieldday.com](https://fieldday.com)
- **Email**: dev@fieldday.com
- **Twitter**: [@fieldday](https://twitter.com/fieldday)
- **Discord**: [Join our community](https://discord.gg/fieldday)

**Questions?** Open an issue or reach out at dev@fieldday.com

---

**Remember**: Play anything, anywhere, with people you trust. 🎯

git clone <repository-url>
cd fieldday

```

2. **Install Dependencies**
For the backend:
```

cd backend
npm install

```

For the mobile apps:
```

cd apps/mobile
npm install

```

For the web applications:
```

cd apps/web
npm install

````

3. **Run the Applications**
- Start the backend server:
  ```
  cd backend
  npm start
  ```

- For the mobile apps, follow the respective instructions for iOS and Android.
- For the web applications, navigate to each app's directory and run:
  ```
  npm start
  ```

## Contributing

Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
````
