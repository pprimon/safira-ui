import React from "react";
import { Badge as MuiBadge } from "@mui/material";
import "./Badge.theme";
import type { BadgeColor, BadgeSize, BadgeVariant } from "./Badge.theme";

export interface BadgeProps {
  children?: React.ReactElement;
  content?: React.ReactNode;
  max?: number;
  showZero?: boolean;
  variant?: BadgeVariant;
  color?: BadgeColor;
  size?: BadgeSize;
  anchorOrigin?: {
    vertical: "top" | "bottom";
    horizontal: "left" | "right";
  };
  invisible?: boolean;
  standalone?: boolean;
  className?: string;
  "data-testid"?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  content,
  max = 99,
  showZero = false,
  variant = "standard",
  color = "primary",
  size = "medium",
  anchorOrigin = {
    vertical: "top",
    horizontal: "right",
  },
  invisible = false,
  standalone = false,
  className,
  "data-testid": dataTestId,
}) => {
  if (standalone) {
    return (
      <MuiBadge
        badgeContent={content}
        max={max}
        showZero={showZero}
        invisible={invisible}
        className={className}
        data-testid={dataTestId}
        size={size}
        customColor={color}
        customVariant={variant}
        standalone={standalone}
      >
        <span />
      </MuiBadge>
    );
  }

  return (
    <MuiBadge
      badgeContent={variant === "dot" ? undefined : content}
      variant={variant === "dot" ? "dot" : "standard"}
      max={max}
      showZero={showZero}
      anchorOrigin={anchorOrigin}
      invisible={invisible}
      className={className}
      data-testid={dataTestId}
      size={size}
      customColor={color}
      customVariant={variant}
      standalone={standalone}
    >
      {children}
    </MuiBadge>
  );
};

export default Badge;
