import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CustomAsyncReactSelect } from '../../../shared/Input/AllInputs';
import { getMembers } from '../../../redux/actions/Dashboard/Members';
import { useMemo } from 'react';
import { addRecentMemberAction } from '../../../redux/actions/POS/saleActions';

export default function SearchMembers({ selectedMember, setSelectedMember }) {
    const dispatch = useDispatch();
    let { allMembers } = useSelector((state) => state.members);
    const { recentMembers } = useSelector((state) => state?.pos);

    const options = useMemo(() => allMembers.map((item) => ({ name: `${item.firstName} ${item?.MI} ${item?.lastName}`, value: item?._id })), [allMembers]);
    const suggestions = useMemo(
        () => recentMembers.map((item) => ({ name: `${item.firstName} ${item?.MI} ${item?.lastName}`, value: item?._id })),
        [recentMembers],
    );

    useEffect(() => {
        dispatch(getMembers());
    }, [dispatch]);
    useEffect(() => {
        dispatch(addRecentMemberAction());
    }, [dispatch, allMembers]);

    return (
        <div>
            <CustomAsyncReactSelect
                name="memberSell"
                field="fullName"
                suggestions={suggestions}
                options={options}
                placeholder="Search Member"
                showLabel={false}
                value={selectedMember}
                onChange={({ value }) => setSelectedMember(value)}
            />
        </div>
    );
}
