import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../redux/actions/InventorySettings/categoriesAction';
import { useEffect } from 'react';

const useCategory = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);
    let { categoryDropdown } = useSelector((state) => state.category);

    return { categoryDropdown };
};

export default useCategory;
