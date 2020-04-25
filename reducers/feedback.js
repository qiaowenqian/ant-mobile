import * as types from '../actions/feedback'

const initialState = {
    add:null
};
export default function feedback(state = initialState, action = {}) {

    switch (action.type) {
        case types.FEED_ADD:
            return Object.assign({}, state, { add: action.payload });          
        default:
            return state;
    }
}