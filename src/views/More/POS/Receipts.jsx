import React, { useEffect, useRef, useState } from 'react';
import { CustomFilterCard } from '../../../shared/Cards/CustomCard';
import PrimaryButton from '../../../shared/Button/CustomButton';
import CustomTable from '../../../shared/Table/CustomTable';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getReceiptsAction, receiptsReturnAction, receiptsVoidAction } from '../../../redux/actions/POS/saleActions';
import { formatDateTime } from '../../../utils/dateTime';
import { Tag } from 'primereact/tag';
import CustomDialog from '../../../shared/Overlays/CustomDialog';
import { CustomInput } from '../../../shared/Input/AllInputs';
import { showFormErrors } from '../../../utils/commonFunctions';
import formValidation from '../../../utils/validations';
import CheckoutPopup from '../../PointOfSale/Cart/CheckoutPopup';
import { PrintReceipt } from './Receipt';
import { useReactToPrint } from 'react-to-print';

const Receipts = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [checkoutPopup, setCheckoutPopup] = useState(false);

    const initialState = { registerStatus: '', rowId: '', accessCode: '', paymentType: null, member: {}, amount: 0, memberDetail: {} };

    const [data, setData] = useState(initialState);

    const { receipts } = useSelector((state) => state.pos);
    const [receiptData, setReceiptData] = useState({});
    useEffect(() => {
        dispatch(getReceiptsAction());
    }, [dispatch]);

    const handleStatus = (r) => {
        setData((prev) => ({
            ...prev,
            rowId: r?._id,
            registerStatus: r?.registerStatus === 'OPEN' ? 'VOID' : 'RETURN',
            paymentType: r?.paymentType,
            member: r?.member,
            amount: r?.amount,
            memberDetail: r?.memberDetail,
        }));
        if (r?.registerStatus === 'OPEN') {
            setVisible(true);
        } else {
            setCheckoutPopup(true);
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
                    <PrimaryButton label={r?.registerStatus === 'OPEN' ? 'Void' : 'Return'} onClick={() => handleStatus(r)} />
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
    const handleChange = ({ name, value }) => {
        const formErrors = formValidation(name, value, data);
        setData((prev) => ({ ...prev, [name]: value, formErrors }));
    };
    const onClose = () => {
        setVisible(false);
        setData(initialState);
    };
    const onSubmit = () => {
        if (showFormErrors(data, setData)) {
            if (data?.registerStatus === 'VOID') {
                dispatch(
                    receiptsVoidAction(data?.rowId, data?.accessCode, setLoading, () => {
                        dispatch(getReceiptsAction());
                        onClose();
                    }),
                );
            } else {
                dispatch(
                    receiptsReturnAction(data?.rowId, data?.accessCode, data?.paymentType, setLoading, (e) => {
                        console.log(e, 'e');
                        dispatch(getReceiptsAction());
                        if (data?.printReceiept) {
                            setReceiptData(e);
                        }
                        onClose();
                    }),
                );
            }
        }
    };

    const onCloseCheckout = () => {
        setCheckoutPopup(false);
        setData(initialState);
    };
    useEffect(() => {
        if (receiptData?._id) {
            handlePrint();
        }
        //eslint-disable-next-line
    }, [receiptData]);

    let cartDetails = { netTotal: data?.amount, total: data?.amount, tax: 0, gradTotal: data?.amount };
    const onCheckout = ({ paymentType, printReceiept }) => {
        setVisible(true);
        setCheckoutPopup(false);
        setData((prev) => ({ ...prev, paymentType: paymentType, printReceiept }));
    };
    const printRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => printRef.current,
    });

    console.log(data, receiptData, 'data');

    return (
        <>
            <CustomFilterCard contentPosition="end">
                <PrimaryButton label="Filter" icon="pi pi-filter" className="mx-2 " />
            </CustomFilterCard>
            <CustomTable data={receipts} columns={columns} />
            <CustomDialog title="Access Code" visible={visible} onCancel={onClose} onSave={onSubmit} width={'30vw'} loading={loading}>
                <CustomInput data={data} onChange={handleChange} name="accessCode" required col={12} autocomplete="off" />
            </CustomDialog>
            <CheckoutPopup
                onCheckout={onCheckout}
                cartDetails={cartDetails}
                visible={checkoutPopup}
                onCancel={onCloseCheckout}
                memberDetail={data?.member}
                payType={data?.paymentType}
            />
            <div className="hidden">
                <PrintReceipt ref={printRef} data={receiptData} />
            </div>
        </>
    );
};

export default Receipts;
