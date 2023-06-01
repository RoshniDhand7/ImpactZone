import React, { useState } from "react";
import DropDown from "../../../../../../components/dropdown/dropdown";
import dummyData from "../../../../../../utils/dummyData";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Buttons from "../../../../../../components/buttons/button";
import RecentCheckIn from "../../../../../../components/cards/Profilecard/recentCheckIn";
import checkInData from "../../../../../../utils/checkInData";

const SubstituteOption = () => {
  const { relationshipData } = dummyData();
  const [selectedPos, setSelectedPos] = useState(null);
  return (
    <>
      <div>
        <div className="col-2 mb-3">
          <DropDown title="Similar To"></DropDown>
        </div>
        <div>
          <div className=" ">
            <DataTable
              value={relationshipData}
              selection={selectedPos}
              onSelectionChange={(e) => setSelectedPos(e.value)}
              dataKey="id"
              tableStyle={{ minWidth: "50rem" }}
            >
              <Column
                selectionMode="multiple"
                headerStyle={{ width: "3rem" }}
              ></Column>
              <Column field="code" header="Name"></Column>
              <Column field="name" header="Priority"></Column>
              <Column field="category" header=""></Column>
            </DataTable>
            {/* <div className="p-3 flex justify-content-end">
              <button className=" px-2 p-2 border-round font-semibold bg-white  ">
                <i className="pi pi-shopping-cart mr-2"></i>Buy
              </button>
            </div> */}
          </div>
        </div>
        <div className="flex justify-content-end p-2 ">
          <div className=" mt-3 flex  ">
            <div className=" mx-4">
              <Buttons
                label="Save"
                className="btn-dark mx-3 border-none"
              ></Buttons>
            </div>
            <div className="">
              <Buttons
                label="Cancel"
                className="btn-grey   border-none"
              ></Buttons>
            </div>
          </div>
        </div>
      </div>
      <div>
        <RecentCheckIn data={checkInData} />
      </div>
    </>
  );
};

export default SubstituteOption;
