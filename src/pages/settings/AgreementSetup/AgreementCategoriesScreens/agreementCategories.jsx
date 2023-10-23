import React, { useState } from "react";
import Buttons from "../../../../components/buttons/button";
import DropDown from "../../../../components/dropdown/dropdown";
import TableData from "../../../../components/cards/dataTable/dataTable";
import RecentCheckIn from "../../../../components/cards/Profilecard/recentCheckIn";
import checkInData from "../../../../utils/checkInData";
import Input from "../../../../components/input/input";
import AddAgreementCategories from "../AgreementCategoriesScreens/addAgreementCategories";
import AgreementCategoriesContainer from "./agreementCategoriesContainer";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

const AgreementCategories = () => {
  const{
    agreementCategoriesColumn,
    allAgreementCategoryData,
    addAgreementCategories,
    onClickChangePage,
    agreementCategoryForm,
    handleChangeAgreement,
    addSubCategory,
    handleChangeSubCategory,
    handleChangeSubCategoryDelete,
    save
  } = AgreementCategoriesContainer()






  return (
    <>
      {addAgreementCategories ? (
        <AddAgreementCategories onClickChangePage={onClickChangePage} handleChangeAgreement={handleChangeAgreement} agreementCategoryForm={agreementCategoryForm} addSubCategory={addSubCategory} handleChangeSubCategory={handleChangeSubCategory} handleChangeSubCategoryDelete={handleChangeSubCategoryDelete} save={save}/>
      ) : (
        <>
          <div>
          <ConfirmDialog />
            <div className=" flex align-items-center justify-content-between my-3">
              <span className="text-xl font-bold text-900">
                Manage Agreement Categories
              </span>
            </div>
            <div className=" flex statusbar-shadow justify-content-between bg-lightest-blue border-round-lg px-2">
              <div className="col-7 flex flex-column">
                <div className="flex">
                  <div className="md:col">
                    <DropDown title="Status"></DropDown>
                  </div>
                  <div className="col">
                    <DropDown title="Plan Type"></DropDown>
                  </div>
                </div>
              </div>
              <div>
                <div className="p-3 mt-3">
                  <div className=" mr-2 ">
                    <Buttons
                      onClick={onClickChangePage}
                      className="btn-dark border-none mx-3 "
                      label="Add"
                    ></Buttons>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-2">
              <TableData
                columns={agreementCategoriesColumn}
                data={allAgreementCategoryData}
              />
            </div>
          </div>
          <div className="flex justify-content-end p-2 ">
            <div className=" mt-3 flex  ">
              <div className="">
                <Buttons
                  label="Close"
                  className=" px-4 btn-lightest-gray  border-none"
                ></Buttons>
              </div>
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

export default AgreementCategories;
