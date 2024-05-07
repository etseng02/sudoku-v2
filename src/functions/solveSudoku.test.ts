import { blockType } from "../components/DataContextProvider";
import { checkColumn, checkWithinBlock, checkRow } from "./solveSudoku";
import { expect, test, describe } from "vitest";
import {
  sudokuCheckColumnMockData,
  sudokuCheckRowMockData,
} from "./sudokuMockData";

describe("checkWithinBlock", () => {
  test("should return missing number if there are 8 valid numbers", () => {
    const block = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, null],
    ] as blockType;

    const result = checkWithinBlock(block);

    expect(result).toEqual(9);
  });

  test("should return null if there are less than 8 numbers", () => {
    const block = [
      [1, 2, 3],
      [4, 5, 6],
      [7, null, null],
    ] as blockType;

    const result = checkWithinBlock(block);

    expect(result).toEqual(null);
  });

  test("should return unmodified block if there are duplicate numbers within block", () => {
    const block = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 7, null],
    ] as blockType;

    const result = checkWithinBlock(block);

    expect(result).toEqual(null);
  });
});

describe("checkColumn", () => {
  test("should return missing number if there are 8 valid numbers", () => {
    const result = checkColumn(sudokuCheckColumnMockData, "block4", 1, 2);

    expect(result).toEqual(5);
  });

  test("should return null set if there are less than 8 numbers", () => {
    const mockBlock = [
      [null, null, null],
      [null, null, null],
      [null, null, 6],
    ] as blockType;

    const result = checkColumn(
      {
        ...sudokuCheckColumnMockData,
        block4: mockBlock,
      },
      "block4",
      1,
      2
    );

    expect(result).toEqual(null);
  });

  test("should return null if there are duplicate numbers", () => {
    const mockBlock = [
      [null, null, 3],
      [null, null, null],
      [null, null, 3],
    ] as blockType;

    const result = checkColumn(
      {
        ...sudokuCheckColumnMockData,
        block4: mockBlock,
      },
      "block4",
      1,
      2
    );

    expect(result).toEqual(null);
  });
});

describe("checkRow", () => {
  test("should return missing number if there are 8 valid numbers", () => {
    const result = checkRow(sudokuCheckRowMockData, "block2", 0, 1);

    expect(result).toEqual(5);
  });

  test("should return null set if there are less than 8 numbers", () => {
    const mockBlock = [
      [4, null, null],
      [null, null, null],
      [null, null, null],
    ] as blockType;

    const result = checkRow(
      {
        ...sudokuCheckRowMockData,
        block2: mockBlock,
      },
      "block2",
      0,
      1
    );

    expect(result).toEqual(null);
  });

  test("should return null if there are duplicate numbers", () => {
    const mockBlock = [
      [4, null, 4],
      [null, null, null],
      [null, null, null],
    ] as blockType;

    const result = checkRow(
      {
        ...sudokuCheckRowMockData,
        block2: mockBlock,
      },
      "block2",
      0,
      1
    );

    expect(result).toEqual(null);
  });
});
