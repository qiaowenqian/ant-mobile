"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.PROJECT_SELECT_LISTCOUNT = exports.PROJECT_USERINFO = exports.OPEN_PROJECT = exports.CREATE_PROJECT = exports.GET_PROJECT_CREATE_INFO_BY_ID = exports.CANCEL_ATTENTION_WITCH_PROJECT = exports.ADD_ATTENTION_WITCH_PROJECT = exports.PROJECT_UPDET_ALL = exports.PROJECT_DETAILS = exports.PROJECT_ADD = exports.PROJECT_LIST_JURISDICTION = exports.PROJECT_LIST = undefined;
exports.getProjectListByTypeJurisdiction = getProjectListByTypeJurisdiction;
exports.getProjectListByType = getProjectListByType;
exports.saveProjectUserInfo = saveProjectUserInfo;
exports.saveProjectSelectListCount = saveProjectSelectListCount;
exports.projectDetails = projectDetails;
exports.projectUpdateAll = projectUpdateAll;
exports.content = content;
exports.addAttentionWitchProject = addAttentionWitchProject;
exports.cancelAttentionWitchProject = cancelAttentionWitchProject;
exports.getProjectCreateInfoById = getProjectCreateInfoById;
exports.getProjectCreateInfoById2 = getProjectCreateInfoById2;
exports.createProject = createProject;
exports.getChartByUserTask = getChartByUserTask;
exports.getChartByUserMoney = getChartByUserMoney;
exports.getChartByTaskSituation = getChartByTaskSituation;
exports.getChartByProjectProgress = getChartByProjectProgress;
exports.setOpenProject = setOpenProject;

var _httpClient = require("../api/httpClient");

