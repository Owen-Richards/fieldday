/**
 * FieldDay Design System - Breakpoint Tokens
 *
 * Responsive design breakpoints for mobile-first layouts
 */

export const breakpoints = {
  sm: '640px', // Small devices (landscape phones)
  md: '768px', // Medium devices (tablets)
  lg: '1024px', // Large devices (desktops)
  xl: '1280px', // Extra large devices (large desktops)
  '2xl': '1536px', // Ultra wide displays
} as const;

/**
 * Numeric breakpoint values (for JavaScript calculations)
 */
export const breakpointValues = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

/**
 * Media query helpers
 */
export const mediaQueries = {
  sm: `@media (min-width: ${breakpoints.sm})`,
  md: `@media (min-width: ${breakpoints.md})`,
  lg: `@media (min-width: ${breakpoints.lg})`,
  xl: `@media (min-width: ${breakpoints.xl})`,
  '2xl': `@media (min-width: ${breakpoints['2xl']})`,

  // Max-width queries
  maxSm: `@media (max-width: ${breakpointValues.sm - 1}px)`,
  maxMd: `@media (max-width: ${breakpointValues.md - 1}px)`,
  maxLg: `@media (max-width: ${breakpointValues.lg - 1}px)`,
  maxXl: `@media (max-width: ${breakpointValues.xl - 1}px)`,

  // Range queries
  smToMd: `@media (min-width: ${breakpoints.sm}) and (max-width: ${breakpointValues.md - 1}px)`,
  mdToLg: `@media (min-width: ${breakpoints.md}) and (max-width: ${breakpointValues.lg - 1}px)`,
  lgToXl: `@media (min-width: ${breakpoints.lg}) and (max-width: ${breakpointValues.xl - 1}px)`,

  // Orientation queries
  landscape: '@media (orientation: landscape)',
  portrait: '@media (orientation: portrait)',

  // Device-specific
  mobile: '@media (max-width: 767px)',
  tablet: '@media (min-width: 768px) and (max-width: 1023px)',
  desktop: '@media (min-width: 1024px)',

  // Reduced motion (accessibility)
  reducedMotion: '@media (prefers-reduced-motion: reduce)',

  // Dark mode
  dark: '@media (prefers-color-scheme: dark)',
} as const;

export type Breakpoint = keyof typeof breakpoints;
export type MediaQuery = keyof typeof mediaQueries;
