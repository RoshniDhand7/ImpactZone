import React, { useEffect } from 'react';
import { CustomTree } from '../../shared/CustomTree';
import { useDispatch, useSelector } from 'react-redux';
import { getCatalogItems } from '../../redux/actions/InventorySettings/catalogItemsAction';
import _ from 'lodash';

const CategoryFilter = ({ data, setData }) => {
    const dispatch = useDispatch();
    const { allCategory } = useSelector((state) => state.category);
    useEffect(() => {
        if (data?.categoryId || data?.catalogItem?._id) {
            dispatch(getCatalogItems(_, data?.categoryId, data?.catalogItem?._id));
        }
    }, [data?.categoryId, data?.catalogItem?._id, dispatch]);

    const handleSubCategorySelect = (category) => {
        setData((prev) => ({ ...prev, categoryId: category.value }));
    };
    const getSubCategoryTreeSelect = () => {
        let keys = allCategory
            ?.filter((item) => item.hasCatalog)
            .map((category) => ({
                key: `${category._id}`,
                label: category.name,
                icon: 'pi pi-fw pi-home',
            }));
        keys.unshift({
            key: `all`,
            label: 'All',
            icon: 'pi pi-fw pi-home',
        });

        return keys;
    };
    return (
        <>
            <div className="mt-3">
                <div className="col-12 lg:col-12 md:col-12 div-shadow mb-2 lg:mb-0 p-0 responsive-height">
                    <div className="flex justify-content-between align-items-center p-2">
                        <h2 className="text-xl font-semibold ">{'Category'}</h2>
                    </div>
                    <div className="mt-3">
                        <CustomTree
                            className="p-0 bg-transparent sidebar-bar-menu "
                            values={getSubCategoryTreeSelect()}
                            selectionKeys={data?.categoryId}
                            onSelectionChange={handleSubCategorySelect}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default CategoryFilter;
