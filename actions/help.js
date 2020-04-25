export const HEHPS_LIST = 'HEHPS_LIST';
export const HEHPS_TYPE_LIST = 'HEHPS_TYPE_LIST';
export const HEHPS_DETAIL = 'HEHPS_DETAIL';
import HttpClient from '../api/httpClient';

// 获取对应分类的列表
export function findList(page=1,data={},fn) {
     return (dispatch) => {
        HttpClient.AjaxPost('/helps/findList?page='+page, data, list => {
            if(fn){
                fn();
            }
            dispatch(content(list, HEHPS_LIST))
        })
    }
}

// 获取列表分类
export function findTypeList(data={},fn) {
    return (dispatch) => {
       HttpClient.AjaxPost('/helps/findTypeList', data, list => {
           if(fn){
               fn();
           }
           dispatch(content(list, HEHPS_TYPE_LIST))
       })
   }
}

// 获取详情
export function getDetail(id,fn) {
    return (dispatch) => {
       HttpClient.AjaxPost('/helps/getDetail?id='+id, {}, list => {
           if(fn){
               fn();
           }
           dispatch(content(list, HEHPS_DETAIL))
       })
   }
}

export function content(data, type) {
    return {
        type: type,
        payload: data
    }
}