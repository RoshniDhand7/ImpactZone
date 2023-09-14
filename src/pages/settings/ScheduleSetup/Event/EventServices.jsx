import React, { useState } from "react";
import CardWithTitle from "../../../../components/cards/cardWithTitle/cardWithTitle";
import Buttons from "../../../../components/buttons/button";
import Input from "../../../../components/input/input";
import DropDown from "../../../../components/dropdown/dropdown";
import TableData from "../../../../components/cards/dataTable/dataTable";

const EventServices = () => {
  const [showAddService, setShowAddService] = useState();
  const openAddService = () => {
    setShowAddService((prev) => !prev);
  };
  const AddEventSetup = () => {
    return (
      <>
        <div className="">
          <p className="text-xl font-bold my-3 text-900 ">Add Event Setups</p>
          <div className="col-3 px-0 pt-0">
            <DropDown title="Level"></DropDown>
          </div>
          <div className="">
            <CardWithTitle titlee="Level 1">
              <div className="p-3">
                <div className="flex justify-content-between w-6  p-2  ">
                  <span className="text-xs font-semibold text-gray-600">
                    Catalog Price
                  </span>
                  <span className="text-xs font-semibold text-gray-600">
                    Name
                  </span>
                  <span className="text-xs font-semibold text-gray-600">
                    Size
                  </span>
                  <span className="text-xs font-semibold text-gray-600">
                    Status
                  </span>
                </div>
                <div className="bg-white m-2 border-round-lg flex ">
                  <div className="col-9 flex justify-content-center align-items-center">
                    <span className="text-xs font-semibold text-gray-600 text-center ">
                      No Row To Show
                    </span>
                  </div>
                  <div
                    className="col flex justify-content-end align-items-center mr-3 "
                    style={{ height: "290px" }}
                  >
                    <div className="flex flex-column ">
                      <div
                        className=""
                        style={{ width: "128px", height: "35px" }}
                      >
                        <Buttons
                          icon="pi pi-arrow-up"
                          className="btn-dark border-none"
                        ></Buttons>
                      </div>
                      <div
                        className="my-3"
                        style={{ width: "128px", height: "35px" }}
                      >
                        <Buttons
                          onClick={openAddService}
                          label="Add"
                          className="btn-dark border-none "
                        ></Buttons>
                      </div>
                      <div
                        className=""
                        style={{ width: "128px", height: "35px" }}
                      >
                        <Buttons
                          className="btn-dark border-none"
                          label="Remove"
                        ></Buttons>
                      </div>
                      <div
                        className="my-3"
                        style={{ width: "128px", height: "35px" }}
                      >
                        <Buttons
                          className="btn-dark border-none"
                          label="Remove All"
                        ></Buttons>
                      </div>
                      <div
                        className=""
                        style={{ width: "128px", height: "35px" }}
                      >
                        <Buttons
                          className="btn-dark border-none "
                          icon="pi pi-arrow-down"
                        ></Buttons>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardWithTitle>
          </div>
          <div className="my-2">
            <CardWithTitle titlee="Level 2">
              <div className="p-3">
                <div className="flex justify-content-between w-6  p-2  ">
                  <span className="text-xs font-semibold text-gray-600">
                    Catalog Price
                  </span>
                  <span className="text-xs font-semibold text-gray-600">
                    Name
                  </span>
                  <span className="text-xs font-semibold text-gray-600">
                    Size
                  </span>
                  <span className="text-xs font-semibold text-gray-600">
                    Status
                  </span>
                </div>
                <div className="bg-white m-2 border-round-lg flex">
                  <div className="col-9 flex justify-content-center align-items-center">
                    <span className="text-xs font-semibold text-gray-600 text-center ">
                      No Row To Show
                    </span>
                  </div>
                  <div
                    className="col flex justify-content-end align-items-center mr-3 "
                    style={{ height: "290px" }}
                  >
                    <div className="flex flex-column ">
                      <div
                        className=""
                        style={{ width: "128px", height: "35px" }}
                      >
                        <Buttons
                          icon="pi pi-arrow-up"
                          className="btn-dark border-none"
                        ></Buttons>
                      </div>
                      <div
                        className="my-3"
                        style={{ width: "128px", height: "35px" }}
                      >
                        <Buttons
                          label="Add"
                          className="btn-dark border-none "
                        ></Buttons>
                      </div>
                      <div
                        className=""
                        style={{ width: "128px", height: "35px" }}
                      >
                        <Buttons
                          className="btn-dark border-none
                l"
                          label="Remove"
                        ></Buttons>
                      </div>
                      <div
                        className="my-3"
                        style={{ width: "128px", height: "35px" }}
                      >
                        <Buttons
                          className="btn-dark border-none"
                          label="Remove All"
                        ></Buttons>
                      </div>
                      <div
                        className=""
                        style={{ width: "128px", height: "35px" }}
                      >
                        <Buttons
                          className="btn-dark border-none "
                          icon="pi pi-arrow-down"
                        ></Buttons>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardWithTitle>
          </div>
          <div className="">
            <CardWithTitle titlee="Level 3">
              <div className="p-3">
                <div className="flex justify-content-between w-6  p-2  ">
                  <span className="text-xs font-semibold text-gray-600">
                    Catalog Price
                  </span>
                  <span className="text-xs font-semibold text-gray-600">
                    Name
                  </span>
                  <span className="text-xs font-semibold text-gray-600">
                    Size
                  </span>
                  <span className="text-xs font-semibold text-gray-600">
                    Status
                  </span>
                </div>
                <div className="bg-white m-2 border-round-lg flex ">
                  <div className="col-9 flex justify-content-center align-items-center">
                    <span className="text-xs font-semibold text-gray-600 text-center ">
                      No Row To Show
                    </span>
                  </div>
                  <div
                    className="col flex justify-content-end align-items-center mr-3 "
                    style={{ height: "290px" }}
                  >
                    <div className="flex flex-column ">
                      <div
                        className=""
                        style={{ width: "128px", height: "35px" }}
                      >
                        <Buttons
                          icon="pi pi-arrow-up"
                          className="btn-dark border-none"
                        ></Buttons>
                      </div>
                      <div
                        className="my-3"
                        style={{ width: "128px", height: "35px" }}
                      >
                        <Buttons
                          label="Add"
                          className="btn-dark border-none "
                        ></Buttons>
                      </div>
                      <div
                        className=""
                        style={{ width: "128px", height: "35px" }}
                      >
                        <Buttons
                          className="btn-dark border-none
                l"
                          label="Remove"
                        ></Buttons>
                      </div>
                      <div
                        className="my-3"
                        style={{ width: "128px", height: "35px" }}
                      >
                        <Buttons
                          className="btn-dark border-none"
                          label="Remove All"
                        ></Buttons>
                      </div>
                      <div
                        className=""
                        style={{ width: "128px", height: "35px" }}
                      >
                        <Buttons
                          className="btn-dark border-none "
                          icon="pi pi-arrow-down"
                        ></Buttons>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardWithTitle>
          </div>
          <div className="my-2">
            <CardWithTitle titlee="Level 4">
              <div className="p-3">
                <div className="flex justify-content-between w-6  p-2  ">
                  <span className="text-xs font-semibold text-gray-600">
                    Catalog Price
                  </span>
                  <span className="text-xs font-semibold text-gray-600">
                    Name
                  </span>
                  <span className="text-xs font-semibold text-gray-600">
                    Size
                  </span>
                  <span className="text-xs font-semibold text-gray-600">
                    Status
                  </span>
                </div>
                <div className="bg-white m-2 border-round-lg flex ">
                  <div className="col-9 flex justify-content-center align-items-center">
                    <span className="text-xs font-semibold text-gray-600 text-center ">
                      No Row To Show
                    </span>
                  </div>
                  <div
                    className="col flex justify-content-end align-items-center mr-3 "
                    style={{ height: "290px" }}
                  >
                    <div className="flex flex-column ">
                      <div
                        className=""
                        style={{ width: "128px", height: "35px" }}
                      >
                        <Buttons
                          icon="pi pi-arrow-up"
                          className="btn-dark border-none"
                        ></Buttons>
                      </div>
                      <div
                        className="my-3"
                        style={{ width: "128px", height: "35px" }}
                      >
                        <Buttons
                          label="Add"
                          className="btn-dark border-none "
                        ></Buttons>
                      </div>
                      <div
                        className=""
                        style={{ width: "128px", height: "35px" }}
                      >
                        <Buttons
                          className="btn-dark border-none
                l"
                          label="Remove"
                        ></Buttons>
                      </div>
                      <div
                        className="my-3"
                        style={{ width: "128px", height: "35px" }}
                      >
                        <Buttons
                          className="btn-dark border-none"
                          label="Remove All"
                        ></Buttons>
                      </div>
                      <div
                        className=""
                        style={{ width: "128px", height: "35px" }}
                      >
                        <Buttons
                          className="btn-dark border-none "
                          icon="pi pi-arrow-down"
                        ></Buttons>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardWithTitle>
          </div>
        </div>
        <div className=" m-2  flex justify-content-end">
          <div className="mt-3 mx-4">
            <Buttons
              label="Next"
              className="btn-dark mx-3   border-none"
            ></Buttons>
          </div>
          <div className="mt-3">
            <Buttons
              label="Cancel"
              className="btn-grey   border-none"
            ></Buttons>
          </div>
        </div>
      </>
    );
  };
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

  const agreementCategoriesColumn = [
    {},
    {
      field: "itemname",
      header: "Item Name",
      id: "",
      index: "",
      sorting: true,
    },
    {
      field: "itemUPC",
      header: "Item UPC",
      id: "",
      index: "",
      sorting: true,
    },
    {
      field: "price",
      header: "Price",

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
  const [agreementCategoriesData, setAgreementCategoriesData] = useState([
    {
      itemname: "agreements",
      itemUPC: "1",
    },
    {
      itemname: "Adults",
      itemUPC: "12",
    },
    {
      itemname: "Students",
      itemUPC: "3",
    },
    {
      itemname: "Corporate",
      itemUPC: "2",
    },
    {
      itemname: "Annual",
      itemUPC: "1",
    },
  ]);
  const AddServices = () => {
    return (
      <>
        <div>
          <div className="flex justify-content-between">
            <p className="text-xl font-bold my-3 text-900 ">Add Service</p>
            <Input placeholder="Search" icon="pi pi-search"></Input>
          </div>
          <div>
            <TableData
              sorting
              selectionMode="checkbox"
              columns={agreementCategoriesColumn}
              data={agreementCategoriesData}
            ></TableData>
          </div>
        </div>
        <div className=" m-2  flex justify-content-end">
          <div className="mt-3 mx-4">
            <Buttons
              label="Add"
              className="btn-dark mx-3   border-none"
            ></Buttons>
          </div>
          <div className="mt-3">
            <Buttons
              onClick={openAddService}
              label="Cancel"
              className="btn-grey   border-none"
            ></Buttons>
          </div>
        </div>
      </>
    );
  };
  return <>{showAddService ? AddServices() : AddEventSetup()}</>;
};

export default EventServices;
