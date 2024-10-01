import { useDispatch, useSelector } from 'react-redux';
import { getEmployees } from '../../redux/actions/EmployeeSettings/employeesAction';
import { useEffect } from 'react';

const useEmployees = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getEmployees());
    }, [dispatch]);

    const { employeesDropdown } = useSelector((state) => state.employees);
    return { employeesDropdown };
};

export default useEmployees;
