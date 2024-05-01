import { DataContextProvider } from "./components/DataContextProvider";
import MainGrid from "./components/MainGrid";

const App = () => {
  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <DataContextProvider>
        <h1 className="text-3xl font-bold underline">Hello world!</h1>

        <main>
          <div className="max-w-[600px]">
            <MainGrid />
          </div>
        </main>
      </DataContextProvider>
    </>
  );
};

export default App;
