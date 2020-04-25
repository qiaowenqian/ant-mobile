import * as types from "../actions/cache";
const initialState = {
	taskListFromCache: [],
	projectListFromCache: [],
	dynamicListFromCache: [],
	taskCountFromCache: 0,
	taskPageCountFromCache: 0,
	projectPageCountFromCache: 0,
	dynamicPageCountFromCache: 0,
	taskTextFromCache: "",
	taskListToDel: [],
	taskCountToDel: 0,
	taskTextToDel: "",
	taskAllCountToDel: 0,
	taskScrollTop: 0,
	dynamicScrollTop: 0,
	homeScrollTop: 0,
	taskCondition: "",
	projectText: "", //项目搜索关键字
	projectType: "",
	projectScroll: 0,
	projectAllPage: 0,
	projectTaskList: [],
	projectTaskAllCount: 0,
	projectTaskScroll: 0,
	projectConditionFromCache: {},
	projectNowPage: 1, //显示当前页码
	projectTagList: [] //项目筛选出的标签数据
};
export default function cache(state = initialState, action = {}) {
	switch (action.type) {
		case types.PROJECT_NOW_PAGE:
			return Object.assign({}, state, {
				projectNowPage: action.payload
			});
		case types.PROJECT_TAGLIST:
			return Object.assign({}, state, {
				projectTagList: action.payload
			});
		case types.PROJECT_CONDITION:
			return Object.assign({}, state, {
				projectConditionFromCache: action.payload
			});
		case types.DYNAMICSCROLLTOP:
			return Object.assign({}, state, {
				dynamicScrollTop: action.payload
			});
		case types.HOMESCROLLTOP:
			return Object.assign({}, state, {
				homeScrollTop: action.payload
			});
		case types.TASKLIST:
			return Object.assign({}, state, {
				taskListFromCache: action.payload
			});
		case types.PROJECTLIST:
			return Object.assign({}, state, {
				projectListFromCache: action.payload
			});
		case types.SET_PROJECTLIST:
			let oldProject = [];
			oldProject = state.projectListFromCache;
			if (action.payload.projectId == "") {
				// debugger;
				oldProject.splice(0, 0, action.payload.data);
			} else {
				oldProject.map((item, index) => {
					if (
						item.id ==
						action.payload.projectId
					) {
						oldProject.splice(
							index,
							1,
							action.payload.data
						);
						return false;
					}
				});
			}
			return Object.assign({}, state, {
				projectListFromCache: oldProject
			});
		case types.DYNAMICLIST:
			return Object.assign({}, state, {
				dynamicListFromCache: action.payload
			});
		case types.TASKCOUNT:
			return Object.assign({}, state, {
				taskCountFromCache: action.payload
			});
		case types.TASKPAGECOUNT:
			return Object.assign({}, state, {
				taskPageCountFromCache: action.payload
			});
		case types.PROJECTPAGECOUNT:
			return Object.assign({}, state, {
				projectPageCountFromCache: action.payload
			});
		case types.DYNAMICPAGECOUNT:
			return Object.assign({}, state, {
				dynamicPageCountFromCache: action.payload
			});
		case types.TASKTEXT:
			return Object.assign({}, state, {
				taskTextFromCache: action.payload
			});
		case types.SET_TASKLISTDEL:
			let newlist = state.taskListToDel;
			newlist.map((item, index) => {
				if (item.taskinfo.id == action.payload) {
					newlist.splice(index, 1);
				}
			});
			return Object.assign({}, state, {
				taskListToDel: newlist
			});
		case types.ADD_TASKLISTDEL:
			let newlist2 = state.taskListToDel;
			// debugger;
			newlist2.splice(0, 0, action.payload);
			return Object.assign({}, state, {
				taskListToDel: newlist2
			});
		case types.EDIT_TASKLISTDEL:
			let alist = state.taskListToDel;
			alist.map((item, index) => {
				if (
					item.taskinfo.id ==
					action.payload.taskinfo.id
				) {
					alist.splice(index, 1, action.payload);
				}
			});

			return Object.assign({}, state, {
				taskListToDel: alist
			});

		case types.TASKLISTDEL:
			return Object.assign({}, state, {
				taskListToDel: action.payload
			});
		case types.TASKCOUNTDEL:
			return Object.assign({}, state, {
				taskCountToDel: action.payload
			});
		case types.SET_TASKCOUNTDEL:
			let newtaskCountToDel = state.taskCountToDel;
			if (action.payload) {
				newtaskCountToDel = newtaskCountToDel + 1;
			} else {
				newtaskCountToDel = newtaskCountToDel - 1;
			}
			return Object.assign({}, state, {
				taskCountToDel: newtaskCountToDel
			});
		case types.TASKTEXTDEL:
			return Object.assign({}, state, {
				taskTextToDel: action.payload
			});
		case types.TASKPAGECOUNTDEL:
			return Object.assign({}, state, {
				taskAllCountToDel: action.payload
			});
		case types.TASKSCROLLTOP:
			return Object.assign({}, state, {
				taskScrollTop: action.payload
			});
		case types.TASKCONDITION:
			return Object.assign({}, state, {
				taskCondition: action.payload
			});
		case types.PROJECTTEXT:
			return Object.assign({}, state, {
				projectText: action.payload
			});
		case types.PROJECTTYPE:
			return Object.assign({}, state, {
				projectType: action.payload
			});
		case types.PROJECTSCROLL:
			return Object.assign({}, state, {
				projectScroll: action.payload
			});
		case types.PROJECTALLCOUNT:
			return Object.assign({}, state, {
				projectAllPage: action.payload
			});
		case types.PROJECTTASKLIST:
			return Object.assign({}, state, {
				projectTaskList: action.payload
			});
		case types.PROJECTTASKALLCOUNT:
			return Object.assign({}, state, {
				projectTaskAllCount: action.payload
			});
		case types.PROJECTTASKSCROLL:
			return Object.assign({}, state, {
				projectTaskScroll: action.payload
			});
		default:
			return state;
	}
}
