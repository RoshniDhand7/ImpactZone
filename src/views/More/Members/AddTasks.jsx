import React, { useState } from 'react';
import FormPage from '../../../shared/Layout/FormPage';
import CustomCard, { CustomGridLayout } from '../../../shared/Cards/CustomCard';
import PrimaryButton, { CustomButtonGroup, LightButton } from '../../../shared/Button/CustomButton';
import { CustomCalenderInput, CustomDropDown, CustomInput, CustomTextArea } from '../../../shared/Input/AllInputs';
import useEmployees from '../../../hooks/Employees/useEmployees';
import { addTaskAction, getTaskAction } from '../../../redux/actions/CheckIn/CheckIn';
import { useDispatch } from 'react-redux';
import { taskTypeOptions } from '../../../utils/dropdownConstants';
import useMembers from '../../../hooks/Members/useMembers';
import { useHistory } from 'react-router-dom';
import formValidation from '../../../utils/validations';
import { showFormErrors } from '../../../utils/commonFunctions';

const AddTasks = () => {
    const initialState = {
        dueDate: new Date(),
        taskType: '',
        taskTitle: '',
        message: '',
        employee: '',
        member: '',
    };
    const [data, setData] = useState(initialState);
    const dispatch = useDispatch();
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const { employeesDropdown } = useEmployees();
    const { allMembersDropdown } = useMembers();
    const handleChange = ({ name, value }) => {
        const formErrors = formValidation(name, value, data);
        setData((prev) => ({ ...prev, [name]: value, formErrors }));
    };

    const handleSave = () => {
        if (showFormErrors(data, setData)) {
            dispatch(
                addTaskAction(data, setLoading, () => {
                    setData(initialState);
                    dispatch(getTaskAction());
                    history.goBack();
                }),
            );
        }
    };
    return (
        <>
            <FormPage backText="Tasks">
                <CustomCard col="12" title="Task Attributes">
                    <CustomGridLayout>
                        <CustomCalenderInput name="dueDate" label="Deadline" data={data} onChange={handleChange} minDate={new Date()} />
                        <CustomDropDown name="taskType" onChange={handleChange} data={data} options={taskTypeOptions} />
                        <CustomDropDown name="member" onChange={handleChange} data={data} options={allMembersDropdown} />
                        <CustomDropDown name="employee" onChange={handleChange} data={data} options={employeesDropdown} />
                        <CustomInput name="taskTitle" onChange={handleChange} data={data} />
                        <CustomTextArea name="message" onChange={handleChange} data={data} />
                    </CustomGridLayout>
                </CustomCard>
                <CustomButtonGroup>
                    <PrimaryButton label="Save" className="mx-2" onClick={handleSave} loading={loading} />
                    <LightButton label="Cancel" onClick={() => history.goBack()} />
                </CustomButtonGroup>
            </FormPage>
        </>
    );
};

export default AddTasks;
