import React, { useState } from 'react';
import CustomCard from '../../shared/Cards/CustomCard';
import { CustomAutoComplete } from '../../shared/Input/AllInputs';
import SearchMembers from './new/SearchMembers';
import Cart from './new/Cart';

export default function PointOfSale2() {
    const [selectedMember, setSelectedMember] = useState('66dec5424df5dafecedbfeec');
    return (
        <div className="pos">
            <div className="grid">
                <div className="col-2">
                    <CustomAutoComplete
                        name="catalogItem"
                        field="fullName"
                        filtered={[]}
                        data={[]}
                        placeholder="Search by UPC/Item"
                        itemTemplate={(item) => (
                            <div>
                                {item.upc}
                                {item.name}
                            </div>
                        )}
                    />
                </div>
                <div className="col-6">
                    <CustomCard title="Most Purchased Items" col={12}></CustomCard>
                </div>
                <div className="col">
                    <SearchMembers selectedMember={selectedMember} setSelectedMember={setSelectedMember} />
                    <Cart />
                </div>
            </div>
        </div>
    );
}
