import React from 'react';
import Layout from '../../layout/Layout';
import { Route, Switch } from 'react-router-dom';
import Personal from './SidebarComponents/Personal';
import Dashboard from './SidebarComponents/Dashboard';
import Services from './SidebarComponents/Services';
import Agreement from './SidebarComponents/Agreements/Agreement';
import Documents from './SidebarComponents/Documents/Documents';
import CheckIn from './SidebarComponents/CheckIn';
import Notes from './SidebarComponents/Notes/Notes';
import Task from './SidebarComponents/Task';
import Alerts from './SidebarComponents/Alerts';

export default function Members() {
    return (
        <div>
            <Layout>
                <Switch>
                    <Route path={`/member/:id/dashboard`} component={Dashboard} />
                    <Route path={`/member/:id/personal`} component={Personal} />
                    <Route path={`/member/:id/agreement`} component={Agreement} />
                    <Route path={`/member/:id/services`} component={Services} />
                    <Route path={`/member/:id/documents`} component={Documents} />
                    <Route path={`/member/:id/check-in`} component={CheckIn} />
                    <Route path={`/member/:id/notes`} component={Notes} />
                    <Route path={`/member/:id/tasks`} component={Task} />
                    <Route path={`/member/:id/alerts`} component={Alerts} />
                </Switch>
            </Layout>
        </div>
    );
}
