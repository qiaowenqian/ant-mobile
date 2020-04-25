'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FREE_LIMIT = undefined;
exports.content = content;
exports.getLimtTask = getLimtTask;
exports.getLimtProject = getLimtProject;
exports.getFreeLimit = getFreeLimit;

var _httpClient = require('../api/httpClient');

var _httpClient2 = _interopRequireDefault(_httpClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FREE_LIMIT = exports.FREE_LIMIT = 'FREE_LIMIT';

function content(data, type) {
    return {
        type: type,
        payload: data
    };
}
//免费版task限制
function getLimtTask(callback) {
    _httpClient2.default.AjaxGet('/taskinfo/taskCountLimit', function (list) {
        callback(list);
    });
}
//免费版project限制
function getLimtProject(callback) {
    _httpClient2.default.AjaxGet('/project/projectCountLimit', function (list) {
        callback(list);
    });
}
// 切换免费版
function getFreeLimit(callback) {
    _httpClient2.default.AjaxGet('/time/createFreeOrder', function (list) {
        callback(list);
    });
}