import React from "react";
import CardWithTitle from "../../../../components/cards/cardWithTitle/cardWithTitle";
import Input from "../../../../components/input/input";
import Buttons from "../../../../components/buttons/button";
import RecentCheckIn from "../../../../components/cards/Profilecard/recentCheckIn";
import checkInData from "../../../../utils/checkInData";

const AddSecurityRoles = () => {
  return (
    <>
      {/* <div>
        <ManageEmployee />
      </div> */}
      <div className="p-3">
        <span className="font-bold text-xl text-900 ">Add Security Roles</span>
        <div className="mt-2">
          <CardWithTitle title="General">
            <div className="p-2 flex">
              <div className="col-3">
                <Input title="Name"></Input>
              </div>
              <div className="col-9">
                <Input title="Description"></Input>
              </div>
            </div>
          </CardWithTitle>
        </div>
        <div>
          <div className="my-3">
            <CardWithTitle title="Add Employee">
              <div className=" p-4 btn-lightest-blue">
                <div className="ml-4 mb-2">
                  <span className="text-sm ">Name</span>
                </div>

                <div className="bg-white col-12 border-round-md ">
                  <div
                    className="flex justify-content-between align-items-center "
                    style={{ height: "190px" }}
                  >
                    <div className="">
                      <span className=""></span>
                    </div>
                    <div className="flex align-content-center justify-content-center">
                      <div className="text-xs font-semibold">None Found</div>
                    </div>
                    <div className="col-2 ">
                      <div className="col">
                        <Buttons
                          label="Add"
                          className="btn-dark border-none p-3 "
                        ></Buttons>
                      </div>

                      <div className="col">
                        <Buttons
                          label="RemoveAll"
                          className="btn-dark border-none p-3"
                        ></Buttons>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardWithTitle>
          </div>
          <div>
            <CardWithTitle title="Permissions">
              <div className=" p-4 btn-lightest-blue">
                <div className="ml-4 mb-2">
                  <span className="text-sm ">Name</span>
                </div>

                <div className="bg-white col-12 border-round-md ">
                  <div
                    className="flex justify-content-between align-items-center "
                    style={{ height: "190px" }}
                  >
                    <div className="">
                      <span className=""></span>
                    </div>
                    <div className="flex align-content-center justify-content-center">
                      <div className="text-xs font-semibold">None Found</div>
                    </div>
                    <div className="col-2 ">
                      <div className="col">
                        <Buttons
                          label="Add"
                          className="btn-dark border-none p-3 "
                        ></Buttons>
                      </div>

                      <div className="col">
                        <Buttons
                          label="RemoveAll"
                          className="btn-dark border-none p-3"
                        ></Buttons>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardWithTitle>
          </div>
        </div>
      </div>
      <div className="flex justify-content-end">
        <div className=" col-2  flex">
          <div className="col ">
            <Buttons label="Save" className="btn-dark p-3 border-none " />
          </div>
          <div className="col ">
            <Buttons label="Cancel" className="btn-grey p-3 border-none " />
          </div>
        </div>
      </div>
      <div className="p-3">
        <RecentCheckIn data={checkInData} />
      </div>
    </>
  );
};

export default AddSecurityRoles;
