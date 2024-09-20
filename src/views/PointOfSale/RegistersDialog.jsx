import React from 'react';
import CustomDialog from '../../shared/Overlays/CustomDialog';

const RegistersDialog = ({ openRegister, onClose, setOpenRegister, setRegisterId, allRegisters }) => {
    const handleRegisterClick = (item) => {
        setRegisterId(item._id);
        setOpenRegister(false);
    };

    return (
        <>
            <CustomDialog title="Registers" visible={openRegister} onCancel={onClose} loading={false}>
                <div style={{ overflow: 'auto', maxHeight: '220px' }}>
                    {allRegisters?.map((item) => (
                        <div
                            key={item._id}
                            onClick={() => handleRegisterClick(item)}
                            style={{
                                cursor: 'pointer',
                                padding: '8px',
                                border: '1px solid #ccc',
                                marginBottom: '5px',
                                borderRadius: '4px',
                                transition: 'background-color 0.3s',

                                backgroundColor: '#f9f9f9',
                                hover: {
                                    backgroundColor: '#e0e0e0',
                                },
                            }}
                        >
                            {item.registerId}
                        </div>
                    ))}
                </div>
            </CustomDialog>
        </>
    );
};

export default RegistersDialog;
