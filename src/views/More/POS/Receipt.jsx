import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getReceiptAction } from '../../../redux/actions/POS/saleActions';
import CustomCard from '../../../shared/Cards/CustomCard';
import moment from 'moment';

const skeletonStyle = {
    backgroundColor: '#e0e0e0',
    height: '12px',
    marginBottom: '5px',
    borderRadius: '4px',
};

export default function Receipt() {
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
        <CustomCard title="Sale Details" col={12}>
            <div
                style={{
                    width: '600px',
                    margin: '0 auto',
                    padding: '10px',
                    border: '1px dotted black',
                    fontFamily: 'Arial, sans-serif',
                    fontSize: '12px',
                    textAlign: 'center',
                }}
            >
                <h2 style={{ fontSize: '22px', margin: '0' }}>Impact Zone</h2>
                <p style={{ margin: '5px 0' }}>
                    1st Floor, Sonehri Bank,
                    <br />
                    Quaid-e-Azam Road, Gojra.
                    <br />
                    Contact No : 796-434-9402
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
                    <ItemCard loading={loading} label="Waived Tax Amount" value={data.cartDetails?.waivedTaxAmount} prefix="+" />
                    <ItemCard loading={loading} label="Discount" value={data.cartDetails?.discount} prefix="-" />
                    <ItemCard loading={loading} label="Promo Discount" value={data.cartDetails?.promoDiscount} prefix="-" />
                    <ItemCard loading={loading} label="Special Discount" value={data.cartDetails?.specialDiscount} prefix="-" />
                    <ItemCard loading={loading} label="Tax" value={data.cartDetails?.tax} prefix="+" />
                    <ItemCard loading={loading} label="Total Amount" value={data.cartDetails?.total} />
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
        </CustomCard>
    );
}

const ItemCard = ({ label, value, loading, prefix = '' }) => {
    if (loading) return <p style={{ ...skeletonStyle, height: '20px' }}></p>;
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
