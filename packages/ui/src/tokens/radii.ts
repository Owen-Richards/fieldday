/**
 * FieldDay Design System - Border Radius Tokens
 *
 * Rounded corners for modern, friendly aesthetic
 */

export const radii = {
  none: '0',
  sm: '0.25rem', // 4px
  DEFAULT: '0.375rem', // 6px
  md: '0.5rem', // 8px
  lg: '0.75rem', // 12px
  xl: '1rem', // 16px
  '2xl': '1.5rem', // 24px
  '3xl': '2rem', // 32px
  full: '9999px', // Fully rounded (pills, avatars)
} as const;

/**
 * Component-specific radius presets
 */
export const componentRadii = {
  button: radii.md,
  input: radii.md,
  card: radii.lg,
  modal: radii.xl,
  badge: radii.full,
  avatar: radii.full,
  chip: radii.full,
  image: radii.lg,
} as const;

export type Radius = keyof typeof radii;
export type ComponentRadius = typeof componentRadii;
