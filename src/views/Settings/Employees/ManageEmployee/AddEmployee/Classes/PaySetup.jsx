import React, { useState, useEffect } from 'react';
import { DataView } from 'primereact/dataview';
import { useDispatch } from 'react-redux';
import CustomCard, { CustomFilterCard } from '../../../../../../shared/Cards/CustomCard';
import { deleteEmployeeClasses, getEmployeeClasses } from '../../../../../../redux/actions/EmployeeSettings/classesAction';
import { useParams } from 'react-router-dom';
import AddandEditClasses from './AddandEditClasses';
import { confirmDelete } from '../../../../../../utils/commonFunctions';

export default function PaySetup() {
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        funcGetEmpClasses(id);
    }, [dispatch]);

    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [employeeClassId, setEmployeeClassId] = useState(null);
    const [employeeClasses, setEmployeeClasses] = useState([
        {
            id: '1000',
            code: 'f230fh0g3',
            name: 'Bamboo Watch',
            description: 'Product Description',
            image: 'bamboo-watch.jpg',
            price: 65,
            category: 'Accessories',
            quantity: 24,
            inventoryStatus: 'INSTOCK',
            rating: 5,
        },
    ]);

    const funcGetEmpClasses = (id) => {
        dispatch(
            getEmployeeClasses(id, setLoading, (data) => {
                setEmployeeClasses(data);
            }),
        );
    };

    const onEdit = (id) => {
        setEmployeeClassId(id?._id);
        // let _empDeptData = employeeDepartments.find((item) => item._id === id);
        // setData({ departments: [_empDeptData.department], wage: _empDeptData.wage });
        setVisible(true);
    };

    const itemTemplate = (item) => {
        return (
            <div className="col-12 grid" key={item.id}>
                <div className="col-11">{item.payType}</div>
                <div className="col-1">
                    <i className="mx-2 cursor-pointer pi pi-pencil" onClick={() => onEdit(item)} />
                    <i className="mx-2 cursor-pointer pi pi-trash" onClick={() => onDelete(item)} />
                </div>
            </div>
        );
    };

    const onDelete = (col) => {
        confirmDelete(() => {
            dispatch(
                deleteEmployeeClasses(col._id, () => {
                    funcGetEmpClasses(id);
                }),
            );
        }, 'Do you want to delete this Employee Classes?');
    };
    return (
        <div>
            <CustomFilterCard buttonTitle="Add" onClick={() => setVisible(true)} />
            <CustomCard col="12" title="Pay">
                <DataView value={employeeClasses} itemTemplate={itemTemplate} />
                <AddandEditClasses
                    visible={visible}
                    setVisible={setVisible}
                    id={id}
                    employeeClassId={employeeClassId}
                    setEmployeeClassId={setEmployeeClassId}
                />
            </CustomCard>
        </div>
    );
}
