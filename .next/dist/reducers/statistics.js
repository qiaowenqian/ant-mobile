"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = task;

var _assign = require("_babel-runtime@6.23.0@babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _statistics = require("../actions/statistics");

var types = _interopRequireWildcard(_statistics);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState = {
  pieData: null,
  penProject: {},
  penPerson: {},
  taskNumsProject: {},
  taskNumsPerson: {},
  performType: "task",
  monthType: {
    type: "nowMonth",
    attdate01: new Date("2016/1/1"),
    attdate02: new Date("2016/1/1"),
    value: null
  },
  projectList: null,
  projectType: 1,
  projectIds: []
};

function task() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  switch (action.type) {
    case types.PROJECT_IDS:
      return (0, _assign2.default)({}, state, { projectIds: action.payload });
    case types.PROJECT_TYPE:
      return (0, _assign2.default)({}, state, { projectType: action.payload });
    case types.ST_PROJECT_LIST:
      return (0, _assign2.default)({}, state, { projectList: action.payload });
    case types.PERFORM_TYPE:
      return (0, _assign2.default)({}, state, { performType: action.payload });
    case types.MONTH_TYPE:
      return (0, _assign2.default)({}, state, { monthType: action.payload });
    case types.PIE_CHAT:
      return (0, _assign2.default)({}, state, { pieData: action.payload });
    case types.PEN_PROJECT:
      return (0, _assign2.default)({}, state, { penProject: action.payload });
    case types.PEN_PERSON:
      return (0, _assign2.default)({}, state, { penPerson: action.payload });
    case types.TASK_NUMS_PROJECT:
      return (0, _assign2.default)({}, state, { taskNumsProject: action.payload });
    case types.TASK_NUMS_PERSON:
      return (0, _assign2.default)({}, state, { taskNumsPerson: action.payload });
    default:
      return state;
  }
}