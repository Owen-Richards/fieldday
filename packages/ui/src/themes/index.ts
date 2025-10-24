/**
 * FieldDay Design System - Theme Configuration
 *
 * Light and dark theme variants with all design tokens
 */

import { colors } from '../tokens/colors';
import { typography } from '../tokens/typography';
import { spacing, componentSpacing } from '../tokens/spacing';
import { shadows, componentShadows } from '../tokens/shadows';
import { radii, componentRadii } from '../tokens/radii';
import { animations, motionVariants } from '../tokens/animations';
import { breakpoints, mediaQueries } from '../tokens/breakpoints';
import { zIndices } from '../tokens';

/**
 * Light Theme (Default)
 */
export const lightTheme = {
  name: 'light',
  colors: {
    ...colors,
    background: {
      primary: colors.neutral[0],
      secondary: colors.neutral[50],
      tertiary: colors.neutral[100],
      inverse: colors.neutral[900],
      overlay: 'rgba(17, 24, 39, 0.75)',
    },
    text: {
      primary: colors.neutral[900],
      secondary: colors.neutral[600],
      tertiary: colors.neutral[500],
      inverse: colors.neutral[0],
      disabled: colors.neutral[400],
      link: colors.brand.primary[600],
      linkHover: colors.brand.primary[700],
    },
    border: {
      light: colors.neutral[200],
      DEFAULT: colors.neutral[300],
      dark: colors.neutral[400],
      focus: colors.brand.primary[500],
    },
  },
  typography,
  spacing,
  componentSpacing,
  shadows,
  componentShadows,
  radii,
  componentRadii,
  animations,
  motionVariants,
  breakpoints,
  mediaQueries,
  zIndices,
} as const;

/**
 * Dark Theme
 */
export const darkTheme = {
  name: 'dark',
  colors: {
    ...colors,
    background: {
      primary: colors.neutral[900],
      secondary: colors.neutral[800],
      tertiary: colors.neutral[700],
      inverse: colors.neutral[0],
      overlay: 'rgba(0, 0, 0, 0.85)',
    },
    text: {
      primary: colors.neutral[0],
      secondary: colors.neutral[300],
      tertiary: colors.neutral[400],
      inverse: colors.neutral[900],
      disabled: colors.neutral[600],
      link: colors.brand.primary[400],
      linkHover: colors.brand.primary[300],
    },
    border: {
      light: colors.neutral[700],
      DEFAULT: colors.neutral[600],
      dark: colors.neutral[500],
      focus: colors.brand.primary[500],
    },
  },
  typography,
  spacing,
  componentSpacing,
  shadows: {
    ...shadows,
    // Adjust shadows for dark mode
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 1px 2px -1px rgba(0, 0, 0, 0.3)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -2px rgba(0, 0, 0, 0.4)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -4px rgba(0, 0, 0, 0.5)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.6), 0 8px 10px -6px rgba(0, 0, 0, 0.6)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.75)',
  },
  componentShadows,
  radii,
  componentRadii,
  animations,
  motionVariants,
  breakpoints,
  mediaQueries,
  zIndices,
} as const;

/**
 * Theme type for TypeScript
 */
export type Theme = typeof lightTheme;

/**
 * Default theme export
 */
export const defaultTheme = lightTheme;
