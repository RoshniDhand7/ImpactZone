import React, { useState } from 'react';
import CustomDialog from '../../shared/Overlays/CustomDialog';
import { colorOptions } from '../../utils/dropdownConstants';
import { useDispatch } from 'react-redux';
import formValidation from '../../utils/validations';
import { CustomDropDown, CustomInput, CustomTextArea } from '../../shared/Input/AllInputs';
import { CustomGridLayout } from '../../shared/Cards/CustomCard';
import { showFormErrors } from '../../utils/commonFunctions';
import { addAlertAction } from '../../redux/actions/CheckIn/CheckIn';
import { getAlerts } from '../../redux/actions/MembersPortal/memberPortalActions';

const AddAlert = ({ openAlert, setOpenAlert, memberId }) => {
    const initialState = {
        title: '',
        description: '',
        colorType: '',
    };
    const [data, setData] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const handleChange = ({ name, value }) => {
        const formErrors = formValidation(name, value, data);
        setData((prev) => ({ ...prev, [name]: value, formErrors }));
    };

    const handleSave = () => {
        if (showFormErrors(data, setData)) {
            dispatch(
                addAlertAction({ ...data, member: memberId }, setLoading, () => {
                    setOpenAlert(false);
                    setData(initialState);
                    dispatch(getAlerts(memberId));
                }),
            );
        }
    };

    return (
        <>
            <CustomDialog
                title="Add Alert"
                visible={openAlert}
                onCancel={() => {
                    setOpenAlert(false);
                    setData(initialState);
                }}
                loading={loading}
                width="60vh"
                onSave={handleSave}
            >
                <CustomGridLayout>
                    <CustomInput name="title" onChange={handleChange} data={data} col="6" />
                    <CustomDropDown name="colorType" onChange={handleChange} data={data} options={colorOptions} col="6" />
                    <CustomTextArea name="description" onChange={handleChange} data={data} />
                </CustomGridLayout>
            </CustomDialog>
        </>
    );
};

export default AddAlert;
