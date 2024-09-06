import React, { useEffect } from 'react';
import { CustomFilterCard } from '../../../../shared/Cards/CustomCard';
import CustomTable from '../../../../shared/Table/CustomTable';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getRegisters } from '../../../../redux/actions/PosSettings/register';

const Registers = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getRegisters());
    }, [dispatch]);

    const { allRegisters } = useSelector((state) => state.registers);

    const columns = [
        { field: 'name', header: 'Name' },
        { field: 'club', header: 'Club' },
    ];

    const onEdit = (col) => {};

    return (
        <>
            <CustomFilterCard buttonTitle="Add Register" linkTo="" contentPosition="end"></CustomFilterCard>
            <CustomTable data={allRegisters} columns={columns} onEdit={onEdit} />
        </>
    );
};

export default Registers;
