import React from 'react';
import CustomCard, { CustomFilterCard, CustomListItem } from '../../../shared/Cards/CustomCard';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import PrimaryButton, { CustomButtonGroup, LightButton } from '../../../shared/Button/CustomButton';
import { CustomAsyncReactSelect } from '../../../shared/Input/AllInputs';

const PlanTab = ({ onTabEnable, onCancel, planInfo, selectedMember, setSelectedMember }) => {
    const history = useHistory();
    const { id } = useParams();
    let allMembersDropdown = useSelector((state) => state.membersPortal.allMembersDropdown);

    // const handleNext = () => {
    //     if (showFormErrors(data, setData, ['services', 'membershipType', 'clubs'])) {
    //         if (data?.memberToSell.id) {
    //             const payload = {
    //                 name: data.name,
    //                 oftenClientCharged: data.oftenClientCharged,
    //                 club: data?.clubs?.length > 0 ? getIds(data?.clubs) : null,
    //                 membershipType: data?.membershipType?._id,
    //                 memberToSell: data.memberToSell.id,
    //                 type: 'next',
    //                 services:
    //                     data?.services?.length > 0 ? data?.services?.map((item) => ({ catalogId: item._id, unitPrice: item.unitPrice, name: item.name })) : [],
    //             };

    //             if (newPlanId) {
    //                 dispatch(
    //                     editSellPlan(newPlanId, payload, () => {
    //                         onTabEnable(0, 1);
    //                         history.replace(`/plans/sell-plan/${id}/${newPlanId}/${data.memberToSell.id}${'?tab=personal'}`);
    //                         getMembershipPlan();
    //                     }),
    //                 );
    //             } else {
    //                 dispatch(addSellPlan(id, payload, onTabEnable, history, getMembershipPlan));
    //             }
    //         }
    //     }
    // };

    const handleNext = () => {
        if (selectedMember) {
            onTabEnable(1);
            history.replace(`/plans/sell-plan/${id}?tab=personal${selectedMember && `&member=${selectedMember}`}`);
        }
    };
    return (
        <>
            <CustomFilterCard contentPosition="end">
                <CustomAsyncReactSelect
                    className="w-full"
                    name="memberSell"
                    field="fullName"
                    suggestions={allMembersDropdown}
                    options={allMembersDropdown}
                    placeholder="Search Member"
                    showLabel={false}
                    value={selectedMember}
                    onChange={({ value }) => setSelectedMember(value)}
                />
            </CustomFilterCard>
            <CustomCard title="Plans" height="200px" col="12">
                <CustomListItem name="name" data={planInfo} />
                <CustomListItem label="Billing Frequency" value={planInfo?.timePeriod && `Every ${planInfo?.timePeriod}Month`} />
                <CustomListItem name="membershipTypeName" data={planInfo} />
                <CustomListItem label="Ad-ons" name="services" keys={planInfo.services} dynamicKey="name" />
                <CustomListItem label="Club Assessed Fees" name="clubs" keys={planInfo?.assessedFee} dynamicKey="name" />
            </CustomCard>
            <CustomButtonGroup>
                <PrimaryButton label="Next" className="mx-2" onClick={handleNext} />
                <LightButton label="Cancel" onClick={onCancel} />
            </CustomButtonGroup>
        </>
    );
};

export default PlanTab;
