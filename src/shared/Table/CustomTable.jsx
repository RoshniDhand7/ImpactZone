import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { convertBooleanValues } from '../../utils/commonFunctions';

const CustomTable = ({ data, columns, onView, onEdit, onDelete }) => {
    const actionTemplate = (data) => {
        return (
            <span className="flex ">
                {/* {onView && <img src={ViewIcon} alt="" className="mx-1 cursor-pointer" style={{ width: '20px', height: '20px' }} onClick={() => onView(data)} />} */}
                {/* {onEdit && <img src={EditIcon} alt="" className="mx-1 cursor-pointer" style={{ width: '19px', heigth: '15px' }} onClick={() => onEdit(data)} />} */}
                {/* {onDelete && (
                    <img src={DeleteIcon} alt="" className="mx-1 cursor-pointer" style={{ width: '15px', heigth: '15px' }} onClick={() => onDelete(data)} />
                )} */}
                {onView && <i className="mx-2 cursor-pointer pi pi-eye" onClick={() => onView(data)} />}
                {onEdit && <i className="mx-2 cursor-pointer pi pi-pencil" onClick={() => onEdit(data)} />}
                {onDelete && <i className="mx-2 cursor-pointer pi pi-trash" onClick={() => onDelete(data)} />}
            </span>
        );
    };
    return (
        <DataTable value={convertBooleanValues(data)} tableStyle={{ minWidth: '50rem' }} paginator rows={5}>
            {columns.map((col, i) => (
                <Column key={col.field} field={col.field} body={col.body} header={col.header} />
            ))}
            {onView || onEdit || onDelete ? <Column body={actionTemplate} style={{ width: '100px' }} /> : null}
        </DataTable>
    );
};

export default CustomTable;
