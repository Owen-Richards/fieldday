/**
 * FieldDay Design System - Animation Tokens
 *
 * Motion design principles for smooth, performant interactions
 * Follows Material Design motion guidelines
 */

export const animations = {
  // Duration (in milliseconds)
  duration: {
    instant: 100,
    fast: 200,
    normal: 300,
    slow: 500,
    slower: 700,
  },

  // Timing functions (easing curves)
  easing: {
    // Standard easing (enter & exit)
    standard: 'cubic-bezier(0.4, 0.0, 0.2, 1)',

    // Deceleration (enter)
    decelerate: 'cubic-bezier(0.0, 0.0, 0.2, 1)',

    // Acceleration (exit)
    accelerate: 'cubic-bezier(0.4, 0.0, 1, 1)',

    // Sharp (snappy transitions)
    sharp: 'cubic-bezier(0.4, 0.0, 0.6, 1)',

    // Bounce (playful)
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',

    // Smooth (general purpose)
    smooth: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
  },

  // Keyframe animations
  keyframes: {
    // Fade in/out
    fadeIn: {
      from: { opacity: 0 },
      to: { opacity: 1 },
    },
    fadeOut: {
      from: { opacity: 1 },
      to: { opacity: 0 },
    },

    // Slide animations
    slideInUp: {
      from: { transform: 'translateY(100%)', opacity: 0 },
      to: { transform: 'translateY(0)', opacity: 1 },
    },
    slideInDown: {
      from: { transform: 'translateY(-100%)', opacity: 0 },
      to: { transform: 'translateY(0)', opacity: 1 },
    },
    slideInLeft: {
      from: { transform: 'translateX(-100%)', opacity: 0 },
      to: { transform: 'translateX(0)', opacity: 1 },
    },
    slideInRight: {
      from: { transform: 'translateX(100%)', opacity: 0 },
      to: { transform: 'translateX(0)', opacity: 1 },
    },

    // Scale animations
    scaleIn: {
      from: { transform: 'scale(0.9)', opacity: 0 },
      to: { transform: 'scale(1)', opacity: 1 },
    },
    scaleOut: {
      from: { transform: 'scale(1)', opacity: 1 },
      to: { transform: 'scale(0.9)', opacity: 0 },
    },

    // Bounce animation
    bounce: {
      '0%, 100%': { transform: 'translateY(0)' },
      '50%': { transform: 'translateY(-10px)' },
    },

    // Pulse animation
    pulse: {
      '0%, 100%': { opacity: 1 },
      '50%': { opacity: 0.5 },
    },

    // Spin animation (loaders)
    spin: {
      from: { transform: 'rotate(0deg)' },
      to: { transform: 'rotate(360deg)' },
    },

    // Shimmer effect (skeleton loading)
    shimmer: {
      '0%': { backgroundPosition: '-200% 0' },
      '100%': { backgroundPosition: '200% 0' },
    },
  },

  // Component-specific animation presets
  presets: {
    button: {
      duration: 200,
      easing: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
    },
    modal: {
      duration: 300,
      easing: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
    },
    dropdown: {
      duration: 200,
      easing: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
    },
    tooltip: {
      duration: 150,
      easing: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
    },
    toast: {
      duration: 300,
      easing: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
    },
    pageTransition: {
      duration: 500,
      easing: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
    },
  },
} as const;

/**
 * Framer Motion variants for common animations
 */
export const motionVariants = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  slideUp: {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: 20, opacity: 0 },
  },
  scaleIn: {
    initial: { scale: 0.95, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.95, opacity: 0 },
  },
  slideInFromBottom: {
    initial: { y: '100%' },
    animate: { y: 0 },
    exit: { y: '100%' },
  },
  stagger: {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
} as const;

export type AnimationDuration = keyof typeof animations.duration;
export type AnimationEasing = keyof typeof animations.easing;
export type MotionVariant = keyof typeof motionVariants;
