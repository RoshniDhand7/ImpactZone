import React, { useEffect } from 'react';
import { CustomFilterCard } from '../../../shared/Cards/CustomCard';
import PrimaryButton from '../../../shared/Button/CustomButton';
import CustomTable from '../../../shared/Table/CustomTable';
import { useDispatch, useSelector } from 'react-redux';

import { useHistory } from 'react-router-dom';
import { getReceiptsAction, receiptsReturnAction, receiptsVoidAction } from '../../../redux/actions/POS/saleActions';
import { formatDateTime } from '../../../utils/dateTime';
import { Tag } from 'primereact/tag';

const Receipts = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const { receipts } = useSelector((state) => state.pos);
    useEffect(() => {
        dispatch(getReceiptsAction());
    }, [dispatch]);

    const handleStatus = (id, status) => {
        if (status === 'VOID') {
            dispatch(receiptsVoidAction(id));
        } else {
            dispatch(receiptsReturnAction(id));
        }
    };

    const columns = [
        {
            header: 'Time',
            body: (e) => formatDateTime(e?.createdAt),
        },
        {
            body: (r) => `${r?.employee?.firstName} ${r?.employee?.lastName}`,
            header: 'Sale By',
        },

        { body: (r) => `${r?.member?.firstName} ${r?.member?.lastName}`, header: 'Customer' },
        { body: (r) => `$${r?.amount}`, header: 'Price' },
        { field: 'cashRegister', header: 'Station' },
        {
            field: 'status',
            body: (r) =>
                r?.status === 'SALE' ? (
                    <PrimaryButton
                        label={r?.registerStatus === 'OPEN' ? 'Void' : 'Return'}
                        onClick={() => handleStatus(r?._id, r?.registerStatus === 'OPEN' ? 'VOID' : 'RETURN')}
                    />
                ) : (
                    <Tag severity={r?.status === 'VOID' ? 'warning' : 'Success'} value={r?.status === 'VOID' ? 'Voided' : 'Returned'}></Tag>
                ),
        },
        {
            field: 'employeeName',
            body: (r) => (
                <div
                    className="py-1  border-primary border-round-md mr-2 border-1 cursor-pointer text-center"
                    onClick={() => {
                        history.push(`/more/pos/receipt/${r._id}`);
                    }}
                >
                    <i className="pi pi-file-pdf"></i> &nbsp; Receipt
                </div>
            ),
            style: { width: '200px' },
        },
    ];

    return (
        <>
            <CustomFilterCard contentPosition="end">
                <PrimaryButton label="Filter" icon="pi pi-filter" className="mx-2 " />
            </CustomFilterCard>
            <CustomTable data={receipts} columns={columns} />
        </>
    );
};

export default Receipts;
