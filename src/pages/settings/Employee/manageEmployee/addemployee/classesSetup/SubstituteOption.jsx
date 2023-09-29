import React, { useEffect, useState } from "react";
import DropDown from "../../../../../../components/dropdown/dropdown";

import Buttons from "../../../../../../components/buttons/button";
import RecentCheckIn from "../../../../../../components/cards/Profilecard/recentCheckIn";
import checkInData from "../../../../../../utils/checkInData";
import TableData from "../../../../../../components/cards/dataTable/dataTable";
import CardWithTitle from "../../../../../../components/cards/cardWithTitle/cardWithTitle";
import Add from "../../../../../../assets/icons/Add.png";
import Remove from "../../../../../../assets/icons/remove.png";
import Input from "../../../../../../components/input/input";
import { useDispatch, useSelector } from "react-redux";
import { getEventsByType } from "../../../../../../redux/actions/eventsActions";

const SubstituteOption = ({ data, setData, createEmployee }) => {
  const dispatch = useDispatch();

  let { eventsByType } = useSelector((state) => state?.events);

  let [exerciseDetail, setExerciseDetail] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(getEventsByType(setLoading, "Classes"));
  }, [dispatch]);

  useEffect(() => {
    if (data.substituteOption.length) {
      const selectedOptIds = data.substituteOption.map((item) => item.id);
      setSelectedOptions([...data.substituteOption]);

      const filteredEvents = eventsByType.filter(
        (item) => !selectedOptIds.includes(item._id)
      );
      setExerciseDetail([...filteredEvents]);
    } else {
      setExerciseDetail([...eventsByType]);
    }
  }, [eventsByType]);

  const selectAllOptions = () => {
    let allDept = exerciseDetail.map((item) => {
      return {
        id: item._id,
        name: item.name,
        priority: item.priority,
      };
    });
    setSelectedOptions([...allDept]);
    setData(() => {
      return {
        ...data,
        substituteOption: [...allDept],
      };
    });
    setExerciseDetail([]);
  };

  const removeSelectedDepartment = (index) => {
    const newArr = [...selectedOptions];
    const splicedArray = newArr.splice(index, 1);
    setSelectedOptions(newArr);
    setExerciseDetail(() => {
      return [...exerciseDetail, ...splicedArray];
    });
    setData(() => {
      return {
        ...data,
        substituteOption: [...newArr],
      };
    });
  };

  const [selectedOptions, setSelectedOptions] = useState([]);

  const changePriority = (e, col) => {
    col.priority = e.value;
    setSelectedOptions([...selectedOptions]);
  };

  const priorities = ["Suggested", "High", "Medium", "Low"];

  const tableHeadingPriority = [
    { field: "", id: "" },
    { field: "name", header: "Name", id: "" },
    {
      field: "priority",
      header: "Priority",
      id: "",
    },
    { field: "", header: "", id: "" },
  ];

  return (
    <>
      <div>
        <div className="col-2 mb-3">
          <DropDown title="Similar To"></DropDown>
        </div>
        <div className="mt-3">
          <CardWithTitle title="Deparments">
            <div className="p-3">
              <div className="flex justify-content-between px-3 p-3">
                <div className="text-xs  font-semibold text-dark-gray ">
                  Name
                </div>
                <div className=" font-semibold ml-4  text-xs text-dark-gray">
                  Priority
                </div>
                {selectedOptions.length ? (
                  <div
                    onClick={() => {
                      setExerciseDetail([...selectedOptions]);
                      setSelectedOptions([]);
                      setData(() => {
                        return {
                          ...data,
                          substituteOption: [],
                        };
                      });
                    }}
                    className="text-blue  font-semibold cursor-pointer text-xs "
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
                          <div className="flex p-3 text-sm justify-content-between ">
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
                                      onChange={(e) => changePriority(e, item)}
                                    ></DropDown>
                                  </div>
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
                      Please Add Substitute Option
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="p-3">
              <div className="flex justify-content-between px-3 p-3">
                <div className="text-xs font-semibold text-dark-gray">Name</div>
                {exerciseDetail.length ? (
                  <div
                    onClick={selectAllOptions}
                    className="text-blue text-xs font-semibold cursor-pointer"
                  >
                    Add All
                  </div>
                ) : null}
              </div>

              <div
                className="justify-content-between bg-white py-2 border-round-md"
                style={{ height: "200px", overflow: "auto" }}
              >
                {exerciseDetail?.map((item, index) => {
                  return (
                    <>
                      <div className="text-xs text-gray-400 flex justify-content-between p-3">
                        <div className="text-xs">{item.name}</div>
                        <div className="text-xs">
                          <div
                            onClick={() => {
                              if (
                                !selectedOptions.some(
                                  (option) => option.id === item._id
                                )
                              ) {
                                setSelectedOptions([
                                  ...selectedOptions,
                                  {
                                    id: item._id,
                                    name: item.name,
                                    priority: item.priority,
                                  },
                                ]);
                                exerciseDetail = exerciseDetail.filter(
                                  (option) => option._id !== item._id
                                );
                                setExerciseDetail([...exerciseDetail]);
                                setData(() => {
                                  return {
                                    ...data,
                                    substituteOption: [
                                      ...data.substituteOption,
                                      {
                                        id: item._id,
                                        name: item.name,
                                        priority: item.priority,
                                      },
                                    ],
                                  };
                                });
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
            <div className=" mx-4">
              <Buttons
                onClick={() => {
                  createEmployee();
                }}
                label="Save"
                className="btn-dark mx-3 border-none"
              ></Buttons>
            </div>
            <div className="">
              <Buttons
                label="Cancel"
                className="btn-grey   border-none"
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

export default SubstituteOption;
