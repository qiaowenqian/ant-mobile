"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = project;

var _assign = require("_babel-runtime@6.23.0@babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _project = require("../actions/project");

var types = _interopRequireWildcard(_project);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState = {
	projectList: {},
	projectCreate: null,
	projectDetails: [],
	addWitchProject: {},
	cancelWitchProject: {},
	getProjectCreateInfo: {},
	createProjectAll: {},
	openProject: {},
	projectListJurisdiction: {},
	projectUserInfo: null,
	projectSelectCount: 0
};

function project() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
	var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	switch (action.type) {
		case types.PROJECT_SELECT_LISTCOUNT:
			return (0, _assign2.default)({}, state, {
				projectSelectCount: action.payload
			});
		case types.PROJECT_USERINFO:
			return (0, _assign2.default)({}, state, {
				projectUserInfo: action.payload
			});
		case types.PROJECT_LIST_JURISDICTION:
			return (0, _assign2.default)({}, state, {
				projectListJurisdiction: action.payload
			});
		case types.PROJECT_LIST:
			return (0, _assign2.default)({}, state, {
				projectList: action.payload
			});
		case types.PROJECT_ADD:
			return (0, _assign2.default)({}, state, {
				projectCreate: action.payload
			});
		case types.PROJECT_DETAILS:
			return (0, _assign2.default)({}, state, {
				projectDetails: action.payload
			});
		case types.PROJECT_UPDET_ALL:
			return (0, _assign2.default)({}, state, {
				projectDetails: action.payload
			});
		case types.ADD_ATTENTION_WITCH_PROJECT:
			return (0, _assign2.default)({}, state, {
				addWitchProject: action.payload
			});
		case types.CANCEL_ATTENTION_WITCH_PROJECT:
			return (0, _assign2.default)({}, state, {
				cancelWitchProject: action.payload
			});
		case types.GET_PROJECT_CREATE_INFO_BY_ID:
			return (0, _assign2.default)({}, state, {
				getProjectCreateInfo: action.payload
			});
		case types.CREATE_PROJECT:
			return (0, _assign2.default)({}, state, {
				createProjectAll: action.payload
			});
		case types.OPEN_PROJECT:
			return (0, _assign2.default)({}, state, {
				openProject: action.payload
			});
		default:
			return state;
	}
}