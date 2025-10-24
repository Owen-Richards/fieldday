# Shared Packages

Shared code, types, utilities, and UI components used across mobile, web, and backend applications.

## Purpose

Centralized, reusable code to ensure consistency, reduce duplication, and enable rapid development across all platforms.

## Package Structure

```
packages/
├── shared/           # Domain types and business logic
├── ui/              # Design system and UI components
└── config/          # Shared configurations (ESLint, TypeScript, etc.)
```

## Packages

### 1. Shared Package (`@fieldday/shared`)

**Path**: `packages/shared`

Core domain types, utilities, and business logic shared across all applications.

**Contents**:

- **types/**: TypeScript interfaces and types
- **utils/**: Utility functions
- **constants/**: Application constants
- **validators/**: Zod validation schemas

**Key Types**:

```typescript
// types/user.ts
export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  avatar?: string;
  sports: Sport[];
  location?: Location;
  reliabilityScore: ReliabilityScore;
  createdAt: Date;
  updatedAt: Date;
}

// types/session.ts
export interface Session {
  id: string;
  sport: Sport;
  type: SessionType;
  title: string;
  description?: string;
  venue: Venue;
  startTime: Date;
  endTime: Date;
  capacity: number;
  price?: number;
  skillLevel?: SkillLevel;
  organizerId: string;
  status: SessionStatus;
  createdAt: Date;
  updatedAt: Date;
}

// types/enums.ts
export enum Sport {
  SOCCER = 'SOCCER',
  BASKETBALL = 'BASKETBALL',
  TENNIS = 'TENNIS',
  SURFING = 'SURFING',
  KITEBOARDING = 'KITEBOARDING',
  SPEARFISHING = 'SPEARFISHING',
  // ... more sports
}

export enum SessionType {
  PICKUP = 'PICKUP',
  LEAGUE = 'LEAGUE',
  CLINIC = 'CLINIC',
  LADDER = 'LADDER',
  BOAT = 'BOAT',
}

export enum SessionStatus {
  SCHEDULED = 'SCHEDULED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}
```

**Key Utilities**:

```typescript
// utils/reliability.ts
export function calculateReliabilityScore(data: {
  attended: number;
  total: number;
  onTime: number;
  cancelled: number;
  incidentFree: number;
}): number {
  const attendanceRate = data.attended / data.total;
  const punctualityRate = data.onTime / data.attended;
  const cancellationPenalty = 1 - data.cancelled / data.total;
  const incidentFreeRate = data.incidentFree / data.total;

  return Math.round(
    attendanceRate * 40 + punctualityRate * 30 + cancellationPenalty * 20 + incidentFreeRate * 10
  );
}

// utils/distance.ts
export function calculateDistance(point1: Location, point2: Location): number {
  // Haversine formula
  const R = 6371; // Earth radius in km
  const dLat = toRad(point2.lat - point1.lat);
  const dLng = toRad(point2.lng - point1.lng);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(point1.lat)) *
      Math.cos(toRad(point2.lat)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// utils/time.ts
export function formatSessionTime(session: Session): string {
  const start = new Date(session.startTime);
  const end = new Date(session.endTime);

  return `${format(start, 'MMM d, h:mm a')} - ${format(end, 'h:mm a')}`;
}

export function getSessionDuration(session: Session): number {
  return (session.endTime.getTime() - session.startTime.getTime()) / 1000 / 60; // minutes
}
```

**Validators**:

```typescript
// validators/session.ts
import { z } from 'zod';

export const createSessionSchema = z
  .object({
    sport: z.nativeEnum(Sport),
    type: z.nativeEnum(SessionType),
    title: z.string().min(3).max(100),
    description: z.string().max(1000).optional(),
    venueId: z.string().uuid(),
    startTime: z.date(),
    endTime: z.date(),
    capacity: z.number().int().min(2).max(1000),
    price: z.number().min(0).max(10000).optional(),
    skillLevel: z.nativeEnum(SkillLevel).optional(),
  })
  .refine((data) => data.endTime > data.startTime, {
    message: 'End time must be after start time',
  });

export type CreateSessionInput = z.infer<typeof createSessionSchema>;
```

---

### 2. UI Package (`@fieldday/ui`)

**Path**: `packages/ui`

Design system with reusable UI components, tokens, and theming.

**Contents**:

- **components/**: React components (Button, Input, Modal, etc.)
- **tokens/**: Design tokens (colors, spacing, typography)
- **hooks/**: Custom React hooks (useTheme, useMediaQuery)
- **utils/**: UI utilities (classNames, etc.)

**Design Tokens**:

```typescript
// tokens/colors.ts
export const colors = {
  primary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    500: '#0ea5e9',
    600: '#0284c7',
    900: '#0c4a6e',
  },
  secondary: {
    50: '#faf5ff',
    500: '#a855f7',
    900: '#581c87',
  },
  success: {
    50: '#f0fdf4',
    500: '#22c55e',
    900: '#14532d',
  },
  warning: {
    50: '#fffbeb',
    500: '#f59e0b',
    900: '#78350f',
  },
  error: {
    50: '#fef2f2',
    500: '#ef4444',
    900: '#7f1d1d',
  },
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    500: '#6b7280',
    900: '#111827',
  },
};

// tokens/spacing.ts
export const spacing = {
  0: '0',
  1: '0.25rem', // 4px
  2: '0.5rem', // 8px
  3: '0.75rem', // 12px
  4: '1rem', // 16px
  6: '1.5rem', // 24px
  8: '2rem', // 32px
  12: '3rem', // 48px
  16: '4rem', // 64px
};

// tokens/typography.ts
export const typography = {
  fontFamily: {
    sans: 'Inter, system-ui, -apple-system, sans-serif',
    mono: 'Monaco, Courier, monospace',
  },
  fontSize: {
    xs: '0.75rem', // 12px
    sm: '0.875rem', // 14px
    base: '1rem', // 16px
    lg: '1.125rem', // 18px
    xl: '1.25rem', // 20px
    '2xl': '1.5rem', // 24px
    '3xl': '1.875rem', // 30px
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
};
```

**Components**:

```typescript
// components/Button.tsx
import React from 'react';
import { cn } from '../utils/classNames';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  children,
  className,
  ...props
}) => {
  return (
    <button
      className={cn(
        'rounded-lg font-semibold transition-colors',
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
        {
          // Variants
          'bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-500':
            variant === 'primary',
          'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500':
            variant === 'secondary',
          'bg-transparent text-primary-500 hover:bg-primary-50 focus:ring-primary-500':
            variant === 'tertiary',

          // Sizes
          'px-3 py-1.5 text-sm': size === 'sm',
          'px-4 py-2 text-base': size === 'md',
          'px-6 py-3 text-lg': size === 'lg',

          // States
          'opacity-50 cursor-not-allowed': disabled || loading,
        },
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="flex items-center">
          <LoadingSpinner className="mr-2" />
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
};
```

**Hooks**:

```typescript
// hooks/useTheme.ts
import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }

  return context;
};

// hooks/useMediaQuery.ts
import { useState, useEffect } from 'react';

export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);

    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
    media.addEventListener('change', listener);

    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
};

// Usage
const isMobile = useMediaQuery('(max-width: 768px)');
```

---

### 3. Config Package (`@fieldday/config`)

**Path**: `packages/config`

Shared configuration files for tooling consistency.

**Contents**:

- **eslint-config/**: Shared ESLint configuration
- **tsconfig/**: Base TypeScript configurations
- **prettier-config/**: Prettier formatting rules

**Example**:

```json
// tsconfig/base.json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020"],
    "module": "ESNext",
    "moduleResolution": "node",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

## Usage

### Installing Packages

```json
// apps/mobile/package.json
{
  "dependencies": {
    "@fieldday/shared": "*",
    "@fieldday/ui": "*"
  }
}

// apps/web/organizer-console/package.json
{
  "dependencies": {
    "@fieldday/shared": "*",
    "@fieldday/ui": "*"
  },
  "devDependencies": {
    "@fieldday/config": "*"
  }
}
```

### Importing

```typescript
// Import types
import { User, Session, Sport } from '@fieldday/shared/types';

// Import utilities
import { calculateReliabilityScore } from '@fieldday/shared/utils';

// Import UI components
import { Button, Input, Modal } from '@fieldday/ui';

// Import hooks
import { useTheme } from '@fieldday/ui/hooks';
```

## Development

### Building Packages

```bash
# Build all packages
npm run build:packages

# Build specific package
cd packages/shared
npm run build
```

### Testing Packages

```bash
# Test all packages
npm run test:packages

# Test specific package
cd packages/ui
npm test
```

## Versioning

Packages follow semantic versioning:

- **Major**: Breaking changes
- **Minor**: New features (backward compatible)
- **Patch**: Bug fixes

Managed with Lerna for coordinated releases.

## Related

- [Mobile App](../../apps/mobile/README.md)
- [Web Apps](../../apps/web/README.md)
- [Backend](../../backend/README.md)
