import React from "react";
import Input from "../input/input";

const Search = ({ placeholder }) => {
  return (
    <>
      <div class="container">
        <form>
          <Input type="search" placeholder={placeholder} />
        </form>
      </div>
    </>
  );
};

export default Search;
