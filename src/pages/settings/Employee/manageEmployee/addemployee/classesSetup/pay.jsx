import React, { useEffect, useState } from "react";
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
import { InputNumber } from "primereact/inputnumber";
const Pay = ({ data, setData, createEmployee }) => {
  const [payRows, setPayRows] = useState([{ name: "" }]);
  const [dropDownLevels, setDropDownLevels] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState({});
  const [payDefault, setPayDefault] = useState({});

  const dispatch = useDispatch();

  function onClickAdd() {
    if (payRows.length < 4) {
      setPayRows((prev) => {
        return [
          ...prev,
          {
            name: "",
          },
        ];
      });
    } else return;
  }

  // const createClassic = async () => {
  //   const res = await api("post", constants.endPoints.CreateEmployee, data);
  //   console.log(res, "resss");
  //   if (res.success) {
  //     dispatch(showToast({ severity: "success", summary: res.message }));
  //   } else {
  //     dispatch(showToast({ severity: "error", summary: res.message }));
  //   }
  // };

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
      setPayDefault(() => {
        return payRows.find((item) => item.name === e.target.value.name);
      });
      return setData({ ...data, [name]: e.target.value.name });
    } else {
      let selectedPayments = data.payments.map((payment) => {
        if (payment.name === payRow.name) {
          payment[name] = e.target.value;
        }
        return payment;
      });
      return setData(() => {
        return { ...data, payments: selectedPayments };
      });
    }
  };

  const onSelectPayMethod = (event, index) => {
    if (payRows.indexOf(event.value) === -1) {
      payRows[index] = event.value;
      setPayRows([...payRows]);
      return setData({
        ...data,
        payments: [
          ...data.payments,
          {
            name: event.target.value.name,
          },
        ],
      });
    }
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
        setPayRows([...payRows]);
      }
    }
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
                    optionLabel={"name"}
                    value={payDefault}
                    onChange={handleChange("defaultPay")}
                    options={payRows[0].fields && payRows}
                  ></DropDown>
                </div>
              </div>
            </div>
          </CardWithTitle>
        </div>
        <div className="col-12 bg-lightest-blue border-round-sm mt-3 shadow-4 ">
          {payRows.map((item, index) => {
            return (
              <>
                <div className="">
                  <div className="flex justify-content-start">
                    <div className="col-2 flex">
                      <span className="text-gray-300 text-xs m-2 mt-4">
                        {index + 1}
                      </span>
                      <div className="col-11">
                        <DropDown
                          options={paymentOptions}
                          optionLabel={"name"}
                          value={item}
                          onChange={(e) => onSelectPayMethod(e, index)}
                        ></DropDown>
                      </div>
                    </div>

                    {item.fields &&
                      item.fields.map((field) => {
                        return (
                          <div>
                            <div className="col ">
                              <div className="col flex">
                                {field.type === "number" ? (
                                  <>
                                    <Input
                                      placeholder="0.00"
                                      id=""
                                      type="number"
                                      // values={data.payments.map(
                                      //   (p) => p.name === item.name
                                      // )}
                                      onChange={handleChange(field.name, item)}
                                      icon="pi pi-dollar"
                                    ></Input>
                                    <div className="col px-0 flex">
                                      <div className="row">
                                        {field.name === "% Rate" ? (
                                          <div
                                            style={{
                                              width: "18px",
                                              height: "20px",
                                            }}
                                            className="flex align-items-center mt-2"
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
                                ) : (
                                  <>
                                    <div className="mt-2">
                                      <Checkbox id={item.name}></Checkbox>
                                    </div>
                                  </>
                                )}
                              </div>

                              <span className="flex justify-content-end text-xs mt-2 text-gray-300 r-0">
                                {field.name}
                              </span>
                            </div>
                          </div>
                        );
                      })}
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
