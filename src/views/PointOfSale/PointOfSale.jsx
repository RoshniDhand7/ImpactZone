import { AutoComplete } from 'primereact/autocomplete';
import React, { useEffect, useMemo, useState } from 'react';
import { getCatalogItems } from '../../redux/actions/InventorySettings/catalogItemsAction';
import { useDispatch, useSelector } from 'react-redux';
import { CustomButton } from '../../shared/Button/CustomButton';
import { getMembers } from '../../redux/actions/Dashboard/Members';
import CustomAccordion from '../../shared/Accordion/Accordion';
import { getImageURL } from '../../utils/imageUrl';
import { getCategories } from '../../redux/actions/InventorySettings/categoriesAction';
import { CustomTree } from '../../shared/CustomTree';
import _ from 'lodash';
import CustomDialog from '../../shared/Overlays/CustomDialog';
import { getFilterSets } from '../../redux/actions/InventorySettings/filterSetsAction';
import { getTags } from '../../redux/actions/InventorySettings/tagAction';
import { CustomCheckbox, CustomCheckBoxInput } from '../../shared/Input/AllInputs';
import { addRecentSearch, getSearchSuggestion } from '../../redux/actions/POSAction';
import Cart from './Cart';
import { Accordion, AccordionTab } from 'primereact/accordion';

