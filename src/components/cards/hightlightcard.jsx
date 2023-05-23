import React from "react";
import Members from "../../assets/icons/member.png";
import hightlightcards from "./hightlightcards";

const HightLightCard = ({ title, icon, number, className }) => {
  return (
    <>
      {hightlightcards.map((card, index) => {
        return (
          <>
            <div className={"col  hightlightcard p-3 m-2 " + card.color}>
              <div className="flex flex-column  justify-content-between">
                <div className="flex justify-content-between    ">
                  <div className="text-white"> {card.title}</div>
                  <div
                    className="p-2 border-circle bg-white text-center"
                    style={{ width: "45px ", height: "45px" }}
                  >
                    <img
                      className="mt-1"
                      style={{ width: "19px", height: "19px" }}
                      src={card.icon}
                      alt=""
                    />
                  </div>
                </div>
                <div className="mt-4  text-5xl font-bold">
                  <div
                    className="border-circle text-white "
                    style={{ width: "" }}
                  >
                    {card.number}
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      })}
    </>
  );
};

export default HightLightCard;
