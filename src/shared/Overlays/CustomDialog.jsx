import { Dialog } from 'primereact/dialog';
import React from 'react';
import PrimaryButton, { CustomButtonGroup, LightButton } from '../Button/CustomButton';

export default function CustomDialog({
    title,
    visible,
    position,
    width = '30vw',
    showHeader = 'true',
    height,
    onSave,
    loading,
    onCancel,
    children,
    contentClassName,
    onClear,
    icon,
    onApply,
}) {
    const footerContent = (
        <CustomButtonGroup>
            {onApply ? <PrimaryButton label="Apply" className="mx-2" loading={loading} onClick={onApply} /> : null}
            {onSave ? <PrimaryButton label="Save" className="mx-2" loading={loading} onClick={onSave} /> : null}
            {onCancel ? <LightButton label="Cancel" onClick={onCancel} /> : null}
            {onClear ? <LightButton label="Clear" onClick={onClear} /> : null}
        </CustomButtonGroup>
    );
    const headerElement = (
        <div className="header">
            {icon && (
                <>
                    <i className={`pi ${icon}`} />
                    &nbsp;
                </>
            )}
            {title}
        </div>
    );
    return (
        <Dialog
            modal
            header={headerElement}
            headerClassName="justify-content-start"
            visible={visible}
            style={{ width, height }}
            onHide={onCancel}
            footer={onSave || onCancel ? footerContent : ''}
            draggable={false}
            resizable={false}
            blockScroll={true}
            position={position}
            contentClassName={contentClassName}
            showHeader={showHeader}
        >
            {children}
        </Dialog>
    );
}