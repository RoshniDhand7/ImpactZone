import React, { useState } from "react";
import DropDown from "../../../../components/dropdown/dropdown";
import Buttons from "../../../../components/buttons/button";
import TableData from "../../../../components/cards/dataTable/dataTable";
import Checkbox from "../../../../components/checkbox/checkbox";
import CardWithTitle from "../../../../components/cards/cardWithTitle/cardWithTitle";
import Input from "../../../../components/input/input";
import CustomTextarea from "../../../../components/input/InputTextArea";
import ProfitCenterContainer from "./ProfitCenterContainer";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

const ProfileTypes = () => {

  const {
    showAddProfileType,
    setShowAddProfileType,
    ProfileTypesColumn,
    allProfitCenterData,
    profitCenterForm,
    profitCenterHandler,
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
    save,
    Back,
    statusData,
    setStatusData,
    statusOptions,
    availableProfitState,
    parentProfitState
  } = ProfitCenterContainer()

  
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
                profitCenterHandler({
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

  const AddProfileType = () => {
    return (
      <>
        <div>
          <div className="my-3">
            <Checkbox
              title="Active"
              className="text-900 text-sm font-semibold"
              name="isActive"
            value={profitCenterForm.isActive}
            onChange={profitCenterHandler}
            ></Checkbox>
          </div>
          <div>
            <CardWithTitle title="General">
              <div className="flex p-2">
                <div className="col-4 ">
                  <Input title="Name" name="name" required={true} value={profitCenterForm.name} onChange={profitCenterHandler} state={profitCenterForm}></Input>
                </div>
                <div className="col-4 ">
                  <Input title="GL Code" name="glCode" required={true} value={profitCenterForm.glCode} onChange={profitCenterHandler} state={profitCenterForm}></Input>
                </div>
                <div className="col-4">
                  <DropDown
                    title="Available Profit Center"
                    placeholder="Select one"
                    options={availableProfitState?.map((item)=>{return{label:item?.name,value:item?._id}})}
                    name="availableProfitCenter"
                    value={profitCenterForm.availableProfitCenter}
                    onChange={profitCenterHandler}
                    state={profitCenterForm}
                  ></DropDown>
                </div>
              </div>
              <div className="flex p-2">
                <div className="col-4 ">
                  <DropDown
                    title="Select Parent Profit Center"
                    placeholder="Select one"
                    options={parentProfitState?.map((item)=>{return{label:item?.name,value:item?._id}})}
                    name="parentProfitCenter"
                    value={profitCenterForm.parentProfitCenter}
                    onChange={profitCenterHandler}
                    state={profitCenterForm}
                  ></DropDown>
                </div>
              </div>
              <div className="flex p-2">
                <div className="col-12 ">
                  <CustomTextarea
                    classNames="w-full"
                    rows="5"
                    label={`Description (${profitCenterForm?.description?.length}/256)`}
                    name="description"
                    value={profitCenterForm.description}
                      onChange={(e)=> e.value.length > 256 ? null : profitCenterHandler({name:e.name,value:e.value})}
                  />
                       <div
            className="text-danger"
            style={{ color: "red",marginTop:'10px'}}
          >
            {profitCenterForm?.formErrors?.description}
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
                                      {profitCenterForm?.catelogItems?.length > 0 ? (
                    <div className="w-7 align-items-center  p-2">
                      {profitCenterForm?.catelogItems?.map((child, childIndex) => {
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
                    <div className=" flex flex-column  justify-content-center mx-3 ">
                      <div className="mx-3 ">
                        <Buttons
                          label="Add"
                          onClick={() => setShowCatalogItem(true)}
                          className="btn-dark border-none mx-3  "
                        ></Buttons>
                      </div>
                      <div className="mx-3 ">
                        <Buttons
                          label="Remove All"
                          onClick={removeAll}
                          className="btn-dark border-none mx-3  "
                        ></Buttons>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardWithTitle>
            <div
            className="text-danger"
            style={{ color: "red",marginTop:'10px'}}
          >
            {profitCenterForm?.formErrors?.catelogItems}
          </div>
          </div>
        </div>
        <div>
          <div>
            <CardWithTitle title="Data Export">
              <div className="flex p-2">
                <div className="col-4 mx-3">
                  <Input title="Profile Center Code" name="profitCenterCode" value={profitCenterForm.profitCenterCode} onChange={profitCenterHandler} state={profitCenterForm}></Input>
                </div>
                <div className="col-4">
                  <Input title="Earnings Code" name="earningsCode" value={profitCenterForm.earningsCode} onChange={profitCenterHandler} state={profitCenterForm}></Input>
                </div>
              </div>
            </CardWithTitle>
          </div>
          <div className=" m-2 mt-3 flex justify-content-end">
            <div className="mx-4">
              <Buttons
                label="Save"
                onClick={save}
                className="btn-dark  mx-3  border-none"
              ></Buttons>
            </div>
            <div className="">
              <Buttons
                onClick={Back}
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
        <>
        {showCatalogItem ? AddCatalogItem()  : AddProfileType()}
        </>
      ) : (
        <>
          <div>
            <div className="bg-lightest-blue border-round-lg py-2 px-3 flex justify-content-between align-items-center ">
            <ConfirmDialog />
              <div className="col-2 ">
                <DropDown title="Status" placeholder={"Active"} options={statusOptions} onChange={(e)=>setStatusData(e.value)} value={statusData}></DropDown>
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
              paginator
              rows={5}
              selected={false}
              selectionMode={false}
                data={allProfitCenterData.filter((item)=>{return statusData!==item.isActive})}
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