var _httpClient2 = _interopRequireDefault(_httpClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PROJECT_LIST = exports.PROJECT_LIST = "PROJECT_LIST";
var PROJECT_LIST_JURISDICTION = exports.PROJECT_LIST_JURISDICTION = "PROJECT_LIST_JURISDICTION";
var PROJECT_ADD = exports.PROJECT_ADD = "PROJECT_ADD";
var PROJECT_DETAILS = exports.PROJECT_DETAILS = "PROJECT_DETAILS";
var PROJECT_UPDET_ALL = exports.PROJECT_UPDET_ALL = "PROJECT_UPDET_ALL";
var ADD_ATTENTION_WITCH_PROJECT = exports.ADD_ATTENTION_WITCH_PROJECT = "ADD_ATTENTION_WITCH_PROJECT";
var CANCEL_ATTENTION_WITCH_PROJECT = exports.CANCEL_ATTENTION_WITCH_PROJECT = "CANCEL_ATTENTION_WITCH_PROJECT";
var GET_PROJECT_CREATE_INFO_BY_ID = exports.GET_PROJECT_CREATE_INFO_BY_ID = "GET_PROJECT_CREATE_INFO_BY_ID";
var CREATE_PROJECT = exports.CREATE_PROJECT = "CREATE_PROJECT";
var OPEN_PROJECT = exports.OPEN_PROJECT = "OPEN_PROJECT";
var PROJECT_USERINFO = exports.PROJECT_USERINFO = "PROJECT_USERINFO";
var PROJECT_SELECT_LISTCOUNT = exports.PROJECT_SELECT_LISTCOUNT = "PROJECT_SELECT_LISTCOUNT";
// 获取项目列表
function getProjectListByTypeJurisdiction(data, pageNo) {
	var pageSize = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 50;
	var fn = arguments[3];

	return function (dispatch) {
		_httpClient2.default.AjaxPostSync("/project/getProjectIds?pageNo=" + pageNo + "&pageSize=" + pageSize, data, function (list) {
			if (fn) {
				fn();
			}
			dispatch(content(list, PROJECT_LIST_JURISDICTION));
		});
	};
}
// 获取项目列表
function getProjectListByType(data, pageNo) {
	var pageSize = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 50;
	var fn = arguments[3];

	return function (dispatch) {
		_httpClient2.default.AjaxPostSync("/project/projectPageIndex?pageNo=" + pageNo + "&pageSize=" + pageSize, data, function (list) {
			if (fn) {
				fn(list);
			}
			// dispatch(content(list, PROJECT_LIST));
		});
	};
}
//保存选择的负责人详细信息
function saveProjectUserInfo(data) {
	return {
		type: PROJECT_USERINFO,
		payload: data
	};
}
//选择条件的总列表数目
function saveProjectSelectListCount(data) {
	return {
		type: "PROJECT_SELECT_LISTCOUNT",
		payload: data
	};
}

//获取项目详情
function projectDetails(id, fn) {
	return function (dispatch) {
		_httpClient2.default.AjaxPost("/project/projectDetails?id=" + id, "", function (list) {
			if (fn) {
				fn();
			}
			dispatch(content(list, PROJECT_DETAILS));
		});
	};
}
//修改项目
function projectUpdateAll(project, fn) {
	return function (dispatch) {
		_httpClient2.default.AjaxPost("/project/projectUpdate", project, function (list) {
			if (fn) {
				fn();
			}
			dispatch(content(list, PROJECT_UPDET_ALL));
		});
	};
}
function content(data, type) {
	return {
		type: type,
		payload: data
	};
}

// 关注项目
function addAttentionWitchProject(objectId, fn) {
	var data = { rtype: "a", objectId: objectId };
	return function (dispatch) {
		_httpClient2.default.AjaxPost("/collect/collect", data, function (list) {
			if (fn) {
				fn(list);
			}
			// dispatch(content(list, ADD_ATTENTION_WITCH_PROJECT));
		});
	};
}
// 取消关注项目
function cancelAttentionWitchProject(objectId, fn) {
	var data = { rtype: "a", objectId: objectId };
	return function (dispatch) {
		_httpClient2.default.AjaxPost("/collect/callCollect", data, function (list) {
			if (fn) {
				fn(list);
			}
			// dispatch(content(list, CANCEL_ATTENTION_WITCH_PROJECT));
		});
	};
}

// 获取项目设置的数据
function getProjectCreateInfoById(id, fn) {
	return function (dispatch) {
		_httpClient2.default.AjaxPost("/project/projectDetailsNew?id=" + id, "", function (list) {
			if (fn) {
				fn();
			}
			dispatch(content(list, GET_PROJECT_CREATE_INFO_BY_ID));
		});
	};
}
// 获取项目设置的数据,返回格式和列表格式相同，就是为了更新列表的
function getProjectCreateInfoById2(id, fn) {
	return function (dispatch) {
		_httpClient2.default.AjaxPost("/project/getProjectById?id=" + id, "", function (list) {
			if (fn) {
				fn(list);
			}
		});
	};
}
// 创建修改项目
function createProject(data, fn) {
	return function (dispatch) {
		_httpClient2.default.AjaxPost("/project/projectAddNew", data, function (list) {
			if (fn) {
				fn(list);
			}
			dispatch(content(list, CREATE_PROJECT));
		});
	};
}

// 人员任务统计
function getChartByUserTask(data, callback) {
	_httpClient2.default.AjaxPost("/calculate/getTasktableCount", data, function (list) {
		callback(list);
	});
}

// 人员绩效统计
function getChartByUserMoney(data, callback) {
	_httpClient2.default.AjaxPost("/calculate/getContenTableData", data, function (list) {
		callback(list);
	});
}

// 任务概述统计
function getChartByTaskSituation(id, callback) {
	_httpClient2.default.AjaxPost("/calculate/project?id=" + id, "", function (list) {
		callback(list);
	});
}

// 项目进展统计
function getChartByProjectProgress(data, callback) {
	_httpClient2.default.AjaxPost("/calculate/getProgressView", data, function (list) {
		callback(list);
	});
}

// 当前打开的项目
function setOpenProject(project) {
	return function (dispatch) {
		dispatch(content(project, OPEN_PROJECT));
	};
}