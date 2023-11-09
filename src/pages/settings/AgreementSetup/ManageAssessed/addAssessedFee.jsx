import { PickList } from "primereact/picklist";
import React from "react";
import CardWithTitle from "../../../../components/cards/cardWithTitle/cardWithTitle";
import itemsbackword from "../../../../assets/icons/itemsbackward.png";
import Buttons from "../../../../components/buttons/button";
import DropDown from "../../../../components/dropdown/dropdown";
import Input from "../../../../components/input/input";
import Checkbox from "../../../../components/checkbox/checkbox";
import { useSelector } from "react-redux";

const AddAssessedFee = ({
  onClickAddFees,
  assesedInfo,
  handleChangeAssessed,
  clubs,
  AssessedPickerHandleChange,
  membershipPlan,
  save
}) => {
  const typeOption = useSelector((state) => state.staticData.assessedTypes);
  const choiceType = useSelector((state) => state.staticData.choiceType);
  const profitCenter = useSelector((state) => state.staticData.profitCenter);
  const AssesedDetemined = useSelector(
    (state) => state.staticData.AssesedDetemined
  );
  let AssessedFee = [];
  for (let i = 0; i <= 30; i++) {
    AssessedFee.push(i);
  }
  const itemTemplate = (item) => {
    return (
      <div className="flex flex-wrap p-2 align-items-center gap-3">
        <div className="flex-1 flex flex-column gap-2">
          <span className="">{item.name}</span>
        </div>
      </div>
    );
  };
  return (
    <>
      <div>
        <div className=" flex align-items-center justify-content-between my-4">
          <span className="text-xl font-bold text-900">Add Assessed Fees</span>
        </div>
        <div className="my-3">
          <Checkbox
            title="Active"
            name="isActive"
            value={assesedInfo.isActive}
            onChange={handleChangeAssessed}
          ></Checkbox>
        </div>
        <div className="my-3">
          <CardWithTitle title="General">
            <div className="flex flex-column p-3">
              <div className="flex  ">
                <div className="col">
                  <Input
                    title="Name"
                    type="text"
                    name="name"
                    value={assesedInfo.name}
                    onChange={handleChangeAssessed}
                    state={assesedInfo}
                  ></Input>
                </div>
                <div className="col">
                  <DropDown
                    title="Type"
                    options={typeOption}
                    name="type"
                    value={assesedInfo.type}
                    onChange={handleChangeAssessed}
                    state={assesedInfo}
                  ></DropDown>
                </div>
                <div className="col">
                  <DropDown
                    title="Profit Center"
                    options={profitCenter}
                    name="profitCenter"
                    value={assesedInfo.profitCenter}
                    onChange={handleChangeAssessed}
                    state={assesedInfo}
                  ></DropDown>
                </div>
              </div>

              <div className="flex mt-2">
                <div className="col-4">
                  <Input
                    title="Amount"
                    name="amount"
                    value={assesedInfo.amount}
                    onChange={handleChangeAssessed}
                    state={assesedInfo}
                  ></Input>
                </div>
                {
                  assesedInfo.type === "Annual Fee" ||
                  assesedInfo.type === "Freeze Fee" ?
<div className="col-4">
                  <DropDown
                    title="Recurring"
                    options={choiceType}
                    name="recurring"
                    value={assesedInfo.recurring}
                    onChange={handleChangeAssessed}
                    state={assesedInfo}
                  ></DropDown>
                </div>
                :
                null
                }
                
              </div>
            </div>
          </CardWithTitle>
        </div>
        {assesedInfo.type === "Annual Fee" ||
        assesedInfo.type === "Late Fee" ||
        assesedInfo.type === "Decline Fee" ? (
          <div className="my-3">
            <CardWithTitle title="Preferred Due Date">
              <div className="p-3">
                <div className="flex align-items-center ">
                  {assesedInfo.type === "Annual Fee" ? (
                    <>
                      <div className="col-4">
                        <DropDown
                          title="Choose how the preferred due day will be determined:"
                          options={AssesedDetemined}
                          name="preferedDueDate"
                          value={assesedInfo.preferedDueDate}
                          onChange={handleChangeAssessed}
                          state={assesedInfo}
                        ></DropDown>
                      </div>
                      {assesedInfo.preferedDueDate === "Month And Day" ? (
                        <div className=" col-4 mt-3">
                          <Input
                            title=""
                            placeholder="Enter No.of Months"
                            name="noOfMonths"
                            value={assesedInfo.noOfMonths}
                            onChange={handleChangeAssessed}
                            state={assesedInfo}
                          ></Input>
                        </div>
                      ) : null}

                      <div className=" col-4 mt-3">
                        <Input
                          title=""
                          placeholder="Enter No.of Days"
                          name="noOfDays"
                          value={assesedInfo.noOfDays}
                          onChange={handleChangeAssessed}
                          state={assesedInfo}
                        ></Input>
                      </div>
                    </>
                  ) : (
                    <div className="col-4">
                      <DropDown
                        title="Fee is applied how many days after decline if still past due"
                        options={AssessedFee}
                        name="pastDue"
                        value={assesedInfo.pastDue}
                        onChange={handleChangeAssessed}
                        state={assesedInfo}
                      ></DropDown>
                    </div>
                  )}
                </div>
              </div>
            </CardWithTitle>
          </div>
        ) : null}

        <div className="mt-3">
          <CardWithTitle title="Clubs">
            <div className="p-3">
              <div className="card  ">
                <PickList
                  source={clubs}
                  name="clubsOption"
                  target={assesedInfo.clubsOption}
                  onChange={(e) =>
                    AssessedPickerHandleChange({
                      name: "clubsOption",
                      value: e.target,
                      source: e.source,
                    })
                  }
                  itemTemplate={itemTemplate}
                  breakpoint=""
                  sourceHeader="Available"
                  targetHeader="Selected"
                  sourceStyle={{ height: "30rem" }}
                  targetStyle={{ height: "30rem" }}
                />
              </div>
            </div>
          </CardWithTitle>
          <div
              className="text-danger"
              style={{ color: "red", marginTop: "0.8rem" }}
            >
              {assesedInfo?.formErrors?.clubs}
            </div>
        </div>
        {assesedInfo.type === "Annual Fee" ? (
          <div className="mt-3">
            <CardWithTitle title="Membership Plans">
              <div className="p-3">
                <div className="card  ">
                  <PickList
                    name="membershipOption"
                    source={membershipPlan}
                    target={assesedInfo.membershipOption}
                    onChange={(e) =>
                      AssessedPickerHandleChange({
                        name: "membershipOption",
                        value: e.target,
                        source: e.source,
                      })
                    }
                    itemTemplate={itemTemplate}
                    breakpoint=""
                    sourceHeader="Available"
                    targetHeader="Selected"
                    sourceStyle={{ height: "30rem" }}
                    targetStyle={{ height: "30rem" }}
                  />
                </div>
              </div>
            </CardWithTitle>
          </div>
        ) : null}

        <div className="flex justify-content-end mt-3 ">
          <div className="flex justify-content-end ">
            <div className="flex  p-2">
              <div className="mx-4">
                <Buttons label="Save" className="btn-dark mx-3 border-none " onClick={save}/>
              </div>
              <div className="">
                <Buttons
                  onClick={onClickAddFees}
                  label="Cancel"
                  className="btn-grey  border-none "
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddAssessedFee;
