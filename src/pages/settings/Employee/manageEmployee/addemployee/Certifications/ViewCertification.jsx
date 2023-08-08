import React from "react";
import CardWithTitle from "../../../../../../components/cards/cardWithTitle/cardWithTitle";
import Input from "../../../../../../components/input/input";
import Buttons from "../../../../../../components/buttons/button";
import { useState } from "react";
import RecentCheckIn from "../../../../../../components/cards/Profilecard/recentCheckIn";
import checkInData from "../../../../../../utils/checkInData";
import { InputTextarea } from "primereact/inputtextarea";
import validation from "../../../../../../utils/Validation";


const viewCertifications = ({ setData, data, createEmployee }) => {
  const [dates, setDates] = useState(null);
  const { certificationValidations } = validation();
  const [errors, setErrors] = useState({});
      <>
        <div className="">
          <div>
            <CardWithTitle title="General">
              <div className="col flex justify-content-between">
                <div className="col">
                  <div>
                    <Input
                      title="Name"
                      placeholder="John"
                      onChange={(e) => {
                        setCertificationsValue({
                          ...certificationsValue,
                          name: e.target.value,
                        });
                        let validate = certificationValidations({
                          ...certificationsValue,
                          name: e.target.value,
                        });
                        setErrors(validate);
                      }}
                    ></Input>
                    {errors.name && (
                      <p className="text-red-600 text-xs mt-1">{errors.name}</p>
                    )}
                  </div>
                  <div className="mt-5">
                    <Input
                      title="Acquired Date"
                      type="date"
                      onChange={(e) => {
                        setCertificationsValue({
                          ...certificationsValue,
                          acquiredDate: e.target.value,
                        });
                        let validate = certificationValidations({
                          ...certificationsValue,
                          acquiredDate: e.target.value,
                        });
                        setErrors(validate);
                      }}
                    ></Input>
                    {errors.acquiredDate && (
                      <p className="text-red-600 text-xs mt-1">
                        {errors.acquiredDate}
                      </p>
                    )}
                  </div>
                </div>
                <div className="col">
                  <div>
                    <Input
                      title="Certification Number"
                      placeholder="2345678"
                      onChange={(e) => {
                        setCertificationsValue({
                          ...certificationsValue,
                          certificationNumber: e.target.value,
                        });
                        let validate = certificationValidations({
                          ...certificationsValue,
                          certificationNumber: e.target.value,
                        });
                        setErrors(validate);
                      }}
                    ></Input>
                    {errors.certificationNumber && (
                      <p className="text-red-600 text-xs mt-1">
                        {errors.certificationNumber}
                      </p>
                    )}
                  </div>
                  <div className="mt-5">
                    <Input
                      title="Expiration Date"
                      type="date"
                      placeholder="2345678"
                      onChange={(e) => {
                        setCertificationsValue({
                          ...certificationsValue,
                          expirationDate: e.target.value,
                        });
                        let validate = certificationValidations({
                          ...certificationsValue,
                          expirationDate: e.target.value,
                        });
                        setErrors(validate);
                      }}
                    ></Input>
                    {errors.expirationDate && (
                      <p className="text-red-600 text-xs mt-1">
                        {errors.expirationDate}
                      </p>
                    )}
                  </div>
                </div>
                <div className="col">
                  <Input
                    title="Issuer"
                    onChange={(e) => {
                      setCertificationsValue({
                        ...certificationsValue,
                        issuer: e.target.value,
                      });
                      let validate = certificationValidations({
                        ...certificationsValue,
                        issuer: e.target.value,
                      });
                      setErrors(validate);
                    }}
                  ></Input>
                  {errors.issuer && (
                    <p className="text-red-600 text-xs mt-1">{errors.issuer}</p>
                  )}
                </div>
              </div>

              <div className="col flex flex-column gap-2 p-3">
                <label className="text-xs text-dark-gray   font-semibold">
                  Descriptions
                </label>
                <InputTextarea
                  onChange={(e) => {
                    setCertificationsValue({
                      ...certificationsValue,
                      descriptions: e.target.value,
                    });
                    let validate = certificationValidations({
                      ...certificationsValue,
                      descriptions: e.target.value,
                    });
                    setErrors(validate);
                  }}
                ></InputTextarea>
                {errors.descriptions && (
                  <p className="text-red-600 text-xs mt-1">
                    {errors.descriptions}
                  </p>
                )}
              </div>
              <div className="p-3">
                <div className="bg-white border-gray-200 border-2 border-round-md w-3 mt-4">
                  <div className="flex px-5 border-bottom-1 border-gray-100 w-12  justify-content-between p-2">
                    <span className="text-sm font-semibold">Name</span>
                    <span className="text-sm font-semibold">File size</span>
                  </div>
                  <div
                    className="flex w-12  px-5 justify-content-between p-2 "
                    style={{ height: "60px" }}
                  >
                    <span className="text-sm text-gray-300">Name</span>
                    <span className="text-sm text-gray-300">File size</span>
                  </div>
                </div>
              </div>
            </CardWithTitle>
          </div>
        </div>
        <div className="flex justify-content-end p-2 ">
          <div className=" mt-3 flex  ">
            <div className="">
              <Buttons
                onClick={addCertification}
                label="Save"
                className="btn-dark mx-3 border-none"
              ></Buttons>
            </div>
            <div className="ml-4 ">
              <Buttons
                label="Cancel"
                className="btn-grey border-none"
              ></Buttons>
            </div>
          </div>
        </div>
      </>
    );
  };

     
      <div className="mt-5">
        <RecentCheckIn data={checkInData}></RecentCheckIn>
      </div>
    </>
  );
};

export default Certifications;
