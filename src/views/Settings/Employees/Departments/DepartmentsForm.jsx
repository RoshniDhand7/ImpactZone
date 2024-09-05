import React, { useState, useEffect } from 'react';
import FormPage from '../../../../shared/Layout/FormPage';
import CustomCard, { CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import PrimaryButton, { CustomButtonGroup, LightButton } from '../../../../shared/Button/CustomButton';
import { CustomDropDown, CustomInput } from '../../../../shared/Input/AllInputs';
import formValidation from '../../../../utils/validations';
import { yesNoOptions } from '../../../../utils/dropdownConstants';
import { showFormErrors } from '../../../../utils/commonFunctions';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { addDepartment, editDepartment, getDepartment } from '../../../../redux/actions/EmployeeSettings/departmentsAction';

const DepartmentsForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();
    const [data, setData] = useState({
        name: '',
        showInCalender: '',
        visibleOnline: '',
        salesPersonOnline: '',
        departmentCode: '',
    });

    useEffect(() => {
        if (id) {
            dispatch(
                getDepartment(id, (data) => {
                    setData({
                        name: data.name,
                        showInCalender: data.showInCalender,
                        visibleOnline: data.visibleOnline,
                        salesPersonOnline: data.salesPersonOnline,
                        departmentCode: data.departmentCode,
                    });
                }),
            );
        }
    }, [id, dispatch]);
    const [loading, setLoading] = useState(false);
    const handleChange = ({ name, value }) => {
        const formErrors = formValidation(name, value, data);
        setData((prev) => ({ ...prev, [name]: value, formErrors }));
    };
    const handleSave = () => {
        if (showFormErrors(data, setData)) {
            if (id) {
                dispatch(editDepartment(id, data, setLoading, history));
            } else {
                dispatch(addDepartment(data, setLoading, history));
            }
        }
    };

    return (
        <>
            <FormPage backText="Departments">
                <CustomCard col="12" title="General">
                    <CustomGridLayout>
                        <CustomInput data={data} name="name" onChange={handleChange} col={3} />
                        <CustomDropDown name="showInCalender" options={yesNoOptions} onChange={handleChange} data={data} />
                        <CustomDropDown name="visibleOnline" options={yesNoOptions} onChange={handleChange} data={data} />
                        <CustomDropDown name="salesPersonOnline" options={yesNoOptions} onChange={handleChange} data={data} />
                        <CustomInput data={data} name="departmentCode" onChange={handleChange} col={3} />
                    </CustomGridLayout>
                </CustomCard>

                <CustomButtonGroup>
                    <PrimaryButton label="Save" className="mx-2" loading={loading} onClick={handleSave} />
                    <LightButton label="Cancel" onClick={() => history.goBack()} />
                </CustomButtonGroup>
            </FormPage>
        </>
    );
};

export default DepartmentsForm;
