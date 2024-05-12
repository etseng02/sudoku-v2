import { blockType } from "../components/DataContextProvider";
import {
  eliminateNumbersWithinColumn,
  eliminateNumbersWithinBlock,
  eliminateNumbersWithinRow,
  solveSudoku,
} from "./solveSudoku";
import { expect, test, describe, vi, afterEach } from "vitest";
import {
  sudokuCheckColumnMockData,
  sudokuCheckRowMockData,
} from "./sudokuMockData";
import { emptyBlockState, demoSet1 } from "../data/sudokuSets";

describe("eliminateNumbersWithinBlock", () => {
  test("should return 8 eliminated numbers if there are 8 valid numbers", () => {
    const block = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, null],
    ] as blockType;

    const result = eliminateNumbersWithinBlock(block);

    expect(result).toEqual(expect.arrayContaining([1, 2, 3, 4, 5, 6, 7, 8]));
  });

  test("should return an array of non-duplicate numbers", () => {
    const block = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 7, null],
    ] as blockType;

    const result = eliminateNumbersWithinBlock(block);

    expect(result).toEqual(expect.arrayContaining([1, 2, 3, 4, 5, 6, 7]));
  });

  test("should return empty array if all values are null", () => {
    const block = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ] as blockType;

    const result = eliminateNumbersWithinBlock(block);

    expect(result).toEqual([]);
  });
});

describe("checkColumn", () => {
  test("should return all elminatedNumbers", () => {
    const result = eliminateNumbersWithinColumn(
      sudokuCheckColumnMockData,
      "block4",
      1,
      2
    );

    expect(result).toEqual(expect.arrayContaining([1, 2, 3, 4, 6, 7, 8, 9]));
  });

  test("should return eliminated numbers if there are less than 8 numbers", () => {
    const mockBlock = [
      [null, null, null],
      [null, null, null],
      [null, null, 6],
    ] as blockType;

    const result = eliminateNumbersWithinColumn(
      {
        ...sudokuCheckColumnMockData,
        block4: mockBlock,
      },
      "block4",
      1,
      2
    );

    expect(result).toEqual(expect.arrayContaining([1, 2, 3, 6, 7, 8, 9]));
  });

  test("should return elminated numbers without duplicate numbers", () => {
    const mockBlock = [
      [null, null, 3],
      [null, null, null],
      [null, null, 3],
    ] as blockType;

    const result = eliminateNumbersWithinColumn(
      {
        ...sudokuCheckColumnMockData,
        block4: mockBlock,
      },
      "block4",
      1,
      2
    );

    expect(result).toEqual(expect.arrayContaining([1, 2, 3, 7, 8, 9]));
  });
});

describe("eliminateNumberWithinRow", () => {
  test("should return elminated numbers if there are 8 valid numbers", () => {
    const result = eliminateNumbersWithinRow(
      sudokuCheckRowMockData,
      "block2",
      0,
      1
    );

    expect(result).toEqual(expect.arrayContaining([1, 2, 3, 4, 6, 7, 8, 9]));
  });

  test("should return elminated numbers set if there are less than 8 numbers", () => {
    const mockBlock = [
      [4, null, null],
      [null, null, null],
      [null, null, null],
    ] as blockType;

    const result = eliminateNumbersWithinRow(
      {
        ...sudokuCheckRowMockData,
        block2: mockBlock,
      },
      "block2",
      0,
      1
    );

    expect(result).toEqual(expect.arrayContaining([1, 2, 3, 4, 7, 8, 9]));
  });

  test("should return elminated numbers without duplicate numbers", () => {
    const mockBlock = [
      [4, null, 4],
      [null, null, null],
      [null, null, null],
    ] as blockType;

    const result = eliminateNumbersWithinRow(
      {
        ...sudokuCheckRowMockData,
        block2: mockBlock,
      },
      "block2",
      0,
      1
    );

    expect(result).toEqual(expect.arrayContaining([1, 2, 3, 4, 7, 8, 9]));
  });
});

describe("solveSudoku", () => {
  const mockedSetBlocks = vi.fn();
  const mockedSetSelectedSquare = vi.fn();
  const mockedCallback = vi.fn();

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("should call set blocks to return the new state of the board", () => {
    solveSudoku(
      emptyBlockState,
      mockedSetBlocks,
      mockedSetSelectedSquare,
      mockedCallback
    );

    expect(mockedSetBlocks).toHaveBeenCalledTimes(1);
  });

  test("should call mockedCallback if there are no changes to any squares", () => {
    solveSudoku(
      emptyBlockState,
      mockedSetBlocks,
      mockedSetSelectedSquare,
      mockedCallback
    );

    expect(mockedSetSelectedSquare).toHaveBeenCalledTimes(0);
    expect(mockedCallback).toHaveBeenCalledTimes(1);
  });

  test("should return the board with the next number if possible", () => {
    solveSudoku(
      demoSet1,
      mockedSetBlocks,
      mockedSetSelectedSquare,
      mockedCallback
    );

    const expectedBlock1 = [
      [8, null, 1],
      [2, 5, 6],
      [null, 4, null],
    ];

    expect(mockedSetBlocks).toHaveBeenCalledWith({
      ...demoSet1,
      block1: expectedBlock1,
    });
  });
});
