"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _icon = require("antd-mobile/lib/icon");

var _icon2 = _interopRequireDefault(_icon);

var _toast = require("antd-mobile/lib/toast");

var _toast2 = _interopRequireDefault(_toast);

var _getPrototypeOf = require("_babel-runtime@6.23.0@babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("_babel-runtime@6.23.0@babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require("_babel-runtime@6.23.0@babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _createClass2 = require("_babel-runtime@6.23.0@babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _inherits2 = require("_babel-runtime@6.23.0@babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _redux = require("redux");

var _nextReduxWrapper = require("next-redux-wrapper");

var _nextReduxWrapper2 = _interopRequireDefault(_nextReduxWrapper);

var _link = require("_next@2.4.9@next\\dist\\lib\\link.js");

var _link2 = _interopRequireDefault(_link);

var _index = require("_next@2.4.9@next\\dist\\lib\\router\\index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("antd-mobile/lib/icon/style/index.css");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("antd-mobile/lib/toast/style/index.css");

var _index6 = _interopRequireDefault(_index5);

var _store = require("../store");

var _dingHome = require("../styles/pages/dingHome.scss");

var _dingHome2 = _interopRequireDefault(_dingHome);

var _Layout = require("../components/Layout");

var _Layout2 = _interopRequireDefault(_Layout);

var _alert = require("../components/alert");

var _alert2 = _interopRequireDefault(_alert);

var _Loading = require("../components/Loading");

var _Loading2 = _interopRequireDefault(_Loading);

var _MenuBar = require("../components/MenuBar");

var _MenuBar2 = _interopRequireDefault(_MenuBar);

var _task = require("../actions/task");

var taskAction = _interopRequireWildcard(_task);

var _user = require("../actions/user");

var userAction = _interopRequireWildcard(_user);

var _dingtalk = require("../utils/dingtalk");

var _dingtalk2 = _interopRequireDefault(_dingtalk);

var _utils = require("../utils/utils");

var _utils2 = _interopRequireDefault(_utils);

var _storage = require("../utils/storage");

var _storage2 = _interopRequireDefault(_storage);

var _cache = require("../actions/cache");

var cacheAction = _interopRequireWildcard(_cache);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = "D:\\work\\phone-new\\pages\\mo_dingHome.js?entry";


/**
 * 首页
 */

var dingHome = function (_Component) {
  (0, _inherits3.default)(dingHome, _Component);

  (0, _createClass3.default)(dingHome, null, [{
    key: "getInitialProps",
    value: function getInitialProps(_ref) {
      var req = _ref.req,
          store = _ref.store,
          isServer = _ref.isServer;

      var language = req ? req.headers["accept-language"] : navigator.language;
      return {
        language: language
      };
    }
  }]);

  function dingHome(props) {
    (0, _classCallCheck3.default)(this, dingHome);

    var _this = (0, _possibleConstructorReturn3.default)(this, (dingHome.__proto__ || (0, _getPrototypeOf2.default)(dingHome)).call(this, props));

    _this.state = {
      one: 0,
      two: 0,
      three: 0,
      all: 0,
      objTalklist: [],
      homeDataLoading: false,

      messageMoreLoading: false,
      messageLoading: false,
      msgNowPage: 1,
      msgLastPage: 0,
      messageCount: 0,
      messageList: [],

      end15DaysShow: false,
      user: {}
    };
    return _this;
  }

  (0, _createClass3.default)(dingHome, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      _dingtalk2.default.setTitle("首页");
      _dingtalk2.default.setMenuHome();
      if (!this.props.urlData) {
        this.props.setUrlData(encodeURIComponent(location.href.split("#")[0]));
      }
      var user = _storage2.default.getSession("user");
      this.setState({ user: user });
      var end15DaysShowDate = _storage2.default.getLocal("end15DaysShowDate");
      if (_utils2.default.getTeamInfoWithMoney("剩余天数", user) < 15 && _utils2.default.dateToString(new Date()) !== end15DaysShowDate && (_utils2.default.getTeamInfoWithMoney("剩余天数", user) > 0 || _utils2.default.getTeamInfoWithMoney("剩余天数", user) === 0)) {
        this.setState({ end15DaysShow: true });
      }

      if (user && user.userid) {
        // 获取顶部数据
        if (this.props.homeData.data) {
          var data = this.props.homeData.data;
          this.setState({
            one: data.db.dwc,
            two: data.db.dqr,
            three: data.db.dzp,
            objTalklist: data.dt
          });
        } else {
          this.props.findHomeDataByPageSize(6, function () {
            _this2.setState({
              homeDataLoading: true
            });
          });
        }
        if (!this.props.urlData) {
          this.props.setUrlData(encodeURIComponent(location.href.split("#")[0]));
        }
      }
      if (this.props.messageListByUser.data) {
        var _state = this.state,
            msgLastPage = _state.msgLastPage,
            msgNowPage = _state.msgNowPage,
            _messageCount = _state.messageCount;

        msgLastPage = this.props.messageListByUser.data.last;
        msgNowPage = this.props.messageListByUser.data.page;
        _messageCount = this.props.messageListByUser.data.messageCount;
        this.setState({
          messageCount: _messageCount,
          msgLastPage: msgLastPage,
          msgNowPage: msgNowPage,
          messageList: this.props.messageListByUser.data.list
        }, function () {
          //   console.log(this.props.homeScrollTop, "this.props.homeScrollTop");

          if (_this2.props.homeScrollTop > 0) {
            _this2.refs.talkbox.scrollTop = _this2.props.homeScrollTop;
          }
        });
      } else {
        this.getMessageList(this.state.msgNowPage);
      }

      _utils2.default.butAnimate();
      //     setTimeout(() => {
      //       this.refs.talkbox.scrollTop = 200;
      //     }, 300);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      // 关闭页面
      _dingtalk2.default.closePage();
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.messageListByUser.data) {
        var msgNowPage1 = nextProps.messageListByUser.data.page;
        this.setState({
          messageList: nextProps.messageListByUser.data.list,
          msgNowPage: msgNowPage1
        });
      }

      if (this.state.homeDataLoading && nextProps.homeData) {
        if (nextProps.homeData.success) {
          var data = nextProps.homeData.data;
          this.setState({
            one: data.db.dwc,
            two: data.db.dqr,
            three: data.db.dzp,
            objTalklist: data.dt
          });
        } else {
          _toast2.default.fail(nextProps.homeData.errmsg);
        }
        this.setState({ homeDataLoading: false });
      } else if ((this.state.messageMoreLoading || this.state.messageLoading) && nextProps.messageListByUser) {
        if (nextProps.messageListByUser.success) {
          // 更新页数 和 总量等数据
          if (nextProps.messageListByUser.data.page == 1) {
            _messageCount2 = nextProps.messageListByUser.data.messageCount;
            this.setState({
              messageCount: _messageCount2
            });
          }
          var _state2 = this.state,
              msgLastPage = _state2.msgLastPage,
              msgNowPage = _state2.msgNowPage,
              _messageCount2 = _state2.messageCount;

          msgLastPage = nextProps.messageListByUser.data.last;
          msgNowPage = nextProps.messageListByUser.data.page;

          this.setState({
            msgLastPage: msgLastPage,
            msgNowPage: msgNowPage
          });
          // if (msgNowPage == 1) {
          //   this.setState({
          //     messageList: nextProps.messageListByUser.data.list,
          //     messageCount: messageCount
          //   });
          // } else {
          //   let data = nextProps.messageListByUser.data.list;
          //   let { messageList } = this.state;
          //   data.map((item, i) => {
          //     messageList.push(item);
          //   });
          //   this.setState({ messageList: messageList });
          // }
        } else {}

        this.setState({
          messageMoreLoading: false,
          messageLoading: false
        });
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
      this.setState = function (state, callback) {
        return;
      };
    }
  }, {
    key: "getMessageList",
    value: function getMessageList(pageNo) {
      if (pageNo == 1) {
        this.setState({ messageLoading: true });
      } else {
        this.setState({ messageMoreLoading: true });
      }
      this.props.getMessageByUser(pageNo);
    }
  }, {
    key: "urlGo",
    value: function urlGo(type, id, msgId, read) {
      var _this3 = this;

      (0, _task.getTaskDetailsByIds)(id, function (list) {
        _this3.props.getDingMessageDetails(msgId);
        if (read == 0) {
          _this3.props.setMessageCount(msgId);
        }

        if (list.errmsg === "该任务已被删除") {
          _toast2.default.info(list.errmsg);
          var _messageCount3 = _this3.state.messageCount;

          if (read == 0) {
            var count = _messageCount3 - 1 > -1 ? _messageCount3 - 1 : 0;
            _this3.setState({ messageCount: count });
          }
        } else {
          if (type == "c" || type == "f") {
            //   console.log("/mo_taskDetails?id=" + id);
            _index2.default.push(_dingtalk2.default.setDdNavColor("/mo_taskDetails?id=" + id));
          } else {
            //   console.log("/mo_projectDetails?projectId=" + id);
            _index2.default.push(_dingtalk2.default.setDdNavColor("/mo_projectDetails?projectId=" + id));
          }
        }
      });
    }
  }, {
    key: "listScroll",
    value: function listScroll(e) {
      var _this4 = this;

      var scrollTop = Math.ceil(Math.round(e.target.scrollTop));
      var clientHeight = Math.ceil(Math.round(e.target.clientHeight));
      var scrollHeight = Math.ceil(Math.round(e.target.scrollHeight));
      var _state3 = this.state,
          msgNowPage = _state3.msgNowPage,
          msgLastPage = _state3.msgLastPage;

      this.timeer = setTimeout(function () {
        if (_this4.timeer) {
          clearTimeout(_this4.timeer);
        }
        _this4.props.saveHomeScrollTop(scrollTop);
      }, 100);
      if (msgNowPage < msgLastPage && (scrollTop + clientHeight == scrollHeight || scrollTop + clientHeight == scrollHeight - 1 || scrollTop + clientHeight == scrollHeight + 1)) {
        //       console.log(msgNowPage, "msgNowPage");

        this.getMessageList(msgNowPage + 1);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;

      var _state4 = this.state,
          one = _state4.one,
          two = _state4.two,
          three = _state4.three,
          messageList = _state4.messageList,
          messageCount = _state4.messageCount,
          messageLoading = _state4.messageLoading,
          messageMoreLoading = _state4.messageMoreLoading,
          msgLastPage = _state4.msgLastPage,
          msgNowPage = _state4.msgNowPage,
          user = _state4.user,
          end15DaysShow = _state4.end15DaysShow;
      var language = this.props.language;

      return _react2.default.createElement(_Layout2.default, { language: language, __source: {
          fileName: _jsxFileName,
          lineNumber: 284
        }
      }, _react2.default.createElement("div", { className: "pubLayout dingHome", __source: {
          fileName: _jsxFileName,
          lineNumber: 285
        }
      }, _react2.default.createElement("style", {
        dangerouslySetInnerHTML: {
          __html: _dingHome2.default
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 286
        }
      }), _react2.default.createElement("style", {
        dangerouslySetInnerHTML: {
          __html: _index4.default
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 291
        }
      }), _react2.default.createElement("style", {
        dangerouslySetInnerHTML: {
          __html: _index6.default
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 296
        }
      }), end15DaysShow ? _react2.default.createElement(_alert2.default, {
        className: "endV",
        title: _utils2.default.getTeamInfoWithMoney("版本名称", user) + "即将到期",
        msg: _utils2.default.getTeamInfoWithMoney("即将到期提示", user),
        okButTxt: "续费升级",
        butIsOne: true,
        closeIconShow: true,
        closeIconClickCallBack: function closeIconClickCallBack() {
          _this5.setState({
            end15DaysShow: false
          });
          _storage2.default.setLocal("end15DaysShowDate", _utils2.default.dateToString(new Date()));
        },
        okCallBack: function okCallBack() {
          _index2.default.push(_dingtalk2.default.setDdNavColor("/mo_version"));
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 302
        }
      }) : "", _utils2.default.getTeamInfoWithMoney("剩余天数", user) >= 0 && _utils2.default.getTeamInfoWithMoney("是否超限", user)[0] ? _react2.default.createElement(_alert2.default, {
        title: "\u4F7F\u7528\u4EBA\u6570\u8D85\u9650",
        msg: _utils2.default.getTeamInfoWithMoney("人数超限提示", user),
        okButTxt: "续费升级",
        butIsOne: true,
        okCallBack: function okCallBack() {
          _index2.default.push(_dingtalk2.default.setDdNavColor("/mo_version"));
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 327
        }
      }) : "", _utils2.default.getTeamInfoWithMoney("剩余天数", user) < 0 && _utils2.default.getTeamInfoWithMoney("版本名称", user) === "试用版" && !_utils2.default.getTeamInfoWithMoney("是否钉钉订单", user) ? _react2.default.createElement(_alert2.default, {
        title: "\u8682\u8681\u5206\u5DE5",
        msg: _utils2.default.getTeamInfoWithMoney("已到期提示", user),
        okButTxt: "使用免费版 >",
        calButTxt: "升级版本",
        butIsOne: false,
        okCallBack: function okCallBack() {
          _index2.default.push(_dingtalk2.default.setDdNavColor("/mo_free"));
        },
        calCallBack: function calCallBack() {
          _index2.default.push(_dingtalk2.default.setDdNavColor("/mo_version"));
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 342
        }
      }) : "", _utils2.default.getTeamInfoWithMoney("剩余天数", user) < 0 && _utils2.default.getTeamInfoWithMoney("版本名称", user) === "试用版" && _utils2.default.getTeamInfoWithMoney("是否钉钉订单", user) ? _react2.default.createElement(_alert2.default, {
        title: "\u8682\u8681\u5206\u5DE5",
        msg: _utils2.default.getTeamInfoWithMoney("已到期提示", user),
        okButTxt: "续费升级",
        butIsOne: true,
        okCallBack: function okCallBack() {
          _index2.default.push(_dingtalk2.default.setDdNavColor("/mo_version"));
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 361
        }
      }) : "", _utils2.default.getTeamInfoWithMoney("剩余天数", user) < 0 && _utils2.default.getTeamInfoWithMoney("版本名称", user) !== "试用版" ? _react2.default.createElement(_alert2.default, {
        className: "endV",
        title: _utils2.default.getTeamInfoWithMoney("版本名称", user) + "已到期",
        msg: _utils2.default.getTeamInfoWithMoney("已到期提示", user),
        okButTxt: "续费升级",
        butIsOne: true,
        okCallBack: function okCallBack() {
          _index2.default.push(_dingtalk2.default.setDdNavColor("/mo_version"));
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 375
        }
      }) : "", _react2.default.createElement("div", {
        className: "content dingHome-box",
        style: end15DaysShow ? {
          top: "40px"
        } : {},
        __source: {
          fileName: _jsxFileName,
          lineNumber: 388
        }
      }, _react2.default.createElement("div", { className: "dingHome-top", __source: {
          fileName: _jsxFileName,
          lineNumber: 398
        }
      }, _react2.default.createElement("div", { className: "wait", __source: {
          fileName: _jsxFileName,
          lineNumber: 399
        }
      }, _react2.default.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 400
        }
      }, "\u6211\u7684\u5F85\u529E", _react2.default.createElement("p", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 402
        }
      }, "\u5171", _react2.default.createElement("span", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 403
        }
      }, one + two + three), "\u9879"))), _react2.default.createElement("div", { className: "wait-pm", __source: {
          fileName: _jsxFileName,
          lineNumber: 407
        }
      }, _react2.default.createElement("p", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 408
        }
      }, "\u5F85\u5B8C\u6210", _react2.default.createElement(_link2.default, {
        href: _dingtalk2.default.setDdNavColor("/mo_task?menuType=sub1&panelId=0"),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 410
        }
      }, _react2.default.createElement("span", { className: "span-one", __source: {
          fileName: _jsxFileName,
          lineNumber: 415
        }
      }, one))), _react2.default.createElement("p", { className: "wait-pm-center", __source: {
          fileName: _jsxFileName,
          lineNumber: 418
        }
      }, "\u5F85\u786E\u8BA4", _react2.default.createElement(_link2.default, {
        href: _dingtalk2.default.setDdNavColor("/mo_task?menuType=my_succeed&panelId=2"),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 420
        }
      }, _react2.default.createElement("span", { className: "span-two", __source: {
          fileName: _jsxFileName,
          lineNumber: 425
        }
      }, two))), _react2.default.createElement("p", { className: "wait-pm-last", __source: {
          fileName: _jsxFileName,
          lineNumber: 428
        }
      }, "\u5F85\u6307\u6D3E", _react2.default.createElement(_link2.default, {
        href: _dingtalk2.default.setDdNavColor("/mo_task?menuType=my_add&panelId=3"),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 430
        }
      }, _react2.default.createElement("span", { className: "span-three", __source: {
          fileName: _jsxFileName,
          lineNumber: 435
        }
      }, three))))), _react2.default.createElement("div", { className: "dingHome-bottom", __source: {
          fileName: _jsxFileName,
          lineNumber: 440
        }
      }, _react2.default.createElement("div", { className: "bottom-title", __source: {
          fileName: _jsxFileName,
          lineNumber: 441
        }
      }, _react2.default.createElement("p", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 442
        }
      }, "\u6211\u7684\u901A\u77E5"), _react2.default.createElement("font", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 443
        }
      }, "\u672A\u8BFB", _react2.default.createElement("span", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 445
        }
      }, messageCount), "\u6761"), _react2.default.createElement(_icon2.default, {
        type: "anticon-shuaxin",
        onClick: function onClick() {
          _this5.getMessageList(1);
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 447
        }
      })), _react2.default.createElement("div", {
        className: "talkbox",
        ref: "talkbox",
        onScroll: function onScroll(e) {
          return _this5.listScroll(e);
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 454
        }
      }, _react2.default.createElement(_Loading2.default, { show: messageLoading, __source: {
          fileName: _jsxFileName,
          lineNumber: 459
        }
      }), messageList.length > 0 ? messageList.map(function (item, i) {
        var str = item.description;
        var obj = eval("(" + str + ")");
        var objName = "";
        var pageUrl = "";
        if (item.type == "c") {
          objName = obj["任务名称"];
          pageUrl = "/mo_taskDetails";
        } else {
          objName = obj["项目名称"];
          pageUrl = "/mo_projectDetails";
        }
        return _react2.default.createElement("div", {
          className: "talklist white aniBut",
          key: item.id,
          onClick: function onClick() {
            //   console.log(item);
            _this5.urlGo(item.type, item.taskinfoId, item.id, item.read);
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 474
          }
        }, _react2.default.createElement("div", { className: "icon", __source: {
            fileName: _jsxFileName,
            lineNumber: 487
          }
        }, item.createBy.nickname), _react2.default.createElement("div", { className: "tasklist", __source: {
            fileName: _jsxFileName,
            lineNumber: 488
          }
        }, _react2.default.createElement("div", { className: item.read == "0" ? "dd" : "dd hui", __source: {
            fileName: _jsxFileName,
            lineNumber: 489
          }
        }), _react2.default.createElement("p", { className: "tasklist-first textMore", __source: {
            fileName: _jsxFileName,
            lineNumber: 490
          }
        }, _react2.default.createElement("span", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 491
          }
        }, item.subject)), _react2.default.createElement("p", { className: "textMore", __source: {
            fileName: _jsxFileName,
            lineNumber: 493
          }
        }, objName), _react2.default.createElement("p", { className: "textMore", __source: {
            fileName: _jsxFileName,
            lineNumber: 494
          }
        }, item.updateDate)));
      }) : _react2.default.createElement("div", { className: "pp", __source: {
          fileName: _jsxFileName,
          lineNumber: 500
        }
      }, "\u6682\u65E0\u901A\u77E5"), messageList.length > 0 ? _react2.default.createElement("div", { className: "p", __source: {
          fileName: _jsxFileName,
          lineNumber: 503
        }
      }, _react2.default.createElement(_Loading2.default, {
        show: messageMoreLoading,
        classStr: "loading_minSize",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 504
        }
      }), msgLastPage > msgNowPage ? "下拉加载更多" : "已经到底喽") : "", _react2.default.createElement("div", {
        style: {
          clear: "both"
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 513
        }
      })))), _react2.default.createElement("div", { className: "menuBox", __source: {
          fileName: _jsxFileName,
          lineNumber: 521
        }
      }, _react2.default.createElement(_MenuBar2.default, { pathName: _dingtalk2.default.setDdNavColor("/mo_dingHome"), __source: {
          fileName: _jsxFileName,
          lineNumber: 522
        }
      }))));
    }
  }]);

  return dingHome;
}(_react.Component);

function mapStateToProps(state) {
  return {
    homeData: state.task.homeData,
    messageListByUser: state.user.messageListByUser,
    urlData: state.user.urlData,
    homeScrollTop: state.cache.homeScrollTop
  };
}
var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    findHomeDataByPageSize: (0, _redux.bindActionCreators)(taskAction.findHomeDataByPageSize, dispatch),
    getMessageByUser: (0, _redux.bindActionCreators)(userAction.getMessageByUser, dispatch),
    setMessageCount: (0, _redux.bindActionCreators)(userAction.setMessageCount, dispatch),
    getDingMessageDetails: (0, _redux.bindActionCreators)(taskAction.getDingMessageDetails, dispatch),
    setUrlData: (0, _redux.bindActionCreators)(userAction.setUrlData, dispatch),
    saveHomeScrollTop: (0, _redux.bindActionCreators)(cacheAction.saveHomeScrollTop, dispatch)
  };
};
exports.default = (0, _nextReduxWrapper2.default)(_store.initStore, mapStateToProps, mapDispatchToProps)(dingHome);