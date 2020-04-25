'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.HEHPS_DETAIL = exports.HEHPS_TYPE_LIST = exports.HEHPS_LIST = undefined;
exports.findList = findList;
exports.findTypeList = findTypeList;
exports.getDetail = getDetail;
exports.content = content;

var _httpClient = require('../api/httpClient');

var _httpClient2 = _interopRequireDefault(_httpClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HEHPS_LIST = exports.HEHPS_LIST = 'HEHPS_LIST';
var HEHPS_TYPE_LIST = exports.HEHPS_TYPE_LIST = 'HEHPS_TYPE_LIST';
var HEHPS_DETAIL = exports.HEHPS_DETAIL = 'HEHPS_DETAIL';


// 获取对应分类的列表
function findList() {
    var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var fn = arguments[2];

    return function (dispatch) {
        _httpClient2.default.AjaxPost('/helps/findList?page=' + page, data, function (list) {
            if (fn) {
                fn();
            }
            dispatch(content(list, HEHPS_LIST));
        });
    };
}

// 获取列表分类
function findTypeList() {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var fn = arguments[1];

    return function (dispatch) {
        _httpClient2.default.AjaxPost('/helps/findTypeList', data, function (list) {
            if (fn) {
                fn();
            }
            dispatch(content(list, HEHPS_TYPE_LIST));
        });
    };
}

// 获取详情
function getDetail(id, fn) {
    return function (dispatch) {
        _httpClient2.default.AjaxPost('/helps/getDetail?id=' + id, {}, function (list) {
            if (fn) {
                fn();
            }
            dispatch(content(list, HEHPS_DETAIL));
        });
    };
}

function content(data, type) {
    return {
        type: type,
        payload: data
    };
}