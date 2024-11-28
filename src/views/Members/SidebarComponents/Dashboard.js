import React, { useEffect } from 'react';
import CustomCard, { CustomListItem } from '../../../shared/Cards/CustomCard';
import UserImg1 from '../../../assets/images/Frame.png';
import { useParams } from 'react-router-dom';
import ProfileDetail from './ProfileDetail';
import TopLayout from './TopLayout';
import { useDispatch, useSelector } from 'react-redux';
import { getMemberData } from '../../../redux/actions/MembersPortal/memberPortalActions';

const Dashboard = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const data = useSelector((state) => state.membersPortal.dashboard);

    useEffect(() => {
        if (data?._id !== id) {
            dispatch(getMemberData(id, 'dashboard'));
        }
        //eslint-disable-next-line
    }, [id]);

    const PURCHASED_ITEMS = [
        {
            label: 'Protein Powder',
        },
        {
            label: 'Protein Powder',
        },
        {
            label: 'Protein Powder',
        },
        {
            label: 'Protein Powder',
        },
        {
            label: 'Protein Powder',
        },
        {
            label: 'Protein Powder',
        },
    ];

    return (
        <div className="grid">
            <div className="md:col-8">
                <ProfileDetail data={data || {}} />
                <TopLayout />
                <CustomCard title="Alerts" col={12} height="200px">
                    <p className="text-sm font-medium flex gap-2 align-items-center mb-3 text-red-600">
                        <i className="pi pi-exclamation-triangle"></i> Past Due by 35 days
                    </p>
                </CustomCard>
                <div className="flex">
                    <CustomCard title="Tasks" col={6} height="200px">
                        <CustomListItem name="Active" data={data} value={'2'} />
                        <CustomListItem name="notes" data={data} value={'2'} />
                        <CustomListItem label="Medical History" data={data} value={'2'} />
                    </CustomCard>
                    <CustomCard title="Services" col={6} height="200px">
                        <CustomListItem name="alpha" data={data} value={'2'} />
                        <CustomListItem name="beta" data={data} value={'2'} />
                    </CustomCard>
                </div>
                <CustomCard title="Most Purchased Items" col={12} height="200px">
                    <div className="flex justify-content-between">
                        {PURCHASED_ITEMS.map((item, index) => (
                            <div key={index} className="">
                                <div className="bg-white border-1 border-400 border-round-xl purchased-item p-1">
                                    <img src={UserImg1} alt="protein"></img>
                                </div>
                                <small className="font-semibold text-dark-blue">{item.label}</small>
                            </div>
                        ))}
                    </div>
                </CustomCard>
            </div>
            <div className="md:col-4">
                <CustomCard title="Personal" col={12} height="200px">
                    <CustomListItem name="address" data={data} />
                    <CustomListItem name="primaryPhone" data={data} />
                    <CustomListItem name="email" data={data} />
                </CustomCard>
                <CustomCard title="Billing History " col={12} height="200px">
                    <CustomListItem label={'Agreement'} name="agreement" data={data} />
                    <CustomListItem label={'Team'} name="team" data={data} />
                    <CustomListItem label={'Expiration'} name="expirationDate" data={data} />
                    <CustomListItem label={'Start Date'} name="startData" data={data} />
                    <CustomListItem label={'Last Billing'} name="lastBilling" data={data} />
                    <CustomListItem label={'Last 3 Pos Transactions'} name="" data={data} />
                    <CustomListItem label={'PB Cup Lite (Shake)'} name="" data={data} />
                    <CustomListItem label={'Raw Whole Food Bar'} name="" data={data} />
                    <CustomListItem label={'PB Cup Lite (Shake)'} name="" data={data} />
                </CustomCard>
                <CustomCard title="Payment Method" col={12} height="200px">
                    <CustomListItem label={'Card on File'} name="" data={data} value="32fd32" />
                    <CustomListItem label={'Next Due'} name="" data={data} value={'$06.92'} />
                    <CustomListItem label={'Past Due'} name="" data={data} value={'$00.00'} />
                </CustomCard>
            </div>
        </div>
    );
};

export default Dashboard;
