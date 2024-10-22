import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import AddBrokerForm from "./AddBrokerForm";
import userEvent from "@testing-library/user-event";
import React from "react";

vi.mock("../../hooks/useBroker", () => ({
  useMutateBroker: () => ({
    mutation: {
      mutate: vi.fn(),
    },
  }),
}));

describe("AddBrokerForm", () => {
  const handleClose = vi.fn();

  it("renders correctly", () => {
    render(<AddBrokerForm open={true} handleClose={handleClose} />);

    expect(screen.getByText("Add manually")).toBeTruthy();
    expect(screen.getByText("Name")).toBeTruthy();
    expect(screen.getByText("Address")).toBeTruthy();
    expect(screen.getByText("City")).toBeTruthy();
    expect(screen.getByText("Country")).toBeTruthy();
    expect(screen.getByRole("button", { name: "Save" })).toBeTruthy();
  });

  it("calls handleClose when cancel button is clicked", async () => {
    const user = userEvent.setup();
    render(<AddBrokerForm open={true} handleClose={handleClose} />);

    await user.click(screen.getByRole("button", { name: "Cancel" }));

    expect(handleClose).toHaveBeenCalled();
  });
});
