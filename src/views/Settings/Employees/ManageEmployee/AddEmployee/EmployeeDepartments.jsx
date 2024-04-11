import React, { useState, useEffect } from 'react';
import { CustomFilterCard, CustomGridLayout } from '../../../../../shared/Cards/CustomCard';
import CustomTable from '../../../../../shared/Table/CustomTable';
import CustomDialog from '../../../../../shared/Overlays/CustomDialog';
import { CustomInputNumber, CustomMultiselect } from '../../../../../shared/Input/AllInputs';
import { useSelector, useDispatch } from 'react-redux';
import {
    addEmployeeDepartment,
    deleteEmployeeDepartment,
    editEmployeeDepartment,
    getDepartments,
    getEmployeeDepartments,
} from '../../../../../redux/actions/EmployeeSettings/departmentsAction';
import { useParams } from 'react-router-dom';
import { confirmDelete } from '../../../../../utils/commonFunctions';

export default function EmployeeDepartments() {
    const { id } = useParams();
    let { departmentsDropdown } = useSelector((state) => state?.department);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDepartments());
        funcGetEmpDepartments(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    const funcGetEmpDepartments = (id) => {
        dispatch(
            getEmployeeDepartments(id, setLoading, (data) => {
                setEmployeeDepartments(data);
            }),
        );
    };

    const columns = [
        { field: 'departmentName', header: 'Name' },
        { field: 'wage', header: 'Wage' },
    ];

    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [employeeDeptId, setEmployeeDeptId] = useState(null);
    const [employeeDepartments, setEmployeeDepartments] = useState([]);
    const [data, setData] = useState({
        departments: [],
        wage: 0,
    });

    const handleChange = ({ name, value }) => {
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        if (employeeDeptId) {
            dispatch(
                editEmployeeDepartment(employeeDeptId, { wage: data.wage }, setLoading, () => {
                    funcGetEmpDepartments(id);
                    onClose();
                }),
            );
        } else {
            dispatch(
                addEmployeeDepartment({ ...data, employee: id }, setLoading, () => {
                    funcGetEmpDepartments(id);
                    onClose();
                }),
            );
        }
    };

    const onEdit = (id) => {
        setEmployeeDeptId(id);
        let _empDeptData = employeeDepartments.find((item) => item._id === id);
        setData({ departments: [_empDeptData.department], wage: _empDeptData.wage });
        setVisible(true);
    };

    const onDelete = (col) => {
        confirmDelete(() => {
            dispatch(
                deleteEmployeeDepartment(col._id, () => {
                    funcGetEmpDepartments(id);
                    onClose();
                }),
            );
        }, 'Do you want to delete this Employee Department?');
    };
    const onClose = () => {
        setVisible(false);
        setData({
            departments: [],
            wage: 0,
        });
        setEmployeeDeptId(null);
    };
    let filterdDepartmentsDropdown = departmentsDropdown.filter((item) => !employeeDepartments.map((ed) => ed.department).includes(item.value));
    return (
        <>
            <CustomFilterCard buttonTitle="Add Department" onClick={() => setVisible(true)} />
            <CustomTable data={employeeDepartments} columns={columns} onEdit={(e) => onEdit(e._id)} onDelete={onDelete} />

            <CustomDialog title="Add" visible={visible} onCancel={onClose} loading={loading} onSave={handleSave}>
                <CustomGridLayout>
                    <CustomMultiselect
                        col="12"
                        name="departments"
                        data={data}
                        onChange={handleChange}
                        options={employeeDeptId ? departmentsDropdown : filterdDepartmentsDropdown}
                        disabled={employeeDeptId ? true : false}
                    />
                    <CustomInputNumber col="12" name="wage" data={data} onChange={handleChange} />
                </CustomGridLayout>
            </CustomDialog>
        </>
    );
}
