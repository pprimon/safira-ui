import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "@mui/material/styles";
import { Alert } from "../Alert";
import { lightTheme } from "../../../theme";

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={lightTheme}>{component}</ThemeProvider>);
};

describe("Alert Component", () => {
  describe("Rendering", () => {
    it("renders alert with content", () => {
      renderWithTheme(<Alert severity="info">This is an alert message</Alert>);
      expect(screen.getByText("This is an alert message")).toBeInTheDocument();
    });

    it("renders with title", () => {
      renderWithTheme(
        <Alert severity="success" title="Success!">
          Operation completed successfully
        </Alert>
      );
      expect(screen.getByText("Success!")).toBeInTheDocument();
      expect(
        screen.getByText("Operation completed successfully")
      ).toBeInTheDocument();
    });

    it("renders close button when closable", () => {
      renderWithTheme(
        <Alert severity="warning" closable>
          Warning message
        </Alert>
      );
      expect(screen.getByTestId("alert-close-button")).toBeInTheDocument();
    });

    it("does not render close button by default", () => {
      renderWithTheme(<Alert severity="info">Info message</Alert>);
      expect(
        screen.queryByTestId("alert-close-button")
      ).not.toBeInTheDocument();
    });
  });

  describe("Severity Types", () => {
    it("renders success alert", () => {
      renderWithTheme(<Alert severity="success">Success message</Alert>);
      expect(screen.getByText("Success message")).toBeInTheDocument();
    });

    it("renders error alert", () => {
      renderWithTheme(<Alert severity="error">Error message</Alert>);
      expect(screen.getByText("Error message")).toBeInTheDocument();
    });

    it("renders warning alert", () => {
      renderWithTheme(<Alert severity="warning">Warning message</Alert>);
      expect(screen.getByText("Warning message")).toBeInTheDocument();
    });

    it("renders info alert", () => {
      renderWithTheme(<Alert severity="info">Info message</Alert>);
      expect(screen.getByText("Info message")).toBeInTheDocument();
    });
  });

  describe("Variants", () => {
    it("renders standard variant by default", () => {
      renderWithTheme(<Alert severity="info">Standard alert</Alert>);
      expect(screen.getByText("Standard alert")).toBeInTheDocument();
    });

    it("renders filled variant", () => {
      renderWithTheme(
        <Alert severity="success" variant="filled">
          Filled alert
        </Alert>
      );
      expect(screen.getByText("Filled alert")).toBeInTheDocument();
    });

    it("renders outlined variant", () => {
      renderWithTheme(
        <Alert severity="error" variant="outlined">
          Outlined alert
        </Alert>
      );
      expect(screen.getByText("Outlined alert")).toBeInTheDocument();
    });
  });

  describe("Icons", () => {
    it("shows icon by default", () => {
      renderWithTheme(<Alert severity="success">Alert with icon</Alert>);
      expect(document.querySelector(".MuiAlert-icon")).toBeInTheDocument();
    });

    it("hides icon when showIcon is false", () => {
      renderWithTheme(
        <Alert severity="success" showIcon={false}>
          Alert without icon
        </Alert>
      );
      expect(document.querySelector(".MuiAlert-icon")).not.toBeInTheDocument();
    });

    it("renders custom icon", () => {
      const CustomIcon = () => <span data-testid="custom-icon">Custom</span>;

      renderWithTheme(
        <Alert severity="info" icon={<CustomIcon />}>
          Alert with custom icon
        </Alert>
      );
      expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
    });
  });

  describe("Visibility", () => {
    it("is visible by default", () => {
      renderWithTheme(<Alert severity="info">Visible alert</Alert>);
      expect(screen.getByText("Visible alert")).toBeInTheDocument();
    });

    it("can be hidden with visible prop", () => {
      renderWithTheme(
        <Alert severity="info" visible={false}>
          Hidden alert
        </Alert>
      );
      expect(screen.queryByText("Hidden alert")).not.toBeInTheDocument();
    });
  });

  describe("Interactions", () => {
    it("calls onClose when close button is clicked", async () => {
      const user = userEvent.setup();
      const handleClose = jest.fn();

      renderWithTheme(
        <Alert severity="warning" closable onClose={handleClose}>
          Closable alert
        </Alert>
      );

      await user.click(screen.getByTestId("alert-close-button"));
      expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it("can be controlled with visible state", () => {
      const TestComponent = () => {
        const [visible, setVisible] = React.useState(true);
        return (
          <Alert
            severity="info"
            visible={visible}
            closable
            onClose={() => setVisible(false)}
          >
            Controlled alert
          </Alert>
        );
      };

      renderWithTheme(<TestComponent />);

      expect(screen.getByText("Controlled alert")).toBeInTheDocument();

      fireEvent.click(screen.getByTestId("alert-close-button"));

      expect(screen.queryByText("Controlled alert")).not.toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("has proper role", () => {
      renderWithTheme(<Alert severity="info">Accessible alert</Alert>);
      expect(screen.getByRole("alert")).toBeInTheDocument();
    });

    it("close button has proper aria-label", () => {
      renderWithTheme(
        <Alert severity="warning" closable>
          Alert with close button
        </Alert>
      );
      const closeButton = screen.getByTestId("alert-close-button");
      expect(closeButton).toHaveAttribute("aria-label", "Fechar alerta");
    });

    it("supports custom close button aria-label for i18n", () => {
      renderWithTheme(
        <Alert severity="warning" closable closeButtonAriaLabel="Dismiss alert">
          Alert with close button
        </Alert>
      );
      const closeButton = screen.getByTestId("alert-close-button");
      expect(closeButton).toHaveAttribute("aria-label", "Dismiss alert");
    });

    it("has aria-live polite by default", () => {
      renderWithTheme(<Alert severity="info">Info message</Alert>);
      const alert = screen.getByRole("alert");
      expect(alert).toHaveAttribute("aria-live", "polite");
    });

    it("has aria-live assertive for errors", () => {
      renderWithTheme(<Alert severity="error">Error message</Alert>);
      const alert = screen.getByRole("alert");
      expect(alert).toHaveAttribute("aria-live", "assertive");
    });

    it("supports custom aria-live", () => {
      renderWithTheme(<Alert severity="info" ariaLive="off">Silent alert</Alert>);
      const alert = screen.getByRole("alert");
      expect(alert).toHaveAttribute("aria-live", "off");
    });

    it("has aria-atomic true", () => {
      renderWithTheme(<Alert severity="info">Atomic alert</Alert>);
      const alert = screen.getByRole("alert");
      expect(alert).toHaveAttribute("aria-atomic", "true");
    });
  });

  describe("Custom Props", () => {
    it("accepts custom className", () => {
      renderWithTheme(
        <Alert severity="info" className="custom-alert">
          Custom class alert
        </Alert>
      );
      expect(document.querySelector(".custom-alert")).toBeInTheDocument();
    });

    it("accepts custom data-testid", () => {
      renderWithTheme(
        <Alert severity="info" data-testid="custom-alert">
          Custom testid alert
        </Alert>
      );
      expect(screen.getByTestId("custom-alert")).toBeInTheDocument();
    });
  });

  describe("Snapshots", () => {
    it("matches snapshot for basic alert", () => {
      const { container } = renderWithTheme(
        <Alert severity="info">Basic alert message</Alert>
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it("matches snapshot for all severity types", () => {
      const severities = ["success", "error", "warning", "info"] as const;

      severities.forEach((severity) => {
        const { container } = renderWithTheme(
          <Alert severity={severity} title={`${severity} Alert`}>
            This is a {severity} message
          </Alert>
        );
        expect(container.firstChild).toMatchSnapshot(`alert-${severity}`);
      });
    });

    it("matches snapshot for all variants", () => {
      const variants = ["standard", "filled", "outlined"] as const;

      variants.forEach((variant) => {
        const { container } = renderWithTheme(
          <Alert severity="info" variant={variant}>
            {variant} variant alert
          </Alert>
        );
        expect(container.firstChild).toMatchSnapshot(`alert-${variant}`);
      });
    });

    it("matches snapshot with close button", () => {
      const { container } = renderWithTheme(
        <Alert severity="warning" closable title="Closable Alert">
          This alert can be closed
        </Alert>
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});

// Import React for controlled component test
import React from "react";
