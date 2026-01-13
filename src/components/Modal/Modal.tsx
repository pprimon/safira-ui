import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Fade,
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
  "data-testid": dataTestId,
  ...rest
}) => {
  const theme = useTheme();

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
      sx={{
        "& .MuiBackdrop-root": {
          backgroundColor: alpha(theme.palette.common.black, 0.6),
          backdropFilter: "blur(4px)",
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
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: theme.spacing(2, 3),
            borderBottom: `1px solid ${theme.palette.divider}`,
          }}
        >
          {title && (
            <span
              style={{
                fontWeight: theme.typography.fontWeightBold,
                fontSize: theme.typography.h6.fontSize,
                color: theme.palette.text.primary,
              }}
            >
              {title}
            </span>
          )}
          {showCloseButton && (
            <IconButton
              onClick={onClose}
              aria-label="Fechar modal"
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
                "&:hover": {
                  backgroundColor: alpha(theme.palette.error.light, 0.12),
                  color: "error.main",
                  transform: "scale(1.1) rotate(90deg)",
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
