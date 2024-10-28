import React, { useState } from 'react';
import CustomDialog from '../../../shared/Overlays/CustomDialog';
import { CustomCheckBoxInput } from '../../../shared/Input/AllInputs';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

export default function FilterPopup({ visible, onClose, filters, onApplyFilters }) {
    const { filterSetDropDown } = useSelector((state) => state.filterSet);
    const { tagsDropDown } = useSelector((state) => state.tags);
    const [data, setData] = useState({
        filters: [],
        tags: [],
    });

    useEffect(() => {
        if (filters) {
            setData(filters);
        }
    }, [filters]);

    const handleChange = ({ name, value }) => {
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const onApply = () => {
        onApplyFilters(data);
        setData({
            filters: [],
            tags: [],
        });
    };

    const onClear = () => {
        setData({
            filters: [],
            tags: [],
        });
        onApplyFilters(null);
    };

    return (
        <CustomDialog icon="pi-filter" title="Apply Filters" visible={visible} onCancel={onClose} onApply={onApply} onClear={onClear}>
            <CustomCheckBoxInput label="Filter Set" name="filters" options={filterSetDropDown} data={data} onChange={handleChange} />
            <CustomCheckBoxInput label="Tags" name="tags" options={tagsDropDown} data={data} onChange={handleChange} />
        </CustomDialog>
    );
}
