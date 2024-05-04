import {
  IBlocks,
  blockType,
  blockIdsType,
} from "../components/DataContextProvider";

const allNumbersSet = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);

export const solveWithinBlock = (block: blockType): blockType => {
  const flatBlock = block.flat();

  const currentSet = new Set(
    flatBlock.filter((value) => value !== null)
  ) as Set<number>;

  if (allNumbersSet.size === currentSet.size) {
    return block;
    // block is already solved
  } else if (currentSet.size === 8) {
    const missingNumber = [...allNumbersSet].filter(
      (num) => !currentSet.has(num)
    )[0];

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

export const solveSudoku = (blocks: IBlocks) => {
  const newBlockValues = Object.entries(blocks).reduce((acc, block) => {
    const blockId = block[0] as blockIdsType;
    const blockValues = block[1] as blockType;

    const newBlockValues = solveWithinBlock(blockValues);

    acc[blockId] = newBlockValues;

    return acc;
  }, {} as IBlocks);

  return newBlockValues;
};
