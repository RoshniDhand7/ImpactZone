import React, { useEffect, useState } from 'react';
import CustomCard, { CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import CustomLogoImage from '../../../../shared/Image/LogoImage';
import { CustomDropDown, CustomInput, CustomInputNumber } from '../../../../shared/Input/AllInputs';
import { catalogProductTypeOptions, itemSoldOptions, productTypeOptions, yesNoOptions } from '../../../../utils/dropdownConstants';
import { getProfitCenters } from '../../../../redux/actions/InventorySettings/profitCenterAction';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../../../redux/actions/InventorySettings/categoriesAction';
import { getClubs } from '../../../../redux/actions/BusinessSettings/clubsAction';
import CustomPickList from '../../../../shared/Input/CustomPickList';

const General = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState({
        image: [],
        type: '',
        name: '',
        upc: '',
        profitCenter: '',
        category: '',
        itemCaption: '',
        itemSold: 'POS_ONLY',
        itemRecurring: '',
        itemBeRedeemed: '',
        productType: '',
        clubs: [],
        taxes: [],
    });
    useEffect(() => {
        dispatch(getProfitCenters());
        dispatch(getCategories());
        dispatch(getClubs());
    }, [dispatch]);

    const { profitCenterDropdown } = useSelector((state) => state.profitCenter);
    const { categoryDropdown } = useSelector((state) => state.category);
    let { clubsDropdown } = useSelector((state) => state.clubs);

    const handleChange = ({ name, value }) => {
        setData((prev) => ({ ...prev, [name]: value }));
    };
    return (
        <>
            <CustomCard col="12" title="General">
                <CustomGridLayout>
                    <CustomLogoImage name="image" data={data} onFilesChange={handleChange} removeable col={12} />
                    <CustomDropDown name="type" options={catalogProductTypeOptions} onChange={handleChange} data={data} />
                    <CustomInput name="name" onChange={handleChange} data={data} />
                    <CustomInput name="upc" label="UPC" onChange={handleChange} data={data} />
                    <CustomDropDown name="profitCenter" options={profitCenterDropdown} onChange={handleChange} data={data} />
                    <CustomDropDown name="category" options={categoryDropdown} onChange={handleChange} data={data} />
                    <CustomInput name="itemCaption" onChange={handleChange} data={data} />
                    <CustomDropDown name="itemSold" label="How is this item sold?" options={itemSoldOptions} onChange={handleChange} data={data} />
                    <CustomDropDown name="itemRecurring" label="Is this item Recurring" options={yesNoOptions} onChange={handleChange} data={data} />
                    <CustomDropDown
                        name="itemPurchasedOneTime"
                        label="Can this item only be purchased 1 time"
                        options={yesNoOptions}
                        onChange={handleChange}
                        data={data}
                    />
                    <CustomDropDown
                        name="itemBeRedeemed"
                        label="Can this item be rendered at a later date"
                        options={yesNoOptions}
                        onChange={handleChange}
                        data={data}
                    />
                    <CustomDropDown name="itemSoldOnline" label="Is this item sold online" options={yesNoOptions} onChange={handleChange} data={data} />
                </CustomGridLayout>
            </CustomCard>
            <CustomCard col="12" title="Product Settings">
                <CustomGridLayout>
                    <CustomDropDown name="productType " options={productTypeOptions} onChange={handleChange} data={data} />
                </CustomGridLayout>
            </CustomCard>
            <CustomCard col="12" title="Clubs">
                <CustomPickList name="clubs" selected={data?.clubs} sourceData={clubsDropdown} onPickListChange={handleChange} />
            </CustomCard>
            <CustomCard col="12" title="Taxes">
                <CustomPickList name="taxes" selected={data?.taxes} sourceData={[]} onPickListChange={handleChange} />
            </CustomCard>
            <CustomCard col="12" title="Pricing">
                <CustomGridLayout>
                    <CustomInputNumber name="unitPrice" onChange={handleChange} data={data} col={6} />
                    <CustomDropDown name="fixed" options={yesNoOptions} onChange={handleChange} data={data} col={6} />
                    <CustomDropDown name="promptForPrice" options={yesNoOptions} onChange={handleChange} data={data} col={6} />
                    <CustomDropDown name="allowDiscount" options={yesNoOptions} onChange={handleChange} data={data} col={6} />
                </CustomGridLayout>
            </CustomCard>
            <CustomCard col="12" title="Details">
                <CustomGridLayout>
                    <CustomDropDown name="allowUnlimited" options={yesNoOptions} onChange={handleChange} data={data} />
                    <CustomInputNumber name="minimumQuantity" onChange={handleChange} data={data} />
                    <CustomInputNumber name="maximumQuantity" onChange={handleChange} data={data} />
                    <CustomInputNumber name="defaultQuantity" onChange={handleChange} data={data} />
                    <CustomInputNumber name="defaultPrice" onChange={handleChange} data={data} />
                </CustomGridLayout>
            </CustomCard>
        </>
    );
};

export default General;
