import React, { useEffect, useState } from 'react';
import { CustomFilterCard, CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import CustomTable from '../../../../shared/Table/CustomTable';
import CustomDialog from '../../../../shared/Overlays/CustomDialog';
import { CustomInput } from '../../../../shared/Input/AllInputs';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addMembershipType, deleteMembershipType } from '../../../../redux/actions/MembersSettings/membershipTypes';
import { confirmDelete, showFormErrors } from '../../../../utils/commonFunctions';
import formValidation from '../../../../utils/validations';
import PrimaryButton from '../../../../shared/Button/CustomButton';
import useFilters from '../../../../hooks/useFilters';
import MemberTypeFilter from './MemberTypeFilter';
import { getMembersipTypes } from '../../../../redux/actions/Settings/MembershipSetup/membershipType';

const MembershipTypes = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getMembersipTypes());
    }, [dispatch]);

    const { membershipTypes } = useSelector((state) => state.settings.members);
    const allMembershipTypes2 = useSelector((state) => console.log(state));

    // const { membershipTypes } = useSelector((state) => state.membershipTypes);
    const { loading } = useSelector((state) => state?.loader?.isLoading);
    const [visible, setVisible] = useState(false);

    const columns = [
        { field: 'name', header: 'Name' },
        { field: 'description', header: 'Description' },
        { field: 'discountType', header: 'Discount Type' },
        { field: 'totalMember', header: '# Members' },
        { field: 'isActive', header: 'Active' },
    ];

    const onEdit = (col) => {
        history.push(`/settings/members/membership-types/edit/${col._id}`);
    };
    const onCopy = (col) => {
        setVisible(col);
    };

    const onDelete = (col, position) => {
        confirmDelete(
            () => {
                dispatch(deleteMembershipType(col._id, () => {}));
            },
            'Do you want to delete this Membership Type ?',
            position,
        );
    };

    const handleSave = () => {
        if (showFormErrors(data, setData)) {
            const payload = {
                name: data.name,
                description: visible.description,
                discountType: visible.discountType,
                accessRestriction: visible.accessRestriction,
                accessSchedule: visible.accessSchedule,
                remotecheckin: visible.remotecheckin,
                transferToAnotherType: visible.transferToAnotherType,
                clubCreditAmount: visible.clubCreditAmount,
                specialRestriction: visible.specialRestriction,
                minimumAgeAllowed: visible.minimumAgeAllowed,
                maximumAgeAllowed: visible.maximumAgeAllowed,
                maximumDaysAllowed: visible.maximumDaysAllowed,
                maximumDistanceAllowed: visible.maximumDistanceAllowed,
                club: visible.club,
                services: visible.services,
                isActive: visible.isActive,
            };
            dispatch(
                addMembershipType(payload, () => {
                    onClose();
                    dispatch(getMembersipTypes());
                }),
            );
        }
    };

    const [data, setData] = useState({
        name: '',
    });

    const handleChange = ({ name, value }) => {
        const formErrors = formValidation(name, value, data);
        setData((prev) => ({ ...prev, [name]: value, formErrors }));
    };

    const onClose = () => {
        setVisible(null);
        setData({
            name: '',
        });
    };

    const { tableData, onFilterOpen, onFilterClose, onApplyFilters, filters, isFilterVisible } = useFilters(membershipTypes);

    return (
        <>
            <CustomFilterCard buttonTitle="Add Membership Types" linkTo="/settings/members/membership-types/add" contentPosition="end">
                <div className="text-end w-full">
                    <PrimaryButton label="Filter" icon="pi pi-filter" onClick={onFilterOpen} className="mx-2 " />
                </div>
            </CustomFilterCard>
            <CustomTable data={tableData} columns={columns} onEdit={onEdit} onDelete={onDelete} onCopy={onCopy} />
            <MemberTypeFilter filters={filters} onApplyFilters={onApplyFilters} isFilterVisible={isFilterVisible} onFilterClose={onFilterClose} />
            <CustomDialog title="Copy Membership Types" visible={visible} onCancel={onClose} loading={loading} onSave={handleSave}>
                <CustomGridLayout>
                    <CustomInput col="12" name="name" data={data} onChange={handleChange} />
                </CustomGridLayout>
            </CustomDialog>
        </>
    );
};

export default MembershipTypes;
