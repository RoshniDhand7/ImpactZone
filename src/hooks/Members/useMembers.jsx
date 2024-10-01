import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMembers } from '../../redux/actions/Dashboard/Members';

const useMembers = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMembers());
    }, [dispatch]);

    let { allMembers } = useSelector((state) => state.members);
    return { allMembers };
};

export default useMembers;
