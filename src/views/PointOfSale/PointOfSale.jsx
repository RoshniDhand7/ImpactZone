import { AutoComplete } from 'primereact/autocomplete';
import React, { useEffect, useState } from 'react';
import { getCatalogItems } from '../../redux/actions/InventorySettings/catalogItemsAction';
import { useDispatch, useSelector } from 'react-redux';
import cart from '../../assets/icons/cart.png';
import PrimaryButton, { CustomButton } from '../../shared/Button/CustomButton';
import { getMembers } from '../../redux/actions/Dashboard/Members';
import CustomAccordion from '../../shared/Accordion/Accordion';
import { getImageURL } from '../../utils/imageUrl';
import { getCategories } from '../../redux/actions/InventorySettings/categoriesAction';

export default function PointOfSale() {
    const [data, setData] = useState({
        catalogItem: '',
    });
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCatalogItems());
        dispatch(getCategories());
    }, [dispatch]);

    const { allCategory } = useSelector((state) => state.category);

    let { allCatalogItemsFilter } = useSelector((state) => state.catalogItems);

    console.log(allCatalogItemsFilter, 'allCatalogItemsFilter');

    const handleChange = (e) => {
        const inputValue = e.value;
        const trimmedValue = typeof inputValue === 'string' ? inputValue.trimStart() : inputValue;
        setData((prev) => ({ ...prev, catalogItem: trimmedValue }));
    };

    const [items, setItems] = useState([]);

    const [memberItems, setMemberItems] = useState([]);
    allCatalogItemsFilter = allCatalogItemsFilter.map((item) => ({
        name: item.name,
        unitPrice: item.unitPrice,
        upc: item.upc,
        _id: item._id,
        img: item.img,
        fullName: `${item.upc} ${item.name}`.trim(),
    }));

    const [value, setValue] = useState('');

    useEffect(() => {
        dispatch(getMembers());
    }, []);

    let { allMembers } = useSelector((state) => state.members);

    allMembers = allMembers.map((item) => ({
        firstName: item.firstName,
        middleName: item.MI,
        lastName: item.lastName,
        id: item._id,
        fullName: `${item.firstName} ${item.MI} ${item.lastName}`.trim(),
    }));

    console.log('allMembers>>', allMembers, value);

    const search = (event) => {
        let query = event.query.trim().toLowerCase();
        let _filteredItems = allCatalogItemsFilter.filter((item) => {
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

    const CategoryItems = [
        {
            label: 'Shakes',
        },
        {
            label: 'Bars',
        },
        {
            label: 'Supplements',
        },
        {
            label: 'Classes',
        },
        {
            label: 'Shakes',
        },
        {
            label: 'Bars',
        },
        {
            label: 'Supplements',
        },
        {
            label: 'Classes',
        },
        {
            label: 'Shakes',
        },
        {
            label: 'Bars',
        },
        {
            label: 'Supplements',
        },
        {
            label: 'Classes',
        },
    ];

    const SavedItems = [
        {
            label: 'Austin',
            icon: '',
            button: '',
        },
    ];
    const handleOnChange = (e) => {
        const inputValue = e.value;
        const trimmedValue = typeof inputValue === 'string' ? inputValue.trimStart() : inputValue;
        setValue(trimmedValue);
    };

    console.log('data>>', data);
    return (
        <>
            <div className="grid">
                <div className="lg:col-3 sm:col-2 p-2">
                    <span className="p-input-icon-right ">
                        <AutoComplete
                            field={'fullName'}
                            value={data.catalogItem}
                            suggestions={items}
                            completeMethod={search}
                            onChange={handleChange}
                            className="w-20rem "
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
                        <div className="bg-light-gray p-3 minheightcontent">
                            <div className="menu-bar">
                                <ul className="p-0 list-none side-menu ">
                                    <h3 className="mb-3">Categories</h3>
                                    {allCategory.map((item, index) => (
                                        <li className="mb-3">{item.name}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="mt-3">
                        <div className="bg-light-gray p-3 minheightcontent1">
                            <div className="menu-bar">
                                <ul className="p-0 list-none side-menu">
                                    <h3 className="mb-3">Saved</h3>
                                    {allCategory.map((item, index) => (
                                        <li className="flex align-items-center justify-content-between ">
                                            <div className="flex gap-3 align-items-center">
                                                <img src={cart} alt="" style={{ width: '15px', height: '15px' }} />
                                                {item.name}
                                            </div>

                                            <div className=" ">
                                                <PrimaryButton label="View" className="p-2 " />
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="lg:col-6 sm:col-2 ">
                    <div className={`bg-primary-dark border-round shadow-2 px-2 ${'flex justify-content-between align-items-center'}`}>
                        <div className="text-xl text-white justify-content-end align-items-end ml-2">Most Purchased Items</div>
                        <CustomButton className="p-1 border-gray-200 text-sm   p-2 text-white justify-content-end align-items-end" outlined={true}>
                            Filter
                        </CustomButton>
                    </div>
                    <div className="bg-lightest-blue border-round p-4 mt-2 flex justify-content-between " style={{ height: '500px', overflowY: 'auto' }}>
                        <div class="grid">
                            {allCatalogItemsFilter?.map((item) => (
                                <div className="lg:col-3">
                                    <div className="">
                                        <div className="">
                                            <img src={getImageURL(item.img)} style={{ height: '100px', width: '100px' }}></img>
                                        </div>
                                        <p className="font-semibold text-dark-blue">{item.name}</p>
                                        <p className="font-semibold text-dark-blue">$56</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="lg:col-3 sm:col-2 p-2">
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
                    <div>
                        <CustomAccordion isActive={true} extraClassName="employee-accordion w-full" title={'Cart'}></CustomAccordion>
                    </div>
                </div>
            </div>
        </>
    );
}
