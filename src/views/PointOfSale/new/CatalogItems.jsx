import React, { useState } from 'react';
import CustomCard from '../../../shared/Cards/CustomCard';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getPOSCatalogItems } from '../../../redux/actions/InventorySettings/catalogItemsAction';
import placeholder from '../../../assets/images/placeholder.png';
import { getImageURL } from '../../../utils/imageUrl';
import { useMemo } from 'react';
import FilterPopup from './FilterPopup';
import { getFilterSets } from '../../../redux/actions/InventorySettings/filterSetsAction';
import { getTags } from '../../../redux/actions/InventorySettings/tagAction';

export default function CatalogItems({ selectedCategory, onSelectProduct }) {
    let { posCatalog } = useSelector((state) => state.catalogItems);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getPOSCatalogItems());
        dispatch(getFilterSets());
        dispatch(getTags());
    }, [dispatch]);

    posCatalog = useMemo(() => posCatalog.filter((item) => !selectedCategory || item.category === selectedCategory), [selectedCategory, posCatalog]);

    const [filters, setFilters] = useState(null);
    const [visible, setVisible] = useState(false);

    posCatalog = useMemo(() => {
        if (filters) {
            let arr = posCatalog;
            if (filters.filters?.length) {
                arr = arr.filter((item) => filters.filters.some((filter) => item.filterSet.includes(filter.value)));
            }
            if (filters.tags?.length) {
                arr = arr.filter((item) => filters.tags.some((tag) => item.tags.includes(tag.value)));
            }

            return arr;
        }
        return posCatalog;
    }, [filters, posCatalog]);

    const onApplyFilters = (filter) => {
        setFilters(filter);
        onClose();
    };
    const onClose = () => {
        setVisible(false);
    };
    return (
        <>
            <FilterPopup visible={visible} onClose={onClose} filters={filters} onApplyFilters={onApplyFilters} />
            <CustomCard title="Most Purchased Items" col={12} name="Filter" onClick={() => setVisible(true)}>
                <div className="grid">
                    {posCatalog.map((item) => (
                        <Item key={item._id} item={item} onSelectProduct={onSelectProduct} />
                    ))}
                </div>
            </CustomCard>
        </>
    );
}

function Item(props) {
    let item = props?.item;
    return (
        <div className="col-3 p-1 cursor-pointer" onClick={() => props?.onSelectProduct(item)}>
            <div className="bg-white border-1 surface-border p-2 border-round-md">
                <img
                    className="bg-lightest-blue border-round-md"
                    src={getImageURL(item?.catalogImage)}
                    alt={item?.itemCaption}
                    style={{ aspectRatio: '1/1' }}
                    onError={(e) => (e.target.src = placeholder)}
                />
                <div className="bg-lightest-blue border-round-md">
                    <div className="text-center px-2 ellipsis-text">{item?.itemCaption}</div>
                    <div className="text-center font-semibold">${item?.netPrice}</div>
                </div>
            </div>
        </div>
    );
}
