import React from "react";
import { Button } from "primereact/button";

export default function Buttons({
  label,
  onClick,
  className,
  style,
  icon,
  iconPos,
}) {
  return (
    <div>
      <Button
        label={label}
        className={"w-full  text-sm mx-2   " + " " + className}
        onClick={onClick}
        style={style}
        icon={icon}
        iconPos={iconPos}
      />
    </div>
  );
}
