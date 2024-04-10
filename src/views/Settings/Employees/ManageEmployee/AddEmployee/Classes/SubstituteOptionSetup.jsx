import React, { useEffect, useState } from 'react';
import CustomCard, { CustomFilterCard, CustomGridLayout } from '../../../../../../shared/Cards/CustomCard';
import CustomTable from '../../../../../../shared/Table/CustomTable';
import {
    addEmployeeSubstitutionOptions,
    deleteSubstitutionOption,
    editEmployeeSubstitutionOptions,
    getEmployeeSubstitutionOptions,
    getSubstitutionOption,
} from '../../../../../../redux/actions/EmployeeSettings/classesAction';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CustomDialog from '../../../../../../shared/Overlays/CustomDialog';
import { CustomDropDown, CustomInput } from '../../../../../../shared/Input/AllInputs';
import { substitutionPriorityOptions } from '../../../../../../utils/dropdownConstants';
import { confirmDelete, showFormErrors } from '../../../../../../utils/commonFunctions';
import formValidation from '../../../../../../utils/validations';
import { getEvents } from '../../../../../../redux/actions/ScheduleSettings/eventsActions';

export default function SubstituteOptionSetup() {
    const { id } = useParams();
    const dispatch = useDispatch();

    const [Substitute, setSubstitute] = useState([]);
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [data, setData] = useState({
        event: '',
        priority: 'MEDIUM',
    });

    const [substitutionOptionsId, setSubstituteOptionsId] = useState('');
    let { isClassLevel } = useSelector((state) => state?.employees);

    useEffect(() => {
        funcGetEmpSubstitution(id);
        // dispatch(getEmployees());
        dispatch(getEvents());
    }, []);
    const { allEvents } = useSelector((state) => state.event);

    const filteredEvents = allEvents
        ?.filter((item) => item?.eventLevel?.includes(isClassLevel) && item.eventType === 'Class')
        ?.map((item) => ({ name: item.name, value: item._id }));

    const funcGetEmpSubstitution = (id) => {
        dispatch(
            getEmployeeSubstitutionOptions(id, setLoading, (data) => {
                setSubstitute(data);
            }),
        );
    };
    const onEdit = (col) => {
        setSubstituteOptionsId(col?._id);
        setVisible(true);
    };
    useEffect(() => {
        if (substitutionOptionsId) {
            dispatch(
                getSubstitutionOption(substitutionOptionsId, (data) => {
                    setData({
                        event: data.event,
                        priority: data.priority,
                    });
                }),
            );
        }
    }, [substitutionOptionsId, dispatch]);

    const columns = [
        { field: 'event', header: 'Name' },
        { field: 'priority', header: 'Priority' },
    ];

    const handleChange = ({ name, value }) => {
        const formErrors = formValidation(name, value, data);
        setData((prev) => ({ ...prev, [name]: value, formErrors }));
    };

    const onClose = () => {
        setVisible(false);
        setData({
            event: '',
            priority: 'MEDIUM',
        });
        setSubstituteOptionsId(null);
    };

    const handleSave = () => {
        if (showFormErrors(data, setData)) {
            if (substitutionOptionsId) {
                dispatch(
                    editEmployeeSubstitutionOptions(substitutionOptionsId, { ...data, employee: id }, setLoading, () => {
                        funcGetEmpSubstitution(id);
                        onClose();
                    }),
                );
            } else {
                dispatch(
                    addEmployeeSubstitutionOptions({ ...data, employee: id }, setLoading, () => {
                        funcGetEmpSubstitution(id);
                        onClose();
                    }),
                );
            }
        }
    };

    const onDelete = (col) => {
        confirmDelete(() => {
            dispatch(
                deleteSubstitutionOption(col._id, () => {
                    funcGetEmpSubstitution(id);
                    onClose();
                }),
            );
        }, 'Do you want to delete this Substitution Option?');
    };

    return (
        <div>
            <CustomFilterCard buttonTitle="Add" onClick={() => setVisible(true)} />
            <CustomCard col="12" title="Classes">
                <CustomTable data={Substitute} columns={columns} onEdit={onEdit} onDelete={onDelete} />
            </CustomCard>
            <CustomDialog title={substitutionOptionsId ? 'Edit' : 'Add'} visible={visible} onCancel={onClose} loading={loading} onSave={handleSave}>
                <CustomGridLayout>
                    <CustomDropDown name="event" data={data} onChange={handleChange} options={filteredEvents} col={12} />
                    <CustomDropDown name="priority" data={data} onChange={handleChange} options={substitutionPriorityOptions} col={12} />
                </CustomGridLayout>
            </CustomDialog>
        </div>
    );
}
