import React from "react";

export const Card = ({ children }) => {
  return (
    <div className=" shadow-2  btn-lightblue border-round  p-2 ">
      <div className="p-2 ">{children}</div>
    </div>
  );
};
