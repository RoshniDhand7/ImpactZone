import React from "react";
import DropDown from "../../../components/dropdown/dropdown";
import Buttons from "../../../components/buttons/button";
import TableData from "../../../components/cards/dataTable/dataTable";
import Input from "../../../components/input/input";
import Checkbox from "../../../components/checkbox/checkbox";
import CardWithTitle from "../../../components/cards/cardWithTitle/cardWithTitle";
import { PickList } from "primereact/picklist";
import RecentCheckIn from "../../../components/cards/Profilecard/recentCheckIn";
import checkInData from "../../../utils/checkInData";
import Index from ".";
import { filterOneArrayFromAnother } from "../../../utils/javascript";
import DeleteDailog from "../../../components/popup/deleteDailog";
import { deleteEventCategory } from "../../../redux/actions/eventsActions";

const EventCategories = () => {
  let {
    id,
    categoryPicklist,
    eventCategory,
    handleEventCategoriestChange,
    setCategoryPickList,
    eventCategories,
    onSaveEventCatgory,
    showEventCategories,
    setShowEventCategories,
    onEditEventCategory,
    setEventCategory,
    showDelete,
    setShowDelete,
    setDeleteRow,
    setLoading,
    setId,
    events,
  } = Index();

  const itemTemplate = (item) => {
    return (
      <div className="flex flex-wrap p-2 align-items-center gap-3">
        <div className="flex-1 flex flex-column gap-2">
          <span className="font-bold">{item.name}</span>
        </div>
      </div>
    );
  };

  const ActionEditDelete = (row) => {
    return (
      <>
        <div className="flex justify-content-end">
          <span className="mx-2">
            <i
              className="pi pi-pencil"
              onClick={() => onEditEventCategory(row)}
            ></i>
          </span>

          <span>
            <i
              className="pi pi-trash"
              onClick={() => {
                setShowDelete(true);
                setId(row._id);
              }}
            ></i>
          </span>
        </div>
      </>
    );
  };
  const EventCategoriescolumn = [
    {
      field: "name",
      header: "Name",
    },
    {
      field: "",
      header: "",
      body: ActionEditDelete,
    },
  ];
  const EventCategoriesTable = () => {
    return (
      <>
        <div>
          <div className="bg-lightest-blue py-2  border-round-lg ">
            <div className="flex justify-content-between align-items-center px-3">
              <div className="col-3">
                <DropDown title="Status" placeholder="Active"></DropDown>
              </div>
              <div className="mx-5">
                <Buttons
                  onClick={() => {
                    setShowEventCategories(false);
                  }}
                  className="btn-dark mx-4  border-none"
                  label="Add"
                  style={{ height: "36px", top: "10px" }}
                ></Buttons>
              </div>
            </div>
          </div>
          <div className="mt-2">
            <TableData
              data={eventCategories}
              columns={EventCategoriescolumn}
            ></TableData>
          </div>
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
              label="Cancel"
              className="btn-grey   border-none"
            ></Buttons>
          </div>
        </div>
      </>
    );
  };

  const ADDEventCategories = () => {
    return (
      <>
        <div className="my-3">
          <Checkbox
            title="Active"
            className="text-900 text-xs font-semibold"
            value={eventCategory.isActive}
            onChange={handleEventCategoriestChange}
          />
        </div>
        <div className="bg-lightest-blue p-2 border-round-lg ">
          <div className="flex justify-content-between align-items-center px-3">
            <div className="col-3 px-0">
              <Input
                title="Name"
                placeholder="Traning"
                name="name"
                value={eventCategory.name}
                onChange={handleEventCategoriestChange}
              ></Input>
            </div>
          </div>
        </div>
        <div className="mt-3">
          <CardWithTitle title="Add Event Setups">
            <div className="p-3">
              <div className="card mt-3">
                <PickList
                  source={categoryPicklist}
                  target={eventCategory.events}
                  onChange={(e) => {
                    setCategoryPickList([...e.source]);
                    handleEventCategoriestChange({
                      name: "events",
                      value: e.target,
                    });
                  }}
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
        <div className=" m-2 mt-3 flex justify-content-end">
          <div className=" mx-4">
            <Buttons
              label="Save"
              className="btn-dark mx-3 border-none"
              onClick={onSaveEventCatgory}
            ></Buttons>
          </div>
          <div className="">
            <Buttons
              label="Cancel"
              onClick={() => {
                setShowEventCategories(true);
                setEventCategory({
                  isActive: true,
                  name: "",
                  events: [],
                });
              }}
              className="btn-grey   border-none"
            ></Buttons>
          </div>
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
        onDelete={deleteEventCategory}
        setLoading={setLoading}
      />
      {showEventCategories ? EventCategoriesTable() : ADDEventCategories()}
      <div className="mt-5">
        <RecentCheckIn data={checkInData}></RecentCheckIn>
      </div>
    </>
  );
};
export default EventCategories;
