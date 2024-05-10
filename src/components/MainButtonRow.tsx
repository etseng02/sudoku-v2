import React from "react";

import SolveButton from "./SolveButton";
import ResetButton from "./ResetButton";

const MainButtonRow: React.FC = () => {
  return (
    <section className="flex gap-4">
      <SolveButton />
      <ResetButton />
    </section>
  );
};

export default MainButtonRow;
