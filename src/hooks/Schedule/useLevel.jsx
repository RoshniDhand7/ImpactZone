import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLevels } from '../../redux/actions/ScheduleSettings/levelActions';

const useLevel = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getLevels());
    }, [dispatch]);

    const { allLevels, levelDropdown } = useSelector((state) => state.level);

    return { allLevels, levelDropdown };
};

export default useLevel;
