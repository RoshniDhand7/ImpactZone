import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getResources } from '../../redux/actions/MembersSettings/resources';

const useResources = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getResources());
    }, [dispatch]);

    const { allResources } = useSelector((state) => state.resources);

    return { allResources };
};

export default useResources;
