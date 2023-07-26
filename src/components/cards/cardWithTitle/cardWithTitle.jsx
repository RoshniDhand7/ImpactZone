import React from "react";
import Checkbox from "../../checkbox/checkbox";

const CardWithTitle = ({
  titlee,
  title,
  children,
  title2,
  title3,
  title4,
  extraclassName,
  title2className,
}) => {
  return (
    <>
      <div>
        <div className="btn-dark  p-3 border-round shadow-2">
          <div className={`flex justify-content-between ${extraclassName}`}>
            <div className="">
              {title ? (
                <span className="text-xl">{title}</span>
              ) : (
                <Checkbox title={titlee}></Checkbox>
              )}
            </div>
            <span className={`text-xl ${title2className}`}>{title2}</span>
            <span className="text-xl">{title3}</span>
            {title4 ? <span>{title4}</span> : ""}
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
