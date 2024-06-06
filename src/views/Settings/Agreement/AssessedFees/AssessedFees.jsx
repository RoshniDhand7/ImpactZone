import React, { useEffect, useState } from 'react';
import { CustomFilterCard, CustomSearchCard } from '../../../../shared/Cards/CustomCard';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { confirmDelete } from '../../../../utils/commonFunctions';
import CustomTable from '../../../../shared/Table/CustomTable';
import { deleteAssessedFees, getAssesedFees } from '../../../../redux/actions/AgreementSettings/assessedFees';
import moment from 'moment';
import { CustomDropDown, CustomMultiselect } from '../../../../shared/Input/AllInputs';
import { ActiveFilterDropdown } from '../../../../utils/dropdownConstants';
import { getClubs } from '../../../../redux/actions/BusinessSettings/clubsAction';
import { getProfitCenters } from '../../../../redux/actions/InventorySettings/profitCenterAction';

const AssessedFees = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [data, setData] = useState({
        isActive: 'active',
        clubs: [],
        profitCenter: [],
    });
    useEffect(() => {
        dispatch(getClubs());
        dispatch(getProfitCenters());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getAssesedFees(data));
    }, [data]);

    let { allAssessedFees } = useSelector((state) => state.assessedFees);
    const { profitCenterDropdown } = useSelector((state) => state.profitCenter);
    const { clubsDropdown } = useSelector((state) => state.clubs);

    // const filterAssessedFeesByData = (data1, keys) => {
    //     console.log('kes>>', keys);
    //     return data1?.filter((item) => {
    //         return Object.keys(keys).every((key) => {
    //             if (Array.isArray(keys[key])) {
    //                 return keys[key].length === 0 || keys[key].includes(item[key]);
    //             }

    //             console.log(item[key], keys[key], keys[key], 'keys');
    //             return item[key] === keys[key];
    //         });
    //     });
    // };

    // useEffect(() => {
    //     const result = filterAssessedFeesByData(allAssessedFees, data);
    //     console.log(result, 'result');
    // }, [allAssessedFees, data]);

    const columns = [
        { field: 'name', header: 'Name' },
        { field: 'profitCenter', header: 'Profit Center' },
        { field: 'amount', header: 'Amount' },
        { field: 'createdAt', body: (r) => moment(r.createdAt).format('DD-MM-YYYY'), header: 'Start Date' },
        {
            field: 'clubs',
            body: (r) => r?.clubs?.map((item) => item.name).join(','),
            header: 'Clubs',
        },
        { field: 'isActive', header: 'Active' },
    ];

    const onEdit = (col) => {
        history.push(`/settings/agreement/assessed-fees/edit/${col._id}`);
    };

    const onDelete = (col, position) => {
        confirmDelete(
            () => {
                dispatch(
                    deleteAssessedFees(col._id, () => {
                        dispatch(getAssesedFees());
                    }),
                );
            },
            'Do you want to delete this AssessedFees ?',
            position,
        );
    };

    const handleChange = ({ name, value }) => {
        setData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <>
            <CustomFilterCard buttonTitle="Add Assessed Fees" linkTo="/settings/agreement/assessed-fees/add" />
            <CustomSearchCard>
                <CustomDropDown col={3} label="Status" name="isActive" options={ActiveFilterDropdown} optionLabel="name" data={data} onChange={handleChange} />
                <CustomMultiselect col={3} label="Club" name="clubs" options={clubsDropdown} optionLabel="name" data={data} onChange={handleChange} />
                <CustomMultiselect
                    col={3}
                    label="Profit Center"
                    name="profitCenter"
                    options={profitCenterDropdown}
                    optionLabel="name"
                    data={data}
                    onChange={handleChange}
                />
            </CustomSearchCard>
            <CustomTable data={allAssessedFees} columns={columns} onEdit={onEdit} onDelete={onDelete} />
        </>
    );
};

export default AssessedFees;
