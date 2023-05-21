import { render, screen, fireEvent } from "@testing-library/react";
import ModalCustom from "..";

describe("ModalCustom", () => {
  const onClose = jest.fn();
  const configModal = {
    open: true,
    title: "Test Title",
    message: "success",
    variant: "success",
  };

  beforeEach(() => {
    render(<ModalCustom configModal={configModal} onClose={onClose} />);
  });

  test("renders modal with correct content", () => {
    const titleElement = screen.getByText(configModal.title);
    const messageElement = screen.getByText(configModal.message);
    const closeButton = screen.getByRole("button", { name: /entendido/i });

    expect(titleElement).toBeInTheDocument();
    expect(messageElement).toBeInTheDocument();
    expect(closeButton).toBeInTheDocument();
  });

  test("calls onClose when close button is clicked", () => {
    const closeButton = screen.getByRole("button", { name: /entendido/i });
    fireEvent.click(closeButton);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test("calls onClose when modal is closed", () => {
    const modal = screen.getByTestId("modal-custom");
    fireEvent.click(modal);

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
