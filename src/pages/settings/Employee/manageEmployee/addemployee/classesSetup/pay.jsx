import React from "react";
import Input from "../../../../../../components/input/input";
import DropDown from "../../../../../../components/dropdown/dropdown";
import CardWithTitle from "../../../../../../components/cards/cardWithTitle/cardWithTitle";
import Checkbox from "../../../../../../components/checkbox/checkbox";
import Buttons from "../../../../../../components/buttons/button";
import RecentCheckIn from "../../../../../../components/cards/Profilecard/recentCheckIn";
import checkInData from "../../../../../../utils/checkInData";

const Pay = () => {
  return (
    <div>
      <div className="col-2 mb-3">
        <DropDown title="Similar To"></DropDown>
      </div>
      <div>
        <div>
          <CardWithTitle title="Pay">
            <div className="p-3">
              <div className="flex">
                <div className="col-2">
                  <DropDown title="Class Level"></DropDown>
                </div>
                <div className="col-2">
                  <DropDown title="Default Pay"></DropDown>
                </div>
              </div>
            </div>
          </CardWithTitle>
        </div>
        <div className="col-12 bg-lightest-blue border-round-sm mt-3 ">
          <div className="p-2">
            <div className="flex justify-content-between">
              <div className="col-2 flex">
                <span className="text-gray-300 text-xs m-2 mt-4">1</span>
                <div className="col-12">
                  <Input></Input>
                </div>
              </div>
              <div className="col-8 flex">
                <div className="col-1">
                  <Input></Input>
                  <span className="flex justify-content-end text-xs mt-2 text-gray-300 r-0">
                    1-5 Clients
                  </span>
                </div>
                <div className="col-1">
                  <Input></Input>
                  <span className="flex justify-content-end text-xs mt-2 text-gray-300 r-0">
                    1-5 Clients
                  </span>
                </div>
                <div className="col-1">
                  <Input></Input>
                  <span className="flex justify-content-end text-xs mt-2 text-gray-300 r-0">
                    1-5 Clients
                  </span>
                </div>
                <div className="col-1">
                  <Input></Input>
                  <span className="flex justify-content-end text-xs mt-2 text-gray-300 r-0">
                    1-5 Clients
                  </span>
                </div>
                <div className="col-1">
                  <Input></Input>
                  <span className="flex justify-content-end text-xs mt-2 text-gray-300 r-0">
                    1-5 Clients
                  </span>
                </div>
                <div className="col-1">
                  <Input></Input>
                  <span className="flex justify-content-end text-xs mt-2 text-gray-300 r-0">
                    1-5 Clients
                  </span>
                </div>
                <div className="col-2">
                  <Input></Input>
                  <span className="flex justify-content-end text-xs mt-2 text-gray-300 r-0">
                    No Registration Pay
                  </span>
                </div>
              </div>

              <div>
                <div className="text-xs mt-4 ">
                  <Checkbox title="Count Unpaid Services"></Checkbox>
                </div>
              </div>
            </div>
            <div className="flex justify-content-between">
              <div className="col-2 flex">
                <span className="text-gray-300 text-xs m-2 mt-4">2</span>
                <div className="col-12">
                  <Input></Input>
                </div>
              </div>
              <div className="col-8 flex">
                <div className="col-3">
                  <Input></Input>
                </div>
                <div className="col-3">
                  <Input></Input>
                  <span className="flex justify-content-end text-xs mt-2 text-gray-300 r-0">
                    No Registration Pay
                  </span>
                </div>
              </div>

              <div>
                <div className="text-xs mt-4 ">
                  <Checkbox title="Count Unpaid Services"></Checkbox>
                </div>
              </div>
            </div>
            <div className="flex justify-content-between">
              <div className="col-2 flex">
                <span className="text-gray-300 text-xs m-2 mt-4">3</span>
                <div className="col-12">
                  <Input></Input>
                </div>
              </div>
              <div className="col-8 flex">
                <div className="col-1">
                  <Input></Input>
                  <span className="flex justify-content-end text-xs mt-2 text-gray-300 r-0">
                    Base Rate
                  </span>
                </div>
                <div className="col-1">
                  <Input></Input>
                  <span className="flex justify-content-end text-xs mt-2 text-gray-300 r-0">
                    Per Client
                  </span>
                </div>
                <div className="col-1">
                  <Input></Input>
                  <span className="flex justify-content-end text-xs mt-2 text-gray-300 r-0">
                    For Each
                  </span>
                </div>
                <div className="col-1">
                  <Input></Input>
                  <span className="flex justify-content-end text-xs mt-2 text-gray-300 r-0">
                    Add
                  </span>
                </div>
                <div className="col-1">
                  <Input></Input>
                  <span className="flex justify-content-end text-xs mt-2 text-gray-300 r-0">
                    For Each
                  </span>
                </div>
                <div className="col-1">
                  <Input></Input>
                  <span className="flex justify-content-end text-xs mt-2 text-gray-300 r-0">
                    Per Client
                  </span>
                </div>
                <div className="col-1">
                  <Input></Input>
                  <span className="flex justify-content-end text-xs mt-2 text-gray-300 r-0">
                    For Each
                  </span>
                </div>
                <div className="col-2">
                  <Input></Input>
                  <span className="flex justify-content-end text-xs mt-2 text-gray-300 r-0">
                    No Registration Pay
                  </span>
                </div>
                <div className="col-1">
                  <Input></Input>
                  <span className="flex justify-content-end text-xs mt-2 text-gray-300 r-0">
                    Max Pay
                  </span>
                </div>
              </div>
              <div className="col-1">
                <div></div>
              </div>
            </div>
            <div className="flex justify-content-between">
              <div className="col-2 flex">
                <span className="text-gray-300 text-xs m-2 mt-4">4</span>
                <div className="col-12">
                  <Input> </Input>
                </div>
              </div>
              <div className="col-6 flex">
                <div className="col-3">
                  <Input> </Input>
                </div>
                <div className="col-3">
                  <Input> </Input>
                </div>
              </div>

              <div className="col-3">
                <div className="text-xs mt-4 "></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-content-end pt-2 ">
        <div className="col-3 flex  ">
          <Buttons
            label="Add"
            icon="pi pi-plus-circle"
            className=" p-3 border-none btn-dark"
          ></Buttons>
          <Buttons
            label="Save"
            className="btn-dark  mx-2  border-none"
          ></Buttons>

          <Buttons label="Cancel" className="btn-grey border-none"></Buttons>
        </div>
      </div>
      <div>
        <div>
          <RecentCheckIn data={checkInData} />
        </div>
      </div>
    </div>
  );
};

export default Pay;
