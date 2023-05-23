import React, { useState } from "react";
import Search from "../../search/search";
import Filter from "../../../assets/icons/filter.png";
import Profcard from "../../../assets/icons/profcard.png";
import Alert from "../../../assets/icons/alert-triangle.png";

const RecentCheckIn = ({ data }) => {
  return (
    <>
      <div className="w-100 ">
        <div className="">
          <div>
            <h3>Recent Check-Ins</h3>
          </div>
          <div className="flex mt-3 justify-content-between align-items-center">
            <div className="flex">
              <span className="text-sm font-semibold text-center mt-3 mx-2">
                Check-In
              </span>
              <Search placeholder="Search by barcode/member"></Search>
              <div className="flex  ">
                <span className="mx-3 mt-3 opacity-50 font-bold">:</span>
                <div
                  className="flex text-center mt-3  "
                  style={{ width: "19px", height: "19px" }}
                >
                  <img className="" src={Filter} alt="" />
                  <span className="text-sm font-semibold text-center mx-2">
                    Filter
                  </span>
                </div>
              </div>
              <div className="mx-6">
                <Search placeholder="search by filter"></Search>
              </div>
            </div>
            <div className="">
              <button className="p-2 px-3 text-black bg-white border-1 border-round cursor-pointer">
                More
              </button>
            </div>
          </div>
        </div>

        <div className="flex overflow-auto">
          {data.map((card, index) => {
            return (
              <div
                className={
                  "m-2 mt-3 p-2  flex flex-column align-items-center  " +
                  (card.isActive && !card.paymentDue
                    ? "profileactive"
                    : card.isActive && card.paymentDue
                    ? "profilepending"
                    : "profileexpire")
                }
              >
                <div
                  className="border-circle   "
                  style={{ width: "80px", height: "80px" }}
                >
                  <img className="border-circle" src={card.image} alt="" />
                </div>
                <div className="flex flex-column align-items-center justify-content-between">
                  <span className="text-small font-semibold mt-2 ">
                    {card.title}
                  </span>
                  <span className="text-small font-medium mt-2 ">
                    {card.isActive ? (
                      card.membershipType
                    ) : (
                      <span className="text-small font-medium  font-red  ">
                        Membership <br />
                        &nbsp; &nbsp; cancelled
                      </span>
                    )}
                  </span>
                  <span className="text-xsmall font-semibold text-blue-500">
                    {card.isActive ? (
                      card.time
                    ) : (
                      <span className="text-small font-medium  font-red  ">
                        {card.date}
                      </span>
                    )}
                  </span>
                  <span className="text-xsmall ">
                    {card.isActive ? (
                      card.checkInBefore + "m from Now"
                    ) : (
                      <span className="text-xsmall font-red">Cancel</span>
                    )}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default RecentCheckIn;
