import React, { useState } from 'react';
import { CustomAutoComplete } from '../../shared/Input/AllInputs';

const SearchByItem = ({ data, allCatalogItems, handleChange }) => {
    const [items, setItems] = useState([]);

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
        />
    );
};

export default SearchByItem;
