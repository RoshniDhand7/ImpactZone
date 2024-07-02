import { Dialog } from 'primereact/dialog';
import React from 'react';
import PrimaryButton, { CustomButtonGroup, LightButton } from '../Button/CustomButton';

export default function CustomDialog({ title, visible, position, width = '30vw', onSave, loading, onCancel, children, contentClassName }) {
    const footerContent = (
        <CustomButtonGroup>
            {onSave ? <PrimaryButton label="Save" className="mx-2" loading={loading} onClick={onSave} /> : null}
            {onCancel ? <LightButton label="Cancel" onClick={onCancel} /> : null}
        </CustomButtonGroup>
    );
    return (
        <Dialog
            modal
            header={title}
            headerClassName="justify-content-start"
            visible={visible}
            style={{ width }}
            onHide={onCancel}
            footer={onSave || onCancel ? footerContent : ''}
            draggable={false}
            resizable={false}
            blockScroll={true}
            position={position}
            contentClassName={contentClassName}
        >
            {children}
        </Dialog>
    );
}
