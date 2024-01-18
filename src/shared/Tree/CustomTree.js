import { Tree } from 'primereact/tree';
import React from 'react';

const CustomTree = ({ values, expandedKeys, selectionKeys, onSelectionChange }) => {
    return (
        <Tree
            selectionMode="checkbox"
            value={values}
            expandedKeys={expandedKeys}
            selectionKeys={selectionKeys}
            onSelectionChange={(e) => onSelectionChange(e.value)}
        />
    );
};
export default CustomTree;
