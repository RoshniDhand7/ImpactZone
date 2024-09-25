import React, { useEffect, useState } from 'react';
import CustomCard, { CustomFilterCard, CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import CustomTable from '../../../../shared/Table/CustomTable';
import { useHistory } from 'react-router-dom';
import useRegister from '../../../../hooks/useRegister';
import PrimaryButton from '../../../../shared/Button/CustomButton';
import CustomDialog from '../../../../shared/Overlays/CustomDialog';
import { CustomCalenderInput, CustomInputNumber, CustomInputSwitch } from '../../../../shared/Input/AllInputs';
import { useDispatch } from 'react-redux';
import { registerSettings } from '../../../../redux/actions/PosSettings/register';
import { timeConvertToDate, timeString } from '../../../../utils/commonFunctions';

const Registers = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { allRegisters } = useRegister();
    const columns = [
        { field: 'registerId', header: 'Register Id' },
        { field: 'club', header: 'Club' },
    ];
    const onEdit = (col) => {
        history.push(`/settings/pos/register/edit/${col._id}`);
    };
    const [registerSetting, setRegisterSetting] = useState(false);

    const date = new Date();
    date.setHours(12, 0, 0);

    const [data, setData] = useState({
        autoCloseable: false,
        autoCloseableTime: date,
        amountLeftInDrawer: 0,
    });

    const onClose = () => {
        setRegisterSetting(false);
    };

    const handleChange = ({ name, value }) => {
        if (name === 'autoCloseableTime') {
            let currentMin = value.getMinutes();
            let startTime = value;
            if (currentMin % 15 !== 0) {
                startTime = new Date(value.getTime() + (15 - (currentMin % 15)) * 60000);
            }
            setData((prev) => ({ ...prev, [name]: startTime }));
        } else {
            setData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const register = allRegisters[0];

    useEffect(() => {
        setData({
            autoCloseable: register?.autoCloseable,
            autoCloseableTime: register.autoCloseableTime ? timeConvertToDate(register.autoCloseableTime) : date,
            amountLeftInDrawer: register.amountLeftInDrawer,
        });
    }, [registerSetting]);

    console.log(timeConvertToDate(register.autoCloseableTime));

    const handleSave = () => {
        dispatch(registerSettings({ ...data, autoCloseableTime: timeString(data?.autoCloseableTime) }, () => setRegisterSetting(false)));
    };

    console.log(timeString(data.autoCloseableTime), 'data');
    return (
        <>
            <CustomFilterCard buttonTitle="Add Register" linkTo="/settings/pos/register/add" contentPosition="end">
                <PrimaryButton label="Register Setting" className="mx-2" onClick={() => setRegisterSetting(true)} />
            </CustomFilterCard>

            <CustomDialog title="" visible={registerSetting} onCancel={onClose} loading={false} onSave={handleSave} width="50%">
                <CustomCard col="12" title="Setting">
                    <CustomGridLayout>
                        <CustomInputSwitch name="autoCloseable" data={data} onChange={handleChange} />
                        {data?.autoCloseable && (
                            <CustomCalenderInput
                                name="autoCloseableTime"
                                onChange={handleChange}
                                data={data}
                                timeOnly
                                placeholder="Select Time"
                                hourFormat="12"
                                col={6}
                                stepMinute={15}
                            />
                        )}
                        <CustomInputNumber name="amountLeftInDrawer" data={data} col="6" onChange={handleChange} />
                    </CustomGridLayout>
                </CustomCard>
            </CustomDialog>
            <CustomTable data={allRegisters} columns={columns} onEdit={onEdit} />
        </>
    );
};

export default Registers;
