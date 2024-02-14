import React, { useState, useEffect } from 'react';
import { DataView } from 'primereact/dataview';
import { useSelector, useDispatch } from 'react-redux';
import CustomCard from '../../../../../../shared/Cards/CustomCard';
import { getEmployeeClasses } from '../../../../../../redux/actions/EmployeeSettings/classesAction';
import { useParams } from 'react-router-dom';

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

    console.log(employeeClasses);

    const funcGetEmpClasses = (id) => {
        dispatch(
            getEmployeeClasses(id, setLoading, (data) => {
                setEmployeeClasses(data);
            }),
        );
    };

    const itemTemplate = (item) => {
        return (
            <div className="col-12 grid" key={item.id}>
                <div className="col-11">{item.payType}</div>
                <div className="col-1">
                    <i className="mx-2 cursor-pointer pi pi-pencil" />
                    <i className="mx-2 cursor-pointer pi pi-trash" />
                </div>
            </div>
        );
    };
    return (
        <div>
            <CustomCard col="12" title="Pay">
                <DataView value={employeeClasses} itemTemplate={itemTemplate} />
            </CustomCard>
        </div>
    );
}
