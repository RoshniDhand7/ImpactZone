import React, { useEffect, useState } from 'react';
import CustomDialog from '../../shared/Overlays/CustomDialog';
import CustomCard, { CustomGridLayout } from '../../shared/Cards/CustomCard';
import { CustomInputCurrentChange, CustomInputNumber, CustomTextArea } from '../../shared/Input/AllInputs';
import formValidation from '../../utils/validations';
import { useDispatch } from 'react-redux';
import { cashRegisterCheckIn } from '../../redux/actions/POS/PosActions';
import { getRegisters } from '../../redux/actions/PosSettings/register';
import useCalculateTotal from '../../hooks/useCalculateTotal';
import { dateConversions, showFormErrors } from '../../utils/commonFunctions';

const OpenDrawer = ({ cashRegisterOpen, setCashRegisterOpen, registerId, accessCode, onClose }) => {
    const initialState = {
        pennies: 0,
        nickels: 0,
        dimes: 0,
        quarters: 0,
        singles: 0,
        fives: 0,
        tens: 0,
        twenties: 0,
        fifties: 0,
        hundreds: 0,
        comment: '',
        total: 0,
    };
    const dispatch = useDispatch();
    const [data, setData] = useState(initialState);
    const { calculateTotal } = useCalculateTotal(data);

    const onClose1 = () => {
        onClose();
        setCashRegisterOpen({ open: false, closeRegister: {} });
        setData(initialState);
    };
    const handleChange = ({ name, value }) => {
        const formErrors = formValidation(name, value, data);
        setData((prev) => ({ ...prev, [name]: value, formErrors }));
    };

    useEffect(() => {
        setData((prev) => ({ ...prev, total: Number(calculateTotal) }));
    }, [calculateTotal]);

    const handleSave = () => {
        if (showFormErrors(data, setData, ['comment'])) {
            dispatch(
                cashRegisterCheckIn(data, registerId, accessCode, () => {
                    onClose1();
                    dispatch(getRegisters());
                }),
            );
        }
    };

    const { formattedDate, formattedTime } = dateConversions(cashRegisterOpen?.closeRegister?.createdAt);

    return (
        <>
            <CustomDialog title="" visible={cashRegisterOpen?.open} onCancel={onClose1} loading={false} onSave={handleSave} width="90%" saveLabel="StartDrawer">
                <CustomCard col="12" title="Cash Count">
                    <CustomGridLayout>
                        <CustomInputCurrentChange name="pennies" data={data} handleChange={handleChange} />
                        <CustomInputCurrentChange name="nickels" data={data} handleChange={handleChange} />
                        <CustomInputCurrentChange name="dimes" data={data} handleChange={handleChange} />
                        <CustomInputCurrentChange name="quarters" data={data} handleChange={handleChange} />
                        <CustomInputCurrentChange name="singles" data={data} handleChange={handleChange} />
                        <CustomInputCurrentChange name="fives" data={data} handleChange={handleChange} />
                        <CustomInputCurrentChange name="tens" data={data} handleChange={handleChange} />
                        <CustomInputCurrentChange name="twenties" data={data} handleChange={handleChange} />
                        <CustomInputCurrentChange name="fifties" data={data} handleChange={handleChange} />
                        <CustomInputCurrentChange name="hundreds" data={data} handleChange={handleChange} />
                        <CustomInputNumber name="total" data={data} col="8" disabled={true} />
                        <CustomTextArea name="comment" col="6" data={data} onChange={handleChange} />
                    </CustomGridLayout>
                </CustomCard>
                {Object?.keys(cashRegisterOpen.closeRegister)?.length !== 0 && (
                    <CustomCard col="12" title="Last Close Out">
                        <div className="grid">
                            <div className="flex col-6">
                                <h5>Name:</h5>
                                <p className="mx-2">
                                    {cashRegisterOpen?.closeRegister?.firstName} {cashRegisterOpen?.closeRegister?.middleInitial ?? ''}
                                    {cashRegisterOpen?.closeRegister?.lastName}
                                </p>
                            </div>
                            <div className="flex col-6">
                                <h5>Close Out Date/Time:</h5>
                                <p className="mx-2">{`${formattedDate} ${formattedTime}`}</p>
                            </div>
                        </div>
                    </CustomCard>
                )}
            </CustomDialog>
        </>
    );
};

export default OpenDrawer;
