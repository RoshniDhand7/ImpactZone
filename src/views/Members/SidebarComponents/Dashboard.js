import React from 'react';
import CustomCard from '../../../shared/Cards/CustomCard';
import UserImg1 from '../../../assets/images/Frame.png';
import { useParams } from 'react-router-dom';
import ProfileDetail from './ProfileDetail';
import TopLayout from './TopLayout';
import useMemberDetail from './useMemberDetail';

const Dashboard = () => {
    const { id } = useParams();

    const { data, setData, initialState, getMember } = useMemberDetail();

    return (
        <div className="grid">
            <div className="md:col-8">
                <ProfileDetail data={data} setData={setData} id={id} initialState={initialState} getMember={getMember} />
                <TopLayout />
                <CustomCard title="Alerts " col={12} height="200px">
                    <p className="text-sm font-medium flex gap-2 align-items-center mb-3 text-red-600">
                        <i className="pi pi-exclamation-triangle"></i> Past Due by 35 days
                    </p>
                </CustomCard>
                <div className="flex">
                    <CustomCard title="Tasks" col={6} height="200px">
                        <p className="text-sm flex gap-2 align-items-center mb-3">
                            <span>Active: </span>2
                        </p>
                        <p className="text-sm flex gap-2 align-items-center mb-3">
                            <span>Notes: </span>2
                        </p>
                        <p className="text-sm flex gap-2 align-items-center mb-3">
                            <span>Medical History: </span>2
                        </p>
                    </CustomCard>
                    <CustomCard title="Services" col={6} height="200px">
                        <p className="text-sm flex gap-2 align-items-center mb-3">
                            <span>PT 30-2/5 </span>2
                        </p>
                        <p className="text-sm flex gap-2 align-items-center mb-3">
                            <span>Group X-10/10 </span>
                        </p>
                    </CustomCard>
                </div>
                <CustomCard title="Most Purchased Items" col={12} height="200px">
                    <div className="flex justify-content-between">
                        <div className="">
                            <div className="bg-white border-1 border-400 border-round-xl purchased-item p-1">
                                <img src={UserImg1} alt="protein"></img>
                            </div>
                            <small className="font-semibold text-dark-blue">Protein Powder</small>
                        </div>
                        <div className="">
                            <div className="bg-white border-1 border-400 border-round-xl purchased-item p-1">
                                <img src={UserImg1} alt="protein"></img>
                            </div>
                            <small className="font-semibold text-dark-blue">Protein Powder</small>
                        </div>
                        <div className="">
                            <div className="bg-white border-1 border-400 border-round-xl purchased-item p-1">
                                <img src={UserImg1} alt="protein"></img>
                            </div>
                            <small className="font-semibold text-dark-blue">Protein Powder</small>
                        </div>
                        <div className="">
                            <div className="bg-white border-1 border-400 border-round-xl purchased-item p-1">
                                <img src={UserImg1} alt="protein"></img>
                            </div>
                            <small className="font-semibold text-dark-blue">Protein Powder</small>
                        </div>
                        <div className="">
                            <div className="bg-white border-1 border-400 border-round-xl purchased-item p-1">
                                <img src={UserImg1} alt="protein"></img>
                            </div>
                            <small className="font-semibold text-dark-blue">Protein Powder</small>
                        </div>
                    </div>
                </CustomCard>
            </div>
            <div className="md:col-4">
                <CustomCard title="Personal " col={12} height="200px">
                    <p className="text-sm flex gap-2 align-items-center mb-3">
                        <i className="pi pi-map-marker"></i>
                        {data.address}
                    </p>
                    <p className="text-sm flex gap-2 align-items-center mb-3">
                        <i className="pi pi-phone"></i>
                        {data.primaryPhone}
                    </p>
                    <p className="text-sm flex gap-2 align-items-center mb-3">
                        <i className="pi pi-envelope"></i>mike@gmail.com
                    </p>
                </CustomCard>
                <CustomCard title="Billing History " col={12} height="200px">
                    <p className="text-sm flex gap-2 align-items-center mb-3">
                        <span>Agreement: </span>Impact 1
                    </p>
                    <p className="text-sm flex gap-2 text-green align-items-center mb-3">
                        <span className="text-dark-gray">Team: </span>Open
                    </p>
                    <p className="text-sm flex gap-2 align-items-center mb-3">
                        <span>Expiration: </span>N/A
                    </p>
                    <p className="text-sm flex gap-2 align-items-center mb-3">
                        <span>Start Date: </span>1/1/2022
                    </p>
                    <p className="text-sm flex gap-2 align-items-center mb-3">
                        <span>Last Billing: </span>12/5/22
                    </p>
                    <h3 className="text-sm font-medium mb-3">Last 3 Pos Transactions: </h3>
                    <p className="text-sm flex gap-2 align-items-center mb-3">PB Cup Lite (Shake)</p>
                    <p className="text-sm flex gap-2 align-items-center mb-3">Raw Whole Food Bar</p>
                    <p className="text-sm flex gap-2 align-items-center mb-3">PB Cup Lite (Shake)</p>
                </CustomCard>
                <CustomCard title="Payment Method" col={12} height="200px">
                    <p className="text-sm flex gap-2 align-items-center mb-3">
                        <span>Card on File: </span>0049
                    </p>
                    <p className="text-sm flex gap-2 align-items-center mb-3">
                        <span>Next Due: </span>$06.92
                    </p>
                    <p className="text-sm flex gap-2 align-items-center mb-3">
                        <span>Past Due: </span>$00.00
                    </p>
                </CustomCard>
            </div>
        </div>
    );
};

export default Dashboard;
