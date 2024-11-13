import React, { useEffect, useMemo } from 'react';
import CustomDialog from '../../../../shared/Overlays/CustomDialog';
import { useState } from 'react';
import { CustomDropDown, CustomInput, CustomTextArea } from '../../../../shared/Input/AllInputs';
import CashCalculator from './CashCalculator';
import { CustomListItem } from '../../../../shared/Cards/CustomCard';
import { useDispatch, useSelector } from 'react-redux';
import { validateAccessCodeAction } from '../../../../redux/actions/helperActions';
import { closeRegisterAction, getRegisterAction } from '../../../../redux/actions/POS/registerActions';

export default function CloseDraweModel({ visible, setVisible }) {
    const dispatch = useDispatch();

    const [data, setData] = useState({ register: '', accessCode: '', totalCash: 0, comment: '' });
    const [access, setAccess] = useState(null);
    const [register, setRegister] = useState({});
    const [loading, setLoading] = useState(null);

    const { registers } = useSelector((state) => state.pos);
    const registersDropdown = useMemo(
        () => registers.filter((item) => item?.registerStatus === 'OPEN').map((item) => ({ name: item.name, value: item._id })),
        [registers],
    );
    useEffect(() => {
        if (data?.register) {
            dispatch(
                getRegisterAction(data?.register, (e) => {
                    setRegister(e);
                    if (e?.sales) {
                        setSales({ cash: e?.sales?.CASH, cheque: e?.sales?.CHEQUE });
                    }
                }),
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
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

    const registerStatus = register?.registerStatus;
    const openedBy = `${registerStatus?.openedBy?.firstName ? registerStatus?.openedBy?.firstName : ''} ${registerStatus?.openedBy?.lastName ? registerStatus?.openedBy?.lastName : ''}`;
    const openedAt = registerStatus?.createdAt ? registerStatus?.createdAt : '';

    let [sales, setSales] = useState({
        cash: 0,
        cheque: 0,
    });

    //Cash added in drawer when drawer started
    let cashAtStart = registerStatus?.cashAtStart;
    //Total cash that is currently in drawer including cash that we added at start
    let totalCash = data?.totalCash;

    //Total cash sale for that drawer
    let cashSale = sales?.cash;

    let amountToLeftIn = register?.amountToLeftIn;

    const cashDifference = useMemo(() => {
        let _total = cashAtStart + cashSale;
        let _diff = totalCash - _total;
        return _diff;
    }, [cashAtStart, cashSale, totalCash]);

    const totalCashOut = useMemo(() => {
        let _total = cashAtStart + cashSale;
        let _finalTotal = _total + cashDifference;
        _finalTotal = _finalTotal - amountToLeftIn;
        return _finalTotal;
    }, [cashAtStart, cashSale, amountToLeftIn, cashDifference]);

    const onSubmit = () => {
        if (access) {
            dispatch(
                closeRegisterAction(
                    { ...data, id: registerStatus?._id, cashAtStart, cashSale, amountToLeftIn, cashDifference, totalCashOut },
                    setLoading,
                    onClose,
                ),
            );
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
            title="Close Register"
            visible={visible}
            onCancel={onClose}
            onSave={onSubmit}
            saveLabel={access ? 'Close Drawer' : 'Next'}
            width={access ? '75vw' : '30vw'}
            loading={loading}
        >
            {access ? (
                <div className="grid">
                    <div className="col-3 flex flex-column justify-content-between">
                        <div className="border-round-md border-1 border-gray-300 py-2 px-3 h-full">
                            <CustomListItem label="Drawer Name:" value={register?.name} />
                            <CustomListItem label="Opened By:" value={openedBy} />
                            <CustomListItem label="Opened At:" value={openedAt} />
                        </div>
                        <CustomTextArea data={data} name="comment" onChange={handleChange} />
                    </div>
                    <div className="col-9">
                        <CashCalculator onChange={handleChange} />
                        <div className="grid">
                            <div className="col flex flex-column pb-1">
                                <div className="border-round-md border-1 border-gray-300 py-2 px-3 h-full mb-2">
                                    <div className="flex justify-content-between">
                                        <div className="text-dark-gray">Cheque Counted:</div>
                                        <div className="font-medium text-green-600">-</div>
                                    </div>
                                </div>
                                <div className="border-round-md border-1 border-gray-300 py-2 px-3 h-full mb-2">
                                    <div className="flex justify-content-between">
                                        <div className="text-dark-gray">Total Cheque in Drawer:</div>
                                        <div className="font-medium text-green-600">${0}</div>
                                    </div>
                                    <div className="flex justify-content-between">
                                        <div className="text-dark-gray">Total Cheque Sales:</div>
                                        <div className="font-medium text-green-600">${sales?.cheque}</div>
                                    </div>
                                </div>
                                <div className="border-round-md border-1 border-gray-300 py-2 px-3 h-full">
                                    <div className="flex justify-content-between">
                                        <div className="text-dark-gray">Cheque Difference:</div>
                                        <div className="font-medium text-green-600">${0}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col flex flex-column pb-1">
                                <div className="border-round-md border-1 border-gray-300 py-2 px-3 h-full">
                                    <div className="flex justify-content-between">
                                        <div className="text-dark-gray">Cash at Start:</div>
                                        <div className="font-medium text-green-600">${cashAtStart}</div>
                                    </div>
                                    <div className="flex justify-content-between">
                                        <div className="text-dark-gray">Total Cash Sales:</div>
                                        <div className="font-medium text-green-600">${cashSale}</div>
                                    </div>
                                    {cashDifference !== 0 && (
                                        <div className="flex justify-content-between">
                                            <div className="text-dark-gray">Cash Difference:</div>
                                            {cashDifference > 0 ? (
                                                <div className="font-medium text-green-600">${cashDifference}</div>
                                            ) : (
                                                <div className="font-medium text-red-600">${cashDifference}</div>
                                            )}
                                        </div>
                                    )}
                                    <div className="flex justify-content-between">
                                        <div className="text-dark-gray">Amount to leave in Drawer:</div>
                                        <div className="font-medium text-red-600">${amountToLeftIn}</div>
                                    </div>
                                    <div className="flex justify-content-between">
                                        <div className="text-dark-gray">Total Cash close out:</div>
                                        <div className="font-medium text-green-600">${totalCashOut}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <CustomDropDown data={data} onChange={handleChange} name="register" options={registersDropdown} required col={12} />
                    <CustomInput data={data} onChange={handleChange} name="accessCode" required col={12} autocomplete="off" />
                </>
            )}
        </CustomDialog>
    );
}
