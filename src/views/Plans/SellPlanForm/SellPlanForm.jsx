import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createMemberSubscription, getActivePlan, getMemberDetails } from '../../../redux/actions/Plans/plansActions';
import { getMembers } from '../../../redux/actions/MembersPortal/memberPortalActions';
import { getDueDate, getFirstDueDate } from '../../../utils/dateTime';
import useCancelSellPlans from '../../../hooks/useCancelSellPlans';
import { calculateFinalAmount } from '../../../utils/taxHelpers';
import CustomTabView from '../../../shared/TabView/CustomTabView';
import FormPage from '../../../shared/Layout/FormPage';

import { getMembersipTypes } from '../../../redux/actions/Settings/MembershipSetup/membershipTypeAction';
import { getCampaigns } from '../../../redux/actions/Settings/MembershipSetup/campaignsAction';
import { getEmployees } from '../../../redux/actions/Settings/Employee/employeesAction';

import PlanTab from './PlanTab';
import PersonalTab from './PersonalTab';
import AgreementTab from './AgreementTab';
import PaymentAmountTab from './PaymentAmountTab';
import BillingInfoTab from './BillingInfoTab';

const SellPlanForm = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { newPlanId, id } = useParams();
    useEffect(() => {
        dispatch(getEmployees());
        dispatch(getCampaigns());
        dispatch(getMembersipTypes());
    }, [dispatch]);
    // we will get the member id if someone come from draft plans or if someone has refreshed any tab , so it will refetch the member details
    useEffect(() => {
        let _selectedMember = localStorage.getItem('selectedMember');
        if (_selectedMember) {
            setSelectedMember(_selectedMember);
        }
    }, []);

    const [disabledTabIndices, setDisabledTabIndices] = useState([1, 2, 3, 4]);

    // this will fetch the plan info like name category, assessedFee and the services inclued with their taxes and everything
    useEffect(() => {
        dispatch(
            getActivePlan(id, (e) => {
                setPlanInfo((prev) => ({
                    ...prev,
                    _id: e._id,
                    category: e.category,
                    club: e.club,
                    name: e.name,
                    membershipTypeName: e.membershipTypeName,
                    timePeriod: e.timePeriod,

                    assessedFee: e.assessedFee.map((item) => ({
                        ...item,
                        dueDate: getDueDate(item.dueDateDeterminedBy, item.preferredDate, item.noOfDays),
                        apply: true,
                    })),
                    services: [...e.services, ...e.membershipTypeServices].map((item) => ({
                        ...item,
                        firstDueDate: getFirstDueDate(e.whenWillClientsBeCharged, e.date),
                        unitPrice: calculateFinalAmount(
                            item.netPrice,
                            item?.taxes.reduce((total, tax) => total + tax.taxRatePercentage, 0),
                        ),
                    })),

                    agreementNo: e.agreementNo,
                    membershipType: e.membershipType,
                    howOftenWillClientsBeCharged: e.howOftenWillClientsBeCharged,
                    whenWillClientsBeCharged: e.whenWillClientsBeCharged,
                    date: e.date,
                }));
            }),
        );
    }, [id, dispatch]);

    useEffect(() => {
        dispatch(getMembers());
    }, [dispatch]);

    const [selectedMember, setSelectedMember] = useState(null);
    const [planInfo, setPlanInfo] = useState({
        club: '',
        category: '',
        name: '',
        membershipTypeName: '',
        timePeriod: 0,

        assessedFee: [],
        services: [],

        agreementNo: 0,
        membershipType: '',
        howOftenWillClientsBeCharged: '',

        salesPerson: null,
        referredBy: null,
        campaign: null,

        memberSince: '',
        signDate: new Date(),
        beginDate: new Date(),
    });
    const [memberInfo, setMemberInfo] = useState({
        barCode: '',
        firstName: '',
        lastName: '',
        gender: '',
        dob: '',
        image: '',
        primaryPhone: '',
        address: '',
        latitude: '',
        longitude: '',
        city: '',
        email: '',
        state: '',
        zipCode: '',
        accessCode: '',
        mobilePhone: '',
    });

    useEffect(() => {
        if (selectedMember) {
            localStorage.setItem('selectedMember', selectedMember);
            dispatch(
                getMemberDetails(selectedMember, (e) => {
                    setMemberInfo((pre) => ({ ...pre, ...e, image: e.image ? [e.image] : [] }));
                    setPlanInfo((prev) => ({ ...prev, memberSince: new Date(e.createdAt) }));
                }),
            );
        } else {
            localStorage.removeItem('selectedMember');
        }
        //eslint-disable-next-line
    }, [selectedMember, dispatch]);

    const onTabEnable = (index) => {
        setDisabledTabIndices((prev) => prev.filter((item) => item > index));
    };
    const { confirm } = useCancelSellPlans(newPlanId);

    const [payment, setPayment] = useState({
        paymentMethodType: 'CREDIT_CARD',
        enableCardOnFile: false,
        useClubAccount: true,
    });
    const [loading, setLoading] = useState(false);

    const onSubmit = ({ opaqueData, opaqueDataValidation, cardHolderName }) => {
        if (opaqueData) {
            let payload = {
                selectedMember,
                planId: id,
                payment: {
                    paymentMethodType: payment.paymentMethodType,
                    paymentMethod: { opaqueData, opaqueDataValidation, cardHolderName },
                    enableCardOnFile: payment.enableCardOnFile,
                    useClubAccount: payment.useClubAccount,
                },
                member: { ...memberInfo, image: '' },
                plan: planInfo,
            };
            dispatch(
                createMemberSubscription(payload, setLoading, (subscription) => {
                    history.push(`/plans/subscription-agreement/${subscription._id}`);
                }),
            );
        }
    };
    const tabs = [
        {
            title: 'Plan',
            content: (
                <PlanTab
                    planInfo={planInfo}
                    selectedMember={selectedMember}
                    setSelectedMember={setSelectedMember}
                    onTabEnable={onTabEnable}
                    onCancel={confirm}
                />
            ),
        },
        { title: 'Personal', content: <PersonalTab memberInfo={memberInfo} setMemberInfo={setMemberInfo} onTabEnable={onTabEnable} onCancel={confirm} /> },
        {
            title: 'Agreement',
            content: <AgreementTab memberInfo={memberInfo} planInfo={planInfo} setPlanInfo={setPlanInfo} onTabEnable={onTabEnable} onCancel={confirm} />,
        },
        { title: 'Payment Amounts', content: <PaymentAmountTab memberInfo={memberInfo} planInfo={planInfo} onTabEnable={onTabEnable} onCancel={confirm} /> },
        {
            title: 'Billing Info',
            content: (
                <BillingInfoTab
                    setLoading={setLoading}
                    memberInfo={memberInfo}
                    loading={loading}
                    onSubmit={onSubmit}
                    payment={payment}
                    setPayment={setPayment}
                    onTabEnable={onTabEnable}
                    onCancel={confirm}
                />
            ),
        },
    ];

    return (
        <>
            <FormPage backText="Plans">
                <CustomTabView tabs={tabs} disabledTabIndices={disabledTabIndices} />
            </FormPage>
        </>
    );
};

export default SellPlanForm;
