import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Login from './pages/Login';
import { HashRouter, Route, Switch } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';
import AccessDenied from './pages/AccessDenied';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './redux';
import ToastContainer from './shared/ToastContainer';
import Loader from './shared/Loader';
import { ConfirmDialog } from 'primereact/confirmdialog';
import ForgetPassword from './pages/ForgetPassword';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <ToastContainer />
            <ConfirmDialog />
            <Loader />
            <HashRouter>
                <Switch>
                    <Route key="/" path="/" exact={true} component={Login} />
                    <Route key="/forgot-password" path="/forgot-password" exact={true} component={ForgetPassword} />
                    <Route key="/403" path="/403" exact={true} component={AccessDenied} />
                    <ScrollToTop>
                        <App />
                    </ScrollToTop>
                </Switch>
            </HashRouter>
        </PersistGate>
    </Provider>,
    // </React.StrictMode>,
);
reportWebVitals();
