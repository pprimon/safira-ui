import { Component, type ReactNode, type ErrorInfo } from "react";
import { Box, Typography, Button } from "@mui/material";
import { Error as ErrorIcon, Refresh } from "@mui/icons-material";

export interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  errorTitle?: string;
  errorMessage?: string;
  retryButtonText?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.props.onError?.(error, errorInfo);
  }

  handleRetry = (): void => {
    this.setState({ hasError: false, error: null });
  };

  render(): ReactNode {
    const {
      children,
      fallback,
      errorTitle = "Ops! Algo deu errado",
      errorMessage = "Ocorreu um erro inesperado. Por favor, tente novamente.",
      retryButtonText = "Tentar novamente",
    } = this.props;

    if (this.state.hasError) {
      if (fallback) {
        return fallback;
      }

      return (
        <Box
          role="alert"
          aria-live="assertive"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "200px",
            padding: 4,
            textAlign: "center",
          }}
        >
          <ErrorIcon
            aria-hidden="true"
            sx={{
              fontSize: 64,
              color: "error.main",
              marginBottom: 2,
            }}
          />
          <Typography
            variant="h5"
            component="h2"
            gutterBottom
            sx={{ color: "text.primary", fontWeight: "bold" }}
          >
            {errorTitle}
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "text.secondary", marginBottom: 3, maxWidth: 400 }}
          >
            {errorMessage}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Refresh />}
            onClick={this.handleRetry}
          >
            {retryButtonText}
          </Button>
          {process.env.NODE_ENV === "development" && this.state.error && (
            <Box
              component="pre"
              sx={{
                marginTop: 3,
                padding: 2,
                backgroundColor: "grey.100",
                borderRadius: 1,
                fontSize: "0.75rem",
                textAlign: "left",
                overflow: "auto",
                maxWidth: "100%",
                color: "error.dark",
              }}
            >
              {this.state.error.toString()}
            </Box>
          )}
        </Box>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
