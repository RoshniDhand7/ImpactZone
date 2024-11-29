import React from 'react';
import Layout from '../../layout/Layout';
import { Route, Switch } from 'react-router-dom';
import Personal from './SidebarComponents/Personal';
import Dashboard from './SidebarComponents/Dashboard';
import Services from './SidebarComponents/Services';
import Agreement from './SidebarComponents/Agreement';
import CheckIn from './SidebarComponents/CheckIn';

export default function Members() {
    return (
        <div>
            <Layout>
                <Switch>
                    <Route path={`/member/:id/dashboard`} component={Dashboard} />
                    <Route path={`/member/:id/personal`} component={Personal} />
                    <Route path={`/member/:id/agreement`} component={Agreement} />
                    <Route path={`/member/:id/services`} component={Services} />
                    <Route path={`/member/:id/check-in`} component={CheckIn} />
                </Switch>
            </Layout>
        </div>
    );
}
