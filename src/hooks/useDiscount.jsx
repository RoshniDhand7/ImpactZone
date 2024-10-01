import { useDispatch, useSelector } from 'react-redux';
import { getDiscountTypes } from '../redux/actions/PosSettings/discountType';
import { useEffect } from 'react';

const useDiscount = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDiscountTypes());
    }, [dispatch]);
    let { allDiscountDropdown } = useSelector((state) => state.discountType);
    return { allDiscountDropdown };
};

export default useDiscount;
