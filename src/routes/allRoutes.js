import Dashboard from '../views/Dashboard/Dashboard';
import CheckIn from '../views/CheckIn/CheckIn';
import Members from '../views/Members/Members';
import Calender from '../views/Calendar/Calendar';
import PointOfSale from '../views/PointOfSale/PointOfSale';
import Plans from '../views/Plans/Plans';
import More from '../views/More/More';

import Business from '../views/Settings/Business/Business';
import Settings from '../views/Settings/Settings';
import CompanyForm from '../views/Settings/Business/Company/CompanyForm';
import ReasonCodeForm from '../views/Settings/Business/ReasonCode/ReasonCodeForm';

export const PrivateRoutes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
  },
  {
    path: '/check-in',
    name: 'Check In',
    component: CheckIn,
  },
  {
    path: '/members',
    name: 'Members',
    component: Members,
  },
  {
    path: '/calender',
    name: 'Calender',
    component: Calender,
  },
  {
    path: '/pos',
    name: 'Point Of Sale',
    component: PointOfSale,
  },
  {
    path: '/plans',
    name: 'Plans',
    component: Plans,
  },
  {
    path: '/more',
    name: 'More',
    component: More,
  },
  {
    path: '/settings',
    name: 'Settings',
    exact: true,
    component: Settings,
    items: [
      {
        path: '/business',
        name: 'Business',
        exact: true,
        component: Business,
        items: [
          {
            path: '/company/edit',
            name: 'Business',
            exact: true,
            component: CompanyForm,
          },
          {
            path: '/reason-code/add',
            name: 'Business',
            exact: true,
            component: ReasonCodeForm,
          },
        ],
      },
    ],
  },
];
