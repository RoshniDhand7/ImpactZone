import React from "react";
import CardWithTitle from "../../components/cards/cardWithTitle/cardWithTitle";
import Image from "../../assets/images/image.png";
import Dropdown from "../../components/dropdown/dropdown";
import Input from "../../components/input/input";
import Buttons from "../../components/buttons/button";
import RecentCheckIn from "../../components/cards/Profilecard/recentCheckIn";
import checkInData from "../../utils/checkInData";
import { InputTextarea } from "primereact/inputtextarea";

// import { InputTextarea } from "primereact/inputtextarea";

const AddMember = () => {
  // const [value, setValue] = useState();
  return (
    <>
      <div className=" p-2">
        <div className="m-2">
          <h4>Fast Add</h4>
        </div>
        <div className="m-2 ">
          <CardWithTitle title="Membership">
            <div className="grid m-0 p-3">
              <div className="col-2 flex justify-content-center align-items-center">
                <div>
                  <img
                    src={Image}
                    alt=""
                    style={{ width: "161px", height: "170px" }}
                  />
                </div>
              </div>
              <div className="col-9 grid flex-column  justify-content-between  ">
                <div className="grid m-0">
                  <div className="col-4">
                    <Dropdown
                      title="Create Type "
                      placeholder="Prospect"
                      value=""
                      optionLabel="Create Type"
                    />
                  </div>
                  <div className="col-4">
                    <Input title="Barcode"></Input>
                  </div>
                  <div className="col-4">
                    <Dropdown
                      title="Group"
                      placeholder="None"
                      value=""
                      optionLabel="Create Type"
                    />
                  </div>
                </div>
                <div className="col-12 ">
                  <div className=" flex flex-column gap-2">
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
              </div>
            </div>
          </CardWithTitle>
        </div>
        <div className="m-2">
          <CardWithTitle title="Personal">
            <div className="grid m-0 p-3">
              <div className="col-4">
                <div className="flex">
                  <div className="col">
                    <Input title="FirstName"></Input>
                  </div>
                  <div className="col-3">
                    <Input title="M.I"></Input>
                  </div>
                </div>
                <div className="col">
                  <Input
                    title="Date of Birth"
                    placeholder="mm/dd/yy"
                    type="date"
                  ></Input>
                </div>
                <div className="col">
                  <Input title="Mobile"></Input>
                </div>
              </div>
              <div className="col-4">
                <div className="col">
                  <Input title="Last Name" placeholder="" type="text"></Input>
                </div>
                <div className="col">
                  <Input title="Driver’s License" type=" text"></Input>
                </div>
                <div className="flex">
                  <div className="col">
                    <Input title="Work Number"></Input>
                  </div>
                  <div className="col-3">
                    <Input title="Work Ext"></Input>
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div className="col">
                  <Dropdown title="Gender" placeholder="Unknown" type="text" />
                </div>
                <div className="col">
                  <Input title="Primary Phone*" type=" text"></Input>
                </div>
              </div>
            </div>
          </CardWithTitle>
        </div>
        <div className="m-2">
          <CardWithTitle title="Address">
            <div className="grid flex-column m-0 p-3">
              <div className="col-12 ">
                <div className="flex">
                  <div className="col-4">
                    <Input
                      title="Street"
                      placeholder=" "
                      type=""
                      onChange=""
                    ></Input>
                  </div>
                  <div className="col-4">
                    <Input
                      title="City"
                      placeholder=" "
                      type=""
                      onChange=""
                    ></Input>
                  </div>
                  <div className="col-4">
                    <Dropdown
                      title="State"
                      placeholder="NJ - New Jersey "
                      type=""
                      onChange=""
                    ></Dropdown>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="flex">
                  <div className="col-4">
                    <Input
                      title="Zip Code"
                      placeholder="07648 "
                      type=""
                      onChange=""
                    ></Input>
                  </div>
                </div>
              </div>
            </div>
          </CardWithTitle>
        </div>
        <div className="m-2">
          <CardWithTitle title="Sale">
            <div className="grid flex-column m-0 p-3">
              <div className="col-12 ">
                <div className="flex">
                  <div className="col-4">
                    <Input
                      title="Visits Allowed"
                      placeholder=" "
                      type=""
                      onChange=""
                    ></Input>
                  </div>
                  <div className="col-4">
                    <Dropdown
                      title="Lead Priority"
                      placeholder="Select One "
                      type=""
                      onChange=""
                    ></Dropdown>
                  </div>
                  <div className="col-4">
                    <label
                      htmlFor=""
                      className="text-xs text-dark-gray font-semibold"
                    >
                      Sales Person
                    </label>
                    <h6 className="underline cursor-pointer text-light-blue-200 mt-3 ">
                      None
                    </h6>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="flex">
                  <div className="col-4">
                    <Dropdown
                      title="Campaign"
                      placeholder="Select One "
                      type=""
                      onChange=""
                    ></Dropdown>
                  </div>
                </div>
              </div>
            </div>
          </CardWithTitle>
        </div>
        <div className="m-2">
          <CardWithTitle title="Dates">
            <div className="grid flex-column m-0 p-3">
              <div className="col-12 ">
                <div className="flex">
                  <div className="col-4">
                    <Input
                      title="Issue"
                      placeholder=" "
                      type="date"
                      onChange=""
                    ></Input>
                  </div>
                  <div className="col-4">
                    <Input
                      title="Tour"
                      placeholder=" "
                      type="date"
                      onChange=""
                    ></Input>
                  </div>
                  <div className="col-4">
                    <Input
                      title="First Visit"
                      placeholder="NJ - New Jersey "
                      type="date"
                      onChange=""
                    ></Input>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="flex">
                  <div className="col-4">
                    <Input
                      title="Begin"
                      placeholder="07648 "
                      type="date"
                      onChange=""
                    ></Input>
                  </div>
                  <div className="col-4">
                    <Input
                      title="Expiration"
                      placeholder="07648 "
                      type="date"
                      onChange=""
                    ></Input>
                  </div>
                </div>
              </div>
            </div>
          </CardWithTitle>
        </div>
        <div className="m-2">
          <CardWithTitle title="Miscellaneous">
            <div className="grid flex-column m-0 p-3">
              <div className="col-12 ">
                <div className="flex">
                  <div className="col-4">
                    <Input
                      title="Occupation"
                      placeholder=" "
                      type=""
                      onChange=""
                    ></Input>
                  </div>
                  <div className="col-4">
                    <Input
                      title="Employer"
                      placeholder=" "
                      type=""
                      onChange=""
                    ></Input>
                  </div>
                  <div className="col-4">
                    <Input
                      title="Miscellaneous 1"
                      placeholder="NJ - New Jersey "
                      type=""
                      onChange=""
                    ></Input>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="flex">
                  <div className="col-4">
                    <Input
                      title="Miscellaneous 2"
                      placeholder="07648 "
                      type=""
                      onChange=""
                    ></Input>
                  </div>
                </div>
              </div>
            </div>
          </CardWithTitle>
        </div>
        <div className="col-12 flex  justify-content-end">
          <div className="col-1">
            <Buttons
              label="Save"
              className=" btn-dark border-none p-3 "
            ></Buttons>
          </div>
          <div className="col-1">
            <Buttons
              label="Cancel"
              className="ml-2 p-3 btn-grey border-none "
            ></Buttons>
          </div>
        </div>
        <div className="">
          <RecentCheckIn data={checkInData} />
        </div>
      </div>
    </>
  );
};

export default AddMember;
