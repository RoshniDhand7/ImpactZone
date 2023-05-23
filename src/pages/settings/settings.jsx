import React from "react";

import settingsCard from "../../utils/settings";
import RecentCheckIn from "../../components/cards/Profilecard/recentCheckIn";
import checkInData from "../../utils/checkInData";
import { Link } from "react-router-dom";

const Settings = () => {
  return (
    <>
      <div className="bg-color p-2 ">
        <h3 className="text-bold  m-3">Settings</h3>
        <div className="p-3  flex justify-content-center">
          <div className="p-3 border-round-xl btn-lightblue  ">
            <div className="grid col-12  m-auto p-0">
              {settingsCard.map((box, index) => {
                return (
                  <div className="col-3 p-3">
                    <Link to={box.link}>
                      <div className="bg-style bg-white cursor-pointer  border-round flex flex-column justify-content-center  align-items-center py-5 ">
                        <div
                          className=""
                          style={{ width: "60px", height: "60px" }}
                        >
                          <img src={box.img} alt="" />
                        </div>

                        <div className="mt-3 text-base">{box.title}</div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="px-2">
          <RecentCheckIn data={checkInData} />
        </div>
      </div>
    </>
  );
};

export default Settings;
