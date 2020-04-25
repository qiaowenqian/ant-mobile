'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ADD_PERSON_LABEL = exports.PERSON_LABEL = exports.ADD_LABEL_USER = exports.ADD_LABEL = exports.LABEL_USER = exports.PUBLIC_LABEL_LIST = exports.ADD_PROJECT_TYPE = exports.PROJECT_TYPE_LIST = exports.TAG_LIST = exports.LABEL_LIST = undefined;
exports.getLabelListByUser = getLabelListByUser;
exports.getTagList = getTagList;
exports.getProjectTypeList = getProjectTypeList;
exports.addProjectType = addProjectType;
exports.getLabelList = getLabelList;
exports.findLabelUser = findLabelUser;
exports.addLabel = addLabel;
exports.addLabelUser = addLabelUser;
exports.getPersonLabel = getPersonLabel;
exports.addPersonLabel = addPersonLabel;
exports.content = content;

var _httpClient = require('../api/httpClient');

var _httpClient2 = _interopRequireDefault(_httpClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LABEL_LIST = exports.LABEL_LIST = 'LABEL_LIST';
var TAG_LIST = exports.TAG_LIST = 'TAG_LIST';
var PROJECT_TYPE_LIST = exports.PROJECT_TYPE_LIST = 'PROJECT_TYPE_LIST';
var ADD_PROJECT_TYPE = exports.ADD_PROJECT_TYPE = 'ADD_PROJECT_TYPE';
var PUBLIC_LABEL_LIST = exports.PUBLIC_LABEL_LIST = 'PUBLIC_LABEL_LIST';
var LABEL_USER = exports.LABEL_USER = 'LABEL_USER';
var ADD_LABEL = exports.ADD_LABEL = 'ADD_LABEL';
var ADD_LABEL_USER = exports.ADD_LABEL_USER = 'ADD_LABEL_USER';
var PERSON_LABEL = exports.PERSON_LABEL = 'PERSON_LABEL';
var ADD_PERSON_LABEL = exports.ADD_PERSON_LABEL = 'ADD_PERSON_LABEL';


// 获取所有标签
function getLabelListByUser(fn) {
    return function (dispatch) {
        _httpClient2.default.AjaxPost('/label/findLabelByUser', '', function (list) {
            if (fn) {
                fn();
            }
            dispatch(content(list, LABEL_LIST));
        });
    };
}

// 获取标签列表
/*
 * 返回值 type:'1'  个人标签
 *        type:'2'  公共标签
 *        type:'3'  项目分类
 */
function getTagList(fn) {
    return function (dispatch) {
        _httpClient2.default.AjaxPost('/label/findLabelAll', '', function (list) {
            if (fn) {
                fn();
            }
            dispatch(content(list, TAG_LIST));
        });
    };
}

// 获取项目分类列表
function getProjectTypeList(fn) {
    return function (dispatch) {
        _httpClient2.default.AjaxPost('/label/labelProjectList', '', function (list) {
            if (fn) {
                fn();
            }
            dispatch(content(list, PROJECT_TYPE_LIST));
        });
    };
}
//添加项目分类
function addProjectType(data, pid, fn) {
    return function (dispatch) {
        _httpClient2.default.AjaxPost('/label/addProjectLabel?pid=' + pid, data, function (list) {
            if (fn) {
                fn();
            }
            dispatch(content(list, ADD_PROJECT_TYPE));
        });
    };
}

//获取标签列表
function getLabelList(fn) {
    return function (dispatch) {
        _httpClient2.default.AjaxPost('/label/labelUserList', '', function (list) {
            if (fn) {
                fn();
            }
            dispatch(content(list, PUBLIC_LABEL_LIST));
        });
    };
}
//通过标签获取用户
function findLabelUser(id, fn) {
    return function (dispatch) {
        _httpClient2.default.AjaxPost('/label/findLabelUser?lid=' + id, '', function (list) {
            if (fn) {
                fn();
            }
            dispatch(content(list, LABEL_USER));
        });
    };
}
//添加标签
function addLabel(data, pid, fn) {
    return function (dispatch) {
        _httpClient2.default.AjaxPost('/label/addLabel?pid=' + pid, data, function (list) {
            if (fn) {
                fn();
            }
            dispatch(content(list, ADD_LABEL));
        });
    };
}

//标签添加用户
function addLabelUser(userId, lid, fn) {
    return function (dispatch) {
        _httpClient2.default.AjaxPost('/label/addLabelUser', { 'userList': userId, 'label': { id: lid } }, function (list) {
            if (fn) {
                fn();
            }
            dispatch(content(list, ADD_LABEL_USER));
        });
    };
}

//获取个人标签
function getPersonLabel(fn) {
    return function (dispatch) {
        _httpClient2.default.AjaxPost('/label/getPersonLabel', '', function (list) {
            if (fn) {
                fn();
            }
            dispatch(content(list, PERSON_LABEL));
        });
    };
}

//添加个人标签
function addPersonLabel(name, pid, fn) {
    return function (dispatch) {
        _httpClient2.default.AjaxPost('/label/addPersonLabel?pid=' + pid, name, function (list) {
            if (fn) {
                fn();
            }
            dispatch(content(list, ADD_PERSON_LABEL));
        });
    };
}

function content(data, type) {
    return {
        type: type,
        payload: data
    };
}