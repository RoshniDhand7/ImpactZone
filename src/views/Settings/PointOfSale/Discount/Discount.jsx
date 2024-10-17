import React, { useEffect, useState } from 'react';
import { CustomFilterCard, CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import CustomTable from '../../../../shared/Table/CustomTable';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { confirmDelete } from '../../../../utils/commonFunctions';
import { deleteDiscountType, getDiscountTypes } from '../../../../redux/actions/PosSettings/discountType';
import moment from 'moment';
import PrimaryButton from '../../../../shared/Button/CustomButton';
import useFilters from '../../../../hooks/useFilters';
import FilterComponent from '../../../../components/FilterComponent';
import { CustomDropDown, CustomMultiselect } from '../../../../shared/Input/AllInputs';
import { ActiveFilterDropdown } from '../../../../utils/dropdownConstants';
import useCatalogItems from '../../../../hooks/Inventory/useCatalogItems';

const Discount = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDiscountTypes());
    }, [dispatch]);

    const { allDiscountTypes } = useSelector((state) => state.discountType);

    const columns = [
        { field: 'discountName', header: 'Name' },
        { field: 'description', header: 'Description' },
        {
            body: (r) => {
                return `${r.amountType} === 'FIXED' ? '$'  ${r.amount} : ${r?.amount}  '%`;
            },
            header: 'Discount',
        },
        { field: 'startDate', body: (r) => moment(r.startDate).format('DD-MM-YYYY'), header: 'Start Date' },
        { field: 'endDate', body: (r) => (r?.indefinite ? '-' : moment(r.endDate).format('DD-MM-YYYY')), header: 'End Date' },
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
    const { tableData, onFilterOpen, onFilterClose, onApplyFilters, filters, isFilterVisible } = useFilters(allDiscountTypes);

    const [data, setData] = useState({
        filterType: 'AND',
    });

    const handleChange = ({ name, value }) => {
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const { catalogDropDown } = useCatalogItems();

    return (
        <>
            <CustomFilterCard buttonTitle="Add Discount Type" linkTo="/settings/pos/discount/add" contentPosition="end">
                <PrimaryButton label="Filter" icon="pi pi-filter" onClick={onFilterOpen} className="mx-2 " />
            </CustomFilterCard>
            <FilterComponent
                value={filters}
                onApply={onApplyFilters}
                visible={isFilterVisible}
                onHide={onFilterClose}
                data={data}
                handleChange={handleChange}
                setData={setData}
            >
                <CustomGridLayout>
                    <CustomDropDown col={12} label="Status" name="isActive" options={ActiveFilterDropdown} data={data} onChange={handleChange} showClear />
                    <CustomMultiselect col={12} label="Catalog Items" name="catalogs" options={catalogDropDown} data={data} onChange={handleChange} showClear />
                </CustomGridLayout>
            </FilterComponent>
            <CustomTable data={tableData} columns={columns} onEdit={onEdit} onDelete={onDelete} />
        </>
    );
};

export default Discount;
