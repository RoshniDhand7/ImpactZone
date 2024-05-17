import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { confirmDelete } from '../../../../utils/commonFunctions';
import { CustomFilterCard, CustomSearchCard } from '../../../../shared/Cards/CustomCard';
import CustomTable from '../../../../shared/Table/CustomTable';
import { deletePaymentMethod, getPaymentMethods } from '../../../../redux/actions/PosSettings/PaymentMethods';
import { ActiveFilterDropdown } from '../../../../utils/dropdownConstants';
import { CustomDropDown } from '../../../../shared/Input/AllInputs';

const PaymentMethods = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [data, setData] = useState({
        isActive: 'active',
    });
    useEffect(() => {
        dispatch(getPaymentMethods(data?.isActive));
    }, [dispatch, data?.isActive]);

    const { allPaymentMethod } = useSelector((state) => state.paymentMethod);

    console.log(allPaymentMethod);

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
                dispatch(deletePaymentMethod(col._id, () => {}));
            },
            'Do you want to delete this delete Payment Method ?',
            position,
        );
    };

    const handleChange = ({ name, value }) => {
        setData((prev) => ({ ...prev, [name]: value }));
    };
    return (
        <>
            <CustomFilterCard buttonTitle="Add Payment Methods" linkTo="/settings/pos/payment-methods/add" />
            <CustomSearchCard>
                <CustomDropDown col={3} name="isActive" options={ActiveFilterDropdown} optionLabel="name" data={data} onChange={handleChange} />
            </CustomSearchCard>
            <CustomTable data={allPaymentMethod} columns={columns} convertToboolean={true} onEdit={onEdit} onDelete={onDelete} />
        </>
    );
};

export default PaymentMethods;
