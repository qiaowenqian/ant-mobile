import HttpClient from "../api/httpClient";
export const PIE_CHAT = "PIE_CHAT";
export const PEN_PROJECT = "PEN_PROJECT";
export const PEN_PERSON = "PEN_PERSON";
export const TASK_NUMS_PROJECT = "TASK_NUMS_PROJECT";
export const TASK_NUMS_PERSON = "TASK_NUMS_PERSON";

export const PERFORM_TYPE = "PERFORM_TYPE";
export const MONTH_TYPE = "MONTH_TYPE";

export const ST_PROJECT_LIST = "ST_PROJECT_LIST";

export const PROJECT_TYPE = "PROJECT_TYPE";

export const PROJECT_IDS = "PROJECT_IDS";

export function content(data, type) {
  return {
    type: type,
    payload: data
  };
}

export function getAllTaskDistributedByState(data = {}, fn) {
  HttpClient.AjaxPost("/calculate/getTaskDistributedByState", data, list => {
    if (fn) {
      if (list && list.data) {
        fn(list.data);
      }
    }
  });
}

export function getAllPendStatistics(data = {}, fn) {
  HttpClient.AjaxPost("/calculate/getPendStatistics", data, list => {
    if (fn) {
      fn(list.data);
    }
  });
}

export function getAllNumByPerson(data = {}, fn) {
  HttpClient.AjaxPost("/calculate/getContentByPerson", data, list => {
    if (fn) {
      fn(list.data);
    }
  });
}

export function getAllNumByProject(data = {}, fn) {
  HttpClient.AjaxPost("/calculate/getNumByPerson", data, list => {
    if (fn) {
      fn(list.data);
    }
  });
}

export function getTaskDistributedByState(projectIds = {}, callback) {
  return dispatch => {
    HttpClient.AjaxPost(
      "/calculate/getTaskDistributedByState",
      projectIds,
      list => {
        if (callback) callback();
        let data = [];
        if (list && list.data && list.data.data) {
          data = list.data.data;
        }
        dispatch(content(data, PIE_CHAT));
      }
    );
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
export function getPendStatistics(projectIds = {}) {
  return dispatch => {
    HttpClient.AjaxPost("/calculate/getPendStatistics", projectIds, list => {
      dispatch(content(list.data, PEN_PERSON));
    });
  };
}

//待办统计 按项目
export function getPendByProject(data = {}) {
  return dispatch => {
    HttpClient.AjaxPost("/calculate/getPendByProject", data, list => {
      dispatch(content(list.data, PEN_PROJECT));
    });
  };
}

//根据项目id查询 绩效统计(绩效值) 按人员
export function getNumByProject(data = {}) {
  return dispatch => {
    HttpClient.AjaxPost("/calculate/getNumByPerson", data, list => {
      dispatch(content(list.data, TASK_NUMS_PROJECT));
    });
  };
}
//绩效按人员taskPersonList
export function getNumByPerson(data = {}) {
  return dispatch => {
    HttpClient.AjaxPost("/calculate/getContentByPerson", data, list => {
      dispatch(content(list.data, TASK_NUMS_PERSON));
    });
  };
}

export function getProjectResult(data = {}, fn) {
  const projectType = data.type;
  return dispatch => {
    HttpClient.AjaxPost("/project/getProjectResult", data, list => {
      let projectList = [];
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

export function saveProjectResult(data = {}) {
  return dispatch => {
    dispatch(content(data.projectList, ST_PROJECT_LIST));
    dispatch(content(data.projectIds, PROJECT_IDS));
    dispatch(content(data.projectType, PROJECT_TYPE));
  };
}

export function getProjectList(data = {}, fn) {
  HttpClient.AjaxPost("/project/getProjectResult", data, list => {
    if (fn) {
      fn(list.data.projectList);
    }
  });
}

//存
export function saveMonthType(data) {
  return dispatch => {
    dispatch(content(data, MONTH_TYPE));
  };
}

//存
export function savePerformType(data) {
  return dispatch => {
    dispatch(content(data, PERFORM_TYPE));
  };
}
