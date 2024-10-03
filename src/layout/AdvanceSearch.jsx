import React, { useEffect, useState } from 'react';
import { CustomInput, CustomInputMask, CustomInputNumber } from '../shared/Input/AllInputs';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { CustomGridLayout } from '../shared/Cards/CustomCard';
import PrimaryButton from '../shared/Button/CustomButton';
import CustomDialog from '../shared/Overlays/CustomDialog';
import { getMembers } from '../redux/actions/Dashboard/Members';
import { useDispatch, useSelector } from 'react-redux';
import { getSearchedData } from '../utils/commonFunctions';
import moment from 'moment';
import TableImage from '../shared/Image/TableImage';

const AdvanceSearch = ({ openAdvanceSearch, setOpenAdvanceSearch }) => {
    const initialState = {
        firstName: '',
        lastName: '',
        barCode: '',
        agreement: '',
        primaryPhone: '',
    };
    const [data, setData] = useState(initialState);
    const handleChange = ({ name, value }) => {
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getMembers());
    }, [dispatch]);

    let { allMembers } = useSelector((state) => state.members);
    const [filteredMembers, setFilteredMembers] = useState(allMembers);

    useEffect(() => {
        setFilteredMembers(allMembers);
    }, [allMembers]);

    const clearFilter = () => {
        setFilteredMembers(allMembers);
        setData(initialState);
    };

    return (
        <div>
            <CustomDialog
                visible={openAdvanceSearch}
                onCancel={() => {
                    setOpenAdvanceSearch(false);
                }}
                position="top"
                width="75vw"
                contentclassname="pb-2"
                title="Find Member"
            >
                <CustomGridLayout extraClass="align-items-end mb-4">
                    <CustomInput name="firstName" data={data} onChange={handleChange} col={2} />
                    <CustomInput name="lastName" data={data} onChange={handleChange} col={2} />
                    <CustomInputNumber name="barCode" data={data} onChange={handleChange} col={2} />
                    <CustomInput name="agreement" data={data} onChange={handleChange} col={2} />
                    <CustomInputMask name="primaryPhone" mask="(999) 999-9999" data={data} onChange={handleChange} col={2} />
                    <div className="lg:col-2 flex">
                        <PrimaryButton
                            label="Search"
                            className=" my-0"
                            onClick={() => {
                                const filteredMembers = getSearchedData(allMembers, data);
                                setFilteredMembers(filteredMembers);
                            }}
                        />
                        <PrimaryButton type="button" icon="pi pi-filter-slash" label="Clear" outlined onClick={clearFilter} className="mx-2" />
                    </div>
                </CustomGridLayout>

                <DataTable value={filteredMembers} paginator className="p-datatable-gridlines" showGridlines rows={10} emptyMessage="No member found.">
                    <Column body={({ image }) => <TableImage image={image} />} header="Photo"></Column>
                    <Column field="fullName" body={(r) => r?.firstName + ' ' + r?.lastName} header="Full Name" style={{ minWidth: '12rem' }}></Column>
                    <Column field="" header="Agreement #" style={{ minWidth: '12rem' }}></Column>
                    <Column field="primaryPhone" header="Primary Phone" style={{ minWidth: '12rem' }}></Column>
                    <Column
                        field="dob"
                        body={(r) => (r?.dob ? moment(r?.dob)?.format('DD/MM/YYYY') : '')}
                        header="BirthDate"
                        style={{ minWidth: '12rem' }}
                    ></Column>
                    <Column field="" header="Membership Type" style={{ minWidth: '12rem' }}></Column>
                    <Column field="barCode" header="Barcode" style={{ minWidth: '12rem' }}></Column>
                    <Column field="" header="Status/Reason" style={{ minWidth: '12rem' }}></Column>
                </DataTable>
            </CustomDialog>
        </div>
    );
};

export default AdvanceSearch;
