import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { confirmDelete } from '../../../../utils/commonFunctions';
import { CustomFilterCard } from '../../../../shared/Cards/CustomCard';
import CustomTable from '../../../../shared/Table/CustomTable';
import { deletePaymentMethod, getPaymentMethods } from '../../../../redux/actions/PosSettings/PaymentMethods';
import PrimaryButton from '../../../../shared/Button/CustomButton';
import useFilters from '../../../../hooks/useFilters';
import ActiveFilter from '../../../../components/Filters/ActiveFilter';

const PaymentMethods = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPaymentMethods());
    }, [dispatch]);

    const { allPaymentMethod } = useSelector((state) => state.paymentMethod);

    const { tableData, onFilterOpen, onFilterClose, onApplyFilters, filters, isFilterVisible } = useFilters(allPaymentMethod);

    const columns = [
        { field: 'name', header: 'Name' },
        { field: 'detail', header: 'Detail' },
        { field: 'code', header: 'Code' },
        { field: 'count', header: 'Count' },
        { field: 'income', header: 'Income' },
        { field: 'allowMultiple', header: 'Allow Multiple' },
        { field: 'allowChange', header: 'Allow Change' },
        { field: 'requireMember', header: 'Require Member' },
        { field: 'allowNegativeDrawerAmount', header: 'Allow Negative' },
        { field: 'isActive', header: 'Active' },
    ];

    const onEdit = (col) => {
        history.push(`/settings/pos/payment-methods/edit/${col._id}`);
    };

    const onDelete = (col, position) => {
        confirmDelete(
            () => {
                dispatch(
                    deletePaymentMethod(col._id, () => {
                        dispatch(getPaymentMethods());
                    }),
                );
            },
            'Do you want to delete this delete Payment Method ?',
            position,
        );
    };

    return (
        <>
            <CustomFilterCard buttonTitle="Add Payment Methods" linkTo="/settings/pos/payment-methods/add" contentPosition="end">
                <PrimaryButton label="Filter" icon="pi pi-filter" onClick={onFilterOpen} className="mx-2 " />
            </CustomFilterCard>
            <ActiveFilter filters={filters} onApplyFilters={onApplyFilters} isFilterVisible={isFilterVisible} onFilterClose={onFilterClose} />
            <CustomTable data={tableData} columns={columns} convertToboolean={true} onEdit={onEdit} onDelete={onDelete} />
        </>
    );
};

export default PaymentMethods;
