import { useContext } from "react";
import { allDemoSets } from "../data/sudokuSets";
import { DataContext } from "./DataContextProvider";
import { deepClone } from "../functions/utils";

const DataSets: React.FC = () => {
  const { isSolving, setBlocks, setSelectedSquare } = useContext(DataContext);

  const formattedDemoSets = allDemoSets.map((demoSet, index) => ({
    label: `Set ${index + 1}`,
    onClick: () => {
      setBlocks(deepClone(demoSet));
      setSelectedSquare({ block: null, row: null, col: null });
    },
  }));

  type buttonType = {
    label: string;
    onClick: () => void;
  };

  const buttons = [...formattedDemoSets] as buttonType[];

  return (
    <>
      <h2 className="text-slate-50 text-2xl flex">Data Sets</h2>
      <section className=" rounded-2xl p-2 flex flex-wrap gap-4">
        {buttons.map((button, index) => (
          <button
            onClick={() => (isSolving ? () => {} : button.onClick())}
            key={index}
            className={`border border-white p-2 rounded-2xl shadow-2xl h-fit flex flex-row text-slate-50 first-letter:${
              isSolving && "cursor-not-allowed"
            }`}
          >
            {button.label}
          </button>
        ))}
      </section>
    </>
  );
};

export default DataSets;
