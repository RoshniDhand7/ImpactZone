import React, { useState } from "react";
import Checkbox from "../../../components/checkbox/checkbox";
import CardWithTitle from "../../../components/cards/cardWithTitle/cardWithTitle";
import Input from "../../../components/input/input";
import DropDown from "../../../components/dropdown/dropdown";
import Buttons from "../../../components/buttons/button";
import RecentCheckIn from "../../../components/cards/Profilecard/recentCheckIn";
import checkInData from "../../../utils/checkInData";
import TableData from "../../../components/cards/dataTable/dataTable";
import Index from ".";
import { Chip } from "primereact/chip";
import MuliSelectDropDown from "../../../components/dropdown/muliSelectDropDown";
import { deleteLocation } from "../../../redux/actions/locationsActions";
import DeleteDailog from "../../../components/popup/deleteDailog";

const Location = () => {
  const {
    locations,
    locationTypes,
    id,
    setId,
    showDelete,
    setShowDelete,
    setLoading,
    setDeleteRow,
    location,
    setLocation,
    clubs,
    handleLocationChange,
    onSaveLocation,
    showAddLocation,
    setShowAddLocation,
    onEditLocation,
    locationFilters,
    handleLocationFilters,
    onCickSearch,
  } = Index();

  const ActionEditDelete = (data) => {
    return (
      <>
        <div className="flex justify-content-end">
          <span className="mr-3">
            <i
              className="pi pi-pencil"
              onClick={() => onEditLocation(data)}
            ></i>
          </span>

          <span>
            <i
              className="pi pi-trash"
              onClick={() => {
                setShowDelete(true);
                setId(data._id);
              }}
            ></i>
          </span>
        </div>
      </>
    );
  };

  const clubsTemplate = (data) => {
    return (
      <div className=" flex flex-wrap gap-2">
        {data?.clubs.map((item, index) => {
          return <Chip key={index} label={item.name} />;
        })}
      </div>
    );
  };

  const statusTemplate = (data) => {
    return data.isActive ? "Active" : "Inactive";
  };

  const locationsTable = [
    {
      field: "name",
      header: "Location Name",
    },
    {
      field: "locationType.name",
      header: "Location Type",
    },
    {
      body: clubsTemplate,
      header: "Club",
    },
    {
      body: statusTemplate,
      header: "Status",
    },
    { field: "", Header: "", body: ActionEditDelete },
  ];

  const locationStatus = (value) => {
    return JSON.stringify(value) === "true"
      ? "Active"
      : JSON.stringify(value) === "Inactive"
      ? "No"
      : "";
  };

  const AddLocation = () => {
    return (
      <>
        <div>
          <div className="my-3">
            <Checkbox
              title="Active"
              className="text-900 text-sm font-semibold"
              value={location.isActive}
              name="isActive"
              onChange={handleLocationChange}
            ></Checkbox>
          </div>
          <div>
            <CardWithTitle title="Add Location Type">
              <div className="flex p-2 mx-3">
                <div className="col-4">
                  <Input
                    title="Name"
                    name="name"
                    value={location.name}
                    onChange={handleLocationChange}
                  ></Input>
                </div>
                <div className="col-4">
                  <DropDown
                    title="Location Type"
                    name="locationType"
                    options={locationTypes}
                    optionLabel="name"
                    value={location.locationType}
                    onChange={handleLocationChange}
                    placeholder="Select Location Type"
                  ></DropDown>
                </div>
                <div className="col-4">
                  <MuliSelectDropDown
                    title="Clubs"
                    name="clubs"
                    options={clubs}
                    optionsLabel="name"
                    onChange={handleLocationChange}
                    placeholder="Select Clubs"
                    value={location?.clubs}
                  ></MuliSelectDropDown>
                </div>
              </div>
            </CardWithTitle>
          </div>
          <div className=" m-2 mt-3 flex justify-content-end">
            <div className="mx-4">
              <Buttons
                label="Save"
                onClick={onSaveLocation}
                className="btn-dark  mx-3  border-none"
              ></Buttons>
            </div>
            <div className="">
              <Buttons
                onClick={() => {
                  setShowAddLocation(false);
                  setLocation({
                    isActive: null,
                    name: "",
                    locationType: "",
                    clubs: [],
                  });
                }}
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
    );
  };

  return (
    <>
      <DeleteDailog
        visible={showDelete}
        setVisible={setShowDelete}
        setDeleteRow={setDeleteRow}
        deleteRowId={id}
        onDelete={deleteLocation}
        setLoading={setLoading}
      />
      {showAddLocation ? (
        AddLocation()
      ) : (
        <>
          <div>
            <div className="bg-lightest-blue border-round-lg py-2 px-3 flex justify-content-between align-items-center ">
              <div className="flex align-items-center col-4">
                <div className="col-7">
                  <DropDown
                    title="Status"
                    name="status"
                    // options={["Active", "Inactive"]}
                    // onChange={handleLocationFilters}
                    // value={locationStatus(locationFilters.status)}
                  ></DropDown>
                </div>
                <div className="col-7">
                  <MuliSelectDropDown
                    title="Clubs"
                    name="clubs"
                    // options={clubs}
                    // optionsLabel="name"
                    // onChange={handleLocationFilters}
                    // placeholder="Select Clubs"
                    // value={locationFilters.clubs}
                  ></MuliSelectDropDown>
                </div>
                <div className="col-7 ">
                  <DropDown
                    title="Location Type"
                    name="locationType"
                    // options={locationTypes}
                    // optionLabel="name"
                    // onChange={handleLocationFilters}
                    // value={locationFilters.locationType}
                  ></DropDown>
                </div>
                <div className="">
                  <Buttons
                    label="Search"
                    className="btn-dark  border-none"
                    style={{ height: "36px", top: "10px" }}
                    onClick={onCickSearch}
                  ></Buttons>
                </div>
              </div>
              <div className="mr-2">
                <div className="mr-4">
                  <Buttons
                    onClick={() => {
                      setShowAddLocation(true);
                    }}
                    label="Add"
                    className="btn-dark  mx-4  border-none  "
                    style={{ height: "36px", top: "10px" }}
                  ></Buttons>
                </div>
              </div>
            </div>
            <div className="mt-2">
              <TableData data={locations} columns={locationsTable}></TableData>
            </div>
            <div className=" m-2 mt-3 flex justify-content-end">
              <div className="">
                <Buttons
                  label="Scheduling Options"
                  className="btn-dark   border-none"
                ></Buttons>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <RecentCheckIn data={checkInData} />
          </div>
        </>
      )}
    </>
  );
};

export default Location;
