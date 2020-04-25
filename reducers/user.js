import * as types from "../actions/user";
import _ from "lodash";
const initialState = {
  user: null,
  dingtakCode: "",
  dingtakLogin: "",
  messageListByUser: {},
  urlData: ""
};
export default function user(state = initialState, action = {}) {
  switch (action.type) {
    case types.SET_MESSAGE_COUNT:
      debugger;
      let rdata = _.cloneDeep(state.messageListByUser);
      //       console.log(action.payload, "action.payload");
      rdata.data.list.map(item => {
        if (item.id == action.payload) {
          item.read = 1;
        }
      });
      rdata.data.messageCount =
        rdata.data.messageCount - 1 > -1 ? rdata.data.messageCount - 1 : 0;
      return Object.assign({}, state, { messageListByUser: rdata });
    case types.LOGIN:
      return Object.assign({}, state, { user: action.payload });
    case types.DINGTAK_CODE:
      return Object.assign({}, state, { dingtakCode: action.payload });
    case types.DINGTAK_CODE_LOGIN:
      return Object.assign({}, state, { dingtakLogin: action.payload });
    case types.USER_MESSAGE:
      let data = state.messageListByUser;
      if (!state.messageListByUser.data || action.payload.pageNo == 1) {
        return Object.assign({}, state, {
          messageListByUser: action.payload.list
        });
      } else {
        if (action.payload.pageNo != state.messageListByUser.data.page) {
          const list = data.data.list.concat(action.payload.list.data.list);
          var msgCount = data.data.messageCount;
          data = _.merge({}, data, action.payload.list);
          data.data.list = list;
          data.data.messageCount = msgCount;
          return Object.assign({}, state, { messageListByUser: data });
        } else {
          return Object.assign({}, state, { messageListByUser: data });
        }
      }

    case types.SET_URLDATA:
      return Object.assign({}, state, { urlData: action.payload });
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
