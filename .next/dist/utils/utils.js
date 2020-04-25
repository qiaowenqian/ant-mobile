"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _icon = require("antd-mobile/lib/icon");

var _icon2 = _interopRequireDefault(_icon);

var _map = require("_babel-runtime@6.23.0@babel-runtime/core-js/map");

var _map2 = _interopRequireDefault(_map);

var _getIterator2 = require("_babel-runtime@6.23.0@babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _slicedToArray2 = require("_babel-runtime@6.23.0@babel-runtime/helpers/slicedToArray");

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

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