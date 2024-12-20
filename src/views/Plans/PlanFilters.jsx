import { useEffect, useState } from 'react';
import FilterComponent from '../../components/FilterComponent';
import { CustomGridLayout } from '../../shared/Cards/CustomCard';
import { CustomMultiselect } from '../../shared/Input/AllInputs';
import { useDispatch, useSelector } from 'react-redux';
import { getAgreementCategories } from '../../redux/actions/Settings/AgreementSetup/agreementCategoriesAction';

const PlanFilters = ({ onFilterClose, onApplyFilters, filters, isFilterVisible }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAgreementCategories());
    }, [dispatch]);

    const agreementCategoryDropdown = useSelector((state) => state.settings.agreement.agreementCategoryDropdown);

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
