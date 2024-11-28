import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMembers } from '../../redux/actions/MembersPortal/memberPortalActions';

const useMembers = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMembers());
    }, [dispatch]);

    let members = useSelector((state) => state.membersPortal.members);

    console.log(members);
    return { members };
};

export default useMembers;
