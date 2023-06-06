import React, { useState } from "react";
import Buttons from "../../../../components/buttons/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import dummyData from "../../../../utils/dummyData";
import checkInData from "../../../../utils/checkInData";
import RecentCheckIn from "../../../../components/cards/Profilecard/recentCheckIn";
import AddSecurityRoles from "./AddSecurityRoles";
import Navbar from "../../../../layout/Navbar";

const SecurityRoles = () => {
  const [addSecurityRole, setAddSecurity] = useState(false);
  const { ManageSecurityData } = dummyData();
  const [selectedPos, setSelectedPos] = useState(null);
  // const navigate = useNavigate();
  // // const addSecurity = () => {
  // //   navigate("/add-Securityroles");
  // // };

  const showAddSecurity = () => {
    setAddSecurity(true);
  };

  const securityRoleList = () => {
    return (
      <div className="p-3">
        <Navbar />
        <div className=" flex align-items-center justify-content-between my-3">
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
        <div>
          <div className=" mt-2">
            <DataTable
              value={ManageSecurityData}
              selection={selectedPos}
              onSelectionChange={(e) => setSelectedPos(e.value)}
              dataKey="id"
              tableStyle={{ minWidth: "50rem" }}
            >
              {/* <Column
              selectionMode="multiple"
              headerStyle={{ width: "3rem" }}
            ></Column> */}
              <Column field="name" header="Name"></Column>
              <Column field="description" header="Description"></Column>
            </DataTable>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {addSecurityRole ? <AddSecurityRoles /> : securityRoleList()}
      <div className="mt-5 p-3">
        <RecentCheckIn data={checkInData} />
      </div>
    </>
  );
};

export default SecurityRoles;
