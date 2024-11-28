import React, { useState, useEffect } from 'react';
import FormPage from '../../../../shared/Layout/FormPage';
import CustomCard from '../../../../shared/Cards/CustomCard';
import CustomLogoImage from '../../../../shared/Image/LogoImage';
import PrimaryButton, { CustomButtonGroup, LightButton } from '../../../../shared/Button/CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import formValidation from '../../../../utils/validations';
import { showFormErrors } from '../../../../utils/commonFunctions';
import { editCompany, getCompanyDetail } from '../../../../redux/actions/Settings/Business/companyActions';

const CustomizationForm = ({ history }) => {
    const dispatch = useDispatch();
    const [data, setData] = useState({
        logo: [],
    });
    useEffect(() => {
        dispatch(getCompanyDetail());
    }, [dispatch]);
    let { company } = useSelector((state) => state?.settings?.business);

    useEffect(() => {
        if (company) {
            setData({
                logo: company?.logo ? [company?.logo] : [],
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [loading, setLoading] = useState(false);

    const handleChange = ({ name, value }) => {
        const formErrors = formValidation(name, value, data);
        setData((prev) => ({ ...prev, [name]: value, formErrors }));
    };
    const handleSave = () => {
        if (showFormErrors(data, setData)) {
            dispatch(editCompany(company._id, data, setLoading, history));
        }
    };

    return (
        <>
            <FormPage backText="Customization">
                <CustomCard col="12" title="Customization">
                    <CustomLogoImage name="logo" data={data} removeable onFilesChange={handleChange} />
                </CustomCard>
                <CustomButtonGroup>
                    <PrimaryButton label="Save" className="mx-2" onClick={handleSave} loading={loading} />
                    <LightButton label="Cancel" onClick={() => history.replace('/settings/business/?tab=customization/')} />
                </CustomButtonGroup>
            </FormPage>
        </>
    );
};

export default CustomizationForm;
