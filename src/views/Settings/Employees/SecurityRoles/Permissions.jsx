import React from 'react';
import CustomTree from '../../../../shared/Tree/CustomTree';
import { allPermissions } from '../../../../utils/permissions';
import CustomCard from '../../../../shared/Cards/CustomCard';

export default function Permissions({ selected, setSelected }) {
    const renderPermissionTabs = () => {
        return allPermissions.map(({ department, expended, permissions }, i) => (
            <CustomCard key={i} col="4" title={department}>
                <CustomTree expandedKeys={expended} values={permissions} selectionKeys={selected} onSelectionChange={setSelected} />
            </CustomCard>
        ));
    };
    return (
        <>
            <h3 className="font-bold">Permissions</h3>
            <div className="grid">{renderPermissionTabs()}</div>
        </>
    );
}
