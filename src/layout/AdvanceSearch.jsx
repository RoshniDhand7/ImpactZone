import React, { useEffect, useState } from 'react';
import { CustomInput, CustomInputMask } from '../shared/Input/AllInputs';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { CustomGridLayout } from '../shared/Cards/CustomCard';
import PrimaryButton from '../shared/Button/CustomButton';
import CustomDialog from '../shared/Overlays/CustomDialog';
import { getMembers } from '../redux/actions/Dashboard/Members';
import { useDispatch, useSelector } from 'react-redux';

const AdvanceSearch = ({ openAdvanceSearch, setOpenAdvanceSearch }) => {
    const [data, setData] = useState({
        name: '',
    });
    const handleChange = ({ name, value }) => {
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getMembers());
    }, [dispatch]);

    let { allMembers } = useSelector((state) => state.members);
    return (
        <div>
            <CustomDialog
                visible={openAdvanceSearch}
                onCancel={() => {
                    setOpenAdvanceSearch(false);
                }}
                position="top"
                width="70vw"
                contentclassname="pb-2"
            >
                <h3 className="text-bold mb-2">Find Member</h3>
                <CustomGridLayout extraClass="align-items-end mb-4">
                    <CustomInput name="firstName" data={data} onChange={handleChange} col={2} />
                    <CustomInput name="lastName" data={data} onChange={handleChange} col={2} />
                    <CustomInput name="barCode" data={data} onChange={handleChange} col={2} />
                    <CustomInput name="agreement" data={data} onChange={handleChange} col={2} />
                    <CustomInputMask name="primaryPhone" mask="(999) 999-9999" data={data} onChange={handleChange} col={2} />
                    <PrimaryButton label="Search" className="mx-4 " />
                </CustomGridLayout>

                <DataTable value={allMembers} paginator className="p-datatable-gridlines" showGridlines rows={10} emptyMessage="No member found.">
                    <Column field="fullName" body={(r) => r?.firstName + ' ' + r?.lastName} header="Full Name" style={{ minWidth: '12rem' }}></Column>
                    <Column field="" header="Agreement #" style={{ minWidth: '12rem' }}></Column>
                    <Column field="primaryPhone" header="Primary Phone" style={{ minWidth: '12rem' }}></Column>
                    <Column field="dob" header="BirthDate" style={{ minWidth: '12rem' }}></Column>
                    <Column field="" header="Membership Type" style={{ minWidth: '12rem' }}></Column>
                    <Column field="barCode" header="Barcode" style={{ minWidth: '12rem' }}></Column>
                    <Column field="" header="Status/Reason" style={{ minWidth: '12rem' }}></Column>
                </DataTable>
            </CustomDialog>
        </div>
    );
};

export default AdvanceSearch;
