"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SELECTED_USERS = exports.NOW_PAGE = exports.SELECTED_TAG = exports.SELECTED_PROS = exports.TASK_SEARCH_OBJECT = exports.TASK_CUIBAN = exports.TASKINFO_REFRESH = exports.CALCULATE_TEAM = exports.FILES_LIST = exports.REFRESH_TIME = exports.PROJECT_COUNT = exports.CALCULATE_TASK_TABLE = exports.CALCULATE_PROJECT = exports.TASK_UPDATE_STATE = exports.TASK_CREATE_BREAD = exports.TASK_DELETE = exports.TASK_CREATE_VALS = exports.TASKINFO_TASK_BY_PRO_LIST = exports.TASK_PRIORITY_LIST = exports.TASK_CREATE = exports.TASK_DELETE_TALK = exports.TASK_ADD_TALK = exports.TASK_FILES_DELETE = exports.TASKINFO_UPLOADING = exports.TASK_TASKINFO_UPDATE = exports.TASK_FILES_LIST_BY_ID = exports.TASK_RELEVANCE_LIST_BY_ID = exports.TASK_CHILD_LIST_BY_ID = exports.TASK_DETAILS = exports.TASK_LIST_BY_CONDITION = exports.BACK_FN = exports.TASKINFO_ID = exports.DINGTAK_MESSAGE_DELETE = exports.HOME_DATA = undefined;
exports.content = content;
exports.setSelectedUsers = setSelectedUsers;
exports.setNowPage = setNowPage;
exports.setSelectedTag = setSelectedTag;
exports.setSelectedPros = setSelectedPros;
exports.setTaskSearchObject = setTaskSearchObject;
exports.findHomeDataByPageSize = findHomeDataByPageSize;
exports.getDingMessageDetails = getDingMessageDetails;
exports.selectTaskinfoId = selectTaskinfoId;
exports.backFn = backFn;
exports.attentionUsers = attentionUsers;
exports.getTaskDetailsById = getTaskDetailsById;
exports.getTaskDetailsById2 = getTaskDetailsById2;
exports.getTaskDetailsByIds = getTaskDetailsByIds;
exports.getChildListById = getChildListById;
exports.addAttentionWitchProject = addAttentionWitchProject;
exports.cancelAttentionWitchProject = cancelAttentionWitchProject;
exports.getReLevanceTaskListById = getReLevanceTaskListById;
exports.getTaskFilesListById = getTaskFilesListById;
exports.updateTaskinfo = updateTaskinfo;
exports.upFilesByType = upFilesByType;
exports.deleteFileByType = deleteFileByType;
exports.addTalkByTaskId = addTalkByTaskId;
exports.deleteTalkById = deleteTalkById;
exports.createTask = createTask;
exports.getPriorityList = getPriorityList;
exports.getTaskListByPro = getTaskListByPro;
exports.setCreateTaskVals = setCreateTaskVals;
exports.deleteTaskById = deleteTaskById;
exports.updateTaskStateById = updateTaskStateById;
exports.updateTaskStateById2 = updateTaskStateById2;
exports.setTaskCreateBread = setTaskCreateBread;
exports.projectCount = projectCount;
exports.getProjectCount = getProjectCount;
exports.getTasktableData = getTasktableData;
exports.refreshTime = refreshTime;
exports.getTaskFileByPro = getTaskFileByPro;
exports.getTaskListByCondition = getTaskListByCondition;
exports.getFileListByProjectId = getFileListByProjectId;
exports.teamStatistics = teamStatistics;
exports.refreshTaskinfo = refreshTaskinfo;
exports.expedite = expedite;
exports.cuibanChildTask = cuibanChildTask;

var _httpClient = require("../api/httpClient");

