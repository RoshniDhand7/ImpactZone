import React, { useMemo, useState } from 'react';
import { CustomButton } from '../../shared/Button/CustomButton';
import { getImageURL } from '../../utils/imageUrl';
import { useDispatch, useSelector } from 'react-redux';
import { getCatalogItems, getCatalogItemsFilter } from '../../redux/actions/InventorySettings/catalogItemsAction';
import _ from 'lodash';
import CustomDialog from '../../shared/Overlays/CustomDialog';
import { CustomCheckBoxInput } from '../../shared/Input/AllInputs';
import PlaceHolderImg from '../../assets/images/productPlaceholder.png';

const CatalogItemsView = ({ allCatalogItems, data, setData, handleCatalogItems, handleChange }) => {
    const dispatch = useDispatch();
    const [visibleFilter, setVisibleFilter] = useState(false);

    const { filterSetDropDown } = useSelector((state) => state.filterSet);
    const { tagsDropDown } = useSelector((state) => state.tags);

    const handleApply = () => {
        dispatch(getCatalogItemsFilter(_, data?.categoryId, data?.filterSet, data?.tags));
        setVisibleFilter(false);
    };

    const handleClear = () => {
        setData((prev) => ({ ...prev, tags: [], filterSet: [] }));
    };
    const onCancel = () => {
        setVisibleFilter(false);
    };

    const filters = ['filterSet', 'tags'];

    const filterOptions = {
        filterSet: {
            name: 'FilterSet',
            value: 'filterSet',
            options: filterSetDropDown,
        },
        tags: {
            name: 'Tags',
            value: 'tags',
            options: tagsDropDown,
        },
    };
    const filterOptionItems = useMemo(() => filters.map((item) => filterOptions[item]), [filters.length, filterSetDropDown, tagsDropDown]);

    console.log(allCatalogItems, 'allCatalogItems');

    return (
        <>
            <div className="products-view ">
                <div className={`bg-primary-dark border-round shadow-2 px-2 ${'flex justify-content-between align-items-center'}`}>
                    <div className="text-xl text-white justify-content-end align-items-end ml-2">Most Purchased Items</div>
                    <CustomButton
                        className="p-1 border-gray-200 text-sm   p-2 text-white justify-content-end align-items-end"
                        outlined={true}
                        onClick={() => setVisibleFilter(true)}
                    >
                        Filter
                    </CustomButton>
                </div>
                <div className="bg-lightest-blue border-round p-4 mt-2 flex justify-content-between " style={{ height: '71vh', overflowY: 'auto' }}>
                    <div class="flex gap-2 flex-wrap w-full" style={{ height: 'fit-content' }}>
                        {allCatalogItems?.length > 0 ? (
                            allCatalogItems?.map((item) => (
                                <div
                                    onClick={() => {
                                        handleCatalogItems(item);
                                    }}
                                    className="cursor-pointer product-box"
                                    key={item._id}
                                >
                                    <img src={getImageURL(item.img) ? getImageURL(item.img) : PlaceHolderImg} className="w-full h-full" alt="catalogImg" />
                                    <div className="product-content">
                                        <p className="font-semibold text-sm text-dark-blue">{item?.itemCaption}</p>
                                        <p className="font-semibold text-sm text-dark-blue">$ {item.unitPrice}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <>
                                <img />
                            </>
                        )}
                    </div>
                </div>
            </div>
            <CustomDialog
                title="Apply Filters"
                icon="pi-filter"
                width="70vh"
                visible={visibleFilter}
                onCancel={onCancel}
                onApply={handleApply}
                onClear={handleClear}
            >
                <div className="customize-graph">
                    {filterOptionItems?.map((item, i) => (
                        <div key={i}>
                            {i ? <hr /> : null}
                            <div className="content">
                                <CustomCheckBoxInput
                                    className="text-base"
                                    label={item.name}
                                    name={item.value}
                                    options={item.options}
                                    data={data}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </CustomDialog>
        </>
    );
};

export default CatalogItemsView;
