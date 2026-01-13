import { Badge as MuiBadge } from "@mui/material";
import "./Badge.theme";
import type { BadgeColor, BadgeSize, BadgeVariant } from "./Badge.theme";
import { VisuallyHidden } from "../VisuallyHidden/VisuallyHidden";

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
  ariaLabel?: string;
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
  ariaLabel,
  "data-testid": dataTestId,
}) => {
  const getAccessibleLabel = () => {
    if (ariaLabel) return ariaLabel;
    if (variant === "dot") return "Notificação";
    if (typeof content === "number") {
      if (content > max) return `${max} ou mais notificações`;
      return `${content} ${content === 1 ? "notificação" : "notificações"}`;
    }
    return content?.toString() || "";
  };

  const accessibleLabel = getAccessibleLabel();

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
        role="status"
        aria-label={accessibleLabel}
      >
        <span aria-hidden="true" />
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
      {!invisible && accessibleLabel && (
        <VisuallyHidden role="status" aria-live="polite">
          {accessibleLabel}
        </VisuallyHidden>
      )}
    </MuiBadge>
  );
};

export default Badge;
