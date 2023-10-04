import React, { useState } from "react";
import DropDown from "../../../../components/dropdown/dropdown";
import Buttons from "../../../../components/buttons/button";
import TableData from "../../../../components/cards/dataTable/dataTable";
import RecentCheckIn from "../../../../components/cards/Profilecard/recentCheckIn";
import checkInData from "../../../../utils/checkInData";
import AddResourceType from "./AddResourceType";
import ResourceTypeContainer from "./ResourceTypeContainer";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { FilterMatchMode, FilterOperator } from 'primereact/api';

const ResourceType = () => {
 
  const {resourceType,resourceTypeHandleChange,resourceTypeSubmit,ResourceTypeColumn,setAddResourceType,showAddResourceType,openADDResourceType,ResourceTypeData} = ResourceTypeContainer()

  // const [globalFilterValue, setGlobalFilterValue] = useState('');
  // const [filters, setFilters] = useState({
  //   global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  // });
  
  // const onGlobalFilterChange = (e) => {
  //   const value = e.target.value;
  //   let _filters = { ...filters };
  
  //   _filters['global'].value = value;
  
  //   setFilters(_filters);
  //   setGlobalFilterValue(value);
  // };

  // const options = [
  //   {label:"Active",value:true},
  //   {label:"Inactive",value:false}
  // ]


  return (
    <>
      {showAddResourceType ? (
        <AddResourceType openADDResourceType={openADDResourceType} resourceType={resourceType} resourceTypeHandleChange={resourceTypeHandleChange} resourceTypeSubmit={resourceTypeSubmit}/>
      ) : (
        <>
          <div>
          <ConfirmDialog />
            <div className="my-3">
              <span className="text-xl font-bold text-900">Resource Type</span>
            </div>
            <div className=" flex justify-content-between bg-lightest-blue border-round-lg px-2">
              <div className="col-7 flex">
                <div className="col-3">
                  {/* <DropDown title="Status" value={globalFilterValue} onChange={onGlobalFilterChange} options={options} optionLabel="label"></DropDown> */}
                  <DropDown title="Status"  optionLabel="label"></DropDown>
                </div>
              </div>
              <div>
                <div className="p-3 mt-2">
                  <div className="mt-3">
                    <Buttons
                      onClick={openADDResourceType}
                      style={{ width: "118px", height: "37px" }}
                      icon="pi pi-plus-circle"
                      className="btn-dark border-none"
                      label="Add Resource Type"
                    ></Buttons>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-2">
              {/* <TableData filters={filters} columns={ResourceTypeColumn} data={ResourceTypeData} /> */}
              <TableData columns={ResourceTypeColumn} data={ResourceTypeData} />
            </div>
          </div>
          {/* <div className=" m-2 mt-3 flex justify-content-end">
            <div className="mx-3">
              <Buttons
                label="Print"
                className="bg-yellow  text-900  border-none"
                icon={
                  <i className="pi pi-print " style={{ fontSize: "1rem" }}></i>
                }
              ></Buttons>
            </div>
            <div className="">
              <Buttons
                label="Close"
                className="btn-grey text-900  border-none"
              ></Buttons>
            </div>
          </div> */}
          <div className="mt-4">
            <RecentCheckIn data={checkInData} />
          </div>
        </>
      )}
    </>
  );
};

export default ResourceType;
