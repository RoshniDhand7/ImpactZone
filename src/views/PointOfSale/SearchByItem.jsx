import React, { useState } from 'react';
import { CustomAutoComplete } from '../../shared/Input/AllInputs';

const SearchByItem = ({ data, allCatalogItems, handleChange, setData }) => {
    const [items, setItems] = useState([]);

    console.log(allCatalogItems, 'allCatalogItems');
    const search = (event) => {
        let query = event.query.trim().toLowerCase();
        let _filteredItems = allCatalogItems.filter((item) => {
            let _itemUPC = String(item.upc || '');
            let _itemName = item.name.toLowerCase();

            console.log(_itemUPC, _itemName, query, '_itemUPC');
            return _itemUPC.includes(query) || _itemName.includes(query);
        });
        setItems(_filteredItems);
        return _filteredItems;
    };

    console.log(data, 'data12');

    return (
        <CustomAutoComplete
            name="catalogItem"
            field="fullName"
            filtered={items}
            search={search}
            onChange={handleChange}
            data={data}
            placeholder="Search by UPC/Item"
            itemTemplate={(item) => (
                <div>
                    {item.upc}
                    {item.name}
                </div>
            )}
            handleClear={() => setData((prev) => ({ ...prev, catalogItem: '' }))}
        />
    );
};

export default SearchByItem;
