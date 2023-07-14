import React, { useState, useRef } from "react";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";

const DeleteDailog = ({ visible, setVisible, setDeleteRow, deleteRow }) => {
  console.log("reache dialog comp", visible);
  // const [visible, setVisible] = useState(false);
  const toast = useRef(null);

  const accept = () => {
    setDeleteRow({ ...deleteRow, isDelete: true });
  };

  //   const confirm1 = () => {
  //     confirmDialog({
  //       message: "Are you sure you want to proceed?",
  //       header: "Confirmation",
  //       icon: "pi pi-exclamation-triangle",
  //       accept,
  //       reject,
  //     });
  //   };

  return (
    <>
      {/* <Toast ref={toast} /> */}
      <ConfirmDialog
        visible={visible}
        onHide={() => setVisible(false)}
        message="Are you sure you want to proceed?"
        header="Confirmation"
        icon="pi pi-exclamation-triangle"
        accept={accept}
      />
    </>
  );
};

export default DeleteDailog;
