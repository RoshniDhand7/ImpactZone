import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Login from './pages/Login';
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';
import AccessDenied from './pages/AccessDenied';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './redux';
import ToastContainer from './shared/ToastContainer';
import Loader from './shared/Loader';
import { ConfirmDialog } from 'primereact/confirmdialog';
import ForgetPassword from './pages/ForgetPassword';
import { ConfirmPopup } from 'primereact/confirmpopup';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>
    <Provider store={store}>
        <PersistGate persistor={persistor}>
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
                    <Route key="*" path="*" exact={true} component={AccessDenied} />
                </Switch>
            </HashRouter>
        </PersistGate>
    </Provider>,
    // </React.StrictMode>,
);
reportWebVitals();
