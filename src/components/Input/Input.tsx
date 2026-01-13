import React, { forwardRef } from "react";
import { TextField, InputAdornment } from "@mui/material";
import type { TextFieldProps } from "@mui/material";
import type { BaseComponentProps, SizeProps, DisabledProps } from "../../types";

export interface InputProps
  extends BaseComponentProps,
    SizeProps,
    DisabledProps,
    Omit<TextFieldProps, "size" | "variant"> {
  /**
   * Label do input
   */
  label?: string;
  /**
   * Texto de placeholder
   */
  placeholder?: string;
  /**
   * Valor do input
   */
  value?: string;
  /**
   * Callback quando o valor muda
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * Callback quando o input perde o foco
   */
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /**
   * Callback quando o input ganha foco
   */
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /**
   * Tipo do input HTML
   */
  type?: "text" | "email" | "password" | "number" | "tel" | "url" | "search";
  /**
   * Se o input é obrigatório
   */
  required?: boolean;
  /**
   * Mensagem de erro
   */
  error?: boolean;
  /**
   * Texto de ajuda ou erro
   */
  helperText?: string;
  /**
   * Ícone à esquerda
   */
  startIcon?: React.ReactNode;
  /**
   * Ícone à direita
   */
  endIcon?: React.ReactNode;
  /**
   * Se o input deve ocupar toda a largura
   */
  fullWidth?: boolean;
  /**
   * Número máximo de caracteres
   */
  maxLength?: number;
}

/**
 * Componente Input do Safira UI
 *
 * Campo de entrada moderno com estados visuais, validação e acessibilidade completa.
 * Baseado no TextField do Material UI com customizações para a identidade visual do Safira UI.
 *
 * @example
 * ```tsx
 * <Input
 *   label="Nome"
 *   placeholder="Digite seu nome"
 *   value={name}
 *   onChange={(e) => setName(e.target.value)}
 * />
 *
 * <Input
 *   label="Email"
 *   type="email"
 *   error={!!emailError}
 *   helperText={emailError}
 *   startIcon={<EmailIcon />}
 * />
 * ```
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      placeholder,
      value,
      onChange,
      onBlur,
      onFocus,
      type = "text",
      required = false,
      error = false,
      helperText,
      startIcon,
      endIcon,
      fullWidth = false,
      maxLength,
      size = "medium",
      disabled = false,
      className,
      "data-testid": dataTestId,
      ...rest
    },
    ref
  ) => {
    return (
      <TextField
        ref={ref}
        label={label}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        type={type}
        required={required}
        error={error}
        helperText={helperText}
        fullWidth={fullWidth}
        disabled={disabled}
        variant="outlined"
        className={className}
        data-size={size}
        inputProps={{
          "data-testid": dataTestId,
          maxLength,
        }}
        InputProps={{
          startAdornment: startIcon ? (
            <InputAdornment position="start">{startIcon}</InputAdornment>
          ) : undefined,
          endAdornment: endIcon ? (
            <InputAdornment position="end">{endIcon}</InputAdornment>
          ) : undefined,
        }}
        {...rest}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
