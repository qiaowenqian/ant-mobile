"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = tasklog;

var _assign = require("_babel-runtime@6.23.0@babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _dynamic = require("../actions/dynamic");

var types = _interopRequireWildcard(_dynamic);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState = {
  taskLogList: [],
  taskList: "",
  taskLogListGroup: [],
  search: {}
};
function tasklog() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  switch (action.type) {
    case types.SEARCH:
      return (0, _assign2.default)({}, state, { search: action.payload });

    case types.TASKLOG_TASKINFO:
      return (0, _assign2.default)({}, state, { taskLogList: action.payload });
    case types.TASKLOG_LIST:
      return (0, _assign2.default)({}, state, { taskList: action.payload });
    case types.TASKLOG_LIST_GROUP:
      //       console.log(action.payload, "action.payload");
      var data = state.taskLogListGroup;
      if (!state.taskLogListGroup.data || action.payload.pageNo == 1) {
        return (0, _assign2.default)({}, state, {
          taskLogListGroup: action.payload.list
        });
      } else {
        if (action.payload.pageNo != state.taskLogListGroup.data.result.pageNo) {
          var list = data.data.result.list.concat(action.payload.list.data.result.list);
          data = _.merge({}, data, action.payload.list);
          data.data.result.list = list;
          return (0, _assign2.default)({}, state, { taskLogListGroup: data });
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