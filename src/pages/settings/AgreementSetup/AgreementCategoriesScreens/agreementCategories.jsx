import React, { useState } from "react";
import Buttons from "../../../../components/buttons/button";
import DropDown from "../../../../components/dropdown/dropdown";
import TableData from "../../../../components/cards/dataTable/dataTable";
import RecentCheckIn from "../../../../components/cards/Profilecard/recentCheckIn";
import checkInData from "../../../../utils/checkInData";
import Input from "../../../../components/input/input";
import AddAgreementCategories from "../AgreementCategoriesScreens/addAgreementCategories";

const AgreementCategories = () => {
  const [addAgreementCategories, setAgreementCategories] = useState(false);

  const onClickChangePage = () => {
    setAgreementCategories((prev) => !prev);
  };
  const actionTemplate = (col) => {
    // console.log(col._id, "collllll");
    return (
      <>
        <div className="flex justify-content-end">
          <span>
            <i className="pi pi-pencil mr-3 cursor-pointer"></i>
          </span>
          <span>
            <i className="pi pi-trash cursor-pointer"></i>
          </span>
        </div>
      </>
    );
  };

  const agreementCategoriesColumn = [
    {
      field: "agreementCategory",
      header: "Agreement Category",
      id: "",
      index: "",
    },
    {
      field: "agreements",
      header: "Agreements #",
      id: "",
      index: "",
    },

    {
      field: "",
      header: "",
      id: "",
      body: actionTemplate,
    },
  ];
  const [agreementCategoriesData, setAgreementCategoriesData] = useState([
    {
      agreementCategory: "agreements",
      agreements: "1",
    },
    {
      agreementCategory: "Adults",
      agreements: "12",
    },
    {
      agreementCategory: "Students",
      agreements: "3",
    },
    {
      agreementCategory: "Corporate",
      agreements: "2",
    },
    {
      agreementCategory: "Annual",
      agreements: "1",
    },
  ]);
  return (
    <>
      {addAgreementCategories ? (
        <AddAgreementCategories onClickChangePage={onClickChangePage} />
      ) : (
        <>
          <div>
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
                data={agreementCategoriesData}
              />
            </div>
          </div>
          <div className="flex justify-content-end p-2 ">
            <div className=" mt-3 flex  ">
              <div className="">
                <Buttons
                  label="Close"
                  className=" px-4 btn-grey  border-none"
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
