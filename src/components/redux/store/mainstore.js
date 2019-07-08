import { createStore } from 'redux';
import { mainReducer } from '../reducers/main';

export const store = createStore(mainReducer);