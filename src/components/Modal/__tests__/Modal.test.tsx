import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "@mui/material/styles";
import { Modal } from "../Modal";
import { lightTheme } from "../../../theme";

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={lightTheme}>{component}</ThemeProvider>);
};

describe("Modal Component", () => {
  const defaultProps = {
    open: true,
    onClose: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Rendering", () => {
    it("renders modal when open", () => {
      renderWithTheme(
        <Modal {...defaultProps}>
          <p>Modal content</p>
        </Modal>
      );
      expect(screen.getByText("Modal content")).toBeInTheDocument();
    });

    it("does not render modal when closed", () => {
      renderWithTheme(
        <Modal {...defaultProps} open={false}>
          <p>Modal content</p>
        </Modal>
      );
      expect(screen.queryByText("Modal content")).not.toBeInTheDocument();
    });

    it("renders with title", () => {
      renderWithTheme(
        <Modal {...defaultProps} title="Test Title">
          <p>Modal content</p>
        </Modal>
      );
      expect(screen.getByText("Test Title")).toBeInTheDocument();
    });

    it("renders title as h2 heading", () => {
      renderWithTheme(
        <Modal {...defaultProps} title="Test Title">
          <p>Modal content</p>
        </Modal>
      );
      expect(screen.getByRole("heading", { level: 2, name: "Test Title" })).toBeInTheDocument();
    });

    it("renders close button by default", () => {
      renderWithTheme(
        <Modal {...defaultProps} title="Test Title">
          <p>Modal content</p>
        </Modal>
      );
      expect(screen.getByTestId("modal-close-button")).toBeInTheDocument();
    });

    it("hides close button when showCloseButton is false", () => {
      renderWithTheme(
        <Modal {...defaultProps} title="Test Title" showCloseButton={false}>
          <p>Modal content</p>
        </Modal>
      );
      expect(screen.queryByTestId("modal-close-button")).not.toBeInTheDocument();
    });

    it("renders actions when provided", () => {
      renderWithTheme(
        <Modal
          {...defaultProps}
          actions={<button>Confirm</button>}
        >
          <p>Modal content</p>
        </Modal>
      );
      expect(screen.getByText("Confirm")).toBeInTheDocument();
    });
  });

  describe("Sizes", () => {
    it("renders small size", () => {
      renderWithTheme(
        <Modal {...defaultProps} size="small">
          <p>Small modal</p>
        </Modal>
      );
      expect(screen.getByText("Small modal")).toBeInTheDocument();
    });

    it("renders medium size", () => {
      renderWithTheme(
        <Modal {...defaultProps} size="medium">
          <p>Medium modal</p>
        </Modal>
      );
      expect(screen.getByText("Medium modal")).toBeInTheDocument();
    });

    it("renders large size", () => {
      renderWithTheme(
        <Modal {...defaultProps} size="large">
          <p>Large modal</p>
        </Modal>
      );
      expect(screen.getByText("Large modal")).toBeInTheDocument();
    });
  });

  describe("Interactions", () => {
    it("calls onClose when close button is clicked", async () => {
      const user = userEvent.setup();
      const handleClose = jest.fn();

      renderWithTheme(
        <Modal open={true} onClose={handleClose} title="Test">
          <p>Modal content</p>
        </Modal>
      );

      await user.click(screen.getByTestId("modal-close-button"));
      expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it("calls onClose when backdrop is clicked and closeOnBackdropClick is true", () => {
      const handleClose = jest.fn();

      renderWithTheme(
        <Modal open={true} onClose={handleClose} closeOnBackdropClick={true}>
          <p>Modal content</p>
        </Modal>
      );

      const backdrop = document.querySelector(".MuiBackdrop-root");
      if (backdrop) {
        fireEvent.click(backdrop);
        expect(handleClose).toHaveBeenCalled();
      }
    });

    it("does not call onClose when backdrop is clicked and closeOnBackdropClick is false", () => {
      const handleClose = jest.fn();

      renderWithTheme(
        <Modal open={true} onClose={handleClose} closeOnBackdropClick={false}>
          <p>Modal content</p>
        </Modal>
      );

      const backdrop = document.querySelector(".MuiBackdrop-root");
      if (backdrop) {
        fireEvent.click(backdrop);
        expect(handleClose).not.toHaveBeenCalled();
      }
    });
  });

  describe("Max Width", () => {
    it("renders with xs maxWidth", () => {
      renderWithTheme(
        <Modal {...defaultProps} maxWidth="xs">
          <p>XS modal</p>
        </Modal>
      );
      expect(screen.getByText("XS modal")).toBeInTheDocument();
    });

    it("renders with md maxWidth", () => {
      renderWithTheme(
        <Modal {...defaultProps} maxWidth="md">
          <p>MD modal</p>
        </Modal>
      );
      expect(screen.getByText("MD modal")).toBeInTheDocument();
    });

    it("renders with lg maxWidth", () => {
      renderWithTheme(
        <Modal {...defaultProps} maxWidth="lg">
          <p>LG modal</p>
        </Modal>
      );
      expect(screen.getByText("LG modal")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("has proper dialog role", () => {
      renderWithTheme(
        <Modal {...defaultProps}>
          <p>Modal content</p>
        </Modal>
      );
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    it("close button has proper aria-label", () => {
      renderWithTheme(
        <Modal {...defaultProps} title="Test">
          <p>Modal content</p>
        </Modal>
      );
      const closeButton = screen.getByTestId("modal-close-button");
      expect(closeButton).toHaveAttribute("aria-label", "Fechar modal");
    });

    it("supports custom close button aria-label for i18n", () => {
      renderWithTheme(
        <Modal {...defaultProps} title="Test" closeButtonAriaLabel="Close dialog">
          <p>Modal content</p>
        </Modal>
      );
      const closeButton = screen.getByTestId("modal-close-button");
      expect(closeButton).toHaveAttribute("aria-label", "Close dialog");
    });

    it("has aria-labelledby when title is provided", () => {
      renderWithTheme(
        <Modal {...defaultProps} title="Test Title">
          <p>Modal content</p>
        </Modal>
      );
      const dialog = screen.getByRole("dialog");
      expect(dialog).toHaveAttribute("aria-labelledby");
    });

    it("has aria-describedby when ariaDescription is provided", () => {
      renderWithTheme(
        <Modal {...defaultProps} title="Test" ariaDescription="This is a test modal">
          <p>Modal content</p>
        </Modal>
      );
      const dialog = screen.getByRole("dialog");
      expect(dialog).toHaveAttribute("aria-describedby");
    });
  });

  describe("Custom Props", () => {
    it("accepts custom className", () => {
      renderWithTheme(
        <Modal {...defaultProps} className="custom-modal">
          <p>Custom class modal</p>
        </Modal>
      );
      expect(document.querySelector(".custom-modal")).toBeInTheDocument();
    });

    it("accepts custom data-testid", () => {
      renderWithTheme(
        <Modal {...defaultProps} data-testid="custom-modal">
          <p>Custom testid modal</p>
        </Modal>
      );
      expect(screen.getByTestId("custom-modal")).toBeInTheDocument();
    });
  });

  describe("Snapshots", () => {
    it("matches snapshot for basic modal", () => {
      const { baseElement } = renderWithTheme(
        <Modal {...defaultProps} title="Basic Modal">
          <p>Basic modal content</p>
        </Modal>
      );
      expect(baseElement).toMatchSnapshot();
    });

    it("matches snapshot with actions", () => {
      const { baseElement } = renderWithTheme(
        <Modal
          {...defaultProps}
          title="Modal with Actions"
          actions={
            <>
              <button>Cancel</button>
              <button>Confirm</button>
            </>
          }
        >
          <p>Modal content with actions</p>
        </Modal>
      );
      expect(baseElement).toMatchSnapshot();
    });
  });
});

