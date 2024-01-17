import React from 'react';
import CustomTree from '../../../../shared/Tree/CustomTree';
import { allPermissions } from '../../../../utils/permissions';

export default function Permissions({ selected, setSelected }) {
    const renderPermissionTabs = () => {
        return allPermissions.map(({ department, expended, permissions }, i) => (
            <div key={i} className="md:col-4 mb-3">
                <div className="bg-red curve p-4">
                    <h3 className="font-bold ">{department}</h3>
                    <CustomTree expandedKeys={expended} values={permissions} selectionKeys={selected} onSelectionChange={setSelected} />
                </div>
            </div>
        ));
    };
    return (
        <>
            <h3 className="font-bold">Permissions</h3>
            <div className="grid">{renderPermissionTabs()}</div>
        </>
    );
}
