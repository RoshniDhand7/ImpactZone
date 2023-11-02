import React, { useState } from "react";
import Checkbox from "../../../../components/checkbox/checkbox";
import CardWithTitle from "../../../../components/cards/cardWithTitle/cardWithTitle";
import Input from "../../../../components/input/input";
import DropDown from "../../../../components/dropdown/dropdown";
import Buttons from "../../../../components/buttons/button";
import TableData from "../../../../components/cards/dataTable/dataTable";

const Products = () => {
  const [showAddCommissionGroup, setShowAddCommissionGroup] = useState();

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

  const CommissionGroupColumn = [
    {
      field: "CommissionGroup",
      header: "Commission Group",
      id: "",
      index: "",
    },
    {
      field: "ItemsinGroup",
      header: "Items in Group",
      id: "",
      index: "",
    },

    {
      field: "EmployeesAssign",
      header: "Employees Assign",
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

  const [CommissionGroupData, setCommissionGroupData] = useState([
    {
      CommissionGroup: "Shakes",
      ItemsinGroup: "",
      EmployeesAssign: "",
    },
    {
      CommissionGroup: "Drinks",
      ItemsinGroup: "-",
      EmployeesAssign: "",
    },
    {
      CommissionGroup: "Bars",
      ItemsinGroup: "-",
      EmployeesAssign: "",
    },
    {
      CommissionGroup: "Supplements",
      ItemsinGroup: "",
      EmployeesAssign: "",
    },
    {
      CommissionGroup: "Shakes",
      ItemsinGroup: "",
      EmployeesAssign: "",
    },
  ]);

  const AddCommissionGroup = () => {
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
            <CardWithTitle title="Add New Commission Group">
              <div className="flex p-2">
                <div className="col-4 ">
                  <Input title="Commission Group" name="name"></Input>
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
                    <div className=" flex flex-column  justify-content-center mx-6">
                      <div className="">
                        <Buttons
                          label="Add"
                          className="btn-dark border-none   "
                        ></Buttons>
                      </div>
                      <div className="">
                        <Buttons
                          label="Remove All"
                          className="btn-dark border-none   "
                        ></Buttons>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardWithTitle>
          </div>
          <div className="my-3">
            <CardWithTitle title="Assign Employee">
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
                    <div className=" flex flex-column  justify-content-center mx-6">
                      <div className="">
                        <Buttons
                          label="Add"
                          className="btn-dark border-none   "
                        ></Buttons>
                      </div>
                      <div className="">
                        <Buttons
                          label="Remove All"
                          className="btn-dark border-none   "
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
                onClick={() => setShowAddCommissionGroup(false)}
                label="Cancel"
                className="btn-grey border-none"
              ></Buttons>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      {showAddCommissionGroup ? (
        AddCommissionGroup()
      ) : (
        <>
          <div className="absolute top-0 right-0 margin pt-2">
            <Buttons
              onClick={() => {
                setShowAddCommissionGroup(true);
              }}
              label=" Add New Commission Group"
              icon="pi pi-plus-circle"
              className="btn-dark border-none  "
              style={{ height: "36px", top: "10px" }}
            ></Buttons>
          </div>
          <div>
            <div className="mt-3">
              <TableData
                data={CommissionGroupData}
                columns={CommissionGroupColumn}
              ></TableData>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Products;
