import React, { useState } from "react";
import DropDown from "../../../components/dropdown/dropdown";
import Buttons from "../../../components/buttons/button";
import TableData from "../../../components/cards/dataTable/dataTable";
import Checkbox from "../../../components/checkbox/checkbox";
import CardWithTitle from "../../../components/cards/cardWithTitle/cardWithTitle";
import Input from "../../../components/input/input";
import CustomTextarea from "../../../components/input/InputTextArea";

const Vendors = () => {
  const [showAddVendor, setShowAddVendor] = useState();
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

  const VendorColumn = [
    {
      field: "VendorName",
      header: "Vendor Name",
      id: "",
      index: "",
    },
    {
      field: "Phone",
      header: "Phone",
      id: "",
      index: "",
    },

    {
      field: "Contact",
      header: "Contact",
      id: "",
      index: "",
    },
    {
      field: "Disconut",
      header: "Disconut",
      id: "",
      index: "",
    },
    {
      field: "AlternateVendor",
      header: "Alternate Vendor",
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
  const [VendorData, setVendorData] = useState([
    {
      VendorName: "Annual Fee",
      Phone: "Annual Fee",
      Contact: "",
      Disconut: "$49.99",
    },
    {
      VendorName: "Late Fee",
      Phone: "-",
      Contact: "",
      Disconut: "$49.99",
    },
    {
      VendorName: "Decline Fee",
      Phone: "-",
      Contact: "",
      Disconut: "$49.99",
    },
    {
      VendorName: "No Show Fee",
      Phone: "",
      Contact: "",
      Disconut: "$49.99",
    },
    {
      VendorName: "Freeze Fee",
      Phone: "",
      Contact: "",
      Disconut: "$49.99",
    },
  ]);

  const AddVendor = () => {
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
            <CardWithTitle title="Add Vendors">
              <div className="flex p-2">
                <div className="col-4 ">
                  <Input title="Vendor Name" name="name"></Input>
                </div>
                <div className="col-4 ">
                  <Input title="Address 1" name="name"></Input>
                </div>
                <div className="col-4 ">
                  <Input title="Address 2" name="name"></Input>
                </div>
              </div>
              <div className="flex p-2">
                <div className="col-4 ">
                  <Input title="City" name="name"></Input>
                </div>
                <div className="col-4 ">
                  <DropDown
                    title="State"
                    name="Available Categories"
                    placeholder="Select one"
                    options={["Yes", "No"]}
                  ></DropDown>
                </div>
                <div className="col-4 ">
                  <Input title="Zip code" name="name"></Input>
                </div>
              </div>
              <div className="flex p-2">
                <div className="col-4 ">
                  <Input title="Contact" name="name"></Input>
                </div>
                <div className="col-4 ">
                  <Input title="Phone" name="name"></Input>
                </div>
                <div className="col-4 ">
                  <Input title="Email" name="name"></Input>
                </div>
              </div>
              <div className="flex p-2">
                <div className="col-4 ">
                  <Input title="Alternate Vendors" name="name"></Input>
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
                onClick={() => setShowAddVendor(false)}
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
              <div className="col-2 ">
                <DropDown title="Status" placeholder={"Active"}></DropDown>
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
              <TableData data={VendorData} columns={VendorColumn}></TableData>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Vendors;
