import React, { useEffect } from "react";
import Buttons from "../../../../components/buttons/button";
import CardWithTitle from "../../../../components/cards/cardWithTitle/cardWithTitle";
import Input from "../../../../components/input/input";
import DropDown from "../../../../components/dropdown/dropdown";
import Navbar from "../../../../layout/Navbar";
import constants from "../../../../utils/constants";
import api from "../../../../services/api";
import { showToast } from "../../../../redux/actions/toastAction";
import { useDispatch } from "react-redux";

const AddDeparment = ({
  setAddDeparment,
  handleChange,
  payload,
  setPayload,
  setShowDepartmentTable,
  showcomponent,
  selectedEmployees,
  setSelectedEmployees,
}) => {
  const DropDownOptions = [
    { name: "Yes", value: true },
    { name: "No", value: false },
  ];

  const dispatch = useDispatch();
  const saveDepartment = async () => {
    const res = await api(
      "post",
      constants.endPoints.CreateDepartment,
      payload
    );
    console.log(res, "resss");
    if (res.success) {
      dispatch(showToast({ severity: "success", summary: res.message }));
      setAddDeparment((prev) => !prev);
      console.log(res);
    } else {
      dispatch(showToast({ severity: "error", summary: res.message }));
      console.log(res);
    }
  };

  return (
    <>
      <div className="p-3">
        <Navbar />
        <div>
          <p className="my-3 font-semibold text-xl ">Add Departments</p>
        </div>
        <div className="mt-2">
          <CardWithTitle title="General">
            <div className="p-2 flex">
              <div className="col">
                <Input
                  title="Name"
                  value={payload.name}
                  onChange={handleChange("name")}
                  placeholder=""
                ></Input>
              </div>
              <div className="col">
                <DropDown
                  title="Show in Calendar"
                  optionLabel="name"
                  options={DropDownOptions}
                  placeholder="No"
                  value={payload.showInCalendar}
                  onChange={handleChange("showInCalendar")}
                ></DropDown>
              </div>
              <div className="col">
                <DropDown
                  optionLabel="name"
                  options={DropDownOptions}
                  title="Visible Online"
                  placeholder="No"
                  value={payload.visibleOnline}
                  onChange={handleChange("visibleOnline")}
                ></DropDown>
              </div>
            </div>
            <div className="col-12 flex">
              <div className="col-4">
                <DropDown
                  optionLabel="name"
                  options={DropDownOptions}
                  title="Sales Person Online"
                  placeholder="No"
                  value={payload.salesPersonOnline}
                  onChange={handleChange("salesPersonOnline")}
                ></DropDown>
              </div>
              <div className="col-4">
                <Input
                  title="Department Code"
                  placeholder=""
                  value={payload.departmentCode}
                  onChange={handleChange("departmentCode")}
                ></Input>
              </div>
            </div>
          </CardWithTitle>
        </div>
        <div className="mt-3">
          <CardWithTitle title="Add Employee">
            <div className=" p-4 btn-lightest-blue">
              <div className="ml-4 mb-2">
                <span className="text-xs font-semibold  text-dark-gray">
                  Name
                </span>
              </div>

              <div className="bg-white col-12 border-round-md ">
                <div
                  className="flex justify-content-between align-items-center "
                  style={{ height: "190px" }}
                >
                  {/* <div className="">
                    <span className=""></span>
                  </div> */}
                  <div className="flex align-content-center w-5  justify-content-center">
                    <div className="text-xs font-semibold w-12 text-center">
                      <table style={{ width: "100%", textAlign: "left" }}>
                        {selectedEmployees.length
                          ? selectedEmployees?.map((emp, index) => {
                              return (
                                <tr>
                                  <td>{index + 1}</td>
                                  <td>{emp.firstName + " " + emp.lastName}</td>
                                </tr>
                              );
                            })
                          : "None Found"}
                      </table>
                    </div>
                  </div>
                  <div className=" flex flex-column  justify-content-between mx-3 ">
                    <div className=" ">
                      <Buttons
                        onClick={setShowDepartmentTable}
                        label="Add"
                        className="btn-dark border-none  "
                      ></Buttons>
                    </div>

                    <div className="mt-3">
                      <Buttons
                        label="Remove All"
                        className="btn-dark border-none "
                        onClick={() => {
                          setSelectedEmployees([]);
                          setPayload({ ...payload, employees: [] });
                        }}
                      ></Buttons>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardWithTitle>
        </div>
        <div className=" mt-3 px-3 pt-3 flex justify-content-end">
          <div className="  ">
            <Buttons
              label="Save"
              onClick={() => saveDepartment()}
              className="btn-dark mx-4  border-none"
            ></Buttons>
          </div>
          <div className=" ml-4">
            <Buttons
              onClick={showcomponent}
              label="Cancel"
              className="btn-grey  mx-3 border-none"
            ></Buttons>
          </div>
        </div>
      </div>
    </>
  );
};
export default AddDeparment;
