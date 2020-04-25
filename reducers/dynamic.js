import * as types from "../actions/dynamic";
const initialState = {
  taskLogList: [],
  taskList: "",
  taskLogListGroup: [],
  search: {}
};
export default function tasklog(state = initialState, action = {}) {
  switch (action.type) {
    case types.SEARCH:
      return Object.assign({}, state, { search: action.payload });

    case types.TASKLOG_TASKINFO:
      return Object.assign({}, state, { taskLogList: action.payload });
    case types.TASKLOG_LIST:
      return Object.assign({}, state, { taskList: action.payload });
    case types.TASKLOG_LIST_GROUP:
      //       console.log(action.payload, "action.payload");
      let data = state.taskLogListGroup;
      if (!state.taskLogListGroup.data || action.payload.pageNo == 1) {
        return Object.assign({}, state, {
          taskLogListGroup: action.payload.list
        });
      } else {
        if (
          action.payload.pageNo != state.taskLogListGroup.data.result.pageNo
        ) {
          const list = data.data.result.list.concat(
            action.payload.list.data.result.list
          );
          data = _.merge({}, data, action.payload.list);
          data.data.result.list = list;
          return Object.assign({}, state, { taskLogListGroup: data });
        }
      }
    default:
      return state;
  }
}

/* ------------------------------------------------------------------------- 分割线，下面的是以前的，上面的是现在要用的 --------------------------------------------------------------------------- 

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

*/
