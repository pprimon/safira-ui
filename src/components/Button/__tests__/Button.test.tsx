import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import { Button } from "../Button";
import { lightTheme } from "../../../theme";

// Wrapper com tema para os testes
const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={lightTheme}>{component}</ThemeProvider>);
};

describe("Button Component", () => {
  // Testes básicos de renderização
  describe("Rendering", () => {
    it("renders button with text", () => {
      renderWithTheme(<Button>Click me</Button>);
      expect(
        screen.getByRole("button", { name: /click me/i })
      ).toBeInTheDocument();
    });

    it("renders with custom data-testid", () => {
      renderWithTheme(<Button data-testid="custom-button">Test</Button>);
      expect(screen.getByTestId("custom-button")).toBeInTheDocument();
    });

    it("renders with custom className", () => {
      renderWithTheme(<Button className="custom-class">Test</Button>);
      expect(screen.getByRole("button")).toHaveClass("custom-class");
    });
  });

  // Testes de variantes
  describe("Variants", () => {
    it("renders primary variant by default", () => {
      renderWithTheme(<Button>Primary</Button>);
      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
    });

    it("renders secondary variant", () => {
      renderWithTheme(<Button variant="secondary">Secondary</Button>);
      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
    });

    it("renders outline variant", () => {
      renderWithTheme(<Button variant="outline">Outline</Button>);
      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
    });

    it("renders ghost variant", () => {
      renderWithTheme(<Button variant="ghost">Ghost</Button>);
      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
    });
  });

  // Testes de tamanhos
  describe("Sizes", () => {
    it("renders small size", () => {
      renderWithTheme(<Button size="small">Small</Button>);
      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
    });

    it("renders medium size by default", () => {
      renderWithTheme(<Button>Medium</Button>);
      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
    });

    it("renders large size", () => {
      renderWithTheme(<Button size="large">Large</Button>);
      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
    });
  });

  // Testes de estados
  describe("States", () => {
    it("renders disabled state", () => {
      renderWithTheme(<Button disabled>Disabled</Button>);
      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
    });

    it("renders loading state", () => {
      renderWithTheme(<Button loading>Loading</Button>);
      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
      expect(screen.getByRole("progressbar")).toBeInTheDocument();
    });

    it("renders fullWidth", () => {
      renderWithTheme(<Button fullWidth>Full Width</Button>);
      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
    });
  });

  // Testes de ícones
  describe("Icons", () => {
    const TestIcon = () => <span data-testid="test-icon">Icon</span>;

    it("renders with start icon", () => {
      renderWithTheme(
        <Button startIcon={<TestIcon />}>With Start Icon</Button>
      );
      expect(screen.getByTestId("test-icon")).toBeInTheDocument();
    });

    it("renders with end icon", () => {
      renderWithTheme(<Button endIcon={<TestIcon />}>With End Icon</Button>);
      expect(screen.getByTestId("test-icon")).toBeInTheDocument();
    });

    it("hides icons when loading", () => {
      renderWithTheme(
        <Button loading startIcon={<TestIcon />} endIcon={<TestIcon />}>
          Loading
        </Button>
      );
      expect(screen.queryByTestId("test-icon")).not.toBeInTheDocument();
    });
  });

  // Testes de interação
  describe("Interactions", () => {
    it("calls onClick when clicked", () => {
      const handleClick = jest.fn();
      renderWithTheme(<Button onClick={handleClick}>Click me</Button>);

      fireEvent.click(screen.getByRole("button"));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("does not call onClick when disabled", () => {
      const handleClick = jest.fn();
      renderWithTheme(
        <Button disabled onClick={handleClick}>
          Disabled
        </Button>
      );

      fireEvent.click(screen.getByRole("button"));
      expect(handleClick).not.toHaveBeenCalled();
    });

    it("does not call onClick when loading", () => {
      const handleClick = jest.fn();
      renderWithTheme(
        <Button loading onClick={handleClick}>
          Loading
        </Button>
      );

      fireEvent.click(screen.getByRole("button"));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  // Testes de tipos de botão
  describe("Button Types", () => {
    it("renders submit type", () => {
      renderWithTheme(<Button type="submit">Submit</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("type", "submit");
    });

    it("renders reset type", () => {
      renderWithTheme(<Button type="reset">Reset</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("type", "reset");
    });

    it("renders button type by default", () => {
      renderWithTheme(<Button>Default</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("type", "button");
    });
  });

  // Testes de acessibilidade
  describe("Accessibility", () => {
    it("has proper ARIA attributes", () => {
      renderWithTheme(<Button>Accessible Button</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("type", "button");
    });

    it("supports keyboard navigation", () => {
      const handleClick = jest.fn();
      renderWithTheme(<Button onClick={handleClick}>Keyboard</Button>);
      const button = screen.getByRole("button");

      button.focus();
      expect(button).toHaveFocus();

      fireEvent.keyDown(button, { key: "Enter" });
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  // Snapshot tests
  describe("Snapshots", () => {
    it("matches snapshot for primary variant", () => {
      const { container } = renderWithTheme(<Button>Primary Button</Button>);
      expect(container.firstChild).toMatchSnapshot();
    });

    it("matches snapshot for all variants", () => {
      const variants = ["primary", "secondary", "outline", "ghost"] as const;

      variants.forEach((variant) => {
        const { container } = renderWithTheme(
          <Button variant={variant}>{variant} Button</Button>
        );
        expect(container.firstChild).toMatchSnapshot(`button-${variant}`);
      });
    });

    it("matches snapshot for loading state", () => {
      const { container } = renderWithTheme(<Button loading>Loading</Button>);
      expect(container.firstChild).toMatchSnapshot();
    });

    it("matches snapshot for disabled state", () => {
      const { container } = renderWithTheme(<Button disabled>Disabled</Button>);
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});

