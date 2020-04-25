import HttpClient from "../api/httpClient";
export const HOME_DATA = "HOME_DATA";
export const DINGTAK_MESSAGE_DELETE = "DINGTAK_MESSAGE_DELETE";
export const TASKINFO_ID = "TASKINFO_ID";
export const BACK_FN = "BACK_FN";
export const TASK_LIST_BY_CONDITION = "TASK_LIST_BY_CONDITION";
export const TASK_DETAILS = "TASK_DETAILS";
export const TASK_CHILD_LIST_BY_ID = "TASK_CHILD_LIST_BY_ID";
export const TASK_RELEVANCE_LIST_BY_ID = "TASK_RELEVANCE_LIST_BY_ID";
export const TASK_FILES_LIST_BY_ID = "TASK_FILES_LIST_BY_ID";
export const TASK_TASKINFO_UPDATE = "TASK_TASKINFO_UPDATE";
export const TASKINFO_UPLOADING = "TASKINFO_UPLOADING";
export const TASK_FILES_DELETE = "TASK_FILES_DELETE";
export const TASK_ADD_TALK = "TASK_ADD_TALK";
export const TASK_DELETE_TALK = "TASK_DELETE_TALK";
export const TASK_CREATE = "TASK_CREATE";
export const TASK_PRIORITY_LIST = "TASK_PRIORITY_LIST";
export const TASKINFO_TASK_BY_PRO_LIST = "TASKINFO_TASK_BY_PRO_LIST";
export const TASK_CREATE_VALS = "TASK_CREATE_VALS";
export const TASK_DELETE = "TASK_DELETE";
export const TASK_CREATE_BREAD = "TASK_CREATE_BREAD";
export const TASK_UPDATE_STATE = "TASK_UPDATE_STATE";
export const CALCULATE_PROJECT = "CALCULATE_PROJECT";
export const CALCULATE_TASK_TABLE = "CALCULATE_TASK_TABLE";
export const PROJECT_COUNT = "PROJECT_COUNT";
export const REFRESH_TIME = "REFRESH_TIME";
export const FILES_LIST = "FILES_LIST";
export const CALCULATE_TEAM = "CALCULATE_TEAM";
export const TASKINFO_REFRESH = "TASKINFO_REFRESH";
export const TASK_CUIBAN = "TASK_CUIBAN";
export const TASK_SEARCH_OBJECT = "TASK_SEARCH_OBJECT";
export const SELECTED_PROS = "SELECTED_PROS";
export const SELECTED_TAG = "SELECTED_TAG";
export const NOW_PAGE = "NOW_PAGE";
export const SELECTED_USERS = "SELECTED_USERS";
export const REPEAT_TASKINFO = "REPEAT_TASKINFO";
export function content(data, type) {
  return {
    type: type,
    payload: data
  };
}
//创建重复任务
export function createRepeatTask(proId, obj, fn) {
  return dispatch => {
    HttpClient.AjaxPost(
      "/cycleTask/cycleTaskinfo?projectId=" + proId,
      obj,
      data => {
        if (data.success || data.data) {
          if (fn) {
            fn(data.data);
          }
        } else {
          if (fn) {
            fn(data.errmsg, 1);
          }
        }
      }
    );
  };
}
//保存选择后的人员信息

export function setSelectedUsers(data) {
  return {
    type: SELECTED_USERS,
    payload: data
  };
}
//保存筛选选中的tag
export function setNowPage(data) {
  return {
    type: NOW_PAGE,
    payload: data
  };
}
//保存任务详情创建计划时传递的taskDetail 的数据
export function setReapactTaskinfo(data) {
  return dispatch => {
    dispatch(content(data, REPEAT_TASKINFO));
  };
}
//保存筛选选中的tag
export function setSelectedTag(data) {
  return {
    type: SELECTED_TAG,
    payload: data
  };
}
//保存筛选选中的project
export function setSelectedPros(data) {
  return {
    type: SELECTED_PROS,
    payload: data
  };
}
//任务搜索对象
export function setTaskSearchObject(data) {
  return {
    type: TASK_SEARCH_OBJECT,
    payload: data
  };
}
// 首页数据
export function findHomeDataByPageSize(size = 6, fn) {
  HttpClient.AjaxPost(
    "/taskHome/findMyResponseTask?pageSize=" + size,
    "",
    list => {
      if (fn) {
        fn(list.data);
      }
    }
  );
}

