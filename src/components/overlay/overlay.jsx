import React from "react";
import { OverlayPanel } from "primereact/overlaypanel";
import { useRef } from "react";

const Overlay = ({ label, children, style }) => {
  const op = useRef(null);
  return (
    <>
      <div
        className="flex flex-column gap-2"
        onClick={(e) => op.current.toggle(e)}
      >
        <label htmlFor="" className="text-xs text-dark-gray font-semibold">
          {label}
        </label>
        <div className="overlay-border">
          <div></div>
          <i className="pi pi-angle-down text-xl text-900"></i>
        </div>
      </div>
      <OverlayPanel property="down" ref={op} showCloseIcon style={style}>
        {children}
      </OverlayPanel>
    </>
  );
};

export default Overlay;
