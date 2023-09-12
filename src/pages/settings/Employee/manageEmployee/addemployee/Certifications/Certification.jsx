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
import formatFileSize from "../../../../../../utils/helpers/formatFileSize";

const Certifications = ({ setData, data, createEmployee }) => {
  const [dates, setDates] = useState(null);
  const { certificationValidations } = validation();
  const [errors, setErrors] = useState({});

  const [showCertification, setShowAddCertification] = useState(false);
  const [viewCertification, setViewCertification] = useState(false);
  const [editCertification, setEditCertification] = useState(false);
  const [editCertificationIndex, setEditCertificationIndex] = useState(0);

  const [certificationsValue, setCertificationsValue] = useState({
    name: "",
    certificationNumber: "",
    issuer: "",
    acquiredDate: null,
    expirationDate: null,
    descriptions: "",
    image: "",
    imageName: ""
  });

  const dispatch = useDispatch();

  const showAddCertification = () => {
    setCertificationsValue({
      name: "",
      certificationNumber: "",
      issuer: "",
      acquiredDate: null,
      expirationDate: null,
      descriptions: "",
      image: "",
      imageName: ""
    });
    setViewCertification(false);
    setEditCertification(false);
    setShowAddCertification((prev) => !prev);
  };

  const addCertification = () => {
    let validate = certificationValidations(certificationsValue);

    if (Object.keys(validate).length) {
      return setErrors(validate);
    }

    if (editCertification) {
      setData(() => {
        return {
          ...data,
          ...(data.certifications[editCertificationIndex] =
            certificationsValue),
        };
      });
    } else {
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
    }
    setCertificationsValue({
      name: "",
      certificationNumber: "",
      issuer: "",
      acquiredDate: null,
      expirationDate: null,
      descriptions: "",
      image: "",
      imageName: ""
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

      certificationsValue.image = event.target.files[0];
      certificationsValue.imageName = event.target.files[0].name;

      setCertificationsValue({ ...certificationsValue });
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

  const onClickCancel = () => {
    setShowAddCertification(false);
    setViewCertification(false);
    setEditCertification(false);
  };

  const onEditCertificate = async (col, row) => {
    if(col.image) col.image = await (await fetch(col.image)).blob();
    setCertificationsValue({ ...col });
    console.log(certificationsValue)
    setEditCertification(true);
    setShowAddCertification(true);
    setViewCertification(false);
    setEditCertificationIndex(row.rowIndex);
    var preview = document.getElementById("preview");
    console.log(preview)
    if (preview) preview.innerHTML = certificationsValue.imageName;
    return col;
  };

  const onViewCertificate = (col) => {
    setCertificationsValue({ ...col });
    setViewCertification(true);
    setEditCertification(false);
    setShowAddCertification(true);
  };

  const onDeleteCertificate = (row) => {
    data.certifications.splice(row.rowIndex, 1);
    setDates({ ...data });
  };

  const onClickSave = async () => {
    console.log(data.certifications)
    return await new Promise(async (resolve, reject) => {
      if (data.certifications.length) {
        for(let i = 0; i < data.certifications.length; i++) {
            data.certifications[i].imageName = data.certifications[i].image.name;

          const formData = new FormData();
          formData.append("file", data.certifications[i].image);

          const res = await api(
            "post",
            constants.endPoints.uploadFile,
            formData,
            {
              "Content-Type": "multipart/form-data",
            }
          );
          if (res.success) {
            data.certifications[i].image = res.data.image;

            setData({ ...data });
            console.log(data)
          } else {
            console.log(res);
            return;
          }
        };
        createEmployee();
        return resolve();
      } else {
        return reject();
      }
    })
  };

  const actionTemplate = (col, row) => {
    return (
      <>
        <div className="flex">
          <span onClick={() => onViewCertificate(col)}>
            <i className="pi pi-eye mr-3 cursor-pointer"></i>
          </span>
          <span onClick={() => onEditCertificate(col, row)}>
            <i className="pi pi-pencil mr-3 cursor-pointer"></i>
          </span>

          <span onClick={() => onDeleteCertificate(row)}>
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
          <div className="mt-3">
            <DataTable
              value={data.certifications.map(item => {
                if(item.acquiredDate) {
                  item.acquiredDate = item.acquiredDate.split("T")[0];
                }
                if(item.expirationDate) {
                  item.expirationDate = item.expirationDate.split("T")[0];
                }
                return item;
              })}
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
                label="Add"
                icon="pi pi-plus-circle"
                className="btn-dark border-none"
              ></Buttons>
            </div>
            <div className="">
              <Buttons
                label="Save"
                onClick={onClickSave}
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
                      value={certificationsValue.name}
                      disabled={viewCertification}
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
                      value={certificationsValue.acquiredDate}
                      onKeyDown={(e) => {
                        e.preventDefault();
                      }}
                      disabled={viewCertification}
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
                      value={certificationsValue.certificationNumber}
                      disabled={viewCertification}
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
                      placeholder=""
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
                      value={certificationsValue.expirationDate}
                      onKeyDown={(e) => {
                        e.preventDefault();
                      }}
                      disabled={viewCertification}
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
                    value={certificationsValue.issuer}
                    disabled={viewCertification}
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
                  value={certificationsValue.descriptions}
                  disabled={viewCertification}
                ></InputTextarea>
                {errors.descriptions && (
                  <p className="text-red-600 text-xs mt-1">
                    {errors.descriptions}
                  </p>
                )}
              </div>
              {(viewCertification && certificationsValue.image) ||
              (editCertification && certificationsValue.image) ||
              (showCertification && certificationsValue.image) ? (
                <div className="p-3">
                  <div className="bg-white border-gray-200 border-2 border-round-md w-3 mt-4">
                    <div className="flex  border-bottom-1 border-gray-100 w-12  justify-content-between p-2">
                      <span className="text-sm font-semibold">Name</span>
                      <span className="text-sm font-semibold mr-3">
                        File size
                      </span>
                    </div>
                    <div
                      className="flex w-12  p-2 justify-content-between "
                      style={{ height: "60px" }}
                    >
                      <span className="text-sm text-gray-300">
                        {certificationsValue.image.name}
                      </span>
                      <div>
                        {" "}
                        <span className="text-sm text-gray-300 mr-1 ">
                          {certificationsValue.image
                            ? formatFileSize(certificationsValue.image.size, 2)
                            : ""}
                        </span>
                        {(editCertification && !viewCertification) ||
                        (showCertification && !viewCertification) ? (
                          <span
                            className="text-sm text-red-500 font-semibold text-gray-300 ml-2 cursor-pointer"
                            onClick={() => {
                              certificationsValue.image = null;
                              setCertificationsValue({
                                ...certificationsValue,
                              });
                            }}
                          >
                            x
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}

              {(!viewCertification && !certificationsValue.image) ||
              (editCertification && !certificationsValue.image) ? (
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
                      <div className="col-8 flex flex-cloumn justify-content-start align-items-center">
                        <div class="uploadOuter ml-6 flex flex-column justify-centent-center align-items-center text-center ">
                          <label
                            for="uploadFile"
                            class="btn btn-primary"
                          ></label>
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
              ) : null}
            </CardWithTitle>
          </div>
        </div>
        <div className="flex justify-content-end p-2 ">
          {viewCertification ? (
            <div className=" mt-3 flex">
              <div className="">
                <Buttons
                  onClick={() => setShowAddCertification(false)}
                  label="Back"
                  className="btn-dark mx-1 border-none"
                ></Buttons>
              </div>
            </div>
          ) : (
            <div className=" mt-3 flex">
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
                  onClick={onClickCancel}
                ></Buttons>
              </div>
            </div>
          )}
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
