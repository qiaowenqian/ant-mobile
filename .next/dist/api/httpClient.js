"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.visitUrl = undefined;

var _promise = require("_babel-runtime@6.23.0@babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _getPrototypeOf = require("_babel-runtime@6.23.0@babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("_babel-runtime@6.23.0@babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("_babel-runtime@6.23.0@babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("_babel-runtime@6.23.0@babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("_babel-runtime@6.23.0@babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _fetchFn = require("./fetchFn");

var _fetchFn2 = _interopRequireDefault(_fetchFn);

var _dingtalk = require("../utils/dingtalk");

var _dingtalk2 = _interopRequireDefault(_dingtalk);

var _storage = require("../utils/storage");

var _storage2 = _interopRequireDefault(_storage);

var _index = require("_next@2.4.9@next\\dist\\lib\\router\\index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var visitUrl = exports.visitUrl = "http://localhost:3000";
// export const visitUrl = "www.antbim.cn";
var baseURI = visitUrl + "/antvip/ant-cgi";


var flag = true;
var version = "2.1.0";

var HttpClient = function (_React$Component) {
  (0, _inherits3.default)(HttpClient, _React$Component);

  function HttpClient() {
    (0, _classCallCheck3.default)(this, HttpClient);

    return (0, _possibleConstructorReturn3.default)(this, (HttpClient.__proto__ || (0, _getPrototypeOf2.default)(HttpClient)).apply(this, arguments));
  }

  (0, _createClass3.default)(HttpClient, null, [{
    key: "getVersion",
    value: function getVersion() {
      return version;
    }
  }, {
    key: "AjaxGet",
    value: function AjaxGet(url, cb) {
      var opt = {
        type: "get",
        url: baseURI + url
      };
      _fetchFn2.default.fetchFn(opt, cb, function (err) {
        cb();
      });
    }
  }, {
    key: "AjaxPostSync",
    value: function AjaxPostSync(url, data, cb, funErr) {
      var _this2 = this;

      if (flag) {
        flag = false;
        setTimeout(function () {
          flag = true;
        }, 500);
        var opt = {
          type: "post",
          url: baseURI + url,
          data: data
        };
        _fetchFn2.default.fetchFn(opt, cb, function (err) {
          if (err == "404") {
            var corpId = _storage2.default.getSession("corpId");
            _this2.httpPostError(corpId).then(function () {
              _fetchFn2.default.fetchFn(opt, cb, function (err) {
                //Router.push('/mo_login');
                console.log(err);
              });
            }, function (err) {
              //再次请求失败后 从新登陆
              //Router.push('/mo_login');
              console.log(err);
            });
          }
        });
      }
    }
  }, {
    key: "AjaxPost",
    value: function AjaxPost(url, data, cb, funErr) {
      var _this3 = this;

      var opt = {
        type: "post",
        url: baseURI + url,
        data: data
      };
      _fetchFn2.default.fetchFn(opt, cb, function (err) {
        if (err == "404") {
          var corpId = _storage2.default.getSession("corpId");
          _this3.httpPostError(corpId).then(function () {
            _fetchFn2.default.fetchFn(opt, cb, function (err) {
              //Router.push('/mo_login');
              console.log(err);
            });
          }, function () {
            //再次请求失败后 从新登陆
            //Router.push('/mo_login');
            console.log(err);
          });
        }
      });
    }
    //登陆失败再次登陆

  }, {
    key: "httpPostError",
    value: function httpPostError(corpId) {
      var p = new _promise2.default(function (resolve, reject) {
        //做一些异步操作
        _dingtalk2.default.getLoginCode(corpId, function (code) {
          var opt = {
            type: "post",
            url: baseURI + "/user/dingtalkMobileCodeLogin?code=" + code + "&corpid=" + corpId,
            data: ""
          };
          _fetchFn2.default.fetchFn(opt, function (data) {
            _storage2.default.login(data.data);
            resolve();
          }, function (err) {
            console.log(err, "---------------getLoginCode-error------");
            reject(err);
            //Router.push('/mo_login')
          });
        }, function (err) {
          console.log(err, "---------------getAgainLogin-error------");
          reject(err);
          //Router.push('/mo_login');
        });
      });
      return p;
    }
  }]);

  return HttpClient;
}(_react2.default.Component);

exports.default = HttpClient;