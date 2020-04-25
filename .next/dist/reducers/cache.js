"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = cache;

var _assign = require("_babel-runtime@6.23.0@babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _cache = require("../actions/cache");

var types = _interopRequireWildcard(_cache);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState = {
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
function cache() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
	var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	switch (action.type) {
		case types.PROJECT_NOW_PAGE:
			return (0, _assign2.default)({}, state, {
				projectNowPage: action.payload
			});
		case types.PROJECT_TAGLIST:
			return (0, _assign2.default)({}, state, {
				projectTagList: action.payload
			});
		case types.PROJECT_CONDITION:
			return (0, _assign2.default)({}, state, {
				projectConditionFromCache: action.payload
			});
		case types.DYNAMICSCROLLTOP:
			return (0, _assign2.default)({}, state, {
				dynamicScrollTop: action.payload
			});
		case types.HOMESCROLLTOP:
			return (0, _assign2.default)({}, state, {
				homeScrollTop: action.payload
			});
		case types.TASKLIST:
			return (0, _assign2.default)({}, state, {
				taskListFromCache: action.payload
			});
		case types.PROJECTLIST:
			return (0, _assign2.default)({}, state, {
				projectListFromCache: action.payload
			});
		case types.SET_PROJECTLIST:
			var oldProject = [];
			oldProject = state.projectListFromCache;
			if (action.payload.projectId == "") {
				// debugger;
				oldProject.splice(0, 0, action.payload.data);
			} else {
				oldProject.map(function (item, index) {
					if (item.id == action.payload.projectId) {
						oldProject.splice(index, 1, action.payload.data);
						return false;
					}
				});
			}
			return (0, _assign2.default)({}, state, {
				projectListFromCache: oldProject
			});
		case types.DYNAMICLIST:
			return (0, _assign2.default)({}, state, {
				dynamicListFromCache: action.payload
			});
		case types.TASKCOUNT:
			return (0, _assign2.default)({}, state, {
				taskCountFromCache: action.payload
			});
		case types.TASKPAGECOUNT:
			return (0, _assign2.default)({}, state, {
				taskPageCountFromCache: action.payload
			});
		case types.PROJECTPAGECOUNT:
			return (0, _assign2.default)({}, state, {
				projectPageCountFromCache: action.payload
			});
		case types.DYNAMICPAGECOUNT:
			return (0, _assign2.default)({}, state, {
				dynamicPageCountFromCache: action.payload
			});
		case types.TASKTEXT:
			return (0, _assign2.default)({}, state, {
				taskTextFromCache: action.payload
			});
		case types.SET_TASKLISTDEL:
			var newlist = state.taskListToDel;
			newlist.map(function (item, index) {
				if (item.taskinfo.id == action.payload) {
					newlist.splice(index, 1);
				}
			});
			return (0, _assign2.default)({}, state, {
				taskListToDel: newlist
			});
		case types.ADD_TASKLISTDEL:
			var newlist2 = state.taskListToDel;
			// debugger;
			newlist2.splice(0, 0, action.payload);
			return (0, _assign2.default)({}, state, {
				taskListToDel: newlist2
			});
		case types.EDIT_TASKLISTDEL:
			var alist = state.taskListToDel;
			alist.map(function (item, index) {
				if (item.taskinfo.id == action.payload.taskinfo.id) {
					alist.splice(index, 1, action.payload);
				}
			});

			return (0, _assign2.default)({}, state, {
				taskListToDel: alist
			});

		case types.TASKLISTDEL:
			return (0, _assign2.default)({}, state, {
				taskListToDel: action.payload
			});
		case types.TASKCOUNTDEL:
			return (0, _assign2.default)({}, state, {
				taskCountToDel: action.payload
			});
		case types.SET_TASKCOUNTDEL:
			var newtaskCountToDel = state.taskCountToDel;
			if (action.payload) {
				newtaskCountToDel = newtaskCountToDel + 1;
			} else {
				newtaskCountToDel = newtaskCountToDel - 1;
			}
			return (0, _assign2.default)({}, state, {
				taskCountToDel: newtaskCountToDel
			});
		case types.TASKTEXTDEL:
			return (0, _assign2.default)({}, state, {
				taskTextToDel: action.payload
			});
		case types.TASKPAGECOUNTDEL:
			return (0, _assign2.default)({}, state, {
				taskAllCountToDel: action.payload
			});
		case types.TASKSCROLLTOP:
			return (0, _assign2.default)({}, state, {
				taskScrollTop: action.payload
			});
		case types.TASKCONDITION:
			return (0, _assign2.default)({}, state, {
				taskCondition: action.payload
			});
		case types.PROJECTTEXT:
			return (0, _assign2.default)({}, state, {
				projectText: action.payload
			});
		case types.PROJECTTYPE:
			return (0, _assign2.default)({}, state, {
				projectType: action.payload
			});
		case types.PROJECTSCROLL:
			return (0, _assign2.default)({}, state, {
				projectScroll: action.payload
			});
		case types.PROJECTALLCOUNT:
			return (0, _assign2.default)({}, state, {
				projectAllPage: action.payload
			});
		case types.PROJECTTASKLIST:
			return (0, _assign2.default)({}, state, {
				projectTaskList: action.payload
			});
		case types.PROJECTTASKALLCOUNT:
			return (0, _assign2.default)({}, state, {
				projectTaskAllCount: action.payload
			});
		case types.PROJECTTASKSCROLL:
			return (0, _assign2.default)({}, state, {
				projectTaskScroll: action.payload
			});
		default:
			return state;
	}
}