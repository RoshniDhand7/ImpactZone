import React, { useState } from "react";
import Buttons from "../../../../components/buttons/button";
import checkInData from "../../../../utils/checkInData";
import RecentCheckIn from "../../../../components/cards/Profilecard/recentCheckIn";
import AddSecurityRoles from "./AddSecurityRoles";
import Navbar from "../../../../layout/Navbar";
import TableData from "../../../../components/cards/dataTable/dataTable";

const SecurityRoles = () => {
  const [addSecurityRole, setAddSecurity] = useState(false);

  // const navigate = useNavigate();
  // // const addSecurity = () => {
  // //   navigate("/add-Securityroles");
  // // };

  const actionTemplate = (col) => {
    return (
      <>
        <div className="flex justify-content-end">
          <span>
            <i className="pi pi-pencil mr-3 "></i>
          </span>
          <span>
            <i className="pi pi-trash"></i>
          </span>
        </div>
      </>
    );
  };

  const manageSecurity = [
    { field: "name", header: "Name", id: "", index: "" },
    { field: "description", header: "Description", id: "", index: "" },

    { field: "", header: "", body: actionTemplate, id: "", index: "" },
  ];

  const [manageSecurityData, setManagaEmplyoee] = useState([
    {
      name: "All Access",
      description: "All Access",
    },
    {
      name: "Call Center Rep L1",
      description: "Call Center Representative Level 1",
    },
    {
      name: "ChargebackUser",
      description: "ChargebackUser",
    },
    {
      name: "Corporate Access",
      description: "Corporate Access",
    },
    {
      name: "Data Entry",
      description: "Data Entry",
    },
  ]);

  const showAddSecurity = () => {
    setAddSecurity(true);
  };

  const securityRoleList = () => {
    return (
      <div className="p-3">
        <Navbar />
        <div className=" flex align-items-center justify-content-between my-3 mx-3">
          <span className="text-xl font-bold text-900">
            Manage Security Roles
          </span>
          <div className=" px-2 ">
            <Buttons
              onClick={showAddSecurity}
              className=" btn-dark border-none"
              label="Add Security Roles"
              icon="pi pi-plus-circle"
            ></Buttons>
          </div>
        </div>
        <div className="mx-3">
          <div className=" mt-2">
            <TableData
              columns={manageSecurity}
              data={manageSecurityData}
              // delRow={tableRowRemove}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {addSecurityRole ? <AddSecurityRoles /> : securityRoleList()}
      <div className="mt-5 p-3 mx-3">
        <RecentCheckIn data={checkInData} />
      </div>
    </>
  );
};

export default SecurityRoles;
