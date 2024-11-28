import React, { useEffect } from 'react';
import CustomImageInput from '../../../shared/Input/CustomImageInput';
import { Skeleton } from 'primereact/skeleton';
import { useDispatch, useSelector } from 'react-redux';
import { getMemberData } from '../../../redux/actions/MembersPortal/memberPortalActions';
import { useParams } from 'react-router-dom';

const ProfileDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const data = useSelector((state) => state.membersPortal.dashboard);

    useEffect(() => {
        if (data?._id !== id) {
            dispatch(getMemberData(id, 'dashboard'));
        }
        //eslint-disable-next-line
    }, [id]);

    if (!data?.firstName) return <ProfileSkeleton />;
    return (
        <div className="p-4 border-round-xl shadow-2 bg-lightest-blue flex gap-5 mb-3">
            <div className="avatar-img">
                <CustomImageInput showLabel={false} name="sdf" showAvatar data={data} required editable={false} />
            </div>
            <div className="">
                <h2 className="text-dark-blue text-3xl font-semibold">{`${data.firstName} ${data.MI} ${data.lastName} `}</h2>
                <p className="text-black font-medium">Barcode: {data.barCode}</p>
                <p className="text-green font-semibold">Active</p>
                <p className="text-black">{data?.membershipTypeName ? data?.membershipTypeName : 'All Access'}</p>
            </div>
        </div>
    );
};

export default ProfileDetail;

const ProfileSkeleton = () => {
    return (
        <div className="p-4 border-round-xl shadow-2 bg-lightest-blue flex gap-5 mb-3">
            <div className="flex gap-5">
                <Skeleton size="8rem"></Skeleton>
                <div>
                    <Skeleton height="3rem" width="20rem" className="mb-2"></Skeleton>
                    <Skeleton height="1rem" className="mb-2"></Skeleton>
                    <Skeleton height="1rem" className="mb-2"></Skeleton>
                    <Skeleton height="1rem" className="mb-2"></Skeleton>
                </div>
            </div>
        </div>
    );
};
