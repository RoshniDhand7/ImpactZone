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
    <Button
      label={label}
      className={"w-full  text-sm   " + " " + className}
      onClick={onClick}
      style={style}
      icon={icon}
      iconPos={iconPos}
    />
  );
}
