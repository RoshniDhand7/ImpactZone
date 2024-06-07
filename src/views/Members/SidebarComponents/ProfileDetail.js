import React from 'react';
import UserImg from '../../../assets/icons/usermember.png';
import { getImageUrl } from '../../../utils/commonFunctions';

const ProfileDetail = ({ data }) => {
    return (
        <>
            <div className=" p-4 border-round-xl shadow-2 align-items-center bg-lightest-blue flex gap-5 mb-3">
                <div className="avatar-img">
                    <img src={data?.image ? getImageUrl(data?.image) : UserImg} alt="" />
                </div>
                <div className="">
                    <h2 className="text-dark-blue text-3xl font-semibold">{`${data.firstName} ${data.lastName} `}</h2>
                    <p className="text-black font-medium">Barcode: {data.barCode}</p>
                    <p className="text-green font-semibold">Active</p>
                    <p className="text-black">{data?.membershipType}</p>
                </div>
            </div>
        </>
    );
};

export default ProfileDetail;
