import React from "react";

import {
  IBlocks,
  blockType,
  blockIdsType,
  rowType,
  selectedSquareType,
} from "../components/DataContextProvider";

const allNumbersSet = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);

const relatedColumnBlocks: Record<blockIdsType, [blockIdsType, blockIdsType]> =
  {
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

const relatedRowBlocks: Record<blockIdsType, [blockIdsType, blockIdsType]> = {
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

export const eliminateNumbersWithinBlock = (block: blockType): number[] => {
  const flatBlock = block.flat();

  const currentSet = new Set(
    flatBlock.filter((value) => value !== null)
  ) as Set<number>;

  return [...currentSet];
};

export const eliminateNumbersWithinColumn = (
  blocks: IBlocks,
  blockId: blockIdsType,
  row: number,
  col: number
): number[] => {
  const otherBlocksToCheck = relatedColumnBlocks[blockId] as [
    blockIdsType,
    blockIdsType
  ];

  const columnValues = new Set() as Set<number>;

  otherBlocksToCheck.forEach((blockNumber) => {
    const block = blocks[blockNumber];
    if (block[0][col]) columnValues.add(block[0][col] as number);
    if (block[1][col]) columnValues.add(block[1][col] as number);
    if (block[2][col]) columnValues.add(block[2][col] as number);
  });

  blocks[blockId].forEach((rowValues, rowIndex) => {
    if (rowIndex !== row && rowValues[col]) {
      columnValues.add(rowValues[col] as number);
    }
  });

  return [...columnValues];
};

export const eliminateNumbersWithinRow = (
  blocks: IBlocks,
  blockId: blockIdsType,
  row: number,
  col: number
): number[] => {
  const otherBlocksToCheck = relatedRowBlocks[blockId] as [
    blockIdsType,
    blockIdsType
  ];

  const rowValues = new Set() as Set<number>;

  otherBlocksToCheck.forEach((blockNumber) => {
    const block = blocks[blockNumber];
    if (block[row][0]) rowValues.add(block[row][0] as number);
    if (block[row][1]) rowValues.add(block[row][1] as number);
    if (block[row][2]) rowValues.add(block[row][2] as number);
  });

  blocks[blockId][row].forEach((colValues, colIndex) => {
    if (colIndex !== col && colValues) {
      rowValues.add(colValues as number);
    }
  });

  return [...rowValues];
};

const solveNextNumber = (
  blocks: IBlocks,
  blockId: blockIdsType,
  row: number,
  col: number
): number | null => {
  const eliminatedNumbersWithinBlock = eliminateNumbersWithinBlock(
    blocks[blockId]
  );

  const eliminatedNumbersWithinColumn = eliminateNumbersWithinColumn(
    blocks,
    blockId,
    row,
    col
  );
  const eliminatedNumbersWithinRow = eliminateNumbersWithinRow(
    blocks,
    blockId,
    row,
    col
  );

  const allEliminatedNumbers = [
    ...eliminatedNumbersWithinBlock,
    ...eliminatedNumbersWithinColumn,
    ...eliminatedNumbersWithinRow,
  ];

  const eliminatedNumbersSet = new Set(allEliminatedNumbers);

  const missingNumbers = showMissingNumbers(eliminatedNumbersSet);

  if (missingNumbers.length === 1) {
    return missingNumbers[0];
  } else {
    return null;
  }
};

export const solveSudoku = (
  blocks: IBlocks,
  setBlocks: React.Dispatch<React.SetStateAction<IBlocks>>,
  setSelectedSquare: React.Dispatch<React.SetStateAction<selectedSquareType>>,
  callBack: () => void
) => {
  let numberHasChanged = false;
  const newBlockValues = Object.entries(blocks).reduce((acc, block) => {
    const blockId = block[0] as blockIdsType;
    const blockValues = block[1] as blockType;

    if (numberHasChanged) acc[blockId] = blockValues;

    const newBlock = !numberHasChanged
      ? (blockValues.map((rowValues: rowType, rowIndex) => {
          const newRowValues = rowValues.map(
            (colValues: number | null, colIndex: number) => {
              if (colValues === null && !numberHasChanged) {
                const result = solveNextNumber(
                  blocks,
                  blockId,
                  rowIndex,
                  colIndex
                );
                if (result) {
                  numberHasChanged = true;
                  setSelectedSquare((prevState) => ({
                    ...prevState,
                    block: blockId as blockIdsType,
                    row: rowIndex,
                    col: colIndex,
                  }));
                }

                return result;
              } else {
                return colValues;
              }
            }
          ) as rowType;

          return newRowValues;
        }) as blockType)
      : blockValues;

    acc[blockId] = newBlock;

    return acc;
  }, {} as IBlocks);

  setBlocks(newBlockValues);

  if (!numberHasChanged) {
    callBack();
  }
};
