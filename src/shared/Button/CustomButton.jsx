import { Button } from 'primereact/button';
import React from 'react';

export default function PrimaryButton({ className, icon, ...props }) {
    return <Button className={`my-2 btn-dark ${className}`} icon={icon} {...props} />;
}

export function LightButton({ className, icon, outlined, ...props }) {
    return <Button icon={icon} outlined className={` my-2 btn-lightblue  ${className}`} {...props} />;
}
export function CustomButton({ className, icon, outlined, ...props }) {
    return <Button icon={icon} outlined className={` my-2  ${className}`} {...props} />;
}

export function CustomButtonGroup({ col = '12', position = 'end', children, ...props }) {
    return (
        <div className={`col-12 md:col-${col}`}>
            <div className={`flex justify-content-${position}`}>{children}</div>
        </div>
    );
}
