import React from "react";
import Checkbox from "../../../../components/checkbox/checkbox";
import CardWithTitle from "../../../../components/cards/cardWithTitle/cardWithTitle";
import Input from "../../../../components/input/input";
import { InputTextarea } from "primereact/inputtextarea";
import Buttons from "../../../../components/buttons/button";
import RecentCheckIn from "../../../../components/cards/Profilecard/recentCheckIn";
import checkInData from "../../../../utils/checkInData";
import AccessSchedulesContainer from "./AccessSchedulesContainer";
import { ColorPicker } from "primereact/colorpicker";
import { Dialog } from "primereact/dialog";

const AddAccessSchedules = ({
  accessSchedulesForm,
  handleAccessSchedulesChange,
  editAccessSchedule,
  copyModalFooter,
  submit,
  openCopyModal,
  setOpenCopyModal,
  newName,
  setNewName,
  showcomponent,
}) => {
  return (
    <>
      <Dialog
        header="Create Access Schedule"
        visible={openCopyModal}
        style={{ width: "50vw" }}
        onHide={() => setOpenCopyModal(false)}
        footer={copyModalFooter}
      >
        <div className="p-3 ">
          <div className="flex justify-content-between ">
            <div className="col">
              <Input
                title="Name"
                value={newName}
                onChange={(e) => setNewName(e.value)}
                name="name"
                state={accessSchedulesForm}
              ></Input>
            </div>
          </div>
        </div>
      </Dialog>
      <div>
        <div className="mt-3">
          <Checkbox
            title="Active"
            className="text-900 font-semibold"
            name={"isActive"}
            value={accessSchedulesForm.isActive}
            onChange={handleAccessSchedulesChange}
            state={accessSchedulesForm}
          ></Checkbox>
        </div>
        <div className="mt-3">
          <CardWithTitle title="Add Campaign Details ">
            <div className=" p-3">
              <div className="flex ">
                <div className="col">
                  <Input
                    title="Name"
                    name="name"
                    value={accessSchedulesForm.name}
                    onChange={handleAccessSchedulesChange}
                    state={accessSchedulesForm}
                  ></Input>
                </div>
                <div className="col">
                  <Input
                    title="Short Name"
                    name="shortName"
                    value={accessSchedulesForm.shortName}
                    onChange={handleAccessSchedulesChange}
                    state={accessSchedulesForm}
                  ></Input>
                </div>
                <div className="col">
                  <Input
                    title="Color"
                    name="color"
                    value={accessSchedulesForm.color}
                    onChange={handleAccessSchedulesChange}
                    state={accessSchedulesForm}
                    type="color"
                    style={{ height: "38px" }}
                  ></Input>
                </div>
              </div>
              <div>
                <div className="col-12 flex flex-column gap-2">
                  <label
                    className="text-xs font-semibold text-gray-500 gap-2"
                    htmlFor=""
                  >
                    Description (
                    {accessSchedulesForm.description
                      ? accessSchedulesForm.description.length
                      : 0}
                    /256)
                  </label>
                  <div className="">
                    <InputTextarea
                      style={{ width: "100%" }}
                      name="description"
                      value={accessSchedulesForm.description}
                      onChange={(e) =>
                        e.target.value.length > 256
                          ? null
                          : handleAccessSchedulesChange({
                              name: e.target.name,
                              value: e.target.value,
                            })
                      }
                      state={accessSchedulesForm}
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardWithTitle>
        </div>
      </div>
      <div className=" m-2 mt-3 flex justify-content-end">
        <div className="">
          {editAccessSchedule ? (
            <Buttons
              label="Copy"
              className="btn-dark border-none"
              style={{ width: "105px" }}
              onClick={() => setOpenCopyModal(true)}
            ></Buttons>
          ) : null}
        </div>
        <div className="mx-3" style={{ width: "105px" }}>
          <Buttons
            label="Save"
            className="btn-dark border-none"
            onClick={() => submit()}
          ></Buttons>
        </div>
        <div className="">
          <Buttons
            onClick={showcomponent}
            label="Cancel"
            className="btn-grey border-none"
          ></Buttons>
        </div>
      </div>
      <div className="mt-4">
        <RecentCheckIn data={checkInData} />
      </div>
    </>
  );
};

export default AddAccessSchedules;
