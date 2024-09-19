import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfitCenters } from '../../redux/actions/InventorySettings/profitCenterAction';

const useProfitCenters = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProfitCenters());
    }, [dispatch]);
    let { profitCenterDropdown, allProfitCenters } = useSelector((state) => state.profitCenter);
    return { profitCenterDropdown, allProfitCenters };
};

export default useProfitCenters;
