export const colors = {
  white: '#FFFFFF',
  black: '#000000',
  overlay: {
    light: 'rgba(255, 255, 255, 0.1)',
    dark: 'rgba(0, 0, 0, 0.1)',
  },
  
  primary: {
    main: '#9472C8',
    light: '#B899D4',
    dark: '#572F93',
    contrastText: '#FFFFFF',
    alpha: {
      hover: 'rgba(148, 114, 200, 0.12)',
      active: 'rgba(148, 114, 200, 0.2)',
      shadow: 'rgba(148, 114, 200, 0.25)',
    },
  },
  secondary: {
    main: '#572F93',
    light: '#7A5BAD',
    dark: '#3F2066',
    contrastText: '#EBE54B',
  },
  accent: {
    main: '#EBE54B',
    light: '#F0EB70',
    dark: '#D4CE3A',
    contrastText: '#3F3E33',
  },
  surface: {
    main: '#D2CF89',
    light: '#E0DD9F',
    dark: '#C4C173',
    contrastText: '#3F3E33',
  },
  background: {
    main: '#3F3E33',
    light: '#60586B',
    dark: '#2A2926',
    contrastText: '#EBE54B',
  },
  text: {
    primary: '#3F3E33',
    secondary: '#60586B',
    disabled: '#9E9E9E',
    hint: '#BDBDBD',
  },
  success: {
    main: '#4CAF50',
    light: '#81C784',
    dark: '#1B5E20',
    contrastText: '#FFFFFF',
    background: {
      light: '#E8F5E9',
      dark: '#1B3D1F',
    },
    border: {
      light: '#A5D6A7',
      dark: '#2E7D32',
    },
    title: {
      dark: '#C8E6C9',
    },
  },
  error: {
    main: '#F44336',
    light: '#E57373',
    dark: '#B71C1C',
    contrastText: '#FFFFFF',
    background: {
      light: '#FFEBEE',
      dark: '#3D1B1B',
    },
    border: {
      light: '#EF9A9A',
      dark: '#C62828',
    },
    title: {
      dark: '#FFCDD2',
    },
    text: {
      dark: '#EF9A9A',
    },
    filled: {
      background: '#D32F2F',
      border: '#EF5350',
    },
    alpha: {
      shadow: 'rgba(244, 67, 54, 0.25)',
    },
  },
  warning: {
    main: '#FF9800',
    light: '#FFB74D',
    dark: '#BF360C',
    contrastText: '#000000',
    background: {
      light: '#FFF3E0',
      dark: '#3D2E1B',
    },
    border: {
      light: '#FFCC80',
      dark: '#EF6C00',
    },
    title: {
      dark: '#FFE0B2',
    },
    icon: {
      light: '#E65100',
    },
  },
  info: {
    main: '#2196F3',
    light: '#64B5F6',
    dark: '#0D47A1',
    contrastText: '#FFFFFF',
    background: {
      light: '#E3F2FD',
      dark: '#1B2A3D',
    },
    border: {
      light: '#90CAF9',
      dark: '#1565C0',
    },
    title: {
      dark: '#BBDEFB',
    },
    text: {
      dark: '#90CAF9',
    },
  },
} as const;

export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  xxl: '48px',
} as const;

export const borderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 24,
  full: 9999,
} as const;

export const borderWidth = {
  none: 0,
  sm: 1,
  md: 2,
  lg: 4,
  xl: 8,
} as const;

export const shadows = {
  none: 'none',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  xxl: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  accent: '0 4px 14px 0 rgba(235, 229, 75, 0.25)',
  primary: '0 4px 14px 0 rgba(148, 114, 200, 0.25)',
  secondary: '0 4px 14px 0 rgba(87, 47, 147, 0.25)',
} as const;

export const typography = {
  fontFamily: {
    primary: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    mono: '"Fira Code", "Monaco", "Consolas", monospace',
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
  },
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
  },
} as const;

export const transitions = {
  duration: {
    shortest: 150,
    shorter: 200,
    short: 250,
    standard: 300,
    complex: 375,
    enteringScreen: 225,
    leavingScreen: 195,
  },
  easing: {
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
  },
} as const;

export const breakpoints = {
  xs: '0px',
  sm: '600px',
  md: '900px',
  lg: '1200px',
  xl: '1536px',
} as const;
