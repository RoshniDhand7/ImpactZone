import React, { useState } from "react";
import CardWithTitle from "../../../../../components/cards/cardWithTitle/cardWithTitle";
import Input from "../../../../../components/input/input";
import DropDown from "../../../../../components/dropdown/dropdown";
import Buttons from "../../../../../components/buttons/button";
import RecentCheckIn from "../../../../../components/cards/Profilecard/recentCheckIn";
import checkInData from "../../../../../utils/checkInData";
import ImageUpload from "../../../../../assets/icons/imgupload.png";
import White from "../../../../../assets/images/white.jpg";
import { InputTextarea } from "primereact/inputtextarea";
import constants from "../../../../../utils/constants";
import { showToast } from "../../../../../redux/actions/toastAction";
import { useDispatch } from "react-redux";
import api from "../../../../../services/api";
import { useNavigate } from "react-router-dom";

const GeneralAddEmployee = ({ data, setData }) => {
  const navigate = useNavigate();
  const [showSelectedImage, setSelectedImage] = useState(false);
  const dispatch = useDispatch();
  const createEmployee = async () => {
    const res = await api("post", constants.endPoints.CreateEmployee, data);
    console.log(res, "resss");
    if (res.success) {
      dispatch(showToast({ severity: "success", summary: res.message }));
      navigate("/employee");
    }
  };

  const handelChange = (name) => (e) => {
    // if (group?.length) {
    //   setData({ ...data, [group]: { ...data[group], [name]: e.target.value } });
    // } else {
    if(name === 'emailNotification') {
      setData({ ...data, [name]: (e?.target?.value || e.value) === 'Yes' ? true : false });
    } else {
      setData({ ...data, [name]: e?.target?.value || e.value });
    }
    // }
  };

  // const getImage = (el) => {
  //   var input = document.getElementById("file-input");
  //   document.getElementById("showImage").hidden = false;
  //   document.getElementById("showImage").src = URL.createObjectURL(
  //     input.files[0]
  //   );

  // };

  const dragNdrop = (event) => {
    var fileName = URL.createObjectURL(event.target.files[0]);
    var preview = document.getElementById("preview");
    var previewImg = document.createElement("img");
    previewImg.setAttribute("src", fileName);
    preview.innerHTML = "";
    preview.appendChild(previewImg);
  };
  const drag = () => {
    document.getElementById("uploadFile").parentNode.className =
      "draging dragBox";
  };
  const drop = () => {
    document.getElementById("uploadFile").parentNode.className = "dragBox";
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
                        value={data.hireDate && data.hireDate.split("T")[0]}
                        onChange={handelChange("hireDate")}
                      ></Input>
                    </div>
                    <div className="col-4">
                      <Input
                        title="ADP ID"
                        id=""
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
                        maxLength={12}
                        value={data.primaryPhone || null}
                        onChange={handelChange("primaryPhone")}
                      ></Input>
                    </div>
                    <div className="col">
                      <Input
                        title="Work Phone"
                        id=""
                        type="number"
                        maxLength={12}
                        pattern="[0-10]"
                        value={data.workPhone || null}
                        onChange={handelChange("workPhone")}
                      ></Input>
                    </div>
                    <div className="col-1">
                      <Input
                        title="Ext."
                        id=""
                        maxLength={4}
                        value={data.workPhoneExt || null}
                        onChange={handelChange("workPhoneExt")}
                      ></Input>
                    </div>
                    <div className="col">
                      <Input
                        title="Mobile Phone"
                        id=""
                        type="number"
                        pattern="[0-10]"
                        maxLength={12}
                        value={data.mobilePhone || null}
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
                          value={data.faxPhone || null}
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
                          <DropDown
                            title="Email Updates"
                            id=""
                            type="text"
                            options={["Yes", "No"]}                           
                            value={data.emailNotification ? 'Yes' : 'No'}
                            onChange={handelChange("emailNotification")}
                          ></DropDown>
                        </div>
                      </div>
                    </div>
                    <div className="col">
                      <div>
                        <Input
                          title="Emergency Phone"
                          id=""
                          type="number"
                          maxLength={12}
                          pattern="[0-10]"
                          value={data.emergencyPhone || null}
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
                      </div>
                    </div>
                    <div className="col-1">
                      <Input
                        title="Ext."
                        id=""
                        maxLength={4}
                        value={data.emergencyPhoneExt || null}
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
                        title="Online Nickname"
                        id=""
                        type="text"
                        value={data.onlineNickName}
                        onChange={handelChange("onlineNickName")}
                      ></Input>
                    </div>
                  </div>
                  <div className="col flex flex-column gap-2">
                    <label className="text-xs text-dark-gray   font-semibold">
                      Bio
                    </label>
                    {/* <span className="p-input-icon-left">
        <i className="pi pi-search" /> */}
                    <InputTextarea
                    onChange={handelChange("bio")}
                    value={data.bio}
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
                      className="col-12 bg-white border-dashed  my-2 border-gray-100 border-round-sm flex flex justify-content-between "
                    >
                      <div
                        id="preview"
                        style={{ width: "115px", height: "116px" }}
                      ></div>
                      <div className=" col-8  flex flex-cloumn justify-content-start align-items-center">
                        <div class="uploadOuter ml-6 flex flex-column justify-centent-center align-items-center text-center ">
                          <label
                            for="uploadFile"
                            class="btn btn-primary"
                          ></label>
                          <div
                            className="flex justify-centent-center align-items-center "
                            style={{ width: "60px", height: "60px" }}
                          >
                            <img src={ImageUpload} alt="" />
                          </div>
                          <div className="cursor-pointer">
                            <p class="dragBox text-base text-surface-300 cursor-pointer ">
                              Drag your photo here or Browse
                              <input
                                type="file"
                                onChange={dragNdrop}
                                ondragover={drag}
                                ondrop={drop}
                                id="uploadFile"
                                value={""}
                              />
                            </p>
                          </div>
                        </div>

                        <div className="my-3"></div>
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
