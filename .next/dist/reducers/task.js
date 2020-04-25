"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = task;

var _assign = require("_babel-runtime@6.23.0@babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _defineProperty2 = require("_babel-runtime@6.23.0@babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _task = require("../actions/task");

var types = _interopRequireWildcard(_task);

var _utils = require("../utils/utils");

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _initialState;

var initialState = (_initialState = {
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
		category: "1"
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
	taskinfoRefresh: { sign: false, id: "" }
}, (0, _defineProperty3.default)(_initialState, "taskUpdateState", {}), (0, _defineProperty3.default)(_initialState, "taskCuiBan", {}), (0, _defineProperty3.default)(_initialState, "taskSearchObject", {}), (0, _defineProperty3.default)(_initialState, "nowPage", 0), (0, _defineProperty3.default)(_initialState, "selectedUsers", []), (0, _defineProperty3.default)(_initialState, "selectedPros", []), _initialState);
function task() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
	var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	switch (action.type) {
		case types.SELECTED_USERS:
			return (0, _assign2.default)({}, state, {
				selectedUsers: action.payload
			});
		case types.NOW_PAGE:
			return (0, _assign2.default)({}, state, {
				nowPage: action.payload
			});
		case types.SELECTED_TAG:
			return (0, _assign2.default)({}, state, {
				selectTags: action.payload
			});
		case types.SELECTED_PROS:
			return (0, _assign2.default)({}, state, {
				selectedPros: action.payload
			});
		case types.TASK_SEARCH_OBJECT:
			return (0, _assign2.default)({}, state, {
				taskSearchObject: action.payload
			});
		case types.HOME_DATA:
			return (0, _assign2.default)({}, state, {
				homeData: action.payload
			});
		case types.DINGTAK_MESSAGE_DELETE:
			return (0, _assign2.default)({}, state, {
				dingtakMessage: action.payload
			});
		case types.TASKINFO_ID:
			return (0, _assign2.default)({}, state, {
				taskinfoId: action.payload
			});
		case types.BACK_FN:
			return (0, _assign2.default)({}, state, {
				backResut: action.payload
			});
		case types.TASK_LIST_BY_CONDITION:
			return (0, _assign2.default)({}, state, {
				taskListByCondition: action.payload
			});
		case types.TASK_DETAILS:
			return (0, _assign2.default)({}, state, {
				taskDetails: action.payload
			});
		case types.TASK_CHILD_LIST_BY_ID:
			return (0, _assign2.default)({}, state, {
				taskChildList: action.payload
			});
		case types.TASK_RELEVANCE_LIST_BY_ID:
			return (0, _assign2.default)({}, state, {
				taskRelevanceList: action.payload
			});
		case types.TASK_FILES_LIST_BY_ID:
			return (0, _assign2.default)({}, state, {
				taskFilesList: action.payload
			});
		case types.TASK_TASKINFO_UPDATE:
			return (0, _assign2.default)({}, state, {
				taskInfoUpdateData: action.payload
			});
		case types.TASKINFO_UPLOADING:
			return (0, _assign2.default)({}, state, {
				taskInfoUpdateFiles: action.payload
			});
		case types.TASK_FILES_DELETE:
			return (0, _assign2.default)({}, state, {
				taskDeleteFile: action.payload
			});
		case types.TASK_ADD_TALK:
			return (0, _assign2.default)({}, state, {
				taskAddTalk: action.payload
			});
		case types.TASK_DELETE_TALK:
			return (0, _assign2.default)({}, state, {
				taskDeleteTalk: action.payload
			});
		case types.TASK_CREATE:
			return (0, _assign2.default)({}, state, {
				taskCreate: action.payload
			});
		case types.TASK_PRIORITY_LIST:
			return (0, _assign2.default)({}, state, {
				taskPriorityList: action.payload
			});
			return (0, _assign2.default)({}, state, {
				taskFilesList: action.payload
			});
		case types.TASKINFO_TASK_BY_PRO_LIST:
			return (0, _assign2.default)({}, state, {
				taskProjectList: action.payload
			});
		case types.TASK_CREATE_VALS:
			return (0, _assign2.default)({}, state, {
				taskCreateVals: action.payload
			});
		case types.TASK_DELETE:
			return (0, _assign2.default)({}, state, {
				taskDelete: action.payload
			});
		case types.TASK_CREATE_BREAD:
			return (0, _assign2.default)({}, state, {
				taskCreateBread: action.payload
			});
		case types.TASK_UPDATE_STATE:
			return (0, _assign2.default)({}, state, {
				taskUpdateState: action.payload
			});
		case types.CALCULATE_PROJECT:
			return (0, _assign2.default)({}, state, {
				countProject: action.payload
			});
		case types.CALCULATE_TASK_TABLE:
			return (0, _assign2.default)({}, state, {
				countTaskList: action.payload
			});
		case types.PROJECT_COUNT:
			return (0, _assign2.default)({}, state, {
				projectCoun: action.payload
			});
		case types.REFRESH_TIME:
			return (0, _assign2.default)({}, state, {
				refresh: action.payload
			});
		case types.FILES_LIST:
			return (0, _assign2.default)({}, state, {
				fileList: action.payload
			});
		case types.CALCULATE_TEAM:
			return (0, _assign2.default)({}, state, {
				teamList: action.payload
			});
		case types.TASKINFO_REFRESH:
			return (0, _assign2.default)({}, state, {
				taskinfoRefresh: action.payload
			});
		case types.TASK_CUIBAN:
			return (0, _assign2.default)({}, state, {
				taskCuiBan: action.payload
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