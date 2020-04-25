"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require("_babel-runtime@6.23.0@babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

var _toast = require("antd-mobile/lib/toast");

var _toast2 = _interopRequireDefault(_toast);

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

var _storage = require("./storage");

var _storage2 = _interopRequireDefault(_storage);

var _httpClient = require("../api/httpClient");

var _httpClient2 = _interopRequireDefault(_httpClient);

var _index = require("_next@2.4.9@next\\dist\\lib\\router\\index.js");

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