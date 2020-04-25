import * as types from "../actions/task";
import utils from "../utils/utils";
const initialState = {
  repeatPlanObj: {}, //已有项目设置循环计划时保存已有项目信息便于传递参数
  homeData: {},
  dingtakMessage: "",
  taskinfoId: null,
  taskListByCondition: {},
  taskDetails: {},
  taskChildList: {},
  taskRelevanceList: {},
  taskFilesList: {},
  taskInfoUpdateData: {},
  taskInfoUpdateFiles: {},
  taskDeleteFile: {},
  taskAddTalk: {},
  taskDeleteTalk: {},
  taskCreate: {},
  taskPriorityList: {},
  taskProjectList: {},
  taskCreateVals: {
    id: "",
    taskname: "",
    remarks: "", // 任务描述
    userResponse: {},
    planEndTime: "",
    userFlow: {},
    flowConten: "",
    coefficienttype: "",
    workTime: "",
    labels: [],
    mobileFile: [], // 描述文件
    category: "1",
    repeatObj: null
  },
  taskDelete: {},
  taskCreateBread: [],
  taskUpdateState: {},
  countProject: {},
  countTaskList: {},
  projectCoun: null,
  refresh: false,
  fileList: [],
  teamList: [],
  taskinfoRefresh: { sign: false, id: "" },
  taskUpdateState: {},
  taskCuiBan: {},
  taskSearchObject: {},
  nowPage: 0,
  selectedUsers: [],
  selectedPros: [] //筛选页面的project数据
};
export default function task(state = initialState, action = {}) {
  switch (action.type) {
    case types.SELECTED_USERS:
      return Object.assign({}, state, {
        selectedUsers: action.payload
      });
    case types.NOW_PAGE:
      return Object.assign({}, state, {
        nowPage: action.payload
      });
    case types.SELECTED_TAG:
      return Object.assign({}, state, {
        selectTags: action.payload
      });
    case types.SELECTED_PROS:
      return Object.assign({}, state, {
        selectedPros: action.payload
      });
    case types.TASK_SEARCH_OBJECT:
      return Object.assign({}, state, {
        taskSearchObject: action.payload
      });
    case types.HOME_DATA:
      return Object.assign({}, state, {
        homeData: action.payload
      });
    case types.DINGTAK_MESSAGE_DELETE:
      return Object.assign({}, state, {
        dingtakMessage: action.payload
      });
    case types.TASKINFO_ID:
      return Object.assign({}, state, {
        taskinfoId: action.payload
      });
    case types.BACK_FN:
      return Object.assign({}, state, {
        backResut: action.payload
      });
    case types.TASK_LIST_BY_CONDITION:
      return Object.assign({}, state, {
        taskListByCondition: action.payload
      });
    case types.TASK_DETAILS:
      return Object.assign({}, state, {
        taskDetails: action.payload
      });
    case types.TASK_CHILD_LIST_BY_ID:
      return Object.assign({}, state, {
        taskChildList: action.payload
      });
    case types.TASK_RELEVANCE_LIST_BY_ID:
      return Object.assign({}, state, {
        taskRelevanceList: action.payload
      });
    case types.TASK_FILES_LIST_BY_ID:
      return Object.assign({}, state, {
        taskFilesList: action.payload
      });
    case types.TASK_TASKINFO_UPDATE:
      return Object.assign({}, state, {
        taskInfoUpdateData: action.payload
      });
    case types.TASKINFO_UPLOADING:
      return Object.assign({}, state, {
        taskInfoUpdateFiles: action.payload
      });
    case types.TASK_FILES_DELETE:
      return Object.assign({}, state, {
        taskDeleteFile: action.payload
      });
    case types.TASK_ADD_TALK:
      return Object.assign({}, state, {
        taskAddTalk: action.payload
      });
    case types.TASK_DELETE_TALK:
      return Object.assign({}, state, {
        taskDeleteTalk: action.payload
      });
    case types.TASK_CREATE:
      return Object.assign({}, state, {
        taskCreate: action.payload
      });
    case types.TASK_PRIORITY_LIST:
      return Object.assign({}, state, {
        taskPriorityList: action.payload
      });
      return Object.assign({}, state, {
        taskFilesList: action.payload
      });
    case types.TASKINFO_TASK_BY_PRO_LIST:
      return Object.assign({}, state, {
        taskProjectList: action.payload
      });
    case types.TASK_CREATE_VALS:
      console.log(action.payload, "action.payload");
      return Object.assign({}, state, {
        taskCreateVals: action.payload
      });
    case types.TASK_DELETE:
      return Object.assign({}, state, {
        taskDelete: action.payload
      });
    case types.TASK_CREATE_BREAD:
      return Object.assign({}, state, {
        taskCreateBread: action.payload
      });
    case types.TASK_UPDATE_STATE:
      return Object.assign({}, state, {
        taskUpdateState: action.payload
      });
    case types.CALCULATE_PROJECT:
      return Object.assign({}, state, {
        countProject: action.payload
      });
    case types.CALCULATE_TASK_TABLE:
      return Object.assign({}, state, {
        countTaskList: action.payload
      });
    case types.PROJECT_COUNT:
      return Object.assign({}, state, {
        projectCoun: action.payload
      });
    case types.REFRESH_TIME:
      return Object.assign({}, state, {
        refresh: action.payload
      });
    case types.FILES_LIST:
      return Object.assign({}, state, {
        fileList: action.payload
      });
    case types.CALCULATE_TEAM:
      return Object.assign({}, state, {
        teamList: action.payload
      });
    case types.TASKINFO_REFRESH:
      return Object.assign({}, state, {
        taskinfoRefresh: action.payload
      });
    case types.TASK_CUIBAN:
      return Object.assign({}, state, {
        taskCuiBan: action.payload
      });
    case types.REPEAT_TASKINFO:
      return Object.assign({}, state, {
        repeatPlanObj: action.payload
      });

    default:
      return state;
  }

  /* ------------------------------------------------------------------------- 分割线，下面的是以前的，上面的是现在要用的 --------------------------------------------------------------------------- 


import { ENGINE_METHOD_CIPHERS } from 'constants';

const initialState = {
    taskProjectList:[],
    
    taskinfoAddIni:null,
    taskinfoAdd:null,
    taskListByPro:[],
    taskinfoDetail:null,
    taskinfoChild:null,
    taskinfoLeavnce:null,
    taskinfoPid:null,
    taskinfoFile:[],
    taskinfoLeave:[],
    leaveDelete:[],
    leaveAdd:[],
    taskinfoUpdate:null,
    taskinfoDeleteUser:null,
    taskinfoUpSate:null,
    taskinfoUploading:null,
    
    taskinfoHomeData:[],
    taskinfoDelete:null,
    taskSaveData:null,
    backResut:{},
};

    switch (action.type) {
        case types.TASKINFO_PROJECT_LIST:
            return Object.assign({}, state, { taskProjectList: action.payload });       
              
        case types.TASKINFO_ADD_INI:
            return Object.assign({}, state, { taskinfoAddIni: action.payload });     
        case types.TASKINFO_ADD:
            return Object.assign({}, state, { taskinfoAdd: action.payload });    
        case types.TASKINFO_TASK_BY_PRO_LIST:
            return Object.assign({}, state, { taskListByPro: action.payload });  
        case types.TASKINFO_BY_ID:
            return Object.assign({}, state, { taskinfoDetail: action.payload });    
        case types.TASKINFO_CHILD:
            return Object.assign({}, state, { taskinfoChild: action.payload });    
        case types.TASKINFO_LEVANCE:
            return Object.assign({}, state, { taskinfoLeavnce: action.payload });    
        case types.TASKINFO_ID_PID:
            return Object.assign({}, state, { taskinfoPid: action.payload });    
        case types.TASKINFO_FILES:
            return Object.assign({}, state, { taskinfoFile: action.payload });    
        case types.TASKINFO_LEAVE:
            return Object.assign({}, state, { taskinfoLeave: action.payload });    
        case types.LEAVE_DELETE:
            return Object.assign({}, state, { leaveDelete : action.payload });   
        case types.LEAVE_ADD:
            return Object.assign({}, state, { leaveAdd : action.payload });   
        case types.TASKINFO_UPDATE:
            return Object.assign({}, state, { taskinfoUpdate : action.payload });   
        case types.TASKINFO_DELETE_USER:
            return Object.assign({}, state, { taskinfoDeleteUser : action.payload });   
        case types.TASKINFO_UPDATE_STATE:
            return Object.assign({}, state, { taskinfoDetail : action.payload });   
        case types.TASKINFO_UPDATE_FLOW:
            return Object.assign({}, state, { taskinfoDetail : action.payload });   
        case types.TASKINFO_UPLOADING:
            return Object.assign({}, state, { taskinfoUploading : action.payload });   
         
        case types.TASKINFO_HOME_INDEX:
            return Object.assign({}, state, { taskinfoHomeData : action.payload }); 
        case types.TASKINFO_DELETEALL:
            return Object.assign({}, state, { taskinfoDelete : action.payload }); 
        
        case types.TASKINFO_BY_ID_SAVE:
            return Object.assign({}, state, { taskSaveData : action.payload });    
        default:
            return state;
    }
    */
}
