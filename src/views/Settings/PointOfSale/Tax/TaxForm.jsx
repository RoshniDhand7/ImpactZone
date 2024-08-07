import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import formValidation from '../../../../utils/validations';
import { showFormErrors } from '../../../../utils/commonFunctions';
import FormPage from '../../../../shared/Layout/FormPage';
import CustomCard, { CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import { CustomDropDown, CustomInput, CustomInputNumber, CustomInputSwitch } from '../../../../shared/Input/AllInputs';
import PrimaryButton, { CustomButtonGroup, LightButton } from '../../../../shared/Button/CustomButton';
import { TaxRateTypeOptions } from '../../../../utils/dropdownConstants';
import CustomPickList from '../../../../shared/Input/CustomPickList';
import { getClubs } from '../../../../redux/actions/BusinessSettings/clubsAction';
import { addTax, editTax, getTax, getTaxes } from '../../../../redux/actions/PosSettings/tax';

const TaxForm = () => {
    const history = useHistory();
    const { id } = useParams();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        dispatch(getTaxes());
    }, [dispatch]);
    useEffect(() => {
        dispatch(getClubs());
    }, [dispatch]);

    let { clubsDropdown } = useSelector((state) => state.clubs);

    const { allTaxDropdown } = useSelector((state) => state.taxes);

    useEffect(() => {
        if (id) {
            dispatch(
                getTax(id, (data) => {
                    setData({
                        taxRateName: data.taxRateName,
                        taxRatePercentage: data.taxRatePercentage,
                        availableTaxRate: data.availableTaxRate,
                        taxRateType: data.taxRateType,
                        club: data.club,
                        isActive: data.isActive,
                    });
                }),
            );
        }
    }, [id, dispatch]);
    const [data, setData] = useState({
        taxRateName: '',
        taxRatePercentage: 0,
        availableTaxRate: null,
        taxRateType: '',
        club: '',
        isActive: true,
    });
    const handleChange = ({ name, value }) => {
        const formErrors = formValidation(name, value, data);
        setData((prev) => ({ ...prev, [name]: value, formErrors }));
    };
    const handleSave = () => {
        if (showFormErrors(data, setData)) {
            if (id) {
                dispatch(editTax(id, data, setLoading, history));
            } else {
                dispatch(addTax(data, setLoading, history));
            }
        }
    };

    return (
        <>
            <FormPage backText="Tax">
                <CustomCard col="12" title="General">
                    <CustomGridLayout>
                        <CustomInput name="taxRateName" data={data} onChange={handleChange} required />
                        <CustomInputNumber
                            name="taxRatePercentage"
                            data={data}
                            onChange={handleChange}
                            required
                            col="4"
                            minFractionDigits={4}
                            maxFractionDigits={4}
                        />
                        <CustomDropDown name="availableTaxRate" options={allTaxDropdown} data={data} onChange={handleChange} optionLabel="name" />
                        <CustomDropDown name="taxRateType" options={TaxRateTypeOptions} data={data} onChange={handleChange} required />
                        <CustomInputSwitch name="isActive" data={data} onChange={handleChange} />
                    </CustomGridLayout>
                </CustomCard>
                <CustomCard col="12" title="Clubs">
                    <CustomPickList name="club" selected={data?.club} sourceData={clubsDropdown} onPickListChange={handleChange} />
                </CustomCard>
                <CustomButtonGroup>
                    <PrimaryButton label="Save" className="mx-2" onClick={handleSave} loading={loading} />
                    <LightButton label="Cancel" onClick={() => history.goBack()} />
                </CustomButtonGroup>
            </FormPage>
        </>
    );
};

export default TaxForm;
