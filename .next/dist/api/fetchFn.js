"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require("_babel-runtime@6.23.0@babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

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

require("isomorphic-fetch");

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FetchFn = function (_React$Component) {
  (0, _inherits3.default)(FetchFn, _React$Component);

  function FetchFn() {
    (0, _classCallCheck3.default)(this, FetchFn);

    return (0, _possibleConstructorReturn3.default)(this, (FetchFn.__proto__ || (0, _getPrototypeOf2.default)(FetchFn)).apply(this, arguments));
  }

  (0, _createClass3.default)(FetchFn, null, [{
    key: "fetchFn",
    value: function fetchFn(opt, cb, error) {
      var type = opt.type;
      var option = { method: "get", credentials: "include" };
      option.headers = new Headers({
        Accept: "application/json,text/plain, */*",
        "Content-Type": "application/json; charset=utf-8",
        Connection: "close",
        type: "getUserData"
      });
      if (type == "post") {
        option.method = "post";
        option.body = (0, _stringify2.default)(opt.data);
      }
      if (type == "file") {
        option.method = "post";
        option.body = opt.data;
      }
      fetch(opt.url, option).then(function (response) {
        if (response.status >= 200 && response.status < 300) {
          var data = response.json();
          return data;
        }
        if (error) {
          error(response.statusText);
        } else {
          console.log(response.statusText);
        }
      }).then(function (json) {
        if (cb) cb(json);
      }).catch(function (ex) {
        if (ex.description == "无效字符") {
          if (error) error();
        }
        if (opt.type == "get") {
          if (error) error();
        }
        if (error) {
          if (error) error(ex);
        }
        if (type == "post") {
          if (error) error("404");
        }
        console.log("通信失败", ex);
      });
    }
  }]);

  return FetchFn;
}(_react2.default.Component);

exports.default = FetchFn;