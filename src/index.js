import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';
import { Provider } from 'react-redux';
import store from './redux';
import ToastContainer from './shared/ToastContainer';
import Loader from './shared/Loader';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { ConfirmPopup } from 'primereact/confirmpopup';

import Login from './pages/Login';
import AccessDenied from './pages/AccessDenied';
import ForgetPassword from './pages/ForgetPassword';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>
    <Provider store={store}>
        <ToastContainer />
        <ConfirmDialog />
        <ConfirmPopup />
        <Loader />
        <HashRouter>
            <Switch>
                <Route key="/" path="/" exact={true}>
                    <Redirect to="/dashboard" />
                </Route>
                <Route key="/login" path="/login" exact={true} component={Login} />
                <Route key="/forgot-password" path="/forgot-password" exact={true} component={ForgetPassword} />
                <Route key="/403" path="/403" exact={true} component={AccessDenied} />
                <ScrollToTop>
                    <App />
                </ScrollToTop>
            </Switch>
        </HashRouter>
    </Provider>,
    // </React.StrictMode>,
);
reportWebVitals();
