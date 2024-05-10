import React, { useState, useEffect } from 'react';
import CustomCard, { CustomFilterCard1, CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import { useDispatch, useSelector } from 'react-redux';
import { confirmDelete } from '../../../../utils/commonFunctions';
import PrimaryButton from '../../../../shared/Button/CustomButton';
import CustomTable from '../../../../shared/Table/CustomTable';
import CustomDialog from '../../../../shared/Overlays/CustomDialog';
import { getMembershipPlans } from '../../../../redux/actions/AgreementSettings/membershipPlan';

const AddAgreementPlan = ({ data, setData, id, loading }) => {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMembershipPlans());
    }, [dispatch]);
    useEffect(() => {
        if (id) {
            if (open) {
                setSelected(data?.membershipPlan);
            }
        }
    }, [data?.membershipPlan, open, id]);

    const { allMembershipPlanFilter } = useSelector((state) => state.membershipPlan);
    const state = useSelector((state) => console.log(state));

    console.log(allMembershipPlanFilter);

    const columns = [
        { selectionMode: 'multiple', headerStyle: '' },
        { field: 'name', header: ' Name' },
        { field: 'category', header: 'Category' },
        { field: 'noOfMembers', header: 'No of Members' },
    ];

    const columns1 = [
        { field: 'name', header: 'Item Name' },
        { field: 'category', header: 'Category' },
        { field: 'noOfMembers', header: 'No. of Members' },
    ];

    const handleServiceDelete = (col) => {
        confirmDelete(
            () => {
                setData((prev) => ({ ...prev, membershipPlan: data?.membershipPlan?.filter((item) => item._id !== col?._id) }));
            },
            `Do you want to delete this Agreement Plan ?`,
            'center',
        );
    };

    const handleSave = () => {
        setData((prev) => ({ ...prev, membershipPlan: selected }));
        setOpen(false);
    };

    console.log(data);
    return (
        <>
            <CustomCard col="12" title="Agreement Plan">
                <CustomFilterCard1 buttonTitle="Add" onClick={() => setOpen(true)} extraClass="justify-content-end gap-2">
                    <div>
                        <PrimaryButton
                            label={'Remove All'}
                            onClick={() => {
                                setData((prev) => ({ ...prev, membershipPlan: [] }));
                                setSelected([]);
                            }}
                        />
                    </div>
                </CustomFilterCard1>
                <CustomTable data={data?.membershipPlan} columns={columns1} showSelectionElement={false} onDelete={handleServiceDelete} />
            </CustomCard>
            <CustomDialog
                title={'Add Agreement Plan'}
                visible={open}
                onCancel={() => {
                    setOpen('');
                }}
                loading={loading}
                onSave={handleSave}
                width="auto"
            >
                <CustomGridLayout>
                    {open && (
                        <CustomTable
                            convertToboolean={false}
                            data={allMembershipPlanFilter}
                            columns={columns}
                            selectedRow={selected}
                            setSelectedRow={setSelected}
                        />
                    )}
                </CustomGridLayout>
            </CustomDialog>
        </>
    );
};

export default AddAgreementPlan;
