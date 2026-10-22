// Design System Configuration for EduSure
// Premium, distinctive visual identity - Not generic AI-generated UI

// Color System - Premium, restrained palette
export const colors = {
  // Primary Colors - Deep Blue & Teal combination
  primary: {
    50: '#e6f7ff',
    100: '#b3e6ff',
    200: '#80d4ff',
    300: '#4dc3ff',
    400: '#1ab1ff',
    500: '#0099e6', // Main primary color
    600: '#0077b3',
    700: '#005580',
    800: '#00334d',
    900: '#00111a',
  },
  
  // Secondary Colors - Warm teal for accents
  secondary: {
    50: '#f0f9f5',
    100: '#dcf0e8',
    200: '#b8e1d1',
    300: '#94d2ba',
    400: '#70c3a3',
    500: '#4cb48c', // Main secondary color
    600: '#3a9070',
    700: '#286c54',
    800: '#164838',
    900: '#04241c',
  },
  
  // Neutral Colors - Sophisticated grays
  neutral: {
    50: '#f8f9fa',
    100: '#e9ecef',
    200: '#dee2e6',
    300: '#ced4da',
    400: '#adb5bd',
    500: '#6c757d',
    600: '#495057',
    700: '#343a40',
    800: '#212529',
    900: '#121416',
  },
  
  // Semantic Colors
  success: {
    500: '#28a745',
    600: '#218838',
  },
  warning: {
    500: '#ffc107',
    600: '#e0a800',
  },
  danger: {
    500: '#dc3545',
    600: '#c82333',
  },
  info: {
    500: '#17a2b8',
    600: '#138496',
  },
  
  // Gradients for special elements
  gradients: {
    primary: 'linear-gradient(135deg, #0099e6 0%, #4cb48c 100%)',
    hero: 'linear-gradient(135deg, #00111a 0%, #00334d 50%, #005580 100%)',
    card: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
  },
};

// Typography System - Strong editorial hierarchy
export const typography = {
  fonts: {
    sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
    serif: ['Merriweather', 'Georgia', 'serif'],
    mono: ['JetBrains Mono', 'monospace'],
  },
  
  sizes: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem',  // 36px
    '5xl': '3rem',     // 48px
    '6xl': '3.75rem',  // 60px
    '7xl': '4.5rem',   // 72px
  },
  
  weights: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
};

// Spacing System - Consistent 4px base
export const spacing = {
  0: '0',
  1: '0.25rem',  // 4px
  2: '0.5rem',   // 8px
  3: '0.75rem',  // 12px
  4: '1rem',     // 16px
  5: '1.25rem',  // 20px
  6: '1.5rem',   // 24px
  8: '2rem',     // 32px
  10: '2.5rem',  // 40px
  12: '3rem',    // 48px
  16: '4rem',    // 64px
  20: '5rem',    // 80px
  24: '6rem',    // 96px
  32: '8rem',    // 128px
  40: '10rem',   // 160px
  48: '12rem',   // 192px
  64: '16rem',   // 256px
};

// Shadows - Subtle, not excessive
export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  
  // Special shadows for depth and layering
  depth: '0 20px 40px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.02)',
  glass: '0 8px 32px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.1)',
};

// Border Radius - Not overly rounded
export const borderRadius = {
  none: '0',
  sm: '0.125rem',  // 2px
  base: '0.25rem', // 4px
  md: '0.375rem',  // 6px
  lg: '0.5rem',    // 8px
  xl: '0.75rem',   // 12px
  '2xl': '1rem',   // 16px
  '3xl': '1.5rem', // 24px
  full: '9999px',
};

// Animation Durations
export const transitions = {
  fast: '150ms',
  base: '250ms',
  slow: '350ms',
  verySlow: '500ms',
};

// Breakpoints for responsive design
export const breakpoints = {
  xs: '320px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

// Z-index layers
export const zIndex = {
  hide: -1,
  base: 0,
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
  overlay: 1080,
  toast: 1090,
};

// Theme Configurations
export const themes = {
  light: {
    background: {
      primary: '#ffffff',
      secondary: colors.neutral[50],
      tertiary: colors.neutral[100],
    },
    surface: {
      primary: '#ffffff',
      secondary: colors.neutral[50],
      card: '#ffffff',
    },
    text: {
      primary: colors.neutral[900],
      secondary: colors.neutral[600],
      tertiary: colors.neutral[500],
      muted: colors.neutral[400],
    },
    border: colors.neutral[200],
    shadow: shadows.base,
  },
  
  dark: {
    background: {
      primary: '#121416',
      secondary: colors.neutral[900],
      tertiary: colors.neutral[800],
    },
    surface: {
      primary: '#1a1c1f',
      secondary: colors.neutral[800],
      card: '#1a1c1f',
    },
    text: {
      primary: colors.neutral[100],
      secondary: colors.neutral[300],
      tertiary: colors.neutral[400],
      muted: colors.neutral[500],
    },
    border: colors.neutral[700],
    shadow: '0 1px 3px 0 rgba(0, 0, 0, 0.5), 0 1px 2px 0 rgba(0, 0, 0, 0.3)',
  },
};

// Export design system
export default {
  colors,
  typography,
  spacing,
  shadows,
  borderRadius,
  transitions,
  breakpoints,
  zIndex,
  themes,
};