import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCommissionGroups } from '../../redux/actions/InventorySettings/commissionGroupAction';

const useCommissionGroup = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCommissionGroups());
    }, [dispatch]);
    let { allCommissionGroups, commissionGroupsDropdown } = useSelector((state) => state.commissionGroup);
    return { allCommissionGroups, commissionGroupsDropdown };
};

export default useCommissionGroup;
