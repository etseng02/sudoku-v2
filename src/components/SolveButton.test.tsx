import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import SolveButton from "./SolveButton";

describe("SolveButton", () => {
  test("Button renders on dom", () => {
    render(<SolveButton data-testid="solve-button" />);

    const button = screen.getByTestId("solve-button");

    expect(button).toBeInTheDocument();
  });
});
