import React from "react";
import Remove from "../../../../../../assets/icons/remove.png";
import Buttons from "../../../../../../components/buttons/button";
import CardWithTitle from "../../../../../../components/cards/cardWithTitle/cardWithTitle";
import DropDown from "../../../../../../components/dropdown/dropdown";
import RecentCheckIn from "../../../../../../components/cards/Profilecard/recentCheckIn";
import checkInData from "../../../../../../utils/checkInData";

const CalendarDefacult = () => {
  return (
    <>
      <div>
        <div className="">
          <div className="flex">
            <div className="mb-3 col-3 flex">
              <DropDown title="Event" placeholder="Selected Event"></DropDown>
            </div>
            <div className="mb-3 col-3 flex">
              <DropDown
                title="Similar To"
                placeholder="Select Employee"
              ></DropDown>
            </div>
          </div>
          <CardWithTitle title="Deparments" title2="Event Type">
            <div>
              <div className="p-3">
                {/* <div className="flex justify-content-between p-3">
                  <div className="text-xs">Name</div>
                  <div className="text-xs">Event Type</div>
                  <div className="text-blue text-xs">Add All</div>
                </div> */}
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
          </CardWithTitle>
        </div>
      </div>
      <div className="flex justify-content-end p-2 ">
        <div className=" mt-3 flex  ">
          <div className="">
            <Buttons
              label="Save"
              className="btn-dark p-3 px-4  border-none"
            ></Buttons>
          </div>
          <div className="ml-3 ">
            <Buttons
              label="Cancel"
              className="btn-grey p-3   border-none"
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
