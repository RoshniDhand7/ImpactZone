import React, { useEffect } from 'react';
import CustomTable from '../../../../shared/Table/CustomTable';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CustomFilterCard } from '../../../../shared/Cards/CustomCard';
import { confirmDelete } from '../../../../utils/commonFunctions';
import { deleteCampaign, getCampaigns } from '../../../../redux/actions/MembersSettings/campaigns';

const Campaigns = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCampaigns());
    }, [dispatch]);

    const { allCompaigns } = useSelector((state) => state.campaign);

    const columns = [
        { field: 'name', header: 'Name' },
        { field: 'campaignGroup', header: 'Compaign Group' },
        { field: 'description', header: 'Description' },
        { field: 'isActive', header: 'Active' },
    ];

    const onEdit = (col) => {
        history.push(`/settings/members/campaigns/edit/${col._id}`);
    };

    const onDelete = (col, position) => {
        confirmDelete(
            () => {
                dispatch(deleteCampaign(col._id, () => {}));
            },
            'Do you want to delete this Compaigns ?',
            position,
        );
    };
    return (
        <>
            <CustomFilterCard buttonTitle="Add Compaigns" linkTo="/settings/members/campaigns/add" />
            <CustomTable data={allCompaigns} columns={columns} onEdit={onEdit} onDelete={onDelete} />
        </>
    );
};

export default Campaigns;
