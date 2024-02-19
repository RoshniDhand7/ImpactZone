import React, { useEffect, useState } from 'react';
import CustomCard, { CustomFilterCard, CustomGridLayout } from '../../../../../../shared/Cards/CustomCard';
import CustomTable from '../../../../../../shared/Table/CustomTable';
import { getEmployeeSubstitutionOptions } from '../../../../../../redux/actions/EmployeeSettings/classesAction';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import CustomDialog from '../../../../../../shared/Overlays/CustomDialog';
import { CustomDropDown, CustomInput } from '../../../../../../shared/Input/AllInputs';
import { substitutionPriorityOptions } from '../../../../../../utils/dropdownConstants';

export default function SubstituteOptionSetup() {
    const { id } = useParams();
    const dispatch = useDispatch();

    const [Substitute, setSubstitute] = useState([]);
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
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
    const columns = [
        { field: 'name', header: 'Name' },
        { field: 'priority', header: 'Priority' },
    ];

    const [data, setData] = useState({
        name: '',
        priority: 'MEDIUM',
    });
    const handleChange = ({ name, value }) => {
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const onClose = () => {
        setVisible(false);
    };

    const handleSave = () => {};

    console.log('s>>', Substitute);
    return (
        <div>
            <CustomFilterCard buttonTitle="Add" onClick={() => setVisible(true)} />
            <CustomCard col="12" title="Classes">
                <CustomTable data={Substitute} columns={columns} />
            </CustomCard>
            <CustomDialog title="Add" visible={visible} onCancel={onClose} loading={loading} onSave={handleSave}>
                <CustomGridLayout>
                    <CustomInput col="12" name="name" data={data} onChange={handleChange} />
                    <CustomDropDown name="priority" data={data} onChange={handleChange} options={substitutionPriorityOptions} col={12} />
                </CustomGridLayout>
            </CustomDialog>
        </div>
    );
}
