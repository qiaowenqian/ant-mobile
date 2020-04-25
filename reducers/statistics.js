import * as types from "../actions/statistics";
const initialState = {
  pieData: null,
  penProject: {},
  penPerson: {},
  taskNumsProject: {},
  taskNumsPerson: {},
  performType: "task",
  monthType: {
    type: "nowMonth",
    attdate01: new Date("2016/1/1"),
    attdate02: new Date("2016/1/1"),
    value: null
  },
  projectList: null,
  projectType: 1,
  projectIds: []
};

export default function task(state = initialState, action = {}) {
  switch (action.type) {
    case types.PROJECT_IDS:
      return Object.assign({}, state, { projectIds: action.payload });
    case types.PROJECT_TYPE:
      return Object.assign({}, state, { projectType: action.payload });
    case types.ST_PROJECT_LIST:
      return Object.assign({}, state, { projectList: action.payload });
    case types.PERFORM_TYPE:
      return Object.assign({}, state, { performType: action.payload });
    case types.MONTH_TYPE:
      return Object.assign({}, state, { monthType: action.payload });
    case types.PIE_CHAT:
      return Object.assign({}, state, { pieData: action.payload });
    case types.PEN_PROJECT:
      return Object.assign({}, state, { penProject: action.payload });
    case types.PEN_PERSON:
      return Object.assign({}, state, { penPerson: action.payload });
    case types.TASK_NUMS_PROJECT:
      return Object.assign({}, state, { taskNumsProject: action.payload });
    case types.TASK_NUMS_PERSON:
      return Object.assign({}, state, { taskNumsPerson: action.payload });
    default:
      return state;
  }
}
