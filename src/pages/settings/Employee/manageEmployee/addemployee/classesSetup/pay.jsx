import React, { useEffect, useState } from "react";

import CardWithTitle from "../../../../../../components/cards/cardWithTitle/cardWithTitle";
import Checkbox from "../../../../../../components/checkbox/checkbox";
import Buttons from "../../../../../../components/buttons/button";
import RecentCheckIn from "../../../../../../components/cards/Profilecard/recentCheckIn";
import checkInData from "../../../../../../utils/checkInData";
import Divide from "../../../../../../assets/icons/box.png";
import constants from "../../../../../../utils/constants";
import api from "../../../../../../services/api";
import { paymentOptions } from "./PaymentOptions";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import DropDown from "../../../../../../components/dropdown/dropdown";
const Pay = ({ data, setData, createEmployee }) => {
  const [payRows, setPayRows] = useState([{ name: "", key: "" }]);
  const [dropDownLevels, setDropDownLevels] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState({});
  const [payDefault, setPayDefault] = useState({});

  const forEachClientOverDropdownValue = Array.from(
    { length: 50 },
    (_, index) => index + 1
  );

  function onClickAdd() {
    setPayRows((prev) => {
      return [
        ...prev,
        {
          name: "",
        },
      ];
    });
  }

  const getLevels = async () => {
    const res = await api("get", constants.endPoints.AddLevel);
    if (res.success) {
      setDropDownLevels(res.data);
    } else {
      console.log(res);
    }
  };

  const handleChange = (name, payRow) => (e) => {
    if (name === "classLevel") {
      setSelectedLevel(() => {
        return dropDownLevels.find((item) => item._id === e.target.value._id);
      });
      return setData({ ...data, [name]: e.target.value._id });
    } else if (name === "defaultPay") {
      setPayDefault(e.target.value);
      return setData({ ...data, [name]: (e.target.value - 1).toString() });
    } else {
      let selectedPayments = data.payments.map((payment) => {
        if (payment.name === payRow.key) {
          payment = {
            ...payment,
            [name]: e.target.value,
          };
        }
        return payment;
      });

      return setData(() => {
        return { ...data, payments: selectedPayments };
      });
    }
  };

  const onSelectPayMethod = (event, index) => {
    // if (!payRows.some((item) => item.key === event.value.key)) {
    payRows[index] = event.target.value;
    setPayRows([...payRows]);

    if (!data.payments.some((item) => item.name === event.value.key)) {
      data.payments[index] = {
        name: event.value.key,
      };
    }
    setData({
      ...data,
      payments: data.payments,
    });
    // }
  };

  const removePayRow = (item) => {
    const index = payRows.indexOf(item);
    if (index > -1) {
      if (payRows.length <= 1) {
        setPayRows([
          {
            name: "",
          },
        ]);
      } else {
        // only splice array when item is found
        payRows.splice(index, 1); // 2nd parameter means remove one item only
        data.payments.splice(index, 1);
        setData({
          ...data,
          payments: data.payments,
        });
        setPayRows([...payRows]);
      }
    }
  };

  const getForEachClientOverDropDownValue = (start) => {
    let count = [];
    for (let i = start; i <= 50; i++) {
      count.push(String(i));
    }
    return count;
  };

  const findForEachClientOverValue = (key) => {
    return data.payments.map((payment) => {
      return Number(payment[key]) + 1;
    })[0];
  };

  useEffect(() => {
    getLevels();
  }, []);

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
                    value={selectedLevel}
                    options={dropDownLevels}
                    optionLabel={"name"}
                    onChange={handleChange("classLevel")}
                    title="Class Level"
                  ></DropDown>
                </div>
                <div className="col-2">
                  <DropDown
                    title="Default Pay"
                    // optionLabel={"name"}
                    value={payDefault}
                    onChange={handleChange("defaultPay")}
                    options={
                      payRows[0].fields &&
                      payRows.map((row, index) => (index + 1).toString())
                    }
                  ></DropDown>
                </div>
              </div>
            </div>
          </CardWithTitle>
        </div>
        <div className="col-12 bg-lightest-blue border-round-sm mt-3 shadow-4 p-2 ">
          {payRows.map((item, index) => {
            return (
              <>
                <div className=" flex justify-content-between m-2">
                  <div className="flex justify-content-between">
                    <div className="flex  ">
                      <span className="text-gray-300 text-xs m-2 mt-4">
                        {index + 1}
                      </span>
                      <div className="mx-2" style={{ width: "8rem" }}>
                        <DropDown
                          options={paymentOptions}
                          optionLabel={"name"}
                          value={item}
                          onChange={(e) => onSelectPayMethod(e, index)}
                        ></DropDown>
                      </div>
                    </div>
                    <div className="flex justify-content-between">
                      {item.fields &&
                        item.fields.map((field) => {
                          return (
                            <div
                              className="mx-2   justify-content-between"
                              style={{
                                width: `calc(100/${item.fields.length})%`,
                              }}
                            >
                              <div className="flex justify-content-between mt-2">
                                {field.type === "number" ? (
                                  <>
                                    <InputText
                                      placeholder="0.00"
                                      id=""
                                      className="w-12"
                                      type="number"
                                      onChange={handleChange(field.key, item)}
                                    ></InputText>

                                    {field.dollarsign ? (
                                      <i className="mx-3 mt-2 font-bold pi pi-dollar" />
                                    ) : null}
                                    <div className="col px-0 flex">
                                      <div className="row">
                                        {field.name === "% Rate" ? (
                                          <div
                                            style={{
                                              width: "18px",
                                              height: "20px",
                                            }}
                                            className="flex align-items-center "
                                          >
                                            <img
                                              src={Divide}
                                              alt=""
                                              className="mx-2 mt-2"
                                            />
                                          </div>
                                        ) : (
                                          ""
                                        )}
                                      </div>
                                    </div>
                                  </>
                                ) : field.type === "dropdown" ? (
                                  <>
                                    <div className="-mb-2">
                                      <Dropdown
                                        options={
                                          field.key === "forEachClientOver1"
                                            ? getForEachClientOverDropDownValue(
                                                1
                                              )
                                            : field.key === "forEachClientOver2"
                                            ? getForEachClientOverDropDownValue(
                                                findForEachClientOverValue(
                                                  "forEachClientOver1"
                                                )
                                              )
                                            : getForEachClientOverDropDownValue(
                                                findForEachClientOverValue(
                                                  "forEachClientOver2"
                                                )
                                              )
                                        }
                                        onChange={handleChange(field.key, item)}
                                        placeholder="Select"
                                        value={
                                          data.payments.map((payment) => {
                                            if (payment.name === item.key) {
                                              return payment[field.key];
                                            }
                                          })[0]
                                        }
                                      ></Dropdown>
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    <div className="mt-3 flex justify-content-end">
                                      <Checkbox id={item.name}></Checkbox>
                                    </div>
                                  </>
                                )}
                              </div>

                              <span className="flex justify-content-end text-xs mt-2  w-10 text-gray-300">
                                {field.name}
                              </span>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                  <div>
                    {item.fields ? (
                      <div
                        className="mt-5 cursor-pointer "
                        onClick={() => removePayRow(item)}
                      >
                        <i className="pi pi-minus-circle"></i>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
      <div className="flex justify-content-end p-2 ">
        <div className=" mt-3 flex  ">
          <div className=" mr-2">
            <Buttons
              onClick={onClickAdd}
              label="Add"
              icon="pi pi-plus-circle"
              disabled={payRows.length >= 4}
              className="btn-dark   border-none"
            ></Buttons>
          </div>
          <div className="">
            <Buttons
              onClick={() => {
                setData(() => {
                  return {
                    ...data,
                    payments: payRows,
                  };
                });
                return createEmployee();
              }}
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
