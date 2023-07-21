import React, { useState } from "react";
import Divide from "../../../../../../assets/icons/box.png";
import DropDown from "../../../../../../components/dropdown/dropdown";
import CardWithTitle from "../../../../../../components/cards/cardWithTitle/cardWithTitle";
import Input from "../../../../../../components/input/input";
import Buttons from "../../../../../../components/buttons/button";
import RecentCheckIn from "../../../../../../components/cards/Profilecard/recentCheckIn";
import checkInData from "../../../../../../utils/checkInData";
import TableData from "../../../../../../components/cards/dataTable/dataTable";
import constants from "../../../../../../utils/constants";
import api from "../../../../../../services/api";
import { useEffect } from "react";

const AppointmentPay = ({ data, setData, createEmployee }) => {
  const [payType, setPayType] = useState("");
  const [dropDownLevels, setDropDownLevels] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState({});
  const [selectedOptions, setSelectedOptions] = useState([...data.appointmentCommissionSetups]);
  const [defaultPay, setDefaultPay] = useState("");
console.log(data.appointmentCommissionSetups, selectedOptions)
  const commissionTypeOptions = ["Per Event", "Person"];

  const changePayType = (e) => {
    setPayType(e.target.value);
  };

  const getLevels = async () => {
    const res = await api("get", constants.endPoints.AddLevel);
    if (res.success) {
      setDropDownLevels(res.data);
    } else {
      console.log(res);
    }
  };

  const payTemp = (col) => {
    return (
      <div className="flex align-items-center">
        <Input
          placeholder="0.00"
          onChange={(e) => {
            col.pay = e.target.value;
            const changedSelectedOptions = selectedOptions.map(item => {
              if(item.id) {
                if(item.id === col.id) {
                  item = { ...col }
                }
              }
              return item;
            })
            setDefaultPay("");
            setSelectedOptions(changedSelectedOptions);
          }}
          value={col.pay}
        />
        <input
          type="radio"
          name="payType"
          id="dollar"
          onChange={(e) => changePayType(e)}
          value="dollar"
          hidden
        />
        <label
          HtmlFor="dollar"
          className={payType === "dollar" ? "selected-pay-type" : "pay-type"}
        >
          $
        </label>
        <input
          type="radio"
          name="payType"
          id="percentage"
          value="percentage"
          hidden
          onChange={(e) => changePayType(e)}
        />
        <label
          HtmlFor="percentage"
          className={
            payType === "percentage" ? "selected-pay-type" : "pay-type"
          }
        >
          %
        </label>
      </div>
    );
  };
  const commissionTypeTemp = (col) => {
    return (
      <DropDown
        value={col.commissionType}
        onChange={(e) => {
          col.commissionType = e.value;
          setSelectedOptions([...selectedOptions]);
        }}
        options={commissionTypeOptions}
      ></DropDown>
    );
  };

  useEffect(() => {
    getLevels();
  }, []);


  //  const getSelectedOptions = () => {
  //   if(data?.appointmentCommissionSetups.length) {
  //     return setSelectedOptions([...data.appointmentCommissionSetups]);
  //   } else {
  //     return setSelectedOptions([]);
  //   }
  // } 

  // useEffect(() => {
  //   console.log('reached', selectedOptions)
  //   getSelectedOptions();
  // }, [])

  const handleChange = (name, payRow) => (e) => {
    if (name === "classLevel") {
      setSelectedLevel(() => {
        return dropDownLevels.find((item) => item._id === e.target.value._id);
      });
      return setData({ ...data, [name]: e.target.value._id });
    }
  };
  const relationship = [
    { field: "", header: "" },
    { field: "event", header: "Event" },
    { field: "Commission", header: "Commission", body: commissionTypeTemp },
    { field: "", header: "" },
    { field: "", header: "" },
    { field: "pay", header: "Pay", body: payTemp },
  ];
  const [relationshipData] = useState([
    {
      id: 1,
      event: "3D Body Scan",
      commissionType: "",
      pay: 0,
    },
    {
      id: 2,
      event: "Aga Group 30 Min",
      commissionType: "",
      pay: 0,
    },
    {
      id: 3,
      event: "Aga Group 45 Min",
      commissionType: "",
      pay: 0,
    },
  ]);

  //  const getSelectedOptions = () => {
  //   if(data?.appointmentCommissionSetups.length) {
  //     const megrgedSelection = relationshipData.map((item, i) => Object.assign({}, data.appointmentCommissionSetups[i], item));
  //     console.log(megrgedSelection)
  //   return setSelectedOptions([...megrgedSelection]);
  //   } else {
  //     return setSelectedOptions([]);
  //   }
  // } 

  // useEffect(() => {
  //   console.log('reached', selectedOptions)
  //   getSelectedOptions();
  // }, [])

  const onEnterDefaultPay = (event) => {
    setDefaultPay(event.target.value);
    selectedOptions.map(item => {
      item.pay = event.target.value;
      return item;
    });
    setSelectedOptions([...selectedOptions]);
  };

  return (
    <>
      <div>
        <div className="col-2 mb-2">
          <DropDown title="Similar To"
          placeholder="Select Employee"
          ></DropDown>
        </div>
        <div>
          <CardWithTitle title="General">
            <div className="p-3 flex">
              <div className="col-2">
                <DropDown
                  value={selectedLevel}
                  options={dropDownLevels}
                  optionLabel={"name"}
                  onChange={handleChange("classLevel")}
                  title="Class Level"
                ></DropDown>
              </div>
              <div className="col-2">
                <Input title="Default" value={defaultPay} onChange={(e) => onEnterDefaultPay(e)}></Input>
              </div>

              <div
                style={{ width: "18px", height: "20px" }}
                className="flex align-items-center mt-5  "
              >
                <span className="mt-2">$</span>
                <img src={Divide} alt="" className="mx-2 mt-2 " />
              </div>
            </div>
          </CardWithTitle>
        </div>
        <div className="my-5">
          <span className="font-bold text-900 text-xl ">Commission Setups</span>
          <div className="mt-2">
            <div className=" ">
              <TableData
                selected={selectedOptions}
                selectionMode="checkbox"
                data={relationshipData}
                columns={relationship}
                changeSelection={(e) => {
                  setSelectedOptions(e.value);
                  let commSetupData = e.value;
                  if(defaultPay) {
                    const defaultPayVal = defaultPay;
                    commSetupData = commSetupData.map(item => { item.pay = defaultPayVal; return item; });
                  }
                  // commSetupData = e.value.map(item => { delete item.id; return item; });
                  setData(() => {
                    return {
                      ...data,
                      appointmentCommissionSetups: commSetupData,
                    };
                  });
                }}
              ></TableData>

              <div className="flex justify-content-end p-2 ">
                <div className=" mt-3 flex  ">
                  <div className="mx-4">
                    <Buttons
                      label="Save"
                      className="btn-dark mx-3  border-none"
                      onClick={() => {
                        return createEmployee();
                      }}
                    ></Buttons>
                  </div>
                  <div className=" ">
                    <Buttons
                      label="Cancel"
                      className="btn-grey  border-none"
                    ></Buttons>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <RecentCheckIn data={checkInData} />
      </div>
    </>
  );
};
export default AppointmentPay;
