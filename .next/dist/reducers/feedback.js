'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = feedback;

var _assign = require('_babel-runtime@6.23.0@babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _feedback = require('../actions/feedback');

var types = _interopRequireWildcard(_feedback);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState = {
    add: null
};
function feedback() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    switch (action.type) {
        case types.FEED_ADD:
            return (0, _assign2.default)({}, state, { add: action.payload });
        default:
            return state;
    }
}