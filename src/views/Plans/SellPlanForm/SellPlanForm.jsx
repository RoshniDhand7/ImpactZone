import React, { useState } from 'react';
import CustomTabView from '../../../shared/TabView/CustomTabView';
import FormPage from '../../../shared/Layout/FormPage';
import PlanTab from './PlanTab';
import PersonalTab from './PersonalTab';
import { useParams } from 'react-router-dom';
import AgreementTab from './AgreementTab';
import PaymentAmountTab from './PaymentAmountTab';
import BillingInfoTab from './BillingInfoTab';
import useCancelSellPlans from '../../../hooks/useCancelSellPlans';
import { useDispatch } from 'react-redux';
import { getActivePlan, getMemberDetails } from '../../../redux/actions/Plans/plansActions';
import { useEffect } from 'react';
import { getMembers } from '../../../redux/actions/MembersPortal/memberPortalActions';
import useQueryParams from '../../../hooks/useQueryParams';
import { getDueDate, getFirstDueDate } from '../../../utils/dateTime';
import { calculateFinalAmount } from '../../../utils/taxHelpers';

const SellPlanForm = () => {
    // we will get the member id if someone come from draft plans or if someone has refreshed any tab , so it will refetch the member details
    let memberId = useQueryParams('member');
    useEffect(() => {
        if (memberId) {
            setSelectedMember(memberId);
        }
    }, [memberId]);

    const dispatch = useDispatch();
    const { newPlanId, id } = useParams();

    const [disabledTabIndices, setDisabledTabIndices] = useState([1, 2, 3, 4, 5, 6, 7]);

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

        salesPerson: '',
        referredBy: '',
        campaign: '',

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

    // console.log('planInfo===>', planInfo);

    useEffect(() => {
        if (selectedMember) {
            dispatch(
                getMemberDetails(selectedMember, (e) => {
                    setMemberInfo((pre) => ({ ...pre, ...e, image: e.image ? [e.image] : [] }));
                    setPlanInfo((prev) => ({ ...prev, memberSince: new Date(e.createdAt) }));
                }),
            );
        } else {
            setDisabledTabIndices([...disabledTabIndices, 1]);
        }
    }, [selectedMember, dispatch]);

    const onTabEnable = (index) => {
        setDisabledTabIndices(disabledTabIndices.filter((item) => item !== index));
    };
    const { confirm } = useCancelSellPlans(newPlanId);

    const [payment, setPayment] = useState({
        paymentMethod: 'CREDIT_CARD',
        cardNumber: '',
        cvc: '',
        expiryDate: '',
        cardHolderName: '',
        focused: '',
    });
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
        { title: 'Billing Info', content: <BillingInfoTab payment={payment} setPayment={setPayment} onTabEnable={onTabEnable} onCancel={confirm} /> },
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
