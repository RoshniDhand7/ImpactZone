import React, { useState, useEffect } from 'react';
import { CustomFilterCard, CustomGridLayout } from '../../../../../../shared/Cards/CustomCard';
import CustomDialog from '../../../../../../shared/Overlays/CustomDialog';
import { useParams } from 'react-router-dom';
import { CustomDropDown, CustomInput, CustomInputDecimalNumber, CustomInputNumber } from '../../../../../../shared/Input/AllInputs';
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
import PrimaryButton from '../../../../../../shared/Button/CustomButton';
import { getEmployeesFilterType } from '../../../../../../redux/actions/EmployeeSettings/employeesAction';

const ItemCommission = () => {
    const dispatch = useDispatch();
    const [openSimilar, setOpenSimilarTo] = useState(false);

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
    };

    const [data, setData] = useState(initialState);

    const { id } = useParams();
    const [data1, setData1] = useState({
        employee: '',
    });
    useEffect(() => {
        dispatch(getEmployeesFilterType('salesCommission'));
    }, [dispatch]);

    let { allEmployeesFilter } = useSelector((state) => state.employees);

    allEmployeesFilter = allEmployeesFilter?.filter((item) => item._id !== id);
    const handleInputChange = ({ name, value }) => {
        const formErrors = formValidation(name, value, data1);
        setData1((prev) => ({ ...prev, [name]: value, formErrors }));
    };

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
    const handleSaveSimilar = () => {
        if (showFormErrors(data1, setData1)) {
            dispatch(
                addEmployeeSalesItem(
                    {
                        employeeSalesCommissionData: data1?.employee?.employeeSalesCommissionData,
                        similarTo: data1?.employee?.id,
                        employee: id,
                        type: 'itemCommission',
                    },
                    setLoading,
                    () => {
                        funcGetEmpSalesItem(id);
                        setOpenSimilarTo(false);
                    },
                ),
            );
            setData1({
                employee: '',
            });
        }
    };

    return (
        <>
            <CustomFilterCard buttonTitle="Add" onClick={() => setVisible(true)}>
                <div className=" flex justify-content-between align-items-end">
                    <PrimaryButton name="Similar To" className="w-12rem" label="Similar To" onClick={() => setOpenSimilarTo(true)} />
                </div>
            </CustomFilterCard>
            <CustomTable data={itemCommissionData} columns={columns} onEdit={onEdit} onDelete={onDelete} />

            <CustomDialog title={employeeSalesItemId ? 'Edit' : 'Add'} visible={visible} onCancel={onClose} loading={loading} onSave={handleSave}>
                <CustomGridLayout>
                    <CustomDropDown name="commissionGroup" data={data} onChange={handleChange} options={commissionGroupsDropdown} optionLabel="name" col={12} />
                    <CustomDropDown name="commissionType" data={data} onChange={handleChange} options={EmployeeCommissionType} col={12} />
                    <CustomInputDecimalNumber name="pay" data={data} onChange={handleChange} />
                    <CustomDropDown label="" name="amountType" options={amountTypeOptions} data={data} onChange={handleChange} col={4} />
                </CustomGridLayout>
            </CustomDialog>

            <CustomDialog title={'Similar To'} visible={openSimilar} onCancel={() => setOpenSimilarTo(false)} loading={loading} onSave={handleSaveSimilar}>
                <CustomGridLayout>
                    <CustomDropDown
                        name="employee"
                        col={12}
                        data={data1}
                        onChange={handleInputChange}
                        options={allEmployeesFilter?.map((item) => ({
                            name: `${item.firstName} ${item.middleInitial} ${item.lastName}`,
                            value: {
                                id: item._id,
                                employeeSalesCommissionData: item.employeeSalesCommissionData?.filter((item) => item.type === 'ITEM_COMMISSION'),
                            },
                        }))}
                    />
                </CustomGridLayout>
            </CustomDialog>
        </>
    );
};

export default ItemCommission;
