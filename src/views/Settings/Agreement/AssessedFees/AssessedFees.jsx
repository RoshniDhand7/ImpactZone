import React, { useEffect, useState } from 'react';
import { CustomFilterCard, CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { confirmDelete } from '../../../../utils/commonFunctions';
import CustomTable from '../../../../shared/Table/CustomTable';
import moment from 'moment';
import { CustomDropDown, CustomMultiselect } from '../../../../shared/Input/AllInputs';
import { ActiveFilterDropdown } from '../../../../utils/dropdownConstants';
import { getProfitCenters } from '../../../../redux/actions/InventorySettings/profitCenterAction';
import PrimaryButton from '../../../../shared/Button/CustomButton';
import useFilters from '../../../../hooks/useFilters';
import FilterComponent from '../../../../components/FilterComponent';
import useGetClubs from '../../../../hooks/useGetClubs';
import { deleteAssessedFee, getAssesedFees } from '../../../../redux/actions/Settings/AgreementSetup/assessedFeeAction';

const AssessedFees = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProfitCenters());
        dispatch(getAssesedFees());
    }, [dispatch]);

    let allAssessedFees = useSelector((state) => state.settings.agreement.assessedFees);
    const { profitCenterDropdown } = useSelector((state) => state.profitCenter);
    const { clubsDropdown } = useGetClubs();

    const columns = [
        { field: 'name', header: 'Name' },
        { field: 'type', header: 'Type' },
        { field: 'profitCenter', header: 'Profit Center' },
        { field: 'amount', header: 'Amount' },
        { field: 'createdAt', body: (r) => moment(r.createdAt).format('DD-MM-YYYY'), header: 'Start Date' },
        { field: 'clubName', body: (r) => r?.clubName?.join(' , '), header: 'Club' },
        { field: 'isActive', header: 'Active' },
    ];

    const onEdit = (col) => {
        history.push(`/settings/agreement/assessed-fees/edit/${col._id}`);
    };

    const onDelete = (col, position) => {
        confirmDelete(
            () => {
                dispatch(
                    deleteAssessedFee(col._id, () => {
                        dispatch(getAssesedFees());
                    }),
                );
            },
            'Do you want to delete this AssessedFees ?',
            position,
        );
    };

    const [data, setData] = useState({
        filterType: 'AND',
    });

    const handleChange = ({ name, value }) => {
        setData((prev) => ({ ...prev, [name]: value }));
    };
    const { tableData, onFilterOpen, onFilterClose, onApplyFilters, filters, isFilterVisible } = useFilters(allAssessedFees);

    return (
        <>
            <CustomFilterCard buttonTitle="Add Assessed Fees" linkTo="/settings/agreement/assessed-fees/add" contentPosition="end">
                <PrimaryButton label="Filters" icon="pi pi-filter" className="mx-2" onClick={onFilterOpen} />
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
                    <CustomDropDown
                        col={12}
                        label="Status"
                        name="isActive"
                        options={ActiveFilterDropdown}
                        optionLabel="name"
                        data={data}
                        onChange={handleChange}
                    />
                    <CustomMultiselect col={12} label="Club" name="clubId" options={clubsDropdown} data={data} onChange={handleChange} showClear />
                    <CustomMultiselect
                        col={12}
                        label="Profit Center"
                        name="profitCenterId"
                        options={profitCenterDropdown}
                        data={data}
                        onChange={handleChange}
                    />
                </CustomGridLayout>
            </FilterComponent>
            <CustomTable data={tableData} columns={columns} onEdit={onEdit} onDelete={onDelete} />
        </>
    );
};

export default AssessedFees;
