import React, { useEffect, useState } from 'react';
import CustomTable from '../../shared/Table/CustomTable';
import useMembers from '../../hooks/Members/useMembers';
import moment from 'moment';
import { CustomFilterCard, CustomGridLayout } from '../../shared/Cards/CustomCard';
import PrimaryButton from '../../shared/Button/CustomButton';
import useFilters from '../../hooks/useFilters';
import FilterComponent from '../../components/FilterComponent';
import { CustomInput, CustomInputMask, CustomInputNumber } from '../../shared/Input/AllInputs';
import { useHistory, useLocation } from 'react-router-dom';
import TableImage from '../../shared/Image/TableImage';

const AllMembers = () => {
    const location = useLocation();
    const isManageRoute = location.pathname.includes('/manage');
    const columns = [
        { field: 'image', body: ({ image }) => <TableImage image={image} />, header: 'Photo', style: { color: '#d0e1fd', width: '12%' } },
        {
            field: 'fullName',
            body: (r) => r?.firstName + ' ' + r?.lastName,
            header: 'Name',
            style: { color: '#85b2f9', textDecoration: 'underline', width: '12%' },
        },
        { field: 'agreement', header: 'Agreement #' },
        { field: 'primaryPhone', header: 'Primary Phone' },
        { field: 'dob', body: (r) => (r?.dob ? moment(r?.dob)?.format('DD/MM/YYYY') : ''), header: 'BirthDate' },
        { field: '', header: 'Membership Type' },
        { field: 'barCode', header: 'Barcode' },
        { field: '', header: 'Status/Reason' },
    ];
    const { allMembers } = useMembers();
    const history = useHistory();
    const { tableData, onFilterOpen, onFilterClose, onApplyFilters, filters, isFilterVisible } = useFilters(allMembers);
    const initialState = {
        firstName: '',
        lastName: '',
        barCode: null,
        agreement: '',
        primaryPhone: '',
    };
    const [data, setData] = useState(initialState);

    const handleChange = ({ name, value }) => {
        setData((prev) => ({ ...prev, [name]: value }));
    };

    useEffect(() => {
        if (!isManageRoute) {
            onFilterOpen();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onCellSelect = (event) => {
        if (event?.field === 'image' || event?.field === 'fullName') {
            history.push(`/member/${event?.rowData?._id}/dashboard`);
            localStorage.setItem('member', event?.rowData?._id);
        }
    };

    return (
        <>
            <h3>Members</h3>
            <CustomFilterCard buttonTitle={isManageRoute ? 'Add Member' : null} linkTo="/members/add" contentPosition="end">
                <div className="text-end w-full">
                    <PrimaryButton label="Filter" icon="pi pi-filter" className="mx-2 " onClick={onFilterOpen} />
                </div>
            </CustomFilterCard>
            <CustomTable data={tableData} columns={columns} cellSelection={true} selectionMode="single" onCellSelect={onCellSelect} />
            <FilterComponent
                value={filters}
                onApply={onApplyFilters}
                visible={isFilterVisible}
                onHide={onFilterClose}
                data={data}
                handleChange={handleChange}
                setData={setData}
            >
                <CustomGridLayout>
                    <CustomInput name="firstName" data={data} onChange={handleChange} col={12} />
                    <CustomInput name="lastName" data={data} onChange={handleChange} col={12} />
                    <CustomInputNumber name="barCode" data={data} onChange={handleChange} col={12} />
                    <CustomInput name="agreement" data={data} onChange={handleChange} col={12} />
                    <CustomInputMask name="primaryPhone" mask="(999) 999-9999" data={data} onChange={handleChange} col={12} />
                </CustomGridLayout>
            </FilterComponent>
        </>
    );
};

export default AllMembers;
