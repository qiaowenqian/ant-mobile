import * as types from '../actions/help'

const initialState = {
    list: [],
    typeList:[],
    helps:{},
};
export default function help(state = initialState, action = {}) {

    switch (action.type) {
        case types.HEHPS_LIST:
            return Object.assign({}, state, { list: action.payload });   
        case types.HEHPS_TYPE_LIST:
            return Object.assign({}, state, { typeList: action.payload });   
        case types.HEHPS_DETAIL:
            return Object.assign({}, state, { helps: action.payload });  
        default:
            return state;
    }
}