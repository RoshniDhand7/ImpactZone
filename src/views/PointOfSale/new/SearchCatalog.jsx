import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CustomAsyncReactSelect } from '../../../shared/Input/AllInputs';
import { getMembers } from '../../../redux/actions/Dashboard/Members';
import { getSearchSuggestion } from '../../../redux/actions/POSAction';
import { useMemo } from 'react';

export default function SearchCatalog({ selectedMember, setSelectedMember }) {
    const dispatch = useDispatch();
    let { allMembers } = useSelector((state) => state.members);
    const { recentSuggesstions } = useSelector((state) => state?.POS);

    const options = useMemo(() => allMembers.map((item) => ({ name: `${item.firstName} ${item?.MI} ${item?.lastName}`, value: item?._id })), [allMembers]);
    const suggestions = useMemo(
        () =>
            recentSuggesstions.map((item) => ({
                value: item.memberId,
                name: item?.name,
            })),
        [recentSuggesstions],
    );

    useEffect(() => {
        dispatch(getMembers());
        dispatch(getSearchSuggestion());
    }, [dispatch]);
    return (
        <div>
            <CustomAsyncReactSelect
                name="memberSell"
                field="fullName"
                suggestions={suggestions}
                options={options}
                placeholder="Search by UPC/Item"
                showLabel={false}
                value={selectedMember}
                onChange={({ value }) => setSelectedMember(value)}
            />
        </div>
    );
}
