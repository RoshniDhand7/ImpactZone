import React, { useEffect, useState } from 'react';
import CustomDialog from '../../../../../shared/Overlays/CustomDialog';
import { CustomCalenderInput } from '../../../../../shared/Input/AllInputs';
import { useDispatch } from 'react-redux';
import { showFormErrors } from '../../../../../utils/commonFunctions';
import formValidation from '../../../../../utils/validations';
import { editEmployeeTimeSheet, getOneEmployeeTimeSheet } from '../../../../../redux/actions/Settings/Employee/employeesAction';

const EditTimesheetModal = ({ timesheetEditId, visible, setVisible, setTimesheetEditId, getAllTimesheet }) => {
    const [data, setData] = useState({
        clockIn: null,
        clockOut: null,
    });
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (timesheetEditId) {
            dispatch(
                getOneEmployeeTimeSheet(timesheetEditId, (res) => {
                    setData({
                        clockIn: res?.clockIn ? new Date(res.clockIn) : null,
                        clockOut: res?.clockOut ? new Date(res.clockOut) : null,
                    });
                }),
            );
        }
    }, [timesheetEditId, dispatch]);

    const handleChange = ({ name, value }) => {
        const formErrors = formValidation(name, value, data);
        setData((prev) => ({ ...prev, [name]: value, formErrors }));
    };
    const onClose = () => {
        setVisible(false);
        setTimesheetEditId(false);
    };

    const onSubmit = () => {
        if (showFormErrors(data, setData)) {
            dispatch(
                editEmployeeTimeSheet(timesheetEditId, data, setLoading, () => {
                    getAllTimesheet();
                    setVisible(false);
                    setTimesheetEditId(null);
                }),
            );
        }
    };
    return (
        <CustomDialog title="Edit Timesheet" visible={visible} onCancel={onClose} onSave={onSubmit} loading={loading}>
            <CustomCalenderInput data={data} onChange={handleChange} name="clockIn" required col={12} showTime hourFormat="12" />
            <CustomCalenderInput data={data} onChange={handleChange} name="clockOut" required col={12} showTime hourFormat="12" />
        </CustomDialog>
    );
};

export default EditTimesheetModal;
