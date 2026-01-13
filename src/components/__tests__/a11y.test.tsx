/**
 * Testes de Acessibilidade (a11y)
 *
 * Este arquivo contém testes automatizados de acessibilidade usando jest-axe.
 * Estes testes verificam se os componentes seguem as diretrizes WCAG.
 */
import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import { ThemeProvider } from "@mui/material/styles";
import { lightTheme } from "../../theme";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import { Select } from "../Select/Select";
import { Alert } from "../Alert/Alert";
import { Card } from "../Card/Card";
import { Badge } from "../Badge/Badge";
import { Tooltip } from "../Tooltip/Tooltip";
import { Modal } from "../Modal/Modal";

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={lightTheme}>{component}</ThemeProvider>);
};

describe("Accessibility Tests", () => {
  describe("Button", () => {
    it("should have no accessibility violations", async () => {
      const { container } = renderWithTheme(
        <Button>Click me</Button>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("should have no violations when disabled", async () => {
      const { container } = renderWithTheme(
        <Button disabled>Disabled Button</Button>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("should have no violations when loading", async () => {
      const { container } = renderWithTheme(
        <Button loading>Loading Button</Button>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("should have no violations with icon", async () => {
      const { container } = renderWithTheme(
        <Button startIcon={<span>→</span>}>With Icon</Button>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe("Input", () => {
    it("should have no accessibility violations with label", async () => {
      const { container } = renderWithTheme(
        <Input label="Email" type="email" />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("should have no violations with helper text", async () => {
      const { container } = renderWithTheme(
        <Input label="Password" type="password" helperText="Min 8 characters" />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("should have no violations in error state", async () => {
      const { container } = renderWithTheme(
        <Input label="Email" error helperText="Invalid email format" />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("should have no violations when required", async () => {
      const { container } = renderWithTheme(
        <Input label="Required Field" required />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe("Select", () => {
    const options = [
      { value: "1", label: "Option 1" },
      { value: "2", label: "Option 2" },
      { value: "3", label: "Option 3" },
    ];

    it("should have no accessibility violations", async () => {
      const { container } = renderWithTheme(
        <Select label="Choose option" options={options} />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("should have no violations with placeholder", async () => {
      const { container } = renderWithTheme(
        <Select
          label="Choose option"
          options={options}
          placeholder="Select..."
        />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("should have no violations in error state", async () => {
      const { container } = renderWithTheme(
        <Select
          label="Choose option"
          options={options}
          error
          helperText="Please select an option"
        />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe("Alert", () => {
    it("should have no accessibility violations", async () => {
      const { container } = renderWithTheme(
        <Alert severity="info">This is an info alert</Alert>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("should have no violations with title", async () => {
      const { container } = renderWithTheme(
        <Alert severity="success" title="Success!">
          Operation completed successfully
        </Alert>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("should have no violations when closable", async () => {
      const { container } = renderWithTheme(
        <Alert severity="warning" closable onClose={() => {}}>
          Warning message
        </Alert>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("should have no violations for all severities", async () => {
      const severities = ["success", "error", "warning", "info"] as const;

      for (const severity of severities) {
        const { container } = renderWithTheme(
          <Alert severity={severity}>Test message</Alert>
        );
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      }
    });
  });

  describe("Card", () => {
    it("should have no accessibility violations", async () => {
      const { container } = renderWithTheme(
        <Card title="Card Title">Card content</Card>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("should have no violations when clickable", async () => {
      const { container } = renderWithTheme(
        <Card
          title="Clickable Card"
          clickable
          onClick={() => {}}
          ariaLabel="Click to view details"
        >
          Card content
        </Card>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("should have no violations with actions", async () => {
      const { container } = renderWithTheme(
        <Card
          title="Card with Actions"
          actions={<Button>Action</Button>}
        >
          Card content
        </Card>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe("Badge", () => {
    it("should have no accessibility violations", async () => {
      const { container } = renderWithTheme(
        <Badge content={5}>
          <Button>Messages</Button>
        </Badge>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("should have no violations as dot variant", async () => {
      const { container } = renderWithTheme(
        <Badge variant="dot">
          <Button>Notifications</Button>
        </Badge>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("should have no violations standalone", async () => {
      const { container } = renderWithTheme(
        <Badge content={10} standalone ariaLabel="10 new notifications" />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe("Tooltip", () => {
    it("should have no accessibility violations", async () => {
      const { container } = renderWithTheme(
        <Tooltip title="Helpful tip" open>
          <Button>Hover me</Button>
        </Tooltip>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe("Modal", () => {
    it("should have no accessibility violations when open", async () => {
      const { container } = renderWithTheme(
        <Modal
          open={true}
          onClose={() => {}}
          title="Modal Title"
          ariaDescription="This is a modal dialog"
        >
          Modal content
        </Modal>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("should have no violations with actions", async () => {
      const { container } = renderWithTheme(
        <Modal
          open={true}
          onClose={() => {}}
          title="Confirm Action"
          actions={
            <>
              <Button variant="ghost">Cancel</Button>
              <Button variant="primary">Confirm</Button>
            </>
          }
        >
          Are you sure?
        </Modal>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
