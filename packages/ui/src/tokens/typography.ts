/**
 * FieldDay Design System - Typography Tokens
 *
 * Type scale, font families, and text styles
 * Optimized for readability across mobile and web
 */

export const typography = {
  // Font Families
  fonts: {
    sans: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    mono: 'JetBrains Mono, Menlo, Monaco, "Courier New", monospace',
    display: 'Cal Sans, Inter, -apple-system, BlinkMacSystemFont, sans-serif',
  },

  // Font Sizes (rem-based for accessibility)
  sizes: {
    xs: '0.75rem', // 12px
    sm: '0.875rem', // 14px
    base: '1rem', // 16px
    lg: '1.125rem', // 18px
    xl: '1.25rem', // 20px
    '2xl': '1.5rem', // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem', // 48px
    '6xl': '3.75rem', // 60px
    '7xl': '4.5rem', // 72px
  },

  // Font Weights
  weights: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },

  // Line Heights
  lineHeights: {
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },

  // Letter Spacing
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },

  // Predefined Text Styles
  styles: {
    // Display (Hero sections)
    display: {
      xl: {
        fontSize: '4.5rem',
        lineHeight: 1.1,
        fontWeight: 800,
        letterSpacing: '-0.025em',
      },
      lg: {
        fontSize: '3.75rem',
        lineHeight: 1.1,
        fontWeight: 800,
        letterSpacing: '-0.025em',
      },
      md: {
        fontSize: '3rem',
        lineHeight: 1.2,
        fontWeight: 700,
        letterSpacing: '-0.025em',
      },
      sm: {
        fontSize: '2.25rem',
        lineHeight: 1.25,
        fontWeight: 700,
        letterSpacing: '-0.025em',
      },
    },

    // Headings
    heading: {
      h1: {
        fontSize: '2.25rem',
        lineHeight: 1.25,
        fontWeight: 700,
        letterSpacing: '-0.025em',
      },
      h2: {
        fontSize: '1.875rem',
        lineHeight: 1.3,
        fontWeight: 700,
        letterSpacing: '-0.025em',
      },
      h3: {
        fontSize: '1.5rem',
        lineHeight: 1.35,
        fontWeight: 600,
        letterSpacing: '-0.025em',
      },
      h4: {
        fontSize: '1.25rem',
        lineHeight: 1.4,
        fontWeight: 600,
        letterSpacing: '0',
      },
      h5: {
        fontSize: '1.125rem',
        lineHeight: 1.45,
        fontWeight: 600,
        letterSpacing: '0',
      },
      h6: {
        fontSize: '1rem',
        lineHeight: 1.5,
        fontWeight: 600,
        letterSpacing: '0',
      },
    },

    // Body Text
    body: {
      xl: {
        fontSize: '1.25rem',
        lineHeight: 1.625,
        fontWeight: 400,
      },
      lg: {
        fontSize: '1.125rem',
        lineHeight: 1.625,
        fontWeight: 400,
      },
      base: {
        fontSize: '1rem',
        lineHeight: 1.5,
        fontWeight: 400,
      },
      sm: {
        fontSize: '0.875rem',
        lineHeight: 1.5,
        fontWeight: 400,
      },
      xs: {
        fontSize: '0.75rem',
        lineHeight: 1.5,
        fontWeight: 400,
      },
    },

    // Labels & UI Text
    label: {
      lg: {
        fontSize: '0.875rem',
        lineHeight: 1.25,
        fontWeight: 600,
        letterSpacing: '0.025em',
      },
      base: {
        fontSize: '0.875rem',
        lineHeight: 1.25,
        fontWeight: 500,
        letterSpacing: '0',
      },
      sm: {
        fontSize: '0.75rem',
        lineHeight: 1.25,
        fontWeight: 500,
        letterSpacing: '0.025em',
      },
    },

    // Captions & Metadata
    caption: {
      base: {
        fontSize: '0.75rem',
        lineHeight: 1.5,
        fontWeight: 400,
        letterSpacing: '0',
      },
      bold: {
        fontSize: '0.75rem',
        lineHeight: 1.5,
        fontWeight: 600,
        letterSpacing: '0',
      },
    },

    // Code & Monospace
    code: {
      inline: {
        fontSize: '0.875rem',
        lineHeight: 1.5,
        fontWeight: 400,
      },
      block: {
        fontSize: '0.875rem',
        lineHeight: 1.75,
        fontWeight: 400,
      },
    },
  },
} as const;

export type Typography = typeof typography;
export type FontFamily = keyof typeof typography.fonts;
export type FontSize = keyof typeof typography.sizes;
export type FontWeight = keyof typeof typography.weights;
