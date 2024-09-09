import React, { useEffect } from 'react';
import { CustomFilterCard } from '../../../../shared/Cards/CustomCard';
import CustomTable from '../../../../shared/Table/CustomTable';
import { useDispatch, useSelector } from 'react-redux';
import { getRegisters } from '../../../../redux/actions/PosSettings/register';
import { useHistory } from 'react-router-dom';

const Registers = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(getRegisters());
    }, [dispatch]);

    const { allRegisters } = useSelector((state) => state.registers);

    const columns = [
        { field: 'name', header: 'Name' },
        { field: 'clubName', header: 'Club' },
    ];

    const onEdit = (col) => {
        history.push(`/settings/pos/register/edit/${col._id}`);
    };

    return (
        <>
            <CustomFilterCard buttonTitle="Add Register" linkTo="/settings/pos/register/add" contentPosition="end"></CustomFilterCard>
            <CustomTable data={allRegisters} columns={columns} onEdit={onEdit} />
        </>
    );
};

export default Registers;
