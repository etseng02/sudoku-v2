import React, { useContext } from "react";
import { FaRegTrashCan } from "react-icons/fa6";

import { DataContext, IBlocks } from "./DataContextProvider";

const inputs = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "backspace",
] as const;

const TrashIcon: React.FC = () => {
  return (
    <div className="my-auto h-full items-center justify-center flex">
      <FaRegTrashCan />
    </div>
  );
};

const InputSquares: React.FC = () => {
  const { setBlocks, selectedSquare, isSolving } = useContext(DataContext);

  const isSquareSelected =
    selectedSquare.block !== null &&
    selectedSquare.row !== null &&
    selectedSquare.col !== null;

  const handleClick = (input: string) => {
    if (input === "backspace") {
      setBlocks((prevBlocks: IBlocks) => {
        const newBlocks = { ...prevBlocks };
        if (
          selectedSquare.block !== null &&
          selectedSquare.row !== null &&
          selectedSquare.col !== null
        ) {
          newBlocks[selectedSquare.block][selectedSquare.row][
            selectedSquare.col
          ] = null;
        }
        return newBlocks;
      });
    } else if (isSquareSelected) {
      setBlocks((prevBlocks) => {
        const newBlocks = { ...prevBlocks };
        if (
          selectedSquare.block !== null &&
          selectedSquare.row !== null &&
          selectedSquare.col !== null
        ) {
          newBlocks[selectedSquare.block][selectedSquare.row][
            selectedSquare.col
          ] = parseInt(input);
        }
        return newBlocks;
      });
    }
  };

  return (
    <section className="flex flex-row">
      {inputs.map((input) => {
        return (
          <button
            className={`border-solid border-black text-center border-2 align-middle sm:leading-10 w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] ${"bg-slate-100 text-gray-700"} ${
              isSolving ? "cursor-not-allowed" : "cursor-pointer"
            }`}
            onClick={() =>
              !isSolving && isSquareSelected ? handleClick(input) : () => {}
            }
          >
            {input === "backspace" ? <TrashIcon /> : input}
          </button>
        );
      })}
    </section>
  );
};

export default InputSquares;
