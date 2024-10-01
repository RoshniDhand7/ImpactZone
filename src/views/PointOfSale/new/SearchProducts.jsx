import React from 'react';
import { CustomReactSelect } from '../../../shared/Input/AllInputs';

export default function SearchProducts() {
    return (
        <div>
            <CustomReactSelect
                name="memberSell"
                field="fullName"
                // filterOption={searchMember}
                value={data?.memberSell}
                onChange={handleChange}
                options={allMembers}
                data={data}
                placeholder="Search by member"
            />
        </div>
    );
}
