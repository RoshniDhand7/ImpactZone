import React, { useEffect } from 'react';
import CustomTabView from '../../../../shared/TabView/CustomTabView';
import FormPage from '../../../../shared/Layout/FormPage';
import General from './General';
import Online from './Online';
import { useDispatch, useSelector } from 'react-redux';
import { getCompanyDetails } from '../../../../redux/actions/BusinessSettings/companyActions';

export default function CompanyForm() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCompanyDetails());
    }, [dispatch]);
    let { allCompany } = useSelector((state) => state?.company);

    const tabs = [
        { title: 'General', content: General(allCompany) },
        { title: 'Online', content: Online(allCompany) },
    ];

    return (
        <FormPage backText="Company">
            <CustomTabView tabs={tabs} />
        </FormPage>
    );
}
