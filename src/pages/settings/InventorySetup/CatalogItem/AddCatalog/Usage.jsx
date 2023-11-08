import React from "react";
import CardWithTitle from "../../../../../components/cards/cardWithTitle/cardWithTitle";
import DropDown from "../../../../../components/dropdown/dropdown";
import Buttons from "../../../../../components/buttons/button";

const Usage = ({ openaddcatalogtab }) => {
  return (
    <div>
      <div className="col-4">
        <DropDown
          title="Allow check-in Deduction"
          name=""
          placeholder="No"
          options={["Yes", "No"]}
        ></DropDown>
      </div>
      <div>
        <CardWithTitle title="General">
          <div className="p-3">
            <div className="info-box  flex p-3 mb-2">
              <i
                className="pi pi-info-circle"
                style={{ color: " #329bea", width: "15px", height: "15px" }}
              ></i>
              <p className="info-color mx-3 ">
                These services can be used in place of 1 Comp session.
              </p>
            </div>
          </div>
          <div className=" p-4 btn-lightest-blue">
            <div className="ml-4 mb-2">
              <span className="text-xs font-semibold  text-dark-gray">
                Name
              </span>
            </div>
            <div className="bg-white col-12 border-round-md ">
              <div
                className="flex justify-content-between  "
                style={{ height: "190px" }}
              >
                <div className="flex justify-content-center   w-7  ">
                  <div className="text-xs flex flex-column justify-content-start font-semibold  w-12">
                    <table style={{ width: "100%", textAlign: "top" }}>
                      <>
                        <div className="mt-6">
                          <div
                            style={{ height: "auto" }}
                            className="flex  align-items-center  mt-8  justify-content-center"
                          >
                            None Found
                          </div>
                        </div>
                      </>
                    </table>
                  </div>
                </div>
                <div className=" flex flex-column  justify-content-center mx-6 ">
                  <div className=" ">
                    <Buttons
                      label="Add"
                      className="btn-dark border-none mx-3  "
                    ></Buttons>
                  </div>
                  <div className=" ">
                    <Buttons
                      label="Remove"
                      className="btn-dark border-none mx-3  "
                    ></Buttons>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardWithTitle>
      </div>
      <div className="my-3">
        <CardWithTitle title="Pays For">
          <div className="p-3">
            <div className="info-box  flex p-3 mb-2">
              <i
                className="pi pi-info-circle"
                style={{ color: " #329bea", width: "15px", height: "15px" }}
              ></i>
              <p className="info-color mx-3 ">
                1 Comp Session can be used in place of these services.
              </p>
            </div>
          </div>
          <div className=" p-4 btn-lightest-blue">
            <div className="ml-4 mb-2">
              <span className="text-xs font-semibold  text-dark-gray">
                Name
              </span>
            </div>
            <div className="bg-white col-12 border-round-md ">
              <div
                className="flex justify-content-between  "
                style={{ height: "190px" }}
              >
                <div className="flex justify-content-center   w-7  ">
                  <div className="text-xs flex flex-column justify-content-start font-semibold  w-12">
                    <table style={{ width: "100%", textAlign: "top" }}>
                      <>
                        <div className="mt-6">
                          <div
                            style={{ height: "auto" }}
                            className="flex  align-items-center  mt-8  justify-content-center"
                          >
                            None Found
                          </div>
                        </div>
                      </>
                    </table>
                  </div>
                </div>
                <div className=" flex flex-column  justify-content-center mx-6 ">
                  <div className=" ">
                    <Buttons
                      label="Add"
                      className="btn-dark border-none mx-3  "
                    ></Buttons>
                  </div>
                  <div className=" ">
                    <Buttons
                      label="Remove"
                      className="btn-dark border-none mx-3  "
                    ></Buttons>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardWithTitle>
      </div>
      <div>
        <CardWithTitle title="Bundle/Recipe">
          <div className="p-3">
            <div className="info-box  flex p-3 mb-2">
              <i
                className="pi pi-info-circle"
                style={{ color: " #329bea", width: "15px", height: "15px" }}
              ></i>
              <p className="info-color mx-3 ">
                Select catalog items that are combined to make this item
              </p>
            </div>
          </div>
          <div className=" p-4 btn-lightest-blue">
            <div className="ml-4 mb-2 flex justify-content-between w-6">
              <span className="text-xs font-semibold  text-dark-gray">
                Name
              </span>
              <span className="text-xs font-semibold  text-dark-gray">
                Quantity
              </span>
            </div>
            <div className="bg-white col-12 border-round-md ">
              <div
                className="flex justify-content-between  "
                style={{ height: "190px" }}
              >
                <div className="flex justify-content-center   w-7  ">
                  <div className="text-xs flex flex-column justify-content-start font-semibold  w-12">
                    <table style={{ width: "100%", textAlign: "top" }}>
                      <>
                        <div className="mt-6">
                          <div
                            style={{ height: "auto" }}
                            className="flex  align-items-center  mt-8  justify-content-center"
                          >
                            None Found
                          </div>
                        </div>
                      </>
                    </table>
                  </div>
                </div>
                <div className=" flex flex-column  justify-content-center mx-6 ">
                  <div className=" ">
                    <Buttons
                      label="Add"
                      className="btn-dark border-none mx-3  "
                    ></Buttons>
                  </div>
                  <div className=" ">
                    <Buttons
                      label="Remove"
                      className="btn-dark border-none mx-3  "
                    ></Buttons>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardWithTitle>
      </div>
      <div className=" m-2 mt-3 flex justify-content-end">
        <div className="mx-4">
          <Buttons
            label="Save"
            className="btn-dark  mx-3  border-none"
          ></Buttons>
        </div>
        <div className="">
          <Buttons
            onClick={() => openaddcatalogtab()}
            label="Cancel"
            className="btn-grey   border-none"
          ></Buttons>
        </div>
      </div>
    </div>
  );
};

export default Usage;
