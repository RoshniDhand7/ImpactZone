import React, { useEffect, useState } from 'react';
import CustomTable from '../../../../shared/Table/CustomTable';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CustomFilterCard, CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import { confirmDelete, showFormErrors } from '../../../../utils/commonFunctions';
import { addAccessSchedule, deleteAccessSchedule, getAccessSchedules } from '../../../../redux/actions/MembersSettings/accessSchedule';
import CustomDialog from '../../../../shared/Overlays/CustomDialog';
import { CustomInput } from '../../../../shared/Input/AllInputs';
import formValidation from '../../../../utils/validations';

const AcessSchedule = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAccessSchedules());
    }, [dispatch]);

    const { allAccessSchedule } = useSelector((state) => state.accessSchedule);
    const { loading } = useSelector((state) => state?.loader?.isLoading);
    const [visible, setVisible] = useState(false);

    const columns = [
        { field: 'name', header: 'Name' },
        { field: 'description', header: 'Description' },
        { field: 'shortName', header: 'Short Name' },
        { field: 'isActive', header: 'Active' },
    ];

    const onEdit = (col) => {
        history.push(`/settings/members/access-schedule/edit/${col._id}`);
    };
    const onCopy = (col) => {
        setVisible(col);
    };

    const onDelete = (col, position) => {
        confirmDelete(
            () => {
                dispatch(deleteAccessSchedule(col._id, () => {}));
            },
            'Do you want to delete this Access Schedule ?',
            position,
        );
    };

    const handleSave = () => {
        if (showFormErrors(data, setData)) {
            const payload = {
                name: data?.name,
                shortName: visible?.shortName,
                color: visible?.color,
                description: visible?.description,
                schedule: visible?.schedule,
                duration: visible?.duration,
            };
            dispatch(
                addAccessSchedule(payload, history, '', () => {
                    onClose();
                    dispatch(getAccessSchedules());
                }),
            );
        }
    };

    const [data, setData] = useState({
        name: '',
    });

    const handleChange = ({ name, value }) => {
        const formErrors = formValidation(name, value, data);
        setData((prev) => ({ ...prev, [name]: value, formErrors }));
    };

    const onClose = () => {
        setVisible(null);
        setData({
            name: '',
        });
    };
    return (
        <>
            <CustomFilterCard buttonTitle="Add Access Schedule" linkTo="/settings/members/access-schedule/add" />
            <CustomTable data={allAccessSchedule} columns={columns} onEdit={onEdit} onDelete={onDelete} onCopy={onCopy} />
            <CustomDialog title={'Copy Access Schedule'} visible={visible} onCancel={onClose} loading={loading} onSave={handleSave}>
                <CustomGridLayout>
                    <CustomInput col="12" name="name" data={data} onChange={handleChange} />
                </CustomGridLayout>
            </CustomDialog>
        </>
    );
};

export default AcessSchedule;
