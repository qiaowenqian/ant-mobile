import HttpClient from '../api/httpClient'
export const FREE_LIMIT = 'FREE_LIMIT';

export function content(data, type) {
    return {
        type: type,
        payload: data
    }
}
//免费版task限制
export function getLimtTask(callback){
    HttpClient.AjaxGet('/taskinfo/taskCountLimit' , list =>{
        callback(list)
    })
}
//免费版project限制
export function getLimtProject(callback){
    HttpClient.AjaxGet('/project/projectCountLimit' , list =>{
        callback(list)
    })
}
// 切换免费版
export function getFreeLimit(callback) {
    HttpClient.AjaxGet('/time/createFreeOrder', list => {
        callback(list);
    });
}
