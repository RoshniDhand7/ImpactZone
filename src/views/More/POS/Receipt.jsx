import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getReceiptAction } from '../../../redux/actions/POS/saleActions';
import CustomCard from '../../../shared/Cards/CustomCard';
import moment from 'moment';
import { useReactToPrint } from 'react-to-print';

const skeletonStyle = {
    backgroundColor: '#e0e0e0',
    height: '12px',
    marginBottom: '5px',
    borderRadius: '4px',
};

export default function Receipt() {
    const printRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => printRef.current,
    });

    return (
        <CustomCard title="Sale Details" col={12}>
            <div className="flex justify-content-end">
                <button onClick={handlePrint}>Print</button>
            </div>
            <PrintableContent ref={printRef} />
        </CustomCard>
    );
}

const PrintableContent = React.forwardRef((props, ref) => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});

    useEffect(() => {
        dispatch(
            getReceiptAction(id, setLoading, (e) => {
                setData(e);
            }),
        );
    }, [dispatch, id]);

    return (
        <div
            id="pos-receipt-235tsdgds"
            ref={ref}
            style={{
                width: '600px',
                margin: '20px auto',
                padding: '10px',
                border: '1px dotted black',
                fontFamily: 'Arial, sans-serif',
                fontSize: '12px',
                textAlign: 'center',
            }}
        >
            <h2 style={{ fontSize: '22px', margin: '0' }}>Impact Zone</h2>
            <p style={{ margin: '5px 0' }}>
                Fitness & Sports Performance
                <br />
                335 Chestnut Street
                <br />
                Norwood, NJ 07648
                <br />
                201-775-1025
            </p>

            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: '10px',
                    borderBottom: '1px dotted black',
                    paddingBottom: '5px',
                }}
            >
                <ItemCard2 label={'Invoice No'} value={data?._id} />
                <ItemCard2 label={'Invoice Name'} value={data?.member?.firstName + ' ' + data?.member?.lastName} />
            </div>

            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: '5px',
                }}
            >
                <ItemCard2 label={'Cashier'} value={data.employee?.firstName + ' ' + data.employee?.lastName} />
                <ItemCard2 label={'Date'} value={moment(data.createdAt).format('MM/DD/YYYY')} />
            </div>
            {/* Cart Item Table */}
            <table
                style={{
                    width: '100%',
                    marginTop: '10px',
                    borderCollapse: 'collapse',
                    textAlign: 'left',
                }}
            >
                <thead>
                    <tr
                        style={{
                            borderBottom: '1px solid black',
                            fontSize: '18px',
                        }}
                    >
                        <th style={{ width: '40%' }}>Item</th>
                        <th style={{ width: '20%' }}>Quantity</th>
                        <th style={{ width: '20%' }}>Discount</th>
                        <th style={{ width: '20%', textAlign: 'end' }}>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.cartItems?.map((item) => (
                        <tr>
                            <td>
                                {item.name} ({item.itemCaption})
                            </td>
                            <td>{item.quantity}</td>
                            <td>{(item.netPrice - item.finalNetPrice)?.toFixed(2)}</td>
                            <td style={{ textAlign: 'end' }}>{(item.netPrice * item.quantity)?.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <table
                style={{
                    width: '100%',
                    marginTop: '10px',
                    borderCollapse: 'collapse',
                    textAlign: 'left',
                }}
            >
                <thead>
                    <tr
                        style={{
                            borderBottom: '1px solid black',
                            fontSize: '18px',
                        }}
                    >
                        <th style={{ width: '25%' }}>Name</th>
                        <th style={{ width: '45%' }}>Description</th>
                        <th style={{ width: '20%', textAlign: 'end' }}>Amount</th>
                    </tr>
                </thead>
            </table>

            <div
                style={{
                    textAlign: 'left',
                    marginTop: '10px',
                    lineHeight: '1.6',
                }}
            >
                <ItemCard loading={loading} label="Net Total" value={data.cartDetails?.netTotal} />

                <ItemCard loading={loading} label="Discount" value={data.cartDetails?.discount} prefix="-" />
                <ItemCard loading={loading} label="Promo Discount" value={data.cartDetails?.promoDiscount} prefix="-" />
                <ItemCard loading={loading} label="Special Discount" value={data.cartDetails?.specialDiscount} prefix="-" />
                <ItemCard loading={loading} label="Total Amount" value={data.cartDetails?.total} />
                <ItemCard loading={loading} label="Tax" value={data.cartDetails?.tax} prefix="+" />
                <ItemCard loading={loading} label="Waived Tax Amount" value={data.cartDetails?.waivedTaxAmount} prefix="-" />
                <ItemCard loading={loading} label="Grand Total" value={data.cartDetails?.gradTotal} />
            </div>

            <div
                style={{
                    marginTop: '10px',
                    borderTop: '1px dotted black',
                    paddingTop: '5px',
                    fontWeight: 'bold',
                }}
            >
                THIS IS YOUR OFFICIAL RECEIPT
            </div>

            <div
                style={{
                    marginTop: '5px',
                    color: 'blue',
                    fontWeight: 'bold',
                }}
            >
                Thank You Come Again!
            </div>
        </div>
    );
});

const ItemCard = ({ label, value, loading, prefix = '' }) => {
    if (loading) return <p style={{ ...skeletonStyle, height: '20px' }}></p>;
    if (!value) return null;
    return (
        <p>
            {label} :{' '}
            <span style={{ float: 'right' }}>
                {value && prefix}
                {value?.toFixed(2)}
            </span>
        </p>
    );
};

const ItemCard2 = ({ label, value }) => {
    return (
        <div>
            <span style={{ fontWeight: 'bold' }}>{label}: </span>
            <span>{value}</span>
        </div>
    );
};
