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

const PlanTab = ({onTabEnable}) => {
    const dispatch = useDispatch();
    const history = useHistory();
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
        services: [],
        oftenClientCharged: '',
        memberToSell: "",
        newPlanId :"",
        memberId:"",
    });


    const getMemberShipPlanFn =()=>{
        return  dispatch(
            getMembershipPlan(id, (data) => {
                setData({
                    category: data.category,
                    clubs: data.clubs,
                    name: data.name,
                    membershipType: data.membershipType,
                    services: data.services,
                    oftenClientCharged: data.oftenClientCharged,
                    memberToSell:Object.keys(data.memberToSell).length>0?`${data.memberToSell.firstName} ${data.memberToSell.middleName} ${data.memberToSell.lastName}`:"",
                    newPlanId :data.newPlanId ?data.newPlanId:"",
                });

                console.log(data.memberId,"data.memberId")
                return data.memberId;
            }),
           
        );
    }
    useEffect(() => {
        if (id) {
            getMemberShipPlanFn()
        }
    }, [id, dispatch,data.memberId]);

    useEffect(()=>{
        if(data.newPlanId){
            onTabEnable(data.newPlanId,[0,1],data.memberId);

        }
    },[data.newPlanId]);

    useEffect(()=>{
        if(data.memberId){
            setData((prev)=>({...prev,["memberId"]:data.memberId}))
        }
    },[data.memberId])

    const updateMembershipPlan = async () => {
        return new Promise((resolve, reject) => {
            dispatch(
                getMembershipPlan(id, (updatedData) => {
                    setData({
                        category: updatedData.category,
                        clubs: updatedData.clubs,
                        name: updatedData.name,
                        membershipType: updatedData.membershipType,
                        services: updatedData.services,
                        oftenClientCharged: updatedData.oftenClientCharged,
                        memberToSell: Object.keys(updatedData.memberToSell).length > 0 ? `${updatedData.memberToSell.firstName} ${updatedData.memberToSell.middleName} ${updatedData.memberToSell.lastName}` : "",
                        newPlanId: updatedData.newPlanId ? updatedData.newPlanId : "",
                        memberId: updatedData.memberId,
                    });
                    resolve(updatedData.memberId); // Resolve with the new memberId
                }, reject)
            );
        });
    };

    const handleNext = () => {
        if(showFormErrors(data,setData,["services","membershipType"])){
            const payload = {
                name:data.name,
                oftenClientCharged:data.oftenClientCharged,
                club:data?.clubs?.length>0 &&getIds(data?.clubs),
                membershipType: data?.membershipType?._id,
                memberToSell: data.memberToSell.id,
                type: "next", 
                services:data?.services?.length>0 ? getIds(data?.services):[],
            };
            if(data.newPlanId){
                dispatch(editSellPlan(data.newPlanId,payload,async()=>{
                    const newMemberId = await updateMembershipPlan();
                    onTabEnable(data.newPlanId, [0, 1], newMemberId);
                    history.replace(`/plans/sell-plan/${id}/?tab=personal`);
                }))
            }else{
                dispatch(addSellPlan(id,payload,async ()=>{
                    const newMemberId = await updateMembershipPlan();
                    onTabEnable(data.newPlanId, [0, 1], newMemberId);
                    history.replace(`/plans/sell-plan/${id}/?tab=personal`);
                }))   
            }
        }
     
    }

const handleChange =(e)=>{
    const formErrors = formValidation("memberToSell",e.value,data)
    setData((prev => ({ ...prev, memberToSell: e.value ,formErrors})))
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
                        onChange={handleChange}
                        className="w-full md:col-6 "
                        showEmptyMessage={true}
                        required={true}
                        inputClassName="w-full"
                        itemTemplate={(item) => <div>{`${item.firstName} ${item.middleName} ${item.lastName} `}</div>}
                    />
                    <div className='p-error text-sm'>{data?.formErrors?.memberToSell}</div>
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
