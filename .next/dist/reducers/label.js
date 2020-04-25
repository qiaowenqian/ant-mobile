'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = label;

var _assign = require('_babel-runtime@6.23.0@babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _label = require('../actions/label');

var types = _interopRequireWildcard(_label);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState = {
    labelList: [],
    tagList: [],
    projectTypeList: [],
    addProjectTypeList: [],
    publicLabelList: [],
    addLabelList: []
};
function label() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    switch (action.type) {
        case types.LABEL_LIST:
            return (0, _assign2.default)({}, state, { labelList: action.payload });
        case types.TAG_LIST:
            return (0, _assign2.default)({}, state, { tagList: action.payload });
        case types.PROJECT_TYPE_LIST:
            return (0, _assign2.default)({}, state, { projectTypeList: action.payload });
        case types.ADD_PROJECT_TYPE:
            return (0, _assign2.default)({}, state, { addProjectTypeList: action.payload });
        case types.PUBLIC_LABEL_LIST:
            return (0, _assign2.default)({}, state, { publicLabelList: action.payload });
        case types.LABEL_USER:
            return (0, _assign2.default)({}, state, { labelUser: action.payload });
        case types.ADD_LABEL:
            return (0, _assign2.default)({}, state, { addLabelList: action.payload });
        case types.ADD_LABEL_USER:
            return (0, _assign2.default)({}, state, { addLabelUser: action.payload });
        case types.PERSON_LABEL:
            return (0, _assign2.default)({}, state, { personLabel: action.payload });
        case types.ADD_PERSON_LABEL:
            return (0, _assign2.default)({}, state, { addPersonLabel: action.payload });
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