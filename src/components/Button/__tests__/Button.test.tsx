import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "@mui/material/styles";
import { Button } from "../Button";
import { lightTheme } from "../../../theme";

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={lightTheme}>{component}</ThemeProvider>);
};

describe("Button Component", () => {
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

    it("renders children correctly", () => {
      renderWithTheme(
        <Button>
          <span data-testid="child-element">Child Content</span>
        </Button>
      );
      expect(screen.getByTestId("child-element")).toBeInTheDocument();
    });
  });

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

    it("renders danger variant", () => {
      renderWithTheme(<Button variant="danger">Danger</Button>);
      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
    });
  });

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

    it("is disabled when loading", () => {
      renderWithTheme(<Button loading>Loading</Button>);
      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
    });

    it("renders fullWidth", () => {
      renderWithTheme(<Button fullWidth>Full Width</Button>);
      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
    });
  });

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

    it("hides start icon when loading", () => {
      renderWithTheme(
        <Button loading startIcon={<TestIcon />}>
          Loading
        </Button>
      );
      expect(screen.queryByTestId("test-icon")).not.toBeInTheDocument();
    });

    it("hides end icon when loading", () => {
      renderWithTheme(
        <Button loading endIcon={<TestIcon />}>
          Loading
        </Button>
      );
      expect(screen.queryByTestId("test-icon")).not.toBeInTheDocument();
    });

    it("hides both icons when loading", () => {
      renderWithTheme(
        <Button loading startIcon={<TestIcon />} endIcon={<TestIcon />}>
          Loading
        </Button>
      );
      expect(screen.queryByTestId("test-icon")).not.toBeInTheDocument();
    });
  });

  describe("Interactions", () => {
    it("calls onClick when clicked", async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();
      renderWithTheme(<Button onClick={handleClick}>Click me</Button>);

      await user.click(screen.getByRole("button"));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("does not call onClick when disabled", async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();
      renderWithTheme(
        <Button disabled onClick={handleClick}>
          Disabled
        </Button>
      );

      await user.click(screen.getByRole("button"));
      expect(handleClick).not.toHaveBeenCalled();
    });

    it("does not call onClick when loading", async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();
      renderWithTheme(
        <Button loading onClick={handleClick}>
          Loading
        </Button>
      );

      await user.click(screen.getByRole("button"));
      expect(handleClick).not.toHaveBeenCalled();
    });

    it("receives click event with correct target", async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();
      renderWithTheme(
        <Button onClick={handleClick} data-testid="click-button">
          Click
        </Button>
      );

      await user.click(screen.getByTestId("click-button"));
      expect(handleClick).toHaveBeenCalled();
    });
  });

  describe("Button Types", () => {
    it("renders button type by default", () => {
      renderWithTheme(<Button>Default</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("type", "button");
    });

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
  });

  describe("Accessibility", () => {
    it("has proper role", () => {
      renderWithTheme(<Button>Accessible Button</Button>);
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("has proper type attribute", () => {
      renderWithTheme(<Button>Accessible Button</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("type", "button");
    });

    it("supports keyboard navigation", async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();
      renderWithTheme(<Button onClick={handleClick}>Keyboard</Button>);
      const button = screen.getByRole("button");

      button.focus();
      expect(button).toHaveFocus();

      await user.keyboard("{Enter}");
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("is focusable when enabled", () => {
      renderWithTheme(<Button>Focusable</Button>);
      const button = screen.getByRole("button");
      button.focus();
      expect(button).toHaveFocus();
    });

    it("accepts aria-label", () => {
      renderWithTheme(<Button aria-label="Custom label">Icon Only</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-label", "Custom label");
    });

    it("accepts aria-describedby", () => {
      renderWithTheme(
        <>
          <Button aria-describedby="description">Action</Button>
          <span id="description">Description text</span>
        </>
      );
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-describedby", "description");
    });
  });

  describe("Custom Props", () => {
    it("accepts custom className", () => {
      renderWithTheme(
        <Button className="custom-button">Custom class button</Button>
      );
      expect(document.querySelector(".custom-button")).toBeInTheDocument();
    });

    it("accepts custom data-testid", () => {
      renderWithTheme(
        <Button data-testid="custom-button">Custom testid button</Button>
      );
      expect(screen.getByTestId("custom-button")).toBeInTheDocument();
    });

    it("passes through additional props", () => {
      renderWithTheme(<Button data-custom="custom-value">Custom prop</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("data-custom", "custom-value");
    });
  });

  describe("Loading States by Variant", () => {
    it("shows loader in primary variant", () => {
      renderWithTheme(
        <Button variant="primary" loading>
          Loading
        </Button>
      );
      expect(screen.getByRole("progressbar")).toBeInTheDocument();
    });

    it("shows loader in secondary variant", () => {
      renderWithTheme(
        <Button variant="secondary" loading>
          Loading
        </Button>
      );
      expect(screen.getByRole("progressbar")).toBeInTheDocument();
    });

    it("shows loader in outline variant", () => {
      renderWithTheme(
        <Button variant="outline" loading>
          Loading
        </Button>
      );
      expect(screen.getByRole("progressbar")).toBeInTheDocument();
    });

    it("shows loader in ghost variant", () => {
      renderWithTheme(
        <Button variant="ghost" loading>
          Loading
        </Button>
      );
      expect(screen.getByRole("progressbar")).toBeInTheDocument();
    });

    it("shows loader in danger variant", () => {
      renderWithTheme(
        <Button variant="danger" loading>
          Loading
        </Button>
      );
      expect(screen.getByRole("progressbar")).toBeInTheDocument();
    });
  });

  describe("Snapshots", () => {
    it("matches snapshot for basic button", () => {
      const { container } = renderWithTheme(<Button>Basic button</Button>);
      expect(container.firstChild).toMatchSnapshot();
    });

    it("matches snapshot for all variants", () => {
      const variants = [
        "primary",
        "secondary",
        "outline",
        "ghost",
        "danger",
      ] as const;

      variants.forEach((variant) => {
        const { container } = renderWithTheme(
          <Button variant={variant}>{variant} Button</Button>
        );
        expect(container.firstChild).toMatchSnapshot(`button-${variant}`);
      });
    });

    it("matches snapshot for all sizes", () => {
      const sizes = ["small", "medium", "large"] as const;

      sizes.forEach((size) => {
        const { container } = renderWithTheme(
          <Button size={size}>{size} Button</Button>
        );
        expect(container.firstChild).toMatchSnapshot(`button-${size}`);
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

    it("matches snapshot with icons", () => {
      const TestIcon = () => <span>→</span>;
      const { container } = renderWithTheme(
        <Button startIcon={<TestIcon />} endIcon={<TestIcon />}>
          With Icons
        </Button>
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it("matches snapshot for fullWidth", () => {
      const { container } = renderWithTheme(
        <Button fullWidth>Full Width Button</Button>
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
