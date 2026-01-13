import { forwardRef, useId } from "react";
import {
  FormControl,
  InputLabel,
  Select as MuiSelect,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import type { SelectProps as MuiSelectProps, SelectChangeEvent } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import type { BaseComponentProps, SizeProps, DisabledProps } from "../../types";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps
  extends BaseComponentProps,
    SizeProps,
    DisabledProps,
    Omit<MuiSelectProps, "size" | "variant" | "onChange"> {
  label?: string;
  options: SelectOption[];
  value?: string | string[];
  onChange?: (event: SelectChangeEvent<string | string[]>) => void;
  placeholder?: string;
  required?: boolean;
  error?: boolean;
  helperText?: string;
  fullWidth?: boolean;
  multiple?: boolean;
  ariaDescribedBy?: string;
}

export const Select = forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      label,
      options,
      value,
      onChange,
      placeholder,
      required = false,
      error = false,
      helperText,
      fullWidth = false,
      multiple = false,
      size = "medium",
      disabled = false,
      className,
      ariaDescribedBy,
      "data-testid": dataTestId,
      ...rest
    },
    ref
  ) => {
    const theme = useTheme();
    const uniqueId = useId();
    const labelId = label ? `select-label-${uniqueId}` : undefined;
    const helperTextId = helperText ? `select-helper-${uniqueId}` : undefined;
    const hasValue = value !== undefined && value !== "" && (!Array.isArray(value) || value.length > 0);
    const shouldShrink = hasValue || !!placeholder;
    
    const describedBy = [ariaDescribedBy, helperTextId]
      .filter(Boolean)
      .join(" ") || undefined;

    return (
      <FormControl
        ref={ref}
        fullWidth={fullWidth}
        error={error}
        disabled={disabled}
        required={required}
        className={className}
        data-size={size}
      >
        {label && (
          <InputLabel id={labelId} shrink={shouldShrink}>
            {label}
          </InputLabel>
        )}
        <MuiSelect
          labelId={labelId}
          label={label}
          value={value ?? (multiple ? [] : "")}
          onChange={onChange}
          multiple={multiple}
          displayEmpty={!!placeholder}
          notched={shouldShrink}
          data-testid={dataTestId}
          aria-describedby={describedBy}
          aria-invalid={error}
          renderValue={(selected) => {
            if (!selected || (Array.isArray(selected) && selected.length === 0)) {
              return placeholder ? (
                <span style={{ color: theme.palette.text.disabled }}>
                  {placeholder}
                </span>
              ) : null;
            }

            if (Array.isArray(selected)) {
              return selected
                .map((val) => options.find((opt) => opt.value === val)?.label || val)
                .join(", ");
            }

            return options.find((opt) => opt.value === selected)?.label || selected;
          }}
          {...rest}
        >
          {options.map((option) => (
            <MenuItem
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </MenuItem>
          ))}
        </MuiSelect>
        {helperText && (
          <FormHelperText id={helperTextId}>{helperText}</FormHelperText>
        )}
      </FormControl>
    );
  }
);

Select.displayName = "Select";

export default Select;
