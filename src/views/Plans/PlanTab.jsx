import React, { useEffect, useState } from 'react';
import CustomCard, { CustomFilterCard, CustomListItem } from '../../shared/Cards/CustomCard';
import { AutoComplete } from 'primereact/autocomplete';
import { useDispatch, useSelector } from 'react-redux';
import { getMembers } from '../../redux/actions/Dashboard/Members';
import { getMembershipPlan } from '../../redux/actions/AgreementSettings/membershipPlan';
import { useParams } from 'react-router-dom';
import PrimaryButton, { CustomButtonGroup, LightButton } from '../../shared/Button/CustomButton';

const PlanTab = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getMembers());
    }, []);

    let { allMembers } = useSelector((state) => state.members);
    const [value, setValue] = useState('');
    const [items, setItems] = useState([]);
    const search = (event) => {
        let query = event.query;
        let _filteredItems = [];
        for (let i = 0; i < allMembers.length; i++) {
            let item = allMembers[i];
            if (typeof item.firstName === 'string' || typeof item.lastName === 'string') {
                if (item.firstName.toLowerCase().indexOf(query.toLowerCase()) === 0 || item.lastName.toLowerCase().indexOf(query.toLowerCase()) === 0) {
                    _filteredItems.push(item);
                }
            }
        }

        setItems(_filteredItems);
    };
    const { id } = useParams();
    const [data, setData] = useState({
        category: '',
        subCategory: '',
        club: '',
        name: '',
        membershipType: '',
        agreementTemplate: '',
        assessedFee: [],
        services: [],
        autoPay: '',
        oftenClientCharged: '',
        timePeriod: 0,
        noOfAutopays: '',
        whenClientCharged: '',
        date: '',
        afterSixPayments: '',
        sellOnline: '',
        onlineDescription: '',
        oneTimePlan: '',
        membershipPlan: [],
    });
    useEffect(() => {
        if (id) {
            dispatch(
                getMembershipPlan(id, (data) => {
                    setData({
                        category: data.category,
                        subCategory: data.subCategory,
                        club: data.club?.name,
                        name: data.name,
                        membershipType: data.membershipType?.name,
                        agreementTemplate: data.agreementTemplate,
                        assessedFee: data.assessedFee?.name,
                        services: data.services,
                        autoPay: data.autoPay,
                        oftenClientCharged: data.oftenClientCharged,
                        timePeriod: data.timePeriod,
                        noOfAutopays: data.noOfAutopays,
                        whenClientCharged: data.whenClientCharged,
                        date: data.date,
                        afterSixPayments: data.afterSixPayments,
                        sellOnline: data.sellOnline,
                        onlineDescription: data.onlineDescription,
                        oneTimePlan: data.oneTimePlan,
                        membershipPlan: data.membershipPlan,
                    });
                }),
            );
        }
    }, [id, dispatch]);

    console.log('data>>', data);
    return (
        <>
            <CustomFilterCard title="Member" contentPosition="end">
                <AutoComplete
                    field="firstName"
                    value={value}
                    suggestions={items}
                    completeMethod={search}
                    onChange={(e) => setValue(e.value)}
                    className="w-full  "
                    inputClassName="w-full"
                    itemTemplate={(item) => <div>{`${item.firstName} ${item.middleName} ${item.lastName} `}</div>}
                />
            </CustomFilterCard>
            <CustomCard title="Plans" height="200px" col="12">
                <CustomListItem name="name" data={data} />
                <CustomListItem label="Billing Frequency" name="oftenClientCharged" data={data} />
                <CustomListItem name="membershipType" data={data} />
                <CustomListItem label="Ads-ons" name="services" data={data} keys={data.services} dynamicKey="name" />
                <CustomListItem label="Club Assessed Fees" name="club" data={data} />
            </CustomCard>
            <CustomButtonGroup>
                <PrimaryButton label="Next" className="mx-2" />
                <PrimaryButton label="Save & Hold" className="mx-2" />
                <PrimaryButton label="Sign Agreement" className="mx-2" />
                <LightButton label="Cancel" />
            </CustomButtonGroup>
        </>
    );
};

export default PlanTab;
