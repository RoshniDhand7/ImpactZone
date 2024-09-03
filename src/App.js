import TopBar from './layout/Topbar';
import React, { Suspense } from 'react';
import './styles.scss';
import ProtectedRoute from './routes/ProtectedRoute';
import { Switch } from 'react-router-dom';
import { ProgressBar } from 'primereact/progressbar';
function App() {
    return (
        <>
            <TopBar />
            <Suspense fallback={<ProgressBar mode="indeterminate" style={{ height: '2px' }} />}>
                <div className="main-container p-2">
                    <Switch>
                        <ProtectedRoute />
                    </Switch>
                </div>
            </Suspense>
        </>
    );
}

export default App;
