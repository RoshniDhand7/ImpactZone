import React from "react";
import { Dialog } from "primereact/dialog";

const PopUp = ({ setIsActive, isActive, title, data, className }) => {
  return (
    <>
      <Dialog
        header={title}
        visible={isActive}
        className={className}
        onHide={() => setIsActive(false)}
      >
        {data}
      </Dialog>
    </>
  );
};

export default PopUp;
