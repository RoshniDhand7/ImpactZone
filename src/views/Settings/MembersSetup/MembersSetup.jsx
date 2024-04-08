import CustomTabView from '../../../shared/TabView/CustomTabView';
import AcessSchedule from './AccessSchedule/AccessSchedule';
import Campaigns from './Campaigns/Campaigns';
import CampaignGroups from './CampaignsGroup/CampaignGroups';
import MembershipTypes from './MembershipTypes/MembershipTypes';
import ResourceType from './ResourceType/ResourceType';
import Resources from './Resources/Resources';

const MembersSetup = () => {
    const tabs = [
        { title: 'Manage Membership Types', content: <MembershipTypes /> },
        { title: 'Campaigns Group', content: <CampaignGroups /> },
        { title: 'Campaigns', content: <Campaigns /> },
        { title: 'Access Schedules', content: <AcessSchedule /> },
        { title: 'Resource Type', content: <ResourceType /> },
        { title: 'Resource', content: <Resources /> },
    ];
    return <CustomTabView tabs={tabs} />;
};
export default MembersSetup;