// 免登录里面用的 钉钉跳转页面选中
export function getDingMessageDetails(taskinfoId) {
  return dispatch => {
    HttpClient.AjaxPost(
      "/taskinfo/getDingMessageDetails?taskinfoId=" + taskinfoId,
      "",
      list => {
        dispatch(content(list, DINGTAK_MESSAGE_DELETE));
      }
    );
  };
}

// 免登录里面用的 选中任务id
export function selectTaskinfoId(id) {
  return {
    type: TASKINFO_ID,
    payload: id
  };
}

// 免登录里面用的 不知道干嘛的
export function backFn(type) {
  return {
    type: BACK_FN,
    payload: type
  };
}

// 邀请关注
export function attentionUsers(taskId, users, callback) {
  const data = {
    objectId: taskId,
    rtype: "b",
    users: users
  };
  HttpClient.AjaxPost("/collect/inviteAttention", data, list => {
    callback(list);
  });
}

// 获取任务详情数据
export function getTaskDetailsById(id, fn) {
  return dispatch => {
    HttpClient.AjaxPost("/taskinfo/findByTaskinfoId?id=" + id, "", list => {
      if (fn) {
        fn();
      }
      dispatch(content(list, TASK_DETAILS));
    });
  };
}
// 获取任务详情数据为了获取保存后的数据
export function getTaskDetailsById2(id, fn) {
  return dispatch => {
    HttpClient.AjaxPost("/taskinfo/findTaskinById?id=" + id, {}, list => {
      if (fn) {
        fn(list);
      }
    });
  };
}
// 首页获取任务详情数据
export function getTaskDetailsByIds(id, callback) {
  HttpClient.AjaxPost("/taskinfo/findByTaskinfoId?id=" + id, "", list => {
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
export function getChildListById(id, fn) {
  return dispatch => {
    HttpClient.AjaxPost("/taskinfo/findChildTaskinfo?id=" + id, "", list => {
      if (fn) {
        fn();
      }
      dispatch(content(list, TASK_CHILD_LIST_BY_ID));
    });
  };
}
// 关注项目
export function addAttentionWitchProject(objectId, fn) {
  const data = { rtype: "b", objectId: objectId };
  return dispatch => {
    HttpClient.AjaxPost("/collect/collect", data, list => {
      if (fn) {
        fn(list);
      }
    });
  };
}
// 取消关注项目
export function cancelAttentionWitchProject(objectId, fn) {
  const data = { rtype: "b", objectId: objectId };
  return dispatch => {
    HttpClient.AjaxPost("/collect/callCollect", data, list => {
      if (fn) {
        fn(list);
      }
    });
  };
}
//获取协作任务数据
export function getReLevanceTaskListById(id, fn) {
  return dispatch => {
    HttpClient.AjaxPost(
      "/taskinfo/findreLevanceTaskinfo?id=" + id,
      "",
      list => {
        if (fn) {
          fn();
        }
        dispatch(content(list, TASK_RELEVANCE_LIST_BY_ID));
      }
    );
  };
}

//获取文任务所有文件
export function getTaskFilesListById(id, fn) {
  return dispatch => {
    HttpClient.AjaxPost("/taskinfo/findTaskinfoFiles?tId=" + id, "", list => {
      if (fn) {
        fn();
      }
      dispatch(content(list, TASK_FILES_LIST_BY_ID));
    });
  };
}

//修改任务 统一保存修改的信息
export function updateTaskinfo(taskinfo, fn) {
  return dispatch => {
    HttpClient.AjaxPost("/taskinfo/updateMoreIndex", taskinfo, list => {
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
export function upFilesByType(taskId, type, fileObj, fn) {
  return dispatch => {
    HttpClient.AjaxPost(
      "/files/uploadingMobileImg?projectId=" + taskId + "&type=" + type,
      fileObj,
      list => {
        if (fn) {
          fn();
        }
        dispatch(content(list, TASKINFO_UPLOADING));
      }
    );
  };
}

// 删除文件
export function deleteFileByType(id, fn) {
  return dispatch => {
    HttpClient.AjaxPost("/files/deleteFile?id=" + id, [], list => {
      if (fn) {
        fn();
      }
      dispatch(content(list, TASK_FILES_DELETE));
    });
  };
}

// 添加评论  移动版状态 category 是 1
export function addTalkByTaskId(id, description, files, replyUserId, fn) {
  return dispatch => {
    HttpClient.AjaxPost(
      "/leave/addLeave",
      {
        description: description,
        content: description,
        taskinfo: { id: id },
        reply: { id: replyUserId },
        filesMobile: files,
        category: "1"
      },
      list => {
        if (fn) {
          fn();
        }
        dispatch(content(list, TASK_ADD_TALK));
      }
    );
  };
}

// 删除评论
export function deleteTalkById(id, fn) {
  return dispatch => {
    HttpClient.AjaxPost("/leave/deleteLeave?id=" + id, "", list => {
      if (fn) {
        fn();
      }
      dispatch(content(list, TASK_DELETE_TALK));
    });
  };
}

// 创建任务
export function createTask(proId, parId, taskinfo, fn) {
  return dispatch => {
    HttpClient.AjaxPost(
      "/taskinfo/addTaskinfo?progectId=" + proId + "&pid=" + parId,
      taskinfo,
      list => {
        if (fn) {
          fn(list);
        }
        dispatch(content(list, TASK_CREATE));
      }
    );
  };
}

// 获取任务的优先级 列表
export function getPriorityList(fn) {
  return dispatch => {
    HttpClient.AjaxPost("/taskinfo/findCommonData", "", list => {
      if (fn) {
        fn();
      }
      dispatch(content(list, TASK_PRIORITY_LIST));
    });
  };
}

// 获取项目的任务列表
export function getTaskListByPro(proID, taskID, pageNo = 1, pageSize = 50, fn) {
  return dispatch => {
    HttpClient.AjaxPostSync(
      "/taskinfo/findTreePageList?progectId=" +
        proID +
        "&pId=" +
        taskID +
        "&pageNo=" +
        pageNo +
        "&pageSize=" +
        pageSize,
      {},
      list => {
        if (fn) {
          fn();
        }
        dispatch(content(list, TASKINFO_TASK_BY_PRO_LIST));
      }
    );
  };
}

// 创建任务 临时存储用户录入的值,防止用户返回到创建任务页面，数据没了的情况
export function setCreateTaskVals(task) {
  return {
    type: TASK_CREATE_VALS,
    payload: task
  };
}

// 删除任务
export function deleteTaskById(id, fn, projectId) {
  return dispatch => {
    HttpClient.AjaxPost(
      "/taskinfo/deleteTaskinfo?id=" + id + "&projectId=" + projectId,
      "",
      list => {
        if (fn) {
          fn();
        }
        dispatch(content(list, TASK_DELETE));
      }
    );
  };
}

// 更新任务状态
/* data  = {id:'',projectId:'',state:'',description:'',mobileFile:[]}
 * 确认驳回0，确认通过1，标记完成1，认领0，终止4，重启0
 * */
export function updateTaskStateById(data, fn) {
  return dispatch => {
    HttpClient.AjaxPost("/taskinfo/updateStateIndex", data, list => {
      if (fn) {
        fn();
      }
      dispatch(content(list, TASK_UPDATE_STATE));
    });
  };
}
// 更新任务状态不存储到reduce

export function updateTaskStateById2(data, fn) {
  HttpClient.AjaxPost("/taskinfo/updateStateIndex", data, list => {
    if (fn) {
      fn(list);
    }
  });
}
// 设置添加子任务的面包屑
export function setTaskCreateBread(data) {
  return {
    type: TASK_CREATE_BREAD,
    payload: data
  };
}
//初始化任务数据
export function projectCount(list) {
  return {
    type: PROJECT_COUNT,
    payload: list
  };
}
//获取项目统计数据
export function getProjectCount(id, fn) {
  return dispatch => {
    HttpClient.AjaxPost("/calculate/project?id=" + id, "", list => {
      if (fn) {
        fn();
      }
      dispatch(content(list, CALCULATE_PROJECT));
    });
  };
}
//获取列表统计数据
export function getTasktableData(data, fn) {
  return dispatch => {
    HttpClient.AjaxPost("/calculate/getTasktableData", data, list => {
      if (fn) {
        fn();
      }
      dispatch(content(list, CALCULATE_TASK_TABLE));
    });
  };
}

//刷新团队
export function refreshTime(sign = false) {
  return {
    type: REFRESH_TIME,
    payload: sign
  };
}
//获取任务文件
export function getTaskFileByPro(projectId, parentId, pageSize, pageNo, fn) {
  return dispatch => {
    HttpClient.AjaxPost(
      "/files/fileIdexList?projectId=" +
        projectId +
        "&parentId=" +
        parentId +
        "&pageSize=" +
        pageSize +
        "&pageNo=" +
        pageNo,
      [],
      list => {
        if (fn) fn();
        dispatch(content(list, FILES_LIST));
      }
    );
  };
}

export function getTaskListByCondition(pageNo, pageSize, data, callback) {
  HttpClient.AjaxPost(
    "/taskHome/taskIniNew?pageNo=" + pageNo + "&pageSize=" + pageSize,
    data,
    list => {
      callback(list);
    }
  );
}

//获取任务文件 - 新版
export function getFileListByProjectId(
  projectId,
  parentId,
  pageSize = 50,
  pageNo = 1,
  fileName,
  callback
) {
  HttpClient.AjaxPost(
    "/files/fileIdexListNew?projectId=" +
      projectId +
      "&parentId=" +
      parentId +
      "&fileName=" +
      fileName +
      "&pageSize=" +
      pageSize +
      "&pageNo=" +
      pageNo,
    {},
    list => {
      callback(list);
    }
  );
}

//列表统计
export function teamStatistics(
  pageSize = 2,
  pageNo = 1,
  userName,
  realityBeginTime,
  realityEndTime,
  projectId
) {
  return dispatch => {
    HttpClient.AjaxPost(
      "/calculate/teamStatistics?pageSize=" +
        pageSize +
        "&pageNo=" +
        pageNo +
        "&realityBeginTime=" +
        realityBeginTime +
        "&realityEndTime=" +
        realityEndTime +
        "&projectId=" +
        projectId,
      userName,
      list => {
        dispatch(content(list, CALCULATE_TEAM));
      }
    );
  };
}
/**
 * 刷新任务树数据
 * @param {*} sign  是否刷新
 * @param {*} id  加载的id
 * @param {*} type  刷新类型， type 整个树都是刷新, alone 只刷新当前修改的元素
 */
export function refreshTaskinfo(sign = false, id = "", type = "all") {
  return {
    type: TASKINFO_REFRESH,
    payload: { sign: sign, id: id, type: type }
  };
}
//催办任务
export function expedite(data, tid, type, fn) {
  /*id:被催办的任务id, tid:详情的任务id, type:1 子任务,2:前序任务*/
  return dispatch => {
    HttpClient.AjaxPost(
      "/taskinfo/expedite?tid=" + tid + "&type=" + type,
      {id:data},
      list => {
        if (fn) fn();
        dispatch(content(list, TASK_CUIBAN));
      }
    );
  };
}

// 催办子任务
export function cuibanChildTask(id, callback) {
  // id: 父任务ID
  HttpClient.AjaxPost("/taskinfo/expediteSonTask", { id: id }, list => {
    callback(list);
  });
}
