import { useEffect, useState } from 'react';
import FilterComponent from '../../components/FilterComponent';
import { CustomGridLayout } from '../../shared/Cards/CustomCard';
import { CustomMultiselect } from '../../shared/Input/AllInputs';
import { getAgreementCategories } from '../../redux/actions/AgreementSettings/agreementCategories';
import { useDispatch, useSelector } from 'react-redux';
import useAgreementPlan from '../../hooks/Agreement/useAgreementPlan';

const PlanFilters = ({ onFilterClose, onApplyFilters, filters, isFilterVisible }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAgreementCategories());
    }, [dispatch]);

    const agreementCategoryDropdown = useSelector((state) => state.agreement.agreementCategoryDropdown);
    const { allMembershipPlanDropdown } = useAgreementPlan();

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
                <CustomMultiselect col="12" name="_id" label="Plan" data={data} onChange={handleChange} options={allMembershipPlanDropdown} showClear />
                <CustomMultiselect
                    col="12"
                    name="categoryId"
                    label="Category"
                    data={data}
                    onChange={handleChange}
                    options={agreementCategoryDropdown}
                    showClear
                />
            </CustomGridLayout>
        </FilterComponent>
    );
};

export default PlanFilters;
