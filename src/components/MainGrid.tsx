import { useContext } from "react";
import { DataContext, blockIdsType } from "./DataContextProvider";
import SquareBlock from "./SquareBlock";

const MainGrid = () => {
  const data = useContext(DataContext);

  const { blocks } = data;

  return (
    <div className="grid grid-cols-[repeat(3,_200px)] grid-rows-[repeat(3,_200px)] ">
      {Object.keys(blocks).map((_, index) => {
        return (
          <SquareBlock
            blockId={`block${index + 1}` as blockIdsType}
            key={index}
          />
        );
      })}
    </div>
  );
};

export default MainGrid;