export default function PointOfSale() {
    const [data, setData] = useState({
        catalogItem: '',
        tags: [],
        filterSet: [],
    });
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCatalogItems());
        dispatch(getCategories());
        dispatch(getFilterSets());
        dispatch(getTags());
    }, [dispatch]);

    const { allCategory } = useSelector((state) => state.category);
    let { allCatalogItems } = useSelector((state) => state.catalogItems);
    const { filterSetDropDown } = useSelector((state) => state.filterSet);
    const { tagsDropDown } = useSelector((state) => state.tags);

    const handleChange = (e) => {
        const inputValue = e.value;
        const trimmedValue = typeof inputValue === 'string' ? inputValue.trimStart() : inputValue;
        setData((prev) => ({ ...prev, catalogItem: trimmedValue }));
    };
    const handleChange1 = ({ name, value }) => {
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const [items, setItems] = useState([]);

    const [memberItems, setMemberItems] = useState([]);
    allCatalogItems = allCatalogItems.map((item) => ({
        name: item.name,
        unitPrice: item.unitPrice,
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
    }));

    const [value, setValue] = useState('');
    const [categoryId, setCategoryId] = useState('all');
    const [visibleFilter, setVisibleFilter] = useState(false);

    useEffect(() => {
        dispatch(getMembers());
        dispatch(getSearchSuggestion());
    }, [dispatch]);

    let { allMembers } = useSelector((state) => state.members);
    const { recentSuggesstions } = useSelector((state) => state?.POS);
    useEffect(() => {
        if (categoryId || data?.catalogItem?._id) {
            dispatch(getCatalogItems(_, categoryId, data?.catalogItem?._id));
        }
    }, [categoryId, data?.catalogItem?._id, dispatch]);

    allMembers = allMembers.map((item) => ({
        firstName: item.firstName,
        middleName: item.MI,
        lastName: item.lastName,
        id: item._id,
        fullName: `${item.firstName} ${item.MI} ${item.lastName}`.trim(),
    }));
    const search = (event) => {
        let query = event.query.trim().toLowerCase();
        let _filteredItems = allCatalogItems.filter((item) => {
            let _itemUPC = item.upc.toLowerCase();
            let _itemName = item.name.toLowerCase();
            return _itemUPC.includes(query) || _itemName.includes(query);
        });
        setItems(_filteredItems);
        return _filteredItems;
    };

    const searchMember = (event) => {
        let query = event.query;
        let _filteredItems = allMembers.filter((item) => {
            let _item = `${item.firstName} ${item.middleName} ${item.lastName}`.trim();
            let _query = query.trim().toLowerCase();
            return _item.toLowerCase().includes(_query);
        });
        setMemberItems(_filteredItems);
        return _filteredItems;
    };
    const handleOnChange = (e) => {
        const inputValue = e.value;
        const trimmedValue = typeof inputValue === 'string' ? inputValue.trimStart() : inputValue;

        setValue(trimmedValue);
    };
    const handleSubCategorySelect = (category) => {
        setCategoryId(category.value);
    };

    const getSubCategoryTreeSelect = () => {
        let keys = allCategory?.map((category) => ({
            key: `${category._id}`,
            label: category.name,
        }));
        keys.unshift({
            key: `all`,
            label: 'All',
        });

        return keys;
    };
    const handleApply = () => {
        dispatch(getCatalogItems(_, categoryId, data?.catalogItem?._id, data?.filterSet, data?.tags));
        setVisibleFilter(false);
    };

    const handleClear = () => {
        setData((prev) => ({ ...prev, tags: [], filterSet: [] }));
    };

    const filters = ['filterSet', 'tags'];

    const filterOptions = {
        filterSet: {
            name: 'FilterSet',
            value: 'filterSet',
            options: filterSetDropDown,
        },
        tags: {
            name: 'Tags',
            value: 'tags',
            options: tagsDropDown,
        },
    };
    const filterOptionItems = useMemo(() => filters.map((item) => filterOptions[item]), [filters.length, filterSetDropDown, tagsDropDown]);

    const onCancel = () => {
        setVisibleFilter(false);
    };

    useEffect(() => {
        if (value?.fullName) {
            dispatch(
                addRecentSearch(value?.fullName, () => {
                    dispatch(getSearchSuggestion());
                }),
            );
        }
    }, [value?.fullName, dispatch]);

    const [cartItems, setCartItems] = useState([]);

    console.log('cartItems>>', cartItems);

    const addToCart = (item) => {
        const existingItem = cartItems.find((cartItem) => cartItem._id === item._id);
        if (existingItem) {
            setCartItems(cartItems.map((cartItem) => (cartItem._id === item._id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem)));
        } else {
            setCartItems([...cartItems, { ...item, quantity: 1 }]);
        }
    };

    const updateQuantity = (itemId, quantity) => {
        if (quantity === 0) {
            setCartItems(cartItems.filter((cartItem) => cartItem._id !== itemId));
        } else {
            setCartItems(cartItems.map((cartItem) => (cartItem._id === itemId ? { ...cartItem, quantity } : cartItem)));
        }
    };

    const removeItem = (itemId) => {
        setCartItems(cartItems.filter((cartItem) => cartItem._id !== itemId));
    };

    return (
        <>
            <div className="flex gap-2">
                <div className="product-sidebar p-2">
                    <span className="p-input-icon-right w-full">
                        <AutoComplete
                            field={'fullName'}
                            value={data.catalogItem}
                            suggestions={items}
                            completeMethod={search}
                            onChange={handleChange}
                            className="w-full "
                            showEmptyMessage={true}
                            required={true}
                            inputClassName="w-full"
                            placeholder="Search by UPC/Item"
                            itemTemplate={(item) => (
                                <div>
                                    {item.upc}
                                    {item.name}
                                </div>
                            )}
                        />
                        <i className="pi pi-search" />
                    </span>
                    <div className="mt-3">
                        <div className="col-12 lg:col-12 md:col-12 div-shadow p-3 mb-2 lg:mb-0 responsive-height">
                            <div className="flex justify-content-between align-items-center">
                                <h2 className="text-xl font-semibold ">{'Category'}</h2>
                            </div>
                            <div className="mt-3">
                                <CustomTree
                                    className="p-0 bg-transparent"
                                    values={getSubCategoryTreeSelect()}
                                    selectionKeys={categoryId}
                                    onSelectionChange={handleSubCategorySelect}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="products-view ">
                    <div className={`bg-primary-dark border-round shadow-2 px-2 ${'flex justify-content-between align-items-center'}`}>
                        <div className="text-xl text-white justify-content-end align-items-end ml-2">Most Purchased Items</div>
                        <CustomButton
                            className="p-1 border-gray-200 text-sm   p-2 text-white justify-content-end align-items-end"
                            outlined={true}
                            onClick={() => setVisibleFilter(true)}
                        >
                            Filter
                        </CustomButton>
                    </div>
                    <div className="bg-lightest-blue border-round p-4 mt-2 flex justify-content-between " style={{ height: '71vh', overflowY: 'auto' }}>
                        <div class="flex gap-2 flex-wrap w-full" style={{ height: 'fit-content' }}>
                            {allCatalogItems?.map((item) => (
                                <div onClick={() => addToCart(item)} className="cursor-pointer product-box" key={item._id}>
                                    <img src={getImageURL(item.img)} className="w-full h-full" alt="catalogImg" />
                                    <div className="product-content">
                                        <p className="font-semibold text-sm text-dark-blue">{item.name}</p>
                                        <p className="font-semibold text-sm text-dark-blue">$ {item.unitPrice}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <CustomDialog
                    title="Apply Filters"
                    icon="pi-filter"
                    width="70vh"
                    visible={visibleFilter}
                    onCancel={onCancel}
                    onApply={handleApply}
                    onClear={handleClear}
                >
                    <div className="customize-graph">
                        {filterOptionItems?.map((item, i) => (
                            <div key={i}>
                                {i ? <hr /> : null}
                                <div className="content">
                                    <CustomCheckBoxInput label={item.name} name={item.value} options={item.options} data={data} onChange={handleChange1} />
                                </div>
                            </div>
                        ))}
                    </div>
                </CustomDialog>
                <div className="cart-view">
                    <span className="p-input-icon-right w-full">
                        <AutoComplete
                            field="fullName"
                            value={value}
                            suggestions={memberItems}
                            completeMethod={searchMember}
                            onChange={handleOnChange}
                            className="w-full  "
                            inputClassName="w-full"
                            showEmptyMessage={true}
                            placeholder="Search by member"
                            itemTemplate={(item) => <div>{`${item.firstName} ${item.middleName} ${item.lastName} `}</div>}
                        />
                        <i className="pi pi-search" />
                    </span>
                    <div className="flex justify-content-end gap-8 mt-3">
                        {recentSuggesstions?.map((item) => {
                            return (
                                <>
                                    <div className="text-sm text-blue" key={item._id}>
                                        {item.name}
                                    </div>
                                </>
                            );
                        })}
                    </div>
                    <div>
                        <CustomAccordion isActive={true} extraClassName="employee-accordion w-full" title={'Cart'}>
                            <Cart cartItems={cartItems} updateQuantity={updateQuantity} removeItem={removeItem} />
                        </CustomAccordion>
                        <CustomAccordion isActive={false} extraClassName="employee-accordion w-full" title="Pricing Details">
                            <div className="flex justify-content-between">
                                <CustomCheckbox col={4} label="Waive Tax" />
                                <CustomCheckbox col={4} label="Discount" />
                                <CustomCheckbox col={4} label="Commission" />
                            </div>
                            <h3 className="flex gap-2 border-top-1 text-sm align-items-center pt-2 border-gray-200 my-2">
                                Promo:{' '}
                                <span className="border-1 border-gray-200 border-round-lg p-2">
                                    BOGO <i className="pi pi-times-circle"></i>
                                </span>
                            </h3>
                            <div className="mt-2">
                                <p className="flex justify-content-between mb-3">
                                    <span className="font-semibold">Discounts</span>
                                    <span className="text-green-700 font-semibold">$2.00</span>
                                </p>
                                <p className="flex justify-content-between mb-3">
                                    <span className="font-semibold">Tax</span>
                                    <span className="font-semibold">$2.00</span>
                                </p>
                                <p className="flex justify-content-between mb-3">
                                    <span className="font-semibold">Total</span>
                                    <span className="font-semibold">$2.00</span>
                                </p>
                                <p className="flex justify-content-between mb-3">
                                    <span className="font-semibold">Account Balance</span>
                                    <span className="font-semibold text-red-600">$2.00</span>
                                </p>
                            </div>
                        </CustomAccordion>
                    </div>
                </div>
            </div>
        </>
    );
}
