import { IBlocks } from "../components/DataContextProvider";

export const checkCompletedSudoku = (blocks: IBlocks): boolean => {
  const flatBlocks = Object.values(blocks).flat();
  return flatBlocks.every((block) =>
    block.every((cell: number | null) => cell !== null)
  );
};

export const checkValidSudoku = (blocks: IBlocks): boolean => {
  return Object.values(blocks).every((block) => {
    const set = new Set<number>(
      block.flat().filter((cell: number | null) => cell !== null)
    );

    return set.size === 9;
  });
};
