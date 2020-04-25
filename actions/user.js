import HttpClient from "../api/httpClient";
export const LOGIN = "LOGIN";
export const DINGTAK_CODE = "DINGTAK_CODE";
export const DINGTAK_CODE_LOGIN = "DINGTAK_CODE_LOGIN";
export const USER_MESSAGE = "USER_MESSAGE";
export const SET_URLDATA = "SET_URLDATA";
export const SET_MESSAGE_COUNT = "SET_MESSAGE_COUNT";

export function content(data, type) {
  return {
    type: type,
    payload: data
  };
}

// 获取团队
export function login(name, password) {
  return dispatch => {
    HttpClient.AjaxPost(
      "/user/loginUser",
      { loginName: name, password: password },
      list => {
        dispatch(content(list, LOGIN));
      }
    );
  };
}

//保存初次登录使用的url
export function setUrlData(urlData) {
  return {
    type: SET_URLDATA,
    payload: urlData
  };
}

//收集DD.CONFIG错误
export function saveDdconfigError(err) {
  return dispatch => {
    HttpClient.AjaxPost(
      "/dingTalk/saveDdconfigError",
      { remarks: err },
      list => {
        console.log("保存DD.CONFIG错误成功");
      }
    );
  };
}

// 获取钉钉免登code
export function mobilejs(corpid, SuiteKey, urlData) {
  return dispatch => {
    HttpClient.AjaxPost(
      "/dingTalk/mobilejs?corpid=" +
      corpid +
      "&SuiteKey=" +
      SuiteKey +
      "&urlData=" +
      urlData,
      "",
      list => {
        dispatch(content(list, DINGTAK_CODE));
      }
    );
  };
}

// 钉钉code登录
export function dingtalkCodeLogin(code, corpid) {
  return dispatch => {
    HttpClient.AjaxPost(
      "/user/dingtalkMobileCodeLogin?code=" + code + "&corpid=" + corpid,
      "",
      list => {
        dispatch(content(list, DINGTAK_CODE_LOGIN));
      }
    );
  };
}

// 通知信息
export function getMessageByUser(pageNo, fn) {
  return dispatch => {
    HttpClient.AjaxPost(
      "/message/findMessage?pageNo=" + pageNo + "&read=",
      "",
      list => {
        if (fn) {
          fn();
        }
        dispatch(content({ list: list, pageNo: pageNo }, USER_MESSAGE));
      }
    );
  };
}

export function setMessageCount(id) {
  return dispatch => {
    dispatch(content(id, SET_MESSAGE_COUNT));
  };
}

//引导页
export function guidePage(fn) {
  const version = HttpClient.getVersion();
  return dispatch => {
    HttpClient.AjaxPost(
      "/user/updateLoginState?type=phone&version=" + version,
      "",
      list => {
        if (fn) {
          fn(list);
        }
      }
    );
  };
}
