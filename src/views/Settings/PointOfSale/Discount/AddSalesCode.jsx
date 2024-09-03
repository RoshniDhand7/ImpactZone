import React, { useState, useEffect } from 'react';
import CustomCard, { CustomFilterCard1, CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import { confirmDelete } from '../../../../utils/commonFunctions';
import CustomDialog from '../../../../shared/Overlays/CustomDialog';
import CustomTable from '../../../../shared/Table/CustomTable';
import PrimaryButton from '../../../../shared/Button/CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployeeSalesCodes } from '../../../../redux/actions/EmployeeSettings/salesCommssionAction';

const AddSalesCode = ({ data, setData, id, loading, name }) => {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getEmployeeSalesCodes());
    }, [dispatch]);
    useEffect(() => {
        if (id) {
            if (open) {
                setSelected(data?.salesCode);
            }
        }
    }, [data?.salesCode, open, id]);

    const { salesCode } = useSelector((state) => state.employees);

    const columns = [
        { selectionMode: 'multiple', headerStyle: '' },
        { field: 'name', header: 'Name' },
        { field: 'employee', header: 'Employee' },
    ];

    const columns1 = [
        { field: 'name', header: ' Name' },
        { field: 'employee', header: 'Employee' },
    ];

    const handleServiceDelete = (col) => {
        confirmDelete(
            () => {
                setData((prev) => ({ ...prev, salesCode: data?.salesCode?.filter((item) => item._id !== col?._id) }));
            },
            `Do you want to delete this Sales Code ?`,
            'center',
        );
    };

    const handleSave = () => {
        setData((prev) => ({ ...prev, salesCode: selected }));
        setOpen(false);
    };

    return (
        <>
            <CustomCard col="12" title={name}>
                <CustomFilterCard1 buttonTitle="Add" onClick={() => setOpen(true)} extraClass="justify-content-end gap-2">
                    <div>
                        <PrimaryButton
                            label={'Remove All'}
                            onClick={() => {
                                setData((prev) => ({ ...prev, salesCode: [] }));
                                setSelected([]);
                            }}
                        />
                    </div>
                </CustomFilterCard1>
                <CustomTable data={data?.salesCode} columns={columns1} showSelectionElement={false} onDelete={handleServiceDelete} />
            </CustomCard>
            <CustomDialog
                title={'Add Services'}
                visible={open}
                onCancel={() => {
                    setOpen('');
                }}
                loading={loading}
                onSave={handleSave}
                width="auto"
            >
                <CustomGridLayout>
                    {open && <CustomTable convertToboolean={false} data={salesCode} columns={columns} selectedRow={selected} setSelectedRow={setSelected} />}
                </CustomGridLayout>
            </CustomDialog>
        </>
    );
};

export default AddSalesCode;
