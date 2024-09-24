import React, { useState } from 'react';
import SearchMembers from './new/SearchMembers';
import Cart from './new/Cart';
import Categories from './new/Categories';
import SearchCatalog from './new/SearchCatalog';
import CatalogItems from './new/CatalogItems';

export default function PointOfSale2() {
    const [selectedMember, setSelectedMember] = useState('66dec5424df5dafecedbfeec');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [cartItems, setCartItems] = useState([]);
    const onAddItemIntoCart = (item) => {
        setCartItems((prev) => {
            return [...prev, item];
        });
    };
    return (
        <div className="grid">
            <div className="col-2">
                <SearchCatalog selectedMember={selectedMember} setSelectedMember={setSelectedMember} />
                <Categories active={selectedCategory} setActive={setSelectedCategory} />
            </div>
            <div className="col-6">
                <CatalogItems selectedCategory={selectedCategory} onAddItemIntoCart={onAddItemIntoCart} />
            </div>
            <div className="col">
                <SearchMembers selectedMember={selectedMember} setSelectedMember={setSelectedMember} />
                <Cart cartItems={cartItems} setCartItems={setCartItems} />
            </div>
        </div>
    );
}
