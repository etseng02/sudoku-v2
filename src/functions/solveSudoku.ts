import {
  IBlocks,
  blockType,
  blockIdsType,
  rowType,
} from "../components/DataContextProvider";

const allNumbersSet = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);

const columns: Record<blockIdsType, [blockIdsType, blockIdsType]> = {
  block1: ["block4", "block7"],
  block2: ["block5", "block8"],
  block3: ["block6", "block9"],
  block4: ["block1", "block7"],
  block5: ["block2", "block8"],
  block6: ["block3", "block9"],
  block7: ["block1", "block4"],
  block8: ["block2", "block5"],
  block9: ["block3", "block6"],
};

const rows: Record<blockIdsType, [blockIdsType, blockIdsType]> = {
  block1: ["block2", "block3"],
  block2: ["block1", "block3"],
  block3: ["block1", "block2"],
  block4: ["block5", "block6"],
  block5: ["block4", "block6"],
  block6: ["block4", "block5"],
  block7: ["block8", "block9"],
  block8: ["block7", "block9"],
  block9: ["block7", "block8"],
};

const showMissingNumbers = (currentSet: Set<number>) =>
  [...allNumbersSet].filter((num) => !currentSet.has(num));

export const solveWithinBlock = (block: blockType): blockType => {
  const flatBlock = block.flat();

  const currentSet = new Set(
    flatBlock.filter((value) => value !== null)
  ) as Set<number>;

  if (allNumbersSet.size === currentSet.size) {
    return block;
    // block is already solved
  } else if (currentSet.size === 8) {
    const missingNumber = showMissingNumbers(currentSet)[0];

    const missingIndex = flatBlock.indexOf(null);

    const newBlockValues = flatBlock.toSpliced(missingIndex, 1, missingNumber);

    const newBlock = [
      [...newBlockValues.slice(0, 3)],
      [...newBlockValues.slice(3, 6)],
      [...newBlockValues.slice(6, 9)],
    ] as blockType;

    return newBlock;
  } else {
    return block;
  }
};

export const checkWithinBlock = (block: blockType): number | null => {
  const flatBlock = block.flat();

  const currentSet = new Set(
    flatBlock.filter((value) => value !== null)
  ) as Set<number>;

  if (currentSet.size === 8) {
    const missingNumber = showMissingNumbers(currentSet)[0];

    return missingNumber;
  } else {
    return null;
  }
};

export const checkColumn = (
  blocks: IBlocks,
  blockId: blockIdsType,
  row: number,
  col: number
): number | null => {
  const otherBlocksToCheck = columns[blockId] as [blockIdsType, blockIdsType];

  const columnValues = new Set() as Set<number>;

  otherBlocksToCheck.forEach((blockNumber) => {
    const block = blocks[blockNumber];
    if (block[0][col]) columnValues.add(block[0][col] as number);
    if (block[1][col]) columnValues.add(block[1][col] as number);
    if (block[2][col]) columnValues.add(block[2][col] as number);
  });

  blocks[blockId].forEach((rowValues, rowIndex) => {
    if (rowIndex !== row) {
      columnValues.add(rowValues[col] as number);
    }
  });

  const missingNumbers = showMissingNumbers(columnValues);

  if (missingNumbers.length === 1) {
    return missingNumbers[0];
  } else {
    return null;
  }
};

export const checkRow = (
  blocks: IBlocks,
  blockId: blockIdsType,
  row: number,
  col: number
): number | null => {
  const otherBlocksToCheck = rows[blockId] as [blockIdsType, blockIdsType];

  const rowValues = new Set() as Set<number>;

  otherBlocksToCheck.forEach((blockNumber) => {
    const block = blocks[blockNumber];
    if (block[row][0]) rowValues.add(block[row][0] as number);
    if (block[row][1]) rowValues.add(block[row][1] as number);
    if (block[row][2]) rowValues.add(block[row][2] as number);
  });

  blocks[blockId][row].forEach((colValues, colIndex) => {
    if (colIndex !== col) {
      rowValues.add(colValues as number);
    }
  });

  const missingNumbers = showMissingNumbers(rowValues);

  if (missingNumbers.length === 1) {
    return missingNumbers[0];
  } else {
    return null;
  }
};

const solveNextNumber = (
  blocks: IBlocks,
  blockId: blockIdsType,
  row: number,
  col: number
): number | null => {
  const nextNumber =
    checkColumn(blocks, blockId, row, col) ??
    checkRow(blocks, blockId, row, col) ??
    checkWithinBlock(blocks[blockId]) ??
    null;

  return nextNumber;
};

export const solveSudoku = (blocks: IBlocks) => {
  const newBlockValues = Object.entries(blocks).reduce((acc, block) => {
    const blockId = block[0] as blockIdsType;
    const blockValues = block[1] as blockType;

    const newBlock = blockValues.map((rowValues: rowType, rowIndex) => {
      const newRowValues = rowValues.map(
        (colValues: number | null, colIndex: number) => {
          if (colValues === null) {
            const result = solveNextNumber(blocks, blockId, rowIndex, colIndex);
            console.log("solveNextNumber", result, blockId, rowIndex, colIndex);
            return result;
          } else {
            return colValues;
          }
        }
      ) as rowType;

      return newRowValues;
    }) as blockType;

    acc[blockId] = newBlock;

    return acc;
  }, {} as IBlocks);

  return newBlockValues;
};
