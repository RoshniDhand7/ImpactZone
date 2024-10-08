import React, { useEffect, useState } from 'react';
import { getCatalogItems } from '../../redux/actions/InventorySettings/catalogItemsAction';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../redux/actions/InventorySettings/categoriesAction';
import { getFilterSets } from '../../redux/actions/InventorySettings/filterSetsAction';
import { getTags } from '../../redux/actions/InventorySettings/tagAction';
import SearchByItem from './SearchByItem';
import CategoryFilter from './CategoryFilter';
import CatalogItemsView from './CatalogItemsView';
import MembersToSellItem from './MembersToSellItem';
import NewCart from './NewCart';
import { CustomDropDown } from '../../shared/Input/AllInputs';
import CustomDialog from '../../shared/Overlays/CustomDialog';
import { processCatalogItems, showFormErrors } from '../../utils/commonFunctions';
import formValidation from '../../utils/validations';

export default function PointOfSale() {
    const [data, setData] = useState({
        catalogItem: '',
        tags: [],
        filterSet: [],
        memberSell: '',
        categoryId: 'all',
        cartItems: [],
        variations: null,
        subVariations: null,
        promoCode: [],
        accessCode: '',
        drawer: '',
    });
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCatalogItems());
        dispatch(getCategories());
        dispatch(getFilterSets());
        dispatch(getTags());
    }, [dispatch]);

    let { allCatalogItems, allCatalogFilterItems } = useSelector((state) => state.catalogItems);
    const [openVariationDialog, setOpenVariationDialog] = useState(null);
    allCatalogFilterItems = processCatalogItems(allCatalogFilterItems).filter((item) => item.hasCategory);
    allCatalogItems = processCatalogItems(allCatalogItems);

    const getItemNamesAndSubvariations = (data) => {
        const result = [];

        data.forEach((item) => {
            result.push({ ...item, type: 'item' });
            item.variation?.forEach((variation) => {
                variation.subVariations?.forEach((subVar) => {
                    result.push({
                        name: subVar.subVariation,
                        id: subVar._id,
                        unitPrice: subVar.unitPrice,
                        minimumQuantity: subVar.variationMinQuantity,
                        maximumQuantity: subVar.variationMaxQuantity,
                        defaultQuantity: subVar.defaultQuantity,
                        defaultDiscount: item.defaultDiscount,
                        allowDiscount: item.allowDiscount,
                        fullName: `${subVar.upc} ${subVar.subVariation}`.trim(),
                        upc: subVar.upc,
                        catalogId: item._id,
                        totalTaxPercentage: item.totalTaxPercentage,
                        discount: item.discount ?? null,
                        commissionGroup: item.commissionGroup ?? null,
                        taxable: item.taxable,
                        type: 'subVariation',
                    });
                });
            });
        });

        return result;
    };

    const list = getItemNamesAndSubvariations(allCatalogItems);

    const variationOptions =
        allCatalogItems
            ?.flatMap((item) => item || [])
            .find((variation) => variation._id === openVariationDialog?._id)
            ?.variation?.filter((iy) => iy.subVariations.length > 0)
            .map(
                (Var) =>
                    ({
                        name: Var.variationName,
                        id: Var._id,
                    }) || [],
            ) || [];

    const subVariationsOptions =
        allCatalogItems
            ?.flatMap((item) => item.variation || [])
            .find((variation) => variation._id === data?.variations?.id)
            ?.subVariations?.map(
                (subVar) =>
                    ({
                        name: subVar.subVariation,
                        id: subVar._id,
                        unitPrice: subVar.unitPrice,
                        minimumQuantity: subVar.variationMinQuantity,
                        maximumQuantity: subVar.variationMaxQuantity,
                        defaultQuantity: subVar.defaultQuantity,
                        upc: subVar.upc,
                        taxable: subVar.taxable,
                    }) || [],
            ) || [];

    useEffect(() => {
        if (data?.catalogItem?.fullName) {
            handleCatalogItems(data?.catalogItem);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data?.catalogItem]);

    const addToCart = (item, variation) => {
        // const existingItem = data?.cartItems.find((cartItem) => cartItem._id === item._id);
        let existingItem = null;
        if (item && variation) {
            existingItem = data?.cartItems.find((cartItem) => {
                return (
                    cartItem._id === item._id &&
                    cartItem.variation?.id === variation?.variations?.id &&
                    cartItem.subVariation?.id === variation?.subVariations?.id
                );
            });
        } else if (item && item?.type === 'subVariation') {
            existingItem = data?.cartItems.find((cartItem) => {
                return cartItem?.id === item?.id;
            });
        } else if (item && !variation) {
            existingItem = data?.cartItems.find((cartItem) => {
                return cartItem?._id === item?._id;
            });
        }

        let maximumQuantity = variation?.subVariations?.maximumQuantity ? variation?.subVariations?.maximumQuantity : item.maximumQuantity;
        let defaultQuantity = variation?.subVariations?.defaultQuantity ? variation?.subVariations?.defaultQuantity : item.defaultQuantity;
        if (existingItem) {
            const newQuantity = existingItem.quantity + 1;
            if (newQuantity <= maximumQuantity) {
                if (variation === null) {
                    setData((prev) => ({
                        ...prev,
                        catalogItem: '',
                        cartItems: prev.cartItems.map((cartItem) =>
                            cartItem._id === item._id
                                ? {
                                      ...cartItem,
                                      quantity: newQuantity,
                                      variation: variation?.variations?.name ? variation?.variations : null,
                                      subVariation: item ? item : null,
                                  }
                                : cartItem,
                        ),
                    }));
                } else {
                    setData((prev) => ({
                        ...prev,
                        catalogItem: '',
                        cartItems: prev.cartItems.map((cartItem) =>
                            cartItem.subVariation?.id
                                ? cartItem.subVariation?.id === variation?.subVariations?.id
                                    ? {
                                          ...cartItem,
                                          quantity: newQuantity,
                                          variation: variation?.variations?.name ? variation?.variations : null,
                                          subVariation: variation?.subVariations?.name ? variation?.subVariations : null,
                                      }
                                    : cartItem
                                : cartItem._id === item._id
                                  ? {
                                        ...cartItem,
                                        quantity: newQuantity,
                                        variation: variation?.variations?.name ? variation?.variations : null,
                                        subVariation: variation?.subVariations?.name ? variation?.subVariations : null,
                                    }
                                  : cartItem,
                        ),
                    }));
                }
            }
        } else {
            setData((prev) => ({
                ...prev,
                catalogItem: '',
                cartItems: [
                    ...(prev.cartItems || []),
                    {
                        ...item,
                        quantity: defaultQuantity,
                        variation: data?.variations ? variation?.variations : null,
                        subVariation: data?.subVariations ? variation?.subVariations : null,
                    },
                ],
            }));
        }
    };

    const handleCatalogItems = (item) => {
        if (item?.variation?.length > 0) {
            const variationsWithSub = item.variation.filter((variation) => variation.subVariations?.length > 0);
            if (variationsWithSub.length > 0) {
                setOpenVariationDialog({ _id: item._id, item });
            }
        } else {
            addToCart(item, null);
        }
    };

    useEffect(() => {
        if (data?.subVariations === null) {
            const formErrors = formValidation('subVariations', data?.subVariations, data);
            setData((prev) => ({ ...prev, formErrors }));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data?.subVariations, data?.variations]);

    const handleChange = ({ name, value }) => {
        const formErrors = formValidation(name, value, data);
        if (name === 'variations') {
            setData((prev) => ({ ...prev, [name]: value, subVariations: [], formErrors }));
        } else {
            setData((prev) => ({ ...prev, [name]: value, formErrors }));
        }
    };

    const onClose = () => {
        setOpenVariationDialog(null);
        setData((prev) => ({ ...prev, subVariations: null, variations: null }));
    };

    const handleSave = () => {
        if (showFormErrors(data, setData, ['accessCode'])) {
            addToCart(openVariationDialog?.item, data);
            onClose();
        }
    };

    return (
        <>
            <div className="flex gap-2">
                <div className="product-sidebar p-2">
                    <SearchByItem data={data} allCatalogItems={list} handleChange={handleChange} setData={setData} />
                    <CategoryFilter data={data} setData={setData} />
                </div>
                <CatalogItemsView
                    allCatalogItems={allCatalogFilterItems}
                    data={data}
                    setData={setData}
                    handleCatalogItems={handleCatalogItems}
                    handleChange={handleChange}
                />
                <CustomDialog title="Select Variation" visible={openVariationDialog !== null} onCancel={onClose} loading={false} onSave={handleSave}>
                    <CustomDropDown col={12} label="Variations" name="variations" data={data} onChange={handleChange} options={variationOptions} />
                    <CustomDropDown col={12} label="Sub Variations" name="subVariations" data={data} onChange={handleChange} options={subVariationsOptions} />
                </CustomDialog>

                <div className="cart-view">
                    <MembersToSellItem data={data} setData={setData} />
                    <NewCart data={data} setData={setData} handleChange={handleChange} />
                </div>
            </div>
        </>
    );
}
