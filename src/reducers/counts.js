import { NOTIF_COUNT, MEESAGE_COUNT, CLEAR_COUNTS } from '../actions/types';

const INITIAL_STATE = {
    notifCount: 0,
    messageCount: 0,
}

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case NOTIF_COUNT:
            return { ...state, notifCount: action.payload };
        case MEESAGE_COUNT:
            return { ...state, messageCount: action.payload };
        case CLEAR_COUNTS:
            return { notifCount: 0, messageCount: 0, }
        default:
            return state;
    }
}

export default reducer;