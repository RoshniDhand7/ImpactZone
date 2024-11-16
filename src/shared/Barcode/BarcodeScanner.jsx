import React, { useState } from 'react';
import BarcodeScannerComponent from 'react-qr-barcode-scanner';
import { Dialog } from 'primereact/dialog';
import barcodeicon from '../../assets/icons/barcode.png';

export default function BarcodeScanner({ onChnage }) {
    const [visible, setVisible] = useState(false);

    const onUpdate = (err, result) => {
        if (result) {
            if (onChnage) {
                onChnage({ value: parseInt(result.text) });
            }
            setVisible(false);
        }
    };
    return (
        <>
            <img onClick={() => setVisible(true)} className="cursor-pointer" src={barcodeicon} alt="barcode" style={{ width: '40px', height: '40px' }} />
            <Dialog
                headerClassName="p-0"
                contentClassName="pb-1 px-2"
                draggable={false}
                resizable={false}
                blockScroll={true}
                visible={visible}
                onHide={() => setVisible(false)}
            >
                <BarcodeScannerComponent className="barcode-scanner" width={400} height={300} onUpdate={onUpdate} stopStream={!visible} />
            </Dialog>
        </>
    );
}
