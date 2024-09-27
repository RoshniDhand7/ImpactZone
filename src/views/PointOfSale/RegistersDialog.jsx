import React from 'react';
import CustomDialog from '../../shared/Overlays/CustomDialog';

const RegistersDialog = ({ openRegister, onClose, setOpenRegister, setRegisterId, allRegisters }) => {
    const handleRegisterClick = (item) => {
        setRegisterId(item._id);
        setOpenRegister((prev) => ({ ...prev, open: false }));
    };

    const registerDet = JSON.parse(localStorage.getItem('registersDetail'));

    return (
        <>
            <CustomDialog title="Registers" visible={openRegister?.open} onCancel={onClose} loading={false}>
                <div style={{ overflow: 'auto', maxHeight: '220px' }}>
                    {openRegister?.type === 'open'
                        ? allRegisters?.map((item) => (
                              <div
                                  key={item._id}
                                  onClick={() =>
                                      item.isActive || (registerDet?.registerId === item._id && registerDet?.isActive) ? null : handleRegisterClick(item)
                                  }
                                  style={{
                                      cursor: 'pointer',
                                      padding: '8px',
                                      border: '1px solid #ccc',
                                      marginBottom: '5px',
                                      borderRadius: '4px',
                                      transition: 'background-color 0.3s',

                                      backgroundColor: item.isActive || (registerDet?.registerId === item._id && registerDet?.isActive) ? '#76db9b' : '#e0e0e0',
                                      hover: {
                                          backgroundColor:
                                              item.isActive || (registerDet?.registerId === item._id && registerDet?.isActive) ? '#caf1d8' : '#caf1d8',
                                      },
                                  }}
                              >
                                  {item.registerId}
                              </div>
                          ))
                        : allRegisters?.map((item) => (
                              <div
                                  key={item._id}
                                  onClick={() => (item.isActive ? handleRegisterClick(item) : null)}
                                  style={{
                                      cursor: 'pointer',
                                      padding: '8px',
                                      border: '1px solid #ccc',
                                      marginBottom: '5px',
                                      borderRadius: '4px',
                                      transition: 'background-color 0.3s',

                                      backgroundColor: item.isActive ? '#76db9b' : '#e0e0e0',
                                      hover: {
                                          backgroundColor: item.isActive ? '#caf1d8' : '#caf1d8',
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
