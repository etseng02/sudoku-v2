import React, { useCallback, useContext, useEffect } from "react";
import { DataContext, IBlocks, blockIdsType } from "./DataContextProvider";

const validNumbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

const Square: React.FC<{
  children: React.ReactNode;
  blockId: blockIdsType;
  row: 0 | 1 | 2;
  col: number;
}> = ({ children, row, col, blockId }) => {
  const { setBlocks, selectedSquare, setSelectedSquare } =
    useContext(DataContext);

  const isSquareSelected =
    selectedSquare?.block === blockId &&
    selectedSquare?.row === row &&
    selectedSquare?.col === col;

  const handleClick = () => {
    isSquareSelected
      ? setSelectedSquare({
          block: null,
          row: null,
          col: null,
        })
      : setSelectedSquare({
          block: blockId,
          row,
          col,
        });
  };

  const handleKeyDown = useCallback(
    (e: { key: string }) => {
      if (e.key === "Backspace") {
        setBlocks((prevBlocks: IBlocks) => {
          const newBlocks = prevBlocks;
          newBlocks[blockId][row][col] = null;
          return newBlocks;
        });
      } else if (!validNumbers.includes(e.key)) {
        return;
      } else {
        setBlocks((prevBlocks) => {
          const newBlocks = { ...prevBlocks };
          newBlocks[blockId][row][col] = parseInt(e.key);
          return newBlocks;
        });
      }
    },
    [blockId, row, col, setBlocks]
  );

  useEffect(() => {
    if (isSquareSelected) {
      document.addEventListener("keydown", handleKeyDown, true);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown, true);
    };
  }, [isSquareSelected, handleKeyDown]);

  return (
    <div
      className={`border-solid border-black text-center border-2 ${
        isSquareSelected ? "bg-red-700" : "bg-white"
      }`}
      onClick={() => handleClick()}
    >
      {children}
    </div>
  );
};

const SquareBlock: React.FC<{ blockId: blockIdsType }> = ({ blockId }) => {
  const { blocks } = useContext(DataContext);

  return (
    <div className="grid grid-cols-[repeat(3,_50px)] grid-rows-[repeat(3,_50px)]">
      {blocks[blockId].map((row, rowIndex) => {
        return row.map((col: number | null, colIndex: number) => {
          return (
            <Square
              blockId={blockId}
              row={rowIndex as 0 | 1 | 2}
              col={colIndex as 0 | 1 | 2}
              key={`${blockId}-${rowIndex}-${colIndex}`}
            >
              {col}
            </Square>
          );
        });
      })}
    </div>
  );
};

export default SquareBlock;
