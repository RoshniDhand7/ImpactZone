import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import EditIcon from '../../assets/icons/edit.png';
import DeleteIcon from '../../assets/icons/delete.png';

const CustomTable = ({ data, columns, onView, onEdit, onDelete }) => {
    const ActionTemplate = (col) => {
        return (
            <span className="flex ">
                {onView && <img src={EditIcon} alt="" width="10px" className="" onClick={() => onView(col)} />}
                {onEdit && <img src={EditIcon} alt="" style={{ width: '19px', heigth: '15px' }} onClick={() => onEdit(col)} />}
                {onDelete && (
                    <img src={DeleteIcon} alt="" className="ml-3 cusor-pointer" style={{ width: '15px', heigth: '15px' }} onClick={() => onDelete(col)} />
                )}
            </span>
        );
    };
    return (
        <>
            <DataTable value={data} tableStyle={{ minWidth: '50rem' }}>
                {columns.map((col, i) => (
                    <Column key={col.field} field={col.field} header={col.header} />
                ))}
                <Column field={ActionTemplate} header="" />
            </DataTable>
        </>
    );
};

export default CustomTable;
