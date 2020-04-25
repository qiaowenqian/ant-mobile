"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PROJECT_NOW_PAGE = exports.PROJECT_TAGLIST = exports.PROJECT_CONDITION = exports.HOMESCROLLTOP = exports.DYNAMICSCROLLTOP = exports.PROJECTTASKSCROLL = exports.PROJECTTASKALLCOUNT = exports.PROJECTTASKLIST = exports.PROJECTALLCOUNT = exports.PROJECTSCROLL = exports.PROJECTTYPE = exports.PROJECTTEXT = exports.TASKCONDITION = exports.TASKSCROLLTOP = exports.TASKPAGECOUNTDEL = exports.TASKTEXTDEL = exports.SET_TASKCOUNTDEL = exports.TASKCOUNTDEL = exports.EDIT_TASKLISTDEL = exports.ADD_TASKLISTDEL = exports.SET_TASKLISTDEL = exports.TASKLISTDEL = exports.TASKTEXT = exports.DYNAMICPAGECOUNT = exports.PROJECTPAGECOUNT = exports.TASKPAGECOUNT = exports.TASKCOUNT = exports.DYNAMICLIST = exports.SET_PROJECTLIST = exports.PROJECTLIST = exports.TASKLIST = undefined;
exports.content = content;
exports.saveProjectNowPageAtCache = saveProjectNowPageAtCache;
exports.saveProjectTagListAtCache = saveProjectTagListAtCache;
exports.saveProjectConditionAtCache = saveProjectConditionAtCache;
exports.saveTaskListAtCache = saveTaskListAtCache;
exports.saveTaskCountAtCache = saveTaskCountAtCache;
exports.saveTaskTextAtCache = saveTaskTextAtCache;
exports.saveTaskPageCountAtCache = saveTaskPageCountAtCache;
exports.saveTaskLisToDateltAtCache = saveTaskLisToDateltAtCache;
exports.setTaskLisToDateltAtCache = setTaskLisToDateltAtCache;
exports.addTaskLisToDateltAtCache = addTaskLisToDateltAtCache;
exports.editTaskLisToDateltAtCache = editTaskLisToDateltAtCache;
exports.saveTaskCountToDatelAtCache = saveTaskCountToDatelAtCache;
exports.setTaskCountToDatelAtCache = setTaskCountToDatelAtCache;
exports.saveTaskTextToDatelAtCache = saveTaskTextToDatelAtCache;
exports.saveTaskPageCountToDatelAtCache = saveTaskPageCountToDatelAtCache;
exports.saveTaskScrollTopAtCache = saveTaskScrollTopAtCache;
exports.saveHomeScrollTop = saveHomeScrollTop;
exports.saveDynamicScrollTop = saveDynamicScrollTop;
exports.saveTaskConditionAtCache = saveTaskConditionAtCache;
exports.saveProjectListAtCache = saveProjectListAtCache;
exports.setUpdataProjectListAtCache = setUpdataProjectListAtCache;
exports.saveProjectTextAtCache = saveProjectTextAtCache;
exports.saveProjectTypeAtCache = saveProjectTypeAtCache;
exports.saveProjectScrollAtCache = saveProjectScrollAtCache;
exports.saveProjectAllCountAtCache = saveProjectAllCountAtCache;
exports.saveProjectPageCountAtCache = saveProjectPageCountAtCache;
exports.saveProjectTaskList = saveProjectTaskList;
exports.saveProjectTaskAllCount = saveProjectTaskAllCount;
exports.saveProjectTaskScroll = saveProjectTaskScroll;
exports.saveDynamicListAtCache = saveDynamicListAtCache;
exports.saveDynamicPageCountAtCache = saveDynamicPageCountAtCache;

var _httpClient = require("../api/httpClient");

