import React, { useState, useEffect } from 'react';
import CustomCard from '../../../../../shared/Cards/CustomCard';
import PrimaryButton, { CustomButtonGroup, LightButton } from '../../../../../shared/Button/CustomButton';
import CustomEditor from '../../../../../shared/Input/CustomEditor';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { editEmployee, getEmployee } from '../../../../../redux/actions/EmployeeSettings/employeesAction';

const Notes = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const [data, setData] = useState({
        notes: '',
    });
    useEffect(() => {
        if (id) {
            dispatch(
                getEmployee(id, (data) => {
                    setData({
                        notes: data.notes,
                    });
                }),
            );
        }
    }, [id, dispatch]);

    const [loading, setLoading] = useState(false);
    const handleChange = ({ name, value }) => {
        setData((prev) => ({ ...prev, [name]: value }));
    };
    const handleSave = () => {
        if (id) {
            dispatch(editEmployee(id, data, setLoading, history));
        }
    };

    return (
        <>
            <CustomCard col="12" title="Notes">
                <CustomEditor name="notes" onTextChange={handleChange} data={data} />
            </CustomCard>
            <CustomButtonGroup>
                <PrimaryButton label="Save" className="mx-2" loading={loading} onClick={handleSave} />
                <LightButton label="Cancel" onClick={() => history.replace('/settings/employee')} />
            </CustomButtonGroup>
        </>
    );
};

export default Notes;
