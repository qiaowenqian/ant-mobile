export const TASKINFO_PROJECT_LIST = 'TASKINFO_PROJECT_LIST';
export const TASKINFO_ID = 'TASKINFO_ID';
export const TASKINFO_ID_PID = 'TASKINFO_ID_PID';
export const TASKINFO_ADD_INI = 'TASKINFO_ADD_INI';
export const TASKINFO_ADD = 'TASKINFO_ADD';
export const TASKINFO_BY_ID = 'TASKINFO_BY_ID';
export const TASKINFO_CHILD = 'TASKINFO_CHILD';
export const TASKINFO_LEVANCE = 'TASKINFO_LEVANCE';
export const TASKINFO_FILES = 'TASKINFO_FILES';
export const TASKINFO_LEAVE = 'TASKINFO_LEAVE';
export const LEAVE_DELETE = 'LEAVE_DELETE';
export const LEAVE_ADD = 'LEAVE_ADD';
export const TASKINFO_UPDATE = 'TASKINFO_UPDATE';
export const TASKINFO_DELETE_USER = 'TASKINFO_DELETE_USER';
export const TASKINFO_UPDATE_STATE = 'TASKINFO_UPDATE_STATE';
export const TASKINFO_UPDATE_FLOW = 'TASKINFO_UPDATE_FLOW';
export const TASKINFO_UPLOADING = 'TASKINFO_UPLOADING';
export const TASKINFO_HOME_INDEX = 'TASKINFO_HOME_INDEX';
export const DINGTAK_MESSAGE_DELETE = 'DINGTAK_MESSAGE_DELETE';
export const TASKINFO_TASK_BY_PRO_LIST = 'TASKINFO_TASK_BY_PRO_LIST';
export const TASKINFO_DELETEALL = 'TASKINFO_DELETEALL';
export const TASKINFO_BY_ID_SAVE = 'TASKINFO_BY_ID_SAVE';
export const BACK_FN = 'BACK_FN';
export const BACK_TYPE = 'BACK_TYPE';
import HttpClient from '../api/httpClient'

// 获取项目的任务列表
export function getTaskListByPro(proID,taskID,fn) {
    return (dispatch) => {
        HttpClient.AjaxPost('/taskinfoMobile/findMobileTreeList?projectId='+proID+'&pId='+taskID,'', list => {
            if(fn){
                fn();
            }
            dispatch(content(list, TASKINFO_TASK_BY_PRO_LIST))
        })
    }
}



//添加初始化
export function findByProjectId(projectId) {
    return (dispatch) => {
        HttpClient.AjaxPost('/taskinfo/findByProjectId?id='+projectId,'', list => {
            dispatch(content(list, TASKINFO_ADD_INI))
        })
    }
}
//添加任务
export function addTaskinfo(projectId,pid,taskinfo) {
    return (dispatch) => {
        HttpClient.AjaxPost('/taskinfo/addTaskinfo?progectId='+projectId+'&pid='+pid,taskinfo, list => {
            dispatch(content(list, TASKINFO_ADD))
        })
    }
}

//获取任务详情
export function findById(id,fn) {
    return (dispatch) => {
        HttpClient.AjaxPost('/taskinfo/findByTaskinfoId?id='+id,'', list => {
            if(fn){
                fn()
            }
            dispatch(content(list, TASKINFO_BY_ID))
        })
    }
}
//获取子任务
export function findChildTaskinfo(pid,projectId,fn) {
     return (dispatch) => {
        HttpClient.AjaxPost('/taskinfoMobile/findByPid?pid='+pid+'&projectId='+projectId,'', list => {
            if(fn){
                fn();
            }
            dispatch(content(list, TASKINFO_CHILD))
        })
    }
}
//协作任务
export function findreLevanceTaskinfo(id,fn) {
     return (dispatch) => {
        HttpClient.AjaxPost('/taskinfoMobile/findLevanceTaskinfoMobile?id='+id,'', list => {
            if(fn){
                fn();
            }
            dispatch(content(list, TASKINFO_LEVANCE))
        })
    }
}

//成果文件
export function findTaskinfoFiles(id,fileType,fn) {
     return (dispatch) => {
        HttpClient.AjaxPost('/taskinfo/findTaskinfoFiles?tId='+id+'&fileType='+fileType,'', list => {
            if(fn){
                fn()
            }
            dispatch(content(list, TASKINFO_FILES))
        })
    }
}
//获取评论日志
export function findLeave(id,fn) {
     return (dispatch) => {
        HttpClient.AjaxPost('/taskinfoMobile/findLeave?id='+id,'', list => {
            if(fn){
                fn()
            }
            dispatch(content(list, TASKINFO_LEAVE))
        })
    }
}
//删除评论
export function deleteLeave(id,fn) {
     return (dispatch) => {
        HttpClient.AjaxPost('/leave/deleteLeave?id='+id,'', list => {
            if(fn){
                fn();
            }
            dispatch(content(list, LEAVE_DELETE))
        })
    }
}

