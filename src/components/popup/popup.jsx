import React from "react";
import { Dialog } from "primereact/dialog";
const PopUp = ({ setIsActive, isActive, title, data }) => {
  return (
    <>
      <Dialog
        header={title}
        visible={isActive}
        style={{ width: "60vw", borderRadius: "22px" }}
        onHide={() => setIsActive(false)}
      >
        {data}
      </Dialog>
    </>
  );
};

export default PopUp;
