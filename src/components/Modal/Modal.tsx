import React, { useEffect } from "react";
import {
  Modal as MuiModal,
  Backdrop,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import { styled, keyframes } from "@mui/material/styles";
import { Close } from "@mui/icons-material";
import type { BaseComponentProps, SizeProps } from "../../types";
import {
  colors,
  borderRadius,
  spacing,
  shadows,
  transitions,
} from "../../theme";

export interface ModalProps extends BaseComponentProps, SizeProps {
  /**
   * Se o modal está aberto
   */
  open: boolean;
  /**
   * Callback quando o modal deve ser fechado
   */
  onClose: () => void;
  /**
   * Título do modal
   */
  title?: string;
  /**
   * Conteúdo do modal
   */
  children: React.ReactNode;
  /**
   * Se deve mostrar o botão de fechar
   */
  showCloseButton?: boolean;
  /**
   * Se deve fechar ao clicar no backdrop
   */
  closeOnBackdropClick?: boolean;
  /**
   * Se deve fechar ao pressionar ESC
   */
  closeOnEscape?: boolean;
  /**
   * Largura máxima do modal
   */
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | number;
  /**
   * Se o modal deve ocupar toda a altura
   */
  fullHeight?: boolean;
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const scaleIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9) translateY(-10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
`;

const StyledBackdrop = styled(Backdrop)(({ theme }) => ({
  backgroundColor: "rgba(63, 62, 51, 0.6)",
  backdropFilter: "blur(8px)",
  animation: `${fadeIn} ${transitions.duration.standard}ms ${transitions.easing.easeInOut}`,
}));

const StyledModalContainer = styled(Box, {
  shouldForwardProp: (prop) =>
    !["size", "maxWidth", "fullHeight"].includes(prop as string),
})<{
  size?: "small" | "medium" | "large";
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | number;
  fullHeight?: boolean;
}>(({ theme, size = "medium", maxWidth = "md", fullHeight = false }) => {
  const sizeStyles = {
    small: {
      padding: spacing.lg,
      minHeight: "200px",
    },
    medium: {
      padding: spacing.xl,
      minHeight: "300px",
    },
    large: {
      padding: spacing.xxl,
      minHeight: "400px",
    },
  };

  const maxWidthStyles = {
    xs: "320px",
    sm: "480px",
    md: "640px",
    lg: "800px",
    xl: "1024px",
  };

  const getMaxWidth = () => {
    if (typeof maxWidth === "number") {
      return `${maxWidth}px`;
    }
    return maxWidthStyles[maxWidth];
  };

  return {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#FFFFFF",
    borderRadius: borderRadius.xxl,
    boxShadow: `${shadows.xxl}, 0 0 0 1px ${colors.primary.light}20`,
    outline: "none",
    maxWidth: getMaxWidth(),
    width: "90vw",
    maxHeight: fullHeight ? "90vh" : "80vh",
    overflow: "auto",
    border: `2px solid ${colors.surface.light}`,
    animation: `${scaleIn} ${transitions.duration.standard}ms ${transitions.easing.easeInOut}`,
    ...sizeStyles[size],
  };
});

const StyledHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: spacing.lg,
  paddingBottom: spacing.lg,
  borderBottom: `2px solid ${colors.surface.main}`,
  position: "relative",
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: "-2px",
    left: 0,
    width: "60px",
    height: "2px",
    backgroundColor: colors.primary.main,
    borderRadius: "2px",
  },
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
  color: colors.text.primary,
  fontWeight: 700,
  fontSize: "1.5rem",
  margin: 0,
  letterSpacing: "-0.025em",
}));

const StyledCloseButton = styled(IconButton)(({ theme }) => ({
  color: colors.text.secondary,
  padding: spacing.sm,
  borderRadius: borderRadius.lg,
  transition: `all ${transitions.duration.shorter}ms ${transitions.easing.easeInOut}`,
  "&:hover": {
    backgroundColor: colors.error.light + "15",
    color: colors.error.main,
    transform: "scale(1.1) rotate(90deg)",
  },
}));

const StyledContent = styled(Box)(({ theme }) => ({
  color: colors.text.primary,
  lineHeight: 1.6,
  fontSize: "1rem",
}));

/**
 * Componente Modal do Safira UI
 *
 * Modal moderno com animações suaves, backdrop blur e controle completo de estado.
 * Inclui acessibilidade com foco trap e suporte a teclado.
 *
 * @example
 * ```tsx
 * <Modal
 *   open={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   title="Confirmar ação"
 *   size="medium"
 * >
 *   <p>Tem certeza que deseja continuar?</p>
 *   <Button onClick={handleConfirm}>Confirmar</Button>
 * </Modal>
 *
 * <Modal
 *   open={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   maxWidth="lg"
 *   fullHeight
 *   closeOnBackdropClick={false}
 * >
 *   <ComplexForm />
 * </Modal>
 * ```
 */
export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  children,
  showCloseButton = true,
  closeOnBackdropClick = true,
  closeOnEscape = true,
  size = "medium",
  maxWidth = "md",
  fullHeight = false,
  className,
  "data-testid": dataTestId,
}) => {
  // Gerenciar foco e scroll quando modal abre/fecha
  useEffect(() => {
    if (open) {
      // Prevenir scroll do body quando modal está aberto
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup quando componente desmonta
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  // Fechar com ESC
  useEffect(() => {
    if (!closeOnEscape) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose, closeOnEscape]);

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (closeOnBackdropClick && event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <MuiModal
      open={open}
      onClose={closeOnBackdropClick ? onClose : undefined}
      closeAfterTransition
      slots={{ backdrop: StyledBackdrop }}
      slotProps={{
        backdrop: {
          timeout: transitions.duration.standard,
        },
      }}
      data-testid={dataTestId}
    >
      <StyledModalContainer
        size={size}
        maxWidth={maxWidth}
        fullHeight={fullHeight}
        className={className}
        onClick={handleBackdropClick}
      >
        {(title || showCloseButton) && (
          <StyledHeader>
            {title && <StyledTitle variant="h6">{title}</StyledTitle>}
            {showCloseButton && (
              <StyledCloseButton
                onClick={onClose}
                aria-label="Fechar modal"
                data-testid="modal-close-button"
              >
                <Close />
              </StyledCloseButton>
            )}
          </StyledHeader>
        )}
        <StyledContent>{children}</StyledContent>
      </StyledModalContainer>
    </MuiModal>
  );
};

export default Modal;
