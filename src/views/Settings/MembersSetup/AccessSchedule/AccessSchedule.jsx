import React, { useEffect, useState } from 'react';
import CustomTable from '../../../../shared/Table/CustomTable';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CustomFilterCard, CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import { confirmDelete, showFormErrors } from '../../../../utils/commonFunctions';
import CustomDialog from '../../../../shared/Overlays/CustomDialog';
import { CustomInput } from '../../../../shared/Input/AllInputs';
import formValidation from '../../../../utils/validations';
import PrimaryButton from '../../../../shared/Button/CustomButton';
import useFilters from '../../../../hooks/useFilters';
import ActiveFilter from '../../../../components/Filters/ActiveFilter';
import { addAccessSchedule, deleteAccessSchedule, getAccessSchedules } from '../../../../redux/actions/Settings/MembershipSetup/AccessScheduleAction';

const AcessSchedule = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAccessSchedules());
    }, [dispatch]);

    const { assessSchedule } = useSelector((state) => state?.settings?.members);
    const { isTableLoading } = useSelector((state) => state?.tableLoader);

    const [visible, setVisible] = useState(false);

    const columns = [
        { field: 'name', header: 'Name' },
        { field: 'description', header: 'Description' },
        { field: 'shortName', header: 'Short Name' },
        { field: 'isActive', header: 'Active' },
    ];

    const onEdit = (col) => {
        history.push(`/settings/member-setup/access-schedule/edit/${col._id}`);
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
                isActive: visible?.isActive === 'No' ? false : true,
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

    const { tableData, onFilterOpen, onFilterClose, onApplyFilters, filters, isFilterVisible } = useFilters(assessSchedule);

    return (
        <>
            <CustomFilterCard buttonTitle="Add Access Schedule" linkTo="/settings/member-setup/access-schedule/add" contentPosition="end">
                <PrimaryButton label="Filters" icon="pi pi-filters" className="mx-2" onClick={onFilterOpen} />
            </CustomFilterCard>
            <CustomTable data={tableData} columns={columns} onEdit={onEdit} onDelete={onDelete} onCopy={onCopy} loading={isTableLoading} />
            <ActiveFilter filters={filters} onApplyFilters={onApplyFilters} isFilterVisible={isFilterVisible} onFilterClose={onFilterClose} />
            <CustomDialog title={'Copy Access Schedule'} visible={visible} onCancel={onClose} loading={isTableLoading} onSave={handleSave}>
                <CustomGridLayout>
                    <CustomInput col="12" name="name" data={data} onChange={handleChange} />
                </CustomGridLayout>
            </CustomDialog>
        </>
    );
};

export default AcessSchedule;
