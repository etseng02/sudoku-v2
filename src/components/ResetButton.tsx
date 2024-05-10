import { useContext } from "react";
import { DataContext } from "./DataContextProvider";

const ResetButton = () => {
  const { isSolving, resetBoard } = useContext(DataContext);

  return (
    <button
      data-testid="reset-button"
      className={`rounded-full relative py-4 px-6 shadow-2xl text-white bg-red-600 ${
        isSolving && "cursor-not-allowed"
      }`}
      onClick={isSolving ? () => {} : () => resetBoard()}
    >
      Reset
    </button>
  );
};

export default ResetButton;
