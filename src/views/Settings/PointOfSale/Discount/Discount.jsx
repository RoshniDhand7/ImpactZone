import React, { useEffect, useState } from 'react';
import { CustomFilterCard, CustomSearchCard } from '../../../../shared/Cards/CustomCard';
import CustomTable from '../../../../shared/Table/CustomTable';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { confirmDelete } from '../../../../utils/commonFunctions';
import { deleteDiscountType, getDiscountTypes } from '../../../../redux/actions/PosSettings/discountType';
import moment from 'moment';
import { CustomDropDown } from '../../../../shared/Input/AllInputs';
import { ActiveFilterDropdown } from '../../../../utils/dropdownConstants';

const Discount = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const [filteredDiscountType, setFilteredDiscountType] = useState([]);
    const [data, setData] = useState({
        isActive: 'all',
    });
    useEffect(() => {
        dispatch(getDiscountTypes());
    }, [dispatch]);

    const { allDiscountTypes } = useSelector((state) => state.discountType);

    const filterDiscountType = () => {
        let filtered = allDiscountTypes || [];
        if (data?.isActive === 'active') {
            filtered = filtered.filter((item) => item.isActive);
        } else if (data?.isActive === 'inactive') {
            filtered = filtered.filter((item) => !item.isActive);
        } else {
            filtered = allDiscountTypes;
        }
        setFilteredDiscountType(filtered);
    };

    useEffect(() => {
        filterDiscountType();
    }, [data]);

    const columns = [
        { field: 'discountName', header: 'Name' },
        { field: 'description', header: 'Description' },
        { field: 'percentage', body: (r) => r.percentage + '%', header: 'Discount' },
        { field: 'startDate', body: (r) => moment(r.startDate).format('DD-MM-YYYY'), header: 'Start Date' },
        { field: 'endDate', body: (r) => moment(r.endDate).format('DD-MM-YYYY'), header: 'End Date' },
    ];

    const onEdit = (col) => {
        history.push(`/settings/pos/discount/edit/${col._id}`);
    };

    const onDelete = (col, position) => {
        confirmDelete(
            () => {
                dispatch(
                    deleteDiscountType(col._id, () => {
                        dispatch(getDiscountTypes());
                    }),
                );
            },
            'Do you want to delete this delete Discount ?',
            position,
        );
    };

    const handleChange = ({ name, value }) => {
        setData((prev) => ({ ...prev, [name]: value }));
    };
    return (
        <>
            <CustomFilterCard buttonTitle="Add Discount Type" linkTo="/settings/pos/discount/add" />
            <CustomSearchCard>
                <CustomDropDown col={3} label="Status" name="isActive" options={ActiveFilterDropdown} optionLabel="name" data={data} onChange={handleChange} />
            </CustomSearchCard>
            <CustomTable data={allDiscountTypes} columns={columns} onEdit={onEdit} onDelete={onDelete} />
        </>
    );
};

export default Discount;