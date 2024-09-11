import React, { useEffect, useMemo, useState } from 'react';
import CustomCard, { CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import CustomLogoImage from '../../../../shared/Image/LogoImage';
import {
    CustomCheckbox,
    CustomDropDown,
    CustomField,
    CustomInput,
    CustomInputNumber,
    CustomInputSwitch,
    CustomMultiselect,
} from '../../../../shared/Input/AllInputs';
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
import CustomPickList from '../../../../shared/Input/CustomPickList';
import PrimaryButton, { CustomButtonGroup, LightButton } from '../../../../shared/Button/CustomButton';
import { useHistory, useParams } from 'react-router-dom';
import { showFormErrors } from '../../../../utils/commonFunctions';
import { addCatalogItem, editCatalogItem, getCatalogItem } from '../../../../redux/actions/InventorySettings/catalogItemsAction';
import formValidation from '../../../../utils/validations';
import { getTaxes } from '../../../../redux/actions/PosSettings/tax';
import { getDiscountTypes } from '../../../../redux/actions/PosSettings/discountType';
import { getTags } from '../../../../redux/actions/InventorySettings/tagAction';
import { getFilterSets } from '../../../../redux/actions/InventorySettings/filterSetsAction';
import useGetClubs from '../../../../hooks/useGetClubs';
import { calculateNetAmount, percentageDifference } from '../../../../utils/taxHelpers';

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
        itemRecurring: false,
        itemBeRedeemed: false,
        itemPurchasedOneTime: false,
        itemSoldOnline: false,
        productType: 'GENERAL',
        clubs: [],
        taxes: [],
        unitPrice: null,
        promptForPrice: false,
        allowDiscount: false,
        defaultDiscount: null,
        overRideDiscount: false,
        moreThan1: 0,
        moreThan2: 0,
        moreThan3: 0,
        unitPrice1: '',
        unitPrice2: '',
        unitPrice3: '',
        stockable: false,
        allowUnlimited: false,
        minimumQuantity: 1,
        maximumQuantity: 0,
        defaultQuantity: 1,
        expiration: false,
        days: '',
        month: '',
        itemStart: '',
        isActive: true,
        wholesaleCost: '',
        filterSet: [],
        tags: [],
    });
    useEffect(() => {
        dispatch(getProfitCenters());
        dispatch(getCategories());
        dispatch(getTaxes());
        dispatch(getDiscountTypes());
        dispatch(getFilterSets());
        dispatch(getTags());
    }, [dispatch]);

    const { filterSetDropDown } = useSelector((state) => state.filterSet);
    const { tagsDropDown } = useSelector((state) => state.tags);
    const { profitCenterDropdown } = useSelector((state) => state.profitCenter);
    let { categoryDropdown } = useSelector((state) => state.category);
    let { allDiscountDropdown } = useSelector((state) => state.discountType);

    categoryDropdown = [...categoryDropdown, ...defaultDiscountOptions];
    allDiscountDropdown = [...allDiscountDropdown, ...defaultDiscountOptions];

    const { clubsDropdown } = useGetClubs();
    const { allTaxActiveDropdown, allTaxes } = useSelector((state) => state.taxes);

    // useEffect(() => {
    //     if (data?.minimumQuantity && data?.maximumQuantity) {
    //         let newFormErrors = { ...data.formErrors };

    //         if (data.minimumQuantity >= data.maximumQuantity) {
    //             newFormErrors['minimumQuantity'] = 'Minimum Quantity must be less than Maximum Quantity';
    //             newFormErrors['maximumQuantity'] = 'Maximum Quantity must be greater than Minimum Quantity';
    //         } else {
    //             newFormErrors['minimumQuantity'] = '';
    //             newFormErrors['maximumQuantity'] = '';
    //         }

    //         if (data.defaultQuantity < data.minimumQuantity) {
    //             newFormErrors['defaultQuantity'] = 'Default Quantity must be greater than or equal to Minimum Quantity';
    //         } else if (data.defaultQuantity > data.maximumQuantity) {
    //             newFormErrors['defaultQuantity'] = 'Default Quantity must be less than or equal to Maximum Quantity';
    //         } else {
    //             newFormErrors['defaultQuantity'] = '';
    //         }

    //         setData((prev) => ({ ...prev, formErrors: newFormErrors }));
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [data?.maximumQuantity, data?.minimumQuantity, data.defaultQuantity]);

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
                        category: data.category ?? 'None',
                        itemCaption: data.itemCaption,
                        itemSold: data.itemSold,
                        itemRecurring: data.itemRecurring,
                        itemBeRedeemed: data.itemBeRedeemed,
                        itemPurchasedOneTime: data.itemPurchasedOneTime,
                        itemSoldOnline: data.itemSoldOnline,
                        productType: data.productType,
                        clubs: data.clubs,
                        taxes: data.taxes,
                        unitPrice: data.unitPrice,
                        promptForPrice: data.promptForPrice,
                        allowDiscount: data.allowDiscount,
                        defaultDiscount: data.defaultDiscount ?? 'None',
                        overRideDiscount: data.overRideDiscount,
                        moreThan1: data.moreThan1,
                        moreThan2: data.moreThan2,
                        moreThan3: data.moreThan3,
                        unitPrice1: data.unitPrice1,
                        unitPrice2: data.unitPrice2,
                        unitPrice3: data.unitPrice3,
                        stockable: data.stockable,
                        allowUnlimited: data.allowUnlimited,
                        minimumQuantity: data.minimumQuantity,
                        maximumQuantity: data.maximumQuantity,
                        defaultQuantity: data.defaultQuantity,
                        expiration: data.expiration,
                        days: data.days,
                        month: data.month,
                        itemStart: data.itemStart,
                        isActive: data.isActive,
                        wholesaleCost: data.wholesaleCost,
                        filterSet: data.filterSet,
                        tags: data.tags,
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

    const handleSave = (tab) => {
        let ignore = [];
        if (!data?.allowDiscount) {
            ignore = ['days', 'defaultDiscount'];
        } else {
            ignore = ['days'];
        }
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

    const netPrice = useMemo(() => {
        if (data?.unitPrice) {
            if (data?.taxes.length) {
                let _totalTax = allTaxes.filter((tax) => data?.taxes?.includes(tax._id)).reduce((total, tax) => total + tax.taxRatePercentage, 0);
                return calculateNetAmount(data?.unitPrice, _totalTax);
            } else {
                return data?.unitPrice;
            }
        } else {
            return 0;
        }
    }, [data, allTaxes]);

    const defaultPrice = useMemo(() => {
        if (data?.unitPrice && data?.defaultQuantity) {
            return data?.unitPrice * data?.defaultQuantity;
        } else {
            return 0;
        }
    }, [data?.unitPrice, data?.defaultQuantity]);

    const getMarkup = (val) => {
        if (data?.wholesaleCost) {
            const _diff = percentageDifference(data?.wholesaleCost, val);
            return (
                <>
                    {_diff > 0 ? (
                        <span className="text-green">{_diff.toFixed(2) + '%'}</span>
                    ) : _diff < 0 ? (
                        <span className="text-red">{_diff.toFixed(2) + '%'}</span>
                    ) : (
                        <span>{_diff.toFixed(2) + '%'}</span>
                    )}
                </>
            );
        } else {
            return null;
        }
    };

    return (
        <div id="main-content">
            <CustomCard col="12" title="General">
                <CustomGridLayout>
                    <CustomLogoImage name="catalogImage" data={data} onFilesChange={handleChange} removeable col={12} />
                    <CustomDropDown name="type" options={catalogProductTypeOptions} onChange={handleChange} data={data} />
                    <CustomInput name="name" onChange={handleChange} data={data} required />
                    <CustomInputNumber name="upc" label="UPC" onChange={handleChange} data={data} col={4} required />
                    <CustomDropDown name="profitCentre" options={profitCenterDropdown} onChange={handleChange} data={data} required />

                    <CustomInput name="itemCaption" onChange={handleChange} data={data} required />
                    <CustomDropDown name="itemSold" label="How is this item sold?" options={itemSoldOptions} onChange={handleChange} data={data} required />
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
                    <CustomInputSwitch name="isActive" data={data} onChange={handleChange} />
                </CustomGridLayout>
            </CustomCard>
            <CustomCard col="12" title="Display">
                <CustomGridLayout>
                    <CustomDropDown name="category" options={categoryDropdown} onChange={handleChange} data={data} required />
                    <CustomMultiselect name="filterSet" options={filterSetDropDown} onChange={handleChange} data={data} />
                    <CustomMultiselect name="tags" options={tagsDropDown} onChange={handleChange} data={data} />
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
                <CustomPickList name="taxes" selected={data?.taxes} sourceData={allTaxActiveDropdown} onPickListChange={handleChange} />
            </CustomCard>
            <CustomCard col="12" title="Pricing">
                <CustomGridLayout>
                    <CustomInputNumber prefix="$" data={data} onChange={handleChange} name="wholesaleCost" />
                    <CustomInputNumber prefix="$" data={data} onChange={handleChange} name="unitPrice" required />
                    <CustomInputNumber prefix="$" value={netPrice} name="netPrice" disabled />

                    <CustomDropDown data={data} onChange={handleChange} name="allowDiscount" options={yesNoOptions} />
                    {data?.allowDiscount && <CustomDropDown data={data} onChange={handleChange} name="defaultDiscount" options={allDiscountDropdown} />}
                    <CustomDropDown data={data} onChange={handleChange} name="overRideDiscount" options={yesNoOptions} />
                </CustomGridLayout>
            </CustomCard>
            <CustomCard col="12" title="Details">
                <CustomGridLayout>
                    <CustomInputNumber onChange={handleChange} data={data} required name="minimumQuantity" />
                    {!data?.allowUnlimited && <CustomInputNumber onChange={handleChange} data={data} required name="maximumQuantity" col={2} />}
                    <CustomCheckbox
                        onChange={handleChange}
                        data={data}
                        name="allowUnlimited"
                        label="Allow Unlimited (No Max Qty.)"
                        col={2}
                        extraClassName="my-auto"
                    />
                    <CustomInputNumber onChange={handleChange} data={data} required name="defaultQuantity" />

                    <CustomInputNumber name="defaultPrice" value={defaultPrice} disabled={true} prefix="$" />
                    <CustomDropDown name="stockable" options={yesNoOptions} onChange={handleChange} data={data} />
                    <CustomDropDown name="itemStart" options={itemStartOptions} onChange={handleChange} data={data} />
                    <CustomDropDown name="expiration" options={yesNoOptions} onChange={handleChange} data={data} col={4} />
                    {data?.expiration && (
                        <>
                            <CustomDropDown name="days" options={daysOptions} onChange={handleChange} data={data} col={2} />
                            <CustomDropDown name="month" options={monthOptions} onChange={handleChange} data={data} col={2} />
                        </>
                    )}
                </CustomGridLayout>
            </CustomCard>
            <CustomCard col="12" title="Dynamic Pricing">
                <CustomGridLayout>
                    <CustomDropDown name="moreThan1" label="More Than" options={unitPricingOptions} onChange={handleChange} data={data} col={1} />
                    <CustomInputNumber name="unitPrice1" label="Unit Price" onChange={handleChange} data={data} prefix="$" col={2} />
                    {data?.wholesaleCost && <CustomField label="Markup">{getMarkup(data?.unitPrice1)}</CustomField>}

                    {data?.moreThan1 ? (
                        <>
                            <CustomDropDown
                                name="moreThan2"
                                label="More Than"
                                options={unitPricingOptions?.filter((item) => item?.value > data?.moreThan1)}
                                onChange={handleChange}
                                data={data}
                                col={1}
                            />
                            <CustomInputNumber name="unitPrice2" label="Unit Price" onChange={handleChange} data={data} prefix="$" col={2} />
                            {data?.wholesaleCost && <CustomField label="Markup">{getMarkup(data?.unitPrice2)}</CustomField>}
                        </>
                    ) : null}

                    {data?.moreThan1 && data?.moreThan2 ? (
                        <>
                            <CustomDropDown
                                name="moreThan3"
                                label="More Than"
                                options={unitPricingOptions?.filter((item) => item?.value > data?.moreThan2)}
                                onChange={handleChange}
                                data={data}
                                col={1}
                            />
                            <CustomInputNumber name="unitPrice3" label="Unit Price" onChange={handleChange} data={data} prefix="$" col={2} />
                            {data?.wholesaleCost && <CustomField label="Markup">{getMarkup(data?.unitPrice3)}</CustomField>}
                        </>
                    ) : null}

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
