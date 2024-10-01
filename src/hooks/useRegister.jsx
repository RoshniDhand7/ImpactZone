import { useDispatch, useSelector } from 'react-redux';
import { getRegisters } from '../redux/actions/PosSettings/register';
import { useEffect } from 'react';

const useRegister = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getRegisters());
    }, [dispatch]);

    const { allRegisters } = useSelector((state) => state.registers);
    return { allRegisters };
};

export default useRegister;
