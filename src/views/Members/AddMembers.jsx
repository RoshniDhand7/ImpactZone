import React, { useEffect, useMemo, useState } from 'react';
import CustomCard, { CustomGridLayout } from '../../shared/Cards/CustomCard';
import { CustomCalenderInput, CustomDropDown, CustomInput, CustomInputMask, CustomInputNumber, CustomTextArea } from '../../shared/Input/AllInputs';
import { LeadPriorityOptions, genderOptions } from '../../utils/dropdownConstants';
import CustomImageInput from '../../shared/Input/CustomImageInput';
import { useDispatch, useSelector } from 'react-redux';
import PrimaryButton, { CustomButtonGroup, LightButton } from '../../shared/Button/CustomButton';
import debounce from 'lodash.debounce';
import { showFormErrors } from '../../utils/commonFunctions';
import { useHistory } from 'react-router-dom';
import formValidation from '../../utils/validations';
import usePlacesAutocomplete from './usePlacesAutoComplete';
import api from '../../services/api';
import endPoints from '../../services/endPoints';
import { addMembers, getMembers } from '../../redux/actions/MembersPortal/memberPortalActions';
import { getCampaigns } from '../../redux/actions/Settings/MembershipSetup/campaignsAction';
import { getEmployees } from '../../redux/actions/Settings/Employee/employeesAction';

const AddMembers = () => {
    const [data, setData] = useState({
        createType: 'PROSPECT',
        barCode: 0,
        note: '',
        firstName: '',
        lastName: '',
        MI: '',
        gender: 'MALE',
        dob: '',
        image: [],
        govtId: '',
        primaryPhone: '',
        mobilePhone: '',
        workNumber: '',
        address: '',
        latitude: 30.72,
        longitude: 76.64,
        leadPriority: 'NONE',
        salesPerson: '',
        campaign: '',
        issuedOn: '',
        tourOn: '',
        startOn: '',
        beginOn: '',

        uniqueBarCode: false,
    });
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(getEmployees());
        dispatch(getCampaigns());
    }, [dispatch]);

    const { employeesDropdown } = useSelector((state) => state.settings.employee);
    const { campaignDropdown } = useSelector((state) => state.settings.members);
    const loading = useSelector((state) => state.loader.isLoading);

    const handleChange = ({ name, value }) => {
        const formErrors = formValidation(name, value, data);

        if (name === 'barCode') {
            setData((prev) => ({ ...prev, [name]: value, formErrors }));
            if (value) {
                debouncedChangeHandler(value);
            }
        } else {
            setData((prev) => ({ ...prev, [name]: value, formErrors }));
        }
    };

    const changeHandler = async (val) => {
        const res = await api('post', endPoints.MEMBER_BARCODE, { barCode: val });
        if (res.success) {
            setData((prev) => ({ ...prev, uniqueBarCode: false }));
        } else {
            setData((prev) => ({ ...prev, uniqueBarCode: true }));
        }
    };

    useEffect(() => {
        const formErrors = formValidation('barCode', data.uniqueBarCode, data);
        if (data?.uniqueBarCode) {
            formErrors['barCode'] = 'BarCode should be unique!';
        } else {
            formErrors['barCode'] = '';
        }
        setData((prev) => ({ ...prev, formErrors }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data.uniqueBarCode]);

    const debouncedChangeHandler = useMemo(
        () =>
            debounce((val) => {
                changeHandler(val);
            }, 1000),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [],
    );

    const handleSave = () => {
        if (showFormErrors(data, setData)) {
            dispatch(
                addMembers(data, () => {
                    history.goBack();
                    dispatch(getMembers());
                }),
            );
        }
    };
    const { renderAutocomplete } = usePlacesAutocomplete(data, setData);

    return (
        <>
            <h3>Fast Add</h3>
            <CustomCard col="12" title="Membership">
                <CustomGridLayout>
                    <div className="col-2">
                        <CustomImageInput name="image" data={data} onFilesChange={handleChange} required editable={true} />
                    </div>
                    <CustomGridLayout extraClass="col-10">
                        <CustomInputNumber col="4" name="barCode" data={data} onChange={handleChange} required />
                        <CustomTextArea name="note" data={data} onChange={handleChange} />
                    </CustomGridLayout>
                </CustomGridLayout>
            </CustomCard>
            <CustomCard col="col-12" title="Personal">
                <CustomGridLayout>
                    <CustomInput name="firstName" data={data} onChange={handleChange} required col="3" />
                    <CustomInput name="MI" data={data} onChange={handleChange} col="2" />
                    <CustomInput name="lastName" data={data} onChange={handleChange} required col="3" />
                    <CustomDropDown name="gender" data={data} onChange={handleChange} options={genderOptions} />
                    <CustomCalenderInput label="Date Of Birth" name="dob" data={data} onChange={handleChange} maxDate={new Date()} />
                    <CustomInput name="govtId" data={data} onChange={handleChange} required />
                    <CustomInputMask name="primaryPhone" mask="(999) 999-9999" data={data} onChange={handleChange} required />
                    <CustomInputMask name="mobilePhone" mask="(999) 999-9999" data={data} onChange={handleChange} />
                    <CustomInputMask name="workNumber" mask="(999) 999-9999" data={data} onChange={handleChange} required />
                    <CustomInput name="workExt" data={data} onChange={handleChange} col="1" />
                </CustomGridLayout>
            </CustomCard>
            <CustomCard col="12" title="Address">
                <CustomGridLayout>
                    <div className="md:col-6">
                        <label className="text-sm font-semibold">Address</label>
                        <span className="text-red-500">*</span>
                        {renderAutocomplete()}
                    </div>
                </CustomGridLayout>
            </CustomCard>
            <CustomCard col="12" title="Sale">
                <CustomGridLayout>
                    <CustomDropDown name="leadPriority" data={data} onChange={handleChange} options={LeadPriorityOptions} />
                    <CustomDropDown name="salesPerson" data={data} onChange={handleChange} required options={employeesDropdown} optionLabel="name" />
                    <CustomDropDown name="campaign" data={data} onChange={handleChange} required options={campaignDropdown} optionLabel="name" />
                </CustomGridLayout>
            </CustomCard>
            <CustomCard col="12" title="Date">
                <CustomGridLayout>
                    <CustomCalenderInput name="issuedOn" data={data} onChange={handleChange} required />
                    <CustomCalenderInput name="tourOn" data={data} onChange={handleChange} />
                    <CustomCalenderInput name="firstVisit" data={data} onChange={handleChange} />
                    <CustomCalenderInput name="beginOn" required data={data} onChange={handleChange} maxDate={data.expiration} />
                </CustomGridLayout>
            </CustomCard>
            <CustomButtonGroup>
                <PrimaryButton label="Save" className="mx-2" onClick={handleSave} loading={loading} />
                <LightButton label="Cancel" onClick={() => history.goBack()} />
            </CustomButtonGroup>
        </>
    );
};

export default AddMembers;
