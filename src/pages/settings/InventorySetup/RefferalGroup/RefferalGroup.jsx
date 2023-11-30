import React, { useState } from "react";
import DropDown from "../../../../components/dropdown/dropdown";
import Buttons from "../../../../components/buttons/button";
import TableData from "../../../../components/cards/dataTable/dataTable";
import Checkbox from "../../../../components/checkbox/checkbox";
import CardWithTitle from "../../../../components/cards/cardWithTitle/cardWithTitle";
import Input from "../../../../components/input/input";
import RefferalGroupContainer from "./RefferalGroupContainer";

const ReferralGroup = () => {
  
const {
  showAddReferralGroup,
  setShowAddReferralGroup,
  ReferralGroupColumn,
  allRefferalGroupData,
  refferalGroupForm,
  refferalGroupHandleChange,
  showCatalogItem,
  setShowCatalogItem,
  globalFilterValue,
  setGlobalFilterValue,
  filters,
  onGlobalFilterChange,
  catalogItemAddColumn,
  catalogItemAddData,
  selectedRow,
  setSelectedRow,
  removeAll,
} = RefferalGroupContainer()


const AddCatalogItem = () => {
    
  return (
    <>
      <div>
        <div className="flex justify-content-between">
          <p className="text-xl font-bold my-3 text-900 ">Add Catalog Item</p>
          <Input
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Search"
            icon="pi pi-search"
          ></Input>
        </div>
        <div>
          <TableData
            filters={filters}
            sorting
            paginator
            rows={5}
            // selected={addEventData.catelogItems.detail}
            selected={selectedRow}
            // changeSelection={(e)=>serviceHandleChange(e)}
            changeSelection={(e) => {
              setSelectedRow(e.value);
            }}
            selectionMode="checkbox"
            columns={catalogItemAddColumn}
            data={catalogItemAddData}
          ></TableData>
        </div>
      </div>
      <div className=" m-2  flex justify-content-end">
        <div className="mt-3 mx-4">
          <Buttons
            label="Add"
            onClick={(e) => {
              refferalGroupHandleChange({
                name: "catelogItems",
                value: selectedRow,
              });
              setShowCatalogItem(false);
            }}
            className="btn-dark mx-3   border-none"
          ></Buttons>
        </div>
        <div className="mt-3">
          <Buttons
            onClick={() => {
              setShowCatalogItem(false);
            }}
            label="Cancel"
            className="btn-grey   border-none"
          ></Buttons>
        </div>
      </div>
    </>
  );
};

  const AddReferralGroup = () => {
    return (
      <>
        <div>
          <div className="my-3">
            <Checkbox
              title="Active"
              className="text-900 text-sm font-semibold"
              name="isActive"
              value={refferalGroupForm.isActive}
              onChange={refferalGroupHandleChange}
            ></Checkbox>
          </div>
          <div>
            <CardWithTitle title="Add New Referral Group">
              <div className="flex p-2">
                <div className="col-4 ">
                  <Input title="Name" name="name" required={true} value={refferalGroupForm.name} onChange={refferalGroupHandleChange} state={refferalGroupForm}></Input>
                </div>
                <div className="col-4 flex  ">
                  <Input title="Amount" name="amount" type="number" required={true} value={refferalGroupForm.amount} onChange={refferalGroupHandleChange} state={refferalGroupForm}></Input>
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
                      {refferalGroupForm?.catelogItems?.length > 0 ? (
                    <div className="w-7 align-items-center  p-2">
                      {refferalGroupForm?.catelogItems?.map((child, childIndex) => {
                        return (
                          <div className="flex justify-content-between  p-2  ">
                            <span className="text-xs font-semibold text-gray-600 w-6rem">
                              {child.name}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="col-9 flex justify-content-center align-items-center">
                      <span className="text-xs font-semibold text-dark-gray text-center ">
                      None Found
                      </span>
                    </div>
                  )}
                    {/* <div className="flex justify-content-center   w-7  ">
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
                    </div> */}
                    <div className=" flex flex-column  justify-content-center mx-6 ">
                      <div className="">
                        <Buttons
                          label="Add"
                          onClick={() => setShowCatalogItem(true)}
                          className="btn-dark border-none"
                        ></Buttons>
                      </div>
                      <div className="">
                        <Buttons
                        onClick={removeAll}
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
        <>
        {showCatalogItem ? AddCatalogItem()  : AddReferralGroup()}
        </>
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
                data={allRefferalGroupData}
                columns={ReferralGroupColumn}
              ></TableData>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ReferralGroup;
