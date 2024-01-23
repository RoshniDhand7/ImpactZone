import React, { useEffect } from 'react';
import CustomTable from '../../../../shared/Table/CustomTable';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CustomFilterCard } from '../../../../shared/Cards/CustomCard';
import { confirmDelete } from '../../../../utils/commonFunctions';
import { deleteCampaignGroup, getCampaignsGroups } from '../../../../redux/actions/MembersSettings/compaignsGroup';

const CompaignGroups = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCampaignsGroups());
    }, [dispatch]);

    const { allCompaignGroups } = useSelector((state) => state.compaignGroups);

    const columns = [
        { field: 'name', header: 'Name' },
        { field: 'isActive', header: 'Active' },
    ];

    const onEdit = (col) => {
        history.push(`/settings/members/campaign-group/edit/${col._id}`);
    };

    const onDelete = (col, position) => {
        confirmDelete(
            () => {
                dispatch(deleteCampaignGroup(col._id, () => {}));
            },
            'Do you want to delete this Compaign Group ?',
            position,
        );
    };
    return (
        <>
            <CustomFilterCard buttonTitle="Add Compaigns Group" linkTo="/settings/members/campaign-group/add" />
            <CustomTable data={allCompaignGroups} columns={columns} onEdit={onEdit} onDelete={onDelete} />
        </>
    );
};

export default CompaignGroups;
