import { createContext, useState, useEffect } from "react";
import * as React from "react";
import { solveSudoku } from "../functions/solveSudoku";
import { emptyBlockState, allDemoSets } from "../data/sudokuSets";

const getInitialBlockState = (numberOfDemoSets: number) => {
  const demoSetIndex = Math.floor(Math.random() * numberOfDemoSets);

  return demoSetIndex;
};

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
  resetBoard: () => void;
  setIsFastMode: React.Dispatch<React.SetStateAction<boolean>>;
  isSolving: boolean;
  isFastMode: boolean;
};

const demoSetIndex = getInitialBlockState(allDemoSets.length);

const initialBlockState = allDemoSets[demoSetIndex];

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
  resetBoard: () => {},
  setIsFastMode: () => {},
  isSolving: false,
  isFastMode: false,
});

export const DataContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [blocks, setBlocks] = useState<IBlocks>(initialBlockState);
  const [isSolving, setIsSolvingBlocks] = useState<boolean>(false);
  const [isFastMode, setIsFastMode] = useState<boolean>(false);
  const [selectedSquare, setSelectedSquare] = useState<selectedSquareType>({
    block: null,
    row: null,
    col: null,
  });

  const stopSolving = (timer: number) => {
    setIsSolvingBlocks(false);
    clearTimeout(timer);
  };

  useEffect(() => {
    if (isSolving) {
      const timer: ReturnType<typeof setTimeout> = setTimeout(
        () => {
          solveSudoku(blocks, setBlocks, setSelectedSquare, () => {
            stopSolving(timer);
            setSelectedSquare({ block: null, row: null, col: null });
          });
        },
        isFastMode ? 200 : 500
      );

      return () => {
        clearTimeout(timer);
      };
    }
  }, [isSolving, blocks, setBlocks, isFastMode]);

  const triggerSolve = () => {
    if (isSolving) {
      setIsSolvingBlocks(false);
    } else {
      setIsSolvingBlocks(true);
    }
  };

  const resetBoard = () => {
    setBlocks(emptyBlockState);
    setSelectedSquare({ block: null, row: null, col: null });
  };

  return (
    <DataContext.Provider
      value={{
        triggerSolve,
        blocks,
        setBlocks,
        selectedSquare,
        setSelectedSquare,
        isSolving,
        resetBoard,
        isFastMode,
        setIsFastMode,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
