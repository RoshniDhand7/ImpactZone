import React, { useState, useEffect } from 'react';
import FormPage from '../../../../shared/Layout/FormPage';
import CustomCard, { CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import { CustomInput, CustomTextArea } from '../../../../shared/Input/AllInputs';
import PrimaryButton, { CustomButtonGroup, LightButton } from '../../../../shared/Button/CustomButton';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addJobTitle, editJobTitle, getJobTitle } from '../../../../redux/actions/BusinessSettings/jobActions';

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
    }, [id]);

    const handleChange = ({ name, value }) => {
        setData((prev) => ({ ...prev, [name]: value }));
    };
    const [loading, setLoading] = useState(false);

    const handleSave = () => {
        if (id) {
            dispatch(editJobTitle(id, data, setLoading, history));
        } else {
            dispatch(addJobTitle(data, setLoading, history));
        }
    };
    return (
        <>
            <FormPage backText="Job Title" backTo="/settings/business">
                <CustomCard col="12" title="Job Title">
                    <CustomInput name="jobTitle" data={data} onChange={handleChange} />
                    <CustomTextArea name="description" maxLength="266" data={data} onChange={handleChange} />
                </CustomCard>
                <CustomButtonGroup>
                    <PrimaryButton label="Save" className="mx-2" onClick={handleSave} />
                    <LightButton label="Cancel" onClick={() => history.replace('/settings/business')} />
                </CustomButtonGroup>
            </FormPage>
        </>
    );
};

export default JobTitleForm;
