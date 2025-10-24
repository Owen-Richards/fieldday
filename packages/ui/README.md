# @fieldday/ui

FieldDay Design System - Production-ready UI component library with accessibility, animations, and dark mode support.

## 🎨 Features

- **Design Tokens**: Comprehensive color, typography, spacing, and animation tokens
- **Accessibility**: WCAG 2.1 AA compliant with ARIA attributes and keyboard navigation
- **Animations**: Smooth, performant animations with Framer Motion
- **Dark Mode**: Built-in theme switching support
- **TypeScript**: Fully typed components and utilities
- **Responsive**: Mobile-first design with breakpoint utilities
- **Storybook**: Interactive component documentation
- **Tailwind CSS**: Utility-first styling with custom design system integration

## 📦 Installation

```bash
npm install @fieldday/ui
```

### Peer Dependencies

```bash
npm install react react-dom framer-motion clsx tailwind-merge
```

## 🚀 Quick Start

### 1. Import Design System

```tsx
import { Button, Card } from '@fieldday/ui';
import '@fieldday/ui/styles/global.css';

function App() {
  return (
    <Card variant="elevated" padding="lg">
      <Button variant="primary" size="lg">
        Join Session
      </Button>
    </Card>
  );
}
```

### 2. Use Design Tokens

```tsx
import { colors, typography, spacing } from '@fieldday/ui/tokens';

const customStyle = {
  color: colors.brand.primary[500],
  fontSize: typography.sizes['2xl'],
  padding: spacing[6],
};
```

### 3. Use Theme

```tsx
import { lightTheme, darkTheme } from '@fieldday/ui/themes';

// Access theme values
const primaryColor = lightTheme.colors.brand.primary[500];
```

## 🎭 Components

### Button

Interactive button component with multiple variants and states.

```tsx
import { Button } from '@fieldday/ui';

<Button variant="primary" size="lg" isLoading={false}>
  Join Session
</Button>;

// Variants: primary, secondary, outline, ghost, danger
// Sizes: sm, md, lg, xl
```

**Features:**

- Multiple variants (primary, secondary, outline, ghost, danger)
- Four sizes (sm, md, lg, xl)
- Loading state with spinner
- Disabled state
- Left and right icons
- Full width option
- Smooth hover and tap animations
- Fully accessible

### Card

Container component for content grouping with elevation.

```tsx
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@fieldday/ui';

<Card variant="elevated" padding="lg" hoverable>
  <CardHeader>
    <CardTitle>Session Title</CardTitle>
    <CardDescription>Soccer pickup game</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Session details...</p>
  </CardContent>
  <CardFooter>
    <Button>Join</Button>
  </CardFooter>
</Card>;

// Variants: default, elevated, outlined, flat
// Padding: none, sm, md, lg
```

**Features:**

- Multiple variants (default, elevated, outlined, flat)
- Flexible padding options
- Hover elevation effect
- Click interactions
- Composable sections (Header, Content, Footer)

## 🎨 Design Tokens

### Colors

```tsx
import { colors } from '@fieldday/ui/tokens';

// Brand colors
colors.brand.primary[500]; // #1677FF
colors.brand.secondary[500]; // #22C55E
colors.brand.accent[500]; // #F97316

// Semantic colors
colors.semantic.success.DEFAULT; // Success green
colors.semantic.error.DEFAULT; // Error red
colors.semantic.warning.DEFAULT; // Warning orange

// Sport-specific colors
colors.sports.soccer; // #22C55E
colors.sports.basketball; // #F97316
colors.sports.tennis; // #FBBF24
```

### Typography

```tsx
import { typography } from '@fieldday/ui/tokens';

// Font families
typography.fonts.sans; // Inter, system fonts
typography.fonts.display; // Cal Sans, Inter
typography.fonts.mono; // JetBrains Mono

// Font sizes
typography.sizes.base; // 1rem (16px)
typography.sizes['2xl']; // 1.5rem (24px)

// Text styles
typography.styles.heading.h1;
typography.styles.body.base;
typography.styles.label.lg;
```

