import React from "react";
import Checkbox from "../../../../../components/checkbox/checkbox";
import CardWithTitle from "../../../../../components/cards/cardWithTitle/cardWithTitle";
import Input from "../../../../../components/input/input";
import DropDown from "../../../../../components/dropdown/dropdown";
import Buttons from "../../../../../components/buttons/button";
import RecentCheckIn from "../../../../../components/cards/Profilecard/recentCheckIn";
import checkInData from "../../../../../utils/checkInData";
import ImageUpload from "../../../../../assets/icons/imgupload.png";
import { InputTextarea } from "primereact/inputtextarea";

const GeneralAddEmployee = () => {
  return (
    <>
      <div className="my-3">
        <Checkbox title="Active" className=" text-900 font-semibold " />
        <div className="my-3 ">
          <div className="my-2">
            {/* <CardWithTitle title="Personal">
              <div className="p-3">
                <div className="flex ">
                  <div className="col">
                    <Input title="First Name"></Input>
                  </div>
                  <div className="col-1">
                    <Input title="M.I"></Input>
                  </div>
                  <div className="col">
                    <Input title="Last Name"></Input>
                  </div>
                  <div className="col">
                    <DropDown title="Title"></DropDown>
                  </div>
                </div>
                <div className="flex">
                  <div className="col-3">
                    <Input
                      title="Date of Birth"
                      placeholder="11/08/1998"
                    ></Input>
                  </div>
                  <div className="col-3">
                    <Input title="Social Security #"></Input>
                  </div>
                </div>
              </div>
            </CardWithTitle> */}
            <div className="my-2">
              <CardWithTitle title="Employment">
                <div className="p-3">
                  <div className="flex ">
                    <div className="col-4">
                      <Input title="Hire Date" type="date"></Input>
                    </div>
                    <div className="col-4">
                      <Input title="ADP ID"></Input>
                    </div>
                  </div>
                </div>
              </CardWithTitle>
            </div>
            <div className="my-2">
              <CardWithTitle title="Contact">
                <div className="p-3">
                  <div className="flex ">
                    <div className="col">
                      <Input title="Primary Phone"></Input>
                    </div>
                    <div className="col">
                      <Input title="Work Phone"></Input>
                    </div>
                    <div className="col-2">
                      <Input title="Ext."></Input>
                    </div>
                    <div className="col">
                      <Input title="Mobile Phone"></Input>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="col">
                      <Input title="Fax Phone"></Input>
                    </div>
                    <div className="col">
                      <Input title="Emergency Phone"></Input>
                    </div>
                    <div className="col-2">
                      <Input title="Ext"></Input>
                    </div>
                    <div className="col">
                      <Input title="Street Address"></Input>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="col">
                      <Input title="City"></Input>
                    </div>
                    <div className="col">
                      <DropDown title="State"></DropDown>
                    </div>
                    <div className="col-2">
                      <Input title="Zip Code"></Input>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="col">
                      <Input title="Email"></Input>
                    </div>
                    <div className="col">
                      <DropDown title="Email Updates"></DropDown>
                    </div>
                  </div>
                </div>
              </CardWithTitle>
            </div>
            <div className="my-2">
              <CardWithTitle title="Online">
                <div className="p-3">
                  <div className="flex ">
                    <div className="col">
                      <Input title="User Name"></Input>
                    </div>
                  </div>
                  <div className="col flex flex-column gap-2">
                    <label className="text-xs text-dark-gray   font-semibold">
                      Notes
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
                </div>
              </CardWithTitle>
            </div>
            <div className="my-2">
              <CardWithTitle title="Photo">
                <div className="p-3">
                  <div className=" ">
                    <span className="text-xl font-semibold">Upload Image</span>
                    <div
                      style={{ height: "235px" }}
                      className="col-12 bg-white border-dashed  my-2 border-gray-100 border-round-sm flex flex-column justify-content-center align-items-center "
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
          </div>
        </div>
        <div className="flex justify-content-end col-12">
          <div className="flex col-2  ">
            <Buttons
              label="Save"
              className="btn-dark p-3  border-none"
            ></Buttons>
            <Buttons
              label="Cancel"
              className="btn-grey mx-2 border-none"
            ></Buttons>
          </div>
        </div>
      </div>
      <div>
        <RecentCheckIn data={checkInData} />
      </div>
    </>
  );
};

export default GeneralAddEmployee;
