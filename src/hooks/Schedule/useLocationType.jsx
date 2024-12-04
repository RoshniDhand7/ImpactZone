import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLocationTypes } from '../../redux/actions/Settings/ScheduleSetup/locationTypeActions';

const useLocationType = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getLocationTypes());
    }, [dispatch]);

    const { locationType, locationTypeDropdown } = useSelector((state) => state.settings.schedule);

    return { locationType, locationTypeDropdown };
};

export default useLocationType;
