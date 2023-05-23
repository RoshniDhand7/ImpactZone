import React, { useState } from "react";
import CardWithTitle from "../../../../components/cards/cardWithTitle/cardWithTitle";
import itemsforword from "../../../../assets/icons/itemsforward.png";
import itemforword from "../../../../assets/icons/itemforword.png";
import itembackword from "../../../../assets/icons/itembackward.png";
import itemsbackword from "../../../../assets/icons/itemsbackward.png";
import checkInData from "../../../../utils/checkInData";
import RecentCheckIn from "../../../../components/cards/Profilecard/recentCheckIn";
import Buttons from "../../../../components/buttons/button";
import { PickList } from "primereact/picklist";

const CancelCode = () => {
  const [source, setSource] = useState([]);
  const [target, setTarget] = useState([]);
  const itemTemplate = (item) => {
    return (
      <div className="flex flex-wrap p-2 align-items-center gap-3">
        <img
          className="w-4rem shadow-2 flex-shrink-0 border-round"
          src={itemsbackword}
          alt={item.name}
        />
        <div className="flex-1 flex flex-column gap-2">
          <span className="font-bold">{item.name}</span>
          <div className="flex align-items-center gap-2">
            <i className="pi pi-tag text-sm"></i>
            <span>{item.category}</span>
          </div>
        </div>
        <span className="font-bold text-900">${item.price}</span>
      </div>
    );
  };
  return (
    <>
      <div>
        <h4 className="text-bold text-black">IN-Club Cancel Codes</h4>
        <div>
          <CardWithTitle title="Select Cancel Codes">
            <div className="p-3">
              {/* <span className="my-4 text-xs">Available</span> */}
              <div className="card  ">
                <PickList
                  // source={source}
                  // target={target}
                  // onChange={onChange}
                  itemTemplate={itemTemplate}
                  breakpoint=""
                  sourceHeader="Available"
                  targetHeader="Selected"
                  sourceStyle={{ height: "30rem" }}
                  targetStyle={{ height: "30rem" }}
                />
              </div>

              {/* <div className="flex justify-content-around my-2 ">
                <div className="col-5 flex flex-column justify-content-around  border-1 opacity-40 border-round text-grey bg-white w-25">
                  <div>
                    <span>10 Days Clause</span>
                  </div>
                  <div>
                    <span>13 Month Clause</span>
                  </div>
                  <div>
                    <span>14 Day Clause</span>
                  </div>
                  <div>
                    <span>14 Day Trail Membership</span>
                  </div>
                  <div>
                    <span>15 Day Clause</span>
                  </div>
                  <div>
                    <span>1st Payment Default</span>
                  </div>
                </div>
                <div className="col-2">
                  <div className="flex flex-column justify-content-center align-items-center mt-2">
                    <div>
                      <div style={{ width: "24px", height: "24px" }}>
                        <img src={itemsforword} alt="" />
                      </div>
                      <div
                        className="my-2"
                        style={{ width: "24px", height: "24px" }}
                      >
                        <img src={itemforword} alt="" />
                      </div>
                      <div style={{ width: "24px", height: "24px" }}>
                        <img src={itembackword} alt="" />
                      </div>
                      <div
                        className="my-2"
                        style={{ width: "24px", height: "24px" }}
                      >
                        <img src={itemsbackword} alt="" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-5 border-1 opacity-40 text-grey border-round bg-white w-25">
                  <div>
                    <span>10 Days Clause</span>
                  </div>
                  <div>
                    <span>13 Month Clause</span>
                  </div>
                  {/* <div>
                    <span>14 Day Clause</span>
                  </div>
                  <div>
                    <span>14 Day Trail Membership</span>
                  </div>
                  <div>
                    <span>15 Day Clause</span>
                  </div>
                  <div>
                    <span>1st Payment Default</span>
                  </div> */}
              {/* </div> */}
              {/* </div> */}
            </div>
          </CardWithTitle>
        </div>
      </div>
      <div className="flex justify-content-end p-2">
        <div className="mx-2 ">
          <Buttons label="Save" className="btn-dark border-none"></Buttons>
        </div>
        <div>
          <Buttons label="Cancel" className="btn-grey border-none"></Buttons>
        </div>
      </div>
      <div>
        <div className="bottom-0  mt-2">
          <RecentCheckIn data={checkInData}></RecentCheckIn>
        </div>
      </div>
    </>
  );
};

export default CancelCode;
