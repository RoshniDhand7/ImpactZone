import React from 'react';
import { useSelector } from 'react-redux';
import { CustomAsyncReactSelect } from '../../../shared/Input/AllInputs';
import { useMemo } from 'react';

export default function SearchCatalog({ onSelectProduct }) {
    let { posCatalog } = useSelector((state) => state.catalogItems);
    const options = useMemo(() => {
        let arr = [];
        posCatalog.forEach((item) => {
            if (item.variations?.length) {
                item.variations.forEach((variation) => {
                    variation.subVariations.forEach((subVariationItem) => {
                        let { netPrice, defaultQuantity, minimumQuantity, maximumQuantity, _id, subVariation, upc } = subVariationItem;
                        let productObj = {
                            ...item,
                            subVariationId: _id,
                            itemCaption: `${item?.itemCaption}(${subVariation})`,
                            netPrice,
                            defaultQuantity,
                            minimumQuantity,
                            maximumQuantity,
                            variations: [],
                        };
                        arr.push({ name: `${item.name} ${subVariation}(${upc})`, value: productObj });
                    });
                });
            }
            // else {
            //     arr.push({ name: `${item.name} (${item.upc})`, value: item });
            // }
            arr.push({ name: `${item.name} (${item.upc})`, value: item });
        });

        return arr;
    }, [posCatalog]);

    return (
        <div>
            <CustomAsyncReactSelect
                name="memberSell"
                field="fullName"
                suggestions={[]}
                options={options}
                placeholder="Search by UPC/Item"
                showLabel={false}
                onChange={({ value }) => onSelectProduct(value)}
            />
        </div>
    );
}
