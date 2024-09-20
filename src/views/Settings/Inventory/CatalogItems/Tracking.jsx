import React, { useState, useEffect } from 'react';
import { getReferralGroups } from '../../../../redux/actions/InventorySettings/referralGroupAction';
import { useDispatch, useSelector } from 'react-redux';
import { CustomCalenderInput, CustomDropDown, CustomInput, CustomInputNumber, CustomTextArea } from '../../../../shared/Input/AllInputs';
import CustomCard, { CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import { getVendors } from '../../../../redux/actions/InventorySettings/vendorsAction';
import { getCommissionGroups } from '../../../../redux/actions/InventorySettings/commissionGroupAction';
import { yesNoOptions } from '../../../../utils/dropdownConstants';
import PrimaryButton, { CustomButtonGroup, LightButton } from '../../../../shared/Button/CustomButton';
import { useHistory, useParams } from 'react-router-dom';
import { showFormErrors } from '../../../../utils/commonFunctions';
import { editCatalogItem, getCatalogItem } from '../../../../redux/actions/InventorySettings/catalogItemsAction';
import formValidation from '../../../../utils/validations';
import useCatalogItems from '../../../../hooks/Inventory/useCatalogItems';

const Tracking = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();
    const [data, setData] = useState({
        requireCommission: '',
        commissionGroup: '',
        referralGroup: '',
        memberRequired: '',
        caseQuantity: '',
        vendor: '',
        trackingMinimumQuantity: '',
        trackingMaximumQuantity: '',
        recorderLevel: '',
        trackingAlternateVendors: '',
        time: new Date(),
        note: '',
        alternateItem: '',
    });

    const handleChange = ({ name, value }) => {
        const formErrors = formValidation(name, value, data);
        setData((prev) => ({ ...prev, [name]: value, formErrors }));
    };
    useEffect(() => {
        dispatch(getCommissionGroups());
        dispatch(getReferralGroups());
        dispatch(getVendors());
    }, [dispatch]);
    let { allCommissionGroups } = useSelector((state) => state.commissionGroup);

    const { allCatalogItems } = useCatalogItems();
    const finalCommissionGroups = allCommissionGroups?.filter((commissionGroup) =>
        allCatalogItems?.some((catalogItem) => catalogItem._id === id && catalogItem.type === commissionGroup.type),
    );

    let commissionGroupsDropdown = finalCommissionGroups?.map((item) => ({ name: item.name, value: item._id }));

    useEffect(() => {
        if (id) {
            dispatch(
                getCatalogItem(id, (data) => {
                    setData({
                        requireCommission: data.requireCommission,
                        commissionGroup: data.commissionGroup,
                        referralGroup: data.referralGroup,
                        memberRequired: data.memberRequired,
                        caseQuantity: data.caseQuantity,
                        vendor: data.vendor,
                        trackingMinimumQuantity: data.trackingMinimumQuantity,
                        trackingMaximumQuantity: data.trackingMaximumQuantity,
                        recorderLevel: data.recorderLevel,
                        trackingAlternateVendors: data.trackingAlternateVendors,
                        time: data.createdAt ? new Date(data.createdAt) : new Date(),
                        note: data.note,
                        alternateItem: data.alternateItem,
                    });
                }),
            );
        }
    }, [id, dispatch]);

    const { allReferralGroups } = useSelector((state) => state.referralGroup);

    const finalReferralGroup = allReferralGroups
        ?.filter((commissionGroup) => commissionGroup?.catalogs?.some((catalogItem) => catalogItem._id === id))
        ?.map((item) => ({ name: item.name, id: item._id }));

    const { vendorsDropdown } = useSelector((state) => state.vendors);
    const { loading } = useSelector((state) => state?.loader?.isLoading);
    const handleSave = (tab) => {
        const ignore = ['commissionGroup'];
        if (showFormErrors(data, setData, ignore)) {
            if (id) {
                dispatch(editCatalogItem(id, data, history, tab));
            }
        }
    };

    return (
        <>
            <CustomCard col="12" title="General">
                <CustomGridLayout>
                    <CustomDropDown name="requireCommission" options={yesNoOptions} onChange={handleChange} data={data} />
                    <CustomDropDown name="commissionGroup" options={commissionGroupsDropdown} onChange={handleChange} data={data} />
                    <CustomDropDown name="referralGroup" options={finalReferralGroup} onChange={handleChange} data={data} />
                </CustomGridLayout>
            </CustomCard>
            <CustomCard col="12" title="Details">
                <CustomGridLayout>
                    <CustomDropDown name="memberRequired" options={yesNoOptions} onChange={handleChange} data={data} col={4} />
                    <CustomInputNumber name="caseQuantity" onChange={handleChange} data={data} col={4} />
                    <CustomDropDown name="vendor" options={vendorsDropdown} onChange={handleChange} data={data} col={4} />
                    <CustomInputNumber name="trackingMinimumQuantity" label="Minimum Quantity" onChange={handleChange} data={data} col={4} />
                    <CustomInputNumber name="trackingMaximumQuantity" label="Maximum Quantity" onChange={handleChange} data={data} col={4} />
                    <CustomInputNumber name="recorderLevel" onChange={handleChange} data={data} col={4} />
                    <CustomDropDown
                        name="trackingAlternateVendors"
                        label="Alternate Vendors"
                        options={vendorsDropdown}
                        onChange={handleChange}
                        data={data}
                        col={4}
                    />
                    <CustomInput name="alternateItem" onChange={handleChange} data={data} col={4} />
                    <CustomCalenderInput name="time" label="Date Created" data={data} disabled={true} />
                    <CustomTextArea name="note" maxLength="266" data={data} onChange={handleChange} inputClass="h-17rem" />
                    <CustomButtonGroup>
                        <PrimaryButton label="Save" className="mx-2" onClick={() => handleSave('')} loading={loading} />
                        <PrimaryButton label="Save & Next" className="mx-2" onClick={() => handleSave('?tab=usage')} loading={loading} />
                        <LightButton label="Cancel" onClick={() => history.goBack()} />
                    </CustomButtonGroup>
                </CustomGridLayout>
            </CustomCard>
        </>
    );
};

export default Tracking;
