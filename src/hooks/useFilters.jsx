import { useMemo, useState } from 'react';
import { applyFilters } from '../utils/commonFunctions';

export default function useFilters(tableData) {
    const [isVisible, setIsVisible] = useState(false);
    const [data, setData] = useState({});

    const onOpen = () => {
        setIsVisible(true);
    };
    const onClose = () => {
        setIsVisible(false);
    };
    const onApply = (e) => {
        setData(e);
    };

    const filterData = useMemo(() => applyFilters(tableData, data), [tableData, data]);

    console.log(filterData, 'filterData');

    return {
        tableData: filterData,
        onFilterOpen: onOpen,
        onFilterClose: onClose,
        onApplyFilters: onApply,
        filters: data,
        isFilterVisible: isVisible,
    };
}
