import { useEffect, useState } from 'react';
import FilterComponent from '../../components/FilterComponent';
import { CustomGridLayout } from '../../shared/Cards/CustomCard';
import { CustomInput, CustomMultiselect } from '../../shared/Input/AllInputs';
import { getAgreementCategories } from '../../redux/actions/AgreementSettings/agreementCategories';
import { useDispatch, useSelector } from 'react-redux';

const PlanFilters = ({ onFilterClose, onApplyFilters, filters, isFilterVisible }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAgreementCategories());
    }, [dispatch]);

    const allAgreementCategories = useSelector((state) => state.agreement.allAgreementCategories);

    const [data, setData] = useState({
        filterType: 'AND',
    });

    const handleChange = ({ name, value }) => {
        setData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <FilterComponent
            value={filters}
            onApply={onApplyFilters}
            visible={isFilterVisible}
            onHide={onFilterClose}
            data={data}
            handleChange={handleChange}
            setData={setData}
        >
            <CustomGridLayout>
                <CustomInput col={12} label="Plan" name="name" data={data} onChange={handleChange} />
                <CustomMultiselect col="12" name="category" label="Category" data={data} onChange={handleChange} options={allAgreementCategories} showClear />
            </CustomGridLayout>
        </FilterComponent>
    );
};

export default PlanFilters;
