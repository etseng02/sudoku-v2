import { createContext, useState } from "react";
import * as React from "react";

const initialBlockState = {
  block1: {
    row1: [null, null, null],
    row2: [null, null, null],
    row3: [null, null, null],
  },
  block2: {
    row1: [null, null, null],
    row2: [null, null, null],
    row3: [null, null, null],
  },
  block3: {
    row1: [null, null, null],
    row2: [null, null, null],
    row3: [null, null, null],
  },
  block4: {
    row1: [null, null, null],
    row2: [null, null, null],
    row3: [null, null, null],
  },
  block5: {
    row1: [null, null, null],
    row2: [null, null, null],
    row3: [null, null, null],
  },
  block6: {
    row1: [null, null, null],
    row2: [null, null, null],
    row3: [null, null, null],
  },
  block7: {
    row1: [null, null, null],
    row2: [null, null, null],
    row3: [null, null, null],
  },
  block8: {
    row1: [null, null, null],
    row2: [null, null, null],
    row3: [null, null, null],
  },
  block9: {
    row1: [null, null, null],
    row2: [null, null, null],
    row3: [null, null, null],
  },
} as IBlocks;

export type selectedSquareType = {
  block: keyof IBlocks | null;
  row: number | null;
  col: number | null;
};

export interface IRows {
  row1: [number | null, number | null, number | null];
  row2: [number | null, number | null, number | null];
  row3: [number | null, number | null, number | null];
}

export interface IBlocks {
  block1: IRows;
  block2: IRows;
  block3: IRows;
  block4: IRows;
  block5: IRows;
  block6: IRows;
  block7: IRows;
  block8: IRows;
  block9: IRows;
}

export type blockIdsType = keyof IBlocks;

export type DataContextType = {
  blocks: IBlocks;
  selectedSquare: selectedSquareType;
  setBlocks: React.Dispatch<React.SetStateAction<IBlocks>>;
  setSelectedSquare: React.Dispatch<React.SetStateAction<selectedSquareType>>;
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

  return (
    <DataContext.Provider
      value={{ blocks, setBlocks, selectedSquare, setSelectedSquare }}
    >
      {children}
    </DataContext.Provider>
  );
};
