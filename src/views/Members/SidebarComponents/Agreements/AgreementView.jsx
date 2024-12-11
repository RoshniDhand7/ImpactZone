import { useEffect, useState } from 'react';
import CustomCard, { CustomListItem } from '../../../../shared/Cards/CustomCard';
import CustomDialog from '../../../../shared/Overlays/CustomDialog';
import { getAgreementView } from '../../../../redux/actions/MembersPortal/memberPortalActions';
import { useDispatch } from 'react-redux';
import CustomTable from '../../../../shared/Table/CustomTable';
import { dateConversions } from '../../../../utils/commonFunctions';

const AgreementView = ({ openModal, setOpenModal, itemData, setItemData }) => {
    const [data, setData] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        itemData?._id && dispatch(getAgreementView(itemData?._id, setData));
    }, [itemData, dispatch]);

    const columns = [
        { field: 'name', header: 'Service Name' },
        { field: 'unitPrice', header: 'Unit Price' },
        { field: 'numberOfPayments', header: 'Number Of Payments', body: (r) => dateConversions(r?.date) },
        { field: 'autoRenew', header: 'Auto Renew', body: (r) => (r?.autoRenew ? 'Yes' : 'No') },
        { field: 'firstDueDate', header: 'First Due Date' },
    ];

    return (
        <CustomDialog
            visible={openModal}
            onCancel={() => {
                setOpenModal(false);
                setItemData(null);
            }}
            position="top"
            width="75vw"
            contentclassname="pb-2"
            title="Agreement Details"
        >
            <CustomCard title="Details" col={12} height="250px">
                <CustomListItem name="agreementNo" label="Agreement No" data={data} />
                <CustomListItem name="name" label="Name" data={data} />
                <CustomListItem label="Status" data={data} value={data?.isActive ? 'Active' : 'InActive'} />
                <CustomListItem label="Created At" data={data} value={dateConversions(data?.createdAt)} />
            </CustomCard>
            <CustomTable data={data?.services || []} columns={columns} />
        </CustomDialog>
    );
};

export default AgreementView;
