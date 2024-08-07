import React from 'react';
import { PrivateRoutes } from './allRoutes';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from '../services/auth';
import Layout from '../layout/Layout';
export default function ProtectedRoute() {
    const getAuthRoutes = (routes, parentPath = '') => {
        return routes.map((prop, i) => {
            let currentPath = parentPath + prop.path;

            return (
                <div key={i}>
                    <Route path={currentPath} key={currentPath + i} component={prop.component} exact={prop?.exact} />

                    {prop?.items && prop?.items?.length ? getAuthRoutes(prop?.items, currentPath) : null}
                </div>
            );
        });
    };
    return isAuthenticated() ? getAuthRoutes(PrivateRoutes) : <Redirect to="/" />;
}
