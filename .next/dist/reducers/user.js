"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = user;

var _assign = require("_babel-runtime@6.23.0@babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _user = require("../actions/user");

var types = _interopRequireWildcard(_user);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState = {
  user: null,
  dingtakCode: "",
  dingtakLogin: "",
  messageListByUser: {},
  urlData: ""
};
function user() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  switch (action.type) {
    case types.SET_MESSAGE_COUNT:
      debugger;
      var rdata = _lodash2.default.cloneDeep(state.messageListByUser);
      //       console.log(action.payload, "action.payload");
      rdata.data.list.map(function (item) {
        if (item.id == action.payload) {
          item.read = 1;
        }
      });
      rdata.data.messageCount = rdata.data.messageCount - 1 > -1 ? rdata.data.messageCount - 1 : 0;
      return (0, _assign2.default)({}, state, { messageListByUser: rdata });
    case types.LOGIN:
      return (0, _assign2.default)({}, state, { user: action.payload });
    case types.DINGTAK_CODE:
      return (0, _assign2.default)({}, state, { dingtakCode: action.payload });
    case types.DINGTAK_CODE_LOGIN:
      return (0, _assign2.default)({}, state, { dingtakLogin: action.payload });
    case types.USER_MESSAGE:
      var data = state.messageListByUser;
      if (!state.messageListByUser.data || action.payload.pageNo == 1) {
        return (0, _assign2.default)({}, state, {
          messageListByUser: action.payload.list
        });
      } else {
        if (action.payload.pageNo != state.messageListByUser.data.page) {
          var list = data.data.list.concat(action.payload.list.data.list);
          var msgCount = data.data.messageCount;
          data = _lodash2.default.merge({}, data, action.payload.list);
          data.data.list = list;
          data.data.messageCount = msgCount;
          return (0, _assign2.default)({}, state, { messageListByUser: data });
        } else {
          return (0, _assign2.default)({}, state, { messageListByUser: data });
        }
      }

    case types.SET_URLDATA:
      return (0, _assign2.default)({}, state, { urlData: action.payload });
    default:
      return state;
  }
}

/* ------------------------------------------------------------------------- 分割线，下面的是以前的，上面的是现在要用的 --------------------------------------------------------------------------- 

import * as types from '../actions/user'

const initialState = {
    
    timeList:[],
    userAll:[],
    userSelect:[],
    userId:'',
    dingUserId:'',
    apps:[],
    userCancellation:'',
};
export default function user(state = initialState, action = {}) {

    switch (action.type) {
             
        case types.TIME_LIST:
            return Object.assign({}, state, { timeList: action.payload });   
        case types.USER_ALL_LIST:
            return Object.assign({}, state, { userAll: action.payload }); 
        case types.SELECT_USER:
            return Object.assign({}, state, { userSelect: action.payload });   
          
         
        case types.DINGTAK_USER_ID:
            return Object.assign({}, state, { userId: action.payload });  
        case types.DINGTAK_DING_USER_ID:
            return Object.assign({}, state, { dingUserId: action.payload });
        case types.FINDAPPLIST:
            return Object.assign({}, state, { apps: action.payload });
        case types.USER_CANCELLATION:
            return Object.assign({}, state, { userCancellation: action.payload });
        default:
            return state;
    }
}*/