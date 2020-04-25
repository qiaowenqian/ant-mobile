import * as types from "../actions/project";
const initialState = {
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

export default function project(state = initialState, action = {}) {
	switch (action.type) {
		case types.PROJECT_SELECT_LISTCOUNT:
			return Object.assign({}, state, {
				projectSelectCount: action.payload
			});
		case types.PROJECT_USERINFO:
			return Object.assign({}, state, {
				projectUserInfo: action.payload
			});
		case types.PROJECT_LIST_JURISDICTION:
			return Object.assign({}, state, {
				projectListJurisdiction: action.payload
			});
		case types.PROJECT_LIST:
			return Object.assign({}, state, {
				projectList: action.payload
			});
		case types.PROJECT_ADD:
			return Object.assign({}, state, {
				projectCreate: action.payload
			});
		case types.PROJECT_DETAILS:
			return Object.assign({}, state, {
				projectDetails: action.payload
			});
		case types.PROJECT_UPDET_ALL:
			return Object.assign({}, state, {
				projectDetails: action.payload
			});
		case types.ADD_ATTENTION_WITCH_PROJECT:
			return Object.assign({}, state, {
				addWitchProject: action.payload
			});
		case types.CANCEL_ATTENTION_WITCH_PROJECT:
			return Object.assign({}, state, {
				cancelWitchProject: action.payload
			});
		case types.GET_PROJECT_CREATE_INFO_BY_ID:
			return Object.assign({}, state, {
				getProjectCreateInfo: action.payload
			});
		case types.CREATE_PROJECT:
			return Object.assign({}, state, {
				createProjectAll: action.payload
			});
		case types.OPEN_PROJECT:
			return Object.assign({}, state, {
				openProject: action.payload
			});
		default:
			return state;
	}
}
