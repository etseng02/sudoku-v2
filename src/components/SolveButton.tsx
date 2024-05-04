import { useContext } from "react";
import { DataContext } from "./DataContextProvider";

const SolveButton = () => {
  const { triggerSolve } = useContext(DataContext);

  return (
    <button
      className="rounded-full bg-red-600 p-6"
      onClick={() => triggerSolve()}
    >
      Solve Sudoku
    </button>
  );
};

export default SolveButton;
