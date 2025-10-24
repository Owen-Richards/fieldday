/**
 * FieldDay Design System - Shadow Tokens
 *
 * Elevation system for depth and hierarchy
 * Shadows are carefully tuned for perceived depth
 */

export const shadows = {
  // No shadow
  none: 'none',

  // Subtle shadows for slight elevation
  xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',

  // Default shadow for cards and elevated surfaces
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',

  // More prominent shadows
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',

  // Dramatic shadows for modals and popovers
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',

  // Inner shadows for pressed states
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',

  // Colored shadows for brand elements
  brand: {
    sm: '0 1px 3px 0 rgba(22, 119, 255, 0.15)',
    md: '0 4px 6px -1px rgba(22, 119, 255, 0.2), 0 2px 4px -2px rgba(22, 119, 255, 0.15)',
    lg: '0 10px 15px -3px rgba(22, 119, 255, 0.2), 0 4px 6px -4px rgba(22, 119, 255, 0.15)',
  },

  // Focus ring for accessibility
  focus: '0 0 0 3px rgba(22, 119, 255, 0.2)',

  // Glow effects for interactive elements
  glow: {
    sm: '0 0 8px rgba(22, 119, 255, 0.3)',
    md: '0 0 16px rgba(22, 119, 255, 0.4)',
    lg: '0 0 24px rgba(22, 119, 255, 0.5)',
  },
} as const;

/**
 * Component-specific shadow presets
 */
export const componentShadows = {
  button: {
    default: shadows.sm,
    hover: shadows.md,
    active: shadows.inner,
  },
  card: {
    default: shadows.sm,
    hover: shadows.md,
    elevated: shadows.lg,
  },
  modal: shadows['2xl'],
  dropdown: shadows.lg,
  tooltip: shadows.md,
  fab: shadows.xl,
} as const;

export type Shadow = keyof typeof shadows;
export type ComponentShadow = typeof componentShadows;
