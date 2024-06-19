import { useMemo, useState } from 'react';
import { applyFilters } from '../utils/commonFunctions';

export default function useFilters(events) {
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

    const filterData = useMemo(() => applyFilters(events, data), [events, data]);

    return {
        events: filterData,
        onFilterOpen: onOpen,
        onFilterClose: onClose,
        onApplyFilters: onApply,
        filters: data,
        isFilterVisible: isVisible,
    };
}
