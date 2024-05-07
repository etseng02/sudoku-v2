import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import SolveButton from "./SolveButton";
import { DataContext } from "./DataContextProvider";

describe("SolveButton", () => {
  test("Button renders on dom", () => {
    render(<SolveButton data-testid="solve-button" />);

    const button = screen.getByTestId("solve-button");

    expect(button).toBeInTheDocument();
  });

  test.skip("should trigger triggleSolve function when clicked", () => {
    const user = userEvent.setup();

    const mockedTriggerSolve = vi.fn(() => {});

    render(
      <DataContext.Provider value={{ triggerSolve: mockedTriggerSolve }}>
        <SolveButton data-testid="solve-button" />
      </DataContext.Provider>
    );

    user.click(screen.getByTestId("solve-button"));

    screen.debug();

    expect(mockedTriggerSolve).toHaveBeenCalledTimes(20);
  });
});
