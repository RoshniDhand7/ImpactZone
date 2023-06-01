import React from "react";
import Input from "../../../../../../components/input/input";
import DropDown from "../../../../../../components/dropdown/dropdown";
import CardWithTitle from "../../../../../../components/cards/cardWithTitle/cardWithTitle";
import Checkbox from "../../../../../../components/checkbox/checkbox";
import Buttons from "../../../../../../components/buttons/button";
import RecentCheckIn from "../../../../../../components/cards/Profilecard/recentCheckIn";
import checkInData from "../../../../../../utils/checkInData";
import Divide from "../../../../../../assets/icons/box.png";

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
          <div className="">
            <div className="flex justify-content-between">
              <div className="col-2 flex">
                <span className="text-gray-300 text-xs m-2 mt-4">1</span>
                <div className="col-11">
                  <DropDown></DropDown>
                </div>
              </div>
              <div className="col-8 flex">
                <div className="col-2">
                  <Input placeholder="0.00" icon="pi pi-dollar"></Input>
                  <span className="flex justify-content-end text-xs mt-2 text-gray-300 r-0">
                    1-5 Clients
                  </span>
                </div>
                <div className="col-2">
                  <Input placeholder="0.00" icon="pi pi-dollar"></Input>
                  <span className="flex justify-content-end text-xs mt-2 text-gray-300 r-0">
                    1-5 Clients
                  </span>
                </div>
                <div className="col-2">
                  <Input placeholder="0.00" icon="pi pi-dollar"></Input>
                  <span className="flex justify-content-end text-xs mt-2 text-gray-300 r-0">
                    1-5 Clients
                  </span>
                </div>
                <div className="col-2">
                  <Input placeholder="0.00" icon="pi pi-dollar"></Input>
                  <span className="flex justify-content-end text-xs mt-2 text-gray-300 r-0">
                    1-5 Clients
                  </span>
                </div>
                <div className="col-2">
                  <Input placeholder="0.00" icon="pi pi-dollar"></Input>
                  <span className="flex justify-content-end text-xs mt-2 text-gray-300 r-0">
                    1-5 Clients
                  </span>
                </div>
                <div className="col-2">
                  <Input placeholder="0.00" icon="pi pi-dollar"></Input>
                  <span className="flex justify-content-end text-xs mt-2 text-gray-300 r-0">
                    1-5 Clients
                  </span>
                </div>
              </div>

              <div className="col px-0 flex">
                <div className="col-6">
                  <Input placeholder="0.00" icon="pi pi-dollar"></Input>
                  <span className="flex justify-content-end text-xs mt-2 text-gray-300 r-0">
                    No Registration Pay
                  </span>
                </div>
                <div className="text-xs mt-4  ">
                  <Checkbox title="Count Unpaid Services"></Checkbox>
                </div>
              </div>
            </div>
            <div className=" flex justify-content-between">
              <div className="col-10 flex">
                <span className="text-gray-300 text-xs m-2 mt-4">2</span>
                <div className="col-2 px-0 ml-2">
                  <DropDown></DropDown>
                </div>
                <div className=" ml-3 -m-2 col-2">
                  <div className="col-10">
                    <Input placeholder="0.00" icon="pi pi-dollar"></Input>
                  </div>
                </div>
                <div className="col-3">
                  <Input placeholder="0.00" icon="pi pi-dollar"></Input>
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
              <div className="col-10 flex">
                <span className="text-gray-300 text-xs m-2 mt-4">3</span>
                <div className="col-2 px-0 mx-2">
                  <DropDown></DropDown>
                </div>
                <div className=" mx-3  col-1">
                  <Input placeholder="0.00" icon="pi pi-dollar"></Input>
                  <span className="flex justify-content-end text-xs mt-2 text-gray-300 r-0">
                    Base Rate
                  </span>
                </div>
                <div className="col-1">
                  <Input placeholder="0.00" icon="pi pi-dollar"></Input>
                  <span className="flex justify-content-end text-xs mt-2 text-gray-300 r-0">
                    Per Client
                  </span>
                </div>
                <div className="col-1">
                  <Input placeholder="0.00" icon="pi pi-dollar"></Input>
                  <span className="flex justify-content-end text-xs mt-2 text-gray-300 r-0">
                    For Each
                  </span>
                </div>
                <div className="col-1">
                  <Input placeholder="0.00" icon="pi pi-dollar"></Input>
                  <span className="flex justify-content-end text-xs mt-2 text-gray-300 r-0">
                    Add
                  </span>
                </div>
                <div className="col-1">
                  <Input placeholder="0.00" icon="pi pi-dollar"></Input>
                  <span className="flex justify-content-end text-xs mt-2 text-gray-300 r-0">
                    For Each
                  </span>
                </div>
                <div className="col-1">
                  <Input placeholder="0.00" icon="pi pi-dollar"></Input>
                  <span className="flex justify-content-end text-xs mt-2 text-gray-300 r-0">
                    Per Client
                  </span>
                </div>
                <div className="col-1">
                  <Input placeholder="0.00" icon="pi pi-dollar"></Input>
                  <span className="flex justify-content-end text-xs mt-2 text-gray-300 r-0">
                    For Each
                  </span>
                </div>
                <div className="col-2">
                  <Input placeholder="0.00" icon="pi pi-dollar"></Input>
                  <span className="flex justify-content-end text-xs mt-2 text-gray-300 r-0">
                    No Registration Pay
                  </span>
                </div>
                <div className="col-1">
                  <Input placeholder="0.00" icon="pi pi-dollar"></Input>
                  <span className="flex justify-content-end text-xs mt-2 text-gray-300 r-0">
                    Max Pay
                  </span>
                </div>
              </div>
              <div className="col-1"></div>
            </div>
            <div className="flex justify-content-between">
              <div className="col-10 flex">
                <span className="text-gray-300 text-xs m-2 mt-4">4</span>
                <div className="col-2 px-0 ml-2">
                  <DropDown> </DropDown>
                </div>
                <div className="ml-4 col-3 flex">
                  <Input placeholder="0.00" icon="pi pi-dollar">
                    {" "}
                  </Input>
                  <div
                    style={{ width: "18px", height: "20px" }}
                    className="flex align-items-center mt-3   "
                  >
                    <img src={Divide} alt="" className="mx-2 mt-2 " />
                  </div>
                </div>

                <div className="col-3">
                  <Input placeholder="0.00" icon="pi pi-dollar">
                    {" "}
                  </Input>
                  <span className="flex justify-content-end text-xs mt-2 text-gray-300 r-0">
                    No Registration Pay
                  </span>
                </div>
              </div>

              <div className="col-3">
                <div className="text-xs mt-4 "></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-content-end p-2 ">
        <div className=" mt-3 flex  ">
          <div className=" mr-2">
            <Buttons
              label="Add"
              icon="pi pi-plus-circle"
              className="btn-dark   border-none"
            ></Buttons>
          </div>
          <div className="">
            <Buttons label="Save" className="btn-dark border-none"></Buttons>
          </div>
          <div className="ml-2 ">
            <Buttons label="Cancel" className="btn-grey border-none"></Buttons>
          </div>
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
