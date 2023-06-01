import React from "react";
import CardWithTitle from "../../../../../components/cards/cardWithTitle/cardWithTitle";
import Input from "../../../../../components/input/input";
import DropDown from "../../../../../components/dropdown/dropdown";
import Buttons from "../../../../../components/buttons/button";
import { Calendar } from "primereact/calendar";
import { useState } from "react";
import { DataTable } from "primereact/datatable";
import dummyData from "../../../../../utils/dummyData";
import { Column } from "primereact/column";
import RecentCheckIn from "../../../../../components/cards/Profilecard/recentCheckIn";
import checkInData from "../../../../../utils/checkInData";
import ImageUpload from "../../../../../assets/icons/imgupload.png";
import { InputTextarea } from "primereact/inputtextarea";

const Certifications = () => {
  const [dates, setDates] = useState(null);
  const { relationshipData } = dummyData();
  const [selectedPos, setSelectedPos] = useState(null);
  return (
    <>
      <div>
        <div>
          <CardWithTitle title="General">
            <div className="flex p-3">
              <div className="col">
                <DropDown title="Status" placeholder="Active"></DropDown>
              </div>
              <div className="col">
                <DropDown title="Status" placeholder="Active"></DropDown>
              </div>
              <div className="col">
                <Input title="Status" placeholder="Active"></Input>
              </div>
            </div>
          </CardWithTitle>
        </div>
        <div className="my-2">
          <CardWithTitle title="Acquired Date">
            <div className="flex">
              <div className=" p-4 flex ">
                <div className="col border-round bg-white ">Date</div>
                <div className="">
                  <Calendar
                    value={dates}
                    onChange={(e) => setDates(e.value)}
                    selectionMode="range"
                    readOnlyInput
                  />
                </div>
              </div>
              <div className="col-9 mt-2 flex">
                <div className="col">
                  <Buttons
                    label="Today"
                    className="bg-white text-sm text-900 border-none"
                  ></Buttons>
                </div>
                <div className="col">
                  <Buttons
                    label="Yesterday"
                    className="bg-white text-sm text-900 border-none"
                  ></Buttons>
                </div>
                <div className="col">
                  <Buttons
                    label="This Week"
                    className="bg-white text-sm text-900 border-none"
                  ></Buttons>
                </div>
                <div className="col">
                  <Buttons
                    label="Last Week"
                    className="bg-white text-sm text-900 border-none"
                  ></Buttons>
                </div>
                <div className="col">
                  <Buttons
                    label="This Month"
                    className="bg-white text-sm text-900 border-none"
                  ></Buttons>
                </div>
                <div className="col">
                  <Buttons
                    label="Last Month"
                    className="bg-white text-sm text-900 border-none"
                  ></Buttons>
                </div>
                <div className="col mr-2">
                  <Buttons
                    label="Search"
                    className="btn-dark text-sm  border-none"
                  ></Buttons>
                </div>
              </div>
            </div>
          </CardWithTitle>
        </div>
        <div className=" ">
          <DataTable
            value={relationshipData}
            selection={selectedPos}
            onSelectionChange={(e) => setSelectedPos(e.value)}
            dataKey="id"
            tableStyle={{ minWidth: "50rem" }}
          >
            {/* <Column
              selectionMode="multiple"
              headerStyle={{ width: "3rem" }}
            ></Column> */}
            <Column field="code" header="Name"></Column>
            <Column field="name" header="Certifiacte Number"></Column>
            <Column field="category" header="Description"></Column>
            <Column field="code" header="Issuer"></Column>
            <Column field="name" header="Acquired Date"></Column>
            <Column field="category" header="Expiration Date"></Column>
          </DataTable>
        </div>
      </div>
      <div className="flex justify-content-end p-2 ">
        <div className=" mt-3 flex  ">
          <div className=" mx-3">
            <Buttons
              label="Add "
              icon="pi pi-plus-circle"
              className="btn-dark p-3 px-4  border-none"
            ></Buttons>
          </div>
          <div className="">
            <Buttons
              label="Save"
              className="btn-dark p-3 px-4  border-none"
            ></Buttons>
          </div>
          <div className="ml-3 ">
            <Buttons
              label="Cancel"
              className="btn-grey p-3   border-none"
            ></Buttons>
          </div>
        </div>
      </div>
      <div>
        <RecentCheckIn data={checkInData}></RecentCheckIn>
      </div>
      <div>
        <CardWithTitle title="General">
          <div className="col flex justify-content-between">
            <div className="flex">
              <div className="col">
                <Input title="Name" placeholder="John"></Input>
              </div>
              <div className="col">
                <Input
                  title="Certification Number"
                  placeholder="2345678"
                ></Input>
              </div>
              <div className="col">
                <Input title="Issuer"></Input>
              </div>
            </div>
          </div>
          <div className="col flex justify-content-between">
            <div className="flex">
              <div className="col">
                <Input
                  title="Acquired Date"
                  placeholder="John"
                  type="date"
                ></Input>
              </div>
              <div className="col">
                <Input
                  title="Expiration Date"
                  type="date"
                  placeholder="2345678"
                ></Input>
              </div>
            </div>
          </div>
          <div className="col flex flex-column gap-2 p-3">
            <label className="text-xs text-dark-gray   font-semibold">
              Descriptions
            </label>
            {/* <span className="p-input-icon-left">
        <i className="pi pi-search" /> */}
            <InputTextarea
            // placeholder={placeholder}
            // icon={icon}
            // type={type}
            // onChange={onChange}
            ></InputTextarea>
            {/* </span> */}
          </div>
          <div className="p-3">
            <div className=" ">
              <span className="text-xl font-semibold">Upload Image</span>
              <div
                style={{ height: "235px" }}
                className="col-12 bg-white my-2 border-round-sm border-dashed border-gray-100 flex flex-column justify-content-center align-items-center "
              >
                <div className="flex flex-column justify-content-center align-items-center">
                  <div style={{ width: "60px", height: "60px" }}>
                    {" "}
                    <img src={ImageUpload} alt="" />
                  </div>

                  <div className="my-3">
                    <span className="text-base text-surface-300">
                      Drag your photo here or Browse
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardWithTitle>
      </div>
    </>
  );
};

export default Certifications;
