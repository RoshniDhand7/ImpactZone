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

export default function PointOfSale() {
    const [data, setData] = useState({
        catalogItem: '',
        tags: [],
        filterSet: [],
        memberSell: '',
        categoryId: 'all',
        cartItems: [],
        cartDisTax: [],
    });
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCatalogItems());
        dispatch(getCategories());
        dispatch(getFilterSets());
        dispatch(getTags());
    }, [dispatch]);

    let { allCatalogItems } = useSelector((state) => state.catalogItems);

    allCatalogItems = allCatalogItems
    .filter(item => item.isActive && (item.itemSold === "POS_ONLY" || item.itemSold === "POS_AND_AGREEMENTS") && item.hasCategory)
    .map(item => ({
        name: item.name,
        upc: item.upc,
        _id: item._id,
        img: item.catalogImage,
        fullName: `${item.upc} ${item.name}`.trim(),
        unitPrice: item.unitPrice,
        unitPrice1: item.unitPrice1,
        unitPrice2: item.unitPrice2,
        unitPrice3: item.unitPrice3,
        moreThan1: item.moreThan1,
        moreThan2: item.moreThan2,
        moreThan3: item.moreThan3,
        totalTaxPercentage: item.totalTaxPercentage,
        allowDiscount: item.allowDiscount,
        overRideDiscount: item.overRideDiscount,
        defaultDiscount: item.defaultDiscount ?? null,
        discount: item.discount ?? null,
        itemCaption: item.itemCaption,
        itemSold: item.itemSold,
        maximumQuantity: item.maximumQuantity,
        minimumQuantity: item.minimumQuantity,
        defaultQuantity: item.defaultQuantity
    }));
    const addToCart = (item) => {
        const existingItem = data?.cartItems.find((cartItem) => cartItem._id === item._id);
    
        if (existingItem) {
            const newQuantity = existingItem.quantity + 1;
            if (newQuantity <= item.maximumQuantity) {
                setData((prev) => ({
                    ...prev,
                    cartItems: data?.cartItems.map((cartItem) =>
                        cartItem._id === item._id
                            ? { ...cartItem, quantity: newQuantity }
                            : cartItem
                    ),
                }));
            }
        } else {
            setData((prev) => ({
                ...prev,
                cartItems: [...data?.cartItems, { ...item, quantity: item.defaultQuantity}],
            }));
        }
    };
    


    const handleCatalogItems = (item) => {
        addToCart(item);
        const isItemInData1 = data?.cartDisTax?.some((dataItem) => dataItem.id === item._id);
        if (!isItemInData1) {
            setData((prev) => ({
                ...prev,
                cartDisTax: [
                    ...(prev.cartDisTax || []),
                    { waiveTax: false, discount: item.allowDiscount === 'true' ? item.defaultDiscount : null, id: item._id },
                ],
            }));
        }
    };

    const handleChange = ({ name, value }) => {
        setData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <>
            <div className="flex gap-2">
                <div className="product-sidebar p-2">
                    <SearchByItem data={data} allCatalogItems={allCatalogItems} handleChange={handleChange} setData={setData} />
                    <CategoryFilter data={data} setData={setData} />
                </div>
                <CatalogItemsView
                    allCatalogItems={allCatalogItems}
                    data={data}
                    setData={setData}
                    handleCatalogItems={handleCatalogItems}
                    handleChange={handleChange}
                />

                <div className="cart-view">
                    <MembersToSellItem data={data} setData={setData} />
                    <NewCart data={data} setData={setData} />
                </div>
            </div>
        </>
    );
}
