import { useDispatch, useSelector } from 'react-redux';
import { getEmployees } from '../../redux/actions/Settings/Employee/employeesAction';
import { useEffect } from 'react';

const useEmployees = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getEmployees());
    }, [dispatch]);

    const { employeesDropdown, employees } = useSelector((state) => state.settings.employee);
    return { employeesDropdown, employees };
};

export default useEmployees;
