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

const SubstituteOption = ({ data, setData, createEmployee }) => {
  const [exerciseDetail, setExerciseDetail] = useState([
    {
      id: 1,
      name: "Yoga",
      priority: null,
    },
    {
      id: 2,
      name: "Zumba",
      priority: null,
    },
    {
      id: 3,
      name: "Cardio",
      priority: null,
    },
    {
      id: 4,
      name: "Bhangra",
      priority: null,
    },
  ]);
  const selectAllOptions = () => {
    let allDept = exerciseDetail.map((dept) => {
      return {
        deptId: dept._id,
        name: dept.name,
        wage: 0,
      };
    });

    setSelectedOptions(allDept);
  };

  const removeSelectedDepartment = (index) => {
    const newArr = [...selectedOptions];
    newArr.splice(index, 1);
    setSelectedOptions(newArr);
  };

  const [selectedOptions, setSelectedOptions] = useState([]);

  const changePriority = (e, col) => {
    const updatedExercise = [];
    exerciseDetail.map((exercise) => {
      if (exercise.id === col.id) {
        exercise.priority = e.value;
        updatedExercise.push(exercise);
      } else {
        updatedExercise.push(exercise);
      }
    });
    setExerciseDetail(updatedExercise);
  };

  const priorities = [
    { name: "Suggested" },
    { name: "High" },
    { name: "Medium" },
    { name: "Low" },
  ];

  useEffect(() => {
    let substituteOptions = [];
    selectedOptions?.map((exercise) => {
      substituteOptions.push({
        name: exercise?.name,
        priority: exercise?.priority?.name,
      });
    });

    setData({ ...data, substituteOption: substituteOptions });
  }, [selectedOptions, exerciseDetail]);
  console.log("data", data);
  const PriorityBodyTemplate = (col) => {
    return (
      <span>
        <div style={{ width: "30%" }}>
          <DropDown
            value={col.priority}
            options={priorities}
            onChange={(e) => changePriority(e, col)}
            optionLabel="name"
          ></DropDown>
        </div>
      </span>
    );
  };

  // const removeRowPriority = (col) => {
  //   return (
  //     <>
  //       <div className="flex justify-content-end">
  //         <span onClick={() => onRemoveOption(col)}>
  //           <i className="pi pi-minus-circle"></i>
  //         </span>
  //       </div>
  //     </>
  //   );
  // };

  const tableHeadingPriority = [
    { field: "", id: "" },
    { field: "name", header: "Name", id: "" },
    {
      field: "priority",
      header: "Priority",
      body: PriorityBodyTemplate,
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
        {/* <div>
          <div className=" ">
            <TableData
              data={exerciseDetail}
              selectionMode="checkbox"
              columns={tableHeadingPriority}
              key="id"
              selected={selectedOptions}
              changeSelection={(e) => setSelectedOptions(e.value)}
            ></TableData>
          </div>
        </div> */}
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
                <div className="bg-white text-sm border-round-md ">
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
                                      // value={priority}
                                      options={priorities}
                                      optionLabel="name"
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
                <div
                  onClick={selectAllOptions}
                  className="text-blue text-xs font-semibold cursor-pointer"
                >
                  Add All
                </div>
              </div>

              <div className=" justify-content-between bg-white py-2 border-round-md">
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
                                  (dept) => dept.deptId === item._id
                                )
                              ) {
                                setSelectedOptions([
                                  ...selectedOptions,
                                  {
                                    deptId: item._id,
                                    name: item.name,
                                    wage: 0,
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
            <div className=" mx-4">
              <Buttons
                onClick={() => {
                  setData(() => {
                    return {
                      ...data,
                      substituteOption: selectedOptions,
                    };
                  });
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
