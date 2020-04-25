'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _icon = require('antd-mobile/lib/icon');

var _icon2 = _interopRequireDefault(_icon);

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

var _index = require('_next@2.4.9@next\\dist\\lib\\router\\index.js');

var _index2 = _interopRequireDefault(_index);

var _dingtalk = require('../utils/dingtalk');

var _dingtalk2 = _interopRequireDefault(_dingtalk);

var _alert = require('../styles/components/alert.scss');

var _alert2 = _interopRequireDefault(_alert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = 'D:\\work\\phone-new\\components\\alert.js';


/*
 * （必填）title:''             // 提示标题
 * （必填）msg:''               // 提示内容
 * （选填）okButTxt             // 确定按钮名称
 * （选填）butIsOne:false       // 是否是一个按钮
 * （必填）okCallBack()         // 确定回调
 * （选填）calButTxt:''         // 取消按钮名称
 * （必填）calCallBack()        // 取消回调
 * （选填）closeIconShow:false  // 是否需要关闭图标
 * （选填）closeIconClickCallBack() // 关闭图标点击回调
 */

var Alert = function (_Component) {
	(0, _inherits3.default)(Alert, _Component);

	function Alert(props) {
		(0, _classCallCheck3.default)(this, Alert);

		var _this = (0, _possibleConstructorReturn3.default)(this, (Alert.__proto__ || (0, _getPrototypeOf2.default)(Alert)).call(this, props));

		_this.state = {};
		return _this;
	}

	(0, _createClass3.default)(Alert, [{
		key: 'componentWillMount',
		value: function componentWillMount() {}
	}, {
		key: 'componentUnMount',
		value: function componentUnMount() {}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _props = this.props,
			    title = _props.title,
			    msg = _props.msg,
			    okButTxt = _props.okButTxt,
			    calButTxt = _props.calButTxt,
			    butIsOne = _props.butIsOne;
			var closeIconShow = this.props.closeIconShow;

			if (!closeIconShow) {
				closeIconShow = false;
			}
			return _react2.default.createElement('div', { className: 'alert', __source: {
					fileName: _jsxFileName,
					lineNumber: 43
				}
			}, _react2.default.createElement('style', { dangerouslySetInnerHTML: { __html: _alert2.default }, __source: {
					fileName: _jsxFileName,
					lineNumber: 44
				}
			}), _react2.default.createElement('div', { className: 'alertBox', __source: {
					fileName: _jsxFileName,
					lineNumber: 45
				}
			}, closeIconShow ? _react2.default.createElement(_icon2.default, { className: 'colse', type: 'cross', onClick: function onClick() {
					_this2.props.closeIconClickCallBack();
				}, __source: {
					fileName: _jsxFileName,
					lineNumber: 46
				}
			}) : '', _react2.default.createElement('div', { className: 'topName', __source: {
					fileName: _jsxFileName,
					lineNumber: 47
				}
			}, _react2.default.createElement('span', { className: 'title', __source: {
					fileName: _jsxFileName,
					lineNumber: 47
				}
			}, title), _react2.default.createElement('span', { style: { textDecoration: 'underline' }, onClick: function onClick() {
					_index2.default.push(_dingtalk2.default.setDdNavColor('/mo_version'));
				}, __source: {
					fileName: _jsxFileName,
					lineNumber: 47
				}
			}, '\u7248\u672C\u4ECB\u7ECD')), _react2.default.createElement('p', { dangerouslySetInnerHTML: { __html: msg }, __source: {
					fileName: _jsxFileName,
					lineNumber: 48
				}
			}), butIsOne ? _react2.default.createElement('div', { className: 'butOne', onClick: function onClick() {
					_this2.props.okCallBack();
				}, __source: {
					fileName: _jsxFileName,
					lineNumber: 50
				}
			}, okButTxt ? okButTxt : '确定') : _react2.default.createElement('div', { className: 'butTwo', __source: {
					fileName: _jsxFileName,
					lineNumber: 52
				}
			}, _react2.default.createElement('div', { className: 'but1', onClick: function onClick() {
					_this2.props.calCallBack();
				}, __source: {
					fileName: _jsxFileName,
					lineNumber: 53
				}
			}, calButTxt ? calButTxt : '取消'), _react2.default.createElement('div', { className: 'but2', onClick: function onClick() {
					_this2.props.okCallBack();
				}, __source: {
					fileName: _jsxFileName,
					lineNumber: 54
				}
			}, okButTxt ? okButTxt : '确定'))));
		}
	}]);

	return Alert;
}(_react.Component);

exports.default = Alert;