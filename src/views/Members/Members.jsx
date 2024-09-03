import React from 'react';
import Layout from '../../layout/Layout';
import { Route, Switch } from 'react-router-dom';
import Personal from './SidebarComponents/Personal';
import Dashboard from './SidebarComponents/Dashboard';

export default function Members() {
    return (
        <div>
            <Layout>
                <Switch>
                    <Route path={`/member/:id/dashboard`} component={Dashboard} />
                    <Route path={`/member/:id/personal`} component={Personal} />
                </Switch>
            </Layout>
        </div>
    );
}
