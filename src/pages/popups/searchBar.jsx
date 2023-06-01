import React from "react";
import Input from "../../components/input/input";

const searchBar = () => {
  return (
    <>
      <div className="">
        <div className=" mt-2 flex flex-column gap-2">
          {/* <label className="text-xs text-dark-gray   font-semibold">
            Employee Search
          </label> */}
          <span className="p-input-icon-right">
            <i className="pi pi-search" />
            <Input icon="pi pi-search" placeholder="Search" />
          </span>
        </div>
      </div>
      <div className=" flex justify-content-end">
        <span className="text-sm text-blue mt-2 cursor-pointer">
          Advanced Search
        </span>
      </div>
    </>
  );
};

export default searchBar;
