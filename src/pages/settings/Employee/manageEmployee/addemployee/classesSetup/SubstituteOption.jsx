import React, { useEffect, useState } from "react";
import DropDown from "../../../../../../components/dropdown/dropdown";

import Buttons from "../../../../../../components/buttons/button";
import RecentCheckIn from "../../../../../../components/cards/Profilecard/recentCheckIn";
import checkInData from "../../../../../../utils/checkInData";
import TableData from "../../../../../../components/cards/dataTable/dataTable";

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
    { name: "Suggest" },
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

  // const onRemoveOption = (col) => {
  //   const allAvailableOptions = [...exerciseDetail];
  //   const index = allAvailableOptions.indexOf(col);
  //   allAvailableOptions.splice(index, 1);

  //   setExerciseDetail(allAvailableOptions);
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
        <div>
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
