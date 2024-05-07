import { useContext } from "react";
import { DataContext } from "./DataContextProvider";

const SolveButton = () => {
  const { triggerSolve } = useContext(DataContext);

  return (
    <button
      data-testid="solve-button"
      className="rounded-full bg-red-600 p-6"
      onClick={() => triggerSolve()}
    >
      Solve
    </button>
  );
};

export default SolveButton;
