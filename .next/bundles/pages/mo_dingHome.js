
          window.__NEXT_REGISTER_PAGE('/mo_dingHome', function() {
            var comp = module.exports =
webpackJsonp([6],{

/***/ 554:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.visitUrl = undefined;

var _promise = __webpack_require__(38);

var _promise2 = _interopRequireDefault(_promise);

var _getPrototypeOf = __webpack_require__(28);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(13);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(14);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(30);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(29);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(11);

var _react2 = _interopRequireDefault(_react);

var _fetchFn = __webpack_require__(645);

var _fetchFn2 = _interopRequireDefault(_fetchFn);

var _dingtalk = __webpack_require__(561);

var _dingtalk2 = _interopRequireDefault(_dingtalk);

var _storage = __webpack_require__(558);

var _storage2 = _interopRequireDefault(_storage);

var _index = __webpack_require__(83);

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

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } if (typeof module.exports === 'function') { __REACT_HOT_LOADER__.register(module.exports, 'module.exports', "D:\\work\\phone-new\\api\\httpClient.js"); return; } for (var key in module.exports) { if (!Object.prototype.hasOwnProperty.call(module.exports, key)) { continue; } var namedExport = void 0; try { namedExport = module.exports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "D:\\work\\phone-new\\api\\httpClient.js"); } } })();

/***/ }),

/***/ 558:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _stringify = __webpack_require__(559);

var _stringify2 = _interopRequireDefault(_stringify);

var _getPrototypeOf = __webpack_require__(28);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(13);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(14);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(30);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(29);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(11);

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

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } if (typeof module.exports === 'function') { __REACT_HOT_LOADER__.register(module.exports, 'module.exports', "D:\\work\\phone-new\\utils\\storage.js"); return; } for (var key in module.exports) { if (!Object.prototype.hasOwnProperty.call(module.exports, key)) { continue; } var namedExport = void 0; try { namedExport = module.exports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "D:\\work\\phone-new\\utils\\storage.js"); } } })();

/***/ }),

/***/ 561:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = __webpack_require__(559);

var _stringify2 = _interopRequireDefault(_stringify);

var _toast = __webpack_require__(568);

var _toast2 = _interopRequireDefault(_toast);

var _getPrototypeOf = __webpack_require__(28);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(13);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(14);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(30);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(29);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(11);

var _react2 = _interopRequireDefault(_react);

var _storage = __webpack_require__(558);

var _storage2 = _interopRequireDefault(_storage);

var _httpClient = __webpack_require__(554);

var _httpClient2 = _interopRequireDefault(_httpClient);

var _index = __webpack_require__(83);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var appType = "dingtalk";
var _isISV = false; //是否isv


var Dingtalk = function (_React$Component) {
  (0, _inherits3.default)(Dingtalk, _React$Component);

  function Dingtalk() {
    (0, _classCallCheck3.default)(this, Dingtalk);

    return (0, _possibleConstructorReturn3.default)(this, (Dingtalk.__proto__ || (0, _getPrototypeOf2.default)(Dingtalk)).apply(this, arguments));
  }

  (0, _createClass3.default)(Dingtalk, null, [{
    key: "isISV",
    value: function isISV() {
      return _isISV;
    }
  }, {
    key: "getAppType",
    value: function getAppType() {
      return appType;
    }

    //设置标题

  }, {
    key: "setTitle",
    value: function setTitle(name) {
      if (typeof dd != "undefined" && appType == "dingtalk") {
        var title = "蚂蚁分工";
        if (name) {
          title = name;
        }
        dd.biz.navigation.setTitle({
          title: title, //控制标题文本，空字符串表示显示默认文本
          onSuccess: function onSuccess(result) {},
          onFail: function onFail(err) {}
        });
      }
    }
    //dd打点

  }, {
    key: "actionDing",
    value: function actionDing(type) {
      if (typeof dd != "undefined" && appType == "dingtalk") {
        dd.biz.util.ut({
          key: "open_micro_general_operat", //打点名
          value: {
            corpId: _storage2.default.getSession("corpId"),
            agentId: _storage2.default.getSession("agentId"),
            type: type
          }, //打点传值
          onSuccess: function onSuccess(e) {
            console.log(e, "*********打点onSuccess***************");
          },
          onFail: function onFail(err) {
            console.log(err, "*********onFail***************");
          }
        });
      }
    }
    // 上传图片 multiple：是否上传多个，默认一次上传一个

  }, {
    key: "uploadImage",
    value: function uploadImage(_onSuccess, _onFail) {
      var multiple = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      _httpClient2.default.AjaxPost("/uploadAttachment/getUploadMethod", {}, function (result) {
        if (result.success) {
          var data = result.data;
          if (data.state) {
            dd.biz.util.uploadImage({
              multiple: multiple, //是否多选，默认false
              max: 9, //最多可选个数
              onSuccess: function onSuccess(result) {
                if (_onSuccess) _onSuccess(result);
              },
              onFail: function onFail(err) {
                _onFail(err);
              }
            });
          } else {
            //钉钉文件上传
            dd.biz.util.uploadAttachment({
              image: {
                multiple: true,
                max: multiple ? 6 : 1,
                spaceId: data.spaceid
              },
              space: {
                corpId: data.antIsvCorpSuite.corpid,
                spaceId: data.spaceid,
                isCopy: 1,
                max: multiple ? 6 : 1
              },
              file: {
                spaceId: data.spaceid,
                max: multiple ? 6 : 1
              },
              types: ["photo", "file", "space"],
              onSuccess: function onSuccess(result) {
                // console.log(result);
                if (_onSuccess) {
                  _onSuccess(result);
                }
              },
              onFail: function onFail(err) {
                _onFail(err);
              }
            });
          }
        }
      });
    }
    //预览图片

  }, {
    key: "previewImage",
    value: function previewImage(files) {
      if (files.fileId) {
        _httpClient2.default.AjaxPost("/uploadAttachment/authDingFilePreview", files, function (result) {
          if (result.success) {
            dd.biz.cspace.preview({
              corpId: _storage2.default.getSession("corpId"),
              spaceId: files.spaceId,
              fileId: files.fileId,
              fileName: files.fileName,
              fileSize: files.fileSize,
              fileType: files.fileType,
              onSuccess: function onSuccess() {
                //无，直接在弹窗页面显示文件详细信息
              },
              onFail: function onFail(err) {
                // console.log(err);
              }
            });
          }
        });
      } else {
        var date = [];
        var url = files.fileUrlAbsolute ? files.fileUrlAbsolute.replace(/\\/g, "/") : files;
        var suffixIndex = url.lastIndexOf(".");
        var suffix = url.substring(suffixIndex + 1).toUpperCase();
        if (suffix != "BMP" && suffix != "JPG" && suffix != "JPEG" && suffix != "PNG" && suffix != "GIF") {
          _toast2.default.fail("非图片文件不能查看");
          return;
        }
        if (date.length == 0) {
          date.push(url);
        }
        dd.biz.util.previewImage({
          urls: date, //图片地址列表
          current: url, //当前显示的图片链接
          onSuccess: function onSuccess(result) {
            /**/
            //   console.log(result, "---------result----------------");
          },
          onFail: function onFail(err) {
            //   console.log(err, "---------err----------------");
          }
        });
      }
    }
    //弹框

  }, {
    key: "aletDing",
    value: function aletDing(message, title, buttonName, onOk) {
      if (typeof dd != "undefined" && appType == "dingtalk") {
        dd.device.notification.alert({
          message: message,
          title: title ? title : "提示", //可传空
          buttonName: buttonName ? buttonName : "确定",
          onSuccess: function onSuccess() {
            if (onOk) {
              onOk();
            }
          },
          onFail: function onFail(err) {}
        });
      }
    }

    //设置菜单

  }, {
    key: "setMenu",
    value: function setMenu(items, success, fail) {
      if (typeof dd != "undefined" && appType == "dingtalk") {
        dd.biz.navigation.setMenu({
          items: items,
          onSuccess: function onSuccess(data) {
            if (success) {
              success(data);
            }
          },
          onFail: function onFail(err) {
            fail(err);
          }
        });
      }
    }
    //首页菜单

  }, {
    key: "setMenuHome",
    value: function setMenuHome() {
      var _this3 = this;

      this.setMenu([{ id: "more", text: "更多" }], function () {
        _this3.actionSheet("", ["续费升级", "联系服务商", "功能引导", "帮助中心"], function (index) {
          if (index == 0) {
            _index2.default.push("/mo_version");
          } else if (index == 1) {
            _index2.default.push("/mo_feedback");
          } else if (index == 2) {
            _index2.default.push("/mo_guidePage");
          } else if (index == 3) {
            _index2.default.push("/mo_help");
          }
        });
      }, function () {});
    }
    //右侧设置按钮

  }, {
    key: "setMenuRight",
    value: function setMenuRight() {
      if (typeof dd != "undefined" && appType == "dingtalk") {
        dd.biz.navigation.setRight({
          show: true,
          control: true,
          text: "设置",
          onSuccess: function onSuccess(result) {
            if (result.success) {
              _index2.default.push(this.setDdNavColor("/mo_setUp?id=" + this.props.url.query.proId));
            }
          },
          onFail: function onFail(err) {
            fail(err);
          }
        });
      }
    }
    //选人

  }, {
    key: "selectUser",
    value: function selectUser() {
      var _selectUser = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      var title = arguments[1];
      var _onSuccess2 = arguments[2];
      var _onFail2 = arguments[3];
      var multiple = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

      var users = [];
      if (_selectUser && _selectUser.length > 0) {
        _selectUser.map(function (item) {
          users.push(item.userid);
        });
      }
      var _this = this;
      if (typeof dd != "undefined" && appType == "dingtalk") {
        dd.biz.contact.complexPicker({
          startWithDepartmentId: 0, //-1表示打开的通讯录从自己所在部门开始展示, 0表示从企业最上层开始，(其他数字表示从该部门开始:暂时不支持)
          multiple: multiple ? true : false, //是否多选： true多选 false单选； 默认true
          pickedUsers: users, //默认选中的用户列表，userid；成功回调中应包含该信息
          disabledUsers: [], // 不能选中的用户列表，员工userid
          corpId: _storage2.default.getSession("corpId"), //企业id
          max: multiple ? 100 : 1, //人数限制，当multiple为true才生效，可选范围1-1500
          limitTips: "", //超过人数限制的提示语可以用这个字段自定义
          isNeedSearch: true, // 是否需要搜索功能
          title: title, // 如果你需要修改选人页面的title，可以在这里赋值
          responseUserOnly: true, //返回人，或者返回人和部门
          local: "true", // 是否显示本地联系人，默认false
          onSuccess: function onSuccess(data) {
            var userId = data.users;
            _httpClient2.default.AjaxPost("/user/isAuth", userId, function (result) {
              // console.log(result);
              if (result.data.type == "0") {
                _onSuccess2(result.data.users1);
              } else if (result.data.type == "1") {
                dd.device.notification.confirm({
                  message: result.data.message,
                  title: "提示",
                  buttonLabels: [result.data.label],
                  onSuccess: function onSuccess(resultData) {
                    _onSuccess2(result.data.users);
                  },
                  onFail: function onFail(err) {}
                });
              } else if (result.data.type == "2") {
                dd.device.notification.confirm({
                  message: result.data.message,
                  title: "提示",
                  buttonLabels: [result.data.label, "取消"],
                  onSuccess: function onSuccess(result) {
                    if (result.buttonIndex == 0) {
                      _this.selectUser(_selectUser, title, _onSuccess2, _onFail2, multiple);
                    }
                  },
                  onFail: function onFail(err) {}
                });
              }
            });
          },
          onFail: function onFail(err) {
            _onFail2(err);
          }
        });
      }
    }
    //获取手机型号

  }, {
    key: "getPhoneInfo",
    value: function getPhoneInfo(fn, error) {
      if (typeof dd != "undefined" && appType == "dingtalk") {
        dd.device.base.getPhoneInfo({
          onSuccess: function onSuccess(data) {
            if (data.brand) {
              _storage2.default.setPhoneVersion(data.brand);
            }
            if (fn) {
              fn();
            }
            /*
                      {
                          screenWidth: 1080, // 手机屏幕宽度
                          screenHeight: 1920, // 手机屏幕高度
                          brand:'Mi'， // 手机品牌
                          model:'Note4', // 手机型号
                          version:'7.0'. // 版本
                          netInfo:'wifi' , // 网络类型 wifi／4g／3g 
                          operatorType :'xx' // 运营商信息
                      }
                      */
          },
          onFail: function onFail(err) {
            if (error) {
              error();
            }
          }
        });
      }
    }
    //判断是否ios

  }, {
    key: "isIos",
    value: function isIos() {
      if (_storage2.default.getSession("phoneVersion") == "ios" || _storage2.default.getSession("phoneVersion") == "iPhone") {
        return true;
      } else {
        return false;
      }
    }
    //判断是否android

  }, {
    key: "isAndroid",
    value: function isAndroid() {
      if (_storage2.default.getSession("phoneVersion") == "android" || _storage2.default.getSession("phoneVersion") != "iPhone") {
        return true;
      } else {
        return false;
      }
    }
    //单选列表

  }, {
    key: "actionSheet",
    value: function actionSheet(title, butts, fn, error) {
      if (typeof dd != "undefined" && appType == "dingtalk") {
        if (butts && butts.length > 0) {
          dd.device.notification.actionSheet({
            title: title, //标题
            cancelButton: "取消", //取消按钮文本
            otherButtons: butts,
            onSuccess: function onSuccess(result) {
              if (fn) {
                fn(result.buttonIndex);
              }
              //onSuccess将在点击button之后回调
              /*{
                              buttonIndex: 0 //被点击按钮的索引值，Number，从0开始, 取消按钮为-1
                          }*/
            },
            onFail: function onFail(err) {
              if (error) {
                error();
              }
            }
          });
        }
      }
    }
    //单选列表

  }, {
    key: "openLink",
    value: function openLink(url) {
      if (typeof dd != "undefined" && appType == "dingtalk") {
        dd.biz.util.openLink({
          url: url,
          onSuccess: function onSuccess() {
            //   console.log("-----------onSuccess--------");
          },
          onFail: function onFail() {
            //   console.log("-----------onFail-------s-");
            window.open(url);
          }
        });
      }
    }
    //获取钉钉免登 code

  }, {
    key: "getLoginCode",
    value: function getLoginCode(corpid, success, fail) {
      if (typeof dd != "undefined" && appType == "dingtalk") {
        dd.runtime.permission.requestAuthCode({
          corpId: corpid,
          onSuccess: function onSuccess(result) {
            if (success) {
              success(result.code);
            }
          },
          onFail: function onFail(err) {
            fail(err);
          }
        });
      }
    }
    //钉钉关闭页面

  }, {
    key: "dingtalkClosePage",
    value: function dingtalkClosePage() {
      if (typeof dd != "undefined" && appType == "dingtalk") {
        dd.biz.navigation.close({
          onSuccess: function onSuccess(result) {
            //   console.log(result, "-----------closePage.result----------");
          },
          onFail: function onFail(err) {
            //   console.log(result, "-----------closePage.result----------");
          }
        });
      }
    }
    //退出关闭页面方法

  }, {
    key: "closePage",
    value: function closePage() {
      //退出到最后关闭页面
      if (_index2.default.router && _index2.default.router.asPath && _index2.default.router.asPath.indexOf("/dingTalkLogin") != -1) {
        this.dingtalkClosePage();
      }
    }
  }, {
    key: "setQuestionUrl",
    value: function setQuestionUrl(url) {
      return visitUrl + "/static/react-static/mobile-1.1.4/question" + url + ".png";
    }
    //设置钉钉头部颜色

  }, {
    key: "setDdNavColor",
    value: function setDdNavColor(url) {
      if (url) {
        url = url.indexOf("?") != -1 ? url + "&dd_nav_bgcolor=FF108EE9" : url + "?dd_nav_bgcolor=FF108EE9";
      }
      return url;
    }
    //授权JsApi接口

  }, {
    key: "authDingJsApi",
    value: function authDingJsApi(onSuccess, urlData) {
      var corpId = _storage2.default.getSession("corpId");
      //var urlData = encodeURIComponent(location.href.split('#')[0]);
      //var urlData = encodeURIComponent("https://ddy.antbim.net/mo_dingTalkLogin?SuiteKey=suitegj2w3dxicczbxdfe&corpid="+corpId+"&dd_nav_bgcolor=FF108EE9");
      if (!urlData) {
        urlData = encodeURIComponent(location.href.split("#")[0]);
      }
      corpId = corpId ? corpId : "";
      _httpClient2.default.AjaxPost("/dingTalk/mobilejs?urlData=" + urlData + "&corpid=" + corpId, "", function (result) {
        // console.log(result, urlData);
        if (result.success) {
          var data = result.data;
          if (data) {
            _storage2.default.setSession("corpId", data.corpid);
            _storage2.default.setSession("agentId", data.appid);
          }
          dd.config({
            agentId: data.appid, // 必填，微应用ID
            corpId: data.corpid, //必填，企业ID
            timeStamp: data.timeStamp, // 必填，生成签名的时间戳
            nonceStr: data.nonceStr, // 必填，生成签名的随机串
            signature: data.signature, // 必填，签名
            type: 0, //选填。0表示微应用的jsapi,1表示服务窗的jsapi。不填默认为0。该参数从dingtalk.js的0.8.3版本开始支持
            jsApiList: ["runtime.info", "biz.contact.complexPicker", "biz.util.ut", "biz.util.uploadImage", "biz.util.previewImage", "biz.navigation.setTitle", "runtime.permission.requestAuthCode", "biz.util.uploadAttachment", "biz.cspace.preview", "biz.navigation.setRight"] // 必填，需要使用的jsapi列表，注意：不要带dd。
          });
          dd.error(function (error) {
            // console.log("dingtalk error: " + JSON.stringify(error));
            var url = "urlData为空";
            if (urlData) {
              url = (0, _stringify2.default)(urlData);
            }
            _httpClient2.default.AjaxPost("/dingTalk/saveDdconfigError", {
              remarks: "dingtalk:" + (0, _stringify2.default)(error) + ",corpId:" + corpId + ",urlData:" + decodeURIComponent(urlData) + ",isIos:" + dd.ios + ",urlJSON:" + url
            }, function (list) {
              // console.log("保存DD.CONFIG错误成功");
            });
            if (onSuccess) {
              onSuccess();
            }
          });
          dd.ready(function () {
            // console.log("***************ready**********************");
            if (onSuccess) {
              onSuccess();
            }
          });
        }
      });
    }
  }]);

  return Dingtalk;
}(_react2.default.Component);

exports.default = Dingtalk;

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } if (typeof module.exports === 'function') { __REACT_HOT_LOADER__.register(module.exports, 'module.exports', "D:\\work\\phone-new\\utils\\dingtalk.js"); return; } for (var key in module.exports) { if (!Object.prototype.hasOwnProperty.call(module.exports, key)) { continue; } var namedExport = void 0; try { namedExport = module.exports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "D:\\work\\phone-new\\utils\\dingtalk.js"); } } })();

/***/ }),

/***/ 564:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SET_MESSAGE_COUNT = exports.SET_URLDATA = exports.USER_MESSAGE = exports.DINGTAK_CODE_LOGIN = exports.DINGTAK_CODE = exports.LOGIN = undefined;
exports.content = content;
exports.login = login;
exports.setUrlData = setUrlData;
exports.saveDdconfigError = saveDdconfigError;
exports.mobilejs = mobilejs;
exports.dingtalkCodeLogin = dingtalkCodeLogin;
exports.getMessageByUser = getMessageByUser;
exports.setMessageCount = setMessageCount;
exports.guidePage = guidePage;

var _httpClient = __webpack_require__(554);

var _httpClient2 = _interopRequireDefault(_httpClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LOGIN = exports.LOGIN = "LOGIN";
var DINGTAK_CODE = exports.DINGTAK_CODE = "DINGTAK_CODE";
var DINGTAK_CODE_LOGIN = exports.DINGTAK_CODE_LOGIN = "DINGTAK_CODE_LOGIN";
var USER_MESSAGE = exports.USER_MESSAGE = "USER_MESSAGE";
var SET_URLDATA = exports.SET_URLDATA = "SET_URLDATA";
var SET_MESSAGE_COUNT = exports.SET_MESSAGE_COUNT = "SET_MESSAGE_COUNT";

function content(data, type) {
  return {
    type: type,
    payload: data
  };
}

// 获取团队
function login(name, password) {
  return function (dispatch) {
    _httpClient2.default.AjaxPost("/user/loginUser", { loginName: name, password: password }, function (list) {
      dispatch(content(list, LOGIN));
    });
  };
}

//保存初次登录使用的url
function setUrlData(urlData) {
  return {
    type: SET_URLDATA,
    payload: urlData
  };
}

//收集DD.CONFIG错误
function saveDdconfigError(err) {
  return function (dispatch) {
    _httpClient2.default.AjaxPost("/dingTalk/saveDdconfigError", { remarks: err }, function (list) {
      console.log("保存DD.CONFIG错误成功");
    });
  };
}

// 获取钉钉免登code
function mobilejs(corpid, SuiteKey, urlData) {
  return function (dispatch) {
    _httpClient2.default.AjaxPost("/dingTalk/mobilejs?corpid=" + corpid + "&SuiteKey=" + SuiteKey + "&urlData=" + urlData, "", function (list) {
      dispatch(content(list, DINGTAK_CODE));
    });
  };
}

// 钉钉code登录
function dingtalkCodeLogin(code, corpid) {
  return function (dispatch) {
    _httpClient2.default.AjaxPost("/user/dingtalkMobileCodeLogin?code=" + code + "&corpid=" + corpid, "", function (list) {
      dispatch(content(list, DINGTAK_CODE_LOGIN));
    });
  };
}

// 通知信息
function getMessageByUser(pageNo, fn) {
  return function (dispatch) {
    _httpClient2.default.AjaxPost("/message/findMessage?pageNo=" + pageNo + "&read=", "", function (list) {
      if (fn) {
        fn();
      }
      console.log("messList", list);
      dispatch(content({ list: list, pageNo: pageNo }, USER_MESSAGE));
    });
  };
}

function setMessageCount(id) {
  return function (dispatch) {
    dispatch(content(id, SET_MESSAGE_COUNT));
  };
}

//引导页
function guidePage(fn) {
  var version = _httpClient2.default.getVersion();
  return function (dispatch) {
    _httpClient2.default.AjaxPost("/user/updateLoginState?type=phone&version=" + version, "", function (list) {
      if (fn) {
        fn(list);
      }
    });
  };
}

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } if (typeof module.exports === 'function') { __REACT_HOT_LOADER__.register(module.exports, 'module.exports', "D:\\work\\phone-new\\actions\\user.js"); return; } for (var key in module.exports) { if (!Object.prototype.hasOwnProperty.call(module.exports, key)) { continue; } var namedExport = void 0; try { namedExport = module.exports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "D:\\work\\phone-new\\actions\\user.js"); } } })();

/***/ }),

/***/ 565:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _icon = __webpack_require__(557);

var _icon2 = _interopRequireDefault(_icon);

var _map = __webpack_require__(147);

var _map2 = _interopRequireDefault(_map);

var _getIterator2 = __webpack_require__(47);

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _slicedToArray2 = __webpack_require__(96);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _getPrototypeOf = __webpack_require__(28);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(13);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(14);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(30);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(29);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(11);

var _react2 = _interopRequireDefault(_react);

var _storage = __webpack_require__(558);

var _storage2 = _interopRequireDefault(_storage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = "D:\\work\\phone-new\\utils\\utils.js";


var flag = true;

var Utils = function (_React$Component) {
  (0, _inherits3.default)(Utils, _React$Component);

  function Utils() {
    (0, _classCallCheck3.default)(this, Utils);

    return (0, _possibleConstructorReturn3.default)(this, (Utils.__proto__ || (0, _getPrototypeOf2.default)(Utils)).apply(this, arguments));
  }

  (0, _createClass3.default)(Utils, null, [{
    key: "getByteLen",

    // 返回中文字符长度
    value: function getByteLen(val) {
      if (val) {
        var len = 0;
        for (var i = 0; i < val.length; i++) {
          var a = val.charAt(i);
          a.match(/[^\x00-\xff]/gi);
          len += 2;
        }
        return Math.round(len / 2);
      } else {
        return 0;
      }
    }
  }, {
    key: "listScroll",
    value: function listScroll(e) {
      var scrollTop = Math.ceil(Math.round(e.target.scrollTop));
      var clientHeight = Math.ceil(Math.round(e.target.clientHeight));
      var scrollHeight = Math.ceil(Math.round(e.target.scrollHeight));
      if (scrollTop + clientHeight == scrollHeight || scrollTop + clientHeight == scrollHeight - 1 || scrollTop + clientHeight == scrollHeight + 1) {
        if (flag) {
          flag = false;
          setTimeout(function () {
            flag = true;
          }, 1000);
          return true; // 滑到底了
        }
      } else {
        return false; // 没滑到底
      }
    }

    // 根据颜色代码返回样式名字   /* type: 2 公共标签，1个人标签 */

  }, {
    key: "getTagColorByColorCode",
    value: function getTagColorByColorCode(type, colorCode) {
      var code = "";
      switch (colorCode) {
        case "fdbb78":
          code = type === "1" ? "tag_my01_fdbb78" : "tag_all01_fdbb78";
          break;
        case "f29b76":
          code = type === "1" ? "tag_my02_f29b76" : "tag_all02_f29b76";
          break;
        case "75ccff":
          code = type === "1" ? "tag_my03_75ccff" : "tag_all03_75ccff";
          break;
        case "89c997":
          code = type === "1" ? "tag_my04_89c997" : "tag_all04_89c997";
          break;
        case "c8c4fc":
          code = type === "1" ? "tag_my05_c8c4fc" : "tag_all05_c8c4fc";
          break;
        case "f5222d":
          code = type === "1" ? "tag_my06_f5222d" : "tag_all06_f5222d";
          break;
        case "795548":
          code = type === "1" ? "tag_my07_795548" : "tag_all07_795548";
          break;
        case "666666":
          code = type === "1" ? "tag_my08_666666" : "tag_all08_666666";
          break;
        default:
          code = type === "1" ? "tag_my01_fdbb78" : "tag_all01_fdbb78";
          break;
      }
      return code;
    }

    // 提取html字符串里的img

  }, {
    key: "GetImgListFromString",
    value: function GetImgListFromString(str) {
      var div = document.createElement("div");
      div.innerHTML = str;
      var imgList = [];
      imgList = div.querySelectorAll("img");
      return imgList;
    }

    // 根据地址提取图片名称

  }, {
    key: "getFileNameByUrl",
    value: function getFileNameByUrl(url) {
      var one = url.split("/");
      var name = one[one.length - 1];
      return name;
    }
  }, {
    key: "delImgStringBySrc",
    value: function delImgStringBySrc(src, string) {
      var objE = document.createElement("div");
      objE.innerHTML = string;
      //console.log(objE.childNodes,1);

      for (var i = 0; i < objE.childNodes.length; i++) {
        if (objE.childNodes[i].src == src) {
          objE.removeChild(objE.childNodes[i]);
          break;
        }
      }
      //console.log(objE.childNodes,111);

      var tmpNode = document.createElement("div");
      tmpNode.appendChild(objE.cloneNode(true));
      var str = tmpNode.innerHTML;
      //tmpNode = node = null; // prevent memory leaks in IE
      //console.log(str,5656)
      return str;
    }

    // 提取html字符串里的文字

  }, {
    key: "getTextFromString",
    value: function getTextFromString(str) {
      var div = document.createElement("div");
      div.innerHTML = str;
      var text = "";
      if (div.innerText !== "" || div.querySelectorAll("img").length > 0) {
        text = str;
      }
      return text;
    }

    // html5字符串转DOM元素

  }, {
    key: "stringToText",
    value: function stringToText(string, returnType) {
      string.replace(/<!--.*-->/g, "");
      var dom = document.createElement("div");
      dom.innerHTML = string;
      clearTag(dom, "style");
      clearTag(dom, "xml");
      clearTag(dom, "script");
      if (returnType === "innerText") {
        var text = dom.innerText;
        return text; //.replace(/\n/g, '');
      } else if (returnType === "img") {
        var imgs = dom.querySelectorAll("img");
        var imgList = [];
        for (var i = 0; i < imgs.length; i++) {
          imgList.push(imgs[i].src);
        }
        return imgList;
      }
    }
    // html转码

  }, {
    key: "HTMLDecode",
    value: function HTMLDecode(text) {
      var temp = document.createElement("div");
      temp.innerHTML = text;
      return temp.innerHTML;
    }

    // 日期转字符串

  }, {
    key: "dateToString",
    value: function dateToString(date) {
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      month = month >= 10 ? month : "0" + month;
      day = day >= 10 ? day : "0" + day;
      return "" + year + "-" + ("" + month) + "-" + ("" + day);
    }

    // 根据argName 返回index

  }, {
    key: "getIndexByArg",
    value: function getIndexByArg(arr, argName, str) {
      var r = -1;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, _getIterator3.default)(new _map2.default(arr.map(function (item, i) {
          return [i, item];
        }))), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _ref = _step.value;

          var _ref2 = (0, _slicedToArray3.default)(_ref, 2);

          var i = _ref2[0];
          var item = _ref2[1];

          if (item[argName] === str) {
            r = i;
            break;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return r;
    }
  }, {
    key: "getQueryString",
    value: function getQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    }

    // 返回任务状态 角标颜色

  }, {
    key: "returnState",
    value: function returnState(task) {
      var state = task.state;
      var wcsj = task.wcsj;
      // switch(state){
      // 	case '0':
      // 		// 已逾期
      // 		if(wcsj && new Date(wcsj)<new Date()){
      // 			return '#ff914c';
      // 		// 已完成
      // 		}else{
      // 			return '#70bf78';
      // 		}
      // 		break;
      // 	case '1':
      // 		return '#5f6cbb';
      // 		break;
      // 	case '2':
      // 		return '#5acaf2';
      // 		break;
      // 	case '3':
      // 		return '#f95a5f';
      // 		break;
      // 	case '4':
      // 		return '#999999';
      // 		break;
      //   }

      //对应于未指派负责人、已终止两种的任务状态
      if (task.state == "4" || task.userResponse == null || task.userResponse.id == null) {
        //未指派
        if (task.state == "0" || task.state == "3") {
          return "#9a89b9";
        }
        //已终止
        if (task.state == "4") {
          return "#999";
        }
        return "";
        //待确认
      } else if (task.state == "2") {
        return "#5ec9f6";
        //已逾期
      } else if (task.stateName == "7" || task.state != "1" && task.planEndTime != null && task.pastDates < 0) {
        //已过计划完成日期、尚未完成
        return "#ff914c";
        //进行中
      } else if (task.state != "1" && (task.planEndTime == null || task.pastDates >= 0)) {
        //待审核
        return "#76bf6e";
        //提前完成
      } else if (task.state == "1" && task.planEndTime != null && task.realityEndTime != null && this.CompareDate(task.planEndTime, task.realityEndTime)) {
        //已完成、但实际完成较计划完成迟
        return "#108ee9";
        //逾期完成
      } else if (task.state == "1" && task.planEndTime != null && task.realityEndTime != null && this.CompareDate(task.realityEndTime, task.planEndTime)) {
        //已完成、实际完成与计划完成一致
        return "#108ee9";
        //按期完成
      } else if (task.state == "1" && (task.planEndTime == null || task.planEndTime != null && task.realityEndTime != null && task.planEndTime.trim() == task.realityEndTime.trim())) {
        return "#108ee9";
      }
    }

    // 给所有按钮添加触摸动画

  }, {
    key: "butAnimate",
    value: function butAnimate() {
      // 块级反应
      // 如果是蓝色 要额外标注 blue 样式
      // 如果是白色 要额外标注 white 样式
      // 如果是蓝色图标+深灰色文字 要额外标注 iconBlue_txtGray 样式
      var buts = document.getElementsByClassName("aniBut");
      for (var i = 0; i < buts.length; i++) {
        buts[i].ontouchstart = function () {
          if (this.className.indexOf("blue") !== -1) {
            this.className = this.className + " aniBut-on-blue";
          } else if (this.className.indexOf("white") !== -1) {
            this.className = this.className + " aniBut-on-white";
          } else if (this.className.indexOf("iconBlue_txtGray") !== -1) {
            this.className = this.className + " aniBut-on-iBlue-tGray";
          } else {
            this.className = this.className + " aniBut-on";
          }
        };
        buts[i].ontouchend = function () {
          this.className = this.className.replace(" aniBut-on", "");
          this.className = this.className.replace(" aniBut-on-blue", "");
          this.className = this.className.replace(" aniBut-on-white", "");
          this.className = this.className.replace(" aniBut-on-iBlue-tGray", "");
        };
      }

      // 内容颜色反应 红色
      var buts_red = document.getElementsByClassName("aniButRed");
      for (var _i = 0; _i < buts_red.length; _i++) {
        buts_red[_i].ontouchstart = function () {
          this.style.color = "#e22b2b";
        };
        buts_red[_i].ontouchend = function () {
          this.style.color = "";
        };
      }

      // 内容颜色反应 灰色
      var buts_gray = document.getElementsByClassName("aniButGray");
      for (var _i2 = 0; _i2 < buts_gray.length; _i2++) {
        buts_gray[_i2].ontouchstart = function () {
          this.style.color = "#9797a7";
        };
        buts_gray[_i2].ontouchend = function () {
          this.style.color = "";
        };
      }

      // 内容颜色反应 蓝色
      var buts_blue = document.getElementsByClassName("aniButBlue");
      for (var _i3 = 0; _i3 < buts_blue.length; _i3++) {
        buts_blue[_i3].ontouchstart = function () {
          this.style.color = "#15a8e5";
        };
        buts_blue[_i3].ontouchend = function () {
          this.style.color = "";
        };
      }
    }

    // 根据状态数字返回状态名字

  }, {
    key: "getStateNameByNo",
    value: function getStateNameByNo(task) {
      //对应于未指派负责人、已终止两种的任务状态
      if (task.state == "4" || task.userResponse == null || task.userResponse.id == null) {
        if (task.state == "0" || task.state == "3") {
          return _react2.default.createElement("span", { style: { color: "#E96300" }, className: "state", __source: {
              fileName: _jsxFileName,
              lineNumber: 342
            }
          }, "\u672A\u6307\u6D3E");
        }
        if (task.state == "4") {
          return _react2.default.createElement("span", { style: { color: "#808080" }, className: "state", __source: {
              fileName: _jsxFileName,
              lineNumber: 349
            }
          }, "\u5DF2\u7EC8\u6B62");
        }
        return "";
      } else if (task.state == "2") {
        return _react2.default.createElement("div", { style: { color: "#58c582" }, className: "state", __source: {
            fileName: _jsxFileName,
            lineNumber: 357
          }
        }, "\u5F85\u786E\u8BA4");
      } else if (task.stateName == "7" || task.state != "1" && task.planEndTime != null && task.pastDates < 0) {
        //已过计划完成日期、尚未完成
        return _react2.default.createElement("div", { style: { color: "#E96300" }, className: "state", __source: {
            fileName: _jsxFileName,
            lineNumber: 367
          }
        }, "\u5DF2\u903E\u671F");
      } else if (task.state != "1" && (task.planEndTime == null || task.pastDates >= 0)) {
        //待审核
        return _react2.default.createElement("div", { style: { color: "#58c582" }, className: "state", __source: {
            fileName: _jsxFileName,
            lineNumber: 377
          }
        }, "\u8FDB\u884C\u4E2D");
      } else if (task.state == "1" && task.planEndTime != null && task.realityEndTime != null && this.CompareDate(task.planEndTime, task.realityEndTime)) {
        //已完成、但实际完成较计划完成迟
        return _react2.default.createElement("div", { style: { color: "#3299CC" }, className: "state", __source: {
            fileName: _jsxFileName,
            lineNumber: 389
          }
        }, "\u63D0\u524D\u5B8C\u6210");
      } else if (task.state == "1" && task.planEndTime != null && task.realityEndTime != null && this.CompareDate(task.realityEndTime, task.planEndTime)) {
        //已完成、实际完成与计划完成一致
        return _react2.default.createElement("div", { style: { color: "#0a74ca" }, className: "state", __source: {
            fileName: _jsxFileName,
            lineNumber: 401
          }
        }, "\u903E\u671F\u5B8C\u6210");
      } else if (task.state == "1" && (task.planEndTime == null || task.planEndTime != null && task.realityEndTime != null && task.planEndTime.trim() == task.realityEndTime.trim())) {
        return _react2.default.createElement("div", { style: { color: "#108ee9" }, className: "state", __source: {
            fileName: _jsxFileName,
            lineNumber: 413
          }
        }, "\u6309\u65F6\u5B8C\u6210");
      }
    }

    // 设置状态样式

  }, {
    key: "stateColor",
    value: function stateColor(stateId) {
      var className = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

      // 0未完成  1正常完成  2待确认  3未指派  4已终止 8逾期完成 9提前完成
      var classname = "";
      var name = "";
      if (stateId === "0") {
        classname = className + " state_jxz";
        name = "进行中";
      } else if (stateId === "1") {
        classname = className + " state_ywc";
        name = "按时完成";
      } else if (stateId === "2") {
        classname = className + " state_dqr";
        name = "待确认";
      } else if (stateId === "3") {
        classname = className + " state_wzp";
        name = "未指派";
      } else if (stateId === "4") {
        classname = className + " state_yzz";
        name = "已终止";
      } else if (stateId === "7") {
        classname = className + " state_yyq";
        name = "已逾期";
      } else if (stateId === "8") {
        classname = className + " state_yqwc";
        name = "逾期完成";
      } else if (stateId === "9") {
        classname = className + " state_tqwc";
        name = "提前完成";
      }
      return _react2.default.createElement("div", { className: classname, __source: {
          fileName: _jsxFileName,
          lineNumber: 450
        }
      }, name);
    }

    // 根据名字返回nickName

  }, {
    key: "getNickNameByName",
    value: function getNickNameByName(name) {
      var str = name.replace(/[^\u4e00-\u9fa5]/gi, "");
      var nickname = str.substr(str.length - 2);
      return nickname;
    }
  }, {
    key: "CompareDate",
    value: function CompareDate(d1, d2) {
      var date1 = new Date(d1.replace(/-/g, "/"));
      var date2 = new Date(d2.replace(/-/g, "/"));
      if (date1 > date2 || date1 - date2 == 0) {
        return true;
      } else {
        return false;
      }
    }

    // 返回日期颜色

  }, {
    key: "dateColor",
    value: function dateColor(planEndTime, state, realityEndTime) {
      var taskdate = "";
      if (planEndTime) {
        taskdate = new Date(planEndTime);
      }
      var now = new Date();
      if ((taskdate == now || taskdate < now) && state == "0") {
        return _react2.default.createElement("font", { style: { color: "#ff8900" }, __source: {
            fileName: _jsxFileName,
            lineNumber: 479
          }
        }, planEndTime && planEndTime.slice(0, 10));
      } else if (state == "1" && new Date(realityEndTime) > taskdate) {
        return _react2.default.createElement("font", { style: { color: "#ff8900" }, __source: {
            fileName: _jsxFileName,
            lineNumber: 485
          }
        }, realityEndTime && realityEndTime.slice(0, 10));
      } else {
        if (realityEndTime) {
          return _react2.default.createElement("font", { style: { color: "#9599a2" }, __source: {
              fileName: _jsxFileName,
              lineNumber: 492
            }
          }, realityEndTime && realityEndTime.slice(0, 10));
        } else {
          return _react2.default.createElement("font", { style: { color: "#9599a2" }, __source: {
              fileName: _jsxFileName,
              lineNumber: 498
            }
          }, planEndTime && planEndTime.slice(0, 10));
        }
      }
    }

    // 版本到期判断

  }, {
    key: "getTeamInfoWithMoney",
    value: function getTeamInfoWithMoney(type, user) {
      var data = {
        buyUserCount: 100,
        synUserCount: 100,
        buyDate: "2017-08-30",
        endDate: "2018-08-30",
        remainderDays: 100,
        buyVersion: "MFB",
        ordercreatesource: "",
        orderId: ""
      };
      if (user && user.antIsvCorpSuite) {
        data = user.antIsvCorpSuite;
      }
      /*const data = {
      buyUserCount:100,
      synUserCount:10,
      buyDate:'2017-08-30',
      endDate:'2018-08-30',
      remainderDays:6,
      buyVersion:'SYB',
      ordercreatesource:'89'
      };*/
      var returnTxt = "";

      /*
       * buyUserCount: 购买人数
       * synUserCount: syn同步人数
       * endDate: 到期日期
       * buyDate: 购买日期
       * remainderDays: 剩余天数
       * buyVersion: 购买版本
       * ordercreatesource: 订单渠道 DRP钉钉订单 非DRP就是运营订单
       */

      switch (type) {
        case "是否钉钉订单":
          returnTxt = new Date(data.createDate).getTime() - new Date("2018-10-12").getTime() < 0 ? false : true;
          break;
        case "购买日期":
          returnTxt = data.buyDate;
          break;
        case "到期日期":
          returnTxt = data.endDate;
          break;
        case "是否超限":
          // 表示人数是否超限
          if (data.synUserCount > data.buyUserCount) {
            returnTxt = [true, data.buyUserCount, data.synUserCount];
          } else {
            returnTxt = [false, data.buyUserCount, data.synUserCount];
          }
          break;
        case "是否可用":
          // 表示高级功能是否可用
          switch (data.buyVersion) {
            case "SYB":
              returnTxt = true;
              break;
            case "JCB":
              returnTxt = false;
              break;
            case "ZYB":
              returnTxt = true;
              break;
            case "MFB":
              returnTxt = false;
              break;
          }
          break;
        case "版本名称":
          switch (data.buyVersion) {
            case "SYB":
              returnTxt = "试用版";
              break;
            case "JCB":
              returnTxt = "基础版";
              break;
            case "ZYB":
              returnTxt = "专业版";
              break;
            case "MFB":
              returnTxt = "免费版";
              break;
          }
          break;
        case "剩余天数":
          returnTxt = data.remainderDays;
          break;
        case "专业版提示":
          returnTxt = ["专业版功能", "图表化项目管理、批量便捷操作、多维度数据统计、WBS文件系统等都为专业版功能，同时还有更多高级功能将陆续开放。您可以通过以下方式来升级到专业版。"];
          break;
        case "续费提示":
          var name = "";
          switch (data.buyVersion) {
            case "SYB":
              name = "试用版";
              break;
            case "JCB":
              name = "基础版";
              break;
            case "ZYB":
              name = "beta版";
              break;
          }
          returnTxt = ["续费升级", "\u60A8\u516C\u53F8\u5F53\u524D\u4F7F\u7528\u7684\u662F\u8682\u8681\u5206\u5DE5" + name + "\uFF0C\u5F53\u524D\u7684\u6388\u6743\u6709\u6548\u671F\u622A\u6B62\u4E8E" + data.endDate + "\u3002\u60A8\u53EF\u4EE5\u901A\u8FC7\u4EE5\u4E0B\u65B9\u5F0F\u6765\u8FDB\u884C\u63D0\u524D\u7EED\u8D39\uFF0C\u6216\u5347\u7EA7\u5230\u66F4\u9AD8\u7248\u672C\u3002"];
          break;
        case "人数超限提示":
          returnTxt = "\u60A8\u516C\u53F8\u7BA1\u7406\u5458\u6388\u6743\u7684\u4F7F\u7528\u4EBA\u6570\u5DF2\u7ECF\u8D85\u51FA\u4E86\u7248\u672C\u4E0A\u9650\uFF0C\u5F53\u524D\u7248\u672C\u6700\u5927\u53EF\u6388\u6743\u4EBA\u6570\u4E3A<b>" + data.buyUserCount + "</b>\u4EBA\uFF0C\u76EE\u524D\u5DF2\u6388\u6743<b>" + data.synUserCount + "</b>\u4EBA\u3002\u8BF7\u7BA1\u7406\u5458\u53CA\u65F6\u5728\u9489\u9489\u540E\u53F0\u8FDB\u884C\u56E2\u961F\u7684\u6388\u6743\u7BA1\u7406\uFF0C\u6216\u5347\u7EA7\u5230\u53EF\u5BB9\u7EB3\u66F4\u591A\u4EBA\u5458\u7684\u89C4\u683C\u3002";
          break;
        case "人数超限提示":
          returnTxt = ["使用人数超限", "\u60A8\u516C\u53F8\u7BA1\u7406\u5458\u6388\u6743\u7684\u4F7F\u7528\u4EBA\u6570\u5DF2\u7ECF\u8D85\u51FA\u4E86\u7248\u672C\u4E0A\u9650\uFF0C\u5F53\u524D\u7248\u672C\u6700\u5927\u53EF\u6388\u6743\u4EBA\u6570\u4E3A<b>" + data.buyUserCount + "</b>\u4EBA\uFF0C\u76EE\u524D\u5DF2\u6388\u6743<b>" + data.synUserCount + "</b>\u4EBA\u3002\u8BF7\u7BA1\u7406\u5458\u53CA\u65F6\u5728\u9489\u9489\u540E\u53F0\u8FDB\u884C\u56E2\u961F\u7684\u6388\u6743\u7BA1\u7406\uFF0C\u6216\u5347\u7EA7\u5230\u53EF\u5BB9\u7EB3\u66F4\u591A\u4EBA\u5458\u7684\u89C4\u683C\u3002\u3002"];
          break;
        case "即将到期提示":
          if (data.buyVersion === "SYB") {
            returnTxt = "<div class='freeText'>\u60A8\u516C\u53F8\u4E8E<b>" + data.buyDate + "</b>\u5F00\u59CB\u8BD5\u7528\u7684\u8682\u8681\u5206\u5DE5\u4E13\u4E1A\u7248\u5C06\u5728<b>" + (data.remainderDays == 0 ? "明天" : data.remainderDays + "天后") + "</b>\u5230\u671F\uFF0C\u8BF7\u53CA\u65F6\u8D2D\u4E70\u5347\u7EA7\u3002</div>\n                    ";
          } else if (data.buyVersion === "JCB") {
            returnTxt = "\u60A8\u516C\u53F8\u4E8E<b>" + data.buyDate + "</b>\u8D2D\u4E70\u7684\u8682\u8681\u5206\u5DE5\u57FA\u7840\u7248\u5C06\u5728<b>" + (data.remainderDays == 0 ? "明天" : data.remainderDays + "天后") + "</b>\u5230\u671F\uFF0C\u4E3A\u4E86\u4E0D\u5F71\u54CD\u60A8\u516C\u53F8\u7684\u6B63\u5E38\u4F7F\u7528\uFF0C\u8BF7\u60A8\u63D0\u524D\u8FDB\u884C\u7EED\u8D39\u6216\u8D2D\u4E70\u5176\u4ED6\u89C4\u683C\u3002";
          } else if (data.buyVersion === "ZYB") {
            returnTxt = "\u60A8\u516C\u53F8\u4E8E<b>" + data.buyDate + "</b>\u8D2D\u4E70\u7684\u8682\u8681\u5206\u5DE5\u4E13\u4E1A\u7248\u5C06\u5728<b>" + (data.remainderDays == 0 ? "明天" : data.remainderDays + "天后") + "</b>\u5230\u671F\uFF0C\u4E3A\u4E86\u4E0D\u5F71\u54CD\u60A8\u516C\u53F8\u7684\u6B63\u5E38\u4F7F\u7528\uFF0C\u8BF7\u60A8\u63D0\u524D\u8FDB\u884C\u7EED\u8D39\u6216\u8D2D\u4E70\u5176\u4ED6\u89C4\u683C\u3002</div>";
          }
          break;
        case "已到期提示":
          if (data.buyVersion === "ZYB") {
            returnTxt = "\u60A8\u516C\u53F8\u4E8E<b>" + data.buyDate + "</b>\u8D2D\u4E70\u7684\u8682\u8681\u5206\u5DE5\u4E13\u4E1A\u7248\u5DF2\u7ECF\u5230\u671F\uFF0C\u611F\u8C22\u60A8\u7684\u652F\u6301\u548C\u4FE1\u4EFB\uFF0C\u8BF7\u60A8\u53CA\u65F6\u7EED\u8D39\u6216\u8D2D\u4E70\u5176\u4ED6\u89C4\u683C\u3002";
          } else if (data.buyVersion === "JCB") {
            returnTxt = "\u60A8\u516C\u53F8\u4E8E<b>" + data.buyDate + "</b>\u8D2D\u4E70\u7684\u8682\u8681\u5206\u5DE5\u57FA\u7840\u7248\u5DF2\u7ECF\u5230\u671F\uFF0C\u611F\u8C22\u60A8\u7684\u652F\u6301\u548C\u4FE1\u4EFB\uFF0C\u8BF7\u60A8\u53CA\u65F6\u7EED\u8D39\u6216\u5347\u7EA7\u5230\u529F\u80FD\u66F4\u52A0\u5168\u9762\u7684\u4E13\u4E1A\u7248\u3002";
          } else if (data.buyVersion === "SYB" && new Date(data.createDate).getTime() - new Date("2018-10-12").getTime() < 0) {
            returnTxt = "<div class='freeText'><b>\u8682\u8681\u5206\u5DE5\u514D\u8D39\u7248</b>\uFF0C\u514D\u8D39\u7248\u5305\u542B\u4EFB\u52A1\u534F\u4F5C\u7684\u5B8C\u6574\u529F\u80FD\uFF0C\u53EF\u8F7B\u5EA6\u7528\u4E8E\u65E5\u5E38\u5DE5\u4F5C\u4E2D\u4EFB\u52A1\u7684\u6709\u5E8F\u6307\u6D3E\u548C\u8DDF\u8FDB\u3002</div>\n\t\t\t\t\t\t\t\t <div class='basicsText'><b>\u8682\u8681\u5206\u5DE5\u57FA\u7840\u7248</b>\uFF0C\u7ECF\u6D4E\u5B9E\u60E0\u7684\u57FA\u7840\u7248\u5728\u6EE1\u8DB3\u4EFB\u52A1\u534F\u4F5C\u529F\u80FD\u7684\u540C\u65F6\uFF0C\u4E0D\u9650\u4F7F\u7528\u4EBA\u6570\u3001\u4E0D\u9650\u9879\u76EE\u6570\u91CF\u3001\u4E0D\u9650\u4EFB\u52A1\u6570\u91CF\u3002</div>\n\t\t\t\t\t\t\t\t <div class='majorText'><b>\u8682\u8681\u5206\u5DE5\u4E13\u4E1A\u7248</b>\uFF0C\u529F\u80FD\u5F3A\u5927\u7684\u4E13\u4E1A\u7248\u5177\u6709\u6279\u91CF\u4EFB\u52A1\u64CD\u4F5C\u3001\u7518\u7279\u56FE\u3001\u591A\u7EF4\u5EA6\u6570\u636E\u7EDF\u8BA1\u56FE\u8868\u7B49\u4E13\u4E1A\u529F\u80FD\uFF0C\u52A9\u60A8\u63D0\u9AD8\u534F\u540C\u5DE5\u4F5C\u6548\u7387\u3001\u91CF\u5316\u5458\u5DE5\u7EE9\u6548\u3001\u63D0\u5347\u9879\u76EE\u7BA1\u7406\u3002</div>";
          } else if (data.buyVersion === "SYB" && new Date(data.createDate).getTime() - new Date("2018-10-12").getTime() >= 0) {
            returnTxt = "<div class='freeText'>\u60A8\u516C\u53F8\u4E8E<b>" + data.buyDate + "</b>\u5F00\u59CB\u4F53\u9A8C\u8BD5\u7528\u7684\u8682\u8681\u5206\u5DE5\u4E13\u4E1A\u7248\u5DF2\u5230\u671F\uFF0C\u8BF7\u53CA\u65F6\u8D2D\u4E70\u5347\u7EA7\u3002</div>\n\t\t\t\t\t\t\t\t<div class='basicsText'>\u5982\u60A8\u9700\u8981\u8F7B\u91CF\u5316\u7684\u4EFB\u52A1\u534F\u540C\uFF0C\u53EF\u8D2D\u4E70\u7ECF\u6D4E\u5B9E\u60E0\u7684<b>\u8682\u8681\u5206\u5DE5\u57FA\u7840\u7248</b>\uFF0C\u57FA\u7840\u7248\u4E0D\u9650\u4F7F\u7528\u4EBA\u6570\u3001\u4E0D\u9650\u9879\u76EE\u6570\u91CF\u3001\u4E0D\u9650\u4EFB\u52A1\u6570\u91CF\u3002</div>\n\t\t\t\t\t\t\t\t<div class='majorText'>\u6211\u4EEC\u5EFA\u8BAE\u60A8\u5347\u7EA7\u5230\u529F\u80FD\u5F3A\u5927\u7684<b>\u8682\u8681\u5206\u5DE5\u4E13\u4E1A\u7248</b>\uFF0C\u4E13\u4E1A\u7248\u5177\u6709\u6279\u91CF\u4EFB\u52A1\u64CD\u4F5C\u3001\u7518\u7279\u56FE\u3001\u591A\u7EF4\u5EA6\u6570\u636E\u7EDF\u8BA1\u56FE\u8868\u7B49\u4E13\u4E1A\u529F\u80FD\uFF0C\u52A9\u60A8\u63D0\u9AD8\u534F\u540C\u5DE5\u4F5C\u6548\u7387\u3001\u91CF\u5316\u5458\u5DE5\u7EE9\u6548\u3001\u63D0\u5347\u9879\u76EE\u7BA1\u7406\u3002</div>";
          }
          break;
      }
      return returnTxt;
    }

    // 只允许输入正整数和浮点数

  }, {
    key: "onlyNumber",
    value: function onlyNumber(obj) {
      obj.value = obj.value.replace(/[^\d\.]/g, "").replace(".", "a").replace(/\./g, "").replace("a", ".");
      if (obj.value[0] === ".") {
        obj.value = "0" + obj.value;
      }
    }
    /**
    * js数组排序 支持数字和字符串
    * @param params
    * @param arrObj   obj     必填  数组对象
    * @param keyName  string  必填  要排序的属性名称
    * @param type     int     选填  默认type:0 正顺  type:1反顺
    * @description
    *  使用示例：
        var temp = [
          {"name":"zjf","score":50,"age":10},
          {"name":"lyy","score":90,"age":5},
          {"name":"zzx","score":90,"age":12}
        ];
        //根据age排序
        var temp1 = arrItemSort(temp,"age",1);
    */

  }, {
    key: "arrItemSort",
    value: function arrItemSort(arrObj, keyName, type, isDate) {
      //这里如果 直接等于arrObj，相当于只是对对象的引用，改变排序会同时影响原有对象的排序，而通过arrObj.slice(0)，
      //表示把对象复制给另一个对象，两者间互不影响
      if (!arrObj) {
        return [];
      }
      var tempArrObj = arrObj.slice(0);
      var compare = function compare(keyName, type) {
        return function (obj1, obj2) {
          var val1 = obj1[keyName];
          var val2 = obj2[keyName];
          if (isDate) {
            val1 = new Date(obj1[keyName].replace(/-/g, "/")).getTime() / 1000;

            val2 = new Date(obj2[keyName].replace(/-/g, "/")).getTime() / 1000;
          }
          if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
            val1 = Number(val1);
            val2 = Number(val2);
          }
          //如果值为空的，放在最后
          if (val1 == null && val2 == null) {
            return 0;
          } else if (val1 == null && val2 != null) {
            return type == 1 ? -1 : 1;
          } else if (val2 == null && val1 != null) {
            return type == 1 ? 1 : -1;
          }
          //排序
          if (val1 < val2) {
            return type == 1 ? 1 : -1;
          } else if (val1 > val2) {
            return type == 1 ? -1 : 1;
          } else {
            return 0;
          }
        };
      };
      return tempArrObj.sort(compare(keyName, type));
    }

    // 根据文件类型 返回 文件图标

  }, {
    key: "createFileIcon",
    value: function createFileIcon(fileType) {
      var initfileType = new String(fileType);
      if (initfileType.length > 1) {
        initfileType = initfileType.substr(0, 1) + initfileType.substr(1);
      } else {
        initfileType = initfileType;
      }
      var audioArr = ["wav", "mp3", "au", "aif", "aiff", "ram", "wma", "mmf", "amr", "aac", "flac"];
      var radioArr = ["avi", "mov", "asf", "wmv", "navi", "3gp", "ra", "ram", "mkv", "flv", "f4v", "rmvb", "webm", "mp4"];
      var imageArr = ["jpg", "png", "jpeg", "bmp", "pcx", "tif", "tga", "exif", "fpx", "svg", "cdr", "pcd", "dxf", "ufo", "esp", "ai", "hdri", "raw", "wmf", "flic", "emp", "ico"];
      var excelArr = ["xlsx", "xls"];
      var wordArr = ["doc", "docx"];
      var nomalArr = ["zip", "word"];
      var newAddArr = ["pdf", "ppt", "dwg", "rar", "ps", "zip", "word"];
      if (this.oneOfIcon(fileType, audioArr)) {
        fileType = "audio";
      } else if (this.oneOfIcon(fileType, radioArr)) {
        fileType = "radio";
      } else if (this.oneOfIcon(fileType, excelArr)) {
        fileType = "excel";
      } else if (this.oneOfIcon(fileType, wordArr)) {
        fileType = "word";
      } else if (this.oneOfIcon(fileType, imageArr)) {
        fileType = "image";
      } else if (this.oneOfIcon(fileType, nomalArr)) {} else if (this.oneOfIcon(fileType, newAddArr)) {} else {
        fileType = "others";
      }
      //此处要做判断，看是什么类型
      if (fileType === "others") {
        return _react2.default.createElement("div", { className: "download downloadOthers", __source: {
            fileName: _jsxFileName,
            lineNumber: 850
          }
        }, _react2.default.createElement("div", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 851
          }
        }, initfileType.substr(0, 1)));
      } else {
        return _react2.default.createElement(_icon2.default, { type: "anticon-" + fileType, className: "download", __source: {
            fileName: _jsxFileName,
            lineNumber: 855
          }
        });
      }
    }
  }, {
    key: "oneOfIcon",
    value: function oneOfIcon(value, validList) {
      for (var i = 0; i < validList.length; i++) {
        if (value == validList[i]) {
          return true;
        }
      }
      return false;
    }
  }]);

  return Utils;
}(_react2.default.Component);

exports.default = Utils;

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } if (typeof module.exports === 'function') { __REACT_HOT_LOADER__.register(module.exports, 'module.exports', "D:\\work\\phone-new\\utils\\utils.js"); return; } for (var key in module.exports) { if (!Object.prototype.hasOwnProperty.call(module.exports, key)) { continue; } var namedExport = void 0; try { namedExport = module.exports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "D:\\work\\phone-new\\utils\\utils.js"); } } })();

/***/ }),

/***/ 578:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PROJECT_NOW_PAGE = exports.PROJECT_TAGLIST = exports.PROJECT_CONDITION = exports.HOMESCROLLTOP = exports.DYNAMICSCROLLTOP = exports.PROJECTTASKSCROLL = exports.PROJECTTASKALLCOUNT = exports.PROJECTTASKLIST = exports.PROJECTALLCOUNT = exports.PROJECTSCROLL = exports.PROJECTTYPE = exports.PROJECTTEXT = exports.TASKCONDITION = exports.TASKSCROLLTOP = exports.TASKPAGECOUNTDEL = exports.TASKTEXTDEL = exports.SET_TASKCOUNTDEL = exports.TASKCOUNTDEL = exports.EDIT_TASKLISTDEL = exports.ADD_TASKLISTDEL = exports.SET_TASKLISTDEL = exports.TASKLISTDEL = exports.TASKTEXT = exports.DYNAMICPAGECOUNT = exports.PROJECTPAGECOUNT = exports.TASKPAGECOUNT = exports.TASKCOUNT = exports.DYNAMICLIST = exports.SET_PROJECTLIST = exports.PROJECTLIST = exports.TASKLIST = undefined;
exports.content = content;
exports.saveProjectNowPageAtCache = saveProjectNowPageAtCache;
exports.saveProjectTagListAtCache = saveProjectTagListAtCache;
exports.saveProjectConditionAtCache = saveProjectConditionAtCache;
exports.saveTaskListAtCache = saveTaskListAtCache;
exports.saveTaskCountAtCache = saveTaskCountAtCache;
exports.saveTaskTextAtCache = saveTaskTextAtCache;
exports.saveTaskPageCountAtCache = saveTaskPageCountAtCache;
exports.saveTaskLisToDateltAtCache = saveTaskLisToDateltAtCache;
exports.setTaskLisToDateltAtCache = setTaskLisToDateltAtCache;
exports.addTaskLisToDateltAtCache = addTaskLisToDateltAtCache;
exports.editTaskLisToDateltAtCache = editTaskLisToDateltAtCache;
exports.saveTaskCountToDatelAtCache = saveTaskCountToDatelAtCache;
exports.setTaskCountToDatelAtCache = setTaskCountToDatelAtCache;
exports.saveTaskTextToDatelAtCache = saveTaskTextToDatelAtCache;
exports.saveTaskPageCountToDatelAtCache = saveTaskPageCountToDatelAtCache;
exports.saveTaskScrollTopAtCache = saveTaskScrollTopAtCache;
exports.saveHomeScrollTop = saveHomeScrollTop;
exports.saveDynamicScrollTop = saveDynamicScrollTop;
exports.saveTaskConditionAtCache = saveTaskConditionAtCache;
exports.saveProjectListAtCache = saveProjectListAtCache;
exports.setUpdataProjectListAtCache = setUpdataProjectListAtCache;
exports.saveProjectTextAtCache = saveProjectTextAtCache;
exports.saveProjectTypeAtCache = saveProjectTypeAtCache;
exports.saveProjectScrollAtCache = saveProjectScrollAtCache;
exports.saveProjectAllCountAtCache = saveProjectAllCountAtCache;
exports.saveProjectPageCountAtCache = saveProjectPageCountAtCache;
exports.saveProjectTaskList = saveProjectTaskList;
exports.saveProjectTaskAllCount = saveProjectTaskAllCount;
exports.saveProjectTaskScroll = saveProjectTaskScroll;
exports.saveDynamicListAtCache = saveDynamicListAtCache;
exports.saveDynamicPageCountAtCache = saveDynamicPageCountAtCache;

var _httpClient = __webpack_require__(554);

var _httpClient2 = _interopRequireDefault(_httpClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TASKLIST = exports.TASKLIST = "TASKLIST";
// export const UPDATE_TASKLIST = "UPDATE_TASKLIST";
var PROJECTLIST = exports.PROJECTLIST = "PROJECTLIST";
var SET_PROJECTLIST = exports.SET_PROJECTLIST = "SET_PROJECTLIST";
var DYNAMICLIST = exports.DYNAMICLIST = "DYNAMICLIST";
var TASKCOUNT = exports.TASKCOUNT = "TASKCOUNT";
var TASKPAGECOUNT = exports.TASKPAGECOUNT = "TASKPAGECOUNT";
var PROJECTPAGECOUNT = exports.PROJECTPAGECOUNT = "PROJECTPAGECOUNT";
var DYNAMICPAGECOUNT = exports.DYNAMICPAGECOUNT = "DYNAMICPAGECOUNT";
var TASKTEXT = exports.TASKTEXT = "TASKTEXT";
var TASKLISTDEL = exports.TASKLISTDEL = "TASKLISTDEL";
var SET_TASKLISTDEL = exports.SET_TASKLISTDEL = "SET_TASKLISTDEL";
var ADD_TASKLISTDEL = exports.ADD_TASKLISTDEL = "ADD_TASKLISTDEL";
var EDIT_TASKLISTDEL = exports.EDIT_TASKLISTDEL = "EDIT_TASKLISTDEL";

var TASKCOUNTDEL = exports.TASKCOUNTDEL = "TASKCOUNTDEL";
var SET_TASKCOUNTDEL = exports.SET_TASKCOUNTDEL = "SET_TASKCOUNTDEL";
var TASKTEXTDEL = exports.TASKTEXTDEL = "TASKTEXTDEL";
var TASKPAGECOUNTDEL = exports.TASKPAGECOUNTDEL = "TASKPAGECOUNTDEL";
var TASKSCROLLTOP = exports.TASKSCROLLTOP = "TASKSCROLLTOP";
var TASKCONDITION = exports.TASKCONDITION = "TASKCONDITION";
var PROJECTTEXT = exports.PROJECTTEXT = "PROJECTTEXT";
var PROJECTTYPE = exports.PROJECTTYPE = "PROJECTTYPE";
var PROJECTSCROLL = exports.PROJECTSCROLL = "PROJECTSCROLL";
var PROJECTALLCOUNT = exports.PROJECTALLCOUNT = "PROJECTALLCOUNT";
var PROJECTTASKLIST = exports.PROJECTTASKLIST = "PROJECTTASKLIST";
var PROJECTTASKALLCOUNT = exports.PROJECTTASKALLCOUNT = "PROJECTTASKALLCOUNT";
var PROJECTTASKSCROLL = exports.PROJECTTASKSCROLL = "PROJECTTASKSCROLL";
var DYNAMICSCROLLTOP = exports.DYNAMICSCROLLTOP = "DYNAMICSCROLLTOP";
var HOMESCROLLTOP = exports.HOMESCROLLTOP = "HOMESCROLLTOP";
var PROJECT_CONDITION = exports.PROJECT_CONDITION = "PROJECT_CONDITION";
var PROJECT_TAGLIST = exports.PROJECT_TAGLIST = "PROJECT_TAGLIST";
var PROJECT_NOW_PAGE = exports.PROJECT_NOW_PAGE = "PROJECT_NOW_PAGE";
function content(data, type) {
  return {
    type: type,
    payload: data
  };
}
//保存当前的页码
function saveProjectNowPageAtCache(data) {
  return {
    type: "PROJECT_NOW_PAGE",
    payload: data
  };
}
//选择的标签详细信息作为回显用
function saveProjectTagListAtCache(data) {
  return {
    type: "PROJECT_TAGLIST",
    payload: data
  };
}
//项目筛选条件
function saveProjectConditionAtCache(data) {
  return {
    type: "PROJECT_CONDITION",
    payload: data
  };
}
// 任务列表 第一页缓存数据
function saveTaskListAtCache(data) {
  return {
    type: TASKLIST,
    payload: data
  };
}
// //任务列表创建删除更新列表
// export function updateTaskListAtCache(data) {
// 	return {
// 		type: UPDATE_TASKLIST,
// 		payload: data
// 	};
// }

// 任务列表 总条数
function saveTaskCountAtCache(data) {
  return {
    type: TASKCOUNT,
    payload: data
  };
}
//任务搜索条件
function saveTaskTextAtCache(data) {
  return {
    type: TASKTEXT,
    payload: data
  };
}

// 任务列表 总页数
function saveTaskPageCountAtCache(data) {
  return {
    type: TASKPAGECOUNT,
    payload: data
  };
}
// 任务列表 跳转任务详情缓存数据
function saveTaskLisToDateltAtCache(data) {
  return {
    type: TASKLISTDEL,
    payload: data
  };
}
// 删除后更新任务列表
function setTaskLisToDateltAtCache(id) {
  return {
    type: SET_TASKLISTDEL,
    payload: id
  };
}
// 增加后更新任务列表
function addTaskLisToDateltAtCache(data) {
  return {
    type: ADD_TASKLISTDEL,
    payload: data
  };
}
// 编辑后更新任务列表
function editTaskLisToDateltAtCache(data) {
  return {
    type: EDIT_TASKLISTDEL,
    payload: data
  };
}
// 任务列表 跳转任务详情总条数
function saveTaskCountToDatelAtCache(data) {
  return {
    type: TASKCOUNTDEL,
    payload: data
  };
}
// 任务列表 删除后变更总条数
function setTaskCountToDatelAtCache(data) {
  return {
    type: SET_TASKCOUNTDEL,
    payload: data
  };
}
//任务搜索条件 跳转任务详情后的搜索缓存
function saveTaskTextToDatelAtCache(data) {
  return {
    type: TASKTEXTDEL,
    payload: data
  };
}
// 任务列表 跳转任务详情的总页数
function saveTaskPageCountToDatelAtCache(data) {
  return {
    type: TASKPAGECOUNTDEL,
    payload: data
  };
}
//滚动条高度 跳转任务详情后的
function saveTaskScrollTopAtCache(data) {
  return {
    type: TASKSCROLLTOP,
    payload: data
  };
}

function saveHomeScrollTop(data) {
  return {
    type: HOMESCROLLTOP,
    payload: data
  };
}
function saveDynamicScrollTop(data) {
  return {
    type: DYNAMICSCROLLTOP,
    payload: data
  };
}

//任务列表筛选条件 跳转任务详情后
function saveTaskConditionAtCache(data) {
  return {
    type: TASKCONDITION,
    payload: data
  };
}
// 项目列表 第一页缓存数据
function saveProjectListAtCache(data) {
  return {
    type: PROJECTLIST,
    payload: data
  };
}
//项目列表 更新项目列表数据
function setUpdataProjectListAtCache(data) {
  return {
    type: SET_PROJECTLIST,
    payload: data
  };
}

//项目列表搜索条件 缓存数据
function saveProjectTextAtCache(data) {
  return {
    type: PROJECTTEXT,
    payload: data
  };
}
//项目列表菜单筛选条件 缓存数据
function saveProjectTypeAtCache(data) {
  return {
    type: PROJECTTYPE,
    payload: data
  };
}
//项目列表滚动条 缓存数据
function saveProjectScrollAtCache(data) {
  return {
    type: PROJECTSCROLL,
    payload: data
  };
}
// 项目列表跳转项目详情 总页数
function saveProjectAllCountAtCache(data) {
  return {
    type: PROJECTALLCOUNT,
    payload: data
  };
}
// 项目列表 总页数
function saveProjectPageCountAtCache(data) {
  return {
    type: PROJECTPAGECOUNT,
    payload: data
  };
}
//项目详情 任务列表
function saveProjectTaskList(data) {
  return {
    type: PROJECTTASKLIST,
    payload: data
  };
}
//项目详情 任务列表总页数
function saveProjectTaskAllCount(data) {
  return {
    type: PROJECTTASKALLCOUNT,
    payload: data
  };
}
//项目详情 任务列表滚动条高度
function saveProjectTaskScroll(data) {
  return {
    type: PROJECTTASKSCROLL,
    payload: data
  };
}
// 动态列表 第一页缓存数据
function saveDynamicListAtCache(data) {
  return {
    type: DYNAMICLIST,
    payload: data
  };
}

// 动态列表 总页数
function saveDynamicPageCountAtCache(data) {
  return {
    type: DYNAMICPAGECOUNT,
    payload: data
  };
}

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } if (typeof module.exports === 'function') { __REACT_HOT_LOADER__.register(module.exports, 'module.exports', "D:\\work\\phone-new\\actions\\cache.js"); return; } for (var key in module.exports) { if (!Object.prototype.hasOwnProperty.call(module.exports, key)) { continue; } var namedExport = void 0; try { namedExport = module.exports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "D:\\work\\phone-new\\actions\\cache.js"); } } })();

/***/ }),

/***/ 579:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SELECTED_USERS = exports.NOW_PAGE = exports.SELECTED_TAG = exports.SELECTED_PROS = exports.TASK_SEARCH_OBJECT = exports.TASK_CUIBAN = exports.TASKINFO_REFRESH = exports.CALCULATE_TEAM = exports.FILES_LIST = exports.REFRESH_TIME = exports.PROJECT_COUNT = exports.CALCULATE_TASK_TABLE = exports.CALCULATE_PROJECT = exports.TASK_UPDATE_STATE = exports.TASK_CREATE_BREAD = exports.TASK_DELETE = exports.TASK_CREATE_VALS = exports.TASKINFO_TASK_BY_PRO_LIST = exports.TASK_PRIORITY_LIST = exports.TASK_CREATE = exports.TASK_DELETE_TALK = exports.TASK_ADD_TALK = exports.TASK_FILES_DELETE = exports.TASKINFO_UPLOADING = exports.TASK_TASKINFO_UPDATE = exports.TASK_FILES_LIST_BY_ID = exports.TASK_RELEVANCE_LIST_BY_ID = exports.TASK_CHILD_LIST_BY_ID = exports.TASK_DETAILS = exports.TASK_LIST_BY_CONDITION = exports.BACK_FN = exports.TASKINFO_ID = exports.DINGTAK_MESSAGE_DELETE = exports.HOME_DATA = undefined;
exports.content = content;
exports.setSelectedUsers = setSelectedUsers;
exports.setNowPage = setNowPage;
exports.setSelectedTag = setSelectedTag;
exports.setSelectedPros = setSelectedPros;
exports.setTaskSearchObject = setTaskSearchObject;
exports.findHomeDataByPageSize = findHomeDataByPageSize;
exports.getDingMessageDetails = getDingMessageDetails;
exports.selectTaskinfoId = selectTaskinfoId;
exports.backFn = backFn;
exports.attentionUsers = attentionUsers;
exports.getTaskDetailsById = getTaskDetailsById;
exports.getTaskDetailsById2 = getTaskDetailsById2;
exports.getTaskDetailsByIds = getTaskDetailsByIds;
exports.getChildListById = getChildListById;
exports.addAttentionWitchProject = addAttentionWitchProject;
exports.cancelAttentionWitchProject = cancelAttentionWitchProject;
exports.getReLevanceTaskListById = getReLevanceTaskListById;
exports.getTaskFilesListById = getTaskFilesListById;
exports.updateTaskinfo = updateTaskinfo;
exports.upFilesByType = upFilesByType;
exports.deleteFileByType = deleteFileByType;
exports.addTalkByTaskId = addTalkByTaskId;
exports.deleteTalkById = deleteTalkById;
exports.createTask = createTask;
exports.getPriorityList = getPriorityList;
exports.getTaskListByPro = getTaskListByPro;
exports.setCreateTaskVals = setCreateTaskVals;
exports.deleteTaskById = deleteTaskById;
exports.updateTaskStateById = updateTaskStateById;
exports.updateTaskStateById2 = updateTaskStateById2;
exports.setTaskCreateBread = setTaskCreateBread;
exports.projectCount = projectCount;
exports.getProjectCount = getProjectCount;
exports.getTasktableData = getTasktableData;
exports.refreshTime = refreshTime;
exports.getTaskFileByPro = getTaskFileByPro;
exports.getTaskListByCondition = getTaskListByCondition;
exports.getFileListByProjectId = getFileListByProjectId;
exports.teamStatistics = teamStatistics;
exports.refreshTaskinfo = refreshTaskinfo;
exports.expedite = expedite;
exports.cuibanChildTask = cuibanChildTask;

var _httpClient = __webpack_require__(554);

var _httpClient2 = _interopRequireDefault(_httpClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HOME_DATA = exports.HOME_DATA = "HOME_DATA";
var DINGTAK_MESSAGE_DELETE = exports.DINGTAK_MESSAGE_DELETE = "DINGTAK_MESSAGE_DELETE";
var TASKINFO_ID = exports.TASKINFO_ID = "TASKINFO_ID";
var BACK_FN = exports.BACK_FN = "BACK_FN";
var TASK_LIST_BY_CONDITION = exports.TASK_LIST_BY_CONDITION = "TASK_LIST_BY_CONDITION";
var TASK_DETAILS = exports.TASK_DETAILS = "TASK_DETAILS";
var TASK_CHILD_LIST_BY_ID = exports.TASK_CHILD_LIST_BY_ID = "TASK_CHILD_LIST_BY_ID";
var TASK_RELEVANCE_LIST_BY_ID = exports.TASK_RELEVANCE_LIST_BY_ID = "TASK_RELEVANCE_LIST_BY_ID";
var TASK_FILES_LIST_BY_ID = exports.TASK_FILES_LIST_BY_ID = "TASK_FILES_LIST_BY_ID";
var TASK_TASKINFO_UPDATE = exports.TASK_TASKINFO_UPDATE = "TASK_TASKINFO_UPDATE";
var TASKINFO_UPLOADING = exports.TASKINFO_UPLOADING = "TASKINFO_UPLOADING";
var TASK_FILES_DELETE = exports.TASK_FILES_DELETE = "TASK_FILES_DELETE";
var TASK_ADD_TALK = exports.TASK_ADD_TALK = "TASK_ADD_TALK";
var TASK_DELETE_TALK = exports.TASK_DELETE_TALK = "TASK_DELETE_TALK";
var TASK_CREATE = exports.TASK_CREATE = "TASK_CREATE";
var TASK_PRIORITY_LIST = exports.TASK_PRIORITY_LIST = "TASK_PRIORITY_LIST";
var TASKINFO_TASK_BY_PRO_LIST = exports.TASKINFO_TASK_BY_PRO_LIST = "TASKINFO_TASK_BY_PRO_LIST";
var TASK_CREATE_VALS = exports.TASK_CREATE_VALS = "TASK_CREATE_VALS";
var TASK_DELETE = exports.TASK_DELETE = "TASK_DELETE";
var TASK_CREATE_BREAD = exports.TASK_CREATE_BREAD = "TASK_CREATE_BREAD";
var TASK_UPDATE_STATE = exports.TASK_UPDATE_STATE = "TASK_UPDATE_STATE";
var CALCULATE_PROJECT = exports.CALCULATE_PROJECT = "CALCULATE_PROJECT";
var CALCULATE_TASK_TABLE = exports.CALCULATE_TASK_TABLE = "CALCULATE_TASK_TABLE";
var PROJECT_COUNT = exports.PROJECT_COUNT = "PROJECT_COUNT";
var REFRESH_TIME = exports.REFRESH_TIME = "REFRESH_TIME";
var FILES_LIST = exports.FILES_LIST = "FILES_LIST";
var CALCULATE_TEAM = exports.CALCULATE_TEAM = "CALCULATE_TEAM";
var TASKINFO_REFRESH = exports.TASKINFO_REFRESH = "TASKINFO_REFRESH";
var TASK_CUIBAN = exports.TASK_CUIBAN = "TASK_CUIBAN";
var TASK_SEARCH_OBJECT = exports.TASK_SEARCH_OBJECT = "TASK_SEARCH_OBJECT";
var SELECTED_PROS = exports.SELECTED_PROS = "SELECTED_PROS";
var SELECTED_TAG = exports.SELECTED_TAG = "SELECTED_TAG";
var NOW_PAGE = exports.NOW_PAGE = "NOW_PAGE";
var SELECTED_USERS = exports.SELECTED_USERS = "SELECTED_USERS";
function content(data, type) {
  return {
    type: type,
    payload: data
  };
}
//保存选择后的人员信息

function setSelectedUsers(data) {
  return {
    type: SELECTED_USERS,
    payload: data
  };
}
//保存筛选选中的tag
function setNowPage(data) {
  return {
    type: NOW_PAGE,
    payload: data
  };
}
//保存筛选选中的tag
function setSelectedTag(data) {
  return {
    type: SELECTED_TAG,
    payload: data
  };
}
//保存筛选选中的project
function setSelectedPros(data) {
  return {
    type: SELECTED_PROS,
    payload: data
  };
}
//任务搜索对象
function setTaskSearchObject(data) {
  return {
    type: TASK_SEARCH_OBJECT,
    payload: data
  };
}
// 首页数据
function findHomeDataByPageSize() {
  var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 6;
  var fn = arguments[1];

  return function (dispatch) {
    _httpClient2.default.AjaxPost("/taskHome/findMyResponseTask?pageSize=" + size, "", function (list) {
      if (fn) {
        fn();
      }
      dispatch(content(list, HOME_DATA));
    });
  };
}

// 免登录里面用的 钉钉跳转页面选中
function getDingMessageDetails(taskinfoId) {
  return function (dispatch) {
    _httpClient2.default.AjaxPost("/taskinfo/getDingMessageDetails?taskinfoId=" + taskinfoId, "", function (list) {
      dispatch(content(list, DINGTAK_MESSAGE_DELETE));
    });
  };
}

// 免登录里面用的 选中任务id
function selectTaskinfoId(id) {
  return {
    type: TASKINFO_ID,
    payload: id
  };
}

// 免登录里面用的 不知道干嘛的
function backFn(type) {
  return {
    type: BACK_FN,
    payload: type
  };
}

// 邀请关注
function attentionUsers(taskId, users, callback) {
  var data = {
    objectId: taskId,
    rtype: "b",
    users: users
  };
  _httpClient2.default.AjaxPost("/collect/inviteAttention", data, function (list) {
    callback(list);
  });
}

// 获取任务详情数据
function getTaskDetailsById(id, fn) {
  return function (dispatch) {
    _httpClient2.default.AjaxPost("/taskinfo/findByTaskinfoId?id=" + id, "", function (list) {
      if (fn) {
        fn();
      }
      dispatch(content(list, TASK_DETAILS));
    });
  };
}
// 获取任务详情数据为了获取保存后的数据
function getTaskDetailsById2(id, fn) {
  return function (dispatch) {
    _httpClient2.default.AjaxPost("/taskinfo/findTaskinById?id=" + id, {}, function (list) {
      if (fn) {
        fn(list);
      }
    });
  };
}
// 首页获取任务详情数据
function getTaskDetailsByIds(id, callback) {
  _httpClient2.default.AjaxPost("/taskinfo/findByTaskinfoId?id=" + id, "", function (list) {
    callback(list);
  });
}
// // 首页获取任务详情数据(查出来的同列表数据格式，为了更新缓存用)
// export function getTaskDetailsByIdsNew(id, callback) {
// 	HttpClient.AjaxPost("/taskinfo/findTaskinById?id=" + id, "", list => {
// 		callback(list);
// 	});
// }

//获取子任务数据
function getChildListById(id, fn) {
  return function (dispatch) {
    _httpClient2.default.AjaxPost("/taskinfo/findChildTaskinfo?id=" + id, "", function (list) {
      if (fn) {
        fn();
      }
      dispatch(content(list, TASK_CHILD_LIST_BY_ID));
    });
  };
}
// 关注项目
function addAttentionWitchProject(objectId, fn) {
  var data = { rtype: "b", objectId: objectId };
  return function (dispatch) {
    _httpClient2.default.AjaxPost("/collect/collect", data, function (list) {
      if (fn) {
        fn(list);
      }
    });
  };
}
// 取消关注项目
function cancelAttentionWitchProject(objectId, fn) {
  var data = { rtype: "b", objectId: objectId };
  return function (dispatch) {
    _httpClient2.default.AjaxPost("/collect/callCollect", data, function (list) {
      if (fn) {
        fn(list);
      }
    });
  };
}
//获取协作任务数据
function getReLevanceTaskListById(id, fn) {
  return function (dispatch) {
    _httpClient2.default.AjaxPost("/taskinfo/findreLevanceTaskinfo?id=" + id, "", function (list) {
      if (fn) {
        fn();
      }
      dispatch(content(list, TASK_RELEVANCE_LIST_BY_ID));
    });
  };
}

//获取文任务所有文件
function getTaskFilesListById(id, fn) {
  return function (dispatch) {
    _httpClient2.default.AjaxPost("/taskinfo/findTaskinfoFiles?tId=" + id, "", function (list) {
      if (fn) {
        fn();
      }
      dispatch(content(list, TASK_FILES_LIST_BY_ID));
    });
  };
}

//修改任务 统一保存修改的信息
function updateTaskinfo(taskinfo, fn) {
  return function (dispatch) {
    _httpClient2.default.AjaxPost("/taskinfo/updateMoreIndex", taskinfo, function (list) {
      if (fn) {
        fn(list);
      }
      dispatch(content(list, TASK_TASKINFO_UPDATE));
    });
  };
}

// 上传文件
/*
 * type: 0描述附件 1评论文件 3成果文件
 * */
function upFilesByType(taskId, type, fileObj, fn) {
  return function (dispatch) {
    _httpClient2.default.AjaxPost("/files/uploadingMobileImg?projectId=" + taskId + "&type=" + type, fileObj, function (list) {
      if (fn) {
        fn();
      }
      dispatch(content(list, TASKINFO_UPLOADING));
    });
  };
}

// 删除文件
function deleteFileByType(id, fn) {
  return function (dispatch) {
    _httpClient2.default.AjaxPost("/files/deleteFile?id=" + id, [], function (list) {
      if (fn) {
        fn();
      }
      dispatch(content(list, TASK_FILES_DELETE));
    });
  };
}

// 添加评论  移动版状态 category 是 1
function addTalkByTaskId(id, description, files, replyUserId, fn) {
  return function (dispatch) {
    _httpClient2.default.AjaxPost("/leave/addLeave", {
      description: description,
      taskinfo: { id: id },
      reply: { id: replyUserId },
      filesMobile: files,
      category: "1"
    }, function (list) {
      if (fn) {
        fn();
      }
      dispatch(content(list, TASK_ADD_TALK));
    });
  };
}

// 删除评论
function deleteTalkById(id, fn) {
  return function (dispatch) {
    _httpClient2.default.AjaxPost("/leave/deleteLeave?id=" + id, "", function (list) {
      if (fn) {
        fn();
      }
      dispatch(content(list, TASK_DELETE_TALK));
    });
  };
}

// 创建任务
function createTask(proId, parId, taskinfo, fn) {
  return function (dispatch) {
    _httpClient2.default.AjaxPost("/taskinfo/addTaskinfo?progectId=" + proId + "&pid=" + parId, taskinfo, function (list) {
      if (fn) {
        fn(list);
      }
      dispatch(content(list, TASK_CREATE));
    });
  };
}

// 获取任务的优先级 列表
function getPriorityList(fn) {
  return function (dispatch) {
    _httpClient2.default.AjaxPost("/taskinfo/findCommonData", "", function (list) {
      if (fn) {
        fn();
      }
      dispatch(content(list, TASK_PRIORITY_LIST));
    });
  };
}

// 获取项目的任务列表
function getTaskListByPro(proID, taskID) {
  var pageNo = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  var pageSize = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 50;
  var fn = arguments[4];

  return function (dispatch) {
    _httpClient2.default.AjaxPostSync("/taskinfo/findTreePageList?progectId=" + proID + "&pId=" + taskID + "&pageNo=" + pageNo + "&pageSize=" + pageSize, {}, function (list) {
      if (fn) {
        fn();
      }
      dispatch(content(list, TASKINFO_TASK_BY_PRO_LIST));
    });
  };
}

// 创建任务 临时存储用户录入的值,防止用户返回到创建任务页面，数据没了的情况
function setCreateTaskVals(task) {
  return {
    type: TASK_CREATE_VALS,
    payload: task
  };
}

// 删除任务
function deleteTaskById(id, fn) {
  return function (dispatch) {
    _httpClient2.default.AjaxPost("/taskinfo/deleteTaskinfo?id=" + id, "", function (list) {
      if (fn) {
        fn();
      }
      dispatch(content(list, TASK_DELETE));
    });
  };
}

// 更新任务状态
/* data  = {id:'',projectId:'',state:'',description:'',mobileFile:[]}
 * 确认驳回0，确认通过1，标记完成1，认领0，终止4，重启0
 * */
function updateTaskStateById(data, fn) {
  return function (dispatch) {
    _httpClient2.default.AjaxPost("/taskinfo/updateStateIndex", data, function (list) {
      if (fn) {
        fn();
      }
      dispatch(content(list, TASK_UPDATE_STATE));
    });
  };
}
// 更新任务状态不存储到reduce

function updateTaskStateById2(data, fn) {
  _httpClient2.default.AjaxPost("/taskinfo/updateStateIndex", data, function (list) {
    if (fn) {
      fn(list);
    }
  });
}
// 设置添加子任务的面包屑
function setTaskCreateBread(data) {
  return {
    type: TASK_CREATE_BREAD,
    payload: data
  };
}
//初始化任务数据
function projectCount(list) {
  return {
    type: PROJECT_COUNT,
    payload: list
  };
}
//获取项目统计数据
function getProjectCount(id, fn) {
  return function (dispatch) {
    _httpClient2.default.AjaxPost("/calculate/project?id=" + id, "", function (list) {
      if (fn) {
        fn();
      }
      dispatch(content(list, CALCULATE_PROJECT));
    });
  };
}
//获取列表统计数据
function getTasktableData(data, fn) {
  return function (dispatch) {
    _httpClient2.default.AjaxPost("/calculate/getTasktableData", data, function (list) {
      if (fn) {
        fn();
      }
      dispatch(content(list, CALCULATE_TASK_TABLE));
    });
  };
}

//刷新团队
function refreshTime() {
  var sign = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

  return {
    type: REFRESH_TIME,
    payload: sign
  };
}
//获取任务文件
function getTaskFileByPro(projectId, parentId, pageSize, pageNo, fn) {
  return function (dispatch) {
    _httpClient2.default.AjaxPost("/files/fileIdexList?projectId=" + projectId + "&parentId=" + parentId + "&pageSize=" + pageSize + "&pageNo=" + pageNo, [], function (list) {
      if (fn) fn();
      dispatch(content(list, FILES_LIST));
    });
  };
}

function getTaskListByCondition(pageNo, pageSize, data, callback) {
  _httpClient2.default.AjaxPost("/taskHome/taskIniNew?pageNo=" + pageNo + "&pageSize=" + pageSize, data, function (list) {
    callback(list);
  });
}

//获取任务文件 - 新版
function getFileListByProjectId(projectId, parentId) {
  var pageSize = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 50;
  var pageNo = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
  var fileName = arguments[4];
  var callback = arguments[5];

  _httpClient2.default.AjaxPost("/files/fileIdexListNew?projectId=" + projectId + "&parentId=" + parentId + "&fileName=" + fileName + "&pageSize=" + pageSize + "&pageNo=" + pageNo, {}, function (list) {
    callback(list);
  });
}

//列表统计
function teamStatistics() {
  var pageSize = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;
  var pageNo = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var userName = arguments[2];
  var realityBeginTime = arguments[3];
  var realityEndTime = arguments[4];
  var projectId = arguments[5];

  return function (dispatch) {
    _httpClient2.default.AjaxPost("/calculate/teamStatistics?pageSize=" + pageSize + "&pageNo=" + pageNo + "&realityBeginTime=" + realityBeginTime + "&realityEndTime=" + realityEndTime + "&projectId=" + projectId, userName, function (list) {
      dispatch(content(list, CALCULATE_TEAM));
    });
  };
}
/**
 * 刷新任务树数据
 * @param {*} sign  是否刷新
 * @param {*} id  加载的id
 * @param {*} type  刷新类型， type 整个树都是刷新, alone 只刷新当前修改的元素
 */
function refreshTaskinfo() {
  var sign = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
  var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "all";

  return {
    type: TASKINFO_REFRESH,
    payload: { sign: sign, id: id, type: type }
  };
}
//催办任务
function expedite(data, tid, type, fn) {
  /*id:被催办的任务id, tid:详情的任务id, type:1 子任务,2:前序任务*/
  return function (dispatch) {
    _httpClient2.default.AjaxPost("/taskinfo/expedite?tid=" + tid + "&type=" + type, data, function (list) {
      if (fn) fn();
      dispatch(content(list, TASK_CUIBAN));
    });
  };
}

// 催办子任务
function cuibanChildTask(id, callback) {
  // id: 父任务ID
  _httpClient2.default.AjaxPost("/taskinfo/expediteSonTask", { id: id }, function (list) {
    callback(list);
  });
}

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } if (typeof module.exports === 'function') { __REACT_HOT_LOADER__.register(module.exports, 'module.exports', "D:\\work\\phone-new\\actions\\task.js"); return; } for (var key in module.exports) { if (!Object.prototype.hasOwnProperty.call(module.exports, key)) { continue; } var namedExport = void 0; try { namedExport = module.exports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "D:\\work\\phone-new\\actions\\task.js"); } } })();

/***/ }),

/***/ 580:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _icon = __webpack_require__(557);

var _icon2 = _interopRequireDefault(_icon);

var _getPrototypeOf = __webpack_require__(28);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(13);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(14);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(30);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(29);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(11);

var _react2 = _interopRequireDefault(_react);

var _index = __webpack_require__(83);

var _index2 = _interopRequireDefault(_index);

var _dingtalk = __webpack_require__(561);

var _dingtalk2 = _interopRequireDefault(_dingtalk);

var _alert = __webpack_require__(626);

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

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } if (typeof module.exports === 'function') { __REACT_HOT_LOADER__.register(module.exports, 'module.exports', "D:\\work\\phone-new\\components\\alert.js"); return; } for (var key in module.exports) { if (!Object.prototype.hasOwnProperty.call(module.exports, key)) { continue; } var namedExport = void 0; try { namedExport = module.exports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "D:\\work\\phone-new\\components\\alert.js"); } } })();

/***/ }),

/***/ 581:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initStore = undefined;

var _redux = __webpack_require__(556);

var _reduxDevtoolsExtension = __webpack_require__(671);

var _reduxThunk = __webpack_require__(672);

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reducers = __webpack_require__(653);

var _reducers2 = _interopRequireDefault(_reducers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initStore = exports.initStore = function initStore(initialState) {
  return (0, _redux.createStore)(_reducers2.default, initialState, (0, _reduxDevtoolsExtension.composeWithDevTools)((0, _redux.applyMiddleware)(_reduxThunk2.default)));
};

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } if (typeof module.exports === 'function') { __REACT_HOT_LOADER__.register(module.exports, 'module.exports', "D:\\work\\phone-new\\store.js"); return; } for (var key in module.exports) { if (!Object.prototype.hasOwnProperty.call(module.exports, key)) { continue; } var namedExport = void 0; try { namedExport = module.exports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "D:\\work\\phone-new\\store.js"); } } })();

/***/ }),

/***/ 591:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__resourceQuery) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _icon = __webpack_require__(557);

var _icon2 = _interopRequireDefault(_icon);

var _toast = __webpack_require__(568);

var _toast2 = _interopRequireDefault(_toast);

var _getPrototypeOf = __webpack_require__(28);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(13);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__(30);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _createClass2 = __webpack_require__(14);

var _createClass3 = _interopRequireDefault(_createClass2);

var _inherits2 = __webpack_require__(29);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(11);

var _react2 = _interopRequireDefault(_react);

var _redux = __webpack_require__(556);

var _nextReduxWrapper = __webpack_require__(573);

var _nextReduxWrapper2 = _interopRequireDefault(_nextReduxWrapper);

var _link = __webpack_require__(623);

var _link2 = _interopRequireDefault(_link);

var _index = __webpack_require__(83);

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(624);

var _index4 = _interopRequireDefault(_index3);

var _index5 = __webpack_require__(625);

var _index6 = _interopRequireDefault(_index5);

var _store = __webpack_require__(581);

var _dingHome = __webpack_require__(629);

var _dingHome2 = _interopRequireDefault(_dingHome);

var _Layout = __webpack_require__(646);

var _Layout2 = _interopRequireDefault(_Layout);

var _alert = __webpack_require__(580);

var _alert2 = _interopRequireDefault(_alert);

var _Loading = __webpack_require__(647);

var _Loading2 = _interopRequireDefault(_Loading);

var _MenuBar = __webpack_require__(648);

var _MenuBar2 = _interopRequireDefault(_MenuBar);

var _task = __webpack_require__(579);

var taskAction = _interopRequireWildcard(_task);

var _user = __webpack_require__(564);

var userAction = _interopRequireWildcard(_user);

var _dingtalk = __webpack_require__(561);

var _dingtalk2 = _interopRequireDefault(_dingtalk);

var _utils = __webpack_require__(565);

var _utils2 = _interopRequireDefault(_utils);

var _storage = __webpack_require__(558);

var _storage2 = _interopRequireDefault(_storage);

var _cache = __webpack_require__(578);

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

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } if (typeof module.exports === 'function') { __REACT_HOT_LOADER__.register(module.exports, 'module.exports', "D:\\work\\phone-new\\pages\\mo_dingHome.js"); return; } for (var key in module.exports) { if (!Object.prototype.hasOwnProperty.call(module.exports, key)) { continue; } var namedExport = void 0; try { namedExport = module.exports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "D:\\work\\phone-new\\pages\\mo_dingHome.js"); } } })();
    (function (Component, route) {
      if (false) return
      if (false) return

      var qs = __webpack_require__(85)
      var params = qs.parse(__resourceQuery.slice(1))
      if (params.entry == null) return

      module.hot.accept()
      Component.__route = route

      if (module.hot.status() === 'idle') return

      var components = next.router.components
      for (var r in components) {
        if (!components.hasOwnProperty(r)) continue

        if (components[r].Component.__route === route) {
          next.router.update(r, Component)
        }
      }
    })(module.exports.default || module.exports, "/mo_dingHome")
  
/* WEBPACK VAR INJECTION */}.call(exports, "?entry"))

/***/ }),

/***/ 626:
/***/ (function(module, exports) {

;

(function () {
  "use strict";

  var __styledJsxDefaultExport = new String(".alert{position:fixed;z-index:10000;top:0;bottom:0;left:0;right:0;background:rgba(0, 0, 0, 0.5);display:-ms-flexbox;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-ms-flex-pack:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.alert .alertBox{width:75%;height:auto;background:#fff;border-radius:2px}.alert .alertBox .textLimit{font-size:12px;-webkit-text-align:justify;text-align:justify;margin-bottom:20px}.alert .alertBox .textLimit1{margin-bottom:0px;font-size:12px;-webkit-text-align:justify;text-align:justify}.alert .alertBox .title{color:#1E88E5;font-size:16px;padding:0px 8px 0px 16px}.alert .alertBox .colse{float:right;margin:10px 10px 0 0;color:#bdbdbd}.alert .alertBox .topName{border-bottom:1px solid #f5f5f5;padding-bottom:16px;margin-top:16px}.alert .alertBox div span{color:#BDBDBD;font-size:12px}.alert .alertBox p{font-size:14px;color:#424242;-webkit-text-align:justify;text-align:justify;margin-top:10px;padding:0 16px 0 16px;line-height:20px}.alert .alertBox p b{color:#ffa726;margin:0 2px}.alert .alertBox p .basicsText{color:#424242;border:none;line-height:20px;margin-top:10px}.alert .alertBox p .freeText{border:none;line-height:20px;color:#424242}.alert .alertBox p .majorText{border:none;color:#424242;line-height:20px;margin-top:10px}.alert .alertBox .butOne{background-color:#3297fa;color:#ffffff;width:80px;font-size:14px;padding:5px 0;margin-bottom:16px;border-radius:4px;-webkit-text-align:center;text-align:center;float:right;margin-right:16px;margin-top:30px}.alert .alertBox .butTwo{padding:0;font-size:14px;float:right;margin-right:10px;margin-top:30px;margin-bottom:6px}.alert .alertBox .butTwo .but1{background-color:#3297fa;color:#ffffff;width:80px;font-size:14px;display:inline-block;padding:5px 0;margin-bottom:10px;border-radius:4px;-webkit-text-align:center;text-align:center;margin-right:10px}.alert .alertBox .butTwo .but2{color:#bdbdbd;width:100px;font-size:14px;padding:5px 0;display:inline-block;margin-bottom:10px;border-radius:4px;-webkit-text-align:center;text-align:center}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0eWxlc1xcY29tcG9uZW50c1xcYWxlcnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxBQUVrQixBQUNILEFBQ08sQUFDRyxBQUNKLEFBQ0YsQUFDb0IsQUFDbEIsQUFDQyxBQUNDLEFBQ0EsQUFDRixBQUNBLEFBQ1csQUFDZixBQUNpQixBQUNYLFdBZlMsQUFhTyxFQVRRLEFBTUEsQUFDSCxFQVJELEFBR0EsQUFFRSxBQUNELEFBTUEsQ0FoQlQsQUFFYSxBQU1MLEdBTEksS0FGTSxFQVlBLEFBRUksQ0FEQyxDQUpZLEFBRUEsQUFJRixDQVB0QixFQVRGLEFBSStCLEFBRy9CLEFBQ3lCLEFBR0MsRUFMSixFQUhPLEFBRUwsR0FMWixFQWMyQixDQWJQLEFBWUwsQUFFTSxHQUNjLEVBTkksQUFDeEIsQUFDd0IsRUFaN0IsRUFLRyxHQVF3QixBQUVRLENBVFosRUFOWixDQUlELEVBVThCLEFBRWUsQ0FmNUMsR0FTbUIsQUFFQSxDQVZ0QixDQUZvQyxJQWFJLEFBRWlCLEVBVHpDLEtBUXlDLEdBTnZDLEVBUXlELEVBYjNFLENBREMsQUFXaUUsT0FFYyxJQUR0QixDQWRDLEFBUVosS0FRdUQsR0FIWCxFQUVpQixXQWZqQyxFQVFKLENBUTBELEdBSGIsR0FFbUIsV0FQL0QsUUFPMEYscUJBQ2hDLEdBSEssYUFBeUIsU0FFNkIsSUFmMUYsTUFhb0YsU0FFTyxPQWY3RCxDQWF1RCxzR0FiOUIsdUJBQTBCLGlHQUFDIiwiZmlsZSI6InN0eWxlc1xcY29tcG9uZW50c1xcYWxlcnQuc2NzcyIsInNvdXJjZVJvb3QiOiJEOi93b3JrL3Bob25lLW5ldyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gXCIuYWxlcnQge1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgei1pbmRleDogMTAwMDA7XFxuICB0b3A6IDA7XFxuICBib3R0b206IDA7XFxuICBsZWZ0OiAwO1xcbiAgcmlnaHQ6IDA7XFxuICBiYWNrZ3JvdW5kOiByZ2JhKDAsIDAsIDAsIDAuNSk7XFxuICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICAtbXMtZmxleC1wYWNrOiBjZW50ZXI7XFxuICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAtbXMtZmxleC1hbGlnbjogY2VudGVyO1xcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7IH1cXG4gIC5hbGVydCAuYWxlcnRCb3gge1xcbiAgICB3aWR0aDogNzUlO1xcbiAgICBoZWlnaHQ6IGF1dG87XFxuICAgIGJhY2tncm91bmQ6ICNmZmY7XFxuICAgIGJvcmRlci1yYWRpdXM6IDJweDsgfVxcbiAgLmFsZXJ0IC5hbGVydEJveCAudGV4dExpbWl0IHtcXG4gICAgICBmb250LXNpemU6IDEycHg7XFxuICAgICAgdGV4dC1hbGlnbjoganVzdGlmeTtcXG4gICAgICBtYXJnaW4tYm90dG9tOiAyMHB4OyB9XFxuICAuYWxlcnQgLmFsZXJ0Qm94IC50ZXh0TGltaXQxIHtcXG4gICAgICBtYXJnaW4tYm90dG9tOiAwcHg7XFxuICAgICAgZm9udC1zaXplOiAxMnB4O1xcbiAgICAgIHRleHQtYWxpZ246IGp1c3RpZnk7IH1cXG4gIC5hbGVydCAuYWxlcnRCb3ggLnRpdGxlIHtcXG4gICAgICBjb2xvcjogIzFFODhFNTtcXG4gICAgICBmb250LXNpemU6IDE2cHg7XFxuICAgICAgcGFkZGluZzogMHB4IDhweCAwcHggMTZweDsgfVxcbiAgLmFsZXJ0IC5hbGVydEJveCAuY29sc2Uge1xcbiAgICAgIGZsb2F0OiByaWdodDtcXG4gICAgICBtYXJnaW46IDEwcHggMTBweCAwIDA7XFxuICAgICAgY29sb3I6ICNiZGJkYmQ7IH1cXG4gIC5hbGVydCAuYWxlcnRCb3ggLnRvcE5hbWUge1xcbiAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZjVmNWY1O1xcbiAgICAgIHBhZGRpbmctYm90dG9tOiAxNnB4O1xcbiAgICAgIG1hcmdpbi10b3A6IDE2cHg7IH1cXG4gIC5hbGVydCAuYWxlcnRCb3ggZGl2IHNwYW4ge1xcbiAgICAgIGNvbG9yOiAjQkRCREJEO1xcbiAgICAgIGZvbnQtc2l6ZTogMTJweDsgfVxcbiAgLmFsZXJ0IC5hbGVydEJveCBwIHtcXG4gICAgICBmb250LXNpemU6IDE0cHg7XFxuICAgICAgY29sb3I6ICM0MjQyNDI7XFxuICAgICAgdGV4dC1hbGlnbjoganVzdGlmeTtcXG4gICAgICBtYXJnaW4tdG9wOiAxMHB4O1xcbiAgICAgIHBhZGRpbmc6IDAgMTZweCAwIDE2cHg7XFxuICAgICAgbGluZS1oZWlnaHQ6IDIwcHg7IH1cXG4gIC5hbGVydCAuYWxlcnRCb3ggcCBiIHtcXG4gICAgICAgIGNvbG9yOiAjZmZhNzI2O1xcbiAgICAgICAgbWFyZ2luOiAwIDJweDsgfVxcbiAgLmFsZXJ0IC5hbGVydEJveCBwIC5iYXNpY3NUZXh0IHtcXG4gICAgICAgIGNvbG9yOiAjNDI0MjQyO1xcbiAgICAgICAgYm9yZGVyOiBub25lO1xcbiAgICAgICAgbGluZS1oZWlnaHQ6IDIwcHg7XFxuICAgICAgICBtYXJnaW4tdG9wOiAxMHB4OyB9XFxuICAuYWxlcnQgLmFsZXJ0Qm94IHAgLmZyZWVUZXh0IHtcXG4gICAgICAgIGJvcmRlcjogbm9uZTtcXG4gICAgICAgIGxpbmUtaGVpZ2h0OiAyMHB4O1xcbiAgICAgICAgY29sb3I6ICM0MjQyNDI7IH1cXG4gIC5hbGVydCAuYWxlcnRCb3ggcCAubWFqb3JUZXh0IHtcXG4gICAgICAgIGJvcmRlcjogbm9uZTtcXG4gICAgICAgIGNvbG9yOiAjNDI0MjQyO1xcbiAgICAgICAgbGluZS1oZWlnaHQ6IDIwcHg7XFxuICAgICAgICBtYXJnaW4tdG9wOiAxMHB4OyB9XFxuICAuYWxlcnQgLmFsZXJ0Qm94IC5idXRPbmUge1xcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICMzMjk3ZmE7XFxuICAgICAgY29sb3I6ICNmZmZmZmY7XFxuICAgICAgd2lkdGg6IDgwcHg7XFxuICAgICAgZm9udC1zaXplOiAxNHB4O1xcbiAgICAgIHBhZGRpbmc6IDVweCAwO1xcbiAgICAgIG1hcmdpbi1ib3R0b206IDE2cHg7XFxuICAgICAgYm9yZGVyLXJhZGl1czogNHB4O1xcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgICBmbG9hdDogcmlnaHQ7XFxuICAgICAgbWFyZ2luLXJpZ2h0OiAxNnB4O1xcbiAgICAgIG1hcmdpbi10b3A6IDMwcHg7IH1cXG4gIC5hbGVydCAuYWxlcnRCb3ggLmJ1dFR3byB7XFxuICAgICAgcGFkZGluZzogMDtcXG4gICAgICBmb250LXNpemU6IDE0cHg7XFxuICAgICAgZmxvYXQ6IHJpZ2h0O1xcbiAgICAgIG1hcmdpbi1yaWdodDogMTBweDtcXG4gICAgICBtYXJnaW4tdG9wOiAzMHB4O1xcbiAgICAgIG1hcmdpbi1ib3R0b206IDZweDsgfVxcbiAgLmFsZXJ0IC5hbGVydEJveCAuYnV0VHdvIC5idXQxIHtcXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICMzMjk3ZmE7XFxuICAgICAgICBjb2xvcjogI2ZmZmZmZjtcXG4gICAgICAgIHdpZHRoOiA4MHB4O1xcbiAgICAgICAgZm9udC1zaXplOiAxNHB4O1xcbiAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgICAgICAgcGFkZGluZzogNXB4IDA7XFxuICAgICAgICBtYXJnaW4tYm90dG9tOiAxMHB4O1xcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNHB4O1xcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICAgICAgbWFyZ2luLXJpZ2h0OiAxMHB4OyB9XFxuICAuYWxlcnQgLmFsZXJ0Qm94IC5idXRUd28gLmJ1dDIge1xcbiAgICAgICAgY29sb3I6ICNiZGJkYmQ7XFxuICAgICAgICB3aWR0aDogMTAwcHg7XFxuICAgICAgICBmb250LXNpemU6IDE0cHg7XFxuICAgICAgICBwYWRkaW5nOiA1cHggMDtcXG4gICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gICAgICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XFxuICAgICAgICBib3JkZXItcmFkaXVzOiA0cHg7XFxuICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7IH1cXG5cIiJdfQ== */\n/*@ sourceURL=styles\\components\\alert.scss */");

  __styledJsxDefaultExport.__hash = "11834834809";
  __styledJsxDefaultExport.__scoped = ".alert[data-jsx-ext~=\"21834834809\"]{position:fixed;z-index:10000;top:0;bottom:0;left:0;right:0;background:rgba(0, 0, 0, 0.5);display:-ms-flexbox;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-ms-flex-pack:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.alert[data-jsx-ext~=\"21834834809\"] .alertBox[data-jsx-ext~=\"21834834809\"]{width:75%;height:auto;background:#fff;border-radius:2px}.alert[data-jsx-ext~=\"21834834809\"] .alertBox[data-jsx-ext~=\"21834834809\"] .textLimit[data-jsx-ext~=\"21834834809\"]{font-size:12px;-webkit-text-align:justify;text-align:justify;margin-bottom:20px}.alert[data-jsx-ext~=\"21834834809\"] .alertBox[data-jsx-ext~=\"21834834809\"] .textLimit1[data-jsx-ext~=\"21834834809\"]{margin-bottom:0px;font-size:12px;-webkit-text-align:justify;text-align:justify}.alert[data-jsx-ext~=\"21834834809\"] .alertBox[data-jsx-ext~=\"21834834809\"] .title[data-jsx-ext~=\"21834834809\"]{color:#1E88E5;font-size:16px;padding:0px 8px 0px 16px}.alert[data-jsx-ext~=\"21834834809\"] .alertBox[data-jsx-ext~=\"21834834809\"] .colse[data-jsx-ext~=\"21834834809\"]{float:right;margin:10px 10px 0 0;color:#bdbdbd}.alert[data-jsx-ext~=\"21834834809\"] .alertBox[data-jsx-ext~=\"21834834809\"] .topName[data-jsx-ext~=\"21834834809\"]{border-bottom:1px solid #f5f5f5;padding-bottom:16px;margin-top:16px}.alert[data-jsx-ext~=\"21834834809\"] .alertBox[data-jsx-ext~=\"21834834809\"] div[data-jsx-ext~=\"21834834809\"] span[data-jsx-ext~=\"21834834809\"]{color:#BDBDBD;font-size:12px}.alert[data-jsx-ext~=\"21834834809\"] .alertBox[data-jsx-ext~=\"21834834809\"] p[data-jsx-ext~=\"21834834809\"]{font-size:14px;color:#424242;-webkit-text-align:justify;text-align:justify;margin-top:10px;padding:0 16px 0 16px;line-height:20px}.alert[data-jsx-ext~=\"21834834809\"] .alertBox[data-jsx-ext~=\"21834834809\"] p[data-jsx-ext~=\"21834834809\"] b[data-jsx-ext~=\"21834834809\"]{color:#ffa726;margin:0 2px}.alert[data-jsx-ext~=\"21834834809\"] .alertBox[data-jsx-ext~=\"21834834809\"] p[data-jsx-ext~=\"21834834809\"] .basicsText[data-jsx-ext~=\"21834834809\"]{color:#424242;border:none;line-height:20px;margin-top:10px}.alert[data-jsx-ext~=\"21834834809\"] .alertBox[data-jsx-ext~=\"21834834809\"] p[data-jsx-ext~=\"21834834809\"] .freeText[data-jsx-ext~=\"21834834809\"]{border:none;line-height:20px;color:#424242}.alert[data-jsx-ext~=\"21834834809\"] .alertBox[data-jsx-ext~=\"21834834809\"] p[data-jsx-ext~=\"21834834809\"] .majorText[data-jsx-ext~=\"21834834809\"]{border:none;color:#424242;line-height:20px;margin-top:10px}.alert[data-jsx-ext~=\"21834834809\"] .alertBox[data-jsx-ext~=\"21834834809\"] .butOne[data-jsx-ext~=\"21834834809\"]{background-color:#3297fa;color:#ffffff;width:80px;font-size:14px;padding:5px 0;margin-bottom:16px;border-radius:4px;-webkit-text-align:center;text-align:center;float:right;margin-right:16px;margin-top:30px}.alert[data-jsx-ext~=\"21834834809\"] .alertBox[data-jsx-ext~=\"21834834809\"] .butTwo[data-jsx-ext~=\"21834834809\"]{padding:0;font-size:14px;float:right;margin-right:10px;margin-top:30px;margin-bottom:6px}.alert[data-jsx-ext~=\"21834834809\"] .alertBox[data-jsx-ext~=\"21834834809\"] .butTwo[data-jsx-ext~=\"21834834809\"] .but1[data-jsx-ext~=\"21834834809\"]{background-color:#3297fa;color:#ffffff;width:80px;font-size:14px;display:inline-block;padding:5px 0;margin-bottom:10px;border-radius:4px;-webkit-text-align:center;text-align:center;margin-right:10px}.alert[data-jsx-ext~=\"21834834809\"] .alertBox[data-jsx-ext~=\"21834834809\"] .butTwo[data-jsx-ext~=\"21834834809\"] .but2[data-jsx-ext~=\"21834834809\"]{color:#bdbdbd;width:100px;font-size:14px;padding:5px 0;display:inline-block;margin-bottom:10px;border-radius:4px;-webkit-text-align:center;text-align:center}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0eWxlc1xcY29tcG9uZW50c1xcYWxlcnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxBQUVrQixBQUNILEFBQ08sQUFDRyxBQUNKLEFBQ0YsQUFDb0IsQUFDbEIsQUFDQyxBQUNDLEFBQ0EsQUFDRixBQUNBLEFBQ1csQUFDZixBQUNpQixBQUNYLFdBZlMsQUFhTyxFQVRRLEFBTUEsQUFDSCxFQVJELEFBR0EsQUFFRSxBQUNELEFBTUEsQ0FoQlQsQUFFYSxBQU1MLEdBTEksS0FGTSxFQVlBLEFBRUksQ0FEQyxDQUpZLEFBRUEsQUFJRixDQVB0QixFQVRGLEFBSStCLEFBRy9CLEFBQ3lCLEFBR0MsRUFMSixFQUhPLEFBRUwsR0FMWixFQWMyQixDQWJQLEFBWUwsQUFFTSxHQUNjLEVBTkksQUFDeEIsQUFDd0IsRUFaN0IsRUFLRyxHQVF3QixBQUVRLENBVFosRUFOWixDQUlELEVBVThCLEFBRWUsQ0FmNUMsR0FTbUIsQUFFQSxDQVZ0QixDQUZvQyxJQWFJLEFBRWlCLEVBVHpDLEtBUXlDLEdBTnZDLEVBUXlELEVBYjNFLENBREMsQUFXaUUsT0FFYyxJQUR0QixDQWRDLEFBUVosS0FRdUQsR0FIWCxFQUVpQixXQWZqQyxFQVFKLENBUTBELEdBSGIsR0FFbUIsV0FQL0QsUUFPMEYscUJBQ2hDLEdBSEssYUFBeUIsU0FFNkIsSUFmMUYsTUFhb0YsU0FFTyxPQWY3RCxDQWF1RCxzR0FiOUIsdUJBQTBCLGlHQUFDIiwiZmlsZSI6InN0eWxlc1xcY29tcG9uZW50c1xcYWxlcnQuc2NzcyIsInNvdXJjZVJvb3QiOiJEOi93b3JrL3Bob25lLW5ldyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gXCIuYWxlcnQge1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgei1pbmRleDogMTAwMDA7XFxuICB0b3A6IDA7XFxuICBib3R0b206IDA7XFxuICBsZWZ0OiAwO1xcbiAgcmlnaHQ6IDA7XFxuICBiYWNrZ3JvdW5kOiByZ2JhKDAsIDAsIDAsIDAuNSk7XFxuICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICAtbXMtZmxleC1wYWNrOiBjZW50ZXI7XFxuICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAtbXMtZmxleC1hbGlnbjogY2VudGVyO1xcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7IH1cXG4gIC5hbGVydCAuYWxlcnRCb3gge1xcbiAgICB3aWR0aDogNzUlO1xcbiAgICBoZWlnaHQ6IGF1dG87XFxuICAgIGJhY2tncm91bmQ6ICNmZmY7XFxuICAgIGJvcmRlci1yYWRpdXM6IDJweDsgfVxcbiAgLmFsZXJ0IC5hbGVydEJveCAudGV4dExpbWl0IHtcXG4gICAgICBmb250LXNpemU6IDEycHg7XFxuICAgICAgdGV4dC1hbGlnbjoganVzdGlmeTtcXG4gICAgICBtYXJnaW4tYm90dG9tOiAyMHB4OyB9XFxuICAuYWxlcnQgLmFsZXJ0Qm94IC50ZXh0TGltaXQxIHtcXG4gICAgICBtYXJnaW4tYm90dG9tOiAwcHg7XFxuICAgICAgZm9udC1zaXplOiAxMnB4O1xcbiAgICAgIHRleHQtYWxpZ246IGp1c3RpZnk7IH1cXG4gIC5hbGVydCAuYWxlcnRCb3ggLnRpdGxlIHtcXG4gICAgICBjb2xvcjogIzFFODhFNTtcXG4gICAgICBmb250LXNpemU6IDE2cHg7XFxuICAgICAgcGFkZGluZzogMHB4IDhweCAwcHggMTZweDsgfVxcbiAgLmFsZXJ0IC5hbGVydEJveCAuY29sc2Uge1xcbiAgICAgIGZsb2F0OiByaWdodDtcXG4gICAgICBtYXJnaW46IDEwcHggMTBweCAwIDA7XFxuICAgICAgY29sb3I6ICNiZGJkYmQ7IH1cXG4gIC5hbGVydCAuYWxlcnRCb3ggLnRvcE5hbWUge1xcbiAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZjVmNWY1O1xcbiAgICAgIHBhZGRpbmctYm90dG9tOiAxNnB4O1xcbiAgICAgIG1hcmdpbi10b3A6IDE2cHg7IH1cXG4gIC5hbGVydCAuYWxlcnRCb3ggZGl2IHNwYW4ge1xcbiAgICAgIGNvbG9yOiAjQkRCREJEO1xcbiAgICAgIGZvbnQtc2l6ZTogMTJweDsgfVxcbiAgLmFsZXJ0IC5hbGVydEJveCBwIHtcXG4gICAgICBmb250LXNpemU6IDE0cHg7XFxuICAgICAgY29sb3I6ICM0MjQyNDI7XFxuICAgICAgdGV4dC1hbGlnbjoganVzdGlmeTtcXG4gICAgICBtYXJnaW4tdG9wOiAxMHB4O1xcbiAgICAgIHBhZGRpbmc6IDAgMTZweCAwIDE2cHg7XFxuICAgICAgbGluZS1oZWlnaHQ6IDIwcHg7IH1cXG4gIC5hbGVydCAuYWxlcnRCb3ggcCBiIHtcXG4gICAgICAgIGNvbG9yOiAjZmZhNzI2O1xcbiAgICAgICAgbWFyZ2luOiAwIDJweDsgfVxcbiAgLmFsZXJ0IC5hbGVydEJveCBwIC5iYXNpY3NUZXh0IHtcXG4gICAgICAgIGNvbG9yOiAjNDI0MjQyO1xcbiAgICAgICAgYm9yZGVyOiBub25lO1xcbiAgICAgICAgbGluZS1oZWlnaHQ6IDIwcHg7XFxuICAgICAgICBtYXJnaW4tdG9wOiAxMHB4OyB9XFxuICAuYWxlcnQgLmFsZXJ0Qm94IHAgLmZyZWVUZXh0IHtcXG4gICAgICAgIGJvcmRlcjogbm9uZTtcXG4gICAgICAgIGxpbmUtaGVpZ2h0OiAyMHB4O1xcbiAgICAgICAgY29sb3I6ICM0MjQyNDI7IH1cXG4gIC5hbGVydCAuYWxlcnRCb3ggcCAubWFqb3JUZXh0IHtcXG4gICAgICAgIGJvcmRlcjogbm9uZTtcXG4gICAgICAgIGNvbG9yOiAjNDI0MjQyO1xcbiAgICAgICAgbGluZS1oZWlnaHQ6IDIwcHg7XFxuICAgICAgICBtYXJnaW4tdG9wOiAxMHB4OyB9XFxuICAuYWxlcnQgLmFsZXJ0Qm94IC5idXRPbmUge1xcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICMzMjk3ZmE7XFxuICAgICAgY29sb3I6ICNmZmZmZmY7XFxuICAgICAgd2lkdGg6IDgwcHg7XFxuICAgICAgZm9udC1zaXplOiAxNHB4O1xcbiAgICAgIHBhZGRpbmc6IDVweCAwO1xcbiAgICAgIG1hcmdpbi1ib3R0b206IDE2cHg7XFxuICAgICAgYm9yZGVyLXJhZGl1czogNHB4O1xcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgICBmbG9hdDogcmlnaHQ7XFxuICAgICAgbWFyZ2luLXJpZ2h0OiAxNnB4O1xcbiAgICAgIG1hcmdpbi10b3A6IDMwcHg7IH1cXG4gIC5hbGVydCAuYWxlcnRCb3ggLmJ1dFR3byB7XFxuICAgICAgcGFkZGluZzogMDtcXG4gICAgICBmb250LXNpemU6IDE0cHg7XFxuICAgICAgZmxvYXQ6IHJpZ2h0O1xcbiAgICAgIG1hcmdpbi1yaWdodDogMTBweDtcXG4gICAgICBtYXJnaW4tdG9wOiAzMHB4O1xcbiAgICAgIG1hcmdpbi1ib3R0b206IDZweDsgfVxcbiAgLmFsZXJ0IC5hbGVydEJveCAuYnV0VHdvIC5idXQxIHtcXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICMzMjk3ZmE7XFxuICAgICAgICBjb2xvcjogI2ZmZmZmZjtcXG4gICAgICAgIHdpZHRoOiA4MHB4O1xcbiAgICAgICAgZm9udC1zaXplOiAxNHB4O1xcbiAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgICAgICAgcGFkZGluZzogNXB4IDA7XFxuICAgICAgICBtYXJnaW4tYm90dG9tOiAxMHB4O1xcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNHB4O1xcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICAgICAgbWFyZ2luLXJpZ2h0OiAxMHB4OyB9XFxuICAuYWxlcnQgLmFsZXJ0Qm94IC5idXRUd28gLmJ1dDIge1xcbiAgICAgICAgY29sb3I6ICNiZGJkYmQ7XFxuICAgICAgICB3aWR0aDogMTAwcHg7XFxuICAgICAgICBmb250LXNpemU6IDE0cHg7XFxuICAgICAgICBwYWRkaW5nOiA1cHggMDtcXG4gICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gICAgICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XFxuICAgICAgICBib3JkZXItcmFkaXVzOiA0cHg7XFxuICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7IH1cXG5cIiJdfQ== */\n/*@ sourceURL=styles\\components\\alert.scss */";
  __styledJsxDefaultExport.__scopedHash = "21834834809";
  module.exports = __styledJsxDefaultExport;
})();

/***/ }),

/***/ 627:
/***/ (function(module, exports) {

;

(function () {
  "use strict";

  var __styledJsxDefaultExport = new String(".load_loading{width:100%;height:100%;min-height:50px;display:-ms-flexbox;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-ms-flex-pack:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;position:absolute;z-index:1000;background:rgba(255, 255, 255, 0)}.load_loading .ant-spin{font-family:Monospaced Number,Chinese Quote,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif;font-size:14px;line-height:1.5;color:rgba(0, 0, 0, 0.65);box-sizing:border-box;margin:0;padding:0;list-style:none;color:#1890ff;vertical-align:middle;-webkit-text-align:center;text-align:center;opacity:0;position:absolute;-webkit-transition:-webkit-transform 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);-webkit-transition:transform 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);transition:transform 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);display:none}.load_loading .ant-spin-spinning{opacity:1;position:static;display:inline-block}.load_loading .ant-spin-dot{position:relative;display:inline-block;width:30px;height:30px}.load_loading .ant-spin-dot i{width:14px;height:14px;border-radius:100%;background-color:#1890ff;-webkit-transform:scale(0.75);-ms-transform:scale(0.75);transform:scale(0.75);display:block;position:absolute;opacity:.8;-webkit-animation:antSpinMove 1s infinite linear alternate;animation:antSpinMove 1s infinite linear alternate;-webkit-transform-origin:50% 50%;-ms-transform-origin:50% 50%;transform-origin:50% 50%}.load_loading .ant-spin-dot i:first-child{left:0;top:0}.load_loading .ant-spin-dot i:nth-child(2){right:0;top:0;-webkit-animation-delay:.4s;animation-delay:.4s}.load_loading .ant-spin-dot i:nth-child(3){right:0;bottom:0;-webkit-animation-delay:.8s;animation-delay:.8s}.load_loading .ant-spin-dot i:nth-child(4){left:0;bottom:0;-webkit-animation-delay:1.2s;animation-delay:1.2s}@-webkit-keyframes antRotate{to{-webkit-transform:rotate(405deg);-ms-transform:rotate(405deg);transform:rotate(405deg)}}@keyframes antRotate{to{-webkit-transform:rotate(405deg);-ms-transform:rotate(405deg);transform:rotate(405deg)}}.load_loading .ant-spin-dot-spin{-webkit-transform:rotate(45deg);-ms-transform:rotate(45deg);transform:rotate(45deg);-webkit-animation:antRotate 1.2s infinite linear;animation:antRotate 1.2s infinite linear}.loading_minSize .ant-spin-dot{width:20px;height:20px}.loading_minSize .ant-spin-dot i{width:10px;height:10px}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0eWxlc1xcY29tcG9uZW50c1xcbG9hZGluZy5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLEFBRWMsQUFDMkssQUFDMUssQUFDUSxBQUNQLEFBQ0osQUFDQyxBQUNBLEFBQ0QsQUFFa0IsQUFDRCxBQUNmLEFBQ0EsUUFSUyxBQUdHLENBRkYsQUFDRyxFQUxTLENBRlAsQUFJSSxBQVFKLEFBQ0EsR0FSTCxDQUN5QixFQUVHLENBTEgsQUFJRyxNQVBKLEFBSVMsQUFRM0IsQUFDQSxHQVhnQyxhQUNHLENBSE0sR0FJZ0IsS0FGeEIsR0FDbUIsVUFISyxDQU1yQyxFQUhpQyxDQUk5QixDQUNBLEdBSjZELGdCQU92QyxHQUQ1QyxtREFWZ0YsV0FJc0IsV0FKUSxJQUllLFVBT2hGLElBVmlJLEtBR2pDLFdBSHNELENBR0UsZ0JBSDZCLDJCQUEyQix1QkFBYyxFQURwSSxRQUNtSixXQUFxQixJQUQ5SSxhQUNpSyxNQUcvRixTQUgwSCx1QkFBdUIsOENBRDlMLEFBQzZNLFdBQXVCLENBR3RMLE9BSjlCLFdBQ3dSLEdBRG5QLG1DQUFDLGlMQUNvUSxjQUFDIiwiZmlsZSI6InN0eWxlc1xcY29tcG9uZW50c1xcbG9hZGluZy5zY3NzIiwic291cmNlUm9vdCI6IkQ6L3dvcmsvcGhvbmUtbmV3Iiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSBcIi5sb2FkX2xvYWRpbmcge1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICBtaW4taGVpZ2h0OiA1MHB4O1xcbiAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgLW1zLWZsZXgtcGFjazogY2VudGVyO1xcbiAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgLW1zLWZsZXgtYWxpZ246IGNlbnRlcjtcXG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgei1pbmRleDogMTAwMDtcXG4gIGJhY2tncm91bmQ6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMCk7IH1cXG4gIC5sb2FkX2xvYWRpbmcgLmFudC1zcGluIHtcXG4gICAgZm9udC1mYW1pbHk6IE1vbm9zcGFjZWQgTnVtYmVyLENoaW5lc2UgUXVvdGUsLWFwcGxlLXN5c3RlbSxCbGlua01hY1N5c3RlbUZvbnQsU2Vnb2UgVUksUm9ib3RvLFBpbmdGYW5nIFNDLEhpcmFnaW5vIFNhbnMgR0IsTWljcm9zb2Z0IFlhSGVpLEhlbHZldGljYSBOZXVlLEhlbHZldGljYSxBcmlhbCxzYW5zLXNlcmlmO1xcbiAgICBmb250LXNpemU6IDE0cHg7XFxuICAgIGxpbmUtaGVpZ2h0OiAxLjU7XFxuICAgIGNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNjUpO1xcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgICBtYXJnaW46IDA7XFxuICAgIHBhZGRpbmc6IDA7XFxuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XFxuICAgIGNvbG9yOiAjMTg5MGZmO1xcbiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIG9wYWNpdHk6IDA7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuM3MgY3ViaWMtYmV6aWVyKDAuNzgsIDAuMTQsIDAuMTUsIDAuODYpO1xcbiAgICBkaXNwbGF5OiBub25lOyB9XFxuICAubG9hZF9sb2FkaW5nIC5hbnQtc3Bpbi1zcGlubmluZyB7XFxuICAgIG9wYWNpdHk6IDE7XFxuICAgIHBvc2l0aW9uOiBzdGF0aWM7XFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jazsgfVxcbiAgLmxvYWRfbG9hZGluZyAuYW50LXNwaW4tZG90IHtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICAgIHdpZHRoOiAzMHB4O1xcbiAgICBoZWlnaHQ6IDMwcHg7IH1cXG4gIC5sb2FkX2xvYWRpbmcgLmFudC1zcGluLWRvdCBpIHtcXG4gICAgd2lkdGg6IDE0cHg7XFxuICAgIGhlaWdodDogMTRweDtcXG4gICAgYm9yZGVyLXJhZGl1czogMTAwJTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzE4OTBmZjtcXG4gICAgdHJhbnNmb3JtOiBzY2FsZSgwLjc1KTtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgb3BhY2l0eTogLjg7XFxuICAgIGFuaW1hdGlvbjogYW50U3Bpbk1vdmUgMXMgaW5maW5pdGUgbGluZWFyIGFsdGVybmF0ZTtcXG4gICAgdHJhbnNmb3JtLW9yaWdpbjogNTAlIDUwJTsgfVxcbiAgLmxvYWRfbG9hZGluZyAuYW50LXNwaW4tZG90IGk6Zmlyc3QtY2hpbGQge1xcbiAgICBsZWZ0OiAwO1xcbiAgICB0b3A6IDA7IH1cXG4gIC5sb2FkX2xvYWRpbmcgLmFudC1zcGluLWRvdCBpOm50aC1jaGlsZCgyKSB7XFxuICAgIHJpZ2h0OiAwO1xcbiAgICB0b3A6IDA7XFxuICAgIGFuaW1hdGlvbi1kZWxheTogLjRzOyB9XFxuICAubG9hZF9sb2FkaW5nIC5hbnQtc3Bpbi1kb3QgaTpudGgtY2hpbGQoMykge1xcbiAgICByaWdodDogMDtcXG4gICAgYm90dG9tOiAwO1xcbiAgICBhbmltYXRpb24tZGVsYXk6IC44czsgfVxcbiAgLmxvYWRfbG9hZGluZyAuYW50LXNwaW4tZG90IGk6bnRoLWNoaWxkKDQpIHtcXG4gICAgbGVmdDogMDtcXG4gICAgYm90dG9tOiAwO1xcbiAgICBhbmltYXRpb24tZGVsYXk6IDEuMnM7IH1cXG4gIEBrZXlmcmFtZXMgYW50Um90YXRlIHtcXG4gIHRvIHtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoNDA1ZGVnKTsgfSB9XFxuICAubG9hZF9sb2FkaW5nIC5hbnQtc3Bpbi1kb3Qtc3BpbiB7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlKDQ1ZGVnKTtcXG4gICAgYW5pbWF0aW9uOiBhbnRSb3RhdGUgMS4ycyBpbmZpbml0ZSBsaW5lYXI7IH1cXG4gIC5sb2FkaW5nX21pblNpemUgLmFudC1zcGluLWRvdCB7XFxuICB3aWR0aDogMjBweDtcXG4gIGhlaWdodDogMjBweDsgfVxcbiAgLmxvYWRpbmdfbWluU2l6ZSAuYW50LXNwaW4tZG90IGkge1xcbiAgd2lkdGg6IDEwcHg7XFxuICBoZWlnaHQ6IDEwcHg7IH1cXG5cIiJdfQ== */\n/*@ sourceURL=styles\\components\\loading.scss */");

  __styledJsxDefaultExport.__hash = "12321587832";
  __styledJsxDefaultExport.__scoped = ".load_loading[data-jsx-ext~=\"22321587832\"]{width:100%;height:100%;min-height:50px;display:-ms-flexbox;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-ms-flex-pack:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;position:absolute;z-index:1000;background:rgba(255, 255, 255, 0)}.load_loading[data-jsx-ext~=\"22321587832\"] .ant-spin[data-jsx-ext~=\"22321587832\"]{font-family:Monospaced Number,Chinese Quote,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif;font-size:14px;line-height:1.5;color:rgba(0, 0, 0, 0.65);box-sizing:border-box;margin:0;padding:0;list-style:none;color:#1890ff;vertical-align:middle;-webkit-text-align:center;text-align:center;opacity:0;position:absolute;-webkit-transition:-webkit-transform 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);-webkit-transition:transform 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);transition:transform 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);display:none}.load_loading[data-jsx-ext~=\"22321587832\"] .ant-spin-spinning[data-jsx-ext~=\"22321587832\"]{opacity:1;position:static;display:inline-block}.load_loading[data-jsx-ext~=\"22321587832\"] .ant-spin-dot[data-jsx-ext~=\"22321587832\"]{position:relative;display:inline-block;width:30px;height:30px}.load_loading[data-jsx-ext~=\"22321587832\"] .ant-spin-dot[data-jsx-ext~=\"22321587832\"] i[data-jsx-ext~=\"22321587832\"]{width:14px;height:14px;border-radius:100%;background-color:#1890ff;-webkit-transform:scale(0.75);-ms-transform:scale(0.75);transform:scale(0.75);display:block;position:absolute;opacity:.8;-webkit-animation:antSpinMovedatajsxext22321587832 1s infinite linear alternate;animation:antSpinMovedatajsxext22321587832 1s infinite linear alternate;-webkit-transform-origin:50% 50%;-ms-transform-origin:50% 50%;transform-origin:50% 50%}.load_loading[data-jsx-ext~=\"22321587832\"] .ant-spin-dot[data-jsx-ext~=\"22321587832\"] i[data-jsx-ext~=\"22321587832\"]:first-child{left:0;top:0}.load_loading[data-jsx-ext~=\"22321587832\"] .ant-spin-dot[data-jsx-ext~=\"22321587832\"] i[data-jsx-ext~=\"22321587832\"]:nth-child(2){right:0;top:0;-webkit-animation-delay:.4s;animation-delay:.4s}.load_loading[data-jsx-ext~=\"22321587832\"] .ant-spin-dot[data-jsx-ext~=\"22321587832\"] i[data-jsx-ext~=\"22321587832\"]:nth-child(3){right:0;bottom:0;-webkit-animation-delay:.8s;animation-delay:.8s}.load_loading[data-jsx-ext~=\"22321587832\"] .ant-spin-dot[data-jsx-ext~=\"22321587832\"] i[data-jsx-ext~=\"22321587832\"]:nth-child(4){left:0;bottom:0;-webkit-animation-delay:1.2s;animation-delay:1.2s}@-webkit-keyframes antRotatedatajsxext22321587832{to{-webkit-transform:rotate(405deg);-ms-transform:rotate(405deg);transform:rotate(405deg)}}@keyframes antRotatedatajsxext22321587832{to{-webkit-transform:rotate(405deg);-ms-transform:rotate(405deg);transform:rotate(405deg)}}.load_loading[data-jsx-ext~=\"22321587832\"] .ant-spin-dot-spin[data-jsx-ext~=\"22321587832\"]{-webkit-transform:rotate(45deg);-ms-transform:rotate(45deg);transform:rotate(45deg);-webkit-animation:antRotatedatajsxext22321587832 1.2s infinite linear;animation:antRotatedatajsxext22321587832 1.2s infinite linear}.loading_minSize[data-jsx-ext~=\"22321587832\"] .ant-spin-dot[data-jsx-ext~=\"22321587832\"]{width:20px;height:20px}.loading_minSize[data-jsx-ext~=\"22321587832\"] .ant-spin-dot[data-jsx-ext~=\"22321587832\"] i[data-jsx-ext~=\"22321587832\"]{width:10px;height:10px}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0eWxlc1xcY29tcG9uZW50c1xcbG9hZGluZy5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLEFBRWMsQUFDMkssQUFDMUssQUFDUSxBQUNQLEFBQ0osQUFDQyxBQUNBLEFBQ0QsQUFFa0IsQUFDRCxBQUNmLEFBQ0EsUUFSUyxBQUdHLENBRkYsQUFDRyxFQUxTLENBRlAsQUFJSSxBQVFKLEFBQ0EsR0FSTCxDQUN5QixFQUVHLENBTEgsQUFJRyxNQVBKLEFBSVMsQUFRM0IsQUFDQSxHQVhnQyxhQUNHLENBSE0sR0FJZ0IsS0FGeEIsR0FDbUIsVUFISyxDQU1yQyxFQUhpQyxDQUk5QixDQUNBLEdBSjZELGdCQU92QyxHQUQ1QyxtREFWZ0YsV0FJc0IsV0FKUSxJQUllLFVBT2hGLElBVmlJLEtBR2pDLFdBSHNELENBR0UsZ0JBSDZCLEtBVXJMLHNCQVZnTix1QkFBYyxFQURwSSxRQUNtSixXQUFxQixJQUQ5SSxhQUNpSyxNQUcvRixTQUgwSCx1QkFBdUIsVUFHakosb0NBSjdDLEFBQzZNLFdBQXVCLENBR3RMLE9BSjlCLFdBQ3dSLEdBRG5QLHFCQUlQLGNBSlEsaUxBQ29RLGNBQUMiLCJmaWxlIjoic3R5bGVzXFxjb21wb25lbnRzXFxsb2FkaW5nLnNjc3MiLCJzb3VyY2VSb290IjoiRDovd29yay9waG9uZS1uZXciLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IFwiLmxvYWRfbG9hZGluZyB7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogMTAwJTtcXG4gIG1pbi1oZWlnaHQ6IDUwcHg7XFxuICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICAtbXMtZmxleC1wYWNrOiBjZW50ZXI7XFxuICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAtbXMtZmxleC1hbGlnbjogY2VudGVyO1xcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB6LWluZGV4OiAxMDAwO1xcbiAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwKTsgfVxcbiAgLmxvYWRfbG9hZGluZyAuYW50LXNwaW4ge1xcbiAgICBmb250LWZhbWlseTogTW9ub3NwYWNlZCBOdW1iZXIsQ2hpbmVzZSBRdW90ZSwtYXBwbGUtc3lzdGVtLEJsaW5rTWFjU3lzdGVtRm9udCxTZWdvZSBVSSxSb2JvdG8sUGluZ0ZhbmcgU0MsSGlyYWdpbm8gU2FucyBHQixNaWNyb3NvZnQgWWFIZWksSGVsdmV0aWNhIE5ldWUsSGVsdmV0aWNhLEFyaWFsLHNhbnMtc2VyaWY7XFxuICAgIGZvbnQtc2l6ZTogMTRweDtcXG4gICAgbGluZS1oZWlnaHQ6IDEuNTtcXG4gICAgY29sb3I6IHJnYmEoMCwgMCwgMCwgMC42NSk7XFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICAgIG1hcmdpbjogMDtcXG4gICAgcGFkZGluZzogMDtcXG4gICAgbGlzdC1zdHlsZTogbm9uZTtcXG4gICAgY29sb3I6ICMxODkwZmY7XFxuICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgb3BhY2l0eTogMDtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4zcyBjdWJpYy1iZXppZXIoMC43OCwgMC4xNCwgMC4xNSwgMC44Nik7XFxuICAgIGRpc3BsYXk6IG5vbmU7IH1cXG4gIC5sb2FkX2xvYWRpbmcgLmFudC1zcGluLXNwaW5uaW5nIHtcXG4gICAgb3BhY2l0eTogMTtcXG4gICAgcG9zaXRpb246IHN0YXRpYztcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrOyB9XFxuICAubG9hZF9sb2FkaW5nIC5hbnQtc3Bpbi1kb3Qge1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gICAgd2lkdGg6IDMwcHg7XFxuICAgIGhlaWdodDogMzBweDsgfVxcbiAgLmxvYWRfbG9hZGluZyAuYW50LXNwaW4tZG90IGkge1xcbiAgICB3aWR0aDogMTRweDtcXG4gICAgaGVpZ2h0OiAxNHB4O1xcbiAgICBib3JkZXItcmFkaXVzOiAxMDAlO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMTg5MGZmO1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDAuNzUpO1xcbiAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICBvcGFjaXR5OiAuODtcXG4gICAgYW5pbWF0aW9uOiBhbnRTcGluTW92ZSAxcyBpbmZpbml0ZSBsaW5lYXIgYWx0ZXJuYXRlO1xcbiAgICB0cmFuc2Zvcm0tb3JpZ2luOiA1MCUgNTAlOyB9XFxuICAubG9hZF9sb2FkaW5nIC5hbnQtc3Bpbi1kb3QgaTpmaXJzdC1jaGlsZCB7XFxuICAgIGxlZnQ6IDA7XFxuICAgIHRvcDogMDsgfVxcbiAgLmxvYWRfbG9hZGluZyAuYW50LXNwaW4tZG90IGk6bnRoLWNoaWxkKDIpIHtcXG4gICAgcmlnaHQ6IDA7XFxuICAgIHRvcDogMDtcXG4gICAgYW5pbWF0aW9uLWRlbGF5OiAuNHM7IH1cXG4gIC5sb2FkX2xvYWRpbmcgLmFudC1zcGluLWRvdCBpOm50aC1jaGlsZCgzKSB7XFxuICAgIHJpZ2h0OiAwO1xcbiAgICBib3R0b206IDA7XFxuICAgIGFuaW1hdGlvbi1kZWxheTogLjhzOyB9XFxuICAubG9hZF9sb2FkaW5nIC5hbnQtc3Bpbi1kb3QgaTpudGgtY2hpbGQoNCkge1xcbiAgICBsZWZ0OiAwO1xcbiAgICBib3R0b206IDA7XFxuICAgIGFuaW1hdGlvbi1kZWxheTogMS4yczsgfVxcbiAgQGtleWZyYW1lcyBhbnRSb3RhdGUge1xcbiAgdG8ge1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSg0MDVkZWcpOyB9IH1cXG4gIC5sb2FkX2xvYWRpbmcgLmFudC1zcGluLWRvdC1zcGluIHtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoNDVkZWcpO1xcbiAgICBhbmltYXRpb246IGFudFJvdGF0ZSAxLjJzIGluZmluaXRlIGxpbmVhcjsgfVxcbiAgLmxvYWRpbmdfbWluU2l6ZSAuYW50LXNwaW4tZG90IHtcXG4gIHdpZHRoOiAyMHB4O1xcbiAgaGVpZ2h0OiAyMHB4OyB9XFxuICAubG9hZGluZ19taW5TaXplIC5hbnQtc3Bpbi1kb3QgaSB7XFxuICB3aWR0aDogMTBweDtcXG4gIGhlaWdodDogMTBweDsgfVxcblwiIl19 */\n/*@ sourceURL=styles\\components\\loading.scss */";
  __styledJsxDefaultExport.__scopedHash = "22321587832";
  module.exports = __styledJsxDefaultExport;
})();

/***/ }),

/***/ 628:
/***/ (function(module, exports) {

;

(function () {
  "use strict";

  var __styledJsxDefaultExport = new String(".menuBar{width:100%;height:63px;display:-ms-flexbox;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-ms-flex-flow:row nowrap;-webkit-flex-flow:row nowrap;-ms-flex-flow:row nowrap;flex-flow:row nowrap}.menuBar .but{-ms-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;height:50px;background:#fff;margin:13px 0 0 0;display:-ms-flexbox;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-ms-flex-flow:column nowrap;-webkit-flex-flow:column nowrap;-ms-flex-flow:column nowrap;flex-flow:column nowrap;-ms-flex-pack:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;color:#cccccc}.menuBar .but svg{margin:0 0 4px 0;width:18px;height:18px;color:#cccccc;fill:#cccccc}.menuBar .but span{font-size:12px;line-height:12px}.menuBar .act{color:#1e88e5}.menuBar .act svg{margin:0 0 4px 0;width:18px;height:18px}.menuBar .cen{-ms-flex:0 0 65px;-webkit-flex:0 0 65px;-ms-flex:0 0 65px;flex:0 0 65px;position:relative}.menuBar .cenBut{background:#1296db;width:50px;height:50px;border-radius:50%;-ms-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;position:absolute;top:-3px;left:50%;margin-left:-25px;display:-ms-flexbox;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-ms-flex-pack:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.menuBar .cenBut svg{color:#fff;width:30px;height:30px;margin:0}.menuBar .addBox{position:fixed;z-index:1;top:0;left:0;right:0;bottom:0;background:rgba(255, 255, 255, 0.9);display:-ms-flexbox;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-ms-flex-pack:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-ms-flex-flow:column nowrap;-webkit-flex-flow:column nowrap;-ms-flex-flow:column nowrap;flex-flow:column nowrap}.menuBar .addBox .list{width:100%}.menuBar .addBox .list li{height:35px;-webkit-text-align:center;text-align:center;display:-ms-flexbox;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-ms-flex-pack:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;margin:0 0 30px 0}.menuBar .addBox .list li svg{width:35px;height:35px;color:#5fcbf8}.menuBar .addBox .list li span{color:#7b7b7b;font-size:16px;margin:5px 0 0 5px}.menuBar .addBox .cancel{margin:100px 0 0 0;color:#6dcef6}.menuBar .alert .alertBox p{-webkit-text-align:center;text-align:center}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0eWxlc1xcY29tcG9uZW50c1xcbWVudUJhci5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLEFBRWMsQUFDRSxBQUNRLEFBQ0YsQUFDSCxBQUNLLEFBQ0QsQUFDQyxBQUNOLEFBQ0UsQUFDRixBQUNHLEFBQ0MsQUFDRyxBQUNDLEFBQ0gsWUFmTSxBQUNHLEFBT0ksQUFFakIsQUFFMEIsQ0FERyxFQVA1QixBQVMrQixDQVZMLEFBTVgsRUFQTyxBQUdBLENBQ0ksQ0FDTixBQU9PLElBTlEsQ0FSSCxBQVlrQixFQUh4QixHQVBlLEFBR0EsQ0FRb0IsQ0FOeEIsRUFKVixBQU1XLENBS1YsRUFOdUIsR0FJQSxFQUhBLENBUFcsQUFHcEIsRUFFa0IsQ0FQWixBQWU1QyxDQVBnRCxDQVB2QixHQVFvQyxBQUlILE9BWG9CLENBU3pCLEVBVlAsQUFRd0QsR0FGOUIsUUFMTyxJQUlsQyxBQUMyQyxFQU5uQixFQVVNLGVBTDdCLEVBTGdELENBUWlDLGNBRmhCLE1BTkMsQ0FRaUMsS0FUekUsT0FPcUQsVUFBYyxTQVB2QyxDQU84RCxPQUl6RCxZQUprRixVQUk5QyxXQUpnRSxLQU41RCxDQVEwQixzQkFBZ0MsTUFSekIsR0FEN0UseUNBT2tJLGNBSTNELFFBSjJGLGVBSTNELE1BVkEsVUFRMEIsWUFSTSxXQVFzQixpREFGZ0MsU0FJM0QsY0FKdUYsS0FJdEYsZUFWK0IsS0FRNEIsa0JBUkEsV0FRaUMsMkNBRkwsMkNBTlQsQ0FRZSxjQVJkIiwiZmlsZSI6InN0eWxlc1xcY29tcG9uZW50c1xcbWVudUJhci5zY3NzIiwic291cmNlUm9vdCI6IkQ6L3dvcmsvcGhvbmUtbmV3Iiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSBcIi5tZW51QmFyIHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiA2M3B4O1xcbiAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgLW1zLWZsZXgtZmxvdzogcm93IG5vd3JhcDtcXG4gICAgICBmbGV4LWZsb3c6IHJvdyBub3dyYXA7IH1cXG4gIC5tZW51QmFyIC5idXQge1xcbiAgICAtbXMtZmxleDogMTtcXG4gICAgICAgIGZsZXg6IDE7XFxuICAgIGhlaWdodDogNTBweDtcXG4gICAgYmFja2dyb3VuZDogI2ZmZjtcXG4gICAgbWFyZ2luOiAxM3B4IDAgMCAwO1xcbiAgICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgLW1zLWZsZXgtZmxvdzogY29sdW1uIG5vd3JhcDtcXG4gICAgICAgIGZsZXgtZmxvdzogY29sdW1uIG5vd3JhcDtcXG4gICAgLW1zLWZsZXgtcGFjazogY2VudGVyO1xcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIC1tcy1mbGV4LWFsaWduOiBjZW50ZXI7XFxuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBjb2xvcjogI2NjY2NjYzsgfVxcbiAgLm1lbnVCYXIgLmJ1dCBzdmcge1xcbiAgICAgIG1hcmdpbjogMCAwIDRweCAwO1xcbiAgICAgIHdpZHRoOiAxOHB4O1xcbiAgICAgIGhlaWdodDogMThweDtcXG4gICAgICBjb2xvcjogI2NjY2NjYztcXG4gICAgICBmaWxsOiAjY2NjY2NjOyB9XFxuICAubWVudUJhciAuYnV0IHNwYW4ge1xcbiAgICAgIGZvbnQtc2l6ZTogMTJweDtcXG4gICAgICBsaW5lLWhlaWdodDogMTJweDsgfVxcbiAgLm1lbnVCYXIgLmFjdCB7XFxuICAgIGNvbG9yOiAjMWU4OGU1OyB9XFxuICAubWVudUJhciAuYWN0IHN2ZyB7XFxuICAgICAgbWFyZ2luOiAwIDAgNHB4IDA7XFxuICAgICAgd2lkdGg6IDE4cHg7XFxuICAgICAgaGVpZ2h0OiAxOHB4OyB9XFxuICAubWVudUJhciAuY2VuIHtcXG4gICAgLW1zLWZsZXg6IDAgMCA2NXB4O1xcbiAgICAgICAgZmxleDogMCAwIDY1cHg7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTsgfVxcbiAgLm1lbnVCYXIgLmNlbkJ1dCB7XFxuICAgIGJhY2tncm91bmQ6ICMxMjk2ZGI7XFxuICAgIHdpZHRoOiA1MHB4O1xcbiAgICBoZWlnaHQ6IDUwcHg7XFxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gICAgLW1zLWZsZXg6IDE7XFxuICAgICAgICBmbGV4OiAxO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogLTNweDtcXG4gICAgbGVmdDogNTAlO1xcbiAgICBtYXJnaW4tbGVmdDogLTI1cHg7XFxuICAgIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICAtbXMtZmxleC1wYWNrOiBjZW50ZXI7XFxuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgLW1zLWZsZXgtYWxpZ246IGNlbnRlcjtcXG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7IH1cXG4gIC5tZW51QmFyIC5jZW5CdXQgc3ZnIHtcXG4gICAgICBjb2xvcjogI2ZmZjtcXG4gICAgICB3aWR0aDogMzBweDtcXG4gICAgICBoZWlnaHQ6IDMwcHg7XFxuICAgICAgbWFyZ2luOiAwOyB9XFxuICAubWVudUJhciAuYWRkQm94IHtcXG4gICAgcG9zaXRpb246IGZpeGVkO1xcbiAgICB6LWluZGV4OiAxO1xcbiAgICB0b3A6IDA7XFxuICAgIGxlZnQ6IDA7XFxuICAgIHJpZ2h0OiAwO1xcbiAgICBib3R0b206IDA7XFxuICAgIGJhY2tncm91bmQ6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC45KTtcXG4gICAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIC1tcy1mbGV4LXBhY2s6IGNlbnRlcjtcXG4gICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICAtbXMtZmxleC1hbGlnbjogY2VudGVyO1xcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgLW1zLWZsZXgtZmxvdzogY29sdW1uIG5vd3JhcDtcXG4gICAgICAgIGZsZXgtZmxvdzogY29sdW1uIG5vd3JhcDsgfVxcbiAgLm1lbnVCYXIgLmFkZEJveCAubGlzdCB7XFxuICAgICAgd2lkdGg6IDEwMCU7IH1cXG4gIC5tZW51QmFyIC5hZGRCb3ggLmxpc3QgbGkge1xcbiAgICAgICAgaGVpZ2h0OiAzNXB4O1xcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICAgICAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICAgICAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICAgICAgLW1zLWZsZXgtcGFjazogY2VudGVyO1xcbiAgICAgICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICAgICAgLW1zLWZsZXgtYWxpZ246IGNlbnRlcjtcXG4gICAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICAgICAgbWFyZ2luOiAwIDAgMzBweCAwOyB9XFxuICAubWVudUJhciAuYWRkQm94IC5saXN0IGxpIHN2ZyB7XFxuICAgICAgICAgIHdpZHRoOiAzNXB4O1xcbiAgICAgICAgICBoZWlnaHQ6IDM1cHg7XFxuICAgICAgICAgIGNvbG9yOiAjNWZjYmY4OyB9XFxuICAubWVudUJhciAuYWRkQm94IC5saXN0IGxpIHNwYW4ge1xcbiAgICAgICAgICBjb2xvcjogIzdiN2I3YjtcXG4gICAgICAgICAgZm9udC1zaXplOiAxNnB4O1xcbiAgICAgICAgICBtYXJnaW46IDVweCAwIDAgNXB4OyB9XFxuICAubWVudUJhciAuYWRkQm94IC5jYW5jZWwge1xcbiAgICAgIG1hcmdpbjogMTAwcHggMCAwIDA7XFxuICAgICAgY29sb3I6ICM2ZGNlZjY7IH1cXG4gIC5tZW51QmFyIC5hbGVydCAuYWxlcnRCb3ggcCB7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjsgfVxcblwiIl19 */\n/*@ sourceURL=styles\\components\\menuBar.scss */");

  __styledJsxDefaultExport.__hash = "1882498895";
  __styledJsxDefaultExport.__scoped = ".menuBar[data-jsx-ext~=\"2882498895\"]{width:100%;height:63px;display:-ms-flexbox;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-ms-flex-flow:row nowrap;-webkit-flex-flow:row nowrap;-ms-flex-flow:row nowrap;flex-flow:row nowrap}.menuBar[data-jsx-ext~=\"2882498895\"] .but[data-jsx-ext~=\"2882498895\"]{-ms-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;height:50px;background:#fff;margin:13px 0 0 0;display:-ms-flexbox;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-ms-flex-flow:column nowrap;-webkit-flex-flow:column nowrap;-ms-flex-flow:column nowrap;flex-flow:column nowrap;-ms-flex-pack:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;color:#cccccc}.menuBar[data-jsx-ext~=\"2882498895\"] .but[data-jsx-ext~=\"2882498895\"] svg[data-jsx-ext~=\"2882498895\"]{margin:0 0 4px 0;width:18px;height:18px;color:#cccccc;fill:#cccccc}.menuBar[data-jsx-ext~=\"2882498895\"] .but[data-jsx-ext~=\"2882498895\"] span[data-jsx-ext~=\"2882498895\"]{font-size:12px;line-height:12px}.menuBar[data-jsx-ext~=\"2882498895\"] .act[data-jsx-ext~=\"2882498895\"]{color:#1e88e5}.menuBar[data-jsx-ext~=\"2882498895\"] .act[data-jsx-ext~=\"2882498895\"] svg[data-jsx-ext~=\"2882498895\"]{margin:0 0 4px 0;width:18px;height:18px}.menuBar[data-jsx-ext~=\"2882498895\"] .cen[data-jsx-ext~=\"2882498895\"]{-ms-flex:0 0 65px;-webkit-flex:0 0 65px;-ms-flex:0 0 65px;flex:0 0 65px;position:relative}.menuBar[data-jsx-ext~=\"2882498895\"] .cenBut[data-jsx-ext~=\"2882498895\"]{background:#1296db;width:50px;height:50px;border-radius:50%;-ms-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;position:absolute;top:-3px;left:50%;margin-left:-25px;display:-ms-flexbox;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-ms-flex-pack:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.menuBar[data-jsx-ext~=\"2882498895\"] .cenBut[data-jsx-ext~=\"2882498895\"] svg[data-jsx-ext~=\"2882498895\"]{color:#fff;width:30px;height:30px;margin:0}.menuBar[data-jsx-ext~=\"2882498895\"] .addBox[data-jsx-ext~=\"2882498895\"]{position:fixed;z-index:1;top:0;left:0;right:0;bottom:0;background:rgba(255, 255, 255, 0.9);display:-ms-flexbox;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-ms-flex-pack:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-ms-flex-flow:column nowrap;-webkit-flex-flow:column nowrap;-ms-flex-flow:column nowrap;flex-flow:column nowrap}.menuBar[data-jsx-ext~=\"2882498895\"] .addBox[data-jsx-ext~=\"2882498895\"] .list[data-jsx-ext~=\"2882498895\"]{width:100%}.menuBar[data-jsx-ext~=\"2882498895\"] .addBox[data-jsx-ext~=\"2882498895\"] .list[data-jsx-ext~=\"2882498895\"] li[data-jsx-ext~=\"2882498895\"]{height:35px;-webkit-text-align:center;text-align:center;display:-ms-flexbox;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-ms-flex-pack:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;margin:0 0 30px 0}.menuBar[data-jsx-ext~=\"2882498895\"] .addBox[data-jsx-ext~=\"2882498895\"] .list[data-jsx-ext~=\"2882498895\"] li[data-jsx-ext~=\"2882498895\"] svg[data-jsx-ext~=\"2882498895\"]{width:35px;height:35px;color:#5fcbf8}.menuBar[data-jsx-ext~=\"2882498895\"] .addBox[data-jsx-ext~=\"2882498895\"] .list[data-jsx-ext~=\"2882498895\"] li[data-jsx-ext~=\"2882498895\"] span[data-jsx-ext~=\"2882498895\"]{color:#7b7b7b;font-size:16px;margin:5px 0 0 5px}.menuBar[data-jsx-ext~=\"2882498895\"] .addBox[data-jsx-ext~=\"2882498895\"] .cancel[data-jsx-ext~=\"2882498895\"]{margin:100px 0 0 0;color:#6dcef6}.menuBar[data-jsx-ext~=\"2882498895\"] .alert[data-jsx-ext~=\"2882498895\"] .alertBox[data-jsx-ext~=\"2882498895\"] p[data-jsx-ext~=\"2882498895\"]{-webkit-text-align:center;text-align:center}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0eWxlc1xcY29tcG9uZW50c1xcbWVudUJhci5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLEFBRWMsQUFDRSxBQUNRLEFBQ0YsQUFDSCxBQUNLLEFBQ0QsQUFDQyxBQUNOLEFBQ0UsQUFDRixBQUNHLEFBQ0MsQUFDRyxBQUNDLEFBQ0gsWUFmTSxBQUNHLEFBT0ksQUFFakIsQUFFMEIsQ0FERyxFQVA1QixBQVMrQixDQVZMLEFBTVgsRUFQTyxBQUdBLENBQ0ksQ0FDTixBQU9PLElBTlEsQ0FSSCxBQVlrQixFQUh4QixHQVBlLEFBR0EsQ0FRb0IsQ0FOeEIsRUFKVixBQU1XLENBS1YsRUFOdUIsR0FJQSxFQUhBLENBUFcsQUFHcEIsRUFFa0IsQ0FQWixBQWU1QyxDQVBnRCxDQVB2QixHQVFvQyxBQUlILE9BWG9CLENBU3pCLEVBVlAsQUFRd0QsR0FGOUIsUUFMTyxJQUlsQyxBQUMyQyxFQU5uQixFQVVNLGVBTDdCLEVBTGdELENBUWlDLGNBRmhCLE1BTkMsQ0FRaUMsS0FUekUsT0FPcUQsVUFBYyxTQVB2QyxDQU84RCxPQUl6RCxZQUprRixVQUk5QyxXQUpnRSxLQU41RCxDQVEwQixzQkFBZ0MsTUFSekIsR0FEN0UseUNBT2tJLGNBSTNELFFBSjJGLGVBSTNELE1BVkEsVUFRMEIsWUFSTSxXQVFzQixpREFGZ0MsU0FJM0QsY0FKdUYsS0FJdEYsZUFWK0IsS0FRNEIsa0JBUkEsV0FRaUMsMkNBRkwsMkNBTlQsQ0FRZSxjQVJkIiwiZmlsZSI6InN0eWxlc1xcY29tcG9uZW50c1xcbWVudUJhci5zY3NzIiwic291cmNlUm9vdCI6IkQ6L3dvcmsvcGhvbmUtbmV3Iiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSBcIi5tZW51QmFyIHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiA2M3B4O1xcbiAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgLW1zLWZsZXgtZmxvdzogcm93IG5vd3JhcDtcXG4gICAgICBmbGV4LWZsb3c6IHJvdyBub3dyYXA7IH1cXG4gIC5tZW51QmFyIC5idXQge1xcbiAgICAtbXMtZmxleDogMTtcXG4gICAgICAgIGZsZXg6IDE7XFxuICAgIGhlaWdodDogNTBweDtcXG4gICAgYmFja2dyb3VuZDogI2ZmZjtcXG4gICAgbWFyZ2luOiAxM3B4IDAgMCAwO1xcbiAgICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgLW1zLWZsZXgtZmxvdzogY29sdW1uIG5vd3JhcDtcXG4gICAgICAgIGZsZXgtZmxvdzogY29sdW1uIG5vd3JhcDtcXG4gICAgLW1zLWZsZXgtcGFjazogY2VudGVyO1xcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIC1tcy1mbGV4LWFsaWduOiBjZW50ZXI7XFxuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBjb2xvcjogI2NjY2NjYzsgfVxcbiAgLm1lbnVCYXIgLmJ1dCBzdmcge1xcbiAgICAgIG1hcmdpbjogMCAwIDRweCAwO1xcbiAgICAgIHdpZHRoOiAxOHB4O1xcbiAgICAgIGhlaWdodDogMThweDtcXG4gICAgICBjb2xvcjogI2NjY2NjYztcXG4gICAgICBmaWxsOiAjY2NjY2NjOyB9XFxuICAubWVudUJhciAuYnV0IHNwYW4ge1xcbiAgICAgIGZvbnQtc2l6ZTogMTJweDtcXG4gICAgICBsaW5lLWhlaWdodDogMTJweDsgfVxcbiAgLm1lbnVCYXIgLmFjdCB7XFxuICAgIGNvbG9yOiAjMWU4OGU1OyB9XFxuICAubWVudUJhciAuYWN0IHN2ZyB7XFxuICAgICAgbWFyZ2luOiAwIDAgNHB4IDA7XFxuICAgICAgd2lkdGg6IDE4cHg7XFxuICAgICAgaGVpZ2h0OiAxOHB4OyB9XFxuICAubWVudUJhciAuY2VuIHtcXG4gICAgLW1zLWZsZXg6IDAgMCA2NXB4O1xcbiAgICAgICAgZmxleDogMCAwIDY1cHg7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTsgfVxcbiAgLm1lbnVCYXIgLmNlbkJ1dCB7XFxuICAgIGJhY2tncm91bmQ6ICMxMjk2ZGI7XFxuICAgIHdpZHRoOiA1MHB4O1xcbiAgICBoZWlnaHQ6IDUwcHg7XFxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gICAgLW1zLWZsZXg6IDE7XFxuICAgICAgICBmbGV4OiAxO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogLTNweDtcXG4gICAgbGVmdDogNTAlO1xcbiAgICBtYXJnaW4tbGVmdDogLTI1cHg7XFxuICAgIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICAtbXMtZmxleC1wYWNrOiBjZW50ZXI7XFxuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgLW1zLWZsZXgtYWxpZ246IGNlbnRlcjtcXG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7IH1cXG4gIC5tZW51QmFyIC5jZW5CdXQgc3ZnIHtcXG4gICAgICBjb2xvcjogI2ZmZjtcXG4gICAgICB3aWR0aDogMzBweDtcXG4gICAgICBoZWlnaHQ6IDMwcHg7XFxuICAgICAgbWFyZ2luOiAwOyB9XFxuICAubWVudUJhciAuYWRkQm94IHtcXG4gICAgcG9zaXRpb246IGZpeGVkO1xcbiAgICB6LWluZGV4OiAxO1xcbiAgICB0b3A6IDA7XFxuICAgIGxlZnQ6IDA7XFxuICAgIHJpZ2h0OiAwO1xcbiAgICBib3R0b206IDA7XFxuICAgIGJhY2tncm91bmQ6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC45KTtcXG4gICAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIC1tcy1mbGV4LXBhY2s6IGNlbnRlcjtcXG4gICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICAtbXMtZmxleC1hbGlnbjogY2VudGVyO1xcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgLW1zLWZsZXgtZmxvdzogY29sdW1uIG5vd3JhcDtcXG4gICAgICAgIGZsZXgtZmxvdzogY29sdW1uIG5vd3JhcDsgfVxcbiAgLm1lbnVCYXIgLmFkZEJveCAubGlzdCB7XFxuICAgICAgd2lkdGg6IDEwMCU7IH1cXG4gIC5tZW51QmFyIC5hZGRCb3ggLmxpc3QgbGkge1xcbiAgICAgICAgaGVpZ2h0OiAzNXB4O1xcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICAgICAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICAgICAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICAgICAgLW1zLWZsZXgtcGFjazogY2VudGVyO1xcbiAgICAgICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICAgICAgLW1zLWZsZXgtYWxpZ246IGNlbnRlcjtcXG4gICAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICAgICAgbWFyZ2luOiAwIDAgMzBweCAwOyB9XFxuICAubWVudUJhciAuYWRkQm94IC5saXN0IGxpIHN2ZyB7XFxuICAgICAgICAgIHdpZHRoOiAzNXB4O1xcbiAgICAgICAgICBoZWlnaHQ6IDM1cHg7XFxuICAgICAgICAgIGNvbG9yOiAjNWZjYmY4OyB9XFxuICAubWVudUJhciAuYWRkQm94IC5saXN0IGxpIHNwYW4ge1xcbiAgICAgICAgICBjb2xvcjogIzdiN2I3YjtcXG4gICAgICAgICAgZm9udC1zaXplOiAxNnB4O1xcbiAgICAgICAgICBtYXJnaW46IDVweCAwIDAgNXB4OyB9XFxuICAubWVudUJhciAuYWRkQm94IC5jYW5jZWwge1xcbiAgICAgIG1hcmdpbjogMTAwcHggMCAwIDA7XFxuICAgICAgY29sb3I6ICM2ZGNlZjY7IH1cXG4gIC5tZW51QmFyIC5hbGVydCAuYWxlcnRCb3ggcCB7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjsgfVxcblwiIl19 */\n/*@ sourceURL=styles\\components\\menuBar.scss */";
  __styledJsxDefaultExport.__scopedHash = "2882498895";
  module.exports = __styledJsxDefaultExport;
})();

/***/ }),

/***/ 629:
/***/ (function(module, exports) {

;

(function () {
  "use strict";

  var __styledJsxDefaultExport = new String(".dingHome .dingHome-box{-ms-flex-flow:column nowrap;-webkit-flex-flow:column nowrap;-ms-flex-flow:column nowrap;flex-flow:column nowrap;display:-ms-flexbox;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;overflow:hidden}.dingHome .alertRow{position:absolute;background:#ffedb2;line-height:30px;font-size:12px;left:0;right:0;padding:0 10px;box-shadow:0 0 5px #bcb2b2}.dingHome .alertRow svg{margin:4px 5px 0 0;float:left;color:#a09f9a}.dingHome .alertRow span{color:#a09f9a}.dingHome .alertRow label{float:right;color:#408ddf}.dingHome .dingHome-top{height:150px;width:100%;border:1px solid #eaeaea;box-shadow:1px 1px 1px #eaeaea;background:#fff;border-radius:5px;-ms-flex:0 0 auto;-webkit-flex:0 0 auto;-ms-flex:0 0 auto;flex:0 0 auto}.dingHome .dingHome-top .wait{width:91%;padding:0 3px;height:40px;line-height:40px}.dingHome .dingHome-top .wait div{color:#d0d0d5;display:inline-block;padding-left:12px}.dingHome .dingHome-top .wait div p{margin:0 0 0 8px;display:inline-block}.dingHome .dingHome-top .wait div p span{color:#f77575}.dingHome .dingHome-top .wait-pm{height:68px;padding:15px;border-top:1px solid #f8f8f8;display:-ms-flexbox;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-ms-flex-wrap:nowrap;-webkit-flex-wrap:nowrap;-ms-flex-wrap:nowrap;flex-wrap:nowrap}.dingHome .dingHome-top .wait-pm p{float:left;color:#666;font-size:14px;-ms-flex:1;-webkit-flex:1;-ms-flex:1;flex:1}.dingHome .dingHome-top .wait-pm p span{display:block;padding:15px;height:45px;line-height:45px;font-weight:600}.dingHome .dingHome-top .wait-pm p .span-one{color:#78c06e}.dingHome .dingHome-top .wait-pm p .span-two{color:#5c6bc0}.dingHome .dingHome-top .wait-pm p .span-three{color:#fd943e}.dingHome .dingHome-top .wait-pm .wait-pm-center{-webkit-text-align:center;text-align:center}.dingHome .dingHome-top .wait-pm .wait-pm-last{-webkit-text-align:right;text-align:right}.dingHome .dingHome-bottom{width:100%;margin-top:10px;box-shadow:1px 1px 1px #eaeaea;background:#fff;border-radius:5px;-ms-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;position:relative}.dingHome .dingHome-bottom .pp{-webkit-text-align:center;text-align:center;height:100px;line-height:100px;color:#d0d0d5}.dingHome .dingHome-bottom .bottom-title{height:44px;border-bottom:1px solid #f8f8f8;padding:0 15px;line-height:44px}.dingHome .dingHome-bottom .bottom-title p{float:left;color:#d0d0d5}.dingHome .dingHome-bottom .bottom-title font{float:left;display:block;line-height:44px;font-size:12px;color:#d0d0d5;margin:0 0 0 8px}.dingHome .dingHome-bottom .bottom-title font span{color:#f77575}.dingHome .dingHome-bottom .bottom-title svg{margin:11px 0 0 0;width:18px;color:#cdcdd1;height:18px;float:right}.dingHome .dingHome-bottom .talkbox{overflow-y:auto;overflow-x:hidden;-webkit-overflow-scrolling:touch;width:100%;position:absolute;top:45px;left:0;right:0;bottom:0}.dingHome .dingHome-bottom .talkbox .p{float:left;-webkit-text-align:center;text-align:center;height:30px;line-height:30px;width:100%;font-size:12px;color:#999}.dingHome .dingHome-bottom .talkbox .p .load_loading{display:inline-block;position:inherit;width:auto;min-height:auto;margin:0 7px 0 0}.dingHome .dingHome-bottom .talkbox .talklist:last-child{border:0}.dingHome .dingHome-bottom .talkbox .talklist{border-bottom:1px solid #f8f8f8;padding:20px 15px;position:relative;height:91px;float:left;width:100%}.dingHome .dingHome-bottom .talkbox .talklist .icon{width:50px;height:50px;border-radius:50%;border:1px solid #ccc;-webkit-text-align:center;text-align:center;line-height:50px;vertical-align:middle;display:inline-block;background:#5c6bc0;color:#e6e8f5;overflow:hidden}.dingHome .dingHome-bottom .talkbox .talklist .tasklist{padding:0 0 0 15px;position:absolute;top:20px;left:65px;right:15px}.dingHome .dingHome-bottom .talkbox .talklist .tasklist .dd{position:absolute;width:8px;height:8px;border-radius:50%;background:#f65e5e;right:1px;top:3px}.dingHome .dingHome-bottom .talkbox .talklist .tasklist .hui{background:#999}.dingHome .dingHome-bottom .talkbox .talklist .tasklist p{color:#666;font-size:14px;padding:5px 0 0 0}.dingHome .dingHome-bottom .talkbox .talklist .tasklist p:last-child{color:#c7c7cc;font-size:12px}.dingHome .dingHome-bottom .talkbox .talklist .tasklist .tasklist-first{color:#666;font-size:14px;padding:0}.dingHome .dingHome-bottom .talkbox .talklist .tasklist .tasklist-first span{margin:0 5px 0 0}.dingHome .dingHome-bottom .talkbox .talklist .tasklist .tasklist-first i{font-style:normal}.am-popover-mask{display:none}.am-popover{display:none}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0eWxlc1xccGFnZXNcXGRpbmdIb21lLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsQUFFK0IsQUFFVixBQUVHLEFBRUwsQUFFRixBQUVELEFBRUQsQUFFTSxBQUVLLEFBRUQsQUFFUixBQUVDLEFBRUssQUFFQSxBQUVBLEFBRUEsQUFFRSxBQUVELEFBRVYsQUFFUyxBQUVOLEFBRUMsQUFFQSxBQUVLLEFBRUUsQUFFSixBQUVILEFBRVksQUFFZCxBQUV1QixBQUVuQixBQUVRLEFBRUMsQUFFRixBQUVMLEFBRUcsQUFFSCxBQUVRLEFBRUMsQUFFZixBQUVBLFVBeEJDLENBNUNpQixDQVVFLEFBY0gsQUFNTSxBQUVBLEFBUUksQUFRRixBQVFPLEFBSUEsQ0FoRVosQUFZRCxBQW9CbUIsQ0E5QnhCLEFBb0ViLEFBRUEsQ0ExRUcsQUFRNkIsQUFJdkIsQUFNbUIsQUFFckIsQUFFQSxBQUVBLEFBZ0JBLEFBd0IyQixFQXBCUCxBQWdCaEIsQ0FsRDRCLEFBMER6QixDQXhFWSxBQThDQSxBQWdCTyxBQVlsQixDQXhFUSxBQTBEZSxFQVJDLEVBaENFLENBc0NVLENBbERWLEFBRVAsQ0FRa0IsQUFzQjdCLEFBRXVCLENBcEMxQixBQTREd0MsQUFJUixDQXhFUCxBQXdCSSxBQVlDLENBNEJLLENBaEJSLEFBc0JaLENBbEVPLENBc0RLLEdBUmtCLENBcENSLEVBWlgsQUFVVSxBQWtEQSxBQVVILENBeERiLEFBTW1CLEFBZ0NBLEVBOUJnQixBQXdDUyxFQTlCNUUsQUEwQjBFLENBaEJkLENBWjNELEFBTWUsQUFFaUMsQUFRUyxDQTVDdkIsQUFnRWtCLEVBTmMsR0FwREEsQUFZRSxBQWdDTyxBQUlaLElBNUNkLENBWk0sQUFVUCxBQVFvQixDQWdDaEMsQ0FKd0MsQ0F4QmUsQUFjckQsQUF3QmdELENBMUIxQixBQVFvQixBQW9CeUIsQ0F4Qm5DLEtBb0I4QixFQU5DLENBSjdCLENBRVosQUFNc0IsQ0FWTCxBQWNVLENBNUR0QixHQTBDdUMsQ0FwQlosQ0FKTixBQWdCTCxDQUV4QixDQUVjLENBdENLLEFBOERrRCxDQWQvQixFQXhDVixBQWdEZSxHQUpFLENBaENqQyxDQThCUyxDQWxEZ0IsRUE4RG1ELEVBMUJ2RixBQU0rQyxFQWNhLENBdEJ2QixJQTFCVyxBQXdDRyxBQUVULEFBWThDLEtBOUR0QixFQXdETCxDQXRCVixFQWNZLEVBVUssR0E1RG5FLENBb0QyRCxFQUZnQixDQXhDUCxRQXdDcUIsQ0FFN0IsRUFRc0MsR0ExRGhDLEdBRmxELENBa0QwRSxDQXhDRCxNQTBCbEIsU0F3QnlELEVBeEMzRSxRQWdCbUIsWUF3Qm9GLEVBeEM3RSxrQkFWVyxBQWtEeUYsZUFBeUIsSUE1RHpLLGFBNEQwSyxJQTVEekssWUFvQjRDIiwiZmlsZSI6InN0eWxlc1xccGFnZXNcXGRpbmdIb21lLnNjc3MiLCJzb3VyY2VSb290IjoiRDovd29yay9waG9uZS1uZXciLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IFwiLmRpbmdIb21lIC5kaW5nSG9tZS1ib3gge1xcbiAgLW1zLWZsZXgtZmxvdzogY29sdW1uIG5vd3JhcDtcXG4gICAgICBmbGV4LWZsb3c6IGNvbHVtbiBub3dyYXA7XFxuICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBvdmVyZmxvdzogaGlkZGVuOyB9XFxuXFxuLmRpbmdIb21lIC5hbGVydFJvdyB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBiYWNrZ3JvdW5kOiAjZmZlZGIyO1xcbiAgbGluZS1oZWlnaHQ6IDMwcHg7XFxuICBmb250LXNpemU6IDEycHg7XFxuICBsZWZ0OiAwO1xcbiAgcmlnaHQ6IDA7XFxuICBwYWRkaW5nOiAwIDEwcHg7XFxuICBib3gtc2hhZG93OiAwIDAgNXB4ICNiY2IyYjI7IH1cXG5cXG4uZGluZ0hvbWUgLmFsZXJ0Um93IHN2ZyB7XFxuICAgIG1hcmdpbjogNHB4IDVweCAwIDA7XFxuICAgIGZsb2F0OiBsZWZ0O1xcbiAgICBjb2xvcjogI2EwOWY5YTsgfVxcblxcbi5kaW5nSG9tZSAuYWxlcnRSb3cgc3BhbiB7XFxuICAgIGNvbG9yOiAjYTA5ZjlhOyB9XFxuXFxuLmRpbmdIb21lIC5hbGVydFJvdyBsYWJlbCB7XFxuICAgIGZsb2F0OiByaWdodDtcXG4gICAgY29sb3I6ICM0MDhkZGY7IH1cXG5cXG4uZGluZ0hvbWUgLmRpbmdIb21lLXRvcCB7XFxuICBoZWlnaHQ6IDE1MHB4O1xcbiAgd2lkdGg6IDEwMCU7XFxuICBib3JkZXI6IDFweCBzb2xpZCAjZWFlYWVhO1xcbiAgYm94LXNoYWRvdzogMXB4IDFweCAxcHggI2VhZWFlYTtcXG4gIGJhY2tncm91bmQ6ICNmZmY7XFxuICBib3JkZXItcmFkaXVzOiA1cHg7XFxuICAtbXMtZmxleDogMCAwIGF1dG87XFxuICAgICAgZmxleDogMCAwIGF1dG87IH1cXG5cXG4uZGluZ0hvbWUgLmRpbmdIb21lLXRvcCAud2FpdCB7XFxuICAgIHdpZHRoOiA5MSU7XFxuICAgIHBhZGRpbmc6IDAgM3B4O1xcbiAgICBoZWlnaHQ6IDQwcHg7XFxuICAgIGxpbmUtaGVpZ2h0OiA0MHB4OyB9XFxuXFxuLmRpbmdIb21lIC5kaW5nSG9tZS10b3AgLndhaXQgZGl2IHtcXG4gICAgICBjb2xvcjogI2QwZDBkNTtcXG4gICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICAgICAgcGFkZGluZy1sZWZ0OiAxMnB4OyB9XFxuXFxuLmRpbmdIb21lIC5kaW5nSG9tZS10b3AgLndhaXQgZGl2IHAge1xcbiAgICAgICAgbWFyZ2luOiAwIDAgMCA4cHg7XFxuICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IH1cXG5cXG4uZGluZ0hvbWUgLmRpbmdIb21lLXRvcCAud2FpdCBkaXYgcCBzcGFuIHtcXG4gICAgICAgICAgY29sb3I6ICNmNzc1NzU7IH1cXG5cXG4uZGluZ0hvbWUgLmRpbmdIb21lLXRvcCAud2FpdC1wbSB7XFxuICAgIGhlaWdodDogNjhweDtcXG4gICAgcGFkZGluZzogMTVweDtcXG4gICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNmOGY4Zjg7XFxuICAgIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICAtbXMtZmxleC13cmFwOiBub3dyYXA7XFxuICAgICAgICBmbGV4LXdyYXA6IG5vd3JhcDsgfVxcblxcbi5kaW5nSG9tZSAuZGluZ0hvbWUtdG9wIC53YWl0LXBtIHAge1xcbiAgICAgIGZsb2F0OiBsZWZ0O1xcbiAgICAgIGNvbG9yOiAjNjY2O1xcbiAgICAgIGZvbnQtc2l6ZTogMTRweDtcXG4gICAgICAtbXMtZmxleDogMTtcXG4gICAgICAgICAgZmxleDogMTsgfVxcblxcbi5kaW5nSG9tZSAuZGluZ0hvbWUtdG9wIC53YWl0LXBtIHAgc3BhbiB7XFxuICAgICAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgICAgIHBhZGRpbmc6IDE1cHg7XFxuICAgICAgICBoZWlnaHQ6IDQ1cHg7XFxuICAgICAgICBsaW5lLWhlaWdodDogNDVweDtcXG4gICAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7IH1cXG5cXG4uZGluZ0hvbWUgLmRpbmdIb21lLXRvcCAud2FpdC1wbSBwIC5zcGFuLW9uZSB7XFxuICAgICAgICBjb2xvcjogIzc4YzA2ZTsgfVxcblxcbi5kaW5nSG9tZSAuZGluZ0hvbWUtdG9wIC53YWl0LXBtIHAgLnNwYW4tdHdvIHtcXG4gICAgICAgIGNvbG9yOiAjNWM2YmMwOyB9XFxuXFxuLmRpbmdIb21lIC5kaW5nSG9tZS10b3AgLndhaXQtcG0gcCAuc3Bhbi10aHJlZSB7XFxuICAgICAgICBjb2xvcjogI2ZkOTQzZTsgfVxcblxcbi5kaW5nSG9tZSAuZGluZ0hvbWUtdG9wIC53YWl0LXBtIC53YWl0LXBtLWNlbnRlciB7XFxuICAgICAgdGV4dC1hbGlnbjogY2VudGVyOyB9XFxuXFxuLmRpbmdIb21lIC5kaW5nSG9tZS10b3AgLndhaXQtcG0gLndhaXQtcG0tbGFzdCB7XFxuICAgICAgdGV4dC1hbGlnbjogcmlnaHQ7IH1cXG5cXG4uZGluZ0hvbWUgLmRpbmdIb21lLWJvdHRvbSB7XFxuICB3aWR0aDogMTAwJTtcXG4gIG1hcmdpbi10b3A6IDEwcHg7XFxuICBib3gtc2hhZG93OiAxcHggMXB4IDFweCAjZWFlYWVhO1xcbiAgYmFja2dyb3VuZDogI2ZmZjtcXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcXG4gIC1tcy1mbGV4OiAxO1xcbiAgICAgIGZsZXg6IDE7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7IH1cXG5cXG4uZGluZ0hvbWUgLmRpbmdIb21lLWJvdHRvbSAucHAge1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIGhlaWdodDogMTAwcHg7XFxuICAgIGxpbmUtaGVpZ2h0OiAxMDBweDtcXG4gICAgY29sb3I6ICNkMGQwZDU7IH1cXG5cXG4uZGluZ0hvbWUgLmRpbmdIb21lLWJvdHRvbSAuYm90dG9tLXRpdGxlIHtcXG4gICAgaGVpZ2h0OiA0NHB4O1xcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2Y4ZjhmODtcXG4gICAgcGFkZGluZzogMCAxNXB4O1xcbiAgICBsaW5lLWhlaWdodDogNDRweDsgfVxcblxcbi5kaW5nSG9tZSAuZGluZ0hvbWUtYm90dG9tIC5ib3R0b20tdGl0bGUgcCB7XFxuICAgICAgZmxvYXQ6IGxlZnQ7XFxuICAgICAgY29sb3I6ICNkMGQwZDU7IH1cXG5cXG4uZGluZ0hvbWUgLmRpbmdIb21lLWJvdHRvbSAuYm90dG9tLXRpdGxlIGZvbnQge1xcbiAgICAgIGZsb2F0OiBsZWZ0O1xcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICAgIGxpbmUtaGVpZ2h0OiA0NHB4O1xcbiAgICAgIGZvbnQtc2l6ZTogMTJweDtcXG4gICAgICBjb2xvcjogI2QwZDBkNTtcXG4gICAgICBtYXJnaW46IDAgMCAwIDhweDsgfVxcblxcbi5kaW5nSG9tZSAuZGluZ0hvbWUtYm90dG9tIC5ib3R0b20tdGl0bGUgZm9udCBzcGFuIHtcXG4gICAgICAgIGNvbG9yOiAjZjc3NTc1OyB9XFxuXFxuLmRpbmdIb21lIC5kaW5nSG9tZS1ib3R0b20gLmJvdHRvbS10aXRsZSBzdmcge1xcbiAgICAgIG1hcmdpbjogMTFweCAwIDAgMDtcXG4gICAgICB3aWR0aDogMThweDtcXG4gICAgICBjb2xvcjogI2NkY2RkMTtcXG4gICAgICBoZWlnaHQ6IDE4cHg7XFxuICAgICAgZmxvYXQ6IHJpZ2h0OyB9XFxuXFxuLmRpbmdIb21lIC5kaW5nSG9tZS1ib3R0b20gLnRhbGtib3gge1xcbiAgICBvdmVyZmxvdy15OiBhdXRvO1xcbiAgICBvdmVyZmxvdy14OiBoaWRkZW47XFxuICAgIC13ZWJraXQtb3ZlcmZsb3ctc2Nyb2xsaW5nOiB0b3VjaDtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiA0NXB4O1xcbiAgICBsZWZ0OiAwO1xcbiAgICByaWdodDogMDtcXG4gICAgYm90dG9tOiAwOyB9XFxuXFxuLmRpbmdIb21lIC5kaW5nSG9tZS1ib3R0b20gLnRhbGtib3ggLnAge1xcbiAgICAgIGZsb2F0OiBsZWZ0O1xcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgICBoZWlnaHQ6IDMwcHg7XFxuICAgICAgbGluZS1oZWlnaHQ6IDMwcHg7XFxuICAgICAgd2lkdGg6IDEwMCU7XFxuICAgICAgZm9udC1zaXplOiAxMnB4O1xcbiAgICAgIGNvbG9yOiAjOTk5OyB9XFxuXFxuLmRpbmdIb21lIC5kaW5nSG9tZS1ib3R0b20gLnRhbGtib3ggLnAgLmxvYWRfbG9hZGluZyB7XFxuICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICAgICAgICBwb3NpdGlvbjogaW5oZXJpdDtcXG4gICAgICAgIHdpZHRoOiBhdXRvO1xcbiAgICAgICAgbWluLWhlaWdodDogYXV0bztcXG4gICAgICAgIG1hcmdpbjogMCA3cHggMCAwOyB9XFxuXFxuLmRpbmdIb21lIC5kaW5nSG9tZS1ib3R0b20gLnRhbGtib3ggLnRhbGtsaXN0Omxhc3QtY2hpbGQge1xcbiAgICAgIGJvcmRlcjogMDsgfVxcblxcbi5kaW5nSG9tZSAuZGluZ0hvbWUtYm90dG9tIC50YWxrYm94IC50YWxrbGlzdCB7XFxuICAgICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNmOGY4Zjg7XFxuICAgICAgcGFkZGluZzogMjBweCAxNXB4O1xcbiAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgICBoZWlnaHQ6IDkxcHg7XFxuICAgICAgZmxvYXQ6IGxlZnQ7XFxuICAgICAgd2lkdGg6IDEwMCU7IH1cXG5cXG4uZGluZ0hvbWUgLmRpbmdIb21lLWJvdHRvbSAudGFsa2JveCAudGFsa2xpc3QgLmljb24ge1xcbiAgICAgICAgd2lkdGg6IDUwcHg7XFxuICAgICAgICBoZWlnaHQ6IDUwcHg7XFxuICAgICAgICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICAgICAgICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICAgICAgbGluZS1oZWlnaHQ6IDUwcHg7XFxuICAgICAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xcbiAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgICAgICAgYmFja2dyb3VuZDogIzVjNmJjMDtcXG4gICAgICAgIGNvbG9yOiAjZTZlOGY1O1xcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjsgfVxcblxcbi5kaW5nSG9tZSAuZGluZ0hvbWUtYm90dG9tIC50YWxrYm94IC50YWxrbGlzdCAudGFza2xpc3Qge1xcbiAgICAgICAgcGFkZGluZzogMCAwIDAgMTVweDtcXG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgICAgIHRvcDogMjBweDtcXG4gICAgICAgIGxlZnQ6IDY1cHg7XFxuICAgICAgICByaWdodDogMTVweDsgfVxcblxcbi5kaW5nSG9tZSAuZGluZ0hvbWUtYm90dG9tIC50YWxrYm94IC50YWxrbGlzdCAudGFza2xpc3QgLmRkIHtcXG4gICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICAgICAgICB3aWR0aDogOHB4O1xcbiAgICAgICAgICBoZWlnaHQ6IDhweDtcXG4gICAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgICAgICAgICBiYWNrZ3JvdW5kOiAjZjY1ZTVlO1xcbiAgICAgICAgICByaWdodDogMXB4O1xcbiAgICAgICAgICB0b3A6IDNweDsgfVxcblxcbi5kaW5nSG9tZSAuZGluZ0hvbWUtYm90dG9tIC50YWxrYm94IC50YWxrbGlzdCAudGFza2xpc3QgLmh1aSB7XFxuICAgICAgICAgIGJhY2tncm91bmQ6ICM5OTk7IH1cXG5cXG4uZGluZ0hvbWUgLmRpbmdIb21lLWJvdHRvbSAudGFsa2JveCAudGFsa2xpc3QgLnRhc2tsaXN0IHAge1xcbiAgICAgICAgICBjb2xvcjogIzY2NjtcXG4gICAgICAgICAgZm9udC1zaXplOiAxNHB4O1xcbiAgICAgICAgICBwYWRkaW5nOiA1cHggMCAwIDA7IH1cXG5cXG4uZGluZ0hvbWUgLmRpbmdIb21lLWJvdHRvbSAudGFsa2JveCAudGFsa2xpc3QgLnRhc2tsaXN0IHA6bGFzdC1jaGlsZCB7XFxuICAgICAgICAgIGNvbG9yOiAjYzdjN2NjO1xcbiAgICAgICAgICBmb250LXNpemU6IDEycHg7IH1cXG5cXG4uZGluZ0hvbWUgLmRpbmdIb21lLWJvdHRvbSAudGFsa2JveCAudGFsa2xpc3QgLnRhc2tsaXN0IC50YXNrbGlzdC1maXJzdCB7XFxuICAgICAgICAgIGNvbG9yOiAjNjY2O1xcbiAgICAgICAgICBmb250LXNpemU6IDE0cHg7XFxuICAgICAgICAgIHBhZGRpbmc6IDA7IH1cXG5cXG4uZGluZ0hvbWUgLmRpbmdIb21lLWJvdHRvbSAudGFsa2JveCAudGFsa2xpc3QgLnRhc2tsaXN0IC50YXNrbGlzdC1maXJzdCBzcGFuIHtcXG4gICAgICAgICAgICBtYXJnaW46IDAgNXB4IDAgMDsgfVxcblxcbi5kaW5nSG9tZSAuZGluZ0hvbWUtYm90dG9tIC50YWxrYm94IC50YWxrbGlzdCAudGFza2xpc3QgLnRhc2tsaXN0LWZpcnN0IGkge1xcbiAgICAgICAgICAgIGZvbnQtc3R5bGU6IG5vcm1hbDsgfVxcblxcbi5hbS1wb3BvdmVyLW1hc2sge1xcbiAgZGlzcGxheTogbm9uZTsgfVxcblxcbi5hbS1wb3BvdmVyIHtcXG4gIGRpc3BsYXk6IG5vbmU7IH1cXG5cIiJdfQ== */\n/*@ sourceURL=styles\\pages\\dingHome.scss */");

  __styledJsxDefaultExport.__hash = "12612248923";
  __styledJsxDefaultExport.__scoped = ".dingHome[data-jsx-ext~=\"22612248923\"] .dingHome-box[data-jsx-ext~=\"22612248923\"]{-ms-flex-flow:column nowrap;-webkit-flex-flow:column nowrap;-ms-flex-flow:column nowrap;flex-flow:column nowrap;display:-ms-flexbox;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;overflow:hidden}.dingHome[data-jsx-ext~=\"22612248923\"] .alertRow[data-jsx-ext~=\"22612248923\"]{position:absolute;background:#ffedb2;line-height:30px;font-size:12px;left:0;right:0;padding:0 10px;box-shadow:0 0 5px #bcb2b2}.dingHome[data-jsx-ext~=\"22612248923\"] .alertRow[data-jsx-ext~=\"22612248923\"] svg[data-jsx-ext~=\"22612248923\"]{margin:4px 5px 0 0;float:left;color:#a09f9a}.dingHome[data-jsx-ext~=\"22612248923\"] .alertRow[data-jsx-ext~=\"22612248923\"] span[data-jsx-ext~=\"22612248923\"]{color:#a09f9a}.dingHome[data-jsx-ext~=\"22612248923\"] .alertRow[data-jsx-ext~=\"22612248923\"] label[data-jsx-ext~=\"22612248923\"]{float:right;color:#408ddf}.dingHome[data-jsx-ext~=\"22612248923\"] .dingHome-top[data-jsx-ext~=\"22612248923\"]{height:150px;width:100%;border:1px solid #eaeaea;box-shadow:1px 1px 1px #eaeaea;background:#fff;border-radius:5px;-ms-flex:0 0 auto;-webkit-flex:0 0 auto;-ms-flex:0 0 auto;flex:0 0 auto}.dingHome[data-jsx-ext~=\"22612248923\"] .dingHome-top[data-jsx-ext~=\"22612248923\"] .wait[data-jsx-ext~=\"22612248923\"]{width:91%;padding:0 3px;height:40px;line-height:40px}.dingHome[data-jsx-ext~=\"22612248923\"] .dingHome-top[data-jsx-ext~=\"22612248923\"] .wait[data-jsx-ext~=\"22612248923\"] div[data-jsx-ext~=\"22612248923\"]{color:#d0d0d5;display:inline-block;padding-left:12px}.dingHome[data-jsx-ext~=\"22612248923\"] .dingHome-top[data-jsx-ext~=\"22612248923\"] .wait[data-jsx-ext~=\"22612248923\"] div[data-jsx-ext~=\"22612248923\"] p[data-jsx-ext~=\"22612248923\"]{margin:0 0 0 8px;display:inline-block}.dingHome[data-jsx-ext~=\"22612248923\"] .dingHome-top[data-jsx-ext~=\"22612248923\"] .wait[data-jsx-ext~=\"22612248923\"] div[data-jsx-ext~=\"22612248923\"] p[data-jsx-ext~=\"22612248923\"] span[data-jsx-ext~=\"22612248923\"]{color:#f77575}.dingHome[data-jsx-ext~=\"22612248923\"] .dingHome-top[data-jsx-ext~=\"22612248923\"] .wait-pm[data-jsx-ext~=\"22612248923\"]{height:68px;padding:15px;border-top:1px solid #f8f8f8;display:-ms-flexbox;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-ms-flex-wrap:nowrap;-webkit-flex-wrap:nowrap;-ms-flex-wrap:nowrap;flex-wrap:nowrap}.dingHome[data-jsx-ext~=\"22612248923\"] .dingHome-top[data-jsx-ext~=\"22612248923\"] .wait-pm[data-jsx-ext~=\"22612248923\"] p[data-jsx-ext~=\"22612248923\"]{float:left;color:#666;font-size:14px;-ms-flex:1;-webkit-flex:1;-ms-flex:1;flex:1}.dingHome[data-jsx-ext~=\"22612248923\"] .dingHome-top[data-jsx-ext~=\"22612248923\"] .wait-pm[data-jsx-ext~=\"22612248923\"] p[data-jsx-ext~=\"22612248923\"] span[data-jsx-ext~=\"22612248923\"]{display:block;padding:15px;height:45px;line-height:45px;font-weight:600}.dingHome[data-jsx-ext~=\"22612248923\"] .dingHome-top[data-jsx-ext~=\"22612248923\"] .wait-pm[data-jsx-ext~=\"22612248923\"] p[data-jsx-ext~=\"22612248923\"] .span-one[data-jsx-ext~=\"22612248923\"]{color:#78c06e}.dingHome[data-jsx-ext~=\"22612248923\"] .dingHome-top[data-jsx-ext~=\"22612248923\"] .wait-pm[data-jsx-ext~=\"22612248923\"] p[data-jsx-ext~=\"22612248923\"] .span-two[data-jsx-ext~=\"22612248923\"]{color:#5c6bc0}.dingHome[data-jsx-ext~=\"22612248923\"] .dingHome-top[data-jsx-ext~=\"22612248923\"] .wait-pm[data-jsx-ext~=\"22612248923\"] p[data-jsx-ext~=\"22612248923\"] .span-three[data-jsx-ext~=\"22612248923\"]{color:#fd943e}.dingHome[data-jsx-ext~=\"22612248923\"] .dingHome-top[data-jsx-ext~=\"22612248923\"] .wait-pm[data-jsx-ext~=\"22612248923\"] .wait-pm-center[data-jsx-ext~=\"22612248923\"]{-webkit-text-align:center;text-align:center}.dingHome[data-jsx-ext~=\"22612248923\"] .dingHome-top[data-jsx-ext~=\"22612248923\"] .wait-pm[data-jsx-ext~=\"22612248923\"] .wait-pm-last[data-jsx-ext~=\"22612248923\"]{-webkit-text-align:right;text-align:right}.dingHome[data-jsx-ext~=\"22612248923\"] .dingHome-bottom[data-jsx-ext~=\"22612248923\"]{width:100%;margin-top:10px;box-shadow:1px 1px 1px #eaeaea;background:#fff;border-radius:5px;-ms-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;position:relative}.dingHome[data-jsx-ext~=\"22612248923\"] .dingHome-bottom[data-jsx-ext~=\"22612248923\"] .pp[data-jsx-ext~=\"22612248923\"]{-webkit-text-align:center;text-align:center;height:100px;line-height:100px;color:#d0d0d5}.dingHome[data-jsx-ext~=\"22612248923\"] .dingHome-bottom[data-jsx-ext~=\"22612248923\"] .bottom-title[data-jsx-ext~=\"22612248923\"]{height:44px;border-bottom:1px solid #f8f8f8;padding:0 15px;line-height:44px}.dingHome[data-jsx-ext~=\"22612248923\"] .dingHome-bottom[data-jsx-ext~=\"22612248923\"] .bottom-title[data-jsx-ext~=\"22612248923\"] p[data-jsx-ext~=\"22612248923\"]{float:left;color:#d0d0d5}.dingHome[data-jsx-ext~=\"22612248923\"] .dingHome-bottom[data-jsx-ext~=\"22612248923\"] .bottom-title[data-jsx-ext~=\"22612248923\"] font[data-jsx-ext~=\"22612248923\"]{float:left;display:block;line-height:44px;font-size:12px;color:#d0d0d5;margin:0 0 0 8px}.dingHome[data-jsx-ext~=\"22612248923\"] .dingHome-bottom[data-jsx-ext~=\"22612248923\"] .bottom-title[data-jsx-ext~=\"22612248923\"] font[data-jsx-ext~=\"22612248923\"] span[data-jsx-ext~=\"22612248923\"]{color:#f77575}.dingHome[data-jsx-ext~=\"22612248923\"] .dingHome-bottom[data-jsx-ext~=\"22612248923\"] .bottom-title[data-jsx-ext~=\"22612248923\"] svg[data-jsx-ext~=\"22612248923\"]{margin:11px 0 0 0;width:18px;color:#cdcdd1;height:18px;float:right}.dingHome[data-jsx-ext~=\"22612248923\"] .dingHome-bottom[data-jsx-ext~=\"22612248923\"] .talkbox[data-jsx-ext~=\"22612248923\"]{overflow-y:auto;overflow-x:hidden;-webkit-overflow-scrolling:touch;width:100%;position:absolute;top:45px;left:0;right:0;bottom:0}.dingHome[data-jsx-ext~=\"22612248923\"] .dingHome-bottom[data-jsx-ext~=\"22612248923\"] .talkbox[data-jsx-ext~=\"22612248923\"] .p[data-jsx-ext~=\"22612248923\"]{float:left;-webkit-text-align:center;text-align:center;height:30px;line-height:30px;width:100%;font-size:12px;color:#999}.dingHome[data-jsx-ext~=\"22612248923\"] .dingHome-bottom[data-jsx-ext~=\"22612248923\"] .talkbox[data-jsx-ext~=\"22612248923\"] .p[data-jsx-ext~=\"22612248923\"] .load_loading[data-jsx-ext~=\"22612248923\"]{display:inline-block;position:inherit;width:auto;min-height:auto;margin:0 7px 0 0}.dingHome[data-jsx-ext~=\"22612248923\"] .dingHome-bottom[data-jsx-ext~=\"22612248923\"] .talkbox[data-jsx-ext~=\"22612248923\"] .talklist[data-jsx-ext~=\"22612248923\"]:last-child{border:0}.dingHome[data-jsx-ext~=\"22612248923\"] .dingHome-bottom[data-jsx-ext~=\"22612248923\"] .talkbox[data-jsx-ext~=\"22612248923\"] .talklist[data-jsx-ext~=\"22612248923\"]{border-bottom:1px solid #f8f8f8;padding:20px 15px;position:relative;height:91px;float:left;width:100%}.dingHome[data-jsx-ext~=\"22612248923\"] .dingHome-bottom[data-jsx-ext~=\"22612248923\"] .talkbox[data-jsx-ext~=\"22612248923\"] .talklist[data-jsx-ext~=\"22612248923\"] .icon[data-jsx-ext~=\"22612248923\"]{width:50px;height:50px;border-radius:50%;border:1px solid #ccc;-webkit-text-align:center;text-align:center;line-height:50px;vertical-align:middle;display:inline-block;background:#5c6bc0;color:#e6e8f5;overflow:hidden}.dingHome[data-jsx-ext~=\"22612248923\"] .dingHome-bottom[data-jsx-ext~=\"22612248923\"] .talkbox[data-jsx-ext~=\"22612248923\"] .talklist[data-jsx-ext~=\"22612248923\"] .tasklist[data-jsx-ext~=\"22612248923\"]{padding:0 0 0 15px;position:absolute;top:20px;left:65px;right:15px}.dingHome[data-jsx-ext~=\"22612248923\"] .dingHome-bottom[data-jsx-ext~=\"22612248923\"] .talkbox[data-jsx-ext~=\"22612248923\"] .talklist[data-jsx-ext~=\"22612248923\"] .tasklist[data-jsx-ext~=\"22612248923\"] .dd[data-jsx-ext~=\"22612248923\"]{position:absolute;width:8px;height:8px;border-radius:50%;background:#f65e5e;right:1px;top:3px}.dingHome[data-jsx-ext~=\"22612248923\"] .dingHome-bottom[data-jsx-ext~=\"22612248923\"] .talkbox[data-jsx-ext~=\"22612248923\"] .talklist[data-jsx-ext~=\"22612248923\"] .tasklist[data-jsx-ext~=\"22612248923\"] .hui[data-jsx-ext~=\"22612248923\"]{background:#999}.dingHome[data-jsx-ext~=\"22612248923\"] .dingHome-bottom[data-jsx-ext~=\"22612248923\"] .talkbox[data-jsx-ext~=\"22612248923\"] .talklist[data-jsx-ext~=\"22612248923\"] .tasklist[data-jsx-ext~=\"22612248923\"] p[data-jsx-ext~=\"22612248923\"]{color:#666;font-size:14px;padding:5px 0 0 0}.dingHome[data-jsx-ext~=\"22612248923\"] .dingHome-bottom[data-jsx-ext~=\"22612248923\"] .talkbox[data-jsx-ext~=\"22612248923\"] .talklist[data-jsx-ext~=\"22612248923\"] .tasklist[data-jsx-ext~=\"22612248923\"] p[data-jsx-ext~=\"22612248923\"]:last-child{color:#c7c7cc;font-size:12px}.dingHome[data-jsx-ext~=\"22612248923\"] .dingHome-bottom[data-jsx-ext~=\"22612248923\"] .talkbox[data-jsx-ext~=\"22612248923\"] .talklist[data-jsx-ext~=\"22612248923\"] .tasklist[data-jsx-ext~=\"22612248923\"] .tasklist-first[data-jsx-ext~=\"22612248923\"]{color:#666;font-size:14px;padding:0}.dingHome[data-jsx-ext~=\"22612248923\"] .dingHome-bottom[data-jsx-ext~=\"22612248923\"] .talkbox[data-jsx-ext~=\"22612248923\"] .talklist[data-jsx-ext~=\"22612248923\"] .tasklist[data-jsx-ext~=\"22612248923\"] .tasklist-first[data-jsx-ext~=\"22612248923\"] span[data-jsx-ext~=\"22612248923\"]{margin:0 5px 0 0}.dingHome[data-jsx-ext~=\"22612248923\"] .dingHome-bottom[data-jsx-ext~=\"22612248923\"] .talkbox[data-jsx-ext~=\"22612248923\"] .talklist[data-jsx-ext~=\"22612248923\"] .tasklist[data-jsx-ext~=\"22612248923\"] .tasklist-first[data-jsx-ext~=\"22612248923\"] i[data-jsx-ext~=\"22612248923\"]{font-style:normal}.am-popover-mask[data-jsx-ext~=\"22612248923\"]{display:none}.am-popover[data-jsx-ext~=\"22612248923\"]{display:none}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0eWxlc1xccGFnZXNcXGRpbmdIb21lLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsQUFFK0IsQUFFVixBQUVHLEFBRUwsQUFFRixBQUVELEFBRUQsQUFFTSxBQUVLLEFBRUQsQUFFUixBQUVDLEFBRUssQUFFQSxBQUVBLEFBRUEsQUFFRSxBQUVELEFBRVYsQUFFUyxBQUVOLEFBRUMsQUFFQSxBQUVLLEFBRUUsQUFFSixBQUVILEFBRVksQUFFZCxBQUV1QixBQUVuQixBQUVRLEFBRUMsQUFFRixBQUVMLEFBRUcsQUFFSCxBQUVRLEFBRUMsQUFFZixBQUVBLFVBeEJDLENBNUNpQixDQVVFLEFBY0gsQUFNTSxBQUVBLEFBUUksQUFRRixBQVFPLEFBSUEsQ0FoRVosQUFZRCxBQW9CbUIsQ0E5QnhCLEFBb0ViLEFBRUEsQ0ExRUcsQUFRNkIsQUFJdkIsQUFNbUIsQUFFckIsQUFFQSxBQUVBLEFBZ0JBLEFBd0IyQixFQXBCUCxBQWdCaEIsQ0FsRDRCLEFBMER6QixDQXhFWSxBQThDQSxBQWdCTyxBQVlsQixDQXhFUSxBQTBEZSxFQVJDLEVBaENFLENBc0NVLENBbERWLEFBRVAsQ0FRa0IsQUFzQjdCLEFBRXVCLENBcEMxQixBQTREd0MsQUFJUixDQXhFUCxBQXdCSSxBQVlDLENBNEJLLENBaEJSLEFBc0JaLENBbEVPLENBc0RLLEdBUmtCLENBcENSLEVBWlgsQUFVVSxBQWtEQSxBQVVILENBeERiLEFBTW1CLEFBZ0NBLEVBOUJnQixBQXdDUyxFQTlCNUUsQUEwQjBFLENBaEJkLENBWjNELEFBTWUsQUFFaUMsQUFRUyxDQTVDdkIsQUFnRWtCLEVBTmMsR0FwREEsQUFZRSxBQWdDTyxBQUlaLElBNUNkLENBWk0sQUFVUCxBQVFvQixDQWdDaEMsQ0FKd0MsQ0F4QmUsQUFjckQsQUF3QmdELENBMUIxQixBQVFvQixBQW9CeUIsQ0F4Qm5DLEtBb0I4QixFQU5DLENBSjdCLENBRVosQUFNc0IsQ0FWTCxBQWNVLENBNUR0QixHQTBDdUMsQ0FwQlosQ0FKTixBQWdCTCxDQUV4QixDQUVjLENBdENLLEFBOERrRCxDQWQvQixFQXhDVixBQWdEZSxHQUpFLENBaENqQyxDQThCUyxDQWxEZ0IsRUE4RG1ELEVBMUJ2RixBQU0rQyxFQWNhLENBdEJ2QixJQTFCVyxBQXdDRyxBQUVULEFBWThDLEtBOUR0QixFQXdETCxDQXRCVixFQWNZLEVBVUssR0E1RG5FLENBb0QyRCxFQUZnQixDQXhDUCxRQXdDcUIsQ0FFN0IsRUFRc0MsR0ExRGhDLEdBRmxELENBa0QwRSxDQXhDRCxNQTBCbEIsU0F3QnlELEVBeEMzRSxRQWdCbUIsWUF3Qm9GLEVBeEM3RSxrQkFWVyxBQWtEeUYsZUFBeUIsSUE1RHpLLGFBNEQwSyxJQTVEekssWUFvQjRDIiwiZmlsZSI6InN0eWxlc1xccGFnZXNcXGRpbmdIb21lLnNjc3MiLCJzb3VyY2VSb290IjoiRDovd29yay9waG9uZS1uZXciLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IFwiLmRpbmdIb21lIC5kaW5nSG9tZS1ib3gge1xcbiAgLW1zLWZsZXgtZmxvdzogY29sdW1uIG5vd3JhcDtcXG4gICAgICBmbGV4LWZsb3c6IGNvbHVtbiBub3dyYXA7XFxuICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBvdmVyZmxvdzogaGlkZGVuOyB9XFxuXFxuLmRpbmdIb21lIC5hbGVydFJvdyB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBiYWNrZ3JvdW5kOiAjZmZlZGIyO1xcbiAgbGluZS1oZWlnaHQ6IDMwcHg7XFxuICBmb250LXNpemU6IDEycHg7XFxuICBsZWZ0OiAwO1xcbiAgcmlnaHQ6IDA7XFxuICBwYWRkaW5nOiAwIDEwcHg7XFxuICBib3gtc2hhZG93OiAwIDAgNXB4ICNiY2IyYjI7IH1cXG5cXG4uZGluZ0hvbWUgLmFsZXJ0Um93IHN2ZyB7XFxuICAgIG1hcmdpbjogNHB4IDVweCAwIDA7XFxuICAgIGZsb2F0OiBsZWZ0O1xcbiAgICBjb2xvcjogI2EwOWY5YTsgfVxcblxcbi5kaW5nSG9tZSAuYWxlcnRSb3cgc3BhbiB7XFxuICAgIGNvbG9yOiAjYTA5ZjlhOyB9XFxuXFxuLmRpbmdIb21lIC5hbGVydFJvdyBsYWJlbCB7XFxuICAgIGZsb2F0OiByaWdodDtcXG4gICAgY29sb3I6ICM0MDhkZGY7IH1cXG5cXG4uZGluZ0hvbWUgLmRpbmdIb21lLXRvcCB7XFxuICBoZWlnaHQ6IDE1MHB4O1xcbiAgd2lkdGg6IDEwMCU7XFxuICBib3JkZXI6IDFweCBzb2xpZCAjZWFlYWVhO1xcbiAgYm94LXNoYWRvdzogMXB4IDFweCAxcHggI2VhZWFlYTtcXG4gIGJhY2tncm91bmQ6ICNmZmY7XFxuICBib3JkZXItcmFkaXVzOiA1cHg7XFxuICAtbXMtZmxleDogMCAwIGF1dG87XFxuICAgICAgZmxleDogMCAwIGF1dG87IH1cXG5cXG4uZGluZ0hvbWUgLmRpbmdIb21lLXRvcCAud2FpdCB7XFxuICAgIHdpZHRoOiA5MSU7XFxuICAgIHBhZGRpbmc6IDAgM3B4O1xcbiAgICBoZWlnaHQ6IDQwcHg7XFxuICAgIGxpbmUtaGVpZ2h0OiA0MHB4OyB9XFxuXFxuLmRpbmdIb21lIC5kaW5nSG9tZS10b3AgLndhaXQgZGl2IHtcXG4gICAgICBjb2xvcjogI2QwZDBkNTtcXG4gICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICAgICAgcGFkZGluZy1sZWZ0OiAxMnB4OyB9XFxuXFxuLmRpbmdIb21lIC5kaW5nSG9tZS10b3AgLndhaXQgZGl2IHAge1xcbiAgICAgICAgbWFyZ2luOiAwIDAgMCA4cHg7XFxuICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IH1cXG5cXG4uZGluZ0hvbWUgLmRpbmdIb21lLXRvcCAud2FpdCBkaXYgcCBzcGFuIHtcXG4gICAgICAgICAgY29sb3I6ICNmNzc1NzU7IH1cXG5cXG4uZGluZ0hvbWUgLmRpbmdIb21lLXRvcCAud2FpdC1wbSB7XFxuICAgIGhlaWdodDogNjhweDtcXG4gICAgcGFkZGluZzogMTVweDtcXG4gICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNmOGY4Zjg7XFxuICAgIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICAtbXMtZmxleC13cmFwOiBub3dyYXA7XFxuICAgICAgICBmbGV4LXdyYXA6IG5vd3JhcDsgfVxcblxcbi5kaW5nSG9tZSAuZGluZ0hvbWUtdG9wIC53YWl0LXBtIHAge1xcbiAgICAgIGZsb2F0OiBsZWZ0O1xcbiAgICAgIGNvbG9yOiAjNjY2O1xcbiAgICAgIGZvbnQtc2l6ZTogMTRweDtcXG4gICAgICAtbXMtZmxleDogMTtcXG4gICAgICAgICAgZmxleDogMTsgfVxcblxcbi5kaW5nSG9tZSAuZGluZ0hvbWUtdG9wIC53YWl0LXBtIHAgc3BhbiB7XFxuICAgICAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgICAgIHBhZGRpbmc6IDE1cHg7XFxuICAgICAgICBoZWlnaHQ6IDQ1cHg7XFxuICAgICAgICBsaW5lLWhlaWdodDogNDVweDtcXG4gICAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7IH1cXG5cXG4uZGluZ0hvbWUgLmRpbmdIb21lLXRvcCAud2FpdC1wbSBwIC5zcGFuLW9uZSB7XFxuICAgICAgICBjb2xvcjogIzc4YzA2ZTsgfVxcblxcbi5kaW5nSG9tZSAuZGluZ0hvbWUtdG9wIC53YWl0LXBtIHAgLnNwYW4tdHdvIHtcXG4gICAgICAgIGNvbG9yOiAjNWM2YmMwOyB9XFxuXFxuLmRpbmdIb21lIC5kaW5nSG9tZS10b3AgLndhaXQtcG0gcCAuc3Bhbi10aHJlZSB7XFxuICAgICAgICBjb2xvcjogI2ZkOTQzZTsgfVxcblxcbi5kaW5nSG9tZSAuZGluZ0hvbWUtdG9wIC53YWl0LXBtIC53YWl0LXBtLWNlbnRlciB7XFxuICAgICAgdGV4dC1hbGlnbjogY2VudGVyOyB9XFxuXFxuLmRpbmdIb21lIC5kaW5nSG9tZS10b3AgLndhaXQtcG0gLndhaXQtcG0tbGFzdCB7XFxuICAgICAgdGV4dC1hbGlnbjogcmlnaHQ7IH1cXG5cXG4uZGluZ0hvbWUgLmRpbmdIb21lLWJvdHRvbSB7XFxuICB3aWR0aDogMTAwJTtcXG4gIG1hcmdpbi10b3A6IDEwcHg7XFxuICBib3gtc2hhZG93OiAxcHggMXB4IDFweCAjZWFlYWVhO1xcbiAgYmFja2dyb3VuZDogI2ZmZjtcXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcXG4gIC1tcy1mbGV4OiAxO1xcbiAgICAgIGZsZXg6IDE7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7IH1cXG5cXG4uZGluZ0hvbWUgLmRpbmdIb21lLWJvdHRvbSAucHAge1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIGhlaWdodDogMTAwcHg7XFxuICAgIGxpbmUtaGVpZ2h0OiAxMDBweDtcXG4gICAgY29sb3I6ICNkMGQwZDU7IH1cXG5cXG4uZGluZ0hvbWUgLmRpbmdIb21lLWJvdHRvbSAuYm90dG9tLXRpdGxlIHtcXG4gICAgaGVpZ2h0OiA0NHB4O1xcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2Y4ZjhmODtcXG4gICAgcGFkZGluZzogMCAxNXB4O1xcbiAgICBsaW5lLWhlaWdodDogNDRweDsgfVxcblxcbi5kaW5nSG9tZSAuZGluZ0hvbWUtYm90dG9tIC5ib3R0b20tdGl0bGUgcCB7XFxuICAgICAgZmxvYXQ6IGxlZnQ7XFxuICAgICAgY29sb3I6ICNkMGQwZDU7IH1cXG5cXG4uZGluZ0hvbWUgLmRpbmdIb21lLWJvdHRvbSAuYm90dG9tLXRpdGxlIGZvbnQge1xcbiAgICAgIGZsb2F0OiBsZWZ0O1xcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICAgIGxpbmUtaGVpZ2h0OiA0NHB4O1xcbiAgICAgIGZvbnQtc2l6ZTogMTJweDtcXG4gICAgICBjb2xvcjogI2QwZDBkNTtcXG4gICAgICBtYXJnaW46IDAgMCAwIDhweDsgfVxcblxcbi5kaW5nSG9tZSAuZGluZ0hvbWUtYm90dG9tIC5ib3R0b20tdGl0bGUgZm9udCBzcGFuIHtcXG4gICAgICAgIGNvbG9yOiAjZjc3NTc1OyB9XFxuXFxuLmRpbmdIb21lIC5kaW5nSG9tZS1ib3R0b20gLmJvdHRvbS10aXRsZSBzdmcge1xcbiAgICAgIG1hcmdpbjogMTFweCAwIDAgMDtcXG4gICAgICB3aWR0aDogMThweDtcXG4gICAgICBjb2xvcjogI2NkY2RkMTtcXG4gICAgICBoZWlnaHQ6IDE4cHg7XFxuICAgICAgZmxvYXQ6IHJpZ2h0OyB9XFxuXFxuLmRpbmdIb21lIC5kaW5nSG9tZS1ib3R0b20gLnRhbGtib3gge1xcbiAgICBvdmVyZmxvdy15OiBhdXRvO1xcbiAgICBvdmVyZmxvdy14OiBoaWRkZW47XFxuICAgIC13ZWJraXQtb3ZlcmZsb3ctc2Nyb2xsaW5nOiB0b3VjaDtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiA0NXB4O1xcbiAgICBsZWZ0OiAwO1xcbiAgICByaWdodDogMDtcXG4gICAgYm90dG9tOiAwOyB9XFxuXFxuLmRpbmdIb21lIC5kaW5nSG9tZS1ib3R0b20gLnRhbGtib3ggLnAge1xcbiAgICAgIGZsb2F0OiBsZWZ0O1xcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgICBoZWlnaHQ6IDMwcHg7XFxuICAgICAgbGluZS1oZWlnaHQ6IDMwcHg7XFxuICAgICAgd2lkdGg6IDEwMCU7XFxuICAgICAgZm9udC1zaXplOiAxMnB4O1xcbiAgICAgIGNvbG9yOiAjOTk5OyB9XFxuXFxuLmRpbmdIb21lIC5kaW5nSG9tZS1ib3R0b20gLnRhbGtib3ggLnAgLmxvYWRfbG9hZGluZyB7XFxuICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICAgICAgICBwb3NpdGlvbjogaW5oZXJpdDtcXG4gICAgICAgIHdpZHRoOiBhdXRvO1xcbiAgICAgICAgbWluLWhlaWdodDogYXV0bztcXG4gICAgICAgIG1hcmdpbjogMCA3cHggMCAwOyB9XFxuXFxuLmRpbmdIb21lIC5kaW5nSG9tZS1ib3R0b20gLnRhbGtib3ggLnRhbGtsaXN0Omxhc3QtY2hpbGQge1xcbiAgICAgIGJvcmRlcjogMDsgfVxcblxcbi5kaW5nSG9tZSAuZGluZ0hvbWUtYm90dG9tIC50YWxrYm94IC50YWxrbGlzdCB7XFxuICAgICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNmOGY4Zjg7XFxuICAgICAgcGFkZGluZzogMjBweCAxNXB4O1xcbiAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgICBoZWlnaHQ6IDkxcHg7XFxuICAgICAgZmxvYXQ6IGxlZnQ7XFxuICAgICAgd2lkdGg6IDEwMCU7IH1cXG5cXG4uZGluZ0hvbWUgLmRpbmdIb21lLWJvdHRvbSAudGFsa2JveCAudGFsa2xpc3QgLmljb24ge1xcbiAgICAgICAgd2lkdGg6IDUwcHg7XFxuICAgICAgICBoZWlnaHQ6IDUwcHg7XFxuICAgICAgICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICAgICAgICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICAgICAgbGluZS1oZWlnaHQ6IDUwcHg7XFxuICAgICAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xcbiAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgICAgICAgYmFja2dyb3VuZDogIzVjNmJjMDtcXG4gICAgICAgIGNvbG9yOiAjZTZlOGY1O1xcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjsgfVxcblxcbi5kaW5nSG9tZSAuZGluZ0hvbWUtYm90dG9tIC50YWxrYm94IC50YWxrbGlzdCAudGFza2xpc3Qge1xcbiAgICAgICAgcGFkZGluZzogMCAwIDAgMTVweDtcXG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgICAgIHRvcDogMjBweDtcXG4gICAgICAgIGxlZnQ6IDY1cHg7XFxuICAgICAgICByaWdodDogMTVweDsgfVxcblxcbi5kaW5nSG9tZSAuZGluZ0hvbWUtYm90dG9tIC50YWxrYm94IC50YWxrbGlzdCAudGFza2xpc3QgLmRkIHtcXG4gICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICAgICAgICB3aWR0aDogOHB4O1xcbiAgICAgICAgICBoZWlnaHQ6IDhweDtcXG4gICAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgICAgICAgICBiYWNrZ3JvdW5kOiAjZjY1ZTVlO1xcbiAgICAgICAgICByaWdodDogMXB4O1xcbiAgICAgICAgICB0b3A6IDNweDsgfVxcblxcbi5kaW5nSG9tZSAuZGluZ0hvbWUtYm90dG9tIC50YWxrYm94IC50YWxrbGlzdCAudGFza2xpc3QgLmh1aSB7XFxuICAgICAgICAgIGJhY2tncm91bmQ6ICM5OTk7IH1cXG5cXG4uZGluZ0hvbWUgLmRpbmdIb21lLWJvdHRvbSAudGFsa2JveCAudGFsa2xpc3QgLnRhc2tsaXN0IHAge1xcbiAgICAgICAgICBjb2xvcjogIzY2NjtcXG4gICAgICAgICAgZm9udC1zaXplOiAxNHB4O1xcbiAgICAgICAgICBwYWRkaW5nOiA1cHggMCAwIDA7IH1cXG5cXG4uZGluZ0hvbWUgLmRpbmdIb21lLWJvdHRvbSAudGFsa2JveCAudGFsa2xpc3QgLnRhc2tsaXN0IHA6bGFzdC1jaGlsZCB7XFxuICAgICAgICAgIGNvbG9yOiAjYzdjN2NjO1xcbiAgICAgICAgICBmb250LXNpemU6IDEycHg7IH1cXG5cXG4uZGluZ0hvbWUgLmRpbmdIb21lLWJvdHRvbSAudGFsa2JveCAudGFsa2xpc3QgLnRhc2tsaXN0IC50YXNrbGlzdC1maXJzdCB7XFxuICAgICAgICAgIGNvbG9yOiAjNjY2O1xcbiAgICAgICAgICBmb250LXNpemU6IDE0cHg7XFxuICAgICAgICAgIHBhZGRpbmc6IDA7IH1cXG5cXG4uZGluZ0hvbWUgLmRpbmdIb21lLWJvdHRvbSAudGFsa2JveCAudGFsa2xpc3QgLnRhc2tsaXN0IC50YXNrbGlzdC1maXJzdCBzcGFuIHtcXG4gICAgICAgICAgICBtYXJnaW46IDAgNXB4IDAgMDsgfVxcblxcbi5kaW5nSG9tZSAuZGluZ0hvbWUtYm90dG9tIC50YWxrYm94IC50YWxrbGlzdCAudGFza2xpc3QgLnRhc2tsaXN0LWZpcnN0IGkge1xcbiAgICAgICAgICAgIGZvbnQtc3R5bGU6IG5vcm1hbDsgfVxcblxcbi5hbS1wb3BvdmVyLW1hc2sge1xcbiAgZGlzcGxheTogbm9uZTsgfVxcblxcbi5hbS1wb3BvdmVyIHtcXG4gIGRpc3BsYXk6IG5vbmU7IH1cXG5cIiJdfQ== */\n/*@ sourceURL=styles\\pages\\dingHome.scss */";
  __styledJsxDefaultExport.__scopedHash = "22612248923";
  module.exports = __styledJsxDefaultExport;
})();

/***/ }),

/***/ 638:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SEARCH = exports.TASKLOG_LIST_GROUP = undefined;
exports.content = content;
exports.findGroupPageIndex = findGroupPageIndex;

var _httpClient = __webpack_require__(554);

var _httpClient2 = _interopRequireDefault(_httpClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TASKLOG_LIST_GROUP = exports.TASKLOG_LIST_GROUP = "TASKLOG_LIST_GROUP";
var SEARCH = exports.SEARCH = "SEARCH";
function content(data, type) {
  return {
    type: type,
    payload: data
  };
}
//动态讨论列表
function findGroupPageIndex() {
  var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  var pageSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 50;
  var data = arguments[2];
  var fn = arguments[3];

  return function (dispatch) {
    _httpClient2.default.AjaxPostSync("/tasklog/findGroupPageIndex?pageNo=" + page + "&pageSize=" + pageSize, data, function (list) {
      if (fn) {
        fn();
      }
      dispatch(content(data, SEARCH));
      dispatch(content({ list: list, pageNo: page }, TASKLOG_LIST_GROUP));
    });
  };
}

{
  /*
  //项目日志
  export function findBytaskinfoId(id) {
     return (dispatch) => {
        HttpClient.AjaxPost('/tasklog/findBytaskinfoId?id='+id, {}, list => {
            dispatch(content(list, TASKLOG_TASKINFO))
        })
    }
  }
  //项目日志
  export function findList(page=1,type,date) {
     return (dispatch) => {
        HttpClient.AjaxPost('/tasklog/findList?page='+page, {type:type,date:date}, list => {
            dispatch(content(list, TASKLOG_LIST))
        })
    }
  }
  //项目分组日志
  export function findGroupPageIndex(page=1,data,fn) {
    page = page + 1;
    return (dispatch) => {
       HttpClient.AjaxPost('/tasklog/findGroupPageIndex?pageNo='+page, data, list => {
           if(fn){
                fn();
           }
           dispatch(content(list, TASKLOG_LIST_GROUP))
       })
   }
  }
  */
}

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } if (typeof module.exports === 'function') { __REACT_HOT_LOADER__.register(module.exports, 'module.exports', "D:\\work\\phone-new\\actions\\dynamic.js"); return; } for (var key in module.exports) { if (!Object.prototype.hasOwnProperty.call(module.exports, key)) { continue; } var namedExport = void 0; try { namedExport = module.exports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "D:\\work\\phone-new\\actions\\dynamic.js"); } } })();

/***/ }),

/***/ 639:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FEED_ADD = undefined;
exports.save = save;
exports.content = content;

var _httpClient = __webpack_require__(554);

var _httpClient2 = _interopRequireDefault(_httpClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FEED_ADD = exports.FEED_ADD = 'FEED_ADD';


//添加意见反馈
function save(mail, remarks) {
    return function (dispatch) {
        _httpClient2.default.AjaxPost('/feedback/save', { mail: mail, remarks: remarks }, function (list) {
            dispatch(content(list, FEED_ADD));
        });
    };
}

function content(data, type) {
    return {
        type: type,
        payload: data
    };
}

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } if (typeof module.exports === 'function') { __REACT_HOT_LOADER__.register(module.exports, 'module.exports', "D:\\work\\phone-new\\actions\\feedback.js"); return; } for (var key in module.exports) { if (!Object.prototype.hasOwnProperty.call(module.exports, key)) { continue; } var namedExport = void 0; try { namedExport = module.exports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "D:\\work\\phone-new\\actions\\feedback.js"); } } })();

/***/ }),

/***/ 640:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.HEHPS_DETAIL = exports.HEHPS_TYPE_LIST = exports.HEHPS_LIST = undefined;
exports.findList = findList;
exports.findTypeList = findTypeList;
exports.getDetail = getDetail;
exports.content = content;

var _httpClient = __webpack_require__(554);

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

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } if (typeof module.exports === 'function') { __REACT_HOT_LOADER__.register(module.exports, 'module.exports', "D:\\work\\phone-new\\actions\\help.js"); return; } for (var key in module.exports) { if (!Object.prototype.hasOwnProperty.call(module.exports, key)) { continue; } var namedExport = void 0; try { namedExport = module.exports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "D:\\work\\phone-new\\actions\\help.js"); } } })();

/***/ }),

/***/ 641:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ADD_PERSON_LABEL = exports.PERSON_LABEL = exports.ADD_LABEL_USER = exports.ADD_LABEL = exports.LABEL_USER = exports.PUBLIC_LABEL_LIST = exports.ADD_PROJECT_TYPE = exports.PROJECT_TYPE_LIST = exports.TAG_LIST = exports.LABEL_LIST = undefined;
exports.getLabelListByUser = getLabelListByUser;
exports.getTagList = getTagList;
exports.getProjectTypeList = getProjectTypeList;
exports.addProjectType = addProjectType;
exports.getLabelList = getLabelList;
exports.findLabelUser = findLabelUser;
exports.addLabel = addLabel;
exports.addLabelUser = addLabelUser;
exports.getPersonLabel = getPersonLabel;
exports.addPersonLabel = addPersonLabel;
exports.content = content;

var _httpClient = __webpack_require__(554);

var _httpClient2 = _interopRequireDefault(_httpClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LABEL_LIST = exports.LABEL_LIST = 'LABEL_LIST';
var TAG_LIST = exports.TAG_LIST = 'TAG_LIST';
var PROJECT_TYPE_LIST = exports.PROJECT_TYPE_LIST = 'PROJECT_TYPE_LIST';
var ADD_PROJECT_TYPE = exports.ADD_PROJECT_TYPE = 'ADD_PROJECT_TYPE';
var PUBLIC_LABEL_LIST = exports.PUBLIC_LABEL_LIST = 'PUBLIC_LABEL_LIST';
var LABEL_USER = exports.LABEL_USER = 'LABEL_USER';
var ADD_LABEL = exports.ADD_LABEL = 'ADD_LABEL';
var ADD_LABEL_USER = exports.ADD_LABEL_USER = 'ADD_LABEL_USER';
var PERSON_LABEL = exports.PERSON_LABEL = 'PERSON_LABEL';
var ADD_PERSON_LABEL = exports.ADD_PERSON_LABEL = 'ADD_PERSON_LABEL';


// 获取所有标签
function getLabelListByUser(fn) {
    return function (dispatch) {
        _httpClient2.default.AjaxPost('/label/findLabelByUser', '', function (list) {
            if (fn) {
                fn();
            }
            dispatch(content(list, LABEL_LIST));
        });
    };
}

// 获取标签列表
/*
 * 返回值 type:'1'  个人标签
 *        type:'2'  公共标签
 *        type:'3'  项目分类
 */
function getTagList(fn) {
    return function (dispatch) {
        _httpClient2.default.AjaxPost('/label/findLabelAll', '', function (list) {
            if (fn) {
                fn();
            }
            dispatch(content(list, TAG_LIST));
        });
    };
}

// 获取项目分类列表
function getProjectTypeList(fn) {
    return function (dispatch) {
        _httpClient2.default.AjaxPost('/label/labelProjectList', '', function (list) {
            if (fn) {
                fn();
            }
            dispatch(content(list, PROJECT_TYPE_LIST));
        });
    };
}
//添加项目分类
function addProjectType(data, pid, fn) {
    return function (dispatch) {
        _httpClient2.default.AjaxPost('/label/addProjectLabel?pid=' + pid, data, function (list) {
            if (fn) {
                fn();
            }
            dispatch(content(list, ADD_PROJECT_TYPE));
        });
    };
}

//获取标签列表
function getLabelList(fn) {
    return function (dispatch) {
        _httpClient2.default.AjaxPost('/label/labelUserList', '', function (list) {
            if (fn) {
                fn();
            }
            dispatch(content(list, PUBLIC_LABEL_LIST));
        });
    };
}
//通过标签获取用户
function findLabelUser(id, fn) {
    return function (dispatch) {
        _httpClient2.default.AjaxPost('/label/findLabelUser?lid=' + id, '', function (list) {
            if (fn) {
                fn();
            }
            dispatch(content(list, LABEL_USER));
        });
    };
}
//添加标签
function addLabel(data, pid, fn) {
    return function (dispatch) {
        _httpClient2.default.AjaxPost('/label/addLabel?pid=' + pid, data, function (list) {
            if (fn) {
                fn();
            }
            dispatch(content(list, ADD_LABEL));
        });
    };
}

//标签添加用户
function addLabelUser(userId, lid, fn) {
    return function (dispatch) {
        _httpClient2.default.AjaxPost('/label/addLabelUser', { 'userList': userId, 'label': { id: lid } }, function (list) {
            if (fn) {
                fn();
            }
            dispatch(content(list, ADD_LABEL_USER));
        });
    };
}

//获取个人标签
function getPersonLabel(fn) {
    return function (dispatch) {
        _httpClient2.default.AjaxPost('/label/getPersonLabel', '', function (list) {
            if (fn) {
                fn();
            }
            dispatch(content(list, PERSON_LABEL));
        });
    };
}

//添加个人标签
function addPersonLabel(name, pid, fn) {
    return function (dispatch) {
        _httpClient2.default.AjaxPost('/label/addPersonLabel?pid=' + pid, name, function (list) {
            if (fn) {
                fn();
            }
            dispatch(content(list, ADD_PERSON_LABEL));
        });
    };
}

function content(data, type) {
    return {
        type: type,
        payload: data
    };
}

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } if (typeof module.exports === 'function') { __REACT_HOT_LOADER__.register(module.exports, 'module.exports', "D:\\work\\phone-new\\actions\\label.js"); return; } for (var key in module.exports) { if (!Object.prototype.hasOwnProperty.call(module.exports, key)) { continue; } var namedExport = void 0; try { namedExport = module.exports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "D:\\work\\phone-new\\actions\\label.js"); } } })();

/***/ }),

/***/ 642:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.PROJECT_SELECT_LISTCOUNT = exports.PROJECT_USERINFO = exports.OPEN_PROJECT = exports.CREATE_PROJECT = exports.GET_PROJECT_CREATE_INFO_BY_ID = exports.CANCEL_ATTENTION_WITCH_PROJECT = exports.ADD_ATTENTION_WITCH_PROJECT = exports.PROJECT_UPDET_ALL = exports.PROJECT_DETAILS = exports.PROJECT_ADD = exports.PROJECT_LIST_JURISDICTION = exports.PROJECT_LIST = undefined;
exports.getProjectListByTypeJurisdiction = getProjectListByTypeJurisdiction;
exports.getProjectListByType = getProjectListByType;
exports.saveProjectUserInfo = saveProjectUserInfo;
exports.saveProjectSelectListCount = saveProjectSelectListCount;
exports.projectDetails = projectDetails;
exports.projectUpdateAll = projectUpdateAll;
exports.content = content;
exports.addAttentionWitchProject = addAttentionWitchProject;
exports.cancelAttentionWitchProject = cancelAttentionWitchProject;
exports.getProjectCreateInfoById = getProjectCreateInfoById;
exports.getProjectCreateInfoById2 = getProjectCreateInfoById2;
exports.createProject = createProject;
exports.getChartByUserTask = getChartByUserTask;
exports.getChartByUserMoney = getChartByUserMoney;
exports.getChartByTaskSituation = getChartByTaskSituation;
exports.getChartByProjectProgress = getChartByProjectProgress;
exports.setOpenProject = setOpenProject;

var _httpClient = __webpack_require__(554);

var _httpClient2 = _interopRequireDefault(_httpClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PROJECT_LIST = exports.PROJECT_LIST = "PROJECT_LIST";
var PROJECT_LIST_JURISDICTION = exports.PROJECT_LIST_JURISDICTION = "PROJECT_LIST_JURISDICTION";
var PROJECT_ADD = exports.PROJECT_ADD = "PROJECT_ADD";
var PROJECT_DETAILS = exports.PROJECT_DETAILS = "PROJECT_DETAILS";
var PROJECT_UPDET_ALL = exports.PROJECT_UPDET_ALL = "PROJECT_UPDET_ALL";
var ADD_ATTENTION_WITCH_PROJECT = exports.ADD_ATTENTION_WITCH_PROJECT = "ADD_ATTENTION_WITCH_PROJECT";
var CANCEL_ATTENTION_WITCH_PROJECT = exports.CANCEL_ATTENTION_WITCH_PROJECT = "CANCEL_ATTENTION_WITCH_PROJECT";
var GET_PROJECT_CREATE_INFO_BY_ID = exports.GET_PROJECT_CREATE_INFO_BY_ID = "GET_PROJECT_CREATE_INFO_BY_ID";
var CREATE_PROJECT = exports.CREATE_PROJECT = "CREATE_PROJECT";
var OPEN_PROJECT = exports.OPEN_PROJECT = "OPEN_PROJECT";
var PROJECT_USERINFO = exports.PROJECT_USERINFO = "PROJECT_USERINFO";
var PROJECT_SELECT_LISTCOUNT = exports.PROJECT_SELECT_LISTCOUNT = "PROJECT_SELECT_LISTCOUNT";
// 获取项目列表
function getProjectListByTypeJurisdiction(data, pageNo) {
	var pageSize = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 50;
	var fn = arguments[3];

	return function (dispatch) {
		_httpClient2.default.AjaxPostSync("/project/getProjectIds?pageNo=" + pageNo + "&pageSize=" + pageSize, data, function (list) {
			if (fn) {
				fn();
			}
			dispatch(content(list, PROJECT_LIST_JURISDICTION));
		});
	};
}
// 获取项目列表
function getProjectListByType(data, pageNo) {
	var pageSize = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 50;
	var fn = arguments[3];

	return function (dispatch) {
		_httpClient2.default.AjaxPostSync("/project/projectPageIndex?pageNo=" + pageNo + "&pageSize=" + pageSize, data, function (list) {
			if (fn) {
				fn(list);
			}
			// dispatch(content(list, PROJECT_LIST));
		});
	};
}
//保存选择的负责人详细信息
function saveProjectUserInfo(data) {
	return {
		type: PROJECT_USERINFO,
		payload: data
	};
}
//选择条件的总列表数目
function saveProjectSelectListCount(data) {
	return {
		type: "PROJECT_SELECT_LISTCOUNT",
		payload: data
	};
}

//获取项目详情
function projectDetails(id, fn) {
	return function (dispatch) {
		_httpClient2.default.AjaxPost("/project/projectDetails?id=" + id, "", function (list) {
			if (fn) {
				fn();
			}
			dispatch(content(list, PROJECT_DETAILS));
		});
	};
}
//修改项目
function projectUpdateAll(project, fn) {
	return function (dispatch) {
		_httpClient2.default.AjaxPost("/project/projectUpdate", project, function (list) {
			if (fn) {
				fn();
			}
			dispatch(content(list, PROJECT_UPDET_ALL));
		});
	};
}
function content(data, type) {
	return {
		type: type,
		payload: data
	};
}

// 关注项目
function addAttentionWitchProject(objectId, fn) {
	var data = { rtype: "a", objectId: objectId };
	return function (dispatch) {
		_httpClient2.default.AjaxPost("/collect/collect", data, function (list) {
			if (fn) {
				fn(list);
			}
			// dispatch(content(list, ADD_ATTENTION_WITCH_PROJECT));
		});
	};
}
// 取消关注项目
function cancelAttentionWitchProject(objectId, fn) {
	var data = { rtype: "a", objectId: objectId };
	return function (dispatch) {
		_httpClient2.default.AjaxPost("/collect/callCollect", data, function (list) {
			if (fn) {
				fn(list);
			}
			// dispatch(content(list, CANCEL_ATTENTION_WITCH_PROJECT));
		});
	};
}

// 获取项目设置的数据
function getProjectCreateInfoById(id, fn) {
	return function (dispatch) {
		_httpClient2.default.AjaxPost("/project/projectDetailsNew?id=" + id, "", function (list) {
			if (fn) {
				fn();
			}
			dispatch(content(list, GET_PROJECT_CREATE_INFO_BY_ID));
		});
	};
}
// 获取项目设置的数据,返回格式和列表格式相同，就是为了更新列表的
function getProjectCreateInfoById2(id, fn) {
	return function (dispatch) {
		_httpClient2.default.AjaxPost("/project/getProjectById?id=" + id, "", function (list) {
			if (fn) {
				fn(list);
			}
		});
	};
}
// 创建修改项目
function createProject(data, fn) {
	return function (dispatch) {
		_httpClient2.default.AjaxPost("/project/projectAddNew", data, function (list) {
			if (fn) {
				fn(list);
			}
			dispatch(content(list, CREATE_PROJECT));
		});
	};
}

// 人员任务统计
function getChartByUserTask(data, callback) {
	_httpClient2.default.AjaxPost("/calculate/getTasktableCount", data, function (list) {
		callback(list);
	});
}

// 人员绩效统计
function getChartByUserMoney(data, callback) {
	_httpClient2.default.AjaxPost("/calculate/getContenTableData", data, function (list) {
		callback(list);
	});
}

// 任务概述统计
function getChartByTaskSituation(id, callback) {
	_httpClient2.default.AjaxPost("/calculate/project?id=" + id, "", function (list) {
		callback(list);
	});
}

// 项目进展统计
function getChartByProjectProgress(data, callback) {
	_httpClient2.default.AjaxPost("/calculate/getProgressView", data, function (list) {
		callback(list);
	});
}

// 当前打开的项目
function setOpenProject(project) {
	return function (dispatch) {
		dispatch(content(project, OPEN_PROJECT));
	};
}

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } if (typeof module.exports === 'function') { __REACT_HOT_LOADER__.register(module.exports, 'module.exports', "D:\\work\\phone-new\\actions\\project.js"); return; } for (var key in module.exports) { if (!Object.prototype.hasOwnProperty.call(module.exports, key)) { continue; } var namedExport = void 0; try { namedExport = module.exports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "D:\\work\\phone-new\\actions\\project.js"); } } })();

/***/ }),

/***/ 643:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PROJECT_IDS = exports.PROJECT_TYPE = exports.ST_PROJECT_LIST = exports.MONTH_TYPE = exports.PERFORM_TYPE = exports.TASK_NUMS_PERSON = exports.TASK_NUMS_PROJECT = exports.PEN_PERSON = exports.PEN_PROJECT = exports.PIE_CHAT = undefined;
exports.content = content;
exports.getAllTaskDistributedByState = getAllTaskDistributedByState;
exports.getAllPendStatistics = getAllPendStatistics;
exports.getAllNumByPerson = getAllNumByPerson;
exports.getAllNumByProject = getAllNumByProject;
exports.getTaskDistributedByState = getTaskDistributedByState;
exports.getPendStatistics = getPendStatistics;
exports.getPendByProject = getPendByProject;
exports.getNumByProject = getNumByProject;
exports.getNumByPerson = getNumByPerson;
exports.getProjectResult = getProjectResult;
exports.saveProjectResult = saveProjectResult;
exports.getProjectList = getProjectList;
exports.saveMonthType = saveMonthType;
exports.savePerformType = savePerformType;

var _httpClient = __webpack_require__(554);

var _httpClient2 = _interopRequireDefault(_httpClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PIE_CHAT = exports.PIE_CHAT = "PIE_CHAT";
var PEN_PROJECT = exports.PEN_PROJECT = "PEN_PROJECT";
var PEN_PERSON = exports.PEN_PERSON = "PEN_PERSON";
var TASK_NUMS_PROJECT = exports.TASK_NUMS_PROJECT = "TASK_NUMS_PROJECT";
var TASK_NUMS_PERSON = exports.TASK_NUMS_PERSON = "TASK_NUMS_PERSON";

var PERFORM_TYPE = exports.PERFORM_TYPE = "PERFORM_TYPE";
var MONTH_TYPE = exports.MONTH_TYPE = "MONTH_TYPE";

var ST_PROJECT_LIST = exports.ST_PROJECT_LIST = "ST_PROJECT_LIST";

var PROJECT_TYPE = exports.PROJECT_TYPE = "PROJECT_TYPE";

var PROJECT_IDS = exports.PROJECT_IDS = "PROJECT_IDS";

function content(data, type) {
  return {
    type: type,
    payload: data
  };
}

function getAllTaskDistributedByState() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var fn = arguments[1];

  _httpClient2.default.AjaxPost("/calculate/getTaskDistributedByState", data, function (list) {
    if (fn) {
      if (list && list.data) {
        fn(list.data);
      }
    }
  });
}

function getAllPendStatistics() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var fn = arguments[1];

  _httpClient2.default.AjaxPost("/calculate/getPendStatistics", data, function (list) {
    if (fn) {
      fn(list.data);
    }
  });
}

function getAllNumByPerson() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var fn = arguments[1];

  _httpClient2.default.AjaxPost("/calculate/getContentByPerson", data, function (list) {
    if (fn) {
      fn(list.data);
    }
  });
}

function getAllNumByProject() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var fn = arguments[1];

  _httpClient2.default.AjaxPost("/calculate/getNumByPerson", data, function (list) {
    if (fn) {
      fn(list.data);
    }
  });
}

function getTaskDistributedByState() {
  var projectIds = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var callback = arguments[1];

  return function (dispatch) {
    _httpClient2.default.AjaxPost("/calculate/getTaskDistributedByState", projectIds, function (list) {
      if (callback) callback();
      var data = [];
      if (list && list.data && list.data.data) {
        data = list.data.data;
      }
      dispatch(content(data, PIE_CHAT));
    });
  };
}

//根据项目id查询待办统计（按项目）
// export function getProjectStatistics(projectIds = {}) {
//   return dispatch => {
//     HttpClient.AjaxPost("/project/getStatisticsIndex", {}, list => {
//       dispatch(content(list.data, PIE_CHAT));
//     });
//   };
// }

//根据项目id查询待办统计（按人员）
function getPendStatistics() {
  var projectIds = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return function (dispatch) {
    _httpClient2.default.AjaxPost("/calculate/getPendStatistics", projectIds, function (list) {
      dispatch(content(list.data, PEN_PERSON));
    });
  };
}

//待办统计 按项目
function getPendByProject() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return function (dispatch) {
    _httpClient2.default.AjaxPost("/calculate/getPendByProject", data, function (list) {
      dispatch(content(list.data, PEN_PROJECT));
    });
  };
}

//根据项目id查询 绩效统计(绩效值) 按人员
function getNumByProject() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return function (dispatch) {
    _httpClient2.default.AjaxPost("/calculate/getNumByPerson", data, function (list) {
      dispatch(content(list.data, TASK_NUMS_PROJECT));
    });
  };
}
//绩效按人员taskPersonList
function getNumByPerson() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return function (dispatch) {
    _httpClient2.default.AjaxPost("/calculate/getContentByPerson", data, function (list) {
      dispatch(content(list.data, TASK_NUMS_PERSON));
    });
  };
}

function getProjectResult() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var fn = arguments[1];

  var projectType = data.type;
  return function (dispatch) {
    _httpClient2.default.AjaxPost("/project/getProjectResult", data, function (list) {
      var projectList = [];
      if (list.data && list.data.projectList) {
        projectList = list.data.projectList;
      }
      dispatch(content(projectList, ST_PROJECT_LIST));
      dispatch(content(projectType, PROJECT_TYPE));
      if (fn) {
        if (list.data && list.data.projectList) {
          fn(projectList);
        }
      }
    });
  };
}

function saveProjectResult() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return function (dispatch) {
    dispatch(content(data.projectList, ST_PROJECT_LIST));
    dispatch(content(data.projectIds, PROJECT_IDS));
    dispatch(content(data.projectType, PROJECT_TYPE));
  };
}

function getProjectList() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var fn = arguments[1];

  _httpClient2.default.AjaxPost("/project/getProjectResult", data, function (list) {
    if (fn) {
      fn(list.data.projectList);
    }
  });
}

//存
function saveMonthType(data) {
  return function (dispatch) {
    dispatch(content(data, MONTH_TYPE));
  };
}

//存
function savePerformType(data) {
  return function (dispatch) {
    dispatch(content(data, PERFORM_TYPE));
  };
}

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } if (typeof module.exports === 'function') { __REACT_HOT_LOADER__.register(module.exports, 'module.exports', "D:\\work\\phone-new\\actions\\statistics.js"); return; } for (var key in module.exports) { if (!Object.prototype.hasOwnProperty.call(module.exports, key)) { continue; } var namedExport = void 0; try { namedExport = module.exports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "D:\\work\\phone-new\\actions\\statistics.js"); } } })();

/***/ }),

/***/ 644:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FREE_LIMIT = undefined;
exports.content = content;
exports.getLimtTask = getLimtTask;
exports.getLimtProject = getLimtProject;
exports.getFreeLimit = getFreeLimit;

var _httpClient = __webpack_require__(554);

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

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } if (typeof module.exports === 'function') { __REACT_HOT_LOADER__.register(module.exports, 'module.exports', "D:\\work\\phone-new\\actions\\version.js"); return; } for (var key in module.exports) { if (!Object.prototype.hasOwnProperty.call(module.exports, key)) { continue; } var namedExport = void 0; try { namedExport = module.exports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "D:\\work\\phone-new\\actions\\version.js"); } } })();

/***/ }),

/***/ 645:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = __webpack_require__(559);

var _stringify2 = _interopRequireDefault(_stringify);

var _getPrototypeOf = __webpack_require__(28);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(13);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(14);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(30);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(29);

var _inherits3 = _interopRequireDefault(_inherits2);

__webpack_require__(613);

var _react = __webpack_require__(11);

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

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } if (typeof module.exports === 'function') { __REACT_HOT_LOADER__.register(module.exports, 'module.exports', "D:\\work\\phone-new\\api\\fetchFn.js"); return; } for (var key in module.exports) { if (!Object.prototype.hasOwnProperty.call(module.exports, key)) { continue; } var namedExport = void 0; try { namedExport = module.exports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "D:\\work\\phone-new\\api\\fetchFn.js"); } } })();

/***/ }),

/***/ 646:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _localeProvider = __webpack_require__(598);

var _localeProvider2 = _interopRequireDefault(_localeProvider);

var _getPrototypeOf = __webpack_require__(28);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(13);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(14);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(30);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(29);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(11);

var _react2 = _interopRequireDefault(_react);

var _en_US = __webpack_require__(597);

var _en_US2 = _interopRequireDefault(_en_US);

var _nprogress = __webpack_require__(630);

var _nprogress2 = _interopRequireDefault(_nprogress);

var _index = __webpack_require__(83);

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

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } if (typeof module.exports === 'function') { __REACT_HOT_LOADER__.register(module.exports, 'module.exports', "D:\\work\\phone-new\\components\\Layout.js"); return; } for (var key in module.exports) { if (!Object.prototype.hasOwnProperty.call(module.exports, key)) { continue; } var namedExport = void 0; try { namedExport = module.exports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "D:\\work\\phone-new\\components\\Layout.js"); } } })();

/***/ }),

/***/ 647:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _getPrototypeOf = __webpack_require__(28);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(13);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(14);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(30);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(29);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(11);

var _react2 = _interopRequireDefault(_react);

var _loading = __webpack_require__(627);

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

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } if (typeof module.exports === 'function') { __REACT_HOT_LOADER__.register(module.exports, 'module.exports', "D:\\work\\phone-new\\components\\Loading.js"); return; } for (var key in module.exports) { if (!Object.prototype.hasOwnProperty.call(module.exports, key)) { continue; } var namedExport = void 0; try { namedExport = module.exports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "D:\\work\\phone-new\\components\\Loading.js"); } } })();

/***/ }),

/***/ 648:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _icon = __webpack_require__(557);

var _icon2 = _interopRequireDefault(_icon);

var _defineProperty2 = __webpack_require__(555);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _getPrototypeOf = __webpack_require__(28);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(13);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(14);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(30);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(29);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(11);

var _react2 = _interopRequireDefault(_react);

var _index = __webpack_require__(83);

var _index2 = _interopRequireDefault(_index);

var _store = __webpack_require__(581);

var _nextReduxWrapper = __webpack_require__(573);

var _nextReduxWrapper2 = _interopRequireDefault(_nextReduxWrapper);

var _alert = __webpack_require__(580);

var _alert2 = _interopRequireDefault(_alert);

var _version = __webpack_require__(644);

var versionAction = _interopRequireWildcard(_version);

var _redux = __webpack_require__(556);

var _storage = __webpack_require__(558);

var _storage2 = _interopRequireDefault(_storage);

var _user = __webpack_require__(564);

var userAction = _interopRequireWildcard(_user);

var _menuBar = __webpack_require__(628);

var _menuBar2 = _interopRequireDefault(_menuBar);

var _utils = __webpack_require__(565);

var _utils2 = _interopRequireDefault(_utils);

var _dingtalk = __webpack_require__(561);

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

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } if (typeof module.exports === 'function') { __REACT_HOT_LOADER__.register(module.exports, 'module.exports', "D:\\work\\phone-new\\components\\MenuBar.js"); return; } for (var key in module.exports) { if (!Object.prototype.hasOwnProperty.call(module.exports, key)) { continue; } var namedExport = void 0; try { namedExport = module.exports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "D:\\work\\phone-new\\components\\MenuBar.js"); } } })();

/***/ }),

/***/ 649:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = cache;

var _assign = __webpack_require__(93);

var _assign2 = _interopRequireDefault(_assign);

var _cache = __webpack_require__(578);

var types = _interopRequireWildcard(_cache);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState = {
	taskListFromCache: [],
	projectListFromCache: [],
	dynamicListFromCache: [],
	taskCountFromCache: 0,
	taskPageCountFromCache: 0,
	projectPageCountFromCache: 0,
	dynamicPageCountFromCache: 0,
	taskTextFromCache: "",
	taskListToDel: [],
	taskCountToDel: 0,
	taskTextToDel: "",
	taskAllCountToDel: 0,
	taskScrollTop: 0,
	dynamicScrollTop: 0,
	homeScrollTop: 0,
	taskCondition: "",
	projectText: "", //项目搜索关键字
	projectType: "",
	projectScroll: 0,
	projectAllPage: 0,
	projectTaskList: [],
	projectTaskAllCount: 0,
	projectTaskScroll: 0,
	projectConditionFromCache: {},
	projectNowPage: 1, //显示当前页码
	projectTagList: [] //项目筛选出的标签数据
};
function cache() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
	var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	switch (action.type) {
		case types.PROJECT_NOW_PAGE:
			return (0, _assign2.default)({}, state, {
				projectNowPage: action.payload
			});
		case types.PROJECT_TAGLIST:
			return (0, _assign2.default)({}, state, {
				projectTagList: action.payload
			});
		case types.PROJECT_CONDITION:
			return (0, _assign2.default)({}, state, {
				projectConditionFromCache: action.payload
			});
		case types.DYNAMICSCROLLTOP:
			return (0, _assign2.default)({}, state, {
				dynamicScrollTop: action.payload
			});
		case types.HOMESCROLLTOP:
			return (0, _assign2.default)({}, state, {
				homeScrollTop: action.payload
			});
		case types.TASKLIST:
			return (0, _assign2.default)({}, state, {
				taskListFromCache: action.payload
			});
		case types.PROJECTLIST:
			return (0, _assign2.default)({}, state, {
				projectListFromCache: action.payload
			});
		case types.SET_PROJECTLIST:
			var oldProject = [];
			oldProject = state.projectListFromCache;
			if (action.payload.projectId == "") {
				// debugger;
				oldProject.splice(0, 0, action.payload.data);
			} else {
				oldProject.map(function (item, index) {
					if (item.id == action.payload.projectId) {
						oldProject.splice(index, 1, action.payload.data);
						return false;
					}
				});
			}
			return (0, _assign2.default)({}, state, {
				projectListFromCache: oldProject
			});
		case types.DYNAMICLIST:
			return (0, _assign2.default)({}, state, {
				dynamicListFromCache: action.payload
			});
		case types.TASKCOUNT:
			return (0, _assign2.default)({}, state, {
				taskCountFromCache: action.payload
			});
		case types.TASKPAGECOUNT:
			return (0, _assign2.default)({}, state, {
				taskPageCountFromCache: action.payload
			});
		case types.PROJECTPAGECOUNT:
			return (0, _assign2.default)({}, state, {
				projectPageCountFromCache: action.payload
			});
		case types.DYNAMICPAGECOUNT:
			return (0, _assign2.default)({}, state, {
				dynamicPageCountFromCache: action.payload
			});
		case types.TASKTEXT:
			return (0, _assign2.default)({}, state, {
				taskTextFromCache: action.payload
			});
		case types.SET_TASKLISTDEL:
			var newlist = state.taskListToDel;
			newlist.map(function (item, index) {
				if (item.taskinfo.id == action.payload) {
					newlist.splice(index, 1);
				}
			});
			return (0, _assign2.default)({}, state, {
				taskListToDel: newlist
			});
		case types.ADD_TASKLISTDEL:
			var newlist2 = state.taskListToDel;
			// debugger;
			newlist2.splice(0, 0, action.payload);
			return (0, _assign2.default)({}, state, {
				taskListToDel: newlist2
			});
		case types.EDIT_TASKLISTDEL:
			var alist = state.taskListToDel;
			alist.map(function (item, index) {
				if (item.taskinfo.id == action.payload.taskinfo.id) {
					alist.splice(index, 1, action.payload);
				}
			});

			return (0, _assign2.default)({}, state, {
				taskListToDel: alist
			});

		case types.TASKLISTDEL:
			return (0, _assign2.default)({}, state, {
				taskListToDel: action.payload
			});
		case types.TASKCOUNTDEL:
			return (0, _assign2.default)({}, state, {
				taskCountToDel: action.payload
			});
		case types.SET_TASKCOUNTDEL:
			var newtaskCountToDel = state.taskCountToDel;
			if (action.payload) {
				newtaskCountToDel = newtaskCountToDel + 1;
			} else {
				newtaskCountToDel = newtaskCountToDel - 1;
			}
			return (0, _assign2.default)({}, state, {
				taskCountToDel: newtaskCountToDel
			});
		case types.TASKTEXTDEL:
			return (0, _assign2.default)({}, state, {
				taskTextToDel: action.payload
			});
		case types.TASKPAGECOUNTDEL:
			return (0, _assign2.default)({}, state, {
				taskAllCountToDel: action.payload
			});
		case types.TASKSCROLLTOP:
			return (0, _assign2.default)({}, state, {
				taskScrollTop: action.payload
			});
		case types.TASKCONDITION:
			return (0, _assign2.default)({}, state, {
				taskCondition: action.payload
			});
		case types.PROJECTTEXT:
			return (0, _assign2.default)({}, state, {
				projectText: action.payload
			});
		case types.PROJECTTYPE:
			return (0, _assign2.default)({}, state, {
				projectType: action.payload
			});
		case types.PROJECTSCROLL:
			return (0, _assign2.default)({}, state, {
				projectScroll: action.payload
			});
		case types.PROJECTALLCOUNT:
			return (0, _assign2.default)({}, state, {
				projectAllPage: action.payload
			});
		case types.PROJECTTASKLIST:
			return (0, _assign2.default)({}, state, {
				projectTaskList: action.payload
			});
		case types.PROJECTTASKALLCOUNT:
			return (0, _assign2.default)({}, state, {
				projectTaskAllCount: action.payload
			});
		case types.PROJECTTASKSCROLL:
			return (0, _assign2.default)({}, state, {
				projectTaskScroll: action.payload
			});
		default:
			return state;
	}
}

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } if (typeof module.exports === 'function') { __REACT_HOT_LOADER__.register(module.exports, 'module.exports', "D:\\work\\phone-new\\reducers\\cache.js"); return; } for (var key in module.exports) { if (!Object.prototype.hasOwnProperty.call(module.exports, key)) { continue; } var namedExport = void 0; try { namedExport = module.exports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "D:\\work\\phone-new\\reducers\\cache.js"); } } })();

/***/ }),

/***/ 650:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = tasklog;

var _assign = __webpack_require__(93);

var _assign2 = _interopRequireDefault(_assign);

var _dynamic = __webpack_require__(638);

var types = _interopRequireWildcard(_dynamic);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState = {
  taskLogList: [],
  taskList: "",
  taskLogListGroup: [],
  search: {}
};
function tasklog() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  switch (action.type) {
    case types.SEARCH:
      return (0, _assign2.default)({}, state, { search: action.payload });

    case types.TASKLOG_TASKINFO:
      return (0, _assign2.default)({}, state, { taskLogList: action.payload });
    case types.TASKLOG_LIST:
      return (0, _assign2.default)({}, state, { taskList: action.payload });
    case types.TASKLOG_LIST_GROUP:
      //       console.log(action.payload, "action.payload");
      var data = state.taskLogListGroup;
      if (!state.taskLogListGroup.data || action.payload.pageNo == 1) {
        return (0, _assign2.default)({}, state, {
          taskLogListGroup: action.payload.list
        });
      } else {
        if (action.payload.pageNo != state.taskLogListGroup.data.result.pageNo) {
          var list = data.data.result.list.concat(action.payload.list.data.result.list);
          data = _.merge({}, data, action.payload.list);
          data.data.result.list = list;
          return (0, _assign2.default)({}, state, { taskLogListGroup: data });
        }
      }
    default:
      return state;
  }
}

/* ------------------------------------------------------------------------- 分割线，下面的是以前的，上面的是现在要用的 --------------------------------------------------------------------------- 

const initialState = {
    taskLogList: [],
    taskList: '',
    taskLogListGroup:[]
};
export default function tasklog(state = initialState, action = {}) {

    switch (action.type) {
          case types.TASKLOG_TASKINFO:
            return Object.assign({}, state, { taskLogList: action.payload });   
            case types.TASKLOG_LIST:
            return Object.assign({}, state, { taskList: action.payload });   
            case types.TASKLOG_LIST_GROUP:
            return Object.assign({}, state, { taskLogListGroup: action.payload });  
        default:
            return state;
    }
}

*/

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } if (typeof module.exports === 'function') { __REACT_HOT_LOADER__.register(module.exports, 'module.exports', "D:\\work\\phone-new\\reducers\\dynamic.js"); return; } for (var key in module.exports) { if (!Object.prototype.hasOwnProperty.call(module.exports, key)) { continue; } var namedExport = void 0; try { namedExport = module.exports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "D:\\work\\phone-new\\reducers\\dynamic.js"); } } })();

/***/ }),

/***/ 651:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = feedback;

var _assign = __webpack_require__(93);

var _assign2 = _interopRequireDefault(_assign);

var _feedback = __webpack_require__(639);

var types = _interopRequireWildcard(_feedback);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState = {
    add: null
};
function feedback() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    switch (action.type) {
        case types.FEED_ADD:
            return (0, _assign2.default)({}, state, { add: action.payload });
        default:
            return state;
    }
}

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } if (typeof module.exports === 'function') { __REACT_HOT_LOADER__.register(module.exports, 'module.exports', "D:\\work\\phone-new\\reducers\\feedback.js"); return; } for (var key in module.exports) { if (!Object.prototype.hasOwnProperty.call(module.exports, key)) { continue; } var namedExport = void 0; try { namedExport = module.exports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "D:\\work\\phone-new\\reducers\\feedback.js"); } } })();

/***/ }),

/***/ 652:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = help;

var _assign = __webpack_require__(93);

var _assign2 = _interopRequireDefault(_assign);

var _help = __webpack_require__(640);

var types = _interopRequireWildcard(_help);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState = {
    list: [],
    typeList: [],
    helps: {}
};
function help() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    switch (action.type) {
        case types.HEHPS_LIST:
            return (0, _assign2.default)({}, state, { list: action.payload });
        case types.HEHPS_TYPE_LIST:
            return (0, _assign2.default)({}, state, { typeList: action.payload });
        case types.HEHPS_DETAIL:
            return (0, _assign2.default)({}, state, { helps: action.payload });
        default:
            return state;
    }
}

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } if (typeof module.exports === 'function') { __REACT_HOT_LOADER__.register(module.exports, 'module.exports', "D:\\work\\phone-new\\reducers\\help.js"); return; } for (var key in module.exports) { if (!Object.prototype.hasOwnProperty.call(module.exports, key)) { continue; } var namedExport = void 0; try { namedExport = module.exports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "D:\\work\\phone-new\\reducers\\help.js"); } } })();

/***/ }),

/***/ 653:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = __webpack_require__(556);

var _user = __webpack_require__(658);

var _user2 = _interopRequireDefault(_user);

var _project = __webpack_require__(655);

var _project2 = _interopRequireDefault(_project);

var _task = __webpack_require__(657);

var _task2 = _interopRequireDefault(_task);

var _label = __webpack_require__(654);

var _label2 = _interopRequireDefault(_label);

var _feedback = __webpack_require__(651);

var _feedback2 = _interopRequireDefault(_feedback);

var _dynamic = __webpack_require__(650);

var _dynamic2 = _interopRequireDefault(_dynamic);

var _help = __webpack_require__(652);

var _help2 = _interopRequireDefault(_help);

var _cache = __webpack_require__(649);

var _cache2 = _interopRequireDefault(_cache);

var _statistics = __webpack_require__(656);

var _statistics2 = _interopRequireDefault(_statistics);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _redux.combineReducers)({
  user: _user2.default,
  project: _project2.default,
  task: _task2.default,
  label: _label2.default,
  feedback: _feedback2.default,
  dynamic: _dynamic2.default,
  help: _help2.default,
  cache: _cache2.default,
  statistics: _statistics2.default
});

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } if (typeof module.exports === 'function') { __REACT_HOT_LOADER__.register(module.exports, 'module.exports', "D:\\work\\phone-new\\reducers\\index.js"); return; } for (var key in module.exports) { if (!Object.prototype.hasOwnProperty.call(module.exports, key)) { continue; } var namedExport = void 0; try { namedExport = module.exports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "D:\\work\\phone-new\\reducers\\index.js"); } } })();

/***/ }),

/***/ 654:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = label;

var _assign = __webpack_require__(93);

var _assign2 = _interopRequireDefault(_assign);

var _label = __webpack_require__(641);

var types = _interopRequireWildcard(_label);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState = {
    labelList: [],
    tagList: [],
    projectTypeList: [],
    addProjectTypeList: [],
    publicLabelList: [],
    addLabelList: []
};
function label() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    switch (action.type) {
        case types.LABEL_LIST:
            return (0, _assign2.default)({}, state, { labelList: action.payload });
        case types.TAG_LIST:
            return (0, _assign2.default)({}, state, { tagList: action.payload });
        case types.PROJECT_TYPE_LIST:
            return (0, _assign2.default)({}, state, { projectTypeList: action.payload });
        case types.ADD_PROJECT_TYPE:
            return (0, _assign2.default)({}, state, { addProjectTypeList: action.payload });
        case types.PUBLIC_LABEL_LIST:
            return (0, _assign2.default)({}, state, { publicLabelList: action.payload });
        case types.LABEL_USER:
            return (0, _assign2.default)({}, state, { labelUser: action.payload });
        case types.ADD_LABEL:
            return (0, _assign2.default)({}, state, { addLabelList: action.payload });
        case types.ADD_LABEL_USER:
            return (0, _assign2.default)({}, state, { addLabelUser: action.payload });
        case types.PERSON_LABEL:
            return (0, _assign2.default)({}, state, { personLabel: action.payload });
        case types.ADD_PERSON_LABEL:
            return (0, _assign2.default)({}, state, { addPersonLabel: action.payload });
        default:
            return state;
    }
}

/* ------------------------------------------------------------------------- 分割线，下面的是以前的，上面的是现在要用的 --------------------------------------------------------------------------- 


import * as types from '../actions/label'

const initialState = {
    
    labelAddtask:null,
    labelDelete:null,
    labelDeleteRelation:null,
    labelBoxState:null,
};
export default function label(state = initialState, action = {}) {

    switch (action.type) {
        case types.LABEL_LIST:
            return Object.assign({}, state, { labelList: action.payload }); 
            case types.LABEL_ADD_TASKINFO:
            return Object.assign({}, state, { labelAddtask: action.payload });   
        case types.LABEL_DELETE:
            return Object.assign({}, state, { labelDelete: action.payload });     
        case types.LABEL_ADD_TASKINFO_LIST:
            return Object.assign({}, state, { labelDeleteRelation: action.payload });   
        case types.LABEL_DELETE_TASKINFO_LIST:
            return Object.assign({}, state, { labelDeleteRelation: action.payload });        
        case types.LABEL_BOX_STATE:
            return Object.assign({}, state, { labelBoxState: action.payload });      
        default:
            return state;
    }
}*/

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } if (typeof module.exports === 'function') { __REACT_HOT_LOADER__.register(module.exports, 'module.exports', "D:\\work\\phone-new\\reducers\\label.js"); return; } for (var key in module.exports) { if (!Object.prototype.hasOwnProperty.call(module.exports, key)) { continue; } var namedExport = void 0; try { namedExport = module.exports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "D:\\work\\phone-new\\reducers\\label.js"); } } })();

/***/ }),

/***/ 655:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = project;

var _assign = __webpack_require__(93);

var _assign2 = _interopRequireDefault(_assign);

var _project = __webpack_require__(642);

var types = _interopRequireWildcard(_project);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState = {
	projectList: {},
	projectCreate: null,
	projectDetails: [],
	addWitchProject: {},
	cancelWitchProject: {},
	getProjectCreateInfo: {},
	createProjectAll: {},
	openProject: {},
	projectListJurisdiction: {},
	projectUserInfo: null,
	projectSelectCount: 0
};

function project() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
	var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	switch (action.type) {
		case types.PROJECT_SELECT_LISTCOUNT:
			return (0, _assign2.default)({}, state, {
				projectSelectCount: action.payload
			});
		case types.PROJECT_USERINFO:
			return (0, _assign2.default)({}, state, {
				projectUserInfo: action.payload
			});
		case types.PROJECT_LIST_JURISDICTION:
			return (0, _assign2.default)({}, state, {
				projectListJurisdiction: action.payload
			});
		case types.PROJECT_LIST:
			return (0, _assign2.default)({}, state, {
				projectList: action.payload
			});
		case types.PROJECT_ADD:
			return (0, _assign2.default)({}, state, {
				projectCreate: action.payload
			});
		case types.PROJECT_DETAILS:
			return (0, _assign2.default)({}, state, {
				projectDetails: action.payload
			});
		case types.PROJECT_UPDET_ALL:
			return (0, _assign2.default)({}, state, {
				projectDetails: action.payload
			});
		case types.ADD_ATTENTION_WITCH_PROJECT:
			return (0, _assign2.default)({}, state, {
				addWitchProject: action.payload
			});
		case types.CANCEL_ATTENTION_WITCH_PROJECT:
			return (0, _assign2.default)({}, state, {
				cancelWitchProject: action.payload
			});
		case types.GET_PROJECT_CREATE_INFO_BY_ID:
			return (0, _assign2.default)({}, state, {
				getProjectCreateInfo: action.payload
			});
		case types.CREATE_PROJECT:
			return (0, _assign2.default)({}, state, {
				createProjectAll: action.payload
			});
		case types.OPEN_PROJECT:
			return (0, _assign2.default)({}, state, {
				openProject: action.payload
			});
		default:
			return state;
	}
}

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } if (typeof module.exports === 'function') { __REACT_HOT_LOADER__.register(module.exports, 'module.exports', "D:\\work\\phone-new\\reducers\\project.js"); return; } for (var key in module.exports) { if (!Object.prototype.hasOwnProperty.call(module.exports, key)) { continue; } var namedExport = void 0; try { namedExport = module.exports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "D:\\work\\phone-new\\reducers\\project.js"); } } })();

/***/ }),

/***/ 656:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = task;

var _assign = __webpack_require__(93);

var _assign2 = _interopRequireDefault(_assign);

var _statistics = __webpack_require__(643);

var types = _interopRequireWildcard(_statistics);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState = {
  pieData: null,
  penProject: {},
  penPerson: {},
  taskNumsProject: {},
  taskNumsPerson: {},
  performType: "task",
  monthType: {
    type: "nowMonth",
    attdate01: new Date("2016/1/1"),
    attdate02: new Date("2016/1/1"),
    value: null
  },
  projectList: null,
  projectType: 1,
  projectIds: []
};

function task() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  switch (action.type) {
    case types.PROJECT_IDS:
      return (0, _assign2.default)({}, state, { projectIds: action.payload });
    case types.PROJECT_TYPE:
      return (0, _assign2.default)({}, state, { projectType: action.payload });
    case types.ST_PROJECT_LIST:
      return (0, _assign2.default)({}, state, { projectList: action.payload });
    case types.PERFORM_TYPE:
      return (0, _assign2.default)({}, state, { performType: action.payload });
    case types.MONTH_TYPE:
      return (0, _assign2.default)({}, state, { monthType: action.payload });
    case types.PIE_CHAT:
      return (0, _assign2.default)({}, state, { pieData: action.payload });
    case types.PEN_PROJECT:
      return (0, _assign2.default)({}, state, { penProject: action.payload });
    case types.PEN_PERSON:
      return (0, _assign2.default)({}, state, { penPerson: action.payload });
    case types.TASK_NUMS_PROJECT:
      return (0, _assign2.default)({}, state, { taskNumsProject: action.payload });
    case types.TASK_NUMS_PERSON:
      return (0, _assign2.default)({}, state, { taskNumsPerson: action.payload });
    default:
      return state;
  }
}

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } if (typeof module.exports === 'function') { __REACT_HOT_LOADER__.register(module.exports, 'module.exports', "D:\\work\\phone-new\\reducers\\statistics.js"); return; } for (var key in module.exports) { if (!Object.prototype.hasOwnProperty.call(module.exports, key)) { continue; } var namedExport = void 0; try { namedExport = module.exports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "D:\\work\\phone-new\\reducers\\statistics.js"); } } })();

/***/ }),

/***/ 657:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = task;

var _assign = __webpack_require__(93);

var _assign2 = _interopRequireDefault(_assign);

var _defineProperty2 = __webpack_require__(555);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _task = __webpack_require__(579);

var types = _interopRequireWildcard(_task);

var _utils = __webpack_require__(565);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _initialState;

var initialState = (_initialState = {
	homeData: {},
	dingtakMessage: "",
	taskinfoId: null,
	taskListByCondition: {},
	taskDetails: {},
	taskChildList: {},
	taskRelevanceList: {},
	taskFilesList: {},
	taskInfoUpdateData: {},
	taskInfoUpdateFiles: {},
	taskDeleteFile: {},
	taskAddTalk: {},
	taskDeleteTalk: {},
	taskCreate: {},
	taskPriorityList: {},
	taskProjectList: {},
	taskCreateVals: {
		id: "",
		taskname: "",
		remarks: "", // 任务描述
		userResponse: {},
		planEndTime: "",
		userFlow: {},
		flowConten: "",
		coefficienttype: "",
		workTime: "",
		labels: [],
		mobileFile: [], // 描述文件
		category: "1"
	},
	taskDelete: {},
	taskCreateBread: [],
	taskUpdateState: {},
	countProject: {},
	countTaskList: {},
	projectCoun: null,
	refresh: false,
	fileList: [],
	teamList: [],
	taskinfoRefresh: { sign: false, id: "" }
}, (0, _defineProperty3.default)(_initialState, "taskUpdateState", {}), (0, _defineProperty3.default)(_initialState, "taskCuiBan", {}), (0, _defineProperty3.default)(_initialState, "taskSearchObject", {}), (0, _defineProperty3.default)(_initialState, "nowPage", 0), (0, _defineProperty3.default)(_initialState, "selectedUsers", []), (0, _defineProperty3.default)(_initialState, "selectedPros", []), _initialState);
function task() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
	var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	switch (action.type) {
		case types.SELECTED_USERS:
			return (0, _assign2.default)({}, state, {
				selectedUsers: action.payload
			});
		case types.NOW_PAGE:
			return (0, _assign2.default)({}, state, {
				nowPage: action.payload
			});
		case types.SELECTED_TAG:
			return (0, _assign2.default)({}, state, {
				selectTags: action.payload
			});
		case types.SELECTED_PROS:
			return (0, _assign2.default)({}, state, {
				selectedPros: action.payload
			});
		case types.TASK_SEARCH_OBJECT:
			return (0, _assign2.default)({}, state, {
				taskSearchObject: action.payload
			});
		case types.HOME_DATA:
			return (0, _assign2.default)({}, state, {
				homeData: action.payload
			});
		case types.DINGTAK_MESSAGE_DELETE:
			return (0, _assign2.default)({}, state, {
				dingtakMessage: action.payload
			});
		case types.TASKINFO_ID:
			return (0, _assign2.default)({}, state, {
				taskinfoId: action.payload
			});
		case types.BACK_FN:
			return (0, _assign2.default)({}, state, {
				backResut: action.payload
			});
		case types.TASK_LIST_BY_CONDITION:
			return (0, _assign2.default)({}, state, {
				taskListByCondition: action.payload
			});
		case types.TASK_DETAILS:
			return (0, _assign2.default)({}, state, {
				taskDetails: action.payload
			});
		case types.TASK_CHILD_LIST_BY_ID:
			return (0, _assign2.default)({}, state, {
				taskChildList: action.payload
			});
		case types.TASK_RELEVANCE_LIST_BY_ID:
			return (0, _assign2.default)({}, state, {
				taskRelevanceList: action.payload
			});
		case types.TASK_FILES_LIST_BY_ID:
			return (0, _assign2.default)({}, state, {
				taskFilesList: action.payload
			});
		case types.TASK_TASKINFO_UPDATE:
			return (0, _assign2.default)({}, state, {
				taskInfoUpdateData: action.payload
			});
		case types.TASKINFO_UPLOADING:
			return (0, _assign2.default)({}, state, {
				taskInfoUpdateFiles: action.payload
			});
		case types.TASK_FILES_DELETE:
			return (0, _assign2.default)({}, state, {
				taskDeleteFile: action.payload
			});
		case types.TASK_ADD_TALK:
			return (0, _assign2.default)({}, state, {
				taskAddTalk: action.payload
			});
		case types.TASK_DELETE_TALK:
			return (0, _assign2.default)({}, state, {
				taskDeleteTalk: action.payload
			});
		case types.TASK_CREATE:
			return (0, _assign2.default)({}, state, {
				taskCreate: action.payload
			});
		case types.TASK_PRIORITY_LIST:
			return (0, _assign2.default)({}, state, {
				taskPriorityList: action.payload
			});
			return (0, _assign2.default)({}, state, {
				taskFilesList: action.payload
			});
		case types.TASKINFO_TASK_BY_PRO_LIST:
			return (0, _assign2.default)({}, state, {
				taskProjectList: action.payload
			});
		case types.TASK_CREATE_VALS:
			return (0, _assign2.default)({}, state, {
				taskCreateVals: action.payload
			});
		case types.TASK_DELETE:
			return (0, _assign2.default)({}, state, {
				taskDelete: action.payload
			});
		case types.TASK_CREATE_BREAD:
			return (0, _assign2.default)({}, state, {
				taskCreateBread: action.payload
			});
		case types.TASK_UPDATE_STATE:
			return (0, _assign2.default)({}, state, {
				taskUpdateState: action.payload
			});
		case types.CALCULATE_PROJECT:
			return (0, _assign2.default)({}, state, {
				countProject: action.payload
			});
		case types.CALCULATE_TASK_TABLE:
			return (0, _assign2.default)({}, state, {
				countTaskList: action.payload
			});
		case types.PROJECT_COUNT:
			return (0, _assign2.default)({}, state, {
				projectCoun: action.payload
			});
		case types.REFRESH_TIME:
			return (0, _assign2.default)({}, state, {
				refresh: action.payload
			});
		case types.FILES_LIST:
			return (0, _assign2.default)({}, state, {
				fileList: action.payload
			});
		case types.CALCULATE_TEAM:
			return (0, _assign2.default)({}, state, {
				teamList: action.payload
			});
		case types.TASKINFO_REFRESH:
			return (0, _assign2.default)({}, state, {
				taskinfoRefresh: action.payload
			});
		case types.TASK_CUIBAN:
			return (0, _assign2.default)({}, state, {
				taskCuiBan: action.payload
			});
		default:
			return state;
	}

	/* ------------------------------------------------------------------------- 分割线，下面的是以前的，上面的是现在要用的 --------------------------------------------------------------------------- 
 
 
 import { ENGINE_METHOD_CIPHERS } from 'constants';
 
 const initialState = {
    taskProjectList:[],
    
    taskinfoAddIni:null,
    taskinfoAdd:null,
    taskListByPro:[],
    taskinfoDetail:null,
    taskinfoChild:null,
    taskinfoLeavnce:null,
    taskinfoPid:null,
    taskinfoFile:[],
    taskinfoLeave:[],
    leaveDelete:[],
    leaveAdd:[],
    taskinfoUpdate:null,
    taskinfoDeleteUser:null,
    taskinfoUpSate:null,
    taskinfoUploading:null,
    
    taskinfoHomeData:[],
    taskinfoDelete:null,
    taskSaveData:null,
    backResut:{},
 };
 
    switch (action.type) {
        case types.TASKINFO_PROJECT_LIST:
            return Object.assign({}, state, { taskProjectList: action.payload });       
              
        case types.TASKINFO_ADD_INI:
            return Object.assign({}, state, { taskinfoAddIni: action.payload });     
        case types.TASKINFO_ADD:
            return Object.assign({}, state, { taskinfoAdd: action.payload });    
        case types.TASKINFO_TASK_BY_PRO_LIST:
            return Object.assign({}, state, { taskListByPro: action.payload });  
        case types.TASKINFO_BY_ID:
            return Object.assign({}, state, { taskinfoDetail: action.payload });    
        case types.TASKINFO_CHILD:
            return Object.assign({}, state, { taskinfoChild: action.payload });    
        case types.TASKINFO_LEVANCE:
            return Object.assign({}, state, { taskinfoLeavnce: action.payload });    
        case types.TASKINFO_ID_PID:
            return Object.assign({}, state, { taskinfoPid: action.payload });    
        case types.TASKINFO_FILES:
            return Object.assign({}, state, { taskinfoFile: action.payload });    
        case types.TASKINFO_LEAVE:
            return Object.assign({}, state, { taskinfoLeave: action.payload });    
        case types.LEAVE_DELETE:
            return Object.assign({}, state, { leaveDelete : action.payload });   
        case types.LEAVE_ADD:
            return Object.assign({}, state, { leaveAdd : action.payload });   
        case types.TASKINFO_UPDATE:
            return Object.assign({}, state, { taskinfoUpdate : action.payload });   
        case types.TASKINFO_DELETE_USER:
            return Object.assign({}, state, { taskinfoDeleteUser : action.payload });   
        case types.TASKINFO_UPDATE_STATE:
            return Object.assign({}, state, { taskinfoDetail : action.payload });   
        case types.TASKINFO_UPDATE_FLOW:
            return Object.assign({}, state, { taskinfoDetail : action.payload });   
        case types.TASKINFO_UPLOADING:
            return Object.assign({}, state, { taskinfoUploading : action.payload });   
         
        case types.TASKINFO_HOME_INDEX:
            return Object.assign({}, state, { taskinfoHomeData : action.payload }); 
        case types.TASKINFO_DELETEALL:
            return Object.assign({}, state, { taskinfoDelete : action.payload }); 
        
        case types.TASKINFO_BY_ID_SAVE:
            return Object.assign({}, state, { taskSaveData : action.payload });    
        default:
            return state;
    }
    */
}

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } if (typeof module.exports === 'function') { __REACT_HOT_LOADER__.register(module.exports, 'module.exports', "D:\\work\\phone-new\\reducers\\task.js"); return; } for (var key in module.exports) { if (!Object.prototype.hasOwnProperty.call(module.exports, key)) { continue; } var namedExport = void 0; try { namedExport = module.exports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "D:\\work\\phone-new\\reducers\\task.js"); } } })();

/***/ }),

/***/ 658:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = user;

var _assign = __webpack_require__(93);

var _assign2 = _interopRequireDefault(_assign);

var _user = __webpack_require__(564);

var types = _interopRequireWildcard(_user);

var _lodash = __webpack_require__(622);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState = {
  user: null,
  dingtakCode: "",
  dingtakLogin: "",
  messageListByUser: {},
  urlData: ""
};
function user() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  switch (action.type) {
    case types.SET_MESSAGE_COUNT:
      debugger;
      var rdata = _lodash2.default.cloneDeep(state.messageListByUser);
      //       console.log(action.payload, "action.payload");
      rdata.data.list.map(function (item) {
        if (item.id == action.payload) {
          item.read = 1;
        }
      });
      rdata.data.messageCount = rdata.data.messageCount - 1 > -1 ? rdata.data.messageCount - 1 : 0;
      return (0, _assign2.default)({}, state, { messageListByUser: rdata });
    case types.LOGIN:
      return (0, _assign2.default)({}, state, { user: action.payload });
    case types.DINGTAK_CODE:
      return (0, _assign2.default)({}, state, { dingtakCode: action.payload });
    case types.DINGTAK_CODE_LOGIN:
      return (0, _assign2.default)({}, state, { dingtakLogin: action.payload });
    case types.USER_MESSAGE:
      var data = state.messageListByUser;
      if (!state.messageListByUser.data || action.payload.pageNo == 1) {
        return (0, _assign2.default)({}, state, {
          messageListByUser: action.payload.list
        });
      } else {
        if (action.payload.pageNo != state.messageListByUser.data.page) {
          var list = data.data.list.concat(action.payload.list.data.list);
          var msgCount = data.data.messageCount;
          data = _lodash2.default.merge({}, data, action.payload.list);
          data.data.list = list;
          data.data.messageCount = msgCount;
          return (0, _assign2.default)({}, state, { messageListByUser: data });
        } else {
          return (0, _assign2.default)({}, state, { messageListByUser: data });
        }
      }

    case types.SET_URLDATA:
      return (0, _assign2.default)({}, state, { urlData: action.payload });
    default:
      return state;
  }
}

/* ------------------------------------------------------------------------- 分割线，下面的是以前的，上面的是现在要用的 --------------------------------------------------------------------------- 

import * as types from '../actions/user'

const initialState = {
    
    timeList:[],
    userAll:[],
    userSelect:[],
    userId:'',
    dingUserId:'',
    apps:[],
    userCancellation:'',
};
export default function user(state = initialState, action = {}) {

    switch (action.type) {
             
        case types.TIME_LIST:
            return Object.assign({}, state, { timeList: action.payload });   
        case types.USER_ALL_LIST:
            return Object.assign({}, state, { userAll: action.payload }); 
        case types.SELECT_USER:
            return Object.assign({}, state, { userSelect: action.payload });   
          
         
        case types.DINGTAK_USER_ID:
            return Object.assign({}, state, { userId: action.payload });  
        case types.DINGTAK_DING_USER_ID:
            return Object.assign({}, state, { dingUserId: action.payload });
        case types.FINDAPPLIST:
            return Object.assign({}, state, { apps: action.payload });
        case types.USER_CANCELLATION:
            return Object.assign({}, state, { userCancellation: action.payload });
        default:
            return state;
    }
}*/

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } if (typeof module.exports === 'function') { __REACT_HOT_LOADER__.register(module.exports, 'module.exports', "D:\\work\\phone-new\\reducers\\user.js"); return; } for (var key in module.exports) { if (!Object.prototype.hasOwnProperty.call(module.exports, key)) { continue; } var namedExport = void 0; try { namedExport = module.exports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "D:\\work\\phone-new\\reducers\\user.js"); } } })();

/***/ }),

/***/ 683:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(591);


/***/ })

},[683]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlc1xccGFnZXNcXG1vX2RpbmdIb21lLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vYXBpL2h0dHBDbGllbnQuanM/NWRlMWYxMiIsIndlYnBhY2s6Ly8vLi91dGlscy9zdG9yYWdlLmpzPzVkZTFmMTIiLCJ3ZWJwYWNrOi8vLy4vdXRpbHMvZGluZ3RhbGsuanM/NWRlMWYxMiIsIndlYnBhY2s6Ly8vLi9hY3Rpb25zL3VzZXIuanM/NWRlMWYxMiIsIndlYnBhY2s6Ly8vLi91dGlscy91dGlscy5qcz81ZGUxZjEyIiwid2VicGFjazovLy8uL2FjdGlvbnMvY2FjaGUuanM/NWRlMWYxMiIsIndlYnBhY2s6Ly8vLi9hY3Rpb25zL3Rhc2suanM/NWRlMWYxMiIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL2FsZXJ0LmpzPzVkZTFmMTIiLCJ3ZWJwYWNrOi8vLy4vc3RvcmUuanM/NWRlMWYxMiIsIndlYnBhY2s6Ly8vLi9wYWdlcy9tb19kaW5nSG9tZS5qcz81ZGUxZjEyIiwid2VicGFjazovLy9zdHlsZXMvY29tcG9uZW50cy9hbGVydC5zY3NzPzVkZTFmMTIiLCJ3ZWJwYWNrOi8vL3N0eWxlcy9jb21wb25lbnRzL2xvYWRpbmcuc2Nzcz81ZGUxZjEyIiwid2VicGFjazovLy9zdHlsZXMvY29tcG9uZW50cy9tZW51QmFyLnNjc3M/MTQ3ZTFmOSIsIndlYnBhY2s6Ly8vc3R5bGVzL3BhZ2VzL2RpbmdIb21lLnNjc3M/MTQ3ZTFmOSIsIndlYnBhY2s6Ly8vLi9hY3Rpb25zL2R5bmFtaWMuanM/MTQ3ZTFmOSIsIndlYnBhY2s6Ly8vLi9hY3Rpb25zL2ZlZWRiYWNrLmpzPzE0N2UxZjkiLCJ3ZWJwYWNrOi8vLy4vYWN0aW9ucy9oZWxwLmpzPzE0N2UxZjkiLCJ3ZWJwYWNrOi8vLy4vYWN0aW9ucy9sYWJlbC5qcz8xNDdlMWY5Iiwid2VicGFjazovLy8uL2FjdGlvbnMvcHJvamVjdC5qcz8xNDdlMWY5Iiwid2VicGFjazovLy8uL2FjdGlvbnMvc3RhdGlzdGljcy5qcz8xNDdlMWY5Iiwid2VicGFjazovLy8uL2FjdGlvbnMvdmVyc2lvbi5qcz8xNDdlMWY5Iiwid2VicGFjazovLy8uL2FwaS9mZXRjaEZuLmpzPzE0N2UxZjkiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9MYXlvdXQuanM/MTQ3ZTFmOSIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL0xvYWRpbmcuanM/MTQ3ZTFmOSIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL01lbnVCYXIuanM/MTQ3ZTFmOSIsIndlYnBhY2s6Ly8vLi9yZWR1Y2Vycy9jYWNoZS5qcz8xNDdlMWY5Iiwid2VicGFjazovLy8uL3JlZHVjZXJzL2R5bmFtaWMuanM/MTQ3ZTFmOSIsIndlYnBhY2s6Ly8vLi9yZWR1Y2Vycy9mZWVkYmFjay5qcz8xNDdlMWY5Iiwid2VicGFjazovLy8uL3JlZHVjZXJzL2hlbHAuanM/MTQ3ZTFmOSIsIndlYnBhY2s6Ly8vLi9yZWR1Y2Vycy9pbmRleC5qcz8xNDdlMWY5Iiwid2VicGFjazovLy8uL3JlZHVjZXJzL2xhYmVsLmpzPzE0N2UxZjkiLCJ3ZWJwYWNrOi8vLy4vcmVkdWNlcnMvcHJvamVjdC5qcz8xNDdlMWY5Iiwid2VicGFjazovLy8uL3JlZHVjZXJzL3N0YXRpc3RpY3MuanM/MTQ3ZTFmOSIsIndlYnBhY2s6Ly8vLi9yZWR1Y2Vycy90YXNrLmpzPzE0N2UxZjkiLCJ3ZWJwYWNrOi8vLy4vcmVkdWNlcnMvdXNlci5qcz8xNDdlMWY5Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBGZXRjaEZuIGZyb20gXCIuL2ZldGNoRm5cIjtcbmV4cG9ydCBjb25zdCB2aXNpdFVybCA9IFwiaHR0cDovL2xvY2FsaG9zdDozMDAwXCI7XG4vLyBleHBvcnQgY29uc3QgdmlzaXRVcmwgPSBcInd3dy5hbnRiaW0uY25cIjtcbmNvbnN0IGJhc2VVUkkgPSB2aXNpdFVybCArIFwiL2FudHZpcC9hbnQtY2dpXCI7XG5pbXBvcnQgRGluZ3RhbGsgZnJvbSBcIi4uL3V0aWxzL2Rpbmd0YWxrXCI7XG5pbXBvcnQgU3RvcmFnZSBmcm9tIFwiLi4vdXRpbHMvc3RvcmFnZVwiO1xuaW1wb3J0IFJvdXRlciBmcm9tIFwibmV4dC9yb3V0ZXJcIjtcblxubGV0IGZsYWcgPSB0cnVlO1xuY29uc3QgdmVyc2lvbiA9IFwiMi4xLjBcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSHR0cENsaWVudCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRpYyBnZXRWZXJzaW9uKCkge1xuICAgIHJldHVybiB2ZXJzaW9uO1xuICB9XG5cbiAgc3RhdGljIEFqYXhHZXQodXJsLCBjYikge1xuICAgIGxldCBvcHQgPSB7XG4gICAgICB0eXBlOiBcImdldFwiLFxuICAgICAgdXJsOiBiYXNlVVJJICsgdXJsXG4gICAgfTtcbiAgICBGZXRjaEZuLmZldGNoRm4ob3B0LCBjYiwgZXJyID0+IHtcbiAgICAgIGNiKCk7XG4gICAgfSk7XG4gIH1cbiAgc3RhdGljIEFqYXhQb3N0U3luYyh1cmwsIGRhdGEsIGNiLCBmdW5FcnIpIHtcbiAgICBpZiAoZmxhZykge1xuICAgICAgZmxhZyA9IGZhbHNlO1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgZmxhZyA9IHRydWU7XG4gICAgICB9LCA1MDApO1xuICAgICAgbGV0IG9wdCA9IHtcbiAgICAgICAgdHlwZTogXCJwb3N0XCIsXG4gICAgICAgIHVybDogYmFzZVVSSSArIHVybCxcbiAgICAgICAgZGF0YTogZGF0YVxuICAgICAgfTtcbiAgICAgIEZldGNoRm4uZmV0Y2hGbihvcHQsIGNiLCBlcnIgPT4ge1xuICAgICAgICBpZiAoZXJyID09IFwiNDA0XCIpIHtcbiAgICAgICAgICBjb25zdCBjb3JwSWQgPSBTdG9yYWdlLmdldFNlc3Npb24oXCJjb3JwSWRcIik7XG4gICAgICAgICAgdGhpcy5odHRwUG9zdEVycm9yKGNvcnBJZCkudGhlbihcbiAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgRmV0Y2hGbi5mZXRjaEZuKG9wdCwgY2IsIGVyciA9PiB7XG4gICAgICAgICAgICAgICAgLy9Sb3V0ZXIucHVzaCgnL21vX2xvZ2luJyk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyID0+IHtcbiAgICAgICAgICAgICAgLy/lho3mrKHor7fmsYLlpLHotKXlkI4g5LuO5paw55m76ZmGXG4gICAgICAgICAgICAgIC8vUm91dGVyLnB1c2goJy9tb19sb2dpbicpO1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuICBzdGF0aWMgQWpheFBvc3QodXJsLCBkYXRhLCBjYiwgZnVuRXJyKSB7XG4gICAgbGV0IG9wdCA9IHtcbiAgICAgIHR5cGU6IFwicG9zdFwiLFxuICAgICAgdXJsOiBiYXNlVVJJICsgdXJsLFxuICAgICAgZGF0YTogZGF0YVxuICAgIH07XG4gICAgRmV0Y2hGbi5mZXRjaEZuKG9wdCwgY2IsIGVyciA9PiB7XG4gICAgICBpZiAoZXJyID09IFwiNDA0XCIpIHtcbiAgICAgICAgY29uc3QgY29ycElkID0gU3RvcmFnZS5nZXRTZXNzaW9uKFwiY29ycElkXCIpO1xuICAgICAgICB0aGlzLmh0dHBQb3N0RXJyb3IoY29ycElkKS50aGVuKFxuICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgIEZldGNoRm4uZmV0Y2hGbihvcHQsIGNiLCBlcnIgPT4ge1xuICAgICAgICAgICAgICAvL1JvdXRlci5wdXNoKCcvbW9fbG9naW4nKTtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgLy/lho3mrKHor7fmsYLlpLHotKXlkI4g5LuO5paw55m76ZmGXG4gICAgICAgICAgICAvL1JvdXRlci5wdXNoKCcvbW9fbG9naW4nKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIC8v55m76ZmG5aSx6LSl5YaN5qyh55m76ZmGXG4gIHN0YXRpYyBodHRwUG9zdEVycm9yKGNvcnBJZCkge1xuICAgIGNvbnN0IHAgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIC8v5YGa5LiA5Lqb5byC5q2l5pON5L2cXG4gICAgICBEaW5ndGFsay5nZXRMb2dpbkNvZGUoXG4gICAgICAgIGNvcnBJZCxcbiAgICAgICAgY29kZSA9PiB7XG4gICAgICAgICAgbGV0IG9wdCA9IHtcbiAgICAgICAgICAgIHR5cGU6IFwicG9zdFwiLFxuICAgICAgICAgICAgdXJsOlxuICAgICAgICAgICAgICBiYXNlVVJJICtcbiAgICAgICAgICAgICAgXCIvdXNlci9kaW5ndGFsa01vYmlsZUNvZGVMb2dpbj9jb2RlPVwiICtcbiAgICAgICAgICAgICAgY29kZSArXG4gICAgICAgICAgICAgIFwiJmNvcnBpZD1cIiArXG4gICAgICAgICAgICAgIGNvcnBJZCxcbiAgICAgICAgICAgIGRhdGE6IFwiXCJcbiAgICAgICAgICB9O1xuICAgICAgICAgIEZldGNoRm4uZmV0Y2hGbihcbiAgICAgICAgICAgIG9wdCxcbiAgICAgICAgICAgIGRhdGEgPT4ge1xuICAgICAgICAgICAgICBTdG9yYWdlLmxvZ2luKGRhdGEuZGF0YSk7XG4gICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnIgPT4ge1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIsIFwiLS0tLS0tLS0tLS0tLS0tZ2V0TG9naW5Db2RlLWVycm9yLS0tLS0tXCIpO1xuICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgLy9Sb3V0ZXIucHVzaCgnL21vX2xvZ2luJylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICApO1xuICAgICAgICB9LFxuICAgICAgICBlcnIgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGVyciwgXCItLS0tLS0tLS0tLS0tLS1nZXRBZ2FpbkxvZ2luLWVycm9yLS0tLS0tXCIpO1xuICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgIC8vUm91dGVyLnB1c2goJy9tb19sb2dpbicpO1xuICAgICAgICB9XG4gICAgICApO1xuICAgIH0pO1xuICAgIHJldHVybiBwO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcGkvaHR0cENsaWVudC5qcyIsIlxyXG5pbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0J1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RvcmFnZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcblxyXG5cdFxyXG5cdHN0YXRpYyBzZXRTZXNzaW9uKGtleSwgdmFsdWUpIHtcclxuXHRcdGlmKHNlc3Npb25TdG9yYWdlKXtcclxuXHRcdFx0c2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShrZXksIHZhbHVlKTtcclxuXHRcdH1cclxuXHR9XHJcblx0c3RhdGljIGdldFNlc3Npb24oa2V5KSB7XHJcblx0XHRpZihzZXNzaW9uU3RvcmFnZSl7XHJcblx0XHRcdGNvbnN0IGRhdGUgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKGtleSk7XHJcblx0XHRcdHRyeSB7XHJcblx0XHRcdFx0cmV0dXJuIEpTT04ucGFyc2UoZGF0ZSk7XHJcblx0XHRcdH0gY2F0Y2goZSkge1xyXG5cdFx0XHRcdHJldHVybiBkYXRlO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgcmVtb3ZlU2Vzc2lvbihrZXkpIHtcclxuXHRcdGlmKHNlc3Npb25TdG9yYWdlKXtcclxuXHRcdFx0c2Vzc2lvblN0b3JhZ2UucmVtb3ZlSXRlbShrZXkpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRzdGF0aWMgc2V0TG9jYWwoa2V5LCB2YWx1ZSkge1xyXG5cdFx0aWYobG9jYWxTdG9yYWdlKXtcclxuXHRcdFx0bG9jYWxTdG9yYWdlLnNldEl0ZW0oa2V5LCB2YWx1ZSk7XHJcblx0XHR9XHJcblx0fVxyXG5cdHN0YXRpYyBnZXRMb2NhbChrZXkpIHtcclxuXHRcdGlmKGxvY2FsU3RvcmFnZSl7XHJcblx0XHRcdHJldHVybiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0c3RhdGljIHJlbW92ZUxvY2FsKGtleSkge1xyXG5cdFx0aWYobG9jYWxTdG9yYWdlKXtcclxuXHRcdFx0bG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oa2V5KTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8v5rOo6ZSAXHJcblx0c3RhdGljIHdyaXRlKCkge1xyXG5cdFx0dGhpcy5yZW1vdmVTZXNzaW9uKCd1c2VyJywgeyBwYXRoOiAnLycgfSk7XHJcblx0fVxyXG5cdC8v55m75b2VXHJcblx0c3RhdGljIGxvZ2luKHVzZXIpIHtcclxuXHRcdHRoaXMuc2V0U2Vzc2lvbigndXNlcicsIEpTT04uc3RyaW5naWZ5KHVzZXIpKTsgY29uc29sZS5sb2codXNlcilcclxuXHR9XHJcblx0Ly/orr7nva7miYvmnLrniYjmnKxcclxuXHRzdGF0aWMgc2V0UGhvbmVWZXJzaW9uKHZlcnNpb24pIHtcclxuXHRcdHRoaXMuc2V0U2Vzc2lvbigncGhvbmVWZXJzaW9uJywgdmVyc2lvbik7XHJcblx0fVxyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdXRpbHMvc3RvcmFnZS5qcyIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IFN0b3JhZ2UgZnJvbSBcIi4vc3RvcmFnZVwiO1xyXG5jb25zdCBhcHBUeXBlID0gXCJkaW5ndGFsa1wiO1xyXG5jb25zdCBpc0lTViA9IGZhbHNlOyAvL+aYr+WQpmlzdlxyXG5pbXBvcnQgSHR0cENsaWVudCBmcm9tIFwiLi4vYXBpL2h0dHBDbGllbnRcIjtcclxuaW1wb3J0IHsgVG9hc3QgfSBmcm9tIFwiYW50ZC1tb2JpbGVcIjtcclxuaW1wb3J0IFJvdXRlciBmcm9tIFwibmV4dC9yb3V0ZXJcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERpbmd0YWxrIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICBzdGF0aWMgaXNJU1YoKSB7XHJcbiAgICByZXR1cm4gaXNJU1Y7XHJcbiAgfVxyXG4gIHN0YXRpYyBnZXRBcHBUeXBlKCkge1xyXG4gICAgcmV0dXJuIGFwcFR5cGU7XHJcbiAgfVxyXG5cclxuICAvL+iuvue9ruagh+mimFxyXG4gIHN0YXRpYyBzZXRUaXRsZShuYW1lKSB7XHJcbiAgICBpZiAodHlwZW9mIGRkICE9IFwidW5kZWZpbmVkXCIgJiYgYXBwVHlwZSA9PSBcImRpbmd0YWxrXCIpIHtcclxuICAgICAgbGV0IHRpdGxlID0gXCLomoLomoHliIblt6VcIjtcclxuICAgICAgaWYgKG5hbWUpIHtcclxuICAgICAgICB0aXRsZSA9IG5hbWU7XHJcbiAgICAgIH1cclxuICAgICAgZGQuYml6Lm5hdmlnYXRpb24uc2V0VGl0bGUoe1xyXG4gICAgICAgIHRpdGxlOiB0aXRsZSwgLy/mjqfliLbmoIfpopjmlofmnKzvvIznqbrlrZfnrKbkuLLooajnpLrmmL7npLrpu5jorqTmlofmnKxcclxuICAgICAgICBvblN1Y2Nlc3M6IGZ1bmN0aW9uKHJlc3VsdCkge30sXHJcbiAgICAgICAgb25GYWlsOiBmdW5jdGlvbihlcnIpIHt9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuICAvL2Rk5omT54K5XHJcbiAgc3RhdGljIGFjdGlvbkRpbmcodHlwZSkge1xyXG4gICAgaWYgKHR5cGVvZiBkZCAhPSBcInVuZGVmaW5lZFwiICYmIGFwcFR5cGUgPT0gXCJkaW5ndGFsa1wiKSB7XHJcbiAgICAgIGRkLmJpei51dGlsLnV0KHtcclxuICAgICAgICBrZXk6IFwib3Blbl9taWNyb19nZW5lcmFsX29wZXJhdFwiLCAvL+aJk+eCueWQjVxyXG4gICAgICAgIHZhbHVlOiB7XHJcbiAgICAgICAgICBjb3JwSWQ6IFN0b3JhZ2UuZ2V0U2Vzc2lvbihcImNvcnBJZFwiKSxcclxuICAgICAgICAgIGFnZW50SWQ6IFN0b3JhZ2UuZ2V0U2Vzc2lvbihcImFnZW50SWRcIiksXHJcbiAgICAgICAgICB0eXBlOiB0eXBlXHJcbiAgICAgICAgfSwgLy/miZPngrnkvKDlgLxcclxuICAgICAgICBvblN1Y2Nlc3M6IGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGUsIFwiKioqKioqKioq5omT54K5b25TdWNjZXNzKioqKioqKioqKioqKioqXCIpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb25GYWlsOiBmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGVyciwgXCIqKioqKioqKipvbkZhaWwqKioqKioqKioqKioqKipcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcbiAgLy8g5LiK5Lyg5Zu+54mHIG11bHRpcGxl77ya5piv5ZCm5LiK5Lyg5aSa5Liq77yM6buY6K6k5LiA5qyh5LiK5Lyg5LiA5LiqXHJcbiAgc3RhdGljIHVwbG9hZEltYWdlKG9uU3VjY2Vzcywgb25GYWlsLCBtdWx0aXBsZSA9IHRydWUpIHtcclxuICAgIEh0dHBDbGllbnQuQWpheFBvc3QoXCIvdXBsb2FkQXR0YWNobWVudC9nZXRVcGxvYWRNZXRob2RcIiwge30sIHJlc3VsdCA9PiB7XHJcbiAgICAgIGlmIChyZXN1bHQuc3VjY2Vzcykge1xyXG4gICAgICAgIGxldCBkYXRhID0gcmVzdWx0LmRhdGE7XHJcbiAgICAgICAgaWYgKGRhdGEuc3RhdGUpIHtcclxuICAgICAgICAgIGRkLmJpei51dGlsLnVwbG9hZEltYWdlKHtcclxuICAgICAgICAgICAgbXVsdGlwbGU6IG11bHRpcGxlLCAvL+aYr+WQpuWkmumAie+8jOm7mOiupGZhbHNlXHJcbiAgICAgICAgICAgIG1heDogOSwgLy/mnIDlpJrlj6/pgInkuKrmlbBcclxuICAgICAgICAgICAgb25TdWNjZXNzOiBmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICBpZiAob25TdWNjZXNzKSBvblN1Y2Nlc3MocmVzdWx0KTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgb25GYWlsOiBmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICBvbkZhaWwoZXJyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIC8v6ZKJ6ZKJ5paH5Lu25LiK5LygXHJcbiAgICAgICAgICBkZC5iaXoudXRpbC51cGxvYWRBdHRhY2htZW50KHtcclxuICAgICAgICAgICAgaW1hZ2U6IHtcclxuICAgICAgICAgICAgICBtdWx0aXBsZTogdHJ1ZSxcclxuICAgICAgICAgICAgICBtYXg6IG11bHRpcGxlID8gNiA6IDEsXHJcbiAgICAgICAgICAgICAgc3BhY2VJZDogZGF0YS5zcGFjZWlkXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNwYWNlOiB7XHJcbiAgICAgICAgICAgICAgY29ycElkOiBkYXRhLmFudElzdkNvcnBTdWl0ZS5jb3JwaWQsXHJcbiAgICAgICAgICAgICAgc3BhY2VJZDogZGF0YS5zcGFjZWlkLFxyXG4gICAgICAgICAgICAgIGlzQ29weTogMSxcclxuICAgICAgICAgICAgICBtYXg6IG11bHRpcGxlID8gNiA6IDFcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZmlsZToge1xyXG4gICAgICAgICAgICAgIHNwYWNlSWQ6IGRhdGEuc3BhY2VpZCxcclxuICAgICAgICAgICAgICBtYXg6IG11bHRpcGxlID8gNiA6IDFcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdHlwZXM6IFtcInBob3RvXCIsIFwiZmlsZVwiLCBcInNwYWNlXCJdLFxyXG4gICAgICAgICAgICBvblN1Y2Nlc3M6IGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgaWYgKG9uU3VjY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgb25TdWNjZXNzKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBvbkZhaWw6IGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgIG9uRmFpbChlcnIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuICAvL+mihOiniOWbvueJh1xyXG4gIHN0YXRpYyBwcmV2aWV3SW1hZ2UoZmlsZXMpIHtcclxuICAgIGlmIChmaWxlcy5maWxlSWQpIHtcclxuICAgICAgSHR0cENsaWVudC5BamF4UG9zdChcclxuICAgICAgICBcIi91cGxvYWRBdHRhY2htZW50L2F1dGhEaW5nRmlsZVByZXZpZXdcIixcclxuICAgICAgICBmaWxlcyxcclxuICAgICAgICByZXN1bHQgPT4ge1xyXG4gICAgICAgICAgaWYgKHJlc3VsdC5zdWNjZXNzKSB7XHJcbiAgICAgICAgICAgIGRkLmJpei5jc3BhY2UucHJldmlldyh7XHJcbiAgICAgICAgICAgICAgY29ycElkOiBTdG9yYWdlLmdldFNlc3Npb24oXCJjb3JwSWRcIiksXHJcbiAgICAgICAgICAgICAgc3BhY2VJZDogZmlsZXMuc3BhY2VJZCxcclxuICAgICAgICAgICAgICBmaWxlSWQ6IGZpbGVzLmZpbGVJZCxcclxuICAgICAgICAgICAgICBmaWxlTmFtZTogZmlsZXMuZmlsZU5hbWUsXHJcbiAgICAgICAgICAgICAgZmlsZVNpemU6IGZpbGVzLmZpbGVTaXplLFxyXG4gICAgICAgICAgICAgIGZpbGVUeXBlOiBmaWxlcy5maWxlVHlwZSxcclxuICAgICAgICAgICAgICBvblN1Y2Nlc3M6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgLy/ml6DvvIznm7TmjqXlnKjlvLnnqpfpobXpnaLmmL7npLrmlofku7bor6bnu4bkv6Hmga9cclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIG9uRmFpbDogZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbGV0IGRhdGUgPSBbXTtcclxuICAgICAgY29uc3QgdXJsID0gZmlsZXMuZmlsZVVybEFic29sdXRlXHJcbiAgICAgICAgPyBmaWxlcy5maWxlVXJsQWJzb2x1dGUucmVwbGFjZSgvXFxcXC9nLCBcIi9cIilcclxuICAgICAgICA6IGZpbGVzO1xyXG4gICAgICBsZXQgc3VmZml4SW5kZXggPSB1cmwubGFzdEluZGV4T2YoXCIuXCIpO1xyXG4gICAgICBsZXQgc3VmZml4ID0gdXJsLnN1YnN0cmluZyhzdWZmaXhJbmRleCArIDEpLnRvVXBwZXJDYXNlKCk7XHJcbiAgICAgIGlmIChcclxuICAgICAgICBzdWZmaXggIT0gXCJCTVBcIiAmJlxyXG4gICAgICAgIHN1ZmZpeCAhPSBcIkpQR1wiICYmXHJcbiAgICAgICAgc3VmZml4ICE9IFwiSlBFR1wiICYmXHJcbiAgICAgICAgc3VmZml4ICE9IFwiUE5HXCIgJiZcclxuICAgICAgICBzdWZmaXggIT0gXCJHSUZcIlxyXG4gICAgICApIHtcclxuICAgICAgICBUb2FzdC5mYWlsKFwi6Z2e5Zu+54mH5paH5Lu25LiN6IO95p+l55yLXCIpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICBpZiAoZGF0ZS5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgIGRhdGUucHVzaCh1cmwpO1xyXG4gICAgICB9XHJcbiAgICAgIGRkLmJpei51dGlsLnByZXZpZXdJbWFnZSh7XHJcbiAgICAgICAgdXJsczogZGF0ZSwgLy/lm77niYflnLDlnYDliJfooahcclxuICAgICAgICBjdXJyZW50OiB1cmwsIC8v5b2T5YmN5pi+56S655qE5Zu+54mH6ZO+5o6lXHJcbiAgICAgICAgb25TdWNjZXNzOiBmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgIC8qKi9cclxuICAgICAgICAgIC8vICAgY29uc29sZS5sb2cocmVzdWx0LCBcIi0tLS0tLS0tLXJlc3VsdC0tLS0tLS0tLS0tLS0tLS1cIik7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBvbkZhaWw6IGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgLy8gICBjb25zb2xlLmxvZyhlcnIsIFwiLS0tLS0tLS0tZXJyLS0tLS0tLS0tLS0tLS0tLVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuICAvL+W8ueahhlxyXG4gIHN0YXRpYyBhbGV0RGluZyhtZXNzYWdlLCB0aXRsZSwgYnV0dG9uTmFtZSwgb25Paykge1xyXG4gICAgaWYgKHR5cGVvZiBkZCAhPSBcInVuZGVmaW5lZFwiICYmIGFwcFR5cGUgPT0gXCJkaW5ndGFsa1wiKSB7XHJcbiAgICAgIGRkLmRldmljZS5ub3RpZmljYXRpb24uYWxlcnQoe1xyXG4gICAgICAgIG1lc3NhZ2U6IG1lc3NhZ2UsXHJcbiAgICAgICAgdGl0bGU6IHRpdGxlID8gdGl0bGUgOiBcIuaPkOekulwiLCAvL+WPr+S8oOepulxyXG4gICAgICAgIGJ1dHRvbk5hbWU6IGJ1dHRvbk5hbWUgPyBidXR0b25OYW1lIDogXCLnoa7lrppcIixcclxuICAgICAgICBvblN1Y2Nlc3M6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgaWYgKG9uT2spIHtcclxuICAgICAgICAgICAgb25PaygpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb25GYWlsOiBmdW5jdGlvbihlcnIpIHt9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy/orr7nva7oj5zljZVcclxuICBzdGF0aWMgc2V0TWVudShpdGVtcywgc3VjY2VzcywgZmFpbCkge1xyXG4gICAgaWYgKHR5cGVvZiBkZCAhPSBcInVuZGVmaW5lZFwiICYmIGFwcFR5cGUgPT0gXCJkaW5ndGFsa1wiKSB7XHJcbiAgICAgIGRkLmJpei5uYXZpZ2F0aW9uLnNldE1lbnUoe1xyXG4gICAgICAgIGl0ZW1zOiBpdGVtcyxcclxuICAgICAgICBvblN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgIGlmIChzdWNjZXNzKSB7XHJcbiAgICAgICAgICAgIHN1Y2Nlc3MoZGF0YSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBvbkZhaWw6IGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgZmFpbChlcnIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIC8v6aaW6aG16I+c5Y2VXHJcbiAgc3RhdGljIHNldE1lbnVIb21lKCkge1xyXG4gICAgdGhpcy5zZXRNZW51KFxyXG4gICAgICBbeyBpZDogXCJtb3JlXCIsIHRleHQ6IFwi5pu05aSaXCIgfV0sXHJcbiAgICAgICgpID0+IHtcclxuICAgICAgICB0aGlzLmFjdGlvblNoZWV0KFxyXG4gICAgICAgICAgXCJcIixcclxuICAgICAgICAgIFtcIue7rei0ueWNh+e6p1wiLCBcIuiBlOezu+acjeWKoeWVhlwiLCBcIuWKn+iDveW8leWvvFwiLCBcIuW4ruWKqeS4reW/g1wiXSxcclxuICAgICAgICAgIGluZGV4ID0+IHtcclxuICAgICAgICAgICAgaWYgKGluZGV4ID09IDApIHtcclxuICAgICAgICAgICAgICBSb3V0ZXIucHVzaChcIi9tb192ZXJzaW9uXCIpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGluZGV4ID09IDEpIHtcclxuICAgICAgICAgICAgICBSb3V0ZXIucHVzaChcIi9tb19mZWVkYmFja1wiKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChpbmRleCA9PSAyKSB7XHJcbiAgICAgICAgICAgICAgUm91dGVyLnB1c2goXCIvbW9fZ3VpZGVQYWdlXCIpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGluZGV4ID09IDMpIHtcclxuICAgICAgICAgICAgICBSb3V0ZXIucHVzaChcIi9tb19oZWxwXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgICAgfSxcclxuICAgICAgKCkgPT4ge31cclxuICAgICk7XHJcbiAgfVxyXG4gIC8v5Y+z5L6n6K6+572u5oyJ6ZKuXHJcbiAgc3RhdGljIHNldE1lbnVSaWdodCgpIHtcclxuICAgIGlmICh0eXBlb2YgZGQgIT0gXCJ1bmRlZmluZWRcIiAmJiBhcHBUeXBlID09IFwiZGluZ3RhbGtcIikge1xyXG4gICAgICBkZC5iaXoubmF2aWdhdGlvbi5zZXRSaWdodCh7XHJcbiAgICAgICAgc2hvdzogdHJ1ZSxcclxuICAgICAgICBjb250cm9sOiB0cnVlLFxyXG4gICAgICAgIHRleHQ6IFwi6K6+572uXCIsXHJcbiAgICAgICAgb25TdWNjZXNzOiBmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgIGlmIChyZXN1bHQuc3VjY2Vzcykge1xyXG4gICAgICAgICAgICBSb3V0ZXIucHVzaChcclxuICAgICAgICAgICAgICB0aGlzLnNldERkTmF2Q29sb3IoXCIvbW9fc2V0VXA/aWQ9XCIgKyB0aGlzLnByb3BzLnVybC5xdWVyeS5wcm9JZClcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIG9uRmFpbDogZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICBmYWlsKGVycik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcbiAgLy/pgInkurpcclxuICBzdGF0aWMgc2VsZWN0VXNlcihcclxuICAgIHNlbGVjdFVzZXIgPSBbXSxcclxuICAgIHRpdGxlLFxyXG4gICAgb25TdWNjZXNzLFxyXG4gICAgb25GYWlsLFxyXG4gICAgbXVsdGlwbGUgPSBmYWxzZVxyXG4gICkge1xyXG4gICAgbGV0IHVzZXJzID0gW107XHJcbiAgICBpZiAoc2VsZWN0VXNlciAmJiBzZWxlY3RVc2VyLmxlbmd0aCA+IDApIHtcclxuICAgICAgc2VsZWN0VXNlci5tYXAoaXRlbSA9PiB7XHJcbiAgICAgICAgdXNlcnMucHVzaChpdGVtLnVzZXJpZCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgbGV0IF90aGlzID0gdGhpcztcclxuICAgIGlmICh0eXBlb2YgZGQgIT0gXCJ1bmRlZmluZWRcIiAmJiBhcHBUeXBlID09IFwiZGluZ3RhbGtcIikge1xyXG4gICAgICBkZC5iaXouY29udGFjdC5jb21wbGV4UGlja2VyKHtcclxuICAgICAgICBzdGFydFdpdGhEZXBhcnRtZW50SWQ6IDAsIC8vLTHooajnpLrmiZPlvIDnmoTpgJrorq/lvZXku47oh6rlt7HmiYDlnKjpg6jpl6jlvIDlp4vlsZXnpLosIDDooajnpLrku47kvIHkuJrmnIDkuIrlsYLlvIDlp4vvvIwo5YW25LuW5pWw5a2X6KGo56S65LuO6K+l6YOo6Zeo5byA5aeLOuaaguaXtuS4jeaUr+aMgSlcclxuICAgICAgICBtdWx0aXBsZTogbXVsdGlwbGUgPyB0cnVlIDogZmFsc2UsIC8v5piv5ZCm5aSa6YCJ77yaIHRydWXlpJrpgIkgZmFsc2XljZXpgInvvJsg6buY6K6kdHJ1ZVxyXG4gICAgICAgIHBpY2tlZFVzZXJzOiB1c2VycywgLy/pu5jorqTpgInkuK3nmoTnlKjmiLfliJfooajvvIx1c2VyaWTvvJvmiJDlip/lm57osIPkuK3lupTljIXlkKvor6Xkv6Hmga9cclxuICAgICAgICBkaXNhYmxlZFVzZXJzOiBbXSwgLy8g5LiN6IO96YCJ5Lit55qE55So5oi35YiX6KGo77yM5ZGY5beldXNlcmlkXHJcbiAgICAgICAgY29ycElkOiBTdG9yYWdlLmdldFNlc3Npb24oXCJjb3JwSWRcIiksIC8v5LyB5LiaaWRcclxuICAgICAgICBtYXg6IG11bHRpcGxlID8gMTAwIDogMSwgLy/kurrmlbDpmZDliLbvvIzlvZNtdWx0aXBsZeS4unRydWXmiY3nlJ/mlYjvvIzlj6/pgInojIPlm7QxLTE1MDBcclxuICAgICAgICBsaW1pdFRpcHM6IFwiXCIsIC8v6LaF6L+H5Lq65pWw6ZmQ5Yi255qE5o+Q56S66K+t5Y+v5Lul55So6L+Z5Liq5a2X5q616Ieq5a6a5LmJXHJcbiAgICAgICAgaXNOZWVkU2VhcmNoOiB0cnVlLCAvLyDmmK/lkKbpnIDopoHmkJzntKLlip/og71cclxuICAgICAgICB0aXRsZTogdGl0bGUsIC8vIOWmguaenOS9oOmcgOimgeS/ruaUuemAieS6uumhtemdoueahHRpdGxl77yM5Y+v5Lul5Zyo6L+Z6YeM6LWL5YC8XHJcbiAgICAgICAgcmVzcG9uc2VVc2VyT25seTogdHJ1ZSwgLy/ov5Tlm57kurrvvIzmiJbogIXov5Tlm57kurrlkozpg6jpl6hcclxuICAgICAgICBsb2NhbDogXCJ0cnVlXCIsIC8vIOaYr+WQpuaYvuekuuacrOWcsOiBlOezu+S6uu+8jOm7mOiupGZhbHNlXHJcbiAgICAgICAgb25TdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgICBsZXQgdXNlcklkID0gZGF0YS51c2VycztcclxuICAgICAgICAgIEh0dHBDbGllbnQuQWpheFBvc3QoXCIvdXNlci9pc0F1dGhcIiwgdXNlcklkLCByZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXN1bHQpO1xyXG4gICAgICAgICAgICBpZiAocmVzdWx0LmRhdGEudHlwZSA9PSBcIjBcIikge1xyXG4gICAgICAgICAgICAgIG9uU3VjY2VzcyhyZXN1bHQuZGF0YS51c2VyczEpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHJlc3VsdC5kYXRhLnR5cGUgPT0gXCIxXCIpIHtcclxuICAgICAgICAgICAgICBkZC5kZXZpY2Uubm90aWZpY2F0aW9uLmNvbmZpcm0oe1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogcmVzdWx0LmRhdGEubWVzc2FnZSxcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBcIuaPkOekulwiLFxyXG4gICAgICAgICAgICAgICAgYnV0dG9uTGFiZWxzOiBbcmVzdWx0LmRhdGEubGFiZWxdLFxyXG4gICAgICAgICAgICAgICAgb25TdWNjZXNzOiBmdW5jdGlvbihyZXN1bHREYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgIG9uU3VjY2VzcyhyZXN1bHQuZGF0YS51c2Vycyk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgb25GYWlsOiBmdW5jdGlvbihlcnIpIHt9XHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzdWx0LmRhdGEudHlwZSA9PSBcIjJcIikge1xyXG4gICAgICAgICAgICAgIGRkLmRldmljZS5ub3RpZmljYXRpb24uY29uZmlybSh7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiByZXN1bHQuZGF0YS5tZXNzYWdlLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwi5o+Q56S6XCIsXHJcbiAgICAgICAgICAgICAgICBidXR0b25MYWJlbHM6IFtyZXN1bHQuZGF0YS5sYWJlbCwgXCLlj5bmtohcIl0sXHJcbiAgICAgICAgICAgICAgICBvblN1Y2Nlc3M6IGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICBpZiAocmVzdWx0LmJ1dHRvbkluZGV4ID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5zZWxlY3RVc2VyKFxyXG4gICAgICAgICAgICAgICAgICAgICAgc2VsZWN0VXNlcixcclxuICAgICAgICAgICAgICAgICAgICAgIHRpdGxlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgb25TdWNjZXNzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgb25GYWlsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgbXVsdGlwbGVcclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgb25GYWlsOiBmdW5jdGlvbihlcnIpIHt9XHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb25GYWlsOiBmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgIG9uRmFpbChlcnIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIC8v6I635Y+W5omL5py65Z6L5Y+3XHJcbiAgc3RhdGljIGdldFBob25lSW5mbyhmbiwgZXJyb3IpIHtcclxuICAgIGlmICh0eXBlb2YgZGQgIT0gXCJ1bmRlZmluZWRcIiAmJiBhcHBUeXBlID09IFwiZGluZ3RhbGtcIikge1xyXG4gICAgICBkZC5kZXZpY2UuYmFzZS5nZXRQaG9uZUluZm8oe1xyXG4gICAgICAgIG9uU3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgaWYgKGRhdGEuYnJhbmQpIHtcclxuICAgICAgICAgICAgU3RvcmFnZS5zZXRQaG9uZVZlcnNpb24oZGF0YS5icmFuZCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAoZm4pIHtcclxuICAgICAgICAgICAgZm4oKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIC8qXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JlZW5XaWR0aDogMTA4MCwgLy8g5omL5py65bGP5bmV5a695bqmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcmVlbkhlaWdodDogMTkyMCwgLy8g5omL5py65bGP5bmV6auY5bqmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyYW5kOidNaSfvvIwgLy8g5omL5py65ZOB54mMXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOidOb3RlNCcsIC8vIOaJi+acuuWei+WPt1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2ZXJzaW9uOic3LjAnLiAvLyDniYjmnKxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV0SW5mbzond2lmaScgLCAvLyDnvZHnu5znsbvlnosgd2lmae+8jzRn77yPM2cgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdG9yVHlwZSA6J3h4JyAvLyDov5DokKXllYbkv6Hmga9cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgKi9cclxuICAgICAgICB9LFxyXG4gICAgICAgIG9uRmFpbDogZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgZXJyb3IoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuICAvL+WIpOaWreaYr+WQpmlvc1xyXG4gIHN0YXRpYyBpc0lvcygpIHtcclxuICAgIGlmIChcclxuICAgICAgU3RvcmFnZS5nZXRTZXNzaW9uKFwicGhvbmVWZXJzaW9uXCIpID09IFwiaW9zXCIgfHxcclxuICAgICAgU3RvcmFnZS5nZXRTZXNzaW9uKFwicGhvbmVWZXJzaW9uXCIpID09IFwiaVBob25lXCJcclxuICAgICkge1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcbiAgLy/liKTmlq3mmK/lkKZhbmRyb2lkXHJcbiAgc3RhdGljIGlzQW5kcm9pZCgpIHtcclxuICAgIGlmIChcclxuICAgICAgU3RvcmFnZS5nZXRTZXNzaW9uKFwicGhvbmVWZXJzaW9uXCIpID09IFwiYW5kcm9pZFwiIHx8XHJcbiAgICAgIFN0b3JhZ2UuZ2V0U2Vzc2lvbihcInBob25lVmVyc2lvblwiKSAhPSBcImlQaG9uZVwiXHJcbiAgICApIHtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgfVxyXG4gIC8v5Y2V6YCJ5YiX6KGoXHJcbiAgc3RhdGljIGFjdGlvblNoZWV0KHRpdGxlLCBidXR0cywgZm4sIGVycm9yKSB7XHJcbiAgICBpZiAodHlwZW9mIGRkICE9IFwidW5kZWZpbmVkXCIgJiYgYXBwVHlwZSA9PSBcImRpbmd0YWxrXCIpIHtcclxuICAgICAgaWYgKGJ1dHRzICYmIGJ1dHRzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICBkZC5kZXZpY2Uubm90aWZpY2F0aW9uLmFjdGlvblNoZWV0KHtcclxuICAgICAgICAgIHRpdGxlOiB0aXRsZSwgLy/moIfpophcclxuICAgICAgICAgIGNhbmNlbEJ1dHRvbjogXCLlj5bmtohcIiwgLy/lj5bmtojmjInpkq7mlofmnKxcclxuICAgICAgICAgIG90aGVyQnV0dG9uczogYnV0dHMsXHJcbiAgICAgICAgICBvblN1Y2Nlc3M6IGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICBpZiAoZm4pIHtcclxuICAgICAgICAgICAgICBmbihyZXN1bHQuYnV0dG9uSW5kZXgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vb25TdWNjZXNz5bCG5Zyo54K55Ye7YnV0dG9u5LmL5ZCO5Zue6LCDXHJcbiAgICAgICAgICAgIC8qe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnV0dG9uSW5kZXg6IDAgLy/ooqvngrnlh7vmjInpkq7nmoTntKLlvJXlgLzvvIxOdW1iZXLvvIzku44w5byA5aeLLCDlj5bmtojmjInpkq7kuLotMVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9Ki9cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBvbkZhaWw6IGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICBlcnJvcigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgLy/ljZXpgInliJfooahcclxuICBzdGF0aWMgb3BlbkxpbmsodXJsKSB7XHJcbiAgICBpZiAodHlwZW9mIGRkICE9IFwidW5kZWZpbmVkXCIgJiYgYXBwVHlwZSA9PSBcImRpbmd0YWxrXCIpIHtcclxuICAgICAgZGQuYml6LnV0aWwub3Blbkxpbmsoe1xyXG4gICAgICAgIHVybDogdXJsLFxyXG4gICAgICAgIG9uU3VjY2VzczogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAvLyAgIGNvbnNvbGUubG9nKFwiLS0tLS0tLS0tLS1vblN1Y2Nlc3MtLS0tLS0tLVwiKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIG9uRmFpbDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAvLyAgIGNvbnNvbGUubG9nKFwiLS0tLS0tLS0tLS1vbkZhaWwtLS0tLS0tcy1cIik7XHJcbiAgICAgICAgICB3aW5kb3cub3Blbih1cmwpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIC8v6I635Y+W6ZKJ6ZKJ5YWN55m7IGNvZGVcclxuICBzdGF0aWMgZ2V0TG9naW5Db2RlKGNvcnBpZCwgc3VjY2VzcywgZmFpbCkge1xyXG4gICAgaWYgKHR5cGVvZiBkZCAhPSBcInVuZGVmaW5lZFwiICYmIGFwcFR5cGUgPT0gXCJkaW5ndGFsa1wiKSB7XHJcbiAgICAgIGRkLnJ1bnRpbWUucGVybWlzc2lvbi5yZXF1ZXN0QXV0aENvZGUoe1xyXG4gICAgICAgIGNvcnBJZDogY29ycGlkLFxyXG4gICAgICAgIG9uU3VjY2VzczogZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICBpZiAoc3VjY2Vzcykge1xyXG4gICAgICAgICAgICBzdWNjZXNzKHJlc3VsdC5jb2RlKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIG9uRmFpbDogZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICBmYWlsKGVycik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcbiAgLy/pkonpkonlhbPpl63pobXpnaJcclxuICBzdGF0aWMgZGluZ3RhbGtDbG9zZVBhZ2UoKSB7XHJcbiAgICBpZiAodHlwZW9mIGRkICE9IFwidW5kZWZpbmVkXCIgJiYgYXBwVHlwZSA9PSBcImRpbmd0YWxrXCIpIHtcclxuICAgICAgZGQuYml6Lm5hdmlnYXRpb24uY2xvc2Uoe1xyXG4gICAgICAgIG9uU3VjY2VzczogZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAvLyAgIGNvbnNvbGUubG9nKHJlc3VsdCwgXCItLS0tLS0tLS0tLWNsb3NlUGFnZS5yZXN1bHQtLS0tLS0tLS0tXCIpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb25GYWlsOiBmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgIC8vICAgY29uc29sZS5sb2cocmVzdWx0LCBcIi0tLS0tLS0tLS0tY2xvc2VQYWdlLnJlc3VsdC0tLS0tLS0tLS1cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcbiAgLy/pgIDlh7rlhbPpl63pobXpnaLmlrnms5VcclxuICBzdGF0aWMgY2xvc2VQYWdlKCkge1xyXG4gICAgLy/pgIDlh7rliLDmnIDlkI7lhbPpl63pobXpnaJcclxuICAgIGlmIChcclxuICAgICAgUm91dGVyLnJvdXRlciAmJlxyXG4gICAgICBSb3V0ZXIucm91dGVyLmFzUGF0aCAmJlxyXG4gICAgICBSb3V0ZXIucm91dGVyLmFzUGF0aC5pbmRleE9mKFwiL2RpbmdUYWxrTG9naW5cIikgIT0gLTFcclxuICAgICkge1xyXG4gICAgICB0aGlzLmRpbmd0YWxrQ2xvc2VQYWdlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHN0YXRpYyBzZXRRdWVzdGlvblVybCh1cmwpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIHZpc2l0VXJsICsgXCIvc3RhdGljL3JlYWN0LXN0YXRpYy9tb2JpbGUtMS4xLjQvcXVlc3Rpb25cIiArIHVybCArIFwiLnBuZ1wiXHJcbiAgICApO1xyXG4gIH1cclxuICAvL+iuvue9rumSiemSieWktOmDqOminOiJslxyXG4gIHN0YXRpYyBzZXREZE5hdkNvbG9yKHVybCkge1xyXG4gICAgaWYgKHVybCkge1xyXG4gICAgICB1cmwgPVxyXG4gICAgICAgIHVybC5pbmRleE9mKFwiP1wiKSAhPSAtMVxyXG4gICAgICAgICAgPyB1cmwgKyBcIiZkZF9uYXZfYmdjb2xvcj1GRjEwOEVFOVwiXHJcbiAgICAgICAgICA6IHVybCArIFwiP2RkX25hdl9iZ2NvbG9yPUZGMTA4RUU5XCI7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdXJsO1xyXG4gIH1cclxuICAvL+aOiOadg0pzQXBp5o6l5Y+jXHJcbiAgc3RhdGljIGF1dGhEaW5nSnNBcGkob25TdWNjZXNzLCB1cmxEYXRhKSB7XHJcbiAgICBsZXQgY29ycElkID0gU3RvcmFnZS5nZXRTZXNzaW9uKFwiY29ycElkXCIpO1xyXG4gICAgLy92YXIgdXJsRGF0YSA9IGVuY29kZVVSSUNvbXBvbmVudChsb2NhdGlvbi5ocmVmLnNwbGl0KCcjJylbMF0pO1xyXG4gICAgLy92YXIgdXJsRGF0YSA9IGVuY29kZVVSSUNvbXBvbmVudChcImh0dHBzOi8vZGR5LmFudGJpbS5uZXQvbW9fZGluZ1RhbGtMb2dpbj9TdWl0ZUtleT1zdWl0ZWdqMnczZHhpY2N6YnhkZmUmY29ycGlkPVwiK2NvcnBJZCtcIiZkZF9uYXZfYmdjb2xvcj1GRjEwOEVFOVwiKTtcclxuICAgIGlmICghdXJsRGF0YSkge1xyXG4gICAgICB1cmxEYXRhID0gZW5jb2RlVVJJQ29tcG9uZW50KGxvY2F0aW9uLmhyZWYuc3BsaXQoXCIjXCIpWzBdKTtcclxuICAgIH1cclxuICAgIGNvcnBJZCA9IGNvcnBJZCA/IGNvcnBJZCA6IFwiXCI7XHJcbiAgICBIdHRwQ2xpZW50LkFqYXhQb3N0KFxyXG4gICAgICBcIi9kaW5nVGFsay9tb2JpbGVqcz91cmxEYXRhPVwiICsgdXJsRGF0YSArIFwiJmNvcnBpZD1cIiArIGNvcnBJZCxcclxuICAgICAgXCJcIixcclxuICAgICAgcmVzdWx0ID0+IHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXN1bHQsIHVybERhdGEpO1xyXG4gICAgICAgIGlmIChyZXN1bHQuc3VjY2Vzcykge1xyXG4gICAgICAgICAgbGV0IGRhdGEgPSByZXN1bHQuZGF0YTtcclxuICAgICAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgICAgIFN0b3JhZ2Uuc2V0U2Vzc2lvbihcImNvcnBJZFwiLCBkYXRhLmNvcnBpZCk7XHJcbiAgICAgICAgICAgIFN0b3JhZ2Uuc2V0U2Vzc2lvbihcImFnZW50SWRcIiwgZGF0YS5hcHBpZCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBkZC5jb25maWcoe1xyXG4gICAgICAgICAgICBhZ2VudElkOiBkYXRhLmFwcGlkLCAvLyDlv4XloavvvIzlvq7lupTnlKhJRFxyXG4gICAgICAgICAgICBjb3JwSWQ6IGRhdGEuY29ycGlkLCAvL+W/heWhq++8jOS8geS4mklEXHJcbiAgICAgICAgICAgIHRpbWVTdGFtcDogZGF0YS50aW1lU3RhbXAsIC8vIOW/heWhq++8jOeUn+aIkOetvuWQjeeahOaXtumXtOaIs1xyXG4gICAgICAgICAgICBub25jZVN0cjogZGF0YS5ub25jZVN0ciwgLy8g5b+F5aGr77yM55Sf5oiQ562+5ZCN55qE6ZqP5py65LiyXHJcbiAgICAgICAgICAgIHNpZ25hdHVyZTogZGF0YS5zaWduYXR1cmUsIC8vIOW/heWhq++8jOetvuWQjVxyXG4gICAgICAgICAgICB0eXBlOiAwLCAvL+mAieWhq+OAgjDooajnpLrlvq7lupTnlKjnmoRqc2FwaSwx6KGo56S65pyN5Yqh56qX55qEanNhcGnjgILkuI3loavpu5jorqTkuLow44CC6K+l5Y+C5pWw5LuOZGluZ3RhbGsuanPnmoQwLjguM+eJiOacrOW8gOWni+aUr+aMgVxyXG4gICAgICAgICAgICBqc0FwaUxpc3Q6IFtcclxuICAgICAgICAgICAgICBcInJ1bnRpbWUuaW5mb1wiLFxyXG4gICAgICAgICAgICAgIFwiYml6LmNvbnRhY3QuY29tcGxleFBpY2tlclwiLFxyXG4gICAgICAgICAgICAgIFwiYml6LnV0aWwudXRcIixcclxuICAgICAgICAgICAgICBcImJpei51dGlsLnVwbG9hZEltYWdlXCIsXHJcbiAgICAgICAgICAgICAgXCJiaXoudXRpbC5wcmV2aWV3SW1hZ2VcIixcclxuICAgICAgICAgICAgICBcImJpei5uYXZpZ2F0aW9uLnNldFRpdGxlXCIsXHJcbiAgICAgICAgICAgICAgXCJydW50aW1lLnBlcm1pc3Npb24ucmVxdWVzdEF1dGhDb2RlXCIsXHJcbiAgICAgICAgICAgICAgXCJiaXoudXRpbC51cGxvYWRBdHRhY2htZW50XCIsXHJcbiAgICAgICAgICAgICAgXCJiaXouY3NwYWNlLnByZXZpZXdcIixcclxuICAgICAgICAgICAgICBcImJpei5uYXZpZ2F0aW9uLnNldFJpZ2h0XCJcclxuICAgICAgICAgICAgXSAvLyDlv4XloavvvIzpnIDopoHkvb/nlKjnmoRqc2FwaeWIl+ihqO+8jOazqOaEj++8muS4jeimgeW4pmRk44CCXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIGRkLmVycm9yKGZ1bmN0aW9uKGVycm9yKSB7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiZGluZ3RhbGsgZXJyb3I6IFwiICsgSlNPTi5zdHJpbmdpZnkoZXJyb3IpKTtcclxuICAgICAgICAgICAgbGV0IHVybCA9IFwidXJsRGF0YeS4uuepulwiO1xyXG4gICAgICAgICAgICBpZiAodXJsRGF0YSkge1xyXG4gICAgICAgICAgICAgIHVybCA9IEpTT04uc3RyaW5naWZ5KHVybERhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIEh0dHBDbGllbnQuQWpheFBvc3QoXHJcbiAgICAgICAgICAgICAgXCIvZGluZ1RhbGsvc2F2ZURkY29uZmlnRXJyb3JcIixcclxuICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZW1hcmtzOlxyXG4gICAgICAgICAgICAgICAgICBcImRpbmd0YWxrOlwiICtcclxuICAgICAgICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoZXJyb3IpICtcclxuICAgICAgICAgICAgICAgICAgXCIsY29ycElkOlwiICtcclxuICAgICAgICAgICAgICAgICAgY29ycElkICtcclxuICAgICAgICAgICAgICAgICAgXCIsdXJsRGF0YTpcIiArXHJcbiAgICAgICAgICAgICAgICAgIGRlY29kZVVSSUNvbXBvbmVudCh1cmxEYXRhKSArXHJcbiAgICAgICAgICAgICAgICAgIFwiLGlzSW9zOlwiICtcclxuICAgICAgICAgICAgICAgICAgZGQuaW9zICtcclxuICAgICAgICAgICAgICAgICAgXCIsdXJsSlNPTjpcIiArXHJcbiAgICAgICAgICAgICAgICAgIHVybFxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgbGlzdCA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIuS/neWtmERELkNPTkZJR+mUmeivr+aIkOWKn1wiKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIGlmIChvblN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICBvblN1Y2Nlc3MoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBkZC5yZWFkeShmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCIqKioqKioqKioqKioqKipyZWFkeSoqKioqKioqKioqKioqKioqKioqKipcIik7XHJcbiAgICAgICAgICAgIGlmIChvblN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICBvblN1Y2Nlc3MoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICApO1xyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi91dGlscy9kaW5ndGFsay5qcyIsImltcG9ydCBIdHRwQ2xpZW50IGZyb20gXCIuLi9hcGkvaHR0cENsaWVudFwiO1xyXG5leHBvcnQgY29uc3QgTE9HSU4gPSBcIkxPR0lOXCI7XHJcbmV4cG9ydCBjb25zdCBESU5HVEFLX0NPREUgPSBcIkRJTkdUQUtfQ09ERVwiO1xyXG5leHBvcnQgY29uc3QgRElOR1RBS19DT0RFX0xPR0lOID0gXCJESU5HVEFLX0NPREVfTE9HSU5cIjtcclxuZXhwb3J0IGNvbnN0IFVTRVJfTUVTU0FHRSA9IFwiVVNFUl9NRVNTQUdFXCI7XHJcbmV4cG9ydCBjb25zdCBTRVRfVVJMREFUQSA9IFwiU0VUX1VSTERBVEFcIjtcclxuZXhwb3J0IGNvbnN0IFNFVF9NRVNTQUdFX0NPVU5UID0gXCJTRVRfTUVTU0FHRV9DT1VOVFwiO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNvbnRlbnQoZGF0YSwgdHlwZSkge1xyXG4gIHJldHVybiB7XHJcbiAgICB0eXBlOiB0eXBlLFxyXG4gICAgcGF5bG9hZDogZGF0YVxyXG4gIH07XHJcbn1cclxuXHJcbi8vIOiOt+WPluWboumYn1xyXG5leHBvcnQgZnVuY3Rpb24gbG9naW4obmFtZSwgcGFzc3dvcmQpIHtcclxuICByZXR1cm4gZGlzcGF0Y2ggPT4ge1xyXG4gICAgSHR0cENsaWVudC5BamF4UG9zdChcclxuICAgICAgXCIvdXNlci9sb2dpblVzZXJcIixcclxuICAgICAgeyBsb2dpbk5hbWU6IG5hbWUsIHBhc3N3b3JkOiBwYXNzd29yZCB9LFxyXG4gICAgICBsaXN0ID0+IHtcclxuICAgICAgICBkaXNwYXRjaChjb250ZW50KGxpc3QsIExPR0lOKSk7XHJcbiAgICAgIH1cclxuICAgICk7XHJcbiAgfTtcclxufVxyXG5cclxuLy/kv53lrZjliJ3mrKHnmbvlvZXkvb/nlKjnmoR1cmxcclxuZXhwb3J0IGZ1bmN0aW9uIHNldFVybERhdGEodXJsRGF0YSkge1xyXG4gIHJldHVybiB7XHJcbiAgICB0eXBlOiBTRVRfVVJMREFUQSxcclxuICAgIHBheWxvYWQ6IHVybERhdGFcclxuICB9O1xyXG59XHJcblxyXG4vL+aUtumbhkRELkNPTkZJR+mUmeivr1xyXG5leHBvcnQgZnVuY3Rpb24gc2F2ZURkY29uZmlnRXJyb3IoZXJyKSB7XHJcbiAgcmV0dXJuIGRpc3BhdGNoID0+IHtcclxuICAgIEh0dHBDbGllbnQuQWpheFBvc3QoXHJcbiAgICAgIFwiL2RpbmdUYWxrL3NhdmVEZGNvbmZpZ0Vycm9yXCIsXHJcbiAgICAgIHsgcmVtYXJrczogZXJyIH0sXHJcbiAgICAgIGxpc3QgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi5L+d5a2YREQuQ09ORklH6ZSZ6K+v5oiQ5YqfXCIpO1xyXG4gICAgICB9XHJcbiAgICApO1xyXG4gIH07XHJcbn1cclxuXHJcbi8vIOiOt+WPlumSiemSieWFjeeZu2NvZGVcclxuZXhwb3J0IGZ1bmN0aW9uIG1vYmlsZWpzKGNvcnBpZCwgU3VpdGVLZXksIHVybERhdGEpIHtcclxuICByZXR1cm4gZGlzcGF0Y2ggPT4ge1xyXG4gICAgSHR0cENsaWVudC5BamF4UG9zdChcclxuICAgICAgXCIvZGluZ1RhbGsvbW9iaWxlanM/Y29ycGlkPVwiICtcclxuICAgICAgICBjb3JwaWQgK1xyXG4gICAgICAgIFwiJlN1aXRlS2V5PVwiICtcclxuICAgICAgICBTdWl0ZUtleSArXHJcbiAgICAgICAgXCImdXJsRGF0YT1cIiArXHJcbiAgICAgICAgdXJsRGF0YSxcclxuICAgICAgXCJcIixcclxuICAgICAgbGlzdCA9PiB7XHJcbiAgICAgICAgZGlzcGF0Y2goY29udGVudChsaXN0LCBESU5HVEFLX0NPREUpKTtcclxuICAgICAgfVxyXG4gICAgKTtcclxuICB9O1xyXG59XHJcblxyXG4vLyDpkonpkoljb2Rl55m75b2VXHJcbmV4cG9ydCBmdW5jdGlvbiBkaW5ndGFsa0NvZGVMb2dpbihjb2RlLCBjb3JwaWQpIHtcclxuICByZXR1cm4gZGlzcGF0Y2ggPT4ge1xyXG4gICAgSHR0cENsaWVudC5BamF4UG9zdChcclxuICAgICAgXCIvdXNlci9kaW5ndGFsa01vYmlsZUNvZGVMb2dpbj9jb2RlPVwiICsgY29kZSArIFwiJmNvcnBpZD1cIiArIGNvcnBpZCxcclxuICAgICAgXCJcIixcclxuICAgICAgbGlzdCA9PiB7XHJcbiAgICAgICAgZGlzcGF0Y2goY29udGVudChsaXN0LCBESU5HVEFLX0NPREVfTE9HSU4pKTtcclxuICAgICAgfVxyXG4gICAgKTtcclxuICB9O1xyXG59XHJcblxyXG4vLyDpgJrnn6Xkv6Hmga9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldE1lc3NhZ2VCeVVzZXIocGFnZU5vLCBmbikge1xyXG4gIHJldHVybiBkaXNwYXRjaCA9PiB7XHJcbiAgICBIdHRwQ2xpZW50LkFqYXhQb3N0KFxyXG4gICAgICBcIi9tZXNzYWdlL2ZpbmRNZXNzYWdlP3BhZ2VObz1cIiArIHBhZ2VObyArIFwiJnJlYWQ9XCIsXHJcbiAgICAgIFwiXCIsXHJcbiAgICAgIGxpc3QgPT4ge1xyXG4gICAgICAgIGlmIChmbikge1xyXG4gICAgICAgICAgZm4oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJtZXNzTGlzdFwiLCBsaXN0KTtcclxuICAgICAgICBkaXNwYXRjaChjb250ZW50KHsgbGlzdDogbGlzdCwgcGFnZU5vOiBwYWdlTm8gfSwgVVNFUl9NRVNTQUdFKSk7XHJcbiAgICAgIH1cclxuICAgICk7XHJcbiAgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNldE1lc3NhZ2VDb3VudChpZCkge1xyXG4gIHJldHVybiBkaXNwYXRjaCA9PiB7XHJcbiAgICBkaXNwYXRjaChjb250ZW50KGlkLCBTRVRfTUVTU0FHRV9DT1VOVCkpO1xyXG4gIH07XHJcbn1cclxuXHJcbi8v5byV5a+86aG1XHJcbmV4cG9ydCBmdW5jdGlvbiBndWlkZVBhZ2UoZm4pIHtcclxuICBjb25zdCB2ZXJzaW9uID0gSHR0cENsaWVudC5nZXRWZXJzaW9uKCk7XHJcbiAgcmV0dXJuIGRpc3BhdGNoID0+IHtcclxuICAgIEh0dHBDbGllbnQuQWpheFBvc3QoXHJcbiAgICAgIFwiL3VzZXIvdXBkYXRlTG9naW5TdGF0ZT90eXBlPXBob25lJnZlcnNpb249XCIgKyB2ZXJzaW9uLFxyXG4gICAgICBcIlwiLFxyXG4gICAgICBsaXN0ID0+IHtcclxuICAgICAgICBpZiAoZm4pIHtcclxuICAgICAgICAgIGZuKGxpc3QpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgKTtcclxuICB9O1xyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FjdGlvbnMvdXNlci5qcyIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IFN0b3JhZ2UgZnJvbSBcIi4vc3RvcmFnZVwiO1xyXG5pbXBvcnQgeyBJY29uIH0gZnJvbSBcImFudGQtbW9iaWxlXCI7XHJcbmxldCBmbGFnID0gdHJ1ZTtcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXRpbHMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gIC8vIOi/lOWbnuS4reaWh+Wtl+espumVv+W6plxyXG4gIHN0YXRpYyBnZXRCeXRlTGVuKHZhbCkge1xyXG4gICAgaWYgKHZhbCkge1xyXG4gICAgICB2YXIgbGVuID0gMDtcclxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2YWwubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB2YXIgYSA9IHZhbC5jaGFyQXQoaSk7XHJcbiAgICAgICAgYS5tYXRjaCgvW15cXHgwMC1cXHhmZl0vZ2kpO1xyXG4gICAgICAgIGxlbiArPSAyO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBNYXRoLnJvdW5kKGxlbiAvIDIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgbGlzdFNjcm9sbChlKSB7XHJcbiAgICBsZXQgc2Nyb2xsVG9wID0gTWF0aC5jZWlsKE1hdGgucm91bmQoZS50YXJnZXQuc2Nyb2xsVG9wKSk7XHJcbiAgICBsZXQgY2xpZW50SGVpZ2h0ID0gTWF0aC5jZWlsKE1hdGgucm91bmQoZS50YXJnZXQuY2xpZW50SGVpZ2h0KSk7XHJcbiAgICBsZXQgc2Nyb2xsSGVpZ2h0ID0gTWF0aC5jZWlsKE1hdGgucm91bmQoZS50YXJnZXQuc2Nyb2xsSGVpZ2h0KSk7XHJcbiAgICBpZiAoXHJcbiAgICAgIHNjcm9sbFRvcCArIGNsaWVudEhlaWdodCA9PSBzY3JvbGxIZWlnaHQgfHxcclxuICAgICAgc2Nyb2xsVG9wICsgY2xpZW50SGVpZ2h0ID09IHNjcm9sbEhlaWdodCAtIDEgfHxcclxuICAgICAgc2Nyb2xsVG9wICsgY2xpZW50SGVpZ2h0ID09IHNjcm9sbEhlaWdodCArIDFcclxuICAgICkge1xyXG4gICAgICBpZiAoZmxhZykge1xyXG4gICAgICAgIGZsYWcgPSBmYWxzZTtcclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgZmxhZyA9IHRydWU7XHJcbiAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7IC8vIOa7keWIsOW6leS6hlxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gZmFsc2U7IC8vIOayoea7keWIsOW6lVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8g5qC55o2u6aKc6Imy5Luj56CB6L+U5Zue5qC35byP5ZCN5a2XICAgLyogdHlwZTogMiDlhazlhbHmoIfnrb7vvIwx5Liq5Lq65qCH562+ICovXHJcbiAgc3RhdGljIGdldFRhZ0NvbG9yQnlDb2xvckNvZGUodHlwZSwgY29sb3JDb2RlKSB7XHJcbiAgICBsZXQgY29kZSA9IFwiXCI7XHJcbiAgICBzd2l0Y2ggKGNvbG9yQ29kZSkge1xyXG4gICAgICBjYXNlIFwiZmRiYjc4XCI6XHJcbiAgICAgICAgY29kZSA9IHR5cGUgPT09IFwiMVwiID8gXCJ0YWdfbXkwMV9mZGJiNzhcIiA6IFwidGFnX2FsbDAxX2ZkYmI3OFwiO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiZjI5Yjc2XCI6XHJcbiAgICAgICAgY29kZSA9IHR5cGUgPT09IFwiMVwiID8gXCJ0YWdfbXkwMl9mMjliNzZcIiA6IFwidGFnX2FsbDAyX2YyOWI3NlwiO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiNzVjY2ZmXCI6XHJcbiAgICAgICAgY29kZSA9IHR5cGUgPT09IFwiMVwiID8gXCJ0YWdfbXkwM183NWNjZmZcIiA6IFwidGFnX2FsbDAzXzc1Y2NmZlwiO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiODljOTk3XCI6XHJcbiAgICAgICAgY29kZSA9IHR5cGUgPT09IFwiMVwiID8gXCJ0YWdfbXkwNF84OWM5OTdcIiA6IFwidGFnX2FsbDA0Xzg5Yzk5N1wiO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiYzhjNGZjXCI6XHJcbiAgICAgICAgY29kZSA9IHR5cGUgPT09IFwiMVwiID8gXCJ0YWdfbXkwNV9jOGM0ZmNcIiA6IFwidGFnX2FsbDA1X2M4YzRmY1wiO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiZjUyMjJkXCI6XHJcbiAgICAgICAgY29kZSA9IHR5cGUgPT09IFwiMVwiID8gXCJ0YWdfbXkwNl9mNTIyMmRcIiA6IFwidGFnX2FsbDA2X2Y1MjIyZFwiO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiNzk1NTQ4XCI6XHJcbiAgICAgICAgY29kZSA9IHR5cGUgPT09IFwiMVwiID8gXCJ0YWdfbXkwN183OTU1NDhcIiA6IFwidGFnX2FsbDA3Xzc5NTU0OFwiO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiNjY2NjY2XCI6XHJcbiAgICAgICAgY29kZSA9IHR5cGUgPT09IFwiMVwiID8gXCJ0YWdfbXkwOF82NjY2NjZcIiA6IFwidGFnX2FsbDA4XzY2NjY2NlwiO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIGNvZGUgPSB0eXBlID09PSBcIjFcIiA/IFwidGFnX215MDFfZmRiYjc4XCIgOiBcInRhZ19hbGwwMV9mZGJiNzhcIjtcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICAgIHJldHVybiBjb2RlO1xyXG4gIH1cclxuXHJcbiAgLy8g5o+Q5Y+WaHRtbOWtl+espuS4sumHjOeahGltZ1xyXG4gIHN0YXRpYyBHZXRJbWdMaXN0RnJvbVN0cmluZyhzdHIpIHtcclxuICAgIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgZGl2LmlubmVySFRNTCA9IHN0cjtcclxuICAgIHZhciBpbWdMaXN0ID0gW107XHJcbiAgICBpbWdMaXN0ID0gZGl2LnF1ZXJ5U2VsZWN0b3JBbGwoXCJpbWdcIik7XHJcbiAgICByZXR1cm4gaW1nTGlzdDtcclxuICB9XHJcblxyXG4gIC8vIOagueaNruWcsOWdgOaPkOWPluWbvueJh+WQjeensFxyXG4gIHN0YXRpYyBnZXRGaWxlTmFtZUJ5VXJsKHVybCkge1xyXG4gICAgbGV0IG9uZSA9IHVybC5zcGxpdChcIi9cIik7XHJcbiAgICBsZXQgbmFtZSA9IG9uZVtvbmUubGVuZ3RoIC0gMV07XHJcbiAgICByZXR1cm4gbmFtZTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBkZWxJbWdTdHJpbmdCeVNyYyhzcmMsIHN0cmluZykge1xyXG4gICAgbGV0IG9iakUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgb2JqRS5pbm5lckhUTUwgPSBzdHJpbmc7XHJcbiAgICAvL2NvbnNvbGUubG9nKG9iakUuY2hpbGROb2RlcywxKTtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9iakUuY2hpbGROb2Rlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBpZiAob2JqRS5jaGlsZE5vZGVzW2ldLnNyYyA9PSBzcmMpIHtcclxuICAgICAgICBvYmpFLnJlbW92ZUNoaWxkKG9iakUuY2hpbGROb2Rlc1tpXSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIC8vY29uc29sZS5sb2cob2JqRS5jaGlsZE5vZGVzLDExMSk7XHJcblxyXG4gICAgdmFyIHRtcE5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgdG1wTm9kZS5hcHBlbmRDaGlsZChvYmpFLmNsb25lTm9kZSh0cnVlKSk7XHJcbiAgICB2YXIgc3RyID0gdG1wTm9kZS5pbm5lckhUTUw7XHJcbiAgICAvL3RtcE5vZGUgPSBub2RlID0gbnVsbDsgLy8gcHJldmVudCBtZW1vcnkgbGVha3MgaW4gSUVcclxuICAgIC8vY29uc29sZS5sb2coc3RyLDU2NTYpXHJcbiAgICByZXR1cm4gc3RyO1xyXG4gIH1cclxuXHJcbiAgLy8g5o+Q5Y+WaHRtbOWtl+espuS4sumHjOeahOaWh+Wtl1xyXG4gIHN0YXRpYyBnZXRUZXh0RnJvbVN0cmluZyhzdHIpIHtcclxuICAgIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgZGl2LmlubmVySFRNTCA9IHN0cjtcclxuICAgIHZhciB0ZXh0ID0gXCJcIjtcclxuICAgIGlmIChkaXYuaW5uZXJUZXh0ICE9PSBcIlwiIHx8IGRpdi5xdWVyeVNlbGVjdG9yQWxsKFwiaW1nXCIpLmxlbmd0aCA+IDApIHtcclxuICAgICAgdGV4dCA9IHN0cjtcclxuICAgIH1cclxuICAgIHJldHVybiB0ZXh0O1xyXG4gIH1cclxuXHJcbiAgLy8gaHRtbDXlrZfnrKbkuLLovaxET03lhYPntKBcclxuICBzdGF0aWMgc3RyaW5nVG9UZXh0KHN0cmluZywgcmV0dXJuVHlwZSkge1xyXG4gICAgc3RyaW5nLnJlcGxhY2UoLzwhLS0uKi0tPi9nLCBcIlwiKTtcclxuICAgIGxldCBkb20gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgZG9tLmlubmVySFRNTCA9IHN0cmluZztcclxuICAgIGNsZWFyVGFnKGRvbSwgXCJzdHlsZVwiKTtcclxuICAgIGNsZWFyVGFnKGRvbSwgXCJ4bWxcIik7XHJcbiAgICBjbGVhclRhZyhkb20sIFwic2NyaXB0XCIpO1xyXG4gICAgaWYgKHJldHVyblR5cGUgPT09IFwiaW5uZXJUZXh0XCIpIHtcclxuICAgICAgbGV0IHRleHQgPSBkb20uaW5uZXJUZXh0O1xyXG4gICAgICByZXR1cm4gdGV4dDsgLy8ucmVwbGFjZSgvXFxuL2csICcnKTtcclxuICAgIH0gZWxzZSBpZiAocmV0dXJuVHlwZSA9PT0gXCJpbWdcIikge1xyXG4gICAgICBsZXQgaW1ncyA9IGRvbS5xdWVyeVNlbGVjdG9yQWxsKFwiaW1nXCIpO1xyXG4gICAgICBsZXQgaW1nTGlzdCA9IFtdO1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGltZ3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpbWdMaXN0LnB1c2goaW1nc1tpXS5zcmMpO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBpbWdMaXN0O1xyXG4gICAgfVxyXG4gIH1cclxuICAvLyBodG1s6L2s56CBXHJcbiAgc3RhdGljIEhUTUxEZWNvZGUodGV4dCkge1xyXG4gICAgbGV0IHRlbXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgdGVtcC5pbm5lckhUTUwgPSB0ZXh0O1xyXG4gICAgcmV0dXJuIHRlbXAuaW5uZXJIVE1MO1xyXG4gIH1cclxuXHJcbiAgLy8g5pel5pyf6L2s5a2X56ym5LiyXHJcbiAgc3RhdGljIGRhdGVUb1N0cmluZyhkYXRlKSB7XHJcbiAgICBjb25zdCB5ZWFyID0gZGF0ZS5nZXRGdWxsWWVhcigpO1xyXG4gICAgbGV0IG1vbnRoID0gZGF0ZS5nZXRNb250aCgpICsgMTtcclxuICAgIGxldCBkYXkgPSBkYXRlLmdldERhdGUoKTtcclxuICAgIG1vbnRoID0gbW9udGggPj0gMTAgPyBtb250aCA6IFwiMFwiICsgbW9udGg7XHJcbiAgICBkYXkgPSBkYXkgPj0gMTAgPyBkYXkgOiBcIjBcIiArIGRheTtcclxuICAgIHJldHVybiBgJHt5ZWFyfWAgKyBcIi1cIiArIGAke21vbnRofWAgKyBcIi1cIiArIGAke2RheX1gO1xyXG4gIH1cclxuXHJcbiAgLy8g5qC55o2uYXJnTmFtZSDov5Tlm55pbmRleFxyXG4gIHN0YXRpYyBnZXRJbmRleEJ5QXJnKGFyciwgYXJnTmFtZSwgc3RyKSB7XHJcbiAgICBsZXQgciA9IC0xO1xyXG4gICAgZm9yIChsZXQgW2ksIGl0ZW1dIG9mIG5ldyBNYXAoYXJyLm1hcCgoaXRlbSwgaSkgPT4gW2ksIGl0ZW1dKSkpIHtcclxuICAgICAgaWYgKGl0ZW1bYXJnTmFtZV0gPT09IHN0cikge1xyXG4gICAgICAgIHIgPSBpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcjtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBnZXRRdWVyeVN0cmluZyhuYW1lKSB7XHJcbiAgICB2YXIgcmVnID0gbmV3IFJlZ0V4cChcIihefCYpXCIgKyBuYW1lICsgXCI9KFteJl0qKSgmfCQpXCIsIFwiaVwiKTtcclxuICAgIHZhciByID0gd2luZG93LmxvY2F0aW9uLnNlYXJjaC5zdWJzdHIoMSkubWF0Y2gocmVnKTtcclxuICAgIGlmIChyICE9IG51bGwpIHJldHVybiB1bmVzY2FwZShyWzJdKTtcclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgLy8g6L+U5Zue5Lu75Yqh54q25oCBIOinkuagh+minOiJslxyXG4gIHN0YXRpYyByZXR1cm5TdGF0ZSh0YXNrKSB7XHJcbiAgICBsZXQgc3RhdGUgPSB0YXNrLnN0YXRlO1xyXG4gICAgbGV0IHdjc2ogPSB0YXNrLndjc2o7XHJcbiAgICAvLyBzd2l0Y2goc3RhdGUpe1xyXG4gICAgLy8gXHRjYXNlICcwJzpcclxuICAgIC8vIFx0XHQvLyDlt7LpgL7mnJ9cclxuICAgIC8vIFx0XHRpZih3Y3NqICYmIG5ldyBEYXRlKHdjc2opPG5ldyBEYXRlKCkpe1xyXG4gICAgLy8gXHRcdFx0cmV0dXJuICcjZmY5MTRjJztcclxuICAgIC8vIFx0XHQvLyDlt7LlrozmiJBcclxuICAgIC8vIFx0XHR9ZWxzZXtcclxuICAgIC8vIFx0XHRcdHJldHVybiAnIzcwYmY3OCc7XHJcbiAgICAvLyBcdFx0fVxyXG4gICAgLy8gXHRcdGJyZWFrO1xyXG4gICAgLy8gXHRjYXNlICcxJzpcclxuICAgIC8vIFx0XHRyZXR1cm4gJyM1ZjZjYmInO1xyXG4gICAgLy8gXHRcdGJyZWFrO1xyXG4gICAgLy8gXHRjYXNlICcyJzpcclxuICAgIC8vIFx0XHRyZXR1cm4gJyM1YWNhZjInO1xyXG4gICAgLy8gXHRcdGJyZWFrO1xyXG4gICAgLy8gXHRjYXNlICczJzpcclxuICAgIC8vIFx0XHRyZXR1cm4gJyNmOTVhNWYnO1xyXG4gICAgLy8gXHRcdGJyZWFrO1xyXG4gICAgLy8gXHRjYXNlICc0JzpcclxuICAgIC8vIFx0XHRyZXR1cm4gJyM5OTk5OTknO1xyXG4gICAgLy8gXHRcdGJyZWFrO1xyXG4gICAgLy8gICB9XHJcblxyXG4gICAgLy/lr7nlupTkuo7mnKrmjIfmtL7otJ/otKPkurrjgIHlt7Lnu4jmraLkuKTnp43nmoTku7vliqHnirbmgIFcclxuICAgIGlmIChcclxuICAgICAgdGFzay5zdGF0ZSA9PSBcIjRcIiB8fFxyXG4gICAgICB0YXNrLnVzZXJSZXNwb25zZSA9PSBudWxsIHx8XHJcbiAgICAgIHRhc2sudXNlclJlc3BvbnNlLmlkID09IG51bGxcclxuICAgICkge1xyXG4gICAgICAvL+acquaMh+a0vlxyXG4gICAgICBpZiAodGFzay5zdGF0ZSA9PSBcIjBcIiB8fCB0YXNrLnN0YXRlID09IFwiM1wiKSB7XHJcbiAgICAgICAgcmV0dXJuIFwiIzlhODliOVwiO1xyXG4gICAgICB9XHJcbiAgICAgIC8v5bey57uI5q2iXHJcbiAgICAgIGlmICh0YXNrLnN0YXRlID09IFwiNFwiKSB7XHJcbiAgICAgICAgcmV0dXJuIFwiIzk5OVwiO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgICAvL+W+heehruiupFxyXG4gICAgfSBlbHNlIGlmICh0YXNrLnN0YXRlID09IFwiMlwiKSB7XHJcbiAgICAgIHJldHVybiBcIiM1ZWM5ZjZcIjtcclxuICAgICAgLy/lt7LpgL7mnJ9cclxuICAgIH0gZWxzZSBpZiAoXHJcbiAgICAgIHRhc2suc3RhdGVOYW1lID09IFwiN1wiIHx8XHJcbiAgICAgICh0YXNrLnN0YXRlICE9IFwiMVwiICYmICh0YXNrLnBsYW5FbmRUaW1lICE9IG51bGwgJiYgdGFzay5wYXN0RGF0ZXMgPCAwKSlcclxuICAgICkge1xyXG4gICAgICAvL+W3sui/h+iuoeWIkuWujOaIkOaXpeacn+OAgeWwmuacquWujOaIkFxyXG4gICAgICByZXR1cm4gXCIjZmY5MTRjXCI7XHJcbiAgICAgIC8v6L+b6KGM5LitXHJcbiAgICB9IGVsc2UgaWYgKFxyXG4gICAgICB0YXNrLnN0YXRlICE9IFwiMVwiICYmXHJcbiAgICAgICh0YXNrLnBsYW5FbmRUaW1lID09IG51bGwgfHwgdGFzay5wYXN0RGF0ZXMgPj0gMClcclxuICAgICkge1xyXG4gICAgICAvL+W+heWuoeaguFxyXG4gICAgICByZXR1cm4gXCIjNzZiZjZlXCI7XHJcbiAgICAgIC8v5o+Q5YmN5a6M5oiQXHJcbiAgICB9IGVsc2UgaWYgKFxyXG4gICAgICB0YXNrLnN0YXRlID09IFwiMVwiICYmXHJcbiAgICAgIHRhc2sucGxhbkVuZFRpbWUgIT0gbnVsbCAmJlxyXG4gICAgICB0YXNrLnJlYWxpdHlFbmRUaW1lICE9IG51bGwgJiZcclxuICAgICAgdGhpcy5Db21wYXJlRGF0ZSh0YXNrLnBsYW5FbmRUaW1lLCB0YXNrLnJlYWxpdHlFbmRUaW1lKVxyXG4gICAgKSB7XHJcbiAgICAgIC8v5bey5a6M5oiQ44CB5L2G5a6e6ZmF5a6M5oiQ6L6D6K6h5YiS5a6M5oiQ6L+fXHJcbiAgICAgIHJldHVybiBcIiMxMDhlZTlcIjtcclxuICAgICAgLy/pgL7mnJ/lrozmiJBcclxuICAgIH0gZWxzZSBpZiAoXHJcbiAgICAgIHRhc2suc3RhdGUgPT0gXCIxXCIgJiZcclxuICAgICAgKHRhc2sucGxhbkVuZFRpbWUgIT0gbnVsbCAmJlxyXG4gICAgICAgIHRhc2sucmVhbGl0eUVuZFRpbWUgIT0gbnVsbCAmJlxyXG4gICAgICAgIHRoaXMuQ29tcGFyZURhdGUodGFzay5yZWFsaXR5RW5kVGltZSwgdGFzay5wbGFuRW5kVGltZSkpXHJcbiAgICApIHtcclxuICAgICAgLy/lt7LlrozmiJDjgIHlrp7pmYXlrozmiJDkuI7orqHliJLlrozmiJDkuIDoh7RcclxuICAgICAgcmV0dXJuIFwiIzEwOGVlOVwiO1xyXG4gICAgICAvL+aMieacn+WujOaIkFxyXG4gICAgfSBlbHNlIGlmIChcclxuICAgICAgdGFzay5zdGF0ZSA9PSBcIjFcIiAmJlxyXG4gICAgICAodGFzay5wbGFuRW5kVGltZSA9PSBudWxsIHx8XHJcbiAgICAgICAgKHRhc2sucGxhbkVuZFRpbWUgIT0gbnVsbCAmJlxyXG4gICAgICAgICAgdGFzay5yZWFsaXR5RW5kVGltZSAhPSBudWxsICYmXHJcbiAgICAgICAgICB0YXNrLnBsYW5FbmRUaW1lLnRyaW0oKSA9PSB0YXNrLnJlYWxpdHlFbmRUaW1lLnRyaW0oKSkpXHJcbiAgICApIHtcclxuICAgICAgcmV0dXJuIFwiIzEwOGVlOVwiO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8g57uZ5omA5pyJ5oyJ6ZKu5re75Yqg6Kem5pG45Yqo55S7XHJcbiAgc3RhdGljIGJ1dEFuaW1hdGUoKSB7XHJcbiAgICAvLyDlnZfnuqflj43lupRcclxuICAgIC8vIOWmguaenOaYr+iTneiJsiDopoHpop3lpJbmoIfms6ggYmx1ZSDmoLflvI9cclxuICAgIC8vIOWmguaenOaYr+eZveiJsiDopoHpop3lpJbmoIfms6ggd2hpdGUg5qC35byPXHJcbiAgICAvLyDlpoLmnpzmmK/ok53oibLlm77moIcr5rex54Gw6Imy5paH5a2XIOimgemineWkluagh+azqCBpY29uQmx1ZV90eHRHcmF5IOagt+W8j1xyXG4gICAgbGV0IGJ1dHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiYW5pQnV0XCIpO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBidXRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGJ1dHNbaV0ub250b3VjaHN0YXJ0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY2xhc3NOYW1lLmluZGV4T2YoXCJibHVlXCIpICE9PSAtMSkge1xyXG4gICAgICAgICAgdGhpcy5jbGFzc05hbWUgPSB0aGlzLmNsYXNzTmFtZSArIFwiIGFuaUJ1dC1vbi1ibHVlXCI7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmNsYXNzTmFtZS5pbmRleE9mKFwid2hpdGVcIikgIT09IC0xKSB7XHJcbiAgICAgICAgICB0aGlzLmNsYXNzTmFtZSA9IHRoaXMuY2xhc3NOYW1lICsgXCIgYW5pQnV0LW9uLXdoaXRlXCI7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmNsYXNzTmFtZS5pbmRleE9mKFwiaWNvbkJsdWVfdHh0R3JheVwiKSAhPT0gLTEpIHtcclxuICAgICAgICAgIHRoaXMuY2xhc3NOYW1lID0gdGhpcy5jbGFzc05hbWUgKyBcIiBhbmlCdXQtb24taUJsdWUtdEdyYXlcIjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5jbGFzc05hbWUgPSB0aGlzLmNsYXNzTmFtZSArIFwiIGFuaUJ1dC1vblwiO1xyXG4gICAgICAgIH1cclxuICAgICAgfTtcclxuICAgICAgYnV0c1tpXS5vbnRvdWNoZW5kID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdGhpcy5jbGFzc05hbWUgPSB0aGlzLmNsYXNzTmFtZS5yZXBsYWNlKFwiIGFuaUJ1dC1vblwiLCBcIlwiKTtcclxuICAgICAgICB0aGlzLmNsYXNzTmFtZSA9IHRoaXMuY2xhc3NOYW1lLnJlcGxhY2UoXCIgYW5pQnV0LW9uLWJsdWVcIiwgXCJcIik7XHJcbiAgICAgICAgdGhpcy5jbGFzc05hbWUgPSB0aGlzLmNsYXNzTmFtZS5yZXBsYWNlKFwiIGFuaUJ1dC1vbi13aGl0ZVwiLCBcIlwiKTtcclxuICAgICAgICB0aGlzLmNsYXNzTmFtZSA9IHRoaXMuY2xhc3NOYW1lLnJlcGxhY2UoXCIgYW5pQnV0LW9uLWlCbHVlLXRHcmF5XCIsIFwiXCIpO1xyXG4gICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOWGheWuueminOiJsuWPjeW6lCDnuqLoibJcclxuICAgIGxldCBidXRzX3JlZCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJhbmlCdXRSZWRcIik7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJ1dHNfcmVkLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGJ1dHNfcmVkW2ldLm9udG91Y2hzdGFydCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHRoaXMuc3R5bGUuY29sb3IgPSBcIiNlMjJiMmJcIjtcclxuICAgICAgfTtcclxuICAgICAgYnV0c19yZWRbaV0ub250b3VjaGVuZCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHRoaXMuc3R5bGUuY29sb3IgPSBcIlwiO1xyXG4gICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOWGheWuueminOiJsuWPjeW6lCDngbDoibJcclxuICAgIGxldCBidXRzX2dyYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiYW5pQnV0R3JheVwiKTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYnV0c19ncmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGJ1dHNfZ3JheVtpXS5vbnRvdWNoc3RhcnQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICB0aGlzLnN0eWxlLmNvbG9yID0gXCIjOTc5N2E3XCI7XHJcbiAgICAgIH07XHJcbiAgICAgIGJ1dHNfZ3JheVtpXS5vbnRvdWNoZW5kID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdGhpcy5zdHlsZS5jb2xvciA9IFwiXCI7XHJcbiAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLy8g5YaF5a656aKc6Imy5Y+N5bqUIOiTneiJslxyXG4gICAgbGV0IGJ1dHNfYmx1ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJhbmlCdXRCbHVlXCIpO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBidXRzX2JsdWUubGVuZ3RoOyBpKyspIHtcclxuICAgICAgYnV0c19ibHVlW2ldLm9udG91Y2hzdGFydCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHRoaXMuc3R5bGUuY29sb3IgPSBcIiMxNWE4ZTVcIjtcclxuICAgICAgfTtcclxuICAgICAgYnV0c19ibHVlW2ldLm9udG91Y2hlbmQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICB0aGlzLnN0eWxlLmNvbG9yID0gXCJcIjtcclxuICAgICAgfTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIOagueaNrueKtuaAgeaVsOWtl+i/lOWbnueKtuaAgeWQjeWtl1xyXG4gIHN0YXRpYyBnZXRTdGF0ZU5hbWVCeU5vKHRhc2spIHtcclxuICAgIC8v5a+55bqU5LqO5pyq5oyH5rS+6LSf6LSj5Lq644CB5bey57uI5q2i5Lik56eN55qE5Lu75Yqh54q25oCBXHJcbiAgICBpZiAoXHJcbiAgICAgIHRhc2suc3RhdGUgPT0gXCI0XCIgfHxcclxuICAgICAgdGFzay51c2VyUmVzcG9uc2UgPT0gbnVsbCB8fFxyXG4gICAgICB0YXNrLnVzZXJSZXNwb25zZS5pZCA9PSBudWxsXHJcbiAgICApIHtcclxuICAgICAgaWYgKHRhc2suc3RhdGUgPT0gXCIwXCIgfHwgdGFzay5zdGF0ZSA9PSBcIjNcIikge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICA8c3BhbiBzdHlsZT17eyBjb2xvcjogXCIjRTk2MzAwXCIgfX0gY2xhc3NOYW1lPVwic3RhdGVcIj5cclxuICAgICAgICAgICAg5pyq5oyH5rS+XHJcbiAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAodGFzay5zdGF0ZSA9PSBcIjRcIikge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICA8c3BhbiBzdHlsZT17eyBjb2xvcjogXCIjODA4MDgwXCIgfX0gY2xhc3NOYW1lPVwic3RhdGVcIj5cclxuICAgICAgICAgICAg5bey57uI5q2iXHJcbiAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gXCJcIjtcclxuICAgIH0gZWxzZSBpZiAodGFzay5zdGF0ZSA9PSBcIjJcIikge1xyXG4gICAgICByZXR1cm4gKFxyXG4gICAgICAgIDxkaXYgc3R5bGU9e3sgY29sb3I6IFwiIzU4YzU4MlwiIH19IGNsYXNzTmFtZT1cInN0YXRlXCI+XHJcbiAgICAgICAgICDlvoXnoa7orqRcclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgKTtcclxuICAgIH0gZWxzZSBpZiAoXHJcbiAgICAgIHRhc2suc3RhdGVOYW1lID09IFwiN1wiIHx8XHJcbiAgICAgICh0YXNrLnN0YXRlICE9IFwiMVwiICYmICh0YXNrLnBsYW5FbmRUaW1lICE9IG51bGwgJiYgdGFzay5wYXN0RGF0ZXMgPCAwKSlcclxuICAgICkge1xyXG4gICAgICAvL+W3sui/h+iuoeWIkuWujOaIkOaXpeacn+OAgeWwmuacquWujOaIkFxyXG4gICAgICByZXR1cm4gKFxyXG4gICAgICAgIDxkaXYgc3R5bGU9e3sgY29sb3I6IFwiI0U5NjMwMFwiIH19IGNsYXNzTmFtZT1cInN0YXRlXCI+XHJcbiAgICAgICAgICDlt7LpgL7mnJ9cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgKTtcclxuICAgIH0gZWxzZSBpZiAoXHJcbiAgICAgIHRhc2suc3RhdGUgIT0gXCIxXCIgJiZcclxuICAgICAgKHRhc2sucGxhbkVuZFRpbWUgPT0gbnVsbCB8fCB0YXNrLnBhc3REYXRlcyA+PSAwKVxyXG4gICAgKSB7XHJcbiAgICAgIC8v5b6F5a6h5qC4XHJcbiAgICAgIHJldHVybiAoXHJcbiAgICAgICAgPGRpdiBzdHlsZT17eyBjb2xvcjogXCIjNThjNTgyXCIgfX0gY2xhc3NOYW1lPVwic3RhdGVcIj5cclxuICAgICAgICAgIOi/m+ihjOS4rVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICApO1xyXG4gICAgfSBlbHNlIGlmIChcclxuICAgICAgdGFzay5zdGF0ZSA9PSBcIjFcIiAmJlxyXG4gICAgICB0YXNrLnBsYW5FbmRUaW1lICE9IG51bGwgJiZcclxuICAgICAgdGFzay5yZWFsaXR5RW5kVGltZSAhPSBudWxsICYmXHJcbiAgICAgIHRoaXMuQ29tcGFyZURhdGUodGFzay5wbGFuRW5kVGltZSwgdGFzay5yZWFsaXR5RW5kVGltZSlcclxuICAgICkge1xyXG4gICAgICAvL+W3suWujOaIkOOAgeS9huWunumZheWujOaIkOi+g+iuoeWIkuWujOaIkOi/n1xyXG4gICAgICByZXR1cm4gKFxyXG4gICAgICAgIDxkaXYgc3R5bGU9e3sgY29sb3I6IFwiIzMyOTlDQ1wiIH19IGNsYXNzTmFtZT1cInN0YXRlXCI+XHJcbiAgICAgICAgICDmj5DliY3lrozmiJBcclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgKTtcclxuICAgIH0gZWxzZSBpZiAoXHJcbiAgICAgIHRhc2suc3RhdGUgPT0gXCIxXCIgJiZcclxuICAgICAgKHRhc2sucGxhbkVuZFRpbWUgIT0gbnVsbCAmJlxyXG4gICAgICAgIHRhc2sucmVhbGl0eUVuZFRpbWUgIT0gbnVsbCAmJlxyXG4gICAgICAgIHRoaXMuQ29tcGFyZURhdGUodGFzay5yZWFsaXR5RW5kVGltZSwgdGFzay5wbGFuRW5kVGltZSkpXHJcbiAgICApIHtcclxuICAgICAgLy/lt7LlrozmiJDjgIHlrp7pmYXlrozmiJDkuI7orqHliJLlrozmiJDkuIDoh7RcclxuICAgICAgcmV0dXJuIChcclxuICAgICAgICA8ZGl2IHN0eWxlPXt7IGNvbG9yOiBcIiMwYTc0Y2FcIiB9fSBjbGFzc05hbWU9XCJzdGF0ZVwiPlxyXG4gICAgICAgICAg6YC+5pyf5a6M5oiQXHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICk7XHJcbiAgICB9IGVsc2UgaWYgKFxyXG4gICAgICB0YXNrLnN0YXRlID09IFwiMVwiICYmXHJcbiAgICAgICh0YXNrLnBsYW5FbmRUaW1lID09IG51bGwgfHxcclxuICAgICAgICAodGFzay5wbGFuRW5kVGltZSAhPSBudWxsICYmXHJcbiAgICAgICAgICB0YXNrLnJlYWxpdHlFbmRUaW1lICE9IG51bGwgJiZcclxuICAgICAgICAgIHRhc2sucGxhbkVuZFRpbWUudHJpbSgpID09IHRhc2sucmVhbGl0eUVuZFRpbWUudHJpbSgpKSlcclxuICAgICkge1xyXG4gICAgICByZXR1cm4gKFxyXG4gICAgICAgIDxkaXYgc3R5bGU9e3sgY29sb3I6IFwiIzEwOGVlOVwiIH19IGNsYXNzTmFtZT1cInN0YXRlXCI+XHJcbiAgICAgICAgICDmjInml7blrozmiJBcclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIOiuvue9rueKtuaAgeagt+W8j1xyXG4gIHN0YXRpYyBzdGF0ZUNvbG9yKHN0YXRlSWQsIGNsYXNzTmFtZSA9IFwiXCIpIHtcclxuICAgIC8vIDDmnKrlrozmiJAgIDHmraPluLjlrozmiJAgIDLlvoXnoa7orqQgIDPmnKrmjIfmtL4gIDTlt7Lnu4jmraIgOOmAvuacn+WujOaIkCA55o+Q5YmN5a6M5oiQXHJcbiAgICBsZXQgY2xhc3NuYW1lID0gXCJcIjtcclxuICAgIGxldCBuYW1lID0gXCJcIjtcclxuICAgIGlmIChzdGF0ZUlkID09PSBcIjBcIikge1xyXG4gICAgICBjbGFzc25hbWUgPSBjbGFzc05hbWUgKyBcIiBzdGF0ZV9qeHpcIjtcclxuICAgICAgbmFtZSA9IFwi6L+b6KGM5LitXCI7XHJcbiAgICB9IGVsc2UgaWYgKHN0YXRlSWQgPT09IFwiMVwiKSB7XHJcbiAgICAgIGNsYXNzbmFtZSA9IGNsYXNzTmFtZSArIFwiIHN0YXRlX3l3Y1wiO1xyXG4gICAgICBuYW1lID0gXCLmjInml7blrozmiJBcIjtcclxuICAgIH0gZWxzZSBpZiAoc3RhdGVJZCA9PT0gXCIyXCIpIHtcclxuICAgICAgY2xhc3NuYW1lID0gY2xhc3NOYW1lICsgXCIgc3RhdGVfZHFyXCI7XHJcbiAgICAgIG5hbWUgPSBcIuW+heehruiupFwiO1xyXG4gICAgfSBlbHNlIGlmIChzdGF0ZUlkID09PSBcIjNcIikge1xyXG4gICAgICBjbGFzc25hbWUgPSBjbGFzc05hbWUgKyBcIiBzdGF0ZV93enBcIjtcclxuICAgICAgbmFtZSA9IFwi5pyq5oyH5rS+XCI7XHJcbiAgICB9IGVsc2UgaWYgKHN0YXRlSWQgPT09IFwiNFwiKSB7XHJcbiAgICAgIGNsYXNzbmFtZSA9IGNsYXNzTmFtZSArIFwiIHN0YXRlX3l6elwiO1xyXG4gICAgICBuYW1lID0gXCLlt7Lnu4jmraJcIjtcclxuICAgIH0gZWxzZSBpZiAoc3RhdGVJZCA9PT0gXCI3XCIpIHtcclxuICAgICAgY2xhc3NuYW1lID0gY2xhc3NOYW1lICsgXCIgc3RhdGVfeXlxXCI7XHJcbiAgICAgIG5hbWUgPSBcIuW3sumAvuacn1wiO1xyXG4gICAgfSBlbHNlIGlmIChzdGF0ZUlkID09PSBcIjhcIikge1xyXG4gICAgICBjbGFzc25hbWUgPSBjbGFzc05hbWUgKyBcIiBzdGF0ZV95cXdjXCI7XHJcbiAgICAgIG5hbWUgPSBcIumAvuacn+WujOaIkFwiO1xyXG4gICAgfSBlbHNlIGlmIChzdGF0ZUlkID09PSBcIjlcIikge1xyXG4gICAgICBjbGFzc25hbWUgPSBjbGFzc05hbWUgKyBcIiBzdGF0ZV90cXdjXCI7XHJcbiAgICAgIG5hbWUgPSBcIuaPkOWJjeWujOaIkFwiO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPXtjbGFzc25hbWV9PntuYW1lfTwvZGl2PjtcclxuICB9XHJcblxyXG4gIC8vIOagueaNruWQjeWtl+i/lOWbnm5pY2tOYW1lXHJcbiAgc3RhdGljIGdldE5pY2tOYW1lQnlOYW1lKG5hbWUpIHtcclxuICAgIGxldCBzdHIgPSBuYW1lLnJlcGxhY2UoL1teXFx1NGUwMC1cXHU5ZmE1XS9naSwgXCJcIik7XHJcbiAgICBsZXQgbmlja25hbWUgPSBzdHIuc3Vic3RyKHN0ci5sZW5ndGggLSAyKTtcclxuICAgIHJldHVybiBuaWNrbmFtZTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBDb21wYXJlRGF0ZShkMSwgZDIpIHtcclxuICAgIGxldCBkYXRlMSA9IG5ldyBEYXRlKGQxLnJlcGxhY2UoLy0vZywgXCIvXCIpKTtcclxuICAgIGxldCBkYXRlMiA9IG5ldyBEYXRlKGQyLnJlcGxhY2UoLy0vZywgXCIvXCIpKTtcclxuICAgIGlmIChkYXRlMSA+IGRhdGUyIHx8IGRhdGUxIC0gZGF0ZTIgPT0gMCkge1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIOi/lOWbnuaXpeacn+minOiJslxyXG4gIHN0YXRpYyBkYXRlQ29sb3IocGxhbkVuZFRpbWUsIHN0YXRlLCByZWFsaXR5RW5kVGltZSkge1xyXG4gICAgbGV0IHRhc2tkYXRlID0gXCJcIjtcclxuICAgIGlmIChwbGFuRW5kVGltZSkge1xyXG4gICAgICB0YXNrZGF0ZSA9IG5ldyBEYXRlKHBsYW5FbmRUaW1lKTtcclxuICAgIH1cclxuICAgIGxldCBub3cgPSBuZXcgRGF0ZSgpO1xyXG4gICAgaWYgKCh0YXNrZGF0ZSA9PSBub3cgfHwgdGFza2RhdGUgPCBub3cpICYmIHN0YXRlID09IFwiMFwiKSB7XHJcbiAgICAgIHJldHVybiAoXHJcbiAgICAgICAgPGZvbnQgc3R5bGU9e3sgY29sb3I6IFwiI2ZmODkwMFwiIH19PlxyXG4gICAgICAgICAge3BsYW5FbmRUaW1lICYmIHBsYW5FbmRUaW1lLnNsaWNlKDAsIDEwKX1cclxuICAgICAgICA8L2ZvbnQ+XHJcbiAgICAgICk7XHJcbiAgICB9IGVsc2UgaWYgKHN0YXRlID09IFwiMVwiICYmIG5ldyBEYXRlKHJlYWxpdHlFbmRUaW1lKSA+IHRhc2tkYXRlKSB7XHJcbiAgICAgIHJldHVybiAoXHJcbiAgICAgICAgPGZvbnQgc3R5bGU9e3sgY29sb3I6IFwiI2ZmODkwMFwiIH19PlxyXG4gICAgICAgICAge3JlYWxpdHlFbmRUaW1lICYmIHJlYWxpdHlFbmRUaW1lLnNsaWNlKDAsIDEwKX1cclxuICAgICAgICA8L2ZvbnQ+XHJcbiAgICAgICk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAocmVhbGl0eUVuZFRpbWUpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgPGZvbnQgc3R5bGU9e3sgY29sb3I6IFwiIzk1OTlhMlwiIH19PlxyXG4gICAgICAgICAgICB7cmVhbGl0eUVuZFRpbWUgJiYgcmVhbGl0eUVuZFRpbWUuc2xpY2UoMCwgMTApfVxyXG4gICAgICAgICAgPC9mb250PlxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgIDxmb250IHN0eWxlPXt7IGNvbG9yOiBcIiM5NTk5YTJcIiB9fT5cclxuICAgICAgICAgICAge3BsYW5FbmRUaW1lICYmIHBsYW5FbmRUaW1lLnNsaWNlKDAsIDEwKX1cclxuICAgICAgICAgIDwvZm9udD5cclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyDniYjmnKzliLDmnJ/liKTmlq1cclxuICBzdGF0aWMgZ2V0VGVhbUluZm9XaXRoTW9uZXkodHlwZSwgdXNlcikge1xyXG4gICAgbGV0IGRhdGEgPSB7XHJcbiAgICAgIGJ1eVVzZXJDb3VudDogMTAwLFxyXG4gICAgICBzeW5Vc2VyQ291bnQ6IDEwMCxcclxuICAgICAgYnV5RGF0ZTogXCIyMDE3LTA4LTMwXCIsXHJcbiAgICAgIGVuZERhdGU6IFwiMjAxOC0wOC0zMFwiLFxyXG4gICAgICByZW1haW5kZXJEYXlzOiAxMDAsXHJcbiAgICAgIGJ1eVZlcnNpb246IFwiTUZCXCIsXHJcbiAgICAgIG9yZGVyY3JlYXRlc291cmNlOiBcIlwiLFxyXG4gICAgICBvcmRlcklkOiBcIlwiXHJcbiAgICB9O1xyXG4gICAgaWYgKHVzZXIgJiYgdXNlci5hbnRJc3ZDb3JwU3VpdGUpIHtcclxuICAgICAgZGF0YSA9IHVzZXIuYW50SXN2Q29ycFN1aXRlO1xyXG4gICAgfVxyXG4gICAgLypjb25zdCBkYXRhID0ge1xyXG5cdFx0XHRidXlVc2VyQ291bnQ6MTAwLFxyXG5cdFx0XHRzeW5Vc2VyQ291bnQ6MTAsXHJcblx0XHRcdGJ1eURhdGU6JzIwMTctMDgtMzAnLFxyXG5cdFx0XHRlbmREYXRlOicyMDE4LTA4LTMwJyxcclxuXHRcdFx0cmVtYWluZGVyRGF5czo2LFxyXG5cdFx0XHRidXlWZXJzaW9uOidTWUInLFxyXG5cdFx0XHRvcmRlcmNyZWF0ZXNvdXJjZTonODknXHJcblx0XHR9OyovXHJcbiAgICBsZXQgcmV0dXJuVHh0ID0gXCJcIjtcclxuXHJcbiAgICAvKlxyXG4gICAgICogYnV5VXNlckNvdW50OiDotK3kubDkurrmlbBcclxuICAgICAqIHN5blVzZXJDb3VudDogc3lu5ZCM5q2l5Lq65pWwXHJcbiAgICAgKiBlbmREYXRlOiDliLDmnJ/ml6XmnJ9cclxuICAgICAqIGJ1eURhdGU6IOi0reS5sOaXpeacn1xyXG4gICAgICogcmVtYWluZGVyRGF5czog5Ymp5L2Z5aSp5pWwXHJcbiAgICAgKiBidXlWZXJzaW9uOiDotK3kubDniYjmnKxcclxuICAgICAqIG9yZGVyY3JlYXRlc291cmNlOiDorqLljZXmuKDpgZMgRFJQ6ZKJ6ZKJ6K6i5Y2VIOmdnkRSUOWwseaYr+i/kOiQpeiuouWNlVxyXG4gICAgICovXHJcblxyXG4gICAgc3dpdGNoICh0eXBlKSB7XHJcbiAgICAgIGNhc2UgXCLmmK/lkKbpkonpkonorqLljZVcIjpcclxuICAgICAgICByZXR1cm5UeHQgPVxyXG4gICAgICAgICAgbmV3IERhdGUoZGF0YS5jcmVhdGVEYXRlKS5nZXRUaW1lKCkgLVxyXG4gICAgICAgICAgICBuZXcgRGF0ZShcIjIwMTgtMTAtMTJcIikuZ2V0VGltZSgpIDxcclxuICAgICAgICAgIDBcclxuICAgICAgICAgICAgPyBmYWxzZVxyXG4gICAgICAgICAgICA6IHRydWU7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCLotK3kubDml6XmnJ9cIjpcclxuICAgICAgICByZXR1cm5UeHQgPSBkYXRhLmJ1eURhdGU7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCLliLDmnJ/ml6XmnJ9cIjpcclxuICAgICAgICByZXR1cm5UeHQgPSBkYXRhLmVuZERhdGU7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCLmmK/lkKbotoXpmZBcIjogLy8g6KGo56S65Lq65pWw5piv5ZCm6LaF6ZmQXHJcbiAgICAgICAgaWYgKGRhdGEuc3luVXNlckNvdW50ID4gZGF0YS5idXlVc2VyQ291bnQpIHtcclxuICAgICAgICAgIHJldHVyblR4dCA9IFt0cnVlLCBkYXRhLmJ1eVVzZXJDb3VudCwgZGF0YS5zeW5Vc2VyQ291bnRdO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZXR1cm5UeHQgPSBbZmFsc2UsIGRhdGEuYnV5VXNlckNvdW50LCBkYXRhLnN5blVzZXJDb3VudF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwi5piv5ZCm5Y+v55SoXCI6IC8vIOihqOekuumrmOe6p+WKn+iDveaYr+WQpuWPr+eUqFxyXG4gICAgICAgIHN3aXRjaCAoZGF0YS5idXlWZXJzaW9uKSB7XHJcbiAgICAgICAgICBjYXNlIFwiU1lCXCI6XHJcbiAgICAgICAgICAgIHJldHVyblR4dCA9IHRydWU7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgY2FzZSBcIkpDQlwiOlxyXG4gICAgICAgICAgICByZXR1cm5UeHQgPSBmYWxzZTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBjYXNlIFwiWllCXCI6XHJcbiAgICAgICAgICAgIHJldHVyblR4dCA9IHRydWU7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgY2FzZSBcIk1GQlwiOlxyXG4gICAgICAgICAgICByZXR1cm5UeHQgPSBmYWxzZTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwi54mI5pys5ZCN56ewXCI6XHJcbiAgICAgICAgc3dpdGNoIChkYXRhLmJ1eVZlcnNpb24pIHtcclxuICAgICAgICAgIGNhc2UgXCJTWUJcIjpcclxuICAgICAgICAgICAgcmV0dXJuVHh0ID0gXCLor5XnlKjniYhcIjtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBjYXNlIFwiSkNCXCI6XHJcbiAgICAgICAgICAgIHJldHVyblR4dCA9IFwi5Z+656GA54mIXCI7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgY2FzZSBcIlpZQlwiOlxyXG4gICAgICAgICAgICByZXR1cm5UeHQgPSBcIuS4k+S4mueJiFwiO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGNhc2UgXCJNRkJcIjpcclxuICAgICAgICAgICAgcmV0dXJuVHh0ID0gXCLlhY3otLnniYhcIjtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwi5Ymp5L2Z5aSp5pWwXCI6XHJcbiAgICAgICAgcmV0dXJuVHh0ID0gZGF0YS5yZW1haW5kZXJEYXlzO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwi5LiT5Lia54mI5o+Q56S6XCI6XHJcbiAgICAgICAgcmV0dXJuVHh0ID0gW1xyXG4gICAgICAgICAgXCLkuJPkuJrniYjlip/og71cIixcclxuICAgICAgICAgIFwi5Zu+6KGo5YyW6aG555uu566h55CG44CB5om56YeP5L6/5o235pON5L2c44CB5aSa57u05bqm5pWw5o2u57uf6K6h44CBV0JT5paH5Lu257O757uf562J6YO95Li65LiT5Lia54mI5Yqf6IO977yM5ZCM5pe26L+Y5pyJ5pu05aSa6auY57qn5Yqf6IO95bCG6ZmG57ut5byA5pS+44CC5oKo5Y+v5Lul6YCa6L+H5Lul5LiL5pa55byP5p2l5Y2H57qn5Yiw5LiT5Lia54mI44CCXCJcclxuICAgICAgICBdO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwi57ut6LS55o+Q56S6XCI6XHJcbiAgICAgICAgbGV0IG5hbWUgPSBcIlwiO1xyXG4gICAgICAgIHN3aXRjaCAoZGF0YS5idXlWZXJzaW9uKSB7XHJcbiAgICAgICAgICBjYXNlIFwiU1lCXCI6XHJcbiAgICAgICAgICAgIG5hbWUgPSBcIuivleeUqOeJiFwiO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGNhc2UgXCJKQ0JcIjpcclxuICAgICAgICAgICAgbmFtZSA9IFwi5Z+656GA54mIXCI7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgY2FzZSBcIlpZQlwiOlxyXG4gICAgICAgICAgICBuYW1lID0gXCJiZXRh54mIXCI7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm5UeHQgPSBbXHJcbiAgICAgICAgICBcIue7rei0ueWNh+e6p1wiLFxyXG4gICAgICAgICAgYOaCqOWFrOWPuOW9k+WJjeS9v+eUqOeahOaYr+iaguiageWIhuW3pSR7bmFtZX3vvIzlvZPliY3nmoTmjojmnYPmnInmlYjmnJ/miKrmraLkuo4ke1xyXG4gICAgICAgICAgICBkYXRhLmVuZERhdGVcclxuICAgICAgICAgIH3jgILmgqjlj6/ku6XpgJrov4fku6XkuIvmlrnlvI/mnaXov5vooYzmj5DliY3nu63otLnvvIzmiJbljYfnuqfliLDmm7Tpq5jniYjmnKzjgIJgXHJcbiAgICAgICAgXTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcIuS6uuaVsOi2hemZkOaPkOekulwiOlxyXG4gICAgICAgIHJldHVyblR4dCA9IGDmgqjlhazlj7jnrqHnkIblkZjmjojmnYPnmoTkvb/nlKjkurrmlbDlt7Lnu4/otoXlh7rkuobniYjmnKzkuIrpmZDvvIzlvZPliY3niYjmnKzmnIDlpKflj6/mjojmnYPkurrmlbDkuLo8Yj4ke1xyXG4gICAgICAgICAgZGF0YS5idXlVc2VyQ291bnRcclxuICAgICAgICB9PC9iPuS6uu+8jOebruWJjeW3suaOiOadgzxiPiR7XHJcbiAgICAgICAgICBkYXRhLnN5blVzZXJDb3VudFxyXG4gICAgICAgIH08L2I+5Lq644CC6K+3566h55CG5ZGY5Y+K5pe25Zyo6ZKJ6ZKJ5ZCO5Y+w6L+b6KGM5Zui6Zif55qE5o6I5p2D566h55CG77yM5oiW5Y2H57qn5Yiw5Y+v5a6557qz5pu05aSa5Lq65ZGY55qE6KeE5qC844CCYDtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcIuS6uuaVsOi2hemZkOaPkOekulwiOlxyXG4gICAgICAgIHJldHVyblR4dCA9IFtcclxuICAgICAgICAgIFwi5L2/55So5Lq65pWw6LaF6ZmQXCIsXHJcbiAgICAgICAgICBg5oKo5YWs5Y+4566h55CG5ZGY5o6I5p2D55qE5L2/55So5Lq65pWw5bey57uP6LaF5Ye65LqG54mI5pys5LiK6ZmQ77yM5b2T5YmN54mI5pys5pyA5aSn5Y+v5o6I5p2D5Lq65pWw5Li6PGI+JHtcclxuICAgICAgICAgICAgZGF0YS5idXlVc2VyQ291bnRcclxuICAgICAgICAgIH08L2I+5Lq677yM55uu5YmN5bey5o6I5p2DPGI+JHtcclxuICAgICAgICAgICAgZGF0YS5zeW5Vc2VyQ291bnRcclxuICAgICAgICAgIH08L2I+5Lq644CC6K+3566h55CG5ZGY5Y+K5pe25Zyo6ZKJ6ZKJ5ZCO5Y+w6L+b6KGM5Zui6Zif55qE5o6I5p2D566h55CG77yM5oiW5Y2H57qn5Yiw5Y+v5a6557qz5pu05aSa5Lq65ZGY55qE6KeE5qC844CC44CCYFxyXG4gICAgICAgIF07XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCLljbPlsIbliLDmnJ/mj5DnpLpcIjpcclxuICAgICAgICBpZiAoZGF0YS5idXlWZXJzaW9uID09PSBcIlNZQlwiKSB7XHJcbiAgICAgICAgICByZXR1cm5UeHQgPSBgPGRpdiBjbGFzcz0nZnJlZVRleHQnPuaCqOWFrOWPuOS6jjxiPiR7XHJcbiAgICAgICAgICAgIGRhdGEuYnV5RGF0ZVxyXG4gICAgICAgICAgfTwvYj7lvIDlp4vor5XnlKjnmoTomoLomoHliIblt6XkuJPkuJrniYjlsIblnKg8Yj4ke1xyXG4gICAgICAgICAgICBkYXRhLnJlbWFpbmRlckRheXMgPT0gMCA/IFwi5piO5aSpXCIgOiBkYXRhLnJlbWFpbmRlckRheXMgKyBcIuWkqeWQjlwiXHJcbiAgICAgICAgICB9PC9iPuWIsOacn++8jOivt+WPiuaXtui0reS5sOWNh+e6p+OAgjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIGA7XHJcbiAgICAgICAgfSBlbHNlIGlmIChkYXRhLmJ1eVZlcnNpb24gPT09IFwiSkNCXCIpIHtcclxuICAgICAgICAgIHJldHVyblR4dCA9IGDmgqjlhazlj7jkuo48Yj4ke1xyXG4gICAgICAgICAgICBkYXRhLmJ1eURhdGVcclxuICAgICAgICAgIH08L2I+6LSt5Lmw55qE6JqC6JqB5YiG5bel5Z+656GA54mI5bCG5ZyoPGI+JHtcclxuICAgICAgICAgICAgZGF0YS5yZW1haW5kZXJEYXlzID09IDAgPyBcIuaYjuWkqVwiIDogZGF0YS5yZW1haW5kZXJEYXlzICsgXCLlpKnlkI5cIlxyXG4gICAgICAgICAgfTwvYj7liLDmnJ/vvIzkuLrkuobkuI3lvbHlk43mgqjlhazlj7jnmoTmraPluLjkvb/nlKjvvIzor7fmgqjmj5DliY3ov5vooYznu63otLnmiJbotK3kubDlhbbku5bop4TmoLzjgIJgO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZGF0YS5idXlWZXJzaW9uID09PSBcIlpZQlwiKSB7XHJcbiAgICAgICAgICByZXR1cm5UeHQgPSBg5oKo5YWs5Y+45LqOPGI+JHtcclxuICAgICAgICAgICAgZGF0YS5idXlEYXRlXHJcbiAgICAgICAgICB9PC9iPui0reS5sOeahOiaguiageWIhuW3peS4k+S4mueJiOWwhuWcqDxiPiR7XHJcbiAgICAgICAgICAgIGRhdGEucmVtYWluZGVyRGF5cyA9PSAwID8gXCLmmI7lpKlcIiA6IGRhdGEucmVtYWluZGVyRGF5cyArIFwi5aSp5ZCOXCJcclxuICAgICAgICAgIH08L2I+5Yiw5pyf77yM5Li65LqG5LiN5b2x5ZON5oKo5YWs5Y+455qE5q2j5bi45L2/55So77yM6K+35oKo5o+Q5YmN6L+b6KGM57ut6LS55oiW6LSt5Lmw5YW25LuW6KeE5qC844CCPC9kaXY+YDtcclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCLlt7LliLDmnJ/mj5DnpLpcIjpcclxuICAgICAgICBpZiAoZGF0YS5idXlWZXJzaW9uID09PSBcIlpZQlwiKSB7XHJcbiAgICAgICAgICByZXR1cm5UeHQgPSBg5oKo5YWs5Y+45LqOPGI+JHtcclxuICAgICAgICAgICAgZGF0YS5idXlEYXRlXHJcbiAgICAgICAgICB9PC9iPui0reS5sOeahOiaguiageWIhuW3peS4k+S4mueJiOW3sue7j+WIsOacn++8jOaEn+iwouaCqOeahOaUr+aMgeWSjOS/oeS7u++8jOivt+aCqOWPiuaXtue7rei0ueaIlui0reS5sOWFtuS7luinhOagvOOAgmA7XHJcbiAgICAgICAgfSBlbHNlIGlmIChkYXRhLmJ1eVZlcnNpb24gPT09IFwiSkNCXCIpIHtcclxuICAgICAgICAgIHJldHVyblR4dCA9IGDmgqjlhazlj7jkuo48Yj4ke1xyXG4gICAgICAgICAgICBkYXRhLmJ1eURhdGVcclxuICAgICAgICAgIH08L2I+6LSt5Lmw55qE6JqC6JqB5YiG5bel5Z+656GA54mI5bey57uP5Yiw5pyf77yM5oSf6LCi5oKo55qE5pSv5oyB5ZKM5L+h5Lu777yM6K+35oKo5Y+K5pe257ut6LS55oiW5Y2H57qn5Yiw5Yqf6IO95pu05Yqg5YWo6Z2i55qE5LiT5Lia54mI44CCYDtcclxuICAgICAgICB9IGVsc2UgaWYgKFxyXG4gICAgICAgICAgZGF0YS5idXlWZXJzaW9uID09PSBcIlNZQlwiICYmXHJcbiAgICAgICAgICBuZXcgRGF0ZShkYXRhLmNyZWF0ZURhdGUpLmdldFRpbWUoKSAtXHJcbiAgICAgICAgICAgIG5ldyBEYXRlKFwiMjAxOC0xMC0xMlwiKS5nZXRUaW1lKCkgPFxyXG4gICAgICAgICAgICAwXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICByZXR1cm5UeHQgPSBgPGRpdiBjbGFzcz0nZnJlZVRleHQnPjxiPuiaguiageWIhuW3peWFjei0ueeJiDwvYj7vvIzlhY3otLnniYjljIXlkKvku7vliqHljY/kvZznmoTlrozmlbTlip/og73vvIzlj6/ovbvluqbnlKjkuo7ml6XluLjlt6XkvZzkuK3ku7vliqHnmoTmnInluo/mjIfmtL7lkozot5/ov5vjgII8L2Rpdj5cclxuXHRcdFx0XHRcdFx0XHRcdCA8ZGl2IGNsYXNzPSdiYXNpY3NUZXh0Jz48Yj7omoLomoHliIblt6Xln7rnoYDniYg8L2I+77yM57uP5rWO5a6e5oOg55qE5Z+656GA54mI5Zyo5ruh6Laz5Lu75Yqh5Y2P5L2c5Yqf6IO955qE5ZCM5pe277yM5LiN6ZmQ5L2/55So5Lq65pWw44CB5LiN6ZmQ6aG555uu5pWw6YeP44CB5LiN6ZmQ5Lu75Yqh5pWw6YeP44CCPC9kaXY+XHJcblx0XHRcdFx0XHRcdFx0XHQgPGRpdiBjbGFzcz0nbWFqb3JUZXh0Jz48Yj7omoLomoHliIblt6XkuJPkuJrniYg8L2I+77yM5Yqf6IO95by65aSn55qE5LiT5Lia54mI5YW35pyJ5om56YeP5Lu75Yqh5pON5L2c44CB55SY54m55Zu+44CB5aSa57u05bqm5pWw5o2u57uf6K6h5Zu+6KGo562J5LiT5Lia5Yqf6IO977yM5Yqp5oKo5o+Q6auY5Y2P5ZCM5bel5L2c5pWI546H44CB6YeP5YyW5ZGY5bel57up5pWI44CB5o+Q5Y2H6aG555uu566h55CG44CCPC9kaXY+YDtcclxuICAgICAgICB9IGVsc2UgaWYgKFxyXG4gICAgICAgICAgZGF0YS5idXlWZXJzaW9uID09PSBcIlNZQlwiICYmXHJcbiAgICAgICAgICBuZXcgRGF0ZShkYXRhLmNyZWF0ZURhdGUpLmdldFRpbWUoKSAtXHJcbiAgICAgICAgICAgIG5ldyBEYXRlKFwiMjAxOC0xMC0xMlwiKS5nZXRUaW1lKCkgPj1cclxuICAgICAgICAgICAgMFxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgcmV0dXJuVHh0ID0gYDxkaXYgY2xhc3M9J2ZyZWVUZXh0Jz7mgqjlhazlj7jkuo48Yj4ke1xyXG4gICAgICAgICAgICBkYXRhLmJ1eURhdGVcclxuICAgICAgICAgIH08L2I+5byA5aeL5L2T6aqM6K+V55So55qE6JqC6JqB5YiG5bel5LiT5Lia54mI5bey5Yiw5pyf77yM6K+35Y+K5pe26LSt5Lmw5Y2H57qn44CCPC9kaXY+XHJcblx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPSdiYXNpY3NUZXh0Jz7lpoLmgqjpnIDopoHovbvph4/ljJbnmoTku7vliqHljY/lkIzvvIzlj6/otK3kubDnu4/mtY7lrp7mg6DnmoQ8Yj7omoLomoHliIblt6Xln7rnoYDniYg8L2I+77yM5Z+656GA54mI5LiN6ZmQ5L2/55So5Lq65pWw44CB5LiN6ZmQ6aG555uu5pWw6YeP44CB5LiN6ZmQ5Lu75Yqh5pWw6YeP44CCPC9kaXY+XHJcblx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPSdtYWpvclRleHQnPuaIkeS7rOW7uuiuruaCqOWNh+e6p+WIsOWKn+iDveW8uuWkp+eahDxiPuiaguiageWIhuW3peS4k+S4mueJiDwvYj7vvIzkuJPkuJrniYjlhbfmnInmibnph4/ku7vliqHmk43kvZzjgIHnlJjnibnlm77jgIHlpJrnu7TluqbmlbDmja7nu5/orqHlm77ooajnrYnkuJPkuJrlip/og73vvIzliqnmgqjmj5Dpq5jljY/lkIzlt6XkvZzmlYjnjofjgIHph4/ljJblkZjlt6Xnu6nmlYjjgIHmj5DljYfpobnnm67nrqHnkIbjgII8L2Rpdj5gO1xyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICAgIHJldHVybiByZXR1cm5UeHQ7XHJcbiAgfVxyXG5cclxuICAvLyDlj6rlhYHorrjovpPlhaXmraPmlbTmlbDlkozmta7ngrnmlbBcclxuICBzdGF0aWMgb25seU51bWJlcihvYmopIHtcclxuICAgIG9iai52YWx1ZSA9IG9iai52YWx1ZVxyXG4gICAgICAucmVwbGFjZSgvW15cXGRcXC5dL2csIFwiXCIpXHJcbiAgICAgIC5yZXBsYWNlKFwiLlwiLCBcImFcIilcclxuICAgICAgLnJlcGxhY2UoL1xcLi9nLCBcIlwiKVxyXG4gICAgICAucmVwbGFjZShcImFcIiwgXCIuXCIpO1xyXG4gICAgaWYgKG9iai52YWx1ZVswXSA9PT0gXCIuXCIpIHtcclxuICAgICAgb2JqLnZhbHVlID0gXCIwXCIgKyBvYmoudmFsdWU7XHJcbiAgICB9XHJcbiAgfVxyXG4gIC8qKlxyXG4gKiBqc+aVsOe7hOaOkuW6jyDmlK/mjIHmlbDlrZflkozlrZfnrKbkuLJcclxuICogQHBhcmFtIHBhcmFtc1xyXG4gKiBAcGFyYW0gYXJyT2JqICAgb2JqICAgICDlv4XloasgIOaVsOe7hOWvueixoVxyXG4gKiBAcGFyYW0ga2V5TmFtZSAgc3RyaW5nICDlv4XloasgIOimgeaOkuW6j+eahOWxnuaAp+WQjeensFxyXG4gKiBAcGFyYW0gdHlwZSAgICAgaW50ICAgICDpgInloasgIOm7mOiupHR5cGU6MCDmraPpobogIHR5cGU6MeWPjemhulxyXG4gKiBAZGVzY3JpcHRpb25cclxuICogIOS9v+eUqOekuuS+i++8mlxyXG4gICAgICB2YXIgdGVtcCA9IFtcclxuICAgICAgICB7XCJuYW1lXCI6XCJ6amZcIixcInNjb3JlXCI6NTAsXCJhZ2VcIjoxMH0sXHJcbiAgICAgICAge1wibmFtZVwiOlwibHl5XCIsXCJzY29yZVwiOjkwLFwiYWdlXCI6NX0sXHJcbiAgICAgICAge1wibmFtZVwiOlwienp4XCIsXCJzY29yZVwiOjkwLFwiYWdlXCI6MTJ9XHJcbiAgICAgIF07XHJcbiAgICAgIC8v5qC55o2uYWdl5o6S5bqPXHJcbiAgICAgIHZhciB0ZW1wMSA9IGFyckl0ZW1Tb3J0KHRlbXAsXCJhZ2VcIiwxKTtcclxuICovXHJcbiAgc3RhdGljIGFyckl0ZW1Tb3J0KGFyck9iaiwga2V5TmFtZSwgdHlwZSwgaXNEYXRlKSB7XHJcbiAgICAvL+i/memHjOWmguaenCDnm7TmjqXnrYnkuo5hcnJPYmrvvIznm7jlvZPkuo7lj6rmmK/lr7nlr7nosaHnmoTlvJXnlKjvvIzmlLnlj5jmjpLluo/kvJrlkIzml7blvbHlk43ljp/mnInlr7nosaHnmoTmjpLluo/vvIzogIzpgJrov4dhcnJPYmouc2xpY2UoMCnvvIxcclxuICAgIC8v6KGo56S65oqK5a+56LGh5aSN5Yi257uZ5Y+m5LiA5Liq5a+56LGh77yM5Lik6ICF6Ze05LqS5LiN5b2x5ZONXHJcbiAgICBpZiAoIWFyck9iaikge1xyXG4gICAgICByZXR1cm4gW107XHJcbiAgICB9XHJcbiAgICB2YXIgdGVtcEFyck9iaiA9IGFyck9iai5zbGljZSgwKTtcclxuICAgIHZhciBjb21wYXJlID0gZnVuY3Rpb24oa2V5TmFtZSwgdHlwZSkge1xyXG4gICAgICByZXR1cm4gZnVuY3Rpb24ob2JqMSwgb2JqMikge1xyXG4gICAgICAgIHZhciB2YWwxID0gb2JqMVtrZXlOYW1lXTtcclxuICAgICAgICB2YXIgdmFsMiA9IG9iajJba2V5TmFtZV07XHJcbiAgICAgICAgaWYgKGlzRGF0ZSkge1xyXG4gICAgICAgICAgdmFsMSA9IG5ldyBEYXRlKG9iajFba2V5TmFtZV0ucmVwbGFjZSgvLS9nLCBcIi9cIikpLmdldFRpbWUoKSAvIDEwMDA7XHJcblxyXG4gICAgICAgICAgdmFsMiA9IG5ldyBEYXRlKG9iajJba2V5TmFtZV0ucmVwbGFjZSgvLS9nLCBcIi9cIikpLmdldFRpbWUoKSAvIDEwMDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghaXNOYU4oTnVtYmVyKHZhbDEpKSAmJiAhaXNOYU4oTnVtYmVyKHZhbDIpKSkge1xyXG4gICAgICAgICAgdmFsMSA9IE51bWJlcih2YWwxKTtcclxuICAgICAgICAgIHZhbDIgPSBOdW1iZXIodmFsMik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5aaC5p6c5YC85Li656m655qE77yM5pS+5Zyo5pyA5ZCOXHJcbiAgICAgICAgaWYgKHZhbDEgPT0gbnVsbCAmJiB2YWwyID09IG51bGwpIHtcclxuICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodmFsMSA9PSBudWxsICYmIHZhbDIgIT0gbnVsbCkge1xyXG4gICAgICAgICAgcmV0dXJuIHR5cGUgPT0gMSA/IC0xIDogMTtcclxuICAgICAgICB9IGVsc2UgaWYgKHZhbDIgPT0gbnVsbCAmJiB2YWwxICE9IG51bGwpIHtcclxuICAgICAgICAgIHJldHVybiB0eXBlID09IDEgPyAxIDogLTE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5o6S5bqPXHJcbiAgICAgICAgaWYgKHZhbDEgPCB2YWwyKSB7XHJcbiAgICAgICAgICByZXR1cm4gdHlwZSA9PSAxID8gMSA6IC0xO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodmFsMSA+IHZhbDIpIHtcclxuICAgICAgICAgIHJldHVybiB0eXBlID09IDEgPyAtMSA6IDE7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgICAgfTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gdGVtcEFyck9iai5zb3J0KGNvbXBhcmUoa2V5TmFtZSwgdHlwZSkpO1xyXG4gIH1cclxuXHJcbiAgLy8g5qC55o2u5paH5Lu257G75Z6LIOi/lOWbniDmlofku7blm77moIdcclxuICBzdGF0aWMgY3JlYXRlRmlsZUljb24oZmlsZVR5cGUpIHtcclxuICAgIGxldCBpbml0ZmlsZVR5cGUgPSBuZXcgU3RyaW5nKGZpbGVUeXBlKTtcclxuICAgIGlmIChpbml0ZmlsZVR5cGUubGVuZ3RoID4gMSkge1xyXG4gICAgICBpbml0ZmlsZVR5cGUgPSBpbml0ZmlsZVR5cGUuc3Vic3RyKDAsIDEpICsgaW5pdGZpbGVUeXBlLnN1YnN0cigxKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGluaXRmaWxlVHlwZSA9IGluaXRmaWxlVHlwZTtcclxuICAgIH1cclxuICAgIGxldCBhdWRpb0FyciA9IFtcclxuICAgICAgXCJ3YXZcIixcclxuICAgICAgXCJtcDNcIixcclxuICAgICAgXCJhdVwiLFxyXG4gICAgICBcImFpZlwiLFxyXG4gICAgICBcImFpZmZcIixcclxuICAgICAgXCJyYW1cIixcclxuICAgICAgXCJ3bWFcIixcclxuICAgICAgXCJtbWZcIixcclxuICAgICAgXCJhbXJcIixcclxuICAgICAgXCJhYWNcIixcclxuICAgICAgXCJmbGFjXCJcclxuICAgIF07XHJcbiAgICBsZXQgcmFkaW9BcnIgPSBbXHJcbiAgICAgIFwiYXZpXCIsXHJcbiAgICAgIFwibW92XCIsXHJcbiAgICAgIFwiYXNmXCIsXHJcbiAgICAgIFwid212XCIsXHJcbiAgICAgIFwibmF2aVwiLFxyXG4gICAgICBcIjNncFwiLFxyXG4gICAgICBcInJhXCIsXHJcbiAgICAgIFwicmFtXCIsXHJcbiAgICAgIFwibWt2XCIsXHJcbiAgICAgIFwiZmx2XCIsXHJcbiAgICAgIFwiZjR2XCIsXHJcbiAgICAgIFwicm12YlwiLFxyXG4gICAgICBcIndlYm1cIixcclxuICAgICAgXCJtcDRcIlxyXG4gICAgXTtcclxuICAgIGxldCBpbWFnZUFyciA9IFtcclxuICAgICAgXCJqcGdcIixcclxuICAgICAgXCJwbmdcIixcclxuICAgICAgXCJqcGVnXCIsXHJcbiAgICAgIFwiYm1wXCIsXHJcbiAgICAgIFwicGN4XCIsXHJcbiAgICAgIFwidGlmXCIsXHJcbiAgICAgIFwidGdhXCIsXHJcbiAgICAgIFwiZXhpZlwiLFxyXG4gICAgICBcImZweFwiLFxyXG4gICAgICBcInN2Z1wiLFxyXG4gICAgICBcImNkclwiLFxyXG4gICAgICBcInBjZFwiLFxyXG4gICAgICBcImR4ZlwiLFxyXG4gICAgICBcInVmb1wiLFxyXG4gICAgICBcImVzcFwiLFxyXG4gICAgICBcImFpXCIsXHJcbiAgICAgIFwiaGRyaVwiLFxyXG4gICAgICBcInJhd1wiLFxyXG4gICAgICBcIndtZlwiLFxyXG4gICAgICBcImZsaWNcIixcclxuICAgICAgXCJlbXBcIixcclxuICAgICAgXCJpY29cIlxyXG4gICAgXTtcclxuICAgIGxldCBleGNlbEFyciA9IFtcInhsc3hcIiwgXCJ4bHNcIl07XHJcbiAgICBsZXQgd29yZEFyciA9IFtcImRvY1wiLCBcImRvY3hcIl07XHJcbiAgICBsZXQgbm9tYWxBcnIgPSBbXCJ6aXBcIiwgXCJ3b3JkXCJdO1xyXG4gICAgbGV0IG5ld0FkZEFyciA9IFtcInBkZlwiLCBcInBwdFwiLCBcImR3Z1wiLCBcInJhclwiLCBcInBzXCIsIFwiemlwXCIsIFwid29yZFwiXTtcclxuICAgIGlmICh0aGlzLm9uZU9mSWNvbihmaWxlVHlwZSwgYXVkaW9BcnIpKSB7XHJcbiAgICAgIGZpbGVUeXBlID0gXCJhdWRpb1wiO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLm9uZU9mSWNvbihmaWxlVHlwZSwgcmFkaW9BcnIpKSB7XHJcbiAgICAgIGZpbGVUeXBlID0gXCJyYWRpb1wiO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLm9uZU9mSWNvbihmaWxlVHlwZSwgZXhjZWxBcnIpKSB7XHJcbiAgICAgIGZpbGVUeXBlID0gXCJleGNlbFwiO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLm9uZU9mSWNvbihmaWxlVHlwZSwgd29yZEFycikpIHtcclxuICAgICAgZmlsZVR5cGUgPSBcIndvcmRcIjtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5vbmVPZkljb24oZmlsZVR5cGUsIGltYWdlQXJyKSkge1xyXG4gICAgICBmaWxlVHlwZSA9IFwiaW1hZ2VcIjtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5vbmVPZkljb24oZmlsZVR5cGUsIG5vbWFsQXJyKSkge1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLm9uZU9mSWNvbihmaWxlVHlwZSwgbmV3QWRkQXJyKSkge1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZmlsZVR5cGUgPSBcIm90aGVyc1wiO1xyXG4gICAgfVxyXG4gICAgLy/mraTlpITopoHlgZrliKTmlq3vvIznnIvmmK/ku4DkuYjnsbvlnotcclxuICAgIGlmIChmaWxlVHlwZSA9PT0gXCJvdGhlcnNcIikge1xyXG4gICAgICByZXR1cm4gKFxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZG93bmxvYWQgZG93bmxvYWRPdGhlcnNcIj5cclxuICAgICAgICAgIDxkaXY+e2luaXRmaWxlVHlwZS5zdWJzdHIoMCwgMSl9PC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gPEljb24gdHlwZT17YGFudGljb24tJHtmaWxlVHlwZX1gfSBjbGFzc05hbWU9XCJkb3dubG9hZFwiIC8+O1xyXG4gICAgfVxyXG4gIH1cclxuICBzdGF0aWMgb25lT2ZJY29uKHZhbHVlLCB2YWxpZExpc3QpIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdmFsaWRMaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGlmICh2YWx1ZSA9PSB2YWxpZExpc3RbaV0pIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi91dGlscy91dGlscy5qcyIsImltcG9ydCBIdHRwQ2xpZW50IGZyb20gXCIuLi9hcGkvaHR0cENsaWVudFwiO1xyXG5leHBvcnQgY29uc3QgVEFTS0xJU1QgPSBcIlRBU0tMSVNUXCI7XHJcbi8vIGV4cG9ydCBjb25zdCBVUERBVEVfVEFTS0xJU1QgPSBcIlVQREFURV9UQVNLTElTVFwiO1xyXG5leHBvcnQgY29uc3QgUFJPSkVDVExJU1QgPSBcIlBST0pFQ1RMSVNUXCI7XHJcbmV4cG9ydCBjb25zdCBTRVRfUFJPSkVDVExJU1QgPSBcIlNFVF9QUk9KRUNUTElTVFwiO1xyXG5leHBvcnQgY29uc3QgRFlOQU1JQ0xJU1QgPSBcIkRZTkFNSUNMSVNUXCI7XHJcbmV4cG9ydCBjb25zdCBUQVNLQ09VTlQgPSBcIlRBU0tDT1VOVFwiO1xyXG5leHBvcnQgY29uc3QgVEFTS1BBR0VDT1VOVCA9IFwiVEFTS1BBR0VDT1VOVFwiO1xyXG5leHBvcnQgY29uc3QgUFJPSkVDVFBBR0VDT1VOVCA9IFwiUFJPSkVDVFBBR0VDT1VOVFwiO1xyXG5leHBvcnQgY29uc3QgRFlOQU1JQ1BBR0VDT1VOVCA9IFwiRFlOQU1JQ1BBR0VDT1VOVFwiO1xyXG5leHBvcnQgY29uc3QgVEFTS1RFWFQgPSBcIlRBU0tURVhUXCI7XHJcbmV4cG9ydCBjb25zdCBUQVNLTElTVERFTCA9IFwiVEFTS0xJU1RERUxcIjtcclxuZXhwb3J0IGNvbnN0IFNFVF9UQVNLTElTVERFTCA9IFwiU0VUX1RBU0tMSVNUREVMXCI7XHJcbmV4cG9ydCBjb25zdCBBRERfVEFTS0xJU1RERUwgPSBcIkFERF9UQVNLTElTVERFTFwiO1xyXG5leHBvcnQgY29uc3QgRURJVF9UQVNLTElTVERFTCA9IFwiRURJVF9UQVNLTElTVERFTFwiO1xyXG5cclxuZXhwb3J0IGNvbnN0IFRBU0tDT1VOVERFTCA9IFwiVEFTS0NPVU5UREVMXCI7XHJcbmV4cG9ydCBjb25zdCBTRVRfVEFTS0NPVU5UREVMID0gXCJTRVRfVEFTS0NPVU5UREVMXCI7XHJcbmV4cG9ydCBjb25zdCBUQVNLVEVYVERFTCA9IFwiVEFTS1RFWFRERUxcIjtcclxuZXhwb3J0IGNvbnN0IFRBU0tQQUdFQ09VTlRERUwgPSBcIlRBU0tQQUdFQ09VTlRERUxcIjtcclxuZXhwb3J0IGNvbnN0IFRBU0tTQ1JPTExUT1AgPSBcIlRBU0tTQ1JPTExUT1BcIjtcclxuZXhwb3J0IGNvbnN0IFRBU0tDT05ESVRJT04gPSBcIlRBU0tDT05ESVRJT05cIjtcclxuZXhwb3J0IGNvbnN0IFBST0pFQ1RURVhUID0gXCJQUk9KRUNUVEVYVFwiO1xyXG5leHBvcnQgY29uc3QgUFJPSkVDVFRZUEUgPSBcIlBST0pFQ1RUWVBFXCI7XHJcbmV4cG9ydCBjb25zdCBQUk9KRUNUU0NST0xMID0gXCJQUk9KRUNUU0NST0xMXCI7XHJcbmV4cG9ydCBjb25zdCBQUk9KRUNUQUxMQ09VTlQgPSBcIlBST0pFQ1RBTExDT1VOVFwiO1xyXG5leHBvcnQgY29uc3QgUFJPSkVDVFRBU0tMSVNUID0gXCJQUk9KRUNUVEFTS0xJU1RcIjtcclxuZXhwb3J0IGNvbnN0IFBST0pFQ1RUQVNLQUxMQ09VTlQgPSBcIlBST0pFQ1RUQVNLQUxMQ09VTlRcIjtcclxuZXhwb3J0IGNvbnN0IFBST0pFQ1RUQVNLU0NST0xMID0gXCJQUk9KRUNUVEFTS1NDUk9MTFwiO1xyXG5leHBvcnQgY29uc3QgRFlOQU1JQ1NDUk9MTFRPUCA9IFwiRFlOQU1JQ1NDUk9MTFRPUFwiO1xyXG5leHBvcnQgY29uc3QgSE9NRVNDUk9MTFRPUCA9IFwiSE9NRVNDUk9MTFRPUFwiO1xyXG5leHBvcnQgY29uc3QgUFJPSkVDVF9DT05ESVRJT04gPSBcIlBST0pFQ1RfQ09ORElUSU9OXCI7XHJcbmV4cG9ydCBjb25zdCBQUk9KRUNUX1RBR0xJU1QgPSBcIlBST0pFQ1RfVEFHTElTVFwiO1xyXG5leHBvcnQgY29uc3QgUFJPSkVDVF9OT1dfUEFHRSA9IFwiUFJPSkVDVF9OT1dfUEFHRVwiO1xyXG5leHBvcnQgZnVuY3Rpb24gY29udGVudChkYXRhLCB0eXBlKSB7XHJcbiAgcmV0dXJuIHtcclxuICAgIHR5cGU6IHR5cGUsXHJcbiAgICBwYXlsb2FkOiBkYXRhXHJcbiAgfTtcclxufVxyXG4vL+S/neWtmOW9k+WJjeeahOmhteeggVxyXG5leHBvcnQgZnVuY3Rpb24gc2F2ZVByb2plY3ROb3dQYWdlQXRDYWNoZShkYXRhKSB7XHJcbiAgcmV0dXJuIHtcclxuICAgIHR5cGU6IFwiUFJPSkVDVF9OT1dfUEFHRVwiLFxyXG4gICAgcGF5bG9hZDogZGF0YVxyXG4gIH07XHJcbn1cclxuLy/pgInmi6nnmoTmoIfnrb7or6bnu4bkv6Hmga/kvZzkuLrlm57mmL7nlKhcclxuZXhwb3J0IGZ1bmN0aW9uIHNhdmVQcm9qZWN0VGFnTGlzdEF0Q2FjaGUoZGF0YSkge1xyXG4gIHJldHVybiB7XHJcbiAgICB0eXBlOiBcIlBST0pFQ1RfVEFHTElTVFwiLFxyXG4gICAgcGF5bG9hZDogZGF0YVxyXG4gIH07XHJcbn1cclxuLy/pobnnm67nrZvpgInmnaHku7ZcclxuZXhwb3J0IGZ1bmN0aW9uIHNhdmVQcm9qZWN0Q29uZGl0aW9uQXRDYWNoZShkYXRhKSB7XHJcbiAgcmV0dXJuIHtcclxuICAgIHR5cGU6IFwiUFJPSkVDVF9DT05ESVRJT05cIixcclxuICAgIHBheWxvYWQ6IGRhdGFcclxuICB9O1xyXG59XHJcbi8vIOS7u+WKoeWIl+ihqCDnrKzkuIDpobXnvJPlrZjmlbDmja5cclxuZXhwb3J0IGZ1bmN0aW9uIHNhdmVUYXNrTGlzdEF0Q2FjaGUoZGF0YSkge1xyXG4gIHJldHVybiB7XHJcbiAgICB0eXBlOiBUQVNLTElTVCxcclxuICAgIHBheWxvYWQ6IGRhdGFcclxuICB9O1xyXG59XHJcbi8vIC8v5Lu75Yqh5YiX6KGo5Yib5bu65Yig6Zmk5pu05paw5YiX6KGoXHJcbi8vIGV4cG9ydCBmdW5jdGlvbiB1cGRhdGVUYXNrTGlzdEF0Q2FjaGUoZGF0YSkge1xyXG4vLyBcdHJldHVybiB7XHJcbi8vIFx0XHR0eXBlOiBVUERBVEVfVEFTS0xJU1QsXHJcbi8vIFx0XHRwYXlsb2FkOiBkYXRhXHJcbi8vIFx0fTtcclxuLy8gfVxyXG5cclxuLy8g5Lu75Yqh5YiX6KGoIOaAu+adoeaVsFxyXG5leHBvcnQgZnVuY3Rpb24gc2F2ZVRhc2tDb3VudEF0Q2FjaGUoZGF0YSkge1xyXG4gIHJldHVybiB7XHJcbiAgICB0eXBlOiBUQVNLQ09VTlQsXHJcbiAgICBwYXlsb2FkOiBkYXRhXHJcbiAgfTtcclxufVxyXG4vL+S7u+WKoeaQnOe0ouadoeS7tlxyXG5leHBvcnQgZnVuY3Rpb24gc2F2ZVRhc2tUZXh0QXRDYWNoZShkYXRhKSB7XHJcbiAgcmV0dXJuIHtcclxuICAgIHR5cGU6IFRBU0tURVhULFxyXG4gICAgcGF5bG9hZDogZGF0YVxyXG4gIH07XHJcbn1cclxuXHJcbi8vIOS7u+WKoeWIl+ihqCDmgLvpobXmlbBcclxuZXhwb3J0IGZ1bmN0aW9uIHNhdmVUYXNrUGFnZUNvdW50QXRDYWNoZShkYXRhKSB7XHJcbiAgcmV0dXJuIHtcclxuICAgIHR5cGU6IFRBU0tQQUdFQ09VTlQsXHJcbiAgICBwYXlsb2FkOiBkYXRhXHJcbiAgfTtcclxufVxyXG4vLyDku7vliqHliJfooagg6Lez6L2s5Lu75Yqh6K+m5oOF57yT5a2Y5pWw5o2uXHJcbmV4cG9ydCBmdW5jdGlvbiBzYXZlVGFza0xpc1RvRGF0ZWx0QXRDYWNoZShkYXRhKSB7XHJcbiAgcmV0dXJuIHtcclxuICAgIHR5cGU6IFRBU0tMSVNUREVMLFxyXG4gICAgcGF5bG9hZDogZGF0YVxyXG4gIH07XHJcbn1cclxuLy8g5Yig6Zmk5ZCO5pu05paw5Lu75Yqh5YiX6KGoXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRUYXNrTGlzVG9EYXRlbHRBdENhY2hlKGlkKSB7XHJcbiAgcmV0dXJuIHtcclxuICAgIHR5cGU6IFNFVF9UQVNLTElTVERFTCxcclxuICAgIHBheWxvYWQ6IGlkXHJcbiAgfTtcclxufVxyXG4vLyDlop7liqDlkI7mm7TmlrDku7vliqHliJfooahcclxuZXhwb3J0IGZ1bmN0aW9uIGFkZFRhc2tMaXNUb0RhdGVsdEF0Q2FjaGUoZGF0YSkge1xyXG4gIHJldHVybiB7XHJcbiAgICB0eXBlOiBBRERfVEFTS0xJU1RERUwsXHJcbiAgICBwYXlsb2FkOiBkYXRhXHJcbiAgfTtcclxufVxyXG4vLyDnvJbovpHlkI7mm7TmlrDku7vliqHliJfooahcclxuZXhwb3J0IGZ1bmN0aW9uIGVkaXRUYXNrTGlzVG9EYXRlbHRBdENhY2hlKGRhdGEpIHtcclxuICByZXR1cm4ge1xyXG4gICAgdHlwZTogRURJVF9UQVNLTElTVERFTCxcclxuICAgIHBheWxvYWQ6IGRhdGFcclxuICB9O1xyXG59XHJcbi8vIOS7u+WKoeWIl+ihqCDot7Povazku7vliqHor6bmg4XmgLvmnaHmlbBcclxuZXhwb3J0IGZ1bmN0aW9uIHNhdmVUYXNrQ291bnRUb0RhdGVsQXRDYWNoZShkYXRhKSB7XHJcbiAgcmV0dXJuIHtcclxuICAgIHR5cGU6IFRBU0tDT1VOVERFTCxcclxuICAgIHBheWxvYWQ6IGRhdGFcclxuICB9O1xyXG59XHJcbi8vIOS7u+WKoeWIl+ihqCDliKDpmaTlkI7lj5jmm7TmgLvmnaHmlbBcclxuZXhwb3J0IGZ1bmN0aW9uIHNldFRhc2tDb3VudFRvRGF0ZWxBdENhY2hlKGRhdGEpIHtcclxuICByZXR1cm4ge1xyXG4gICAgdHlwZTogU0VUX1RBU0tDT1VOVERFTCxcclxuICAgIHBheWxvYWQ6IGRhdGFcclxuICB9O1xyXG59XHJcbi8v5Lu75Yqh5pCc57Si5p2h5Lu2IOi3s+i9rOS7u+WKoeivpuaDheWQjueahOaQnOe0oue8k+WtmFxyXG5leHBvcnQgZnVuY3Rpb24gc2F2ZVRhc2tUZXh0VG9EYXRlbEF0Q2FjaGUoZGF0YSkge1xyXG4gIHJldHVybiB7XHJcbiAgICB0eXBlOiBUQVNLVEVYVERFTCxcclxuICAgIHBheWxvYWQ6IGRhdGFcclxuICB9O1xyXG59XHJcbi8vIOS7u+WKoeWIl+ihqCDot7Povazku7vliqHor6bmg4XnmoTmgLvpobXmlbBcclxuZXhwb3J0IGZ1bmN0aW9uIHNhdmVUYXNrUGFnZUNvdW50VG9EYXRlbEF0Q2FjaGUoZGF0YSkge1xyXG4gIHJldHVybiB7XHJcbiAgICB0eXBlOiBUQVNLUEFHRUNPVU5UREVMLFxyXG4gICAgcGF5bG9hZDogZGF0YVxyXG4gIH07XHJcbn1cclxuLy/mu5rliqjmnaHpq5jluqYg6Lez6L2s5Lu75Yqh6K+m5oOF5ZCO55qEXHJcbmV4cG9ydCBmdW5jdGlvbiBzYXZlVGFza1Njcm9sbFRvcEF0Q2FjaGUoZGF0YSkge1xyXG4gIHJldHVybiB7XHJcbiAgICB0eXBlOiBUQVNLU0NST0xMVE9QLFxyXG4gICAgcGF5bG9hZDogZGF0YVxyXG4gIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzYXZlSG9tZVNjcm9sbFRvcChkYXRhKSB7XHJcbiAgcmV0dXJuIHtcclxuICAgIHR5cGU6IEhPTUVTQ1JPTExUT1AsXHJcbiAgICBwYXlsb2FkOiBkYXRhXHJcbiAgfTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gc2F2ZUR5bmFtaWNTY3JvbGxUb3AoZGF0YSkge1xyXG4gIHJldHVybiB7XHJcbiAgICB0eXBlOiBEWU5BTUlDU0NST0xMVE9QLFxyXG4gICAgcGF5bG9hZDogZGF0YVxyXG4gIH07XHJcbn1cclxuXHJcbi8v5Lu75Yqh5YiX6KGo562b6YCJ5p2h5Lu2IOi3s+i9rOS7u+WKoeivpuaDheWQjlxyXG5leHBvcnQgZnVuY3Rpb24gc2F2ZVRhc2tDb25kaXRpb25BdENhY2hlKGRhdGEpIHtcclxuICByZXR1cm4ge1xyXG4gICAgdHlwZTogVEFTS0NPTkRJVElPTixcclxuICAgIHBheWxvYWQ6IGRhdGFcclxuICB9O1xyXG59XHJcbi8vIOmhueebruWIl+ihqCDnrKzkuIDpobXnvJPlrZjmlbDmja5cclxuZXhwb3J0IGZ1bmN0aW9uIHNhdmVQcm9qZWN0TGlzdEF0Q2FjaGUoZGF0YSkge1xyXG4gIHJldHVybiB7XHJcbiAgICB0eXBlOiBQUk9KRUNUTElTVCxcclxuICAgIHBheWxvYWQ6IGRhdGFcclxuICB9O1xyXG59XHJcbi8v6aG555uu5YiX6KGoIOabtOaWsOmhueebruWIl+ihqOaVsOaNrlxyXG5leHBvcnQgZnVuY3Rpb24gc2V0VXBkYXRhUHJvamVjdExpc3RBdENhY2hlKGRhdGEpIHtcclxuICByZXR1cm4ge1xyXG4gICAgdHlwZTogU0VUX1BST0pFQ1RMSVNULFxyXG4gICAgcGF5bG9hZDogZGF0YVxyXG4gIH07XHJcbn1cclxuXHJcbi8v6aG555uu5YiX6KGo5pCc57Si5p2h5Lu2IOe8k+WtmOaVsOaNrlxyXG5leHBvcnQgZnVuY3Rpb24gc2F2ZVByb2plY3RUZXh0QXRDYWNoZShkYXRhKSB7XHJcbiAgcmV0dXJuIHtcclxuICAgIHR5cGU6IFBST0pFQ1RURVhULFxyXG4gICAgcGF5bG9hZDogZGF0YVxyXG4gIH07XHJcbn1cclxuLy/pobnnm67liJfooajoj5zljZXnrZvpgInmnaHku7Yg57yT5a2Y5pWw5o2uXHJcbmV4cG9ydCBmdW5jdGlvbiBzYXZlUHJvamVjdFR5cGVBdENhY2hlKGRhdGEpIHtcclxuICByZXR1cm4ge1xyXG4gICAgdHlwZTogUFJPSkVDVFRZUEUsXHJcbiAgICBwYXlsb2FkOiBkYXRhXHJcbiAgfTtcclxufVxyXG4vL+mhueebruWIl+ihqOa7muWKqOadoSDnvJPlrZjmlbDmja5cclxuZXhwb3J0IGZ1bmN0aW9uIHNhdmVQcm9qZWN0U2Nyb2xsQXRDYWNoZShkYXRhKSB7XHJcbiAgcmV0dXJuIHtcclxuICAgIHR5cGU6IFBST0pFQ1RTQ1JPTEwsXHJcbiAgICBwYXlsb2FkOiBkYXRhXHJcbiAgfTtcclxufVxyXG4vLyDpobnnm67liJfooajot7Povazpobnnm67or6bmg4Ug5oC76aG15pWwXHJcbmV4cG9ydCBmdW5jdGlvbiBzYXZlUHJvamVjdEFsbENvdW50QXRDYWNoZShkYXRhKSB7XHJcbiAgcmV0dXJuIHtcclxuICAgIHR5cGU6IFBST0pFQ1RBTExDT1VOVCxcclxuICAgIHBheWxvYWQ6IGRhdGFcclxuICB9O1xyXG59XHJcbi8vIOmhueebruWIl+ihqCDmgLvpobXmlbBcclxuZXhwb3J0IGZ1bmN0aW9uIHNhdmVQcm9qZWN0UGFnZUNvdW50QXRDYWNoZShkYXRhKSB7XHJcbiAgcmV0dXJuIHtcclxuICAgIHR5cGU6IFBST0pFQ1RQQUdFQ09VTlQsXHJcbiAgICBwYXlsb2FkOiBkYXRhXHJcbiAgfTtcclxufVxyXG4vL+mhueebruivpuaDhSDku7vliqHliJfooahcclxuZXhwb3J0IGZ1bmN0aW9uIHNhdmVQcm9qZWN0VGFza0xpc3QoZGF0YSkge1xyXG4gIHJldHVybiB7XHJcbiAgICB0eXBlOiBQUk9KRUNUVEFTS0xJU1QsXHJcbiAgICBwYXlsb2FkOiBkYXRhXHJcbiAgfTtcclxufVxyXG4vL+mhueebruivpuaDhSDku7vliqHliJfooajmgLvpobXmlbBcclxuZXhwb3J0IGZ1bmN0aW9uIHNhdmVQcm9qZWN0VGFza0FsbENvdW50KGRhdGEpIHtcclxuICByZXR1cm4ge1xyXG4gICAgdHlwZTogUFJPSkVDVFRBU0tBTExDT1VOVCxcclxuICAgIHBheWxvYWQ6IGRhdGFcclxuICB9O1xyXG59XHJcbi8v6aG555uu6K+m5oOFIOS7u+WKoeWIl+ihqOa7muWKqOadoemrmOW6plxyXG5leHBvcnQgZnVuY3Rpb24gc2F2ZVByb2plY3RUYXNrU2Nyb2xsKGRhdGEpIHtcclxuICByZXR1cm4ge1xyXG4gICAgdHlwZTogUFJPSkVDVFRBU0tTQ1JPTEwsXHJcbiAgICBwYXlsb2FkOiBkYXRhXHJcbiAgfTtcclxufVxyXG4vLyDliqjmgIHliJfooagg56ys5LiA6aG157yT5a2Y5pWw5o2uXHJcbmV4cG9ydCBmdW5jdGlvbiBzYXZlRHluYW1pY0xpc3RBdENhY2hlKGRhdGEpIHtcclxuICByZXR1cm4ge1xyXG4gICAgdHlwZTogRFlOQU1JQ0xJU1QsXHJcbiAgICBwYXlsb2FkOiBkYXRhXHJcbiAgfTtcclxufVxyXG5cclxuLy8g5Yqo5oCB5YiX6KGoIOaAu+mhteaVsFxyXG5leHBvcnQgZnVuY3Rpb24gc2F2ZUR5bmFtaWNQYWdlQ291bnRBdENhY2hlKGRhdGEpIHtcclxuICByZXR1cm4ge1xyXG4gICAgdHlwZTogRFlOQU1JQ1BBR0VDT1VOVCxcclxuICAgIHBheWxvYWQ6IGRhdGFcclxuICB9O1xyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FjdGlvbnMvY2FjaGUuanMiLCJpbXBvcnQgSHR0cENsaWVudCBmcm9tIFwiLi4vYXBpL2h0dHBDbGllbnRcIjtcclxuZXhwb3J0IGNvbnN0IEhPTUVfREFUQSA9IFwiSE9NRV9EQVRBXCI7XHJcbmV4cG9ydCBjb25zdCBESU5HVEFLX01FU1NBR0VfREVMRVRFID0gXCJESU5HVEFLX01FU1NBR0VfREVMRVRFXCI7XHJcbmV4cG9ydCBjb25zdCBUQVNLSU5GT19JRCA9IFwiVEFTS0lORk9fSURcIjtcclxuZXhwb3J0IGNvbnN0IEJBQ0tfRk4gPSBcIkJBQ0tfRk5cIjtcclxuZXhwb3J0IGNvbnN0IFRBU0tfTElTVF9CWV9DT05ESVRJT04gPSBcIlRBU0tfTElTVF9CWV9DT05ESVRJT05cIjtcclxuZXhwb3J0IGNvbnN0IFRBU0tfREVUQUlMUyA9IFwiVEFTS19ERVRBSUxTXCI7XHJcbmV4cG9ydCBjb25zdCBUQVNLX0NISUxEX0xJU1RfQllfSUQgPSBcIlRBU0tfQ0hJTERfTElTVF9CWV9JRFwiO1xyXG5leHBvcnQgY29uc3QgVEFTS19SRUxFVkFOQ0VfTElTVF9CWV9JRCA9IFwiVEFTS19SRUxFVkFOQ0VfTElTVF9CWV9JRFwiO1xyXG5leHBvcnQgY29uc3QgVEFTS19GSUxFU19MSVNUX0JZX0lEID0gXCJUQVNLX0ZJTEVTX0xJU1RfQllfSURcIjtcclxuZXhwb3J0IGNvbnN0IFRBU0tfVEFTS0lORk9fVVBEQVRFID0gXCJUQVNLX1RBU0tJTkZPX1VQREFURVwiO1xyXG5leHBvcnQgY29uc3QgVEFTS0lORk9fVVBMT0FESU5HID0gXCJUQVNLSU5GT19VUExPQURJTkdcIjtcclxuZXhwb3J0IGNvbnN0IFRBU0tfRklMRVNfREVMRVRFID0gXCJUQVNLX0ZJTEVTX0RFTEVURVwiO1xyXG5leHBvcnQgY29uc3QgVEFTS19BRERfVEFMSyA9IFwiVEFTS19BRERfVEFMS1wiO1xyXG5leHBvcnQgY29uc3QgVEFTS19ERUxFVEVfVEFMSyA9IFwiVEFTS19ERUxFVEVfVEFMS1wiO1xyXG5leHBvcnQgY29uc3QgVEFTS19DUkVBVEUgPSBcIlRBU0tfQ1JFQVRFXCI7XHJcbmV4cG9ydCBjb25zdCBUQVNLX1BSSU9SSVRZX0xJU1QgPSBcIlRBU0tfUFJJT1JJVFlfTElTVFwiO1xyXG5leHBvcnQgY29uc3QgVEFTS0lORk9fVEFTS19CWV9QUk9fTElTVCA9IFwiVEFTS0lORk9fVEFTS19CWV9QUk9fTElTVFwiO1xyXG5leHBvcnQgY29uc3QgVEFTS19DUkVBVEVfVkFMUyA9IFwiVEFTS19DUkVBVEVfVkFMU1wiO1xyXG5leHBvcnQgY29uc3QgVEFTS19ERUxFVEUgPSBcIlRBU0tfREVMRVRFXCI7XHJcbmV4cG9ydCBjb25zdCBUQVNLX0NSRUFURV9CUkVBRCA9IFwiVEFTS19DUkVBVEVfQlJFQURcIjtcclxuZXhwb3J0IGNvbnN0IFRBU0tfVVBEQVRFX1NUQVRFID0gXCJUQVNLX1VQREFURV9TVEFURVwiO1xyXG5leHBvcnQgY29uc3QgQ0FMQ1VMQVRFX1BST0pFQ1QgPSBcIkNBTENVTEFURV9QUk9KRUNUXCI7XHJcbmV4cG9ydCBjb25zdCBDQUxDVUxBVEVfVEFTS19UQUJMRSA9IFwiQ0FMQ1VMQVRFX1RBU0tfVEFCTEVcIjtcclxuZXhwb3J0IGNvbnN0IFBST0pFQ1RfQ09VTlQgPSBcIlBST0pFQ1RfQ09VTlRcIjtcclxuZXhwb3J0IGNvbnN0IFJFRlJFU0hfVElNRSA9IFwiUkVGUkVTSF9USU1FXCI7XHJcbmV4cG9ydCBjb25zdCBGSUxFU19MSVNUID0gXCJGSUxFU19MSVNUXCI7XHJcbmV4cG9ydCBjb25zdCBDQUxDVUxBVEVfVEVBTSA9IFwiQ0FMQ1VMQVRFX1RFQU1cIjtcclxuZXhwb3J0IGNvbnN0IFRBU0tJTkZPX1JFRlJFU0ggPSBcIlRBU0tJTkZPX1JFRlJFU0hcIjtcclxuZXhwb3J0IGNvbnN0IFRBU0tfQ1VJQkFOID0gXCJUQVNLX0NVSUJBTlwiO1xyXG5leHBvcnQgY29uc3QgVEFTS19TRUFSQ0hfT0JKRUNUID0gXCJUQVNLX1NFQVJDSF9PQkpFQ1RcIjtcclxuZXhwb3J0IGNvbnN0IFNFTEVDVEVEX1BST1MgPSBcIlNFTEVDVEVEX1BST1NcIjtcclxuZXhwb3J0IGNvbnN0IFNFTEVDVEVEX1RBRyA9IFwiU0VMRUNURURfVEFHXCI7XHJcbmV4cG9ydCBjb25zdCBOT1dfUEFHRSA9IFwiTk9XX1BBR0VcIjtcclxuZXhwb3J0IGNvbnN0IFNFTEVDVEVEX1VTRVJTID0gXCJTRUxFQ1RFRF9VU0VSU1wiO1xyXG5leHBvcnQgZnVuY3Rpb24gY29udGVudChkYXRhLCB0eXBlKSB7XHJcbiAgcmV0dXJuIHtcclxuICAgIHR5cGU6IHR5cGUsXHJcbiAgICBwYXlsb2FkOiBkYXRhXHJcbiAgfTtcclxufVxyXG4vL+S/neWtmOmAieaLqeWQjueahOS6uuWRmOS/oeaBr1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNldFNlbGVjdGVkVXNlcnMoZGF0YSkge1xyXG4gIHJldHVybiB7XHJcbiAgICB0eXBlOiBTRUxFQ1RFRF9VU0VSUyxcclxuICAgIHBheWxvYWQ6IGRhdGFcclxuICB9O1xyXG59XHJcbi8v5L+d5a2Y562b6YCJ6YCJ5Lit55qEdGFnXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXROb3dQYWdlKGRhdGEpIHtcclxuICByZXR1cm4ge1xyXG4gICAgdHlwZTogTk9XX1BBR0UsXHJcbiAgICBwYXlsb2FkOiBkYXRhXHJcbiAgfTtcclxufVxyXG4vL+S/neWtmOetm+mAiemAieS4reeahHRhZ1xyXG5leHBvcnQgZnVuY3Rpb24gc2V0U2VsZWN0ZWRUYWcoZGF0YSkge1xyXG4gIHJldHVybiB7XHJcbiAgICB0eXBlOiBTRUxFQ1RFRF9UQUcsXHJcbiAgICBwYXlsb2FkOiBkYXRhXHJcbiAgfTtcclxufVxyXG4vL+S/neWtmOetm+mAiemAieS4reeahHByb2plY3RcclxuZXhwb3J0IGZ1bmN0aW9uIHNldFNlbGVjdGVkUHJvcyhkYXRhKSB7XHJcbiAgcmV0dXJuIHtcclxuICAgIHR5cGU6IFNFTEVDVEVEX1BST1MsXHJcbiAgICBwYXlsb2FkOiBkYXRhXHJcbiAgfTtcclxufVxyXG4vL+S7u+WKoeaQnOe0ouWvueixoVxyXG5leHBvcnQgZnVuY3Rpb24gc2V0VGFza1NlYXJjaE9iamVjdChkYXRhKSB7XHJcbiAgcmV0dXJuIHtcclxuICAgIHR5cGU6IFRBU0tfU0VBUkNIX09CSkVDVCxcclxuICAgIHBheWxvYWQ6IGRhdGFcclxuICB9O1xyXG59XHJcbi8vIOmmlumhteaVsOaNrlxyXG5leHBvcnQgZnVuY3Rpb24gZmluZEhvbWVEYXRhQnlQYWdlU2l6ZShzaXplID0gNiwgZm4pIHtcclxuICByZXR1cm4gZGlzcGF0Y2ggPT4ge1xyXG4gICAgSHR0cENsaWVudC5BamF4UG9zdChcclxuICAgICAgXCIvdGFza0hvbWUvZmluZE15UmVzcG9uc2VUYXNrP3BhZ2VTaXplPVwiICsgc2l6ZSxcclxuICAgICAgXCJcIixcclxuICAgICAgbGlzdCA9PiB7XHJcbiAgICAgICAgaWYgKGZuKSB7XHJcbiAgICAgICAgICBmbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkaXNwYXRjaChjb250ZW50KGxpc3QsIEhPTUVfREFUQSkpO1xyXG4gICAgICB9XHJcbiAgICApO1xyXG4gIH07XHJcbn1cclxuXHJcbi8vIOWFjeeZu+W9lemHjOmdoueUqOeahCDpkonpkonot7PovazpobXpnaLpgInkuK1cclxuZXhwb3J0IGZ1bmN0aW9uIGdldERpbmdNZXNzYWdlRGV0YWlscyh0YXNraW5mb0lkKSB7XHJcbiAgcmV0dXJuIGRpc3BhdGNoID0+IHtcclxuICAgIEh0dHBDbGllbnQuQWpheFBvc3QoXHJcbiAgICAgIFwiL3Rhc2tpbmZvL2dldERpbmdNZXNzYWdlRGV0YWlscz90YXNraW5mb0lkPVwiICsgdGFza2luZm9JZCxcclxuICAgICAgXCJcIixcclxuICAgICAgbGlzdCA9PiB7XHJcbiAgICAgICAgZGlzcGF0Y2goY29udGVudChsaXN0LCBESU5HVEFLX01FU1NBR0VfREVMRVRFKSk7XHJcbiAgICAgIH1cclxuICAgICk7XHJcbiAgfTtcclxufVxyXG5cclxuLy8g5YWN55m75b2V6YeM6Z2i55So55qEIOmAieS4reS7u+WKoWlkXHJcbmV4cG9ydCBmdW5jdGlvbiBzZWxlY3RUYXNraW5mb0lkKGlkKSB7XHJcbiAgcmV0dXJuIHtcclxuICAgIHR5cGU6IFRBU0tJTkZPX0lELFxyXG4gICAgcGF5bG9hZDogaWRcclxuICB9O1xyXG59XHJcblxyXG4vLyDlhY3nmbvlvZXph4zpnaLnlKjnmoQg5LiN55+l6YGT5bmy5Zib55qEXHJcbmV4cG9ydCBmdW5jdGlvbiBiYWNrRm4odHlwZSkge1xyXG4gIHJldHVybiB7XHJcbiAgICB0eXBlOiBCQUNLX0ZOLFxyXG4gICAgcGF5bG9hZDogdHlwZVxyXG4gIH07XHJcbn1cclxuXHJcbi8vIOmCgOivt+WFs+azqFxyXG5leHBvcnQgZnVuY3Rpb24gYXR0ZW50aW9uVXNlcnModGFza0lkLCB1c2VycywgY2FsbGJhY2spIHtcclxuICBjb25zdCBkYXRhID0ge1xyXG4gICAgb2JqZWN0SWQ6IHRhc2tJZCxcclxuICAgIHJ0eXBlOiBcImJcIixcclxuICAgIHVzZXJzOiB1c2Vyc1xyXG4gIH07XHJcbiAgSHR0cENsaWVudC5BamF4UG9zdChcIi9jb2xsZWN0L2ludml0ZUF0dGVudGlvblwiLCBkYXRhLCBsaXN0ID0+IHtcclxuICAgIGNhbGxiYWNrKGxpc3QpO1xyXG4gIH0pO1xyXG59XHJcblxyXG4vLyDojrflj5bku7vliqHor6bmg4XmlbDmja5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFRhc2tEZXRhaWxzQnlJZChpZCwgZm4pIHtcclxuICByZXR1cm4gZGlzcGF0Y2ggPT4ge1xyXG4gICAgSHR0cENsaWVudC5BamF4UG9zdChcIi90YXNraW5mby9maW5kQnlUYXNraW5mb0lkP2lkPVwiICsgaWQsIFwiXCIsIGxpc3QgPT4ge1xyXG4gICAgICBpZiAoZm4pIHtcclxuICAgICAgICBmbigpO1xyXG4gICAgICB9XHJcbiAgICAgIGRpc3BhdGNoKGNvbnRlbnQobGlzdCwgVEFTS19ERVRBSUxTKSk7XHJcbiAgICB9KTtcclxuICB9O1xyXG59XHJcbi8vIOiOt+WPluS7u+WKoeivpuaDheaVsOaNruS4uuS6huiOt+WPluS/neWtmOWQjueahOaVsOaNrlxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0VGFza0RldGFpbHNCeUlkMihpZCwgZm4pIHtcclxuICByZXR1cm4gZGlzcGF0Y2ggPT4ge1xyXG4gICAgSHR0cENsaWVudC5BamF4UG9zdChcIi90YXNraW5mby9maW5kVGFza2luQnlJZD9pZD1cIiArIGlkLCB7fSwgbGlzdCA9PiB7XHJcbiAgICAgIGlmIChmbikge1xyXG4gICAgICAgIGZuKGxpc3QpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9O1xyXG59XHJcbi8vIOmmlumhteiOt+WPluS7u+WKoeivpuaDheaVsOaNrlxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0VGFza0RldGFpbHNCeUlkcyhpZCwgY2FsbGJhY2spIHtcclxuICBIdHRwQ2xpZW50LkFqYXhQb3N0KFwiL3Rhc2tpbmZvL2ZpbmRCeVRhc2tpbmZvSWQ/aWQ9XCIgKyBpZCwgXCJcIiwgbGlzdCA9PiB7XHJcbiAgICBjYWxsYmFjayhsaXN0KTtcclxuICB9KTtcclxufVxyXG4vLyAvLyDpppbpobXojrflj5bku7vliqHor6bmg4XmlbDmja4o5p+l5Ye65p2l55qE5ZCM5YiX6KGo5pWw5o2u5qC85byP77yM5Li65LqG5pu05paw57yT5a2Y55SoKVxyXG4vLyBleHBvcnQgZnVuY3Rpb24gZ2V0VGFza0RldGFpbHNCeUlkc05ldyhpZCwgY2FsbGJhY2spIHtcclxuLy8gXHRIdHRwQ2xpZW50LkFqYXhQb3N0KFwiL3Rhc2tpbmZvL2ZpbmRUYXNraW5CeUlkP2lkPVwiICsgaWQsIFwiXCIsIGxpc3QgPT4ge1xyXG4vLyBcdFx0Y2FsbGJhY2sobGlzdCk7XHJcbi8vIFx0fSk7XHJcbi8vIH1cclxuXHJcbi8v6I635Y+W5a2Q5Lu75Yqh5pWw5o2uXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRDaGlsZExpc3RCeUlkKGlkLCBmbikge1xyXG4gIHJldHVybiBkaXNwYXRjaCA9PiB7XHJcbiAgICBIdHRwQ2xpZW50LkFqYXhQb3N0KFwiL3Rhc2tpbmZvL2ZpbmRDaGlsZFRhc2tpbmZvP2lkPVwiICsgaWQsIFwiXCIsIGxpc3QgPT4ge1xyXG4gICAgICBpZiAoZm4pIHtcclxuICAgICAgICBmbigpO1xyXG4gICAgICB9XHJcbiAgICAgIGRpc3BhdGNoKGNvbnRlbnQobGlzdCwgVEFTS19DSElMRF9MSVNUX0JZX0lEKSk7XHJcbiAgICB9KTtcclxuICB9O1xyXG59XHJcbi8vIOWFs+azqOmhueebrlxyXG5leHBvcnQgZnVuY3Rpb24gYWRkQXR0ZW50aW9uV2l0Y2hQcm9qZWN0KG9iamVjdElkLCBmbikge1xyXG4gIGNvbnN0IGRhdGEgPSB7IHJ0eXBlOiBcImJcIiwgb2JqZWN0SWQ6IG9iamVjdElkIH07XHJcbiAgcmV0dXJuIGRpc3BhdGNoID0+IHtcclxuICAgIEh0dHBDbGllbnQuQWpheFBvc3QoXCIvY29sbGVjdC9jb2xsZWN0XCIsIGRhdGEsIGxpc3QgPT4ge1xyXG4gICAgICBpZiAoZm4pIHtcclxuICAgICAgICBmbihsaXN0KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfTtcclxufVxyXG4vLyDlj5bmtojlhbPms6jpobnnm65cclxuZXhwb3J0IGZ1bmN0aW9uIGNhbmNlbEF0dGVudGlvbldpdGNoUHJvamVjdChvYmplY3RJZCwgZm4pIHtcclxuICBjb25zdCBkYXRhID0geyBydHlwZTogXCJiXCIsIG9iamVjdElkOiBvYmplY3RJZCB9O1xyXG4gIHJldHVybiBkaXNwYXRjaCA9PiB7XHJcbiAgICBIdHRwQ2xpZW50LkFqYXhQb3N0KFwiL2NvbGxlY3QvY2FsbENvbGxlY3RcIiwgZGF0YSwgbGlzdCA9PiB7XHJcbiAgICAgIGlmIChmbikge1xyXG4gICAgICAgIGZuKGxpc3QpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9O1xyXG59XHJcbi8v6I635Y+W5Y2P5L2c5Lu75Yqh5pWw5o2uXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRSZUxldmFuY2VUYXNrTGlzdEJ5SWQoaWQsIGZuKSB7XHJcbiAgcmV0dXJuIGRpc3BhdGNoID0+IHtcclxuICAgIEh0dHBDbGllbnQuQWpheFBvc3QoXHJcbiAgICAgIFwiL3Rhc2tpbmZvL2ZpbmRyZUxldmFuY2VUYXNraW5mbz9pZD1cIiArIGlkLFxyXG4gICAgICBcIlwiLFxyXG4gICAgICBsaXN0ID0+IHtcclxuICAgICAgICBpZiAoZm4pIHtcclxuICAgICAgICAgIGZuKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRpc3BhdGNoKGNvbnRlbnQobGlzdCwgVEFTS19SRUxFVkFOQ0VfTElTVF9CWV9JRCkpO1xyXG4gICAgICB9XHJcbiAgICApO1xyXG4gIH07XHJcbn1cclxuXHJcbi8v6I635Y+W5paH5Lu75Yqh5omA5pyJ5paH5Lu2XHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRUYXNrRmlsZXNMaXN0QnlJZChpZCwgZm4pIHtcclxuICByZXR1cm4gZGlzcGF0Y2ggPT4ge1xyXG4gICAgSHR0cENsaWVudC5BamF4UG9zdChcIi90YXNraW5mby9maW5kVGFza2luZm9GaWxlcz90SWQ9XCIgKyBpZCwgXCJcIiwgbGlzdCA9PiB7XHJcbiAgICAgIGlmIChmbikge1xyXG4gICAgICAgIGZuKCk7XHJcbiAgICAgIH1cclxuICAgICAgZGlzcGF0Y2goY29udGVudChsaXN0LCBUQVNLX0ZJTEVTX0xJU1RfQllfSUQpKTtcclxuICAgIH0pO1xyXG4gIH07XHJcbn1cclxuXHJcbi8v5L+u5pS55Lu75YqhIOe7n+S4gOS/neWtmOS/ruaUueeahOS/oeaBr1xyXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlVGFza2luZm8odGFza2luZm8sIGZuKSB7XHJcbiAgcmV0dXJuIGRpc3BhdGNoID0+IHtcclxuICAgIEh0dHBDbGllbnQuQWpheFBvc3QoXCIvdGFza2luZm8vdXBkYXRlTW9yZUluZGV4XCIsIHRhc2tpbmZvLCBsaXN0ID0+IHtcclxuICAgICAgaWYgKGZuKSB7XHJcbiAgICAgICAgZm4obGlzdCk7XHJcbiAgICAgIH1cclxuICAgICAgZGlzcGF0Y2goY29udGVudChsaXN0LCBUQVNLX1RBU0tJTkZPX1VQREFURSkpO1xyXG4gICAgfSk7XHJcbiAgfTtcclxufVxyXG5cclxuLy8g5LiK5Lyg5paH5Lu2XHJcbi8qXHJcbiAqIHR5cGU6IDDmj4/ov7DpmYTku7YgMeivhOiuuuaWh+S7tiAz5oiQ5p6c5paH5Lu2XHJcbiAqICovXHJcbmV4cG9ydCBmdW5jdGlvbiB1cEZpbGVzQnlUeXBlKHRhc2tJZCwgdHlwZSwgZmlsZU9iaiwgZm4pIHtcclxuICByZXR1cm4gZGlzcGF0Y2ggPT4ge1xyXG4gICAgSHR0cENsaWVudC5BamF4UG9zdChcclxuICAgICAgXCIvZmlsZXMvdXBsb2FkaW5nTW9iaWxlSW1nP3Byb2plY3RJZD1cIiArIHRhc2tJZCArIFwiJnR5cGU9XCIgKyB0eXBlLFxyXG4gICAgICBmaWxlT2JqLFxyXG4gICAgICBsaXN0ID0+IHtcclxuICAgICAgICBpZiAoZm4pIHtcclxuICAgICAgICAgIGZuKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRpc3BhdGNoKGNvbnRlbnQobGlzdCwgVEFTS0lORk9fVVBMT0FESU5HKSk7XHJcbiAgICAgIH1cclxuICAgICk7XHJcbiAgfTtcclxufVxyXG5cclxuLy8g5Yig6Zmk5paH5Lu2XHJcbmV4cG9ydCBmdW5jdGlvbiBkZWxldGVGaWxlQnlUeXBlKGlkLCBmbikge1xyXG4gIHJldHVybiBkaXNwYXRjaCA9PiB7XHJcbiAgICBIdHRwQ2xpZW50LkFqYXhQb3N0KFwiL2ZpbGVzL2RlbGV0ZUZpbGU/aWQ9XCIgKyBpZCwgW10sIGxpc3QgPT4ge1xyXG4gICAgICBpZiAoZm4pIHtcclxuICAgICAgICBmbigpO1xyXG4gICAgICB9XHJcbiAgICAgIGRpc3BhdGNoKGNvbnRlbnQobGlzdCwgVEFTS19GSUxFU19ERUxFVEUpKTtcclxuICAgIH0pO1xyXG4gIH07XHJcbn1cclxuXHJcbi8vIOa3u+WKoOivhOiuuiAg56e75Yqo54mI54q25oCBIGNhdGVnb3J5IOaYryAxXHJcbmV4cG9ydCBmdW5jdGlvbiBhZGRUYWxrQnlUYXNrSWQoaWQsIGRlc2NyaXB0aW9uLCBmaWxlcywgcmVwbHlVc2VySWQsIGZuKSB7XHJcbiAgcmV0dXJuIGRpc3BhdGNoID0+IHtcclxuICAgIEh0dHBDbGllbnQuQWpheFBvc3QoXHJcbiAgICAgIFwiL2xlYXZlL2FkZExlYXZlXCIsXHJcbiAgICAgIHtcclxuICAgICAgICBkZXNjcmlwdGlvbjogZGVzY3JpcHRpb24sXHJcbiAgICAgICAgdGFza2luZm86IHsgaWQ6IGlkIH0sXHJcbiAgICAgICAgcmVwbHk6IHsgaWQ6IHJlcGx5VXNlcklkIH0sXHJcbiAgICAgICAgZmlsZXNNb2JpbGU6IGZpbGVzLFxyXG4gICAgICAgIGNhdGVnb3J5OiBcIjFcIlxyXG4gICAgICB9LFxyXG4gICAgICBsaXN0ID0+IHtcclxuICAgICAgICBpZiAoZm4pIHtcclxuICAgICAgICAgIGZuKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRpc3BhdGNoKGNvbnRlbnQobGlzdCwgVEFTS19BRERfVEFMSykpO1xyXG4gICAgICB9XHJcbiAgICApO1xyXG4gIH07XHJcbn1cclxuXHJcbi8vIOWIoOmZpOivhOiuulxyXG5leHBvcnQgZnVuY3Rpb24gZGVsZXRlVGFsa0J5SWQoaWQsIGZuKSB7XHJcbiAgcmV0dXJuIGRpc3BhdGNoID0+IHtcclxuICAgIEh0dHBDbGllbnQuQWpheFBvc3QoXCIvbGVhdmUvZGVsZXRlTGVhdmU/aWQ9XCIgKyBpZCwgXCJcIiwgbGlzdCA9PiB7XHJcbiAgICAgIGlmIChmbikge1xyXG4gICAgICAgIGZuKCk7XHJcbiAgICAgIH1cclxuICAgICAgZGlzcGF0Y2goY29udGVudChsaXN0LCBUQVNLX0RFTEVURV9UQUxLKSk7XHJcbiAgICB9KTtcclxuICB9O1xyXG59XHJcblxyXG4vLyDliJvlu7rku7vliqFcclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVRhc2socHJvSWQsIHBhcklkLCB0YXNraW5mbywgZm4pIHtcclxuICByZXR1cm4gZGlzcGF0Y2ggPT4ge1xyXG4gICAgSHR0cENsaWVudC5BamF4UG9zdChcclxuICAgICAgXCIvdGFza2luZm8vYWRkVGFza2luZm8/cHJvZ2VjdElkPVwiICsgcHJvSWQgKyBcIiZwaWQ9XCIgKyBwYXJJZCxcclxuICAgICAgdGFza2luZm8sXHJcbiAgICAgIGxpc3QgPT4ge1xyXG4gICAgICAgIGlmIChmbikge1xyXG4gICAgICAgICAgZm4obGlzdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRpc3BhdGNoKGNvbnRlbnQobGlzdCwgVEFTS19DUkVBVEUpKTtcclxuICAgICAgfVxyXG4gICAgKTtcclxuICB9O1xyXG59XHJcblxyXG4vLyDojrflj5bku7vliqHnmoTkvJjlhYjnuqcg5YiX6KGoXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRQcmlvcml0eUxpc3QoZm4pIHtcclxuICByZXR1cm4gZGlzcGF0Y2ggPT4ge1xyXG4gICAgSHR0cENsaWVudC5BamF4UG9zdChcIi90YXNraW5mby9maW5kQ29tbW9uRGF0YVwiLCBcIlwiLCBsaXN0ID0+IHtcclxuICAgICAgaWYgKGZuKSB7XHJcbiAgICAgICAgZm4oKTtcclxuICAgICAgfVxyXG4gICAgICBkaXNwYXRjaChjb250ZW50KGxpc3QsIFRBU0tfUFJJT1JJVFlfTElTVCkpO1xyXG4gICAgfSk7XHJcbiAgfTtcclxufVxyXG5cclxuLy8g6I635Y+W6aG555uu55qE5Lu75Yqh5YiX6KGoXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRUYXNrTGlzdEJ5UHJvKHByb0lELCB0YXNrSUQsIHBhZ2VObyA9IDEsIHBhZ2VTaXplID0gNTAsIGZuKSB7XHJcbiAgcmV0dXJuIGRpc3BhdGNoID0+IHtcclxuICAgIEh0dHBDbGllbnQuQWpheFBvc3RTeW5jKFxyXG4gICAgICBcIi90YXNraW5mby9maW5kVHJlZVBhZ2VMaXN0P3Byb2dlY3RJZD1cIiArXHJcbiAgICAgICAgcHJvSUQgK1xyXG4gICAgICAgIFwiJnBJZD1cIiArXHJcbiAgICAgICAgdGFza0lEICtcclxuICAgICAgICBcIiZwYWdlTm89XCIgK1xyXG4gICAgICAgIHBhZ2VObyArXHJcbiAgICAgICAgXCImcGFnZVNpemU9XCIgK1xyXG4gICAgICAgIHBhZ2VTaXplLFxyXG4gICAgICB7fSxcclxuICAgICAgbGlzdCA9PiB7XHJcbiAgICAgICAgaWYgKGZuKSB7XHJcbiAgICAgICAgICBmbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkaXNwYXRjaChjb250ZW50KGxpc3QsIFRBU0tJTkZPX1RBU0tfQllfUFJPX0xJU1QpKTtcclxuICAgICAgfVxyXG4gICAgKTtcclxuICB9O1xyXG59XHJcblxyXG4vLyDliJvlu7rku7vliqEg5Li05pe25a2Y5YKo55So5oi35b2V5YWl55qE5YC8LOmYsuatoueUqOaIt+i/lOWbnuWIsOWIm+W7uuS7u+WKoemhtemdou+8jOaVsOaNruayoeS6hueahOaDheWGtVxyXG5leHBvcnQgZnVuY3Rpb24gc2V0Q3JlYXRlVGFza1ZhbHModGFzaykge1xyXG4gIHJldHVybiB7XHJcbiAgICB0eXBlOiBUQVNLX0NSRUFURV9WQUxTLFxyXG4gICAgcGF5bG9hZDogdGFza1xyXG4gIH07XHJcbn1cclxuXHJcbi8vIOWIoOmZpOS7u+WKoVxyXG5leHBvcnQgZnVuY3Rpb24gZGVsZXRlVGFza0J5SWQoaWQsIGZuKSB7XHJcbiAgcmV0dXJuIGRpc3BhdGNoID0+IHtcclxuICAgIEh0dHBDbGllbnQuQWpheFBvc3QoXCIvdGFza2luZm8vZGVsZXRlVGFza2luZm8/aWQ9XCIgKyBpZCwgXCJcIiwgbGlzdCA9PiB7XHJcbiAgICAgIGlmIChmbikge1xyXG4gICAgICAgIGZuKCk7XHJcbiAgICAgIH1cclxuICAgICAgZGlzcGF0Y2goY29udGVudChsaXN0LCBUQVNLX0RFTEVURSkpO1xyXG4gICAgfSk7XHJcbiAgfTtcclxufVxyXG5cclxuLy8g5pu05paw5Lu75Yqh54q25oCBXHJcbi8qIGRhdGEgID0ge2lkOicnLHByb2plY3RJZDonJyxzdGF0ZTonJyxkZXNjcmlwdGlvbjonJyxtb2JpbGVGaWxlOltdfVxyXG4gKiDnoa7orqTpqbPlm54w77yM56Gu6K6k6YCa6L+HMe+8jOagh+iusOWujOaIkDHvvIzorqTpooYw77yM57uI5q2iNO+8jOmHjeWQrzBcclxuICogKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZVRhc2tTdGF0ZUJ5SWQoZGF0YSwgZm4pIHtcclxuICByZXR1cm4gZGlzcGF0Y2ggPT4ge1xyXG4gICAgSHR0cENsaWVudC5BamF4UG9zdChcIi90YXNraW5mby91cGRhdGVTdGF0ZUluZGV4XCIsIGRhdGEsIGxpc3QgPT4ge1xyXG4gICAgICBpZiAoZm4pIHtcclxuICAgICAgICBmbigpO1xyXG4gICAgICB9XHJcbiAgICAgIGRpc3BhdGNoKGNvbnRlbnQobGlzdCwgVEFTS19VUERBVEVfU1RBVEUpKTtcclxuICAgIH0pO1xyXG4gIH07XHJcbn1cclxuLy8g5pu05paw5Lu75Yqh54q25oCB5LiN5a2Y5YKo5YiwcmVkdWNlXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlVGFza1N0YXRlQnlJZDIoZGF0YSwgZm4pIHtcclxuICBIdHRwQ2xpZW50LkFqYXhQb3N0KFwiL3Rhc2tpbmZvL3VwZGF0ZVN0YXRlSW5kZXhcIiwgZGF0YSwgbGlzdCA9PiB7XHJcbiAgICBpZiAoZm4pIHtcclxuICAgICAgZm4obGlzdCk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn1cclxuLy8g6K6+572u5re75Yqg5a2Q5Lu75Yqh55qE6Z2i5YyF5bGRXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRUYXNrQ3JlYXRlQnJlYWQoZGF0YSkge1xyXG4gIHJldHVybiB7XHJcbiAgICB0eXBlOiBUQVNLX0NSRUFURV9CUkVBRCxcclxuICAgIHBheWxvYWQ6IGRhdGFcclxuICB9O1xyXG59XHJcbi8v5Yid5aeL5YyW5Lu75Yqh5pWw5o2uXHJcbmV4cG9ydCBmdW5jdGlvbiBwcm9qZWN0Q291bnQobGlzdCkge1xyXG4gIHJldHVybiB7XHJcbiAgICB0eXBlOiBQUk9KRUNUX0NPVU5ULFxyXG4gICAgcGF5bG9hZDogbGlzdFxyXG4gIH07XHJcbn1cclxuLy/ojrflj5bpobnnm67nu5/orqHmlbDmja5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFByb2plY3RDb3VudChpZCwgZm4pIHtcclxuICByZXR1cm4gZGlzcGF0Y2ggPT4ge1xyXG4gICAgSHR0cENsaWVudC5BamF4UG9zdChcIi9jYWxjdWxhdGUvcHJvamVjdD9pZD1cIiArIGlkLCBcIlwiLCBsaXN0ID0+IHtcclxuICAgICAgaWYgKGZuKSB7XHJcbiAgICAgICAgZm4oKTtcclxuICAgICAgfVxyXG4gICAgICBkaXNwYXRjaChjb250ZW50KGxpc3QsIENBTENVTEFURV9QUk9KRUNUKSk7XHJcbiAgICB9KTtcclxuICB9O1xyXG59XHJcbi8v6I635Y+W5YiX6KGo57uf6K6h5pWw5o2uXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRUYXNrdGFibGVEYXRhKGRhdGEsIGZuKSB7XHJcbiAgcmV0dXJuIGRpc3BhdGNoID0+IHtcclxuICAgIEh0dHBDbGllbnQuQWpheFBvc3QoXCIvY2FsY3VsYXRlL2dldFRhc2t0YWJsZURhdGFcIiwgZGF0YSwgbGlzdCA9PiB7XHJcbiAgICAgIGlmIChmbikge1xyXG4gICAgICAgIGZuKCk7XHJcbiAgICAgIH1cclxuICAgICAgZGlzcGF0Y2goY29udGVudChsaXN0LCBDQUxDVUxBVEVfVEFTS19UQUJMRSkpO1xyXG4gICAgfSk7XHJcbiAgfTtcclxufVxyXG5cclxuLy/liLfmlrDlm6LpmJ9cclxuZXhwb3J0IGZ1bmN0aW9uIHJlZnJlc2hUaW1lKHNpZ24gPSBmYWxzZSkge1xyXG4gIHJldHVybiB7XHJcbiAgICB0eXBlOiBSRUZSRVNIX1RJTUUsXHJcbiAgICBwYXlsb2FkOiBzaWduXHJcbiAgfTtcclxufVxyXG4vL+iOt+WPluS7u+WKoeaWh+S7tlxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0VGFza0ZpbGVCeVBybyhwcm9qZWN0SWQsIHBhcmVudElkLCBwYWdlU2l6ZSwgcGFnZU5vLCBmbikge1xyXG4gIHJldHVybiBkaXNwYXRjaCA9PiB7XHJcbiAgICBIdHRwQ2xpZW50LkFqYXhQb3N0KFxyXG4gICAgICBcIi9maWxlcy9maWxlSWRleExpc3Q/cHJvamVjdElkPVwiICtcclxuICAgICAgICBwcm9qZWN0SWQgK1xyXG4gICAgICAgIFwiJnBhcmVudElkPVwiICtcclxuICAgICAgICBwYXJlbnRJZCArXHJcbiAgICAgICAgXCImcGFnZVNpemU9XCIgK1xyXG4gICAgICAgIHBhZ2VTaXplICtcclxuICAgICAgICBcIiZwYWdlTm89XCIgK1xyXG4gICAgICAgIHBhZ2VObyxcclxuICAgICAgW10sXHJcbiAgICAgIGxpc3QgPT4ge1xyXG4gICAgICAgIGlmIChmbikgZm4oKTtcclxuICAgICAgICBkaXNwYXRjaChjb250ZW50KGxpc3QsIEZJTEVTX0xJU1QpKTtcclxuICAgICAgfVxyXG4gICAgKTtcclxuICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0VGFza0xpc3RCeUNvbmRpdGlvbihwYWdlTm8sIHBhZ2VTaXplLCBkYXRhLCBjYWxsYmFjaykge1xyXG4gIEh0dHBDbGllbnQuQWpheFBvc3QoXHJcbiAgICBcIi90YXNrSG9tZS90YXNrSW5pTmV3P3BhZ2VObz1cIiArIHBhZ2VObyArIFwiJnBhZ2VTaXplPVwiICsgcGFnZVNpemUsXHJcbiAgICBkYXRhLFxyXG4gICAgbGlzdCA9PiB7XHJcbiAgICAgIGNhbGxiYWNrKGxpc3QpO1xyXG4gICAgfVxyXG4gICk7XHJcbn1cclxuXHJcbi8v6I635Y+W5Lu75Yqh5paH5Lu2IC0g5paw54mIXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRGaWxlTGlzdEJ5UHJvamVjdElkKFxyXG4gIHByb2plY3RJZCxcclxuICBwYXJlbnRJZCxcclxuICBwYWdlU2l6ZSA9IDUwLFxyXG4gIHBhZ2VObyA9IDEsXHJcbiAgZmlsZU5hbWUsXHJcbiAgY2FsbGJhY2tcclxuKSB7XHJcbiAgSHR0cENsaWVudC5BamF4UG9zdChcclxuICAgIFwiL2ZpbGVzL2ZpbGVJZGV4TGlzdE5ldz9wcm9qZWN0SWQ9XCIgK1xyXG4gICAgICBwcm9qZWN0SWQgK1xyXG4gICAgICBcIiZwYXJlbnRJZD1cIiArXHJcbiAgICAgIHBhcmVudElkICtcclxuICAgICAgXCImZmlsZU5hbWU9XCIgK1xyXG4gICAgICBmaWxlTmFtZSArXHJcbiAgICAgIFwiJnBhZ2VTaXplPVwiICtcclxuICAgICAgcGFnZVNpemUgK1xyXG4gICAgICBcIiZwYWdlTm89XCIgK1xyXG4gICAgICBwYWdlTm8sXHJcbiAgICB7fSxcclxuICAgIGxpc3QgPT4ge1xyXG4gICAgICBjYWxsYmFjayhsaXN0KTtcclxuICAgIH1cclxuICApO1xyXG59XHJcblxyXG4vL+WIl+ihqOe7n+iuoVxyXG5leHBvcnQgZnVuY3Rpb24gdGVhbVN0YXRpc3RpY3MoXHJcbiAgcGFnZVNpemUgPSAyLFxyXG4gIHBhZ2VObyA9IDEsXHJcbiAgdXNlck5hbWUsXHJcbiAgcmVhbGl0eUJlZ2luVGltZSxcclxuICByZWFsaXR5RW5kVGltZSxcclxuICBwcm9qZWN0SWRcclxuKSB7XHJcbiAgcmV0dXJuIGRpc3BhdGNoID0+IHtcclxuICAgIEh0dHBDbGllbnQuQWpheFBvc3QoXHJcbiAgICAgIFwiL2NhbGN1bGF0ZS90ZWFtU3RhdGlzdGljcz9wYWdlU2l6ZT1cIiArXHJcbiAgICAgICAgcGFnZVNpemUgK1xyXG4gICAgICAgIFwiJnBhZ2VObz1cIiArXHJcbiAgICAgICAgcGFnZU5vICtcclxuICAgICAgICBcIiZyZWFsaXR5QmVnaW5UaW1lPVwiICtcclxuICAgICAgICByZWFsaXR5QmVnaW5UaW1lICtcclxuICAgICAgICBcIiZyZWFsaXR5RW5kVGltZT1cIiArXHJcbiAgICAgICAgcmVhbGl0eUVuZFRpbWUgK1xyXG4gICAgICAgIFwiJnByb2plY3RJZD1cIiArXHJcbiAgICAgICAgcHJvamVjdElkLFxyXG4gICAgICB1c2VyTmFtZSxcclxuICAgICAgbGlzdCA9PiB7XHJcbiAgICAgICAgZGlzcGF0Y2goY29udGVudChsaXN0LCBDQUxDVUxBVEVfVEVBTSkpO1xyXG4gICAgICB9XHJcbiAgICApO1xyXG4gIH07XHJcbn1cclxuLyoqXHJcbiAqIOWIt+aWsOS7u+WKoeagkeaVsOaNrlxyXG4gKiBAcGFyYW0geyp9IHNpZ24gIOaYr+WQpuWIt+aWsFxyXG4gKiBAcGFyYW0geyp9IGlkICDliqDovb3nmoRpZFxyXG4gKiBAcGFyYW0geyp9IHR5cGUgIOWIt+aWsOexu+Wei++8jCB0eXBlIOaVtOS4quagkemDveaYr+WIt+aWsCwgYWxvbmUg5Y+q5Yi35paw5b2T5YmN5L+u5pS555qE5YWD57SgXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcmVmcmVzaFRhc2tpbmZvKHNpZ24gPSBmYWxzZSwgaWQgPSBcIlwiLCB0eXBlID0gXCJhbGxcIikge1xyXG4gIHJldHVybiB7XHJcbiAgICB0eXBlOiBUQVNLSU5GT19SRUZSRVNILFxyXG4gICAgcGF5bG9hZDogeyBzaWduOiBzaWduLCBpZDogaWQsIHR5cGU6IHR5cGUgfVxyXG4gIH07XHJcbn1cclxuLy/lgqzlip7ku7vliqFcclxuZXhwb3J0IGZ1bmN0aW9uIGV4cGVkaXRlKGRhdGEsIHRpZCwgdHlwZSwgZm4pIHtcclxuICAvKmlkOuiiq+WCrOWKnueahOS7u+WKoWlkLCB0aWQ66K+m5oOF55qE5Lu75YqhaWQsIHR5cGU6MSDlrZDku7vliqEsMjrliY3luo/ku7vliqEqL1xyXG4gIHJldHVybiBkaXNwYXRjaCA9PiB7XHJcbiAgICBIdHRwQ2xpZW50LkFqYXhQb3N0KFxyXG4gICAgICBcIi90YXNraW5mby9leHBlZGl0ZT90aWQ9XCIgKyB0aWQgKyBcIiZ0eXBlPVwiICsgdHlwZSxcclxuICAgICAgZGF0YSxcclxuICAgICAgbGlzdCA9PiB7XHJcbiAgICAgICAgaWYgKGZuKSBmbigpO1xyXG4gICAgICAgIGRpc3BhdGNoKGNvbnRlbnQobGlzdCwgVEFTS19DVUlCQU4pKTtcclxuICAgICAgfVxyXG4gICAgKTtcclxuICB9O1xyXG59XHJcblxyXG4vLyDlgqzlip7lrZDku7vliqFcclxuZXhwb3J0IGZ1bmN0aW9uIGN1aWJhbkNoaWxkVGFzayhpZCwgY2FsbGJhY2spIHtcclxuICAvLyBpZDog54i25Lu75YqhSURcclxuICBIdHRwQ2xpZW50LkFqYXhQb3N0KFwiL3Rhc2tpbmZvL2V4cGVkaXRlU29uVGFza1wiLCB7IGlkOiBpZCB9LCBsaXN0ID0+IHtcclxuICAgIGNhbGxiYWNrKGxpc3QpO1xyXG4gIH0pO1xyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FjdGlvbnMvdGFzay5qcyIsImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0J1xyXG5pbXBvcnQgeyBJY29uIH0gZnJvbSAnYW50ZC1tb2JpbGUnXHJcbmltcG9ydCBSb3V0ZXIgZnJvbSAnbmV4dC9yb3V0ZXInXHJcbmltcG9ydCBEaW5ndGFsayBmcm9tICcuLi91dGlscy9kaW5ndGFsaydcclxuXHJcbmltcG9ydCBzdHlsZXNoZWV0IGZyb20gJ3N0eWxlcy9jb21wb25lbnRzL2FsZXJ0LnNjc3MnXHJcblxyXG4vKlxyXG4gKiDvvIjlv4XloavvvIl0aXRsZTonJyAgICAgICAgICAgICAvLyDmj5DnpLrmoIfpophcclxuICog77yI5b+F5aGr77yJbXNnOicnICAgICAgICAgICAgICAgLy8g5o+Q56S65YaF5a65XHJcbiAqIO+8iOmAieWhq++8iW9rQnV0VHh0ICAgICAgICAgICAgIC8vIOehruWumuaMiemSruWQjeensFxyXG4gKiDvvIjpgInloavvvIlidXRJc09uZTpmYWxzZSAgICAgICAvLyDmmK/lkKbmmK/kuIDkuKrmjInpkq5cclxuICog77yI5b+F5aGr77yJb2tDYWxsQmFjaygpICAgICAgICAgLy8g56Gu5a6a5Zue6LCDXHJcbiAqIO+8iOmAieWhq++8iWNhbEJ1dFR4dDonJyAgICAgICAgIC8vIOWPlua2iOaMiemSruWQjeensFxyXG4gKiDvvIjlv4XloavvvIljYWxDYWxsQmFjaygpICAgICAgICAvLyDlj5bmtojlm57osINcclxuICog77yI6YCJ5aGr77yJY2xvc2VJY29uU2hvdzpmYWxzZSAgLy8g5piv5ZCm6ZyA6KaB5YWz6Zet5Zu+5qCHXHJcbiAqIO+8iOmAieWhq++8iWNsb3NlSWNvbkNsaWNrQ2FsbEJhY2soKSAvLyDlhbPpl63lm77moIfngrnlh7vlm57osINcclxuICovXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBbGVydCBleHRlbmRzIENvbXBvbmVudCB7XHJcblx0Y29uc3RydWN0b3IocHJvcHMpIHtcclxuXHRcdHN1cGVyKHByb3BzKVxyXG5cdFx0dGhpcy5zdGF0ZSA9IHtcclxuXHRcdH07XHJcblx0fVxyXG5cdFxyXG5cdGNvbXBvbmVudFdpbGxNb3VudCgpIHtcclxuXHR9XHJcblx0XHJcblx0Y29tcG9uZW50VW5Nb3VudCgpe1xyXG5cdH1cclxuXHJcblx0Y29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcclxuXHR9XHJcblx0XHJcblx0cmVuZGVyKCkge1xyXG5cdFx0Y29uc3Qge3RpdGxlLG1zZyxva0J1dFR4dCxjYWxCdXRUeHQsYnV0SXNPbmV9ID0gdGhpcy5wcm9wcztcclxuXHRcdGxldCB7IGNsb3NlSWNvblNob3cgfSA9IHRoaXMucHJvcHM7XHJcblx0XHRpZighY2xvc2VJY29uU2hvdyl7XHJcblx0XHRcdGNsb3NlSWNvblNob3cgPSBmYWxzZTtcclxuXHRcdH1cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiYWxlcnRcIj5cclxuXHRcdFx0XHQ8c3R5bGUgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e3sgX19odG1sOiBzdHlsZXNoZWV0IH19IC8+XHRcdFx0XHRcclxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImFsZXJ0Qm94XCI+XHJcblx0XHRcdFx0XHR7Y2xvc2VJY29uU2hvdz88SWNvbiBjbGFzc05hbWU9XCJjb2xzZVwiIHR5cGU9XCJjcm9zc1wiIG9uQ2xpY2s9eygpPT57dGhpcy5wcm9wcy5jbG9zZUljb25DbGlja0NhbGxCYWNrKCl9fSAvPjonJ31cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSd0b3BOYW1lJz48c3BhbiBjbGFzc05hbWU9J3RpdGxlJz57dGl0bGV9PC9zcGFuPjxzcGFuIHN0eWxlPXt7dGV4dERlY29yYXRpb246ICd1bmRlcmxpbmUnfX0gb25DbGljaz17KCkgPT57Um91dGVyLnB1c2goRGluZ3RhbGsuc2V0RGROYXZDb2xvcignL21vX3ZlcnNpb24nKSl9fT7niYjmnKzku4vnu408L3NwYW4+PC9kaXY+XHJcblx0XHRcdFx0XHQ8cCBkYW5nZXJvdXNseVNldElubmVySFRNTD17e19faHRtbDptc2d9fT48L3A+XHJcblx0XHRcdFx0XHR7YnV0SXNPbmU/XHJcblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiYnV0T25lXCIgb25DbGljaz17KCk9Pnt0aGlzLnByb3BzLm9rQ2FsbEJhY2soKX19Pntva0J1dFR4dD9va0J1dFR4dDon56Gu5a6aJ308L2Rpdj5cclxuXHRcdFx0XHRcdDpcclxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJidXRUd29cIj5cclxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImJ1dDFcIiBvbkNsaWNrPXsoKT0+e3RoaXMucHJvcHMuY2FsQ2FsbEJhY2soKX19PntjYWxCdXRUeHQ/Y2FsQnV0VHh0Oiflj5bmtognfTwvZGl2PlxyXG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiYnV0MlwiIG9uQ2xpY2s9eygpPT57dGhpcy5wcm9wcy5va0NhbGxCYWNrKCl9fT57b2tCdXRUeHQ/b2tCdXRUeHQ6J+ehruWumid9PC9kaXY+XHJcblx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdClcclxuXHR9XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb21wb25lbnRzL2FsZXJ0LmpzIiwiaW1wb3J0IHsgY3JlYXRlU3RvcmUsIGFwcGx5TWlkZGxld2FyZSB9IGZyb20gJ3JlZHV4J1xuaW1wb3J0IHsgY29tcG9zZVdpdGhEZXZUb29scyB9IGZyb20gJ3JlZHV4LWRldnRvb2xzLWV4dGVuc2lvbidcbmltcG9ydCB0aHVua01pZGRsZXdhcmUgZnJvbSAncmVkdXgtdGh1bmsnXG5pbXBvcnQgcmVkdWNlciBmcm9tICcuL3JlZHVjZXJzJztcblxuZXhwb3J0IGNvbnN0IGluaXRTdG9yZSA9IChpbml0aWFsU3RhdGUpID0+IHtcbiAgcmV0dXJuIGNyZWF0ZVN0b3JlKHJlZHVjZXIsIGluaXRpYWxTdGF0ZSwgY29tcG9zZVdpdGhEZXZUb29scyhhcHBseU1pZGRsZXdhcmUodGh1bmtNaWRkbGV3YXJlKSkpXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zdG9yZS5qcyIsImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgYmluZEFjdGlvbkNyZWF0b3JzIH0gZnJvbSBcInJlZHV4XCI7XG5pbXBvcnQgd2l0aFJlZHV4IGZyb20gXCJuZXh0LXJlZHV4LXdyYXBwZXJcIjtcbmltcG9ydCBMaW5rIGZyb20gXCJuZXh0L2xpbmtcIjtcbmltcG9ydCBSb3V0ZXIgZnJvbSBcIm5leHQvcm91dGVyXCI7XG5pbXBvcnQgeyBJY29uLCBUb2FzdCB9IGZyb20gXCJhbnRkLW1vYmlsZVwiO1xuXG5pbXBvcnQgaWNvblN0eWxlIGZyb20gXCJhbnRkLW1vYmlsZS9saWIvaWNvbi9zdHlsZS9pbmRleC5jc3NcIjtcbmltcG9ydCB0b2FzdFN0eWxlIGZyb20gXCJhbnRkLW1vYmlsZS9saWIvdG9hc3Qvc3R5bGUvaW5kZXguY3NzXCI7XG5cbmltcG9ydCB7IGluaXRTdG9yZSB9IGZyb20gXCIuLi9zdG9yZVwiO1xuaW1wb3J0IHN0eWxlc2hlZXQgZnJvbSBcInN0eWxlcy9wYWdlcy9kaW5nSG9tZS5zY3NzXCI7XG5pbXBvcnQgTGF5b3V0IGZyb20gXCIuLi9jb21wb25lbnRzL0xheW91dFwiO1xuaW1wb3J0IEFsZXJ0IGZyb20gXCIuLi9jb21wb25lbnRzL2FsZXJ0XCI7XG5pbXBvcnQgTG9hZGluZyBmcm9tIFwiLi4vY29tcG9uZW50cy9Mb2FkaW5nXCI7XG5pbXBvcnQgTWVudUJhciBmcm9tIFwiLi4vY29tcG9uZW50cy9NZW51QmFyXCI7XG5pbXBvcnQgKiBhcyB0YXNrQWN0aW9uIGZyb20gXCIuLi9hY3Rpb25zL3Rhc2tcIjtcbmltcG9ydCAqIGFzIHVzZXJBY3Rpb24gZnJvbSBcIi4uL2FjdGlvbnMvdXNlclwiO1xuaW1wb3J0IERpbmd0YWxrIGZyb20gXCIuLi91dGlscy9kaW5ndGFsa1wiO1xuaW1wb3J0IHV0aWxzIGZyb20gXCIuLi91dGlscy91dGlsc1wiO1xuaW1wb3J0IFN0b3JhZ2UgZnJvbSBcIi4uL3V0aWxzL3N0b3JhZ2VcIjtcbmltcG9ydCAqIGFzIGNhY2hlQWN0aW9uIGZyb20gXCIuLi9hY3Rpb25zL2NhY2hlXCI7XG5pbXBvcnQgeyBnZXRUYXNrRGV0YWlsc0J5SWRzIH0gZnJvbSBcIi4uL2FjdGlvbnMvdGFza1wiO1xuXG4vKipcbiAqIOmmlumhtVxuICovXG5cbmNsYXNzIGRpbmdIb21lIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgc3RhdGljIGdldEluaXRpYWxQcm9wcyh7IHJlcSwgc3RvcmUsIGlzU2VydmVyIH0pIHtcbiAgICBjb25zdCBsYW5ndWFnZSA9IHJlcSA/IHJlcS5oZWFkZXJzW1wiYWNjZXB0LWxhbmd1YWdlXCJdIDogbmF2aWdhdG9yLmxhbmd1YWdlO1xuICAgIHJldHVybiB7XG4gICAgICBsYW5ndWFnZVxuICAgIH07XG4gIH1cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIG9uZTogMCxcbiAgICAgIHR3bzogMCxcbiAgICAgIHRocmVlOiAwLFxuICAgICAgYWxsOiAwLFxuICAgICAgb2JqVGFsa2xpc3Q6IFtdLFxuICAgICAgaG9tZURhdGFMb2FkaW5nOiBmYWxzZSxcblxuICAgICAgbWVzc2FnZU1vcmVMb2FkaW5nOiBmYWxzZSxcbiAgICAgIG1lc3NhZ2VMb2FkaW5nOiBmYWxzZSxcbiAgICAgIG1zZ05vd1BhZ2U6IDEsXG4gICAgICBtc2dMYXN0UGFnZTogMCxcbiAgICAgIG1lc3NhZ2VDb3VudDogMCxcbiAgICAgIG1lc3NhZ2VMaXN0OiBbXSxcblxuICAgICAgZW5kMTVEYXlzU2hvdzogZmFsc2UsXG4gICAgICB1c2VyOiB7fVxuICAgIH07XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICBEaW5ndGFsay5zZXRUaXRsZShcIummlumhtVwiKTtcbiAgICBEaW5ndGFsay5zZXRNZW51SG9tZSgpO1xuICAgIGlmICghdGhpcy5wcm9wcy51cmxEYXRhKSB7XG4gICAgICB0aGlzLnByb3BzLnNldFVybERhdGEoZW5jb2RlVVJJQ29tcG9uZW50KGxvY2F0aW9uLmhyZWYuc3BsaXQoXCIjXCIpWzBdKSk7XG4gICAgfVxuICAgIGNvbnN0IHVzZXIgPSBTdG9yYWdlLmdldFNlc3Npb24oXCJ1c2VyXCIpO1xuICAgIHRoaXMuc2V0U3RhdGUoeyB1c2VyOiB1c2VyIH0pO1xuICAgIGNvbnN0IGVuZDE1RGF5c1Nob3dEYXRlID0gU3RvcmFnZS5nZXRMb2NhbChcImVuZDE1RGF5c1Nob3dEYXRlXCIpO1xuICAgIGlmIChcbiAgICAgIHV0aWxzLmdldFRlYW1JbmZvV2l0aE1vbmV5KFwi5Ymp5L2Z5aSp5pWwXCIsIHVzZXIpIDwgMTUgJiZcbiAgICAgIHV0aWxzLmRhdGVUb1N0cmluZyhuZXcgRGF0ZSgpKSAhPT0gZW5kMTVEYXlzU2hvd0RhdGUgJiZcbiAgICAgICh1dGlscy5nZXRUZWFtSW5mb1dpdGhNb25leShcIuWJqeS9meWkqeaVsFwiLCB1c2VyKSA+IDAgfHxcbiAgICAgICAgdXRpbHMuZ2V0VGVhbUluZm9XaXRoTW9uZXkoXCLliankvZnlpKnmlbBcIiwgdXNlcikgPT09IDApXG4gICAgKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgZW5kMTVEYXlzU2hvdzogdHJ1ZSB9KTtcbiAgICB9XG5cbiAgICBpZiAodXNlciAmJiB1c2VyLnVzZXJpZCkge1xuICAgICAgLy8g6I635Y+W6aG26YOo5pWw5o2uXG4gICAgICBpZiAodGhpcy5wcm9wcy5ob21lRGF0YS5kYXRhKSB7XG4gICAgICAgIGxldCBkYXRhID0gdGhpcy5wcm9wcy5ob21lRGF0YS5kYXRhO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICBvbmU6IGRhdGEuZGIuZHdjLFxuICAgICAgICAgIHR3bzogZGF0YS5kYi5kcXIsXG4gICAgICAgICAgdGhyZWU6IGRhdGEuZGIuZHpwLFxuICAgICAgICAgIG9ialRhbGtsaXN0OiBkYXRhLmR0XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5wcm9wcy5maW5kSG9tZURhdGFCeVBhZ2VTaXplKDYsICgpID0+IHtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGhvbWVEYXRhTG9hZGluZzogdHJ1ZVxuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGlmICghdGhpcy5wcm9wcy51cmxEYXRhKSB7XG4gICAgICAgIHRoaXMucHJvcHMuc2V0VXJsRGF0YShlbmNvZGVVUklDb21wb25lbnQobG9jYXRpb24uaHJlZi5zcGxpdChcIiNcIilbMF0pKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRoaXMucHJvcHMubWVzc2FnZUxpc3RCeVVzZXIuZGF0YSkge1xuICAgICAgbGV0IHsgbXNnTGFzdFBhZ2UsIG1zZ05vd1BhZ2UsIG1lc3NhZ2VDb3VudCB9ID0gdGhpcy5zdGF0ZTtcbiAgICAgIG1zZ0xhc3RQYWdlID0gdGhpcy5wcm9wcy5tZXNzYWdlTGlzdEJ5VXNlci5kYXRhLmxhc3Q7XG4gICAgICBtc2dOb3dQYWdlID0gdGhpcy5wcm9wcy5tZXNzYWdlTGlzdEJ5VXNlci5kYXRhLnBhZ2U7XG4gICAgICBtZXNzYWdlQ291bnQgPSB0aGlzLnByb3BzLm1lc3NhZ2VMaXN0QnlVc2VyLmRhdGEubWVzc2FnZUNvdW50O1xuICAgICAgdGhpcy5zZXRTdGF0ZShcbiAgICAgICAge1xuICAgICAgICAgIG1lc3NhZ2VDb3VudDogbWVzc2FnZUNvdW50LFxuICAgICAgICAgIG1zZ0xhc3RQYWdlOiBtc2dMYXN0UGFnZSxcbiAgICAgICAgICBtc2dOb3dQYWdlOiBtc2dOb3dQYWdlLFxuICAgICAgICAgIG1lc3NhZ2VMaXN0OiB0aGlzLnByb3BzLm1lc3NhZ2VMaXN0QnlVc2VyLmRhdGEubGlzdFxuICAgICAgICB9LFxuICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgLy8gICBjb25zb2xlLmxvZyh0aGlzLnByb3BzLmhvbWVTY3JvbGxUb3AsIFwidGhpcy5wcm9wcy5ob21lU2Nyb2xsVG9wXCIpO1xuXG4gICAgICAgICAgaWYgKHRoaXMucHJvcHMuaG9tZVNjcm9sbFRvcCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMucmVmcy50YWxrYm94LnNjcm9sbFRvcCA9IHRoaXMucHJvcHMuaG9tZVNjcm9sbFRvcDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZ2V0TWVzc2FnZUxpc3QodGhpcy5zdGF0ZS5tc2dOb3dQYWdlKTtcbiAgICB9XG5cbiAgICB1dGlscy5idXRBbmltYXRlKCk7XG4gICAgLy8gICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIC8vICAgICAgIHRoaXMucmVmcy50YWxrYm94LnNjcm9sbFRvcCA9IDIwMDtcbiAgICAvLyAgICAgfSwgMzAwKTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIC8vIOWFs+mXremhtemdolxuICAgIERpbmd0YWxrLmNsb3NlUGFnZSgpO1xuICB9XG5cbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICBpZiAobmV4dFByb3BzLm1lc3NhZ2VMaXN0QnlVc2VyLmRhdGEpIHtcbiAgICAgIGNvbnN0IG1zZ05vd1BhZ2UxID0gbmV4dFByb3BzLm1lc3NhZ2VMaXN0QnlVc2VyLmRhdGEucGFnZTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBtZXNzYWdlTGlzdDogbmV4dFByb3BzLm1lc3NhZ2VMaXN0QnlVc2VyLmRhdGEubGlzdCxcbiAgICAgICAgbXNnTm93UGFnZTogbXNnTm93UGFnZTFcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnN0YXRlLmhvbWVEYXRhTG9hZGluZyAmJiBuZXh0UHJvcHMuaG9tZURhdGEpIHtcbiAgICAgIGlmIChuZXh0UHJvcHMuaG9tZURhdGEuc3VjY2Vzcykge1xuICAgICAgICBsZXQgZGF0YSA9IG5leHRQcm9wcy5ob21lRGF0YS5kYXRhO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICBvbmU6IGRhdGEuZGIuZHdjLFxuICAgICAgICAgIHR3bzogZGF0YS5kYi5kcXIsXG4gICAgICAgICAgdGhyZWU6IGRhdGEuZGIuZHpwLFxuICAgICAgICAgIG9ialRhbGtsaXN0OiBkYXRhLmR0XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgVG9hc3QuZmFpbChuZXh0UHJvcHMuaG9tZURhdGEuZXJybXNnKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBob21lRGF0YUxvYWRpbmc6IGZhbHNlIH0pO1xuICAgIH0gZWxzZSBpZiAoXG4gICAgICAodGhpcy5zdGF0ZS5tZXNzYWdlTW9yZUxvYWRpbmcgfHwgdGhpcy5zdGF0ZS5tZXNzYWdlTG9hZGluZykgJiZcbiAgICAgIG5leHRQcm9wcy5tZXNzYWdlTGlzdEJ5VXNlclxuICAgICkge1xuICAgICAgaWYgKG5leHRQcm9wcy5tZXNzYWdlTGlzdEJ5VXNlci5zdWNjZXNzKSB7XG4gICAgICAgIC8vIOabtOaWsOmhteaVsCDlkowg5oC76YeP562J5pWw5o2uXG4gICAgICAgIGlmIChuZXh0UHJvcHMubWVzc2FnZUxpc3RCeVVzZXIuZGF0YS5wYWdlID09IDEpIHtcbiAgICAgICAgICBtZXNzYWdlQ291bnQgPSBuZXh0UHJvcHMubWVzc2FnZUxpc3RCeVVzZXIuZGF0YS5tZXNzYWdlQ291bnQ7XG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBtZXNzYWdlQ291bnQ6IG1lc3NhZ2VDb3VudFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGxldCB7IG1zZ0xhc3RQYWdlLCBtc2dOb3dQYWdlLCBtZXNzYWdlQ291bnQgfSA9IHRoaXMuc3RhdGU7XG4gICAgICAgIG1zZ0xhc3RQYWdlID0gbmV4dFByb3BzLm1lc3NhZ2VMaXN0QnlVc2VyLmRhdGEubGFzdDtcbiAgICAgICAgbXNnTm93UGFnZSA9IG5leHRQcm9wcy5tZXNzYWdlTGlzdEJ5VXNlci5kYXRhLnBhZ2U7XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgbXNnTGFzdFBhZ2U6IG1zZ0xhc3RQYWdlLFxuICAgICAgICAgIG1zZ05vd1BhZ2U6IG1zZ05vd1BhZ2VcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIGlmIChtc2dOb3dQYWdlID09IDEpIHtcbiAgICAgICAgLy8gICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgLy8gICAgIG1lc3NhZ2VMaXN0OiBuZXh0UHJvcHMubWVzc2FnZUxpc3RCeVVzZXIuZGF0YS5saXN0LFxuICAgICAgICAvLyAgICAgbWVzc2FnZUNvdW50OiBtZXNzYWdlQ291bnRcbiAgICAgICAgLy8gICB9KTtcbiAgICAgICAgLy8gfSBlbHNlIHtcbiAgICAgICAgLy8gICBsZXQgZGF0YSA9IG5leHRQcm9wcy5tZXNzYWdlTGlzdEJ5VXNlci5kYXRhLmxpc3Q7XG4gICAgICAgIC8vICAgbGV0IHsgbWVzc2FnZUxpc3QgfSA9IHRoaXMuc3RhdGU7XG4gICAgICAgIC8vICAgZGF0YS5tYXAoKGl0ZW0sIGkpID0+IHtcbiAgICAgICAgLy8gICAgIG1lc3NhZ2VMaXN0LnB1c2goaXRlbSk7XG4gICAgICAgIC8vICAgfSk7XG4gICAgICAgIC8vICAgdGhpcy5zZXRTdGF0ZSh7IG1lc3NhZ2VMaXN0OiBtZXNzYWdlTGlzdCB9KTtcbiAgICAgICAgLy8gfVxuICAgICAgfSBlbHNlIHtcbiAgICAgIH1cblxuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIG1lc3NhZ2VNb3JlTG9hZGluZzogZmFsc2UsXG4gICAgICAgIG1lc3NhZ2VMb2FkaW5nOiBmYWxzZVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xuICAgIHV0aWxzLmJ1dEFuaW1hdGUoKTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIHRoaXMuc2V0U3RhdGUgPSAoc3RhdGUsIGNhbGxiYWNrKSA9PiB7XG4gICAgICByZXR1cm47XG4gICAgfTtcbiAgfVxuXG4gIGdldE1lc3NhZ2VMaXN0KHBhZ2VObykge1xuICAgIGlmIChwYWdlTm8gPT0gMSkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IG1lc3NhZ2VMb2FkaW5nOiB0cnVlIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgbWVzc2FnZU1vcmVMb2FkaW5nOiB0cnVlIH0pO1xuICAgIH1cbiAgICB0aGlzLnByb3BzLmdldE1lc3NhZ2VCeVVzZXIocGFnZU5vKTtcbiAgfVxuICB1cmxHbyh0eXBlLCBpZCwgbXNnSWQsIHJlYWQpIHtcbiAgICBnZXRUYXNrRGV0YWlsc0J5SWRzKGlkLCBsaXN0ID0+IHtcbiAgICAgIHRoaXMucHJvcHMuZ2V0RGluZ01lc3NhZ2VEZXRhaWxzKG1zZ0lkKTtcbiAgICAgIGlmIChyZWFkID09IDApIHtcbiAgICAgICAgdGhpcy5wcm9wcy5zZXRNZXNzYWdlQ291bnQobXNnSWQpO1xuICAgICAgfVxuXG4gICAgICBpZiAobGlzdC5lcnJtc2cgPT09IFwi6K+l5Lu75Yqh5bey6KKr5Yig6ZmkXCIpIHtcbiAgICAgICAgVG9hc3QuaW5mbyhsaXN0LmVycm1zZyk7XG4gICAgICAgIGNvbnN0IHsgbWVzc2FnZUNvdW50IH0gPSB0aGlzLnN0YXRlO1xuICAgICAgICBpZiAocmVhZCA9PSAwKSB7XG4gICAgICAgICAgY29uc3QgY291bnQgPSBtZXNzYWdlQ291bnQgLSAxID4gLTEgPyBtZXNzYWdlQ291bnQgLSAxIDogMDtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgbWVzc2FnZUNvdW50OiBjb3VudCB9KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHR5cGUgPT0gXCJjXCIgfHwgdHlwZSA9PSBcImZcIikge1xuICAgICAgICAgIC8vICAgY29uc29sZS5sb2coXCIvbW9fdGFza0RldGFpbHM/aWQ9XCIgKyBpZCk7XG4gICAgICAgICAgUm91dGVyLnB1c2goRGluZ3RhbGsuc2V0RGROYXZDb2xvcihcIi9tb190YXNrRGV0YWlscz9pZD1cIiArIGlkKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gICBjb25zb2xlLmxvZyhcIi9tb19wcm9qZWN0RGV0YWlscz9wcm9qZWN0SWQ9XCIgKyBpZCk7XG4gICAgICAgICAgUm91dGVyLnB1c2goXG4gICAgICAgICAgICBEaW5ndGFsay5zZXREZE5hdkNvbG9yKFwiL21vX3Byb2plY3REZXRhaWxzP3Byb2plY3RJZD1cIiArIGlkKVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGxpc3RTY3JvbGwoZSkge1xuICAgIGxldCBzY3JvbGxUb3AgPSBNYXRoLmNlaWwoTWF0aC5yb3VuZChlLnRhcmdldC5zY3JvbGxUb3ApKTtcbiAgICBsZXQgY2xpZW50SGVpZ2h0ID0gTWF0aC5jZWlsKE1hdGgucm91bmQoZS50YXJnZXQuY2xpZW50SGVpZ2h0KSk7XG4gICAgbGV0IHNjcm9sbEhlaWdodCA9IE1hdGguY2VpbChNYXRoLnJvdW5kKGUudGFyZ2V0LnNjcm9sbEhlaWdodCkpO1xuICAgIGxldCB7IG1zZ05vd1BhZ2UsIG1zZ0xhc3RQYWdlIH0gPSB0aGlzLnN0YXRlO1xuICAgIHRoaXMudGltZWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBpZiAodGhpcy50aW1lZXIpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZWVyKTtcbiAgICAgIH1cbiAgICAgIHRoaXMucHJvcHMuc2F2ZUhvbWVTY3JvbGxUb3Aoc2Nyb2xsVG9wKTtcbiAgICB9LCAxMDApO1xuICAgIGlmIChcbiAgICAgIG1zZ05vd1BhZ2UgPCBtc2dMYXN0UGFnZSAmJlxuICAgICAgKHNjcm9sbFRvcCArIGNsaWVudEhlaWdodCA9PSBzY3JvbGxIZWlnaHQgfHxcbiAgICAgICAgc2Nyb2xsVG9wICsgY2xpZW50SGVpZ2h0ID09IHNjcm9sbEhlaWdodCAtIDEgfHxcbiAgICAgICAgc2Nyb2xsVG9wICsgY2xpZW50SGVpZ2h0ID09IHNjcm9sbEhlaWdodCArIDEpXG4gICAgKSB7XG4gICAgICAvLyAgICAgICBjb25zb2xlLmxvZyhtc2dOb3dQYWdlLCBcIm1zZ05vd1BhZ2VcIik7XG5cbiAgICAgIHRoaXMuZ2V0TWVzc2FnZUxpc3QobXNnTm93UGFnZSArIDEpO1xuICAgIH1cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICBvbmUsXG4gICAgICB0d28sXG4gICAgICB0aHJlZSxcbiAgICAgIG1lc3NhZ2VMaXN0LFxuICAgICAgbWVzc2FnZUNvdW50LFxuICAgICAgbWVzc2FnZUxvYWRpbmcsXG4gICAgICBtZXNzYWdlTW9yZUxvYWRpbmcsXG4gICAgICBtc2dMYXN0UGFnZSxcbiAgICAgIG1zZ05vd1BhZ2UsXG4gICAgICB1c2VyLFxuICAgICAgZW5kMTVEYXlzU2hvd1xuICAgIH0gPSB0aGlzLnN0YXRlO1xuXG4gICAgY29uc3QgeyBsYW5ndWFnZSB9ID0gdGhpcy5wcm9wcztcblxuICAgIHJldHVybiAoXG4gICAgICA8TGF5b3V0IGxhbmd1YWdlPXtsYW5ndWFnZX0+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHViTGF5b3V0IGRpbmdIb21lXCI+XG4gICAgICAgICAgPHN0eWxlXG4gICAgICAgICAgICBkYW5nZXJvdXNseVNldElubmVySFRNTD17e1xuICAgICAgICAgICAgICBfX2h0bWw6IHN0eWxlc2hlZXRcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8c3R5bGVcbiAgICAgICAgICAgIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXt7XG4gICAgICAgICAgICAgIF9faHRtbDogaWNvblN0eWxlXG4gICAgICAgICAgICB9fVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPHN0eWxlXG4gICAgICAgICAgICBkYW5nZXJvdXNseVNldElubmVySFRNTD17e1xuICAgICAgICAgICAgICBfX2h0bWw6IHRvYXN0U3R5bGVcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgLz5cbiAgICAgICAgICB7ZW5kMTVEYXlzU2hvdyA/IChcbiAgICAgICAgICAgIDxBbGVydFxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJlbmRWXCJcbiAgICAgICAgICAgICAgdGl0bGU9e3V0aWxzLmdldFRlYW1JbmZvV2l0aE1vbmV5KFwi54mI5pys5ZCN56ewXCIsIHVzZXIpICsgXCLljbPlsIbliLDmnJ9cIn1cbiAgICAgICAgICAgICAgbXNnPXt1dGlscy5nZXRUZWFtSW5mb1dpdGhNb25leShcIuWNs+WwhuWIsOacn+aPkOekulwiLCB1c2VyKX1cbiAgICAgICAgICAgICAgb2tCdXRUeHQ9e1wi57ut6LS55Y2H57qnXCJ9XG4gICAgICAgICAgICAgIGJ1dElzT25lPXt0cnVlfVxuICAgICAgICAgICAgICBjbG9zZUljb25TaG93PXt0cnVlfVxuICAgICAgICAgICAgICBjbG9zZUljb25DbGlja0NhbGxCYWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgICBlbmQxNURheXNTaG93OiBmYWxzZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIFN0b3JhZ2Uuc2V0TG9jYWwoXG4gICAgICAgICAgICAgICAgICBcImVuZDE1RGF5c1Nob3dEYXRlXCIsXG4gICAgICAgICAgICAgICAgICB1dGlscy5kYXRlVG9TdHJpbmcobmV3IERhdGUoKSlcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICBva0NhbGxCYWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgUm91dGVyLnB1c2goRGluZ3RhbGsuc2V0RGROYXZDb2xvcihcIi9tb192ZXJzaW9uXCIpKTtcbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKSA6IChcbiAgICAgICAgICAgIFwiXCJcbiAgICAgICAgICApfVxuICAgICAgICAgIHt1dGlscy5nZXRUZWFtSW5mb1dpdGhNb25leShcIuWJqeS9meWkqeaVsFwiLCB1c2VyKSA+PSAwICYmXG4gICAgICAgICAgdXRpbHMuZ2V0VGVhbUluZm9XaXRoTW9uZXkoXCLmmK/lkKbotoXpmZBcIiwgdXNlcilbMF0gPyAoXG4gICAgICAgICAgICA8QWxlcnRcbiAgICAgICAgICAgICAgdGl0bGU9XCLkvb/nlKjkurrmlbDotoXpmZBcIlxuICAgICAgICAgICAgICBtc2c9e3V0aWxzLmdldFRlYW1JbmZvV2l0aE1vbmV5KFwi5Lq65pWw6LaF6ZmQ5o+Q56S6XCIsIHVzZXIpfVxuICAgICAgICAgICAgICBva0J1dFR4dD17XCLnu63otLnljYfnuqdcIn1cbiAgICAgICAgICAgICAgYnV0SXNPbmU9e3RydWV9XG4gICAgICAgICAgICAgIG9rQ2FsbEJhY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICBSb3V0ZXIucHVzaChEaW5ndGFsay5zZXREZE5hdkNvbG9yKFwiL21vX3ZlcnNpb25cIikpO1xuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApIDogKFxuICAgICAgICAgICAgXCJcIlxuICAgICAgICAgICl9XG4gICAgICAgICAge3V0aWxzLmdldFRlYW1JbmZvV2l0aE1vbmV5KFwi5Ymp5L2Z5aSp5pWwXCIsIHVzZXIpIDwgMCAmJlxuICAgICAgICAgIHV0aWxzLmdldFRlYW1JbmZvV2l0aE1vbmV5KFwi54mI5pys5ZCN56ewXCIsIHVzZXIpID09PSBcIuivleeUqOeJiFwiICYmXG4gICAgICAgICAgIXV0aWxzLmdldFRlYW1JbmZvV2l0aE1vbmV5KFwi5piv5ZCm6ZKJ6ZKJ6K6i5Y2VXCIsIHVzZXIpID8gKFxuICAgICAgICAgICAgPEFsZXJ0XG4gICAgICAgICAgICAgIHRpdGxlPVwi6JqC6JqB5YiG5belXCJcbiAgICAgICAgICAgICAgbXNnPXt1dGlscy5nZXRUZWFtSW5mb1dpdGhNb25leShcIuW3suWIsOacn+aPkOekulwiLCB1c2VyKX1cbiAgICAgICAgICAgICAgb2tCdXRUeHQ9e1wi5L2/55So5YWN6LS554mIID5cIn1cbiAgICAgICAgICAgICAgY2FsQnV0VHh0PXtcIuWNh+e6p+eJiOacrFwifVxuICAgICAgICAgICAgICBidXRJc09uZT17ZmFsc2V9XG4gICAgICAgICAgICAgIG9rQ2FsbEJhY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICBSb3V0ZXIucHVzaChEaW5ndGFsay5zZXREZE5hdkNvbG9yKFwiL21vX2ZyZWVcIikpO1xuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICBjYWxDYWxsQmFjaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgIFJvdXRlci5wdXNoKERpbmd0YWxrLnNldERkTmF2Q29sb3IoXCIvbW9fdmVyc2lvblwiKSk7XG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICBcIlwiXG4gICAgICAgICAgKX1cbiAgICAgICAgICB7dXRpbHMuZ2V0VGVhbUluZm9XaXRoTW9uZXkoXCLliankvZnlpKnmlbBcIiwgdXNlcikgPCAwICYmXG4gICAgICAgICAgdXRpbHMuZ2V0VGVhbUluZm9XaXRoTW9uZXkoXCLniYjmnKzlkI3np7BcIiwgdXNlcikgPT09IFwi6K+V55So54mIXCIgJiZcbiAgICAgICAgICB1dGlscy5nZXRUZWFtSW5mb1dpdGhNb25leShcIuaYr+WQpumSiemSieiuouWNlVwiLCB1c2VyKSA/IChcbiAgICAgICAgICAgIDxBbGVydFxuICAgICAgICAgICAgICB0aXRsZT1cIuiaguiageWIhuW3pVwiXG4gICAgICAgICAgICAgIG1zZz17dXRpbHMuZ2V0VGVhbUluZm9XaXRoTW9uZXkoXCLlt7LliLDmnJ/mj5DnpLpcIiwgdXNlcil9XG4gICAgICAgICAgICAgIG9rQnV0VHh0PXtcIue7rei0ueWNh+e6p1wifVxuICAgICAgICAgICAgICBidXRJc09uZT17dHJ1ZX1cbiAgICAgICAgICAgICAgb2tDYWxsQmFjaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgIFJvdXRlci5wdXNoKERpbmd0YWxrLnNldERkTmF2Q29sb3IoXCIvbW9fdmVyc2lvblwiKSk7XG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICBcIlwiXG4gICAgICAgICAgKX1cbiAgICAgICAgICB7dXRpbHMuZ2V0VGVhbUluZm9XaXRoTW9uZXkoXCLliankvZnlpKnmlbBcIiwgdXNlcikgPCAwICYmXG4gICAgICAgICAgdXRpbHMuZ2V0VGVhbUluZm9XaXRoTW9uZXkoXCLniYjmnKzlkI3np7BcIiwgdXNlcikgIT09IFwi6K+V55So54mIXCIgPyAoXG4gICAgICAgICAgICA8QWxlcnRcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZW5kVlwiXG4gICAgICAgICAgICAgIHRpdGxlPXt1dGlscy5nZXRUZWFtSW5mb1dpdGhNb25leShcIueJiOacrOWQjeensFwiLCB1c2VyKSArIFwi5bey5Yiw5pyfXCJ9XG4gICAgICAgICAgICAgIG1zZz17dXRpbHMuZ2V0VGVhbUluZm9XaXRoTW9uZXkoXCLlt7LliLDmnJ/mj5DnpLpcIiwgdXNlcil9XG4gICAgICAgICAgICAgIG9rQnV0VHh0PXtcIue7rei0ueWNh+e6p1wifVxuICAgICAgICAgICAgICBidXRJc09uZT17dHJ1ZX1cbiAgICAgICAgICAgICAgb2tDYWxsQmFjaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgIFJvdXRlci5wdXNoKERpbmd0YWxrLnNldERkTmF2Q29sb3IoXCIvbW9fdmVyc2lvblwiKSk7XG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICBcIlwiXG4gICAgICAgICAgKX1cbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJjb250ZW50IGRpbmdIb21lLWJveFwiXG4gICAgICAgICAgICBzdHlsZT17XG4gICAgICAgICAgICAgIGVuZDE1RGF5c1Nob3dcbiAgICAgICAgICAgICAgICA/IHtcbiAgICAgICAgICAgICAgICAgICAgdG9wOiBcIjQwcHhcIlxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIDoge31cbiAgICAgICAgICAgIH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRpbmdIb21lLXRvcFwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndhaXRcIj5cbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAg5oiR55qE5b6F5YqeXG4gICAgICAgICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICAgICAg5YWxPHNwYW4+e29uZSArIHR3byArIHRocmVlfTwvc3Bhbj7poblcbiAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2FpdC1wbVwiPlxuICAgICAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgICAg5b6F5a6M5oiQXG4gICAgICAgICAgICAgICAgICA8TGlua1xuICAgICAgICAgICAgICAgICAgICBocmVmPXtEaW5ndGFsay5zZXREZE5hdkNvbG9yKFxuICAgICAgICAgICAgICAgICAgICAgIGAvbW9fdGFzaz9tZW51VHlwZT1zdWIxJnBhbmVsSWQ9MGBcbiAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwic3Bhbi1vbmVcIj57b25lfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvTGluaz5cbiAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwid2FpdC1wbS1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgIOW+heehruiupFxuICAgICAgICAgICAgICAgICAgPExpbmtcbiAgICAgICAgICAgICAgICAgICAgaHJlZj17RGluZ3RhbGsuc2V0RGROYXZDb2xvcihcbiAgICAgICAgICAgICAgICAgICAgICBgL21vX3Rhc2s/bWVudVR5cGU9bXlfc3VjY2VlZCZwYW5lbElkPTJgXG4gICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInNwYW4tdHdvXCI+e3R3b308L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L0xpbms+XG4gICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cIndhaXQtcG0tbGFzdFwiPlxuICAgICAgICAgICAgICAgICAg5b6F5oyH5rS+XG4gICAgICAgICAgICAgICAgICA8TGlua1xuICAgICAgICAgICAgICAgICAgICBocmVmPXtEaW5ndGFsay5zZXREZE5hdkNvbG9yKFxuICAgICAgICAgICAgICAgICAgICAgIGAvbW9fdGFzaz9tZW51VHlwZT1teV9hZGQmcGFuZWxJZD0zYFxuICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJzcGFuLXRocmVlXCI+e3RocmVlfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvTGluaz5cbiAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRpbmdIb21lLWJvdHRvbVwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJvdHRvbS10aXRsZVwiPlxuICAgICAgICAgICAgICAgIDxwPuaIkeeahOmAmuefpTwvcD5cbiAgICAgICAgICAgICAgICA8Zm9udD5cbiAgICAgICAgICAgICAgICAgIOacquivu1xuICAgICAgICAgICAgICAgICAgPHNwYW4+e21lc3NhZ2VDb3VudH08L3NwYW4+5p2hXG4gICAgICAgICAgICAgICAgPC9mb250PlxuICAgICAgICAgICAgICAgIDxJY29uXG4gICAgICAgICAgICAgICAgICB0eXBlPVwiYW50aWNvbi1zaHVheGluXCJcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRNZXNzYWdlTGlzdCgxKTtcbiAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0YWxrYm94XCJcbiAgICAgICAgICAgICAgICByZWY9XCJ0YWxrYm94XCJcbiAgICAgICAgICAgICAgICBvblNjcm9sbD17ZSA9PiB0aGlzLmxpc3RTY3JvbGwoZSl9XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8TG9hZGluZyBzaG93PXttZXNzYWdlTG9hZGluZ30gLz5cbiAgICAgICAgICAgICAgICB7bWVzc2FnZUxpc3QubGVuZ3RoID4gMCA/IChcbiAgICAgICAgICAgICAgICAgIG1lc3NhZ2VMaXN0Lm1hcCgoaXRlbSwgaSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgc3RyID0gaXRlbS5kZXNjcmlwdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG9iaiA9IGV2YWwoXCIoXCIgKyBzdHIgKyBcIilcIik7XG4gICAgICAgICAgICAgICAgICAgIGxldCBvYmpOYW1lID0gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBhZ2VVcmwgPSBcIlwiO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS50eXBlID09IFwiY1wiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgb2JqTmFtZSA9IG9ialtcIuS7u+WKoeWQjeensFwiXTtcbiAgICAgICAgICAgICAgICAgICAgICBwYWdlVXJsID0gXCIvbW9fdGFza0RldGFpbHNcIjtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICBvYmpOYW1lID0gb2JqW1wi6aG555uu5ZCN56ewXCJdO1xuICAgICAgICAgICAgICAgICAgICAgIHBhZ2VVcmwgPSBcIi9tb19wcm9qZWN0RGV0YWlsc1wiO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidGFsa2xpc3Qgd2hpdGUgYW5pQnV0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleT17aXRlbS5pZH1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICBjb25zb2xlLmxvZyhpdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cmxHbyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLnR5cGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS50YXNraW5mb0lkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5yZWFkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaWNvblwiPntpdGVtLmNyZWF0ZUJ5Lm5pY2tuYW1lfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0YXNrbGlzdFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17aXRlbS5yZWFkID09IFwiMFwiID8gXCJkZFwiIDogXCJkZCBodWlcIn0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGFza2xpc3QtZmlyc3QgdGV4dE1vcmVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57aXRlbS5zdWJqZWN0fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0TW9yZVwiPntvYmpOYW1lfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dE1vcmVcIj57aXRlbS51cGRhdGVEYXRlfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwcFwiPuaaguaXoOmAmuefpTwvZGl2PlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAge21lc3NhZ2VMaXN0Lmxlbmd0aCA+IDAgPyAoXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBcIj5cbiAgICAgICAgICAgICAgICAgICAgPExvYWRpbmdcbiAgICAgICAgICAgICAgICAgICAgICBzaG93PXttZXNzYWdlTW9yZUxvYWRpbmd9XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NTdHI9XCJsb2FkaW5nX21pblNpemVcIlxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICB7bXNnTGFzdFBhZ2UgPiBtc2dOb3dQYWdlID8gXCLkuIvmi4nliqDovb3mm7TlpJpcIiA6IFwi5bey57uP5Yiw5bqV5Za9XCJ9XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgXCJcIlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgY2xlYXI6IFwiYm90aFwiXG4gICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtZW51Qm94XCI+XG4gICAgICAgICAgICA8TWVudUJhciBwYXRoTmFtZT17RGluZ3RhbGsuc2V0RGROYXZDb2xvcihcIi9tb19kaW5nSG9tZVwiKX0gLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L0xheW91dD5cbiAgICApO1xuICB9XG59XG5mdW5jdGlvbiBtYXBTdGF0ZVRvUHJvcHMoc3RhdGUpIHtcbiAgcmV0dXJuIHtcbiAgICBob21lRGF0YTogc3RhdGUudGFzay5ob21lRGF0YSxcbiAgICBtZXNzYWdlTGlzdEJ5VXNlcjogc3RhdGUudXNlci5tZXNzYWdlTGlzdEJ5VXNlcixcbiAgICB1cmxEYXRhOiBzdGF0ZS51c2VyLnVybERhdGEsXG4gICAgaG9tZVNjcm9sbFRvcDogc3RhdGUuY2FjaGUuaG9tZVNjcm9sbFRvcFxuICB9O1xufVxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gZGlzcGF0Y2ggPT4ge1xuICByZXR1cm4ge1xuICAgIGZpbmRIb21lRGF0YUJ5UGFnZVNpemU6IGJpbmRBY3Rpb25DcmVhdG9ycyhcbiAgICAgIHRhc2tBY3Rpb24uZmluZEhvbWVEYXRhQnlQYWdlU2l6ZSxcbiAgICAgIGRpc3BhdGNoXG4gICAgKSxcbiAgICBnZXRNZXNzYWdlQnlVc2VyOiBiaW5kQWN0aW9uQ3JlYXRvcnModXNlckFjdGlvbi5nZXRNZXNzYWdlQnlVc2VyLCBkaXNwYXRjaCksXG4gICAgc2V0TWVzc2FnZUNvdW50OiBiaW5kQWN0aW9uQ3JlYXRvcnModXNlckFjdGlvbi5zZXRNZXNzYWdlQ291bnQsIGRpc3BhdGNoKSxcbiAgICBnZXREaW5nTWVzc2FnZURldGFpbHM6IGJpbmRBY3Rpb25DcmVhdG9ycyhcbiAgICAgIHRhc2tBY3Rpb24uZ2V0RGluZ01lc3NhZ2VEZXRhaWxzLFxuICAgICAgZGlzcGF0Y2hcbiAgICApLFxuICAgIHNldFVybERhdGE6IGJpbmRBY3Rpb25DcmVhdG9ycyh1c2VyQWN0aW9uLnNldFVybERhdGEsIGRpc3BhdGNoKSxcbiAgICBzYXZlSG9tZVNjcm9sbFRvcDogYmluZEFjdGlvbkNyZWF0b3JzKFxuICAgICAgY2FjaGVBY3Rpb24uc2F2ZUhvbWVTY3JvbGxUb3AsXG4gICAgICBkaXNwYXRjaFxuICAgIClcbiAgfTtcbn07XG5leHBvcnQgZGVmYXVsdCB3aXRoUmVkdXgoaW5pdFN0b3JlLCBtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoXG4gIGRpbmdIb21lXG4pO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcGFnZXMvbW9fZGluZ0hvbWUuanM/ZW50cnkiLCJtb2R1bGUuZXhwb3J0cyA9IFwiLmFsZXJ0IHtcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXG4gIHotaW5kZXg6IDEwMDAwO1xcbiAgdG9wOiAwO1xcbiAgYm90dG9tOiAwO1xcbiAgbGVmdDogMDtcXG4gIHJpZ2h0OiAwO1xcbiAgYmFja2dyb3VuZDogcmdiYSgwLCAwLCAwLCAwLjUpO1xcbiAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgLW1zLWZsZXgtcGFjazogY2VudGVyO1xcbiAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgLW1zLWZsZXgtYWxpZ246IGNlbnRlcjtcXG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyOyB9XFxuICAuYWxlcnQgLmFsZXJ0Qm94IHtcXG4gICAgd2lkdGg6IDc1JTtcXG4gICAgaGVpZ2h0OiBhdXRvO1xcbiAgICBiYWNrZ3JvdW5kOiAjZmZmO1xcbiAgICBib3JkZXItcmFkaXVzOiAycHg7IH1cXG4gIC5hbGVydCAuYWxlcnRCb3ggLnRleHRMaW1pdCB7XFxuICAgICAgZm9udC1zaXplOiAxMnB4O1xcbiAgICAgIHRleHQtYWxpZ246IGp1c3RpZnk7XFxuICAgICAgbWFyZ2luLWJvdHRvbTogMjBweDsgfVxcbiAgLmFsZXJ0IC5hbGVydEJveCAudGV4dExpbWl0MSB7XFxuICAgICAgbWFyZ2luLWJvdHRvbTogMHB4O1xcbiAgICAgIGZvbnQtc2l6ZTogMTJweDtcXG4gICAgICB0ZXh0LWFsaWduOiBqdXN0aWZ5OyB9XFxuICAuYWxlcnQgLmFsZXJ0Qm94IC50aXRsZSB7XFxuICAgICAgY29sb3I6ICMxRTg4RTU7XFxuICAgICAgZm9udC1zaXplOiAxNnB4O1xcbiAgICAgIHBhZGRpbmc6IDBweCA4cHggMHB4IDE2cHg7IH1cXG4gIC5hbGVydCAuYWxlcnRCb3ggLmNvbHNlIHtcXG4gICAgICBmbG9hdDogcmlnaHQ7XFxuICAgICAgbWFyZ2luOiAxMHB4IDEwcHggMCAwO1xcbiAgICAgIGNvbG9yOiAjYmRiZGJkOyB9XFxuICAuYWxlcnQgLmFsZXJ0Qm94IC50b3BOYW1lIHtcXG4gICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2Y1ZjVmNTtcXG4gICAgICBwYWRkaW5nLWJvdHRvbTogMTZweDtcXG4gICAgICBtYXJnaW4tdG9wOiAxNnB4OyB9XFxuICAuYWxlcnQgLmFsZXJ0Qm94IGRpdiBzcGFuIHtcXG4gICAgICBjb2xvcjogI0JEQkRCRDtcXG4gICAgICBmb250LXNpemU6IDEycHg7IH1cXG4gIC5hbGVydCAuYWxlcnRCb3ggcCB7XFxuICAgICAgZm9udC1zaXplOiAxNHB4O1xcbiAgICAgIGNvbG9yOiAjNDI0MjQyO1xcbiAgICAgIHRleHQtYWxpZ246IGp1c3RpZnk7XFxuICAgICAgbWFyZ2luLXRvcDogMTBweDtcXG4gICAgICBwYWRkaW5nOiAwIDE2cHggMCAxNnB4O1xcbiAgICAgIGxpbmUtaGVpZ2h0OiAyMHB4OyB9XFxuICAuYWxlcnQgLmFsZXJ0Qm94IHAgYiB7XFxuICAgICAgICBjb2xvcjogI2ZmYTcyNjtcXG4gICAgICAgIG1hcmdpbjogMCAycHg7IH1cXG4gIC5hbGVydCAuYWxlcnRCb3ggcCAuYmFzaWNzVGV4dCB7XFxuICAgICAgICBjb2xvcjogIzQyNDI0MjtcXG4gICAgICAgIGJvcmRlcjogbm9uZTtcXG4gICAgICAgIGxpbmUtaGVpZ2h0OiAyMHB4O1xcbiAgICAgICAgbWFyZ2luLXRvcDogMTBweDsgfVxcbiAgLmFsZXJ0IC5hbGVydEJveCBwIC5mcmVlVGV4dCB7XFxuICAgICAgICBib3JkZXI6IG5vbmU7XFxuICAgICAgICBsaW5lLWhlaWdodDogMjBweDtcXG4gICAgICAgIGNvbG9yOiAjNDI0MjQyOyB9XFxuICAuYWxlcnQgLmFsZXJ0Qm94IHAgLm1ham9yVGV4dCB7XFxuICAgICAgICBib3JkZXI6IG5vbmU7XFxuICAgICAgICBjb2xvcjogIzQyNDI0MjtcXG4gICAgICAgIGxpbmUtaGVpZ2h0OiAyMHB4O1xcbiAgICAgICAgbWFyZ2luLXRvcDogMTBweDsgfVxcbiAgLmFsZXJ0IC5hbGVydEJveCAuYnV0T25lIHtcXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzI5N2ZhO1xcbiAgICAgIGNvbG9yOiAjZmZmZmZmO1xcbiAgICAgIHdpZHRoOiA4MHB4O1xcbiAgICAgIGZvbnQtc2l6ZTogMTRweDtcXG4gICAgICBwYWRkaW5nOiA1cHggMDtcXG4gICAgICBtYXJnaW4tYm90dG9tOiAxNnB4O1xcbiAgICAgIGJvcmRlci1yYWRpdXM6IDRweDtcXG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgICAgZmxvYXQ6IHJpZ2h0O1xcbiAgICAgIG1hcmdpbi1yaWdodDogMTZweDtcXG4gICAgICBtYXJnaW4tdG9wOiAzMHB4OyB9XFxuICAuYWxlcnQgLmFsZXJ0Qm94IC5idXRUd28ge1xcbiAgICAgIHBhZGRpbmc6IDA7XFxuICAgICAgZm9udC1zaXplOiAxNHB4O1xcbiAgICAgIGZsb2F0OiByaWdodDtcXG4gICAgICBtYXJnaW4tcmlnaHQ6IDEwcHg7XFxuICAgICAgbWFyZ2luLXRvcDogMzBweDtcXG4gICAgICBtYXJnaW4tYm90dG9tOiA2cHg7IH1cXG4gIC5hbGVydCAuYWxlcnRCb3ggLmJ1dFR3byAuYnV0MSB7XFxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzI5N2ZhO1xcbiAgICAgICAgY29sb3I6ICNmZmZmZmY7XFxuICAgICAgICB3aWR0aDogODBweDtcXG4gICAgICAgIGZvbnQtc2l6ZTogMTRweDtcXG4gICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gICAgICAgIHBhZGRpbmc6IDVweCAwO1xcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMTBweDtcXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDRweDtcXG4gICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgICAgIG1hcmdpbi1yaWdodDogMTBweDsgfVxcbiAgLmFsZXJ0IC5hbGVydEJveCAuYnV0VHdvIC5idXQyIHtcXG4gICAgICAgIGNvbG9yOiAjYmRiZGJkO1xcbiAgICAgICAgd2lkdGg6IDEwMHB4O1xcbiAgICAgICAgZm9udC1zaXplOiAxNHB4O1xcbiAgICAgICAgcGFkZGluZzogNXB4IDA7XFxuICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICAgICAgICBtYXJnaW4tYm90dG9tOiAxMHB4O1xcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNHB4O1xcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyOyB9XFxuXCJcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3R5bGVzL2NvbXBvbmVudHMvYWxlcnQuc2NzcyIsIm1vZHVsZS5leHBvcnRzID0gXCIubG9hZF9sb2FkaW5nIHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgbWluLWhlaWdodDogNTBweDtcXG4gIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIC1tcy1mbGV4LXBhY2s6IGNlbnRlcjtcXG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIC1tcy1mbGV4LWFsaWduOiBjZW50ZXI7XFxuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHotaW5kZXg6IDEwMDA7XFxuICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDApOyB9XFxuICAubG9hZF9sb2FkaW5nIC5hbnQtc3BpbiB7XFxuICAgIGZvbnQtZmFtaWx5OiBNb25vc3BhY2VkIE51bWJlcixDaGluZXNlIFF1b3RlLC1hcHBsZS1zeXN0ZW0sQmxpbmtNYWNTeXN0ZW1Gb250LFNlZ29lIFVJLFJvYm90byxQaW5nRmFuZyBTQyxIaXJhZ2lubyBTYW5zIEdCLE1pY3Jvc29mdCBZYUhlaSxIZWx2ZXRpY2EgTmV1ZSxIZWx2ZXRpY2EsQXJpYWwsc2Fucy1zZXJpZjtcXG4gICAgZm9udC1zaXplOiAxNHB4O1xcbiAgICBsaW5lLWhlaWdodDogMS41O1xcbiAgICBjb2xvcjogcmdiYSgwLCAwLCAwLCAwLjY1KTtcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gICAgbWFyZ2luOiAwO1xcbiAgICBwYWRkaW5nOiAwO1xcbiAgICBsaXN0LXN0eWxlOiBub25lO1xcbiAgICBjb2xvcjogIzE4OTBmZjtcXG4gICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjNzIGN1YmljLWJlemllcigwLjc4LCAwLjE0LCAwLjE1LCAwLjg2KTtcXG4gICAgZGlzcGxheTogbm9uZTsgfVxcbiAgLmxvYWRfbG9hZGluZyAuYW50LXNwaW4tc3Bpbm5pbmcge1xcbiAgICBvcGFjaXR5OiAxO1xcbiAgICBwb3NpdGlvbjogc3RhdGljO1xcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IH1cXG4gIC5sb2FkX2xvYWRpbmcgLmFudC1zcGluLWRvdCB7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgICB3aWR0aDogMzBweDtcXG4gICAgaGVpZ2h0OiAzMHB4OyB9XFxuICAubG9hZF9sb2FkaW5nIC5hbnQtc3Bpbi1kb3QgaSB7XFxuICAgIHdpZHRoOiAxNHB4O1xcbiAgICBoZWlnaHQ6IDE0cHg7XFxuICAgIGJvcmRlci1yYWRpdXM6IDEwMCU7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICMxODkwZmY7XFxuICAgIHRyYW5zZm9ybTogc2NhbGUoMC43NSk7XFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIG9wYWNpdHk6IC44O1xcbiAgICBhbmltYXRpb246IGFudFNwaW5Nb3ZlIDFzIGluZmluaXRlIGxpbmVhciBhbHRlcm5hdGU7XFxuICAgIHRyYW5zZm9ybS1vcmlnaW46IDUwJSA1MCU7IH1cXG4gIC5sb2FkX2xvYWRpbmcgLmFudC1zcGluLWRvdCBpOmZpcnN0LWNoaWxkIHtcXG4gICAgbGVmdDogMDtcXG4gICAgdG9wOiAwOyB9XFxuICAubG9hZF9sb2FkaW5nIC5hbnQtc3Bpbi1kb3QgaTpudGgtY2hpbGQoMikge1xcbiAgICByaWdodDogMDtcXG4gICAgdG9wOiAwO1xcbiAgICBhbmltYXRpb24tZGVsYXk6IC40czsgfVxcbiAgLmxvYWRfbG9hZGluZyAuYW50LXNwaW4tZG90IGk6bnRoLWNoaWxkKDMpIHtcXG4gICAgcmlnaHQ6IDA7XFxuICAgIGJvdHRvbTogMDtcXG4gICAgYW5pbWF0aW9uLWRlbGF5OiAuOHM7IH1cXG4gIC5sb2FkX2xvYWRpbmcgLmFudC1zcGluLWRvdCBpOm50aC1jaGlsZCg0KSB7XFxuICAgIGxlZnQ6IDA7XFxuICAgIGJvdHRvbTogMDtcXG4gICAgYW5pbWF0aW9uLWRlbGF5OiAxLjJzOyB9XFxuICBAa2V5ZnJhbWVzIGFudFJvdGF0ZSB7XFxuICB0byB7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlKDQwNWRlZyk7IH0gfVxcbiAgLmxvYWRfbG9hZGluZyAuYW50LXNwaW4tZG90LXNwaW4ge1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSg0NWRlZyk7XFxuICAgIGFuaW1hdGlvbjogYW50Um90YXRlIDEuMnMgaW5maW5pdGUgbGluZWFyOyB9XFxuICAubG9hZGluZ19taW5TaXplIC5hbnQtc3Bpbi1kb3Qge1xcbiAgd2lkdGg6IDIwcHg7XFxuICBoZWlnaHQ6IDIwcHg7IH1cXG4gIC5sb2FkaW5nX21pblNpemUgLmFudC1zcGluLWRvdCBpIHtcXG4gIHdpZHRoOiAxMHB4O1xcbiAgaGVpZ2h0OiAxMHB4OyB9XFxuXCJcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3R5bGVzL2NvbXBvbmVudHMvbG9hZGluZy5zY3NzIiwibW9kdWxlLmV4cG9ydHMgPSBcIi5tZW51QmFyIHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiA2M3B4O1xcbiAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgLW1zLWZsZXgtZmxvdzogcm93IG5vd3JhcDtcXG4gICAgICBmbGV4LWZsb3c6IHJvdyBub3dyYXA7IH1cXG4gIC5tZW51QmFyIC5idXQge1xcbiAgICAtbXMtZmxleDogMTtcXG4gICAgICAgIGZsZXg6IDE7XFxuICAgIGhlaWdodDogNTBweDtcXG4gICAgYmFja2dyb3VuZDogI2ZmZjtcXG4gICAgbWFyZ2luOiAxM3B4IDAgMCAwO1xcbiAgICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgLW1zLWZsZXgtZmxvdzogY29sdW1uIG5vd3JhcDtcXG4gICAgICAgIGZsZXgtZmxvdzogY29sdW1uIG5vd3JhcDtcXG4gICAgLW1zLWZsZXgtcGFjazogY2VudGVyO1xcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIC1tcy1mbGV4LWFsaWduOiBjZW50ZXI7XFxuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBjb2xvcjogI2NjY2NjYzsgfVxcbiAgLm1lbnVCYXIgLmJ1dCBzdmcge1xcbiAgICAgIG1hcmdpbjogMCAwIDRweCAwO1xcbiAgICAgIHdpZHRoOiAxOHB4O1xcbiAgICAgIGhlaWdodDogMThweDtcXG4gICAgICBjb2xvcjogI2NjY2NjYztcXG4gICAgICBmaWxsOiAjY2NjY2NjOyB9XFxuICAubWVudUJhciAuYnV0IHNwYW4ge1xcbiAgICAgIGZvbnQtc2l6ZTogMTJweDtcXG4gICAgICBsaW5lLWhlaWdodDogMTJweDsgfVxcbiAgLm1lbnVCYXIgLmFjdCB7XFxuICAgIGNvbG9yOiAjMWU4OGU1OyB9XFxuICAubWVudUJhciAuYWN0IHN2ZyB7XFxuICAgICAgbWFyZ2luOiAwIDAgNHB4IDA7XFxuICAgICAgd2lkdGg6IDE4cHg7XFxuICAgICAgaGVpZ2h0OiAxOHB4OyB9XFxuICAubWVudUJhciAuY2VuIHtcXG4gICAgLW1zLWZsZXg6IDAgMCA2NXB4O1xcbiAgICAgICAgZmxleDogMCAwIDY1cHg7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTsgfVxcbiAgLm1lbnVCYXIgLmNlbkJ1dCB7XFxuICAgIGJhY2tncm91bmQ6ICMxMjk2ZGI7XFxuICAgIHdpZHRoOiA1MHB4O1xcbiAgICBoZWlnaHQ6IDUwcHg7XFxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gICAgLW1zLWZsZXg6IDE7XFxuICAgICAgICBmbGV4OiAxO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogLTNweDtcXG4gICAgbGVmdDogNTAlO1xcbiAgICBtYXJnaW4tbGVmdDogLTI1cHg7XFxuICAgIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICAtbXMtZmxleC1wYWNrOiBjZW50ZXI7XFxuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgLW1zLWZsZXgtYWxpZ246IGNlbnRlcjtcXG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7IH1cXG4gIC5tZW51QmFyIC5jZW5CdXQgc3ZnIHtcXG4gICAgICBjb2xvcjogI2ZmZjtcXG4gICAgICB3aWR0aDogMzBweDtcXG4gICAgICBoZWlnaHQ6IDMwcHg7XFxuICAgICAgbWFyZ2luOiAwOyB9XFxuICAubWVudUJhciAuYWRkQm94IHtcXG4gICAgcG9zaXRpb246IGZpeGVkO1xcbiAgICB6LWluZGV4OiAxO1xcbiAgICB0b3A6IDA7XFxuICAgIGxlZnQ6IDA7XFxuICAgIHJpZ2h0OiAwO1xcbiAgICBib3R0b206IDA7XFxuICAgIGJhY2tncm91bmQ6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC45KTtcXG4gICAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIC1tcy1mbGV4LXBhY2s6IGNlbnRlcjtcXG4gICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICAtbXMtZmxleC1hbGlnbjogY2VudGVyO1xcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgLW1zLWZsZXgtZmxvdzogY29sdW1uIG5vd3JhcDtcXG4gICAgICAgIGZsZXgtZmxvdzogY29sdW1uIG5vd3JhcDsgfVxcbiAgLm1lbnVCYXIgLmFkZEJveCAubGlzdCB7XFxuICAgICAgd2lkdGg6IDEwMCU7IH1cXG4gIC5tZW51QmFyIC5hZGRCb3ggLmxpc3QgbGkge1xcbiAgICAgICAgaGVpZ2h0OiAzNXB4O1xcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICAgICAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICAgICAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICAgICAgLW1zLWZsZXgtcGFjazogY2VudGVyO1xcbiAgICAgICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICAgICAgLW1zLWZsZXgtYWxpZ246IGNlbnRlcjtcXG4gICAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICAgICAgbWFyZ2luOiAwIDAgMzBweCAwOyB9XFxuICAubWVudUJhciAuYWRkQm94IC5saXN0IGxpIHN2ZyB7XFxuICAgICAgICAgIHdpZHRoOiAzNXB4O1xcbiAgICAgICAgICBoZWlnaHQ6IDM1cHg7XFxuICAgICAgICAgIGNvbG9yOiAjNWZjYmY4OyB9XFxuICAubWVudUJhciAuYWRkQm94IC5saXN0IGxpIHNwYW4ge1xcbiAgICAgICAgICBjb2xvcjogIzdiN2I3YjtcXG4gICAgICAgICAgZm9udC1zaXplOiAxNnB4O1xcbiAgICAgICAgICBtYXJnaW46IDVweCAwIDAgNXB4OyB9XFxuICAubWVudUJhciAuYWRkQm94IC5jYW5jZWwge1xcbiAgICAgIG1hcmdpbjogMTAwcHggMCAwIDA7XFxuICAgICAgY29sb3I6ICM2ZGNlZjY7IH1cXG4gIC5tZW51QmFyIC5hbGVydCAuYWxlcnRCb3ggcCB7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjsgfVxcblwiXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHN0eWxlcy9jb21wb25lbnRzL21lbnVCYXIuc2NzcyIsIm1vZHVsZS5leHBvcnRzID0gXCIuZGluZ0hvbWUgLmRpbmdIb21lLWJveCB7XFxuICAtbXMtZmxleC1mbG93OiBjb2x1bW4gbm93cmFwO1xcbiAgICAgIGZsZXgtZmxvdzogY29sdW1uIG5vd3JhcDtcXG4gIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIG92ZXJmbG93OiBoaWRkZW47IH1cXG5cXG4uZGluZ0hvbWUgLmFsZXJ0Um93IHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGJhY2tncm91bmQ6ICNmZmVkYjI7XFxuICBsaW5lLWhlaWdodDogMzBweDtcXG4gIGZvbnQtc2l6ZTogMTJweDtcXG4gIGxlZnQ6IDA7XFxuICByaWdodDogMDtcXG4gIHBhZGRpbmc6IDAgMTBweDtcXG4gIGJveC1zaGFkb3c6IDAgMCA1cHggI2JjYjJiMjsgfVxcblxcbi5kaW5nSG9tZSAuYWxlcnRSb3cgc3ZnIHtcXG4gICAgbWFyZ2luOiA0cHggNXB4IDAgMDtcXG4gICAgZmxvYXQ6IGxlZnQ7XFxuICAgIGNvbG9yOiAjYTA5ZjlhOyB9XFxuXFxuLmRpbmdIb21lIC5hbGVydFJvdyBzcGFuIHtcXG4gICAgY29sb3I6ICNhMDlmOWE7IH1cXG5cXG4uZGluZ0hvbWUgLmFsZXJ0Um93IGxhYmVsIHtcXG4gICAgZmxvYXQ6IHJpZ2h0O1xcbiAgICBjb2xvcjogIzQwOGRkZjsgfVxcblxcbi5kaW5nSG9tZSAuZGluZ0hvbWUtdG9wIHtcXG4gIGhlaWdodDogMTUwcHg7XFxuICB3aWR0aDogMTAwJTtcXG4gIGJvcmRlcjogMXB4IHNvbGlkICNlYWVhZWE7XFxuICBib3gtc2hhZG93OiAxcHggMXB4IDFweCAjZWFlYWVhO1xcbiAgYmFja2dyb3VuZDogI2ZmZjtcXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcXG4gIC1tcy1mbGV4OiAwIDAgYXV0bztcXG4gICAgICBmbGV4OiAwIDAgYXV0bzsgfVxcblxcbi5kaW5nSG9tZSAuZGluZ0hvbWUtdG9wIC53YWl0IHtcXG4gICAgd2lkdGg6IDkxJTtcXG4gICAgcGFkZGluZzogMCAzcHg7XFxuICAgIGhlaWdodDogNDBweDtcXG4gICAgbGluZS1oZWlnaHQ6IDQwcHg7IH1cXG5cXG4uZGluZ0hvbWUgLmRpbmdIb21lLXRvcCAud2FpdCBkaXYge1xcbiAgICAgIGNvbG9yOiAjZDBkMGQ1O1xcbiAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gICAgICBwYWRkaW5nLWxlZnQ6IDEycHg7IH1cXG5cXG4uZGluZ0hvbWUgLmRpbmdIb21lLXRvcCAud2FpdCBkaXYgcCB7XFxuICAgICAgICBtYXJnaW46IDAgMCAwIDhweDtcXG4gICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jazsgfVxcblxcbi5kaW5nSG9tZSAuZGluZ0hvbWUtdG9wIC53YWl0IGRpdiBwIHNwYW4ge1xcbiAgICAgICAgICBjb2xvcjogI2Y3NzU3NTsgfVxcblxcbi5kaW5nSG9tZSAuZGluZ0hvbWUtdG9wIC53YWl0LXBtIHtcXG4gICAgaGVpZ2h0OiA2OHB4O1xcbiAgICBwYWRkaW5nOiAxNXB4O1xcbiAgICBib3JkZXItdG9wOiAxcHggc29saWQgI2Y4ZjhmODtcXG4gICAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIC1tcy1mbGV4LXdyYXA6IG5vd3JhcDtcXG4gICAgICAgIGZsZXgtd3JhcDogbm93cmFwOyB9XFxuXFxuLmRpbmdIb21lIC5kaW5nSG9tZS10b3AgLndhaXQtcG0gcCB7XFxuICAgICAgZmxvYXQ6IGxlZnQ7XFxuICAgICAgY29sb3I6ICM2NjY7XFxuICAgICAgZm9udC1zaXplOiAxNHB4O1xcbiAgICAgIC1tcy1mbGV4OiAxO1xcbiAgICAgICAgICBmbGV4OiAxOyB9XFxuXFxuLmRpbmdIb21lIC5kaW5nSG9tZS10b3AgLndhaXQtcG0gcCBzcGFuIHtcXG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICAgICAgcGFkZGluZzogMTVweDtcXG4gICAgICAgIGhlaWdodDogNDVweDtcXG4gICAgICAgIGxpbmUtaGVpZ2h0OiA0NXB4O1xcbiAgICAgICAgZm9udC13ZWlnaHQ6IDYwMDsgfVxcblxcbi5kaW5nSG9tZSAuZGluZ0hvbWUtdG9wIC53YWl0LXBtIHAgLnNwYW4tb25lIHtcXG4gICAgICAgIGNvbG9yOiAjNzhjMDZlOyB9XFxuXFxuLmRpbmdIb21lIC5kaW5nSG9tZS10b3AgLndhaXQtcG0gcCAuc3Bhbi10d28ge1xcbiAgICAgICAgY29sb3I6ICM1YzZiYzA7IH1cXG5cXG4uZGluZ0hvbWUgLmRpbmdIb21lLXRvcCAud2FpdC1wbSBwIC5zcGFuLXRocmVlIHtcXG4gICAgICAgIGNvbG9yOiAjZmQ5NDNlOyB9XFxuXFxuLmRpbmdIb21lIC5kaW5nSG9tZS10b3AgLndhaXQtcG0gLndhaXQtcG0tY2VudGVyIHtcXG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7IH1cXG5cXG4uZGluZ0hvbWUgLmRpbmdIb21lLXRvcCAud2FpdC1wbSAud2FpdC1wbS1sYXN0IHtcXG4gICAgICB0ZXh0LWFsaWduOiByaWdodDsgfVxcblxcbi5kaW5nSG9tZSAuZGluZ0hvbWUtYm90dG9tIHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgbWFyZ2luLXRvcDogMTBweDtcXG4gIGJveC1zaGFkb3c6IDFweCAxcHggMXB4ICNlYWVhZWE7XFxuICBiYWNrZ3JvdW5kOiAjZmZmO1xcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xcbiAgLW1zLWZsZXg6IDE7XFxuICAgICAgZmxleDogMTtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTsgfVxcblxcbi5kaW5nSG9tZSAuZGluZ0hvbWUtYm90dG9tIC5wcCB7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgaGVpZ2h0OiAxMDBweDtcXG4gICAgbGluZS1oZWlnaHQ6IDEwMHB4O1xcbiAgICBjb2xvcjogI2QwZDBkNTsgfVxcblxcbi5kaW5nSG9tZSAuZGluZ0hvbWUtYm90dG9tIC5ib3R0b20tdGl0bGUge1xcbiAgICBoZWlnaHQ6IDQ0cHg7XFxuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZjhmOGY4O1xcbiAgICBwYWRkaW5nOiAwIDE1cHg7XFxuICAgIGxpbmUtaGVpZ2h0OiA0NHB4OyB9XFxuXFxuLmRpbmdIb21lIC5kaW5nSG9tZS1ib3R0b20gLmJvdHRvbS10aXRsZSBwIHtcXG4gICAgICBmbG9hdDogbGVmdDtcXG4gICAgICBjb2xvcjogI2QwZDBkNTsgfVxcblxcbi5kaW5nSG9tZSAuZGluZ0hvbWUtYm90dG9tIC5ib3R0b20tdGl0bGUgZm9udCB7XFxuICAgICAgZmxvYXQ6IGxlZnQ7XFxuICAgICAgZGlzcGxheTogYmxvY2s7XFxuICAgICAgbGluZS1oZWlnaHQ6IDQ0cHg7XFxuICAgICAgZm9udC1zaXplOiAxMnB4O1xcbiAgICAgIGNvbG9yOiAjZDBkMGQ1O1xcbiAgICAgIG1hcmdpbjogMCAwIDAgOHB4OyB9XFxuXFxuLmRpbmdIb21lIC5kaW5nSG9tZS1ib3R0b20gLmJvdHRvbS10aXRsZSBmb250IHNwYW4ge1xcbiAgICAgICAgY29sb3I6ICNmNzc1NzU7IH1cXG5cXG4uZGluZ0hvbWUgLmRpbmdIb21lLWJvdHRvbSAuYm90dG9tLXRpdGxlIHN2ZyB7XFxuICAgICAgbWFyZ2luOiAxMXB4IDAgMCAwO1xcbiAgICAgIHdpZHRoOiAxOHB4O1xcbiAgICAgIGNvbG9yOiAjY2RjZGQxO1xcbiAgICAgIGhlaWdodDogMThweDtcXG4gICAgICBmbG9hdDogcmlnaHQ7IH1cXG5cXG4uZGluZ0hvbWUgLmRpbmdIb21lLWJvdHRvbSAudGFsa2JveCB7XFxuICAgIG92ZXJmbG93LXk6IGF1dG87XFxuICAgIG92ZXJmbG93LXg6IGhpZGRlbjtcXG4gICAgLXdlYmtpdC1vdmVyZmxvdy1zY3JvbGxpbmc6IHRvdWNoO1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IDQ1cHg7XFxuICAgIGxlZnQ6IDA7XFxuICAgIHJpZ2h0OiAwO1xcbiAgICBib3R0b206IDA7IH1cXG5cXG4uZGluZ0hvbWUgLmRpbmdIb21lLWJvdHRvbSAudGFsa2JveCAucCB7XFxuICAgICAgZmxvYXQ6IGxlZnQ7XFxuICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICAgIGhlaWdodDogMzBweDtcXG4gICAgICBsaW5lLWhlaWdodDogMzBweDtcXG4gICAgICB3aWR0aDogMTAwJTtcXG4gICAgICBmb250LXNpemU6IDEycHg7XFxuICAgICAgY29sb3I6ICM5OTk7IH1cXG5cXG4uZGluZ0hvbWUgLmRpbmdIb21lLWJvdHRvbSAudGFsa2JveCAucCAubG9hZF9sb2FkaW5nIHtcXG4gICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gICAgICAgIHBvc2l0aW9uOiBpbmhlcml0O1xcbiAgICAgICAgd2lkdGg6IGF1dG87XFxuICAgICAgICBtaW4taGVpZ2h0OiBhdXRvO1xcbiAgICAgICAgbWFyZ2luOiAwIDdweCAwIDA7IH1cXG5cXG4uZGluZ0hvbWUgLmRpbmdIb21lLWJvdHRvbSAudGFsa2JveCAudGFsa2xpc3Q6bGFzdC1jaGlsZCB7XFxuICAgICAgYm9yZGVyOiAwOyB9XFxuXFxuLmRpbmdIb21lIC5kaW5nSG9tZS1ib3R0b20gLnRhbGtib3ggLnRhbGtsaXN0IHtcXG4gICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2Y4ZjhmODtcXG4gICAgICBwYWRkaW5nOiAyMHB4IDE1cHg7XFxuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICAgIGhlaWdodDogOTFweDtcXG4gICAgICBmbG9hdDogbGVmdDtcXG4gICAgICB3aWR0aDogMTAwJTsgfVxcblxcbi5kaW5nSG9tZSAuZGluZ0hvbWUtYm90dG9tIC50YWxrYm94IC50YWxrbGlzdCAuaWNvbiB7XFxuICAgICAgICB3aWR0aDogNTBweDtcXG4gICAgICAgIGhlaWdodDogNTBweDtcXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gICAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XFxuICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgICAgICBsaW5lLWhlaWdodDogNTBweDtcXG4gICAgICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XFxuICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICAgICAgICBiYWNrZ3JvdW5kOiAjNWM2YmMwO1xcbiAgICAgICAgY29sb3I6ICNlNmU4ZjU7XFxuICAgICAgICBvdmVyZmxvdzogaGlkZGVuOyB9XFxuXFxuLmRpbmdIb21lIC5kaW5nSG9tZS1ib3R0b20gLnRhbGtib3ggLnRhbGtsaXN0IC50YXNrbGlzdCB7XFxuICAgICAgICBwYWRkaW5nOiAwIDAgMCAxNXB4O1xcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICAgICAgdG9wOiAyMHB4O1xcbiAgICAgICAgbGVmdDogNjVweDtcXG4gICAgICAgIHJpZ2h0OiAxNXB4OyB9XFxuXFxuLmRpbmdIb21lIC5kaW5nSG9tZS1ib3R0b20gLnRhbGtib3ggLnRhbGtsaXN0IC50YXNrbGlzdCAuZGQge1xcbiAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgICAgICAgIHdpZHRoOiA4cHg7XFxuICAgICAgICAgIGhlaWdodDogOHB4O1xcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICAgICAgICAgIGJhY2tncm91bmQ6ICNmNjVlNWU7XFxuICAgICAgICAgIHJpZ2h0OiAxcHg7XFxuICAgICAgICAgIHRvcDogM3B4OyB9XFxuXFxuLmRpbmdIb21lIC5kaW5nSG9tZS1ib3R0b20gLnRhbGtib3ggLnRhbGtsaXN0IC50YXNrbGlzdCAuaHVpIHtcXG4gICAgICAgICAgYmFja2dyb3VuZDogIzk5OTsgfVxcblxcbi5kaW5nSG9tZSAuZGluZ0hvbWUtYm90dG9tIC50YWxrYm94IC50YWxrbGlzdCAudGFza2xpc3QgcCB7XFxuICAgICAgICAgIGNvbG9yOiAjNjY2O1xcbiAgICAgICAgICBmb250LXNpemU6IDE0cHg7XFxuICAgICAgICAgIHBhZGRpbmc6IDVweCAwIDAgMDsgfVxcblxcbi5kaW5nSG9tZSAuZGluZ0hvbWUtYm90dG9tIC50YWxrYm94IC50YWxrbGlzdCAudGFza2xpc3QgcDpsYXN0LWNoaWxkIHtcXG4gICAgICAgICAgY29sb3I6ICNjN2M3Y2M7XFxuICAgICAgICAgIGZvbnQtc2l6ZTogMTJweDsgfVxcblxcbi5kaW5nSG9tZSAuZGluZ0hvbWUtYm90dG9tIC50YWxrYm94IC50YWxrbGlzdCAudGFza2xpc3QgLnRhc2tsaXN0LWZpcnN0IHtcXG4gICAgICAgICAgY29sb3I6ICM2NjY7XFxuICAgICAgICAgIGZvbnQtc2l6ZTogMTRweDtcXG4gICAgICAgICAgcGFkZGluZzogMDsgfVxcblxcbi5kaW5nSG9tZSAuZGluZ0hvbWUtYm90dG9tIC50YWxrYm94IC50YWxrbGlzdCAudGFza2xpc3QgLnRhc2tsaXN0LWZpcnN0IHNwYW4ge1xcbiAgICAgICAgICAgIG1hcmdpbjogMCA1cHggMCAwOyB9XFxuXFxuLmRpbmdIb21lIC5kaW5nSG9tZS1ib3R0b20gLnRhbGtib3ggLnRhbGtsaXN0IC50YXNrbGlzdCAudGFza2xpc3QtZmlyc3QgaSB7XFxuICAgICAgICAgICAgZm9udC1zdHlsZTogbm9ybWFsOyB9XFxuXFxuLmFtLXBvcG92ZXItbWFzayB7XFxuICBkaXNwbGF5OiBub25lOyB9XFxuXFxuLmFtLXBvcG92ZXIge1xcbiAgZGlzcGxheTogbm9uZTsgfVxcblwiXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHN0eWxlcy9wYWdlcy9kaW5nSG9tZS5zY3NzIiwiaW1wb3J0IEh0dHBDbGllbnQgZnJvbSBcIi4uL2FwaS9odHRwQ2xpZW50XCI7XHJcbmV4cG9ydCBjb25zdCBUQVNLTE9HX0xJU1RfR1JPVVAgPSBcIlRBU0tMT0dfTElTVF9HUk9VUFwiO1xyXG5leHBvcnQgY29uc3QgU0VBUkNIID0gXCJTRUFSQ0hcIjtcclxuZXhwb3J0IGZ1bmN0aW9uIGNvbnRlbnQoZGF0YSwgdHlwZSkge1xyXG4gIHJldHVybiB7XHJcbiAgICB0eXBlOiB0eXBlLFxyXG4gICAgcGF5bG9hZDogZGF0YVxyXG4gIH07XHJcbn1cclxuLy/liqjmgIHorqjorrrliJfooahcclxuZXhwb3J0IGZ1bmN0aW9uIGZpbmRHcm91cFBhZ2VJbmRleChwYWdlID0gMSwgcGFnZVNpemUgPSA1MCwgZGF0YSwgZm4pIHtcclxuICByZXR1cm4gZGlzcGF0Y2ggPT4ge1xyXG4gICAgSHR0cENsaWVudC5BamF4UG9zdFN5bmMoXHJcbiAgICAgIFwiL3Rhc2tsb2cvZmluZEdyb3VwUGFnZUluZGV4P3BhZ2VObz1cIiArIHBhZ2UgKyBcIiZwYWdlU2l6ZT1cIiArIHBhZ2VTaXplLFxyXG4gICAgICBkYXRhLFxyXG4gICAgICBsaXN0ID0+IHtcclxuICAgICAgICBpZiAoZm4pIHtcclxuICAgICAgICAgIGZuKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRpc3BhdGNoKGNvbnRlbnQoZGF0YSwgU0VBUkNIKSk7XHJcbiAgICAgICAgZGlzcGF0Y2goY29udGVudCh7IGxpc3Q6IGxpc3QsIHBhZ2VObzogcGFnZSB9LCBUQVNLTE9HX0xJU1RfR1JPVVApKTtcclxuICAgICAgfVxyXG4gICAgKTtcclxuICB9O1xyXG59XHJcblxyXG57XHJcbiAgLypcclxuLy/pobnnm67ml6Xlv5dcclxuZXhwb3J0IGZ1bmN0aW9uIGZpbmRCeXRhc2tpbmZvSWQoaWQpIHtcclxuICAgICByZXR1cm4gKGRpc3BhdGNoKSA9PiB7XHJcbiAgICAgICAgSHR0cENsaWVudC5BamF4UG9zdCgnL3Rhc2tsb2cvZmluZEJ5dGFza2luZm9JZD9pZD0nK2lkLCB7fSwgbGlzdCA9PiB7XHJcbiAgICAgICAgICAgIGRpc3BhdGNoKGNvbnRlbnQobGlzdCwgVEFTS0xPR19UQVNLSU5GTykpXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufVxyXG4vL+mhueebruaXpeW/l1xyXG5leHBvcnQgZnVuY3Rpb24gZmluZExpc3QocGFnZT0xLHR5cGUsZGF0ZSkge1xyXG4gICAgIHJldHVybiAoZGlzcGF0Y2gpID0+IHtcclxuICAgICAgICBIdHRwQ2xpZW50LkFqYXhQb3N0KCcvdGFza2xvZy9maW5kTGlzdD9wYWdlPScrcGFnZSwge3R5cGU6dHlwZSxkYXRlOmRhdGV9LCBsaXN0ID0+IHtcclxuICAgICAgICAgICAgZGlzcGF0Y2goY29udGVudChsaXN0LCBUQVNLTE9HX0xJU1QpKVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn1cclxuLy/pobnnm67liIbnu4Tml6Xlv5dcclxuZXhwb3J0IGZ1bmN0aW9uIGZpbmRHcm91cFBhZ2VJbmRleChwYWdlPTEsZGF0YSxmbikge1xyXG4gICAgcGFnZSA9IHBhZ2UgKyAxO1xyXG4gICAgcmV0dXJuIChkaXNwYXRjaCkgPT4ge1xyXG4gICAgICAgSHR0cENsaWVudC5BamF4UG9zdCgnL3Rhc2tsb2cvZmluZEdyb3VwUGFnZUluZGV4P3BhZ2VObz0nK3BhZ2UsIGRhdGEsIGxpc3QgPT4ge1xyXG4gICAgICAgICAgIGlmKGZuKXtcclxuICAgICAgICAgICAgICAgIGZuKCk7XHJcbiAgICAgICAgICAgfVxyXG4gICAgICAgICAgIGRpc3BhdGNoKGNvbnRlbnQobGlzdCwgVEFTS0xPR19MSVNUX0dST1VQKSlcclxuICAgICAgIH0pXHJcbiAgIH1cclxufVxyXG4qL1xyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FjdGlvbnMvZHluYW1pYy5qcyIsImV4cG9ydCBjb25zdCBGRUVEX0FERCA9ICdGRUVEX0FERCc7XHJcbmltcG9ydCBIdHRwQ2xpZW50IGZyb20gJy4uL2FwaS9odHRwQ2xpZW50J1xyXG5cclxuLy/mt7vliqDmhI/op4Hlj43ppohcclxuZXhwb3J0IGZ1bmN0aW9uIHNhdmUobWFpbCxyZW1hcmtzKSB7XHJcbiAgICByZXR1cm4gKGRpc3BhdGNoKSA9PiB7XHJcbiAgICAgICAgSHR0cENsaWVudC5BamF4UG9zdCgnL2ZlZWRiYWNrL3NhdmUnLHttYWlsOm1haWwscmVtYXJrczpyZW1hcmtzfSwgbGlzdCA9PiB7XHJcbiAgICAgICAgICAgIGRpc3BhdGNoKGNvbnRlbnQobGlzdCwgRkVFRF9BREQpKVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjb250ZW50KGRhdGEsIHR5cGUpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgdHlwZTogdHlwZSxcclxuICAgICAgICBwYXlsb2FkOiBkYXRhXHJcbiAgICB9XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hY3Rpb25zL2ZlZWRiYWNrLmpzIiwiZXhwb3J0IGNvbnN0IEhFSFBTX0xJU1QgPSAnSEVIUFNfTElTVCc7XHJcbmV4cG9ydCBjb25zdCBIRUhQU19UWVBFX0xJU1QgPSAnSEVIUFNfVFlQRV9MSVNUJztcclxuZXhwb3J0IGNvbnN0IEhFSFBTX0RFVEFJTCA9ICdIRUhQU19ERVRBSUwnO1xyXG5pbXBvcnQgSHR0cENsaWVudCBmcm9tICcuLi9hcGkvaHR0cENsaWVudCc7XHJcblxyXG4vLyDojrflj5blr7nlupTliIbnsbvnmoTliJfooahcclxuZXhwb3J0IGZ1bmN0aW9uIGZpbmRMaXN0KHBhZ2U9MSxkYXRhPXt9LGZuKSB7XHJcbiAgICAgcmV0dXJuIChkaXNwYXRjaCkgPT4ge1xyXG4gICAgICAgIEh0dHBDbGllbnQuQWpheFBvc3QoJy9oZWxwcy9maW5kTGlzdD9wYWdlPScrcGFnZSwgZGF0YSwgbGlzdCA9PiB7XHJcbiAgICAgICAgICAgIGlmKGZuKXtcclxuICAgICAgICAgICAgICAgIGZuKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGlzcGF0Y2goY29udGVudChsaXN0LCBIRUhQU19MSVNUKSlcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59XHJcblxyXG4vLyDojrflj5bliJfooajliIbnsbtcclxuZXhwb3J0IGZ1bmN0aW9uIGZpbmRUeXBlTGlzdChkYXRhPXt9LGZuKSB7XHJcbiAgICByZXR1cm4gKGRpc3BhdGNoKSA9PiB7XHJcbiAgICAgICBIdHRwQ2xpZW50LkFqYXhQb3N0KCcvaGVscHMvZmluZFR5cGVMaXN0JywgZGF0YSwgbGlzdCA9PiB7XHJcbiAgICAgICAgICAgaWYoZm4pe1xyXG4gICAgICAgICAgICAgICBmbigpO1xyXG4gICAgICAgICAgIH1cclxuICAgICAgICAgICBkaXNwYXRjaChjb250ZW50KGxpc3QsIEhFSFBTX1RZUEVfTElTVCkpXHJcbiAgICAgICB9KVxyXG4gICB9XHJcbn1cclxuXHJcbi8vIOiOt+WPluivpuaDhVxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGV0YWlsKGlkLGZuKSB7XHJcbiAgICByZXR1cm4gKGRpc3BhdGNoKSA9PiB7XHJcbiAgICAgICBIdHRwQ2xpZW50LkFqYXhQb3N0KCcvaGVscHMvZ2V0RGV0YWlsP2lkPScraWQsIHt9LCBsaXN0ID0+IHtcclxuICAgICAgICAgICBpZihmbil7XHJcbiAgICAgICAgICAgICAgIGZuKCk7XHJcbiAgICAgICAgICAgfVxyXG4gICAgICAgICAgIGRpc3BhdGNoKGNvbnRlbnQobGlzdCwgSEVIUFNfREVUQUlMKSlcclxuICAgICAgIH0pXHJcbiAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNvbnRlbnQoZGF0YSwgdHlwZSkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICB0eXBlOiB0eXBlLFxyXG4gICAgICAgIHBheWxvYWQ6IGRhdGFcclxuICAgIH1cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FjdGlvbnMvaGVscC5qcyIsImV4cG9ydCBjb25zdCBMQUJFTF9MSVNUID0gJ0xBQkVMX0xJU1QnO1xyXG5leHBvcnQgY29uc3QgVEFHX0xJU1QgPSAnVEFHX0xJU1QnO1xyXG5leHBvcnQgY29uc3QgUFJPSkVDVF9UWVBFX0xJU1QgPSAnUFJPSkVDVF9UWVBFX0xJU1QnO1xyXG5leHBvcnQgY29uc3QgQUREX1BST0pFQ1RfVFlQRSA9ICdBRERfUFJPSkVDVF9UWVBFJztcclxuZXhwb3J0IGNvbnN0IFBVQkxJQ19MQUJFTF9MSVNUID0gJ1BVQkxJQ19MQUJFTF9MSVNUJztcclxuZXhwb3J0IGNvbnN0IExBQkVMX1VTRVIgPSAnTEFCRUxfVVNFUic7XHJcbmV4cG9ydCBjb25zdCBBRERfTEFCRUwgPSAnQUREX0xBQkVMJztcclxuZXhwb3J0IGNvbnN0IEFERF9MQUJFTF9VU0VSID0gJ0FERF9MQUJFTF9VU0VSJztcclxuZXhwb3J0IGNvbnN0IFBFUlNPTl9MQUJFTCA9ICdQRVJTT05fTEFCRUwnO1xyXG5leHBvcnQgY29uc3QgQUREX1BFUlNPTl9MQUJFTCA9ICdBRERfUEVSU09OX0xBQkVMJztcclxuaW1wb3J0IEh0dHBDbGllbnQgZnJvbSAnLi4vYXBpL2h0dHBDbGllbnQnXHJcblxyXG4vLyDojrflj5bmiYDmnInmoIfnrb5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldExhYmVsTGlzdEJ5VXNlcihmbikge1xyXG4gICAgcmV0dXJuIChkaXNwYXRjaCkgPT4ge1xyXG4gICAgICAgIEh0dHBDbGllbnQuQWpheFBvc3QoJy9sYWJlbC9maW5kTGFiZWxCeVVzZXInLCcnLCBsaXN0ID0+IHtcclxuICAgICAgICAgICAgaWYoZm4pe1xyXG4gICAgICAgICAgICAgICAgZm4oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkaXNwYXRjaChjb250ZW50KGxpc3QsIExBQkVMX0xJU1QpKVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIOiOt+WPluagh+etvuWIl+ihqFxyXG4vKlxyXG4gKiDov5Tlm57lgLwgdHlwZTonMScgIOS4quS6uuagh+etvlxyXG4gKiAgICAgICAgdHlwZTonMicgIOWFrOWFseagh+etvlxyXG4gKiAgICAgICAgdHlwZTonMycgIOmhueebruWIhuexu1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFRhZ0xpc3QoZm4pIHtcclxuICAgIHJldHVybiAoZGlzcGF0Y2gpID0+IHtcclxuICAgICAgICBIdHRwQ2xpZW50LkFqYXhQb3N0KCcvbGFiZWwvZmluZExhYmVsQWxsJywnJywgbGlzdCA9PiB7XHJcbiAgICAgICAgICAgIGlmKGZuKXtcclxuICAgICAgICAgICAgICAgIGZuKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGlzcGF0Y2goY29udGVudChsaXN0LCBUQUdfTElTVCkpXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIOiOt+WPlumhueebruWIhuexu+WIl+ihqFxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0UHJvamVjdFR5cGVMaXN0KGZuKXsgXHJcbiAgICByZXR1cm4gKGRpc3BhdGNoKSA9PiB7XHJcbiAgICAgICAgSHR0cENsaWVudC5BamF4UG9zdCgnL2xhYmVsL2xhYmVsUHJvamVjdExpc3QnLCcnLCBsaXN0ID0+IHtcclxuICAgICAgICAgICAgaWYoZm4pe1xyXG4gICAgICAgICAgICAgICAgZm4oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkaXNwYXRjaChjb250ZW50KGxpc3QsIFBST0pFQ1RfVFlQRV9MSVNUKSlcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG4vL+a3u+WKoOmhueebruWIhuexu1xyXG5leHBvcnQgZnVuY3Rpb24gYWRkUHJvamVjdFR5cGUoZGF0YSxwaWQsZm4pIHtcclxuICAgIHJldHVybiAoZGlzcGF0Y2gpID0+IHtcclxuICAgICAgICBIdHRwQ2xpZW50LkFqYXhQb3N0KCcvbGFiZWwvYWRkUHJvamVjdExhYmVsP3BpZD0nK3BpZCxkYXRhLCBsaXN0ID0+IHtcclxuICAgICAgICAgICAgaWYoZm4pe1xyXG4gICAgICAgICAgICAgICAgZm4oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkaXNwYXRjaChjb250ZW50KGxpc3QsQUREX1BST0pFQ1RfVFlQRSkpXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufVxyXG5cclxuLy/ojrflj5bmoIfnrb7liJfooahcclxuZXhwb3J0IGZ1bmN0aW9uIGdldExhYmVsTGlzdChmbikge1xyXG4gICAgcmV0dXJuIChkaXNwYXRjaCkgPT4ge1xyXG4gICAgICAgIEh0dHBDbGllbnQuQWpheFBvc3QoJy9sYWJlbC9sYWJlbFVzZXJMaXN0JywnJywgbGlzdCA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZihmbil7XHJcbiAgICAgICAgICAgICAgICAgICAgZm4oKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGRpc3BhdGNoKGNvbnRlbnQobGlzdCxQVUJMSUNfTEFCRUxfTElTVCkpICBcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59XHJcbi8v6YCa6L+H5qCH562+6I635Y+W55So5oi3XHJcbmV4cG9ydCBmdW5jdGlvbiBmaW5kTGFiZWxVc2VyKGlkLGZuKSB7XHJcbiAgICByZXR1cm4gKGRpc3BhdGNoKSA9PiB7XHJcbiAgICAgICAgSHR0cENsaWVudC5BamF4UG9zdCgnL2xhYmVsL2ZpbmRMYWJlbFVzZXI/bGlkPScraWQsJycsIGxpc3QgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYoZm4pe1xyXG4gICAgICAgICAgICAgICAgICAgIGZuKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBkaXNwYXRjaChjb250ZW50KGxpc3QsTEFCRUxfVVNFUikpXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufVxyXG4vL+a3u+WKoOagh+etvlxyXG5leHBvcnQgZnVuY3Rpb24gYWRkTGFiZWwoZGF0YSxwaWQsZm4pIHtcclxuICAgIHJldHVybiAoZGlzcGF0Y2gpID0+IHtcclxuICAgICAgICBIdHRwQ2xpZW50LkFqYXhQb3N0KCcvbGFiZWwvYWRkTGFiZWw/cGlkPScrcGlkLGRhdGEsIGxpc3QgPT4ge1xyXG4gICAgICAgICAgICBpZihmbil7XHJcbiAgICAgICAgICAgICAgICBmbigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRpc3BhdGNoKGNvbnRlbnQobGlzdCxBRERfTEFCRUwpKVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn1cclxuXHJcbi8v5qCH562+5re75Yqg55So5oi3XHJcbmV4cG9ydCBmdW5jdGlvbiBhZGRMYWJlbFVzZXIodXNlcklkLGxpZCxmbikge1xyXG4gICAgcmV0dXJuIChkaXNwYXRjaCkgPT4ge1xyXG4gICAgICAgIEh0dHBDbGllbnQuQWpheFBvc3QoJy9sYWJlbC9hZGRMYWJlbFVzZXInLHsndXNlckxpc3QnOnVzZXJJZCwnbGFiZWwnOntpZDpsaWR9fSwgbGlzdCA9PiB7XHJcbiAgICAgICAgICAgIGlmKGZuKXtcclxuICAgICAgICAgICAgICAgIGZuKCk7XHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgIGRpc3BhdGNoKGNvbnRlbnQobGlzdCxBRERfTEFCRUxfVVNFUikpXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufVxyXG5cclxuLy/ojrflj5bkuKrkurrmoIfnrb5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFBlcnNvbkxhYmVsKGZuKSB7XHJcbiAgICByZXR1cm4gKGRpc3BhdGNoKSA9PiB7XHJcbiAgICAgICAgSHR0cENsaWVudC5BamF4UG9zdCgnL2xhYmVsL2dldFBlcnNvbkxhYmVsJywnJywgbGlzdCA9PiB7XHJcbiAgICAgICAgICAgIGlmKGZuKXtcclxuICAgICAgICAgICAgICAgIGZuKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGlzcGF0Y2goY29udGVudChsaXN0LFBFUlNPTl9MQUJFTCkpXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufVxyXG5cclxuLy/mt7vliqDkuKrkurrmoIfnrb5cclxuZXhwb3J0IGZ1bmN0aW9uIGFkZFBlcnNvbkxhYmVsKG5hbWUscGlkLGZuKSB7XHJcbiAgICByZXR1cm4gKGRpc3BhdGNoKSA9PiB7XHJcbiAgICAgICAgSHR0cENsaWVudC5BamF4UG9zdCgnL2xhYmVsL2FkZFBlcnNvbkxhYmVsP3BpZD0nK3BpZCxuYW1lLCBsaXN0ID0+IHtcclxuICAgICAgICAgICAgaWYoZm4pe1xyXG4gICAgICAgICAgICAgICAgZm4oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkaXNwYXRjaChjb250ZW50KGxpc3QsQUREX1BFUlNPTl9MQUJFTCkpXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNvbnRlbnQoZGF0YSwgdHlwZSkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICB0eXBlOiB0eXBlLFxyXG4gICAgICAgIHBheWxvYWQ6IGRhdGFcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hY3Rpb25zL2xhYmVsLmpzIiwiaW1wb3J0IEh0dHBDbGllbnQgZnJvbSBcIi4uL2FwaS9odHRwQ2xpZW50XCI7XHJcbmV4cG9ydCBjb25zdCBQUk9KRUNUX0xJU1QgPSBcIlBST0pFQ1RfTElTVFwiO1xyXG5leHBvcnQgY29uc3QgUFJPSkVDVF9MSVNUX0pVUklTRElDVElPTiA9IFwiUFJPSkVDVF9MSVNUX0pVUklTRElDVElPTlwiO1xyXG5leHBvcnQgY29uc3QgUFJPSkVDVF9BREQgPSBcIlBST0pFQ1RfQUREXCI7XHJcbmV4cG9ydCBjb25zdCBQUk9KRUNUX0RFVEFJTFMgPSBcIlBST0pFQ1RfREVUQUlMU1wiO1xyXG5leHBvcnQgY29uc3QgUFJPSkVDVF9VUERFVF9BTEwgPSBcIlBST0pFQ1RfVVBERVRfQUxMXCI7XHJcbmV4cG9ydCBjb25zdCBBRERfQVRURU5USU9OX1dJVENIX1BST0pFQ1QgPSBcIkFERF9BVFRFTlRJT05fV0lUQ0hfUFJPSkVDVFwiO1xyXG5leHBvcnQgY29uc3QgQ0FOQ0VMX0FUVEVOVElPTl9XSVRDSF9QUk9KRUNUID0gXCJDQU5DRUxfQVRURU5USU9OX1dJVENIX1BST0pFQ1RcIjtcclxuZXhwb3J0IGNvbnN0IEdFVF9QUk9KRUNUX0NSRUFURV9JTkZPX0JZX0lEID0gXCJHRVRfUFJPSkVDVF9DUkVBVEVfSU5GT19CWV9JRFwiO1xyXG5leHBvcnQgY29uc3QgQ1JFQVRFX1BST0pFQ1QgPSBcIkNSRUFURV9QUk9KRUNUXCI7XHJcbmV4cG9ydCBjb25zdCBPUEVOX1BST0pFQ1QgPSBcIk9QRU5fUFJPSkVDVFwiO1xyXG5leHBvcnQgY29uc3QgUFJPSkVDVF9VU0VSSU5GTyA9IFwiUFJPSkVDVF9VU0VSSU5GT1wiO1xyXG5leHBvcnQgY29uc3QgUFJPSkVDVF9TRUxFQ1RfTElTVENPVU5UID0gXCJQUk9KRUNUX1NFTEVDVF9MSVNUQ09VTlRcIjtcclxuLy8g6I635Y+W6aG555uu5YiX6KGoXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRQcm9qZWN0TGlzdEJ5VHlwZUp1cmlzZGljdGlvbihcclxuXHRkYXRhLFxyXG5cdHBhZ2VObyxcclxuXHRwYWdlU2l6ZSA9IDUwLFxyXG5cdGZuXHJcbikge1xyXG5cdHJldHVybiBkaXNwYXRjaCA9PiB7XHJcblx0XHRIdHRwQ2xpZW50LkFqYXhQb3N0U3luYyhcclxuXHRcdFx0XCIvcHJvamVjdC9nZXRQcm9qZWN0SWRzP3BhZ2VObz1cIiArXHJcblx0XHRcdFx0cGFnZU5vICtcclxuXHRcdFx0XHRcIiZwYWdlU2l6ZT1cIiArXHJcblx0XHRcdFx0cGFnZVNpemUsXHJcblx0XHRcdGRhdGEsXHJcblx0XHRcdGxpc3QgPT4ge1xyXG5cdFx0XHRcdGlmIChmbikge1xyXG5cdFx0XHRcdFx0Zm4oKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ZGlzcGF0Y2goXHJcblx0XHRcdFx0XHRjb250ZW50KGxpc3QsIFBST0pFQ1RfTElTVF9KVVJJU0RJQ1RJT04pXHJcblx0XHRcdFx0KTtcclxuXHRcdFx0fVxyXG5cdFx0KTtcclxuXHR9O1xyXG59XHJcbi8vIOiOt+WPlumhueebruWIl+ihqFxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0UHJvamVjdExpc3RCeVR5cGUoZGF0YSwgcGFnZU5vLCBwYWdlU2l6ZSA9IDUwLCBmbikge1xyXG5cdHJldHVybiBkaXNwYXRjaCA9PiB7XHJcblx0XHRIdHRwQ2xpZW50LkFqYXhQb3N0U3luYyhcclxuXHRcdFx0XCIvcHJvamVjdC9wcm9qZWN0UGFnZUluZGV4P3BhZ2VObz1cIiArXHJcblx0XHRcdFx0cGFnZU5vICtcclxuXHRcdFx0XHRcIiZwYWdlU2l6ZT1cIiArXHJcblx0XHRcdFx0cGFnZVNpemUsXHJcblx0XHRcdGRhdGEsXHJcblx0XHRcdGxpc3QgPT4ge1xyXG5cdFx0XHRcdGlmIChmbikge1xyXG5cdFx0XHRcdFx0Zm4obGlzdCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdC8vIGRpc3BhdGNoKGNvbnRlbnQobGlzdCwgUFJPSkVDVF9MSVNUKSk7XHJcblx0XHRcdH1cclxuXHRcdCk7XHJcblx0fTtcclxufVxyXG4vL+S/neWtmOmAieaLqeeahOi0n+i0o+S6uuivpue7huS/oeaBr1xyXG5leHBvcnQgZnVuY3Rpb24gc2F2ZVByb2plY3RVc2VySW5mbyhkYXRhKSB7XHJcblx0cmV0dXJuIHtcclxuXHRcdHR5cGU6IFBST0pFQ1RfVVNFUklORk8sXHJcblx0XHRwYXlsb2FkOiBkYXRhXHJcblx0fTtcclxufVxyXG4vL+mAieaLqeadoeS7tueahOaAu+WIl+ihqOaVsOebrlxyXG5leHBvcnQgZnVuY3Rpb24gc2F2ZVByb2plY3RTZWxlY3RMaXN0Q291bnQoZGF0YSkge1xyXG5cdHJldHVybiB7XHJcblx0XHR0eXBlOiBcIlBST0pFQ1RfU0VMRUNUX0xJU1RDT1VOVFwiLFxyXG5cdFx0cGF5bG9hZDogZGF0YVxyXG5cdH07XHJcbn1cclxuXHJcbi8v6I635Y+W6aG555uu6K+m5oOFXHJcbmV4cG9ydCBmdW5jdGlvbiBwcm9qZWN0RGV0YWlscyhpZCwgZm4pIHtcclxuXHRyZXR1cm4gZGlzcGF0Y2ggPT4ge1xyXG5cdFx0SHR0cENsaWVudC5BamF4UG9zdChcclxuXHRcdFx0XCIvcHJvamVjdC9wcm9qZWN0RGV0YWlscz9pZD1cIiArIGlkLFxyXG5cdFx0XHRcIlwiLFxyXG5cdFx0XHRsaXN0ID0+IHtcclxuXHRcdFx0XHRpZiAoZm4pIHtcclxuXHRcdFx0XHRcdGZuKCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGRpc3BhdGNoKGNvbnRlbnQobGlzdCwgUFJPSkVDVF9ERVRBSUxTKSk7XHJcblx0XHRcdH1cclxuXHRcdCk7XHJcblx0fTtcclxufVxyXG4vL+S/ruaUuemhueebrlxyXG5leHBvcnQgZnVuY3Rpb24gcHJvamVjdFVwZGF0ZUFsbChwcm9qZWN0LCBmbikge1xyXG5cdHJldHVybiBkaXNwYXRjaCA9PiB7XHJcblx0XHRIdHRwQ2xpZW50LkFqYXhQb3N0KFwiL3Byb2plY3QvcHJvamVjdFVwZGF0ZVwiLCBwcm9qZWN0LCBsaXN0ID0+IHtcclxuXHRcdFx0aWYgKGZuKSB7XHJcblx0XHRcdFx0Zm4oKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRkaXNwYXRjaChjb250ZW50KGxpc3QsIFBST0pFQ1RfVVBERVRfQUxMKSk7XHJcblx0XHR9KTtcclxuXHR9O1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBjb250ZW50KGRhdGEsIHR5cGUpIHtcclxuXHRyZXR1cm4ge1xyXG5cdFx0dHlwZTogdHlwZSxcclxuXHRcdHBheWxvYWQ6IGRhdGFcclxuXHR9O1xyXG59XHJcblxyXG4vLyDlhbPms6jpobnnm65cclxuZXhwb3J0IGZ1bmN0aW9uIGFkZEF0dGVudGlvbldpdGNoUHJvamVjdChvYmplY3RJZCwgZm4pIHtcclxuXHRjb25zdCBkYXRhID0geyBydHlwZTogXCJhXCIsIG9iamVjdElkOiBvYmplY3RJZCB9O1xyXG5cdHJldHVybiBkaXNwYXRjaCA9PiB7XHJcblx0XHRIdHRwQ2xpZW50LkFqYXhQb3N0KFwiL2NvbGxlY3QvY29sbGVjdFwiLCBkYXRhLCBsaXN0ID0+IHtcclxuXHRcdFx0aWYgKGZuKSB7XHJcblx0XHRcdFx0Zm4obGlzdCk7XHJcblx0XHRcdH1cclxuXHRcdFx0Ly8gZGlzcGF0Y2goY29udGVudChsaXN0LCBBRERfQVRURU5USU9OX1dJVENIX1BST0pFQ1QpKTtcclxuXHRcdH0pO1xyXG5cdH07XHJcbn1cclxuLy8g5Y+W5raI5YWz5rOo6aG555uuXHJcbmV4cG9ydCBmdW5jdGlvbiBjYW5jZWxBdHRlbnRpb25XaXRjaFByb2plY3Qob2JqZWN0SWQsIGZuKSB7XHJcblx0Y29uc3QgZGF0YSA9IHsgcnR5cGU6IFwiYVwiLCBvYmplY3RJZDogb2JqZWN0SWQgfTtcclxuXHRyZXR1cm4gZGlzcGF0Y2ggPT4ge1xyXG5cdFx0SHR0cENsaWVudC5BamF4UG9zdChcIi9jb2xsZWN0L2NhbGxDb2xsZWN0XCIsIGRhdGEsIGxpc3QgPT4ge1xyXG5cdFx0XHRpZiAoZm4pIHtcclxuXHRcdFx0XHRmbihsaXN0KTtcclxuXHRcdFx0fVxyXG5cdFx0XHQvLyBkaXNwYXRjaChjb250ZW50KGxpc3QsIENBTkNFTF9BVFRFTlRJT05fV0lUQ0hfUFJPSkVDVCkpO1xyXG5cdFx0fSk7XHJcblx0fTtcclxufVxyXG5cclxuLy8g6I635Y+W6aG555uu6K6+572u55qE5pWw5o2uXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRQcm9qZWN0Q3JlYXRlSW5mb0J5SWQoaWQsIGZuKSB7XHJcblx0cmV0dXJuIGRpc3BhdGNoID0+IHtcclxuXHRcdEh0dHBDbGllbnQuQWpheFBvc3QoXHJcblx0XHRcdFwiL3Byb2plY3QvcHJvamVjdERldGFpbHNOZXc/aWQ9XCIgKyBpZCxcclxuXHRcdFx0XCJcIixcclxuXHRcdFx0bGlzdCA9PiB7XHJcblx0XHRcdFx0aWYgKGZuKSB7XHJcblx0XHRcdFx0XHRmbigpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRkaXNwYXRjaChcclxuXHRcdFx0XHRcdGNvbnRlbnQoXHJcblx0XHRcdFx0XHRcdGxpc3QsXHJcblx0XHRcdFx0XHRcdEdFVF9QUk9KRUNUX0NSRUFURV9JTkZPX0JZX0lEXHJcblx0XHRcdFx0XHQpXHJcblx0XHRcdFx0KTtcclxuXHRcdFx0fVxyXG5cdFx0KTtcclxuXHR9O1xyXG59XHJcbi8vIOiOt+WPlumhueebruiuvue9rueahOaVsOaNrizov5Tlm57moLzlvI/lkozliJfooajmoLzlvI/nm7jlkIzvvIzlsLHmmK/kuLrkuobmm7TmlrDliJfooajnmoRcclxuZXhwb3J0IGZ1bmN0aW9uIGdldFByb2plY3RDcmVhdGVJbmZvQnlJZDIoaWQsIGZuKSB7XHJcblx0cmV0dXJuIGRpc3BhdGNoID0+IHtcclxuXHRcdEh0dHBDbGllbnQuQWpheFBvc3QoXHJcblx0XHRcdFwiL3Byb2plY3QvZ2V0UHJvamVjdEJ5SWQ/aWQ9XCIgKyBpZCxcclxuXHRcdFx0XCJcIixcclxuXHRcdFx0bGlzdCA9PiB7XHJcblx0XHRcdFx0aWYgKGZuKSB7XHJcblx0XHRcdFx0XHRmbihsaXN0KTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdCk7XHJcblx0fTtcclxufVxyXG4vLyDliJvlu7rkv67mlLnpobnnm65cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVByb2plY3QoZGF0YSwgZm4pIHtcclxuXHRyZXR1cm4gZGlzcGF0Y2ggPT4ge1xyXG5cdFx0SHR0cENsaWVudC5BamF4UG9zdChcIi9wcm9qZWN0L3Byb2plY3RBZGROZXdcIiwgZGF0YSwgbGlzdCA9PiB7XHJcblx0XHRcdGlmIChmbikge1xyXG5cdFx0XHRcdGZuKGxpc3QpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGRpc3BhdGNoKGNvbnRlbnQobGlzdCwgQ1JFQVRFX1BST0pFQ1QpKTtcclxuXHRcdH0pO1xyXG5cdH07XHJcbn1cclxuXHJcbi8vIOS6uuWRmOS7u+WKoee7n+iuoVxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q2hhcnRCeVVzZXJUYXNrKGRhdGEsIGNhbGxiYWNrKSB7XHJcblx0SHR0cENsaWVudC5BamF4UG9zdChcIi9jYWxjdWxhdGUvZ2V0VGFza3RhYmxlQ291bnRcIiwgZGF0YSwgbGlzdCA9PiB7XHJcblx0XHRjYWxsYmFjayhsaXN0KTtcclxuXHR9KTtcclxufVxyXG5cclxuLy8g5Lq65ZGY57up5pWI57uf6K6hXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRDaGFydEJ5VXNlck1vbmV5KGRhdGEsIGNhbGxiYWNrKSB7XHJcblx0SHR0cENsaWVudC5BamF4UG9zdChcIi9jYWxjdWxhdGUvZ2V0Q29udGVuVGFibGVEYXRhXCIsIGRhdGEsIGxpc3QgPT4ge1xyXG5cdFx0Y2FsbGJhY2sobGlzdCk7XHJcblx0fSk7XHJcbn1cclxuXHJcbi8vIOS7u+WKoeamgui/sOe7n+iuoVxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q2hhcnRCeVRhc2tTaXR1YXRpb24oaWQsIGNhbGxiYWNrKSB7XHJcblx0SHR0cENsaWVudC5BamF4UG9zdChcIi9jYWxjdWxhdGUvcHJvamVjdD9pZD1cIiArIGlkLCBcIlwiLCBsaXN0ID0+IHtcclxuXHRcdGNhbGxiYWNrKGxpc3QpO1xyXG5cdH0pO1xyXG59XHJcblxyXG4vLyDpobnnm67ov5vlsZXnu5/orqFcclxuZXhwb3J0IGZ1bmN0aW9uIGdldENoYXJ0QnlQcm9qZWN0UHJvZ3Jlc3MoZGF0YSwgY2FsbGJhY2spIHtcclxuXHRIdHRwQ2xpZW50LkFqYXhQb3N0KFwiL2NhbGN1bGF0ZS9nZXRQcm9ncmVzc1ZpZXdcIiwgZGF0YSwgbGlzdCA9PiB7XHJcblx0XHRjYWxsYmFjayhsaXN0KTtcclxuXHR9KTtcclxufVxyXG5cclxuLy8g5b2T5YmN5omT5byA55qE6aG555uuXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRPcGVuUHJvamVjdChwcm9qZWN0KSB7XHJcblx0cmV0dXJuIGRpc3BhdGNoID0+IHtcclxuXHRcdGRpc3BhdGNoKGNvbnRlbnQocHJvamVjdCwgT1BFTl9QUk9KRUNUKSk7XHJcblx0fTtcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hY3Rpb25zL3Byb2plY3QuanMiLCJpbXBvcnQgSHR0cENsaWVudCBmcm9tIFwiLi4vYXBpL2h0dHBDbGllbnRcIjtcclxuZXhwb3J0IGNvbnN0IFBJRV9DSEFUID0gXCJQSUVfQ0hBVFwiO1xyXG5leHBvcnQgY29uc3QgUEVOX1BST0pFQ1QgPSBcIlBFTl9QUk9KRUNUXCI7XHJcbmV4cG9ydCBjb25zdCBQRU5fUEVSU09OID0gXCJQRU5fUEVSU09OXCI7XHJcbmV4cG9ydCBjb25zdCBUQVNLX05VTVNfUFJPSkVDVCA9IFwiVEFTS19OVU1TX1BST0pFQ1RcIjtcclxuZXhwb3J0IGNvbnN0IFRBU0tfTlVNU19QRVJTT04gPSBcIlRBU0tfTlVNU19QRVJTT05cIjtcclxuXHJcbmV4cG9ydCBjb25zdCBQRVJGT1JNX1RZUEUgPSBcIlBFUkZPUk1fVFlQRVwiO1xyXG5leHBvcnQgY29uc3QgTU9OVEhfVFlQRSA9IFwiTU9OVEhfVFlQRVwiO1xyXG5cclxuZXhwb3J0IGNvbnN0IFNUX1BST0pFQ1RfTElTVCA9IFwiU1RfUFJPSkVDVF9MSVNUXCI7XHJcblxyXG5leHBvcnQgY29uc3QgUFJPSkVDVF9UWVBFID0gXCJQUk9KRUNUX1RZUEVcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBQUk9KRUNUX0lEUyA9IFwiUFJPSkVDVF9JRFNcIjtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjb250ZW50KGRhdGEsIHR5cGUpIHtcclxuICByZXR1cm4ge1xyXG4gICAgdHlwZTogdHlwZSxcclxuICAgIHBheWxvYWQ6IGRhdGFcclxuICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0QWxsVGFza0Rpc3RyaWJ1dGVkQnlTdGF0ZShkYXRhID0ge30sIGZuKSB7XHJcbiAgSHR0cENsaWVudC5BamF4UG9zdChcIi9jYWxjdWxhdGUvZ2V0VGFza0Rpc3RyaWJ1dGVkQnlTdGF0ZVwiLCBkYXRhLCBsaXN0ID0+IHtcclxuICAgIGlmIChmbikge1xyXG4gICAgICBpZiAobGlzdCAmJiBsaXN0LmRhdGEpIHtcclxuICAgICAgICBmbihsaXN0LmRhdGEpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRBbGxQZW5kU3RhdGlzdGljcyhkYXRhID0ge30sIGZuKSB7XHJcbiAgSHR0cENsaWVudC5BamF4UG9zdChcIi9jYWxjdWxhdGUvZ2V0UGVuZFN0YXRpc3RpY3NcIiwgZGF0YSwgbGlzdCA9PiB7XHJcbiAgICBpZiAoZm4pIHtcclxuICAgICAgZm4obGlzdC5kYXRhKTtcclxuICAgIH1cclxuICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEFsbE51bUJ5UGVyc29uKGRhdGEgPSB7fSwgZm4pIHtcclxuICBIdHRwQ2xpZW50LkFqYXhQb3N0KFwiL2NhbGN1bGF0ZS9nZXRDb250ZW50QnlQZXJzb25cIiwgZGF0YSwgbGlzdCA9PiB7XHJcbiAgICBpZiAoZm4pIHtcclxuICAgICAgZm4obGlzdC5kYXRhKTtcclxuICAgIH1cclxuICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEFsbE51bUJ5UHJvamVjdChkYXRhID0ge30sIGZuKSB7XHJcbiAgSHR0cENsaWVudC5BamF4UG9zdChcIi9jYWxjdWxhdGUvZ2V0TnVtQnlQZXJzb25cIiwgZGF0YSwgbGlzdCA9PiB7XHJcbiAgICBpZiAoZm4pIHtcclxuICAgICAgZm4obGlzdC5kYXRhKTtcclxuICAgIH1cclxuICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFRhc2tEaXN0cmlidXRlZEJ5U3RhdGUocHJvamVjdElkcyA9IHt9LCBjYWxsYmFjaykge1xyXG4gIHJldHVybiBkaXNwYXRjaCA9PiB7XHJcbiAgICBIdHRwQ2xpZW50LkFqYXhQb3N0KFxyXG4gICAgICBcIi9jYWxjdWxhdGUvZ2V0VGFza0Rpc3RyaWJ1dGVkQnlTdGF0ZVwiLFxyXG4gICAgICBwcm9qZWN0SWRzLFxyXG4gICAgICBsaXN0ID0+IHtcclxuICAgICAgICBpZiAoY2FsbGJhY2spIGNhbGxiYWNrKCk7XHJcbiAgICAgICAgbGV0IGRhdGEgPSBbXTtcclxuICAgICAgICBpZiAobGlzdCAmJiBsaXN0LmRhdGEgJiYgbGlzdC5kYXRhLmRhdGEpIHtcclxuICAgICAgICAgIGRhdGEgPSBsaXN0LmRhdGEuZGF0YTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZGlzcGF0Y2goY29udGVudChkYXRhLCBQSUVfQ0hBVCkpO1xyXG4gICAgICB9XHJcbiAgICApO1xyXG4gIH07XHJcbn1cclxuXHJcbi8v5qC55o2u6aG555uuaWTmn6Xor6LlvoXlip7nu5/orqHvvIjmjInpobnnm67vvIlcclxuLy8gZXhwb3J0IGZ1bmN0aW9uIGdldFByb2plY3RTdGF0aXN0aWNzKHByb2plY3RJZHMgPSB7fSkge1xyXG4vLyAgIHJldHVybiBkaXNwYXRjaCA9PiB7XHJcbi8vICAgICBIdHRwQ2xpZW50LkFqYXhQb3N0KFwiL3Byb2plY3QvZ2V0U3RhdGlzdGljc0luZGV4XCIsIHt9LCBsaXN0ID0+IHtcclxuLy8gICAgICAgZGlzcGF0Y2goY29udGVudChsaXN0LmRhdGEsIFBJRV9DSEFUKSk7XHJcbi8vICAgICB9KTtcclxuLy8gICB9O1xyXG4vLyB9XHJcblxyXG4vL+agueaNrumhueebrmlk5p+l6K+i5b6F5Yqe57uf6K6h77yI5oyJ5Lq65ZGY77yJXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRQZW5kU3RhdGlzdGljcyhwcm9qZWN0SWRzID0ge30pIHtcclxuICByZXR1cm4gZGlzcGF0Y2ggPT4ge1xyXG4gICAgSHR0cENsaWVudC5BamF4UG9zdChcIi9jYWxjdWxhdGUvZ2V0UGVuZFN0YXRpc3RpY3NcIiwgcHJvamVjdElkcywgbGlzdCA9PiB7XHJcbiAgICAgIGRpc3BhdGNoKGNvbnRlbnQobGlzdC5kYXRhLCBQRU5fUEVSU09OKSk7XHJcbiAgICB9KTtcclxuICB9O1xyXG59XHJcblxyXG4vL+W+heWKnue7n+iuoSDmjInpobnnm65cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFBlbmRCeVByb2plY3QoZGF0YSA9IHt9KSB7XHJcbiAgcmV0dXJuIGRpc3BhdGNoID0+IHtcclxuICAgIEh0dHBDbGllbnQuQWpheFBvc3QoXCIvY2FsY3VsYXRlL2dldFBlbmRCeVByb2plY3RcIiwgZGF0YSwgbGlzdCA9PiB7XHJcbiAgICAgIGRpc3BhdGNoKGNvbnRlbnQobGlzdC5kYXRhLCBQRU5fUFJPSkVDVCkpO1xyXG4gICAgfSk7XHJcbiAgfTtcclxufVxyXG5cclxuLy/moLnmja7pobnnm65pZOafpeivoiDnu6nmlYjnu5/orqEo57up5pWI5YC8KSDmjInkurrlkZhcclxuZXhwb3J0IGZ1bmN0aW9uIGdldE51bUJ5UHJvamVjdChkYXRhID0ge30pIHtcclxuICByZXR1cm4gZGlzcGF0Y2ggPT4ge1xyXG4gICAgSHR0cENsaWVudC5BamF4UG9zdChcIi9jYWxjdWxhdGUvZ2V0TnVtQnlQZXJzb25cIiwgZGF0YSwgbGlzdCA9PiB7XHJcbiAgICAgIGRpc3BhdGNoKGNvbnRlbnQobGlzdC5kYXRhLCBUQVNLX05VTVNfUFJPSkVDVCkpO1xyXG4gICAgfSk7XHJcbiAgfTtcclxufVxyXG4vL+e7qeaViOaMieS6uuWRmHRhc2tQZXJzb25MaXN0XHJcbmV4cG9ydCBmdW5jdGlvbiBnZXROdW1CeVBlcnNvbihkYXRhID0ge30pIHtcclxuICByZXR1cm4gZGlzcGF0Y2ggPT4ge1xyXG4gICAgSHR0cENsaWVudC5BamF4UG9zdChcIi9jYWxjdWxhdGUvZ2V0Q29udGVudEJ5UGVyc29uXCIsIGRhdGEsIGxpc3QgPT4ge1xyXG4gICAgICBkaXNwYXRjaChjb250ZW50KGxpc3QuZGF0YSwgVEFTS19OVU1TX1BFUlNPTikpO1xyXG4gICAgfSk7XHJcbiAgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFByb2plY3RSZXN1bHQoZGF0YSA9IHt9LCBmbikge1xyXG4gIGNvbnN0IHByb2plY3RUeXBlID0gZGF0YS50eXBlO1xyXG4gIHJldHVybiBkaXNwYXRjaCA9PiB7XHJcbiAgICBIdHRwQ2xpZW50LkFqYXhQb3N0KFwiL3Byb2plY3QvZ2V0UHJvamVjdFJlc3VsdFwiLCBkYXRhLCBsaXN0ID0+IHtcclxuICAgICAgbGV0IHByb2plY3RMaXN0ID0gW107XHJcbiAgICAgIGlmIChsaXN0LmRhdGEgJiYgbGlzdC5kYXRhLnByb2plY3RMaXN0KSB7XHJcbiAgICAgICAgcHJvamVjdExpc3QgPSBsaXN0LmRhdGEucHJvamVjdExpc3Q7XHJcbiAgICAgIH1cclxuICAgICAgZGlzcGF0Y2goY29udGVudChwcm9qZWN0TGlzdCwgU1RfUFJPSkVDVF9MSVNUKSk7XHJcbiAgICAgIGRpc3BhdGNoKGNvbnRlbnQocHJvamVjdFR5cGUsIFBST0pFQ1RfVFlQRSkpO1xyXG4gICAgICBpZiAoZm4pIHtcclxuICAgICAgICBpZiAobGlzdC5kYXRhICYmIGxpc3QuZGF0YS5wcm9qZWN0TGlzdCkge1xyXG4gICAgICAgICAgZm4ocHJvamVjdExpc3QpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNhdmVQcm9qZWN0UmVzdWx0KGRhdGEgPSB7fSkge1xyXG4gIHJldHVybiBkaXNwYXRjaCA9PiB7XHJcbiAgICBkaXNwYXRjaChjb250ZW50KGRhdGEucHJvamVjdExpc3QsIFNUX1BST0pFQ1RfTElTVCkpO1xyXG4gICAgZGlzcGF0Y2goY29udGVudChkYXRhLnByb2plY3RJZHMsIFBST0pFQ1RfSURTKSk7XHJcbiAgICBkaXNwYXRjaChjb250ZW50KGRhdGEucHJvamVjdFR5cGUsIFBST0pFQ1RfVFlQRSkpO1xyXG4gIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRQcm9qZWN0TGlzdChkYXRhID0ge30sIGZuKSB7XHJcbiAgSHR0cENsaWVudC5BamF4UG9zdChcIi9wcm9qZWN0L2dldFByb2plY3RSZXN1bHRcIiwgZGF0YSwgbGlzdCA9PiB7XHJcbiAgICBpZiAoZm4pIHtcclxuICAgICAgZm4obGlzdC5kYXRhLnByb2plY3RMaXN0KTtcclxuICAgIH1cclxuICB9KTtcclxufVxyXG5cclxuLy/lrZhcclxuZXhwb3J0IGZ1bmN0aW9uIHNhdmVNb250aFR5cGUoZGF0YSkge1xyXG4gIHJldHVybiBkaXNwYXRjaCA9PiB7XHJcbiAgICBkaXNwYXRjaChjb250ZW50KGRhdGEsIE1PTlRIX1RZUEUpKTtcclxuICB9O1xyXG59XHJcblxyXG4vL+WtmFxyXG5leHBvcnQgZnVuY3Rpb24gc2F2ZVBlcmZvcm1UeXBlKGRhdGEpIHtcclxuICByZXR1cm4gZGlzcGF0Y2ggPT4ge1xyXG4gICAgZGlzcGF0Y2goY29udGVudChkYXRhLCBQRVJGT1JNX1RZUEUpKTtcclxuICB9O1xyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FjdGlvbnMvc3RhdGlzdGljcy5qcyIsImltcG9ydCBIdHRwQ2xpZW50IGZyb20gJy4uL2FwaS9odHRwQ2xpZW50J1xyXG5leHBvcnQgY29uc3QgRlJFRV9MSU1JVCA9ICdGUkVFX0xJTUlUJztcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjb250ZW50KGRhdGEsIHR5cGUpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgdHlwZTogdHlwZSxcclxuICAgICAgICBwYXlsb2FkOiBkYXRhXHJcbiAgICB9XHJcbn1cclxuLy/lhY3otLnniYh0YXNr6ZmQ5Yi2XHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRMaW10VGFzayhjYWxsYmFjayl7XHJcbiAgICBIdHRwQ2xpZW50LkFqYXhHZXQoJy90YXNraW5mby90YXNrQ291bnRMaW1pdCcgLCBsaXN0ID0+e1xyXG4gICAgICAgIGNhbGxiYWNrKGxpc3QpXHJcbiAgICB9KVxyXG59XHJcbi8v5YWN6LS554mIcHJvamVjdOmZkOWItlxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0TGltdFByb2plY3QoY2FsbGJhY2spe1xyXG4gICAgSHR0cENsaWVudC5BamF4R2V0KCcvcHJvamVjdC9wcm9qZWN0Q291bnRMaW1pdCcgLCBsaXN0ID0+e1xyXG4gICAgICAgIGNhbGxiYWNrKGxpc3QpXHJcbiAgICB9KVxyXG59XHJcbi8vIOWIh+aNouWFjei0ueeJiFxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0RnJlZUxpbWl0KGNhbGxiYWNrKSB7XHJcbiAgICBIdHRwQ2xpZW50LkFqYXhHZXQoJy90aW1lL2NyZWF0ZUZyZWVPcmRlcicsIGxpc3QgPT4ge1xyXG4gICAgICAgIGNhbGxiYWNrKGxpc3QpO1xyXG4gICAgfSk7XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYWN0aW9ucy92ZXJzaW9uLmpzIiwiaW1wb3J0IFwiaXNvbW9ycGhpYy1mZXRjaFwiO1xyXG5pbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGZXRjaEZuIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICBzdGF0aWMgZmV0Y2hGbihvcHQsIGNiLCBlcnJvcikge1xyXG4gICAgbGV0IHR5cGUgPSBvcHQudHlwZTtcclxuICAgIGxldCBvcHRpb24gPSB7IG1ldGhvZDogXCJnZXRcIiwgY3JlZGVudGlhbHM6IFwiaW5jbHVkZVwiIH07XHJcbiAgICBvcHRpb24uaGVhZGVycyA9IG5ldyBIZWFkZXJzKHtcclxuICAgICAgQWNjZXB0OiBcImFwcGxpY2F0aW9uL2pzb24sdGV4dC9wbGFpbiwgKi8qXCIsXHJcbiAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxyXG4gICAgICBDb25uZWN0aW9uOiBcImNsb3NlXCIsXHJcbiAgICAgIHR5cGU6IFwiZ2V0VXNlckRhdGFcIlxyXG4gICAgfSk7XHJcbiAgICBpZiAodHlwZSA9PSBcInBvc3RcIikge1xyXG4gICAgICBvcHRpb24ubWV0aG9kID0gXCJwb3N0XCI7XHJcbiAgICAgIG9wdGlvbi5ib2R5ID0gSlNPTi5zdHJpbmdpZnkob3B0LmRhdGEpO1xyXG4gICAgfVxyXG4gICAgaWYgKHR5cGUgPT0gXCJmaWxlXCIpIHtcclxuICAgICAgb3B0aW9uLm1ldGhvZCA9IFwicG9zdFwiO1xyXG4gICAgICBvcHRpb24uYm9keSA9IG9wdC5kYXRhO1xyXG4gICAgfVxyXG4gICAgZmV0Y2gob3B0LnVybCwgb3B0aW9uKVxyXG4gICAgICAudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xyXG4gICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPj0gMjAwICYmIHJlc3BvbnNlLnN0YXR1cyA8IDMwMCkge1xyXG4gICAgICAgICAgbGV0IGRhdGEgPSByZXNwb25zZS5qc29uKCk7XHJcbiAgICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgICBlcnJvcihyZXNwb25zZS5zdGF0dXNUZXh0KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2Uuc3RhdHVzVGV4dCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgICAudGhlbihmdW5jdGlvbihqc29uKSB7XHJcbiAgICAgICAgaWYgKGNiKSBjYihqc29uKTtcclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKGZ1bmN0aW9uKGV4KSB7XHJcbiAgICAgICAgaWYgKGV4LmRlc2NyaXB0aW9uID09IFwi5peg5pWI5a2X56ymXCIpIHtcclxuICAgICAgICAgIGlmIChlcnJvcikgZXJyb3IoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG9wdC50eXBlID09IFwiZ2V0XCIpIHtcclxuICAgICAgICAgIGlmIChlcnJvcikgZXJyb3IoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgICBpZiAoZXJyb3IpIGVycm9yKGV4KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGUgPT0gXCJwb3N0XCIpIHtcclxuICAgICAgICAgIGlmIChlcnJvcikgZXJyb3IoXCI0MDRcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi6YCa5L+h5aSx6LSlXCIsIGV4KTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwaS9mZXRjaEZuLmpzIiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgTG9jYWxlUHJvdmlkZXIgfSBmcm9tICdhbnRkLW1vYmlsZSdcbmltcG9ydCBlblVTIGZyb20gJ2FudGQtbW9iaWxlL2xpYi9sb2NhbGUtcHJvdmlkZXIvZW5fVVMnXG5pbXBvcnQgTlByb2dyZXNzIGZyb20gJ25wcm9ncmVzcydcbmltcG9ydCBSb3V0ZXIgZnJvbSAnbmV4dC9yb3V0ZXInXG5OUHJvZ3Jlc3MuY29uZmlndXJlKHtcbiAgdGVtcGxhdGU6IFwiPGRpdiBjbGFzcz0nbW9yZSBtb3JlLWxvZ2luJyAgPiAgPGRpdiByb2xlPSdiYXInIHN0eWxlPSdkaXNwbGF5OiBub25lJz48L2Rpdj48ZGl2IGNsYXNzPSdib3VuY2UxJyAgPjwvZGl2PjxkaXYgY2xhc3M9J2JvdW5jZTInPjwvZGl2PjxkaXYgY2xhc3M9J2JvdW5jZTMnPjwvZGl2PjwvZGl2PlwiXG59KTtcbi8vd2luZG93LnNlc3Npb25TdG9yYWdlXG5Sb3V0ZXIub25Sb3V0ZUNoYW5nZVN0YXJ0ID0gKHVybCkgPT4geyB1cmwhPVJvdXRlci5yb3V0ZXIuYXNQYXRoP05Qcm9ncmVzcy5zdGFydCgpOicnfVxuLy9Sb3V0ZXIub25Sb3V0ZUNoYW5nZUNvbXBsZXRlID0gKCkgPT4gTlByb2dyZXNzLmRvbmUoKVxuUm91dGVyLm9uUm91dGVDaGFuZ2VFcnJvciA9ICgpID0+TlByb2dyZXNzLmRvbmUoKVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMYXlvdXQgZXh0ZW5kcyBDb21wb25lbnQge1xuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHsgbGFuZ3VhZ2UsIGNoaWxkcmVuIH0gPSB0aGlzLnByb3BzXG4gICAgY29uc3QgbG9jYWxlID0gbGFuZ3VhZ2UgPyAobGFuZ3VhZ2Uuc3Vic3RyKDAsIDIpID09PSAnZW4nID8gZW5VUyA6IHVuZGVmaW5lZCkgOiB1bmRlZmluZWRcbiAgICBcbiAgICByZXR1cm4gKFxuICAgICAgPExvY2FsZVByb3ZpZGVyIGxvY2FsZT17bG9jYWxlfT5cbiAgICAgICAge2NoaWxkcmVufVxuICAgICAgPC9Mb2NhbGVQcm92aWRlcj5cbiAgICApXG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvbXBvbmVudHMvTGF5b3V0LmpzIiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0J1xyXG5cclxuaW1wb3J0IHN0eWxlc2hlZXQgZnJvbSAnc3R5bGVzL2NvbXBvbmVudHMvbG9hZGluZy5zY3NzJ1xyXG5cclxuXHJcbi8qXHJcbiAqICAoIOW/heWhqyApIHNob3c6IOaYr+WQpua4suafk2xvYWRpbmfnu4Tku7ZcclxuICogICgg6YCJ5aGrICkgY2xhc3NTdHLvvJrlsLrlr7jmoLflvI/vvIzpu5jorqTmsqHmnInvvIzlj6/pgInmi6kgbG9hZGluZ19taW5TaXplXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb2FkaW5nIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuXHRjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG5cdFx0c3VwZXIocHJvcHMpXHJcblx0XHR0aGlzLnN0YXRlID0ge1xyXG5cdFx0XHRzaG93OmZhbHNlLFxyXG5cdFx0XHRjbGFzc1N0cjpcImxvYWRfbG9hZGluZ1wiXHJcblx0XHR9O1xyXG5cdH1cclxuXHRcclxuXHRjb21wb25lbnRXaWxsTW91bnQoKSB7XHJcblx0XHRpZih0aGlzLnByb3BzLnNob3cpe1xyXG5cdFx0XHR0aGlzLnNldFN0YXRlKHtzaG93OnRydWV9KTtcclxuXHRcdH1lbHNle1xyXG5cdFx0XHRjb25zdCBfdGhpcyA9IHRoaXM7XHJcblx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuXHRcdFx0ICBfdGhpcy5zZXRTdGF0ZSh7c2hvdzpmYWxzZX0pO1xyXG5cdFx0XHR9LCA1MCk7XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdGlmKHRoaXMucHJvcHMuY2xhc3NTdHIpe1xyXG5cdFx0XHR0aGlzLnNldFN0YXRlKHtjbGFzc1N0cjpcImxvYWRfbG9hZGluZyBcIit0aGlzLnByb3BzLmNsYXNzU3RyfSk7XHJcblx0XHR9XHJcblx0fVxyXG5cdFxyXG5cdGNvbXBvbmVudERpZE1vdW50KCkge1xyXG5cdH1cclxuXHJcblx0Y29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcclxuXHRcdGlmKG5leHRQcm9wcy5zaG93KXtcclxuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7c2hvdzp0cnVlfSk7XHJcblx0XHR9ZWxzZXtcclxuXHRcdFx0Y29uc3QgX3RoaXMgPSB0aGlzO1xyXG5cdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcblx0XHRcdCAgX3RoaXMuc2V0U3RhdGUoe3Nob3c6ZmFsc2V9KTtcclxuXHRcdFx0fSwgNTApO1xyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRpZihuZXh0UHJvcHMuY2xhc3NTdHIpe1xyXG5cdFx0XHR0aGlzLnNldFN0YXRlKHtjbGFzc1N0cjpcImxvYWRfbG9hZGluZyBcIituZXh0UHJvcHMuY2xhc3NTdHJ9KTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHJlbmRlcigpIHtcclxuXHRcdGlmKHRoaXMuc3RhdGUuc2hvdyl7XHRcdFx0XHJcblx0XHRcdHJldHVybiAoXHJcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9e3RoaXMuc3RhdGUuY2xhc3NTdHJ9PlxyXG5cdFx0XHRcdFx0PHN0eWxlIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXt7IF9faHRtbDogc3R5bGVzaGVldCB9fSAvPlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJhbnQtc3BpbiBhbnQtc3Bpbi1zcGlubmluZ1wiPlxyXG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJhbnQtc3Bpbi1kb3QgYW50LXNwaW4tZG90LXNwaW5cIj5cclxuXHRcdFx0XHRcdFx0XHQ8aT48L2k+PGk+PC9pPjxpPjwvaT48aT48L2k+XHJcblx0XHRcdFx0XHRcdDwvc3Bhbj5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHQpXHJcblx0XHR9ZWxzZXtcclxuXHRcdFx0cmV0dXJuIG51bGxcdFxyXG5cdFx0fVx0XHRcclxuXHR9XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb21wb25lbnRzL0xvYWRpbmcuanMiLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IEljb24sIFBvcG92ZXIgfSBmcm9tIFwiYW50ZC1tb2JpbGVcIjtcclxuaW1wb3J0IFJvdXRlciBmcm9tIFwibmV4dC9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgaW5pdFN0b3JlIH0gZnJvbSBcIi4uL3N0b3JlXCI7XHJcbmltcG9ydCB3aXRoUmVkdXggZnJvbSBcIm5leHQtcmVkdXgtd3JhcHBlclwiO1xyXG5pbXBvcnQgQWxlcnQgZnJvbSBcIi4uL2NvbXBvbmVudHMvYWxlcnRcIjtcclxuaW1wb3J0ICogYXMgdmVyc2lvbkFjdGlvbiBmcm9tIFwiLi4vYWN0aW9ucy92ZXJzaW9uXCI7XHJcbmltcG9ydCB7IGdldExpbXRUYXNrLCBnZXRMaW10UHJvamVjdCB9IGZyb20gXCIuLi9hY3Rpb25zL3ZlcnNpb25cIjtcclxuaW1wb3J0IHsgYmluZEFjdGlvbkNyZWF0b3JzIH0gZnJvbSBcInJlZHV4XCI7XHJcbmltcG9ydCBTdG9yYWdlIGZyb20gXCIuLi91dGlscy9zdG9yYWdlXCI7XHJcbmltcG9ydCAqIGFzIHVzZXJBY3Rpb24gZnJvbSBcIi4uL2FjdGlvbnMvdXNlclwiO1xyXG5cclxuaW1wb3J0IHN0eWxlc2hlZXQgZnJvbSBcInN0eWxlcy9jb21wb25lbnRzL21lbnVCYXIuc2Nzc1wiO1xyXG5pbXBvcnQgdXRpbHMgZnJvbSBcIi4uL3V0aWxzL3V0aWxzXCI7XHJcbmltcG9ydCBEaW5ndGFsayBmcm9tIFwiLi4vdXRpbHMvZGluZ3RhbGtcIjtcclxuLy8gaW1wb3J0IHVzZXIgZnJvbSAnLi4vcmVkdWNlcnMvdXNlcic7XHJcbi8qXHJcbiAqICAoIOW/heWhqyApIHBhdGhOYW1lOiDot6/lvoTlkI3np7BcclxuICovXHJcbmNsYXNzIG1lbnVCYXIgZXh0ZW5kcyBDb21wb25lbnQge1xyXG5cdGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcblx0XHRzdXBlcihwcm9wcyk7XHJcblx0XHR0aGlzLnN0YXRlID0ge1xyXG5cdFx0XHRwYXRoTmFtZTogXCJcIixcclxuXHRcdFx0YWRkU2hvdzogZmFsc2UsIC8vIOa3u+WKoOWxguaYr+WQpuaYvuekulxyXG5cdFx0XHR0YXNrRnJlZTogXCJcIixcclxuXHRcdFx0cHJvamVjdEZyZWU6IGZhbHNlLFxyXG5cdFx0XHR0YXNrTGltaXQ6IFwiXCIsXHJcblx0XHRcdHByb2plY3RNYXg6IDAsXHJcblx0XHRcdHByb0FsZXJ0U2hvdzogZmFsc2UsXHJcblx0XHRcdHRhc0FsZXJ0U2hvdzogZmFsc2UsXHJcblx0XHRcdHN0YXRpc3RpY0FsZXJ0U2hvdzogZmFsc2UsXHJcblx0XHRcdHRhc2tNYXg6IFwiXCIsXHJcblx0XHRcdHVzZXI6IHt9LFxyXG5cdFx0XHRwcm9qZWN0TWF4OiBcIlwiXHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0Y29tcG9uZW50V2lsbE1vdW50KCkge1xyXG5cdFx0dGhpcy5zZXRTdGF0ZSh7IHBhdGhOYW1lOiB0aGlzLnByb3BzLnBhdGhOYW1lIH0pO1xyXG5cdH1cclxuXHJcblx0Y29tcG9uZW50RGlkTW91bnQoKSB7XHJcblx0XHR1dGlscy5idXRBbmltYXRlKCk7XHJcblx0XHRjb25zdCB1c2VyID0gU3RvcmFnZS5nZXRTZXNzaW9uKFwidXNlclwiKTtcclxuXHRcdHRoaXMuc2V0U3RhdGUoeyB1c2VyOiB1c2VyIH0pO1xyXG5cdFx0Ly8gY29uc29sZS5sb2cobm93VXNlciwzNDk1Mjc4NTg5NDAyKVxyXG5cdFx0Ly8gaWYgKCF0aGlzLnByb3BzLnVybERhdGEpIHtcclxuXHRcdC8vIFx0dGhpcy5wcm9wcy5zZXRVcmxEYXRhKFxyXG5cdFx0Ly8gXHRcdGVuY29kZVVSSUNvbXBvbmVudChsb2NhdGlvbi5ocmVmLnNwbGl0KFwiI1wiKVswXSlcclxuXHRcdC8vIFx0KTtcclxuXHRcdC8vIH1cclxuXHR9XHJcblxyXG5cdGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XHJcblx0XHR0aGlzLnNldFN0YXRlKHsgcGF0aE5hbWU6IG5leHRQcm9wcy5wYXRoTmFtZSB9KTtcclxuXHRcdGlmIChSb3V0ZXIucXVlcnkuYWRkU2hvdyA9PSBcInRydWVcIikge1xyXG5cdFx0XHR0aGlzLnNldFN0YXRlKHsgYWRkU2hvdzogdHJ1ZSB9KTtcclxuXHRcdH0gZWxzZSBpZiAoXHJcblx0XHRcdFJvdXRlci5xdWVyeS5hZGRTaG93ID09IHVuZGVmaW5lZCB8fFxyXG5cdFx0XHRSb3V0ZXIucXVlcnkuYWRkU2hvdyA9PSBcImZhbHNlXCJcclxuXHRcdCkge1xyXG5cdFx0XHR0aGlzLnNldFN0YXRlKHsgYWRkU2hvdzogZmFsc2UgfSk7XHJcblx0XHR9XHJcblx0fVxyXG5cdGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcclxuXHRcdHV0aWxzLmJ1dEFuaW1hdGUoKTtcclxuXHR9XHJcblx0Y29tcG9uZW50V2lsbFVubW91bnQoKSB7XHJcblx0XHR0aGlzLnNldFN0YXRlKHsgYWRkU2hvdzogZmFsc2UgfSk7XHJcblx0fVxyXG5cclxuXHRyb3V0ZXJQdXNoKHVybCkge1xyXG5cdFx0Um91dGVyLnB1c2goRGluZ3RhbGsuc2V0RGROYXZDb2xvcih1cmwpKTtcclxuXHR9XHJcblxyXG5cdGFkZFNob3coKSB7XHJcblx0XHR0aGlzLnNldFN0YXRlKHsgYWRkU2hvdzogdHJ1ZSB9KTtcclxuXHR9XHJcblxyXG5cdC8vIOWIm+W7uuS7u+WKoVxyXG5cdHRhc2tDcmVhdGVTaG93KCkge1xyXG5cdFx0Y29uc3QgeyB0YXNrRnJlZSwgdXNlciB9ID0gdGhpcy5zdGF0ZTtcclxuXHRcdGlmICh1dGlscy5nZXRUZWFtSW5mb1dpdGhNb25leShcIueJiOacrOWQjeensFwiLCB1c2VyKSA9PT0gXCLlhY3otLnniYhcIikge1xyXG5cdFx0XHRnZXRMaW10VGFzayhkYXRhID0+IHtcclxuXHRcdFx0XHR0aGlzLnNldFN0YXRlKHtcclxuXHRcdFx0XHRcdHRhc2tGcmVlOiBkYXRhLmRhdGEuc3VjY2VzcyxcclxuXHRcdFx0XHRcdHRhc2tNYXg6IGRhdGEuZGF0YS5wcm9qZWN0TWF4XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0aWYgKCFkYXRhLmRhdGEuc3VjY2Vzcykge1xyXG5cdFx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7IHRhc0FsZXJ0U2hvdzogdHJ1ZSB9KTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aWYgKGRhdGEuZGF0YS5zdWNjZXNzKSB7XHJcblx0XHRcdFx0XHRjb25zdCBwYXRoTmFtZSA9IFJvdXRlci5yb3V0ZXIucGF0aG5hbWU7XHJcblx0XHRcdFx0XHRpZiAoXHJcblx0XHRcdFx0XHRcdHBhdGhOYW1lLmluZGV4T2YoXHJcblx0XHRcdFx0XHRcdFx0XCIvbW9fcHJvamVjdERldGFpbHNcIlxyXG5cdFx0XHRcdFx0XHQpICE9PSAtMVxyXG5cdFx0XHRcdFx0KSB7XHJcblx0XHRcdFx0XHRcdGNvbnN0IG9wZW5Qcm9qZWN0ID0gdGhpcy5wcm9wc1xyXG5cdFx0XHRcdFx0XHRcdC5vcGVuUHJvamVjdDtcclxuXHRcdFx0XHRcdFx0dGhpcy5yb3V0ZXJQdXNoKFxyXG5cdFx0XHRcdFx0XHRcdFwiL21vX3Rhc2tDcmVhdGU/bmV3VGFzaz10cnVlJnNlbGVjdGVkUHJvSWQ9XCIgK1xyXG5cdFx0XHRcdFx0XHRcdFx0b3BlblByb2plY3QuaWQgK1xyXG5cdFx0XHRcdFx0XHRcdFx0XCImc2VsZWN0ZWRQcm9OYW1lPVwiICtcclxuXHRcdFx0XHRcdFx0XHRcdG9wZW5Qcm9qZWN0Lm5hbWVcclxuXHRcdFx0XHRcdFx0KTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdHRoaXMucm91dGVyUHVzaChcclxuXHRcdFx0XHRcdFx0XHRcIi9tb190YXNrQ3JlYXRlP25ld1Rhc2s9dHJ1ZVwiXHJcblx0XHRcdFx0XHRcdCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGNvbnN0IHBhdGhOYW1lID0gUm91dGVyLnJvdXRlci5wYXRobmFtZTtcclxuXHRcdFx0aWYgKHBhdGhOYW1lLmluZGV4T2YoXCIvbW9fcHJvamVjdERldGFpbHNcIikgIT09IC0xKSB7XHJcblx0XHRcdFx0Y29uc3Qgb3BlblByb2plY3QgPSB0aGlzLnByb3BzLm9wZW5Qcm9qZWN0O1xyXG5cdFx0XHRcdHRoaXMucm91dGVyUHVzaChcclxuXHRcdFx0XHRcdFwiL21vX3Rhc2tDcmVhdGU/bmV3VGFzaz10cnVlJnNlbGVjdGVkUHJvSWQ9XCIgK1xyXG5cdFx0XHRcdFx0XHRvcGVuUHJvamVjdC5pZCArXHJcblx0XHRcdFx0XHRcdFwiJnNlbGVjdGVkUHJvTmFtZT1cIiArXHJcblx0XHRcdFx0XHRcdG9wZW5Qcm9qZWN0Lm5hbWVcclxuXHRcdFx0XHQpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMucm91dGVyUHVzaChcIi9tb190YXNrQ3JlYXRlP25ld1Rhc2s9dHJ1ZVwiKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHQvL+WIm+W7uumhueebrlxyXG5cdHByb2plY3RDcmVhdGUoKSB7XHJcblx0XHRjb25zdCB7IHByb2plY3RGcmVlLCB1c2VyIH0gPSB0aGlzLnN0YXRlO1xyXG5cdFx0aWYgKHV0aWxzLmdldFRlYW1JbmZvV2l0aE1vbmV5KFwi54mI5pys5ZCN56ewXCIsIHVzZXIpID09PSBcIuWFjei0ueeJiFwiKSB7XHJcblx0XHRcdGdldExpbXRQcm9qZWN0KGRhdGEgPT4ge1xyXG5cdFx0XHRcdHRoaXMuc2V0U3RhdGUoe1xyXG5cdFx0XHRcdFx0cHJvamVjdE1heDogZGF0YS5kYXRhLnByb2plY3RNYXgsXHJcblx0XHRcdFx0XHRwcm9qZWN0RnJlZTogZGF0YS5kYXRhLnN1Y2Nlc3NcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHRpZiAoIWRhdGEuZGF0YS5zdWNjZXNzKSB7XHJcblx0XHRcdFx0XHR0aGlzLnNldFN0YXRlKHsgcHJvQWxlcnRTaG93OiB0cnVlIH0pO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRpZiAoZGF0YS5kYXRhLnN1Y2Nlc3MpIHtcclxuXHRcdFx0XHRcdHRoaXMucm91dGVyUHVzaChcIi9tb19wcm9qZWN0Q3JlYXRlXCIpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLnJvdXRlclB1c2goXCIvbW9fcHJvamVjdENyZWF0ZVwiKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHJlZGlyZWN0ID0gdXJsID0+IHtcclxuXHRcdGNvbnN0IHsgdXNlciB9ID0gdGhpcy5zdGF0ZTtcclxuXHRcdGlmICh1cmwgPT0gXCIvbW9fc3RhdGlzdGljc1wiKSB7XHJcblx0XHRcdGlmICh1dGlscy5nZXRUZWFtSW5mb1dpdGhNb25leShcIuaYr+WQpuWPr+eUqFwiLCB1c2VyKSkge1xyXG5cdFx0XHRcdHRoaXMucm91dGVyUHVzaCh1cmwpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuc2V0U3RhdGUoe1xyXG5cdFx0XHRcdFx0c3RhdGlzdGljQWxlcnRTaG93OiB0cnVlXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMucm91dGVyUHVzaCh1cmwpO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdHJlbmRlcigpIHtcclxuXHRcdGNvbnN0IHtcclxuXHRcdFx0cGF0aE5hbWUsXHJcblx0XHRcdGFkZFNob3csXHJcblx0XHRcdHVzZXIsXHJcblx0XHRcdHByb0FsZXJ0U2hvdyxcclxuXHRcdFx0dGFzQWxlcnRTaG93LFxyXG5cdFx0XHRwcm9qZWN0TWF4LFxyXG5cdFx0XHR0YXNrTWF4LFxyXG5cdFx0XHRzdGF0aXN0aWNBbGVydFNob3dcclxuXHRcdH0gPSB0aGlzLnN0YXRlO1xyXG5cdFx0Ly8gY29uc29sZS5sb2cocGF0aE5hbWUsIFwicGF0aE5hbWVwYXRoTmFtZVwiKTtcclxuXHJcblx0XHRjb25zdCB0YXNNYXggPSBgIDxkaXYgY2xhc3M9J3RleHRMaW1pdCc+5oKo5q2j5Zyo5L2/55So55qE5pivPGI+IOiaguiageWIhuW3peWFjei0ueeJiDwvYj7vvIzlhY3otLnniYjmr4/mnIjlj6/liJvlu7o8Yj4gMjAwIDwvYj7mnaHku7vliqHvvIzmnKzmnIjku7vliqHnlKjph4/lt7Lovr7niYjmnKzkuIrpmZDjgII8L2Rpdj5cclxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPSd0ZXh0TGltaXQnPuWmguaCqOeahOWboumYn+mhueebruWSjOS7u+WKoeaVsOmHj+i+g+Wkmu+8jOWPr+WNh+e6p+S4uue7j+a1juWunuaDoOeahDxiPiDomoLomoHliIblt6Xln7rnoYDniYg8L2I+77yM5Z+656GA54mI5LiN6ZmQ5L2/55So5Lq65pWw44CB5LiN6ZmQ6aG555uu5pWw6YeP44CB5LiN6ZmQ5Lu75Yqh5pWw6YeP44CCPC9kaXY+XHJcblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz0ndGV4dExpbWl0MSc+5oiR5Lus5pu05bu66K6u5oKo5Y2H57qn5Yiw5Yqf6IO95by65aSn55qEPGI+IOiaguiageWIhuW3peS4k+S4mueJiDwvYj7vvIzkuJPkuJrniYjlhbfmnInmibnph4/ku7vliqHmk43kvZzjgIHnlJjnibnlm77jgIHlpJrnu7TluqbmlbDmja7nu5/orqHlm77ooajnrYnkuJPkuJrlip/og73vvIzliqnmgqjmj5Dpq5jljY/lkIzlt6XkvZzmlYjnjofjgIHmj5DljYfpobnnm67nrqHnkIbmsLTlubPjgII8L2Rpdj5gO1xyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtZW51QmFyXCI+XHJcblx0XHRcdFx0PHN0eWxlXHJcblx0XHRcdFx0XHRkYW5nZXJvdXNseVNldElubmVySFRNTD17e1xyXG5cdFx0XHRcdFx0XHRfX2h0bWw6IHN0eWxlc2hlZXRcclxuXHRcdFx0XHRcdH19XHJcblx0XHRcdFx0Lz5cclxuXHRcdFx0XHQ8ZGl2XHJcblx0XHRcdFx0XHRjbGFzc05hbWU9e1xyXG5cdFx0XHRcdFx0XHRwYXRoTmFtZS5pbmRleE9mKFxyXG5cdFx0XHRcdFx0XHRcdFwiL21vX2RpbmdIb21lXCJcclxuXHRcdFx0XHRcdFx0KSAhPT0gLTFcclxuXHRcdFx0XHRcdFx0XHQ/IFwiYnV0IGFjdCBhbmlCdXRcIlxyXG5cdFx0XHRcdFx0XHRcdDogXCJidXQgYW5pQnV0XCJcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdG9uQ2xpY2s9eygpID0+XHJcblx0XHRcdFx0XHRcdHRoaXMucmVkaXJlY3QoXCIvbW9fZGluZ0hvbWVcIilcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHQ+XHJcblx0XHRcdFx0XHQ8SWNvblxyXG5cdFx0XHRcdFx0XHR0eXBlPXtcclxuXHRcdFx0XHRcdFx0XHRwYXRoTmFtZS5pbmRleE9mKFxyXG5cdFx0XHRcdFx0XHRcdFx0XCIvbW9fZGluZ0hvbWVcIlxyXG5cdFx0XHRcdFx0XHRcdCkgIT09IC0xXHJcblx0XHRcdFx0XHRcdFx0XHQ/IFwiYW50aWNvbi1ob21lLXNlbGVjdGVkXCJcclxuXHRcdFx0XHRcdFx0XHRcdDogXCJhbnRpY29uLWhvbWVcIlxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHQvPlxyXG5cdFx0XHRcdFx0PHNwYW4+6aaW6aG1PC9zcGFuPlxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdDxkaXZcclxuXHRcdFx0XHRcdGNsYXNzTmFtZT17XHJcblx0XHRcdFx0XHRcdHBhdGhOYW1lID09IFwiL21vX3Rhc2tcIlxyXG5cdFx0XHRcdFx0XHRcdD8gXCJidXQgYWN0IGFuaUJ1dFwiXHJcblx0XHRcdFx0XHRcdFx0OiBcImJ1dCBhbmlCdXRcIlxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0b25DbGljaz17KCkgPT5cclxuXHRcdFx0XHRcdFx0dGhpcy5yZWRpcmVjdChcIi9tb190YXNrXCIpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0PlxyXG5cdFx0XHRcdFx0PEljb25cclxuXHRcdFx0XHRcdFx0dHlwZT17XHJcblx0XHRcdFx0XHRcdFx0cGF0aE5hbWUgPT0gXCIvbW9fdGFza1wiXHJcblx0XHRcdFx0XHRcdFx0XHQ/IFwiYW50aWNvbi10YXNrLXNlbGV0ZWRcIlxyXG5cdFx0XHRcdFx0XHRcdFx0OiBcImFudGljb24tdGFza1wiXHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdC8+XHJcblx0XHRcdFx0XHQ8c3Bhbj7ku7vliqE8L3NwYW4+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0ey8qIDxkaXYgY2xhc3NOYW1lPVwiYnV0IGNlblwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjZW5CdXQgYmx1ZSBhbmlCdXRcIiBvbkNsaWNrPXsoKSA9PiB0aGlzLmFkZFNob3coKX0+XHJcbiAgICAgICAgICAgIDxJY29uIHR5cGU9XCJwbHVzXCIgLz5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PiAqL31cclxuXHRcdFx0XHQ8ZGl2XHJcblx0XHRcdFx0XHRjbGFzc05hbWU9e1xyXG5cdFx0XHRcdFx0XHRwYXRoTmFtZSA9PSBcIi9tb19wcm9qZWN0XCJcclxuXHRcdFx0XHRcdFx0XHQ/IFwiYnV0IGFjdCBhbmlCdXRcIlxyXG5cdFx0XHRcdFx0XHRcdDogXCJidXQgYW5pQnV0XCJcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdG9uQ2xpY2s9eygpID0+XHJcblx0XHRcdFx0XHRcdHRoaXMucmVkaXJlY3QoXCIvbW9fcHJvamVjdFwiKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdD5cclxuXHRcdFx0XHRcdDxJY29uXHJcblx0XHRcdFx0XHRcdHR5cGU9e1xyXG5cdFx0XHRcdFx0XHRcdHBhdGhOYW1lID09XHJcblx0XHRcdFx0XHRcdFx0XCIvbW9fcHJvamVjdFwiXHJcblx0XHRcdFx0XHRcdFx0XHQ/IFwiYW50aWNvbi1wcm9qZWN0LXNlbGVjdGVkXCJcclxuXHRcdFx0XHRcdFx0XHRcdDogXCJhbnRpY29uLXByb2plY3RcIlxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHQvPlxyXG5cdFx0XHRcdFx0PHNwYW4+6aG555uuPC9zcGFuPlxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdHsvKiA8ZGl2XHJcbiAgICAgICAgICBjbGFzc05hbWU9e1xyXG4gICAgICAgICAgICBwYXRoTmFtZSA9PSBcIi9tb19keW5hbWljXCIgPyBcImJ1dCBhY3QgYW5pQnV0XCIgOiBcImJ1dCBhbmlCdXRcIlxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgb25DbGljaz17KCkgPT4gdGhpcy5yb3V0ZXJQdXNoKFwiL21vX2R5bmFtaWNcIil9XHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgPEljb24gdHlwZT1cImFudGljb24teGlhb3Nob3Vkb25ndGFpXCIgLz5cclxuICAgICAgICAgIDxzcGFuPue7n+iuoTwvc3Bhbj5cclxuICAgICAgICA8L2Rpdj4gKi99XHJcblx0XHRcdFx0PGRpdlxyXG5cdFx0XHRcdFx0Y2xhc3NOYW1lPXtcclxuXHRcdFx0XHRcdFx0cGF0aE5hbWUgPT0gXCIvbW9fc3RhdGlzdGljc1wiXHJcblx0XHRcdFx0XHRcdFx0PyBcImJ1dCBhY3QgYW5pQnV0XCJcclxuXHRcdFx0XHRcdFx0XHQ6IFwiYnV0IGFuaUJ1dFwiXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRvbkNsaWNrPXsoKSA9PlxyXG5cdFx0XHRcdFx0XHR0aGlzLnJlZGlyZWN0KFwiL21vX3N0YXRpc3RpY3NcIilcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHQ+XHJcblx0XHRcdFx0XHQ8SWNvblxyXG5cdFx0XHRcdFx0XHR0eXBlPXtcclxuXHRcdFx0XHRcdFx0XHRwYXRoTmFtZSA9PVxyXG5cdFx0XHRcdFx0XHRcdFwiL21vX3N0YXRpc3RpY3NcIlxyXG5cdFx0XHRcdFx0XHRcdFx0PyBcImFudGljb24tc3RhdHMtc2VsZWN0ZWRcIlxyXG5cdFx0XHRcdFx0XHRcdFx0OiBcImFudGljb24tc3RhdHNcIlxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHQvPlxyXG5cdFx0XHRcdFx0PHNwYW4+57uf6K6hPC9zcGFuPlxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdDxkaXZcclxuXHRcdFx0XHRcdGNsYXNzTmFtZT17XHJcblx0XHRcdFx0XHRcdHBhdGhOYW1lID09IFwiL21vX2R5bmFtaWNcIlxyXG5cdFx0XHRcdFx0XHRcdD8gXCJidXQgYWN0IGFuaUJ1dFwiXHJcblx0XHRcdFx0XHRcdFx0OiBcImJ1dCBhbmlCdXRcIlxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0b25DbGljaz17KCkgPT5cclxuXHRcdFx0XHRcdFx0dGhpcy5yb3V0ZXJQdXNoKFwiL21vX2R5bmFtaWNcIilcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHQ+XHJcblx0XHRcdFx0XHQ8SWNvblxyXG5cdFx0XHRcdFx0XHR0eXBlPXtcclxuXHRcdFx0XHRcdFx0XHRwYXRoTmFtZSA9PVxyXG5cdFx0XHRcdFx0XHRcdFwiL21vX2R5bmFtaWNcIlxyXG5cdFx0XHRcdFx0XHRcdFx0PyBcImFudGljb24tYWN0aXZpdHlzLWNvcHlcIlxyXG5cdFx0XHRcdFx0XHRcdFx0OiBcImFudGljb24tYWN0aXZpdHlcIlxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHQvPlxyXG5cdFx0XHRcdFx0PHNwYW4+5Yqo5oCBPC9zcGFuPlxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdHsvKiA8ZGl2XHJcbiAgICAgICAgICBjbGFzc05hbWU9e3BhdGhOYW1lID09IFwiL21vX2NlbnRlclwiID8gXCJidXQgYWN0IGFuaUJ1dFwiIDogXCJidXQgYW5pQnV0XCJ9XHJcbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB0aGlzLnJlZGlyZWN0KFwiL21vX2NlbnRlclwiKX1cclxuICAgICAgICA+XHJcbiAgICAgICAgICA8SWNvblxyXG4gICAgICAgICAgICB0eXBlPXtcclxuICAgICAgICAgICAgICBwYXRoTmFtZSA9PSBcIi9tb19jZW50ZXJcIiA/IFwiYW50aWNvbi1tZS1zZWxlY3RlZFwiIDogXCJhbnRpY29uLW1lXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgLz5cclxuICAgICAgICAgIDxzcGFuPuaIkeeahDwvc3Bhbj5cclxuICAgICAgICA8L2Rpdj4gKi99XHJcblxyXG5cdFx0XHRcdHsvKua3u+WKoOWxgiovfVxyXG5cdFx0XHRcdHthZGRTaG93ID8gKFxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJhZGRCb3hcIj5cclxuXHRcdFx0XHRcdFx0PHVsIGNsYXNzTmFtZT1cImxpc3RcIj5cclxuXHRcdFx0XHRcdFx0XHQ8bGlcclxuXHRcdFx0XHRcdFx0XHRcdG9uQ2xpY2s9eygpID0+IHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0dGhpcy50YXNrQ3JlYXRlU2hvdygpO1xyXG5cdFx0XHRcdFx0XHRcdFx0fX1cclxuXHRcdFx0XHRcdFx0XHRcdGNsYXNzTmFtZT1cImljb25CbHVlX3R4dEdyYXkgYW5pQnV0XCJcclxuXHRcdFx0XHRcdFx0XHQ+XHJcblx0XHRcdFx0XHRcdFx0XHQ8SWNvbiB0eXBlPVwiYW50aWNvbi1qaW5yaXJlbnd1XCIgLz5cclxuXHRcdFx0XHRcdFx0XHRcdDxzcGFuPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHTliJvlu7rku7vliqFcclxuXHRcdFx0XHRcdFx0XHRcdDwvc3Bhbj5cclxuXHRcdFx0XHRcdFx0XHQ8L2xpPlxyXG5cdFx0XHRcdFx0XHRcdDxsaVxyXG5cdFx0XHRcdFx0XHRcdFx0Y2xhc3NOYW1lPVwiaWNvbkJsdWVfdHh0R3JheSBhbmlCdXRcIlxyXG5cdFx0XHRcdFx0XHRcdFx0b25DbGljaz17KCkgPT4ge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR0aGlzLnByb2plY3RDcmVhdGUoKTtcclxuXHRcdFx0XHRcdFx0XHRcdH19XHJcblx0XHRcdFx0XHRcdFx0PlxyXG5cdFx0XHRcdFx0XHRcdFx0PEljb24gdHlwZT1cImFudGljb24teGlhbmdtdWd1YW5nbGl3cVwiIC8+XHJcblx0XHRcdFx0XHRcdFx0XHQ8c3Bhbj5cclxuXHRcdFx0XHRcdFx0XHRcdFx05Yib5bu66aG555uuXHJcblx0XHRcdFx0XHRcdFx0XHQ8L3NwYW4+XHJcblx0XHRcdFx0XHRcdFx0PC9saT5cclxuXHRcdFx0XHRcdFx0PC91bD5cclxuXHRcdFx0XHRcdFx0PGRpdlxyXG5cdFx0XHRcdFx0XHRcdGNsYXNzTmFtZT1cImNhbmNlbCBhbmlCdXRCbHVlXCJcclxuXHRcdFx0XHRcdFx0XHRvbkNsaWNrPXsoKSA9PiB7XHJcblx0XHRcdFx0XHRcdFx0XHR0aGlzLnNldFN0YXRlKHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0YWRkU2hvdzogZmFsc2VcclxuXHRcdFx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHRcdH19XHJcblx0XHRcdFx0XHRcdD5cclxuXHRcdFx0XHRcdFx0XHTlj5bmtohcclxuXHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQpIDogKFxyXG5cdFx0XHRcdFx0XCJcIlxyXG5cdFx0XHRcdCl9XHJcblx0XHRcdFx0e3V0aWxzLmdldFRlYW1JbmZvV2l0aE1vbmV5KFxyXG5cdFx0XHRcdFx0XCLniYjmnKzlkI3np7BcIixcclxuXHRcdFx0XHRcdHVzZXJcclxuXHRcdFx0XHQpID09PSBcIuWFjei0ueeJiFwiICYmIHRhc0FsZXJ0U2hvdyA/IChcclxuXHRcdFx0XHRcdDxBbGVydFxyXG5cdFx0XHRcdFx0XHR0aXRsZT1cIueUqOmHj+mZkOWItlwiXHJcblx0XHRcdFx0XHRcdG1zZz17dGFzTWF4fVxyXG5cdFx0XHRcdFx0XHRidXRJc09uZT1cImZhbHNlXCJcclxuXHRcdFx0XHRcdFx0b2tCdXRUeHQ9XCLljYfnuqfniYjmnKxcIlxyXG5cdFx0XHRcdFx0XHRjbG9zZUljb25TaG93PXt0cnVlfVxyXG5cdFx0XHRcdFx0XHRjbG9zZUljb25DbGlja0NhbGxCYWNrPXsoKSA9PiB7XHJcblx0XHRcdFx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7XHJcblx0XHRcdFx0XHRcdFx0XHR0YXNBbGVydFNob3c6IGZhbHNlXHJcblx0XHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcdH19XHJcblx0XHRcdFx0XHRcdG9rQ2FsbEJhY2s9eygpID0+IHtcclxuXHRcdFx0XHRcdFx0XHR0aGlzLnNldFN0YXRlKHtcclxuXHRcdFx0XHRcdFx0XHRcdHRhc0FsZXJ0U2hvdzogZmFsc2VcclxuXHRcdFx0XHRcdFx0XHR9KSxcclxuXHRcdFx0XHRcdFx0XHRcdFJvdXRlci5wdXNoKFxyXG5cdFx0XHRcdFx0XHRcdFx0XHREaW5ndGFsay5zZXREZE5hdkNvbG9yKFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFwiL21vX3ZlcnNpb25cIlxyXG5cdFx0XHRcdFx0XHRcdFx0XHQpXHJcblx0XHRcdFx0XHRcdFx0XHQpO1xyXG5cdFx0XHRcdFx0XHR9fVxyXG5cdFx0XHRcdFx0Lz5cclxuXHRcdFx0XHQpIDogKFxyXG5cdFx0XHRcdFx0XCJcIlxyXG5cdFx0XHRcdCl9XHJcblx0XHRcdFx0e2NvbnNvbGUubG9nKFxyXG5cdFx0XHRcdFx0dXRpbHMuZ2V0VGVhbUluZm9XaXRoTW9uZXkoXHJcblx0XHRcdFx0XHRcdFwi5LiT5Lia54mI5Yqf6IO9XCIsXHJcblx0XHRcdFx0XHRcdHVzZXJcclxuXHRcdFx0XHRcdClcclxuXHRcdFx0XHQpfVxyXG5cdFx0XHRcdHtzdGF0aXN0aWNBbGVydFNob3cgJiYgKFxyXG5cdFx0XHRcdFx0PEFsZXJ0XHJcblx0XHRcdFx0XHRcdHRpdGxlPVwi5LiT5Lia54mI5Yqf6IO9XCJcclxuXHRcdFx0XHRcdFx0bXNnPVwi5Zu+6KGo5YyW6aG555uu566h55CG44CB5om56YeP5L6/5o235pON5L2c44CB5aSa57u05bqm5pWw5o2u57uf6K6h44CBV0JT5paH5Lu257O757uf562J6YO95Li66JqC6JqB5YiG5bel5LiT5Lia54mI5Yqf6IO977yM5ZCM5pe26L+Y5pyJ5pu05aSa6auY57qn5Yqf6IO95bCG6ZmG57ut5byA5pS+44CCXCJcclxuXHRcdFx0XHRcdFx0b2tCdXRUeHQ9XCLljYfnuqfkuJPkuJrniYhcIlxyXG5cdFx0XHRcdFx0XHRidXRJc09uZT17dHJ1ZX1cclxuXHRcdFx0XHRcdFx0Y2xvc2VJY29uU2hvdz17dHJ1ZX1cclxuXHRcdFx0XHRcdFx0b2tDYWxsQmFjaz17KCkgPT4ge1xyXG5cdFx0XHRcdFx0XHRcdHRoaXMuc2V0U3RhdGUoe1xyXG5cdFx0XHRcdFx0XHRcdFx0c3RhdGlzdGljQWxlcnRTaG93OiBmYWxzZVxyXG5cdFx0XHRcdFx0XHRcdH0pLFxyXG5cdFx0XHRcdFx0XHRcdFx0Um91dGVyLnB1c2goXHJcblx0XHRcdFx0XHRcdFx0XHRcdERpbmd0YWxrLnNldERkTmF2Q29sb3IoXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XCIvbW9fdmVyc2lvblwiXHJcblx0XHRcdFx0XHRcdFx0XHRcdClcclxuXHRcdFx0XHRcdFx0XHRcdCk7XHJcblx0XHRcdFx0XHRcdH19XHJcblx0XHRcdFx0XHRcdGNhbENhbGxCYWNrPXsoKSA9PiB7fX1cclxuXHRcdFx0XHRcdFx0Y2xvc2VJY29uQ2xpY2tDYWxsQmFjaz17KCkgPT4ge1xyXG5cdFx0XHRcdFx0XHRcdHRoaXMuc2V0U3RhdGUoe1xyXG5cdFx0XHRcdFx0XHRcdFx0c3RhdGlzdGljQWxlcnRTaG93OiBmYWxzZVxyXG5cdFx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHR9fVxyXG5cdFx0XHRcdFx0Lz5cclxuXHRcdFx0XHQpfVxyXG5cdFx0XHRcdHt1dGlscy5nZXRUZWFtSW5mb1dpdGhNb25leShcclxuXHRcdFx0XHRcdFwi54mI5pys5ZCN56ewXCIsXHJcblx0XHRcdFx0XHR1c2VyXHJcblx0XHRcdFx0KSA9PT0gXCLlhY3otLnniYhcIiAmJiBwcm9BbGVydFNob3cgPyAoXHJcblx0XHRcdFx0XHQ8QWxlcnRcclxuXHRcdFx0XHRcdFx0c3R5bGU9e3sgdGV4dEFsaWduOiBcImNlbnRlclwiIH19XHJcblx0XHRcdFx0XHRcdHRpdGxlPVwi55So6YeP6ZmQ5Yi2XCJcclxuXHRcdFx0XHRcdFx0bXNnPXt0YXNNYXh9XHJcblx0XHRcdFx0XHRcdG9rQnV0VHh0PVwi57un57ut5Yib5bu66aG555uuPlwiXHJcblx0XHRcdFx0XHRcdGNhbEJ1dFR4dD1cIuWNh+e6p+eJiOacrFwiXHJcblx0XHRcdFx0XHRcdGNsb3NlSWNvblNob3c9e3RydWV9XHJcblx0XHRcdFx0XHRcdG9rQ2FsbEJhY2s9eygpID0+IHtcclxuXHRcdFx0XHRcdFx0XHR0aGlzLnJvdXRlclB1c2goXHJcblx0XHRcdFx0XHRcdFx0XHRcIi9tb19wcm9qZWN0Q3JlYXRlXCJcclxuXHRcdFx0XHRcdFx0XHQpO1xyXG5cdFx0XHRcdFx0XHR9fVxyXG5cdFx0XHRcdFx0XHRjYWxDYWxsQmFjaz17KCkgPT4ge1xyXG5cdFx0XHRcdFx0XHRcdHRoaXMuc2V0U3RhdGUoe1xyXG5cdFx0XHRcdFx0XHRcdFx0dGFzQWxlcnRTaG93OiBmYWxzZVxyXG5cdFx0XHRcdFx0XHRcdH0pLFxyXG5cdFx0XHRcdFx0XHRcdFx0Um91dGVyLnB1c2goXHJcblx0XHRcdFx0XHRcdFx0XHRcdERpbmd0YWxrLnNldERkTmF2Q29sb3IoXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XCIvbW9fdmVyc2lvblwiXHJcblx0XHRcdFx0XHRcdFx0XHRcdClcclxuXHRcdFx0XHRcdFx0XHRcdCk7XHJcblx0XHRcdFx0XHRcdH19XHJcblx0XHRcdFx0XHRcdGNsb3NlSWNvbkNsaWNrQ2FsbEJhY2s9eygpID0+IHtcclxuXHRcdFx0XHRcdFx0XHR0aGlzLnNldFN0YXRlKHtcclxuXHRcdFx0XHRcdFx0XHRcdHByb0FsZXJ0U2hvdzogZmFsc2VcclxuXHRcdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFx0fX1cclxuXHRcdFx0XHRcdC8+XHJcblx0XHRcdFx0KSA6IChcclxuXHRcdFx0XHRcdFwiXCJcclxuXHRcdFx0XHQpfVxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdCk7XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBtYXBTdGF0ZVRvUHJvcHMoc3RhdGUpIHtcclxuXHRyZXR1cm4ge1xyXG5cdFx0b3BlblByb2plY3Q6IHN0YXRlLnByb2plY3Qub3BlblByb2plY3QsXHJcblx0XHR1cmxEYXRhOiBzdGF0ZS51c2VyLnVybERhdGFcclxuXHR9O1xyXG59XHJcbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IGRpc3BhdGNoID0+IHtcclxuXHRyZXR1cm4ge1xyXG5cdFx0c2V0VXJsRGF0YTogYmluZEFjdGlvbkNyZWF0b3JzKHVzZXJBY3Rpb24uc2V0VXJsRGF0YSwgZGlzcGF0Y2gpLFxyXG5cdFx0Z2V0TGltdFRhc2s6IGJpbmRBY3Rpb25DcmVhdG9ycyhcclxuXHRcdFx0dmVyc2lvbkFjdGlvbi5nZXRMaW10VGFzayxcclxuXHRcdFx0ZGlzcGF0Y2hcclxuXHRcdClcclxuXHR9O1xyXG59O1xyXG5leHBvcnQgZGVmYXVsdCB3aXRoUmVkdXgoaW5pdFN0b3JlLCBtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoXHJcblx0bWVudUJhclxyXG4pO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb21wb25lbnRzL01lbnVCYXIuanMiLCJpbXBvcnQgKiBhcyB0eXBlcyBmcm9tIFwiLi4vYWN0aW9ucy9jYWNoZVwiO1xyXG5jb25zdCBpbml0aWFsU3RhdGUgPSB7XHJcblx0dGFza0xpc3RGcm9tQ2FjaGU6IFtdLFxyXG5cdHByb2plY3RMaXN0RnJvbUNhY2hlOiBbXSxcclxuXHRkeW5hbWljTGlzdEZyb21DYWNoZTogW10sXHJcblx0dGFza0NvdW50RnJvbUNhY2hlOiAwLFxyXG5cdHRhc2tQYWdlQ291bnRGcm9tQ2FjaGU6IDAsXHJcblx0cHJvamVjdFBhZ2VDb3VudEZyb21DYWNoZTogMCxcclxuXHRkeW5hbWljUGFnZUNvdW50RnJvbUNhY2hlOiAwLFxyXG5cdHRhc2tUZXh0RnJvbUNhY2hlOiBcIlwiLFxyXG5cdHRhc2tMaXN0VG9EZWw6IFtdLFxyXG5cdHRhc2tDb3VudFRvRGVsOiAwLFxyXG5cdHRhc2tUZXh0VG9EZWw6IFwiXCIsXHJcblx0dGFza0FsbENvdW50VG9EZWw6IDAsXHJcblx0dGFza1Njcm9sbFRvcDogMCxcclxuXHRkeW5hbWljU2Nyb2xsVG9wOiAwLFxyXG5cdGhvbWVTY3JvbGxUb3A6IDAsXHJcblx0dGFza0NvbmRpdGlvbjogXCJcIixcclxuXHRwcm9qZWN0VGV4dDogXCJcIiwgLy/pobnnm67mkJzntKLlhbPplK7lrZdcclxuXHRwcm9qZWN0VHlwZTogXCJcIixcclxuXHRwcm9qZWN0U2Nyb2xsOiAwLFxyXG5cdHByb2plY3RBbGxQYWdlOiAwLFxyXG5cdHByb2plY3RUYXNrTGlzdDogW10sXHJcblx0cHJvamVjdFRhc2tBbGxDb3VudDogMCxcclxuXHRwcm9qZWN0VGFza1Njcm9sbDogMCxcclxuXHRwcm9qZWN0Q29uZGl0aW9uRnJvbUNhY2hlOiB7fSxcclxuXHRwcm9qZWN0Tm93UGFnZTogMSwgLy/mmL7npLrlvZPliY3pobXnoIFcclxuXHRwcm9qZWN0VGFnTGlzdDogW10gLy/pobnnm67nrZvpgInlh7rnmoTmoIfnrb7mlbDmja5cclxufTtcclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY2FjaGUoc3RhdGUgPSBpbml0aWFsU3RhdGUsIGFjdGlvbiA9IHt9KSB7XHJcblx0c3dpdGNoIChhY3Rpb24udHlwZSkge1xyXG5cdFx0Y2FzZSB0eXBlcy5QUk9KRUNUX05PV19QQUdFOlxyXG5cdFx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcclxuXHRcdFx0XHRwcm9qZWN0Tm93UGFnZTogYWN0aW9uLnBheWxvYWRcclxuXHRcdFx0fSk7XHJcblx0XHRjYXNlIHR5cGVzLlBST0pFQ1RfVEFHTElTVDpcclxuXHRcdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XHJcblx0XHRcdFx0cHJvamVjdFRhZ0xpc3Q6IGFjdGlvbi5wYXlsb2FkXHJcblx0XHRcdH0pO1xyXG5cdFx0Y2FzZSB0eXBlcy5QUk9KRUNUX0NPTkRJVElPTjpcclxuXHRcdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XHJcblx0XHRcdFx0cHJvamVjdENvbmRpdGlvbkZyb21DYWNoZTogYWN0aW9uLnBheWxvYWRcclxuXHRcdFx0fSk7XHJcblx0XHRjYXNlIHR5cGVzLkRZTkFNSUNTQ1JPTExUT1A6XHJcblx0XHRcdHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xyXG5cdFx0XHRcdGR5bmFtaWNTY3JvbGxUb3A6IGFjdGlvbi5wYXlsb2FkXHJcblx0XHRcdH0pO1xyXG5cdFx0Y2FzZSB0eXBlcy5IT01FU0NST0xMVE9QOlxyXG5cdFx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcclxuXHRcdFx0XHRob21lU2Nyb2xsVG9wOiBhY3Rpb24ucGF5bG9hZFxyXG5cdFx0XHR9KTtcclxuXHRcdGNhc2UgdHlwZXMuVEFTS0xJU1Q6XHJcblx0XHRcdHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xyXG5cdFx0XHRcdHRhc2tMaXN0RnJvbUNhY2hlOiBhY3Rpb24ucGF5bG9hZFxyXG5cdFx0XHR9KTtcclxuXHRcdGNhc2UgdHlwZXMuUFJPSkVDVExJU1Q6XHJcblx0XHRcdHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xyXG5cdFx0XHRcdHByb2plY3RMaXN0RnJvbUNhY2hlOiBhY3Rpb24ucGF5bG9hZFxyXG5cdFx0XHR9KTtcclxuXHRcdGNhc2UgdHlwZXMuU0VUX1BST0pFQ1RMSVNUOlxyXG5cdFx0XHRsZXQgb2xkUHJvamVjdCA9IFtdO1xyXG5cdFx0XHRvbGRQcm9qZWN0ID0gc3RhdGUucHJvamVjdExpc3RGcm9tQ2FjaGU7XHJcblx0XHRcdGlmIChhY3Rpb24ucGF5bG9hZC5wcm9qZWN0SWQgPT0gXCJcIikge1xyXG5cdFx0XHRcdC8vIGRlYnVnZ2VyO1xyXG5cdFx0XHRcdG9sZFByb2plY3Quc3BsaWNlKDAsIDAsIGFjdGlvbi5wYXlsb2FkLmRhdGEpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdG9sZFByb2plY3QubWFwKChpdGVtLCBpbmRleCkgPT4ge1xyXG5cdFx0XHRcdFx0aWYgKFxyXG5cdFx0XHRcdFx0XHRpdGVtLmlkID09XHJcblx0XHRcdFx0XHRcdGFjdGlvbi5wYXlsb2FkLnByb2plY3RJZFxyXG5cdFx0XHRcdFx0KSB7XHJcblx0XHRcdFx0XHRcdG9sZFByb2plY3Quc3BsaWNlKFxyXG5cdFx0XHRcdFx0XHRcdGluZGV4LFxyXG5cdFx0XHRcdFx0XHRcdDEsXHJcblx0XHRcdFx0XHRcdFx0YWN0aW9uLnBheWxvYWQuZGF0YVxyXG5cdFx0XHRcdFx0XHQpO1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XHJcblx0XHRcdFx0cHJvamVjdExpc3RGcm9tQ2FjaGU6IG9sZFByb2plY3RcclxuXHRcdFx0fSk7XHJcblx0XHRjYXNlIHR5cGVzLkRZTkFNSUNMSVNUOlxyXG5cdFx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcclxuXHRcdFx0XHRkeW5hbWljTGlzdEZyb21DYWNoZTogYWN0aW9uLnBheWxvYWRcclxuXHRcdFx0fSk7XHJcblx0XHRjYXNlIHR5cGVzLlRBU0tDT1VOVDpcclxuXHRcdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XHJcblx0XHRcdFx0dGFza0NvdW50RnJvbUNhY2hlOiBhY3Rpb24ucGF5bG9hZFxyXG5cdFx0XHR9KTtcclxuXHRcdGNhc2UgdHlwZXMuVEFTS1BBR0VDT1VOVDpcclxuXHRcdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XHJcblx0XHRcdFx0dGFza1BhZ2VDb3VudEZyb21DYWNoZTogYWN0aW9uLnBheWxvYWRcclxuXHRcdFx0fSk7XHJcblx0XHRjYXNlIHR5cGVzLlBST0pFQ1RQQUdFQ09VTlQ6XHJcblx0XHRcdHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xyXG5cdFx0XHRcdHByb2plY3RQYWdlQ291bnRGcm9tQ2FjaGU6IGFjdGlvbi5wYXlsb2FkXHJcblx0XHRcdH0pO1xyXG5cdFx0Y2FzZSB0eXBlcy5EWU5BTUlDUEFHRUNPVU5UOlxyXG5cdFx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcclxuXHRcdFx0XHRkeW5hbWljUGFnZUNvdW50RnJvbUNhY2hlOiBhY3Rpb24ucGF5bG9hZFxyXG5cdFx0XHR9KTtcclxuXHRcdGNhc2UgdHlwZXMuVEFTS1RFWFQ6XHJcblx0XHRcdHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xyXG5cdFx0XHRcdHRhc2tUZXh0RnJvbUNhY2hlOiBhY3Rpb24ucGF5bG9hZFxyXG5cdFx0XHR9KTtcclxuXHRcdGNhc2UgdHlwZXMuU0VUX1RBU0tMSVNUREVMOlxyXG5cdFx0XHRsZXQgbmV3bGlzdCA9IHN0YXRlLnRhc2tMaXN0VG9EZWw7XHJcblx0XHRcdG5ld2xpc3QubWFwKChpdGVtLCBpbmRleCkgPT4ge1xyXG5cdFx0XHRcdGlmIChpdGVtLnRhc2tpbmZvLmlkID09IGFjdGlvbi5wYXlsb2FkKSB7XHJcblx0XHRcdFx0XHRuZXdsaXN0LnNwbGljZShpbmRleCwgMSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XHJcblx0XHRcdFx0dGFza0xpc3RUb0RlbDogbmV3bGlzdFxyXG5cdFx0XHR9KTtcclxuXHRcdGNhc2UgdHlwZXMuQUREX1RBU0tMSVNUREVMOlxyXG5cdFx0XHRsZXQgbmV3bGlzdDIgPSBzdGF0ZS50YXNrTGlzdFRvRGVsO1xyXG5cdFx0XHQvLyBkZWJ1Z2dlcjtcclxuXHRcdFx0bmV3bGlzdDIuc3BsaWNlKDAsIDAsIGFjdGlvbi5wYXlsb2FkKTtcclxuXHRcdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XHJcblx0XHRcdFx0dGFza0xpc3RUb0RlbDogbmV3bGlzdDJcclxuXHRcdFx0fSk7XHJcblx0XHRjYXNlIHR5cGVzLkVESVRfVEFTS0xJU1RERUw6XHJcblx0XHRcdGxldCBhbGlzdCA9IHN0YXRlLnRhc2tMaXN0VG9EZWw7XHJcblx0XHRcdGFsaXN0Lm1hcCgoaXRlbSwgaW5kZXgpID0+IHtcclxuXHRcdFx0XHRpZiAoXHJcblx0XHRcdFx0XHRpdGVtLnRhc2tpbmZvLmlkID09XHJcblx0XHRcdFx0XHRhY3Rpb24ucGF5bG9hZC50YXNraW5mby5pZFxyXG5cdFx0XHRcdCkge1xyXG5cdFx0XHRcdFx0YWxpc3Quc3BsaWNlKGluZGV4LCAxLCBhY3Rpb24ucGF5bG9hZCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xyXG5cdFx0XHRcdHRhc2tMaXN0VG9EZWw6IGFsaXN0XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdGNhc2UgdHlwZXMuVEFTS0xJU1RERUw6XHJcblx0XHRcdHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xyXG5cdFx0XHRcdHRhc2tMaXN0VG9EZWw6IGFjdGlvbi5wYXlsb2FkXHJcblx0XHRcdH0pO1xyXG5cdFx0Y2FzZSB0eXBlcy5UQVNLQ09VTlRERUw6XHJcblx0XHRcdHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xyXG5cdFx0XHRcdHRhc2tDb3VudFRvRGVsOiBhY3Rpb24ucGF5bG9hZFxyXG5cdFx0XHR9KTtcclxuXHRcdGNhc2UgdHlwZXMuU0VUX1RBU0tDT1VOVERFTDpcclxuXHRcdFx0bGV0IG5ld3Rhc2tDb3VudFRvRGVsID0gc3RhdGUudGFza0NvdW50VG9EZWw7XHJcblx0XHRcdGlmIChhY3Rpb24ucGF5bG9hZCkge1xyXG5cdFx0XHRcdG5ld3Rhc2tDb3VudFRvRGVsID0gbmV3dGFza0NvdW50VG9EZWwgKyAxO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdG5ld3Rhc2tDb3VudFRvRGVsID0gbmV3dGFza0NvdW50VG9EZWwgLSAxO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xyXG5cdFx0XHRcdHRhc2tDb3VudFRvRGVsOiBuZXd0YXNrQ291bnRUb0RlbFxyXG5cdFx0XHR9KTtcclxuXHRcdGNhc2UgdHlwZXMuVEFTS1RFWFRERUw6XHJcblx0XHRcdHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xyXG5cdFx0XHRcdHRhc2tUZXh0VG9EZWw6IGFjdGlvbi5wYXlsb2FkXHJcblx0XHRcdH0pO1xyXG5cdFx0Y2FzZSB0eXBlcy5UQVNLUEFHRUNPVU5UREVMOlxyXG5cdFx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcclxuXHRcdFx0XHR0YXNrQWxsQ291bnRUb0RlbDogYWN0aW9uLnBheWxvYWRcclxuXHRcdFx0fSk7XHJcblx0XHRjYXNlIHR5cGVzLlRBU0tTQ1JPTExUT1A6XHJcblx0XHRcdHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xyXG5cdFx0XHRcdHRhc2tTY3JvbGxUb3A6IGFjdGlvbi5wYXlsb2FkXHJcblx0XHRcdH0pO1xyXG5cdFx0Y2FzZSB0eXBlcy5UQVNLQ09ORElUSU9OOlxyXG5cdFx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcclxuXHRcdFx0XHR0YXNrQ29uZGl0aW9uOiBhY3Rpb24ucGF5bG9hZFxyXG5cdFx0XHR9KTtcclxuXHRcdGNhc2UgdHlwZXMuUFJPSkVDVFRFWFQ6XHJcblx0XHRcdHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xyXG5cdFx0XHRcdHByb2plY3RUZXh0OiBhY3Rpb24ucGF5bG9hZFxyXG5cdFx0XHR9KTtcclxuXHRcdGNhc2UgdHlwZXMuUFJPSkVDVFRZUEU6XHJcblx0XHRcdHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xyXG5cdFx0XHRcdHByb2plY3RUeXBlOiBhY3Rpb24ucGF5bG9hZFxyXG5cdFx0XHR9KTtcclxuXHRcdGNhc2UgdHlwZXMuUFJPSkVDVFNDUk9MTDpcclxuXHRcdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XHJcblx0XHRcdFx0cHJvamVjdFNjcm9sbDogYWN0aW9uLnBheWxvYWRcclxuXHRcdFx0fSk7XHJcblx0XHRjYXNlIHR5cGVzLlBST0pFQ1RBTExDT1VOVDpcclxuXHRcdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XHJcblx0XHRcdFx0cHJvamVjdEFsbFBhZ2U6IGFjdGlvbi5wYXlsb2FkXHJcblx0XHRcdH0pO1xyXG5cdFx0Y2FzZSB0eXBlcy5QUk9KRUNUVEFTS0xJU1Q6XHJcblx0XHRcdHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xyXG5cdFx0XHRcdHByb2plY3RUYXNrTGlzdDogYWN0aW9uLnBheWxvYWRcclxuXHRcdFx0fSk7XHJcblx0XHRjYXNlIHR5cGVzLlBST0pFQ1RUQVNLQUxMQ09VTlQ6XHJcblx0XHRcdHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xyXG5cdFx0XHRcdHByb2plY3RUYXNrQWxsQ291bnQ6IGFjdGlvbi5wYXlsb2FkXHJcblx0XHRcdH0pO1xyXG5cdFx0Y2FzZSB0eXBlcy5QUk9KRUNUVEFTS1NDUk9MTDpcclxuXHRcdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XHJcblx0XHRcdFx0cHJvamVjdFRhc2tTY3JvbGw6IGFjdGlvbi5wYXlsb2FkXHJcblx0XHRcdH0pO1xyXG5cdFx0ZGVmYXVsdDpcclxuXHRcdFx0cmV0dXJuIHN0YXRlO1xyXG5cdH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZWR1Y2Vycy9jYWNoZS5qcyIsImltcG9ydCAqIGFzIHR5cGVzIGZyb20gXCIuLi9hY3Rpb25zL2R5bmFtaWNcIjtcclxuY29uc3QgaW5pdGlhbFN0YXRlID0ge1xyXG4gIHRhc2tMb2dMaXN0OiBbXSxcclxuICB0YXNrTGlzdDogXCJcIixcclxuICB0YXNrTG9nTGlzdEdyb3VwOiBbXSxcclxuICBzZWFyY2g6IHt9XHJcbn07XHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRhc2tsb2coc3RhdGUgPSBpbml0aWFsU3RhdGUsIGFjdGlvbiA9IHt9KSB7XHJcbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xyXG4gICAgY2FzZSB0eXBlcy5TRUFSQ0g6XHJcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgeyBzZWFyY2g6IGFjdGlvbi5wYXlsb2FkIH0pO1xyXG5cclxuICAgIGNhc2UgdHlwZXMuVEFTS0xPR19UQVNLSU5GTzpcclxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7IHRhc2tMb2dMaXN0OiBhY3Rpb24ucGF5bG9hZCB9KTtcclxuICAgIGNhc2UgdHlwZXMuVEFTS0xPR19MSVNUOlxyXG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHsgdGFza0xpc3Q6IGFjdGlvbi5wYXlsb2FkIH0pO1xyXG4gICAgY2FzZSB0eXBlcy5UQVNLTE9HX0xJU1RfR1JPVVA6XHJcbiAgICAgIC8vICAgICAgIGNvbnNvbGUubG9nKGFjdGlvbi5wYXlsb2FkLCBcImFjdGlvbi5wYXlsb2FkXCIpO1xyXG4gICAgICBsZXQgZGF0YSA9IHN0YXRlLnRhc2tMb2dMaXN0R3JvdXA7XHJcbiAgICAgIGlmICghc3RhdGUudGFza0xvZ0xpc3RHcm91cC5kYXRhIHx8IGFjdGlvbi5wYXlsb2FkLnBhZ2VObyA9PSAxKSB7XHJcbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XHJcbiAgICAgICAgICB0YXNrTG9nTGlzdEdyb3VwOiBhY3Rpb24ucGF5bG9hZC5saXN0XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgYWN0aW9uLnBheWxvYWQucGFnZU5vICE9IHN0YXRlLnRhc2tMb2dMaXN0R3JvdXAuZGF0YS5yZXN1bHQucGFnZU5vXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICBjb25zdCBsaXN0ID0gZGF0YS5kYXRhLnJlc3VsdC5saXN0LmNvbmNhdChcclxuICAgICAgICAgICAgYWN0aW9uLnBheWxvYWQubGlzdC5kYXRhLnJlc3VsdC5saXN0XHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgZGF0YSA9IF8ubWVyZ2Uoe30sIGRhdGEsIGFjdGlvbi5wYXlsb2FkLmxpc3QpO1xyXG4gICAgICAgICAgZGF0YS5kYXRhLnJlc3VsdC5saXN0ID0gbGlzdDtcclxuICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgeyB0YXNrTG9nTGlzdEdyb3VwOiBkYXRhIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgZGVmYXVsdDpcclxuICAgICAgcmV0dXJuIHN0YXRlO1xyXG4gIH1cclxufVxyXG5cclxuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSDliIblibLnur/vvIzkuIvpnaLnmoTmmK/ku6XliY3nmoTvvIzkuIrpnaLnmoTmmK/njrDlnKjopoHnlKjnmoQgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIFxyXG5cclxuY29uc3QgaW5pdGlhbFN0YXRlID0ge1xyXG4gICAgdGFza0xvZ0xpc3Q6IFtdLFxyXG4gICAgdGFza0xpc3Q6ICcnLFxyXG4gICAgdGFza0xvZ0xpc3RHcm91cDpbXVxyXG59O1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0YXNrbG9nKHN0YXRlID0gaW5pdGlhbFN0YXRlLCBhY3Rpb24gPSB7fSkge1xyXG5cclxuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcclxuICAgICAgICAgIGNhc2UgdHlwZXMuVEFTS0xPR19UQVNLSU5GTzpcclxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7IHRhc2tMb2dMaXN0OiBhY3Rpb24ucGF5bG9hZCB9KTsgICBcclxuICAgICAgICAgICAgY2FzZSB0eXBlcy5UQVNLTE9HX0xJU1Q6XHJcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgeyB0YXNrTGlzdDogYWN0aW9uLnBheWxvYWQgfSk7ICAgXHJcbiAgICAgICAgICAgIGNhc2UgdHlwZXMuVEFTS0xPR19MSVNUX0dST1VQOlxyXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHsgdGFza0xvZ0xpc3RHcm91cDogYWN0aW9uLnBheWxvYWQgfSk7ICBcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICByZXR1cm4gc3RhdGU7XHJcbiAgICB9XHJcbn1cclxuXHJcbiovXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3JlZHVjZXJzL2R5bmFtaWMuanMiLCJpbXBvcnQgKiBhcyB0eXBlcyBmcm9tICcuLi9hY3Rpb25zL2ZlZWRiYWNrJ1xyXG5cclxuY29uc3QgaW5pdGlhbFN0YXRlID0ge1xyXG4gICAgYWRkOm51bGxcclxufTtcclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZmVlZGJhY2soc3RhdGUgPSBpbml0aWFsU3RhdGUsIGFjdGlvbiA9IHt9KSB7XHJcblxyXG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xyXG4gICAgICAgIGNhc2UgdHlwZXMuRkVFRF9BREQ6XHJcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgeyBhZGQ6IGFjdGlvbi5wYXlsb2FkIH0pOyAgICAgICAgICBcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICByZXR1cm4gc3RhdGU7XHJcbiAgICB9XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZWR1Y2Vycy9mZWVkYmFjay5qcyIsImltcG9ydCAqIGFzIHR5cGVzIGZyb20gJy4uL2FjdGlvbnMvaGVscCdcclxuXHJcbmNvbnN0IGluaXRpYWxTdGF0ZSA9IHtcclxuICAgIGxpc3Q6IFtdLFxyXG4gICAgdHlwZUxpc3Q6W10sXHJcbiAgICBoZWxwczp7fSxcclxufTtcclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaGVscChzdGF0ZSA9IGluaXRpYWxTdGF0ZSwgYWN0aW9uID0ge30pIHtcclxuXHJcbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XHJcbiAgICAgICAgY2FzZSB0eXBlcy5IRUhQU19MSVNUOlxyXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHsgbGlzdDogYWN0aW9uLnBheWxvYWQgfSk7ICAgXHJcbiAgICAgICAgY2FzZSB0eXBlcy5IRUhQU19UWVBFX0xJU1Q6XHJcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgeyB0eXBlTGlzdDogYWN0aW9uLnBheWxvYWQgfSk7ICAgXHJcbiAgICAgICAgY2FzZSB0eXBlcy5IRUhQU19ERVRBSUw6XHJcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgeyBoZWxwczogYWN0aW9uLnBheWxvYWQgfSk7ICBcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICByZXR1cm4gc3RhdGU7XHJcbiAgICB9XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZWR1Y2Vycy9oZWxwLmpzIiwiaW1wb3J0IHsgY29tYmluZVJlZHVjZXJzIH0gZnJvbSBcInJlZHV4XCI7XG5cbmltcG9ydCB1c2VyIGZyb20gXCIuL3VzZXJcIjtcbmltcG9ydCBwcm9qZWN0IGZyb20gXCIuL3Byb2plY3RcIjtcbmltcG9ydCB0YXNrIGZyb20gXCIuL3Rhc2tcIjtcbmltcG9ydCBsYWJlbCBmcm9tIFwiLi9sYWJlbFwiO1xuaW1wb3J0IGZlZWRiYWNrIGZyb20gXCIuL2ZlZWRiYWNrXCI7XG5pbXBvcnQgZHluYW1pYyBmcm9tIFwiLi9keW5hbWljXCI7XG5pbXBvcnQgaGVscCBmcm9tIFwiLi9oZWxwXCI7XG5pbXBvcnQgY2FjaGUgZnJvbSBcIi4vY2FjaGVcIjtcbmltcG9ydCBzdGF0aXN0aWNzIGZyb20gXCIuL3N0YXRpc3RpY3NcIjtcbmV4cG9ydCBkZWZhdWx0IGNvbWJpbmVSZWR1Y2Vycyh7XG4gIHVzZXIsXG4gIHByb2plY3QsXG4gIHRhc2ssXG4gIGxhYmVsLFxuICBmZWVkYmFjayxcbiAgZHluYW1pYyxcbiAgaGVscCxcbiAgY2FjaGUsXG4gIHN0YXRpc3RpY3Ncbn0pO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVkdWNlcnMvaW5kZXguanMiLCJpbXBvcnQgKiBhcyB0eXBlcyBmcm9tICcuLi9hY3Rpb25zL2xhYmVsJ1xyXG5jb25zdCBpbml0aWFsU3RhdGUgPSB7XHJcbiAgICBsYWJlbExpc3Q6W10sXHJcbiAgICB0YWdMaXN0OltdLFxyXG4gICAgcHJvamVjdFR5cGVMaXN0OltdLFxyXG4gICAgYWRkUHJvamVjdFR5cGVMaXN0OltdLFxyXG4gICAgcHVibGljTGFiZWxMaXN0OltdLFxyXG4gICAgYWRkTGFiZWxMaXN0OltdLFxyXG59O1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBsYWJlbChzdGF0ZSA9IGluaXRpYWxTdGF0ZSwgYWN0aW9uID0ge30pIHtcclxuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHsgICBcclxuICAgIFx0Y2FzZSB0eXBlcy5MQUJFTF9MSVNUOlxyXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHsgbGFiZWxMaXN0OiBhY3Rpb24ucGF5bG9hZH0pOyBcclxuICAgICAgICBjYXNlIHR5cGVzLlRBR19MSVNUOlxyXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHsgdGFnTGlzdDogYWN0aW9uLnBheWxvYWR9KTsgXHJcbiAgICAgICAgY2FzZSB0eXBlcy5QUk9KRUNUX1RZUEVfTElTVDpcclxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7IHByb2plY3RUeXBlTGlzdDogYWN0aW9uLnBheWxvYWR9KTsgXHJcbiAgICAgICAgY2FzZSB0eXBlcy5BRERfUFJPSkVDVF9UWVBFOlxyXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHsgYWRkUHJvamVjdFR5cGVMaXN0OiBhY3Rpb24ucGF5bG9hZH0pOyBcclxuICAgICAgICBjYXNlIHR5cGVzLlBVQkxJQ19MQUJFTF9MSVNUOlxyXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHsgcHVibGljTGFiZWxMaXN0OiBhY3Rpb24ucGF5bG9hZH0pOyBcclxuICAgICAgICBjYXNlIHR5cGVzLkxBQkVMX1VTRVI6XHJcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgeyBsYWJlbFVzZXI6IGFjdGlvbi5wYXlsb2FkfSk7IFxyXG4gICAgICAgIGNhc2UgdHlwZXMuQUREX0xBQkVMOlxyXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHsgYWRkTGFiZWxMaXN0OiBhY3Rpb24ucGF5bG9hZH0pOyBcclxuICAgICAgICBjYXNlIHR5cGVzLkFERF9MQUJFTF9VU0VSOlxyXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHsgYWRkTGFiZWxVc2VyOiBhY3Rpb24ucGF5bG9hZH0pOyBcclxuICAgICAgICBjYXNlIHR5cGVzLlBFUlNPTl9MQUJFTDpcclxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7IHBlcnNvbkxhYmVsOiBhY3Rpb24ucGF5bG9hZH0pOyBcclxuICAgICAgICBjYXNlIHR5cGVzLkFERF9QRVJTT05fTEFCRUw6XHJcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgeyBhZGRQZXJzb25MYWJlbDogYWN0aW9uLnBheWxvYWR9KTsgXHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgcmV0dXJuIHN0YXRlO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSDliIblibLnur/vvIzkuIvpnaLnmoTmmK/ku6XliY3nmoTvvIzkuIrpnaLnmoTmmK/njrDlnKjopoHnlKjnmoQgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIFxyXG5cclxuXHJcbmltcG9ydCAqIGFzIHR5cGVzIGZyb20gJy4uL2FjdGlvbnMvbGFiZWwnXHJcblxyXG5jb25zdCBpbml0aWFsU3RhdGUgPSB7XHJcbiAgICBcclxuICAgIGxhYmVsQWRkdGFzazpudWxsLFxyXG4gICAgbGFiZWxEZWxldGU6bnVsbCxcclxuICAgIGxhYmVsRGVsZXRlUmVsYXRpb246bnVsbCxcclxuICAgIGxhYmVsQm94U3RhdGU6bnVsbCxcclxufTtcclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbGFiZWwoc3RhdGUgPSBpbml0aWFsU3RhdGUsIGFjdGlvbiA9IHt9KSB7XHJcblxyXG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xyXG4gICAgICAgIGNhc2UgdHlwZXMuTEFCRUxfTElTVDpcclxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7IGxhYmVsTGlzdDogYWN0aW9uLnBheWxvYWQgfSk7IFxyXG4gICAgICAgICAgICBjYXNlIHR5cGVzLkxBQkVMX0FERF9UQVNLSU5GTzpcclxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7IGxhYmVsQWRkdGFzazogYWN0aW9uLnBheWxvYWQgfSk7ICAgXHJcbiAgICAgICAgY2FzZSB0eXBlcy5MQUJFTF9ERUxFVEU6XHJcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgeyBsYWJlbERlbGV0ZTogYWN0aW9uLnBheWxvYWQgfSk7ICAgICBcclxuICAgICAgICBjYXNlIHR5cGVzLkxBQkVMX0FERF9UQVNLSU5GT19MSVNUOlxyXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHsgbGFiZWxEZWxldGVSZWxhdGlvbjogYWN0aW9uLnBheWxvYWQgfSk7ICAgXHJcbiAgICAgICAgY2FzZSB0eXBlcy5MQUJFTF9ERUxFVEVfVEFTS0lORk9fTElTVDpcclxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7IGxhYmVsRGVsZXRlUmVsYXRpb246IGFjdGlvbi5wYXlsb2FkIH0pOyAgICAgICAgXHJcbiAgICAgICAgY2FzZSB0eXBlcy5MQUJFTF9CT1hfU1RBVEU6XHJcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgeyBsYWJlbEJveFN0YXRlOiBhY3Rpb24ucGF5bG9hZCB9KTsgICAgICBcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICByZXR1cm4gc3RhdGU7XHJcbiAgICB9XHJcbn0qL1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3JlZHVjZXJzL2xhYmVsLmpzIiwiaW1wb3J0ICogYXMgdHlwZXMgZnJvbSBcIi4uL2FjdGlvbnMvcHJvamVjdFwiO1xyXG5jb25zdCBpbml0aWFsU3RhdGUgPSB7XHJcblx0cHJvamVjdExpc3Q6IHt9LFxyXG5cdHByb2plY3RDcmVhdGU6IG51bGwsXHJcblx0cHJvamVjdERldGFpbHM6IFtdLFxyXG5cdGFkZFdpdGNoUHJvamVjdDoge30sXHJcblx0Y2FuY2VsV2l0Y2hQcm9qZWN0OiB7fSxcclxuXHRnZXRQcm9qZWN0Q3JlYXRlSW5mbzoge30sXHJcblx0Y3JlYXRlUHJvamVjdEFsbDoge30sXHJcblx0b3BlblByb2plY3Q6IHt9LFxyXG5cdHByb2plY3RMaXN0SnVyaXNkaWN0aW9uOiB7fSxcclxuXHRwcm9qZWN0VXNlckluZm86IG51bGwsXHJcblx0cHJvamVjdFNlbGVjdENvdW50OiAwXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwcm9qZWN0KHN0YXRlID0gaW5pdGlhbFN0YXRlLCBhY3Rpb24gPSB7fSkge1xyXG5cdHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcclxuXHRcdGNhc2UgdHlwZXMuUFJPSkVDVF9TRUxFQ1RfTElTVENPVU5UOlxyXG5cdFx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcclxuXHRcdFx0XHRwcm9qZWN0U2VsZWN0Q291bnQ6IGFjdGlvbi5wYXlsb2FkXHJcblx0XHRcdH0pO1xyXG5cdFx0Y2FzZSB0eXBlcy5QUk9KRUNUX1VTRVJJTkZPOlxyXG5cdFx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcclxuXHRcdFx0XHRwcm9qZWN0VXNlckluZm86IGFjdGlvbi5wYXlsb2FkXHJcblx0XHRcdH0pO1xyXG5cdFx0Y2FzZSB0eXBlcy5QUk9KRUNUX0xJU1RfSlVSSVNESUNUSU9OOlxyXG5cdFx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcclxuXHRcdFx0XHRwcm9qZWN0TGlzdEp1cmlzZGljdGlvbjogYWN0aW9uLnBheWxvYWRcclxuXHRcdFx0fSk7XHJcblx0XHRjYXNlIHR5cGVzLlBST0pFQ1RfTElTVDpcclxuXHRcdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XHJcblx0XHRcdFx0cHJvamVjdExpc3Q6IGFjdGlvbi5wYXlsb2FkXHJcblx0XHRcdH0pO1xyXG5cdFx0Y2FzZSB0eXBlcy5QUk9KRUNUX0FERDpcclxuXHRcdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XHJcblx0XHRcdFx0cHJvamVjdENyZWF0ZTogYWN0aW9uLnBheWxvYWRcclxuXHRcdFx0fSk7XHJcblx0XHRjYXNlIHR5cGVzLlBST0pFQ1RfREVUQUlMUzpcclxuXHRcdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XHJcblx0XHRcdFx0cHJvamVjdERldGFpbHM6IGFjdGlvbi5wYXlsb2FkXHJcblx0XHRcdH0pO1xyXG5cdFx0Y2FzZSB0eXBlcy5QUk9KRUNUX1VQREVUX0FMTDpcclxuXHRcdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XHJcblx0XHRcdFx0cHJvamVjdERldGFpbHM6IGFjdGlvbi5wYXlsb2FkXHJcblx0XHRcdH0pO1xyXG5cdFx0Y2FzZSB0eXBlcy5BRERfQVRURU5USU9OX1dJVENIX1BST0pFQ1Q6XHJcblx0XHRcdHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xyXG5cdFx0XHRcdGFkZFdpdGNoUHJvamVjdDogYWN0aW9uLnBheWxvYWRcclxuXHRcdFx0fSk7XHJcblx0XHRjYXNlIHR5cGVzLkNBTkNFTF9BVFRFTlRJT05fV0lUQ0hfUFJPSkVDVDpcclxuXHRcdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XHJcblx0XHRcdFx0Y2FuY2VsV2l0Y2hQcm9qZWN0OiBhY3Rpb24ucGF5bG9hZFxyXG5cdFx0XHR9KTtcclxuXHRcdGNhc2UgdHlwZXMuR0VUX1BST0pFQ1RfQ1JFQVRFX0lORk9fQllfSUQ6XHJcblx0XHRcdHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xyXG5cdFx0XHRcdGdldFByb2plY3RDcmVhdGVJbmZvOiBhY3Rpb24ucGF5bG9hZFxyXG5cdFx0XHR9KTtcclxuXHRcdGNhc2UgdHlwZXMuQ1JFQVRFX1BST0pFQ1Q6XHJcblx0XHRcdHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xyXG5cdFx0XHRcdGNyZWF0ZVByb2plY3RBbGw6IGFjdGlvbi5wYXlsb2FkXHJcblx0XHRcdH0pO1xyXG5cdFx0Y2FzZSB0eXBlcy5PUEVOX1BST0pFQ1Q6XHJcblx0XHRcdHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xyXG5cdFx0XHRcdG9wZW5Qcm9qZWN0OiBhY3Rpb24ucGF5bG9hZFxyXG5cdFx0XHR9KTtcclxuXHRcdGRlZmF1bHQ6XHJcblx0XHRcdHJldHVybiBzdGF0ZTtcclxuXHR9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVkdWNlcnMvcHJvamVjdC5qcyIsImltcG9ydCAqIGFzIHR5cGVzIGZyb20gXCIuLi9hY3Rpb25zL3N0YXRpc3RpY3NcIjtcclxuY29uc3QgaW5pdGlhbFN0YXRlID0ge1xyXG4gIHBpZURhdGE6IG51bGwsXHJcbiAgcGVuUHJvamVjdDoge30sXHJcbiAgcGVuUGVyc29uOiB7fSxcclxuICB0YXNrTnVtc1Byb2plY3Q6IHt9LFxyXG4gIHRhc2tOdW1zUGVyc29uOiB7fSxcclxuICBwZXJmb3JtVHlwZTogXCJ0YXNrXCIsXHJcbiAgbW9udGhUeXBlOiB7XHJcbiAgICB0eXBlOiBcIm5vd01vbnRoXCIsXHJcbiAgICBhdHRkYXRlMDE6IG5ldyBEYXRlKFwiMjAxNi8xLzFcIiksXHJcbiAgICBhdHRkYXRlMDI6IG5ldyBEYXRlKFwiMjAxNi8xLzFcIiksXHJcbiAgICB2YWx1ZTogbnVsbFxyXG4gIH0sXHJcbiAgcHJvamVjdExpc3Q6IG51bGwsXHJcbiAgcHJvamVjdFR5cGU6IDEsXHJcbiAgcHJvamVjdElkczogW11cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRhc2soc3RhdGUgPSBpbml0aWFsU3RhdGUsIGFjdGlvbiA9IHt9KSB7XHJcbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xyXG4gICAgY2FzZSB0eXBlcy5QUk9KRUNUX0lEUzpcclxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7IHByb2plY3RJZHM6IGFjdGlvbi5wYXlsb2FkIH0pO1xyXG4gICAgY2FzZSB0eXBlcy5QUk9KRUNUX1RZUEU6XHJcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgeyBwcm9qZWN0VHlwZTogYWN0aW9uLnBheWxvYWQgfSk7XHJcbiAgICBjYXNlIHR5cGVzLlNUX1BST0pFQ1RfTElTVDpcclxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7IHByb2plY3RMaXN0OiBhY3Rpb24ucGF5bG9hZCB9KTtcclxuICAgIGNhc2UgdHlwZXMuUEVSRk9STV9UWVBFOlxyXG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHsgcGVyZm9ybVR5cGU6IGFjdGlvbi5wYXlsb2FkIH0pO1xyXG4gICAgY2FzZSB0eXBlcy5NT05USF9UWVBFOlxyXG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHsgbW9udGhUeXBlOiBhY3Rpb24ucGF5bG9hZCB9KTtcclxuICAgIGNhc2UgdHlwZXMuUElFX0NIQVQ6XHJcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgeyBwaWVEYXRhOiBhY3Rpb24ucGF5bG9hZCB9KTtcclxuICAgIGNhc2UgdHlwZXMuUEVOX1BST0pFQ1Q6XHJcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgeyBwZW5Qcm9qZWN0OiBhY3Rpb24ucGF5bG9hZCB9KTtcclxuICAgIGNhc2UgdHlwZXMuUEVOX1BFUlNPTjpcclxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7IHBlblBlcnNvbjogYWN0aW9uLnBheWxvYWQgfSk7XHJcbiAgICBjYXNlIHR5cGVzLlRBU0tfTlVNU19QUk9KRUNUOlxyXG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHsgdGFza051bXNQcm9qZWN0OiBhY3Rpb24ucGF5bG9hZCB9KTtcclxuICAgIGNhc2UgdHlwZXMuVEFTS19OVU1TX1BFUlNPTjpcclxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7IHRhc2tOdW1zUGVyc29uOiBhY3Rpb24ucGF5bG9hZCB9KTtcclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgIHJldHVybiBzdGF0ZTtcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVkdWNlcnMvc3RhdGlzdGljcy5qcyIsImltcG9ydCAqIGFzIHR5cGVzIGZyb20gXCIuLi9hY3Rpb25zL3Rhc2tcIjtcclxuaW1wb3J0IHV0aWxzIGZyb20gXCIuLi91dGlscy91dGlsc1wiO1xyXG5jb25zdCBpbml0aWFsU3RhdGUgPSB7XHJcblx0aG9tZURhdGE6IHt9LFxyXG5cdGRpbmd0YWtNZXNzYWdlOiBcIlwiLFxyXG5cdHRhc2tpbmZvSWQ6IG51bGwsXHJcblx0dGFza0xpc3RCeUNvbmRpdGlvbjoge30sXHJcblx0dGFza0RldGFpbHM6IHt9LFxyXG5cdHRhc2tDaGlsZExpc3Q6IHt9LFxyXG5cdHRhc2tSZWxldmFuY2VMaXN0OiB7fSxcclxuXHR0YXNrRmlsZXNMaXN0OiB7fSxcclxuXHR0YXNrSW5mb1VwZGF0ZURhdGE6IHt9LFxyXG5cdHRhc2tJbmZvVXBkYXRlRmlsZXM6IHt9LFxyXG5cdHRhc2tEZWxldGVGaWxlOiB7fSxcclxuXHR0YXNrQWRkVGFsazoge30sXHJcblx0dGFza0RlbGV0ZVRhbGs6IHt9LFxyXG5cdHRhc2tDcmVhdGU6IHt9LFxyXG5cdHRhc2tQcmlvcml0eUxpc3Q6IHt9LFxyXG5cdHRhc2tQcm9qZWN0TGlzdDoge30sXHJcblx0dGFza0NyZWF0ZVZhbHM6IHtcclxuXHRcdGlkOiBcIlwiLFxyXG5cdFx0dGFza25hbWU6IFwiXCIsXHJcblx0XHRyZW1hcmtzOiBcIlwiLCAvLyDku7vliqHmj4/ov7BcclxuXHRcdHVzZXJSZXNwb25zZToge30sXHJcblx0XHRwbGFuRW5kVGltZTogXCJcIixcclxuXHRcdHVzZXJGbG93OiB7fSxcclxuXHRcdGZsb3dDb250ZW46IFwiXCIsXHJcblx0XHRjb2VmZmljaWVudHR5cGU6IFwiXCIsXHJcblx0XHR3b3JrVGltZTogXCJcIixcclxuXHRcdGxhYmVsczogW10sXHJcblx0XHRtb2JpbGVGaWxlOiBbXSwgLy8g5o+P6L+w5paH5Lu2XHJcblx0XHRjYXRlZ29yeTogXCIxXCJcclxuXHR9LFxyXG5cdHRhc2tEZWxldGU6IHt9LFxyXG5cdHRhc2tDcmVhdGVCcmVhZDogW10sXHJcblx0dGFza1VwZGF0ZVN0YXRlOiB7fSxcclxuXHRjb3VudFByb2plY3Q6IHt9LFxyXG5cdGNvdW50VGFza0xpc3Q6IHt9LFxyXG5cdHByb2plY3RDb3VuOiBudWxsLFxyXG5cdHJlZnJlc2g6IGZhbHNlLFxyXG5cdGZpbGVMaXN0OiBbXSxcclxuXHR0ZWFtTGlzdDogW10sXHJcblx0dGFza2luZm9SZWZyZXNoOiB7IHNpZ246IGZhbHNlLCBpZDogXCJcIiB9LFxyXG5cdHRhc2tVcGRhdGVTdGF0ZToge30sXHJcblx0dGFza0N1aUJhbjoge30sXHJcblx0dGFza1NlYXJjaE9iamVjdDoge30sXHJcblx0bm93UGFnZTogMCxcclxuXHRzZWxlY3RlZFVzZXJzOiBbXSxcclxuXHRzZWxlY3RlZFByb3M6IFtdIC8v562b6YCJ6aG16Z2i55qEcHJvamVjdOaVsOaNrlxyXG59O1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0YXNrKHN0YXRlID0gaW5pdGlhbFN0YXRlLCBhY3Rpb24gPSB7fSkge1xyXG5cdHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcclxuXHRcdGNhc2UgdHlwZXMuU0VMRUNURURfVVNFUlM6XHJcblx0XHRcdHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xyXG5cdFx0XHRcdHNlbGVjdGVkVXNlcnM6IGFjdGlvbi5wYXlsb2FkXHJcblx0XHRcdH0pO1xyXG5cdFx0Y2FzZSB0eXBlcy5OT1dfUEFHRTpcclxuXHRcdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XHJcblx0XHRcdFx0bm93UGFnZTogYWN0aW9uLnBheWxvYWRcclxuXHRcdFx0fSk7XHJcblx0XHRjYXNlIHR5cGVzLlNFTEVDVEVEX1RBRzpcclxuXHRcdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XHJcblx0XHRcdFx0c2VsZWN0VGFnczogYWN0aW9uLnBheWxvYWRcclxuXHRcdFx0fSk7XHJcblx0XHRjYXNlIHR5cGVzLlNFTEVDVEVEX1BST1M6XHJcblx0XHRcdHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xyXG5cdFx0XHRcdHNlbGVjdGVkUHJvczogYWN0aW9uLnBheWxvYWRcclxuXHRcdFx0fSk7XHJcblx0XHRjYXNlIHR5cGVzLlRBU0tfU0VBUkNIX09CSkVDVDpcclxuXHRcdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XHJcblx0XHRcdFx0dGFza1NlYXJjaE9iamVjdDogYWN0aW9uLnBheWxvYWRcclxuXHRcdFx0fSk7XHJcblx0XHRjYXNlIHR5cGVzLkhPTUVfREFUQTpcclxuXHRcdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XHJcblx0XHRcdFx0aG9tZURhdGE6IGFjdGlvbi5wYXlsb2FkXHJcblx0XHRcdH0pO1xyXG5cdFx0Y2FzZSB0eXBlcy5ESU5HVEFLX01FU1NBR0VfREVMRVRFOlxyXG5cdFx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcclxuXHRcdFx0XHRkaW5ndGFrTWVzc2FnZTogYWN0aW9uLnBheWxvYWRcclxuXHRcdFx0fSk7XHJcblx0XHRjYXNlIHR5cGVzLlRBU0tJTkZPX0lEOlxyXG5cdFx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcclxuXHRcdFx0XHR0YXNraW5mb0lkOiBhY3Rpb24ucGF5bG9hZFxyXG5cdFx0XHR9KTtcclxuXHRcdGNhc2UgdHlwZXMuQkFDS19GTjpcclxuXHRcdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XHJcblx0XHRcdFx0YmFja1Jlc3V0OiBhY3Rpb24ucGF5bG9hZFxyXG5cdFx0XHR9KTtcclxuXHRcdGNhc2UgdHlwZXMuVEFTS19MSVNUX0JZX0NPTkRJVElPTjpcclxuXHRcdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XHJcblx0XHRcdFx0dGFza0xpc3RCeUNvbmRpdGlvbjogYWN0aW9uLnBheWxvYWRcclxuXHRcdFx0fSk7XHJcblx0XHRjYXNlIHR5cGVzLlRBU0tfREVUQUlMUzpcclxuXHRcdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XHJcblx0XHRcdFx0dGFza0RldGFpbHM6IGFjdGlvbi5wYXlsb2FkXHJcblx0XHRcdH0pO1xyXG5cdFx0Y2FzZSB0eXBlcy5UQVNLX0NISUxEX0xJU1RfQllfSUQ6XHJcblx0XHRcdHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xyXG5cdFx0XHRcdHRhc2tDaGlsZExpc3Q6IGFjdGlvbi5wYXlsb2FkXHJcblx0XHRcdH0pO1xyXG5cdFx0Y2FzZSB0eXBlcy5UQVNLX1JFTEVWQU5DRV9MSVNUX0JZX0lEOlxyXG5cdFx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcclxuXHRcdFx0XHR0YXNrUmVsZXZhbmNlTGlzdDogYWN0aW9uLnBheWxvYWRcclxuXHRcdFx0fSk7XHJcblx0XHRjYXNlIHR5cGVzLlRBU0tfRklMRVNfTElTVF9CWV9JRDpcclxuXHRcdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XHJcblx0XHRcdFx0dGFza0ZpbGVzTGlzdDogYWN0aW9uLnBheWxvYWRcclxuXHRcdFx0fSk7XHJcblx0XHRjYXNlIHR5cGVzLlRBU0tfVEFTS0lORk9fVVBEQVRFOlxyXG5cdFx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcclxuXHRcdFx0XHR0YXNrSW5mb1VwZGF0ZURhdGE6IGFjdGlvbi5wYXlsb2FkXHJcblx0XHRcdH0pO1xyXG5cdFx0Y2FzZSB0eXBlcy5UQVNLSU5GT19VUExPQURJTkc6XHJcblx0XHRcdHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xyXG5cdFx0XHRcdHRhc2tJbmZvVXBkYXRlRmlsZXM6IGFjdGlvbi5wYXlsb2FkXHJcblx0XHRcdH0pO1xyXG5cdFx0Y2FzZSB0eXBlcy5UQVNLX0ZJTEVTX0RFTEVURTpcclxuXHRcdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XHJcblx0XHRcdFx0dGFza0RlbGV0ZUZpbGU6IGFjdGlvbi5wYXlsb2FkXHJcblx0XHRcdH0pO1xyXG5cdFx0Y2FzZSB0eXBlcy5UQVNLX0FERF9UQUxLOlxyXG5cdFx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcclxuXHRcdFx0XHR0YXNrQWRkVGFsazogYWN0aW9uLnBheWxvYWRcclxuXHRcdFx0fSk7XHJcblx0XHRjYXNlIHR5cGVzLlRBU0tfREVMRVRFX1RBTEs6XHJcblx0XHRcdHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xyXG5cdFx0XHRcdHRhc2tEZWxldGVUYWxrOiBhY3Rpb24ucGF5bG9hZFxyXG5cdFx0XHR9KTtcclxuXHRcdGNhc2UgdHlwZXMuVEFTS19DUkVBVEU6XHJcblx0XHRcdHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xyXG5cdFx0XHRcdHRhc2tDcmVhdGU6IGFjdGlvbi5wYXlsb2FkXHJcblx0XHRcdH0pO1xyXG5cdFx0Y2FzZSB0eXBlcy5UQVNLX1BSSU9SSVRZX0xJU1Q6XHJcblx0XHRcdHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xyXG5cdFx0XHRcdHRhc2tQcmlvcml0eUxpc3Q6IGFjdGlvbi5wYXlsb2FkXHJcblx0XHRcdH0pO1xyXG5cdFx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcclxuXHRcdFx0XHR0YXNrRmlsZXNMaXN0OiBhY3Rpb24ucGF5bG9hZFxyXG5cdFx0XHR9KTtcclxuXHRcdGNhc2UgdHlwZXMuVEFTS0lORk9fVEFTS19CWV9QUk9fTElTVDpcclxuXHRcdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XHJcblx0XHRcdFx0dGFza1Byb2plY3RMaXN0OiBhY3Rpb24ucGF5bG9hZFxyXG5cdFx0XHR9KTtcclxuXHRcdGNhc2UgdHlwZXMuVEFTS19DUkVBVEVfVkFMUzpcclxuXHRcdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XHJcblx0XHRcdFx0dGFza0NyZWF0ZVZhbHM6IGFjdGlvbi5wYXlsb2FkXHJcblx0XHRcdH0pO1xyXG5cdFx0Y2FzZSB0eXBlcy5UQVNLX0RFTEVURTpcclxuXHRcdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XHJcblx0XHRcdFx0dGFza0RlbGV0ZTogYWN0aW9uLnBheWxvYWRcclxuXHRcdFx0fSk7XHJcblx0XHRjYXNlIHR5cGVzLlRBU0tfQ1JFQVRFX0JSRUFEOlxyXG5cdFx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcclxuXHRcdFx0XHR0YXNrQ3JlYXRlQnJlYWQ6IGFjdGlvbi5wYXlsb2FkXHJcblx0XHRcdH0pO1xyXG5cdFx0Y2FzZSB0eXBlcy5UQVNLX1VQREFURV9TVEFURTpcclxuXHRcdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XHJcblx0XHRcdFx0dGFza1VwZGF0ZVN0YXRlOiBhY3Rpb24ucGF5bG9hZFxyXG5cdFx0XHR9KTtcclxuXHRcdGNhc2UgdHlwZXMuQ0FMQ1VMQVRFX1BST0pFQ1Q6XHJcblx0XHRcdHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xyXG5cdFx0XHRcdGNvdW50UHJvamVjdDogYWN0aW9uLnBheWxvYWRcclxuXHRcdFx0fSk7XHJcblx0XHRjYXNlIHR5cGVzLkNBTENVTEFURV9UQVNLX1RBQkxFOlxyXG5cdFx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcclxuXHRcdFx0XHRjb3VudFRhc2tMaXN0OiBhY3Rpb24ucGF5bG9hZFxyXG5cdFx0XHR9KTtcclxuXHRcdGNhc2UgdHlwZXMuUFJPSkVDVF9DT1VOVDpcclxuXHRcdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XHJcblx0XHRcdFx0cHJvamVjdENvdW46IGFjdGlvbi5wYXlsb2FkXHJcblx0XHRcdH0pO1xyXG5cdFx0Y2FzZSB0eXBlcy5SRUZSRVNIX1RJTUU6XHJcblx0XHRcdHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xyXG5cdFx0XHRcdHJlZnJlc2g6IGFjdGlvbi5wYXlsb2FkXHJcblx0XHRcdH0pO1xyXG5cdFx0Y2FzZSB0eXBlcy5GSUxFU19MSVNUOlxyXG5cdFx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcclxuXHRcdFx0XHRmaWxlTGlzdDogYWN0aW9uLnBheWxvYWRcclxuXHRcdFx0fSk7XHJcblx0XHRjYXNlIHR5cGVzLkNBTENVTEFURV9URUFNOlxyXG5cdFx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcclxuXHRcdFx0XHR0ZWFtTGlzdDogYWN0aW9uLnBheWxvYWRcclxuXHRcdFx0fSk7XHJcblx0XHRjYXNlIHR5cGVzLlRBU0tJTkZPX1JFRlJFU0g6XHJcblx0XHRcdHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xyXG5cdFx0XHRcdHRhc2tpbmZvUmVmcmVzaDogYWN0aW9uLnBheWxvYWRcclxuXHRcdFx0fSk7XHJcblx0XHRjYXNlIHR5cGVzLlRBU0tfQ1VJQkFOOlxyXG5cdFx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcclxuXHRcdFx0XHR0YXNrQ3VpQmFuOiBhY3Rpb24ucGF5bG9hZFxyXG5cdFx0XHR9KTtcclxuXHRcdGRlZmF1bHQ6XHJcblx0XHRcdHJldHVybiBzdGF0ZTtcclxuXHR9XHJcblxyXG5cdC8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0g5YiG5Ymy57q/77yM5LiL6Z2i55qE5piv5Lul5YmN55qE77yM5LiK6Z2i55qE5piv546w5Zyo6KaB55So55qEIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBcclxuXHJcblxyXG5pbXBvcnQgeyBFTkdJTkVfTUVUSE9EX0NJUEhFUlMgfSBmcm9tICdjb25zdGFudHMnO1xyXG5cclxuY29uc3QgaW5pdGlhbFN0YXRlID0ge1xyXG4gICAgdGFza1Byb2plY3RMaXN0OltdLFxyXG4gICAgXHJcbiAgICB0YXNraW5mb0FkZEluaTpudWxsLFxyXG4gICAgdGFza2luZm9BZGQ6bnVsbCxcclxuICAgIHRhc2tMaXN0QnlQcm86W10sXHJcbiAgICB0YXNraW5mb0RldGFpbDpudWxsLFxyXG4gICAgdGFza2luZm9DaGlsZDpudWxsLFxyXG4gICAgdGFza2luZm9MZWF2bmNlOm51bGwsXHJcbiAgICB0YXNraW5mb1BpZDpudWxsLFxyXG4gICAgdGFza2luZm9GaWxlOltdLFxyXG4gICAgdGFza2luZm9MZWF2ZTpbXSxcclxuICAgIGxlYXZlRGVsZXRlOltdLFxyXG4gICAgbGVhdmVBZGQ6W10sXHJcbiAgICB0YXNraW5mb1VwZGF0ZTpudWxsLFxyXG4gICAgdGFza2luZm9EZWxldGVVc2VyOm51bGwsXHJcbiAgICB0YXNraW5mb1VwU2F0ZTpudWxsLFxyXG4gICAgdGFza2luZm9VcGxvYWRpbmc6bnVsbCxcclxuICAgIFxyXG4gICAgdGFza2luZm9Ib21lRGF0YTpbXSxcclxuICAgIHRhc2tpbmZvRGVsZXRlOm51bGwsXHJcbiAgICB0YXNrU2F2ZURhdGE6bnVsbCxcclxuICAgIGJhY2tSZXN1dDp7fSxcclxufTtcclxuXHJcbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XHJcbiAgICAgICAgY2FzZSB0eXBlcy5UQVNLSU5GT19QUk9KRUNUX0xJU1Q6XHJcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgeyB0YXNrUHJvamVjdExpc3Q6IGFjdGlvbi5wYXlsb2FkIH0pOyAgICAgICBcclxuICAgICAgICAgICAgICBcclxuICAgICAgICBjYXNlIHR5cGVzLlRBU0tJTkZPX0FERF9JTkk6XHJcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgeyB0YXNraW5mb0FkZEluaTogYWN0aW9uLnBheWxvYWQgfSk7ICAgICBcclxuICAgICAgICBjYXNlIHR5cGVzLlRBU0tJTkZPX0FERDpcclxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7IHRhc2tpbmZvQWRkOiBhY3Rpb24ucGF5bG9hZCB9KTsgICAgXHJcbiAgICAgICAgY2FzZSB0eXBlcy5UQVNLSU5GT19UQVNLX0JZX1BST19MSVNUOlxyXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHsgdGFza0xpc3RCeVBybzogYWN0aW9uLnBheWxvYWQgfSk7ICBcclxuICAgICAgICBjYXNlIHR5cGVzLlRBU0tJTkZPX0JZX0lEOlxyXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHsgdGFza2luZm9EZXRhaWw6IGFjdGlvbi5wYXlsb2FkIH0pOyAgICBcclxuICAgICAgICBjYXNlIHR5cGVzLlRBU0tJTkZPX0NISUxEOlxyXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHsgdGFza2luZm9DaGlsZDogYWN0aW9uLnBheWxvYWQgfSk7ICAgIFxyXG4gICAgICAgIGNhc2UgdHlwZXMuVEFTS0lORk9fTEVWQU5DRTpcclxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7IHRhc2tpbmZvTGVhdm5jZTogYWN0aW9uLnBheWxvYWQgfSk7ICAgIFxyXG4gICAgICAgIGNhc2UgdHlwZXMuVEFTS0lORk9fSURfUElEOlxyXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHsgdGFza2luZm9QaWQ6IGFjdGlvbi5wYXlsb2FkIH0pOyAgICBcclxuICAgICAgICBjYXNlIHR5cGVzLlRBU0tJTkZPX0ZJTEVTOlxyXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHsgdGFza2luZm9GaWxlOiBhY3Rpb24ucGF5bG9hZCB9KTsgICAgXHJcbiAgICAgICAgY2FzZSB0eXBlcy5UQVNLSU5GT19MRUFWRTpcclxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7IHRhc2tpbmZvTGVhdmU6IGFjdGlvbi5wYXlsb2FkIH0pOyAgICBcclxuICAgICAgICBjYXNlIHR5cGVzLkxFQVZFX0RFTEVURTpcclxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7IGxlYXZlRGVsZXRlIDogYWN0aW9uLnBheWxvYWQgfSk7ICAgXHJcbiAgICAgICAgY2FzZSB0eXBlcy5MRUFWRV9BREQ6XHJcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgeyBsZWF2ZUFkZCA6IGFjdGlvbi5wYXlsb2FkIH0pOyAgIFxyXG4gICAgICAgIGNhc2UgdHlwZXMuVEFTS0lORk9fVVBEQVRFOlxyXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHsgdGFza2luZm9VcGRhdGUgOiBhY3Rpb24ucGF5bG9hZCB9KTsgICBcclxuICAgICAgICBjYXNlIHR5cGVzLlRBU0tJTkZPX0RFTEVURV9VU0VSOlxyXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHsgdGFza2luZm9EZWxldGVVc2VyIDogYWN0aW9uLnBheWxvYWQgfSk7ICAgXHJcbiAgICAgICAgY2FzZSB0eXBlcy5UQVNLSU5GT19VUERBVEVfU1RBVEU6XHJcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgeyB0YXNraW5mb0RldGFpbCA6IGFjdGlvbi5wYXlsb2FkIH0pOyAgIFxyXG4gICAgICAgIGNhc2UgdHlwZXMuVEFTS0lORk9fVVBEQVRFX0ZMT1c6XHJcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgeyB0YXNraW5mb0RldGFpbCA6IGFjdGlvbi5wYXlsb2FkIH0pOyAgIFxyXG4gICAgICAgIGNhc2UgdHlwZXMuVEFTS0lORk9fVVBMT0FESU5HOlxyXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHsgdGFza2luZm9VcGxvYWRpbmcgOiBhY3Rpb24ucGF5bG9hZCB9KTsgICBcclxuICAgICAgICAgXHJcbiAgICAgICAgY2FzZSB0eXBlcy5UQVNLSU5GT19IT01FX0lOREVYOlxyXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHsgdGFza2luZm9Ib21lRGF0YSA6IGFjdGlvbi5wYXlsb2FkIH0pOyBcclxuICAgICAgICBjYXNlIHR5cGVzLlRBU0tJTkZPX0RFTEVURUFMTDpcclxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7IHRhc2tpbmZvRGVsZXRlIDogYWN0aW9uLnBheWxvYWQgfSk7IFxyXG4gICAgICAgIFxyXG4gICAgICAgIGNhc2UgdHlwZXMuVEFTS0lORk9fQllfSURfU0FWRTpcclxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7IHRhc2tTYXZlRGF0YSA6IGFjdGlvbi5wYXlsb2FkIH0pOyAgICBcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICByZXR1cm4gc3RhdGU7XHJcbiAgICB9XHJcbiAgICAqL1xyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3JlZHVjZXJzL3Rhc2suanMiLCJpbXBvcnQgKiBhcyB0eXBlcyBmcm9tIFwiLi4vYWN0aW9ucy91c2VyXCI7XHJcbmltcG9ydCBfIGZyb20gXCJsb2Rhc2hcIjtcclxuY29uc3QgaW5pdGlhbFN0YXRlID0ge1xyXG4gIHVzZXI6IG51bGwsXHJcbiAgZGluZ3Rha0NvZGU6IFwiXCIsXHJcbiAgZGluZ3Rha0xvZ2luOiBcIlwiLFxyXG4gIG1lc3NhZ2VMaXN0QnlVc2VyOiB7fSxcclxuICB1cmxEYXRhOiBcIlwiXHJcbn07XHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHVzZXIoc3RhdGUgPSBpbml0aWFsU3RhdGUsIGFjdGlvbiA9IHt9KSB7XHJcbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xyXG4gICAgY2FzZSB0eXBlcy5TRVRfTUVTU0FHRV9DT1VOVDpcclxuICAgICAgZGVidWdnZXI7XHJcbiAgICAgIGxldCByZGF0YSA9IF8uY2xvbmVEZWVwKHN0YXRlLm1lc3NhZ2VMaXN0QnlVc2VyKTtcclxuICAgICAgLy8gICAgICAgY29uc29sZS5sb2coYWN0aW9uLnBheWxvYWQsIFwiYWN0aW9uLnBheWxvYWRcIik7XHJcbiAgICAgIHJkYXRhLmRhdGEubGlzdC5tYXAoaXRlbSA9PiB7XHJcbiAgICAgICAgaWYgKGl0ZW0uaWQgPT0gYWN0aW9uLnBheWxvYWQpIHtcclxuICAgICAgICAgIGl0ZW0ucmVhZCA9IDE7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgICAgcmRhdGEuZGF0YS5tZXNzYWdlQ291bnQgPVxyXG4gICAgICAgIHJkYXRhLmRhdGEubWVzc2FnZUNvdW50IC0gMSA+IC0xID8gcmRhdGEuZGF0YS5tZXNzYWdlQ291bnQgLSAxIDogMDtcclxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7IG1lc3NhZ2VMaXN0QnlVc2VyOiByZGF0YSB9KTtcclxuICAgIGNhc2UgdHlwZXMuTE9HSU46XHJcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgeyB1c2VyOiBhY3Rpb24ucGF5bG9hZCB9KTtcclxuICAgIGNhc2UgdHlwZXMuRElOR1RBS19DT0RFOlxyXG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHsgZGluZ3Rha0NvZGU6IGFjdGlvbi5wYXlsb2FkIH0pO1xyXG4gICAgY2FzZSB0eXBlcy5ESU5HVEFLX0NPREVfTE9HSU46XHJcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgeyBkaW5ndGFrTG9naW46IGFjdGlvbi5wYXlsb2FkIH0pO1xyXG4gICAgY2FzZSB0eXBlcy5VU0VSX01FU1NBR0U6XHJcbiAgICAgIGxldCBkYXRhID0gc3RhdGUubWVzc2FnZUxpc3RCeVVzZXI7XHJcbiAgICAgIGlmICghc3RhdGUubWVzc2FnZUxpc3RCeVVzZXIuZGF0YSB8fCBhY3Rpb24ucGF5bG9hZC5wYWdlTm8gPT0gMSkge1xyXG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xyXG4gICAgICAgICAgbWVzc2FnZUxpc3RCeVVzZXI6IGFjdGlvbi5wYXlsb2FkLmxpc3RcclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAoYWN0aW9uLnBheWxvYWQucGFnZU5vICE9IHN0YXRlLm1lc3NhZ2VMaXN0QnlVc2VyLmRhdGEucGFnZSkge1xyXG4gICAgICAgICAgY29uc3QgbGlzdCA9IGRhdGEuZGF0YS5saXN0LmNvbmNhdChhY3Rpb24ucGF5bG9hZC5saXN0LmRhdGEubGlzdCk7XHJcbiAgICAgICAgICB2YXIgbXNnQ291bnQgPSBkYXRhLmRhdGEubWVzc2FnZUNvdW50O1xyXG4gICAgICAgICAgZGF0YSA9IF8ubWVyZ2Uoe30sIGRhdGEsIGFjdGlvbi5wYXlsb2FkLmxpc3QpO1xyXG4gICAgICAgICAgZGF0YS5kYXRhLmxpc3QgPSBsaXN0O1xyXG4gICAgICAgICAgZGF0YS5kYXRhLm1lc3NhZ2VDb3VudCA9IG1zZ0NvdW50O1xyXG4gICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7IG1lc3NhZ2VMaXN0QnlVc2VyOiBkYXRhIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHsgbWVzc2FnZUxpc3RCeVVzZXI6IGRhdGEgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgY2FzZSB0eXBlcy5TRVRfVVJMREFUQTpcclxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7IHVybERhdGE6IGFjdGlvbi5wYXlsb2FkIH0pO1xyXG4gICAgZGVmYXVsdDpcclxuICAgICAgcmV0dXJuIHN0YXRlO1xyXG4gIH1cclxufVxyXG5cclxuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSDliIblibLnur/vvIzkuIvpnaLnmoTmmK/ku6XliY3nmoTvvIzkuIrpnaLnmoTmmK/njrDlnKjopoHnlKjnmoQgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIFxyXG5cclxuaW1wb3J0ICogYXMgdHlwZXMgZnJvbSAnLi4vYWN0aW9ucy91c2VyJ1xyXG5cclxuY29uc3QgaW5pdGlhbFN0YXRlID0ge1xyXG4gICAgXHJcbiAgICB0aW1lTGlzdDpbXSxcclxuICAgIHVzZXJBbGw6W10sXHJcbiAgICB1c2VyU2VsZWN0OltdLFxyXG4gICAgdXNlcklkOicnLFxyXG4gICAgZGluZ1VzZXJJZDonJyxcclxuICAgIGFwcHM6W10sXHJcbiAgICB1c2VyQ2FuY2VsbGF0aW9uOicnLFxyXG59O1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB1c2VyKHN0YXRlID0gaW5pdGlhbFN0YXRlLCBhY3Rpb24gPSB7fSkge1xyXG5cclxuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcclxuICAgICAgICAgICAgIFxyXG4gICAgICAgIGNhc2UgdHlwZXMuVElNRV9MSVNUOlxyXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHsgdGltZUxpc3Q6IGFjdGlvbi5wYXlsb2FkIH0pOyAgIFxyXG4gICAgICAgIGNhc2UgdHlwZXMuVVNFUl9BTExfTElTVDpcclxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7IHVzZXJBbGw6IGFjdGlvbi5wYXlsb2FkIH0pOyBcclxuICAgICAgICBjYXNlIHR5cGVzLlNFTEVDVF9VU0VSOlxyXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHsgdXNlclNlbGVjdDogYWN0aW9uLnBheWxvYWQgfSk7ICAgXHJcbiAgICAgICAgICBcclxuICAgICAgICAgXHJcbiAgICAgICAgY2FzZSB0eXBlcy5ESU5HVEFLX1VTRVJfSUQ6XHJcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgeyB1c2VySWQ6IGFjdGlvbi5wYXlsb2FkIH0pOyAgXHJcbiAgICAgICAgY2FzZSB0eXBlcy5ESU5HVEFLX0RJTkdfVVNFUl9JRDpcclxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7IGRpbmdVc2VySWQ6IGFjdGlvbi5wYXlsb2FkIH0pO1xyXG4gICAgICAgIGNhc2UgdHlwZXMuRklOREFQUExJU1Q6XHJcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgeyBhcHBzOiBhY3Rpb24ucGF5bG9hZCB9KTtcclxuICAgICAgICBjYXNlIHR5cGVzLlVTRVJfQ0FOQ0VMTEFUSU9OOlxyXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHsgdXNlckNhbmNlbGxhdGlvbjogYWN0aW9uLnBheWxvYWQgfSk7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgcmV0dXJuIHN0YXRlO1xyXG4gICAgfVxyXG59Ki9cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVkdWNlcnMvdXNlci5qcyJdLCJtYXBwaW5ncyI6IjtBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTs7O0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7QUFOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FBRUE7QUFDQTs7OztBQUVBO0FBQ0E7QUFFQTtBQUFBO0FBREE7QUFHQTtBQUVBO0FBQ0E7Ozs7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUVBO0FBQUE7QUFFQTtBQUZBO0FBR0E7QUFFQTtBQUFBO0FBR0E7QUFKQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUFBO0FBRUE7QUFOQTtBQVNBO0FBQ0E7QUFBQTtBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFFQTtBQUFBO0FBR0E7QUFKQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUFBO0FBRUE7QUFOQTtBQVNBO0FBQ0E7QUFBQTtBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQUNBO0FBQ0E7QUFFQTtBQUFBO0FBR0E7QUFFQTtBQUNBO0FBT0E7QUFUQTtBQVNBO0FBR0E7QUFFQTtBQUxBO0FBT0E7QUFFQTtBQUNBO0FBRUE7QUF6QkE7QUEyQkE7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBOzs7OztBQTVHQTtBQUNBO0FBREE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDWkE7QUFDQTs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7QUFHQTtBQUNBO0FBQ0E7QUFFQTs7OztBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQUE7QUFEQTtBQUlBO0FBQ0E7QUFDQTs7OztBQUVBO0FBQ0E7QUFDQTtBQUVBOzs7O0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7OztBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTs7Ozs7QUFDQTtBQUFBO0FBRUE7Ozs7O0FBQ0E7QUFDQTtBQUVBOzs7OztBQUNBO0FBQ0E7Ozs7O0FBbkRBO0FBQ0E7QUFEQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDSkE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBRUE7QUFDQTs7O0FBQ0E7QUFDQTs7Ozs7QUFMQTtBQUNBO0FBQ0E7QUFDQTtBQUdBOzs7Ozs7Ozs7OztBQUVBO0FBQ0E7Ozs7QUFFQTtBQUNBO0FBRUE7QUFDQTs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBS0E7QUFDQTs7Ozs7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFFQTtBQUFBO0FBQ0E7QUFHQTtBQWJBO0FBY0E7QUFDQTs7Ozs7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUFBO0FBRUE7QUFFQTtBQVRBO0FBRkE7QUFhQTtBQUFBOztBQUdBO0FBQUE7QUFDQTtBQUZBOztBQUtBO0FBQ0E7QUFFQTtBQUFBO0FBSEE7O0FBTUE7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUVBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUVBO0FBRUE7QUExQkE7QUEyQkE7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FBQ0E7QUFDQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUFBO0FBRUE7QUFFQTtBQWJBO0FBY0E7QUFFQTtBQXZCQTtBQXdCQTtBQUNBO0FBR0E7QUFDQTtBQUVBO0FBTUE7QUFFQTtBQUNBO0FBQUE7QUFDQTtBQUVBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUVBO0FBRUE7QUFWQTtBQVdBO0FBQ0E7Ozs7O0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBUkE7QUFXQTtBQUVBO0FBQ0E7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFBQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFFQTtBQUVBO0FBVkE7QUFXQTtBQUNBOzs7OztBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFJQTtBQUNBO0FBREE7QUFHQTtBQURBO0FBR0E7QUFEQTtBQUdBO0FBRUE7QUFFQTtBQWxCQTtBQXNCQTs7Ozs7QUFFQTtBQUFBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFJQTtBQUNBO0FBQUE7QUFFQTtBQUVBO0FBZEE7QUFlQTtBQUNBOzs7OztBQU9BO0FBQUE7QUFDQTtBQURBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFBQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBRUE7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUFBO0FBTkE7QUFGQTtBQVdBO0FBQ0E7QUFFQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBUUE7QUFDQTtBQUFBO0FBZEE7QUFpQkE7QUFDQTtBQUNBO0FBQUE7QUFFQTtBQUVBO0FBcERBO0FBcURBO0FBQ0E7Ozs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFBQTtBQUVBO0FBQ0E7QUFXQTs7Ozs7Ozs7Ozs7QUFDQTtBQUFBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUF6QkE7QUEwQkE7QUFDQTs7Ozs7QUFFQTtBQUNBO0FBSUE7QUFMQTtBQU9BO0FBQ0E7QUFDQTs7Ozs7QUFFQTtBQUNBO0FBSUE7QUFMQTtBQU9BO0FBQ0E7QUFDQTs7Ozs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFHQTs7O0FBQ0E7QUFBQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBbEJBO0FBbUJBO0FBQ0E7QUFDQTs7Ozs7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUFBO0FBRUE7QUFDQTtBQUFBO0FBRUE7QUFBQTtBQUdBO0FBVEE7QUFVQTtBQUNBOzs7OztBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUFBO0FBRUE7QUFFQTtBQVZBO0FBV0E7QUFDQTs7Ozs7QUFFQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUVBO0FBRUE7QUFQQTtBQVFBO0FBQ0E7Ozs7O0FBRUE7QUFDQTtBQUNBO0FBS0E7QUFDQTs7OztBQUNBO0FBRUE7QUFHQTs7Ozs7QUFDQTtBQUNBO0FBRUE7QUFJQTtBQUNBO0FBQ0E7Ozs7O0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUNBO0FBRUE7QUFBQTtBQUNBO0FBS0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTkE7QUFtQkE7QUFFQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQUE7QUFJQTtBQURBO0FBY0E7QUFFQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFFQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7QUEzZ0JBO0FBQ0E7QUFEQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNEQTtBQVFBO0FBYUE7QUFRQTtBQWFBO0FBa0JBO0FBYUE7QUFnQkE7QUFPQTtBQUNBO0FBeEdBO0FBQ0E7Ozs7O0FBREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFHQTtBQUVBO0FBSEE7OztBQU1BO0FBQUE7QUFDQTtBQUNBO0FBSUE7QUFHQTtBQUNBOzs7QUFHQTtBQUFBOztBQUdBO0FBRUE7QUFIQTs7O0FBTUE7QUFBQTtBQUNBO0FBQ0E7QUFJQTtBQUdBO0FBQ0E7OztBQUdBO0FBQUE7QUFDQTtBQUNBO0FBU0E7QUFHQTtBQUNBOzs7QUFHQTtBQUFBO0FBQ0E7QUFDQTtBQUlBO0FBR0E7QUFDQTs7O0FBR0E7QUFBQTtBQUNBO0FBQ0E7QUFJQTtBQUVBO0FBQ0E7QUFBQTtBQUNBO0FBR0E7QUFDQTtBQUVBO0FBQ0E7QUFEQTtBQUNBO0FBQ0E7QUFFQTs7O0FBR0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUlBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDckhBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7Ozs7O0FBQ0E7QUFDQTtBQUFBOzs7Ozs7Ozs7O0FBQ0E7QUFDQTs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQUE7QUFQQTtBQVVBO0FBQ0E7Ozs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBSUE7QUFFQTtBQUFBO0FBRUE7QUFGQTtBQUdBO0FBRUE7QUFaQTtBQWFBO0FBRUE7QUFFQTtBQUNBOzs7OztBQUFBO0FBQ0E7QUFFQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBQUE7QUFHQTs7QUFDQTtBQUVBO0FBQ0E7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFFQTs7OztBQUVBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFEQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBREE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBOzs7OztBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFEQTtBQUFBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQVBBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFRQTtBQUNBO0FBQUE7Ozs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUNBO0FBS0E7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFmQTtBQWlCQTtBQUNBO0FBSEE7QUFRQTtBQUNBO0FBQ0E7QUFQQTtBQVlBO0FBQ0E7QUFDQTtBQVBBO0FBY0E7QUFDQTtBQUNBO0FBVEE7QUFnQkE7QUFDQTtBQUNBO0FBVEE7QUFpQkE7QUFDQTtBQUVBO0FBQ0E7Ozs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBREE7QUFHQTtBQURBO0FBR0E7QUFFQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUFBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFBQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBOzs7OztBQUFBO0FBRUE7QUFDQTtBQUlBO0FBRUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUtBO0FBQUE7QUFFQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBS0E7QUFDQTtBQXBCQTtBQXNCQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRkE7QUFXQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFOQTtBQWVBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQU5BO0FBaUJBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVJBO0FBbUJBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVJBO0FBb0JBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFLQTtBQUVBO0FBQ0E7Ozs7O0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBSEE7QUFJQTtBQUVBO0FBSEE7QUFJQTtBQUVBO0FBSEE7QUFJQTtBQUVBO0FBSEE7QUFJQTtBQUVBO0FBSEE7QUFJQTtBQUVBO0FBSEE7QUFJQTtBQUVBO0FBSEE7QUFJQTtBQUVBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0E7QUFDQTs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFFQTs7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFGQTtBQUlBO0FBQ0E7QUFFQTtBQUNBOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFBQTtBQUNBO0FBRUE7QUFBQTtBQUNBO0FBREE7QUFBQTtBQUZBO0FBUUE7QUFBQTtBQUNBO0FBREE7QUFBQTtBQUZBO0FBT0E7QUFFQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBRkE7QUFRQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBS0E7QUFDQTtBQUVBO0FBQ0E7Ozs7O0FBQUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFUQTtBQVNBO0FBQ0E7QUFFQTtBQVNBOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBV0E7Ozs7Ozs7Ozs7QUFDQTtBQUNBO0FBQ0E7QUFNQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBQUE7QUFFQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFHQTtBQUVBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7O0FBQ0E7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOztBQUNBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFBQTtBQUtBO0FBQ0E7QUFBQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOztBQUFBO0FBT0E7QUFDQTtBQUNBO0FBS0E7QUFDQTtBQUFBO0FBU0E7QUFDQTtBQUFBO0FBRUE7QUFGQTtBQVNBO0FBRkE7QUFRQTtBQUtBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7QUFGQTtBQU1BO0FBRkE7QUFhQTtBQVRBO0FBZ0JBO0FBS0E7QUFFQTs7QUFDQTtBQUVBO0FBQ0E7Ozs7O0FBQUE7QUFDQTtBQUtBO0FBQ0E7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWdCQTtBQUVBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUVBO0FBRkE7QUFHQTtBQURBO0FBR0E7QUFFQTtBQUNBO0FBQUE7QUFDQTtBQURBO0FBR0E7QUFEQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFHQTtBQUNBOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFJQTtBQUNBO0FBQUE7QUFhQTtBQWdCQTtBQXdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFGQTtBQUlBO0FBRkE7QUFJQTtBQUZBO0FBSUE7QUFGQTtBQUlBO0FBRkE7QUFNQTtBQUNBO0FBQ0E7QUFBQTtBQUVBO0FBQUE7QUFDQTtBQURBO0FBQUE7O0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFIQTtBQU9BO0FBQUE7QUFDQTtBQURBO0FBQUE7QUFFQTs7OztBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQTUxQkE7QUFDQTtBQURBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQzZCQTtBQU9BO0FBT0E7QUFPQTtBQU9BO0FBZUE7QUFPQTtBQVFBO0FBT0E7QUFPQTtBQU9BO0FBT0E7QUFPQTtBQU9BO0FBT0E7QUFPQTtBQU9BO0FBT0E7QUFNQTtBQVFBO0FBT0E7QUFPQTtBQVFBO0FBT0E7QUFPQTtBQU9BO0FBT0E7QUFPQTtBQU9BO0FBT0E7QUFPQTtBQVFBO0FBQ0E7QUF0UUE7QUFDQTs7Ozs7QUFEQTtBQUVBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFHQTtBQUVBO0FBSEE7O0FBS0E7QUFBQTs7QUFHQTtBQUVBO0FBSEE7O0FBS0E7QUFBQTs7QUFHQTtBQUVBO0FBSEE7O0FBS0E7QUFBQTs7QUFHQTtBQUVBO0FBSEE7O0FBS0E7QUFBQTs7QUFHQTtBQUVBO0FBSEE7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQUE7O0FBR0E7QUFFQTtBQUhBOztBQUtBO0FBQUE7O0FBR0E7QUFFQTtBQUhBOzs7QUFNQTtBQUFBOztBQUdBO0FBRUE7QUFIQTs7QUFLQTtBQUFBOztBQUdBO0FBRUE7QUFIQTs7QUFLQTtBQUFBOztBQUdBO0FBRUE7QUFIQTs7QUFLQTtBQUFBOztBQUdBO0FBRUE7QUFIQTs7QUFLQTtBQUFBOztBQUdBO0FBRUE7QUFIQTs7QUFLQTtBQUFBOztBQUdBO0FBRUE7QUFIQTs7QUFLQTtBQUFBOztBQUdBO0FBRUE7QUFIQTs7QUFLQTtBQUFBOztBQUdBO0FBRUE7QUFIQTs7QUFLQTtBQUFBOztBQUdBO0FBRUE7QUFIQTs7QUFLQTtBQUFBOztBQUdBO0FBRUE7QUFIQTtBQUtBO0FBQ0E7QUFEQTs7QUFHQTtBQUVBO0FBSEE7QUFJQTtBQUFBOztBQUdBO0FBRUE7QUFIQTs7O0FBTUE7QUFBQTs7QUFHQTtBQUVBO0FBSEE7O0FBS0E7QUFBQTs7QUFHQTtBQUVBO0FBSEE7O0FBS0E7QUFBQTs7QUFHQTtBQUVBO0FBSEE7OztBQU1BO0FBQUE7O0FBR0E7QUFFQTtBQUhBOztBQUtBO0FBQUE7O0FBR0E7QUFFQTtBQUhBOztBQUtBO0FBQUE7O0FBR0E7QUFFQTtBQUhBOztBQUtBO0FBQUE7O0FBR0E7QUFFQTtBQUhBOztBQUtBO0FBQUE7O0FBR0E7QUFFQTtBQUhBOztBQUtBO0FBQUE7O0FBR0E7QUFFQTtBQUhBOztBQUtBO0FBQUE7O0FBR0E7QUFFQTtBQUhBOztBQUtBO0FBQUE7O0FBR0E7QUFFQTtBQUhBOztBQUtBO0FBQUE7O0FBR0E7QUFFQTtBQUhBOzs7QUFNQTtBQUFBOztBQUdBO0FBRUE7QUFIQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyT0E7QUFRQTtBQU9BO0FBT0E7QUFPQTtBQU9BO0FBT0E7QUFnQkE7QUFhQTtBQVFBO0FBUUE7QUFZQTtBQVdBO0FBVUE7QUFhQTtBQVdBO0FBV0E7QUFXQTtBQWdCQTtBQVlBO0FBZUE7QUFnQkE7QUFZQTtBQXNCQTtBQVlBO0FBZ0JBO0FBWUE7QUF1QkE7QUFRQTtBQWVBO0FBWUE7QUFRQTtBQU9BO0FBT0E7QUFXQTtBQVlBO0FBT0E7QUFvQkE7QUFXQTtBQTJCQTtBQWlDQTtBQU9BO0FBZUE7QUFDQTtBQTlpQkE7QUFDQTs7Ozs7QUFEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUdBO0FBRUE7QUFIQTs7QUFNQTtBQUNBO0FBREE7O0FBR0E7QUFFQTtBQUhBOztBQUtBO0FBQUE7O0FBR0E7QUFFQTtBQUhBOztBQUtBO0FBQUE7O0FBR0E7QUFFQTtBQUhBOztBQUtBO0FBQUE7O0FBR0E7QUFFQTtBQUhBOztBQUtBO0FBQUE7O0FBR0E7QUFFQTtBQUhBOztBQUtBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBSUE7QUFFQTtBQUNBO0FBQUE7QUFHQTtBQUNBOzs7QUFHQTtBQUFBO0FBQ0E7QUFDQTtBQUlBO0FBR0E7QUFDQTs7O0FBR0E7QUFBQTs7QUFHQTtBQUVBO0FBSEE7OztBQU1BO0FBQUE7O0FBR0E7QUFFQTtBQUhBOzs7QUFNQTtBQUFBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFKQTtBQUlBO0FBRUE7QUFDQTs7O0FBR0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7O0FBRUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQUE7QUFDQTtBQUVBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUFBO0FBRUE7QUFDQTs7QUFFQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUFBO0FBQ0E7QUFDQTtBQUlBO0FBRUE7QUFDQTtBQUFBO0FBR0E7QUFDQTs7O0FBR0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7OztBQUdBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQUE7QUFFQTtBQUNBOzs7QUFFQTtBQUlBOzs7QUFBQTtBQUNBO0FBQ0E7QUFJQTtBQUVBO0FBQ0E7QUFBQTtBQUdBO0FBQ0E7OztBQUdBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQUE7QUFFQTtBQUNBOzs7QUFHQTtBQUFBO0FBQ0E7QUFDQTtBQUlBO0FBQUE7QUFDQTtBQUVBO0FBQUE7QUFKQTtBQU9BO0FBRUE7QUFDQTtBQUFBO0FBR0E7QUFDQTs7O0FBR0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7OztBQUdBO0FBQUE7QUFDQTtBQUNBO0FBSUE7QUFFQTtBQUNBO0FBQUE7QUFHQTtBQUNBOzs7QUFHQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUFBO0FBRUE7QUFDQTs7O0FBR0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQVdBO0FBRUE7QUFDQTtBQUFBO0FBR0E7QUFDQTs7O0FBR0E7QUFBQTs7QUFHQTtBQUVBO0FBSEE7OztBQU1BO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQUE7QUFFQTtBQUNBOzs7QUFFQTtBQUlBOzs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7O0FBR0E7QUFDQTtBQURBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUFBOztBQUdBO0FBRUE7QUFIQTs7QUFLQTtBQUFBOztBQUdBO0FBRUE7QUFIQTs7QUFLQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUFBO0FBRUE7QUFDQTs7QUFFQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUFBO0FBRUE7QUFDQTs7O0FBR0E7QUFBQTtBQUFBO0FBQ0E7O0FBRUE7QUFFQTtBQUhBOztBQUtBO0FBQUE7QUFDQTtBQUNBO0FBV0E7QUFDQTtBQUdBO0FBQ0E7QUFFQTtBQUNBO0FBREE7QUFDQTtBQUtBO0FBRUE7OztBQUdBO0FBQUE7QUFPQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFjQTtBQUVBOzs7QUFHQTtBQUFBO0FBT0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBYUE7QUFHQTtBQUNBOztBQU9BOzs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBOztBQUVBO0FBQUE7QUFEQTs7QUFLQTtBQUFBO0FBRUE7QUFBQTtBQUNBO0FBSUE7QUFDQTtBQUdBO0FBQ0E7OztBQUdBO0FBQUE7QUFFQTtBQUFBO0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuakJBO0FBQ0E7OztBQUNBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUNBO0FBQ0E7Ozs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7OztBQVlBO0FBQ0E7QUFDQTtBQURBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUVBOzs7OztBQUdBOzs7QUFHQTs7O0FBRUE7OztBQUdBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBQ0E7QUFDQTtBQURBO0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFFQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBQ0E7QUFEQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7OztBQWxDQTtBQUNBO0FBREE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ3BCQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7OztBQUVBO0FBQ0E7Ozs7O0FBREE7QUFDQTtBQURBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOQTtBQUNBOzs7QUFBQTtBQUNBO0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBRUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQ0E7QUFDQTtBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBO0FBQUE7QUFDQTs7Ozs7Ozs7QUFDQTs7OztBQUlBOzs7OztBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTs7QUFJQTtBQUZBO0FBR0E7OztBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUFBO0FBZkE7QUFpQkE7Ozs7O0FBRUE7QUFDQTtBQUNBO0FBREE7QUFFQTtBQUFBO0FBQ0E7QUFFQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBS0E7QUFHQTtBQUNBO0FBREE7QUFFQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFIQTtBQVNBO0FBQ0E7QUFHQTtBQUZBO0FBR0E7QUFDQTtBQUFBO0FBQ0E7QUFFQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFBQTtBQUhBO0FBUUE7QUFDQTtBQURBO0FBQ0E7QUFFQTtBQUVBO0FBcEJBO0FBcUJBO0FBR0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBR0E7QUFDQTtBQUNBOzs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBSEE7QUFLQTtBQUNBO0FBREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBSEE7QUFTQTtBQUVBO0FBQUE7QUFaQTtBQWlCQTtBQUVBO0FBQUE7QUFDQTtBQUNBO0FBR0E7QUFGQTtBQUxBO0FBUUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUhBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUE3QkE7QUFDQTtBQStCQTtBQUVBO0FBRUE7QUFIQTtBQUlBOzs7O0FBR0E7QUFDQTs7OztBQUdBO0FBQUE7QUFFQTtBQUNBOzs7O0FBRUE7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUVBO0FBQUE7Ozs7QUFFQTtBQUNBO0FBQ0E7QUFEQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFEQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBUEE7QUFRQTtBQUVBO0FBQUE7QUFGQTtBQUtBO0FBQUE7QUFJQTtBQUNBO0FBQ0E7Ozs7QUFFQTtBQUNBO0FBQ0E7QUFEQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQUE7QUFKQTtBQU9BO0FBT0E7QUFDQTtBQURBO0FBRUE7Ozs7QUFFQTtBQUFBO0FBQ0E7QUFZQTtBQVhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBRUE7QUFBQTtBQUNBO0FBREE7QUFBQTtBQUNBO0FBQ0E7QUFEQTs7O0FBR0E7QUFBQTs7QUFGQTtBQUtBO0FBTEE7QUFDQTs7QUFNQTtBQUFBOztBQUZBO0FBS0E7QUFMQTtBQUNBOztBQU1BO0FBQUE7O0FBRkE7QUFLQTtBQUxBO0FBQ0E7QUFPQTtBQUFBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBR0E7QUFGQTtBQUVBO0FBS0E7QUFBQTtBQUNBO0FBakJBOztBQUFBO0FBQUE7QUFBQTtBQUNBO0FBMEJBO0FBQUE7QUFFQTtBQUNBO0FBQUE7QUFDQTtBQU5BOztBQUFBO0FBQUE7QUFBQTtBQUNBO0FBZ0JBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBRUE7QUFBQTtBQUNBO0FBVkE7O0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFvQkE7QUFBQTtBQUVBO0FBQ0E7QUFBQTtBQUNBO0FBTkE7O0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFlQTtBQUFBO0FBQ0E7QUFFQTtBQUNBO0FBQUE7QUFDQTtBQVBBOztBQUFBO0FBQUE7QUFBQTtBQUNBO0FBY0E7O0FBR0E7QUFBQTs7QUFMQTtBQVVBO0FBVkE7QUFDQTtBQVNBO0FBQ0E7QUFEQTtBQUNBO0FBQUE7QUFDQTtBQURBO0FBQ0E7O0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBRUE7QUFBQTtBQUFBO0FBQUE7O0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFJQTtBQUNBO0FBREE7QUFDQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBOztBQURBO0FBS0E7QUFMQTtBQUNBO0FBSUE7QUFBQTtBQUFBO0FBR0E7QUFBQTtBQUFBO0FBQUE7QUFFQTtBQUNBOztBQURBO0FBS0E7QUFMQTtBQUNBO0FBSUE7QUFBQTtBQUFBO0FBR0E7QUFBQTtBQUFBO0FBQUE7QUFFQTtBQUNBOztBQURBO0FBS0E7QUFMQTtBQUNBO0FBSUE7QUFBQTtBQUFBO0FBS0E7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUNBOztBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUNBO0FBQUE7QUFBQTtBQUFBOztBQUVBO0FBQUE7QUFBQTtBQUFBO0FBSUE7QUFBQTtBQUNBO0FBSEE7O0FBQUE7QUFPQTtBQVBBO0FBQ0E7QUFRQTtBQUNBO0FBQUE7QUFBQTtBQUhBOztBQUFBO0FBS0E7QUFMQTtBQUNBO0FBSUE7QUFDQTtBQURBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUhBO0FBSUE7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUFBO0FBQ0E7QUFFQTtBQUFBO0FBTEE7O0FBQUE7QUFhQTtBQWJBO0FBQ0E7QUFZQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFEQTtBQUNBO0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFDQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBSUE7QUFyQ0E7QUF1Q0E7QUFBQTtBQUFBO0FBQUE7QUFHQTtBQUNBO0FBREE7QUFBQTtBQUdBO0FBQUE7O0FBRkE7QUFJQTtBQUpBO0FBQ0E7O0FBVUE7QUFBQTs7QUFGQTtBQVFBO0FBUkE7QUFDQTtBQU9BO0FBQ0E7QUFEQTtBQUNBO0FBQUE7QUFLQTtBQUxBOzs7Ozs7QUE3ZUE7QUFDQTtBQW1mQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUhBOztBQU1BOztBQUVBO0FBSUE7QUFDQTtBQUNBO0FBSUE7QUFDQTtBQVhBO0FBaUJBO0FBQUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNWlCQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7Ozs7O0FDR0E7QUFPQTtBQUNBO0FBVkE7QUFDQTs7Ozs7QUFEQTtBQUNBO0FBQ0E7O0FBR0E7QUFFQTtBQUhBOztBQUtBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUlBO0FBRUE7QUFDQTtBQUFBO0FBQ0E7QUFHQTtBQUNBOzs7QUFHQTtBQThCQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3pEQTtBQUNBOzs7OztBQUdBO0FBUUE7QUFDQTtBQVpBO0FBQ0E7Ozs7O0FBRkE7QUFDQTtBQUNBO0FBRUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBREE7O0FBR0E7QUFFQTtBQUhBOzs7Ozs7Ozs7OztBQ2RBO0FBQ0E7Ozs7O0FBS0E7QUFZQTtBQVlBO0FBV0E7QUFDQTtBQXZDQTtBQUNBOzs7OztBQUpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQUE7QUFFQTtBQUNBOzs7QUFHQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUFBO0FBRUE7QUFDQTs7O0FBR0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBREE7O0FBR0E7QUFFQTtBQUhBOzs7Ozs7Ozs7OztBQzNDQTtBQUNBOzs7OztBQVlBO0FBaUJBO0FBWUE7QUFXQTtBQVlBO0FBV0E7QUFXQTtBQVlBO0FBWUE7QUFZQTtBQVdBO0FBQ0E7QUE3SEE7QUFDQTs7Ozs7QUFYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUFBO0FBRUE7QUFDQTs7O0FBRUE7QUFNQTs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7OztBQUdBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQUE7QUFFQTtBQUNBOztBQUVBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQUE7QUFFQTtBQUNBOzs7QUFHQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUFBO0FBRUE7QUFDQTs7QUFFQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUFBO0FBRUE7QUFDQTs7QUFFQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUFBO0FBRUE7QUFDQTs7O0FBR0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7OztBQUdBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQUE7QUFFQTtBQUNBOzs7QUFHQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFEQTs7QUFHQTtBQUVBO0FBSEE7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDMUhBO0FBeUJBO0FBa0JBO0FBT0E7QUFRQTtBQWVBO0FBVUE7QUFRQTtBQVlBO0FBYUE7QUFvQkE7QUFjQTtBQVlBO0FBT0E7QUFPQTtBQU9BO0FBT0E7QUFDQTtBQTVNQTtBQUNBOzs7OztBQURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQUE7QUFLQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBT0E7QUFFQTtBQUNBO0FBQ0E7QUFJQTtBQUNBOztBQUVBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBT0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBOztBQUVBO0FBQUE7O0FBR0E7QUFFQTtBQUhBOztBQUtBO0FBQUE7O0FBR0E7QUFFQTtBQUhBOzs7QUFNQTtBQUFBO0FBQ0E7QUFDQTtBQUlBO0FBRUE7QUFDQTtBQUFBO0FBR0E7QUFDQTs7QUFFQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQUE7O0FBR0E7QUFFQTtBQUhBOzs7QUFNQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQUE7QUFDQTtBQUNBO0FBSUE7QUFFQTtBQUNBO0FBQ0E7QUFPQTtBQUNBOztBQUVBO0FBQUE7QUFDQTtBQUNBO0FBSUE7QUFFQTtBQUNBO0FBRUE7QUFDQTs7QUFFQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUFBO0FBRUE7QUFDQTs7O0FBR0E7QUFBQTtBQUNBO0FBRUE7QUFDQTs7O0FBR0E7QUFBQTtBQUNBO0FBRUE7QUFDQTs7O0FBR0E7QUFBQTtBQUNBO0FBRUE7QUFDQTs7O0FBR0E7QUFBQTtBQUNBO0FBRUE7QUFDQTs7O0FBR0E7QUFBQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoTUE7QUFPQTtBQVVBO0FBUUE7QUFRQTtBQVFBO0FBMkJBO0FBU0E7QUFTQTtBQVFBO0FBUUE7QUFtQkE7QUFRQTtBQVNBO0FBT0E7QUFDQTtBQWpLQTtBQUNBOzs7OztBQURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUdBO0FBRUE7QUFIQTtBQUtBO0FBQ0E7QUFEQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQURBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFEQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBREE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQURBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFBQTtBQUdBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTs7O0FBR0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBOzs7QUFHQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7O0FBRUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQURBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBREE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFEQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7OztBQUdBO0FBQUE7QUFDQTtBQUNBO0FBRUE7OztBQUdBO0FBQUE7QUFDQTtBQUNBO0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbEtBO0FBT0E7QUFNQTtBQU1BO0FBQ0E7QUF0QkE7QUFDQTs7Ozs7QUFEQTtBQUNBO0FBQ0E7O0FBR0E7QUFFQTtBQUhBOztBQUtBO0FBQUE7QUFDQTtBQUVBO0FBQ0E7O0FBRUE7QUFBQTtBQUNBO0FBRUE7QUFDQTs7QUFFQTtBQUFBO0FBQ0E7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzFCQTtBQUNBO0FBQUE7QUFDQTs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBTEE7QUFLQTtBQUNBO0FBQ0E7QUFFQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQUE7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUdBO0FBRUE7QUFYQTtBQWFBO0FBYkE7QUFnQkE7QUFDQTtBQUVBO0FBQUE7QUFDQTtBQUVBO0FBQUE7QUFDQTtBQUVBO0FBQUE7QUFDQTtBQUVBO0FBQUE7QUFFQTs7Ozs7QUFoREE7QUFDQTtBQURBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0pBO0FBQ0E7OztBQUNBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7Ozs7QUFBQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUVBO0FBQUE7QUFDQTtBQURBO0FBQUE7Ozs7O0FBTkE7QUFDQTtBQURBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDZEE7QUFDQTs7O0FBQ0E7QUFDQTs7Ozs7Ozs7QUFFQTs7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFEQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFFQTtBQUFBO0FBREE7QUFHQTs7Ozs7QUFHQTtBQUFBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFDQTtBQURBO0FBS0E7QUFDQTtBQURBO0FBQ0E7QUFFQTs7OztBQUdBOzs7QUFFQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFDQTtBQURBO0FBS0E7QUFDQTtBQURBO0FBQ0E7QUFFQTs7OztBQUdBO0FBQUE7QUFFQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBQ0E7QUFDQTtBQURBO0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUFBO0FBQ0E7QUFEQTs7O0FBQ0E7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFLQTtBQUxBO0FBQUE7QUFOQTtBQWFBO0FBQ0E7Ozs7O0FBekRBO0FBQ0E7QUFEQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDVkE7QUFDQTs7O0FBQ0E7QUFDQTs7O0FBQUE7QUFDQTtBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7Ozs7O0FBQUE7QUFDQTs7OztBQUdBO0FBQ0E7QUFDQTtBQURBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFnSUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUdBO0FBRkE7QUFHQTtBQVJBO0FBU0E7QUFFQTtBQTdJQTtBQUNBO0FBREE7QUFFQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBVkE7QUFhQTs7Ozs7QUFHQTtBQUFBOzs7O0FBSUE7QUFDQTtBQUFBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBTUE7QUFFQTs7OztBQUVBO0FBQ0E7Ozs7QUFFQTtBQUFBOzs7O0FBR0E7QUFDQTs7OztBQUlBO0FBQUE7QUFHQTtBQUNBOzs7OztBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUVBO0FBQUE7QUFDQTtBQUVBO0FBSUE7QUFFQTtBQVBBO0FBY0E7QUFJQTtBQUNBO0FBQ0E7QUEvQkE7QUFnQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQVNBO0FBRUE7QUFDQTtBQUNBOzs7OztBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUVBO0FBQUE7QUFDQTtBQUVBO0FBQ0E7QUFiQTtBQWNBO0FBRUE7Ozs7QUFpQkE7QUFBQTtBQUNBO0FBU0E7QUFSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSUE7QUFDQTtBQURBO0FBSUE7QUFBQTtBQUNBO0FBREE7QUFBQTs7QUFHQTtBQUFBOztBQUZBO0FBS0E7QUFMQTtBQUNBO0FBTUE7QUFNQTtBQUNBO0FBVEE7O0FBQUE7QUFZQTtBQVpBO0FBQ0E7QUFhQTs7QUFGQTtBQVNBO0FBVEE7QUFDQTs7QUFRQTtBQUFBO0FBQUE7QUFBQTtBQUlBO0FBSUE7QUFDQTtBQVBBOztBQUFBO0FBVUE7QUFWQTtBQUNBO0FBV0E7O0FBRkE7QUFPQTtBQVBBO0FBQ0E7O0FBTUE7QUFBQTtBQUFBO0FBQUE7QUFTQTtBQUlBO0FBQ0E7QUFQQTs7QUFBQTtBQVVBO0FBVkE7QUFDQTtBQVdBOztBQUZBO0FBUUE7QUFSQTtBQUNBOztBQU9BO0FBQUE7QUFBQTtBQUFBO0FBYUE7QUFJQTtBQUNBO0FBUEE7O0FBQUE7QUFVQTtBQVZBO0FBQ0E7QUFXQTs7QUFGQTtBQVFBO0FBUkE7QUFDQTs7QUFPQTtBQUFBO0FBQUE7QUFBQTtBQUlBO0FBSUE7QUFDQTtBQVBBOztBQUFBO0FBVUE7QUFWQTtBQUNBO0FBV0E7O0FBRkE7QUFRQTtBQVJBO0FBQ0E7O0FBT0E7QUFBQTtBQUFBO0FBQUE7QUFnQkE7QUFDQTtBQURBO0FBQUE7QUFDQTtBQUNBO0FBREE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUFBOztBQUpBO0FBTUE7QUFOQTtBQUNBO0FBS0E7QUFDQTtBQURBO0FBQ0E7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFNQTtBQUFBO0FBRUE7QUFKQTs7QUFBQTtBQU1BO0FBTkE7QUFDQTtBQUtBO0FBQ0E7QUFEQTtBQUNBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBT0E7QUFBQTtBQUNBO0FBR0E7QUFGQTtBQUpBOztBQUFBO0FBQUE7QUFBQTtBQUNBO0FBbUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBR0E7QUFGQTtBQUdBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFiQTs7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQWlDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFRQTtBQUFBO0FBQ0E7QUFDQTtBQUdBO0FBRkE7QUFuQkE7O0FBQUE7QUF3QkE7QUF4QkE7QUFDQTtBQTRCQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBSUE7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQVFBO0FBQUE7QUFDQTtBQUdBO0FBRkE7QUF4QkE7O0FBQUE7QUFBQTtBQUFBO0FBQ0E7Ozs7O0FBblpBO0FBQ0E7QUFxYkE7O0FBRUE7QUFDQTtBQURBOztBQUlBOztBQUVBO0FBQ0E7QUFEQTtBQU9BO0FBQUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6ZEE7QUFDQTtBQURBO0FBQ0E7Ozs7O0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBekJBO0FBMkJBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFBQTtBQUZBO0FBSUE7QUFFQTtBQUdBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUdBO0FBRkE7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUFBO0FBR0E7QUFGQTtBQUVBO0FBQ0E7QUFFQTtBQUFBO0FBQ0E7QUFHQTtBQUZBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFHQTtBQUVBO0FBRUE7QUFDQTtBQURBO0FBSUE7QUFIQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUVBO0FBQUE7QUFHQTtBQUZBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUdBO0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNU1BO0FBQ0E7QUFEQTtBQUNBOzs7OztBQUFBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFMQTtBQUtBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBRkE7QUFNQTtBQUVBO0FBR0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7Ozs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3pDQTtBQUNBO0FBREE7QUFDQTs7Ozs7QUFDQTtBQUdBO0FBRkE7QUFFQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDYkE7QUFDQTtBQURBO0FBQ0E7Ozs7O0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFKQTtBQUlBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUNBO0FBQ0E7Ozs7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFUQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDYkE7QUFDQTtBQURBO0FBQ0E7Ozs7O0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFQQTtBQU9BO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTs7OztBQUdBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZDQTtBQUNBO0FBREE7QUFDQTs7Ozs7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFiQTtBQUNBO0FBWUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUdBO0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcEVBO0FBQ0E7QUFEQTtBQUNBOzs7OztBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQUE7QUFDQTtBQUdBO0FBTEE7QUFNQTtBQUNBO0FBR0E7QUFqQkE7QUFDQTtBQWdCQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzVDQTtBQUNBO0FBREE7QUFDQTtBQUFBO0FBQ0E7Ozs7Ozs7OztBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUdBO0FBYkE7QUFjQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQXZDQTtBQStDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFHQTtBQUdBOzs7QUE4RUE7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDblJBO0FBQ0E7QUFEQTtBQUNBO0FBQUE7QUFDQTs7Ozs7OztBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQU5BO0FBTUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBRUE7QUFBQTtBQUVBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFGQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTkE7QUFRQTtBQUVBO0FBRUE7QUFDQTtBQURBO0FBQ0E7QUFFQTtBQUVBOzs7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QSIsInNvdXJjZVJvb3QiOiIifQ==
            return { page: comp.default }
          })
        