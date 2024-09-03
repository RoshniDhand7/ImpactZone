import React, { useEffect } from 'react';
import { CustomFilterCard } from '../../../../shared/Cards/CustomCard';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { confirmDelete } from '../../../../utils/commonFunctions';
import CustomTable from '../../../../shared/Table/CustomTable';
import { deleteMembershipPlan, getMembershipPlans } from '../../../../redux/actions/AgreementSettings/membershipPlan';

const MembershipPlan = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getMembershipPlans());
    }, [dispatch]);

    const { allMembershipPlan } = useSelector((state) => state.membershipPlan);

    const columns = [
        { field: 'name', header: ' Plan Name' },
        { field: 'club', header: 'Clubs' },
        { field: 'category', header: 'Category' },
        { field: 'membershipType', body: (r) => r.membershipType.name, header: 'Membership Type' },
        {
            field: 'clubs',
            body: (r) => r?.clubs?.map((item) => item.name).join(','),
            header: 'No. of Members',
        },
        { field: 'isActive', header: 'Sold Online' },
        { field: 'isActive', header: 'Availability' },
    ];

    const onEdit = (col) => {
        history.push(`/settings/agreement/membership-plan/edit/${col._id}`);
    };

    const onDelete = (col, position) => {
        confirmDelete(
            () => {
                dispatch(
                    deleteMembershipPlan(col._id, () => {
                        dispatch(allMembershipPlan());
                    }),
                );
            },
            'Do you want to delete this Agreement Plan ?',
            position,
        );
    };

    return (
        <>
            <CustomFilterCard buttonTitle="Add Agreement Plan" linkTo="/settings/agreement/membership-plan/add" />
            <CustomTable data={allMembershipPlan} columns={columns} onEdit={onEdit} onDelete={onDelete} />
        </>
    );
};

export default MembershipPlan;
