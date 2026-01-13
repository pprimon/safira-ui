import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "@mui/material/styles";
import { Select } from "../Select";
import { lightTheme } from "../../../theme";

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={lightTheme}>{component}</ThemeProvider>);
};

const defaultOptions = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];

describe("Select Component", () => {
  describe("Rendering", () => {
    it("renders select with label", () => {
      renderWithTheme(
        <Select label="Test Label" options={defaultOptions} />
      );
      expect(screen.getByLabelText("Test Label")).toBeInTheDocument();
    });

    it("renders with placeholder", () => {
      renderWithTheme(
        <Select
          label="Test"
          options={defaultOptions}
          placeholder="Select an option"
        />
      );
      expect(screen.getByText("Select an option")).toBeInTheDocument();
    });

    it("renders helper text", () => {
      renderWithTheme(
        <Select
          label="Test"
          options={defaultOptions}
          helperText="Helper text here"
        />
      );
      expect(screen.getByText("Helper text here")).toBeInTheDocument();
    });

    it("renders all options when opened", async () => {
      const user = userEvent.setup();
      renderWithTheme(
        <Select label="Test" options={defaultOptions} data-testid="select" />
      );

      await user.click(screen.getByRole("combobox"));

      expect(screen.getByText("Option 1")).toBeInTheDocument();
      expect(screen.getByText("Option 2")).toBeInTheDocument();
      expect(screen.getByText("Option 3")).toBeInTheDocument();
    });
  });

  describe("Selection", () => {
    it("displays selected value", () => {
      renderWithTheme(
        <Select label="Test" options={defaultOptions} value="option1" />
      );
      expect(screen.getByText("Option 1")).toBeInTheDocument();
    });

    it("calls onChange when option is selected", async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();

      renderWithTheme(
        <Select
          label="Test"
          options={defaultOptions}
          onChange={handleChange}
        />
      );

      await user.click(screen.getByRole("combobox"));
      await user.click(screen.getByText("Option 2"));

      expect(handleChange).toHaveBeenCalled();
    });

    it("supports multiple selection", async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();

      renderWithTheme(
        <Select
          label="Test"
          options={defaultOptions}
          multiple
          value={[]}
          onChange={handleChange}
        />
      );

      await user.click(screen.getByRole("combobox"));
      await user.click(screen.getByText("Option 1"));

      expect(handleChange).toHaveBeenCalled();
    });
  });

  describe("States", () => {
    it("renders disabled state", () => {
      renderWithTheme(
        <Select label="Test" options={defaultOptions} disabled />
      );
      expect(screen.getByRole("combobox")).toHaveClass("Mui-disabled");
    });

    it("renders error state", () => {
      renderWithTheme(
        <Select
          label="Test"
          options={defaultOptions}
          error
          helperText="Error message"
        />
      );
      expect(screen.getByText("Error message")).toBeInTheDocument();
    });

    it("renders required state", () => {
      renderWithTheme(
        <Select label="Test" options={defaultOptions} required />
      );
      expect(screen.getByRole("combobox")).toHaveAttribute("aria-required", "true");
    });
  });

  describe("Disabled Options", () => {
    it("renders disabled options", async () => {
      const user = userEvent.setup();
      const optionsWithDisabled = [
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2", disabled: true },
        { value: "option3", label: "Option 3" },
      ];

      renderWithTheme(
        <Select label="Test" options={optionsWithDisabled} />
      );

      await user.click(screen.getByRole("combobox"));

      const disabledOption = screen.getByText("Option 2");
      expect(disabledOption.closest("li")).toHaveClass("Mui-disabled");
    });
  });

  describe("Sizes", () => {
    it("renders small size", () => {
      renderWithTheme(
        <Select label="Test" options={defaultOptions} size="small" />
      );
      expect(document.querySelector('[data-size="small"]')).toBeInTheDocument();
    });

    it("renders medium size", () => {
      renderWithTheme(
        <Select label="Test" options={defaultOptions} size="medium" />
      );
      expect(document.querySelector('[data-size="medium"]')).toBeInTheDocument();
    });

    it("renders large size", () => {
      renderWithTheme(
        <Select label="Test" options={defaultOptions} size="large" />
      );
      expect(document.querySelector('[data-size="large"]')).toBeInTheDocument();
    });
  });

  describe("Full Width", () => {
    it("renders full width", () => {
      renderWithTheme(
        <Select label="Test" options={defaultOptions} fullWidth />
      );
      expect(document.querySelector(".MuiFormControl-fullWidth")).toBeInTheDocument();
    });
  });

  describe("Custom Props", () => {
    it("accepts custom className", () => {
      renderWithTheme(
        <Select
          label="Test"
          options={defaultOptions}
          className="custom-select"
        />
      );
      expect(document.querySelector(".custom-select")).toBeInTheDocument();
    });

    it("accepts custom data-testid", () => {
      renderWithTheme(
        <Select
          label="Test"
          options={defaultOptions}
          data-testid="custom-select"
        />
      );
      expect(screen.getByTestId("custom-select")).toBeInTheDocument();
    });
  });

  describe("Snapshots", () => {
    it("matches snapshot for basic select", () => {
      const { container } = renderWithTheme(
        <Select label="Basic Select" options={defaultOptions} />
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it("matches snapshot with value", () => {
      const { container } = renderWithTheme(
        <Select
          label="Select with Value"
          options={defaultOptions}
          value="option1"
        />
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it("matches snapshot with error", () => {
      const { container } = renderWithTheme(
        <Select
          label="Select with Error"
          options={defaultOptions}
          error
          helperText="Error message"
        />
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
