import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { notifReducer } from './notifReducer';

export const mainReducer = combineReducers({
    auth: authReducer,
    notifWrap: notifReducer,
});