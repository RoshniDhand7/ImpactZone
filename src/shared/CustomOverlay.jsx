import { OverlayPanel } from 'primereact/overlaypanel';
import React, { useRef } from 'react';

export default function CustomOverlay({ children, onClick }) {
    const ref = useRef(null);

    return (
        <>
            <i className="pi pi-ellipsis-v cursor-pointer text-dark" onClick={(e) => ref.current.toggle(e)}></i>
            <OverlayPanel ref={ref}>{children}</OverlayPanel>
        </>
    );
}
