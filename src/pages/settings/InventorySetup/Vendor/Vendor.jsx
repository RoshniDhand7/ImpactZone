import React, { useState } from "react";
import DropDown from "../../../../components/dropdown/dropdown";
import Buttons from "../../../../components/buttons/button";
import TableData from "../../../../components/cards/dataTable/dataTable";
import Checkbox from "../../../../components/checkbox/checkbox";
import CardWithTitle from "../../../../components/cards/cardWithTitle/cardWithTitle";
import Input from "../../../../components/input/input";
import CustomTextarea from "../../../../components/input/InputTextArea";
import VendorContainer from "./VendorContainer";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

const Vendors = () => {
  
const {
  showAddVendor,
  setShowAddVendor,
  VendorColumn,
  AllVendorData,
  vendorOptions,
  vendorForm,
  vendorHandleChange,
  save,
  Back,
  statusOptions,
  statusData,
  setStatusData,
  State,
    City,
} = VendorContainer()




  const AddVendor = () => {
    return (
      <>
        <div>
          <div className="my-3">
            <Checkbox
              title="Active"
              className="text-900 text-sm font-semibold"
              name="isActive"
              value={vendorForm.isActive}
              onChange={vendorHandleChange}
            ></Checkbox>
          </div>
          <div>
            <CardWithTitle title="Add Vendors">
              <div className="flex p-2">
                <div className="col-4 ">
                  <Input title="Vendor Name" name="name" required={true} value={vendorForm.name} onChange={vendorHandleChange} state={vendorForm}></Input>
                </div>
                <div className="col-4 ">
                  <Input title="Address 1" name="address1" value={vendorForm.address1} onChange={vendorHandleChange} state={vendorForm}></Input>
                </div>
                <div className="col-4 ">
                  <Input title="Address 2" name="address2" value={vendorForm.address2} onChange={vendorHandleChange} state={vendorForm}></Input>
                </div>
              </div>
              <div className="flex p-2">
                {/* <div className="col-4 ">
                  <Input title="City" name="city" value={vendorForm.city} onChange={vendorHandleChange} state={vendorForm}></Input>
                </div> */}
                <div className="col-4 ">
                  <DropDown
                    title="State"
                    required={true}
                    name="state"
                    placeholder="Select one"
                    options={State.getStatesOfCountry("US").map((item)=>{return{label:item.name,value:item.isoCode}})}
                    value={vendorForm.state}
                    onChange={vendorHandleChange}
                    state={vendorForm}
                  ></DropDown>
                </div>
                <div className="col-4 ">
                  <DropDown
                    title="City"
                    required={true}
                    name="city"
                    placeholder="Select one"
                    options={City.getCitiesOfState("US",vendorForm.state).map((item)=>{return item.name})}
                    value={vendorForm.city}
                    onChange={vendorHandleChange}
                    state={vendorForm}
                  ></DropDown>
                </div>
                <div className="col-4 ">
                  <Input title="Zip code" type="number" name="zipCode" required={true} value={vendorForm.zipCode} onChange={vendorHandleChange} state={vendorForm}></Input>
                </div>
              </div>
              <div className="flex p-2">
                <div className="col-4 ">
                  <Input title="Phone no." type="number" name="contact" required={true} value={vendorForm.contact} onChange={vendorHandleChange} state={vendorForm}></Input>
                </div>
                <div className="col-4 ">
                  <Input title="Alternative no." type="number" name="phone" value={vendorForm.phone} onChange={vendorHandleChange} state={vendorForm}></Input>
                </div>
                <div className="col-4 ">
                  <Input title="Email" name="email" required={true} value={vendorForm.email} onChange={vendorHandleChange} state={vendorForm}></Input>
                </div>
              </div>
              <div className="flex p-2">
                <div className="col-4 ">
                  <DropDown 
                  title="Alternate Vendors" 
                  name="alternateVendors"
                  placeholder="Select one"
                  options={vendorOptions?.map((item)=>{return{label:item?.name,value:item?._id}})}
                  value={vendorForm.alternateVendors}
                    onChange={vendorHandleChange}
                    state={vendorForm}
                  ></DropDown>
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
      {showAddVendor ? (
        AddVendor()
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
                      setShowAddVendor(true);
                    }}
                    label="Add Vendors"
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
              data={AllVendorData.filter((item)=>{return statusData===item.isActive})} 
              columns={VendorColumn}>
              </TableData>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Vendors;
