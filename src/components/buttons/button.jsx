import React from "react";
import { Button } from "primereact/button";
import { Ripple } from "primereact/ripple";

function Buttons({
  label,
  onClick,
  className,
  style,
  icon,
  iconPos,
  disabled,
}) {
  return (
    <div>
      <Button
        label={label}
        className={
          "w-full border-none mb-2  text-sm mx-2  p-ripple   " + " " + className
        }
        onClick={onClick}
        style={{ padding: "13px 22px 13px 22px", ...style }}
        icon={icon}
        iconPos={iconPos}
        disabled={disabled}
      />
      <Ripple />
    </div>
  );
}
export default Buttons;
