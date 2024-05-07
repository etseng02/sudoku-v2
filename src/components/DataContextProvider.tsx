import { createContext, useState } from "react";
import * as React from "react";
import { solveSudoku } from "../functions/solveSudoku";

const initialBlockState: IBlocks = {
  block1: [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ],
  block2: [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ],
  block3: [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ],
  block4: [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ],
  block5: [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ],
  block6: [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ],
  block7: [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ],
  block8: [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ],
  block9: [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ],
};

// const initialBlockState: IBlocks = {
//   block1: [
//     [8, null, 1],
//     [2, 5, null],
//     [null, 4, null],
//   ],
//   block2: [
//     [null, null, null],
//     [null, 7, null],
//     [null, null, 8],
//   ],
//   block3: [
//     [null, null, null],
//     [null, 9, null],
//     [null, 2, 6],
//   ],
//   block4: [
//     [null, null, 7],
//     [null, null, 5],
//     [null, null, 3],
//   ],
//   block5: [
//     [8, null, 5],
//     [null, 4, 3],
//     [7, 9, null],
//   ],
//   block6: [
//     [null, 1, 3],
//     [null, null, 7],
//     [null, null, 4],
//   ],
//   block7: [
//     [null, 9, null],
//     [1, null, null],
//     [null, 6, 4],
//   ],
//   block8: [
//     [4, null, 7],
//     [5, 8, 6],
//     [null, 1, 2],
//   ],
//   block9: [
//     [null, 6, 2],
//     [null, 7, 9],
//     [null, null, null],
//   ],
// };

export type blockIdsType = keyof IBlocks;

export type selectedSquareType = {
  block: blockIdsType | null;
  row: number | null;
  col: number | null;
};

export type rowType = [number | null, number | null, number | null];

export type blockType = [rowType, rowType, rowType];

export interface IBlocks {
  block1: blockType;
  block2: blockType;
  block3: blockType;
  block4: blockType;
  block5: blockType;
  block6: blockType;
  block7: blockType;
  block8: blockType;
  block9: blockType;
}

export type DataContextType = {
  blocks: IBlocks;
  selectedSquare: selectedSquareType;
  setBlocks: React.Dispatch<React.SetStateAction<IBlocks>>;
  setSelectedSquare: React.Dispatch<React.SetStateAction<selectedSquareType>>;
  triggerSolve: () => void;
};

export const DataContext = createContext<DataContextType>({
  blocks: initialBlockState,
  selectedSquare: {
    block: null,
    row: null,
    col: null,
  },
  setBlocks: () => {},
  setSelectedSquare: () => {},
  triggerSolve: () => {},
});

export const DataContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [blocks, setBlocks] = useState<IBlocks>(initialBlockState);
  const [selectedSquare, setSelectedSquare] = useState<selectedSquareType>({
    block: null,
    row: null,
    col: null,
  });

  const triggerSolve = () => {
    const newValues = solveSudoku(blocks);

    return setBlocks(newValues);
  };

  return (
    <DataContext.Provider
      value={{
        triggerSolve,
        blocks,
        setBlocks,
        selectedSquare,
        setSelectedSquare,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
