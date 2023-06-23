import React from "react";
import Checkbox from "../../checkbox/checkbox";

const CardWithTitle = ({ titlee, title, children, title2, title3 }) => {
  return (
    <>
      <div>
        <div className="btn-dark  p-3 border-round">
          <div className="flex justify-content-between">
            <div>
              {title ? (
                <span className="text-xl">{title}</span>
              ) : (
                <Checkbox title={titlee}></Checkbox>
              )}
            </div>
            <span className="text-xl">{title2}</span>
            <span className="text-xl">{title3}</span>
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
