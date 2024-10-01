import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDepartments } from '../../redux/actions/EmployeeSettings/departmentsAction';

const useDepartments = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDepartments());
    }, [dispatch]);

    let { departmentsDropdown, allDepartments } = useSelector((state) => state?.department);
    return { departmentsDropdown, allDepartments };
};

export default useDepartments;
