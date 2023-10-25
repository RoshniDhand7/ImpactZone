import React from "react";
import Checkbox from "../../../../components/checkbox/checkbox";
import CardWithTitle from "../../../../components/cards/cardWithTitle/cardWithTitle";
import Input from "../../../../components/input/input";
import DropDown from "../../../../components/dropdown/dropdown";
import percentagebox from "../../../../assets/icons/box.png";
import Buttons from "../../../../components/buttons/button";

const AddAgreementPromotions = ({
  onClickChangePage,
  handleChangeAgreement,
  agreementPromotionsForm,
  promotionsTypes,
  membershipPlans,
  save,
}) => {
  return (
    <>
      <div>
        <div className="my-4">
          <Checkbox
            title="Active"
            name="isActive"
            value={agreementPromotionsForm.isActive}
            onChange={handleChangeAgreement}
            state={agreementPromotionsForm}
          ></Checkbox>
        </div>
        <div>
          <CardWithTitle title="Add Agreement Category ">
            <div className="p-3">
              <div className="flex">
                <div className="col-4">
                  <Input
                    title="Code"
                    name="code"
                    value={agreementPromotionsForm.code}
                    onChange={handleChangeAgreement}
                    state={agreementPromotionsForm}
                  ></Input>
                </div>
                <div className="col-4">
                  <Input
                    title="Name"
                    name="name"
                    value={agreementPromotionsForm.name}
                    onChange={handleChangeAgreement}
                    state={agreementPromotionsForm}
                  ></Input>
                </div>
                <div className="col-4">
                  <DropDown
                    title="Membership Plan"
                    name="membershipPlan"
                    options={membershipPlans}
                    optionLabel="name"
                    value={agreementPromotionsForm.membershipPlan}
                    onChange={handleChangeAgreement}
                    state={agreementPromotionsForm}
                  ></DropDown>
                </div>
              </div>
              <div className="flex mt-3">
                <div className="col-4">
                  <Input
                    title="Start Date"
                    type="date"
                    name="startDate"
                    value={agreementPromotionsForm.startDate}
                    onChange={handleChangeAgreement}
                    state={agreementPromotionsForm}
                  ></Input>
                </div>
                <div className="col-4">
                  <Input
                    title="End Date"
                    type="date"
                    name="endDate"
                    value={agreementPromotionsForm.endDate}
                    minDate={agreementPromotionsForm.startDate}
                    onChange={handleChangeAgreement}
                    state={agreementPromotionsForm}
                  ></Input>
                </div>
                <div className="col-4">
                  <Input
                    title="Uses"
                    name="uses"
                    type="number"
                    value={agreementPromotionsForm.uses}
                    onChange={handleChangeAgreement}
                    state={agreementPromotionsForm}
                  ></Input>
                </div>
              </div>
              <div className="flex mt-3">
                <div className="col-4">
                  <DropDown
                    title="Promotions Type"
                    placeholder="Select Promotions Type"
                    name="promotionsType"
                    options={promotionsTypes}
                    optionLabel=""
                    value={agreementPromotionsForm.promotionsType}
                    onChange={handleChangeAgreement}
                    state={agreementPromotionsForm}
                  ></DropDown>
                </div>
                {agreementPromotionsForm.promotionsType ? (
                  <div className="col-4">
                    <Input
                      title={
                        agreementPromotionsForm.promotionsType === "Free Months"
                          ? "Number of months"
                          : "Amount"
                      }
                      name="amount"
                      type="number"
                      value={agreementPromotionsForm.amount}
                      onChange={handleChangeAgreement}
                      state={agreementPromotionsForm}
                    ></Input>
                  </div>
                ) : null}
              </div>
            </div>
          </CardWithTitle>
        </div>
        <div className="flex justify-content-end mt-3">
          <div className="flex  p-2">
            <div className="mx-4">
              <Buttons
                label="Save"
                className="btn-dark mx-3 border-none"
                onClick={save}
              />
            </div>
            <div className="">
              <Buttons
                onClick={onClickChangePage}
                label="Cancel"
                className="btn-grey border-none "
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddAgreementPromotions;
