'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FEED_ADD = undefined;
exports.save = save;
exports.content = content;

var _httpClient = require('../api/httpClient');

var _httpClient2 = _interopRequireDefault(_httpClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FEED_ADD = exports.FEED_ADD = 'FEED_ADD';


//添加意见反馈
function save(mail, remarks) {
    return function (dispatch) {
        _httpClient2.default.AjaxPost('/feedback/save', { mail: mail, remarks: remarks }, function (list) {
            dispatch(content(list, FEED_ADD));
        });
    };
}

function content(data, type) {
    return {
        type: type,
        payload: data
    };
}