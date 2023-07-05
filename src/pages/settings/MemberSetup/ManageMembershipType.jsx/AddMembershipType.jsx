import React from "react";
import Checkbox from "../../../../components/checkbox/checkbox";
import CardWithTitle from "../../../../components/cards/cardWithTitle/cardWithTitle";
import Input from "../../../../components/input/input";
import DropDown from "../../../../components/dropdown/dropdown";
import itemsbackword from "../../../../assets/icons/itembackward.png";
import { InputTextarea } from "primereact/inputtextarea";
import Buttons from "../../../../components/buttons/button";
import RecentCheckIn from "../../../../components/cards/Profilecard/recentCheckIn";
import checkInData from "../../../../utils/checkInData";
import { PickList } from "primereact/picklist";

const AddMembershipType = ({ showAddMemebershipTypeScreen }) => {
  const itemTemplate = (item) => {
    return (
      <div className="flex flex-wrap p-2 align-items-center gap-3">
        <img
          className="w-4rem shadow-2 flex-shrink-0 border-round"
          src={itemsbackword}
          alt={item.name}
        />
        <div className="flex-1 flex flex-column gap-2">
          <span className="font-bold">{item.name}</span>
          <div className="flex align-items-center gap-2">
            <i className="pi pi-tag text-sm"></i>
            <span>{item.category}</span>
          </div>
        </div>
        <span className="font-bold text-900">${item.price}</span>
      </div>
    );
  };
  return (
    <>
      <div>
        <div className="my-3">
          <span className="text-xl font-bold text-900 ">
            Add Membership Type
          </span>
        </div>
        <div className="">
          <Checkbox
            title="Active"
            className="text-900 font-semibold"
          ></Checkbox>
        </div>
        <div className="mt-3">
          <CardWithTitle title="General ">
            <div className=" p-3">
              <div className="flex ">
                <div className="col">
                  <Input title="Name"></Input>
                </div>
                <div className="col">
                  <Input title="Description"></Input>
                </div>
                <div className="col">
                  <DropDown title="Discount Type" options=""></DropDown>
                </div>
              </div>
              <div className="flex my-3">
                <div className="col">
                  <DropDown title="Access Restriction"></DropDown>
                </div>
                <div className="col">
                  <DropDown title="Allow Remote CheckIn"></DropDown>
                </div>
                <div className="col">
                  <DropDown title="Avaliable Types" options=""></DropDown>
                </div>
              </div>
              <div className="flex ">
                <div className="col">
                  <DropDown title="Available Types"></DropDown>
                </div>
                <div className="col">
                  <Input title="Club Credit Amount"></Input>
                </div>
                <div className="col-4">
                  <DropDown title="Special Restriction"></DropDown>
                </div>
                {/* <div className="col">
                  <DropDown title="Avaliable Types" options=""></DropDown>
                </div> */}
              </div>
              <div>
                <div className=" flex my-3 ">
                  <div className="col-4">
                    <Input title="Maximum Distance Allowed"></Input>
                  </div>
                </div>
              </div>
            </div>
          </CardWithTitle>
        </div>
        <div className="my-3">
          <CardWithTitle title="Clubs">
            <div className="card p-3 ">
              <PickList
                // source={source}
                // target={target}
                // onChange={onChange}
                itemTemplate={itemTemplate}
                breakpoint=""
                sourceHeader="Available"
                targetHeader="Selected"
                sourceStyle={{ height: "10rem" }}
                targetStyle={{ height: "10rem" }}
              />
            </div>
          </CardWithTitle>
        </div>
        <div className="my-2">
          <div className=" p-2 mt-4 bg-lightest-blue border-round-md shadow-3">
            <span>
              <i
                className="pi pi-info-circle  mx-3"
                style={{ color: " rgba(50, 155, 234, 1)" }}
              ></i>
            </span>
            <span
              className="mx-3  "
              style={{ color: " rgba(50, 155, 234, 1)" }}
            >
              To inactivate Membership Type move all the clubs to ‘Available’
              section.
            </span>
          </div>
        </div>
        <div className="mt-3">
          <CardWithTitle title="Add Services">
            <div className=" p-4 btn-lightest-blue">
              <div className="ml-4 mb-2">
                <span className="text-xs font-semibold  text-dark-gray">
                  Name
                </span>
              </div>

              <div className="bg-white col-12 border-round-md ">
                <div
                  className="flex justify-content-between  "
                  style={{ height: "190px" }}
                >
                  {/* <div className="">
                    <span className=""></span>
                  </div> */}
                  <div className="flex justify-content-center   w-5  ">
                    {/* <div className="text-xs flex flex-column justify-content-start font-semibold  w-12">
                      <table style={{ width: "100%", textAlign: "top" }}>
                        {selectedEmployees.length ? (
                          selectedEmployees?.map((emp, index) => {
                            return (
                              <tr>
                                <td>{index + 1}</td>
                                <td>{emp.firstName + " " + emp.lastName}</td>
                              </tr>
                            );
                          })
                        ) : (
                          <>
                            <div className="mt-6">
                              <div
                                style={{ height: "auto" }}
                                className="flex  align-items-center  mt-6  justify-content-center"
                              >
                                None Found
                              </div>
                            </div>
                          </>
                        )}
                      </table>
                    </div> */}
                    <div className="mt-6">
                      <div
                        style={{ height: "auto" }}
                        className="flex  align-items-center text-xs font-semibold  mt-6  justify-content-center"
                      >
                        None Found
                      </div>
                    </div>
                  </div>
                  <div className=" flex flex-column  justify-content-center mx-3 ">
                    <div className=" ">
                      <Buttons
                        // onClick={setShowDepartmentTable}
                        label="Add"
                        className="btn-dark border-none  "
                      ></Buttons>
                    </div>

                    <div className="mt-3">
                      <Buttons
                        label="Remove All"
                        className="btn-dark border-none "
                        // onClick={() => {
                        //   setSelectedEmployees([]);
                        //   setPayload({ ...payload, employees: [] });
                        // }}
                      ></Buttons>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardWithTitle>
        </div>
        <div className=" m-2 mt-3 flex justify-content-end">
          <div className="">
            <Buttons label="Copy" className="btn-dark border-none"></Buttons>
          </div>
          <div className="mx-3">
            <Buttons label="Save" className="btn-dark border-none"></Buttons>
          </div>
          <div className="">
            <Buttons
              onClick={showAddMemebershipTypeScreen}
              label="Cancel"
              className="btn-grey   border-none"
            ></Buttons>
          </div>
        </div>
      </div>
      <div>
        <RecentCheckIn data={checkInData}></RecentCheckIn>
      </div>
    </>
  );
};

export default AddMembershipType;
