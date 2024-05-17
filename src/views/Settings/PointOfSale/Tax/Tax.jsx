import React, { useEffect, useState } from 'react';
import { CustomFilterCard, CustomGridLayout, CustomSearchCard } from '../../../../shared/Cards/CustomCard';
import CustomTable from '../../../../shared/Table/CustomTable';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { confirmDelete } from '../../../../utils/commonFunctions';
import { deleteTax, getTaxes } from '../../../../redux/actions/PosSettings/tax';
import { CustomDropDown } from '../../../../shared/Input/AllInputs';
import { ActiveFilterDropdown } from '../../../../utils/dropdownConstants';

const Tax = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [data, setData] = useState({
        isActive: 'active',
    });
    useEffect(() => {
        dispatch(getTaxes(data?.isActive));
    }, [dispatch, data?.isActive]);

    const { allTaxes } = useSelector((state) => state.taxes);

    const columns = [
        { field: 'taxRateName', header: 'Tax Rate Name' },
        { field: 'taxRatePercentage', body: (r) => r.taxRatePercentage + '%', header: 'Tax Rate Percentage' },
        { field: 'isActive', header: 'Active' },
    ];

    const onEdit = (col) => {
        history.push(`/settings/pos/tax/edit/${col._id}`);
    };

    const onDelete = (col, position) => {
        confirmDelete(
            () => {
                dispatch(deleteTax(col._id, () => {}));
            },
            'Do you want to delete this Tax ?',
            position,
        );
    };

    const handleChange = ({ name, value }) => {
        setData((prev) => ({ ...prev, [name]: value }));
    };
    return (
        <>
            <CustomFilterCard buttonTitle="Add Tax" linkTo="/settings/pos/tax/add" extraClass="align-items-center"></CustomFilterCard>
            <CustomSearchCard>
                <CustomDropDown col={3} name="isActive" options={ActiveFilterDropdown} optionLabel="name" data={data} onChange={handleChange} />
            </CustomSearchCard>

            <CustomTable data={allTaxes} columns={columns} onEdit={onEdit} onDelete={onDelete} />
        </>
    );
};

export default Tax;
