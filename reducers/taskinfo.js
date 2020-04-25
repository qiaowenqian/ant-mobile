import * as types from '../actions/taskinfo'
import { ENGINE_METHOD_CIPHERS } from 'constants';

const initialState = {
    taskProjectList:[],
    taskinfoId:null,
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
    dingtakMessage:'',
    taskinfoHomeData:[],
    taskinfoDelete:null,
    taskSaveData:null,
    backResut:{},
};
export default function taskinfo(state = initialState, action = {}) {
    switch (action.type) {
        case types.TASKINFO_PROJECT_LIST:
            return Object.assign({}, state, { taskProjectList: action.payload });       
        case types.TASKINFO_ID:
            return Object.assign({}, state, { taskinfoId: action.payload });      
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
        case types.DINGTAK_MESSAGE_DELETE:
            return Object.assign({}, state, { dingtakMessage : action.payload });   
        case types.TASKINFO_HOME_INDEX:
            return Object.assign({}, state, { taskinfoHomeData : action.payload }); 
        case types.TASKINFO_DELETEALL:
            return Object.assign({}, state, { taskinfoDelete : action.payload }); 
        case types.BACK_FN:
            return Object.assign({}, state, { backResut : action.payload }); 
        case types.TASKINFO_BY_ID_SAVE:
            return Object.assign({}, state, { taskSaveData : action.payload });    
        default:
            return state;
    }
}