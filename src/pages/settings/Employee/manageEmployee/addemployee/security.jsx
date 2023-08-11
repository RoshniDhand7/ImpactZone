import CardWithTitle from "../../../../../components/cards/cardWithTitle/cardWithTitle";
import Input from "../../../../../components/input/input";
import DropDown from "../../../../../components/dropdown/dropdown";
import { PickList } from "primereact/picklist";
import itemsbackword from "../../../../../assets/icons/itemsbackward.png";
import Buttons from "../../../../../components/buttons/button";
import RecentCheckIn from "../../../../../components/cards/Profilecard/recentCheckIn";
import checkInData from "../../../../../utils/checkInData";
import Checkbox from "../../../../../components/checkbox/checkbox";
import { useState } from "react";
import { useEffect } from "react";
import constants from "../../../../../utils/constants";
import api from "../../../../../services/api";
import { showToast } from "../../../../../redux/actions/toastAction";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Security = ({ setData, data, setActiveTabIndex, createEmployee, errors, setErrors }) => {

  const [title, setTitle] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handelChange = (name) => (e) => {
    console.log(e)
    // if (group?.length) {
    //   setData({ ...data, [group]: { ...data[group], [name]: e.target.value } });
    // } else {
    if (name === "title") {
      setSelectedTitle(() => {
        return title.find((item) => item._id === e.target.value._id);
      });

      return setData({ ...data, title: e.target.value._id });
    }
    return setData({ ...data, [name]: e.target.value || e.value });
    // }
  };

  const createSecurity = async () => {
    await createEmployee();
  };

  const nextPage = async () => {
    createSecurity();
  };

  useEffect(() => {
    setErrors(false);
  }, [data]);

  const multiClubClockIn = ["true", "false"];

  const fetchTitle = async () => {
    const res = await api("get", constants.endPoints.JobTitle);
    if (res.success) {
      setTitle(res.data);
      setSelectedTitle(res.data.find((item) => item._id === data.title));
    } else {
      console.log(res);
    }
  };
  useEffect(() => {
    fetchTitle();
  }, [data]);

  const itemTemplate = (item) => {
    return (
      <div className="flex flex-wrap p-2 align-items-center gap-3">
        <img
          className="w-4rem shadow-2 flex-shrink-0 border-round"
          src={itemsbackword}
          alt={item.name}
        />
        <div className="flex-1 flex flex-column gap-2">
          <span className="font-bold">{item.name}</span>
          <div className="flex align-items-center gap-2">
            <i className="pi pi-tag text-sm"></i>
            <span>{item.category}</span>
          </div>
        </div>
        <span className="font-bold text-900">${item.price}</span>
      </div>
    );
  };
  return (
    <>
      <div className="my-3">
        <Checkbox
          title="Active"
          value={data.isActive}
          onclick={() => {
            setData({ ...data, isActive: !data.isActive });
          }}
          className=" text-900 font-semibold "
        />
        <div>
          <div className="my-3">
            <CardWithTitle title="Personal">
              <div className="p-3">
                <div className="flex ">
                  <div className="col  ">
                    <div>
                      <Input
                        id=""
                        type="text"
                        title="First Name"
                        required
                        value={data.firstName}
                        onChange={handelChange("firstName")}
                      ></Input>
                      {errors.firstName && (
                        <p className="text-red-600 text-xs mt-1">
                          {errors.firstName}
                        </p>
                      )}
                    </div>
                    <div className="mt-4">
                      <Input
                        title="Date of Birth"
                        placeholder="11/08/1998"
                        type="date"
                        value={data.dob.split("T")[0]}
                        onChange={handelChange("dob")}
                      ></Input>
                    </div>
                  </div>
                  <div className="col-1">
                    <Input
                      id="data"
                      title="M.I"
                      maxLength={1}
                      type="text"
                      pattern="[A-Za-z]{1}"
                      value={data.middleInitial}
                      onChange={handelChange("middleInitial")}
                    ></Input>
                  </div>
                  <div className="col">
                    <div>
                      <Input
                        title="Last Name"
                        required
                        type="text"
                        value={data.lastName}
                        onChange={handelChange("lastName")}
                      ></Input>
                      {errors.lastName && (
                        <p className="text-red-600 text-xs mt-1">
                          {errors.lastName}
                        </p>
                      )}
                    </div>
                    <div className="mt-4">
                      <Input
                        title="Social Security #"
                        type="text"
                        value={data.socialSecurity}
                        onChange={handelChange("socialSecurity")}
                      ></Input>
                    </div>
                  </div>
                  <div className="col">
                    <DropDown
                      title="Title"
                      type="text"
                      options={title}
                      optionLabel="title"
                      value={selectedTitle}
                      onChange={handelChange("title")}
                    ></DropDown>
                  </div>
                </div>
              </div>
            </CardWithTitle>
          </div>
          <CardWithTitle title="System">
            <div className="p-3">
              <div className="flex ">
                <div className="col-4">
                  <Input
                    title="Barcode"
                    value={data.barCode}
                    pattern="[0-9]*"
                    onChange={handelChange("barCode")}
                    required
                  ></Input>
                  {errors.barCode && (
                    <p className="text-red-600 text-xs mt-1">
                      {errors.barCode}
                    </p>
                  )}
                </div>
                <div className="col-4">
                  <Input
                    title="Access Code"
                    pattern="[0-9]*"
                    value={data.accessCode}
                    onChange={handelChange("accessCode")}
                  ></Input>
                </div>
                <div className="col-4">
                  <Input
                    title="Email"
                    value={data.email}
                    onChange={handelChange("email")}
                    required
                  ></Input>
                  {errors.email && (
                    <p className="text-red-600 text-xs mt-1">{errors.email}</p>
                  )}
                </div>
              </div>
              <div className="flex mt-3">
                <div className="col-4">
                  <DropDown
                    title="Multi-Club Clock In/Out"
                    value={String(data.multiClubClockIn)}
                    options={multiClubClockIn}
                    onChange={handelChange("multiClubClockIn")}
                  ></DropDown>
                </div>
              </div>
            </div>
          </CardWithTitle>
        </div>
        <div className="mt-3">
          <CardWithTitle title="Select Roles">
            <div className="p-3">
              <div className="card  ">
                <PickList
                  // source={source}
                  // target={target}
                  // onChange={onChange}
                  itemTemplate={itemTemplate}
                  breakpoint=""
                  sourceHeader="Available"
                  targetHeader="Selected"
                  sourceStyle={{ height: "30rem" }}
                  targetStyle={{ height: "30rem" }}
                />
              </div>
            </div>
          </CardWithTitle>
        </div>
      </div>
      <div className="flex justify-content-end p-2 ">
        <div className=" mt-3 flex  ">
          <div className="">
            <Buttons
              onClick={nextPage}
              label="Save"
              className="btn-dark px-4  border-none"
            ></Buttons>
          </div>
          <div className="ml-3 ">
            <Buttons label="Cancel" className="btn-grey  border-none"></Buttons>
          </div>
        </div>
      </div>
      <div>
        <RecentCheckIn data={checkInData}></RecentCheckIn>
      </div>
    </>
  );
};

export default Security;
