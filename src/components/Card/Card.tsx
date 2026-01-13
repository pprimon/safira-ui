import {
  Card as MuiCard,
  CardHeader,
  CardContent,
  CardActions,
} from "@mui/material";
import type { CardProps as MuiCardProps } from "@mui/material";
import { useTheme, alpha } from "@mui/material/styles";

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
  ariaLabel?: string;
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
  ariaLabel,
  "data-testid": dataTestId,
  ...rest
}) => {
  const theme = useTheme();
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

  const getClickableStyles = () => {
    if (!isClickable) return {};

    return {
      cursor: "pointer",
      transition: theme.transitions.create(
        ["transform", "box-shadow", "border-color"],
        { duration: theme.transitions.duration.shorter }
      ),
      "@media (prefers-reduced-motion: reduce)": {
        transition: "none",
      },
      "&:hover": {
        transform: "translateY(-2px)",
        boxShadow: theme.shadows[8],
        "@media (prefers-reduced-motion: reduce)": {
          transform: "none",
        },
      },
      "&:active": {
        transform: "translateY(0)",
        "@media (prefers-reduced-motion: reduce)": {
          transform: "none",
        },
      },
      "&:focus-visible": {
        outline: `3px solid ${theme.palette.primary.main}`,
        outlineOffset: "2px",
        boxShadow: `0 0 0 4px ${alpha(theme.palette.primary.main, 0.25)}`,
      },
    };
  };

  return (
    <MuiCard
      data-variant={variant}
      data-clickable={isClickable}
      onClick={isClickable ? handleClick : undefined}
      onKeyDown={isClickable ? handleKeyDown : undefined}
      tabIndex={isClickable ? 0 : undefined}
      role={isClickable ? "button" : undefined}
      aria-label={isClickable ? ariaLabel || title : undefined}
      className={`${className || ""} ${isClickable ? "card-clickable" : ""}`}
      sx={{
        ...getClickableStyles(),
        ...sx,
      }}
      data-testid={dataTestId}
      {...rest}
    >
      {hasHeader && (
        <CardHeader
          title={title}
          subheader={subtitle}
          avatar={avatar}
          action={headerAction}
          titleTypographyProps={{
            component: "h3",
            variant: "h6",
          }}
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
