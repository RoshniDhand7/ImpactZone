import React, { useEffect, useState } from 'react';
import { CustomFilterCard } from '../../../shared/Cards/CustomCard';
import PrimaryButton from '../../../shared/Button/CustomButton';
import CustomTable from '../../../shared/Table/CustomTable';
import { useDispatch } from 'react-redux';
import { getSavedCartsAction } from '../../../redux/actions/POS/savedCartActions';
import { useHistory } from 'react-router-dom';

const SavedCarts = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [data, setData] = useState([]);

    useEffect(() => {
        dispatch(
            getSavedCartsAction((e) => {
                setData(e);
            }),
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    const columns = [
        {
            field: 'name',
            header: 'Cart Name',
        },
        {
            field: 'noOfItems',
            header: 'No. Of Items',
        },
        { field: 'employee', header: 'Created By' },
        { field: 'member', header: 'Customer' },
        { field: 'amount', header: 'Price' },
        {
            field: 'employeeName',
            body: (r) => (
                <div
                    className="py-1  border-primary border-round-md mr-2 border-1 cursor-pointer text-center"
                    onClick={() => {
                        history.push({
                            pathname: '/pos',
                            state: { savedCartId: r?._id },
                        });
                    }}
                >
                    <i className="pi pi-shopping-cart"></i> &nbsp; Go To Cart
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
            <CustomTable data={data} columns={columns} />
        </>
    );
};

export default SavedCarts;
