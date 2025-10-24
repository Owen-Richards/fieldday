/**
 * FieldDay Design System - Design Tokens
 *
 * Central export for all design tokens
 */

export {
  colors,
  type ColorToken,
  type BrandColor,
  type SemanticColor,
  type SportColor,
} from './colors';
export {
  typography,
  type Typography,
  type FontFamily,
  type FontSize,
  type FontWeight,
} from './typography';
export { spacing, componentSpacing, type Spacing, type ComponentSpacing } from './spacing';
export { shadows, componentShadows, type Shadow, type ComponentShadow } from './shadows';
export { radii, componentRadii, type Radius, type ComponentRadius } from './radii';
export {
  animations,
  motionVariants,
  type AnimationDuration,
  type AnimationEasing,
  type MotionVariant,
} from './animations';
export {
  breakpoints,
  breakpointValues,
  mediaQueries,
  type Breakpoint,
  type MediaQuery,
} from './breakpoints';

/**
 * Z-index scale for layering
 */
export const zIndices = {
  hide: -1,
  base: 0,
  dropdown: 1000,
  sticky: 1100,
  fixed: 1200,
  modalBackdrop: 1300,
  modal: 1400,
  popover: 1500,
  tooltip: 1600,
  toast: 1700,
  max: 9999,
} as const;

export type ZIndex = keyof typeof zIndices;
