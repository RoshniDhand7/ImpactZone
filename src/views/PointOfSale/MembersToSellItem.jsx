import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMembers } from '../../redux/actions/Dashboard/Members';
import { addRecentSearch, getSearchSuggestion } from '../../redux/actions/POSAction';
import { CustomAutoComplete } from '../../shared/Input/AllInputs';

const MembersToSellItem = ({ data, handleChange }) => {
    const dispatch = useDispatch();
    const [memberItems, setMemberItems] = useState([]);

    useEffect(() => {
        dispatch(getMembers());
        dispatch(getSearchSuggestion());
    }, [dispatch]);

    useEffect(() => {
        if (data?.memberSell?.fullName) {
            dispatch(
                addRecentSearch(data?.memberSell?.fullName, () => {
                    dispatch(getSearchSuggestion());
                }),
            );
        }
    }, [data?.memberSell?.fullName, dispatch]);

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
                            <div className="text-sm text-blue" key={item._id}>
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
