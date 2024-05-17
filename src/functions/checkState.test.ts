import { describe, expect, test } from "vitest";
import { checkCompletedSudoku, checkValidSudoku } from "./checkState";
import { completedBoardState } from "./sudokuMockData";
import { blockType } from "../components/DataContextProvider";

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
    ] as blockType;

    const incompleteBoardState = {
      ...completedBoardState,
      block1: incompleteBlock,
    };

    const result = checkCompletedSudoku(incompleteBoardState);

    expect(result).toEqual(false);
  });
});

describe("checkValidSudoku", () => {
  test("should return true if all cells are filled and board is complete and valid", () => {
    const result = checkValidSudoku(completedBoardState);

    expect(result).toEqual(true);
  });

  test("should return false if not all cells are filled", () => {
    const incompleteBlock = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, null],
    ] as blockType;

    const incompleteBoardState = {
      ...completedBoardState,
      block1: incompleteBlock,
    };

    const result = checkValidSudoku(incompleteBoardState);

    expect(result).toEqual(false);
  });

  test("should return false if there are duplicate numbers", () => {
    const incompleteBlock = [
      [1, 1, 1],
      [4, 5, 6],
      [7, 8, 9],
    ] as blockType;

    const incompleteBoardState = {
      ...completedBoardState,
      block1: incompleteBlock,
    };

    const result = checkValidSudoku(incompleteBoardState);

    expect(result).toEqual(false);
  });
});
