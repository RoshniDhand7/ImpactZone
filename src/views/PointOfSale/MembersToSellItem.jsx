import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMembers } from '../../redux/actions/Dashboard/Members';
import { addRecentSearch, getSearchSuggestion } from '../../redux/actions/POSAction';
import { CustomReactSelect } from '../../shared/Input/AllInputs';

const MembersToSellItem = ({ data, setData }) => {
    const dispatch = useDispatch();
    const [isRecentSearch, setIsRecentSearch] = useState(false);

    const handleChange = ({ name, value }) => {
        console.log(name, value);
        setData((prev) => ({ ...prev, [name]: value }));
        setIsRecentSearch(false);
    };

    useEffect(() => {
        dispatch(getMembers());
        dispatch(getSearchSuggestion());
    }, [dispatch]);

    useEffect(() => {
        if (data?.memberSell?.label && !isRecentSearch) {
            dispatch(
                addRecentSearch({ name: data?.memberSell?.label, memberId: data?.memberSell.value }, () => {
                    dispatch(getSearchSuggestion());
                }),
            );
        }
    }, [data?.memberSell?.label, dispatch, isRecentSearch, data?.memberSell?.value]);

    let { allMembers } = useSelector((state) => state.members);
    const { recentSuggesstions } = useSelector((state) => state?.POS);

    allMembers = allMembers.map((item) => ({
        firstName: item.firstName,
        middleName: item.MI,
        lastName: item.lastName,
        value: item._id,
        label: `${item.firstName} ${item.MI || ''} ${item.lastName}`.trim(),
    }));

    const handleRecentSearch = (item) => {
        setIsRecentSearch(true);
        const _member = {
            firstName: item.memberData.firstName,
            middleName: item.memberData.MI,
            lastName: item.memberData.lastName,
            value: item.memberData._id,
            label: `${item.memberData.firstName} ${item.memberData.MI || ''} ${item.memberData.lastName}`.trim(),
        };

        setData((prev) => ({ ...prev, memberSell: _member }));
    };

    console.log('allMembers==>', allMembers);

    return (
        <>
            <CustomReactSelect
                name="memberSell"
                field="fullName"
                // filterOption={searchMember}
                value={data?.memberSell}
                onChange={handleChange}
                options={allMembers}
                data={data}
                placeholder="Search by member"
            />
            <div className="flex justify-content-end gap-5 mt-3">
                {recentSuggesstions?.map((item) => {
                    return (
                        <>
                            <div className="text-sm text-blue cursor-pointer" key={item._id} onClick={() => handleRecentSearch(item)}>
                                {item.name}
                            </div>
                        </>
                    );
                })}
            </div>
        </>
    );
};

export default MembersToSellItem;
