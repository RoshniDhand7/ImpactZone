import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getClubs } from '../redux/actions/Settings/Business/clubsAction';

const useGetClubs = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getClubs());
    }, [dispatch]);

    let { clubsDropdown, clubs } = useSelector((state) => state.settings.business);
    return { clubsDropdown, clubs };
};

export default useGetClubs;
