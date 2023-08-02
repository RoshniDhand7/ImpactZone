import React, { useState } from "react";
import Divide from "../../../../../../assets/icons/box.png";
import DropDown from "../../../../../../components/dropdown/dropdown";
import CardWithTitle from "../../../../../../components/cards/cardWithTitle/cardWithTitle";
import Input from "../../../../../../components/input/input";
import Buttons from "../../../../../../components/buttons/button";
import RecentCheckIn from "../../../../../../components/cards/Profilecard/recentCheckIn";
import checkInData from "../../../../../../utils/checkInData";
import TableData from "../../../../../../components/cards/dataTable/dataTable";
import constants from "../../../../../../utils/constants";
import api from "../../../../../../services/api";
import Add from "../../../../../../assets/icons/Add.png";
import Remove from "../../../../../../assets/icons/remove.png";
import { useEffect } from "react";

const AppointmentPay = ({ data, setData, createEmployee }) => {
  const [dropDownLevels, setDropDownLevels] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState({});
  const [selectedOptions, setSelectedOptions] = useState([
    ...data.appointmentCommissionSetups,
  ]);
  const [defaultPay, setDefaultPay] = useState("");
  const [isPriceInDollars, setIsPriceInDollars] = useState(true);

  const priorities = ["Suggested", "High", "Medium", "Low"];

  const removeSelectedAppointment = (index) => {
    const newArr = [...selectedOptions];
    newArr.splice(index, 1);
    setSelectedOptions(newArr);
  };

  const changePriority = (e, col) => {
    col.priority = e.value;
    setSelectedOptions([...selectedOptions]);
  };

  const getLevels = async () => {
    const res = await api("get", constants.endPoints.AddLevel);
    if (res.success) {
      setDropDownLevels(res.data);
    } else {
      console.log(res);
    }
  };
  const selectAllOptions = () => {
    setSelectedOptions([...relationshipData]);
  };

  useEffect(() => {
    getLevels();
  }, []);

  const handleChange = (name, payRow) => (e) => {
    if (name === "classLevel") {
      setSelectedLevel(() => {
        return dropDownLevels.find((item) => item._id === e.target.value._id);
      });
      return setData({ ...data, [name]: e.target.value._id });
    }
  };

  const [relationshipData] = useState([
    {
      id: 1,
      name: "3D Body Scan",
      commissionType: "",
      pay: 0,
      isPayTypeDollar: true
    },
    {
      id: 2,
      name: "Aga Group 30 Min",
      commissionType: "",
      pay: 0,
      isPayTypeDollar: true
    },
    {
      id: 3,
      name: "Aga Group 45 Min",
      commissionType: "",
      pay: 0,
      isPayTypeDollar: true
    },
  ]);

  const onEnterDefaultPay = (event) => {
    setDefaultPay(event.target.value);
    selectedOptions.map((item) => {
      item.pay = event.target.value;
      return item;
    });
    setSelectedOptions([...selectedOptions]);
  };

  return (
    <>
      <div>
        <div className="col-2 mb-2">
          <DropDown title="Similar To" placeholder="Select Employee"></DropDown>
        </div>
        <div>
          <CardWithTitle title="General">
            <div className="p-3 flex">
              <div className="col-2">
                <DropDown
                  value={selectedLevel}
                  options={dropDownLevels}
                  optionLabel={"name"}
                  onChange={handleChange("classLevel")}
                  title="Class Level"
                ></DropDown>
              </div>
              <div className="col-2">
                <Input
                  title="Default"
                  value={defaultPay}
                  onChange={(e) => onEnterDefaultPay(e)}
                ></Input>
              </div>
              <div
                style={{ width: "18px", height: "20px" }}
                className="flex align-items-center mt-5"
              >
                <span
                  className={
                    "mt-2 cursor-pointer ml-3 " +
                    (isPriceInDollars ? "selected-price-type" : "")
                  }
                  onClick={() => setIsPriceInDollars(true)}
                >
                  $
                </span>
                <span
                  className={
                    "mt-2 cursor-pointer ml-3 " +
                    (!isPriceInDollars ? "selected-price-type" : "")
                  }
                  onClick={() => setIsPriceInDollars(false)}
                >
                  %
                </span>

                {/* <img src={Divide} alt="" className="mx-2 mt-2" /> */}
              </div>
            </div>
          </CardWithTitle>
        </div>
        <div className="my-3">
          {/* <span className="font-bold text-900 text-xl ">Commission Setups</span> */}
          <div className="mt-2">
            <div className=" ">
              <div className="mt-3">
                <CardWithTitle title="Commission Setups">
                  <div className="p-3">
                    <div className="flex justify-content-between px-3 p-3">
                      <div className="text-xs  font-semibold text-dark-gray ">
                        Name
                      </div>
                      <div className=" font-semibold mr-5  text-xs text-dark-gray">
                        Priority
                      </div>
                      <div className=" font-semibold  ml-8 text-xs text-dark-gray">
                        Pay
                      </div>
                      {selectedOptions.length ? (
                        <div
                          onClick={() => setSelectedOptions([])}
                          className="text-blue  font-semibold cursor-pointer  text-xs "
                        >
                          Remove All
                        </div>
                      ) : (
                        <div></div>
                      )}
                    </div>
                    <div className="text-sm">
                      <div
                        className="bg-white text-sm border-round-md "
                        style={{ maxHeight: "280px", overflow: "auto" }}
                      >
                        {selectedOptions.length ? (
                          selectedOptions?.map((item, index) => {
                            return (
                              <>
                                <div className="flex p-3 text-sm justify-content-between align-items-center  ">
                                  <div className="pt-3 w-1">
                                    <span className="text-xs text-gray-300 ">
                                      {item.name}
                                    </span>
                                  </div>
                                  <div>
                                    <div className="col-5 ml-8 -m-3 text-center flex justify-content-center">
                                      <div className="flex  justify-content-center">
                                        <div
                                          style={{
                                            width: "250px",
                                            marginRight: "50px",
                                          }}
                                        >
                                          <DropDown
                                            value={item.priority}
                                            options={priorities}
                                            onChange={(e) =>
                                              changePriority(e, item)
                                            }
                                          ></DropDown>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div>
                                    <div className="col-5 ml-8 -m-3 text-center flex justify-content-center">
                                      <div className="flex  justify-content-center align-items-center">
                                        <div
                                          style={{
                                            width: "250px",
                                            marginRight: "50px",
                                          }}
                                        >
                                          <Input
                                            value={item.priority}
                                            onChange={(e) =>
                                              changePriority(e, item)
                                            }
                                          ></Input>
                                        </div>
                                        <div
                                          style={{
                                            width: "18px",
                                            height: "20px",
                                          }}
                                          className="flex align-items-center "
                                        >
                                          <span
                                            className={
                                              "mt-2 cursor-pointer ml-3 " +
                                              (item.isPayTypeDollar
                                                ? "selected-price-type"
                                                : "")
                                            }
                                            onClick={() =>
                                              {
                                                item.isPayTypeDollar= true
                                                setSelectedOptions([...selectedOptions])
                                              }
                                            }
                                          >
                                            $
                                          </span>
                                          <span
                                            className={
                                              "mt-2 cursor-pointer ml-3 " +
                                              (!item.isPayTypeDollar
                                                ? "selected-price-type"
                                                : "")
                                            }
                                            onClick={() =>
                                              {
                                                item.isPayTypeDollar= false
                                                setSelectedOptions([...selectedOptions])
                                              }
                                            }
                                          >
                                            %
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className=" pt-3 flex justify-content-end">
                                    <div
                                      onClick={() =>
                                        removeSelectedAppointment(index)
                                      }
                                      className="cursor-pointer"
                                      style={{
                                        width: "15px",
                                        height: "15px",
                                      }}
                                    >
                                      <img src={Remove} alt="" />
                                    </div>
                                  </div>
                                </div>
                                <hr className="hrtagstyle" />
                              </>
                            );
                          })
                        ) : (
                          <div className="flex p-5 text-sm">Please Add</div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="flex justify-content-between px-3 p-3">
                      <div className="text-xs font-semibold text-dark-gray">
                        Name
                      </div>
                      <div
                        onClick={selectAllOptions}
                        className="text-blue text-xs font-semibold cursor-pointer"
                      >
                        Add All
                      </div>
                    </div>

                    <div
                      className=" justify-content-between bg-white py-2 border-round-md"
                      style={{ height: "200px", overflow: "auto" }}
                    >
                      {relationshipData?.map((item, index) => {
                        return (
                          <>
                            <div className="text-xs text-gray-400 flex justify-content-between p-3">
                              <div className="text-xs">{item.name}</div>
                              <div className="text-xs">
                                <div
                                  onClick={() => {
                                    if (
                                      !selectedOptions.some(
                                        (option) => option.id === item.id
                                      )
                                    ) {
                                      setSelectedOptions([
                                        ...selectedOptions,
                                        {
                                          id: item.id,
                                          name: item.name,
                                          priority: item.priority,
                                        },
                                      ]);
                                    }
                                  }}
                                  className="cursor-pointer button-hover "
                                  style={{ width: "15px", height: "15px" }}
                                >
                                  <img src={Add} alt="" />
                                </div>
                              </div>
                            </div>
                            <hr className="hrtagstyle" />
                          </>
                        );
                      })}
                    </div>
                  </div>
                </CardWithTitle>
              </div>

              <div className="flex justify-content-end p-2 ">
                <div className=" mt-3 flex  ">
                  <div className="mx-4">
                    <Buttons
                      label="Save"
                      className="btn-dark mx-3  border-none"
                      onClick={() => {
                        return createEmployee();
                      }}
                    ></Buttons>
                  </div>
                  <div className=" ">
                    <Buttons
                      label="Cancel"
                      className="btn-grey  border-none"
                    ></Buttons>
                  </div>
                </div>
              </div>
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
export default AppointmentPay;
