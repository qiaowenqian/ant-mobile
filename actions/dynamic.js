import HttpClient from "../api/httpClient";
export const TASKLOG_LIST_GROUP = "TASKLOG_LIST_GROUP";
export const SEARCH = "SEARCH";
export function content(data, type) {
  return {
    type: type,
    payload: data
  };
}
//动态讨论列表
export function findGroupPageIndex(page = 1, pageSize = 50, data, fn) {
  return dispatch => {
    HttpClient.AjaxPostSync(
      "/tasklog/findGroupPageIndexNew?pageNo=" + page + "&pageSize=" + pageSize,
      data,
      list => {
        if (fn) {
          fn();
        }
        dispatch(content(data, SEARCH));
        dispatch(content({ list: list, pageNo: page }, TASKLOG_LIST_GROUP));
      }
    );
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
