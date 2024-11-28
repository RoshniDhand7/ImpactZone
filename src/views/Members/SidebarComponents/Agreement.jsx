import CustomCard, { CustomListItem } from '../../../shared/Cards/CustomCard';
import ProfileDetail from './ProfileDetail';
import TopLayout from './TopLayout';
import viewIcon from '../../../assets/icons/view.png';
import CustomTable from '../../../shared/Table/CustomTable';
import moment from 'moment';

const Agreement = ({ data = {} }) => {
    const columns = [
        { field: 'service', header: 'Service', style: { width: '300px' } },
        { field: 'date', header: 'Date', body: (r) => moment(r?.date).format('DD-MM-YYYY'), style: { width: '150px' } },
        { field: 'primaryPhone', header: 'Receipt#', body: () => '-' },
        { field: 'netPrice', header: 'Price', body: (r) => '$' + r.netPrice },
        { field: 'primaryPhone', header: 'Expiration Date', body: () => '-' },
        { field: 'primaryPhone', header: 'Sessions Purchased', body: () => '-' },
        { field: 'primaryPhone', header: 'Sessions Completed', body: () => '-' },
        { field: 'primaryPhone', header: 'Pending Sessions', body: () => '-' },
        { field: 'primaryPhone', header: 'Remaining Sessions', body: () => '-' },
        { field: 'terminationDate', header: 'Termination Date', body: () => '-' },
    ];

    const customActionTemplate = (r) => {
        return (
            <>
                <span>
                    <img src={viewIcon} alt="eye icon" />
                </span>
                <span className="ps-2"></span>
            </>
        );
    };
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
                    <CustomListItem name="Campaign" data={data} />
                    <CustomListItem name="referredBy" data={data} />
                    <CustomListItem name="referrals" data={data} />
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
                    <CustomListItem name="Campaign" data={data} />
                    <CustomListItem name="referredBy" data={data} />
                    <CustomListItem name="referrals" data={data} />
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
                    <CustomListItem name="Campaign" data={data} />
                    <CustomListItem name="referredBy" data={data} />
                    <CustomListItem name="referrals" data={data} />
                </CustomCard>
            </div>
            <CustomTable data={[]} columns={columns} customActionTemplate={customActionTemplate} />
        </div>
    );
};

export default Agreement;
