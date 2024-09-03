import React, { useEffect, useState } from 'react';
import CustomImageInput from '../../../shared/Input/CustomImageInput';
import formValidation from '../../../utils/validations';
import { editMemberAction, getMemberAction } from '../../../redux/actions/Dashboard/Members';
import { useDispatch } from 'react-redux';

const ProfileDetail = ({ data, setData, id, initialState, getMember }) => {
    const [data1, setData1] = useState(initialState);
    useEffect(() => {
        if (getMember) {
            setData1({
                image: getMember.image ? [getMember.image] : [],
            });
        }
    }, [getMember]);

    const dispatch = useDispatch();
    const handleChange = ({ name, value }) => {
        const formErrors = formValidation(name, value, data1);
        setData1((prev) => ({ ...prev, [name]: value, formErrors }));
    };

    useEffect(() => {
        if (data1?.image?.length && data1.image[0]?.type) {
            dispatch(
                editMemberAction(id, data1, () => {
                    dispatch(getMemberAction(id));
                }),
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data1?.image]);

    return (
        <>
            <div className=" p-4 border-round-xl shadow-2 align-items-center bg-lightest-blue flex gap-5 mb-3">
                <div className="avatar-img">
                    <CustomImageInput name="image" data={data} onFilesChange={handleChange} required editable={true} />
                </div>
                <div className="">
                    <h2 className="text-dark-blue text-3xl font-semibold">{`${data.firstName} ${data.MI} ${data.lastName} `}</h2>
                    <p className="text-black font-medium">Barcode: {data.barCode}</p>
                    <p className="text-green font-semibold">Active</p>
                    <p className="text-black">{data?.membershipTypeName ? data?.membershipTypeName : 'All Access'}</p>
                </div>
            </div>
        </>
    );
};

export default ProfileDetail;
