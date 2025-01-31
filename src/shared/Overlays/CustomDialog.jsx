import { Dialog } from 'primereact/dialog';
import React from 'react';
import PrimaryButton, { CustomButtonGroup, LightButton } from '../Button/CustomButton';

export default function CustomDialog({
    title,
    visible,
    position,
    width = '30vw',
    showHeader = true,
    height,
    onSave,
    loading,
    onCancel,
    children,
    contentclassname,
    onClear,
    icon,
    onApply,
    onHide,
    saveLabel = 'Save',
    applyLabel = 'Apply',
    applydisabled = false,
    savedisabled = false,
    footer,
}) {
    const footerContent = (
        <CustomButtonGroup>
            {onApply ? <PrimaryButton label={applyLabel} className="mx-2" loading={loading} onClick={onApply} disabled={applydisabled} /> : null}
            {onSave ? <PrimaryButton label={saveLabel} className="mx-2" loading={loading} onClick={onSave} disabled={savedisabled} /> : null}
            {onClear ? <LightButton label="Clear" onClick={onClear} /> : null}
            {onCancel ? <LightButton label="Cancel" onClick={onCancel} /> : null}
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
            headerClassName="justify-content-start text-center"
            visible={visible}
            style={{ width, height }}
            onHide={onCancel || onHide}
            footer={footer || (onSave || onCancel ? footerContent : '')}
            draggable={false}
            resizable={false}
            blockScroll={true}
            position={position}
            contentclassname={contentclassname}
            showHeader={showHeader}
        >
            {children}
        </Dialog>
    );
}
