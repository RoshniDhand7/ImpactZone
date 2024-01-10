import { combineReducers } from 'redux';
import loaderReducer from './loaderReducer';
import toastReducer from './toastReducer';
import profileReducer from './profileReducer';
import companyReducer from './BusinessSettings/companyReducer';
import reasonCodeReducer from './BusinessSettings/reasonReducer';
import jobTitleReducer from './BusinessSettings/jobReducer';
import clubsReducer from './BusinessSettings/clubsReducer';

export default combineReducers({
    loader: loaderReducer,
    toast: toastReducer,
    profile: profileReducer,
    company: companyReducer,
    reasonCode: reasonCodeReducer,
    jobTitle: jobTitleReducer,
    clubs: clubsReducer,
});
