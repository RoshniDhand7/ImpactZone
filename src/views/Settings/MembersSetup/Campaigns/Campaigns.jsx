import React, { useEffect, useState } from 'react';
import CustomTable from '../../../../shared/Table/CustomTable';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CustomFilterCard, CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import { confirmDelete } from '../../../../utils/commonFunctions';
import PrimaryButton from '../../../../shared/Button/CustomButton';
import useFilters from '../../../../hooks/useFilters';
import FilterComponent from '../../../../components/FilterComponent';
import { CustomDropDown, CustomMultiselect } from '../../../../shared/Input/AllInputs';
import { ActiveFilterDropdown } from '../../../../utils/dropdownConstants';
import { deleteCampaign, getCampaigns } from '../../../../redux/actions/Settings/MembershipSetup/campaignsAction';
import { getCampaignTypes } from '../../../../redux/actions/Settings/MembershipSetup/campaignsGroupAction';

const Campaigns = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCampaigns());
        dispatch(getCampaignTypes());
    }, [dispatch]);

    const allCompaigns = useSelector((state) => state?.settings?.members?.campaigns);
    const { allCampaignsTypes } = useSelector((state) => state.settings.members);
    const { isTableLoading } = useSelector((state) => state?.tableLoader);

    const columns = [
        { field: 'name', header: 'Name' },
        { field: 'campaignGroup', header: 'Compaign Group' },
        { field: 'description', body: 'descriptionBodyTemplate', header: 'Description' },
        { field: 'isActive', header: 'Active' },
    ];

    const onEdit = (col) => {
        history.push(`/settings/member-setup/campaigns/edit/${col._id}`);
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
    const { tableData, onFilterOpen, onFilterClose, onApplyFilters, filters, isFilterVisible } = useFilters(allCompaigns);
    const [data, setData] = useState({
        filterType: 'AND',
    });

    const handleChange = ({ name, value }) => {
        setData((prev) => ({ ...prev, [name]: value }));
    };
    return (
        <>
            <CustomFilterCard buttonTitle="Add Compaigns" linkTo="/settings/member-setup/campaigns/add" contentPosition="end">
                <PrimaryButton label="Filters" icon="pi pi-filters" className="mx-2" onClick={onFilterOpen} />
            </CustomFilterCard>
            <FilterComponent
                value={filters}
                onApply={onApplyFilters}
                visible={isFilterVisible}
                onHide={onFilterClose}
                data={data}
                handleChange={handleChange}
                setData={setData}
            >
                <CustomGridLayout>
                    <CustomDropDown col={12} label="Status" name="isActive" options={ActiveFilterDropdown} data={data} onChange={handleChange} showClear />
                    <CustomMultiselect col={12} label="Type" name="campaignType" options={allCampaignsTypes} data={data} onChange={handleChange} showClear />
                </CustomGridLayout>
            </FilterComponent>
            <CustomTable data={tableData} columns={columns} onEdit={onEdit} onDelete={onDelete} loading={isTableLoading} />
        </>
    );
};

export default Campaigns;
