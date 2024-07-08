import React, { useEffect, useState } from 'react';
import CustomCard, { CustomFilterCard, CustomListItem } from '../../shared/Cards/CustomCard';
import { AutoComplete } from 'primereact/autocomplete';
import { useDispatch, useSelector } from 'react-redux';
import { getMembers } from '../../redux/actions/Dashboard/Members';
import { getMembershipPlan } from '../../redux/actions/AgreementSettings/membershipPlan';
import { useHistory, useParams } from 'react-router-dom';
import PrimaryButton, { CustomButtonGroup, LightButton } from '../../shared/Button/CustomButton';
import { addSellPlan, editSellPlan } from '../../redux/actions/Plans/SellPlan';
import { getIds, showFormErrors } from '../../utils/commonFunctions';
import formValidation from '../../utils/validations';

const PlanTab = ({ onTabEnable }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    useEffect(() => {
        dispatch(getMembers());
    }, []);

    let { allMembers } = useSelector((state) => state.members);

    const { newPlanId, memberId } = useParams();

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
        services: [],
        oftenClientCharged: '',
        memberToSell: '',
        newPlanId: '',
        memberId: '',
    });

    const getMemberShipPlanFn = () => {
        return dispatch(
            getMembershipPlan(id, memberId, (data) => {
                setData({
                    category: data.category,
                    clubs: data.clubs,
                    name: data.name,
                    membershipType: data.membershipType,
                    services: data.services,
                    oftenClientCharged: data.oftenClientCharged,
                    memberToSell: memberId ? allMembers?.find((item) => item.id === memberId) : '',
                });
            }),
        );
    };
    useEffect(() => {
        if (id) {
            getMemberShipPlanFn();
        }
    }, [id, dispatch, memberId]);

    const handleNext = () => {
        if (showFormErrors(data, setData, ['services', 'membershipType'])) {
            if (data?.memberToSell.id) {
                const payload = {
                    name: data.name,
                    oftenClientCharged: data.oftenClientCharged,
                    club: data?.clubs?.length > 0 ? getIds(data?.clubs) : null,
                    membershipType: data?.membershipType?._id,
                    memberToSell: data.memberToSell.id,
                    type: 'next',
                    services:
                        data?.services?.length > 0 ? data?.services?.map((item) => ({ catalogId: item._id, unitPrice: item.unitPrice, name: item.name })) : [],
                };

                if (newPlanId) {
                    dispatch(
                        editSellPlan(newPlanId, payload, () => {
                            onTabEnable(0, 1);
                            history.replace(`/plans/sell-plan/${id}/${newPlanId}/${data.memberToSell.id}${'?tab=personal'}`);
                            getMembershipPlan();
                        }),
                    );
                } else {
                    dispatch(addSellPlan(id, payload, onTabEnable, history, getMembershipPlan));
                }
            }
        }
    };

    const handleChange = (e) => {
        const inputValue = e.value;
        const trimmedValue = typeof inputValue === 'string' ? inputValue.trimStart() : inputValue;
        const formErrors = formValidation('memberToSell', trimmedValue, data);
        setData((prev) => ({ ...prev, memberToSell: trimmedValue, formErrors }));
    };

    return (
        <>
            <CustomFilterCard title="Member" titleClassName="mx-4 font-medium text-center" contentPosition="end">
                <span className="p-input-icon-right w-full">
                    <AutoComplete
                        field="fullName"
                        value={data.memberToSell}
                        suggestions={items}
                        completeMethod={search}
                        onChange={handleChange}
                        className="w-20rem "
                        showEmptyMessage={true}
                        required={true}
                        inputClassName="w-full"
                        itemTemplate={(item) => <div>{`${item.firstName} ${item.middleName} ${item.lastName} `}</div>}
                    />
                    <i className="pi pi-search" />
                </span>

                <div className="p-error text-sm">{data?.formErrors?.memberToSell}</div>
            </CustomFilterCard>
            <CustomCard title="Plans" height="200px" col="12">
                <CustomListItem name="name" data={data} />
                <CustomListItem label="Billing Frequency" name="oftenClientCharged" data={data} />
                <CustomListItem name="membershipType" data={data} />
                <CustomListItem label="Ad-ons" name="services" data={data} keys={data.services} dynamicKey="name" />
                <CustomListItem label="Club Assessed Fees" name="clubs" data={data} keys={data?.clubs} dynamicKey="name" />
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
