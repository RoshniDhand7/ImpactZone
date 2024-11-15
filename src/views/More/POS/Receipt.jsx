import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getReceiptAction } from '../../../redux/actions/POS/saleActions';
import CustomCard from '../../../shared/Cards/CustomCard';

export default function Receipt() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({});
    useEffect(() => {
        dispatch(
            getReceiptAction(id, setLoading, (e) => {
                setData(e);
            }),
        );
    }, [dispatch, id]);

    console.log(data);

    return (
        <CustomCard title="Sale Details" col={12}>
            <div></div>
        </CustomCard>
    );
}
