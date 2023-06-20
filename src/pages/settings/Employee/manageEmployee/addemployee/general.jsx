import React from "react";
import CardWithTitle from "../../../../../components/cards/cardWithTitle/cardWithTitle";
import Input from "../../../../../components/input/input";
import DropDown from "../../../../../components/dropdown/dropdown";
import Buttons from "../../../../../components/buttons/button";
import RecentCheckIn from "../../../../../components/cards/Profilecard/recentCheckIn";
import checkInData from "../../../../../utils/checkInData";
import ImageUpload from "../../../../../assets/icons/imgupload.png";
import { InputTextarea } from "primereact/inputtextarea";
import constants from "../../../../../utils/constants";
import api from "../../../../../services/api";

const GeneralAddEmployee = ({ data, setData }) => {
  const createEmployee = async () => {
    const res = await api("post", constants.endPoints.CreateEmployee, data);
    console.log(res, "resss");
    if (res.success) {
    }
  };

  const handelChange = (name) => (e) => {
    setData({ ...data, [name]: e.target.value });
    console.log(data);
  };
  return (
    <>
      <div className="my-3">
        <div className="my-3 ">
          <div className="my-2">
            <div className="my-3">
              <CardWithTitle title="Employment">
                <div className="p-3 ">
                  <div className="flex ">
                    <div className="col-4">
                      <Input
                        title="Hire Date"
                        type="date"
                        id=""
                        value={data.hireDate}
                        onChange={handelChange("hireDate")}
                      ></Input>
                    </div>
                    <div className="col-4">
                      <Input
                        title="ADP ID"
                        id=""
                        type="number"
                        pattern="[0-10]"
                        value={data.adpId}
                        onChange={handelChange("adpId")}
                      ></Input>
                    </div>
                  </div>
                </div>
              </CardWithTitle>
            </div>
            <div className="my-3">
              <CardWithTitle title="Contact">
                <div className="p-3">
                  <div className="flex ">
                    <div className="col">
                      <Input
                        title="Primary Phone"
                        id=""
                        type="number"
                        pattern="[0-10]"
                        value={data.primaryPhone}
                        onChange={handelChange("primaryPhone")}
                      ></Input>
                    </div>
                    <div className="col">
                      <Input
                        title="Work Phone"
                        id=""
                        type="number"
                        pattern="[0-10]"
                        value={data.workPhone}
                        onChange={handelChange("workPhone")}
                      ></Input>
                    </div>
                    <div className="col-1">
                      <Input
                        title="Ext."
                        id=""
                        type="number"
                        maxLength={1}
                        value={data.workPhoneExt}
                        onChange={handelChange("workPhoneExt")}
                      ></Input>
                    </div>
                    <div className="col">
                      <Input
                        title="Mobile Phone"
                        id=""
                        type="number"
                        pattern="[0-10]"
                        value={data.mobilePhone}
                        onChange={handelChange("mobilePhone")}
                      ></Input>
                    </div>
                  </div>
                  <div className="flex mt-3">
                    <div className="col">
                      <div>
                        <Input
                          title="Fax Phone"
                          id=""
                          type="number"
                          pattern="[0-10]"
                          value={data.faxPhone}
                          onChange={handelChange("faxPhone")}
                        ></Input>
                      </div>
                      <div className="mt-4">
                        <div>
                          <Input
                            title="City"
                            id=""
                            type="text"
                            value={data.city}
                            onChange={handelChange("city")}
                          ></Input>
                        </div>
                        <div className="mt-4">
                          <Input
                            title="Email"
                            id=""
                            type="text"
                            value={data.email}
                            onChange={handelChange("email")}
                          ></Input>
                        </div>
                      </div>
                    </div>
                    <div className="col">
                      <div>
                        <Input
                          title="Emergency Phone"
                          id=""
                          type="number"
                          pattern="[0-10]"
                          value={data.emergencyPhone}
                          onChange={handelChange("emergencyPhone")}
                        ></Input>
                      </div>
                      <div className="mt-4">
                        <div>
                          <DropDown
                            title="State"
                            id=""
                            type="text"
                            value={data.state}
                            onChange={handelChange("state")}
                          ></DropDown>
                        </div>
                        <div className="mt-4">
                          <DropDown
                            title="Email Updates"
                            id=""
                            type="text"
                            value={data.firstname}
                            onChange={handelChange("emailNotification")}
                          ></DropDown>
                        </div>
                      </div>
                    </div>
                    <div className="col-1">
                      <Input
                        title="Ext."
                        id=""
                        type="number"
                        maxLength={1}
                        value={data.emergencyPhoneExt}
                        onChange={handelChange("emergencyPhoneExt")}
                      ></Input>
                    </div>
                    <div className="col">
                      <div>
                        <Input
                          title="Street Address"
                          id=""
                          type="text"
                          value={data.street}
                          onChange={handelChange("street")}
                        ></Input>
                      </div>
                      <div className="mt-4">
                        <Input
                          title="Zip Code"
                          id=""
                          type="text"
                          value={data.zipCode}
                          onChange={handelChange("zipCode")}
                        ></Input>
                      </div>
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
                      <Input
                        title="User Name"
                        id=""
                        type="text"
                        value={data.userName}
                        onChange={handelChange("userName")}
                      ></Input>
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
                  <div className="flex justify-content-end mr-2">
                    <span className="text-gray-400 text-xs">
                      Profile: (4000/4000)
                    </span>
                  </div>
                </div>
              </CardWithTitle>
            </div>
            <div className="my-3">
              <CardWithTitle title="Photo">
                <div className="p-3">
                  <div className=" ">
                    <span className="text-xl font-semibold">Upload Image</span>
                    <div
                      style={{ height: "235px" }}
                      className="col-12 bg-white border-dashed  my-2 border-gray-100 border-round-sm flex flex-column justify-content-center align-items-center "
                    >
                      <div className="flex flex-column justify-content-center align-items-center">
                        {/* <div style={{ width: "60px", height: "60px" }}>
                          <img src={ImageUpload} alt="" />
                        </div> */}
                        <div class="image-upload">
                          <label for="file-input">
                            <img
                              style={{ width: "60px", height: "60px" }}
                              src={ImageUpload}
                              alt=""
                            />
                          </label>

                          <input
                            id="file-input"
                            name="file-input"
                            type="file"
                            value={data.notes}
                            onChange={handelChange("notes")}
                          />
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
        <div className="flex justify-content-end p-2 ">
          <div className="  flex  ">
            <div className="mx-3">
              <Buttons
                onClick={() => createEmployee()}
                label="Save"
                className="btn-dark mx-2 border-none"
              ></Buttons>
            </div>
            <div className="ml-3 ">
              <Buttons
                label="Cancel"
                className="btn-grey  border-none"
              ></Buttons>
            </div>
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
