import { useEffect, useMemo, useState } from 'react';
import { applyFilters } from '../utils/commonFunctions';
import _ from 'lodash';
import { useDispatch } from 'react-redux';

export default function useFilters(tableData, filter = 'frontend', id, getFilteredData) {
    const [isVisible, setIsVisible] = useState(false);
    const [data, setData] = useState({});
    const [filteredData, setFilteredData] = useState(tableData);
    const dispatch = useDispatch();

    const onOpen = () => {
        setIsVisible(true);
    };
    const onClose = () => {
        setIsVisible(false);
    };
    const onApply = (e) => {
        if (id) {
            dispatch(getFilteredData(_, id, e));
        } else {
            setData(e);
        }
    };

    const localFilteredData = useMemo(() => applyFilters(tableData, data), [tableData, data]);

    useEffect(() => {
        if (filter === 'frontend') {
            setFilteredData(localFilteredData);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tableData, localFilteredData, filter]);

    return {
        tableData: filteredData,
        onFilterOpen: onOpen,
        onFilterClose: onClose,
        onApplyFilters: onApply,
        filters: data,
        isFilterVisible: isVisible,
    };
}
