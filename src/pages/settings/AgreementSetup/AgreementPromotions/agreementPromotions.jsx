import React, { useState } from "react";
import Buttons from "../../../../components/buttons/button";
import DropDown from "../../../../components/dropdown/dropdown";
import TableData from "../../../../components/cards/dataTable/dataTable";
import RecentCheckIn from "../../../../components/cards/Profilecard/recentCheckIn";
import checkInData from "../../../../utils/checkInData";
import AddAgreementPromotions from "./addAgreementPromotions";
import agreementPromotionContainer from "./agreementPromotionContainer";

const AgreementPromotions = () => {
 
const {
  addAgreementPromotions,
    onClickChangePage,
    agreementPromotionsColumn,
    agreementPromotionsData
} = agreementPromotionContainer()





  return (
    <>
      {addAgreementPromotions ? (
        <AddAgreementPromotions onClickChangePage={onClickChangePage} />
      ) : (
        <>
          <div>
            <div className=" flex align-items-center justify-content-between my-3">
              <span className="text-xl font-bold text-900">
                Manage Agreement Promotions
              </span>
              <div className=" px-2 ">
                <Buttons
                  onClick={onClickChangePage}
                  className=" btn-dark border-none"
                  label="Add Agreement Promotions"
                  icon="pi pi-plus-circle"
                ></Buttons>
              </div>
            </div>
            <div className=" flex statusbar-shadow justify-content-between bg-lightest-blue border-round-lg px-2">
              <div className="col-7 flex flex-column">
                <div className="flex">
                  <div className="md:col-6">
                    <DropDown title="Status"></DropDown>
                  </div>
                </div>
              </div>
              <div>
                <div className="p-3 mt-2">
                  <div className="mt-3">
                    <Buttons
                      style={{ width: "118px", height: "37px" }}
                      className="btn-dark border-none"
                      label="Search"
                    ></Buttons>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-2">
              <TableData
                columns={agreementPromotionsColumn}
                data={agreementPromotionsData}
              />
            </div>
          </div>
        </>
      )}
      <div className="mt-8">
        <RecentCheckIn data={checkInData} />
      </div>
    </>
  );
};

export default AgreementPromotions;
