import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "@mui/material/styles";
import { Tooltip } from "../Tooltip";
import { lightTheme } from "../../../theme";

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={lightTheme}>{component}</ThemeProvider>);
};

describe("Tooltip Component", () => {
  describe("Rendering", () => {
    it("renders children element", () => {
      renderWithTheme(
        <Tooltip title="Test tooltip">
          <button>Hover me</button>
        </Tooltip>
      );
      expect(
        screen.getByRole("button", { name: /hover me/i })
      ).toBeInTheDocument();
    });

    it("shows tooltip on hover", async () => {
      const user = userEvent.setup();

      renderWithTheme(
        <Tooltip title="Test tooltip">
          <button>Hover me</button>
        </Tooltip>
      );

      const button = screen.getByRole("button");
      await user.hover(button);

      await waitFor(() => {
        expect(screen.getByRole("tooltip")).toBeInTheDocument();
      });
    });

    it("hides tooltip on unhover", async () => {
      const user = userEvent.setup();

      renderWithTheme(
        <Tooltip title="Test tooltip">
          <button>Hover me</button>
        </Tooltip>
      );

      const button = screen.getByRole("button");
      await user.hover(button);

      await waitFor(() => {
        expect(screen.getByRole("tooltip")).toBeInTheDocument();
      });

      await user.unhover(button);

      await waitFor(() => {
        expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
      });
    });
  });

  describe("Variants", () => {
    it("renders default variant", async () => {
      const user = userEvent.setup();

      renderWithTheme(
        <Tooltip title="Default tooltip">
          <button>Hover me</button>
        </Tooltip>
      );

      await user.hover(screen.getByRole("button"));

      await waitFor(() => {
        expect(screen.getByRole("tooltip")).toBeInTheDocument();
      });
    });

    it("renders light variant", async () => {
      const user = userEvent.setup();

      renderWithTheme(
        <Tooltip title="Light tooltip" variant="light">
          <button>Hover me</button>
        </Tooltip>
      );

      await user.hover(screen.getByRole("button"));

      await waitFor(() => {
        expect(screen.getByRole("tooltip")).toBeInTheDocument();
      });
    });

    it("renders error variant", async () => {
      const user = userEvent.setup();

      renderWithTheme(
        <Tooltip title="Error tooltip" variant="error">
          <button>Hover me</button>
        </Tooltip>
      );

      await user.hover(screen.getByRole("button"));

      await waitFor(() => {
        expect(screen.getByRole("tooltip")).toBeInTheDocument();
      });
    });
  });

  describe("Placement", () => {
    it("renders with top placement by default", async () => {
      const user = userEvent.setup();

      renderWithTheme(
        <Tooltip title="Top tooltip">
          <button>Hover me</button>
        </Tooltip>
      );

      await user.hover(screen.getByRole("button"));

      await waitFor(() => {
        expect(screen.getByRole("tooltip")).toBeInTheDocument();
      });
    });

    it("renders with bottom placement", async () => {
      const user = userEvent.setup();

      renderWithTheme(
        <Tooltip title="Bottom tooltip" placement="bottom">
          <button>Hover me</button>
        </Tooltip>
      );

      await user.hover(screen.getByRole("button"));

      await waitFor(() => {
        expect(screen.getByRole("tooltip")).toBeInTheDocument();
      });
    });
  });

  describe("Controlled State", () => {
    it("shows tooltip when open prop is true", () => {
      renderWithTheme(
        <Tooltip title="Always visible" open>
          <button>Button</button>
        </Tooltip>
      );

      expect(screen.getByRole("tooltip")).toBeInTheDocument();
    });

    it("hides tooltip when open prop is false", () => {
      renderWithTheme(
        <Tooltip title="Never visible" open={false}>
          <button>Button</button>
        </Tooltip>
      );

      expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    });
  });

  describe("Delays", () => {
    it("respects enterDelay", async () => {
      const user = userEvent.setup();

      renderWithTheme(
        <Tooltip title="Delayed tooltip" enterDelay={1000}>
          <button>Hover me</button>
        </Tooltip>
      );

      await user.hover(screen.getByRole("button"));

      // Tooltip não deve aparecer imediatamente
      expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();

      // Aguarda o delay
      await waitFor(
        () => {
          expect(screen.getByRole("tooltip")).toBeInTheDocument();
        },
        { timeout: 1500 }
      );
    });
  });

  describe("Accessibility", () => {
    it("has proper ARIA attributes", async () => {
      const user = userEvent.setup();

      renderWithTheme(
        <Tooltip title="Accessible tooltip">
          <button>Accessible button</button>
        </Tooltip>
      );

      const button = screen.getByRole("button");
      await user.hover(button);

      await waitFor(() => {
        const tooltip = screen.getByRole("tooltip");
        expect(tooltip).toBeInTheDocument();
        expect(button).toHaveAttribute("aria-describedby");
      });
    });
  });

  describe("Snapshots", () => {
    it("matches snapshot for default tooltip", () => {
      const { container } = renderWithTheme(
        <Tooltip title="Default tooltip">
          <button>Hover me</button>
        </Tooltip>
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it("matches snapshot for different variants", () => {
      const variants = [
        "default",
        "light",
        "error",
        "warning",
        "success",
        "info",
      ] as const;

      variants.forEach((variant) => {
        const { container } = renderWithTheme(
          <Tooltip title={`${variant} tooltip`} variant={variant}>
            <button>{variant} button</button>
          </Tooltip>
        );
        expect(container.firstChild).toMatchSnapshot(`tooltip-${variant}`);
      });
    });
  });
});

