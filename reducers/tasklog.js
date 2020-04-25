import * as types from '../actions/tasklog'

const initialState = {
    taskLogList: [],
    taskList: '',
    taskLogListGroup:[]
};
export default function tasklog(state = initialState, action = {}) {

    switch (action.type) {
          case types.TASKLOG_TASKINFO:
            return Object.assign({}, state, { taskLogList: action.payload });   
            case types.TASKLOG_LIST:
            return Object.assign({}, state, { taskList: action.payload });   
            case types.TASKLOG_LIST_GROUP:
            return Object.assign({}, state, { taskLogListGroup: action.payload });  
        default:
            return state;
    }
}

