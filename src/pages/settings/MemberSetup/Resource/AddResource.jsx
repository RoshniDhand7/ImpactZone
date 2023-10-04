import React, { useState } from "react";
import Input from "../../../../components/input/input";
import CardWithTitle from "../../../../components/cards/cardWithTitle/cardWithTitle";
import Checkbox from "../../../../components/checkbox/checkbox";
import Buttons from "../../../../components/buttons/button";
import RecentCheckIn from "../../../../components/cards/Profilecard/recentCheckIn";
import checkInData from "../../../../utils/checkInData";
import DropDown from "../../../../components/dropdown/dropdown";
import TableData from "../../../../components/cards/dataTable/dataTable";
import { useSelector } from "react-redux";
import MuliSelectDropDown from "../../../../components/dropdown/muliSelectDropDown";

const AddResource = ({ openAddResource,resource,ResourceHandleChange,showAddService,setShowAddService,selectedRow,setSelectedRow,removeAll,submit }) => {

  const resourceType = useSelector((state)=>state.resourceType.allResourceType)?.map((item)=> {return {label:item.name,value:item._id}})
  const locations = useSelector((state)=>state.locations.locations)?.map((item)=> {return {label:item.name,value:item._id}})
  const EventData = useSelector((state) => state.events.events)?.map((item)=> {return {label:item.name,value:item._id}})
  const PastDueOptions = useSelector((state) => state.staticData.duration)?.map((item)=> {return {label:item + " Minute",value:item}})


const AddResourcesMain = () => {
  return (
    <>
      <div>
        <div className="mt-3">
          <Checkbox
            title="Active"
            className="text-900 font-semibold"
            name="isActive"
            onChange={(e)=>ResourceHandleChange({name:"isActive",value:e.value})}
            value={resource.isActive}
          ></Checkbox>
        </div>
        <div className="mt-3">
          <CardWithTitle title="Resource ">
            <div className=" p-3">
              <div className="flex ">
                <div className="col">
                  <Input title="Name" name="name" value={resource.name} onChange={ResourceHandleChange} state={resource}></Input>
                </div>
                <div className="col">
                  <DropDown title="Resource Type" options={resourceType} optionLabel="label" name="resourceType" value={resource.resourceType} onChange={ResourceHandleChange} state={resource}></DropDown>
                </div>
                <div className="col">
                  <DropDown title="Location" options={locations} optionLabel="label" name="location" value={resource.location} onChange={ResourceHandleChange} state={resource}></DropDown>
                </div>
              </div>
              <div className="flex my-3">
                <div className="col">
                  <Input title="Available Quantity" name="availableQuantity" value={resource.availableQuantity} onChange={ResourceHandleChange} keyfilter="num" state={resource}></Input>
                </div>
                <div className="col">
                  <MuliSelectDropDown title="Used in Events" options={EventData} optionLabel="label" name="usedInEvents" value={resource.usedInEvents} onChange={ResourceHandleChange} state={resource}></MuliSelectDropDown>
                </div>
                <div className="col">
                  <DropDown title="Past Due" options={PastDueOptions} optionLabel="label" name="pastDue" value={resource.pastDue} onChange={ResourceHandleChange} state={resource}></DropDown>
                </div>
              </div>
              <div>
                {/* <div className="col-4 ">
                  <DropDown title="Services Assigned" name="services" value={resource.services} onChange={ResourceHandleChange}></DropDown>
                </div> */}
              </div>
            </div>
          </CardWithTitle>
        </div>
        <div className="mt-4">
                <CardWithTitle titlee="Add Services">
                  <div className="p-3">
                    <div className="flex justify-content-between align-items-center text-center w-7  p-2  ">
                      <span className="text-xs font-semibold text-gray-600">
                        Catalog Price
                      </span>
                      <span className="text-xs font-semibold text-gray-600 mr-6">
                        Name
                      </span>
                      <span className="text-xs font-semibold text-gray-600 mr-3 text-center">
                        Size
                      </span>
                      <span className="text-xs font-semibold text-gray-600">
                        Status
                      </span>
                    </div>

                    <div className="bg-white m-2 border-round-lg flex ">
                      {resource.services.length > 0 ? (
                        <div className="w-7 align-items-center text-center p-2">
                          {resource.services.map((child, childIndex) => {
                            return (
                              <div
                                className="flex justify-content-between text-center p-2  "
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
                        className="col flex justify-content-end align-items-center pr-7 "
                        style={{ height: "290px" }}
                      >
                        <div className="flex flex-column ">
                          
                          <div
                            className="my-3"
                            style={{ width: "128px", height: "35px" }}
                          >
                            <Buttons
                              label="Add"
                              onClick={()=>setShowAddService(true)}
                              className="btn-dark border-none "
                            ></Buttons>
                          </div>
                          
                          <div
                            className="my-3"
                            style={{ width: "128px", height: "35px" }}
                          >
                            <Buttons
                            onClick={removeAll}
                              className="btn-dark border-none"
                              label="Remove All"
                            ></Buttons>
                          </div>
                          
                        </div>
                      </div>
                    </div>
                  </div>
                  
                </CardWithTitle>
                
              </div>
              <div className="text-danger" style={{ color: "red" }}>
                  {resource?.formErrors?.services}
                </div>
      </div>
      <div className=" m-2 mt-3 flex justify-content-end">
        <div className="mx-3" style={{ width: "105px" }}>
          <Buttons label="Save" className="btn-dark border-none" onClick={submit}></Buttons>
        </div>
        <div className="">
          <Buttons
            onClick={openAddResource}
            label="Cancel"
            className="btn-grey border-none"
          ></Buttons>
        </div>
      </div>
      <div className="mt-4">
        <RecentCheckIn data={checkInData} />
      </div>
      
    </>
  )
}

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
              paginator
              rows={5}
              // selected={addEventData.services.detail}
              selected={selectedRow}
              // changeSelection={(e)=>serviceHandleChange(e)}
              changeSelection={(e) => {setSelectedRow(e.value)}}
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
              onClick={(e)=>{ResourceHandleChange({name:"services",value:selectedRow});setShowAddService(false)}}
              className="btn-dark mx-3   border-none"
            ></Buttons>
          </div>
          <div className="mt-3">
            <Buttons
            onClick={()=>{setShowAddService(false);}}
              label="Cancel"
              className="btn-grey   border-none"
            ></Buttons>
          </div>
        </div>
      </>
    );
  };
  return (
    <>{showAddService ? AddServices() : AddResourcesMain() }</>
    // <>
    //   <div>
    //     <div className="mt-3">
    //       <Checkbox
    //         title="Active"
    //         className="text-900 font-semibold"
    //       ></Checkbox>
    //     </div>
    //     <div className="mt-3">
    //       <CardWithTitle title="Resource ">
    //         <div className=" p-3">
    //           <div className="flex ">
    //             <div className="col">
    //               <Input title="Name" name="name" value={resource.name} onChange={ResourceHandleChange}></Input>
    //             </div>
    //             <div className="col">
    //               <DropDown title="Resource Type" name="resourceType" value={resource.resourceType} onChange={ResourceHandleChange}></DropDown>
    //             </div>
    //             <div className="col">
    //               <DropDown title="Location" name="location" value={resource.location} onChange={ResourceHandleChange}></DropDown>
    //             </div>
    //           </div>
    //           <div className="flex my-3">
    //             <div className="col">
    //               <Input title="Available Quantity" name="availableQuantity" value={resource.availableQuantity} onChange={ResourceHandleChange}></Input>
    //             </div>
    //             <div className="col">
    //               <DropDown title="Used in Events" name="usedInEvents" value={resource.usedInEvents} onChange={ResourceHandleChange}></DropDown>
    //             </div>
    //             <div className="col">
    //               <DropDown title="Past Due" name="pastDue" value={resource.pastDue} onChange={ResourceHandleChange}></DropDown>
    //             </div>
    //           </div>
    //           <div>
    //             {/* <div className="col-4 ">
    //               <DropDown title="Services Assigned" name="services" value={resource.services} onChange={ResourceHandleChange}></DropDown>
    //             </div> */}
    //                           <div className="">
    //             <CardWithTitle titlee={item?.level?.name}>
    //               <div className="p-3">
    //                 <div className="flex justify-content-between align-items-center text-center w-7  p-2  ">
    //                   <span className="text-xs font-semibold text-gray-600">
    //                     Catalog Price
    //                   </span>
    //                   <span className="text-xs font-semibold text-gray-600 mr-6">
    //                     Name
    //                   </span>
    //                   <span className="text-xs font-semibold text-gray-600 mr-3 text-center">
    //                     Size
    //                   </span>
    //                   <span className="text-xs font-semibold text-gray-600">
    //                     Status
    //                   </span>
    //                 </div>

    //                 <div className="bg-white m-2 border-round-lg flex ">
    //                   {resource.services.length > 0 ? (
    //                     <div className="w-7 align-items-center text-center p-2">
    //                       {resource.services.map((child, childIndex) => {
    //                         return (
    //                           <div
    //                             className="flex justify-content-between text-center p-2  "
    //                           >
    //                             <span className="text-xs font-semibold text-gray-600">
    //                               {child.catelogPrice}
    //                             </span>
    //                             <span className="text-xs font-semibold text-gray-600">
    //                               {child.name}
    //                             </span>
    //                             <span className="text-xs font-semibold text-gray-600">
    //                               {child.size}
    //                             </span>
    //                             <span className="text-xs font-semibold text-gray-600">
    //                               {child.status == true ? "true" : "false"}
    //                             </span>
    //                           </div>
    //                         );
    //                       })}
    //                     </div>
    //                   ) : (
    //                     <div className="col-9 flex justify-content-center align-items-center">
    //                       <span className="text-xs font-semibold text-gray-600 text-center ">
    //                         No Row To Show
    //                       </span>
    //                     </div>
    //                   )}

    //                   <div
    //                     className="col flex justify-content-end align-items-center pr-7 "
    //                     style={{ height: "290px" }}
    //                   >
    //                     <div className="flex flex-column ">
                          
    //                       <div
    //                         className="my-3"
    //                         style={{ width: "128px", height: "35px" }}
    //                       >
    //                         <Buttons
    //                           label="Add"
    //                           className="btn-dark border-none "
    //                         ></Buttons>
    //                       </div>
                          
    //                       <div
    //                         className="my-3"
    //                         style={{ width: "128px", height: "35px" }}
    //                       >
    //                         <Buttons
    //                           className="btn-dark border-none"
    //                           label="Remove All"
    //                         ></Buttons>
    //                       </div>
                          
    //                     </div>
    //                   </div>
    //                 </div>
    //               </div>
    //             </CardWithTitle>
    //           </div>
    //           </div>
    //         </div>
    //       </CardWithTitle>
    //     </div>
    //   </div>
    //   <div className=" m-2 mt-3 flex justify-content-end">
    //     <div className="mx-3" style={{ width: "105px" }}>
    //       <Buttons label="Save" className="btn-dark border-none"></Buttons>
    //     </div>
    //     <div className="">
    //       <Buttons
    //         onClick={openAddResource}
    //         label="Cancel"
    //         className="btn-grey border-none"
    //       ></Buttons>
    //     </div>
    //   </div>
    //   <div className="mt-4">
    //     <RecentCheckIn data={checkInData} />
    //   </div>
    // </>
  );
};

export default AddResource;
