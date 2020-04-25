export const FEED_ADD = 'FEED_ADD';
import HttpClient from '../api/httpClient'

//添加意见反馈
export function save(mail,remarks) {
    return (dispatch) => {
        HttpClient.AjaxPost('/feedback/save',{mail:mail,remarks:remarks}, list => {
            dispatch(content(list, FEED_ADD))
        })
    }
}

export function content(data, type) {
    return {
        type: type,
        payload: data
    }
}