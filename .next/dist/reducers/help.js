'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = help;

var _assign = require('_babel-runtime@6.23.0@babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _help = require('../actions/help');

var types = _interopRequireWildcard(_help);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState = {
    list: [],
    typeList: [],
    helps: {}
};
function help() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    switch (action.type) {
        case types.HEHPS_LIST:
            return (0, _assign2.default)({}, state, { list: action.payload });
        case types.HEHPS_TYPE_LIST:
            return (0, _assign2.default)({}, state, { typeList: action.payload });
        case types.HEHPS_DETAIL:
            return (0, _assign2.default)({}, state, { helps: action.payload });
        default:
            return state;
    }
}