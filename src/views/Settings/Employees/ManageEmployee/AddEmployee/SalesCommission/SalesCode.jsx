import React, { useEffect, useState } from 'react';
import CustomCard, { CustomGridLayout } from '../../../../../../shared/Cards/CustomCard';
import { CustomInput } from '../../../../../../shared/Input/AllInputs';
import formValidation from '../../../../../../utils/validations';
import PrimaryButton, { CustomButtonGroup } from '../../../../../../shared/Button/CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import { addEmployeeSalesCode, getEmployeeSalesCode } from '../../../../../../redux/actions/EmployeeSettings/salesCommssionAction';
import { useParams } from 'react-router-dom';
import { showFormErrors } from '../../../../../../utils/commonFunctions';

const SalesCode = () => {
    const [data, setData] = useState({
        name: '',
    });

    const { id } = useParams();

    const dispatch = useDispatch();
    const handleChange = ({ name, value }) => {
        const formErrors = formValidation(name, value, data);
        setData((prev) => ({ ...prev, [name]: value, formErrors }));
    };

    useEffect(() => {
        dispatch(
            getEmployeeSalesCode(id, (data) => {
                setData((prev) => ({ ...prev, name: data.name }));
            }),
        );
    }, [dispatch, id]);

    const loading = useSelector((state) => state.loader.isLoading);

    const handleSave = () => {
        if (showFormErrors(data, setData)) {
            dispatch(addEmployeeSalesCode({ name: data.name, employee: id }));
        }
    };
    return (
        <>
            <CustomCard col="12" title="Sales Code">
                <CustomGridLayout>
                    <CustomInput name="name" onChange={handleChange} data={data} />
                </CustomGridLayout>
            </CustomCard>
            <CustomButtonGroup>
                <PrimaryButton label="Save" className="mx-2" onClick={() => handleSave('')} loading={loading} />
            </CustomButtonGroup>
        </>
    );
};

export default SalesCode;
