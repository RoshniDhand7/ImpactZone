import React, { useState } from "react";
import DropDown from "../../../components/dropdown/dropdown";
import Buttons from "../../../components/buttons/button";
import TableData from "../../../components/cards/dataTable/dataTable";
import RecentCheckIn from "../../../components/cards/Profilecard/recentCheckIn";
import checkInData from "../../../utils/checkInData";
import Checkbox from "../../../components/checkbox/checkbox";
import CardWithTitle from "../../../components/cards/cardWithTitle/cardWithTitle";
import Input from "../../../components/input/input";
import Index from ".";
import { booleanToString } from "../../../utils/javascript";
import DeleteDailog from "../../../components/popup/deleteDailog";
import { deleteLocationType } from "../../../redux/actions/locationsActions";
import CustomTextarea from "../../../components/input/InputTextArea";

const ProfileTypes = () => {
  const [showAddProfileType, setShowAddProfileType] = useState();
  const actionTemplate = (col) => {
    // console.log(col._id, "collllll");
    return (
      <>
        <div className="flex justify-content-end">
          <span>
            <i className="pi pi-pencil mr-3 cursor-pointer"></i>
          </span>
          <span>
            <i className="pi pi-trash cursor-pointer"></i>
          </span>
        </div>
      </>
    );
  };

  const ProfileTypesColumn = [
    {
      field: "ProfitCenterName",
      header: "Profit Center Name",
      id: "",
      index: "",
    },
    {
      field: "Description",
      header: "Description",
      id: "",
      index: "",
    },
    {
      field: "CatalogItemsAssigned",
      header: "Catalog Items Assigned",
      id: "",
      index: "",
    },
    {
      field: "GLCode",
      header: "GL Code",
      id: "",
      index: "",
    },
    {
      field: "",
      header: "",
      id: "",
      body: actionTemplate,
    },
  ];
  const [ProfileTypesData, setProfileTypesData] = useState([
    {
      ProfitCenterName: "Annual Fee",
      Description: "Annual Fee",
      CatalogItemsAssigned: "$49.99",
      GLCode: "Premium",
    },
    {
      ProfitCenterName: "Late Fee",
      Description: "-",
      CatalogItemsAssigned: "$49.99",
      GLCode: "Premium",
    },
    {
      ProfitCenterName: "Decline Fee",
      Description: "-",
      CatalogItemsAssigned: "$49.99",
      GLCode: "Premium",
    },
    {
      ProfitCenterName: "No Show Fee",
      Description: "GymAccess",
      CatalogItemsAssigned: "$49.99",
      GLCode: "Premium",
    },
    {
      ProfitCenterName: "Freeze Fee",
      Description: "Unassigned",
      CatalogItemsAssigned: "$49.99",
      GLCode: "Premium",
    },
  ]);

  const AddProfileType = () => {
    return (
      <>
        <div>
          <div className="my-3">
            <Checkbox
              title="Active"
              className="text-900 text-sm font-semibold"
              name="isActive"
            ></Checkbox>
          </div>
          <div>
            <CardWithTitle title="General">
              <div className="flex p-2">
                <div className="col-4 ">
                  <Input title="Name" name="name"></Input>
                </div>
                <div className="col-4 ">
                  <Input title="GL Code" name="name"></Input>
                </div>
                <div className="col-4">
                  <DropDown
                    title="Available Profit Center"
                    name="Available Profit Center"
                    placeholder="Select one"
                    options={["Yes", "No"]}
                  ></DropDown>
                </div>
              </div>
              <div className="flex p-2">
                <div className="col-4 ">
                  <DropDown
                    title="Available Profit Center"
                    name="Available Profit Center"
                    placeholder="Select one"
                    options={["Yes", "No"]}
                  ></DropDown>
                </div>
              </div>
              <div className="flex p-2">
                <div className="col-12 ">
                  <CustomTextarea
                    classNames="w-full"
                    rows="5"
                    label="Description (256/256)"
                  />
                </div>
              </div>
            </CardWithTitle>
          </div>
          <div className="my-3">
            <CardWithTitle title="Catalog Items">
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
                    <div className="flex justify-content-center   w-7  ">
                      <div className="text-xs flex flex-column justify-content-start font-semibold  w-12">
                        <table style={{ width: "100%", textAlign: "top" }}>
                          <>
                            <div className="mt-6">
                              <div
                                style={{ height: "auto" }}
                                className="flex  align-items-center  mt-8  justify-content-center"
                              >
                                None Found
                              </div>
                            </div>
                          </>
                        </table>
                      </div>
                    </div>
                    <div className=" flex flex-column  justify-content-center mx-3 ">
                      <div className="mx-3 ">
                        <Buttons
                          label="Add"
                          className="btn-dark border-none mx-3  "
                        ></Buttons>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardWithTitle>
          </div>
        </div>
        <div>
          <div>
            <CardWithTitle title="Data Export">
              <div className="flex p-2">
                <div className="col-4 mx-3">
                  <Input title="Profile Center Code" name="name"></Input>
                </div>
                <div className="col-4">
                  <Input title="Earnings Code" name="name"></Input>
                </div>
              </div>
            </CardWithTitle>
          </div>
          <div className=" m-2 mt-3 flex justify-content-end">
            <div className="mx-4">
              <Buttons
                label="Save"
                className="btn-dark  mx-3  border-none"
              ></Buttons>
            </div>
            <div className="">
              <Buttons
                onClick={() => setShowAddProfileType(false)}
                label="Cancel"
                className="btn-grey   border-none"
              ></Buttons>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      {showAddProfileType ? (
        AddProfileType()
      ) : (
        <>
          <div>
            <div className="bg-lightest-blue border-round-lg py-2 px-3 flex justify-content-between align-items-center ">
              <div className="col-2 ">
                <DropDown title="Status" placeholder={"Active"}></DropDown>
              </div>
              <div className="mr-3">
                <div className="">
                  <Buttons
                    onClick={() => {
                      setShowAddProfileType(true);
                    }}
                    label="Add Profit Center"
                    icon="pi pi-plus-circle"
                    className="btn-dark border-none  "
                    style={{ height: "36px", top: "10px" }}
                  ></Buttons>
                </div>
              </div>
            </div>
            <div className="mt-2">
              <TableData
                data={ProfileTypesData}
                columns={ProfileTypesColumn}
              ></TableData>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProfileTypes;
