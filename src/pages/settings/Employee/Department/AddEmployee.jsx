import React from "react";
import Buttons from "../../../../components/buttons/button";
import TableData from "../../../../components/cards/dataTable/dataTable";
import Input from "../../../../components/input/input";
import BlackArrow from "../../../../assets/icons/blackarrow.png";
import DropDown from "../../../../components/dropdown/dropdown";
import { OverlayPanel } from "primereact/overlaypanel";
import Navbar from "../../../../layout/Navbar";
import { useRef } from "react";
import constants from "../../../../utils/constants";
import api from "../../../../services/api";
import { useState } from "react";
import { useEffect } from "react";

const AddEmployeeTable = ({
  setShowDepartmentTable,
  payload,
  setPayload,
  selectedEmployees,
  setSelectedEmployees,
}) => {
  console.log(selectedEmployees, "emp");
  const [employees, setEmployee] = useState([]);
  const [empId, setEmpId] = useState([]);

  const op = useRef(null);
  const levelEmployeecolumn = [
    { field: "", header: "" },
    { field: "firstName", header: "Name", sorting: true },
    // { field: "department", header: "Department" },
    { field: "barCode", header: "Barcode" },
    { field: "addressCity", header: "Address/City/State/Zip" },
    { field: "primaryPhone", header: "Primary Phone" },
    { field: "hireDate", header: "Hire Date" },
    { field: "terminationDate", header: "Termination Date" },
  ];

  // const levelEmployeeTable = [
  //   {
  //     name: "ABC Employee",
  //     department: "-",
  //     barcode: "abcemployee",
  //     address: "-",
  //     primaryphone: "(551) 206-4043",
  //     hiredate: "March-12- 2023",
  //     terminationdate: "",
  //     sendEmail: "true",
  //   },
  //   {
  //     name: "Aga Klecha",
  //     department: "Trainers",
  //     barcode: "abcemployee",
  //     address: "aklecha30591",
  //     primaryphone: "(551) 206-4043",
  //     hiredate: "March-12- 2023",
  //     terminationdate: "",
  //     sendEmail: "true",
  //   },
  //   {
  //     name: "ABC Employee",
  //     department: "-",
  //     barcode: "abcemployee",
  //     address: "-",
  //     primaryphone: "(551) 206-4043",
  //     hiredate: "March-12- 2023",
  //     terminationdate: "",
  //     sendEmail: "true",
  //   },
  // ];

  const handelChange = (name) => (e) => {
    setPayload({ ...payload, [name]: e.target.value || e.value });
  };

  const fetchEmployees = async () => {
    const res = await api("get", constants.endPoints.GetEmployeeTableData);
    if (res.success) {
      setEmployee(res.data);
      // setSelectedEmployees(() => {});
    } else {
      console.log(res);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  console.log(empId, "empId");

  const saveSelectedEmp = () => {
    setPayload({ ...payload, employees: empId });
    setShowDepartmentTable(false);
  };

  return (
    <>
      <div className="p-3">
        <Navbar />
        <div className="bg-lightest-blue border-round-md p-2 mt-3 flex justify-content-between mb-3">
          <div className="flex p-2 justify-content-between">
            <div
              style={{ width: "297px", height: "40px" }}
              onClick={(e) => op.current.toggle(e)}
              className=" bg-white p-2  cursor-pointer border-round flex justify-content-between align-items-center "
            >
              <div className=" text-sm text-900 ">Filter</div>
              <div className="ml-3">
                <img
                  style={{ width: "8px", height: "7.25px" }}
                  src={BlackArrow}
                  alt=""
                />
              </div>
              <OverlayPanel ref={op} dismissable={false}>
                <div className="flex ">
                  <div className="col-6">
                    <div className=" ">
                      <DropDown
                        title="Training Level"
                        placeholder="All"
                      ></DropDown>
                    </div>
                    <div className="my-2">
                      <DropDown title="Email Address"></DropDown>
                    </div>
                    <div className="">
                      <DropDown title="St   atus"></DropDown>
                    </div>
                    <div className="mt-2">
                      <DropDown title="Club"></DropDown>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className=" ">
                      <DropDown title="Department"></DropDown>
                    </div>
                    <div className="my-2">
                      <DropDown title="Commission Level"></DropDown>
                    </div>
                    <div className="">
                      <DropDown title="Visible Online:"></DropDown>
                    </div>
                    <div className="mt-2">
                      <Input type="date" title="Hire Date Range"></Input>
                    </div>
                  </div>
                </div>
                <div className=" flex justify-content-end border-none px-3 ">
                  <div className="border-none pt-2 ">
                    <Buttons
                      label="Apply"
                      className="btn-dark border-none"
                      style={{}}
                    ></Buttons>
                  </div>
                </div>
              </OverlayPanel>
            </div>
          </div>
          <div className=" flex justify-content-center align-items-center ">
            <div className=" px-3">
              <Input icon="pi pi-search" placeholder="Search"></Input>
            </div>
          </div>
        </div>
        <div>
          <div>
            <TableData
              selectionMode="checkbox"
              data={employees}
              value={employees}
              columns={levelEmployeecolumn}
              selected={selectedEmployees}
              changeSelection={(e) => {
                setSelectedEmployees(e.value);
                let empIds = e.value.map((emp) => {
                  return emp._id;
                });
                setEmpId(empIds);
              }}
              key="_id"
            ></TableData>
          </div>
        </div>

        <div className="flex justify-content-end mt-3 p-2 ">
          <div className=" mx-3">
            <Buttons
              className="btn-dark border-none"
              label="Save"
              onClick={saveSelectedEmp}
            ></Buttons>
          </div>
          <Buttons
            onClick={() => setShowDepartmentTable(false)}
            className="btn-grey border-none"
            label="Cancel"
          ></Buttons>
        </div>
      </div>
    </>
  );
};

export default AddEmployeeTable;
