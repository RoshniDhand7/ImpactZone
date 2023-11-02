import React, { useState } from "react";
import DropDown from "../../../components/dropdown/dropdown";
import Buttons from "../../../components/buttons/button";
import TableData from "../../../components/cards/dataTable/dataTable";
import Checkbox from "../../../components/checkbox/checkbox";
import CardWithTitle from "../../../components/cards/cardWithTitle/cardWithTitle";
import Input from "../../../components/input/input";
import CustomTextarea from "../../../components/input/InputTextArea";

const ReferralGroup = () => {
  const [showAddReferralGroup, setShowAddReferralGroup] = useState();
  const actionTemplate = (col) => {
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

  const ReferralGroupColumn = [
    {
      field: "Name",
      header: "Name",
      id: "",
      index: "",
    },
    {
      field: "Amount",
      header: "Amount",
      id: "",
      index: "",
    },
    {
      field: "No.ofCatalog Items",
      header: "No.ofCatalogItems",
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
  const [ReferralGroupData, setReferralGroupData] = useState([
    {
      Name: "Annual Fee",
      Description: "Annual Fee",
      CatalogItemsAssigned: "$49.99",
      GLCode: "Premium",
    },
    {
      Name: "Late Fee",
      Description: "-",
      CatalogItemsAssigned: "$49.99",
      GLCode: "Premium",
    },
    {
      Name: "Decline Fee",
      Description: "-",
      CatalogItemsAssigned: "$49.99",
      GLCode: "Premium",
    },
    {
      Name: "No Show Fee",
      Description: "GymAccess",
      CatalogItemsAssigned: "$49.99",
      GLCode: "Premium",
    },
    {
      Name: "Freeze Fee",
      Description: "Unassigned",
      CatalogItemsAssigned: "$49.99",
      GLCode: "Premium",
    },
  ]);

  const AddReferralGroup = () => {
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
            <CardWithTitle title="Add New Referral Group">
              <div className="flex p-2">
                <div className="col-4 ">
                  <Input title="Name" name="name"></Input>
                </div>
                <div className="col-4 flex  ">
                  <Input title="Amount" name="name"></Input>
                  <div className="flex mt-5">
                    <i className="pi pi-dollar text-sm mx-2"></i>
                    <i className="pi pi-percentage text-sm"></i>
                  </div>
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
                    <div className=" flex flex-column  justify-content-center mx-6 ">
                      <div className="">
                        <Buttons
                          label="Add"
                          className="btn-dark border-none"
                        ></Buttons>
                      </div>
                      <div className="">
                        <Buttons
                          label="Remove All"
                          className="btn-dark border-none"
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
          <div className=" m-2 mt-3 flex justify-content-end">
            <div className="mx-4">
              <Buttons
                label="Save"
                className="btn-dark  mx-3  border-none"
              ></Buttons>
            </div>
            <div className="">
              <Buttons
                onClick={() => setShowAddReferralGroup(false)}
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
      {showAddReferralGroup ? (
        AddReferralGroup()
      ) : (
        <>
          <div>
            <div className="bg-lightest-blue border-round-lg py-2 px-3 flex justify-content-between align-items-center ">
              <div className="col-2 ">
                <DropDown title="Status" placeholder={"Active"}></DropDown>
              </div>
              <div className="mr-5">
                <div className="">
                  <Buttons
                    onClick={() => {
                      setShowAddReferralGroup(true);
                    }}
                    label="Add New Referral Group"
                    icon="pi pi-plus-circle"
                    className="btn-dark border-none  "
                    style={{ height: "36px", top: "10px" }}
                  ></Buttons>
                </div>
              </div>
            </div>
            <div className="mt-2">
              <TableData
                data={ReferralGroupData}
                columns={ReferralGroupColumn}
              ></TableData>
            </div>
            <div className=" m-2 mt-3 flex justify-content-end">
              <div className="">
                <Buttons
                  label="Close"
                  className="btn-lightest-gray text-900   border-none"
                ></Buttons>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ReferralGroup;
