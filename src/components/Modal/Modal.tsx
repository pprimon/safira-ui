import { useId } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Fade,
  Typography,
} from "@mui/material";
import type { DialogProps } from "@mui/material";
import { Close } from "@mui/icons-material";
import { useTheme, alpha } from "@mui/material/styles";
import type { BaseComponentProps, SizeProps } from "../../types";

export interface ModalProps
  extends BaseComponentProps,
    SizeProps,
    Omit<DialogProps, "title" | "children"> {
  open: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
  actions?: React.ReactNode;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
  fullWidth?: boolean;
  showCloseButton?: boolean;
  closeOnBackdropClick?: boolean;
  closeOnEscape?: boolean;
  fullHeight?: boolean;
  ariaDescription?: string;
  closeButtonAriaLabel?: string;
}

export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  children,
  actions,
  maxWidth = "sm",
  fullWidth = true,
  showCloseButton = true,
  closeOnBackdropClick = true,
  closeOnEscape = true,
  fullHeight = false,
  size = "medium",
  className,
  ariaDescription,
  closeButtonAriaLabel = "Fechar modal",
  "data-testid": dataTestId,
  ...rest
}) => {
  const theme = useTheme();
  const uniqueId = useId();
  const titleId = `modal-title-${uniqueId}`;
  const descriptionId = `modal-description-${uniqueId}`;

  const handleBackdropClick = () => {
    if (closeOnBackdropClick) {
      onClose();
    }
  };

  const getSizeStyles = () => {
    const sizes = {
      small: {
        minHeight: "auto",
        "& .MuiDialogContent-root": {
          padding: theme.spacing(2),
        },
      },
      medium: {
        minHeight: "auto",
        "& .MuiDialogContent-root": {
          padding: theme.spacing(3),
        },
      },
      large: {
        minHeight: fullHeight ? "80vh" : "auto",
        "& .MuiDialogContent-root": {
          padding: theme.spacing(4),
        },
      },
    };
    return sizes[size];
  };

  return (
    <Dialog
      open={open}
      onClose={handleBackdropClick}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      className={className}
      data-testid={dataTestId}
      TransitionComponent={Fade}
      TransitionProps={{ timeout: theme.transitions.duration.standard }}
      disableEscapeKeyDown={!closeOnEscape}
      aria-labelledby={title ? titleId : undefined}
      aria-describedby={ariaDescription ? descriptionId : undefined}
      sx={{
        "& .MuiBackdrop-root": {
          backgroundColor: alpha(theme.palette.common.black, 0.6),
          backdropFilter: "blur(4px)",
          "@media (prefers-reduced-motion: reduce)": {
            backdropFilter: "none",
          },
        },
        "& .MuiDialog-paper": {
          borderRadius: 3,
          boxShadow: theme.shadows[16],
          ...getSizeStyles(),
        },
      }}
      {...rest}
    >
      {(title || showCloseButton) && (
        <DialogTitle
          id={titleId}
          component="div"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: theme.spacing(2, 3),
            borderBottom: `1px solid ${theme.palette.divider}`,
          }}
        >
          {title && (
            <Typography
              variant="h6"
              component="h2"
              sx={{
                fontWeight: theme.typography.fontWeightBold,
                color: theme.palette.text.primary,
              }}
            >
              {title}
            </Typography>
          )}
          {showCloseButton && (
            <IconButton
              onClick={onClose}
              aria-label={closeButtonAriaLabel}
              data-testid="modal-close-button"
              size="small"
              sx={{
                marginLeft: "auto",
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
          )}
        </DialogTitle>
      )}

      <DialogContent
        sx={{
          padding: theme.spacing(3),
          color: theme.palette.text.primary,
        }}
      >
        {ariaDescription && (
          <span id={descriptionId} className="sr-only">
            {ariaDescription}
          </span>
        )}
        {children}
      </DialogContent>

      {actions && (
        <DialogActions
          sx={{
            padding: theme.spacing(2, 3),
            borderTop: `1px solid ${theme.palette.divider}`,
            gap: theme.spacing(1),
          }}
        >
          {actions}
        </DialogActions>
      )}
    </Dialog>
  );
};

export default Modal;
