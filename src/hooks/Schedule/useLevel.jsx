import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLevels } from '../../redux/actions/Settings/ScheduleSetup/levelActions';

const useLevel = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getLevels());
    }, [dispatch]);

    const { levels, levelDropdown } = useSelector((state) => state.settings.schedule);

    return { levels, levelDropdown };
};

export default useLevel;
