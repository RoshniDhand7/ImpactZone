import React, { useState } from 'react';
import CustomCard, { CustomListItem } from '../../../shared/Cards/CustomCard';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PrimaryButton, { CustomButtonGroup, LightButton } from '../../../shared/Button/CustomButton';
import { CustomAsyncReactSelect } from '../../../shared/Input/AllInputs';

const PlanTab = ({ onTabEnable, onCancel, planInfo, selectedMember, setSelectedMember }) => {
    const history = useHistory();
    const [error, setError] = useState(null);
    let allMembersDropdown = useSelector((state) => state.membersPortal.allMembersDropdown);

    const handleNext = () => {
        if (selectedMember) {
            onTabEnable(1);
            history.replace({
                search: `?tab=personal`,
            });
        } else {
            setError('Plese Select Member!');
        }
    };
    return (
        <>
            <div className="flex justify-content-end">
                <div className="w-4">
                    <CustomAsyncReactSelect
                        name="memberSell"
                        field="fullName"
                        suggestions={allMembersDropdown}
                        options={allMembersDropdown}
                        placeholder="Search Member"
                        showLabel={false}
                        value={selectedMember}
                        onChange={({ value }) => {
                            setSelectedMember(value);
                            setError(null);
                        }}
                    />
                    {error && <small className="text-red-500 px-1 my-0 ">{error}</small>}
                </div>
            </div>
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
