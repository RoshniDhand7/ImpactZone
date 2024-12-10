import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMembers } from '../../redux/actions/MembersPortal/memberPortalActions';

const useMembers = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMembers());
    }, [dispatch]);

    let { members, allMembersDropdown } = useSelector((state) => state.membersPortal);

    return { members, allMembersDropdown };
};

export default useMembers;
