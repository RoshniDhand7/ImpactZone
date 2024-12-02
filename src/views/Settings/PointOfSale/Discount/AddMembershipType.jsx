import React, { useState, useEffect } from 'react';
import CustomCard, { CustomFilterCard1, CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import { useDispatch, useSelector } from 'react-redux';
import { confirmDelete } from '../../../../utils/commonFunctions';
import PrimaryButton from '../../../../shared/Button/CustomButton';
import CustomTable from '../../../../shared/Table/CustomTable';
import CustomDialog from '../../../../shared/Overlays/CustomDialog';
import { getMembersipTypes } from '../../../../redux/actions/Settings/MembershipSetup/membershipTypeAction';

const AddMembershipType = ({ data, setData, id, loading, name }) => {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMembersipTypes());
    }, [dispatch]);
    useEffect(() => {
        if (id) {
            if (open) {
                setSelected(data?.membershipType);
            }
        }
    }, [data?.membershipType, open, id]);
    const { membershipTypes } = useSelector((state) => state.settings.members);

    const columns = [
        { selectionMode: 'multiple', headerStyle: '' },
        { field: 'name', header: ' Name' },
        { field: 'description', header: 'Description' },
        { field: 'noOfMembers', header: 'No of Members' },
    ];

    const columns1 = [
        { field: 'name', header: 'Name' },
        { field: 'description', header: 'Description' },
        { field: 'noOfMembers', header: 'No. of Members' },
    ];

    const handleServiceDelete = (col) => {
        confirmDelete(
            () => {
                setData((prev) => ({ ...prev, membershipType: data?.membershipType?.filter((item) => item._id !== col?._id) }));
            },
            `Do you want to delete this MemberShip Type ?`,
            'center',
        );
    };

    const handleSave = () => {
        setData((prev) => ({ ...prev, membershipType: selected }));
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
                                setData((prev) => ({ ...prev, membershipType: [] }));
                                setSelected([]);
                            }}
                        />
                    </div>
                </CustomFilterCard1>
                <CustomTable data={data?.membershipType} columns={columns1} showSelectionElement={false} onDelete={handleServiceDelete} />
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
                        <CustomTable convertToboolean={false} data={membershipTypes} columns={columns} selectedRow={selected} setSelectedRow={setSelected} />
                    )}
                </CustomGridLayout>
            </CustomDialog>
        </>
    );
};

export default AddMembershipType;
