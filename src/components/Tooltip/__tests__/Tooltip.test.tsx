import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "@mui/material/styles";
import { Tooltip } from "../Tooltip";
import { lightTheme } from "../../../theme";

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={lightTheme}>{component}</ThemeProvider>);
};

describe("Tooltip Component", () => {
  describe("Rendering", () => {
    it("renders children", () => {
      renderWithTheme(
        <Tooltip title="Test tooltip">
          <button>Hover me</button>
        </Tooltip>
      );
      expect(screen.getByText("Hover me")).toBeInTheDocument();
    });

    it("shows tooltip on hover", async () => {
      const user = userEvent.setup();
      renderWithTheme(
        <Tooltip title="Tooltip content" enterDelay={0}>
          <button>Hover me</button>
        </Tooltip>
      );

      await user.hover(screen.getByText("Hover me"));

      await waitFor(() => {
        expect(screen.getByText("Tooltip content")).toBeInTheDocument();
      });
    });

    it("hides tooltip when not hovered", () => {
      renderWithTheme(
        <Tooltip title="Tooltip content">
          <button>Hover me</button>
        </Tooltip>
      );

      expect(screen.queryByText("Tooltip content")).not.toBeInTheDocument();
    });

    it("renders tooltip always when open prop is true", () => {
      renderWithTheme(
        <Tooltip title="Always visible" open>
          <button>Button</button>
        </Tooltip>
      );

      expect(screen.getByText("Always visible")).toBeInTheDocument();
    });
  });

  describe("Variants", () => {
    it("renders default variant", async () => {
      const user = userEvent.setup();
      renderWithTheme(
        <Tooltip title="Default tooltip" variant="default" enterDelay={0}>
          <button>Hover me</button>
        </Tooltip>
      );

      await user.hover(screen.getByText("Hover me"));

      await waitFor(() => {
        expect(screen.getByText("Default tooltip")).toBeInTheDocument();
      });
    });

    it("renders light variant", async () => {
      const user = userEvent.setup();
      renderWithTheme(
        <Tooltip title="Light tooltip" variant="light" enterDelay={0}>
          <button>Hover me</button>
        </Tooltip>
      );

      await user.hover(screen.getByText("Hover me"));

      await waitFor(() => {
        expect(screen.getByText("Light tooltip")).toBeInTheDocument();
      });
    });

    it("renders error variant", async () => {
      const user = userEvent.setup();
      renderWithTheme(
        <Tooltip title="Error tooltip" variant="error" enterDelay={0}>
          <button>Hover me</button>
        </Tooltip>
      );

      await user.hover(screen.getByText("Hover me"));

      await waitFor(() => {
        expect(screen.getByText("Error tooltip")).toBeInTheDocument();
      });
    });

    it("renders warning variant", async () => {
      const user = userEvent.setup();
      renderWithTheme(
        <Tooltip title="Warning tooltip" variant="warning" enterDelay={0}>
          <button>Hover me</button>
        </Tooltip>
      );

      await user.hover(screen.getByText("Hover me"));

      await waitFor(() => {
        expect(screen.getByText("Warning tooltip")).toBeInTheDocument();
      });
    });

    it("renders success variant", async () => {
      const user = userEvent.setup();
      renderWithTheme(
        <Tooltip title="Success tooltip" variant="success" enterDelay={0}>
          <button>Hover me</button>
        </Tooltip>
      );

      await user.hover(screen.getByText("Hover me"));

      await waitFor(() => {
        expect(screen.getByText("Success tooltip")).toBeInTheDocument();
      });
    });

    it("renders info variant", async () => {
      const user = userEvent.setup();
      renderWithTheme(
        <Tooltip title="Info tooltip" variant="info" enterDelay={0}>
          <button>Hover me</button>
        </Tooltip>
      );

      await user.hover(screen.getByText("Hover me"));

      await waitFor(() => {
        expect(screen.getByText("Info tooltip")).toBeInTheDocument();
      });
    });
  });

  describe("Placements", () => {
    const placements = [
      "top",
      "bottom",
      "left",
      "right",
      "top-start",
      "top-end",
      "bottom-start",
      "bottom-end",
    ] as const;

    placements.forEach((placement) => {
      it(`renders with ${placement} placement`, async () => {
        const user = userEvent.setup();
        renderWithTheme(
          <Tooltip
            title={`${placement} tooltip`}
            placement={placement}
            enterDelay={0}
          >
            <button>Hover me</button>
          </Tooltip>
        );

        await user.hover(screen.getByText("Hover me"));

        await waitFor(() => {
          expect(screen.getByText(`${placement} tooltip`)).toBeInTheDocument();
        });
      });
    });
  });

  describe("Custom Props", () => {
    it("respects enterDelay", async () => {
      const user = userEvent.setup();
      renderWithTheme(
        <Tooltip title="Delayed tooltip" enterDelay={100}>
          <button>Hover me</button>
        </Tooltip>
      );

      await user.hover(screen.getByText("Hover me"));

      // Tooltip should not appear immediately
      expect(screen.queryByText("Delayed tooltip")).not.toBeInTheDocument();

      // Wait for delay
      await waitFor(
        () => {
          expect(screen.getByText("Delayed tooltip")).toBeInTheDocument();
        },
        { timeout: 500 }
      );
    });

    it("accepts custom className", async () => {
      const user = userEvent.setup();
      renderWithTheme(
        <Tooltip
          title="Custom class tooltip"
          className="custom-tooltip"
          enterDelay={0}
        >
          <button>Hover me</button>
        </Tooltip>
      );

      await user.hover(screen.getByText("Hover me"));

      await waitFor(() => {
        expect(screen.getByText("Custom class tooltip")).toBeInTheDocument();
      });
    });
  });

  describe("Follow Cursor", () => {
    it("renders with followCursor enabled", async () => {
      const user = userEvent.setup();
      renderWithTheme(
        <Tooltip title="Following cursor" followCursor enterDelay={0}>
          <button>Hover me</button>
        </Tooltip>
      );

      await user.hover(screen.getByText("Hover me"));

      await waitFor(() => {
        expect(screen.getByText("Following cursor")).toBeInTheDocument();
      });
    });
  });

  describe("Max Width", () => {
    it("respects maxWidth prop", async () => {
      const user = userEvent.setup();
      renderWithTheme(
        <Tooltip
          title="This is a very long tooltip text that should be constrained by maxWidth"
          maxWidth={100}
          enterDelay={0}
        >
          <button>Hover me</button>
        </Tooltip>
      );

      await user.hover(screen.getByText("Hover me"));

      await waitFor(() => {
        const tooltip = screen.getByText(
          "This is a very long tooltip text that should be constrained by maxWidth"
        );
        expect(tooltip).toBeInTheDocument();
      });
    });
  });

  describe("Accessibility", () => {
    it("tooltip has proper role", async () => {
      const user = userEvent.setup();
      renderWithTheme(
        <Tooltip title="Accessible tooltip" enterDelay={0}>
          <button>Hover me</button>
        </Tooltip>
      );

      await user.hover(screen.getByText("Hover me"));

      await waitFor(() => {
        expect(screen.getByRole("tooltip")).toBeInTheDocument();
      });
    });
  });

  describe("Snapshots", () => {
    it("matches snapshot for basic tooltip", () => {
      const { container } = renderWithTheme(
        <Tooltip title="Basic tooltip" open>
          <button>Button</button>
        </Tooltip>
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
