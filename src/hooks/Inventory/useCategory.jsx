import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getCategories } from '../../redux/actions/Settings/InventorySetup/categoriesAction';

const useCategory = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);
    let { categoryDropdown, allCategory } = useSelector((state) => state.category);

    return { categoryDropdown, allCategory };
};

export default useCategory;