var _httpClient2 = _interopRequireDefault(_httpClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TASKLIST = exports.TASKLIST = "TASKLIST";
// export const UPDATE_TASKLIST = "UPDATE_TASKLIST";
var PROJECTLIST = exports.PROJECTLIST = "PROJECTLIST";
var SET_PROJECTLIST = exports.SET_PROJECTLIST = "SET_PROJECTLIST";
var DYNAMICLIST = exports.DYNAMICLIST = "DYNAMICLIST";
var TASKCOUNT = exports.TASKCOUNT = "TASKCOUNT";
var TASKPAGECOUNT = exports.TASKPAGECOUNT = "TASKPAGECOUNT";
var PROJECTPAGECOUNT = exports.PROJECTPAGECOUNT = "PROJECTPAGECOUNT";
var DYNAMICPAGECOUNT = exports.DYNAMICPAGECOUNT = "DYNAMICPAGECOUNT";
var TASKTEXT = exports.TASKTEXT = "TASKTEXT";
var TASKLISTDEL = exports.TASKLISTDEL = "TASKLISTDEL";
var SET_TASKLISTDEL = exports.SET_TASKLISTDEL = "SET_TASKLISTDEL";
var ADD_TASKLISTDEL = exports.ADD_TASKLISTDEL = "ADD_TASKLISTDEL";
var EDIT_TASKLISTDEL = exports.EDIT_TASKLISTDEL = "EDIT_TASKLISTDEL";

var TASKCOUNTDEL = exports.TASKCOUNTDEL = "TASKCOUNTDEL";
var SET_TASKCOUNTDEL = exports.SET_TASKCOUNTDEL = "SET_TASKCOUNTDEL";
var TASKTEXTDEL = exports.TASKTEXTDEL = "TASKTEXTDEL";
var TASKPAGECOUNTDEL = exports.TASKPAGECOUNTDEL = "TASKPAGECOUNTDEL";
var TASKSCROLLTOP = exports.TASKSCROLLTOP = "TASKSCROLLTOP";
var TASKCONDITION = exports.TASKCONDITION = "TASKCONDITION";
var PROJECTTEXT = exports.PROJECTTEXT = "PROJECTTEXT";
var PROJECTTYPE = exports.PROJECTTYPE = "PROJECTTYPE";
var PROJECTSCROLL = exports.PROJECTSCROLL = "PROJECTSCROLL";
var PROJECTALLCOUNT = exports.PROJECTALLCOUNT = "PROJECTALLCOUNT";
var PROJECTTASKLIST = exports.PROJECTTASKLIST = "PROJECTTASKLIST";
var PROJECTTASKALLCOUNT = exports.PROJECTTASKALLCOUNT = "PROJECTTASKALLCOUNT";
var PROJECTTASKSCROLL = exports.PROJECTTASKSCROLL = "PROJECTTASKSCROLL";
var DYNAMICSCROLLTOP = exports.DYNAMICSCROLLTOP = "DYNAMICSCROLLTOP";
var HOMESCROLLTOP = exports.HOMESCROLLTOP = "HOMESCROLLTOP";
var PROJECT_CONDITION = exports.PROJECT_CONDITION = "PROJECT_CONDITION";
var PROJECT_TAGLIST = exports.PROJECT_TAGLIST = "PROJECT_TAGLIST";
var PROJECT_NOW_PAGE = exports.PROJECT_NOW_PAGE = "PROJECT_NOW_PAGE";
function content(data, type) {
  return {
    type: type,
    payload: data
  };
}
//保存当前的页码
function saveProjectNowPageAtCache(data) {
  return {
    type: "PROJECT_NOW_PAGE",
    payload: data
  };
}
//选择的标签详细信息作为回显用
function saveProjectTagListAtCache(data) {
  return {
    type: "PROJECT_TAGLIST",
    payload: data
  };
}
//项目筛选条件
function saveProjectConditionAtCache(data) {
  return {
    type: "PROJECT_CONDITION",
    payload: data
  };
}
// 任务列表 第一页缓存数据
function saveTaskListAtCache(data) {
  return {
    type: TASKLIST,
    payload: data
  };
}
// //任务列表创建删除更新列表
// export function updateTaskListAtCache(data) {
// 	return {
// 		type: UPDATE_TASKLIST,
// 		payload: data
// 	};
// }

// 任务列表 总条数
function saveTaskCountAtCache(data) {
  return {
    type: TASKCOUNT,
    payload: data
  };
}
//任务搜索条件
function saveTaskTextAtCache(data) {
  return {
    type: TASKTEXT,
    payload: data
  };
}

// 任务列表 总页数
function saveTaskPageCountAtCache(data) {
  return {
    type: TASKPAGECOUNT,
    payload: data
  };
}
// 任务列表 跳转任务详情缓存数据
function saveTaskLisToDateltAtCache(data) {
  return {
    type: TASKLISTDEL,
    payload: data
  };
}
// 删除后更新任务列表
function setTaskLisToDateltAtCache(id) {
  return {
    type: SET_TASKLISTDEL,
    payload: id
  };
}
// 增加后更新任务列表
function addTaskLisToDateltAtCache(data) {
  return {
    type: ADD_TASKLISTDEL,
    payload: data
  };
}
// 编辑后更新任务列表
function editTaskLisToDateltAtCache(data) {
  return {
    type: EDIT_TASKLISTDEL,
    payload: data
  };
}
// 任务列表 跳转任务详情总条数
function saveTaskCountToDatelAtCache(data) {
  return {
    type: TASKCOUNTDEL,
    payload: data
  };
}
// 任务列表 删除后变更总条数
function setTaskCountToDatelAtCache(data) {
  return {
    type: SET_TASKCOUNTDEL,
    payload: data
  };
}
//任务搜索条件 跳转任务详情后的搜索缓存
function saveTaskTextToDatelAtCache(data) {
  return {
    type: TASKTEXTDEL,
    payload: data
  };
}
// 任务列表 跳转任务详情的总页数
function saveTaskPageCountToDatelAtCache(data) {
  return {
    type: TASKPAGECOUNTDEL,
    payload: data
  };
}
//滚动条高度 跳转任务详情后的
function saveTaskScrollTopAtCache(data) {
  return {
    type: TASKSCROLLTOP,
    payload: data
  };
}

function saveHomeScrollTop(data) {
  return {
    type: HOMESCROLLTOP,
    payload: data
  };
}
function saveDynamicScrollTop(data) {
  return {
    type: DYNAMICSCROLLTOP,
    payload: data
  };
}

//任务列表筛选条件 跳转任务详情后
function saveTaskConditionAtCache(data) {
  return {
    type: TASKCONDITION,
    payload: data
  };
}
// 项目列表 第一页缓存数据
function saveProjectListAtCache(data) {
  return {
    type: PROJECTLIST,
    payload: data
  };
}
//项目列表 更新项目列表数据
function setUpdataProjectListAtCache(data) {
  return {
    type: SET_PROJECTLIST,
    payload: data
  };
}

//项目列表搜索条件 缓存数据
function saveProjectTextAtCache(data) {
  return {
    type: PROJECTTEXT,
    payload: data
  };
}
//项目列表菜单筛选条件 缓存数据
function saveProjectTypeAtCache(data) {
  return {
    type: PROJECTTYPE,
    payload: data
  };
}
//项目列表滚动条 缓存数据
function saveProjectScrollAtCache(data) {
  return {
    type: PROJECTSCROLL,
    payload: data
  };
}
// 项目列表跳转项目详情 总页数
function saveProjectAllCountAtCache(data) {
  return {
    type: PROJECTALLCOUNT,
    payload: data
  };
}
// 项目列表 总页数
function saveProjectPageCountAtCache(data) {
  return {
    type: PROJECTPAGECOUNT,
    payload: data
  };
}
//项目详情 任务列表
function saveProjectTaskList(data) {
  return {
    type: PROJECTTASKLIST,
    payload: data
  };
}
//项目详情 任务列表总页数
function saveProjectTaskAllCount(data) {
  return {
    type: PROJECTTASKALLCOUNT,
    payload: data
  };
}
//项目详情 任务列表滚动条高度
function saveProjectTaskScroll(data) {
  return {
    type: PROJECTTASKSCROLL,
    payload: data
  };
}
// 动态列表 第一页缓存数据
function saveDynamicListAtCache(data) {
  return {
    type: DYNAMICLIST,
    payload: data
  };
}

// 动态列表 总页数
function saveDynamicPageCountAtCache(data) {
  return {
    type: DYNAMICPAGECOUNT,
    payload: data
  };
}