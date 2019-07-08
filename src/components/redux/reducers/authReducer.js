import {
    USER_LOGINNING,
    USER_INFO_CHANGE
} from '../actions/authAction';

const initialState = {
    loginned: false,
    user: null
};

export function authReducer(state = initialState, action) {
    switch (action.type) {
        case USER_LOGINNING:
            return { ...state, loginned: action.payload };
        case USER_INFO_CHANGE:
            return { ...state,  user: action.payload };
        
        default:
            return state;
    }
}