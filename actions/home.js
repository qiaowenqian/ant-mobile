export const HOME_DATA = "HOME_DATA";
export const HOME_NUMBER = "HOME_NUMBER"; //数量
export const HOMEBAR = "HOMEBAR"; //柱状图数据
export const HOMELINE = "HOMELINE"; //折线图数据
import HttpClient from "../api/httpClient";

export function content(data, type) {
  return {
    type: type,
    payload: data
  };
}

//项目分组日志
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
//获取首页的数字
export function getTaskHome(dataobj, successCB) {
  HttpClient.AjaxPost(`/taskHome/findIndexNum`, dataobj, data => {
    if (successCB) {
      successCB(data && data.data);
    }
  });
}
//获取首页图表我完成的
export function getRecentlyCompleted(dataobj, successCB) {
  HttpClient.AjaxPost(`/taskinfo/recentlyCompleted`, dataobj, data => {
    if (successCB) {
      successCB(data && data.data);
    }
  });
}
//获取首页图表绩效折线图
export function getPerformanceGrowth(dataobj, successCB) {
  HttpClient.AjaxPost(`/taskinfo/performanceGrowth`, dataobj, data => {
    if (successCB) {
      successCB(data && data.data);
    }
  });
}
//活动点击不在提醒
export function updateStopTime(dataobj, successCB) {
  HttpClient.AjaxPost(`/dingtalkOrder/updateStopTime`, dataobj, data => {
    if (successCB) {
      successCB(data && data.data);
    }
  });
}
//活动点击升级版本
export function probationOrder(dataobj, successCB) {
  HttpClient.AjaxPost(`/dingtalkOrder/probationOrder`, dataobj, data => {
    if (successCB) {
      successCB(data && data.data);
    }
  });
}


