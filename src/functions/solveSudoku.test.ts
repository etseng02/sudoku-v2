import { blockType } from "../components/DataContextProvider";
import { solveWithinBlock } from "./solveSudoku";
import { expect, test, describe } from "vitest";

describe("solveWithinBlock", () => {
  test("should return completed block if there are 8 numbers", () => {
    const block = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, null],
    ] as blockType;

    const result = solveWithinBlock(block);

    expect(result).toEqual([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ]);
  });

  test("should return unmodified block if there are less than 8 numbers", () => {
    const block = [
      [1, 2, 3],
      [4, 5, 6],
      [7, null, null],
    ] as blockType;

    const result = solveWithinBlock(block);

    expect(result).toEqual([
      [1, 2, 3],
      [4, 5, 6],
      [7, null, null],
    ]);
  });

  test("should return unmodified block if there are duplicate numbers within block", () => {
    const block = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 7, null],
    ] as blockType;

    const result = solveWithinBlock(block);

    expect(result).toEqual([
      [1, 2, 3],
      [4, 5, 6],
      [7, 7, null],
    ]);
  });
});
