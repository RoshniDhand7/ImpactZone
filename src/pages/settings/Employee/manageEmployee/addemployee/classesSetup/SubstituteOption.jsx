import React, { useState } from "react";
import DropDown from "../../../../../../components/dropdown/dropdown";

import Buttons from "../../../../../../components/buttons/button";
import RecentCheckIn from "../../../../../../components/cards/Profilecard/recentCheckIn";
import checkInData from "../../../../../../utils/checkInData";
import TableData from "../../../../../../components/cards/dataTable/dataTable";

const SubstituteOption = () => {
  const [exerciseDetail, setExerciseDetail] = useState([
    {
      id: 1,
      name: "Yoga",
      priority: null,
    },
    {
      id: 2,
      name: "Yoga",
      priority: null,
    },
    {
      id: 3,
      name: "Yoga",
      priority: null,
    },
    {
      id: 4,
      name: "Yoga",
      priority: null,
    },
  ]);

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

  const removeRowPriority = (col) => {
    return (
      <>
        <span>
          <i className="pi pi-minus-circle"></i>
        </span>
      </>
    );
  };

  const tableHeadingPriority = [
    { field: "" },
    { field: "" },
    { field: "name", header: "Name" },
    { field: "priority", header: "Priority", body: PriorityBodyTemplate },
    { field: "" },
    { field: "" },
    { field: "", header: "", body: removeRowPriority },
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
              selectionMode="multiple"
              columns={tableHeadingPriority}
            ></TableData>

            {/* <DataTable
              value={exerciseDetail}
              selection={selectedPos}
              onSelectionChange={(e) => setSelectedPos(e.value)}
              dataKey="id"
              tableStyle={{ minWidth: "50rem" }}
            >
              <Column
                selectionMode="multiple"
                headerStyle={{ width: "3rem" }}
              ></Column>
              <Column field="name" header="Name"></Column>
              <Column
                field="name"
                header="Priority"
                body={PriorityBodyTemplate}
              ></Column>
              <Column field="category" header=""></Column>
            </DataTable> */}
            {/* <div className="p-3 flex justify-content-end">
              <button className=" px-2 p-2 border-round font-semibold bg-white  ">
                <i className="pi pi-shopping-cart mr-2"></i>Buy
              </button>
            </div> */}
          </div>
        </div>
        <div className="flex justify-content-end p-2 ">
          <div className=" mt-3 flex  ">
            <div className=" mx-4">
              <Buttons
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
