import type { ReactNode } from 'react';

/**
 * Tipos base do Safira UI
 */

export type Size = 'small' | 'medium' | 'large';
export type Variant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type Color = 'primary' | 'secondary' | 'accent' | 'success' | 'error' | 'warning' | 'info';
export type Severity = 'success' | 'error' | 'warning' | 'info';

/**
 * Props base para todos os componentes
 */
export interface BaseComponentProps {
  className?: string;
  children?: ReactNode;
  'data-testid'?: string;
}

/**
 * Props para componentes com variações de tamanho
 */
export interface SizeProps {
  size?: Size;
}

/**
 * Props para componentes com variações de cor
 */
export interface ColorProps {
  color?: Color;
}

/**
 * Props para componentes com variações visuais
 */
export interface VariantProps {
  variant?: Variant;
}

/**
 * Props para componentes que podem ser desabilitados
 */
export interface DisabledProps {
  disabled?: boolean;
}

/**
 * Props para componentes de loading
 */
export interface LoadingProps {
  loading?: boolean;
}

/**
 * Props para componentes clicáveis
 */
export interface ClickableProps {
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

/**
 * Props para posicionamento de tooltips e popovers
 */
export type Position = 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end';

/**
 * Props para animações
 */
export interface AnimationProps {
  duration?: number;
  easing?: string;
  delay?: number;
}
