import React, { useEffect, useMemo, useState } from 'react';
import CustomCard, { CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import CustomLogoImage from '../../../../shared/Image/LogoImage';
import { CustomDropDown, CustomInput, CustomInputNumber } from '../../../../shared/Input/AllInputs';
import {
    catalogProductTypeOptions,
    daysOptions,
    defaultDiscountOptions,
    itemSoldOptions,
    itemStartOptions,
    monthOptions,
    productTypeOptions,
    unitPricingOptions,
    yesNoOptions,
} from '../../../../utils/dropdownConstants';
import { getProfitCenters } from '../../../../redux/actions/InventorySettings/profitCenterAction';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../../../redux/actions/InventorySettings/categoriesAction';
import { getClubs } from '../../../../redux/actions/BusinessSettings/clubsAction';
import CustomPickList from '../../../../shared/Input/CustomPickList';
import PrimaryButton, { CustomButtonGroup, LightButton } from '../../../../shared/Button/CustomButton';
import { useHistory, useParams } from 'react-router-dom';
import { showFormErrors } from '../../../../utils/commonFunctions';
import { addCatalogItem, editCatalogItem, getCatalogItem } from '../../../../redux/actions/InventorySettings/catalogItemsAction';
import formValidation from '../../../../utils/validations';

const General = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();
    const loading = useSelector((state) => state.loader.isLoading);
    const [data, setData] = useState({
        catalogImage: [],
        type: 'PRODUCT',
        name: '',
        upc: '',
        profitCentre: '',
        category: '',
        itemCaption: '',
        itemSold: 'POS_ONLY',
        itemRecurring: 'false',
        itemBeRedeemed: 'false',
        itemPurchasedOneTime: 'false',
        itemSoldOnline: 'false',
        productType: 'GENERAL',
        clubs: [],
        taxes: [],
        unitPrice: null,
        fixed: 'false',
        promptForPrice: 'false',
        allowDiscount: 'false',
        defaultDiscount: 'None',
        overRideDiscount: 'false',
        moreThan1: null,
        moreThan2: null,
        moreThan3: null,
        unitPrice1: null,
        unitPrice2: null,
        unitPrice3: null,
        stockable: 'false',
        allowUnlimited: 'false',
        minimumQuantity: '',
        maximumQuantity: '',
        defaultQuantity: '',
        expiration: 'false',
        days: '',
        month: '',
        itemStart: '',
    });
    useEffect(() => {
        dispatch(getProfitCenters());
        dispatch(getCategories());
        dispatch(getClubs());
    }, [dispatch]);

    const { profitCenterDropdown } = useSelector((state) => state.profitCenter);
    const { categoryDropdown } = useSelector((state) => state.category);
    let { clubsDropdown } = useSelector((state) => state.clubs);

    useEffect(() => {
        if (id) {
            dispatch(
                getCatalogItem(id, (data) => {
                    setData({
                        catalogImage: data.catalogImage ? [data.catalogImage] : [],
                        type: data.type,
                        name: data.name,
                        upc: data.upc,
                        profitCentre: data.profitCentre,
                        category: data.category,
                        itemCaption: data.itemCaption,
                        itemSold: data.itemSold,
                        itemRecurring: data.itemRecurring.toString(),
                        itemBeRedeemed: data.itemBeRedeemed.toString(),
                        itemPurchasedOneTime: data.itemPurchasedOneTime.toString(),
                        itemSoldOnline: data.itemSoldOnline,
                        productType: data.productType.toString(),
                        clubs: data.clubs,
                        taxes: data.taxes,
                        unitPrice: data.unitPrice,
                        fixed: data.fixed.toString(),
                        promptForPrice: data.promptForPrice.toString(),
                        allowDiscount: data.allowDiscount.toString(),
                        defaultDiscount: data.defaultDiscount,
                        overRideDiscount: data.overRideDiscount,
                        moreThan1: data.moreThan1,
                        moreThan2: data.moreThan2,
                        moreThan3: data.moreThan3,
                        unitPrice1: data.unitPrice1,
                        unitPrice2: data.unitPrice2,
                        unitPrice3: data.unitPrice3,
                        stockable: data.stockable,
                        allowUnlimited: data.allowUnlimited.toString(),
                        minimumQuantity: data.minimumQuantity,
                        maximumQuantity: data.maximumQuantity,
                        defaultQuantity: data.defaultQuantity,
                        expiration: data.expiration.toString(),
                        days: data.days,
                        month: data.month,
                        itemStart: data.itemStart,
                    });
                }),
            );
        }
    }, [id, dispatch]);

    const handleChange = ({ name, value }) => {
        const formErrors = formValidation(name, value, data);

        if (name === 'moreThan1') {
            setData((prev) => ({ ...prev, [name]: value, moreThan2: null, moreThan3: null }));
        } else if (name === 'moreThan2') {
            setData((prev) => ({ ...prev, [name]: value, moreThan3: null }));
        } else {
            setData((prev) => ({ ...prev, [name]: value, formErrors }));
        }
    };
    const usePercentageDifference = (previousValue, newValue) => {
        const percentageDifference = useMemo(() => {
            return ((newValue - previousValue) / previousValue) * 100;
        }, [previousValue, newValue]);

        return percentageDifference.toFixed(2);
    };

    const val1 = usePercentageDifference(data?.unitPrice, data?.unitPrice1);
    const val2 = usePercentageDifference(data?.unitPrice, data?.unitPrice2);
    const val3 = usePercentageDifference(data?.unitPrice, data?.unitPrice3);

    const handleSave = (tab) => {
        if (showFormErrors(data, setData)) {
            if (id) {
                dispatch(editCatalogItem(id, data, history, tab));
            } else {
                dispatch(addCatalogItem(data, history, tab));
            }
        }
    };

    console.log(data, unitPricingOptions);
    return (
        <>
            <CustomCard col="12" title="General">
                <CustomGridLayout>
                    <CustomLogoImage name="catalogImage" data={data} onFilesChange={handleChange} removeable col={12} />
                    <CustomDropDown name="type" options={catalogProductTypeOptions} onChange={handleChange} data={data} />
                    <CustomInput name="name" onChange={handleChange} data={data} />
                    <CustomInput name="upc" label="UPC" onChange={handleChange} data={data} />
                    <CustomDropDown name="profitCentre" options={profitCenterDropdown} onChange={handleChange} data={data} />
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
                    <CustomDropDown name="productType" options={productTypeOptions} onChange={handleChange} data={data} />
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
                    <CustomDropDown name="defaultDiscount" options={defaultDiscountOptions} onChange={handleChange} data={data} col={6} />
                    <CustomDropDown name="overRideDiscount" options={yesNoOptions} onChange={handleChange} data={data} col={6} />
                </CustomGridLayout>
            </CustomCard>
            <CustomCard col="12" title="Details">
                <CustomGridLayout>
                    <CustomDropDown name="allowUnlimited" options={yesNoOptions} onChange={handleChange} data={data} col={6} />
                    <CustomInputNumber name="minimumQuantity" onChange={handleChange} data={data} />
                    <CustomInputNumber name="maximumQuantity" onChange={handleChange} data={data} />
                    <CustomInputNumber name="defaultQuantity" onChange={handleChange} data={data} />
                    <CustomInputNumber name="defaultPrice" onChange={handleChange} data={data} />
                    <CustomDropDown name="stockable" options={yesNoOptions} onChange={handleChange} data={data} col={6} />
                    <CustomDropDown name="itemStart" options={itemStartOptions} onChange={handleChange} data={data} col={2} />
                    <CustomDropDown name="expiration" options={yesNoOptions} onChange={handleChange} data={data} col={4} />
                    {data?.expiration === 'true' && (
                        <>
                            <CustomDropDown name="days" options={daysOptions} onChange={handleChange} data={data} col={2} />
                            <CustomDropDown name="month" options={monthOptions} onChange={handleChange} data={data} col={2} />
                        </>
                    )}
                </CustomGridLayout>
            </CustomCard>
            <CustomCard col="12" title="Dynamic Pricing">
                <CustomGridLayout>
                    <CustomDropDown name="moreThan1" options={unitPricingOptions} onChange={handleChange} data={data} col={2} />
                    <div>
                        <CustomInputNumber name="unitPrice1" onChange={handleChange} data={data} />
                        {data?.unitPrice && (
                            <div className="text-center">
                                <span className="text-green"> Markup:</span>
                                {val1}
                            </div>
                        )}
                    </div>
                    <CustomDropDown
                        name="moreThan2"
                        options={unitPricingOptions?.filter((item) => item?.value > data?.moreThan1)}
                        onChange={handleChange}
                        data={data}
                        col={2}
                        disabled={!data?.moreThan1}
                    />
                    <div>
                        <CustomInputNumber name="unitPrice2" onChange={handleChange} data={data} />

                        {data?.unitPrice && (
                            <div className="text-center">
                                <span className="text-green"> Markup:</span>
                                {val2}
                            </div>
                        )}
                    </div>

                    <CustomDropDown
                        name="moreThan3"
                        options={unitPricingOptions?.filter((item) => item?.value > data?.moreThan2)}
                        onChange={handleChange}
                        data={data}
                        col={2}
                        disabled={!data?.moreThan1 || !data?.moreThan2}
                    />
                    <div>
                        <CustomInputNumber name="unitPrice3" onChange={handleChange} data={data} />
                        {data?.unitPrice && (
                            <div className="text-center">
                                <span className="text-green"> Markup:</span>
                                {val3}
                            </div>
                        )}
                    </div>
                    <CustomButtonGroup>
                        <PrimaryButton label="Save" className="mx-2" onClick={() => handleSave('')} loading={loading} />
                        <PrimaryButton label="Save & Next" className="mx-2" onClick={() => handleSave('?tab=tracking')} loading={loading} />
                        <LightButton label="Cancel" onClick={() => history.goBack()} />
                    </CustomButtonGroup>
                </CustomGridLayout>
            </CustomCard>
        </>
    );
};

export default General;
