import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

// Define initial state and persistence configuration
const initialState = {};
const persistConfig = {
    key: 'root',
    storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Define middleware
const middleware = [thunk];

const enhancer = process.env.NODE_ENV === 'development'
? composeWithDevTools(applyMiddleware(...middleware))
: applyMiddleware(...middleware)

// Configure store with persisted reducer, middleware, and DevTools
const store = createStore(
    persistedReducer,
    initialState,
    enhancer // Only apply DevTools in development
);

export default store;
