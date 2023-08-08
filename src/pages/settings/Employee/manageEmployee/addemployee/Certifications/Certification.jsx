import React from "react";
import CardWithTitle from "../../../../../../components/cards/cardWithTitle/cardWithTitle";
import Input from "../../../../../../components/input/input";
import DropDown from "../../../../../../components/dropdown/dropdown";
import Buttons from "../../../../../../components/buttons/button";
import { Calendar } from "primereact/calendar";
import { useState } from "react";
import { DataTable } from "primereact/datatable";
import dummyData from "../../../../../../utils/dummyData";
import { Column } from "primereact/column";
import RecentCheckIn from "../../../../../../components/cards/Profilecard/recentCheckIn";
import checkInData from "../../../../../../utils/checkInData";
import ImageUpload from "../../../../../../assets/icons/imgupload.png";
import { InputTextarea } from "primereact/inputtextarea";
import api from "../../../../../../services/api";
import constants from "../../../../../../utils/constants";
import { showToast } from "../../../../../../redux/actions/toastAction";
import { useDispatch } from "react-redux";
import validation from "../../../../../../utils/Validation";

const Certifications = ({ setData, data, createEmployee }) => {
  const [dates, setDates] = useState(null);
  const { certificationValidations } = validation();
  const [errors, setErrors] = useState({});

  const [showCertification, setShowAddCertification] = useState(false);
  const [certificationsValue, setCertificationsValue] = useState({
    name: "",
    certificationNumber: "",
    issuer: "",
    acquiredDate: null,
    expirationDate: null,
    descriptions: "",
    image: "",
  });

  const dispatch = useDispatch();

  const showAddCertification = () => {
    setShowAddCertification((prev) => !prev);
  };

  const addCertification = () => {
    let validate = certificationValidations(certificationsValue);

    if (Object.keys(validate).length) {
      return setErrors(validate);
    }
    setData(() => {
      return {
        ...data,
        certifications: [
          ...data.certifications,
          {
            ...certificationsValue,
          },
        ],
      };
    });
    setCertificationsValue({
      name: "",
      certificationNumber: "",
      issuer: "",
      acquiredDate: null,
      expirationDate: null,
      descriptions: "",
      image: "",
    });
    showAddCertification(false);
    return setErrors({});
  };

  const dragNdrop = async (event) => {
    try {
      event.preventDefault();
      const formData = new FormData();
      formData.append("file", event.target.files[0]);

      var preview = document.getElementById("preview");
      preview.innerHTML = event.target.files[0].name;

      const res = await api("post", constants.endPoints.uploadFile, formData, {
        "Content-Type": "multipart/form-data",
      });
      if (res.success) {
        dispatch(showToast({ severity: "success", summary: res.message }));
        setCertificationsValue({
          ...certificationsValue,
          image: res.data.image,
        });
      } else {
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const drag = () => {
    document.getElementById("uploadFile").parentNode.className =
      "draging dragBox";
  };
  const drop = () => {
    document.getElementById("uploadFile").parentNode.className = "dragBox";
  };
  const actionTemplate = (col) => {
    // console.log(col._id, "collllll");
    return (
      <>
        <div className="flex">
          <span onClick={showAddCertification}>
            <i className="pi pi-eye mr-3 cursor-pointer"></i>
          </span>
          <span>
            <i className="pi pi-pencil mr-3 cursor-pointer"></i>
          </span>
          {/* <span onClick={() => }> */}
          <span>
            <i className="pi pi-trash cursor-pointer"></i>
          </span>
        </div>
      </>
    );
  };

  const Certification = () => {
    return (
      <>
        <div>
          {/* <div>
            <CardWithTitle title="General">
              <div className="p-4">
                <div className="flex">
                  <div className="col">
                    <DropDown title="Status" placeholder="Active"></DropDown>
                  </div>
                  <div className="col">
                    <DropDown title="Search By" placeholder="Active"></DropDown>
                  </div>
                  <div className="col">
                    <Input title="Search Text" placeholder="Active"></Input>
                  </div>
                </div>
                <div className=" flex">
                  <div className="mt-4 flex ml-2 ">
                    <div
                      className="col border-round bg-white  "
                      style={{ height: "38px" }}
                    >
                      Date
                    </div>
                    <div className="">
                      <Calendar
                        value={dates}
                        onChange={(e) => setDates(e.value)}
                        selectionMode="range"
                        readOnlyInput
                        icon="pi pi-calendar"
                        showIcon
                      />
                    </div>
                  </div>
                  <div className="col-10 mt-2 flex">
                    <div className="col">
                      <Buttons
                        label="Today"
                        className="bg-white text-sm text-900 border-none"
                      ></Buttons>
                    </div>
                    <div className="col">
                      <Buttons
                        label="Yesterday"
                        className="bg-white text-sm text-900 border-none"
                      ></Buttons>
                    </div>
                    <div className="col">
                      <Buttons
                        label="This Week"
                        className="bg-white text-sm text-900 border-none"
                      ></Buttons>
                    </div>
                    <div className="col">
                      <Buttons
                        label="Last Week"
                        className="bg-white text-sm text-900 border-none"
                      ></Buttons>
                    </div>
                    <div className="col">
                      <Buttons
                        label="This Month"
                        className="bg-white text-sm text-900 border-none"
                      ></Buttons>
                    </div>
                    <div className="col">
                      <Buttons
                        label="Last Month"
                        className="bg-white text-sm text-900 border-none"
                      ></Buttons>
                    </div>
                  </div>
                </div>
                <div className="flex justify-content-end">
                  <div className="mr-3">
                    <Buttons
                      label="Search"
                      className="btn-dark text-sm  border-none"
                    ></Buttons>
                  </div>
                </div>
              </div>
            </CardWithTitle>
          </div> */}

          <div className="mt-3">
            <DataTable
              value={data.certifications}
              dataKey="id"
              tableStyle={{ minWidth: "50rem" }}
            >
              <Column field="name" header="Name"></Column>
              <Column
                field="certificationNumber"
                header="Certifiacte Number"
              ></Column>
              <Column field="descriptions" header="Description"></Column>
              <Column field="issuer" header="Issuer"></Column>
              <Column field="acquiredDate" header="Acquired Date"></Column>
              <Column field="expirationDate" header="Expiration Date"></Column>
              <Column header="" body={actionTemplate}></Column>
            </DataTable>
          </div>
        </div>
        <div className="flex justify-content-end p-2 ">
          <div className=" mt-3 flex  ">
            <div className=" mx-2">
              <Buttons
                onClick={showAddCertification}
                label="Add "
                icon="pi pi-plus-circle"
                className="btn-dark border-none"
              ></Buttons>
            </div>
            <div className="">
              <Buttons
                label="Save"
                onClick={createEmployee}
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

  const AddCertification = () => {
    return (
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
                <div className=" ">
                  <span className="text-xl font-semibold">
                    Upload Certificate
                  </span>
                  <div
                    style={{ height: "235px" }}
                    className="col-12 bg-white border-dashed  my-2 border-gray-100 border-round-sm flex flex justify-content-between "
                  >
                    <div
                      id="preview"
                      style={{ width: "115px", height: "116px" }}
                    ></div>
                    <div className=" col-8  flex flex-cloumn justify-content-start align-items-center">
                      <div class="uploadOuter ml-6 flex flex-column justify-centent-center align-items-center text-center ">
                        <label for="uploadFile" class="btn btn-primary"></label>
                        <div
                          className="flex justify-centent-center align-items-center "
                          style={{ width: "60px", height: "60px" }}
                        ></div>
                        <div
                          className="cursor-pointer dragBox -mt-8"
                          style={{ "line-height": "50px" }}
                        >
                          <div className="mx-auto" style={{ width: "5rem" }}>
                            <img src={ImageUpload} alt="" />
                          </div>
                          Drag your file here or Browse
                          <input
                            type="file"
                            onChange={dragNdrop}
                            ondragover={drag}
                            ondrop={drop}
                            id="uploadFile"
                            accept="application/pdf, application/vnd.ms-excel"
                          />
                          {/* </p> */}
                        </div>
                      </div>

                      <div className="my-3"></div>
                    </div>
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

  return (
    <>
      {showCertification ? AddCertification() : Certification()}
      <div className="mt-5">
        <RecentCheckIn data={checkInData}></RecentCheckIn>
      </div>
    </>
  );
};

export default Certifications;
