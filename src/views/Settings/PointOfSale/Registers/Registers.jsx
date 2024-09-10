import React from 'react';
import { CustomFilterCard } from '../../../../shared/Cards/CustomCard';
import CustomTable from '../../../../shared/Table/CustomTable';
import { useHistory } from 'react-router-dom';
import useRegister from '../../../../hooks/useRegister';

const Registers = () => {
    const history = useHistory();
    const { allRegisters } = useRegister();
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
