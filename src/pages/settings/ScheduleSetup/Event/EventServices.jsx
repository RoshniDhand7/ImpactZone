import React, { useState } from "react";
import CardWithTitle from "../../../../components/cards/cardWithTitle/cardWithTitle";
import Buttons from "../../../../components/buttons/button";
import Input from "../../../../components/input/input";
import DropDown from "../../../../components/dropdown/dropdown";
import TableData from "../../../../components/cards/dataTable/dataTable";
import MuliSelectDropDown from "../../../../components/dropdown/muliSelectDropDown";
import { useSelector } from "react-redux";
import { showAllFormErrors } from "../../../../utils/commonFunctions";

const EventServices = ({
  addEventData,
  handleChange,
  serviceSelectHandle,
  setLevelIndex,
  serviceHandleChange,
  serviceAddRow,
  selectedRow,
  setActiveIndex,
  setIndexFunc,
  serviceIndex,
  serviceDetailIndex,
  DeleteService,
  changePosition,
  DeleteAllService,
  setAddEventData,
  required,
  initialData,
}) => {
  const [showAddService, setShowAddService] = useState();
  const levelData = useSelector((state) => state.levelData.levels);
  const openAddService = (index) => {
    setShowAddService((prev) => !prev);
    if (index != "cancel") {
      setLevelIndex(index);
    }
  };

  const nextFunc = () => {
    console.log(
      "testinggg",
      showAllFormErrors(addEventData, setAddEventData, required, initialData)
    );
    if (
      showAllFormErrors(addEventData, setAddEventData, required, initialData) ==
      true
    ) {
      setActiveIndex(2);
    }
  };

  const backFunc = () => {
    setAddEventData((prev) => {
      return {
        ...prev,
        formErrors: {},
      };
    });
    setActiveIndex(0);
  };

  const AddEventSetup = () => {
    return (
      <>
        <div className="">
          <p className="text-xl font-bold my-3 text-900 ">Add Event Setups</p>
          <div className="col-3 px-0 pt-0">
            {/* <DropDown title="Level"></DropDown> */}
            <MuliSelectDropDown
              title="Level"
              options={levelData}
              optionsLabel="name"
              onChange={serviceSelectHandle}
              value={addEventData.serviceSelectbox}
            ></MuliSelectDropDown>
          </div>
          {addEventData.services.map((item, index) => {
            return (
              <div className="">
                <CardWithTitle titlee={item?.level?.name}>
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
                      {item.services.length > 0 ? (
                        <div className="w-6  p-2">
                          {item.services.map((child, childIndex) => {
                            return (
                              <div
                                className="flex justify-content-between  p-2  "
                                onClick={() => setIndexFunc(index, childIndex)}
                                style={
                                  childIndex == serviceDetailIndex &&
                                  index == serviceIndex
                                    ? {
                                        backgroundColor: "#e5e9f0",
                                        cursor: "pointer",
                                      }
                                    : { cursor: "pointer" }
                                }
                              >
                                <span className="text-xs font-semibold text-gray-600">
                                  {child.catelogPrice}
                                </span>
                                <span className="text-xs font-semibold text-gray-600">
                                  {child.name}
                                </span>
                                <span className="text-xs font-semibold text-gray-600">
                                  {child.size}
                                </span>
                                <span className="text-xs font-semibold text-gray-600">
                                  {child.status == true ? "true" : "false"}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="col-9 flex justify-content-center align-items-center">
                          <span className="text-xs font-semibold text-gray-600 text-center ">
                            No Row To Show
                          </span>
                        </div>
                      )}

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
                              onClick={() => changePosition("up")}
                              icon="pi pi-arrow-up"
                              className="btn-dark border-none"
                            ></Buttons>
                          </div>
                          <div
                            className="my-3"
                            style={{ width: "128px", height: "35px" }}
                          >
                            <Buttons
                              onClick={() => openAddService(index)}
                              label="Add"
                              className="btn-dark border-none "
                            ></Buttons>
                          </div>
                          <div
                            className=""
                            style={{ width: "128px", height: "35px" }}
                          >
                            <Buttons
                              onClick={DeleteService}
                              className="btn-dark border-none"
                              label="Remove"
                            ></Buttons>
                          </div>
                          <div
                            className="my-3"
                            style={{ width: "128px", height: "35px" }}
                          >
                            <Buttons
                              onClick={() => DeleteAllService(index)}
                              className="btn-dark border-none"
                              label="Remove All"
                            ></Buttons>
                          </div>
                          <div
                            className=""
                            style={{ width: "128px", height: "35px" }}
                          >
                            <Buttons
                              onClick={() => changePosition("down")}
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
            );
          })}
          <div className="text-danger" style={{ color: "red" }}>
            {addEventData?.formErrors?.services}
          </div>

          {/* <div className="my-2">
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
          </div> */}
        </div>
        <div className=" m-2  flex justify-content-end">
          <div className="mt-3 mx-4">
            <Buttons
              label="Next"
              onClick={() => nextFunc()}
              className="btn-dark mx-3   border-none"
            ></Buttons>
          </div>
          <div className="mt-3">
            <Buttons
              label="Cancel"
              className="btn-grey   border-none"
              onClick={() => backFunc()}
            ></Buttons>
          </div>
        </div>
      </>
    );
  };
  // const actionTemplate = (col) => {
  //   // console.log(col._id, "collllll");
  //   return (
  //     <>
  //       <div className="flex justify-content-end">
  //         <span>
  //           <i className="pi pi-pencil mr-3 cursor-pointer"></i>
  //         </span>
  //         <span>
  //           <i className="pi pi-trash cursor-pointer"></i>
  //         </span>
  //       </div>
  //     </>
  //   );
  // };

  const agreementCategoriesColumn = [
    {},
    {
      field: "name",
      header: "Item Name",
      id: "",
      index: "",
      sorting: true,
    },
    {
      field: "size",
      header: "Item UPC",

      id: "",
      index: "",
    },
    {
      field: "catelogPrice",
      header: "Price",
      id: "",
      index: "",
      sorting: true,
    },

    {
      field: "status",
      header: "Status",

      id: "",
      index: "",
    },

    // {
    //   field: "",
    //   header: "",
    //   id: "",
    //   body: actionTemplate,
    // },
  ];
  const [agreementCategoriesData, setAgreementCategoriesData] = useState([
    {
      id: "a1",
      catelogPrice: "100",
      name: "agreements",
      size: "10",
      status: true,
    },
    {
      id: "a2",
      catelogPrice: "200",
      name: "Adults",
      size: "15",
      status: true,
    },
    {
      id: "a3",
      catelogPrice: "200",
      name: "Students",
      size: "15",
      status: true,
    },
    {
      id: "a4",
      catelogPrice: "150",
      name: "Corporate",
      size: "18",
      status: false,
    },
    {
      id: "a5",
      catelogPrice: "120",
      name: "Annual",
      size: "25",
      status: false,
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
              // selected={addEventData.services.detail}
              selected={selectedRow}
              // changeSelection={(e)=>serviceHandleChange(e)}
              changeSelection={(e) => serviceAddRow(e)}
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
              onClick={(e) => {
                serviceHandleChange(e);
                openAddService("cancel");
              }}
              className="btn-dark mx-3   border-none"
            ></Buttons>
          </div>
          <div className="mt-3">
            <Buttons
              onClick={() => openAddService("cancel")}
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
