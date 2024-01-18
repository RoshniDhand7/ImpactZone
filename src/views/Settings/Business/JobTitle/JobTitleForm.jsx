import React, { useState, useEffect } from 'react';
import FormPage from '../../../../shared/Layout/FormPage';
import CustomCard, { CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import { CustomInput, CustomTextArea } from '../../../../shared/Input/AllInputs';
import PrimaryButton, { CustomButtonGroup, LightButton } from '../../../../shared/Button/CustomButton';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addJobTitle, editJobTitle, getJobTitle } from '../../../../redux/actions/BusinessSettings/jobActions';
import formValidation from '../../../../utils/validations';
import { showFormErrors } from '../../../../utils/commonFunctions';

const JobTitleForm = ({ history }) => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [data, setData] = useState({
        jobTitle: '',
        description: '',
    });
    useEffect(() => {
        if (id) {
            dispatch(
                getJobTitle(id, (data) => {
                    setData({
                        jobTitle: data.jobTitle,
                        description: data.description,
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
            dispatch(editJobTitle(id, data, setLoading, history));
        }
        if (id) {
            dispatch(editJobTitle(id, data, setLoading, history));
        } else {
            dispatch(addJobTitle(data, setLoading, history));
        }
    };
    return (
        <>
            <FormPage backText="Job Title">
                <CustomCard col="12" title="Job Title">
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
        </>
    );
};

export default JobTitleForm;
