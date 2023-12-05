import React, { useState } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import Products from "./Products";
import Services from "./Services";
import Agreement from "./Agreement";
import Checkbox from "../../../../components/checkbox/checkbox";
import CardWithTitle from "../../../../components/cards/cardWithTitle/cardWithTitle";
import Input from "../../../../components/input/input";
import DropDown from "../../../../components/dropdown/dropdown";
import Buttons from "../../../../components/buttons/button";
import TableData from "../../../../components/cards/dataTable/dataTable";
import ComissionGroupContainer from "./comissionGroupContainer";

const CommissionGroup = () => {
  //   const [activeIndex, setActiveIndex] = useState(0);
  //   return (
  //     <>
  //       <div className="pt-2 relative">
  //         <TabView
  //           activeIndex={activeIndex}
  //           onTabChange={(e) => setActiveIndex(e.index)}
  //         >
  //           <TabPanel header="Products">
  //             <Products />
  //           </TabPanel>
  //           <TabPanel header="Services">
  //             <Services></Services>
  //           </TabPanel>
  //           <TabPanel header="Agreement">
  //             <Agreement></Agreement>
  //           </TabPanel>
  //         </TabView>
  //       </div>
  //     </>
  //   );
  // };

  const {
    showAddCommissionGroup,
    setShowAddCommissionGroup,
    statusData,
    setStatusData,
    statusOptions,
    CommissionGroupColumn,
    allCommissionData,
    commissionGroupForm,
    CommissionHandleChange,
    showCatalogItem,
    setShowCatalogItem,
    globalFilterValue,
    setGlobalFilterValue,
    filters,
    onGlobalFilterChange,
    catalogItemAddColumn,
    allCatalogItemsData,
    selectedRow,
    setSelectedRow,
    removeAll,
    assignedSelectedRow,
    setAssignedSelectedRow,
    showAssignItem,
    setShowAssignItem,
    removeAllAssign,
    allEmployeeData,
    AssignEmployeeColumn,
    activeStatusOptions,
    activeStatusData,
    setActiveStatusData,
    save,
    Back
  } = ComissionGroupContainer();

  const AddAssignEmployee = () => {
    return (
      <>
        <div>
          <div className="flex justify-content-between">
            <p className="text-xl font-bold my-3 text-900 ">Add Catalog Item</p>
            <Input
              value={globalFilterValue}
              onChange={(e) => onGlobalFilterChange({ value: e.target.value })}
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
              // selected={addEventData.catalogItems.detail}
              selected={assignedSelectedRow}
              // changeSelection={(e)=>serviceHandleChange(e)}
              changeSelection={(e) => {
                setAssignedSelectedRow(e.value);
              }}
              selectionMode="checkbox"
              columns={AssignEmployeeColumn}
              data={allEmployeeData}
            ></TableData>
          </div>
        </div>
        <div className=" m-2  flex justify-content-end">
          <div className="mt-3 mx-4">
            <Buttons
              label="Add"
              onClick={(e) => {
                CommissionHandleChange({
                  name: "assignedEmployees",
                  value: assignedSelectedRow,
                });
                setShowAssignItem(false);
                onGlobalFilterChange({ value: "" });
              }}
              className="btn-dark mx-3   border-none"
            ></Buttons>
          </div>
          <div className="mt-3">
            <Buttons
              onClick={() => {
                setShowAssignItem(false);
                onGlobalFilterChange({ value: "" });
              }}
              label="Cancel"
              className="btn-grey   border-none"
            ></Buttons>
          </div>
        </div>
      </>
    );
  };

  const AddCatalogItem = () => {
    return (
      <>
        <div>
          <div className="flex justify-content-between">
            <p className="text-xl font-bold my-3 text-900 ">Add Catalog Item</p>
            <Input
              value={globalFilterValue}
              onChange={(e) => onGlobalFilterChange({ value: e.target.value })}
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
              // selected={addEventData.catalogItems.detail}
              selected={selectedRow}
              // changeSelection={(e)=>serviceHandleChange(e)}
              changeSelection={(e) => {
                setSelectedRow(e.value);
              }}
              selectionMode="checkbox"
              columns={catalogItemAddColumn}
              data={allCatalogItemsData}
            ></TableData>
          </div>
        </div>
        <div className=" m-2  flex justify-content-end">
          <div className="mt-3 mx-4">
            <Buttons
              label="Add"
              onClick={(e) => {
                CommissionHandleChange({
                  name: "catalogItems",
                  value: selectedRow,
                });
                setShowCatalogItem(false);
                onGlobalFilterChange({ value: "" });
              }}
              className="btn-dark mx-3   border-none"
            ></Buttons>
          </div>
          <div className="mt-3">
            <Buttons
              onClick={() => {
                setShowCatalogItem(false);
                onGlobalFilterChange({ value: "" });
              }}
              label="Cancel"
              className="btn-grey   border-none"
            ></Buttons>
          </div>
        </div>
      </>
    );
  };

  const AddCommissionGroup = () => {
    return (
      <>
        <div>
          <div className="my-3">
            <Checkbox
              title="Active"
              className="text-900 text-sm font-semibold"
              name="isActive"
              value={commissionGroupForm.isActive}
              onChange={CommissionHandleChange}
            ></Checkbox>
          </div>
          <div>
            <CardWithTitle title="Add New Commission Group">
              <div className="flex p-2">
                <div className="col-4 ">
                  <Input
                    title="Commission Group"
                    name="commissionGroup"
                    required={true}
                    value={commissionGroupForm.commissionGroup}
                    onChange={CommissionHandleChange}
                    state={commissionGroupForm}
                  ></Input>
                </div>
                <div className="col-4 ">
                  {/* <Input title="Type of Commission Group" name="Type of Commission Group"></Input> */}
                  <DropDown
                    title="Type of Commission Group"
                    placeholder={"Type"}
                    options={statusOptions}
                    name="type"
                    required={true}
                    value={commissionGroupForm.type}
                    onChange={CommissionHandleChange}
                    state={commissionGroupForm}
                  ></DropDown>
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
                    {commissionGroupForm?.catalogItems?.length > 0 ? (
                      <div className="w-7 align-items-center  p-2">
                        {commissionGroupForm?.catalogItems?.map(
                          (child, childIndex) => {
                            return (
                              <div className="flex justify-content-between  p-2  ">
                                <span className="text-xs font-semibold text-gray-600 w-6rem">
                                  {child.name}
                                </span>
                              </div>
                            );
                          }
                        )}
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
                    <div className=" flex flex-column  justify-content-center mx-6">
                      <div className="">
                        <Buttons
                          onClick={() => setShowCatalogItem(true)}
                          label="Add"
                          className="btn-dark border-none   "
                        ></Buttons>
                      </div>
                      <div className="">
                        <Buttons
                          onClick={removeAll}
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
                    {commissionGroupForm?.assignedEmployees?.length > 0 ? (
                      <div className="w-7 align-items-center  p-2">
                        {commissionGroupForm?.assignedEmployees?.map(
                          (child, childIndex) => {
                            return (
                              <div className="flex justify-content-between  p-2  ">
                                <span className="text-xs font-semibold text-gray-600 w-12rem">
                                  {child.firstName + " " + child.lastName}
                                </span>
                              </div>
                            );
                          }
                        )}
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
                    <div className=" flex flex-column  justify-content-center mx-6">
                      <div className="">
                        <Buttons
                          onClick={() => setShowAssignItem(true)}
                          label="Add"
                          className="btn-dark border-none   "
                        ></Buttons>
                      </div>
                      <div className="">
                        <Buttons
                          onClick={removeAllAssign}
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
              onClick={save}
                label="Save"
                className="btn-dark  mx-3  border-none"
              ></Buttons>
            </div>
            <div className="">
              <Buttons
                onClick={Back}
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
        <>
          {showCatalogItem
            ? AddCatalogItem()
            : showAssignItem
            ? AddAssignEmployee()
            : AddCommissionGroup()}
        </>
      ) : (
        <>
          <div>
            <div className="bg-lightest-blue border-round-lg py-2 px-3 flex justify-content-between align-items-center ">
              <div className="col-4 flex">
                <div className="w-6">
                  <DropDown
                    title="Commission Type"
                    placeholder={"Product"}
                    options={statusOptions}
                    onChange={(e) => setStatusData(e.value)}
                    value={statusData}
                  ></DropDown>
                </div>
                <div className="ml-4 w-6">
                  <DropDown
                    title="Type"
                    placeholder={"Type"}
                    options={activeStatusOptions}
                    onChange={(e) => setActiveStatusData(e.value)}
                    value={activeStatusData}
                  ></DropDown>
                </div>
              </div>
              <div className="mr-3">
                <div className="">
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
              </div>
            </div>
            <div className="mt-2">
              <TableData
                data={allCommissionData}
                columns={CommissionGroupColumn}
              ></TableData>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CommissionGroup;
