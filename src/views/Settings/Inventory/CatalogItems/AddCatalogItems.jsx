import React, { useState } from 'react';
import CustomTabView from '../../../../shared/TabView/CustomTabView';
import FormPage from '../../../../shared/Layout/FormPage';
import General from './General';
import { useParams } from 'react-router-dom';
import Tracking from './Tracking';
import Usage from './Usage';
import Variations from './Variations';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getTaxes } from '../../../../redux/actions/PosSettings/tax';
import { getDiscountTypes } from '../../../../redux/actions/PosSettings/discountType';
import { getCatalogItem } from '../../../../redux/actions/Settings/InventorySetup/catalogItemsAction';
import { getCategories } from '../../../../redux/actions/Settings/InventorySetup/categoriesAction';
import { getFilterSets } from '../../../../redux/actions/Settings/InventorySetup/filterSetsAction';
import { getProfitCenters } from '../../../../redux/actions/Settings/InventorySetup/profitCenterAction';
import { getTags } from '../../../../redux/actions/Settings/InventorySetup/tagAction';

const AddCatalogItems = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [data, setData] = useState(null);

    useEffect(() => {
        if (id) {
            dispatch(
                getCatalogItem(id, (data) => {
                    setData({
                        ...data,
                        catalogImage: data.catalogImage ? [data.catalogImage] : [],
                    });
                }),
            );
        }
    }, [id, dispatch]);

    useEffect(() => {
        dispatch(getProfitCenters());
        dispatch(getCategories());
        dispatch(getTaxes());
        dispatch(getDiscountTypes());
        dispatch(getFilterSets());
        dispatch(getTags());
    }, [dispatch]);

    const tabs = [
        { title: 'General', content: <General editItem={data} /> },
        { title: 'Tracking', content: <Tracking editItem={data} /> },
        { title: 'Usage', content: <Usage editItem={data} /> },
        { title: 'Variations', content: <Variations editItem={data} /> },
    ];
    return (
        <>
            <FormPage backText="Catalog Items">
                <CustomTabView tabs={tabs} disabledTabIndices={id ? [] : [1, 2, 3]} />
            </FormPage>
        </>
    );
};

export default AddCatalogItems;
