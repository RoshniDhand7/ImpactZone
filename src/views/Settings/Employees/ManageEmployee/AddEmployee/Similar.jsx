import React from 'react';
import { useDispatch } from 'react-redux';
import { getEmployees } from '../../../../../redux/actions/Settings/Employee/employeesAction';

const CustomDialogComponent = ({ openSimilar, setOpenSimilarTo, loading, handleSave, data1, filterCriteriaType }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getEmployees());
    }, [dispatch]);

    let { employees } = useSelector((state) => state.settings.employee);
    employees = employees?.filter((item) => item._id !== id);

    const handleInputChange = ({ name, value }) => {
        const formErrors = formValidation(name, value, data1);
        setData1((prev) => ({ ...prev, [name]: value, formErrors }));
    };

    const filterEmployees = (criteria) => {
        switch (criteria) {
            case 'class':
                return employees
                    .filter((employee) => employee.pay > 50000) // Example condition for pay
                    .map((item) => ({
                        name: `${item.firstName} ${item.middleInitial} ${item.lastName}`,
                        value: { id: item._id, pay: item.pay },
                    }));
            case 'appointment':
                return employees
                    .filter((employee) => new Date(employee.appointmentDate) > new Date('2022-01-01'))
                    .map((item) => ({
                        name: `${item.firstName} ${item.middleInitial} ${item.lastName}`,
                        value: { id: item._id, appointmentDate: item.appointmentDate },
                    }));
            case 'employee':
            default:
                return employees.map((item) => ({
                    name: `${item.firstName} ${item.middleInitial} ${item.lastName}`,
                    value: { id: item._id, employeeClassData: item.employeeClassData },
                }));
        }
    };

    const options = filterEmployees(filterCriteriaType);

    return (
        <CustomDialog title={'Similar To'} visible={openSimilar} onCancel={() => setOpenSimilarTo(false)} loading={loading} onSave={handleSave}>
            <CustomGridLayout>
                <CustomDropDown name="employee" col={12} data={data1} onChange={handleInputChange} options={options} />
            </CustomGridLayout>
        </CustomDialog>
    );
};

export default CustomDialogComponent;