//添加评论  移动版状态 category 是 1
export function addLeave(tid,description,files,replyId) {
     return (dispatch) => {
        HttpClient.AjaxPost('/leave/addLeave', {description:description,taskinfo:{id:tid},reply:{id:replyId},filesMobile:files,category:'1'}, list => {
            dispatch(content(list, LEAVE_ADD))
        })
    }
}

//修改任务
export function updateTaskinfo(taskinfo,fn) {
     return (dispatch) => {
        HttpClient.AjaxPost('/taskinfo/updateTaskinfo',taskinfo, list => {
            if(fn){
                fn();
            }
            dispatch(content(list, TASKINFO_UPDATE))
        })
    }
}
//修改任务详情
export function updateTaskinfoRemarks(taskinfo,fn) {
    return (dispatch) => {
       HttpClient.AjaxPost('/taskinfo/updateTaskinfoRemarks',taskinfo, list => {
            if(fn){
                fn();
            }
           dispatch(content(list, TASKINFO_UPDATE))
       })
   }
}
//通过钉钉id 修改用户
export function updateUserTaskinfo(taskinfo,fn) {
    return (dispatch) => {
       HttpClient.AjaxPost('/taskinfo/updateUserTaskinfo',taskinfo, list => {
            if(fn){
                fn();
            }
           dispatch(content(list, TASKINFO_UPDATE))
       })
   }
}
//删除项目负责人
export function deleteTaskinfoUser(id,type) {
     return (dispatch) => {
        HttpClient.AjaxPost('/taskinfo/deleteTaskinfoUser?id='+id+'&type='+type,'', list => {
            dispatch(content(list, TASKINFO_DELETE_USER))
        })
    }
}

//修改任务任务状态
export function updateStateIndex(id,projectId,state,flowSign,fn) {
     return (dispatch) => {
        HttpClient.AjaxPost('/taskinfoMobile/updateStateMobile?id='+id+'&projectId='+projectId+'&state='+state,flowSign, list => {
            if(fn){
                fn()
            }
            dispatch(content(list, TASKINFO_UPDATE_STATE))
        })
    }
}
//审核
export function updateFlowIndex(id,projectId,state,flowSign,fn) {
     return (dispatch) => {
        HttpClient.AjaxPost('/taskinfoMobile/updateFlowMobile?id='+id+'&projectId='+projectId+'&state='+state,flowSign, list => {
            if(fn){
                fn();
            }
            dispatch(content(list, TASKINFO_UPDATE_FLOW))
        })
    }
}
//上传图片
export function uploadingMobileImg(projectId,type,file,fn) {
     return (dispatch) => {
        HttpClient.AjaxPost('/taskinfoMobile/uploadingMobileImg?projectId='+projectId+'&type='+type,file, list => {
            if(fn){
                fn();
            }
            dispatch(content(list, TASKINFO_UPLOADING))
        })
    }
}
//钉钉跳转页面选中
export function getDingMessageDetails(taskinfoId) {
     return (dispatch) => {
        HttpClient.AjaxPost('/taskinfo/getDingMessageDetails?taskinfoId='+taskinfoId,'', list => {
            dispatch(content(list, DINGTAK_MESSAGE_DELETE))
        })
    }
}
//选中任务id
export function selectTaskinfoId(id) {
   return {
        type: TASKINFO_ID,
        payload: id
    }
}
//选中任务id
export function selectPidId(id='') {
   return {
        type: TASKINFO_ID_PID,
        payload: id
    }
}

export function content(data, type) {
    return {
        type: type,
        payload: data
    }
}

//首页加载初始化数据
export function homeIndex(panelId,menuType,group,pageSize,pageNo,fn) {
    return (dispatch) => {
       HttpClient.AjaxPost('/taskinfoMobile/homeIndex?pageSize='+pageSize+'&pageNo='+pageNo,{panelId:panelId,menuType:menuType,group:group,search:'',labelId:[],projectId:''}, list => {
        if(fn){
            fn();
        }   
        dispatch(content(list, TASKINFO_HOME_INDEX))
       })
   }
}

//首页加载初始化数据
export function taskPage(value,panelId,menuType,group,pageSize,pageNo,fn) {
    return (dispatch) => {
       HttpClient.AjaxPost('/taskHome/taskPage?pageSize='+pageSize+'&pageNo='+pageNo+'&value='+value,{panelId:panelId,menuType:menuType,group:group,search:'',labelId:[],projectId:''}, list => {
        if(fn){
            fn();
        }   
        dispatch(content(list, TASKINFO_HOME_INDEX))
       })
   }
}


//删除任务
export function deleteTaskinfo(id,projectId,fn) {
    return (dispatch) => {
       HttpClient.AjaxPost('/taskinfo/deleteTaskinfo?id='+id+'&projectId='+projectId,'', list => {
           if(fn){
               fn();
           }
           dispatch(content(list, TASKINFO_DELETEALL))
       })
   }
}

export function backFn(type){
    return {
        type: BACK_FN,
        payload: type
    }
}

//修改后 统一保存修改的信息
export function updateMoreIndex(editData,fn) {
    return (dispatch) => {
       HttpClient.AjaxPost('/taskinfo/updateMoreIndex',editData, list => {
           if(fn){
               fn(list)
           }
            dispatch(content(list, TASKINFO_BY_ID_SAVE))
       })
   }
}