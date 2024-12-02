import React, { useEffect, useState } from 'react';
import { CustomFilterCard, CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import CustomTable from '../../../../shared/Table/CustomTable';
import CustomDialog from '../../../../shared/Overlays/CustomDialog';
import { CustomInput } from '../../../../shared/Input/AllInputs';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { confirmDelete, showFormErrors } from '../../../../utils/commonFunctions';
import formValidation from '../../../../utils/validations';
import PrimaryButton from '../../../../shared/Button/CustomButton';
import useFilters from '../../../../hooks/useFilters';
import MemberTypeFilter from './MemberTypeFilter';
import {
    addMembershipType,
    deleteMembershipType,
    getMembersipTypes,
    reorderPriority,
} from '../../../../redux/actions/Settings/MembershipSetup/membershipTypeAction';

const MembershipTypes = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getMembersipTypes());
    }, [dispatch]);

    const { membershipTypes } = useSelector((state) => state.settings.members);
    const [visible, setVisible] = useState(false);

    const columns = [
        { field: 'name', header: 'Name' },
        { field: 'description', header: 'Description' },
        { field: 'discountType', header: 'Discount Type' },
        { field: 'totalMember', header: '# Members' },
        { field: 'isActive', header: 'Active' },
    ];

    const onEdit = (col) => {
        history.push(`/settings/member-setup/membership-type/edit/${col._id}`);
    };
    const onCopy = (col) => {
        setVisible(col);
    };
    const { isTableLoading } = useSelector((state) => state?.tableLoader);

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
                discount: visible.discount,
                accessRestriction: visible.accessRestriction,
                accessSchedule: visible.accessSchedule,
                remoteCheckin: visible.remoteCheckin,
                transferToAnotherType: visible.transferToAnotherType,
                clubCreditAmount: visible.clubCreditAmount,
                specialRestrictions: visible.specialRestrictions,
                minimumAgeAllowed: visible.minimumAgeAllowed,
                maximumAgeAllowed: visible.maximumAgeAllowed,
                maximumDaysAllowed: visible.maximumDaysAllowed,
                maximumDistanceAllowed: visible.maximumDistanceAllowed,
                clubs: visible.clubs,
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

    const handleRowReorder = (reorderedData) => {
        dispatch(
            reorderPriority(reorderedData.value, () => {
                dispatch(getMembersipTypes());
            }),
        );
    };

    const { tableData, onFilterOpen, onFilterClose, onApplyFilters, filters, isFilterVisible } = useFilters(membershipTypes);

    return (
        <>
            <CustomFilterCard buttonTitle="Add Membership Types" linkTo="/settings/member-setup/membership-type/add" contentPosition="end">
                <div className="text-end w-full">
                    <PrimaryButton label="Filter" icon="pi pi-filter" onClick={onFilterOpen} className="mx-2 " />
                </div>
            </CustomFilterCard>
            <CustomTable
                data={tableData}
                columns={columns}
                onEdit={onEdit}
                onDelete={onDelete}
                onCopy={onCopy}
                loading={isTableLoading}
                reorderableRows={true}
                onRowReorder={handleRowReorder}
            />
            <MemberTypeFilter filters={filters} onApplyFilters={onApplyFilters} isFilterVisible={isFilterVisible} onFilterClose={onFilterClose} />
            <CustomDialog title="Copy Membership Types" visible={visible} onCancel={onClose} loading={isTableLoading} onSave={handleSave}>
                <CustomGridLayout>
                    <CustomInput col="12" name="name" data={data} onChange={handleChange} />
                </CustomGridLayout>
            </CustomDialog>
        </>
    );
};

export default MembershipTypes;
