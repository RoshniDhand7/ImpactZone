import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import CustomTable from '../../../../shared/Table/CustomTable';
import { CustomFilterCard } from '../../../../shared/Cards/CustomCard';
import { getRegistersAction } from '../../../../redux/actions/Settings/POS/registerActions';

const Registers = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { registers } = useSelector((state) => state.settings.pos);

    useEffect(() => {
        dispatch(getRegistersAction());
    }, [dispatch]);

    const columns = [
        { field: 'name', header: 'Name' },
        { field: 'club', header: 'Club' },
        { field: 'isActive', header: 'Active' },
    ];
    const onEdit = (col) => {
        history.push(`/settings/pos/register/edit/${col._id}`);
    };

    return (
        <>
            <CustomFilterCard buttonTitle="Add Register" linkTo="/settings/pos/register/add"></CustomFilterCard>
            <CustomTable data={registers} columns={columns} onEdit={onEdit} />
        </>
    );
};

export default Registers;
