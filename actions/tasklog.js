export const TASKLOG_TASKINFO = 'TASKLOG_TASKINFO';
export const TASKLOG_LIST = 'TASKLOG_LIST';
export const TASKLOG_LIST_GROUP = 'TASKLOG_LIST_GROUP';
import HttpClient from '../api/httpClient'
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
export function content(data, type) {
    return {
        type: type,
        payload: data
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