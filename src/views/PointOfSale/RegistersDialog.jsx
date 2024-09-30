import React, { useState } from 'react';
import CustomDialog from '../../shared/Overlays/CustomDialog';
import { showFormErrors } from '../../utils/commonFunctions';
import formValidation from '../../utils/validations';

const RegistersDialog = ({ openRegister, setOpenRegister, setRegisterId, allRegisters }) => {
    const [data, setData] = useState({
        register: '',
    });
    const handleRegisterClick = (item) => {
        const formErrors = formValidation('register', item._id, data);
        setData((prev) => ({ ...prev, register: item._id, formErrors }));
    };

    const registerDet = JSON.parse(localStorage.getItem('registersDetail'));

    const handleNext = () => {
        if (showFormErrors(data, setData)) {
            setRegisterId(data?.register);
            setOpenRegister((prev) => ({ ...prev, open: false }));
        }
    };

    const handleClick = (item) => {
        if (item.isActive || (registerDet?.registerId === item._id && registerDet?.isActive)) {
            return null;
        } else {
            handleRegisterClick(item);
        }
    };
    const onClose = () => {
        const formErrors = formValidation('register', '', data);
        setOpenRegister((prev) => ({ ...prev, open: false }));
        setRegisterId(null);
        setData((prev) => ({ ...prev, register: '', formErrors }));
    };

    return (
        <>
            <CustomDialog title="Registers" visible={openRegister?.open} onCancel={onClose} loading={false} onSave={handleNext} saveLabel="Next">
                <div style={{ overflow: 'auto', maxHeight: '220px' }}>
                    {openRegister?.type === 'open'
                        ? allRegisters?.map((item) => (
                              <div
                                  key={item._id}
                                  onClick={() => handleClick(item)}
                                  style={{
                                      cursor: 'pointer',
                                      padding: '8px',
                                      border: '1px solid #ccc',
                                      marginBottom: '5px',
                                      borderRadius: '4px',
                                      transition: 'background-color 0.3s',

                                      backgroundColor:
                                          item.isActive || (registerDet?.registerId === item._id && registerDet?.isActive) || data?.register === item._id
                                              ? '#76db9b'
                                              : '#e0e0e0',
                                      hover: {
                                          backgroundColor:
                                              item.isActive || (registerDet?.registerId === item._id && registerDet?.isActive) || data?.register === item._id
                                                  ? '#caf1d8'
                                                  : '#caf1d8',
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
                <div className="text-sm p-error">{data?.formErrors?.register}</div>
            </CustomDialog>
        </>
    );
};

export default RegistersDialog;
