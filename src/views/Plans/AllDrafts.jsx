import React, { useEffect } from 'react';
import CustomCard from '../../shared/Cards/CustomCard';
import PrimaryButton from '../../shared/Button/CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDrafts } from '../../redux/actions/Plans/SellPlan';
import FormPage from '../../shared/Layout/FormPage';

const AllDrafts = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllDrafts());
    }, [dispatch]);

    const drafts = useSelector((state) => state.plans.allDrafts);

    return (
        <>
            <FormPage backText="Plans" backTo="/plans">
                <CustomCard title="Drafts" col={12}>
                    {drafts?.map((item) => (
                        <div className="flex justify-content-between">
                            <div className="grid">
                                <div className="col-6">
                                    <small className="font-semibold text-dark-blue">Plan Name:</small>
                                </div>
                                <div className="col-6">
                                    <small className="font-normal text-gray-color">Kj</small>
                                </div>
                                <div className="col-6">
                                    <small className="font-semibold text-dark-blue">Member Name:</small>
                                </div>
                                <div className="col-6">
                                    <small className="font-normal text-gray-color">James William</small>
                                </div>
                            </div>
                            <PrimaryButton>Continue</PrimaryButton>
                        </div>
                    ))}
                </CustomCard>
            </FormPage>
        </>
    );
};

export default AllDrafts;
