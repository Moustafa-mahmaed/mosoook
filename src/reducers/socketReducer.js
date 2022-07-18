import * as types from '../actions/types';

const initialState = {
  TripsCount: 0,
  NotificationsCount: 0,
  order: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.TripsCount:
      return {
        ...state,
        TripsCount: action.payload,
      };
    case types.NotificationsCount:
      return {
        ...state,
        NotificationsCount: action.payload,
      };
    case types.CLEAR_SOCKET:
      return {...initialState};
    case types.ORDER_CHANGE:
      return {
        ...state,
        order: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
