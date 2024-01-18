import TopBar from './layout/Topbar';
import React from 'react';
import './styles.scss';
import ProtectedRoute from './routes/ProtectedRoute';
import { Switch } from 'react-router-dom';

function App() {
    return (
        <>
            <TopBar />
            <div className="main-container p-4">
                <Switch>
                    <ProtectedRoute />
                </Switch>
            </div>
        </>
    );
}

export default App;
