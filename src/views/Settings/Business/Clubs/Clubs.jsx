import React from 'react';
import CustomTable from '../../../../shared/Table/CustomTable';
import { useHistory } from 'react-router-dom';
import useGetClubs from '../../../../hooks/useGetClubs';

const Clubs = () => {
    const history = useHistory();
    const { allClubs } = useGetClubs();

    const columns = [
        { field: 'phoneNumber', header: 'Phone Number' },
        { field: 'email', header: 'Email' },
        { field: 'address', header: 'Address' },
    ];

    const onEdit = (col) => {
        history.push(`/settings/business/clubs/edit/${col._id}`);
    };
    return (
        <>
            <CustomTable data={allClubs} columns={columns} onEdit={onEdit} />
        </>
    );
};

export default Clubs;
