import React, { useMemo, useState } from 'react';
import { CustomAsyncReactSelect } from '../../shared/Input/AllInputs';
import formValidation from '../../utils/validations';
import useMembers from '../../hooks/Members/useMembers';
import { CustomButton } from '../../shared/Button/CustomButton';
import { Divider } from 'primereact/divider';

export default function CheckIn() {
    const [data, setData] = useState({
        member: null,
        image: [],
    });
    const handleChange = ({ name, value }) => {
        const formErrors = formValidation(name, value, data);
        setData((prev) => ({ ...prev, [name]: value, formErrors }));
    };

    const { allMembers } = useMembers();

    const suggestions = useMemo(
        () =>
            allMembers.map((item) => ({
                value: item._id,
                name: `${item.firstName} ${item.MI} ${item.lastName}`,
            })),
        [allMembers],
    );

    const memberOptions = useMemo(() => allMembers?.map((item) => ({ name: `${item.firstName} ${item.MI} ${item.lastName}`, value: item?._id })), [allMembers]);

    return (
        <>
            {/* <div className="col-12">
                <label className="font-bold ml-1 mb-3">Member Search</label>
                <CustomAsyncReactSelect
                    name="member"
                    suggestions={suggestions}
                    options={memberOptions}
                    placeholder="Search Member"
                    showLabel={false}
                    value={data.member}
                    onChange={handleChange}
                    col={12}
                />
            </div>
            <div className={`mx-2 p-3 border-round-xl shadow-2 align-items-center bg-green flex gap-5 my-3`}>
                <div className="avatar-img">
                    <img className=" fit-cover" src={[]} onError={(e) => (e.target.src = '')} alt="" />
                </div>
                <div className="">
                    <div>
                        <p className="text-white text-2xl font-medium">John Smith</p>
                        <p className="text-white  font-medium mt-2">Barcode:458888</p>
                        <p className="text-white font-medium">Active</p>
                        <p className="text-white">{data?.membershipTypeName ? data?.membershipTypeName : 'All Access'}</p>
                    </div>

                    <div className="task-button-container flex flex-column justify-center">
                        <CustomButton label="Add Task" icon="pi pi-plus" className="p-button-text text-white" />
                    </div>
                </div>
                <div className="vertical-line ">
                    <p className="text-white text-2xl font-medium ml-4">Alerts</p>
                    <p className="text-white  text-sm mt-2 ml-4">Membership expires at 15/17/2022 </p>
                    <p className="text-white  text-sm mt-2 ml-4">Membership expires at 15/17/2022 </p>
                    <p className="text-white  text-sm mt-2 ml-4">Membership expires at 15/17/2022 </p>
                </div>
            </div> */}
            <div className="col-12">
                <label className="font-bold ml-1 mb-3">Member Search</label>
                <CustomAsyncReactSelect
                    name="member"
                    suggestions={suggestions}
                    options={memberOptions}
                    placeholder="Search Member"
                    showLabel={false}
                    value={data.member}
                    onChange={handleChange}
                    col={12}
                />
            </div>

            <div className="member-container mx-2 p-3 border-round-xl shadow-2 bg-green flex gap-5 my-3 align-items-center">
                <div className="avatar-img">
                    <img
                        className="fit-cover rounded-full border-white border-2"
                        src={data?.imageUrl || 'default-avatar-url.jpg'}
                        onError={(e) => (e.target.src = 'default-avatar-url.jpg')}
                        alt=""
                    />
                </div>

                <div className="flex flex-column justify-center">
                    <p className="text-white text-2xl font-medium">John Smith</p>
                    <p className="text-white font-medium mt-2">Barcode: 458888</p>
                    <p className="text-white font-medium">Active</p>
                    <p className="text-white">{data?.membershipTypeName || 'All Access'}</p>
                </div>

                <div className="mb-0">
                    <CustomButton label="Add Task" icon="pi pi-plus" className="p-button-text text-white" />
                </div>

                <Divider layout="vertical" className="mx-4" />

                <div className="alerts-container flex-1">
                    <div className="flex justify-content-between align-items-center">
                        <p className="text-white text-2xl font-medium">Alerts</p>
                        <CustomButton label="Add Alert" icon="pi pi-plus" className="p-button-text text-white" />
                    </div>
                    <div className="alert-list mt-2 ml-4">
                        <p className="text-white text-sm">Membership expires at 15/1/2022</p>
                        <p className="text-white text-sm">Membership expires at 15/1/2022</p>
                        <p className="text-white text-sm">Membership expires at 15/1/2022</p>
                    </div>
                </div>
            </div>
        </>
    );
}
