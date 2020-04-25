'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _stringify = require('_babel-runtime@6.23.0@babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Storage = function (_React$Component) {
	(0, _inherits3.default)(Storage, _React$Component);

	function Storage() {
		(0, _classCallCheck3.default)(this, Storage);

		return (0, _possibleConstructorReturn3.default)(this, (Storage.__proto__ || (0, _getPrototypeOf2.default)(Storage)).apply(this, arguments));
	}

	(0, _createClass3.default)(Storage, null, [{
		key: 'setSession',
		value: function setSession(key, value) {
			if (sessionStorage) {
				sessionStorage.setItem(key, value);
			}
		}
	}, {
		key: 'getSession',
		value: function getSession(key) {
			if (sessionStorage) {
				var date = sessionStorage.getItem(key);
				try {
					return JSON.parse(date);
				} catch (e) {
					return date;
				}
			}
		}
	}, {
		key: 'removeSession',
		value: function removeSession(key) {
			if (sessionStorage) {
				sessionStorage.removeItem(key);
			}
		}
	}, {
		key: 'setLocal',
		value: function setLocal(key, value) {
			if (localStorage) {
				localStorage.setItem(key, value);
			}
		}
	}, {
		key: 'getLocal',
		value: function getLocal(key) {
			if (localStorage) {
				return localStorage.getItem(key);
			}
		}
	}, {
		key: 'removeLocal',
		value: function removeLocal(key) {
			if (localStorage) {
				localStorage.removeItem(key);
			}
		}

		//注销

	}, {
		key: 'write',
		value: function write() {
			this.removeSession('user', { path: '/' });
		}
		//登录

	}, {
		key: 'login',
		value: function login(user) {
			this.setSession('user', (0, _stringify2.default)(user));console.log(user);
		}
		//设置手机版本

	}, {
		key: 'setPhoneVersion',
		value: function setPhoneVersion(version) {
			this.setSession('phoneVersion', version);
		}
	}]);

	return Storage;
}(_react2.default.Component);

exports.default = Storage;