import React from "react";
import CardWithTitle from "../../../../../components/cards/cardWithTitle/cardWithTitle";
import itemsbackword from "../../../../../assets/icons/itembackward.png";
import { PickList } from "primereact/picklist";
import Buttons from "../../../../../components/buttons/button";
import RecentCheckIn from "../../../../../components/cards/Profilecard/recentCheckIn";
import checkInData from "../../../../../utils/checkInData";

const Clubs = () => {
  //     const [source, setSource] = useState([]);
  // const [target, setTarget] = useState([]);
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
        <div className="">
          <CardWithTitle title="Report Data Access">
            <div className="card p-3 ">
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
          </CardWithTitle>
        </div>
        <div className="mt-3">
          <CardWithTitle title="Clubs">
            <div className="card p-3 ">
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
          </CardWithTitle>
        </div>
      </div>
      <div className="flex justify-content-end p-2 ">
        <div className=" mt-3 flex  ">
          <div className="mx-4">
            <Buttons
              label="Save"
              className="btn-dark  mx-3 border-none"
            ></Buttons>
          </div>
          <div className=" ">
            <Buttons label="Cancel" className="btn-grey  border-none"></Buttons>
          </div>
        </div>
      </div>
      <div>
        <div>
          <RecentCheckIn data={checkInData}></RecentCheckIn>
        </div>
      </div>
    </>
  );
};

export default Clubs;
