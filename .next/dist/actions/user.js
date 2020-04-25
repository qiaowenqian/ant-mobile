"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SET_MESSAGE_COUNT = exports.SET_URLDATA = exports.USER_MESSAGE = exports.DINGTAK_CODE_LOGIN = exports.DINGTAK_CODE = exports.LOGIN = undefined;
exports.content = content;
exports.login = login;
exports.setUrlData = setUrlData;
exports.saveDdconfigError = saveDdconfigError;
exports.mobilejs = mobilejs;
exports.dingtalkCodeLogin = dingtalkCodeLogin;
exports.getMessageByUser = getMessageByUser;
exports.setMessageCount = setMessageCount;
exports.guidePage = guidePage;

var _httpClient = require("../api/httpClient");

var _httpClient2 = _interopRequireDefault(_httpClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LOGIN = exports.LOGIN = "LOGIN";
var DINGTAK_CODE = exports.DINGTAK_CODE = "DINGTAK_CODE";
var DINGTAK_CODE_LOGIN = exports.DINGTAK_CODE_LOGIN = "DINGTAK_CODE_LOGIN";
var USER_MESSAGE = exports.USER_MESSAGE = "USER_MESSAGE";
var SET_URLDATA = exports.SET_URLDATA = "SET_URLDATA";
var SET_MESSAGE_COUNT = exports.SET_MESSAGE_COUNT = "SET_MESSAGE_COUNT";

function content(data, type) {
  return {
    type: type,
    payload: data
  };
}

// 获取团队
function login(name, password) {
  return function (dispatch) {
    _httpClient2.default.AjaxPost("/user/loginUser", { loginName: name, password: password }, function (list) {
      dispatch(content(list, LOGIN));
    });
  };
}

//保存初次登录使用的url
function setUrlData(urlData) {
  return {
    type: SET_URLDATA,
    payload: urlData
  };
}

//收集DD.CONFIG错误
function saveDdconfigError(err) {
  return function (dispatch) {
    _httpClient2.default.AjaxPost("/dingTalk/saveDdconfigError", { remarks: err }, function (list) {
      console.log("保存DD.CONFIG错误成功");
    });
  };
}

// 获取钉钉免登code
function mobilejs(corpid, SuiteKey, urlData) {
  return function (dispatch) {
    _httpClient2.default.AjaxPost("/dingTalk/mobilejs?corpid=" + corpid + "&SuiteKey=" + SuiteKey + "&urlData=" + urlData, "", function (list) {
      dispatch(content(list, DINGTAK_CODE));
    });
  };
}

// 钉钉code登录
function dingtalkCodeLogin(code, corpid) {
  return function (dispatch) {
    _httpClient2.default.AjaxPost("/user/dingtalkMobileCodeLogin?code=" + code + "&corpid=" + corpid, "", function (list) {
      dispatch(content(list, DINGTAK_CODE_LOGIN));
    });
  };
}

// 通知信息
function getMessageByUser(pageNo, fn) {
  return function (dispatch) {
    _httpClient2.default.AjaxPost("/message/findMessage?pageNo=" + pageNo + "&read=", "", function (list) {
      if (fn) {
        fn();
      }
      console.log("messList", list);
      dispatch(content({ list: list, pageNo: pageNo }, USER_MESSAGE));
    });
  };
}

function setMessageCount(id) {
  return function (dispatch) {
    dispatch(content(id, SET_MESSAGE_COUNT));
  };
}

//引导页
function guidePage(fn) {
  var version = _httpClient2.default.getVersion();
  return function (dispatch) {
    _httpClient2.default.AjaxPost("/user/updateLoginState?type=phone&version=" + version, "", function (list) {
      if (fn) {
        fn(list);
      }
    });
  };
}