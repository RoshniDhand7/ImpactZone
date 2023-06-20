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
import { showToast } from "../../../../../redux/actions/toastAction";
import { useDispatch } from "react-redux";
import api from "../../../../../services/api";
import { useNavigate } from "react-router-dom";

const GeneralAddEmployee = ({ data, setData }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const createEmployee = async () => {
    const res = await api("post", constants.endPoints.CreateEmployee, data);
    console.log(res, "resss");
    if (res.success) {
      dispatch(showToast({ severity: "success", summary: res.message }));
      navigate("/employee");
    }
  };

  const handelChange = (group, name) => (e) => {
    if (group?.length) {
      setData({ ...data, [group]: { ...data[group], [name]: e.target.value } });
    } else {
      setData({ ...data, [name]: e.target.value || e.value });
    }
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
                        value={data.employmentInfo.hireDate}
                        onChange={handelChange("employmentInfo", "hireDate")}
                      ></Input>
                    </div>
                    <div className="col-4">
                      <Input
                        title="ADP ID"
                        id=""
                        type="number"
                        pattern="[0-10]"
                        value={data.employmentInfo.adpId}
                        onChange={handelChange("employmentInfo", "adpId")}
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
                        value={data.contactInfo.primaryPhone}
                        onChange={handelChange("contactInfo", "primaryPhone")}
                      ></Input>
                    </div>
                    <div className="col">
                      <Input
                        title="Work Phone"
                        id=""
                        type="number"
                        pattern="[0-10]"
                        value={data.contactInfo.workPhone}
                        onChange={handelChange("contactInfo", "workPhone")}
                      ></Input>
                    </div>
                    <div className="col-1">
                      <Input
                        title="Ext."
                        id=""
                        type="number"
                        maxLength={1}
                        value={data.contactInfo.workPhoneExt}
                        onChange={handelChange("contactInfo", "workPhoneExt")}
                      ></Input>
                    </div>
                    <div className="col">
                      <Input
                        title="Mobile Phone"
                        id=""
                        type="number"
                        pattern="[0-10]"
                        value={data.contactInfo.mobilePhone}
                        onChange={handelChange("contactInfo", "mobilePhone")}
                      ></Input>
                    </div>
                  </div>
                  <div className="flex mt-3">
                    <div className="col">
                      <div>
                        <Input
                          title="Fax Phone"
                          id=""
                          type=""
                          pattern="[0-10]"
                          value={data.contactInfo.faxPhone}
                          onChange={handelChange("contactInfo", "faxPhone")}
                        ></Input>
                      </div>
                      <div className="mt-4">
                        <div>
                          <Input
                            title="City"
                            id=""
                            type="text"
                            value={data.contactInfo.city}
                            onChange={handelChange("contactInfo", "city")}
                          ></Input>
                        </div>
                        <div className="mt-4">
                          <Input
                            title="Email"
                            id=""
                            type="text"
                            value={data.contactInfo.email}
                            onChange={handelChange("contactInfo", "email")}
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
                          value={data.contactInfo.emergencyPhone}
                          onChange={handelChange(
                            "contactInfo",
                            "emergencyPhone"
                          )}
                        ></Input>
                      </div>
                      <div className="mt-4">
                        <div>
                          <DropDown
                            title="State"
                            id=""
                            type="text"
                            value={data.contactInfo.state}
                            onChange={handelChange("contactInfo", "state")}
                          ></DropDown>
                        </div>
                        <div className="mt-4">
                          <DropDown
                            title="Email Updates"
                            id=""
                            type="text"
                            value={data.contactInfo.firstname}
                            onChange={handelChange(
                              "contactInfo",
                              "emailNotification"
                            )}
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
                        value={data.contactInfo.emergencyPhoneExt}
                        onChange={handelChange(
                          "contactInfo",
                          "emergencyPhoneExt"
                        )}
                      ></Input>
                    </div>
                    <div className="col">
                      <div>
                        <Input
                          title="Street Address"
                          id=""
                          type="text"
                          value={data.contactInfo.street}
                          onChange={handelChange("contactInfo", "street")}
                        ></Input>
                      </div>
                      <div className="mt-4">
                        <Input
                          title="Zip Code"
                          id=""
                          type="text"
                          value={data.contactInfo.zipCode}
                          onChange={handelChange("contactInfo", "zipCode")}
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
                        value={data.onlineInfo.userName}
                        onChange={handelChange("onlineInfo", "userName")}
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
