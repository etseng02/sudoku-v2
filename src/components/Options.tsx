import { useContext } from "react";
import { DataContext } from "./DataContextProvider";

const Options: React.FC = () => {
  const { isSolving, isFastMode, setIsFastMode } = useContext(DataContext);

  type buttonType = {
    label: string;
    onClick: () => void;
    isActive?: boolean;
  };

  const buttons = [
    {
      label: "Fast Mode",
      onClick: () => setIsFastMode(isFastMode ? false : true),
      isActive: isFastMode,
    },
  ] as buttonType[];

  return (
    <>
      <h2 className="text-slate-50 text-2xl flex">Options</h2>
      <section className="rounded-2xl p-2 flex flex-wrap gap-4">
        {buttons.map((button, index) => (
          <button
            onClick={() => (isSolving ? () => {} : button.onClick())}
            key={index}
            className={`border border-white p-2 rounded-2xl shadow-2xl h-fit flex flex-row ${
              button?.isActive ? "text-gray-700 bg-slate-50" : "text-slate-50"
            } ${isSolving && "cursor-not-allowed"}`}
          >
            {button.label}
          </button>
        ))}
      </section>
    </>
  );
};

export default Options;
