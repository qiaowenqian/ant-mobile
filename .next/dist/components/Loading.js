'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

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

var _loading = require('../styles/components/loading.scss');

var _loading2 = _interopRequireDefault(_loading);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = 'D:\\work\\phone-new\\components\\Loading.js';


/*
 *  ( 必填 ) show: 是否渲染loading组件
 *  ( 选填 ) classStr：尺寸样式，默认没有，可选择 loading_minSize
 */

var Loading = function (_Component) {
	(0, _inherits3.default)(Loading, _Component);

	function Loading(props) {
		(0, _classCallCheck3.default)(this, Loading);

		var _this2 = (0, _possibleConstructorReturn3.default)(this, (Loading.__proto__ || (0, _getPrototypeOf2.default)(Loading)).call(this, props));

		_this2.state = {
			show: false,
			classStr: "load_loading"
		};
		return _this2;
	}

	(0, _createClass3.default)(Loading, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			if (this.props.show) {
				this.setState({ show: true });
			} else {
				var _this = this;
				setTimeout(function () {
					_this.setState({ show: false });
				}, 50);
			}

			if (this.props.classStr) {
				this.setState({ classStr: "load_loading " + this.props.classStr });
			}
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			if (nextProps.show) {
				this.setState({ show: true });
			} else {
				var _this = this;
				setTimeout(function () {
					_this.setState({ show: false });
				}, 50);
			}

			if (nextProps.classStr) {
				this.setState({ classStr: "load_loading " + nextProps.classStr });
			}
		}
	}, {
		key: 'render',
		value: function render() {
			if (this.state.show) {
				return _react2.default.createElement('div', { className: this.state.classStr, __source: {
						fileName: _jsxFileName,
						lineNumber: 55
					}
				}, _react2.default.createElement('style', { dangerouslySetInnerHTML: { __html: _loading2.default }, __source: {
						fileName: _jsxFileName,
						lineNumber: 56
					}
				}), _react2.default.createElement('div', { className: 'ant-spin ant-spin-spinning', __source: {
						fileName: _jsxFileName,
						lineNumber: 57
					}
				}, _react2.default.createElement('span', { className: 'ant-spin-dot ant-spin-dot-spin', __source: {
						fileName: _jsxFileName,
						lineNumber: 58
					}
				}, _react2.default.createElement('i', {
					__source: {
						fileName: _jsxFileName,
						lineNumber: 59
					}
				}), _react2.default.createElement('i', {
					__source: {
						fileName: _jsxFileName,
						lineNumber: 59
					}
				}), _react2.default.createElement('i', {
					__source: {
						fileName: _jsxFileName,
						lineNumber: 59
					}
				}), _react2.default.createElement('i', {
					__source: {
						fileName: _jsxFileName,
						lineNumber: 59
					}
				}))));
			} else {
				return null;
			}
		}
	}]);

	return Loading;
}(_react.Component);

exports.default = Loading;