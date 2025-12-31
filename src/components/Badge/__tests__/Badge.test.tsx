import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ThemeProvider } from "@mui/material/styles";
import { Badge } from "../Badge";
import { lightTheme } from "../../../theme";

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={lightTheme}>{component}</ThemeProvider>);
};

describe("Badge Component", () => {
  describe("Rendering with Children", () => {
    it("renders badge with children", () => {
      renderWithTheme(
        <Badge content={5}>
          <button>Button with badge</button>
        </Badge>
      );
      expect(
        screen.getByRole("button", { name: /button with badge/i })
      ).toBeInTheDocument();
    });

    it("displays badge content", () => {
      renderWithTheme(
        <Badge content={3}>
          <button>Button</button>
        </Badge>
      );
      expect(screen.getByText("3")).toBeInTheDocument();
    });

    it("displays text content", () => {
      renderWithTheme(
        <Badge content="New">
          <button>Button</button>
        </Badge>
      );
      expect(screen.getByText("New")).toBeInTheDocument();
    });
  });

  describe("Standalone Badge", () => {
    it("renders standalone badge", () => {
      renderWithTheme(<Badge content={10} standalone />);
      expect(screen.getByText("10")).toBeInTheDocument();
    });

    it("renders standalone badge with text", () => {
      renderWithTheme(<Badge content="Beta" standalone />);
      expect(screen.getByText("Beta")).toBeInTheDocument();
    });
  });

  describe("Colors", () => {
    it("renders primary color by default", () => {
      renderWithTheme(<Badge content={1} standalone />);
      expect(screen.getByText("1")).toBeInTheDocument();
    });

    it("renders secondary color", () => {
      renderWithTheme(<Badge content={2} color="secondary" standalone />);
      expect(screen.getByText("2")).toBeInTheDocument();
    });

    it("renders accent color", () => {
      renderWithTheme(<Badge content={3} color="accent" standalone />);
      expect(screen.getByText("3")).toBeInTheDocument();
    });

    it("renders error color", () => {
      renderWithTheme(<Badge content={4} color="error" standalone />);
      expect(screen.getByText("4")).toBeInTheDocument();
    });

    it("renders success color", () => {
      renderWithTheme(<Badge content={5} color="success" standalone />);
      expect(screen.getByText("5")).toBeInTheDocument();
    });

    it("renders warning color", () => {
      renderWithTheme(<Badge content={6} color="warning" standalone />);
      expect(screen.getByText("6")).toBeInTheDocument();
    });

    it("renders info color", () => {
      renderWithTheme(<Badge content={7} color="info" standalone />);
      expect(screen.getByText("7")).toBeInTheDocument();
    });
  });

  describe("Sizes", () => {
    it("renders small size", () => {
      renderWithTheme(<Badge content={1} size="small" standalone />);
      expect(screen.getByText("1")).toBeInTheDocument();
    });

    it("renders medium size by default", () => {
      renderWithTheme(<Badge content={2} standalone />);
      expect(screen.getByText("2")).toBeInTheDocument();
    });

    it("renders large size", () => {
      renderWithTheme(<Badge content={3} size="large" standalone />);
      expect(screen.getByText("3")).toBeInTheDocument();
    });
  });

  describe("Variants", () => {
    it("renders standard variant by default", () => {
      renderWithTheme(<Badge content={1} standalone />);
      expect(screen.getByText("1")).toBeInTheDocument();
    });

    it("renders dot variant", () => {
      renderWithTheme(
        <Badge variant="dot">
          <button>Button with dot</button>
        </Badge>
      );
      expect(screen.getByRole("button")).toBeInTheDocument();
      // Dot variant não mostra conteúdo textual
    });

    it("renders outlined variant", () => {
      renderWithTheme(<Badge content={5} variant="outlined" standalone />);
      expect(screen.getByText("5")).toBeInTheDocument();
    });
  });

  describe("Max Value", () => {
    it("displays max value when content exceeds max", () => {
      renderWithTheme(<Badge content={150} max={99} standalone />);
      expect(screen.getByText("99+")).toBeInTheDocument();
    });

    it("displays actual value when content is within max", () => {
      renderWithTheme(<Badge content={50} max={99} standalone />);
      expect(screen.getByText("50")).toBeInTheDocument();
    });

    it("uses default max of 99", () => {
      renderWithTheme(<Badge content={200} standalone />);
      expect(screen.getByText("99+")).toBeInTheDocument();
    });
  });

  describe("Show Zero", () => {
    it("hides badge when content is 0 by default", () => {
      renderWithTheme(
        <Badge content={0}>
          <button>Button</button>
        </Badge>
      );
      expect(screen.queryByText("0")).not.toBeInTheDocument();
    });

    it("shows badge when content is 0 and showZero is true", () => {
      renderWithTheme(
        <Badge content={0} showZero>
          <button>Button</button>
        </Badge>
      );
      expect(screen.getByText("0")).toBeInTheDocument();
    });
  });

  describe("Visibility", () => {
    it("shows badge by default", () => {
      renderWithTheme(
        <Badge content={5}>
          <button>Button</button>
        </Badge>
      );
      expect(screen.getByText("5")).toBeInTheDocument();
    });

    it("hides badge when invisible is true", () => {
      renderWithTheme(
        <Badge content={5} invisible>
          <button>Button</button>
        </Badge>
      );
      expect(screen.queryByText("5")).not.toBeInTheDocument();
    });
  });

  describe("Anchor Origin", () => {
    it("accepts custom anchor origin", () => {
      renderWithTheme(
        <Badge
          content={1}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        >
          <button>Button</button>
        </Badge>
      );
      expect(screen.getByText("1")).toBeInTheDocument();
    });
  });

  describe("Custom Props", () => {
    it("accepts custom className", () => {
      renderWithTheme(
        <Badge content={1} className="custom-badge" standalone />
      );
      expect(document.querySelector(".custom-badge")).toBeInTheDocument();
    });

    it("accepts custom data-testid", () => {
      renderWithTheme(
        <Badge content={1} data-testid="custom-badge" standalone />
      );
      expect(screen.getByTestId("custom-badge")).toBeInTheDocument();
    });
  });

  describe("Complex Scenarios", () => {
    it("works with icon buttons", () => {
      const NotificationIcon = () => (
        <span data-testid="notification-icon">🔔</span>
      );

      renderWithTheme(
        <Badge content={3} color="error">
          <button>
            <NotificationIcon />
          </button>
        </Badge>
      );

      expect(screen.getByTestId("notification-icon")).toBeInTheDocument();
      expect(screen.getByText("3")).toBeInTheDocument();
    });

    it("works with avatars", () => {
      const Avatar = () => <div data-testid="avatar">User Avatar</div>;

      renderWithTheme(
        <Badge variant="dot" color="success">
          <Avatar />
        </Badge>
      );

      expect(screen.getByTestId("avatar")).toBeInTheDocument();
    });
  });

  describe("Snapshots", () => {
    it("matches snapshot for basic badge", () => {
      const { container } = renderWithTheme(
        <Badge content={5}>
          <button>Button</button>
        </Badge>
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it("matches snapshot for standalone badge", () => {
      const { container } = renderWithTheme(<Badge content="New" standalone />);
      expect(container.firstChild).toMatchSnapshot();
    });

    it("matches snapshot for all colors", () => {
      const colors = [
        "primary",
        "secondary",
        "accent",
        "success",
        "error",
        "warning",
        "info",
      ] as const;

      colors.forEach((color) => {
        const { container } = renderWithTheme(
          <Badge content={1} color={color} standalone />
        );
        expect(container.firstChild).toMatchSnapshot(`badge-${color}`);
      });
    });

    it("matches snapshot for all variants", () => {
      const variants = ["standard", "dot", "outlined"] as const;

      variants.forEach((variant) => {
        const { container } = renderWithTheme(
          <Badge content={variant === "dot" ? undefined : 5} variant={variant}>
            <button>{variant} button</button>
          </Badge>
        );
        expect(container.firstChild).toMatchSnapshot(`badge-${variant}`);
      });
    });

    it("matches snapshot for all sizes", () => {
      const sizes = ["small", "medium", "large"] as const;

      sizes.forEach((size) => {
        const { container } = renderWithTheme(
          <Badge content={1} size={size} standalone />
        );
        expect(container.firstChild).toMatchSnapshot(`badge-${size}`);
      });
    });
  });
});
