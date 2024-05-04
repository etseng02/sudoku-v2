import { DataContextProvider } from "./components/DataContextProvider";
import MainGrid from "./components/MainGrid";
import SolveButton from "./components/SolveButton";

const App = () => {
  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <DataContextProvider>
        <h1 className="text-3xl font-bold underline">Hello world!</h1>

        <main>
          <div className="max-w-[600px]">
            <MainGrid />
            <SolveButton />
          </div>
        </main>
      </DataContextProvider>
    </>
  );
};

export default App;
