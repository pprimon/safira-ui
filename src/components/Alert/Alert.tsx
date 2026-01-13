import {
  Alert as MuiAlert,
  AlertTitle,
  Collapse,
  IconButton,
} from "@mui/material";
import type { AlertProps as MuiAlertProps } from "@mui/material";
import {
  CheckCircle,
  Error as ErrorIcon,
  Warning,
  Info,
  Close,
} from "@mui/icons-material";
import { useTheme, alpha } from "@mui/material/styles";

const severityIcons = {
  success: CheckCircle,
  error: ErrorIcon,
  warning: Warning,
  info: Info,
};

export interface AlertProps extends Omit<MuiAlertProps, "title"> {
  severity?: "success" | "error" | "warning" | "info";
  title?: string;
  closable?: boolean;
  visible?: boolean;
  icon?: React.ReactNode;
  showIcon?: boolean;
  "data-testid"?: string;
  closeButtonAriaLabel?: string;
  ariaLive?: "polite" | "assertive" | "off";
}

export const Alert: React.FC<AlertProps> = ({
  title,
  children,
  closable = false,
  onClose,
  visible = true,
  showIcon = true,
  icon,
  severity = "info",
  variant = "standard",
  sx,
  closeButtonAriaLabel = "Fechar alerta",
  ariaLive,
  "data-testid": dataTestId,
  ...rest
}) => {
  const theme = useTheme();

  const getIcon = () => {
    if (!showIcon) return false;
    if (icon) return icon;
    const DefaultIcon = severityIcons[severity];
    return <DefaultIcon />;
  };

  const getAriaLive = (): "polite" | "assertive" | "off" => {
    if (ariaLive) return ariaLive;
    if (severity === "error") return "assertive";
    return "polite";
  };

  return (
    <Collapse
      in={visible}
      timeout={theme.transitions.duration.standard}
      unmountOnExit
      sx={{
        "@media (prefers-reduced-motion: reduce)": {
          transition: "none",
        },
      }}
    >
      <MuiAlert
        severity={severity}
        variant={variant}
        icon={getIcon()}
        onClose={closable ? onClose : undefined}
        role="alert"
        aria-live={getAriaLive()}
        aria-atomic="true"
        action={
          closable ? (
            <IconButton
              onClick={onClose}
              aria-label={closeButtonAriaLabel}
              size="small"
              data-testid="alert-close-button"
              sx={{
                p: 0.5,
                ml: 1,
                borderRadius: 2,
                transition: theme.transitions.create(
                  ["background-color", "color", "transform"],
                  {
                    duration: theme.transitions.duration.shorter,
                  }
                ),
                "@media (prefers-reduced-motion: reduce)": {
                  transition: "none",
                },
                "&:hover": {
                  backgroundColor: alpha(theme.palette.error.light, 0.12),
                  color: "error.main",
                  transform: "scale(1.1) rotate(90deg)",
                  "@media (prefers-reduced-motion: reduce)": {
                    transform: "none",
                  },
                },
              }}
            >
              <Close fontSize="small" />
            </IconButton>
          ) : undefined
        }
        sx={sx}
        data-testid={dataTestId}
        {...rest}
      >
        {title && <AlertTitle>{title}</AlertTitle>}
        {children}
      </MuiAlert>
    </Collapse>
  );
};

export default Alert;
