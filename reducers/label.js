import * as types from '../actions/label'
const initialState = {
    labelList:[],
    tagList:[],
    projectTypeList:[],
    addProjectTypeList:[],
    publicLabelList:[],
    addLabelList:[],
};
export default function label(state = initialState, action = {}) {
    switch (action.type) {   
    	case types.LABEL_LIST:
            return Object.assign({}, state, { labelList: action.payload}); 
        case types.TAG_LIST:
            return Object.assign({}, state, { tagList: action.payload}); 
        case types.PROJECT_TYPE_LIST:
            return Object.assign({}, state, { projectTypeList: action.payload}); 
        case types.ADD_PROJECT_TYPE:
            return Object.assign({}, state, { addProjectTypeList: action.payload}); 
        case types.PUBLIC_LABEL_LIST:
            return Object.assign({}, state, { publicLabelList: action.payload}); 
        case types.LABEL_USER:
            return Object.assign({}, state, { labelUser: action.payload}); 
        case types.ADD_LABEL:
            return Object.assign({}, state, { addLabelList: action.payload}); 
        case types.ADD_LABEL_USER:
            return Object.assign({}, state, { addLabelUser: action.payload}); 
        case types.PERSON_LABEL:
            return Object.assign({}, state, { personLabel: action.payload}); 
        case types.ADD_PERSON_LABEL:
            return Object.assign({}, state, { addPersonLabel: action.payload}); 
        default:
            return state;
    }
}


/* ------------------------------------------------------------------------- 分割线，下面的是以前的，上面的是现在要用的 --------------------------------------------------------------------------- 


import * as types from '../actions/label'

const initialState = {
    
    labelAddtask:null,
    labelDelete:null,
    labelDeleteRelation:null,
    labelBoxState:null,
};
export default function label(state = initialState, action = {}) {

    switch (action.type) {
        case types.LABEL_LIST:
            return Object.assign({}, state, { labelList: action.payload }); 
            case types.LABEL_ADD_TASKINFO:
            return Object.assign({}, state, { labelAddtask: action.payload });   
        case types.LABEL_DELETE:
            return Object.assign({}, state, { labelDelete: action.payload });     
        case types.LABEL_ADD_TASKINFO_LIST:
            return Object.assign({}, state, { labelDeleteRelation: action.payload });   
        case types.LABEL_DELETE_TASKINFO_LIST:
            return Object.assign({}, state, { labelDeleteRelation: action.payload });        
        case types.LABEL_BOX_STATE:
            return Object.assign({}, state, { labelBoxState: action.payload });      
        default:
            return state;
    }
}*/