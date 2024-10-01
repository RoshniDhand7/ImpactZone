import { lazy } from 'react';

import AcessGeneral from '../../views/Settings/MembersSetup/AccessSchedule/AcessGeneral';
const CampaignGroupForm = lazy(() => import('../../views/Settings/MembersSetup/CampaignsGroup/CampaignGroupsForm'));
const CompaignsForm = lazy(() => import('../../views/Settings/MembersSetup/Campaigns/CompaignsForm'));
const ResourceTypeForm = lazy(() => import('../../views/Settings/MembersSetup/ResourceType/ResourceTypeForm'));
const ResourcesForm = lazy(() => import('../../views/Settings/MembersSetup/Resources/ResourcesForm'));
const MembershipTypeForm = lazy(() => import('../../views/Settings/MembersSetup/MembershipTypes/MembershipTypeForm'));
const MemberSettingsRoutes = [
    {
        path: '/membership-types/add',
        name: 'Members',
        exact: true,
        component: MembershipTypeForm,
    },
    {
        path: '/membership-types/edit/:id',
        name: 'Members',
        exact: true,
        component: MembershipTypeForm,
    },
    {
        path: '/campaign-group/add',
        name: 'Members',
        exact: true,
        component: CampaignGroupForm,
    },
    {
        path: '/campaign-group/edit/:id',
        name: 'Members',
        exact: true,
        component: CampaignGroupForm,
    },
    {
        path: '/campaigns/add',
        name: 'Members',
        exact: true,
        component: CompaignsForm,
    },
    {
        path: '/campaigns/edit/:id',
        name: 'Members',
        exact: true,
        component: CompaignsForm,
    },
    {
        path: '/resource-type/add',
        name: 'Members',
        exact: true,
        component: ResourceTypeForm,
    },
    {
        path: '/resource-type/edit/:id',
        name: 'Members',
        exact: true,
        component: ResourceTypeForm,
    },
    {
        path: '/resources/add',
        name: 'Members',
        exact: true,
        component: ResourcesForm,
    },
    {
        path: '/resources/edit/:id',
        name: 'Members',
        exact: true,
        component: ResourcesForm,
    },
    {
        path: '/access-schedule/add',
        name: 'Access Schedule',
        exact: true,
        component: AcessGeneral,
    },
    {
        path: '/access-schedule/edit/:id',
        name: 'Access Schedule',
        exact: true,
        component: AcessGeneral,
    },
];
export default MemberSettingsRoutes;
