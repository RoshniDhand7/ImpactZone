import React from 'react';
import CustomCard from '../../../shared/Cards/CustomCard';
import UserImg from '../../../assets/images/gallery.png';

const Dashboard = () => {
    return (
        <div className="grid">
            <div className="md:col-8">
                <div className=" p-4 border-round-xl shadow-2 align-items-center bg-lightest-blue flex gap-5 mb-3">
                    <div className="avatar-img">
                        <img src={UserImg} alt="" />
                    </div>
                    <div className="">
                        <h2 className="text-dark-blue text-3xl font-semibold">John Smith</h2>
                        <p className="text-black font-medium">Barcode: 45677654</p>
                        <p className="text-green font-semibold">Active</p>
                        <p className="text-black">All Access</p>
                    </div>
                </div>
                <CustomCard title="Alerts " col={12}>
                    <p className="text-sm flex gap-2 align-items-center mb-3">
                        <i className="pi pi-exclamation-triangle"></i> Past Due by 35 days
                    </p>
                </CustomCard>
                <div className="flex">
                    <CustomCard title="Tasks" col={6}>
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
                    <CustomCard title="Services" col={6}>
                        <p className="text-sm flex gap-2 align-items-center mb-3">
                            <span>PT 30-2/5 </span>2
                        </p>
                        <p className="text-sm flex gap-2 align-items-center mb-3">
                            <span>Group X-10/10 </span>
                        </p>
                    </CustomCard>
                </div>
            </div>
            <div className="md:col-4">
                <CustomCard title="Personal " col={12}>
                    <p className="text-sm flex gap-2 align-items-center mb-3">
                        <i className="pi pi-map-marker"></i>236 Scranton Road, New york city IL 12189
                    </p>
                    <p className="text-sm flex gap-2 align-items-center mb-3">
                        <i className="pi pi-phone"></i>347-218-1019
                    </p>
                    <p className="text-sm flex gap-2 align-items-center mb-3">
                        <i className="pi pi-envelope"></i>347-218-1019
                    </p>
                </CustomCard>
                <CustomCard title="Billing History " col={12}>
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
                    <h3 className="font-medium mb-3">Last 3 Pos Transactions: </h3>
                    <p className="text-sm flex gap-2 align-items-center mb-3">PB Cup Lite (Shake)</p>
                    <p className="text-sm flex gap-2 align-items-center mb-3">Raw Whole Food Bar</p>
                    <p className="text-sm flex gap-2 align-items-center mb-3">PB Cup Lite (Shake)</p>
                </CustomCard>
                <CustomCard title="Payment Method" col={12}>
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
                    <h3 className="font-medium mb-3">Last 3 Pos Transactions: </h3>
                    <p className="text-sm flex gap-2 align-items-center mb-3">PB Cup Lite (Shake)</p>
                    <p className="text-sm flex gap-2 align-items-center mb-3">Raw Whole Food Bar</p>
                    <p className="text-sm flex gap-2 align-items-center mb-3">PB Cup Lite (Shake)</p>
                </CustomCard>
            </div>
        </div>
    );
};

export default Dashboard;
