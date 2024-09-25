import React from 'react';
import CustomCard from '../../../shared/Cards/CustomCard';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getPOSCatalogItems } from '../../../redux/actions/InventorySettings/catalogItemsAction';
import placeholder from '../../../assets/images/placeholder.png';
import { getImageURL } from '../../../utils/imageUrl';
import { useMemo } from 'react';

export default function CatalogItems({ selectedCategory, onAddItemIntoCart }) {
    let { posCatalog } = useSelector((state) => state.catalogItems);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getPOSCatalogItems());
    }, [dispatch]);

    posCatalog = useMemo(() => posCatalog.filter((item) => !selectedCategory || item.category === selectedCategory), [selectedCategory, posCatalog]);

    return (
        <CustomCard title="Most Purchased Items" col={12}>
            <div className="grid">
                {posCatalog.map((item) => (
                    <Item key={item._id} item={item} onAddItemIntoCart={onAddItemIntoCart} />
                ))}
            </div>
        </CustomCard>
    );
}

function Item(props) {
    let item = props?.item;
    return (
        <div className="col-3 p-1 cursor-pointer" onClick={() => props?.onAddItemIntoCart(item)}>
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
                    <div className="text-center font-semibold">${item?.unitPrice}</div>
                </div>
            </div>
        </div>
    );
}
