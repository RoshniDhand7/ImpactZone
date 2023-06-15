import React from "react";
import TableData from "../../../components/cards/dataTable/dataTable";
import RecentCheckIn from "../../../components/cards/Profilecard/recentCheckIn";
import checkInData from "../../../utils/checkInData";

const Clubs = () => {
  const ClubsColumns = [
    {
      field: "name",
      header: "Name",
    },
    {
      field: "address",
      header: "Address",
    },
  ];
  const ClubsColumnData = [
    {
      name: "ABC Employee",
      address: "New Jersey",
    },
  ];
  return (
    <>
      <div>
        <TableData data={ClubsColumnData} columns={ClubsColumns}></TableData>
      </div>
      <div className="mt-5">
        <RecentCheckIn data={checkInData}></RecentCheckIn>
      </div>
    </>
  );
};

export default Clubs;
