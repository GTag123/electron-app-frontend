import { combineReducers } from 'redux';
import { authReducer } from './authReducer';

export const mainReducer = combineReducers({
    auth: authReducer
});