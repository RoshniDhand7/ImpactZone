import React from "react";
import CardWithTitle from "../../../../components/cards/cardWithTitle/cardWithTitle";
import DropDown from "../../../../components/dropdown/dropdown";
import Input from "../../../../components/input/input";
import Buttons from "../../../../components/buttons/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import dummyData from "../../../../utils/dummyData";
import { useState } from "react";
import RecentCheckIn from "../../../../components/cards/Profilecard/recentCheckIn";
import checkInData from "../../../../utils/checkInData";

const TimeSheets = () => {
  const { TimeSheetsData } = dummyData();
  const [selectedPos, setSelectedPos] = useState(null);
  return (
    <>
      <div>
        <div className="p-0">
          <div className=" px-0 flex justify-content-between">
            <div className="col-6   ">
              <CardWithTitle title="General">
                <div className=" flex p-3">
                  <div className="col-6">
                    <DropDown title="Club" placeholder="club 30591"></DropDown>
                  </div>
                  <div className="col-6">
                    <DropDown title="Deparment" placeholder="All"></DropDown>
                  </div>
                </div>
              </CardWithTitle>
            </div>
            <div className="col-6 ">
              <CardWithTitle title="Clock In Date">
                <div className="flex p-3">
                  <div className="col-6">
                    <Input title="From" type="date"></Input>
                  </div>
                  <div className="col-6">
                    <Input
                      title="To"
                      type="date"
                      placeholder="03/27/2023"
                    ></Input>
                  </div>
                </div>
              </CardWithTitle>
            </div>
          </div>
        </div>
        <div className=" flex justify-content-end">
          <div className="col-2">
            <Buttons
              label="Search"
              className="btn-dark border-none p-3"
            ></Buttons>
          </div>
        </div>
      </div>
      <div>
        <div className="mt-3 ">
          <DataTable
            value={TimeSheetsData}
            selection={selectedPos}
            onSelectionChange={(e) => setSelectedPos(e.value)}
            dataKey="id"
            tableStyle={{ minWidth: "50rem" }}
          >
            {/* <Column
              selectionMode="multiple"
              headerStyle={{ width: "3rem" }}
            ></Column> */}
            <Column field="club" header="Club"></Column>
            <Column field="employee" header="Employee Name"></Column>
            <Column field="department" header="Department"></Column>
            <Column field="date" header="Date"></Column>
            <Column field="clockin" header="Clock In"></Column>
            <Column field="clockout" header="Clock Out"></Column>
            <Column field="duration" header="Duration"></Column>
            <Column field="modifiedon" header="Modified On"></Column>
          </DataTable>
        </div>
      </div>
      <div className="mt-5">
        <div>
          <RecentCheckIn data={checkInData} />
        </div>
      </div>
    </>
  );
};
export default TimeSheets;
