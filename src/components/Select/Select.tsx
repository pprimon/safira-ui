import React, { forwardRef } from "react";
import {
  Select as MuiSelect,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  SelectProps as MuiSelectProps,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { ExpandMore } from "@mui/icons-material";
import type { BaseComponentProps, SizeProps, DisabledProps } from "../../types";
import {
  colors,
  borderRadius,
  spacing,
  shadows,
  transitions,
} from "../../theme";

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface SelectProps
  extends BaseComponentProps,
    SizeProps,
    DisabledProps,
    Omit<MuiSelectProps, "size" | "variant"> {
  /**
   * Label do select
   */
  label?: string;
  /**
   * Valor selecionado
   */
  value?: string | number;
  /**
   * Callback quando o valor muda
   */
  onChange?: (value: string | number) => void;
  /**
   * Opções do select
   */
  options: SelectOption[];
  /**
   * Texto quando nenhuma opção está selecionada
   */
  placeholder?: string;
  /**
   * Se o select é obrigatório
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
   * Se o select deve ocupar toda a largura
   */
  fullWidth?: boolean;
  /**
   * Se permite múltipla seleção
   */
  multiple?: boolean;
}

const StyledFormControl = styled(FormControl, {
  shouldForwardProp: (prop) => !["size"].includes(prop as string),
})<{ size?: "small" | "medium" | "large" }>(({ theme, size = "medium" }) => {
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
        boxShadow: `0 0 0 3px ${colors.primary.main}25, ${shadows.md}`,
        "& fieldset": {
          borderColor: colors.primary.main,
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
    "& .MuiSelect-select": {
      color: colors.text.primary,
      display: "flex",
      alignItems: "center",
    },
    "& .MuiSelect-icon": {
      color: colors.primary.main,
      transition: `all ${transitions.duration.shorter}ms ${transitions.easing.easeInOut}`,
      fontSize: "1.5rem",
    },
    "& .MuiSelect-iconOpen": {
      transform: "rotate(180deg)",
      color: colors.primary.dark,
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
});

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  fontSize: "1rem",
  padding: `${spacing.md} ${spacing.lg}`,
  margin: `0 ${spacing.xs}`,
  borderRadius: borderRadius.lg,
  color: colors.text.primary,
  transition: `all ${transitions.duration.shorter}ms ${transitions.easing.easeInOut}`,
  "&:hover": {
    backgroundColor: colors.primary.light + "15",
    color: colors.primary.dark,
    transform: "translateX(4px)",
  },
  "&.Mui-selected": {
    backgroundColor: colors.primary.main + "20",
    color: colors.primary.main,
    fontWeight: 600,
    "&:hover": {
      backgroundColor: colors.primary.main + "30",
      transform: "translateX(4px)",
    },
  },
  "&.Mui-disabled": {
    color: colors.text.disabled,
    opacity: 0.5,
  },
}));

/**
 * Componente Select do Safira UI
 *
 * Dropdown moderno com opções customizáveis, estados visuais e acessibilidade completa.
 * Baseado no Select do Material UI com customizações para a identidade visual do Safira UI.
 *
 * @example
 * ```tsx
 * <Select
 *   label="País"
 *   value={country}
 *   onChange={setCountry}
 *   options={[
 *     { value: 'br', label: 'Brasil' },
 *     { value: 'us', label: 'Estados Unidos' },
 *     { value: 'ca', label: 'Canadá' }
 *   ]}
 * />
 *
 * <Select
 *   label="Categorias"
 *   multiple
 *   value={categories}
 *   onChange={setCategories}
 *   options={categoryOptions}
 * />
 * ```
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      value,
      onChange,
      options,
      placeholder,
      required = false,
      error = false,
      helperText,
      fullWidth = false,
      multiple = false,
      size = "medium",
      disabled = false,
      className,
      "data-testid": dataTestId,
      ...rest
    },
    ref
  ) => {
    const handleChange = (event: any) => {
      if (onChange) {
        onChange(event.target.value);
      }
    };

    return (
      <StyledFormControl
        fullWidth={fullWidth}
        error={error}
        required={required}
        disabled={disabled}
        size={size}
        className={className}
      >
        {label && <InputLabel id={`select-label-${label}`}>{label}</InputLabel>}
        <MuiSelect
          ref={ref}
          labelId={label ? `select-label-${label}` : undefined}
          value={value || (multiple ? [] : "")}
          onChange={handleChange}
          variant="outlined"
          multiple={multiple}
          displayEmpty={!!placeholder}
          IconComponent={ExpandMore}
          inputProps={{
            "data-testid": dataTestId,
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                borderRadius: borderRadius.xl,
                boxShadow: shadows.xl,
                marginTop: spacing.sm,
                border: `1px solid ${colors.primary.light}30`,
                "& .MuiList-root": {
                  padding: spacing.sm,
                },
              },
            },
            transformOrigin: {
              vertical: "top",
              horizontal: "left",
            },
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "left",
            },
          }}
          {...rest}
        >
          {placeholder && !multiple && (
            <StyledMenuItem value="" disabled>
              <em>{placeholder}</em>
            </StyledMenuItem>
          )}
          {options.map((option) => (
            <StyledMenuItem
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </StyledMenuItem>
          ))}
        </MuiSelect>
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </StyledFormControl>
    );
  }
);

Select.displayName = "Select";

export default Select;
