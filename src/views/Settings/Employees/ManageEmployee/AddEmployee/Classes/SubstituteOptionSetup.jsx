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
import { useDispatch } from 'react-redux';
import CustomDialog from '../../../../../../shared/Overlays/CustomDialog';
import { CustomDropDown, CustomInput } from '../../../../../../shared/Input/AllInputs';
import { substitutionPriorityOptions } from '../../../../../../utils/dropdownConstants';
import { confirmDelete, showFormErrors } from '../../../../../../utils/commonFunctions';
import formValidation from '../../../../../../utils/validations';

export default function SubstituteOptionSetup() {
    const { id } = useParams();
    const dispatch = useDispatch();

    const [Substitute, setSubstitute] = useState([]);
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [data, setData] = useState({
        name: '',
        priority: 'MEDIUM',
    });

    const [substitutionOptionsId, setSubstituteOptionsId] = useState('');
    useEffect(() => {
        funcGetEmpSubstitution(id);
    }, []);
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
        console.log(substitutionOptionsId);
        if (substitutionOptionsId) {
            dispatch(
                getSubstitutionOption(substitutionOptionsId, (data) => {
                    setData({
                        name: data.name,
                        priority: data.priority,
                    });
                }),
            );
        }
    }, [substitutionOptionsId, dispatch]);

    const columns = [
        { field: 'name', header: 'Name' },
        { field: 'priority', header: 'Priority' },
    ];

    const handleChange = ({ name, value }) => {
        const formErrors = formValidation(name, value, data);
        setData((prev) => ({ ...prev, [name]: value, formErrors }));
    };

    const onClose = () => {
        setVisible(false);
        setData({
            name: '',
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
                    <CustomInput col="12" name="name" data={data} onChange={handleChange} />
                    <CustomDropDown name="priority" data={data} onChange={handleChange} options={substitutionPriorityOptions} col={12} />
                </CustomGridLayout>
            </CustomDialog>
        </div>
    );
}
