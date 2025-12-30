import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "@mui/material/styles";
import { Select } from "../Select";
import { lightTheme } from "../../../theme";

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={lightTheme}>{component}</ThemeProvider>);
};

const mockOptions = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3", disabled: true },
];

describe("Select Component", () => {
  describe("Rendering", () => {
    it("renders select field", () => {
      renderWithTheme(<Select options={mockOptions} />);
      expect(screen.getByRole("combobox")).toBeInTheDocument();
    });

    it("renders with label", () => {
      renderWithTheme(<Select label="Test Label" options={mockOptions} />);
      expect(screen.getByLabelText("Test Label")).toBeInTheDocument();
    });

    it("renders with placeholder", () => {
      renderWithTheme(
        <Select placeholder="Choose option" options={mockOptions} />
      );
      // O placeholder aparece como uma opção desabilitada
      fireEvent.mouseDown(screen.getByRole("combobox"));
      expect(screen.getByText("Choose option")).toBeInTheDocument();
    });

    it("renders with helper text", () => {
      renderWithTheme(
        <Select helperText="Helper text" options={mockOptions} />
      );
      expect(screen.getByText("Helper text")).toBeInTheDocument();
    });

    it("renders options correctly", () => {
      renderWithTheme(<Select options={mockOptions} />);

      fireEvent.mouseDown(screen.getByRole("combobox"));

      expect(screen.getByText("Option 1")).toBeInTheDocument();
      expect(screen.getByText("Option 2")).toBeInTheDocument();
      expect(screen.getByText("Option 3")).toBeInTheDocument();
    });
  });

  describe("Sizes", () => {
    it("renders small size", () => {
      renderWithTheme(
        <Select size="small" options={mockOptions} data-testid="small-select" />
      );
      expect(screen.getByTestId("small-select")).toBeInTheDocument();
    });

    it("renders medium size by default", () => {
      renderWithTheme(
        <Select options={mockOptions} data-testid="medium-select" />
      );
      expect(screen.getByTestId("medium-select")).toBeInTheDocument();
    });

    it("renders large size", () => {
      renderWithTheme(
        <Select size="large" options={mockOptions} data-testid="large-select" />
      );
      expect(screen.getByTestId("large-select")).toBeInTheDocument();
    });
  });

  describe("States", () => {
    it("renders disabled state", () => {
      renderWithTheme(<Select disabled options={mockOptions} />);
      const select = screen.getByRole("combobox");
      expect(select).toHaveAttribute("aria-disabled", "true");
    });

    it("renders required state", () => {
      renderWithTheme(<Select required options={mockOptions} />);
      const select = screen.getByRole("combobox");
      expect(select).toHaveAttribute("aria-required", "true");
    });

    it("renders error state", () => {
      renderWithTheme(
        <Select error helperText="Error message" options={mockOptions} />
      );
      expect(screen.getByText("Error message")).toBeInTheDocument();
    });

    it("renders fullWidth", () => {
      renderWithTheme(<Select fullWidth options={mockOptions} />);
      const select = screen.getByRole("combobox");
      expect(select).toBeInTheDocument();
    });
  });

  describe("Single Selection", () => {
    it("selects an option", async () => {
      const user = userEvent.setup();

      renderWithTheme(<Select options={mockOptions} />);
      const select = screen.getByRole("combobox");

      await user.click(select);
      await user.click(screen.getByText("Option 1"));

      expect(select).toHaveTextContent("Option 1");
    });

    it("calls onChange when option is selected", async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();

      renderWithTheme(<Select options={mockOptions} onChange={handleChange} />);

      await user.click(screen.getByRole("combobox"));
      await user.click(screen.getByText("Option 1"));

      expect(handleChange).toHaveBeenCalledWith("option1");
    });

    it("does not select disabled options", async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();

      renderWithTheme(<Select options={mockOptions} onChange={handleChange} />);

      await user.click(screen.getByRole("combobox"));

      const disabledOption = screen.getByText("Option 3");
      expect(disabledOption.closest("li")).toHaveAttribute(
        "aria-disabled",
        "true"
      );
    });
  });

  describe("Multiple Selection", () => {
    it("allows multiple selections", async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();

      renderWithTheme(
        <Select multiple options={mockOptions} onChange={handleChange} />
      );

      const select = screen.getByRole("combobox");
      await user.click(select);
      await user.click(screen.getByText("Option 1"));

      // O menu deve permanecer aberto para múltipla seleção
      expect(screen.getByText("Option 2")).toBeInTheDocument();
    });
  });

  describe("Controlled vs Uncontrolled", () => {
    it("works as controlled component", async () => {
      const user = userEvent.setup();

      const TestComponent = () => {
        const [value, setValue] = React.useState("");
        return (
          <Select value={value} onChange={setValue} options={mockOptions} />
        );
      };

      renderWithTheme(<TestComponent />);
      const select = screen.getByRole("combobox");

      await user.click(select);
      await user.click(screen.getByText("Option 2"));

      expect(select).toHaveTextContent("Option 2");
    });

    it("works as uncontrolled component", async () => {
      const user = userEvent.setup();

      renderWithTheme(<Select options={mockOptions} />);
      const select = screen.getByRole("combobox");

      await user.click(select);
      await user.click(screen.getByText("Option 1"));

      expect(select).toHaveTextContent("Option 1");
    });
  });

  describe("Keyboard Navigation", () => {
    it("opens menu with Enter key", async () => {
      const user = userEvent.setup();

      renderWithTheme(<Select options={mockOptions} />);
      const select = screen.getByRole("combobox");

      select.focus();
      await user.keyboard("{Enter}");

      expect(screen.getByText("Option 1")).toBeInTheDocument();
    });

    it("opens menu with Space key", async () => {
      const user = userEvent.setup();

      renderWithTheme(<Select options={mockOptions} />);
      const select = screen.getByRole("combobox");

      select.focus();
      await user.keyboard(" ");

      expect(screen.getByText("Option 1")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("associates label with select", () => {
      renderWithTheme(
        <Select label="Accessible Select" options={mockOptions} />
      );
      const select = screen.getByLabelText("Accessible Select");
      expect(select).toBeInTheDocument();
    });

    it("has proper ARIA attributes", () => {
      renderWithTheme(<Select options={mockOptions} />);
      const select = screen.getByRole("combobox");

      expect(select).toHaveAttribute("aria-haspopup", "listbox");
      expect(select).toHaveAttribute("aria-expanded", "false");
    });

    it("updates aria-expanded when opened", async () => {
      const user = userEvent.setup();

      renderWithTheme(<Select options={mockOptions} />);
      const select = screen.getByRole("combobox");

      await user.click(select);
      expect(select).toHaveAttribute("aria-expanded", "true");
    });
  });

  describe("Snapshots", () => {
    it("matches snapshot for default select", () => {
      const { container } = renderWithTheme(<Select options={mockOptions} />);
      expect(container.firstChild).toMatchSnapshot();
    });

    it("matches snapshot with label and helper text", () => {
      const { container } = renderWithTheme(
        <Select
          label="Test Label"
          helperText="Helper text"
          options={mockOptions}
        />
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it("matches snapshot for error state", () => {
      const { container } = renderWithTheme(
        <Select
          error
          label="Error Select"
          helperText="This field has an error"
          options={mockOptions}
        />
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it("matches snapshot for different sizes", () => {
      const sizes = ["small", "medium", "large"] as const;

      sizes.forEach((size) => {
        const { container } = renderWithTheme(
          <Select size={size} label={`${size} select`} options={mockOptions} />
        );
        expect(container.firstChild).toMatchSnapshot(`select-${size}`);
      });
    });
  });
});

