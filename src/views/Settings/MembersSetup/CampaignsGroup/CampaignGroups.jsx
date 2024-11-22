import React, { useEffect } from 'react';
import CustomTable from '../../../../shared/Table/CustomTable';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CustomFilterCard } from '../../../../shared/Cards/CustomCard';
import { confirmDelete } from '../../../../utils/commonFunctions';
import PrimaryButton from '../../../../shared/Button/CustomButton';
import useFilters from '../../../../hooks/useFilters';
import ActiveFilter from '../../../../components/Filters/ActiveFilter';
import { deleteCampaignGroup, getCampaignGroups } from '../../../../redux/actions/Settings/MembershipSetup/campaignsGroupAction';

const CompaignGroups = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCampaignGroups());
    }, [dispatch]);

    const allCompaignGroups = useSelector((state) => state?.settings?.members?.campaignGroups);
    const { isTableLoading } = useSelector((state) => state?.tableLoader);

    const columns = [
        { field: 'name', header: 'Name' },
        { field: 'isActive', header: 'Active' },
    ];

    const onEdit = (col) => {
        history.push(`/settings/member-setup/campaign-group/edit/${col._id}`);
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
    const { tableData, onFilterOpen, onFilterClose, onApplyFilters, filters, isFilterVisible } = useFilters(allCompaignGroups);

    return (
        <>
            <CustomFilterCard buttonTitle="Add Compaigns Group" linkTo="/settings/member-setup/campaign-group/add" contentPosition="end">
                <PrimaryButton label="Filters" icon="pi pi-filter" className="mx-2" onClick={onFilterOpen} />
            </CustomFilterCard>
            <ActiveFilter filters={filters} onApplyFilters={onApplyFilters} isFilterVisible={isFilterVisible} onFilterClose={onFilterClose} />
            <CustomTable data={tableData} columns={columns} onEdit={onEdit} onDelete={onDelete} loading={isTableLoading} />
        </>
    );
};

export default CompaignGroups;
