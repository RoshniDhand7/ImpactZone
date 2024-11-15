import TopBar from './layout/Topbar';
import React, { Suspense } from 'react';
import './styles.scss';
import ProtectedRoute from './routes/ProtectedRoute';
import { Redirect, Switch } from 'react-router-dom';
import { ProgressBar } from 'primereact/progressbar';
import { isAuthenticated } from './services/auth';
function App() {
    return (
        <>
            {isAuthenticated() ? (
                <>
                    <TopBar />

                    <Suspense fallback={<ProgressBar mode="indeterminate" style={{ height: '3px' }} />}>
                        <div className="main-container p-2">
                            <Switch>
                                <ProtectedRoute />
                            </Switch>
                        </div>
                    </Suspense>
                </>
            ) : (
                <Redirect to="/login" />
            )}
        </>
    );
}

export default App;
