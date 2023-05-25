import React, { useState } from "react";
import Divide from "../../../../../../assets/icons/box.png";
import DropDown from "../../../../../../components/dropdown/dropdown";
import CardWithTitle from "../../../../../../components/cards/cardWithTitle/cardWithTitle";
import Input from "../../../../../../components/input/input";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import dummyData from "../../../../../../utils/dummyData";
import Buttons from "../../../../../../components/buttons/button";
import RecentCheckIn from "../../../../../../components/cards/Profilecard/recentCheckIn";
import checkInData from "../../../../../../utils/checkInData";

const ServicePay = () => {
  const { relationshipData } = dummyData();
  const [selectedPos, setSelectedPos] = useState(null);
  return (
    <>
      <div>
        <div className="col-2 mb-2">
          <DropDown title="Similar To"></DropDown>
        </div>
        <div>
          <CardWithTitle title="General">
            <div className="p-3 flex">
              <div className="col-2">
                <DropDown title="Class Level"></DropDown>
              </div>
              <div className="col-2">
                <Input title="Class Level"></Input>
              </div>

              <div
                style={{ width: "18px", height: "20px" }}
                className="flex align-items-center mt-5  "
              >
                <span className="mt-2">$</span>
                <img src={Divide} alt="" className="mx-2 mt-2 " />
              </div>
            </div>
          </CardWithTitle>
        </div>
        <div className="my-2">
          <span className="font-bold text-900 text-xl ">Commission Setups</span>
          <div className="col-2 my-2">
            <DropDown title="Event"></DropDown>
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
                <Column field="name" header="Category"></Column>
                <Column field="category" header="Price"></Column>
              </DataTable>

              <div className="flex justify-content-end pt-2 ">
                <div className="col-2 flex  ">
                  <Buttons
                    label="Save"
                    className="btn-dark p-3  mx-2  border-none"
                  ></Buttons>

                  <Buttons
                    label="Cancel"
                    className="btn-grey border-none"
                  ></Buttons>
                </div>
              </div>
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
export default ServicePay;
