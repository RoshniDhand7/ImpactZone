import React from 'react';
import Categories from './Categories';
import CustomTabView from '../../../../shared/TabView/CustomTabView';
import FilterSets from './FilterSets/FilterSets';
import Tags from './Tags/Tags';

const CategoriesTags = () => {
    const tabs = [
        { title: 'Categories', content: <Categories /> },
        { title: 'Filter Sets', content: <FilterSets /> },
        { title: 'Tags', content: <Tags /> },
    ];
    return (
        <>
            <CustomTabView name="categories" tabs={tabs} useIndex={true} disabledTabIndices={[]} />
        </>
    );
};

export default CategoriesTags;
