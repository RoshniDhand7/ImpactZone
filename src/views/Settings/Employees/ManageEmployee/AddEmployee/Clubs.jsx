import React, { useEffect, useState } from 'react';
import CustomCard from '../../../../../shared/Cards/CustomCard';
import PrimaryButton, { CustomButtonGroup, LightButton } from '../../../../../shared/Button/CustomButton';
import CustomPickList from '../../../../../shared/Input/CustomPickList';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import useGetClubs from '../../../../../hooks/useGetClubs';
import { editEmployee, getEmployee } from '../../../../../redux/actions/Settings/Employee/employeesAction';

const Clubs = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const history = useHistory();
    const { clubsDropdown } = useGetClubs();

    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (id) {
            dispatch(
                getEmployee(id, (data) => {
                    setData({
                        reportDataAccess: data.reportDataAccess,
                        clubs: data.clubs,
                    });
                }),
            );
        }
    }, [id, dispatch]);
    const [data, setData] = useState({
        reportDataAccess: [],
        clubs: [],
    });

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
            <CustomCard col="12" title="Report Data Access">
                <CustomPickList name="reportDataAccess" selected={data?.reportDataAccess} sourceData={clubsDropdown} onPickListChange={handleChange} />
            </CustomCard>
            <CustomCard col="12" title="Clubs">
                <CustomPickList name="clubs" selected={data?.clubs} sourceData={clubsDropdown} onPickListChange={handleChange} />
            </CustomCard>

            <CustomButtonGroup>
                <PrimaryButton label="Save" className="mx-2" loading={loading} onClick={handleSave} />
                <LightButton label="Cancel" onClick={() => history.replace('/settings/employee')} />
            </CustomButtonGroup>
        </>
    );
};

export default Clubs;
