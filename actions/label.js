export const LABEL_LIST = 'LABEL_LIST';
export const TAG_LIST = 'TAG_LIST';
export const PROJECT_TYPE_LIST = 'PROJECT_TYPE_LIST';
export const ADD_PROJECT_TYPE = 'ADD_PROJECT_TYPE';
export const PUBLIC_LABEL_LIST = 'PUBLIC_LABEL_LIST';
export const LABEL_USER = 'LABEL_USER';
export const ADD_LABEL = 'ADD_LABEL';
export const ADD_LABEL_USER = 'ADD_LABEL_USER';
export const PERSON_LABEL = 'PERSON_LABEL';
export const ADD_PERSON_LABEL = 'ADD_PERSON_LABEL';
import HttpClient from '../api/httpClient'

// 获取所有标签
export function getLabelListByUser(fn) {
    return (dispatch) => {
        HttpClient.AjaxPost('/label/findLabelByUser','', list => {
            if(fn){
                fn();
            }
            dispatch(content(list, LABEL_LIST))
        })
    }
}

// 获取标签列表
/*
 * 返回值 type:'1'  个人标签
 *        type:'2'  公共标签
 *        type:'3'  项目分类
 */
export function getTagList(fn) {
    return (dispatch) => {
        HttpClient.AjaxPost('/label/findLabelAll','', list => {
            if(fn){
                fn();
            }
            dispatch(content(list, TAG_LIST))
        });
    }
}

// 获取项目分类列表
export function getProjectTypeList(fn){ 
    return (dispatch) => {
        HttpClient.AjaxPost('/label/labelProjectList','', list => {
            if(fn){
                fn();
            }
            dispatch(content(list, PROJECT_TYPE_LIST))
        });
    }
}
//添加项目分类
export function addProjectType(data,pid,fn) {
    return (dispatch) => {
        HttpClient.AjaxPost('/label/addProjectLabel?pid='+pid,data, list => {
            if(fn){
                fn();
            }
            dispatch(content(list,ADD_PROJECT_TYPE))
        })
    }
}

//获取标签列表
export function getLabelList(fn) {
    return (dispatch) => {
        HttpClient.AjaxPost('/label/labelUserList','', list => {
                if(fn){
                    fn();
                }
                dispatch(content(list,PUBLIC_LABEL_LIST))  
        })
    }
}
//通过标签获取用户
export function findLabelUser(id,fn) {
    return (dispatch) => {
        HttpClient.AjaxPost('/label/findLabelUser?lid='+id,'', list => {
                if(fn){
                    fn();
                }
                dispatch(content(list,LABEL_USER))
        })
    }
}
//添加标签
export function addLabel(data,pid,fn) {
    return (dispatch) => {
        HttpClient.AjaxPost('/label/addLabel?pid='+pid,data, list => {
            if(fn){
                fn();
            }
            dispatch(content(list,ADD_LABEL))
        })
    }
}

//标签添加用户
export function addLabelUser(userId,lid,fn) {
    return (dispatch) => {
        HttpClient.AjaxPost('/label/addLabelUser',{'userList':userId,'label':{id:lid}}, list => {
            if(fn){
                fn();
            } 
            dispatch(content(list,ADD_LABEL_USER))
        })
    }
}

//获取个人标签
export function getPersonLabel(fn) {
    return (dispatch) => {
        HttpClient.AjaxPost('/label/getPersonLabel','', list => {
            if(fn){
                fn();
            }
            dispatch(content(list,PERSON_LABEL))
        })
    }
}

//添加个人标签
export function addPersonLabel(name,pid,fn) {
    return (dispatch) => {
        HttpClient.AjaxPost('/label/addPersonLabel?pid='+pid,name, list => {
            if(fn){
                fn();
            }
            dispatch(content(list,ADD_PERSON_LABEL))
        })
    }
}

export function content(data, type) {
    return {
        type: type,
        payload: data
    }
}
