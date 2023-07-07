import React, { useState } from "react";
import Input from "../../../../../../components/input/input";
import DropDown from "../../../../../../components/dropdown/dropdown";
import CardWithTitle from "../../../../../../components/cards/cardWithTitle/cardWithTitle";
import Checkbox from "../../../../../../components/checkbox/checkbox";
import Buttons from "../../../../../../components/buttons/button";
import RecentCheckIn from "../../../../../../components/cards/Profilecard/recentCheckIn";
import checkInData from "../../../../../../utils/checkInData";
import Divide from "../../../../../../assets/icons/box.png";
import constants from "../../../../../../utils/constants";
import { showToast } from "../../../../../../redux/actions/toastAction";
import api from "../../../../../../services/api";
import { useDispatch } from "react-redux";
import { paymentOptions } from "./PaymentOptions";
const Pay = () => {
  const [data, setData] = useState([
    " payments"[
      ({
        " name": "Incremental Pay",
        "1-5 Clients": 25,
        "6-10 Clients": 30,
        "11-15 Clients": 28,
        "16-20 Clients": 32,
        "No Registration Pay": 10,
        "Count Unpaid Services": true,
      },
      {
        name: "Pay Per Class",
        "Pay Per Class": 25,
        "No Registration Pay": 12,
      })
    ],
  ]);
  const [selectedPay, setselectedPay] = useState([]);

  const dispatch = useDispatch();

  const createClassic = async () => {
    const res = await api("post", constants.endPoints.CreateEmployee, data);
    console.log(res, "resss");
    if (res.success) {
      dispatch(showToast({ severity: "success", summary: res.message }));
    } else {
      dispatch(showToast({ severity: "error", summary: res.message }));
    }
  };

  const handleChange = (name) => (e) => {
    return setData({ ...data, [name]: e.target.vaue });
  };
  console.log(data);
  const pay = [
    { name: "Incremental Pay", value: "" },
    { name: "Pay Per Class", value: "" },
    { name: "Pay Per Client", value: "" },
    { name: "% Rate", value: "" },
  ];

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
                  <DropDown
                    type="text"
                    onChange={handleChange("")}
                    title="Class Level"
                  ></DropDown>
                </div>
                <div className="col-2">
                  <DropDown
                    title="Default Pay"
                    options={paymentOptions}
                    optionLabel={"name"}
                  ></DropDown>
                </div>
              </div>
            </div>
          </CardWithTitle>
        </div>
        <div className="col-12 bg-lightest-blue border-round-sm mt-3 shadow-4 ">
          <div className="">
            <div className="flex justify-content-between">
              <div className="col-2 flex">
                <span className="text-gray-300 text-xs m-2 mt-4">1</span>
                <div className="col-11">
                  <DropDown
                    options={paymentOptions}
                    optionLabel={"name"}
                    onChange={handleChange("")}
                  ></DropDown>
                </div>
              </div>
              <div className="col-8 flex">
                <div className="col-2">
                  <Input
                    placeholder="0.00"
                    id=""
                    values={data["1-5 Clients"]}
                    onChange={handleChange("1-5")}
                    icon="pi pi-dollar"
                  ></Input>
                  <span className="flex justify-content-end text-xs mt-2 text-gray-300 r-0">
                    1-5 Clients
                  </span>
                </div>
                <div className="col-2">
                  <Input
                    placeholder="0.00"
                    id=""
                    values={data["6-10 Clients"]}
                    onChange={handleChange("1-5")}
                    icon="pi pi-dollar"
                  ></Input>
                  <span className="flex justify-content-end text-xs mt-2 text-gray-300 r-0">
                    6-10 Clients
                  </span>
                </div>
                <div className="col-2">
                  <Input
                    placeholder="0.00"
                    id=""
                    values={data}
                    onChange={handleChange("1-5")}
                    icon="pi pi-dollar"
                  ></Input>
                  <span className="flex justify-content-end text-xs mt-2 text-gray-300 r-0">
                    11-15 Clients
                  </span>
                </div>
                <div className="col-2">
                  <Input
                    placeholder="0.00"
                    id=""
                    values={data}
                    onChange={handleChange("1-5")}
                    icon="pi pi-dollar"
                  ></Input>
                  <span className="flex justify-content-end text-xs mt-2 text-gray-300 r-0">
                    16-20 Clients
                  </span>
                </div>
                <div className="col-2">
                  <Input
                    placeholder="0.00"
                    id=""
                    values={data}
                    onChange={handleChange("1-5")}
                    icon="pi pi-dollar"
                  ></Input>
                  <span className="flex justify-content-end text-xs mt-2 text-gray-300 r-0">
                    21-25 Clients
                  </span>
                </div>
                <div className="col-2">
                  <Input
                    placeholder="0.00"
                    id=""
                    values={data}
                    onChange={handleChange("1-5")}
                    icon="pi pi-dollar"
                  ></Input>
                  <span className="flex justify-content-end text-xs mt-2 text-gray-300 r-0">
                    26+ Clients
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
                  <DropDown
                    options={paymentOptions}
                    optionLabel={"name"}
                    value={selectedPay}
                    onChange={handleChange("")}
                  ></DropDown>
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
                  <DropDown
                    options={paymentOptions}
                    optionLabel={"name"}
                    value={selectedPay}
                    onChange={handleChange("")}
                  ></DropDown>
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
                  <Input placeholder="0.00"></Input>
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
                  <Input placeholder="0.00"></Input>
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
                  <Input placeholder="0.00"></Input>
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
                  <DropDown
                    options={paymentOptions}
                    optionLabel={"name"}
                    value={selectedPay}
                    onChange={handleChange("")}
                  ></DropDown>
                </div>
                <div className="ml-4 col-3 flex">
                  <Input placeholder="0.00" icon="pi pi-dollar"></Input>
                  <div
                    style={{ width: "18px", height: "20px" }}
                    className="flex align-items-center mt-3   "
                  >
                    <img src={Divide} alt="" className="mx-2 mt-2 " />
                  </div>
                </div>

                <div className="col-3">
                  <Input placeholder="0.00"></Input>
                  <span className="flex justify-content-end text-xs mt-2 text-gray-300 r-0">
                    No Registration Pay
                  </span>
                </div>
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
            <Buttons
              onClick={createClassic}
              label="Save"
              className="btn-dark border-none"
            ></Buttons>
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
