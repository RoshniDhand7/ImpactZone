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
import { useDispatch, useSelector } from 'react-redux';
import CustomPickList from '../../../../shared/Input/CustomPickList';
import PrimaryButton, { CustomButtonGroup, LightButton } from '../../../../shared/Button/CustomButton';
import { useHistory, useParams } from 'react-router-dom';
import { showFormErrors } from '../../../../utils/commonFunctions';
import formValidation from '../../../../utils/validations';

import useGetClubs from '../../../../hooks/useGetClubs';
import { calculateFinalAmount, calculateNetAmount, percentageDifference } from '../../../../utils/taxHelpers';
import { addCatalogItem, editCatalogItem } from '../../../../redux/actions/Settings/InventorySetup/catalogItemsAction';

const General = ({ editItem }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();
    const loading = useSelector((state) => state.loader.isLoading);
    const [data, setData] = useState({
        catalogImage: [],
        type: 'PRODUCT',
        name: '',
        upc: '',
        profitCenter: '',
        itemCaption: '',
        itemSold: '',
        isRecurring: false,
        isOneTimePurchaseable: false,
        isRedeemable: false,
        isSoldOnline: false,
        isActive: true,
        category: '',
        productType: 'GENERAL',
        clubs: [],
        taxes: [],
        wholesaleCost: '',
        netPrice: 0,
        unitPrice: 0,
        defaultPrice: 0,
        allowDiscount: false,
        defaultDiscount: null,
        overrideDiscount: false,
        minimumQuantity: 1,
        defaultQuantity: 1,
        maximumQuantity: 1,
        allowUnlimited: false,
        isStockable: false,
        itemStart: 'NONE',
        expiration: false,
        days: '',
        month: '',
        moreThan1: 0,
        unitDiscount1: 0,
        moreThan2: 0,
        unitDiscount2: 0,
        moreThan3: 0,
        unitDiscount3: 0,
        filterSet: [],
        tags: [],
    });

    const { filterSetDropDown } = useSelector((state) => state.filterSet);
    const { tagsDropDown } = useSelector((state) => state.tags);
    const { profitCenterDropdown } = useSelector((state) => state.profitCenter);
    let { categoryDropdown } = useSelector((state) => state.category);
    let { allDiscountDropdown } = useSelector((state) => state.discountType);

    categoryDropdown = [...categoryDropdown, ...defaultDiscountOptions];
    allDiscountDropdown = [...allDiscountDropdown, ...defaultDiscountOptions];

    const { clubsDropdown } = useGetClubs();
    const { allTaxDropdown, allTaxes } = useSelector((state) => state.taxes);

    useEffect(() => {
        if (editItem) {
            setData({
                catalogImage: editItem.catalogImage,
                type: editItem.type,
                name: editItem.name,
                upc: editItem.upc,
                profitCenter: editItem.profitCenter,
                itemCaption: editItem.itemCaption,
                itemSold: editItem.itemSold,
                isRecurring: editItem.isRecurring,
                isOneTimePurchaseable: editItem.isOneTimePurchaseable,
                isRedeemable: editItem.isRedeemable,
                isSoldOnline: editItem.isSoldOnline,
                isActive: editItem.isActive,
                category: editItem.category,
                productType: editItem.productType,
                clubs: editItem.clubs,
                taxes: editItem.taxes,
                wholesaleCost: editItem.wholesaleCost,
                netPrice: editItem.netPrice,
                unitPrice: editItem.unitPrice,
                defaultPrice: editItem.defaultPrice,
                allowDiscount: editItem.allowDiscount,
                defaultDiscount: editItem.allowDiscount ? editItem.defaultDiscount || 'NONE' : data.defaultDiscount,
                overrideDiscount: editItem.overrideDiscount,
                minimumQuantity: editItem.minimumQuantity,
                defaultQuantity: editItem.defaultQuantity,
                maximumQuantity: editItem.maximumQuantity,
                allowUnlimited: editItem.allowUnlimited,
                isStockable: editItem.isStockable,
                itemStart: editItem.itemStart,
                expiration: editItem.expiration,
                days: editItem.days,
                month: editItem.month,
                moreThan1: editItem.moreThan1,
                unitDiscount1: editItem.unitDiscount1,
                moreThan2: editItem.moreThan2,
                unitDiscount2: editItem.unitDiscount2,
                moreThan3: editItem.moreThan3,
                unitDiscount3: editItem.unitDiscount3,
                filterSet: editItem.filterSet,
                tags: editItem.tags,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editItem]);

    //Net Price, Unit price and taxs calculations
    let _totalTax = useMemo(
        () => allTaxes.filter((tax) => data?.taxes?.includes(tax._id)).reduce((total, tax) => total + tax.taxRatePercentage, 0),
        [allTaxes, data?.taxes],
    );
    useEffect(() => {
        handlePriceChange({ name: 'netPrice', value: data?.netPrice });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [_totalTax]);
    const handlePriceChange = ({ name, value }) => {
        const formErrors = formValidation(name, value, data);
        let netPrice = 0;
        let unitPrice = 0;
        if (name === 'netPrice') {
            netPrice = value;
            unitPrice = calculateFinalAmount(netPrice, _totalTax);
            setData((prev) => ({ ...prev, netPrice, unitPrice, formErrors }));
        }
        if (name === 'unitPrice') {
            unitPrice = value;
            netPrice = calculateNetAmount(unitPrice, _totalTax);
            setData((prev) => ({ ...prev, netPrice, unitPrice, formErrors }));
        }
    };
    // .........................................

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

        if (showFormErrors(data, setData, [...ignore, 'commissionGroup', 'variationName'])) {
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

    // Minimum, Maximum, and Default Quantity

    const handleQuantityChange = ({ name }) => {
        let { defaultQuantity, minimumQuantity, maximumQuantity, allowUnlimited } = data;
        if (name === 'minimumQuantity') {
            if (defaultQuantity < minimumQuantity) {
                defaultQuantity = minimumQuantity;
            }
            if (maximumQuantity < minimumQuantity) {
                maximumQuantity = minimumQuantity;
            }
        }
        if (name === 'defaultQuantity') {
            if (minimumQuantity > defaultQuantity) {
                minimumQuantity = defaultQuantity;
            }
            if (maximumQuantity < defaultQuantity) {
                maximumQuantity = defaultQuantity;
            }
        }
        if (name === 'maximumQuantity' && !allowUnlimited) {
            if (minimumQuantity > maximumQuantity) {
                minimumQuantity = maximumQuantity;
            }
            if (defaultQuantity > maximumQuantity) {
                defaultQuantity = maximumQuantity;
            }
        }
        setData((prev) => ({ ...prev, maximumQuantity, defaultQuantity, minimumQuantity }));
    };
    const handleQuantity = ({ name, value }) => {
        setData((prev) => ({ ...prev, [name]: value }));
    };
    useEffect(() => {
        let defaultPrice = 0;
        if (data?.unitPrice && data?.defaultQuantity) {
            defaultPrice = data?.unitPrice * data?.defaultQuantity;
        }
        setData((prev) => ({ ...prev, defaultPrice }));
    }, [data?.unitPrice, data?.defaultQuantity]);

    const getMarkup = (val) => {
        if (data?.wholesaleCost && val) {
            const _diff = percentageDifference(data?.wholesaleCost, data?.netPrice - val);
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
                    <CustomDropDown name="type" options={catalogProductTypeOptions} onChange={handleChange} data={data} disabled={id} />
                    <CustomInput name="name" onChange={handleChange} data={data} required />
                    <CustomInputNumber name="upc" label="UPC" onChange={handleChange} data={data} col={4} required />
                    <CustomDropDown name="profitCenter" options={profitCenterDropdown} onChange={handleChange} data={data} required />

                    <CustomInput name="itemCaption" onChange={handleChange} data={data} required />
                    <CustomDropDown name="itemSold" label="How is this item sold?" options={itemSoldOptions} onChange={handleChange} data={data} required />
                    <CustomDropDown name="isRecurring" label="Is this item Recurring?" options={yesNoOptions} onChange={handleChange} data={data} />
                    <CustomDropDown
                        name="isOneTimePurchaseable"
                        label="Can this item only be purchased 1 time?"
                        options={yesNoOptions}
                        onChange={handleChange}
                        data={data}
                    />
                    <CustomDropDown
                        name="isRedeemable"
                        label="Can this item be rendered at a later date?"
                        options={yesNoOptions}
                        onChange={handleChange}
                        data={data}
                    />
                    <CustomDropDown name="isSoldOnline" label="Is this item sold online?" options={yesNoOptions} onChange={handleChange} data={data} />
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
                <CustomPickList
                    name="clubs"
                    selected={data?.clubs}
                    sourceData={clubsDropdown}
                    onPickListChange={handleChange}
                    errorMessage={data?.formErrors?.['clubs']}
                />
            </CustomCard>
            <CustomCard col="12" title="Taxes">
                <CustomPickList name="taxes" selected={data?.taxes} sourceData={allTaxDropdown} onPickListChange={handleChange} />
            </CustomCard>
            <CustomCard col="12" title="Pricing">
                <CustomGridLayout>
                    <CustomInputNumber prefix="$" data={data} onChange={handleChange} name="wholesaleCost" />
                    <CustomInputNumber prefix="$" data={data} onChange={handlePriceChange} name="netPrice" required />
                    <CustomInputNumber prefix="$" data={data} onChange={handlePriceChange} name="unitPrice" required />

                    <CustomDropDown data={data} onChange={handleChange} name="allowDiscount" options={yesNoOptions} clearIcon />
                    {data?.allowDiscount && <CustomDropDown data={data} onChange={handleChange} name="defaultDiscount" options={allDiscountDropdown} />}
                    <CustomDropDown data={data} onChange={handleChange} name="overrideDiscount" options={yesNoOptions} />
                </CustomGridLayout>
            </CustomCard>
            <CustomCard col="12" title="Details">
                <CustomGridLayout>
                    <CustomInputNumber onChange={handleQuantity} onBlur={handleQuantityChange} data={data} required name="minimumQuantity" />
                    <CustomInputNumber onChange={handleQuantity} onBlur={handleQuantityChange} data={data} required name="defaultQuantity" />
                    {!data?.allowUnlimited && (
                        <CustomInputNumber onChange={handleQuantity} onBlur={handleQuantityChange} data={data} required name="maximumQuantity" col={2} />
                    )}
                    <CustomCheckbox
                        onChange={handleChange}
                        data={data}
                        name="allowUnlimited"
                        label="Allow Unlimited (No Max Qty.)"
                        col={2}
                        extraClassName="my-auto"
                    />

                    <CustomInputNumber name="defaultPrice" data={data} disabled={true} prefix="$" />
                    <CustomDropDown name="isStockable" options={yesNoOptions} onChange={handleChange} data={data} />
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
                    <CustomInputNumber name="unitDiscount1" label="Unit Discount" onChange={handleChange} data={data} prefix="$" col={2} />
                    {data?.wholesaleCost && <CustomField label="Markup">{getMarkup(data?.unitDiscount1)}</CustomField>}

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
                            <CustomInputNumber name="unitDiscount2" label="Unit Discount" onChange={handleChange} data={data} prefix="$" col={2} />
                            {data?.wholesaleCost && <CustomField label="Markup">{getMarkup(data?.unitDiscount2)}</CustomField>}
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
                            <CustomInputNumber name="unitDiscount3" label="Unit Discount" onChange={handleChange} data={data} prefix="$" col={2} />
                            {data?.wholesaleCost && <CustomField label="Markup">{getMarkup(data?.unitDiscount3)}</CustomField>}
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
