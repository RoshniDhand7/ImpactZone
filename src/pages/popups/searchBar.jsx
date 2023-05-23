import React from "react";
import Search from "../../components/search/search";

const searchBar = () => {
  return (
    <>
      <div className="mx-6">
        <Search placeholder="Search by Member"></Search>
        <div className=" flex justify-content-end p-3">
          <span className="text-sm text-blue-500 cursor-pointer">
            Advanced Search
          </span>
        </div>
      </div>
    </>
  );
};

export default searchBar;
