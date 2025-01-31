import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { convertBooleanValues, longOverlayText } from '../../utils/commonFunctions';

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
    customActionTemplate,
    selectionMode = 'checkbox',
    cellSelection = false,
    onCellSelect,
    cellClassName,
    minWidth = '50rem',
    paginator = true,
    style,
    className,
    loading = false,
}) => {
    const actionTemplate = (data, index) => {
        return (
            <span className="flex ">
                {onView && <i className="mx-2 cursor-pointer pi pi-eye" onClick={() => onView(data)} />}
                {onCopy && <i className="mx-2 cursor-pointer pi pi-copy" onClick={() => onCopy(data)} />}
                {onEdit && <i className="mx-2 cursor-pointer pi pi-pencil" onClick={() => onEdit(data, index)} />}
                {onDelete && <i className="mx-2 cursor-pointer pi pi-trash" onClick={() => onDelete(data)} />}
            </span>
        );
    };

    const dynamicBodyTemplate = (rowData, col) => {
        if (typeof col.body === 'function') {
            return col.body(rowData);
        } else if (typeof col.body === 'string') {
            const bodyFunction = eval(col.body);
            /* eslint no-eval: 0 */
            return bodyFunction(rowData, col.field);
        } else {
            return rowData[col.field];
        }
    };
    const descriptionBodyTemplate = (rowData, field) => {
        /* eslint no-unused-vars: off */
        return longOverlayText(rowData, field);
    };

    return (
        <DataTable
            value={convertToboolean ? convertBooleanValues(data) : data}
            tableStyle={{ minWidth }}
            paginator={paginator ? true : false}
            rows={10}
            selection={selectedRow}
            reorderableRows={reorderableRows}
            onSelectionChange={setSelectedRow ? (e) => setSelectedRow(e.value) : ''}
            onRowReorder={onRowReorder}
            selectionMode={selectionMode}
            showSelectionElement={showSelectionElement}
            cellSelection={cellSelection}
            onCellSelect={onCellSelect}
            cellClassName={cellClassName}
            style={style}
            className={className}
            loading={loading}
        >
            {reorderableRows && <Column rowReorder style={{ width: '3rem' }} />}
            {columns.map((col, index) => (
                <Column
                    key={col.field}
                    field={col.field}
                    body={(rowData) => dynamicBodyTemplate(rowData, col)}
                    header={col.header}
                    selectionMode={col.selectionMode} // Enable selection only for specified columns
                    sortable={col.sortable}
                    sortField={col.field}
                    index={index}
                    style={col.style}
                />
            ))}
            {onView || onEdit || onDelete || customActionTemplate ? (
                <Column body={customActionTemplate ? customActionTemplate : actionTemplate} style={{ width: '100px' }} />
            ) : null}
        </DataTable>
    );
};

export default CustomTable;
