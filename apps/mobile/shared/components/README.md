# Mobile Components

Reusable React Native components for the FieldDay mobile app.

## Purpose

Shared UI components optimized for mobile experiences with consistent styling, accessibility, and performance.

## Component Categories

### Core UI

- **Button**: Primary, secondary, tertiary variants with loading states
- **Input**: Text, phone, email with validation feedback
- **Card**: Session cards, user cards, facility cards
- **Avatar**: User profile images with reliability badges
- **Badge**: Status indicators, skill levels, reliability scores
- **Modal**: Bottom sheets, full-screen modals, alerts

### Navigation

- **TabBar**: Bottom navigation with badges
- **Header**: Screen headers with actions
- **BackButton**: Consistent back navigation

### Session Discovery

- **SessionCard**: Compact session preview with join CTA
- **SessionList**: Virtualized list with infinite scroll
- **SessionMap**: Map view with session markers
- **FilterSheet**: Bottom sheet with filter options
- **ConditionIndicator**: Weather/water condition badges

### Forms

- **SessionComposer**: Multi-step session creation
- **FloatPlanForm**: Water sports safety form
- **ProfileForm**: User profile editing
- **PaymentForm**: Stripe payment input

### Family OS

- **ChildCard**: Child profile with upcoming activities
- **CarpoolCard**: Carpool details with QR code
- **VolunteerCard**: Volunteer shift assignment
- **MedicalCard**: Emergency medical information

### Safety

- **QRScanner**: Carpool handoff scanner
- **FloatPlanCard**: Active float plan with check-in
- **GuardianApproval**: Media consent toggle
- **IncidentReport**: Safety incident form

## Design Principles

### Mobile-First

- Touch targets ≥44px
- Thumb-friendly bottom navigation
- Swipe gestures for common actions
- Pull-to-refresh on lists

### Performance

- Memoized components with React.memo
- Lazy loading for heavy components
- Optimized images with caching
- Virtualized lists for long content

### Accessibility

- Screen reader support (VoiceOver/TalkBack)
- Semantic labels for all interactive elements
- Keyboard navigation support
- WCAG 2.1 AA minimum contrast ratios

## Component Structure

```typescript
// Example component structure
import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useTheme } from '@fieldday/ui';

interface SessionCardProps {
  session: Session;
  onPress: () => void;
  variant?: 'compact' | 'full';
}

export const SessionCard: React.FC<SessionCardProps> = ({
  session,
  onPress,
  variant = 'compact',
}) => {
  const theme = useTheme();

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: theme.colors.surface }]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Join ${session.sport} session at ${session.venue.name}`}
    >
      <Text style={[styles.title, { color: theme.colors.text }]}>
        {session.sport}
      </Text>
      {/* ... */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
});
```

## Usage Guidelines

### Theming

All components use the theme system from `@fieldday/ui` for consistent colors, spacing, and typography.

### Variants

Most components support multiple variants (compact/full, primary/secondary) to adapt to different contexts.

### Loading States

Interactive components support loading states to provide feedback during async operations.

### Error Handling

Form components include error state rendering with validation messages.

## Testing

```typescript
// Example component test
import { render, fireEvent } from '@testing-library/react-native';
import { SessionCard } from './SessionCard';

describe('SessionCard', () => {
  it('calls onPress when tapped', () => {
    const onPress = jest.fn();
    const { getByRole } = render(
      <SessionCard session={mockSession} onPress={onPress} />
    );

    fireEvent.press(getByRole('button'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('has accessible label', () => {
    const { getByLabelText } = render(
      <SessionCard session={mockSession} onPress={jest.fn()} />
    );

    expect(
      getByLabelText(/Join.*session at/)
    ).toBeTruthy();
  });
});
```

## Related

- [Mobile Services](../services/README.md)
- [Design System](../../../../packages/ui/README.md)
