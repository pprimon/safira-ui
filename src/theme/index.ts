// Tokens de design (mantidos para compatibilidade, mas prefira usar o theme)
export { colors, spacing, borderRadius, shadows, typography, transitions, breakpoints } from './tokens';

// Temas e função de criação
export { lightTheme, darkTheme, createCustomTheme, designTokens } from './theme';

// Provider e hooks
export { 
  SafiraThemeProvider, 
  useSafiraTheme, 
  useTheme, 
  ThemeToggle 
} from './ThemeProvider';
export type { SafiraThemeProviderProps } from './ThemeProvider';

// Tipos do MUI
export type { Theme, ThemeOptions } from '@mui/material/styles';
