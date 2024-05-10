import { useContext } from "react";
import { DataContext } from "./DataContextProvider";

const SolveButton: React.FC = () => {
  const { triggerSolve, isSolving } = useContext(DataContext);

  return (
    <button
      data-testid="solve-button"
      className={`rounded-full relative py-4 px-6 shadow-2xl text-white ${
        isSolving ? "bg-red-600" : "bg-green-600"
      }`}
      onClick={() => triggerSolve()}
    >
      {isSolving ? "Stop" : "Solve"}
    </button>
  );
};

export default SolveButton;
