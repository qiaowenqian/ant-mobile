"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PROJECT_IDS = exports.PROJECT_TYPE = exports.ST_PROJECT_LIST = exports.MONTH_TYPE = exports.PERFORM_TYPE = exports.TASK_NUMS_PERSON = exports.TASK_NUMS_PROJECT = exports.PEN_PERSON = exports.PEN_PROJECT = exports.PIE_CHAT = undefined;
exports.content = content;
exports.getAllTaskDistributedByState = getAllTaskDistributedByState;
exports.getAllPendStatistics = getAllPendStatistics;
exports.getAllNumByPerson = getAllNumByPerson;
exports.getAllNumByProject = getAllNumByProject;
exports.getTaskDistributedByState = getTaskDistributedByState;
exports.getPendStatistics = getPendStatistics;
exports.getPendByProject = getPendByProject;
exports.getNumByProject = getNumByProject;
exports.getNumByPerson = getNumByPerson;
exports.getProjectResult = getProjectResult;
exports.saveProjectResult = saveProjectResult;
exports.getProjectList = getProjectList;
exports.saveMonthType = saveMonthType;
exports.savePerformType = savePerformType;

var _httpClient = require("../api/httpClient");

var _httpClient2 = _interopRequireDefault(_httpClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PIE_CHAT = exports.PIE_CHAT = "PIE_CHAT";
var PEN_PROJECT = exports.PEN_PROJECT = "PEN_PROJECT";
var PEN_PERSON = exports.PEN_PERSON = "PEN_PERSON";
var TASK_NUMS_PROJECT = exports.TASK_NUMS_PROJECT = "TASK_NUMS_PROJECT";
var TASK_NUMS_PERSON = exports.TASK_NUMS_PERSON = "TASK_NUMS_PERSON";

var PERFORM_TYPE = exports.PERFORM_TYPE = "PERFORM_TYPE";
var MONTH_TYPE = exports.MONTH_TYPE = "MONTH_TYPE";

var ST_PROJECT_LIST = exports.ST_PROJECT_LIST = "ST_PROJECT_LIST";

var PROJECT_TYPE = exports.PROJECT_TYPE = "PROJECT_TYPE";

var PROJECT_IDS = exports.PROJECT_IDS = "PROJECT_IDS";

function content(data, type) {
  return {
    type: type,
    payload: data
  };
}

function getAllTaskDistributedByState() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var fn = arguments[1];

  _httpClient2.default.AjaxPost("/calculate/getTaskDistributedByState", data, function (list) {
    if (fn) {
      if (list && list.data) {
        fn(list.data);
      }
    }
  });
}

function getAllPendStatistics() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var fn = arguments[1];

  _httpClient2.default.AjaxPost("/calculate/getPendStatistics", data, function (list) {
    if (fn) {
      fn(list.data);
    }
  });
}

function getAllNumByPerson() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var fn = arguments[1];

  _httpClient2.default.AjaxPost("/calculate/getContentByPerson", data, function (list) {
    if (fn) {
      fn(list.data);
    }
  });
}

function getAllNumByProject() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var fn = arguments[1];

  _httpClient2.default.AjaxPost("/calculate/getNumByPerson", data, function (list) {
    if (fn) {
      fn(list.data);
    }
  });
}

function getTaskDistributedByState() {
  var projectIds = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var callback = arguments[1];

  return function (dispatch) {
    _httpClient2.default.AjaxPost("/calculate/getTaskDistributedByState", projectIds, function (list) {
      if (callback) callback();
      var data = [];
      if (list && list.data && list.data.data) {
        data = list.data.data;
      }
      dispatch(content(data, PIE_CHAT));
    });
  };
}

//根据项目id查询待办统计（按项目）
// export function getProjectStatistics(projectIds = {}) {
//   return dispatch => {
//     HttpClient.AjaxPost("/project/getStatisticsIndex", {}, list => {
//       dispatch(content(list.data, PIE_CHAT));
//     });
//   };
// }

//根据项目id查询待办统计（按人员）
function getPendStatistics() {
  var projectIds = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return function (dispatch) {
    _httpClient2.default.AjaxPost("/calculate/getPendStatistics", projectIds, function (list) {
      dispatch(content(list.data, PEN_PERSON));
    });
  };
}

//待办统计 按项目
function getPendByProject() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return function (dispatch) {
    _httpClient2.default.AjaxPost("/calculate/getPendByProject", data, function (list) {
      dispatch(content(list.data, PEN_PROJECT));
    });
  };
}

//根据项目id查询 绩效统计(绩效值) 按人员
function getNumByProject() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return function (dispatch) {
    _httpClient2.default.AjaxPost("/calculate/getNumByPerson", data, function (list) {
      dispatch(content(list.data, TASK_NUMS_PROJECT));
    });
  };
}
//绩效按人员taskPersonList
function getNumByPerson() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return function (dispatch) {
    _httpClient2.default.AjaxPost("/calculate/getContentByPerson", data, function (list) {
      dispatch(content(list.data, TASK_NUMS_PERSON));
    });
  };
}

function getProjectResult() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var fn = arguments[1];

  var projectType = data.type;
  return function (dispatch) {
    _httpClient2.default.AjaxPost("/project/getProjectResult", data, function (list) {
      var projectList = [];
      if (list.data && list.data.projectList) {
        projectList = list.data.projectList;
      }
      dispatch(content(projectList, ST_PROJECT_LIST));
      dispatch(content(projectType, PROJECT_TYPE));
      if (fn) {
        if (list.data && list.data.projectList) {
          fn(projectList);
        }
      }
    });
  };
}

function saveProjectResult() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return function (dispatch) {
    dispatch(content(data.projectList, ST_PROJECT_LIST));
    dispatch(content(data.projectIds, PROJECT_IDS));
    dispatch(content(data.projectType, PROJECT_TYPE));
  };
}

function getProjectList() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var fn = arguments[1];

  _httpClient2.default.AjaxPost("/project/getProjectResult", data, function (list) {
    if (fn) {
      fn(list.data.projectList);
    }
  });
}

//存
function saveMonthType(data) {
  return function (dispatch) {
    dispatch(content(data, MONTH_TYPE));
  };
}

//存
function savePerformType(data) {
  return function (dispatch) {
    dispatch(content(data, PERFORM_TYPE));
  };
}