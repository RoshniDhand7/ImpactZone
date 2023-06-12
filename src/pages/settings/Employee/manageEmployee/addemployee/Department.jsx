import React from "react";
import CardWithTitle from "../../../../../components/cards/cardWithTitle/cardWithTitle";
import Input from "../../../../../components/input/input";
import Buttons from "../../../../../components/buttons/button";
import Add from "../../../../../assets/icons/Add.png";
import Remove from "../../../../../assets/icons/remove.png";
import RecentCheckIn from "../../../../../components/cards/Profilecard/recentCheckIn";
import checkInData from "../../../../../utils/checkInData";

const Department = () => {
  return (
    <>
      <div>
        <div>
          <CardWithTitle title="General">
            <div className="flex p-3">
              <div>
                <Input title="Default Hourly Wages" placeholder="$0.00"></Input>
              </div>
              <div className=" flex align-items-center px-3">
                <Buttons
                  label="Copy to All"
                  className="btn-dark border-none mx-4  "
                  style={{ height: "36px", top: "10px" }}
                ></Buttons>
              </div>
            </div>
          </CardWithTitle>
        </div>
        <div className="mt-3">
          <CardWithTitle title="Deparments">
            <div>
              <div className="p-3">
                <div className="flex justify-content-between px-3 p-3">
                  <div className="text-xs font-semibold text-dark-gray">
                    Name
                  </div>
                  <div className="text-blue text-xs font-semibold">Add All</div>
                </div>
                <div className=" justify-content-between bg-white p-3 border-round-md">
                  <div className="text-xs text-gray-400 flex justify-content-between p-3">
                    <div className="text-xs  ">Front Desk</div>
                    <div className="text-xs">
                      <div
                        className=""
                        style={{ width: "15px", height: "15px" }}
                      >
                        <img src={Add} alt="" />
                      </div>
                    </div>
                  </div>
                  <hr className="hrtagstyle" />
                  <div className="text-xs  text-gray-400 flex justify-content-between p-3">
                    <div className="text-xs  ">Front Desk</div>
                    <div className="text-xs">
                      <div
                        className=""
                        style={{ width: "15px", height: "15px" }}
                      >
                        <img src={Add} alt="" />
                      </div>
                    </div>
                  </div>
                  <hr className="hrtagstyle" />
                  <div className="text-xs text-gray-400 flex justify-content-between p-3">
                    <div className="text-xs  ">Front Desk</div>
                    <div className="text-xs">
                      <div
                        className=""
                        style={{ width: "15px", height: "15px" }}
                      >
                        <img src={Add} alt="" />
                      </div>
                    </div>
                  </div>
                  <hr className="hrtagstyle" />
                  <div className="text-xs text-gray-400 flex justify-content-between p-3">
                    <div className="text-xs  ">Front Desk</div>
                    <div className="text-xs">
                      <div
                        className=""
                        style={{ width: "15px", height: "15px" }}
                      >
                        <img src={Add} alt="" />
                      </div>
                    </div>
                  </div>
                  <hr className="hrtagstyle" />
                  <div className="text-xs text-gray-400 flex justify-content-between p-3">
                    <div className="text-xs  ">Instructors</div>
                    <div className="text-xs">
                      <div
                        className=""
                        style={{ width: "15px", height: "15px" }}
                      >
                        <img src={Add} alt="" />
                      </div>
                    </div>
                  </div>
                  <hr className="hrtagstyle" />
                  <div className="text-xs text-gray-400 flex justify-content-between p-3">
                    <div className="text-xs  ">Maintenance</div>
                    <div className="text-xs">
                      <div
                        className=""
                        style={{ width: "15px", height: "15px" }}
                      >
                        <img src={Add} alt="" />
                      </div>
                    </div>
                  </div>
                  <hr className="hrtagstyle" />
                  <div className="text-xs text-gray-400 flex justify-content-between p-3">
                    <div className="text-xs  ">Management</div>
                    <div className="text-xs">
                      <div
                        className=""
                        style={{ width: "15px", height: "15px" }}
                      >
                        <img src={Add} alt="" />
                      </div>
                    </div>
                  </div>
                  <hr className="hrtagstyle" />
                  <div className="text-xs text-gray-400 flex justify-content-between p-3">
                    <div className="text-xs  ">Sales</div>
                    <div className="text-xs">
                      <div
                        className=""
                        style={{ width: "15px", height: "15px" }}
                      >
                        <img src={Add} alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-3">
                <div className="flex justify-content-between px-3 p-3">
                  <div className="text-xs  font-semibold text-dark-gray ">
                    Name
                  </div>
                  <div className=" font-semibold  text-xs text-dark-gray">
                    Wages
                  </div>
                  <div className="text-blue  font-semibold  text-xs ">
                    Remove All
                  </div>
                </div>
                <div className="text-sm">
                  <div className="bg-white text-sm border-round-md ">
                    <div className="flex p-3 text-sm justify-content-between ">
                      <div className="pt-3">
                        <span className="text-xs text-gray-300 ">Trainers</span>
                      </div>
                      <div>
                        <div className="col-5 ml-8 -m-3 text-center flex justify-content-center">
                          <div className="flex  justify-content-center">
                            <Input placeholder="$0.00"></Input>
                          </div>
                        </div>
                      </div>
                      <div className=" pt-3 flex justify-content-end">
                        <div
                          style={{
                            width: "15px",
                            height: "15px",
                          }}
                        >
                          <img src={Remove} alt="" />
                        </div>
                      </div>
                    </div>
                    <hr className="hrtagstyle" />
                    <div className="flex p-5 text-sm justify-content-between"></div>
                  </div>
                </div>
              </div>
            </div>
          </CardWithTitle>
        </div>
      </div>
      <div className="flex justify-content-end p-3 ">
        <div className=" mt-3 flex  ">
          <div className="mx-4">
            <Buttons
              label="Save"
              className="btn-dark mx-3 border-none"
            ></Buttons>
          </div>
          <div className=" ">
            <Buttons
              label="Cancel"
              className="btn-grey   border-none"
            ></Buttons>
          </div>
        </div>
      </div>
      <div>
        <RecentCheckIn data={checkInData} />
      </div>
    </>
  );
};

export default Department;
