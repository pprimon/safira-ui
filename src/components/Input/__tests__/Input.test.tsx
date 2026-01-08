import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "@mui/material/styles";
import { Input } from "../Input";
import { lightTheme } from "../../../theme";

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={lightTheme}>{component}</ThemeProvider>);
};

describe("Input Component", () => {
  describe("Rendering", () => {
    it("renders input field", () => {
      renderWithTheme(<Input />);
      expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

    it("renders with label", () => {
      renderWithTheme(<Input label="Test Label" />);
      expect(screen.getByLabelText("Test Label")).toBeInTheDocument();
    });

    it("renders with placeholder", () => {
      renderWithTheme(<Input placeholder="Enter text" />);
      expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument();
    });

    it("renders with helper text", () => {
      renderWithTheme(<Input helperText="Helper text" />);
      expect(screen.getByText("Helper text")).toBeInTheDocument();
    });

    it("renders with custom data-testid", () => {
      renderWithTheme(<Input data-testid="custom-input" />);
      expect(screen.getByTestId("custom-input")).toBeInTheDocument();
    });
  });

  describe("Input Types", () => {
    it("renders text input by default", () => {
      renderWithTheme(<Input />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("type", "text");
    });

    it("renders email input", () => {
      renderWithTheme(<Input type="email" />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("type", "email");
    });

    it("renders password input", () => {
      renderWithTheme(<Input type="password" />);
      const input = screen.getByLabelText("", {
        selector: 'input[type="password"]',
      });
      expect(input).toBeInTheDocument();
    });

    it("renders number input", () => {
      renderWithTheme(<Input type="number" />);
      const input = screen.getByRole("spinbutton");
      expect(input).toHaveAttribute("type", "number");
    });
  });

  describe("Sizes", () => {
    it("renders small size", () => {
      renderWithTheme(<Input size="small" data-testid="small-input" />);
      expect(screen.getByTestId("small-input")).toBeInTheDocument();
    });

    it("renders medium size by default", () => {
      renderWithTheme(<Input data-testid="medium-input" />);
      expect(screen.getByTestId("medium-input")).toBeInTheDocument();
    });

    it("renders large size", () => {
      renderWithTheme(<Input size="large" data-testid="large-input" />);
      expect(screen.getByTestId("large-input")).toBeInTheDocument();
    });
  });

  describe("States", () => {
    it("renders disabled state", () => {
      renderWithTheme(<Input disabled />);
      const input = screen.getByRole("textbox");
      expect(input).toBeDisabled();
    });

    it("renders required state", () => {
      renderWithTheme(<Input required />);
      const input = screen.getByRole("textbox");
      expect(input).toBeRequired();
    });

    it("renders error state", () => {
      renderWithTheme(<Input error helperText="Error message" />);
      expect(screen.getByText("Error message")).toBeInTheDocument();
    });

    it("renders fullWidth", () => {
      renderWithTheme(<Input fullWidth />);
      const input = screen.getByRole("textbox");
      expect(input).toBeInTheDocument();
    });
  });

  describe("Icons", () => {
    const TestIcon = () => <span data-testid="test-icon">Icon</span>;

    it("renders with start icon", () => {
      renderWithTheme(<Input startIcon={<TestIcon />} />);
      expect(screen.getByTestId("test-icon")).toBeInTheDocument();
    });

    it("renders with end icon", () => {
      renderWithTheme(<Input endIcon={<TestIcon />} />);
      expect(screen.getByTestId("test-icon")).toBeInTheDocument();
    });
  });

  describe("Interactions", () => {
    it("calls onChange when value changes", async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();

      renderWithTheme(<Input onChange={handleChange} />);
      const input = screen.getByRole("textbox");

      await user.type(input, "test");
      expect(handleChange).toHaveBeenCalled();
    });

    it("calls onFocus when input gains focus", async () => {
      const user = userEvent.setup();
      const handleFocus = jest.fn();

      renderWithTheme(<Input onFocus={handleFocus} />);
      const input = screen.getByRole("textbox");

      await user.click(input);
      expect(handleFocus).toHaveBeenCalledTimes(1);
    });

    it("calls onBlur when input loses focus", async () => {
      const user = userEvent.setup();
      const handleBlur = jest.fn();

      renderWithTheme(<Input onBlur={handleBlur} />);
      const input = screen.getByRole("textbox");

      await user.click(input);
      await user.tab();
      expect(handleBlur).toHaveBeenCalledTimes(1);
    });

    it("respects maxLength attribute", () => {
      renderWithTheme(<Input maxLength={10} />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("maxlength", "10");
    });
  });

  describe("Controlled vs Uncontrolled", () => {
    it("works as controlled component", async () => {
      const user = userEvent.setup();
      const TestComponent = () => {
        const [value, setValue] = React.useState("");
        return (
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            data-testid="controlled-input"
          />
        );
      };

      renderWithTheme(<TestComponent />);
      const input = screen.getByTestId("controlled-input");

      await user.type(input, "controlled");
      expect(input).toHaveValue("controlled");
    });

    it("works as uncontrolled component", async () => {
      const user = userEvent.setup();

      renderWithTheme(<Input data-testid="uncontrolled-input" />);
      const input = screen.getByTestId("uncontrolled-input");

      await user.type(input, "uncontrolled");
      expect(input).toHaveValue("uncontrolled");
    });
  });

  describe("Accessibility", () => {
    it("associates label with input", () => {
      renderWithTheme(<Input label="Accessible Input" />);
      const input = screen.getByLabelText("Accessible Input");
      expect(input).toBeInTheDocument();
    });

    it("associates helper text with input", () => {
      renderWithTheme(
        <Input
          label="Input with help"
          helperText="This is helper text"
          data-testid="input-with-help"
        />
      );
      const input = screen.getByTestId("input-with-help");
      const helperText = screen.getByText("This is helper text");

      expect(input).toHaveAttribute("aria-describedby");
      expect(helperText).toBeInTheDocument();
    });

    it("has proper ARIA attributes for error state", () => {
      renderWithTheme(
        <Input error helperText="Error message" data-testid="error-input" />
      );
      const input = screen.getByTestId("error-input");
      expect(input).toHaveAttribute("aria-invalid", "true");
    });
  });

  describe("Snapshots", () => {
    it("matches snapshot for default input", () => {
      const { container } = renderWithTheme(<Input />);
      expect(container.firstChild).toMatchSnapshot();
    });

    it("matches snapshot with label and helper text", () => {
      const { container } = renderWithTheme(
        <Input
          label="Test Label"
          helperText="Helper text"
          placeholder="Enter text"
        />
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it("matches snapshot for error state", () => {
      const { container } = renderWithTheme(
        <Input error label="Error Input" helperText="This field has an error" />
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it("matches snapshot for different sizes", () => {
      const sizes = ["small", "medium", "large"] as const;

      sizes.forEach((size) => {
        const { container } = renderWithTheme(
          <Input size={size} label={`${size} input`} />
        );
        expect(container.firstChild).toMatchSnapshot(`input-${size}`);
      });
    });
  });
});




