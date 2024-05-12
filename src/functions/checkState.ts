import { IBlocks } from "../components/DataContextProvider";

export const checkCompletedSudoku = (blocks: IBlocks): boolean => {
  const flatBlocks = Object.values(blocks).flat();
  return flatBlocks.every((block) =>
    block.every((cell: number | null) => cell !== null)
  );
};
