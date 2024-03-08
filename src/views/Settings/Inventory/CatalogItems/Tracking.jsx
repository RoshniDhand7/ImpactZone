import React, { useState, useEffect } from 'react';
import { getReferralGroups } from '../../../../redux/actions/InventorySettings/referralGroupAction';
import { useDispatch, useSelector } from 'react-redux';
import CustomPicker from '../../../../shared/ColorPicker/ColorPicker';
import { CustomCalenderInput, CustomDropDown, CustomInputNumber, CustomTextArea } from '../../../../shared/Input/AllInputs';
import CustomCard, { CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import { getVendors } from '../../../../redux/actions/InventorySettings/vendorsAction';
import { getCommissionGroups } from '../../../../redux/actions/InventorySettings/commissionGroupAction';
import { trackSizes, yesNoOptions } from '../../../../utils/dropdownConstants';
import PrimaryButton, { CustomButtonGroup, LightButton } from '../../../../shared/Button/CustomButton';
import { useHistory, useParams } from 'react-router-dom';
import { showFormErrors } from '../../../../utils/commonFunctions';
import { editCatalogItem, getCatalogItem } from '../../../../redux/actions/InventorySettings/catalogItemsAction';

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
        size: '',
        color: '',
        vendor: '',
        trackingMinimumQuantity: '',
        trackingMaximumQuantity: '',
        recorderLevel: '',
        wholesaleCost: '',
        trackingAlternateVendors: '',
        time: new Date(),
        note: '',
    });

    const handleChange = ({ name, value }) => {
        setData((prev) => ({ ...prev, [name]: value }));
    };
    useEffect(() => {
        dispatch(getCommissionGroups());
        dispatch(getReferralGroups());
        dispatch(getVendors());
    }, [dispatch]);

    useEffect(() => {
        if (id) {
            dispatch(
                getCatalogItem(id, (data) => {
                    setData({
                        requireCommission: data.requireCommission.toString(),
                        commissionGroup: data.commissionGroup,
                        referralGroup: data.referralGroup,
                        memberRequired: data.memberRequired.toString(),
                        caseQuantity: data.caseQuantity,
                        size: data.size,
                        color: data.color,
                        vendor: data.vendor,
                        trackingMinimumQuantity: data.trackingMinimumQuantity,
                        trackingMaximumQuantity: data.trackingMaximumQuantity,
                        recorderLevel: data.recorderLevel,
                        wholesaleCost: data.wholesaleCost,
                        trackingAlternateVendors: data.trackingAlternateVendors,
                        time: data.createdAt ? new Date(data.createdAt) : new Date(),
                        note: data.note,
                    });
                }),
            );
        }
    }, [id, dispatch]);

    const { commissionGroupsDropdown } = useSelector((state) => state.commissionGroup);
    const { referralGroupDropdown } = useSelector((state) => state.referralGroup);
    const { vendorsDropdown } = useSelector((state) => state.vendors);
    const { loading } = useSelector((state) => state?.loader?.isLoading);
    const handleSave = (tab) => {
        if (showFormErrors(data, setData)) {
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
                    <CustomDropDown name="referralGroup" options={referralGroupDropdown} onChange={handleChange} data={data} />
                </CustomGridLayout>
            </CustomCard>
            <CustomCard col="12" title="Details">
                <CustomGridLayout>
                    <CustomDropDown name="memberRequired" options={yesNoOptions} onChange={handleChange} data={data} />
                    <CustomInputNumber name="caseQuantity" onChange={handleChange} data={data} col={4} />
                    <CustomDropDown name="size" options={trackSizes} onChange={handleChange} data={data} />
                    <CustomPicker name="color" data={data} onChange={handleChange} col={1} />
                    <CustomDropDown name="vendor" options={vendorsDropdown} onChange={handleChange} data={data} col={3} />
                    <CustomInputNumber name="trackingMinimumQuantity" onChange={handleChange} data={data} col={3} />
                    <CustomInputNumber name="trackingMaximumQuantity" onChange={handleChange} data={data} col={3} />
                    <CustomInputNumber name="recorderLevel" onChange={handleChange} data={data} col={2} />
                    <CustomInputNumber name="wholesaleCost" onChange={handleChange} data={data} col={4} />
                    <CustomDropDown name="trackingAlternateVendors" options={vendorsDropdown} onChange={handleChange} data={data} col={4} />
                    <CustomCalenderInput name="time" data={data} disabled={true} />
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
