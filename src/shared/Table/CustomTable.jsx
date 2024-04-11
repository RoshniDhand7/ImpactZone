import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { convertBooleanValues } from '../../utils/commonFunctions';

const CustomTable = ({
    convertToboolean = true,
    data,
    columns,
    onView,
    onEdit,
    onDelete,
    onCopy,
    selectedRow,
    setSelectedRow,
    showSelectionElement,
    reorderableRows,
    onRowReorder,
}) => {
    const actionTemplate = (data) => {
        return (
            <span className="flex ">
                {onView && <i className="mx-2 cursor-pointer pi pi-eye" onClick={() => onView(data)} />}
                {onCopy && <i className="mx-2 cursor-pointer pi pi-copy" onClick={() => onCopy(data)} />}
                {onEdit && <i className="mx-2 cursor-pointer pi pi-pencil" onClick={() => onEdit(data)} />}
                {onDelete && <i className="mx-2 cursor-pointer pi pi-trash" onClick={() => onDelete(data)} />}
            </span>
        );
    };

    return (
        <DataTable
            value={convertToboolean ? convertBooleanValues(data) : data}
            tableStyle={{ minWidth: '50rem' }}
            paginator
            rows={5}
            selection={selectedRow}
            reorderableRows={reorderableRows}
            onSelectionChange={setSelectedRow ? (e) => setSelectedRow(e.value) : ''}
            onRowReorder={onRowReorder}
            selectionMode="checkbox"
            showSelectionElement={showSelectionElement}
        >
            {reorderableRows && <Column rowReorder style={{ width: '3rem' }} />}
            {columns.map((col) => (
                <Column
                    key={col.field}
                    field={col.field}
                    body={col.body}
                    header={col.header}
                    selectionMode={col.selectionMode}
                    sortable={col.sortable}
                    sortField={col.field}
                />
            ))}
            {onView || onEdit || onDelete ? <Column body={actionTemplate} style={{ width: '100px' }} /> : null}
        </DataTable>
    );
};

export default CustomTable;
