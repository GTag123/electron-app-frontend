import { SET_NOTIF_WRAP } from '../actions/notificateAction';

export function notifReducer(state = null, action){
    switch (action.type) {
        case SET_NOTIF_WRAP:
            return action.payload;
        default:
                return state;
    }
}