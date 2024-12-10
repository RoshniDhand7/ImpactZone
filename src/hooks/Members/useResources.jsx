import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getResources } from '../../redux/actions/Settings/MembershipSetup/resourceAction';

const useResources = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getResources());
    }, [dispatch]);

    const { resource } = useSelector((state) => state.settings.members);

    return { allResources: resource };
};

export default useResources;
