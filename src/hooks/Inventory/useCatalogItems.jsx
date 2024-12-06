import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getCatalogItems } from '../../redux/actions/Settings/InventorySetup/catalogItemsAction';

const useCatalogItems = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCatalogItems());
    }, [dispatch]);

    const { allCatalogItems, catalogProductDropdown, catalogDropDown } = useSelector((state) => state.catalogItems);
    let CatalogItemsList = allCatalogItems?.map((item) => ({
        name: item.name,
        _id: item._id,
        upc: item.upc,
        unitPrice: item.unitPrice,
    }));
    return { CatalogItemsList, allCatalogItems, catalogProductDropdown, catalogDropDown };
};

export default useCatalogItems;
