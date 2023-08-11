import React, { useEffect } from "react";
import DropDown from "../../../../../../components/dropdown/dropdown";
import RecentCheckIn from "../../../../../../components/cards/Profilecard/recentCheckIn";
import checkInData from "../../../../../../utils/checkInData";
import Buttons from "../../../../../../components/buttons/button";
import TableData from "../../../../../../components/cards/dataTable/dataTable";
import Input from "../../../../../../components/input/input";
import { useState } from "react";
import CardWithTitle from "../../../../../../components/cards/cardWithTitle/cardWithTitle";
import divide from "../../../../../../assets/icons/box.png";

const ItemCommission = ({ setData, data, createEmployee }) => {
  const [payType, setPayType] = useState("");
  const [isPayloadReady, setIsPayloadReady] = useState(false);
  const [commissionRows, setCommissionRows] = useState([
    { commissionGroup: "", isPayTypeDollar: true },
  ]);

  const commGroupOptions = ["Shakes", "Bars", "Supplements"];
  const commTypeOptions = ["Per Item", "Per sale"];

  const commissionFields = {
    fields: [
      {
        name: "Commission Type",
        type: "dropdown",
        key: "commissionType",
        placeholder: "Select Type",
      },
      {
        name: "Pay",
        type: "input",
        subType: "number",
        subType: "number",
        key: "pay",
      },
    ],
  };

  const onEnterData = (val, index, keyName) => {
    let salesPayload = [...data.salesItemCommission];
    salesPayload[index][keyName] = val;
    setData(() => {
      return {
        ...data,
        salesItemCommission: [...salesPayload],
      };
    });
  };

  const onSelectCommGroup = (e, index) => {
    if (
      !commissionRows.some((item) => item.commissionGroup === e.target.value)
    ) {
      const commissionRowsClone = [...commissionRows];
      commissionRowsClone[index] = {
        commissionGroup: e.target.value,
        ...commissionFields,
      };
      console.log(commissionRowsClone);
      setCommissionRows(commissionRowsClone);
      data.salesItemCommission[index] = {
        commissionGroup: e.target.value
      }
      setData({ ...data });
    }
  };

  const addCommissionRow = () => {
    if (commissionRows.length <= commGroupOptions.length) {
      setCommissionRows((prev) => {
        return [
          ...prev,
          {
            commissionGroup: "",
            isPayTypeDollar: true,
          },
        ];
      });
    }
  };

  useEffect(() => {
    if(data.salesItemCommission.length) {
      let selectedComm = data.salesItemCommission;
      selectedComm = selectedComm.map(item => {
       item = {
        ...item,
        ...commissionFields
       }
       return item;
      })
      setCommissionRows(selectedComm);
    }
  }, []);

  const removeCommissionRow = (item) => {
    const index = commissionRows.indexOf(item);
    if (index > 0) {
      commissionRows.splice(index, 1);
      setCommissionRows([...commissionRows]);
    } else {
      commissionRows[index] = { commissionGroup: "" };
      setCommissionRows([...commissionRows]);
    }
  };

  // const
  return (
    <>
      <div>
        <div>
          <div className="col-2 my-3">
            <DropDown title="similar To"></DropDown>
          </div>
        </div>
        <div>
          <div className="my-2">
            <CardWithTitle
              title="Commission Group"
              title2="Commission Type"
              title3="Pay"
              extraclassName="flex justify-content-around"
              title1className="w-3
              "
              title2className="w-3"
              title3className="w-3 "
            >
              {commissionRows.map((item, index) => {
                return (
                  <>
                    <div className="flex justify-content-between p-3">
                      <div className="ml-7  input-size">
                        <DropDown
                          placeholder="Select Group"
                          options={commGroupOptions}
                          value={item.commissionGroup}
                          onChange={(e) => onSelectCommGroup(e, index)}
                        ></DropDown>
                      </div>
                      <div className="flex  ">
                        {item.fields?.map((field, fieldIndex) => {
                          return (
                            <>
                              <div className=" ">
                                <div className="  ">
                                  {field.type === "input" ? (
                                    <Input
                                      title=""
                                      type={field.subType}
                                      placeholder={field.placeholder}
                                      onChange={(e) => {
                                        onEnterData(e.value || e.target.value, index, field.key);
                                      }}
                                      value={
                                        data.salesItemCommission[index][
                                          field.key
                                        ]
                                      }
                                    ></Input>
                                  ) : (
                                    <>
                                      <div className="extra-padding">
                                        <DropDown
                                          title=""
                                          options={commTypeOptions}
                                          onChange={(e) => {
                                            onEnterData(
                                              e.target.value,
                                              index,
                                              field.key
                                            );
                                          }}
                                          placeholder="Commission Type"
                                          value={
                                            data.salesItemCommission[index][
                                              field.key
                                            ]
                                          }
                                        ></DropDown>
                                      </div>
                                    </>
                                  )}
                                </div>
                              </div>
                            </>
                          );
                        })}
                        {item.fields && item.fields.length ? (
                          <div
                            className="flex align-items-center"
                            style={{
                              width: "18px",
                              // height: "20px",
                            }}
                          >
                            <span
                              className={
                                "mt-2 cursor-pointer ml-3 " +
                                (item.isPayTypeDollar
                                  ? "selected-price-type"
                                  : "")
                              }
                              onClick={() => {
                                item.isPayTypeDollar = true;
                                setCommissionRows([...commissionRows]);
                                data.salesItemCommission[index]["isPayTypeDollar"] = true;
                                setData({ ...data });
                              }}
                            >
                              $
                            </span>
                            <span
                              className={
                                "mt-2 cursor-pointer ml-3 " +
                                (!item.isPayTypeDollar
                                  ? "selected-price-type"
                                  : "")
                              }
                              onClick={() => {
                                item.isPayTypeDollar = false;
                                setCommissionRows([...commissionRows]);
                                data.salesItemCommission[index]["isPayTypeDollar"] = false;
                                setData({ ...data });
                              }}
                            >
                              %
                            </span>
                          </div>
                        ) : null}
                      </div>
                      {item.fields && item.fields.length ? (
                      <div
                        className="mt-3 cursor-pointer"
                        onClick={() => removeCommissionRow(item)}
                      >
                        <i className=" pi pi-minus-circle"></i>
                      </div>
                      ) : null}
                    </div>
                  </>
                );
              })}
            </CardWithTitle>
          </div>
        </div>
        <div className="flex justify-content-end p-2 ">
          <div className=" mt-3 flex">
            <div className="mx-2">
              <Buttons
                label="Add"
                icon="pi pi-plus-circle"
                className="btn-dark border-none"
                disabled={commissionRows.length >= commGroupOptions.length}
                onClick={addCommissionRow}
              ></Buttons>
            </div>
            <div className="mr-4">
              <Buttons
                label="Save"
                className="btn-dark mx-3 border-none"
                // disabled={}
                onClick={() => {
                    createEmployee();
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
      <div className="mt-3">
        <RecentCheckIn data={checkInData} />
      </div>
    </>
  );
};

export default ItemCommission;
