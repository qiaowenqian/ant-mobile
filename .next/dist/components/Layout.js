'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _localeProvider = require('antd-mobile/lib/locale-provider');

var _localeProvider2 = _interopRequireDefault(_localeProvider);

var _getPrototypeOf = require('_babel-runtime@6.23.0@babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('_babel-runtime@6.23.0@babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('_babel-runtime@6.23.0@babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('_babel-runtime@6.23.0@babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('_babel-runtime@6.23.0@babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _en_US = require('antd-mobile/lib/locale-provider/en_US');

var _en_US2 = _interopRequireDefault(_en_US);

var _nprogress = require('nprogress');

var _nprogress2 = _interopRequireDefault(_nprogress);

var _index = require('_next@2.4.9@next\\dist\\lib\\router\\index.js');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = 'D:\\work\\phone-new\\components\\Layout.js';

_nprogress2.default.configure({
  template: "<div class='more more-login'  >  <div role='bar' style='display: none'></div><div class='bounce1'  ></div><div class='bounce2'></div><div class='bounce3'></div></div>"
});
//window.sessionStorage
_index2.default.onRouteChangeStart = function (url) {
  url != _index2.default.router.asPath ? _nprogress2.default.start() : '';
};
//Router.onRouteChangeComplete = () => NProgress.done()
_index2.default.onRouteChangeError = function () {
  return _nprogress2.default.done();
};

var Layout = function (_Component) {
  (0, _inherits3.default)(Layout, _Component);

  function Layout() {
    (0, _classCallCheck3.default)(this, Layout);

    return (0, _possibleConstructorReturn3.default)(this, (Layout.__proto__ || (0, _getPrototypeOf2.default)(Layout)).apply(this, arguments));
  }

  (0, _createClass3.default)(Layout, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          language = _props.language,
          children = _props.children;

      var locale = language ? language.substr(0, 2) === 'en' ? _en_US2.default : undefined : undefined;

      return _react2.default.createElement(_localeProvider2.default, { locale: locale, __source: {
          fileName: _jsxFileName,
          lineNumber: 20
        }
      }, children);
    }
  }]);

  return Layout;
}(_react.Component);

exports.default = Layout;