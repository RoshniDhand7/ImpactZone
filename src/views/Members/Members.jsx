import React, { useState, useEffect } from 'react';
import Layout from '../../layout/Layout';
import { Route, Switch, useParams, useRouteMatch } from 'react-router-dom';
import Personal from './SidebarComponents/Personal';
import Dashboard from './SidebarComponents/Dashboard';

export default function Members() {
    const [member, setMember] = useState('');
    const { params, path, url } = useRouteMatch();

    console.log('path>>', path);
    useEffect(() => {
        if (localStorage.getItem('member')) {
            setMember(localStorage.getItem('member'));
        }
    }, []);

    const { id } = useParams();

    return (
        <div>
            <Layout>
                <Switch>
                    <Route path={`${url}/dashboard`} component={Dashboard} />
                    <Route path={`${url}/personal`} component={Personal} />
                </Switch>
            </Layout>
        </div>
    );
}
