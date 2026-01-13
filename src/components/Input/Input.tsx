import { forwardRef, useId } from "react";
import { TextField, InputAdornment } from "@mui/material";
import type { TextFieldProps } from "@mui/material";
import type { BaseComponentProps, SizeProps, DisabledProps } from "../../types";

export interface InputProps
  extends BaseComponentProps,
    SizeProps,
    DisabledProps,
    Omit<TextFieldProps, "size" | "variant"> {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  type?: "text" | "email" | "password" | "number" | "tel" | "url" | "search";
  required?: boolean;
  error?: boolean;
  helperText?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  fullWidth?: boolean;
  maxLength?: number;
  ariaDescribedBy?: string;
}

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
      ariaDescribedBy,
      "data-testid": dataTestId,
      ...rest
    },
    ref
  ) => {
    const uniqueId = useId();
    const helperTextId = helperText ? `helper-${uniqueId}` : undefined;
    const describedBy = [ariaDescribedBy, helperTextId]
      .filter(Boolean)
      .join(" ") || undefined;

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
          "aria-invalid": error,
          "aria-describedby": describedBy,
        }}
        FormHelperTextProps={{
          id: helperTextId,
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
