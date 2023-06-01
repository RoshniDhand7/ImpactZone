import React from "react";
import { Button } from "primereact/button";

function Buttons({ label, onClick, className, style, icon, iconPos }) {
  return (
    <div>
      <Button
        label={label}
        className={"w-full  text-sm mx-2   " + " " + className}
        onClick={onClick}
        style={{ padding: "13px 22px 13px 22px", ...style }}
        icon={icon}
        iconPos={iconPos}
      />
    </div>
  );
}
export default Buttons;
