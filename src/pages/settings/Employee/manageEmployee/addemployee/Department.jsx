import React from "react";
import CardWithTitle from "../../../../../components/cards/cardWithTitle/cardWithTitle";
import Input from "../../../../../components/input/input";
import Buttons from "../../../../../components/buttons/button";
import Add from "../../../../../assets/icons/Add.png";
import Remove from "../../../../../assets/icons/remove.png";
import RecentCheckIn from "../../../../../components/cards/Profilecard/recentCheckIn";
import checkInData from "../../../../../utils/checkInData";
import constants from "../../../../../utils/constants";
import api from "../../../../../services/api";
import {
  hideLoaderAction,
  showLoaderAction,
} from "../../../../../redux/actions/loaderAction";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Department = ({ data, setData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  let [selectedDepartment, setSelectedDepartment] = useState([]);
  const [allWagesValue, setAllWagesValue] = useState(null);

  const fetchDepartment = async () => {
    dispatch(showLoaderAction());
    const res = await api("get", constants.endPoints.GetDepartment);
    if (res.success) {
      setDepartments(res.data);
      dispatch(hideLoaderAction());
    } else {
      console.log(res);
    }
  };

  const createDeparment = async () => {
    setData(() => {
      return {
        ...data,
        departments: departments.map((dept) => dept._id),
      };
    });
    const res = await api("post", constants.endPoints.CreateEmployee, data);
    if (res.success) {
      navigate("/employee");
    } else {
      console.log(res);
    }
  };

  const selectAllDepartment = () => {
    let allDept = departments.map((dept) => {
      return {
        deptId: dept._id,
        name: dept.name,
        wage: allWagesValue && allWagesValue !== 0 ? allWagesValue : 0,
      };
    });

    setSelectedDepartment(allDept);
  };

  const removeSelectedDepartment = (index) => {
    const newArr = [...selectedDepartment];
    newArr.splice(index, 1);
    setSelectedDepartment(newArr);
  };

  const addWages = (dept, event) => {
    dept.wage = Number(event.value);
  };

  const onClickCopytoAll = () => {
    selectedDepartment = selectedDepartment.map((item) => {
      item.wage = allWagesValue;
      return item;
    });
    return setSelectedDepartment([...selectedDepartment]);
  };

  useEffect(() => {
    fetchDepartment();
  }, []);

  return (
    <>
      <div>
        <div>
          <CardWithTitle title="General">
            <div className="flex p-3">
              <div>
                <Input
                  type="number"
                  onChange={(e) => { 
                    setAllWagesValue(e.value);
                    selectedDepartment.map(item => {
                      item.wage = e.value;
                      return item;
                    });
                    setSelectedDepartment([...selectedDepartment]);
                  }}
                  value={allWagesValue}
                  title="Default Hourly Wages"
                  placeholder="$0.00"
                  mode="decimal"
                  minFractionDigits={3}
                ></Input>
              </div>
              <div className=" flex align-items-center px-3">
              </div>
            </div>
          </CardWithTitle>
        </div>
        <div className="mt-3">
          <CardWithTitle title="Deparments">
            <div className="p-3">
              <div className="flex justify-content-between px-3 p-3">
                <div className="text-xs  font-semibold text-dark-gray ">
                  Name
                </div>
                <div className=" font-semibold ml-4  text-xs text-dark-gray">
                  Wages
                </div>
                {selectedDepartment.length ? (
                  <div
                    onClick={() => setSelectedDepartment([])}
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
                  className="bg-white text-sm border-round-md  "
                  style={{ maxHeight: "335px", overflow: "auto" }}
                >
                  {selectedDepartment.length ? (
                    selectedDepartment?.map((item, index) => {
                      return (
                        <>
                          <div className="flex p-3 text-sm justify-content-between ">
                            <div className="pt-3 w-1">
                              <span className="text-xs text-gray-300 ">
                                {item.name}
                              </span>
                            </div>
                            <div>
                              <div className="col-5 ml-8 -m-3 text-center flex justify-content-center">
                                <div className="flex  justify-content-center">
                                  <Input
                                    type="number"
                                    onChange={(event) => {
                                      addWages(item, event);
                                      setAllWagesValue(null);
                                    }}
                                    placeholder="$0.00"
                                    value={item.wage || null}
                                    mode="decimal"
                                    minFractionDigits={3}
                                  ></Input>
                                </div>
                              </div>
                            </div>
                            <div className=" pt-3 flex justify-content-end">
                              <div
                                onClick={() => removeSelectedDepartment(index)}
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
                    <div className="flex p-5 text-sm">
                      Please Add Department
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="p-3">
              <div className="flex justify-content-between px-3 p-3">
                <div className="text-xs font-semibold text-dark-gray">Name</div>
                <div
                  onClick={selectAllDepartment}
                  className="text-blue text-xs font-semibold cursor-pointer"
                >
                  Add All
                </div>
              </div>

              <div
                className=" justify-content-between bg-white py-2 border-round-md"
                style={{ height: "250px", overflow: "auto" }}
              >
                {departments?.map((item, index) => {
                  return (
                    <>
                      <div className="text-xs text-gray-400 flex justify-content-between p-3">
                        <div className="text-xs">{item.name}</div>
                        <div className="text-xs">
                          <div
                            onClick={() => {
                              if (
                                !selectedDepartment.some(
                                  (dept) => dept.deptId === item._id
                                )
                              ) {
                                setSelectedDepartment([
                                  ...selectedDepartment,
                                  {
                                    deptId: item._id,
                                    name: item.name,
                                    wage: allWagesValue && allWagesValue !== 0 ? allWagesValue : 0,
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
      </div>
      <div className="flex justify-content-end p-3 ">
        <div className=" mt-3 flex  ">
          <div className="mx-4">
            <Buttons
              onClick={createDeparment}
              label="Save"
              className="btn-dark mx-3 border-none"
            ></Buttons>
          </div>
          <div className=" ">
            <Buttons
              label="Cancel"
              className="btn-grey   border-none"
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

export default Department;
