import React from "react";
import TableData from "../../../components/cards/dataTable/dataTable";

const Clubs = () => {
  const ClubsColumns = [
    {
      name: "",
      address: "",
    },
  ];
  return (
    <>
      <div>
        <TableData data={ClubsColumnData} columns={ClubsColumns}></TableData>
      </div>
    </>
  );
};

export default Clubs;
