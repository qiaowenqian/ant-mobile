import HttpClient from "../api/httpClient";
export const PROJECT_LIST = "PROJECT_LIST";
export const PROJECT_LIST_JURISDICTION = "PROJECT_LIST_JURISDICTION";
export const PROJECT_ADD = "PROJECT_ADD";
export const PROJECT_DETAILS = "PROJECT_DETAILS";
export const PROJECT_UPDET_ALL = "PROJECT_UPDET_ALL";
export const ADD_ATTENTION_WITCH_PROJECT = "ADD_ATTENTION_WITCH_PROJECT";
export const CANCEL_ATTENTION_WITCH_PROJECT = "CANCEL_ATTENTION_WITCH_PROJECT";
export const GET_PROJECT_CREATE_INFO_BY_ID = "GET_PROJECT_CREATE_INFO_BY_ID";
export const CREATE_PROJECT = "CREATE_PROJECT";
export const OPEN_PROJECT = "OPEN_PROJECT";
export const PROJECT_USERINFO = "PROJECT_USERINFO";
export const PROJECT_SELECT_LISTCOUNT = "PROJECT_SELECT_LISTCOUNT";
// 获取项目列表
export function getProjectListByTypeJurisdiction(
	data,
	pageNo,
	pageSize = 50,
	fn
) {
	return dispatch => {
		HttpClient.AjaxPostSync(
			"/project/getProjectIds?pageNo=" +
				pageNo +
				"&pageSize=" +
				pageSize,
			data,
			list => {
				if (fn) {
					fn();
				}
				dispatch(
					content(list, PROJECT_LIST_JURISDICTION)
				);
			}
		);
	};
}
// 获取项目列表
export function getProjectListByType(data, pageNo, pageSize = 50, fn) {
	return dispatch => {
		HttpClient.AjaxPostSync(
			"/project/projectPageIndex?pageNo=" +
				pageNo +
				"&pageSize=" +
				pageSize,
			data,
			list => {
				if (fn) {
					fn(list);
				}
				// dispatch(content(list, PROJECT_LIST));
			}
		);
	};
}
//保存选择的负责人详细信息
export function saveProjectUserInfo(data) {
	return {
		type: PROJECT_USERINFO,
		payload: data
	};
}
//选择条件的总列表数目
export function saveProjectSelectListCount(data) {
	return {
		type: "PROJECT_SELECT_LISTCOUNT",
		payload: data
	};
}

//获取项目详情
export function projectDetails(id, fn) {
	return dispatch => {
		HttpClient.AjaxPost(
			"/project/projectDetails?id=" + id,
			"",
			list => {
				if (fn) {
					fn();
				}
				dispatch(content(list, PROJECT_DETAILS));
			}
		);
	};
}
//修改项目
export function projectUpdateAll(project, fn) {
	return dispatch => {
		HttpClient.AjaxPost("/project/projectUpdate", project, list => {
			if (fn) {
				fn();
			}
			dispatch(content(list, PROJECT_UPDET_ALL));
		});
	};
}
export function content(data, type) {
	return {
		type: type,
		payload: data
	};
}

// 关注项目
export function addAttentionWitchProject(objectId, fn) {
	const data = { rtype: "a", objectId: objectId };
	return dispatch => {
		HttpClient.AjaxPost("/collect/collect", data, list => {
			if (fn) {
				fn(list);
			}
			// dispatch(content(list, ADD_ATTENTION_WITCH_PROJECT));
		});
	};
}
// 取消关注项目
export function cancelAttentionWitchProject(objectId, fn) {
	const data = { rtype: "a", objectId: objectId };
	return dispatch => {
		HttpClient.AjaxPost("/collect/callCollect", data, list => {
			if (fn) {
				fn(list);
			}
			// dispatch(content(list, CANCEL_ATTENTION_WITCH_PROJECT));
		});
	};
}

// 获取项目设置的数据
export function getProjectCreateInfoById(id, fn) {
	return dispatch => {
		HttpClient.AjaxPost(
			"/project/projectDetailsNew?id=" + id,
			"",
			list => {
				if (fn) {
					fn();
				}
				dispatch(
					content(
						list,
						GET_PROJECT_CREATE_INFO_BY_ID
					)
				);
			}
		);
	};
}
// 获取项目设置的数据,返回格式和列表格式相同，就是为了更新列表的
export function getProjectCreateInfoById2(id, fn) {
	return dispatch => {
		HttpClient.AjaxPost(
			"/project/getProjectById?id=" + id,
			"",
			list => {
				if (fn) {
					fn(list);
				}
			}
		);
	};
}
// 创建修改项目
export function createProject(data, fn) {
	return dispatch => {
		HttpClient.AjaxPost("/project/projectAddNew", data, list => {
			if (fn) {
				fn(list);
			}
			dispatch(content(list, CREATE_PROJECT));
		});
	};
}

// 人员任务统计
export function getChartByUserTask(data, callback) {
	HttpClient.AjaxPost("/calculate/getTasktableCount", data, list => {
		callback(list);
	});
}

// 人员绩效统计
export function getChartByUserMoney(data, callback) {
	HttpClient.AjaxPost("/calculate/getContenTableData", data, list => {
		callback(list);
	});
}

// 任务概述统计
export function getChartByTaskSituation(id, callback) {
	HttpClient.AjaxPost("/calculate/project?id=" + id, "", list => {
		callback(list);
	});
}

// 项目进展统计
export function getChartByProjectProgress(data, callback) {
	HttpClient.AjaxPost("/calculate/getProgressView", data, list => {
		callback(list);
	});
}

// 当前打开的项目
export function setOpenProject(project) {
	return dispatch => {
		dispatch(content(project, OPEN_PROJECT));
	};
}
