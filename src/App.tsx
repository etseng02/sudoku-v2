import { DataContextProvider } from "./components/DataContextProvider";
import InputSquares from "./components/InputSquares";
import MainGrid from "./components/MainGrid";
import SolveButton from "./components/SolveButton";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen dark:bg-slate-600">
      <DataContextProvider>
        <h1 className=" w-fit text-3xl font-bold mx-auto dark:text-gray-50 my-3">
          Sudoku Solver
        </h1>

        <main className="w-fit mx-auto flex-grow">
          <MainGrid />
          <div className="my-4 w-fit mx-auto">
            <InputSquares />
          </div>
          <div className="my-4 w-fit mx-auto">
            <SolveButton />
          </div>
        </main>
      </DataContextProvider>

      <footer className="mt-20 mb-10 px-4 text-center text-gray-500 dark:text-gray-50">
        <small className="mb-2 block text-xs">
          &copy; 2024 Eddie Tseng. All rights reserved.
        </small>
        <p className="text-xs">
          <span className="font-semibold">About this website:</span> built with
          React & Vite, TypeScript, Tailwind CSS, Vitest, Testing Library,
          Vercel hosting.
        </p>
      </footer>
    </div>
  );
};

export default App;
