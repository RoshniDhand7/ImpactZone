import React from "react";

const CardWithTitle = ({ title, children, title2, title3, title4, title5 }) => {
  return (
    <>
      <div>
        <div className="btn-dark  p-3 border-round">
          <div className="flex justify-content-between">
            <h4>{title}</h4>
            <h4>{title2}</h4>
            <h4>{title3}</h4>
            {/* <h4>{title4}</h4>
            <h4>{title5}</h4> */}
          </div>
        </div>
        <div className="shadow-4  mt-2 btn-lightblue bg-black border-round ">
          {children}
        </div>
      </div>
    </>
  );
};

export default CardWithTitle;
