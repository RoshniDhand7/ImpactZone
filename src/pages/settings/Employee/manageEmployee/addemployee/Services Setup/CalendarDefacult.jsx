import React from "react";
import Remove from "../../../../../../assets/icons/remove.png";
import Buttons from "../../../../../../components/buttons/button";
import CardWithTitle from "../../../../../../components/cards/cardWithTitle/cardWithTitle";
import DropDown from "../../../../../../components/dropdown/dropdown";
import RecentCheckIn from "../../../../../../components/cards/Profilecard/recentCheckIn";
import checkInData from "../../../../../../utils/checkInData";
import TableData from "../../../../../../components/cards/dataTable/dataTable";
import { useState } from "react";

const CalendarDefacult = () => {
  const actionTemplate = (col) => {
    return (
      <>
        <span>
          <i className="pi pi-minus-circle mr-3"></i>
        </span>
      </>
    );
  };

  const manageSecurity = [
    { field: "", header: "", id: "", index: "" },
    { field: "event", header: "Event", id: "", index: "" },
    { field: "eventType", header: "Event Type", id: "", index: "" },

    { field: "", header: "", body: actionTemplate, id: "", index: "" },
  ];

  const [manageSecurityData, setManagaEmplyoee] = useState([
    {
      event: "3D Body Scan",
      eventType: "30 min Private",
      id: 1,
    },
    {
      event: "Aga Group 30 Min",
      eventType: "60 min Private",
      id: 2,
    },
    {
      event: "Aga Group 45 Min",
      eventType: "30 min Public",
      id: 3,
    },
  ]);
  return (
    <>
      <div>
        <div className="">
          <div className="col-3 p-0 flex mb-3">
            <div className=" col flex">
              <DropDown title="Event" placeholder="Selected Event"></DropDown>
            </div>
            <div className=" col flex">
              <DropDown
                title="Similar To"
                placeholder="Select Employee"
              ></DropDown>
            </div>
          </div>
          <div className=" mt-2">
            <TableData
              columns={manageSecurity}
              data={manageSecurityData}
              // delRow={tableRowRemove}
            />
          </div>
          {/* <CardWithTitle title="Deparments" title2="Event Type">
            <div>
              <div className="p-3">
                
                <div className=" justify-content-between  p-3 border-round-md">
                  <div className="text-xs text-gray-400 flex justify-content-between p-2">
                    <div className="text-xs  ">Front Desk</div>
                    <div className="text-xs  ">60 min Private</div>
                    <div className="text-xs">
                      <div className="" style={{ width: "18px" }}>
                        <img src={Remove} alt="" />
                      </div>
                    </div>
                  </div>
                  <hr className="hrtagstyle" />
                  <div className="text-xs  text-gray-400 flex justify-content-between p-2">
                    <div className="text-xs  ">Front Desk</div>
                    <div className="text-xs  ">30 min Private</div>
                    <div className="text-xs">
                      <div className="" style={{ width: "18px" }}>
                        <img src={Remove} alt="" />
                      </div>
                    </div>
                  </div>
                  <hr className="hrtagstyle" />
                  <div className="text-xs text-gray-400 flex justify-content-between p-2">
                    <div className="text-xs  ">Front Desk</div>
                    <div className="text-xs  ">60 min Private</div>
                    <div className="text-xs">
                      <div className="" style={{ width: "18px" }}>
                        <img src={Remove} alt="" />
                      </div>
                    </div>
                  </div>
                  <hr className="hrtagstyle" />
                  <div className="text-xs text-gray-400 flex justify-content-between p-2">
                    <div className="text-xs  ">Front Desk</div>
                    <div className="text-xs  ">30 min Private</div>
                    <div className="text-xs">
                      <div className="" style={{ width: "18px" }}>
                        <img src={Remove} alt="" />
                      </div>
                    </div>
                  </div>
                  <hr className="hrtagstyle" />
                  <div className="text-xs text-gray-400 flex justify-content-between p-2">
                    <div className="text-xs  ">Instructors</div>
                    <div className="text-xs  ">60 min Private</div>
                    <div className="text-xs">
                      <div className="" style={{ width: "18px" }}>
                        <img src={Remove} alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardWithTitle> */}
        </div>
      </div>
      <div className="flex justify-content-end p-2 ">
        <div className=" mt-3 flex  ">
          <div className=" mx-4">
            <Buttons
              label="Save"
              className="btn-dark mx-3  border-none"
            ></Buttons>
          </div>
          <div className=" ">
            <Buttons
              label="Cancel"
              className="btn-grey    border-none"
            ></Buttons>
          </div>
        </div>
      </div>
      <div className="mt-3">
        <RecentCheckIn data={checkInData}></RecentCheckIn>
      </div>
    </>
  );
};

export default CalendarDefacult;
