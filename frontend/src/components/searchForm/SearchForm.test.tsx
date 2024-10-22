import { render, screen } from "@testing-library/react";
import SearchForm from "./SearchForm";
import { describe, it, expect, vi, Mock } from "vitest";
import { useQuery } from "@tanstack/react-query";
import React from "react";

vi.mock("@tanstack/react-query");

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (str: string) => str,
  }),
}));

describe("SearchForm", () => {
  it("renders brokers in the autocomplete", async () => {
    (useQuery as Mock).mockReturnValue({
      data: undefined,
      isError: false,
      isLoading: false,
      refetch: vi.fn(),
    });

    render(<SearchForm />);

    expect(screen.getByText("Managing broker")).toBeTruthy();
  });
});