### Spacing

```tsx
import { spacing, componentSpacing } from '@fieldday/ui/tokens';

// Base spacing (4px scale)
spacing[4]; // 1rem (16px)
spacing[8]; // 2rem (32px)

// Component-specific spacing
componentSpacing.button.md; // { x: '1rem', y: '0.5rem' }
componentSpacing.card.lg; // '2rem'
```

### Animations

```tsx
import { animations, motionVariants } from '@fieldday/ui/tokens';

// Durations
animations.duration.fast; // 200ms
animations.duration.normal; // 300ms

// Easing curves
animations.easing.standard; // cubic-bezier(0.4, 0.0, 0.2, 1)
animations.easing.bounce; // cubic-bezier(0.68, -0.55, 0.265, 1.55)

// Framer Motion variants
motionVariants.fadeIn;
motionVariants.slideUp;
motionVariants.scaleIn;
```

## 🛠 Utilities

### cn() - Class Name Merger

Merge Tailwind CSS classes with conflict resolution.

```tsx
import { cn } from '@fieldday/ui';

const className = cn(
  'px-4 py-2', // Base classes
  'px-6', // Override: px-6 wins
  isActive && 'bg-blue-500', // Conditional
  className // User-provided classes
);
```

### Accessibility Utilities

```tsx
import { AriaAnnouncer, trapFocus, meetsWCAG_AA } from '@fieldday/ui/foundations';

// Announce to screen readers
const announcer = AriaAnnouncer.getInstance();
announcer.announce('Session joined successfully!', 'polite');

// Trap focus in modal
const cleanup = trapFocus(modalElement);

// Check color contrast
const isAccessible = meetsWCAG_AA('#1677FF', '#FFFFFF'); // true
```

### Format Utilities

```tsx
import {
  formatCurrency,
  formatRelativeTime,
  truncate,
  debounce,
  throttle,
} from '@fieldday/ui/foundations';

formatCurrency(2500); // '$25.00'
formatRelativeTime(new Date()); // '2 hours ago'
truncate('Long text...', 20); // 'Long text...'
```

## 🎭 Theming

### Light and Dark Mode

```tsx
import { lightTheme, darkTheme } from '@fieldday/ui/themes';

// Toggle theme
const [theme, setTheme] = useState<'light' | 'dark'>('light');

<div className={theme === 'dark' ? 'dark' : ''}>
  <App />
</div>;
```

### Custom Theme

```tsx
import { lightTheme } from '@fieldday/ui/themes';

const customTheme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    brand: {
      ...lightTheme.colors.brand,
      primary: {
        ...lightTheme.colors.brand.primary,
        500: '#FF0000', // Custom primary color
      },
    },
  },
};
```

## 📖 Storybook

Run Storybook for interactive component documentation:

```bash
cd packages/ui
npm run storybook
```

Visit `http://localhost:6006` to explore components, variants, and states.

## 🧪 Testing

### Accessibility Testing

All components are tested for accessibility compliance:

```tsx
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Button } from '@fieldday/ui';

test('Button has no accessibility violations', async () => {
  const { container } = render(<Button>Click me</Button>);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

## 🎯 Performance

- **Tree-shakeable**: Import only what you use
- **Optimized animations**: GPU-accelerated transforms
- **Lazy loading**: Code-split by component
- **Bundle size**: ~25KB gzipped (core components)

## 🤝 Contributing

See [CONTRIBUTING.md](../../CONTRIBUTING.md) for guidelines.

## 📄 License

MIT License - see [LICENSE](../../LICENSE) for details.

## 🔗 Related

- [Architecture Documentation](../../docs/ARCHITECTURE.md)
- [FieldDay Design System Figma](https://figma.com/fieldday-design-system)
- [Accessibility Guidelines](../../docs/accessibility.md)

---

**Built with ❤️ by the FieldDay team**
