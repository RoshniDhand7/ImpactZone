import React, { useEffect, useMemo, useState } from 'react';
import CustomDialog from '../../shared/Overlays/CustomDialog';
import CustomCard, { CustomGridLayout } from '../../shared/Cards/CustomCard';
import { CustomInputCurrentChange, CustomInputNumber, CustomTextArea } from '../../shared/Input/AllInputs';
import formValidation from '../../utils/validations';
import { useDispatch } from 'react-redux';
import { cashRegisterCheckIn } from '../../redux/actions/POS/PosActions';

const OpenCashRegister = ({ cashRegisterOpen, setCashRegisterOpen, registerId, accessCode, onClose }) => {
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
    const [data, setData] = useState(initialState);

    const dispatch = useDispatch();
    const onClose1 = () => {
        onClose();
        setCashRegisterOpen(null);
        setData(initialState);
    };
    const handleChange = ({ name, value }) => {
        const formErrors = formValidation(name, value, data);
        setData((prev) => ({ ...prev, [name]: value, formErrors }));
    };

    const denominationRates = {
        pennies: 0.01,
        nickels: 0.05,
        dimes: 0.1,
        quarters: 0.25,
        singles: 1,
        fives: 5,
        tens: 10,
        twenties: 20,
        fifties: 50,
        hundreds: 100,
    };
    const calculateTotal = useMemo(() => {
        return Object.keys(denominationRates)
            .reduce((total, key) => {
                return total + (data[key] || 0) * denominationRates[key];
            }, 0)
            .toFixed(4);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    useEffect(() => {
        setData((prev) => ({ ...prev, total: Number(calculateTotal) }));
    }, [calculateTotal]);

    const handleSave = () => {
        dispatch(cashRegisterCheckIn(data, registerId, accessCode, () => onClose1()));
    };

    return (
        <>
            <CustomDialog title="" visible={cashRegisterOpen} onCancel={onClose1} loading={false} onSave={handleSave} width="90%" saveLabel="StartDrawer">
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
                <CustomCard col="12" title="Last Close Out">
                    <div className="grid">
                        <div className="flex col-6">
                            <h5>Name:</h5>
                            <p className="mx-2">Rahul</p>
                        </div>
                        <div className="flex col-6">
                            <h5>Close Out Date/Time:</h5>
                            <p className="mx-2">09-09-2024</p>
                        </div>
                    </div>
                </CustomCard>
            </CustomDialog>
        </>
    );
};

export default OpenCashRegister;
