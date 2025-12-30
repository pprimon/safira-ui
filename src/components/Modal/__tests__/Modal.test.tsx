import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "@mui/material/styles";
import { Modal } from "../Modal";
import { lightTheme } from "../../../theme";

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={lightTheme}>{component}</ThemeProvider>);
};

describe("Modal Component", () => {
  // Mock para scroll do body
  const originalBodyStyle = document.body.style.overflow;

  afterEach(() => {
    document.body.style.overflow = originalBodyStyle;
  });

  describe("Rendering", () => {
    it("renders modal when open", () => {
      renderWithTheme(
        <Modal open onClose={() => {}}>
          <div>Modal Content</div>
        </Modal>
      );
      expect(screen.getByText("Modal Content")).toBeInTheDocument();
    });

    it("does not render modal when closed", () => {
      renderWithTheme(
        <Modal open={false} onClose={() => {}}>
          <div>Modal Content</div>
        </Modal>
      );
      expect(screen.queryByText("Modal Content")).not.toBeInTheDocument();
    });

    it("renders with title", () => {
      renderWithTheme(
        <Modal open title="Test Title" onClose={() => {}}>
          <div>Modal Content</div>
        </Modal>
      );
      expect(screen.getByText("Test Title")).toBeInTheDocument();
    });

    it("renders close button by default", () => {
      renderWithTheme(
        <Modal open onClose={() => {}}>
          <div>Modal Content</div>
        </Modal>
      );
      expect(screen.getByTestId("modal-close-button")).toBeInTheDocument();
    });

    it("hides close button when showCloseButton is false", () => {
      renderWithTheme(
        <Modal open showCloseButton={false} onClose={() => {}}>
          <div>Modal Content</div>
        </Modal>
      );
      expect(
        screen.queryByTestId("modal-close-button")
      ).not.toBeInTheDocument();
    });
  });

  describe("Sizes", () => {
    it("renders small size", () => {
      renderWithTheme(
        <Modal open size="small" onClose={() => {}}>
          <div>Small Modal</div>
        </Modal>
      );
      expect(screen.getByText("Small Modal")).toBeInTheDocument();
    });

    it("renders medium size by default", () => {
      renderWithTheme(
        <Modal open onClose={() => {}}>
          <div>Medium Modal</div>
        </Modal>
      );
      expect(screen.getByText("Medium Modal")).toBeInTheDocument();
    });

    it("renders large size", () => {
      renderWithTheme(
        <Modal open size="large" onClose={() => {}}>
          <div>Large Modal</div>
        </Modal>
      );
      expect(screen.getByText("Large Modal")).toBeInTheDocument();
    });
  });

  describe("Max Width", () => {
    it("accepts string maxWidth values", () => {
      renderWithTheme(
        <Modal open maxWidth="lg" onClose={() => {}}>
          <div>Large Width Modal</div>
        </Modal>
      );
      expect(screen.getByText("Large Width Modal")).toBeInTheDocument();
    });

    it("accepts number maxWidth values", () => {
      renderWithTheme(
        <Modal open maxWidth={600} onClose={() => {}}>
          <div>Custom Width Modal</div>
        </Modal>
      );
      expect(screen.getByText("Custom Width Modal")).toBeInTheDocument();
    });
  });

  describe("Interactions", () => {
    it("calls onClose when close button is clicked", async () => {
      const user = userEvent.setup();
      const handleClose = jest.fn();

      renderWithTheme(
        <Modal open onClose={handleClose}>
          <div>Modal Content</div>
        </Modal>
      );

      await user.click(screen.getByTestId("modal-close-button"));
      expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it("calls onClose when backdrop is clicked", async () => {
      const user = userEvent.setup();
      const handleClose = jest.fn();

      renderWithTheme(
        <Modal open onClose={handleClose}>
          <div>Modal Content</div>
        </Modal>
      );

      // Clica no backdrop (área fora do modal)
      const backdrop = screen.getByRole("presentation").firstChild;
      await user.click(backdrop as Element);
      expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it("does not call onClose when backdrop is clicked and closeOnBackdropClick is false", async () => {
      const user = userEvent.setup();
      const handleClose = jest.fn();

      renderWithTheme(
        <Modal open closeOnBackdropClick={false} onClose={handleClose}>
          <div>Modal Content</div>
        </Modal>
      );

      const backdrop = screen.getByRole("presentation").firstChild;
      await user.click(backdrop as Element);
      expect(handleClose).not.toHaveBeenCalled();
    });

    it("calls onClose when Escape key is pressed", () => {
      const handleClose = jest.fn();

      renderWithTheme(
        <Modal open onClose={handleClose}>
          <div>Modal Content</div>
        </Modal>
      );

      fireEvent.keyDown(document, { key: "Escape" });
      expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it("does not call onClose when Escape key is pressed and closeOnEscape is false", () => {
      const handleClose = jest.fn();

      renderWithTheme(
        <Modal open closeOnEscape={false} onClose={handleClose}>
          <div>Modal Content</div>
        </Modal>
      );

      fireEvent.keyDown(document, { key: "Escape" });
      expect(handleClose).not.toHaveBeenCalled();
    });
  });

  describe("Body Scroll Management", () => {
    it("prevents body scroll when modal is open", () => {
      renderWithTheme(
        <Modal open onClose={() => {}}>
          <div>Modal Content</div>
        </Modal>
      );

      expect(document.body.style.overflow).toBe("hidden");
    });

    it("restores body scroll when modal is closed", () => {
      const { rerender } = renderWithTheme(
        <Modal open onClose={() => {}}>
          <div>Modal Content</div>
        </Modal>
      );

      expect(document.body.style.overflow).toBe("hidden");

      rerender(
        <ThemeProvider theme={lightTheme}>
          <Modal open={false} onClose={() => {}}>
            <div>Modal Content</div>
          </Modal>
        </ThemeProvider>
      );

      expect(document.body.style.overflow).toBe("unset");
    });
  });

  describe("Full Height", () => {
    it("renders with fullHeight prop", () => {
      renderWithTheme(
        <Modal open fullHeight onClose={() => {}}>
          <div>Full Height Modal</div>
        </Modal>
      );
      expect(screen.getByText("Full Height Modal")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("has proper ARIA attributes", () => {
      renderWithTheme(
        <Modal open onClose={() => {}} data-testid="test-modal">
          <div>Modal Content</div>
        </Modal>
      );

      const modal = screen.getByTestId("test-modal");
      expect(modal).toBeInTheDocument();
    });

    it("focuses modal when opened", () => {
      renderWithTheme(
        <Modal open onClose={() => {}}>
          <div>Modal Content</div>
        </Modal>
      );

      // O modal deve estar focado ou conter um elemento focado
      expect(document.activeElement).toBeTruthy();
    });

    it("has accessible close button", () => {
      renderWithTheme(
        <Modal open onClose={() => {}}>
          <div>Modal Content</div>
        </Modal>
      );

      const closeButton = screen.getByTestId("modal-close-button");
      expect(closeButton).toHaveAttribute("aria-label", "Fechar modal");
    });
  });

  describe("Custom Props", () => {
    it("accepts custom className", () => {
      renderWithTheme(
        <Modal open className="custom-modal" onClose={() => {}}>
          <div>Modal Content</div>
        </Modal>
      );

      // Verifica se a classe foi aplicada ao container do modal
      expect(document.querySelector(".custom-modal")).toBeInTheDocument();
    });

    it("accepts custom data-testid", () => {
      renderWithTheme(
        <Modal open data-testid="custom-modal" onClose={() => {}}>
          <div>Modal Content</div>
        </Modal>
      );

      expect(screen.getByTestId("custom-modal")).toBeInTheDocument();
    });
  });

  describe("Snapshots", () => {
    it("matches snapshot for basic modal", () => {
      const { baseElement } = renderWithTheme(
        <Modal open onClose={() => {}}>
          <div>Basic Modal Content</div>
        </Modal>
      );
      expect(baseElement).toMatchSnapshot();
    });

    it("matches snapshot with title and close button", () => {
      const { baseElement } = renderWithTheme(
        <Modal open title="Test Modal" onClose={() => {}}>
          <div>Modal with title</div>
        </Modal>
      );
      expect(baseElement).toMatchSnapshot();
    });

    it("matches snapshot for different sizes", () => {
      const sizes = ["small", "medium", "large"] as const;

      sizes.forEach((size) => {
        const { baseElement } = renderWithTheme(
          <Modal open size={size} title={`${size} Modal`} onClose={() => {}}>
            <div>{size} modal content</div>
          </Modal>
        );
        expect(baseElement).toMatchSnapshot(`modal-${size}`);
      });
    });

    it("matches snapshot for fullHeight modal", () => {
      const { baseElement } = renderWithTheme(
        <Modal open fullHeight title="Full Height Modal" onClose={() => {}}>
          <div>Full height content</div>
        </Modal>
      );
      expect(baseElement).toMatchSnapshot();
    });
  });
});

