import React from 'react';
import CustomTable from '../../../../shared/Table/CustomTable';
import { useHistory } from 'react-router-dom';

import useRegister from '../../../../hooks/useRegister';
import { CustomFilterCard } from '../../../../shared/Cards/CustomCard';

const Registers = () => {
    const history = useHistory();

    const { allRegisters } = useRegister();
    const columns = [
        { field: 'registerId', header: 'Register Id' },
        { field: 'club', header: 'Club' },
    ];
    const onEdit = (col) => {
        history.push(`/settings/pos/register/edit/${col._id}`);
    };

    return (
        <>
            <CustomFilterCard buttonTitle="Add Register" linkTo="/settings/pos/register/add"></CustomFilterCard>
            <CustomTable data={allRegisters} columns={columns} onEdit={onEdit} />
        </>
    );
};

export default Registers;
