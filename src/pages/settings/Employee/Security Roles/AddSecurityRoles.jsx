import React from "react";
import CardWithTitle from "../../../../components/cards/cardWithTitle/cardWithTitle";
import Input from "../../../../components/input/input";
import Buttons from "../../../../components/buttons/button";
import Navbar from "../../../../layout/Navbar";
import { InputTextarea } from "primereact/inputtextarea";
import { useState } from "react";

const AddSecurityRoles = () => {
  const [value, setValue] = useState("");
  return (
    <>
      <div className="p-3">
        <Navbar />
        <div className="mx-3">
          <div className="my-3 ">
            <span className="font-bold  text-xl text-900 ">
              Add Security Roles
            </span>
          </div>
          <div className="mt-2">
            <CardWithTitle title="General">
              <div className="p-2 flex">
                <div className="col-3">
                  <Input title="Name"></Input>
                </div>
                <div className="col-8 ">
                  <Input title="Description" title1="(40-50)"></Input>
                  {/* <div className="card flex justify-content-center">
                  <InputTextarea
                    autoResize
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                  />
                </div> */}
                </div>
              </div>
            </CardWithTitle>
          </div>
          <div>
            <div className="my-3">
              <CardWithTitle title="Add Employee">
                <div className=" p-4 btn-lightest-blue">
                  <div className="ml-4 mb-2">
                    <span className="text-sm text-dark-gray font-semibold ">
                      Name
                    </span>
                  </div>

                  <div className="bg-white col-12 border-round-md ">
                    <div
                      className="flex justify-content-between align-items-center "
                      style={{ height: "190px" }}
                    >
                      <div className="">
                        <span className=""></span>
                      </div>
                      <div className="flex align-content-center justify-content-center">
                        <div className="text-xs font-semibold">None Found</div>
                      </div>
                      <div className=" mx-3">
                        <div className="">
                          <Buttons
                            label="Add"
                            className="btn-dark border-none "
                          ></Buttons>
                        </div>

                        <div className="mt-3">
                          <Buttons
                            label="Remove All"
                            className="btn-dark border-none"
                          ></Buttons>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardWithTitle>
            </div>
            <div>
              <CardWithTitle title="Permissions">
                <div className=" p-4 btn-lightest-blue">
                  <div className="ml-4 mb-2">
                    <span className="text-sm text-dark-gray font-semibold">
                      Function
                    </span>
                  </div>

                  <div className="bg-white col-12 border-round-md ">
                    <div
                      className="flex justify-content-between align-items-center "
                      style={{ height: "190px" }}
                    >
                      <div className="">
                        <span className=""></span>
                      </div>
                      <div className="flex align-content-center justify-content-center">
                        <div className="text-xs font-semibold">None Found</div>
                      </div>
                      <div className=" mx-3">
                        <div className="">
                          <Buttons
                            label="Add"
                            className="btn-dark border-none "
                          ></Buttons>
                        </div>

                        <div className="mt-3">
                          <Buttons
                            label="Remove All"
                            className="btn-dark border-none"
                          ></Buttons>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardWithTitle>
            </div>
          </div>
        </div>
        <div className="flex justify-content-end mr-3">
          <div className="flex  p-2">
            <div className="mx-4">
              <Buttons label="Save" className="btn-dark mx-3 border-none " />
            </div>
            <div className="">
              <Buttons label="Cancel" className="btn-grey  border-none " />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddSecurityRoles;
