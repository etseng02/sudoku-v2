import { Toaster } from "react-hot-toast";
import { DataContextProvider } from "./components/DataContextProvider";
import DataSets from "./components/DataSets";
import InputSquares from "./components/InputSquares";
import MainButtonRow from "./components/MainButtonRow";
import MainGrid from "./components/MainGrid";
import Options from "./components/Options";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-600">
      <DataContextProvider>
        <h1 className=" w-fit text-3xl font-bold mx-auto text-gray-50 my-3">
          Sudoku Solver
        </h1>

        <main className="w-fit mx-auto flex-grow">
          <MainGrid />
          <div className="my-4 w-fit mx-auto">
            <InputSquares />
          </div>
          <div className="my-4 w-fit mx-auto">
            <MainButtonRow />
          </div>
          <div className="my-4">
            <DataSets />
          </div>
          <Options />
        </main>
        <Toaster />
      </DataContextProvider>

      <footer className="mt-20 mb-10 px-4 text-center text-gray-50">
        <small className="mb-2 block text-xs">
          &copy; 2024 Eddie Tseng. All rights reserved.{" "}
          <a
            className="underline"
            href="https://github.com/etseng02/sudoku-v3"
            target="_blank"
          >
            Github
          </a>
        </small>
        <p className="text-xs">
          <span className="font-semibold">About this website:</span> built with
          React & Vite, TypeScript, Tailwind CSS, Vitest, Testing Library,
          Vercel hosting.{" "}
        </p>
      </footer>
    </div>
  );
};

export default App;
