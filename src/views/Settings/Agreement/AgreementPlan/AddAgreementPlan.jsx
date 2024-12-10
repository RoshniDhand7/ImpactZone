import React, { useState, useEffect } from 'react';
import CustomCard, { CustomFilterCard1, CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import { useDispatch, useSelector } from 'react-redux';
import { confirmDelete } from '../../../../utils/commonFunctions';
import PrimaryButton from '../../../../shared/Button/CustomButton';
import CustomTable from '../../../../shared/Table/CustomTable';
import CustomDialog from '../../../../shared/Overlays/CustomDialog';
import { getMembershipPlans } from '../../../../redux/actions/Settings/AgreementSetup/agreementPlanAction';

const AddAgreementPlan = ({ data, setData, id, loading }) => {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMembershipPlans());
    }, [dispatch]);
    useEffect(() => {
        if (open) {
            setSelected(data?.agreementPlans);
        }
    }, [data?.agreementPlans, open, id]);

    let { agreementPlans } = useSelector((state) => state.settings.agreement);
    agreementPlans = agreementPlans
        ?.filter((item) => item.membershipType?._id === data.membershipType)
        ?.map((item) => ({ name: item.name, _id: item._id, category: item.category, noofMembers: item.noOfMembers ? item.noOfMembers : null }));

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
                setData((prev) => ({ ...prev, agreementPlans: data?.agreementPlans?.filter((item) => item._id !== col?._id) }));
            },
            `Do you want to delete this Agreement Plan ?`,
            'center',
        );
    };

    const handleSave = () => {
        setData((prev) => ({ ...prev, agreementPlans: selected }));
        setOpen(false);
    };

    return (
        <>
            <CustomCard col="12" title="Agreement Plan">
                <CustomFilterCard1 buttonTitle="Add" onClick={() => setOpen(true)} extraClass="justify-content-end gap-2">
                    <div>
                        <PrimaryButton
                            label={'Remove All'}
                            onClick={() => {
                                setData((prev) => ({ ...prev, agreementPlans: [] }));
                                setSelected([]);
                            }}
                        />
                    </div>
                </CustomFilterCard1>
                <CustomTable data={data?.agreementPlans} columns={columns1} showSelectionElement={false} onDelete={handleServiceDelete} />
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
                        <CustomTable convertToboolean={false} data={agreementPlans} columns={columns} selectedRow={selected} setSelectedRow={setSelected} />
                    )}
                </CustomGridLayout>
            </CustomDialog>
        </>
    );
};

export default AddAgreementPlan;
