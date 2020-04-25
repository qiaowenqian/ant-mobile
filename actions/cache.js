import HttpClient from "../api/httpClient";
export const TASKLIST = "TASKLIST";
// export const UPDATE_TASKLIST = "UPDATE_TASKLIST";
export const PROJECTLIST = "PROJECTLIST";
export const SET_PROJECTLIST = "SET_PROJECTLIST";
export const DYNAMICLIST = "DYNAMICLIST";
export const TASKCOUNT = "TASKCOUNT";
export const TASKPAGECOUNT = "TASKPAGECOUNT";
export const PROJECTPAGECOUNT = "PROJECTPAGECOUNT";
export const DYNAMICPAGECOUNT = "DYNAMICPAGECOUNT";
export const TASKTEXT = "TASKTEXT";
export const TASKLISTDEL = "TASKLISTDEL";
export const SET_TASKLISTDEL = "SET_TASKLISTDEL";
export const ADD_TASKLISTDEL = "ADD_TASKLISTDEL";
export const EDIT_TASKLISTDEL = "EDIT_TASKLISTDEL";

export const TASKCOUNTDEL = "TASKCOUNTDEL";
export const SET_TASKCOUNTDEL = "SET_TASKCOUNTDEL";
export const TASKTEXTDEL = "TASKTEXTDEL";
export const TASKPAGECOUNTDEL = "TASKPAGECOUNTDEL";
export const TASKSCROLLTOP = "TASKSCROLLTOP";
export const TASKCONDITION = "TASKCONDITION";
export const PROJECTTEXT = "PROJECTTEXT";
export const PROJECTTYPE = "PROJECTTYPE";
export const PROJECTSCROLL = "PROJECTSCROLL";
export const PROJECTALLCOUNT = "PROJECTALLCOUNT";
export const PROJECTTASKLIST = "PROJECTTASKLIST";
export const PROJECTTASKALLCOUNT = "PROJECTTASKALLCOUNT";
export const PROJECTTASKSCROLL = "PROJECTTASKSCROLL";
export const DYNAMICSCROLLTOP = "DYNAMICSCROLLTOP";
export const HOMESCROLLTOP = "HOMESCROLLTOP";
export const PROJECT_CONDITION = "PROJECT_CONDITION";
export const PROJECT_TAGLIST = "PROJECT_TAGLIST";
export const PROJECT_NOW_PAGE = "PROJECT_NOW_PAGE";
export function content(data, type) {
  return {
    type: type,
    payload: data
  };
}
//保存当前的页码
export function saveProjectNowPageAtCache(data) {
  return {
    type: "PROJECT_NOW_PAGE",
    payload: data
  };
}
//选择的标签详细信息作为回显用
export function saveProjectTagListAtCache(data) {
  return {
    type: "PROJECT_TAGLIST",
    payload: data
  };
}
//项目筛选条件
export function saveProjectConditionAtCache(data) {
  return {
    type: "PROJECT_CONDITION",
    payload: data
  };
}
// 任务列表 第一页缓存数据
export function saveTaskListAtCache(data) {
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
export function saveTaskCountAtCache(data) {
  return {
    type: TASKCOUNT,
    payload: data
  };
}
//任务搜索条件
export function saveTaskTextAtCache(data) {
  return {
    type: TASKTEXT,
    payload: data
  };
}

// 任务列表 总页数
export function saveTaskPageCountAtCache(data) {
  return {
    type: TASKPAGECOUNT,
    payload: data
  };
}
// 任务列表 跳转任务详情缓存数据
export function saveTaskLisToDateltAtCache(data) {
  return {
    type: TASKLISTDEL,
    payload: data
  };
}
// 删除后更新任务列表
export function setTaskLisToDateltAtCache(id) {
  return {
    type: SET_TASKLISTDEL,
    payload: id
  };
}
// 增加后更新任务列表
export function addTaskLisToDateltAtCache(data) {
  return {
    type: ADD_TASKLISTDEL,
    payload: data
  };
}
// 编辑后更新任务列表
export function editTaskLisToDateltAtCache(data) {
  return {
    type: EDIT_TASKLISTDEL,
    payload: data
  };
}
// 任务列表 跳转任务详情总条数
export function saveTaskCountToDatelAtCache(data) {
  return {
    type: TASKCOUNTDEL,
    payload: data
  };
}
// 任务列表 删除后变更总条数
export function setTaskCountToDatelAtCache(data) {
  return {
    type: SET_TASKCOUNTDEL,
    payload: data
  };
}
//任务搜索条件 跳转任务详情后的搜索缓存
export function saveTaskTextToDatelAtCache(data) {
  return {
    type: TASKTEXTDEL,
    payload: data
  };
}
// 任务列表 跳转任务详情的总页数
export function saveTaskPageCountToDatelAtCache(data) {
  return {
    type: TASKPAGECOUNTDEL,
    payload: data
  };
}
//滚动条高度 跳转任务详情后的
export function saveTaskScrollTopAtCache(data) {
  return {
    type: TASKSCROLLTOP,
    payload: data
  };
}

export function saveHomeScrollTop(data) {
  return {
    type: HOMESCROLLTOP,
    payload: data
  };
}
export function saveDynamicScrollTop(data) {
  return {
    type: DYNAMICSCROLLTOP,
    payload: data
  };
}

//任务列表筛选条件 跳转任务详情后
export function saveTaskConditionAtCache(data) {
  return {
    type: TASKCONDITION,
    payload: data
  };
}
// 项目列表 第一页缓存数据
export function saveProjectListAtCache(data) {
  return {
    type: PROJECTLIST,
    payload: data
  };
}
//项目列表 更新项目列表数据
export function setUpdataProjectListAtCache(data) {
  return {
    type: SET_PROJECTLIST,
    payload: data
  };
}

//项目列表搜索条件 缓存数据
export function saveProjectTextAtCache(data) {
  return {
    type: PROJECTTEXT,
    payload: data
  };
}
//项目列表菜单筛选条件 缓存数据
export function saveProjectTypeAtCache(data) {
  return {
    type: PROJECTTYPE,
    payload: data
  };
}
//项目列表滚动条 缓存数据
export function saveProjectScrollAtCache(data) {
  return {
    type: PROJECTSCROLL,
    payload: data
  };
}
// 项目列表跳转项目详情 总页数
export function saveProjectAllCountAtCache(data) {
  return {
    type: PROJECTALLCOUNT,
    payload: data
  };
}
// 项目列表 总页数
export function saveProjectPageCountAtCache(data) {
  return {
    type: PROJECTPAGECOUNT,
    payload: data
  };
}
//项目详情 任务列表
export function saveProjectTaskList(data) {
  return {
    type: PROJECTTASKLIST,
    payload: data
  };
}
//项目详情 任务列表总页数
export function saveProjectTaskAllCount(data) {
  return {
    type: PROJECTTASKALLCOUNT,
    payload: data
  };
}
//项目详情 任务列表滚动条高度
export function saveProjectTaskScroll(data) {
  return {
    type: PROJECTTASKSCROLL,
    payload: data
  };
}
// 动态列表 第一页缓存数据
export function saveDynamicListAtCache(data) {
  return {
    type: DYNAMICLIST,
    payload: data
  };
}

// 动态列表 总页数
export function saveDynamicPageCountAtCache(data) {
  return {
    type: DYNAMICPAGECOUNT,
    payload: data
  };
}
