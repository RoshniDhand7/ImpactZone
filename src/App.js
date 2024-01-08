import TopBar from './layout/Topbar';
import './styles.scss';
// import FormLayout from './shared/Form/FormLayout';
// import { CustomInput } from './shared/Input/AllInputs';
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
