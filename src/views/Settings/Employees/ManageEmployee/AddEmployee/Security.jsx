import React, { useEffect, useState } from 'react';
import CustomCard, { CustomGridLayout } from '../../../../../shared/Cards/CustomCard';
import PrimaryButton, { CustomButtonGroup, LightButton } from '../../../../../shared/Button/CustomButton';
import { CustomCalenderInput, CustomDropDown, CustomInput, CustomInputNumber, CustomInputSwitch } from '../../../../../shared/Input/AllInputs';
import { yesNoOptions } from '../../../../../utils/dropdownConstants';
import CustomPickList from '../../../../../shared/Input/CustomPickList';
import formValidation from '../../../../../utils/validations';
import { showFormErrors } from '../../../../../utils/commonFunctions';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { addEmployees, editEmployee, getEmployee } from '../../../../../redux/actions/Settings/Employee/employeesAction';
import { useParams } from 'react-router';
import { getSecurityRoles } from '../../../../../redux/actions/EmployeeSettings/securityRolesAction';
import { getJobDetails } from '../../../../../redux/actions/Settings/Business/jobActions';

const Security = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        dispatch(getJobDetails());
        dispatch(getSecurityRoles());
    }, [dispatch]);

    let { allSecurityRoles } = useSelector((state) => state?.securityRole);
    allSecurityRoles = allSecurityRoles?.map((item) => ({ name: item.name, value: item._id }));

    useEffect(() => {
        if (id) {
            dispatch(
                getEmployee(id, (data) => {
                    setData({
                        firstName: data.firstName,
                        lastName: data.lastName,
                        middleInitial: data.middleInitial,
                        jobTitle: data.jobTitle,
                        dob: new Date(data.dob),
                        socialSecurity: data.socialSecurity,
                        barCode: data.barCode,
                        accessCode: data.accessCode,
                        email: data.email,
                        multiClubClockIn: data.multiClubClockIn,
                        securityRoles: data.securityRoles,
                        isActive: data.isActive,
                    });
                }),
            );
        }
    }, [id, dispatch]);

    const { jobTitle } = useSelector((state) => state.settings.business);
    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        middleInitial: '',
        jobTitle: null,
        dob: '',
        socialSecurity: '',
        barCode: 0,
        accessCode: '',
        email: '',
        multiClubClockIn: false,
        securityRoles: [],
        isActive: true,
    });

    const handleChange = ({ name, value }) => {
        const formErrors = formValidation(name, value, data);
        setData((prev) => ({ ...prev, [name]: value, formErrors }));
    };
    const handleSave = (tab) => {
        let ignore = ['jobTitle'];

        if (showFormErrors(data, setData, ignore)) {
            if (id) {
                dispatch(editEmployee(id, data, setLoading, history, tab));
            } else {
                dispatch(addEmployees(data, setLoading, history, tab));
            }
        }
    };

    return (
        <>
            <CustomCard col="12" title="Personal">
                <CustomGridLayout>
                    <CustomInput name="firstName" required col={3} data={data} onChange={handleChange} />
                    <CustomInput name="middleInitial" col={1} data={data} onChange={handleChange} />
                    <CustomInput name="lastName" required data={data} onChange={handleChange} />
                    <CustomDropDown
                        name="jobTitle"
                        data={data}
                        onChange={handleChange}
                        options={jobTitle?.map((item, index) => {
                            return { label: item.jobTitle, value: item._id };
                        })}
                        optionLabel="label"
                    />
                    <CustomCalenderInput name="dob" data={data} onChange={handleChange} />
                    <CustomInput name="socialSecurity" data={data} onChange={handleChange} />
                    <CustomInputSwitch name="isActive" data={data} onChange={handleChange} />
                </CustomGridLayout>
            </CustomCard>
            <CustomCard col="12" title="System">
                <CustomGridLayout>
                    <CustomInputNumber name="barCode" required data={data} onChange={handleChange} />
                    <CustomInput name="accessCode" required data={data} onChange={handleChange} />
                    <CustomInput name="email" required data={data} onChange={handleChange} />
                    <CustomDropDown label="Allow Multi-Club Clock In/Out" name="multiClubClockIn" options={yesNoOptions} data={data} onChange={handleChange} />
                </CustomGridLayout>
            </CustomCard>
            <CustomCard col="12" title="Select Roles">
                <div col={12}>
                    <CustomPickList name="securityRoles" selected={data?.securityRoles} sourceData={allSecurityRoles} onPickListChange={handleChange} />
                </div>
            </CustomCard>
            <CustomButtonGroup>
                <PrimaryButton label="Save" className="mx-2" onClick={() => handleSave('')} loading={loading} />
                <PrimaryButton label="Save & Next" className="mx-2" onClick={() => handleSave('?tab=general')} loading={loading} />
                <LightButton label="Cancel" onClick={() => history.replace('/settings/employee')} />
            </CustomButtonGroup>
        </>
    );
};

export default Security;
