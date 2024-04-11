import React, { useEffect, useState } from 'react';
import CustomCard, { CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import CustomLogoImage from '../../../../shared/Image/LogoImage';
import { CustomDropDown, CustomInput, CustomInputNumber, CustomInputSwitch } from '../../../../shared/Input/AllInputs';
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
import { PercentageDifference, showFormErrors } from '../../../../utils/commonFunctions';
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
        category: null,
        itemCaption: '',
        itemSold: '',
        itemRecurring: 'false',
        itemBeRedeemed: 'false',
        itemPurchasedOneTime: 'false',
        itemSoldOnline: 'false',
        productType: 'GENERAL',
        clubs: [],
        taxes: [],
        unitPrice: null,
        promptForPrice: 'false',
        allowDiscount: 'false',
        defaultDiscount: 'None',
        overRideDiscount: 'false',
        moreThan1: 0,
        moreThan2: 0,
        moreThan3: 0,
        unitPrice1: '',
        unitPrice2: '',
        unitPrice3: '',
        stockable: 'false',
        allowUnlimited: 'false',
        minimumQuantity: '',
        maximumQuantity: '',
        defaultQuantity: '',
        expiration: 'false',
        days: '',
        month: '',
        itemStart: '',
        isActive: true,
        wholesaleCost: '',
    });
    useEffect(() => {
        dispatch(getProfitCenters());
        dispatch(getCategories());
        dispatch(getClubs());
    }, [dispatch]);

    const { profitCenterDropdown } = useSelector((state) => state.profitCenter);
    let { categoryDropdown } = useSelector((state) => state.category);

    categoryDropdown = [...categoryDropdown, defaultDiscountOptions];

    let { clubsDropdown } = useSelector((state) => state.clubs);

    useEffect(() => {
        if (data?.unitPrice && data?.defaultQuantity) {
            setData((prev) => ({ ...prev, defaultPrice: data?.unitPrice * data?.defaultQuantity }));
        }
    }, [data?.unitPrice, data?.defaultQuantity]);

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
                        category: data.category ?? 'NONE',
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
                        isActive: data.isActive,
                        wholesaleCost: data.wholesaleCost,
                    });
                }),
            );
        }
    }, [id, dispatch]);

    const handleChange = ({ name, value }) => {
        const formErrors = formValidation(name, value, data);

        if (name === 'moreThan1') {
            setData((prev) => ({ ...prev, [name]: value, moreThan2: 0, moreThan3: 0 }));
        } else if (name === 'moreThan2') {
            setData((prev) => ({ ...prev, [name]: value, moreThan3: 0 }));
        } else {
            setData((prev) => ({ ...prev, [name]: value, formErrors }));
        }
    };

    const val1 = PercentageDifference(data?.wholesaleCost, data?.unitPrice1);
    const val2 = PercentageDifference(data?.wholesaleCost, data?.unitPrice2);
    const val3 = PercentageDifference(data?.wholesaleCost, data?.unitPrice3);

    const handleSave = (tab) => {
        let ignore = ['days'];
        if (showFormErrors(data, setData, ignore)) {
            if (id) {
                dispatch(editCatalogItem(id, data, history, tab));
            } else {
                dispatch(addCatalogItem(data, history, tab));
            }
        } else {
            const element = document.getElementById('main-content');
            element.scroll({
                top: 100,
                left: 100,
                behavior: 'smooth',
            });
        }
    };

    return (
        <div id="main-content">
            <CustomCard col="12" title="General">
                <CustomGridLayout extraClass="justify-content-end ">
                    <CustomInputSwitch name="isActive" data={data} onChange={handleChange} extraClassName="text-right" />
                </CustomGridLayout>
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
                    <CustomInputNumber prefix="$" name="unitPrice" onChange={handleChange} data={data} col={6} />
                    <CustomDropDown name="promptForPrice" options={yesNoOptions} onChange={handleChange} data={data} col={6} />
                    <CustomDropDown name="allowDiscount" options={yesNoOptions} onChange={handleChange} data={data} col={6} />
                    <CustomDropDown name="defaultDiscount" options={defaultDiscountOptions} onChange={handleChange} data={data} col={6} />
                    <CustomDropDown name="overRideDiscount" options={yesNoOptions} onChange={handleChange} data={data} col={6} />
                    <CustomInputNumber name="wholesaleCost" onChange={handleChange} data={data} col={6} prefix="$" />
                </CustomGridLayout>
            </CustomCard>
            <CustomCard col="12" title="Details">
                <CustomGridLayout>
                    <CustomDropDown name="allowUnlimited" options={yesNoOptions} onChange={handleChange} data={data} col={6} />
                    <CustomInputNumber name="minimumQuantity" onChange={handleChange} data={data} />
                    <CustomInputNumber name="maximumQuantity" onChange={handleChange} data={data} />
                    <CustomInputNumber name="defaultQuantity" onChange={handleChange} data={data} />
                    <CustomInputNumber name="defaultPrice" data={data} disabled={true} prefix="$" />
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
                    <CustomDropDown name="moreThan1" label="More Than" options={unitPricingOptions} onChange={handleChange} data={data} col={2} />
                    <div>
                        <CustomInputNumber name="unitPrice1" label="Unit Price" onChange={handleChange} data={data} prefix="$" />
                        {data?.wholesaleCost && (
                            <div className="text-center">
                                <span className=""> Markup:</span>
                                {data?.unitPrice1 ? val1 : 0}
                            </div>
                        )}
                    </div>
                    <CustomDropDown
                        name="moreThan2"
                        label="More Than"
                        options={unitPricingOptions?.filter((item) => item?.value > data?.moreThan1)}
                        onChange={handleChange}
                        data={data}
                        col={2}
                        disabled={!data?.moreThan1}
                    />
                    <div>
                        <CustomInputNumber name="unitPrice2" label="Unit Price" onChange={handleChange} data={data} prefix="$" />

                        {data?.wholesaleCost && (
                            <div className="text-center">
                                <span className=""> Markup:</span>
                                {data?.unitPrice2 ? val2 : 0}
                            </div>
                        )}
                    </div>

                    <CustomDropDown
                        name="moreThan3"
                        label="More Than"
                        options={unitPricingOptions?.filter((item) => item?.value > data?.moreThan2)}
                        onChange={handleChange}
                        data={data}
                        col={2}
                        disabled={!data?.moreThan1 || !data?.moreThan2}
                    />
                    <div>
                        <CustomInputNumber name="unitPrice3" label="Unit Price" onChange={handleChange} data={data} prefix="$" />
                        {data?.wholesaleCost && (
                            <div className="text-center">
                                <span className=""> Markup:</span>
                                {data?.unitPrice3 ? val3 : 0}
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
        </div>
    );
};

export default General;
