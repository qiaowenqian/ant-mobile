import * as types from "../actions/home";

const initialState = {
  homeData: {},
  homeNumber: {},
  homeBar: [],
  homeLine: []
};
export default function home(state = initialState, action = {}) {
  switch (action.type) {
    case types.HOME_DATA:
      return Object.assign({}, state, { homeData: action.payload });
    case types.HOME_NUMBER:
      return Object.assign({}, state, {
        homeNumber: action.payload
      });
    case types.HOMEBAR:
      return Object.assign({}, state, {
        homeBar: action.payload
      });
    case types.HOMELINE:
      return Object.assign({}, state, {
        homeLine: action.payload
      });
    default:
      return state;
  }
}
