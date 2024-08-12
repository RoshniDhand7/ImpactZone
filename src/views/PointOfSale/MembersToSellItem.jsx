import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMembers } from '../../redux/actions/Dashboard/Members';
import { addRecentSearch, getSearchSuggestion } from '../../redux/actions/POSAction';
import { CustomAutoComplete } from '../../shared/Input/AllInputs';

const MembersToSellItem = ({ data, setData }) => {
    const dispatch = useDispatch();
    const [memberItems, setMemberItems] = useState([]);
    const [isRecentSearch, setIsRecentSearch] = useState(false);

    const handleChange = ({ name, value }) => {
        setData((prev) => ({ ...prev, [name]: value }));
        setIsRecentSearch(false);
    };

    useEffect(() => {
        dispatch(getMembers());
        dispatch(getSearchSuggestion());
    }, [dispatch]);

    useEffect(() => {
        if (data?.memberSell?.fullName && !isRecentSearch) {
            dispatch(
                addRecentSearch({ name: data?.memberSell?.fullName, memberId: data?.memberSell.id }, () => {
                    dispatch(getSearchSuggestion());
                }),
            );
        }
    }, [data?.memberSell?.fullName, dispatch, isRecentSearch]);

    let { allMembers } = useSelector((state) => state.members);
    const { recentSuggesstions } = useSelector((state) => state?.POS);

    allMembers = allMembers.map((item) => ({
        firstName: item.firstName,
        middleName: item.MI,
        lastName: item.lastName,
        id: item._id,
        fullName: `${item.firstName} ${item.MI} ${item.lastName}`.trim(),
    }));

    const searchMember = (event) => {
        let query = event.query;
        let _filteredItems = allMembers.filter((item) => {
            let _item = `${item.firstName} ${item.middleName} ${item.lastName}`.trim();
            let _query = query.trim().toLowerCase();
            return _item.toLowerCase().includes(_query);
        });
        setMemberItems(_filteredItems);
        return _filteredItems;
    };

    const handleRecentSearch = (item) => {
        setIsRecentSearch(true);
        const _member = {
            firstName: item.memberData.firstName,
            middleName: item.memberData.MI,
            lastName: item.memberData.lastName,
            id: item.memberData._id,
            fullName: `${item.memberData.firstName} ${item.memberData.MI || ''} ${item.memberData.lastName}`.trim(),
        };

        setData((prev) => ({ ...prev, ['memberSell']: _member }));
    };

    return (
        <>
            <CustomAutoComplete
                name="memberSell"
                field="fullName"
                filtered={memberItems}
                search={searchMember}
                onChange={handleChange}
                data={data}
                placeholder="Search by member"
                itemTemplate={(item) => <div>{`${item.firstName} ${item.middleName} ${item.lastName} `}</div>}
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
