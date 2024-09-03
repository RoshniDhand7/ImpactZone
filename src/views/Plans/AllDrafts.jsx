import React, { useEffect } from 'react';
import PrimaryButton from '../../shared/Button/CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDrafts } from '../../redux/actions/Plans/SellPlan';
import FormPage from '../../shared/Layout/FormPage';
import { useHistory } from 'react-router-dom';
import CustomTable from '../../shared/Table/CustomTable';

const AllDrafts = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllDrafts());
    }, [dispatch]);

    const history = useHistory();

    const drafts = useSelector((state) => state.plans.allDrafts);
    const columns = [
        { field: 'name', header: 'Plan Name' },
        {
            field: 'category',
            body: (item) => `${item?.memberToSell?.firstName}  ${item?.memberToSell?.MI}${item?.memberToSell?.lastName}`,
            header: 'Member Name',
        },
    ];

    const customActionTemplate = (item) => {
        return (
            <>
                <PrimaryButton
                    onClick={() => {
                        history.replace(`/plans/sell-plan/${item?.membershipPlan}/${item?._id}/${item?.memberToSell?._id}/?tab=${item.tabName}`);
                    }}
                >
                    Continue
                </PrimaryButton>
            </>
        );
    };

    return (
        <>
            <FormPage backText="Plans" backTo="/plans">
                <CustomTable data={drafts} columns={columns} customActionTemplate={customActionTemplate} />
            </FormPage>
        </>
    );
};

export default AllDrafts;
