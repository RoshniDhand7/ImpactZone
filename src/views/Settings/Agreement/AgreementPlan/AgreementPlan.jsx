import React, { useEffect, useMemo, useState } from 'react';
import { CustomFilterCard, CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { confirmDelete } from '../../../../utils/commonFunctions';
import CustomTable from '../../../../shared/Table/CustomTable';
import { deleteMembershipPlan, getMembershipPlans } from '../../../../redux/actions/Settings/AgreementSetup/agreementPlanAction';
import PrimaryButton from '../../../../shared/Button/CustomButton';
import FilterComponent from '../../../../components/FilterComponent';
import useFilters from '../../../../hooks/useFilters';
import { CustomDropDown, CustomInput } from '../../../../shared/Input/AllInputs';
import { ActiveFilterDropdown, yesNoOptions } from '../../../../utils/dropdownConstants';
import useGetClubs from '../../../../hooks/useGetClubs';
import { getAgreementCategories } from '../../../../redux/actions/Settings/AgreementSetup/agreementCategoriesAction';

const AgreementPlan = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getMembershipPlans());
        dispatch(getAgreementCategories());
    }, [dispatch]);

    const [data, setData] = useState({
        filterType: 'AND',
    });
    const handleChange = ({ name, value }) => {
        if (name === 'categoryId') {
            setData((prev) => ({ ...prev, [name]: value, subCategory: '' }));
        } else {
            setData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const { agreementPlans } = useSelector((state) => state.settings.agreement);

    const columns = [
        { field: 'name', header: ' Plan Name' },
        { field: 'club', header: 'Clubs' },
        { field: 'category', header: 'Category' },
        { field: 'membershipType', body: (r) => r?.membershipType?.name, header: 'Membership Type' },
        {
            field: 'noOfMembers',
            header: 'No. of Members',
        },
        { field: 'sellOnline', header: 'Sold Online' },
        { field: 'isActive', header: 'Availability' },
    ];

    const onEdit = (col) => {
        history.push(`/settings/agreement/agreement-plan/edit/${col._id}`);
    };

    const onDelete = (col, position) => {
        confirmDelete(
            () => {
                dispatch(
                    deleteMembershipPlan(col._id, () => {
                        dispatch(agreementPlans());
                    }),
                );
            },
            'Do you want to delete this Agreement Plan ?',
            position,
        );
    };
    const { clubsDropdown } = useGetClubs();
    let { agreementCategoriesDropdown, agreementCategories } = useSelector((state) => state.settings.agreement);

    const { tableData, onFilterOpen, onFilterClose, onApplyFilters, filters, isFilterVisible } = useFilters(agreementPlans);

    const subcategoryOptions = useMemo(() => {
        return agreementCategories.find((category) => category._id === data.categoryId)?.subCategories?.map((item) => ({ name: item, value: item })) || [];
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data.categoryId]);

    return (
        <>
            <CustomFilterCard buttonTitle="Add Agreement Plan" linkTo="/settings/agreement/agreement-plan/add" contentPosition="end">
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
                        showClear
                    />
                    <CustomDropDown
                        col={12}
                        label="Category"
                        name="categoryId"
                        options={agreementCategoriesDropdown}
                        onChange={handleChange}
                        data={data}
                        showClear
                    />
                    <CustomDropDown name="subCategory" options={subcategoryOptions} onChange={handleChange} data={data} col={12} showClear />
                    <CustomDropDown name="clubId" label="Club" options={clubsDropdown} onChange={handleChange} data={data} col={12} showClear />
                    <CustomInput name="name" label="Plan Name" data={data} onChange={handleChange} col={12} />
                    <CustomDropDown name="sellOnline" options={yesNoOptions} onChange={handleChange} data={data} col={12} showClear />
                </CustomGridLayout>
            </FilterComponent>
            <CustomTable data={tableData} columns={columns} onEdit={onEdit} onDelete={onDelete} />
        </>
    );
};

export default AgreementPlan;
