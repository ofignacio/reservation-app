// Principal libraries
import {createStore, applyMiddleware} from 'redux';
import {persistStore} from 'redux-persist';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

// Reducers
import rootReducer from './reducers';

const middlewares = [thunk];

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares)),
);

export const persistor = persistStore(store);