var _httpClient2 = _interopRequireDefault(_httpClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HOME_DATA = exports.HOME_DATA = "HOME_DATA";
var DINGTAK_MESSAGE_DELETE = exports.DINGTAK_MESSAGE_DELETE = "DINGTAK_MESSAGE_DELETE";
var TASKINFO_ID = exports.TASKINFO_ID = "TASKINFO_ID";
var BACK_FN = exports.BACK_FN = "BACK_FN";
var TASK_LIST_BY_CONDITION = exports.TASK_LIST_BY_CONDITION = "TASK_LIST_BY_CONDITION";
var TASK_DETAILS = exports.TASK_DETAILS = "TASK_DETAILS";
var TASK_CHILD_LIST_BY_ID = exports.TASK_CHILD_LIST_BY_ID = "TASK_CHILD_LIST_BY_ID";
var TASK_RELEVANCE_LIST_BY_ID = exports.TASK_RELEVANCE_LIST_BY_ID = "TASK_RELEVANCE_LIST_BY_ID";
var TASK_FILES_LIST_BY_ID = exports.TASK_FILES_LIST_BY_ID = "TASK_FILES_LIST_BY_ID";
var TASK_TASKINFO_UPDATE = exports.TASK_TASKINFO_UPDATE = "TASK_TASKINFO_UPDATE";
var TASKINFO_UPLOADING = exports.TASKINFO_UPLOADING = "TASKINFO_UPLOADING";
var TASK_FILES_DELETE = exports.TASK_FILES_DELETE = "TASK_FILES_DELETE";
var TASK_ADD_TALK = exports.TASK_ADD_TALK = "TASK_ADD_TALK";
var TASK_DELETE_TALK = exports.TASK_DELETE_TALK = "TASK_DELETE_TALK";
var TASK_CREATE = exports.TASK_CREATE = "TASK_CREATE";
var TASK_PRIORITY_LIST = exports.TASK_PRIORITY_LIST = "TASK_PRIORITY_LIST";
var TASKINFO_TASK_BY_PRO_LIST = exports.TASKINFO_TASK_BY_PRO_LIST = "TASKINFO_TASK_BY_PRO_LIST";
var TASK_CREATE_VALS = exports.TASK_CREATE_VALS = "TASK_CREATE_VALS";
var TASK_DELETE = exports.TASK_DELETE = "TASK_DELETE";
var TASK_CREATE_BREAD = exports.TASK_CREATE_BREAD = "TASK_CREATE_BREAD";
var TASK_UPDATE_STATE = exports.TASK_UPDATE_STATE = "TASK_UPDATE_STATE";
var CALCULATE_PROJECT = exports.CALCULATE_PROJECT = "CALCULATE_PROJECT";
var CALCULATE_TASK_TABLE = exports.CALCULATE_TASK_TABLE = "CALCULATE_TASK_TABLE";
var PROJECT_COUNT = exports.PROJECT_COUNT = "PROJECT_COUNT";
var REFRESH_TIME = exports.REFRESH_TIME = "REFRESH_TIME";
var FILES_LIST = exports.FILES_LIST = "FILES_LIST";
var CALCULATE_TEAM = exports.CALCULATE_TEAM = "CALCULATE_TEAM";
var TASKINFO_REFRESH = exports.TASKINFO_REFRESH = "TASKINFO_REFRESH";
var TASK_CUIBAN = exports.TASK_CUIBAN = "TASK_CUIBAN";
var TASK_SEARCH_OBJECT = exports.TASK_SEARCH_OBJECT = "TASK_SEARCH_OBJECT";
var SELECTED_PROS = exports.SELECTED_PROS = "SELECTED_PROS";
var SELECTED_TAG = exports.SELECTED_TAG = "SELECTED_TAG";
var NOW_PAGE = exports.NOW_PAGE = "NOW_PAGE";
var SELECTED_USERS = exports.SELECTED_USERS = "SELECTED_USERS";
function content(data, type) {
  return {
    type: type,
    payload: data
  };
}
//保存选择后的人员信息

function setSelectedUsers(data) {
  return {
    type: SELECTED_USERS,
    payload: data
  };
}
//保存筛选选中的tag
function setNowPage(data) {
  return {
    type: NOW_PAGE,
    payload: data
  };
}
//保存筛选选中的tag
function setSelectedTag(data) {
  return {
    type: SELECTED_TAG,
    payload: data
  };
}
//保存筛选选中的project
function setSelectedPros(data) {
  return {
    type: SELECTED_PROS,
    payload: data
  };
}
//任务搜索对象
function setTaskSearchObject(data) {
  return {
    type: TASK_SEARCH_OBJECT,
    payload: data
  };
}
// 首页数据
function findHomeDataByPageSize() {
  var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 6;
  var fn = arguments[1];

  return function (dispatch) {
    _httpClient2.default.AjaxPost("/taskHome/findMyResponseTask?pageSize=" + size, "", function (list) {
      if (fn) {
        fn();
      }
      dispatch(content(list, HOME_DATA));
    });
  };
}

// 免登录里面用的 钉钉跳转页面选中
function getDingMessageDetails(taskinfoId) {
  return function (dispatch) {
    _httpClient2.default.AjaxPost("/taskinfo/getDingMessageDetails?taskinfoId=" + taskinfoId, "", function (list) {
      dispatch(content(list, DINGTAK_MESSAGE_DELETE));
    });
  };
}

// 免登录里面用的 选中任务id
function selectTaskinfoId(id) {
  return {
    type: TASKINFO_ID,
    payload: id
  };
}

// 免登录里面用的 不知道干嘛的
function backFn(type) {
  return {
    type: BACK_FN,
    payload: type
  };
}

// 邀请关注
function attentionUsers(taskId, users, callback) {
  var data = {
    objectId: taskId,
    rtype: "b",
    users: users
  };
  _httpClient2.default.AjaxPost("/collect/inviteAttention", data, function (list) {
    callback(list);
  });
}

// 获取任务详情数据
function getTaskDetailsById(id, fn) {
  return function (dispatch) {
    _httpClient2.default.AjaxPost("/taskinfo/findByTaskinfoId?id=" + id, "", function (list) {
      if (fn) {
        fn();
      }
      dispatch(content(list, TASK_DETAILS));
    });
  };
}
// 获取任务详情数据为了获取保存后的数据
function getTaskDetailsById2(id, fn) {
  return function (dispatch) {
    _httpClient2.default.AjaxPost("/taskinfo/findTaskinById?id=" + id, {}, function (list) {
      if (fn) {
        fn(list);
      }
    });
  };
}
// 首页获取任务详情数据
function getTaskDetailsByIds(id, callback) {
  _httpClient2.default.AjaxPost("/taskinfo/findByTaskinfoId?id=" + id, "", function (list) {
    callback(list);
  });
}
// // 首页获取任务详情数据(查出来的同列表数据格式，为了更新缓存用)
// export function getTaskDetailsByIdsNew(id, callback) {
// 	HttpClient.AjaxPost("/taskinfo/findTaskinById?id=" + id, "", list => {
// 		callback(list);
// 	});
// }

//获取子任务数据
function getChildListById(id, fn) {
  return function (dispatch) {
    _httpClient2.default.AjaxPost("/taskinfo/findChildTaskinfo?id=" + id, "", function (list) {
      if (fn) {
        fn();
      }
      dispatch(content(list, TASK_CHILD_LIST_BY_ID));
    });
  };
}
// 关注项目
function addAttentionWitchProject(objectId, fn) {
  var data = { rtype: "b", objectId: objectId };
  return function (dispatch) {
    _httpClient2.default.AjaxPost("/collect/collect", data, function (list) {
      if (fn) {
        fn(list);
      }
    });
  };
}
// 取消关注项目
function cancelAttentionWitchProject(objectId, fn) {
  var data = { rtype: "b", objectId: objectId };
  return function (dispatch) {
    _httpClient2.default.AjaxPost("/collect/callCollect", data, function (list) {
      if (fn) {
        fn(list);
      }
    });
  };
}
//获取协作任务数据
function getReLevanceTaskListById(id, fn) {
  return function (dispatch) {
    _httpClient2.default.AjaxPost("/taskinfo/findreLevanceTaskinfo?id=" + id, "", function (list) {
      if (fn) {
        fn();
      }
      dispatch(content(list, TASK_RELEVANCE_LIST_BY_ID));
    });
  };
}

//获取文任务所有文件
function getTaskFilesListById(id, fn) {
  return function (dispatch) {
    _httpClient2.default.AjaxPost("/taskinfo/findTaskinfoFiles?tId=" + id, "", function (list) {
      if (fn) {
        fn();
      }
      dispatch(content(list, TASK_FILES_LIST_BY_ID));
    });
  };
}

//修改任务 统一保存修改的信息
function updateTaskinfo(taskinfo, fn) {
  return function (dispatch) {
    _httpClient2.default.AjaxPost("/taskinfo/updateMoreIndex", taskinfo, function (list) {
      if (fn) {
        fn(list);
      }
      dispatch(content(list, TASK_TASKINFO_UPDATE));
    });
  };
}

// 上传文件
/*
 * type: 0描述附件 1评论文件 3成果文件
 * */
function upFilesByType(taskId, type, fileObj, fn) {
  return function (dispatch) {
    _httpClient2.default.AjaxPost("/files/uploadingMobileImg?projectId=" + taskId + "&type=" + type, fileObj, function (list) {
      if (fn) {
        fn();
      }
      dispatch(content(list, TASKINFO_UPLOADING));
    });
  };
}

// 删除文件
function deleteFileByType(id, fn) {
  return function (dispatch) {
    _httpClient2.default.AjaxPost("/files/deleteFile?id=" + id, [], function (list) {
      if (fn) {
        fn();
      }
      dispatch(content(list, TASK_FILES_DELETE));
    });
  };
}

// 添加评论  移动版状态 category 是 1
function addTalkByTaskId(id, description, files, replyUserId, fn) {
  return function (dispatch) {
    _httpClient2.default.AjaxPost("/leave/addLeave", {
      description: description,
      taskinfo: { id: id },
      reply: { id: replyUserId },
      filesMobile: files,
      category: "1"
    }, function (list) {
      if (fn) {
        fn();
      }
      dispatch(content(list, TASK_ADD_TALK));
    });
  };
}

// 删除评论
function deleteTalkById(id, fn) {
  return function (dispatch) {
    _httpClient2.default.AjaxPost("/leave/deleteLeave?id=" + id, "", function (list) {
      if (fn) {
        fn();
      }
      dispatch(content(list, TASK_DELETE_TALK));
    });
  };
}

// 创建任务
function createTask(proId, parId, taskinfo, fn) {
  return function (dispatch) {
    _httpClient2.default.AjaxPost("/taskinfo/addTaskinfo?progectId=" + proId + "&pid=" + parId, taskinfo, function (list) {
      if (fn) {
        fn(list);
      }
      dispatch(content(list, TASK_CREATE));
    });
  };
}

// 获取任务的优先级 列表
function getPriorityList(fn) {
  return function (dispatch) {
    _httpClient2.default.AjaxPost("/taskinfo/findCommonData", "", function (list) {
      if (fn) {
        fn();
      }
      dispatch(content(list, TASK_PRIORITY_LIST));
    });
  };
}

// 获取项目的任务列表
function getTaskListByPro(proID, taskID) {
  var pageNo = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  var pageSize = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 50;
  var fn = arguments[4];

  return function (dispatch) {
    _httpClient2.default.AjaxPostSync("/taskinfo/findTreePageList?progectId=" + proID + "&pId=" + taskID + "&pageNo=" + pageNo + "&pageSize=" + pageSize, {}, function (list) {
      if (fn) {
        fn();
      }
      dispatch(content(list, TASKINFO_TASK_BY_PRO_LIST));
    });
  };
}

// 创建任务 临时存储用户录入的值,防止用户返回到创建任务页面，数据没了的情况
function setCreateTaskVals(task) {
  return {
    type: TASK_CREATE_VALS,
    payload: task
  };
}

// 删除任务
function deleteTaskById(id, fn) {
  return function (dispatch) {
    _httpClient2.default.AjaxPost("/taskinfo/deleteTaskinfo?id=" + id, "", function (list) {
      if (fn) {
        fn();
      }
      dispatch(content(list, TASK_DELETE));
    });
  };
}

// 更新任务状态
/* data  = {id:'',projectId:'',state:'',description:'',mobileFile:[]}
 * 确认驳回0，确认通过1，标记完成1，认领0，终止4，重启0
 * */
function updateTaskStateById(data, fn) {
  return function (dispatch) {
    _httpClient2.default.AjaxPost("/taskinfo/updateStateIndex", data, function (list) {
      if (fn) {
        fn();
      }
      dispatch(content(list, TASK_UPDATE_STATE));
    });
  };
}
// 更新任务状态不存储到reduce

function updateTaskStateById2(data, fn) {
  _httpClient2.default.AjaxPost("/taskinfo/updateStateIndex", data, function (list) {
    if (fn) {
      fn(list);
    }
  });
}
// 设置添加子任务的面包屑
function setTaskCreateBread(data) {
  return {
    type: TASK_CREATE_BREAD,
    payload: data
  };
}
//初始化任务数据
function projectCount(list) {
  return {
    type: PROJECT_COUNT,
    payload: list
  };
}
//获取项目统计数据
function getProjectCount(id, fn) {
  return function (dispatch) {
    _httpClient2.default.AjaxPost("/calculate/project?id=" + id, "", function (list) {
      if (fn) {
        fn();
      }
      dispatch(content(list, CALCULATE_PROJECT));
    });
  };
}
//获取列表统计数据
function getTasktableData(data, fn) {
  return function (dispatch) {
    _httpClient2.default.AjaxPost("/calculate/getTasktableData", data, function (list) {
      if (fn) {
        fn();
      }
      dispatch(content(list, CALCULATE_TASK_TABLE));
    });
  };
}

//刷新团队
function refreshTime() {
  var sign = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

  return {
    type: REFRESH_TIME,
    payload: sign
  };
}
//获取任务文件
function getTaskFileByPro(projectId, parentId, pageSize, pageNo, fn) {
  return function (dispatch) {
    _httpClient2.default.AjaxPost("/files/fileIdexList?projectId=" + projectId + "&parentId=" + parentId + "&pageSize=" + pageSize + "&pageNo=" + pageNo, [], function (list) {
      if (fn) fn();
      dispatch(content(list, FILES_LIST));
    });
  };
}

function getTaskListByCondition(pageNo, pageSize, data, callback) {
  _httpClient2.default.AjaxPost("/taskHome/taskIniNew?pageNo=" + pageNo + "&pageSize=" + pageSize, data, function (list) {
    callback(list);
  });
}

//获取任务文件 - 新版
function getFileListByProjectId(projectId, parentId) {
  var pageSize = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 50;
  var pageNo = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
  var fileName = arguments[4];
  var callback = arguments[5];

  _httpClient2.default.AjaxPost("/files/fileIdexListNew?projectId=" + projectId + "&parentId=" + parentId + "&fileName=" + fileName + "&pageSize=" + pageSize + "&pageNo=" + pageNo, {}, function (list) {
    callback(list);
  });
}

//列表统计
function teamStatistics() {
  var pageSize = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;
  var pageNo = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var userName = arguments[2];
  var realityBeginTime = arguments[3];
  var realityEndTime = arguments[4];
  var projectId = arguments[5];

  return function (dispatch) {
    _httpClient2.default.AjaxPost("/calculate/teamStatistics?pageSize=" + pageSize + "&pageNo=" + pageNo + "&realityBeginTime=" + realityBeginTime + "&realityEndTime=" + realityEndTime + "&projectId=" + projectId, userName, function (list) {
      dispatch(content(list, CALCULATE_TEAM));
    });
  };
}
/**
 * 刷新任务树数据
 * @param {*} sign  是否刷新
 * @param {*} id  加载的id
 * @param {*} type  刷新类型， type 整个树都是刷新, alone 只刷新当前修改的元素
 */
function refreshTaskinfo() {
  var sign = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
  var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "all";

  return {
    type: TASKINFO_REFRESH,
    payload: { sign: sign, id: id, type: type }
  };
}
//催办任务
function expedite(data, tid, type, fn) {
  /*id:被催办的任务id, tid:详情的任务id, type:1 子任务,2:前序任务*/
  return function (dispatch) {
    _httpClient2.default.AjaxPost("/taskinfo/expedite?tid=" + tid + "&type=" + type, data, function (list) {
      if (fn) fn();
      dispatch(content(list, TASK_CUIBAN));
    });
  };
}

// 催办子任务
function cuibanChildTask(id, callback) {
  // id: 父任务ID
  _httpClient2.default.AjaxPost("/taskinfo/expediteSonTask", { id: id }, function (list) {
    callback(list);
  });
}