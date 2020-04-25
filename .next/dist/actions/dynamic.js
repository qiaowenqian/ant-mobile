"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SEARCH = exports.TASKLOG_LIST_GROUP = undefined;
exports.content = content;
exports.findGroupPageIndex = findGroupPageIndex;

var _httpClient = require("../api/httpClient");

var _httpClient2 = _interopRequireDefault(_httpClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TASKLOG_LIST_GROUP = exports.TASKLOG_LIST_GROUP = "TASKLOG_LIST_GROUP";
var SEARCH = exports.SEARCH = "SEARCH";
function content(data, type) {
  return {
    type: type,
    payload: data
  };
}
//动态讨论列表
function findGroupPageIndex() {
  var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  var pageSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 50;
  var data = arguments[2];
  var fn = arguments[3];

  return function (dispatch) {
    _httpClient2.default.AjaxPostSync("/tasklog/findGroupPageIndex?pageNo=" + page + "&pageSize=" + pageSize, data, function (list) {
      if (fn) {
        fn();
      }
      dispatch(content(data, SEARCH));
      dispatch(content({ list: list, pageNo: page }, TASKLOG_LIST_GROUP));
    });
  };
}

{
  /*
  //项目日志
  export function findBytaskinfoId(id) {
     return (dispatch) => {
        HttpClient.AjaxPost('/tasklog/findBytaskinfoId?id='+id, {}, list => {
            dispatch(content(list, TASKLOG_TASKINFO))
        })
    }
  }
  //项目日志
  export function findList(page=1,type,date) {
     return (dispatch) => {
        HttpClient.AjaxPost('/tasklog/findList?page='+page, {type:type,date:date}, list => {
            dispatch(content(list, TASKLOG_LIST))
        })
    }
  }
  //项目分组日志
  export function findGroupPageIndex(page=1,data,fn) {
    page = page + 1;
    return (dispatch) => {
       HttpClient.AjaxPost('/tasklog/findGroupPageIndex?pageNo='+page, data, list => {
           if(fn){
                fn();
           }
           dispatch(content(list, TASKLOG_LIST_GROUP))
       })
   }
  }
  */
}