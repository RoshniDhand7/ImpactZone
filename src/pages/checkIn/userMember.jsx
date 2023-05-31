import React from "react";
import Buttons from "../../components/buttons/button";
import User from "../../assets/icons/usermember.png";
import CardWithTitle from "../../components/cards/cardWithTitle/cardWithTitle";
import TableData from "../../components/cards/dataTable/dataTable";
import dummyData from "../../utils/dummyData";
import RecentCheckIn from "../../components/cards/Profilecard/recentCheckIn";
import checkInData from "../../utils/checkInData";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useState } from "react";
import PopUp from "../../components/popup/popup";
import QuickEnroll from "./quickEnroll";
import addTask from "./addTask";

const UserMember = () => {
  const [isActive, setIsActive] = useState(false);
  const { relationshipColumns, relationshipData } = dummyData();
  const [selectedPos, setSelectedPos] = useState(null);

  const [popUp, setPopUp] = useState({
    title: "",
    show: null,
  });

  const showPopUp = async (title, data) => {
    // dispatch({ type: "SHOW_POPUP", payload: "my payload" });
    // useDispatch("SHOW_POPUP", {
    //   isVisible: true,
    //   title: title,
    //   show: data,
    // });
    setPopUp({
      title: title,
      show: data,
    });
    setIsActive(true);
  };
  return (
    <>
      <div className="p-3">
        <div className="p-2">
          <div className="bg-green  p-2 flex  border-round">
            <div className=" col-6 p-3  flex justify-content-between ">
              <div className="flex  ">
                <div style={{ width: "154px", height: "161px" }}>
                  <img className="border-round" src={User} alt="" />
                </div>
                <div className=" mx-3 mt-3  flex flex-column">
                  <span className="text-white text-xxl">John Wick</span>
                  <span className="text-white text-base">Barcode:45677654</span>
                  <span className="text-white text-base">Active</span>
                  <span className="text-white text-base">All Accesss</span>
                </div>
              </div>
              <div>
                <Buttons
                  onClick={() => showPopUp("Add Task", addTask)}
                  label="Add Task"
                  icon="pi pi-plus-circle"
                  className="btn-green border-round mx-2  border-white-alpha-50"
                />
              </div>
            </div>

            <div className="col-6 p-3 text-white  border-left border">
              <div className="flex justify-content-between">
                <span className="text-white text-xl text-white">Alerts</span>
                <span className="text-xs text-white">11/17/2022</span>
              </div>
              <span className="text-white text-xs text-white">
                Membership expires at 15/17/2022
              </span>
            </div>
          </div>
        </div>
        <div className="flex ">
          <div className="col-3 flex flex-column">
            <div className=" p-2 cursor-pointer  flex justify-content-between  text-xs text-bold">
              <span className="font-semibold text-base">Event</span>
              <span className="font-semibold text-base">Calendar</span>
              <button
                className=" border-none bg-white font-semibold text-base "
                onClick={() => showPopUp("Quick Enroll", QuickEnroll)}
              >
                Quick Enroll
              </button>
            </div>

            <TableData columns={relationshipColumns} data={relationshipData} />
            <div className="my-3">
              <div className=" p-2 cursor-pointer flex justify-content-between text-xs text-bold">
                <span className="font-semibold text-base">Services</span>{" "}
                <span className="font-semibold text-base">POS</span>
              </div>

              <TableData
                columns={relationshipColumns}
                data={relationshipData}
              />
            </div>
            <div className=" p-2 cursor-pointer  flex justify-content-between text-xs text-bold">
              <span className="font-semibold text-base">Resources</span>
              <span className="font-semibold text-base">Calendar</span>
              <span className="font-semibold text-base">Reserve</span>
            </div>

            <TableData columns={relationshipColumns} data={relationshipData} />
          </div>
          <div className="col-9 p-0">
            <div className="col-12 flex justify-content-between p-0 mt-3">
              <div className="col-6 ">
                <CardWithTitle title="Member Details">
                  <div className=" card-height flex justify-content-between p-3 text-sm ">
                    <div className="  font-bold flex flex-column justify-content-around">
                      <span> Membership Type</span>
                      <span>Last Visit</span>
                      <span>Barcode</span>
                      <span>Agreement#</span>
                      <span>Notes</span>
                      <span>Secondary Members</span>
                      <span>Past Due</span>
                    </div>
                    <div className="text-gray-300 flex flex-column justify-content-around ">
                      <span>Impact1</span>
                      <span>March-12- 2023</span>
                      <span>0067655</span>
                      <span>987678987</span>
                      <span>Trainer</span>
                      <span>987678987</span>
                      <span>$0.00</span>
                    </div>
                  </div>
                </CardWithTitle>
              </div>
              <div className="col-6">
                <CardWithTitle title="Membership">
                  <div className="card-height flex justify-content-between p-3 text-sm ">
                    <div className="  font-bold flex flex-column justify-content-around">
                      <span> Agreement#</span>
                      <span>Expiry Date</span>
                      <span>Past Due</span>
                      <span>Fees</span>
                      <span>Total Past Due</span>
                      <span>Total Next Due</span>
                      <span>Next Due Date</span>
                    </div>
                    <div className="text-gray-300 flex flex-column justify-content-around ">
                      <span>987678987</span>
                      <span>March-12- 2023</span>
                      <span>$0.00</span>
                      <span>$30.92</span>
                      <span>$0.00</span>
                      <span>$0.00</span>
                      <span>March-12- 2023</span>
                    </div>
                  </div>
                </CardWithTitle>
              </div>
            </div>
            <div className="col-12 justify-content-between flex">
              <div className="col-6">
                <CardWithTitle title="POS" title3="Pre-Pay Balance:$30.92">
                  <div className="card-height ">
                    <DataTable
                      value={relationshipData}
                      selection={selectedPos}
                      onSelectionChange={(e) => setSelectedPos(e.value)}
                      dataKey="id"
                      tableStyle={{ minWidth: "50rem" }}
                    >
                      <Column
                        selectionMode="multiple"
                        headerStyle={{ width: "3rem" }}
                      ></Column>
                      <Column field="code" header="Name"></Column>
                      <Column field="name" header="Category"></Column>
                      <Column field="category" header="Price"></Column>
                    </DataTable>
                    <div className="p-3 flex justify-content-end">
                      <button className=" px-2 p-2 border-round font-semibold bg-white  ">
                        <i className="pi pi-shopping-cart mr-2"></i>Buy
                      </button>
                    </div>
                  </div>
                </CardWithTitle>
              </div>

              <div className="col-6">
                <CardWithTitle title="Membership">
                  <div className="card-height flex justify-content-between p-3 text-sm ">
                    <div className="  font-bold flex flex-column justify-content-around">
                      <span> Recurring Plans</span>
                      <span>Past Due</span>
                      <span>Fees</span>
                      <span>Total Past Due</span>
                      <span>Total Next Due</span>

                      <span>Next Due Date</span>
                    </div>
                    <div className="text-gray-300 flex flex-column justify-content-around ">
                      <span>987678987</span>
                      <span>March-12- 2023</span>
                      <span>$0.00</span>
                      <span>$30.92</span>
                      <span>$0.00</span>
                      <span>March-12- 2023</span>
                    </div>
                  </div>
                </CardWithTitle>
              </div>
            </div>
            <div className="col-12">
              <TableData
                columns={relationshipColumns}
                data={relationshipData}
              />
            </div>
          </div>
        </div>
        <div className="">
          <RecentCheckIn data={checkInData} />
        </div>
      </div>
      <PopUp
        setIsActive={setIsActive}
        title={popUp.title}
        isActive={isActive}
        data={popUp.show ? popUp.show() : null}
      />
    </>
  );
};

export default UserMember;
