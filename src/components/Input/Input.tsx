import React, { forwardRef } from "react";
import { TextField, InputAdornment, FormHelperText } from "@mui/material";
import type { TextFieldProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import type { BaseComponentProps, SizeProps, DisabledProps } from "../../types";
import {
  colors,
  borderRadius,
  spacing,
  shadows,
  transitions,
} from "../../theme";

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

const StyledTextField = styled(TextField, {
  shouldForwardProp: (prop) => !["size"].includes(prop as string),
})<{ size?: "small" | "medium" | "large" }>(
  ({ theme, size = "medium", error }) => {
    const sizeStyles = {
      small: {
        "& .MuiInputBase-root": {
          height: "36px",
          fontSize: "0.875rem",
        },
        "& .MuiInputLabel-root": {
          fontSize: "0.875rem",
        },
      },
      medium: {
        "& .MuiInputBase-root": {
          height: "44px",
          fontSize: "1rem",
        },
        "& .MuiInputLabel-root": {
          fontSize: "1rem",
        },
      },
      large: {
        "& .MuiInputBase-root": {
          height: "52px",
          fontSize: "1.125rem",
        },
        "& .MuiInputLabel-root": {
          fontSize: "1.125rem",
        },
      },
    };

    return {
      "& .MuiInputLabel-root": {
        color: colors.text.secondary,
        fontWeight: 500,
        fontSize: "0.875rem",
        "&.Mui-focused": {
          color: colors.primary.main,
          fontWeight: 600,
        },
        "&.Mui-error": {
          color: colors.error.main,
        },
      },
      "& .MuiOutlinedInput-root": {
        borderRadius: borderRadius.xl,
        backgroundColor: colors.surface.light,
        transition: `all ${transitions.duration.shorter}ms ${transitions.easing.easeInOut}`,
        "& fieldset": {
          borderColor: "transparent",
          borderWidth: "2px",
        },
        "&:hover": {
          backgroundColor: "#FFFFFF",
          transform: "translateY(-1px)",
          boxShadow: shadows.sm,
          "& fieldset": {
            borderColor: colors.primary.light,
          },
        },
        "&.Mui-focused": {
          backgroundColor: "#FFFFFF",
          transform: "translateY(-1px)",
          boxShadow: error
            ? `0 0 0 3px ${colors.error.main}25, ${shadows.md}`
            : `0 0 0 3px ${colors.primary.main}25, ${shadows.md}`,
          "& fieldset": {
            borderColor: error ? colors.error.main : colors.primary.main,
            borderWidth: "2px",
          },
        },
        "&.Mui-error": {
          backgroundColor: colors.error.light + "10",
          "& fieldset": {
            borderColor: colors.error.light,
          },
          "&:hover": {
            backgroundColor: colors.error.light + "15",
            "& fieldset": {
              borderColor: colors.error.main,
            },
          },
          "&.Mui-focused": {
            backgroundColor: "#FFFFFF",
            boxShadow: `0 0 0 3px ${colors.error.main}25, ${shadows.md}`,
            "& fieldset": {
              borderColor: colors.error.main,
              borderWidth: "2px",
            },
          },
        },
        "&.Mui-disabled": {
          backgroundColor: colors.surface.main,
          opacity: 0.6,
          "& fieldset": {
            borderColor: "transparent",
          },
        },
      },
      "& .MuiInputBase-input": {
        color: colors.text.primary,
        "&::placeholder": {
          color: colors.text.hint,
          opacity: 1,
        },
      },
      "& .MuiFormHelperText-root": {
        marginLeft: spacing.sm,
        marginTop: spacing.xs,
        fontSize: "0.75rem",
        fontWeight: 500,
        color: colors.text.secondary,
        "&.Mui-error": {
          color: colors.error.main,
          fontWeight: 600,
        },
      },
      ...sizeStyles[size],
    };
  }
);

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
      <StyledTextField
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
        size={size}
        variant="outlined"
        className={className}
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
