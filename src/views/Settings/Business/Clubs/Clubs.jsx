import React from 'react';
import CustomTable from '../../../../shared/Table/CustomTable';
import { useHistory } from 'react-router-dom';
import useGetClubs from '../../../../hooks/useGetClubs';
import { useSelector } from 'react-redux';

const Clubs = () => {
    const history = useHistory();
    const { clubs } = useGetClubs();
    const { isTableLoading } = useSelector((state) => state?.tableLoader);

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
            <CustomTable data={clubs} columns={columns} onEdit={onEdit} loading={isTableLoading} />
        </>
    );
};

export default Clubs;
