import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getClubs } from '../redux/actions/BusinessSettings/clubsAction';

const useGetClubs = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getClubs());
    }, [dispatch]);

    let { clubsDropdown, allClubs } = useSelector((state) => state.clubs);
    return { clubsDropdown, allClubs };
};

export default useGetClubs;
