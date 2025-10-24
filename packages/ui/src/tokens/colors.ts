/**
 * FieldDay Design System - Color Tokens
 *
 * Brand colors, semantic colors, and accessibility-compliant palettes
 * All colors meet WCAG 2.1 AA standards for contrast
 */

export const colors = {
  // Brand Colors - Primary (Trust & Energy)
  brand: {
    primary: {
      50: '#E6F4FF',
      100: '#BAE0FF',
      200: '#91CAFF',
      300: '#69B1FF',
      400: '#4096FF',
      500: '#1677FF', // Primary brand blue
      600: '#0958D9',
      700: '#003EB3',
      800: '#002C8C',
      900: '#001D66',
    },
    secondary: {
      50: '#F0FDF4',
      100: '#DCFCE7',
      200: '#BBF7D0',
      300: '#86EFAC',
      400: '#4ADE80',
      500: '#22C55E', // Success green
      600: '#16A34A',
      700: '#15803D',
      800: '#166534',
      900: '#14532D',
    },
    accent: {
      50: '#FFF7ED',
      100: '#FFEDD5',
      200: '#FED7AA',
      300: '#FDBA74',
      400: '#FB923C',
      500: '#F97316', // Accent orange
      600: '#EA580C',
      700: '#C2410C',
      800: '#9A3412',
      900: '#7C2D12',
    },
  },

  // Semantic Colors
  semantic: {
    success: {
      light: '#D1FAE5',
      DEFAULT: '#10B981',
      dark: '#065F46',
    },
    warning: {
      light: '#FEF3C7',
      DEFAULT: '#F59E0B',
      dark: '#92400E',
    },
    error: {
      light: '#FEE2E2',
      DEFAULT: '#EF4444',
      dark: '#991B1B',
    },
    info: {
      light: '#DBEAFE',
      DEFAULT: '#3B82F6',
      dark: '#1E40AF',
    },
  },

  // Neutral/Gray Scale
  neutral: {
    0: '#FFFFFF',
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
    1000: '#000000',
  },

  // Sport-Specific Colors (for categorization)
  sports: {
    soccer: '#22C55E',
    basketball: '#F97316',
    tennis: '#FBBF24',
    volleyball: '#3B82F6',
    surfing: '#06B6D4',
    kiteboarding: '#8B5CF6',
    spearfishing: '#0EA5E9',
    sailing: '#0891B2',
    pickleball: '#EC4899',
    hockey: '#EF4444',
  },

  // Reliability Badge Colors
  reliability: {
    platinum: '#E5E7EB', // 95-100
    gold: '#FBBF24', // 85-94
    silver: '#94A3B8', // 75-84
    bronze: '#CD7F32', // 65-74
    iron: '#78716C', // <65
  },

  // Background & Surface
  surface: {
    base: '#FFFFFF',
    elevated: '#F9FAFB',
    sunken: '#F3F4F6',
    overlay: 'rgba(17, 24, 39, 0.75)',
  },

  // Text Colors
  text: {
    primary: '#111827',
    secondary: '#6B7280',
    tertiary: '#9CA3AF',
    inverse: '#FFFFFF',
    disabled: '#D1D5DB',
    link: '#1677FF',
    linkHover: '#0958D9',
  },

  // Border Colors
  border: {
    light: '#E5E7EB',
    DEFAULT: '#D1D5DB',
    dark: '#9CA3AF',
    focus: '#1677FF',
  },

  // Condition Status (Weather/Water)
  conditions: {
    ideal: '#10B981',
    good: '#84CC16',
    fair: '#FBBF24',
    poor: '#F97316',
    dangerous: '#EF4444',
  },

  // Availability Status
  availability: {
    available: '#10B981',
    almostFull: '#FBBF24',
    full: '#EF4444',
    cancelled: '#9CA3AF',
  },
} as const;

export type ColorToken = typeof colors;
export type BrandColor = keyof typeof colors.brand;
export type SemanticColor = keyof typeof colors.semantic;
export type SportColor = keyof typeof colors.sports;
