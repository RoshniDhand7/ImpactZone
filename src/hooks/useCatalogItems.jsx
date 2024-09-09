import { useDispatch, useSelector } from 'react-redux';
import { getCatalogItems } from '../redux/actions/InventorySettings/catalogItemsAction';
import { useEffect } from 'react';

const useCatalogItems = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCatalogItems());
    }, [dispatch]);

    const { allCatalogItems } = useSelector((state) => state.catalogItems);
    let CatalogItemsList = allCatalogItems?.map((item) => ({
        name: item.name,
        _id: item._id,
        upc: item.upc,
        unitPrice: item.unitPrice,
    }));
    return { CatalogItemsList, allCatalogItems };
};

export default useCatalogItems;
