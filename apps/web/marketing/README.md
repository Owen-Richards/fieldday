# Marketing Site

Public-facing Next.js website for player acquisition, education, and conversion.

## Purpose

Drive awareness, educate potential users about FieldDay's value proposition, and convert visitors into registered users.

## Target Audience

- **Adult Players**: Looking for pickup games and sports communities
- **Water Sports Enthusiasts**: Seeking partners and condition monitoring
- **Parents**: Searching for youth sports logistics solutions
- **Organizers**: Wanting to grow their leagues/clinics
- **Facilities**: Looking to optimize utilization and revenue

## Key Pages

### Homepage (`/`)

- Hero section with value proposition
- Four-vertical strategy showcase
- Social proof (testimonials, user count)
- CTA: Download app / Get started

### How It Works (`/how-it-works`)

- Separate flows for each user type:
  - `/how-it-works/players`
  - `/how-it-works/organizers`
  - `/how-it-works/parents`
  - `/how-it-works/facilities`
- Step-by-step explanations with visuals
- Video demos and screenshots

### Pricing (`/pricing`)

- Tiered plans for different user types
- Comparison table
- FAQ about fees and payouts
- CTA: Start free trial

### Sports Directory (`/sports`)

- Landing pages for each sport:
  - `/sports/soccer`
  - `/sports/basketball`
  - `/sports/surfing`
  - `/sports/kiteboarding`
  - etc.
- Local SEO optimization

### City Pages (`/cities`)

- Location-specific landing pages:
  - `/cities/san-francisco`
  - `/cities/san-diego`
  - `/cities/miami`
  - etc.
- Local statistics and featured sessions
- SEO optimized for "pickup [sport] in [city]"

### Blog (`/blog`)

- Content marketing articles
- SEO-optimized content
- Author profiles
- Categories: Tips, Stories, Updates

### Legal (`/legal`)

- Terms of Service (`/legal/terms`)
- Privacy Policy (`/legal/privacy`)
- Community Guidelines (`/legal/guidelines`)
- Safety Standards (`/legal/safety`)

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS
- **CMS**: Contentful or Sanity (for blog)
- **Analytics**: Google Analytics 4, Mixpanel
- **A/B Testing**: Vercel Edge Config or Optimizely
- **SEO**: next-seo, structured data
- **Forms**: React Hook Form
- **Email**: Resend or SendGrid

## SEO Strategy

### On-Page SEO

- Semantic HTML structure
- Optimized meta tags and Open Graph
- Schema.org structured data
- Fast page load times (<1.5s FCP)
- Mobile-responsive design
- Internal linking strategy

### Content Strategy

- Target keywords:
  - "pickup [sport] near me"
  - "[sport] partner finder"
  - "youth sports management"
  - "sports facility software"
- Long-tail content in blog
- User-generated content (testimonials)

### Technical SEO

- Sitemap.xml generation
- Robots.txt configuration
- Canonical URLs
- Image optimization (WebP, lazy loading)
- Core Web Vitals optimization

## Conversion Funnels

### Player Signup

1. Homepage → CTA "Find Games"
2. Sport selection modal
3. Location input
4. Show nearby sessions (preview)
5. Prompt to download app or sign up

### Organizer Signup

1. "/organizers" landing page
2. Watch demo video
3. CTA "Start Free Trial"
4. Email capture form
5. Onboarding email sequence

### Facility Demo Request

1. "/facilities" landing page
2. Benefits and ROI calculator
3. CTA "Request Demo"
4. Calendar booking (Calendly embed)
5. Sales team follow-up

## Development

### Running Locally

```bash
cd apps/web/marketing
npm install
npm run dev
```

Access at `http://localhost:3000`

### Environment Variables

```env
NEXT_PUBLIC_API_URL=https://api.fieldday.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
CONTENTFUL_SPACE_ID=xxx
CONTENTFUL_ACCESS_TOKEN=xxx
RESEND_API_KEY=re_xxx
```

### Building

```bash
npm run build
npm run start  # Production server
```

## Content Management

Blog posts are managed via headless CMS:

```typescript
// lib/contentful.ts
import { createClient } from 'contentful';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

export async function getBlogPosts() {
  const entries = await client.getEntries({
    content_type: 'blogPost',
    order: '-fields.publishDate',
  });

  return entries.items;
}
```

## Performance Optimization

- Static generation for landing pages
- Incremental Static Regeneration for blog (revalidate every 3600s)
- Image optimization with next/image
- Font optimization (next/font)
- Route prefetching
- Code splitting

## Analytics Events

Track key user actions:

```typescript
// Track page views
analytics.page('Homepage');

// Track CTA clicks
analytics.track('CTA Clicked', {
  location: 'hero',
  text: 'Find Games',
  destination: '/signup',
});

// Track form submissions
analytics.track('Form Submitted', {
  formName: 'newsletter_signup',
  email: user.email,
});

// Track video plays
analytics.track('Video Played', {
  videoTitle: 'How FieldDay Works',
  duration: 120,
});
```

## A/B Testing

Test variations of key pages:

```typescript
// pages/index.tsx
import { useExperiment } from '@/lib/experiments';

export default function HomePage() {
  const heroVariant = useExperiment('hero-v2', {
    control: 'Play Anything, Anywhere',
    variant: 'Find Pickup Games in 20 Seconds',
  });

  return (
    <Hero title={heroVariant} />
  );
}
```

## Deployment

Deployed to Vercel with automatic deployments:

- **Production**: main branch → fieldday.com
- **Staging**: develop branch → staging.fieldday.com
- **Preview**: Pull requests → preview-[pr-number].fieldday.com

## Related

- [Web Apps Overview](../README.md)
- [Design System](../../../packages/ui/README.md)
- [Backend API](../../../backend/api/README.md)
