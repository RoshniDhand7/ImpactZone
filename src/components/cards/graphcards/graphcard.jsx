import React from "react";

const Graphcard = ({ children }) => {
  return (
    <div className="graphcard p-2">
      <div></div>
      <div id="chart">{children}</div>
    </div>
  );
};

export default Graphcard;
