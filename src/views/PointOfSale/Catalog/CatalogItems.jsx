import React, { useState } from 'react';
import CustomCard from '../../../shared/Cards/CustomCard';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import placeholder from '../../../assets/images/placeholder.png';
import { getImageURL } from '../../../utils/imageUrl';
import { useMemo } from 'react';
import FilterPopup from './FilterPopup';
import { roundOfNumber } from '../../../utils/taxHelpers';
import CustomAnimatedCard from '../../../shared/Transitions/CustomAnimatedCard';
import { getCatalogItems } from '../../../redux/actions/POS/catalogActions';
import { getFilterSets } from '../../../redux/actions/Settings/InventorySetup/filterSetsAction';
import { getTags } from '../../../redux/actions/Settings/InventorySetup/tagAction';

export default function CatalogItems({ selectedCategory, onSelectProduct }) {
    let posCatalog = useSelector((state) => state.pos.catalogs);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCatalogItems());
        dispatch(getFilterSets());
        dispatch(getTags());
    }, [dispatch]);

    posCatalog = useMemo(() => {
        if (!selectedCategory) {
            return posCatalog.filter((item) => item.type !== 'PRE_PAY');
        } else if (selectedCategory === 'PRE_PAY') {
            return posCatalog.filter((item) => item.type === 'PRE_PAY');
        } else {
            return posCatalog.filter((item) => item.category === selectedCategory);
        }
    }, [selectedCategory, posCatalog]);

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
            <CustomCard
                extraClassName="h-full flex flex-column"
                bodyClassName="h-full"
                title="Most Purchased Items"
                col={12}
                name="Filter"
                onClick={() => setVisible(true)}
            >
                <div className="grid" style={{ maxHeight: '90vh', overflowY: 'auto' }}>
                    {posCatalog.map((item, i) => (
                        <Item index={i} key={item._id} item={item} onSelectProduct={onSelectProduct} />
                    ))}
                </div>
            </CustomCard>
        </>
    );
}

function Item(props) {
    let item = props?.item;
    return (
        <CustomAnimatedCard index={props.index} className="col-3 p-1 cursor-pointer" onClick={() => props?.onSelectProduct(item)}>
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
                    <div className="text-center font-semibold">${roundOfNumber(item?.netPrice)}</div>
                </div>
            </div>
        </CustomAnimatedCard>
    );
}
