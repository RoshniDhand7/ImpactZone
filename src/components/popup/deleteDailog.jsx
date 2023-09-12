import React, { useState, useRef } from "react";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { useDispatch } from "react-redux";

const DeleteDailog = ({
  visible,
  setVisible,
  deleteRowId,
  onDelete,
  setLoading,
}) => {
  const dispatch = useDispatch();
  return (
    <>
      {/* <Toast ref={toast} /> */}
      <ConfirmDialog
        visible={visible}
        onHide={() => setVisible(false)}
        message="Are you sure you want to proceed?"
        header="Confirmation"
        icon="pi pi-exclamation-triangle"
        accept={() => dispatch(onDelete(deleteRowId, setLoading))}
      />
    </>
  );
};

export default DeleteDailog;
