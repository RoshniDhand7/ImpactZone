import React, { useState, useEffect } from 'react';
import FormPage from '../../../../shared/Layout/FormPage';
import CustomCard, { CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import { CustomInput, CustomInputSwitch, CustomTextArea } from '../../../../shared/Input/AllInputs';
import PrimaryButton, { CustomButtonGroup, LightButton } from '../../../../shared/Button/CustomButton';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import formValidation from '../../../../utils/validations';
import { showFormErrors } from '../../../../utils/commonFunctions';
import { addJobTitle, editJobTitle, getJobTitle } from '../../../../redux/actions/Settings/Business/jobActions';

const JobTitleForm = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { id } = useParams();
    const [data, setData] = useState({
        jobTitle: '',
        description: '',
        isActive: true,
    });
    useEffect(() => {
        if (id) {
            dispatch(
                getJobTitle(id, (data) => {
                    setData({
                        jobTitle: data.jobTitle,
                        description: data.description,
                        isActive: data.isActive,
                    });
                }),
            );
        }
    }, [id, dispatch]);

    const handleChange = ({ name, value }) => {
        const formErrors = formValidation(name, value, data);
        setData((prev) => ({ ...prev, [name]: value, formErrors }));
    };
    const [loading, setLoading] = useState(false);

    const handleSave = () => {
        if (showFormErrors(data, setData)) {
            if (id) {
                dispatch(editJobTitle(id, data, setLoading, history));
            } else {
                dispatch(addJobTitle(data, setLoading, history));
            }
        }
    };
    return (
        <FormPage backText="Job Title">
            <CustomCard col="12" title="Job Title">
                <CustomGridLayout extraClass="justify-content-end ">
                    <CustomInputSwitch name="isActive" data={data} onChange={handleChange} extraClassName="text-right" />
                </CustomGridLayout>
                <CustomGridLayout>
                    <CustomInput name="jobTitle" data={data} onChange={handleChange} required />
                    <CustomTextArea name="description" maxLength="266" data={data} onChange={handleChange} />
                </CustomGridLayout>
            </CustomCard>
            <CustomButtonGroup>
                <PrimaryButton label="Save" className="mx-2" onClick={handleSave} loading={loading} />
                <LightButton label="Cancel" onClick={() => history.replace('/settings/business')} />
            </CustomButtonGroup>
        </FormPage>
    );
};

export default JobTitleForm;
