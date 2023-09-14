import React, { useState } from "react";
import Input from "../../../components/input/input";
import CardWithTitle from "../../../components/cards/cardWithTitle/cardWithTitle";
import DropDown from "../../../components/dropdown/dropdown";
import Checkbox from "../../../components/checkbox/checkbox";
import Buttons from "../../../components/buttons/button";
import RecentCheckIn from "../../../components/cards/Profilecard/recentCheckIn";
import checkInData from "../../../utils/checkInData";
import TableData from "../../../components/cards/dataTable/dataTable";
import Index from ".";

const Classes = () => {
  const { eventsByType } = Index();

  const [showAddClasses, setAddClasses] = useState();

  // const actionTemplate = (col) => {
  //   return (
  //     <>
  //       <div className="flex justify-content-end">
  //         <span>
  //           <i
  //             onClick={() => onClickEdit(col)}
  //             className="pi pi-pencil mr-3 "
  //           ></i>
  //         </span>
  //         <span onClick={() => deleteLevel(col._id)}>
  //           <i className="pi pi-trash"></i>
  //         </span>
  //       </div>
  //     </>
  //   );
  // };

  const TableClassicData = [
    {
      name: "Zumba",
      location: "Group Zone",
      Schedule: "Monday",
      Instructor: "Austin Mahone",
      Capacity: "10",
    },
    {
      name: "Yoga",
      location: "Yoga Class",
      Schedule: "Wednesday",
      Instructor: "Will Smith",
      Capacity: "10",
    },
    {
      name: "Pilates",
      location: "Group Zone",
      Schedule: "Friday",
      Instructor: "Austin Mahone",
      Capacity: "10",
    },
    {
      name: "Zumba",
      location: "Group Zone",
      Schedule: "Monday",
      Instructor: "John",
      Capacity: "6",
    },
    {
      name: "yoga",
      location: "Group Zone",
      Schedule: "Monday",
      Instructor: "Austin Mahone",
      Capacity: "10",
    },
  ];
  const actionTemplate = (col) => {
    // console.log(col._id, "collllll");
    return (
      <>
        <div className="flex justify-content-end">
          <span>
            <i className="pi pi-pencil mr-3 cursor-pointer"></i>
          </span>
          {/* <span onClick={() => }> */}
          <span
          // onClick={() => {
          //   setVisible(true);
          //   setDeleteRow({ ...deleteRow, id: col._id });
          // }}
          >
            <i className="pi pi-trash cursor-pointer"></i>
          </span>
        </div>
      </>
    );
  };
  const TableClassicColumn = [
    {
      field: "name",
      header: "Name",
    },
    {
      field: "location",
      header: "Location",
    },
    {
      field: "Schedule",
      header: "Schedule",
    },
    {
      field: "instructor",
      header: "Instructor",
    },
    {
      field: "capacity",
      header: "Capacity",
    },
    {
      field: "",
      header: "",
      body: actionTemplate,
    },
  ];

  const onClickShowAddClassic = () => {
    setAddClasses((prev) => !prev);
  };

  return (
    <>
      {showAddClasses ? (
        <>
          <div>
            <div className="bg-lightest-blue py-2 border-round-lg shadow-2">
              <div className="flex justify-content-between  align-items-center px-3">
                <div className="col-3 px-0">
                  <DropDown
                    filter
                    placeholder="Select Class"
                    options={eventsByType}
                    optionLabel="name"
                  ></DropDown>
                </div>
              </div>
            </div>
            <div className="mt-3">
              <CardWithTitle title="When and Where">
                <div className="p-3">
                  <div className="flex ">
                    <div className="col-4">
                      <DropDown title="How often does class meet?"></DropDown>
                    </div>
                    <div className="col-4">
                      <DropDown title="Class Location"></DropDown>
                    </div>
                  </div>
                  <div className="flex mt-3">
                    <div className="col-4">
                      <Input
                        type="date"
                        title="Start Date"
                        placeholder="11/08/1998"
                      ></Input>
                    </div>
                    <div className="col-4">
                      <Input
                        type="date"
                        title="End Date"
                        placeholder="11/08/1998"
                      ></Input>
                    </div>
                    <div className="col pt-5 mt-2">
                      <Checkbox
                        title="Indefinite"
                        className="text-900 text-sm"
                      ></Checkbox>
                    </div>
                  </div>
                  <div className="flex align-items-end mt-3">
                    <div className="col-4">
                      <Input
                        type="time"
                        title="Start Time"
                        placeholder="11/08/1998"
                      ></Input>
                    </div>
                    <div className="col-4">
                      <DropDown
                        type="date"
                        title="Days"
                        placeholder="Select"
                      ></DropDown>
                    </div>

                    <div className="mb-2">
                      <Buttons
                        style={{ height: "38px" }}
                        icon="pi pi-plus-circle"
                        label="Add New Schedule"
                        className="btn-dark border-none "
                      ></Buttons>
                    </div>
                  </div>
                  <div className="flex align-items-end mt-3">
                    <div className="col-4">
                      <Input
                        type="time"
                        title="Start Time"
                        placeholder="11/08/1998"
                      ></Input>
                    </div>
                    <div className="col-4">
                      <DropDown
                        type="date"
                        title="Days"
                        placeholder="Select"
                      ></DropDown>
                    </div>

                    <div className="mb-3">
                      <i className="pi pi-minus-circle text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </CardWithTitle>
            </div>
            <div className="mt-3">
              <CardWithTitle title="Instructor">
                <div className="p-3">
                  <div className="flex">
                    <div className="col-4">
                      <DropDown title="Staff"></DropDown>
                    </div>
                    <div className="col-4">
                      <DropDown title="Pay"></DropDown>
                    </div>
                  </div>
                  <div className="flex mt-3 ">
                    <div className="col-4">
                      <DropDown title="Assistant 1 Pay"></DropDown>
                    </div>
                    <div className="col-4">
                      <DropDown
                        title="Assistant 1"
                        placeholder="List of Employees that teach Boot Camp"
                      ></DropDown>
                    </div>
                    <div className="pt-4 mt-2">
                      <Buttons
                        style={{ height: "38px" }}
                        className="btn-dark border-none "
                        icon="pi pi-plus-circle"
                        label="Add Assistant"
                      ></Buttons>
                    </div>
                  </div>
                  <div className="flex mt-3 ">
                    <div className="col-4">
                      <DropDown title="Assistant 1 Pay"></DropDown>
                    </div>
                    <div className="col-4">
                      <DropDown
                        title="Assistant 1"
                        placeholder="List of Employees that teach Boot Camp"
                      ></DropDown>
                    </div>
                    <div className="pt-4 mt-3">
                      <i className="pi pi-minus-circle text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </CardWithTitle>
            </div>
            <div className="mt-3">
              <CardWithTitle title="Participants">
                <div className="p-3">
                  <div className="flex">
                    <div className="col-4">
                      <Input title="Total Capacity" placeholder="10"></Input>
                    </div>
                    <div className="col-4">
                      <Input
                        title="How many people can waitlist?"
                        placeholder="1"
                      ></Input>
                    </div>
                  </div>
                </div>
              </CardWithTitle>
            </div>
            <div className="mt-3">
              <CardWithTitle title="Online Scheduling">
                <div className="p-3">
                  <div className="p-2 pb-0">
                    <Checkbox
                      title="Allow clients to sign up for this class online"
                      className="text-sm text-900"
                    ></Checkbox>
                  </div>
                  <div className="mt-4 p-2 col-4">
                    <Input title="Online Capacity" placeholder="10"></Input>
                  </div>
                </div>
              </CardWithTitle>
            </div>
            <div className="mt-3">
              <CardWithTitle title="Pricing">
                <div className="p-3">
                  <div className="mt-3">
                    <Checkbox
                      title="Allow clients to sign up now and pay later"
                      className="text-sm text-900"
                    ></Checkbox>
                  </div>
                  <div className="my-3">
                    <Checkbox
                      title="Clients can attend this class for free"
                      className="text-sm text-900"
                    ></Checkbox>
                  </div>
                </div>
              </CardWithTitle>
            </div>
            <div className=" m-2 mt-3 flex justify-content-end">
              <div className=" mx-4">
                <Buttons
                  label="Save"
                  className="btn-dark mx-3 border-none"
                ></Buttons>
              </div>
              <div className="">
                <Buttons
                  onClick={onClickShowAddClassic}
                  label="Cancel"
                  className="btn-grey   border-none"
                ></Buttons>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <RecentCheckIn data={checkInData}></RecentCheckIn>
          </div>
        </>
      ) : (
        <>
          <div className="mt-3">
            <div className="bg-lightest-blue py-2 border-round-lg shadow-2">
              <div className="flex justify-content-between  align-items-center px-3">
                <div className="col-3 px-0">
                  <DropDown title="Status" placeholder="Active"></DropDown>
                </div>
                <div className=" mr-2  ">
                  <Buttons
                    onClick={onClickShowAddClassic}
                    className="btn-dark border-none"
                    label="Add"
                    style={{ height: "45px", width: "102px" }}
                  ></Buttons>
                </div>
              </div>
            </div>
            <div className="mt-3">
              <TableData
                columns={TableClassicColumn}
                data={TableClassicData}
              ></TableData>
            </div>
          </div>
          <div className="mt-6">
            <RecentCheckIn data={checkInData}></RecentCheckIn>
          </div>
        </>
      )}
    </>
  );
};

export default Classes;
