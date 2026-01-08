import React from "react";
import {
  Card as MuiCard,
  CardHeader,
  CardContent,
  CardActions,
} from "@mui/material";
import type { CardProps as MuiCardProps } from "@mui/material";

export interface CardProps extends Omit<MuiCardProps, "variant" | "title"> {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  avatar?: React.ReactNode;
  headerAction?: React.ReactNode;
  actions?: React.ReactNode;
  variant?: "elevated" | "outlined" | "filled";
  clickable?: boolean;
  showHeader?: boolean;
  showActions?: boolean;
  contentPadding?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  "data-testid"?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  avatar,
  headerAction,
  actions,
  variant = "elevated",
  clickable = false,
  showHeader = true,
  showActions = true,
  contentPadding,
  onClick,
  className,
  sx,
  "data-testid": dataTestId,
  ...rest
}) => {
  const hasHeader = showHeader && (title || subtitle || avatar || headerAction);
  const hasActions = showActions && actions;
  const isClickable = clickable || !!onClick;

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (onClick) {
      onClick(event);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (isClickable && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      onClick?.(event as unknown as React.MouseEvent<HTMLDivElement>);
    }
  };

  return (
    <MuiCard
      data-variant={variant}
      data-clickable={isClickable}
      onClick={isClickable ? handleClick : undefined}
      onKeyDown={isClickable ? handleKeyDown : undefined}
      tabIndex={isClickable ? 0 : undefined}
      role={isClickable ? "button" : undefined}
      className={`${className || ""} ${isClickable ? "card-clickable" : ""}`}
      sx={sx}
      data-testid={dataTestId}
      {...rest}
    >
      {hasHeader && (
        <CardHeader
          title={title}
          subheader={subtitle}
          avatar={avatar}
          action={headerAction}
        />
      )}

      <CardContent
        sx={
          contentPadding
            ? {
                padding: contentPadding,
                "&:last-child": { paddingBottom: contentPadding },
              }
            : undefined
        }
      >
        {children}
      </CardContent>

      {hasActions && <CardActions>{actions}</CardActions>}
    </MuiCard>
  );
};

export default Card;
