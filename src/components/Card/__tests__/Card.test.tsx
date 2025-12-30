import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "@mui/material/styles";
import { Card } from "../Card";
import { lightTheme } from "../../../theme";

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={lightTheme}>{component}</ThemeProvider>);
};

describe("Card Component", () => {
  describe("Rendering", () => {
    it("renders card with content", () => {
      renderWithTheme(
        <Card>
          <div>Card content</div>
        </Card>
      );
      expect(screen.getByText("Card content")).toBeInTheDocument();
    });

    it("renders with title", () => {
      renderWithTheme(
        <Card title="Card Title">
          <div>Card content</div>
        </Card>
      );
      expect(screen.getByText("Card Title")).toBeInTheDocument();
    });

    it("renders with subtitle", () => {
      renderWithTheme(
        <Card title="Card Title" subtitle="Card Subtitle">
          <div>Card content</div>
        </Card>
      );
      expect(screen.getByText("Card Subtitle")).toBeInTheDocument();
    });

    it("renders with avatar", () => {
      const Avatar = () => <div data-testid="card-avatar">Avatar</div>;

      renderWithTheme(
        <Card avatar={<Avatar />}>
          <div>Card content</div>
        </Card>
      );
      expect(screen.getByTestId("card-avatar")).toBeInTheDocument();
    });

    it("renders with header action", () => {
      const HeaderAction = () => (
        <button data-testid="header-action">Action</button>
      );

      renderWithTheme(
        <Card headerAction={<HeaderAction />}>
          <div>Card content</div>
        </Card>
      );
      expect(screen.getByTestId("header-action")).toBeInTheDocument();
    });

    it("renders with actions", () => {
      const Actions = () => (
        <div>
          <button data-testid="card-action">Action</button>
        </div>
      );

      renderWithTheme(
        <Card actions={<Actions />}>
          <div>Card content</div>
        </Card>
      );
      expect(screen.getByTestId("card-action")).toBeInTheDocument();
    });
  });

  describe("Variants", () => {
    it("renders elevated variant by default", () => {
      renderWithTheme(
        <Card>
          <div>Elevated card</div>
        </Card>
      );
      expect(screen.getByText("Elevated card")).toBeInTheDocument();
    });

    it("renders outlined variant", () => {
      renderWithTheme(
        <Card variant="outlined">
          <div>Outlined card</div>
        </Card>
      );
      expect(screen.getByText("Outlined card")).toBeInTheDocument();
    });

    it("renders filled variant", () => {
      renderWithTheme(
        <Card variant="filled">
          <div>Filled card</div>
        </Card>
      );
      expect(screen.getByText("Filled card")).toBeInTheDocument();
    });
  });

  describe("Header and Footer Control", () => {
    it("hides header when showHeader is false", () => {
      renderWithTheme(
        <Card title="Hidden Title" showHeader={false}>
          <div>Card content</div>
        </Card>
      );
      expect(screen.queryByText("Hidden Title")).not.toBeInTheDocument();
    });

    it("hides actions when showActions is false", () => {
      const Actions = () => <button data-testid="hidden-action">Action</button>;

      renderWithTheme(
        <Card actions={<Actions />} showActions={false}>
          <div>Card content</div>
        </Card>
      );
      expect(screen.queryByTestId("hidden-action")).not.toBeInTheDocument();
    });
  });

  describe("Clickable Cards", () => {
    it("renders as clickable when clickable prop is true", () => {
      renderWithTheme(
        <Card clickable>
          <div>Clickable card</div>
        </Card>
      );
      // Verifica se tem a classe de clickable
      expect(document.querySelector(".card-clickable")).toBeInTheDocument();
    });

    it("renders as clickable when onClick is provided", () => {
      const handleClick = jest.fn();

      renderWithTheme(
        <Card onClick={handleClick}>
          <div>Clickable card</div>
        </Card>
      );
      expect(document.querySelector(".card-clickable")).toBeInTheDocument();
    });

    it("calls onClick when card is clicked", async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();

      renderWithTheme(
        <Card onClick={handleClick}>
          <div>Clickable card</div>
        </Card>
      );

      await user.click(screen.getByText("Clickable card"));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe("Content Padding", () => {
    it("accepts custom content padding", () => {
      renderWithTheme(
        <Card contentPadding="16px">
          <div>Custom padding card</div>
        </Card>
      );
      expect(screen.getByText("Custom padding card")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("has proper structure for screen readers", () => {
      renderWithTheme(
        <Card title="Accessible Card" subtitle="Card subtitle">
          <div>Accessible content</div>
        </Card>
      );

      expect(screen.getByText("Accessible Card")).toBeInTheDocument();
      expect(screen.getByText("Card subtitle")).toBeInTheDocument();
      expect(screen.getByText("Accessible content")).toBeInTheDocument();
    });

    it("supports keyboard navigation when clickable", async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();

      renderWithTheme(
        <Card onClick={handleClick} data-testid="keyboard-card">
          <div>Keyboard accessible card</div>
        </Card>
      );

      const card = screen.getByTestId("keyboard-card");
      card.focus();

      await user.keyboard("{Enter}");
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe("Custom Props", () => {
    it("accepts custom className", () => {
      renderWithTheme(
        <Card className="custom-card">
          <div>Custom class card</div>
        </Card>
      );
      expect(document.querySelector(".custom-card")).toBeInTheDocument();
    });

    it("accepts custom data-testid", () => {
      renderWithTheme(
        <Card data-testid="custom-card">
          <div>Custom testid card</div>
        </Card>
      );
      expect(screen.getByTestId("custom-card")).toBeInTheDocument();
    });
  });

  describe("Complex Card Structure", () => {
    it("renders complete card with all elements", () => {
      const Avatar = () => <div data-testid="avatar">A</div>;
      const HeaderAction = () => <button data-testid="header-btn">Menu</button>;
      const Actions = () => (
        <div>
          <button data-testid="cancel-btn">Cancel</button>
          <button data-testid="save-btn">Save</button>
        </div>
      );

      renderWithTheme(
        <Card
          title="Complete Card"
          subtitle="With all features"
          avatar={<Avatar />}
          headerAction={<HeaderAction />}
          actions={<Actions />}
          variant="outlined"
          clickable
        >
          <div>Complete card content</div>
        </Card>
      );

      expect(screen.getByText("Complete Card")).toBeInTheDocument();
      expect(screen.getByText("With all features")).toBeInTheDocument();
      expect(screen.getByTestId("avatar")).toBeInTheDocument();
      expect(screen.getByTestId("header-btn")).toBeInTheDocument();
      expect(screen.getByText("Complete card content")).toBeInTheDocument();
      expect(screen.getByTestId("cancel-btn")).toBeInTheDocument();
      expect(screen.getByTestId("save-btn")).toBeInTheDocument();
    });
  });

  describe("Snapshots", () => {
    it("matches snapshot for basic card", () => {
      const { container } = renderWithTheme(
        <Card>
          <div>Basic card content</div>
        </Card>
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it("matches snapshot for all variants", () => {
      const variants = ["elevated", "outlined", "filled"] as const;

      variants.forEach((variant) => {
        const { container } = renderWithTheme(
          <Card variant={variant} title={`${variant} Card`}>
            <div>{variant} card content</div>
          </Card>
        );
        expect(container.firstChild).toMatchSnapshot(`card-${variant}`);
      });
    });

    it("matches snapshot for complete card", () => {
      const { container } = renderWithTheme(
        <Card
          title="Complete Card"
          subtitle="Full featured"
          avatar={<div>A</div>}
          headerAction={<button>Menu</button>}
          actions={<button>Action</button>}
          clickable
        >
          <div>Complete card content</div>
        </Card>
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});

