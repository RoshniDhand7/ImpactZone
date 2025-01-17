import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TableImage from '../../shared/Image/TableImage';
import { dateConversions } from '../../utils/commonFunctions';
import { CustomFilterCard, CustomGridLayout } from '../../shared/Cards/CustomCard';
import FilterComponent from '../../components/FilterComponent';
import useFilters from '../../hooks/useFilters';
import CustomTable from '../../shared/Table/CustomTable';
import CustomDialog from '../../shared/Overlays/CustomDialog';
import PrimaryButton from '../../shared/Button/CustomButton';
import { CustomInput, CustomInputMask, CustomInputNumber } from '../../shared/Input/AllInputs';
import { useDispatch, useSelector } from 'react-redux';
import { editCalendarEventMember, getCalendarBooking } from '../../redux/actions/Calendar/CalendarAction';
import { getMembers } from '../../redux/actions/MembersPortal/memberPortalActions';

const AddMember = ({ openMemberList, setOpenMemberList, member }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getMembers());
    }, [dispatch]);
    const { members } = useSelector((state) => state.membersPortal);
    const [filteredMembers, setFilteredMembers] = useState([]);

    useEffect(() => {
        if (members) {
            const idsToMatch = member?.map((item) => item?._id) || [];
            const filteredMembers = members?.filter((item) => !idsToMatch.includes(item._id)) || [];
            setFilteredMembers(filteredMembers);
        }
        //eslint-disable-next-line
    }, [member]);

    const { id } = useParams();
    const handleSave = () => {
        dispatch(
            editCalendarEventMember(id, setLoading, { member: selected?.map((item) => item._id) }, () => {
                setOpenMemberList(false);
                setSelected([]);
                dispatch(getCalendarBooking(id));
            }),
        );
    };

    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = useState([]);
    const columns = [
        { selectionMode: 'multiple', headerStyle: '' },
        { field: 'image', body: ({ image }) => <TableImage image={image} />, header: 'Photo', style: { color: '#d0e1fd', width: '12%' } },
        {
            field: 'fullName',
            body: (r) => r?.firstName + ' ' + r?.lastName,
            header: 'Name',
            style: { width: '12%' },
        },
        { field: 'agreement', header: 'Agreement #' },
        { field: 'primaryPhone', header: 'Primary Phone' },
        { field: 'dob', body: (r) => dateConversions(r?.dob), header: 'BirthDate' },
        { field: '', header: 'Membership Type' },
        { field: 'barCode', header: 'Barcode' },
        { field: '', header: 'Status/Reason' },
    ];

    const handleChange = ({ name, value }) => {
        setData((prev) => ({ ...prev, [name]: value }));
    };
    const { tableData, onFilterOpen, onFilterClose, onApplyFilters, filters, isFilterVisible } = useFilters(filteredMembers);
    const initialState = {
        firstName: '',
        lastName: '',
        barCode: null,
        agreement: '',
        primaryPhone: '',
    };
    const [data, setData] = useState(initialState);

    return (
        <>
            <CustomDialog
                title={'Add Members'}
                visible={openMemberList}
                onCancel={() => {
                    setOpenMemberList(false);
                }}
                loading={loading}
                onSave={handleSave}
                width="auto"
            >
                <CustomGridLayout>
                    <CustomFilterCard contentPosition="between">
                        <PrimaryButton label="Filter" icon="pi pi-filter" className="mx-2 " onClick={onFilterOpen} />
                    </CustomFilterCard>
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
                    <CustomTable data={tableData} columns={columns} selectedRow={selected} setSelectedRow={setSelected} />
                </CustomGridLayout>
            </CustomDialog>
        </>
    );
};

export default AddMember;
