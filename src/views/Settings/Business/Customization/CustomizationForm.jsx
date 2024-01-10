import React, { useState, useEffect } from 'react';
import FormPage from '../../../../shared/Layout/FormPage';
import CustomCard from '../../../../shared/Cards/CustomCard';
import CustomLogoImage from '../../../../shared/Image/LogoImage';
import PrimaryButton, { CustomButtonGroup, LightButton } from '../../../../shared/Button/CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import { editCompany, getCompanyDetails } from '../../../../redux/actions/BusinessSettings/companyActions';

const CustomizationForm = ({ history }) => {
    const dispatch = useDispatch();
    const [data, setData] = useState({
        logo: [],
    });
    useEffect(() => {
        dispatch(getCompanyDetails());
    }, [dispatch]);
    let { allCompany } = useSelector((state) => state?.company);

    useEffect(() => {
        if (allCompany) {
            setData({
                logo: allCompany?.logo ? [allCompany?.logo] : [],
            });
        }
    }, [allCompany]);

    const [loading, setLoading] = useState(false);
    const handleChange = ({ name, value }) => {
        setData((prev) => ({ ...prev, [name]: value }));
    };
    const handleSave = () => {
        dispatch(editCompany(data, setLoading, history));
    };
    return (
        <>
            <FormPage backText="Customization" backTo="/settings/business">
                <CustomCard col="12" title="Customization">
                    <CustomLogoImage name="logo" data={data} removeable onFilesChange={handleChange} />
                </CustomCard>
                <CustomButtonGroup>
                    <PrimaryButton label="Save" className="mx-2" onClick={handleSave} />
                    <LightButton label="Cancel" onClick={() => history.replace('/settings/business')} />
                </CustomButtonGroup>
            </FormPage>
        </>
    );
};

export default CustomizationForm;
