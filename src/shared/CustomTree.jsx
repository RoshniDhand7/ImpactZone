import { Tree } from 'primereact/tree';

export function CustomTree({ values, selectionKeys, onSelectionChange, className }) {
    return (
        <Tree
            selectionMode="single"
            className={`border-none  ${className}`}
            value={values}
            selectionKeys={selectionKeys}
            onSelectionChange={onSelectionChange}
            metaKeySelection={false}
            propagateSelectionUp={false}
            propagateSelectionDown={false}
        />
    );
}
