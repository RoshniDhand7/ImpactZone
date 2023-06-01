import React from "react";
import CardWithTitle from "../../../../../components/cards/cardWithTitle/cardWithTitle";
import Buttons from "../../../../../components/buttons/button";
import RecentCheckIn from "../../../../../components/cards/Profilecard/recentCheckIn";
import checkInData from "../../../../../utils/checkInData";

const Notes = () => {
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
        <div className="flex justify-content-end pt-2">
          <div className="flex  mr-2 mt-3 ">
            <div className="mx-2">
              <Buttons
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
      </div>
      <div>
        <div>
          <RecentCheckIn data={checkInData} />
        </div>
      </div>
    </>
  );
};

export default Notes;
