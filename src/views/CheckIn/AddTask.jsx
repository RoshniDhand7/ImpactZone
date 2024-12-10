import React, { useState } from 'react';
import CustomDialog from '../../shared/Overlays/CustomDialog';
import { CustomCalenderInput, CustomDropDown, CustomInput, CustomTextArea } from '../../shared/Input/AllInputs';
import { taskTypeOptions } from '../../utils/dropdownConstants';
import useEmployees from '../../hooks/Employees/useEmployees';
import { CustomGridLayout } from '../../shared/Cards/CustomCard';
import { useDispatch } from 'react-redux';
import { addTaskAction } from '../../redux/actions/CheckIn/CheckIn';
import { getTasks } from '../../redux/actions/MembersPortal/memberPortalActions';
import formValidation from '../../utils/validations';
import { showFormErrors } from '../../utils/commonFunctions';

const AddTask = ({ openTask, setOpenTask, memberId }) => {
    const initialState = {
        dueDate: new Date(),
        taskType: '',
        taskTitle: '',
        message: '',
        employee: '',
    };
    const [data, setData] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const handleChange = ({ name, value }) => {
        const formErrors = formValidation(name, value, data);
        setData((prev) => ({ ...prev, [name]: value, formErrors }));
    };

    const { employeesDropdown } = useEmployees();
    const handleSave = () => {
        if (showFormErrors(data, setData)) {
            dispatch(
                addTaskAction({ ...data, member: memberId }, setLoading, () => {
                    setOpenTask(false);
                    setData(initialState);
                    dispatch(getTasks(memberId));
                }),
            );
        }
    };
    return (
        <>
            <CustomDialog
                title="Add Task"
                visible={openTask}
                onCancel={() => {
                    setOpenTask(false);
                    setData(initialState);
                }}
                loading={loading}
                width="60vh"
                onSave={handleSave}
            >
                <CustomGridLayout>
                    <CustomCalenderInput name="dueDate" label="Deadline" data={data} onChange={handleChange} col="6" minDate={new Date()} />
                    <CustomDropDown name="taskType" onChange={handleChange} data={data} options={taskTypeOptions} col="6" />
                    <CustomDropDown name="employee" onChange={handleChange} data={data} options={employeesDropdown} col="6" />
                    <CustomInput name="taskTitle" onChange={handleChange} data={data} col="6" />
                    <CustomTextArea name="message" onChange={handleChange} data={data} />
                </CustomGridLayout>
            </CustomDialog>
        </>
    );
};

export default AddTask;
