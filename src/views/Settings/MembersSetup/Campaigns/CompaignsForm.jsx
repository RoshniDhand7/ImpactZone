import React, { useState, useEffect } from 'react';
import { CustomDropDown, CustomInput, CustomInputSwitch, CustomTextArea } from '../../../../shared/Input/AllInputs';
import FormPage from '../../../../shared/Layout/FormPage';
import CustomCard, { CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import PrimaryButton, { CustomButtonGroup, LightButton } from '../../../../shared/Button/CustomButton';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import formValidation from '../../../../utils/validations';
import { showFormErrors } from '../../../../utils/commonFunctions';
import { getCampaignsGroups } from '../../../../redux/actions/MembersSettings/compaignsGroup';
import { addCampaign, editCampaign, getCampaign } from '../../../../redux/actions/MembersSettings/campaigns';

const CompaignsForm = () => {
    const history = useHistory();
    const { id } = useParams();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        dispatch(getCampaignsGroups());
    }, [dispatch]);

    const { compaignGroupDropdown } = useSelector((state) => state.compaignGroups);

    useEffect(() => {
        if (id) {
            dispatch(
                getCampaign(id, (data) => {
                    setData({
                        name: data.name,
                        campaignGroup: data.campaignGroup,
                        description: data.description,
                        isActive: data.isActive,
                    });
                }),
            );
        }
    }, [id, dispatch]);
    const [data, setData] = useState({
        name: '',
        campaignGroup: '',
        description: '',
        isActive: false,
    });
    const handleChange = ({ name, value }) => {
        const formErrors = formValidation(name, value, data);
        setData((prev) => ({ ...prev, [name]: value, formErrors }));
    };
    const handleSave = () => {
        if (showFormErrors(data, setData)) {
            if (id) {
                dispatch(editCampaign(id, data, setLoading, history));
            } else {
                dispatch(addCampaign(data, setLoading, history));
            }
        }
    };
    return (
        <FormPage backText="Campaigns">
            <CustomCard col="12" title="Add Campaign Details">
                <CustomGridLayout>
                    <CustomInput name="name" data={data} onChange={handleChange} required />
                    <CustomDropDown name="campaignGroup" options={compaignGroupDropdown} data={data} onChange={handleChange} required />
                    <CustomTextArea name="description" maxLength="256" data={data} onChange={handleChange} />
                    <CustomInputSwitch name="isActive" data={data} onChange={handleChange} />
                </CustomGridLayout>
            </CustomCard>
            <CustomButtonGroup>
                <PrimaryButton label="Save" className="mx-2" onClick={handleSave} loading={loading} />
                <LightButton label="Cancel" onClick={() => history.goBack()} />
            </CustomButtonGroup>
        </FormPage>
    );
};

export default CompaignsForm;
