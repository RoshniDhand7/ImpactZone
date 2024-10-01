import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLocationTypes } from '../../redux/actions/ScheduleSettings/locationTypeActions';

const useLocationType = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getLocationTypes());
    }, [dispatch]);

    const { allLocationType, locationTypeDropdown } = useSelector((state) => state.locationType);

    return { allLocationType, locationTypeDropdown };
};

export default useLocationType;
