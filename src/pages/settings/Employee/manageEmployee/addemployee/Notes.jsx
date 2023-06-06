import React from "react";
import CardWithTitle from "../../../../../components/cards/cardWithTitle/cardWithTitle";
import Buttons from "../../../../../components/buttons/button";
import RecentCheckIn from "../../../../../components/cards/Profilecard/recentCheckIn";
import checkInData from "../../../../../utils/checkInData";
import { InputTextarea } from "primereact/inputtextarea";
import { useState } from "react";

const Notes = () => {
  const [showNotes, setActiveNotes] = useState(false);
  const [value, setValue] = useState("");

  const onClickActiveNotes = () => {
    setActiveNotes((prev) => !prev);
  };

  const showTableNotes = () => {
    return (
      <>
        <div>
          <div>
            <CardWithTitle title="Taken By" title2="Date/Time" title3="Notes">
              <div
                style={{ height: "250px" }}
                className="p-3 flex justify-content-center align-items-center"
              >
                <div className="font-semibold">None Found</div>
              </div>
            </CardWithTitle>
          </div>
        </div>
        <div className="flex justify-content-end pt-2">
          <div className="flex  mr-2 mt-3 ">
            <div className="mx-2">
              <Buttons
                onClick={onClickActiveNotes}
                label="Add"
                icon={"pi pi-plus-circle"}
                className="btn-dark border-none"
              ></Buttons>
            </div>
            <div>
              <Buttons
                label="Print"
                icon={"pi pi-print"}
                className="bg-yellow  border-none"
              ></Buttons>
            </div>
            <div className="mx-2">
              <Buttons label="Save" className="btn-dark  border-none"></Buttons>
            </div>
            <div>
              <Buttons
                label="Cancel"
                className="btn-grey border-none"
              ></Buttons>
            </div>
          </div>
        </div>
      </>
    );
  };

  const AddNotes = () => {
    return (
      <>
        <div>
          <CardWithTitle title="Notes">
            <div className=" p-3">
              <label className="text-xs font-semibold text-dark-gray px-2 gap-2">
                Notes
              </label>
              <div className="pt-2">
                <InputTextarea
                  style={{ width: "100%", height: "250px" }}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
              </div>
            </div>
          </CardWithTitle>
        </div>
        <div className="flex justify-content-end pt-2">
          <div className="flex  mr-2 mt-3 ">
            <div className="mx-2">
              <Buttons
                onClick={onClickActiveNotes}
                label="Save"
                className="btn-dark  border-none"
              ></Buttons>
            </div>
            <div>
              <Buttons
                label="Cancel"
                className="btn-grey border-none"
              ></Buttons>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      {showNotes ? AddNotes() : showTableNotes()}
      <div>
        <RecentCheckIn data={checkInData} />
      </div>
    </>
  );
};

export default Notes;
