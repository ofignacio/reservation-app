// Principal libraries
import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

// Reducers
import account from './account';
import classes from './classes';
import book from './book';
import notification from './notification';
import users from './users';

const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['account', 'classes', 'book', 'notification', 'users'],
};

const accountPersistConfig = {
  key: 'account',
  storage: AsyncStorage,
  whitelist: ['token', 'account', 'logged'],
};

const reducers = combineReducers({
  account: persistReducer(accountPersistConfig, account),
  classes,
  book,
  notification,
  users,
});

export default persistReducer(rootPersistConfig, reducers);
