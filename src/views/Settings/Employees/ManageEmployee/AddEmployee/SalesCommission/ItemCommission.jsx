import React, { useState, useEffect } from 'react';
import { CustomFilterCard, CustomGridLayout } from '../../../../../../shared/Cards/CustomCard';
import CustomDialog from '../../../../../../shared/Overlays/CustomDialog';
import { useParams } from 'react-router-dom';
import { CustomDropDown, CustomInput, CustomInputNumber } from '../../../../../../shared/Input/AllInputs';
import { EmployeeCommissionType, amountTypeOptions } from '../../../../../../utils/dropdownConstants';
import { useDispatch, useSelector } from 'react-redux';
import CustomTable from '../../../../../../shared/Table/CustomTable';
import { confirmDelete, showFormErrors } from '../../../../../../utils/commonFunctions';
import {
    addEmployeeSalesItem,
    deletetEmployeeSaleItem,
    editEmployeeSalesItem,
    getEmployeeSaleItem,
    getEmployeeSalesItem,
} from '../../../../../../redux/actions/EmployeeSettings/salesCommssionAction';
import { getCommissionGroups } from '../../../../../../redux/actions/InventorySettings/commissionGroupAction';
import formValidation from '../../../../../../utils/validations';

const ItemCommission = () => {
    const dispatch = useDispatch();
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [employeeSalesItemId, setEmployeeSalesItemId] = useState(null);
    const [itemCommissionData, setItemCommissionData] = useState([]);

    const initialState = {
        commissionGroup: '',
        type: 'ITEM_COMMISSION', //ITEM_COMMISSION, BONUS
        commissionType: 'PER_ITEM', //PER_SALE,PER_ITEM
        amountType: 'FIXED', //PERCENTAGE,FIXED
        pay: '0',
        salesCode: '',
    };

    const [data, setData] = useState(initialState);

    const { id } = useParams();

    useEffect(() => {
        funcGetEmpSalesItem(id);
        dispatch(getCommissionGroups());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const { commissionGroupsDropdown } = useSelector((state) => state?.commissionGroup);
    const funcGetEmpSalesItem = (id) => {
        dispatch(
            getEmployeeSalesItem(id, 'ITEM_COMMISSION', setLoading, (data) => {
                setItemCommissionData(data);
            }),
        );
    };

    useEffect(() => {
        if (employeeSalesItemId) {
            dispatch(
                getEmployeeSaleItem(employeeSalesItemId, setLoading, (data) => {
                    setData({
                        commissionGroup: data.commissionGroup,
                        type: data.type,
                        commissionType: data.commissionType,
                        amountType: data.amountType,
                        pay: data.pay,
                        salesCode: data.salesCode,
                    });
                }),
            );
        }
    }, [employeeSalesItemId, dispatch]);

    const onClose = () => {
        setEmployeeSalesItemId(null);
        setData(initialState);
        setVisible(false);
    };

    const handleChange = ({ name, value }) => {
        const formErrors = formValidation(name, value, data);
        setData((prev) => ({ ...prev, [name]: value, formErrors }));
    };

    const columns = [
        { field: 'commissionGroup', header: 'Commission Group' },
        { field: 'commissionType', header: 'Commission Type' },
        { field: 'pay', header: 'Pay' },
    ];

    const onDelete = (col) => {
        confirmDelete(() => {
            dispatch(
                deletetEmployeeSaleItem(col._id, () => {
                    funcGetEmpSalesItem(id);
                    onClose();
                }),
            );
        }, 'Do you want to delete this Item Commission?');
    };
    const onEdit = (col) => {
        setEmployeeSalesItemId(col?._id);
        setVisible(true);
    };

    const handleSave = () => {
        if (showFormErrors(data, setData)) {
            if (employeeSalesItemId) {
                dispatch(
                    editEmployeeSalesItem(employeeSalesItemId, { ...data }, setLoading, () => {
                        funcGetEmpSalesItem(id);
                        onClose();
                    }),
                );
            } else {
                dispatch(
                    addEmployeeSalesItem({ ...data, employee: id }, setLoading, () => {
                        funcGetEmpSalesItem(id);
                        onClose();
                    }),
                );
            }
        }
    };

    return (
        <>
            <CustomFilterCard buttonTitle="Add" onClick={() => setVisible(true)} />
            <CustomTable data={itemCommissionData} columns={columns} onEdit={onEdit} onDelete={onDelete} />

            <CustomDialog title={employeeSalesItemId ? 'Edit' : 'Add'} visible={visible} onCancel={onClose} loading={loading} onSave={handleSave}>
                <CustomGridLayout>
                    <CustomDropDown name="commissionGroup" data={data} onChange={handleChange} options={commissionGroupsDropdown} optionLabel="name" col={12} />
                    <CustomDropDown name="commissionType" data={data} onChange={handleChange} options={EmployeeCommissionType} col={12} />
                    <CustomInput col={6} name="salesCode" data={data} onChange={handleChange} />
                    <CustomInputNumber name="pay" data={data} onChange={handleChange} />
                    <CustomDropDown label="" name="amountType" options={amountTypeOptions} data={data} onChange={handleChange} col={4} />
                </CustomGridLayout>
            </CustomDialog>
        </>
    );
};

export default ItemCommission;
