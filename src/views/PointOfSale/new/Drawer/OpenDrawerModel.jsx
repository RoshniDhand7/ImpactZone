import React, { useEffect, useMemo } from 'react';
import CustomDialog from '../../../../shared/Overlays/CustomDialog';
import { useState } from 'react';
import { CustomDropDown, CustomInput, CustomTextArea } from '../../../../shared/Input/AllInputs';
import useRegister from '../../../../hooks/useRegister';
import CashCalculator from './CashCalculator';
import { CustomListItem } from '../../../../shared/Cards/CustomCard';
import { useDispatch, useSelector } from 'react-redux';
import { validateAccessCodeAction } from '../../../../redux/actions/helperActions';
import { getRegisterAction, startRegisterAction } from '../../../../redux/actions/POS/registerActions';

export default function OpenDrawerModel({ visible, setVisible }) {
    const dispatch = useDispatch();

    const [data, setData] = useState({ register: '', accessCode: '', totalCash: 0, comment: '' });
    const [access, setAccess] = useState(null);
    const [register, setRegister] = useState({});
    const [loading, setLoading] = useState(null);
    const { registers } = useSelector((state) => state.pos);
    const registersDropdown = useMemo(
        () => registers.filter((item) => item?.registerStatus !== 'OPEN').map((item) => ({ name: item.name, value: item._id })),
        [registers],
    );

    useEffect(() => {
        if (data?.register) {
            dispatch(
                getRegisterAction(data?.register, ({ registerStatus }) => {
                    setRegister(registerStatus);
                }),
            );
        }
    }, [access]);

    const onClose = () => {
        setVisible(false);
        setData({ register: '', accessCode: '', totalCash: 0, comment: '' });
        setAccess(null);
        setRegister(null);
    };

    const handleChange = ({ name, value }) => {
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const onSubmit = () => {
        if (access) {
            dispatch(startRegisterAction(data, setLoading, onClose));
        } else {
            if (data?.accessCode && data?.register) {
                dispatch(
                    validateAccessCodeAction(data?.accessCode, setLoading, (e) => {
                        setAccess(e);
                    }),
                );
            }
        }
    };
    return (
        <CustomDialog
            title="Open Register"
            visible={visible}
            onCancel={onClose}
            onSave={onSubmit}
            saveLabel={access ? 'Start Drawer' : 'Next'}
            width={access ? '65vw' : '30vw'}
            loading={loading}
        >
            {access ? (
                <>
                    <CashCalculator onChange={handleChange} />
                    <div className="grid">
                        <CustomTextArea col={6} data={data} name="comment" onChange={handleChange} />
                        <div className="col flex flex-column pb-1">
                            <div className="text-sm font-semibold mb-1">Last Close Out</div>
                            <div className="border-round-md border-1 border-gray-300 py-2 px-3 h-full">
                                <CustomListItem
                                    label="Closed By:"
                                    value={`${register?.closedBy?.firstName ? register?.closedBy?.firstName : ''} ${register?.closedBy?.lastName ? register?.closedBy?.lastName : ''}`}
                                />
                                <CustomListItem label="Closed At:" value={register?.updatedAt ? register?.updatedAt : ''} />
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <CustomDropDown data={data} onChange={handleChange} name="register" options={registersDropdown} required col={12} />
                    <CustomInput data={data} onChange={handleChange} name="accessCode" required col={12} />
                </>
            )}
        </CustomDialog>
    );
}
