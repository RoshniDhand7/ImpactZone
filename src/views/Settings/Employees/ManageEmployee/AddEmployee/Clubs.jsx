import React, { useEffect, useState } from 'react';
import CustomCard from '../../../../../shared/Cards/CustomCard';
import PrimaryButton, { CustomButtonGroup, LightButton } from '../../../../../shared/Button/CustomButton';
import CustomPickList from '../../../../../shared/Input/CustomPickList';
import { useSelector, useDispatch } from 'react-redux';
import { getClubsDetails } from '../../../../../redux/actions/BusinessSettings/clubsAction';
import { editEmployee, getEmployee } from '../../../../../redux/actions/EmployeeSettings/employeesAction';
import { useHistory, useParams } from 'react-router-dom';

const Clubs = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const history = useHistory();
    useEffect(() => {
        dispatch(getClubsDetails());
    }, [dispatch]);

    let { allClubs } = useSelector((state) => state.clubs);
    allClubs = allClubs?.map((item) => ({ name: item.name, value: item._id }));
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
                <CustomPickList name="reportDataAccess" selected={data?.reportDataAccess} sourceData={allClubs} onPickListChange={handleChange} />
            </CustomCard>
            <CustomCard col="12" title="Clubs">
                <CustomPickList name="clubs" selected={data?.clubs} sourceData={allClubs} onPickListChange={handleChange} />
            </CustomCard>

            <CustomButtonGroup>
                <PrimaryButton label="Save" className="mx-2" loading={loading} onClick={handleSave} />
                <LightButton label="Cancel" onClick={() => history.replace('/settings/employee')} />
            </CustomButtonGroup>
        </>
    );
};

export default Clubs;
