import React, { useEffect } from 'react';
import CustomTabView from '../../../../shared/TabView/CustomTabView';
import FormPage from '../../../../shared/Layout/FormPage';
import General from './General';
import Online from './Online';
import { useDispatch, useSelector } from 'react-redux';
import { getCompanyDetail } from '../../../../redux/actions/Settings/Business/companyActions';

export default function CompanyForm() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCompanyDetail());
    }, [dispatch]);
    let { company } = useSelector((state) => state?.settings.business);

    const tabs = [
        { title: 'General', content: General(company) },
        { title: 'Online', content: Online(company) },
    ];

    return (
        <FormPage backText="Company">
            <CustomTabView tabs={tabs} />
        </FormPage>
    );
}
