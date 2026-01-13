import type { ReactNode } from 'react';

export type Size = 'small' | 'medium' | 'large';
export type Variant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type Color = 'primary' | 'secondary' | 'accent' | 'success' | 'error' | 'warning' | 'info';
export type Severity = 'success' | 'error' | 'warning' | 'info';

export interface BaseComponentProps {
  className?: string;
  children?: ReactNode;
  'data-testid'?: string;
}

export interface SizeProps {
  size?: Size;
}

export interface ColorProps {
  color?: Color;
}

export interface VariantProps {
  variant?: Variant;
}

export interface DisabledProps {
  disabled?: boolean;
}

export interface LoadingProps {
  loading?: boolean;
}

export interface ClickableProps {
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

export type Position = 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end';

export interface AnimationProps {
  duration?: number;
  easing?: string;
  delay?: number;
}
