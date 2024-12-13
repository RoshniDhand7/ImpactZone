import { OverlayPanel } from 'primereact/overlaypanel';
import React, { useRef } from 'react';

function CustomOverlay({ children, onClick }) {
    const ref = useRef(null);

    return (
        <>
            <i className="pi pi-ellipsis-v cursor-pointer text-dark" onClick={(e) => ref.current.toggle(e)}></i>
            <OverlayPanel ref={ref}>{children}</OverlayPanel>
        </>
    );
}

function CustomOverlay1({ template, children }) {
    const ol = useRef(null);
    return (
        <>
            <span onClick={(e) => ol.current.toggle(e)}>{template}</span>
            <div className="custom-overlay">
                <OverlayPanel ref={ol} onClick={(e) => ol.current.toggle(e)}>
                    {children}
                </OverlayPanel>
            </div>
        </>
    );
}

export { CustomOverlay, CustomOverlay1 };
