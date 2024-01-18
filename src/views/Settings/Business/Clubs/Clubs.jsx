import React, { useEffect } from 'react';
import CustomTable from '../../../../shared/Table/CustomTable';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getClubsDetails } from '../../../../redux/actions/BusinessSettings/clubsAction';

const Clubs = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getClubsDetails());
    }, [dispatch]);

    const { allClubs } = useSelector((state) => state.clubs);

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
