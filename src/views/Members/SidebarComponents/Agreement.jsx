import CustomCard, { CustomListItem } from '../../../shared/Cards/CustomCard';
import ProfileDetail from './ProfileDetail';
import TopLayout from './TopLayout';
import viewIcon from '../../../assets/icons/view.png';
import CustomTable from '../../../shared/Table/CustomTable';
import moment from 'moment';
import { useEffect } from 'react';
import { getAgreements } from '../../../redux/actions/MembersPortal/memberPortalActions';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { CustomCheckbox, CustomInput } from '../../../shared/Input/AllInputs';

const Agreement = ({ data = {} }) => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const agreement = useSelector((state) => state.membersPortal.agreement);
    const columns = [
        { field: 'name', header: 'Agreement Name' },
        { field: 'agreementNo', header: 'Agreement #' },
        { field: 'createdDate', header: 'Created Date', body: (r) => moment(r?.date).format('DD-MM-YYYY'), style: { width: '150px' } },
        { field: 'signedDate', header: 'Signed Date', body: () => '-' },
        { field: 'agreementTerm', header: 'Agreement Term', body: () => '-' },
        { field: 'renewalFrequency', header: 'Renewal Frequency', body: () => '-' },
        { field: 'renewalType', header: 'Renewal Type', body: () => '-' },
        { field: 'billedAmount', header: 'Billed Amount', body: () => '-' },
        { field: 'salesperson', header: 'Salesperson', body: () => '-' },
        { field: 'status', header: 'Status', body: (value) => (value ? 'Active' : 'Inactive') },
    ];

    useEffect(() => {
        dispatch(getAgreements(id));
    }, []);

    // const customActionTemplate = (r) => {
    //     return (
    //         <>
    //             <span>
    //                 <img src={viewIcon} alt="eye icon" />
    //             </span>
    //             <span className="ps-2"></span>
    //         </>
    //     );
    // };

    return (
        <div>
            <ProfileDetail />
            <TopLayout />
            <div className="grid">
                <CustomCard
                    title="Misc"
                    col={6}
                    name="Edit"
                    // onClick={() => {
                    //     setVisiblePersonal(id);
                    // }}
                    height="250px"
                >
                    <CustomListItem name="Campaign" data={data} />
                    <CustomListItem name="referredBy" data={data} />
                    <CustomListItem name="referrals" data={data} />
                </CustomCard>
                <CustomCard
                    title="Associations"
                    col={6}
                    name="Edit"
                    // onClick={() => {
                    //     setVisiblePersonal(id);
                    // }}
                    height="250px"
                >
                    <div className="flex justify-content-between">
                        <div className="flex gap-3">
                            <CustomCheckbox col={5} data={data} label="family" name="family" />
                            <CustomCheckbox col={8} data={data} label="Corporate" name="corporate" />
                        </div>
                        <div className="flex align-items-center justify-content-end gap-3">
                            <span>Primary Account</span>
                            <CustomInput name="" />
                        </div>
                    </div>
                </CustomCard>
                <CustomCard
                    title="Renewal"
                    col={6}
                    name="Edit"
                    // onClick={() => {
                    //     setVisiblePersonal(id);
                    // }}
                    height="250px"
                >
                    <CustomListItem name="Frequency" data={data} />
                    <CustomListItem name="Type" data={data} />
                    <CustomListItem name="Term" data={data} />
                </CustomCard>
                <CustomCard
                    title="Relationships"
                    col={6}
                    name="Edit"
                    // onClick={() => {
                    //     setVisiblePersonal(id);
                    // }}
                    height="250px"
                >
                    <CustomListItem label="Pays for" data={data} />
                    <CustomListItem label="Pays by" data={data} />
                    <CustomListItem label="Shares w/" data={data} />
                </CustomCard>
            </div>
            <CustomTable
                data={agreement}
                columns={columns}
                onView={(data) => {
                    console.log('view data', data);
                }}
            />
        </div>
    );
};

export default Agreement;
