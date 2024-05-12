import { describe, expect, test } from "vitest";
import { checkCompletedSudoku } from "./checkState";
import { completedBoardState } from "./sudokuMockData";

describe("checkCompletedSudoku", () => {
  test("should return true if all cells are filled", () => {
    const result = checkCompletedSudoku(completedBoardState);

    expect(result).toEqual(true);
  });

  test("should return false if not all cells are filled", () => {
    const incompleteBlock = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, null],
    ];

    const inCompleteBoardState = {
      ...completedBoardState,
      block: incompleteBlock,
    };

    const result = checkCompletedSudoku(inCompleteBoardState);

    expect(result).toEqual(false);
  });
});
