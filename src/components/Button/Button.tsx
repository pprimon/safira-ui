import React from "react";
import { Button as MuiButton, CircularProgress } from "@mui/material";
import type { ButtonProps as MuiButtonProps } from "@mui/material";
import "./Button.theme";
import type { ButtonVariant, ButtonSize } from "./Button.theme";
import { colors, spacing } from "../../theme/tokens";

export interface ButtonProps extends Omit<MuiButtonProps, "variant" | "size"> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  className?: string;
  "data-testid"?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "medium",
  disabled = false,
  loading = false,
  fullWidth = false,
  startIcon,
  endIcon,
  type = "button",
  onClick,
  className,
  "data-testid": dataTestId,
  ...rest
}) => {
  const isDisabled = disabled || loading;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!isDisabled && onClick) {
      onClick(event);
    }
  };

  const getMuiVariant = (
    variant: ButtonVariant
  ): "contained" | "outlined" | "text" => {
    switch (variant) {
      case "primary":
      case "secondary":
      case "danger":
        return "contained";
      case "outline":
        return "outlined";
      case "ghost":
        return "text";
      default:
        return "contained";
    }
  };

  const getLoaderColor = () => {
    if (variant === "outline" || variant === "ghost") {
      return colors.primary.main;
    }
    if (variant === "danger") {
      return colors.error.contrastText;
    }
    return colors.primary.contrastText;
  };

  return (
    <MuiButton
      variant={getMuiVariant(variant)}
      disabled={isDisabled}
      fullWidth={fullWidth}
      type={type}
      onClick={handleClick}
      className={className}
      data-testid={dataTestId}
      startIcon={loading ? undefined : startIcon}
      endIcon={loading ? undefined : endIcon}
      customSize={size}
      customVariant={variant}
      {...rest}
    >
      {loading && (
        <CircularProgress
          size={size === "small" ? 16 : size === "large" ? 24 : 20}
          sx={{
            color: getLoaderColor(),
            marginRight: children ? spacing.xs : 0,
          }}
        />
      )}
      {children}
    </MuiButton>
  );
};

export default Button;
