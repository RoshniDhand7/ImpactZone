import React from "react";
import Search from "../../components/search/search";

const searchBar = () => {
  return (
    <>
      <div className="">
        <Search placeholder="Search by Member"></Search>
        <div className=" flex justify-content-end">
          <span className="text-sm text-blue mt-2 cursor-pointer">
            Advanced Search
          </span>
        </div>
      </div>
    </>
  );
};

export default searchBar;
