import React, { useEffect, useState } from 'react';
import CustomCard, { CustomFilterCard, CustomListItem } from '../../shared/Cards/CustomCard';
import { AutoComplete } from 'primereact/autocomplete';
import { useDispatch, useSelector } from 'react-redux';
import { getMembers } from '../../redux/actions/Dashboard/Members';
import { getMembershipPlan } from '../../redux/actions/AgreementSettings/membershipPlan';
import { useParams } from 'react-router-dom';
import PrimaryButton, { CustomButtonGroup, LightButton } from '../../shared/Button/CustomButton';
import { addSellPlan } from '../../redux/actions/Plans/SellPlan';

const PlanTab = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getMembers());
    }, []);

    let { allMembers } = useSelector((state) => state.members);

    allMembers = allMembers.map((item) => ({
        firstName: item.firstName,
        middleName: item.MI,
        lastName: item.lastName,
        fullName: `${item.firstName} ${item.MI} ${item.lastName}`.trim(),
        id: item._id,
        path: `member/${item._id}`,
    }));

    const [items, setItems] = useState([]);
    const search = (event) => {
        let query = event.query;
        let _filteredItems = allMembers.filter((item) => {
            let _item = `${item.firstName} ${item.middleName} ${item.lastName}`.trim();
            let _query = query.trim().toLowerCase();
            return _item.toLowerCase().includes(_query);
        });
        setItems(_filteredItems);
        return _filteredItems;
    };
    const { id } = useParams();
    const [data, setData] = useState({
        category: '',
        clubs: '',
        name: '',
        membershipType: {},
        assessedFee: [],
        services: [],
        oftenClientCharged: '',
        memberToSell: ""
    });
    useEffect(() => {
        if (id) {
            dispatch(
                getMembershipPlan(id, (data) => {
                    console.log(data)
                    setData({
                        category: data.category,
                        clubs: data.clubs,
                        name: data.name,
                        membershipType: data.membershipType,
                        assessedFee: data.assessedFee,
                        services: data.services,
                        oftenClientCharged: data.oftenClientCharged,
                        memberToSell: data.memberToSell
                    });
                }),
            );
        }
    }, [id, dispatch]);

    const handleNext = () => {
        dispatch(addSellPlan(id,data,"next"))
    }



    console.log('data>>', data);
    return (
        <>
            <CustomFilterCard title="Member" titleClassName="mx-4 font-medium text-center" contentPosition="end">
                <div className='grid'>
                    <AutoComplete
                        field="fullName"
                        value={data.memberToSell}
                        suggestions={items}
                        completeMethod={search}
                        onChange={(e) => setData((prev => ({ ...prev, memberToSell: e.value })))}
                        className="w-full md:col-6 "
                        showEmptyMessage={true}
                        required={true}
                        inputClassName="w-full"
                        itemTemplate={(item) => <div>{`${item.firstName} ${item.middleName} ${item.lastName} `}</div>}
                    />
                </div>

            </CustomFilterCard>
            <CustomCard title="Plans" height="200px" col="12">
                <CustomListItem name="name" data={data} />
                <CustomListItem label="Billing Frequency" name="oftenClientCharged" data={data} />
                <CustomListItem name="membershipType" data={data?.membershipType} />
                <CustomListItem label="Ads-ons" name="services" data={data} keys={data.services} dynamicKey="name" />
                <CustomListItem label="Club Assessed Fees" name="clubs" data={data} dynamicKey="name" />
            </CustomCard>
            <CustomButtonGroup>
                <PrimaryButton label="Next" className="mx-2" onClick={handleNext} />
                <PrimaryButton label="Save & Hold" className="mx-2" />
                <PrimaryButton label="Sign Agreement" className="mx-2" />
                <LightButton label="Cancel" />
            </CustomButtonGroup>
        </>
    );
};

export default PlanTab;
