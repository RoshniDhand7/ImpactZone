import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import ViewIcon from '../../assets/icons/view.png';
import EditIcon from '../../assets/icons/edit.png';
import DeleteIcon from '../../assets/icons/delete.png';
import { convertBooleanValues } from '../../utils/commonFunctions';

const ActionTemplate = ({ onView, onEdit, onDelete, data }) => {
    return (
        <span className="flex ">
            {onView && <img src={ViewIcon} alt="" className="mr-2" style={{ width: '20px', height: '20px' }} onClick={() => onView(data)} />}
            {onEdit && <img src={EditIcon} alt="" className="" style={{ width: '19px', heigth: '15px' }} onClick={() => onEdit(data)} />}
            {onDelete && (
                <img src={DeleteIcon} alt="" className="ml-3 cusor-pointer" style={{ width: '15px', heigth: '15px' }} onClick={() => onDelete(data)} />
            )}
        </span>
    );
};

const CustomTable = ({ data, columns, onView, onEdit, onDelete }) => {
    return (
            <DataTable value={convertBooleanValues(data)} tableStyle={{ minWidth: '50rem' }}>
                {columns.map((col, i) => (
                    <Column key={col.field} field={col.field} body={col.body} header={col.header} />
                ))}
                 <Column body={(rowData) => <ActionTemplate onView={onView} onEdit={onEdit} onDelete={onDelete} data={rowData} />} header="" />
            </DataTable>
    );
};

export default CustomTable;
