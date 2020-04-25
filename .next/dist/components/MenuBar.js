"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _icon = require("antd-mobile/lib/icon");

var _icon2 = _interopRequireDefault(_icon);

var _defineProperty2 = require("_babel-runtime@6.23.0@babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

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

var _index = require("_next@2.4.9@next\\dist\\lib\\router\\index.js");

var _index2 = _interopRequireDefault(_index);

var _store = require("../store");

var _nextReduxWrapper = require("next-redux-wrapper");

var _nextReduxWrapper2 = _interopRequireDefault(_nextReduxWrapper);

var _alert = require("../components/alert");

var _alert2 = _interopRequireDefault(_alert);

var _version = require("../actions/version");

var versionAction = _interopRequireWildcard(_version);

var _redux = require("redux");

var _storage = require("../utils/storage");

var _storage2 = _interopRequireDefault(_storage);

var _user = require("../actions/user");

var userAction = _interopRequireWildcard(_user);

var _menuBar = require("../styles/components/menuBar.scss");

var _menuBar2 = _interopRequireDefault(_menuBar);

var _utils = require("../utils/utils");

var _utils2 = _interopRequireDefault(_utils);

var _dingtalk = require("../utils/dingtalk");

var _dingtalk2 = _interopRequireDefault(_dingtalk);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = "D:\\work\\phone-new\\components\\MenuBar.js";

// import user from '../reducers/user';
/*
 *  ( 必填 ) pathName: 路径名称
 */

var menuBar = function (_Component) {
	(0, _inherits3.default)(menuBar, _Component);

	function menuBar(props) {
		(0, _classCallCheck3.default)(this, menuBar);

		var _this = (0, _possibleConstructorReturn3.default)(this, (menuBar.__proto__ || (0, _getPrototypeOf2.default)(menuBar)).call(this, props));

		_this.redirect = function (url) {
			var user = _this.state.user;

			if (url == "/mo_statistics") {
				if (_utils2.default.getTeamInfoWithMoney("是否可用", user)) {
					_this.routerPush(url);
				} else {
					_this.setState({
						statisticAlertShow: true
					});
				}
			} else {
				_this.routerPush(url);
			}
		};

		_this.state = (0, _defineProperty3.default)({
			pathName: "",
			addShow: false, // 添加层是否显示
			taskFree: "",
			projectFree: false,
			taskLimit: "",
			projectMax: 0,
			proAlertShow: false,
			tasAlertShow: false,
			statisticAlertShow: false,
			taskMax: "",
			user: {}
		}, "projectMax", "");
		return _this;
	}

	(0, _createClass3.default)(menuBar, [{
		key: "componentWillMount",
		value: function componentWillMount() {
			this.setState({ pathName: this.props.pathName });
		}
	}, {
		key: "componentDidMount",
		value: function componentDidMount() {
			_utils2.default.butAnimate();
			var user = _storage2.default.getSession("user");
			this.setState({ user: user });
			// console.log(nowUser,3495278589402)
			// if (!this.props.urlData) {
			// 	this.props.setUrlData(
			// 		encodeURIComponent(location.href.split("#")[0])
			// 	);
			// }
		}
	}, {
		key: "componentWillReceiveProps",
		value: function componentWillReceiveProps(nextProps) {
			this.setState({ pathName: nextProps.pathName });
			if (_index2.default.query.addShow == "true") {
				this.setState({ addShow: true });
			} else if (_index2.default.query.addShow == undefined || _index2.default.query.addShow == "false") {
				this.setState({ addShow: false });
			}
		}
	}, {
		key: "componentDidUpdate",
		value: function componentDidUpdate() {
			_utils2.default.butAnimate();
		}
	}, {
		key: "componentWillUnmount",
		value: function componentWillUnmount() {
			this.setState({ addShow: false });
		}
	}, {
		key: "routerPush",
		value: function routerPush(url) {
			_index2.default.push(_dingtalk2.default.setDdNavColor(url));
		}
	}, {
		key: "addShow",
		value: function addShow() {
			this.setState({ addShow: true });
		}

		// 创建任务

	}, {
		key: "taskCreateShow",
		value: function taskCreateShow() {
			var _this2 = this;

			var _state = this.state,
			    taskFree = _state.taskFree,
			    user = _state.user;

			if (_utils2.default.getTeamInfoWithMoney("版本名称", user) === "免费版") {
				(0, _version.getLimtTask)(function (data) {
					_this2.setState({
						taskFree: data.data.success,
						taskMax: data.data.projectMax
					});
					if (!data.data.success) {
						_this2.setState({ tasAlertShow: true });
					}
					if (data.data.success) {
						var pathName = _index2.default.router.pathname;
						if (pathName.indexOf("/mo_projectDetails") !== -1) {
							var openProject = _this2.props.openProject;
							_this2.routerPush("/mo_taskCreate?newTask=true&selectedProId=" + openProject.id + "&selectedProName=" + openProject.name);
						} else {
							_this2.routerPush("/mo_taskCreate?newTask=true");
						}
					}
				});
			} else {
				var pathName = _index2.default.router.pathname;
				if (pathName.indexOf("/mo_projectDetails") !== -1) {
					var openProject = this.props.openProject;
					this.routerPush("/mo_taskCreate?newTask=true&selectedProId=" + openProject.id + "&selectedProName=" + openProject.name);
				} else {
					this.routerPush("/mo_taskCreate?newTask=true");
				}
			}
		}
		//创建项目

	}, {
		key: "projectCreate",
		value: function projectCreate() {
			var _this3 = this;

			var _state2 = this.state,
			    projectFree = _state2.projectFree,
			    user = _state2.user;

			if (_utils2.default.getTeamInfoWithMoney("版本名称", user) === "免费版") {
				(0, _version.getLimtProject)(function (data) {
					_this3.setState({
						projectMax: data.data.projectMax,
						projectFree: data.data.success
					});
					if (!data.data.success) {
						_this3.setState({ proAlertShow: true });
					}
					if (data.data.success) {
						_this3.routerPush("/mo_projectCreate");
					}
				});
			} else {
				this.routerPush("/mo_projectCreate");
			}
		}
	}, {
		key: "render",
		value: function render() {
			var _this4 = this;

			var _state3 = this.state,
			    pathName = _state3.pathName,
			    addShow = _state3.addShow,
			    user = _state3.user,
			    proAlertShow = _state3.proAlertShow,
			    tasAlertShow = _state3.tasAlertShow,
			    projectMax = _state3.projectMax,
			    taskMax = _state3.taskMax,
			    statisticAlertShow = _state3.statisticAlertShow;
			// console.log(pathName, "pathNamepathName");

			var tasMax = " <div class='textLimit'>\u60A8\u6B63\u5728\u4F7F\u7528\u7684\u662F<b> \u8682\u8681\u5206\u5DE5\u514D\u8D39\u7248</b>\uFF0C\u514D\u8D39\u7248\u6BCF\u6708\u53EF\u521B\u5EFA<b> 200 </b>\u6761\u4EFB\u52A1\uFF0C\u672C\u6708\u4EFB\u52A1\u7528\u91CF\u5DF2\u8FBE\u7248\u672C\u4E0A\u9650\u3002</div>\n\t\t\t\t\t\t\t<div class='textLimit'>\u5982\u60A8\u7684\u56E2\u961F\u9879\u76EE\u548C\u4EFB\u52A1\u6570\u91CF\u8F83\u591A\uFF0C\u53EF\u5347\u7EA7\u4E3A\u7ECF\u6D4E\u5B9E\u60E0\u7684<b> \u8682\u8681\u5206\u5DE5\u57FA\u7840\u7248</b>\uFF0C\u57FA\u7840\u7248\u4E0D\u9650\u4F7F\u7528\u4EBA\u6570\u3001\u4E0D\u9650\u9879\u76EE\u6570\u91CF\u3001\u4E0D\u9650\u4EFB\u52A1\u6570\u91CF\u3002</div>\n\t\t\t\t\t\t\t<div class='textLimit1'>\u6211\u4EEC\u66F4\u5EFA\u8BAE\u60A8\u5347\u7EA7\u5230\u529F\u80FD\u5F3A\u5927\u7684<b> \u8682\u8681\u5206\u5DE5\u4E13\u4E1A\u7248</b>\uFF0C\u4E13\u4E1A\u7248\u5177\u6709\u6279\u91CF\u4EFB\u52A1\u64CD\u4F5C\u3001\u7518\u7279\u56FE\u3001\u591A\u7EF4\u5EA6\u6570\u636E\u7EDF\u8BA1\u56FE\u8868\u7B49\u4E13\u4E1A\u529F\u80FD\uFF0C\u52A9\u60A8\u63D0\u9AD8\u534F\u540C\u5DE5\u4F5C\u6548\u7387\u3001\u63D0\u5347\u9879\u76EE\u7BA1\u7406\u6C34\u5E73\u3002</div>";
			return _react2.default.createElement("div", { className: "menuBar", __source: {
					fileName: _jsxFileName,
					lineNumber: 183
				}
			}, _react2.default.createElement("style", {
				dangerouslySetInnerHTML: {
					__html: _menuBar2.default
				},
				__source: {
					fileName: _jsxFileName,
					lineNumber: 184
				}
			}), _react2.default.createElement("div", {
				className: pathName.indexOf("/mo_dingHome") !== -1 ? "but act aniBut" : "but aniBut",
				onClick: function onClick() {
					return _this4.redirect("/mo_dingHome");
				},
				__source: {
					fileName: _jsxFileName,
					lineNumber: 189
				}
			}, _react2.default.createElement(_icon2.default, {
				type: pathName.indexOf("/mo_dingHome") !== -1 ? "anticon-home-selected" : "anticon-home",
				__source: {
					fileName: _jsxFileName,
					lineNumber: 201
				}
			}), _react2.default.createElement("span", {
				__source: {
					fileName: _jsxFileName,
					lineNumber: 210
				}
			}, "\u9996\u9875")), _react2.default.createElement("div", {
				className: pathName == "/mo_task" ? "but act aniBut" : "but aniBut",
				onClick: function onClick() {
					return _this4.redirect("/mo_task");
				},
				__source: {
					fileName: _jsxFileName,
					lineNumber: 212
				}
			}, _react2.default.createElement(_icon2.default, {
				type: pathName == "/mo_task" ? "anticon-task-seleted" : "anticon-task",
				__source: {
					fileName: _jsxFileName,
					lineNumber: 222
				}
			}), _react2.default.createElement("span", {
				__source: {
					fileName: _jsxFileName,
					lineNumber: 229
				}
			}, "\u4EFB\u52A1")), _react2.default.createElement("div", {
				className: pathName == "/mo_project" ? "but act aniBut" : "but aniBut",
				onClick: function onClick() {
					return _this4.redirect("/mo_project");
				},
				__source: {
					fileName: _jsxFileName,
					lineNumber: 236
				}
			}, _react2.default.createElement(_icon2.default, {
				type: pathName == "/mo_project" ? "anticon-project-selected" : "anticon-project",
				__source: {
					fileName: _jsxFileName,
					lineNumber: 246
				}
			}), _react2.default.createElement("span", {
				__source: {
					fileName: _jsxFileName,
					lineNumber: 254
				}
			}, "\u9879\u76EE")), _react2.default.createElement("div", {
				className: pathName == "/mo_statistics" ? "but act aniBut" : "but aniBut",
				onClick: function onClick() {
					return _this4.redirect("/mo_statistics");
				},
				__source: {
					fileName: _jsxFileName,
					lineNumber: 265
				}
			}, _react2.default.createElement(_icon2.default, {
				type: pathName == "/mo_statistics" ? "anticon-stats-selected" : "anticon-stats",
				__source: {
					fileName: _jsxFileName,
					lineNumber: 275
				}
			}), _react2.default.createElement("span", {
				__source: {
					fileName: _jsxFileName,
					lineNumber: 283
				}
			}, "\u7EDF\u8BA1")), _react2.default.createElement("div", {
				className: pathName == "/mo_dynamic" ? "but act aniBut" : "but aniBut",
				onClick: function onClick() {
					return _this4.routerPush("/mo_dynamic");
				},
				__source: {
					fileName: _jsxFileName,
					lineNumber: 285
				}
			}, _react2.default.createElement(_icon2.default, {
				type: pathName == "/mo_dynamic" ? "anticon-activitys-copy" : "anticon-activity",
				__source: {
					fileName: _jsxFileName,
					lineNumber: 295
				}
			}), _react2.default.createElement("span", {
				__source: {
					fileName: _jsxFileName,
					lineNumber: 303
				}
			}, "\u52A8\u6001")), addShow ? _react2.default.createElement("div", { className: "addBox", __source: {
					fileName: _jsxFileName,
					lineNumber: 319
				}
			}, _react2.default.createElement("ul", { className: "list", __source: {
					fileName: _jsxFileName,
					lineNumber: 320
				}
			}, _react2.default.createElement("li", {
				onClick: function onClick() {
					_this4.taskCreateShow();
				},
				className: "iconBlue_txtGray aniBut",
				__source: {
					fileName: _jsxFileName,
					lineNumber: 321
				}
			}, _react2.default.createElement(_icon2.default, { type: "anticon-jinrirenwu", __source: {
					fileName: _jsxFileName,
					lineNumber: 327
				}
			}), _react2.default.createElement("span", {
				__source: {
					fileName: _jsxFileName,
					lineNumber: 328
				}
			}, "\u521B\u5EFA\u4EFB\u52A1")), _react2.default.createElement("li", {
				className: "iconBlue_txtGray aniBut",
				onClick: function onClick() {
					_this4.projectCreate();
				},
				__source: {
					fileName: _jsxFileName,
					lineNumber: 332
				}
			}, _react2.default.createElement(_icon2.default, { type: "anticon-xiangmuguangliwq", __source: {
					fileName: _jsxFileName,
					lineNumber: 338
				}
			}), _react2.default.createElement("span", {
				__source: {
					fileName: _jsxFileName,
					lineNumber: 339
				}
			}, "\u521B\u5EFA\u9879\u76EE"))), _react2.default.createElement("div", {
				className: "cancel aniButBlue",
				onClick: function onClick() {
					_this4.setState({
						addShow: false
					});
				},
				__source: {
					fileName: _jsxFileName,
					lineNumber: 344
				}
			}, "\u53D6\u6D88")) : "", _utils2.default.getTeamInfoWithMoney("版本名称", user) === "免费版" && tasAlertShow ? _react2.default.createElement(_alert2.default, {
				title: "\u7528\u91CF\u9650\u5236",
				msg: tasMax,
				butIsOne: "false",
				okButTxt: "\u5347\u7EA7\u7248\u672C",
				closeIconShow: true,
				closeIconClickCallBack: function closeIconClickCallBack() {
					_this4.setState({
						tasAlertShow: false
					});
				},
				okCallBack: function okCallBack() {
					_this4.setState({
						tasAlertShow: false
					}), _index2.default.push(_dingtalk2.default.setDdNavColor("/mo_version"));
				},
				__source: {
					fileName: _jsxFileName,
					lineNumber: 362
				}
			}) : "", console.log(_utils2.default.getTeamInfoWithMoney("专业版功能", user)), statisticAlertShow && _react2.default.createElement(_alert2.default, {
				title: "\u4E13\u4E1A\u7248\u529F\u80FD",
				msg: "\u56FE\u8868\u5316\u9879\u76EE\u7BA1\u7406\u3001\u6279\u91CF\u4FBF\u6377\u64CD\u4F5C\u3001\u591A\u7EF4\u5EA6\u6570\u636E\u7EDF\u8BA1\u3001WBS\u6587\u4EF6\u7CFB\u7EDF\u7B49\u90FD\u4E3A\u8682\u8681\u5206\u5DE5\u4E13\u4E1A\u7248\u529F\u80FD\uFF0C\u540C\u65F6\u8FD8\u6709\u66F4\u591A\u9AD8\u7EA7\u529F\u80FD\u5C06\u9646\u7EED\u5F00\u653E\u3002",
				okButTxt: "\u5347\u7EA7\u4E13\u4E1A\u7248",
				butIsOne: true,
				closeIconShow: true,
				okCallBack: function okCallBack() {
					_this4.setState({
						statisticAlertShow: false
					}), _index2.default.push(_dingtalk2.default.setDdNavColor("/mo_version"));
				},
				calCallBack: function calCallBack() {},
				closeIconClickCallBack: function closeIconClickCallBack() {
					_this4.setState({
						statisticAlertShow: false
					});
				},
				__source: {
					fileName: _jsxFileName,
					lineNumber: 394
				}
			}), _utils2.default.getTeamInfoWithMoney("版本名称", user) === "免费版" && proAlertShow ? _react2.default.createElement(_alert2.default, {
				style: { textAlign: "center" },
				title: "\u7528\u91CF\u9650\u5236",
				msg: tasMax,
				okButTxt: "\u7EE7\u7EED\u521B\u5EFA\u9879\u76EE>",
				calButTxt: "\u5347\u7EA7\u7248\u672C",
				closeIconShow: true,
				okCallBack: function okCallBack() {
					_this4.routerPush("/mo_projectCreate");
				},
				calCallBack: function calCallBack() {
					_this4.setState({
						tasAlertShow: false
					}), _index2.default.push(_dingtalk2.default.setDdNavColor("/mo_version"));
				},
				closeIconClickCallBack: function closeIconClickCallBack() {
					_this4.setState({
						proAlertShow: false
					});
				},
				__source: {
					fileName: _jsxFileName,
					lineNumber: 422
				}
			}) : "");
		}
	}]);

	return menuBar;
}(_react.Component);

function mapStateToProps(state) {
	return {
		openProject: state.project.openProject,
		urlData: state.user.urlData
	};
}
var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	return {
		setUrlData: (0, _redux.bindActionCreators)(userAction.setUrlData, dispatch),
		getLimtTask: (0, _redux.bindActionCreators)(versionAction.getLimtTask, dispatch)
	};
};
exports.default = (0, _nextReduxWrapper2.default)(_store.initStore, mapStateToProps, mapDispatchToProps)(menuBar);