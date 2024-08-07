import TopBar from './layout/Topbar';
import React, { Suspense, useState, useEffect } from 'react';
import './styles.scss';
import ProtectedRoute from './routes/ProtectedRoute';
import { Switch } from 'react-router-dom';
import { ProgressSpinner } from 'primereact/progressspinner';

function App() {
    const [showFallback, setShowFallback] = useState(false);

    useEffect(() => {
        const startTime = performance.now();

        // Simulate asynchronous UI rendering
        // Replace this with your actual UI rendering logic
        // In a real application, you might want to use React's useEffect for data fetching and loading
        // This is just a placeholder example
        const simulateRendering = () => {
            // Simulate your UI rendering logic here
            // For example, fetching data, initializing state, etc.

            // Placeholder delay (replace this with actual logic)
            const delay = 3000; // 3 seconds

            // Determine whether to show fallback based on actual UI rendering time
            const endTime = performance.now();
            const renderingTime = endTime - startTime;

            setShowFallback(renderingTime > delay);
        };

        simulateRendering(); // Call your actual UI rendering logic here
    }, []);
    const loading = (
        <div className="pt-3 text-center">
            <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />
        </div>
    );
    return (
        <>
            <TopBar />
            <div className="main-container p-2">
                <Suspense fallback={showFallback && loading}>
                    <Switch>
                        <ProtectedRoute />
                    </Switch>
                </Suspense>
            </div>
        </>
    );
}

export default App;
