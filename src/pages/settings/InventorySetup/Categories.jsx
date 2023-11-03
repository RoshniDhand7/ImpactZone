import React, { useState } from "react";
import DropDown from "../../../components/dropdown/dropdown";
import Buttons from "../../../components/buttons/button";
import TableData from "../../../components/cards/dataTable/dataTable";
import Checkbox from "../../../components/checkbox/checkbox";
import CardWithTitle from "../../../components/cards/cardWithTitle/cardWithTitle";
import Input from "../../../components/input/input";
import CustomTextarea from "../../../components/input/InputTextArea";

const Category = () => {
  const [showAddCategory, setShowAddCategory] = useState();
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

  const CategoryColumn = [
    {
      field: "Category",
      header: "Category",
      id: "",
      index: "",
    },
    {
      field: "DisplaysinPOS",
      header: "Displays in POS",
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
      field: "",
      header: "",
      id: "",
      body: actionTemplate,
    },
  ];
  const [CategoryData, setCategoryData] = useState([
    {
      Category: "Annual Fee",
      Description: "Annual Fee",
      DisplaysinPOS: "$49.99",
    },
    {
      Category: "Late Fee",
      Description: "-",
      DisplaysinPOS: "$49.99",
    },
    {
      Category: "Decline Fee",
      Description: "-",
      DisplaysinPOS: "$49.99",
    },
    {
      Category: "No Show Fee",
      Description: "GymAccess",
      DisplaysinPOS: "$49.99",
    },
    {
      Category: "Freeze Fee",
      Description: "Unassigned",
      CatalogItemsAssigned: "$49.99",
    },
  ]);

  const AddCategory = () => {
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
            <CardWithTitle title="Add Category">
              <div className="flex p-2">
                <div className="col-4 ">
                  <Input title="Name" name="name"></Input>
                </div>
                <div className="col-4">
                  <DropDown
                    title="Display in POS"
                    name="Display in POS"
                    placeholder="Select one"
                    options={["Yes", "No"]}
                  ></DropDown>
                </div>
                <div className="col-4 ">
                  <Input title="POS Button Label" name="name"></Input>
                </div>
              </div>
              <div className="flex p-2">
                <div className="col-4 ">
                  <DropDown
                    title="Available Categories"
                    name="Available Categories"
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
                    <div className=" flex flex-column  justify-content-center mx-6 ">
                      <div className="">
                        <Buttons
                          label="Add"
                          className="btn-dark border-none   "
                        ></Buttons>
                      </div>
                      <div className="mt-2 ">
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
                onClick={() => setShowAddCategory(false)}
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
      {showAddCategory ? (
        AddCategory()
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
                      setShowAddCategory(true);
                    }}
                    label="Add Category"
                    icon="pi pi-plus-circle"
                    className="btn-dark border-none  "
                    style={{ height: "36px", top: "10px" }}
                  ></Buttons>
                </div>
              </div>
            </div>
            <div className="mt-2">
              <TableData
                data={CategoryData}
                columns={CategoryColumn}
              ></TableData>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Category;
