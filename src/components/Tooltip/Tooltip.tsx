import React from "react";
import { Tooltip as MuiTooltip, Zoom } from "@mui/material";
import type { TooltipProps as MuiTooltipProps } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import type { BaseComponentProps, Position } from "../../types";
import { colors } from "../../theme/tokens";

export type TooltipVariant =
  | "default"
  | "light"
  | "error"
  | "warning"
  | "success"
  | "info";

export interface TooltipProps
  extends BaseComponentProps,
    Omit<MuiTooltipProps, "title" | "children" | "placement"> {
  title: React.ReactNode;
  children: React.ReactElement;
  placement?: Position;
  variant?: TooltipVariant;
  enterDelay?: number;
  leaveDelay?: number;
  followCursor?: boolean;
  maxWidth?: number;
  open?: boolean;
}

export const Tooltip: React.FC<TooltipProps> = ({
  title,
  children,
  placement = "top",
  variant = "default",
  enterDelay = 700,
  leaveDelay = 0,
  followCursor = false,
  maxWidth = 300,
  open,
  className,
  "data-testid": dataTestId,
  ...rest
}) => {
  const theme = useTheme();

  const getVariantStyles = () => {
    const variants = {
      default: {
        backgroundColor: colors.background.dark,
        color: colors.white,
      },
      light: {
        backgroundColor: colors.white,
        color: colors.text.primary,
        border: `1px solid ${colors.primary.light}`,
      },
      error: {
        backgroundColor: colors.error.main,
        color: colors.white,
      },
      warning: {
        backgroundColor: colors.warning.main,
        color: colors.warning.contrastText,
      },
      success: {
        backgroundColor: colors.success.main,
        color: colors.white,
      },
      info: {
        backgroundColor: colors.info.main,
        color: colors.white,
      },
    };
    return variants[variant];
  };

  const getMuiPlacement = (
    pos: Position
  ): MuiTooltipProps["placement"] => {
    const placements: Record<Position, MuiTooltipProps["placement"]> = {
      top: "top",
      bottom: "bottom",
      left: "left",
      right: "right",
      "top-start": "top-start",
      "top-end": "top-end",
      "bottom-start": "bottom-start",
      "bottom-end": "bottom-end",
    };
    return placements[pos];
  };

  return (
    <MuiTooltip
      title={title}
      placement={getMuiPlacement(placement)}
      enterDelay={enterDelay}
      leaveDelay={leaveDelay}
      followCursor={followCursor}
      open={open}
      TransitionComponent={Zoom}
      TransitionProps={{ timeout: theme.transitions.duration.shorter }}
      className={className}
      data-testid={dataTestId}
      componentsProps={{
        tooltip: {
          sx: {
            ...getVariantStyles(),
            maxWidth,
            fontSize: theme.typography.body2.fontSize,
            fontWeight: theme.typography.fontWeightMedium,
            padding: theme.spacing(1, 1.5),
            borderRadius: 2,
            boxShadow: theme.shadows[4],
          },
        },
        arrow: {
          sx: {
            color: getVariantStyles().backgroundColor,
          },
        },
      }}
      arrow
      {...rest}
    >
      {children}
    </MuiTooltip>
  );
};

export default Tooltip;
