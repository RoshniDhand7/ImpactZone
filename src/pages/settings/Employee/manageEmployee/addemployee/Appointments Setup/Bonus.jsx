import React, { useState } from "react";
import DropDown from "../../../../../../components/dropdown/dropdown";
import CardWithTitle from "../../../../../../components/cards/cardWithTitle/cardWithTitle";
import Input from "../../../../../../components/input/input";
import Buttons from "../../../../../../components/buttons/button";
import RecentCheckIn from "../../../../../../components/cards/Profilecard/recentCheckIn";
import checkInData from "../../../../../../utils/checkInData";
import Divide from "../../../../../../assets/icons/box.png";
import MuliSelectDropDown from "../../../../../../components/dropdown/muliSelectDropDown";
import { useEffect } from "react";

const Bonus = ({ data, setData, createEmployee }) => {
  const [bonusRows, setBonusRows] = useState([{ name: "" }]);
  const bonuTypeOptions = ["Single Client", "Service Value"];
  const timeFrameOptions = ["Days", "Weeks", "Months", "Years"];
  const eventOptions = ["Private Sessions", "Yoga Sessions", "Reformer", "Etc"];
  const [selectedTimeFrame, setSelectedTimeFrame] = useState([]);
  const bonusFields = {
    fields: [
      {
        name: "# of Sessions",
        type: "text",
        subType: "number",
        key: "numberOfSessions",
        placeholder: "Enter Days",
        placeholder1: "Enter Value",
      },
      {
        name: "Select Timeframe",
        type: "text",
        subType: "number",
        key: "timeFrameValue",
      },
      {
        name: "",
        type: "dropdown",
        key: "timeFramePeriod",
      },
      {
        name: "Bonus Amount",
        type: "text",
        subtype: "number",
        key: "bonusAmount",
      },
      {
        name: "",
        type: "multiSelectDropDown",
        key: "bonusEvent",
      },
    ],
  };

  const onSelectBonusType = (e, index) => {
    if (!bonusRows.some((item) => item.name === e.target.value)) {
      bonusRows[index] = {
        name: e.target.value,
        ...bonusFields,
      };
      setBonusRows([...bonusRows]);
      data.appointmentSetupBonus[index] = {
        bonusType: e.target.value,
      };
      setData({
        ...data,
        appointmentSetupBonus: data.appointmentSetupBonus,
      });
    }
  };

  function onClickAdd() {
    if (bonusRows.length < 2) {
      setBonusRows((prev) => {
        return [
          ...prev,
          {
            name: "",
          },
        ];
      });
    } else return;
  }
  const removePayRow = (item) => {
    setSelectedTimeFrame([]);
    const index = bonusRows.indexOf(item);
    if (index > -1) {
      if (bonusRows.length <= 1) {
        setBonusRows([
          {
            name: "",
          },
        ]);
      }
      // only splice array when item is found
      else {
        bonusRows.splice(index, 1); // 2nd parameter means remove one item only
        setBonusRows([...bonusRows]);
      }
    }
  };

  const onEnterData = (e, index, keyName) => {
    let appointmentPayload = [...data.appointmentSetupBonus];
    appointmentPayload[index][keyName] = e.target.value;
    console.log(keyName, e.target.value)
    setData(() => {
      return {
        ...data,
        appointmentSetupBonus: [...appointmentPayload],
      };
    });
  };

  useEffect(() => {
    if (data.appointmentSetupBonus.length) {
      const appointmentRowsKey = data.appointmentSetupBonus.map(
        (item) => item.bonusType
      );
      const addedBonusRows = [];
      for (let i = 0; i < appointmentRowsKey.length; i++) {
        bonuTypeOptions.map((item) => {
          if (appointmentRowsKey[i] === item) {
            addedBonusRows.push({
              name: item,
              ...bonusFields
            });
          }
          return item;
        });
      }
      setBonusRows(addedBonusRows);
    }
  }, []);

  return (
    <>
      <div className="col-2 mb-2">
        <DropDown title="Similar To"></DropDown>
      </div>
      <div>
        <CardWithTitle title="Bonus">
          <div className=" pb-0 ">
            {bonusRows.map((item, index) => {
              console.log(item);
              return (
                <>
                  <div className="col-12 flex ">
                    <div className="col-2 mt-2 ">
                      <DropDown
                        title=""
                        options={bonuTypeOptions}
                        onChange={(e) => onSelectBonusType(e, index)}
                        placeholder="Bonus Type"
                        value={item.name}
                      ></DropDown>
                    </div>

                    {item.fields?.map((field, fieldIndex) => {
                      return (
                        <>
                          <div className="col flex">
                            <div className="col">
                              {field.type === "text" ? (
                                <Input
                                  title=""
                                  type={
                                    field.subtype ? field.subtype : field.type
                                  }
                                  placeholder={field.placeholder}
                                  onChange={(e) => {
                                    onEnterData(e, index, field.key);
                                  }}
                                  value={data.appointmentSetupBonus[index] && data.appointmentSetupBonus[index][field.key]}
                                ></Input>
                              ) : field.type === "multiSelectDropDown" ? (
                                <>
                                  <div
                                    className="mt-2"
                                    style={{ width: "220px" }}
                                  >
                                    <MuliSelectDropDown
                                      title=""
                                      options={eventOptions}
                                      onChange={(e) => {
                                        setSelectedTimeFrame(e.value);
                                        onEnterData(e, index, field.key);
                                      }}
                                      placeholder="Select Event"
                                      value={
                                        data.appointmentSetupBonus[index]
                                          .bonusEvent
                                      }
                                    ></MuliSelectDropDown>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div className="">
                                    <DropDown
                                      title=""
                                      options={timeFrameOptions}
                                      onChange={(e) => {
                                        onEnterData(e, index, field.key);
                                      }}
                                      placeholder="Time Frame"
                                      value={
                                        data.appointmentSetupBonus[index]
                                          .timeFramePeriod
                                      }
                                    ></DropDown>
                                  </div>
                                </>
                              )}

                              <span className="text-xs text-gray-200 p-2 flex justify-content-center ">
                                {fieldIndex === 0 &&
                                item.name === "Single Client"
                                  ? "# of Sessions"
                                  : fieldIndex === 0 &&
                                    item.name === "Service Value"
                                  ? "Sessions Value"
                                  : field.name}
                              </span>
                            </div>
                            {fieldIndex === 0 ? (
                              <span className="mt-3 p-2 text-gray-300">
                                Over
                              </span>
                            ) : fieldIndex === 3 ? (
                              <div
                                style={{ width: "18px", height: "20px" }}
                                className="flex align-items-center mt-4   mx-5 "
                              >
                                <span
                                  className={
                                    "mt-2 cursor-pointer " +
                                    (data.appointmentSetupBonus[index]
                                      .isPayTypeDollar
                                      ? "selected-price-type"
                                      : "")
                                  }
                                  onClick={() => {
                                    data.appointmentSetupBonus[
                                      index
                                    ].isPayTypeDollar = true;
                                    setData({ ...data });
                                  }}
                                >
                                  $
                                </span>
                                <span
                                  className={
                                    "mt-2 cursor-pointer ml-3 " +
                                    (!data.appointmentSetupBonus[index]
                                      .isPayTypeDollar
                                      ? "selected-price-type"
                                      : "")
                                  }
                                  onClick={() => {
                                    data.appointmentSetupBonus[
                                      index
                                    ].isPayTypeDollar = false;
                                    setData({ ...data });
                                  }}
                                >
                                  %
                                </span>
                              </div>
                            ) : null}
                          </div>
                        </>
                      );
                    })}
                    {item.fields ? (
                      <div
                        className="mt-5 cursor-pointer mx-4"
                        onClick={() => removePayRow(item)}
                      >
                        <i className="pi pi-minus-circle"></i>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </>
              );
            })}
          </div>
        </CardWithTitle>
      </div>
      <div className="flex justify-content-end  m-2 mt-3 ">
        <div className="mr-2">
          <Buttons
            onClick={onClickAdd}
            label="Add"
            icon="pi pi-plus-circle"
            className="btn-dark  border-none"
          ></Buttons>
        </div>
        <div className="mr-4">
          <Buttons
            onClick={() => {
              return createEmployee();
            }}
            label="Save"
            className="btn-dark mx-3 border-none"
          ></Buttons>
        </div>
        <div className=" ">
          <Buttons label="Cancel" className="btn-grey  border-none"></Buttons>
        </div>
      </div>

      <div>
        <RecentCheckIn data={checkInData} />
      </div>
    </>
  );
};

export default Bonus;
