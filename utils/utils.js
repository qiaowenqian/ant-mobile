import React from "react";
import Storage from "./storage";
import { Icon } from "antd-mobile";


let flag = true;
export default class Utils extends React.Component {
  // 返回中文字符长度
  static getByteLen(val) {
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

  static listScroll(e) {
    let scrollTop = Math.ceil(Math.round(e.target.scrollTop));
    let clientHeight = Math.ceil(Math.round(e.target.clientHeight));
    let scrollHeight = Math.ceil(Math.round(e.target.scrollHeight));
    if (
      scrollTop + clientHeight == scrollHeight ||
      scrollTop + clientHeight == scrollHeight - 1 ||
      scrollTop + clientHeight == scrollHeight + 1
    ) {
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
  static getTagColorByColorCode(type, colorCode) {
    let code = "";
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
  static GetImgListFromString(str) {
    var div = document.createElement("div");
    div.innerHTML = str;
    var imgList = [];
    imgList = div.querySelectorAll("img");
    return imgList;
  }

  // 根据地址提取图片名称
  static getFileNameByUrl(url) {
    let one = url.split("/");
    let name = one[one.length - 1];
    return name;
  }

  static delImgStringBySrc(src, string) {
    let objE = document.createElement("div");
    objE.innerHTML = string;
    //console.log(objE.childNodes,1);

    for (let i = 0; i < objE.childNodes.length; i++) {
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
  static getTextFromString(str) {
    var div = document.createElement("div");
    div.innerHTML = str;
    var text = "";
    if (div.innerText !== "" || div.querySelectorAll("img").length > 0) {
      text = str;
    }
    return text;
  }

  // html5字符串转DOM元素
  static stringToText(string, returnType) {
    string.replace(/<!--.*-->/g, "");
    let dom = document.createElement("div");
    dom.innerHTML = string;
    clearTag(dom, "style");
    clearTag(dom, "xml");
    clearTag(dom, "script");
    if (returnType === "innerText") {
      let text = dom.innerText;
      return text; //.replace(/\n/g, '');
    } else if (returnType === "img") {
      let imgs = dom.querySelectorAll("img");
      let imgList = [];
      for (let i = 0; i < imgs.length; i++) {
        imgList.push(imgs[i].src);
      }
      return imgList;
    }
  }
  // html转码
  static HTMLDecode(text) {
    let temp = document.createElement("div");
    temp.innerHTML = text;
    return temp.innerHTML;
  }

  // 日期转字符串
  static dateToString(date) {
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    month = month >= 10 ? month : "0" + month;
    day = day >= 10 ? day : "0" + day;
    return `${year}` + "-" + `${month}` + "-" + `${day}`;
  }
  //昨天
  static dateToStringLast(date) {
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate() - 1;
    month = month >= 10 ? month : "0" + month;
    day = day >= 10 ? day : "0" + day;
    return `${year}` + "-" + `${month}` + "-" + `${day}`;
  }
  //前天
  static dateToStringLasts(date) {
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate() - 2;
    month = month >= 10 ? month : "0" + month;
    day = day >= 10 ? day : "0" + day;
    return `${year}` + "-" + `${month}` + "-" + `${day}`;
  }
  //本周
  static dateToStringLastWeek(date) {
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate() - 7;
    month = month >= 10 ? month : "0" + month;
    day = day >= 10 ? day : "0" + day;
    return `${year}` + "-" + `${month}` + "-" + `${day}`;
  }
  //本月
  static dateToStringLastMonth(date) {
    const year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    month = month >= 10 ? month : "0" + month;
    day = day >= 10 ? day : "0" + day;
    return `${year}` + "-" + `${month}` + "-" + `${day}`;
  }
  // 根据argName 返回index
  static getIndexByArg(arr, argName, str) {
    let r = -1;
    for (let [i, item] of new Map(arr.map((item, i) => [i, item]))) {
      if (item[argName] === str) {
        r = i;
        break;
      }
    }
    return r;
  }

  static getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  }

  // 返回任务状态 角标颜色
  static returnState(task) {
    let state = task.state;
    let wcsj = task.wcsj;
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
    if (
      task.state == "4" ||
      task.userResponse == null ||
      task.userResponse.id == null
    ) {
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
    } else if (
      task.stateName == "7" ||
      (task.state != "1" && (task.planEndTime != null && task.pastDates < 0))
    ) {
      //已过计划完成日期、尚未完成
      return "#ff914c";
      //进行中
    } else if (
      task.state != "1" &&
      (task.planEndTime == null || task.pastDates >= 0)
    ) {
      //待审核
      return "#76bf6e";
      //提前完成
    } else if (
      task.state == "1" &&
      task.planEndTime != null &&
      task.realityEndTime != null &&
      this.CompareDate(task.planEndTime, task.realityEndTime)
    ) {
      //已完成、但实际完成较计划完成迟
      return "#108ee9";
      //逾期完成
    } else if (
      task.state == "1" &&
      (task.planEndTime != null &&
        task.realityEndTime != null &&
        this.CompareDate(task.realityEndTime, task.planEndTime))
    ) {
      //已完成、实际完成与计划完成一致
      return "#108ee9";
      //按期完成
    } else if (
      task.state == "1" &&
      (task.planEndTime == null ||
        (task.planEndTime != null &&
          task.realityEndTime != null &&
          task.planEndTime.trim() == task.realityEndTime.trim()))
    ) {
      return "#108ee9";
    }
  }

  // 给所有按钮添加触摸动画
  static butAnimate() {
    // 块级反应
    // 如果是蓝色 要额外标注 blue 样式
    // 如果是白色 要额外标注 white 样式
    // 如果是蓝色图标+深灰色文字 要额外标注 iconBlue_txtGray 样式
    let buts = document.getElementsByClassName("aniBut");
    for (let i = 0; i < buts.length; i++) {
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
    let buts_red = document.getElementsByClassName("aniButRed");
    for (let i = 0; i < buts_red.length; i++) {
      buts_red[i].ontouchstart = function () {
        this.style.color = "#e22b2b";
      };
      buts_red[i].ontouchend = function () {
        this.style.color = "";
      };
    }

    // 内容颜色反应 灰色
    let buts_gray = document.getElementsByClassName("aniButGray");
    for (let i = 0; i < buts_gray.length; i++) {
      buts_gray[i].ontouchstart = function () {
        this.style.color = "#9797a7";
      };
      buts_gray[i].ontouchend = function () {
        this.style.color = "";
      };
    }

    // 内容颜色反应 蓝色
    let buts_blue = document.getElementsByClassName("aniButBlue");
    for (let i = 0; i < buts_blue.length; i++) {
      buts_blue[i].ontouchstart = function () {
        this.style.color = "#15a8e5";
      };
      buts_blue[i].ontouchend = function () {
        this.style.color = "";
      };
    }
  }

  // 根据状态数字返回状态名字
  static getStateNameByNo(task) {
    //对应于未指派负责人、已终止两种的任务状态
    if (
      task.state == "4" ||
      task.userResponse == null ||
      task.userResponse.id == null
    ) {
      if (task.state == "0" || task.state == "3") {
        return (
          <span style={{ color: "#E96300" }} className="state">
            未指派
          </span>
        );
      }
      if (task.state == "4") {
        return (
          <span style={{ color: "#808080" }} className="state">
            已终止
          </span>
        );
      }
      return "";
    } else if (task.state == "2") {
      return (
        <div style={{ color: "#58c582" }} className="state">
          待确认
        </div>
      );
    } else if (
      task.stateName == "7" ||
      (task.state != "1" && (task.planEndTime != null && task.pastDates < 0))
    ) {
      //已过计划完成日期、尚未完成
      return (
        <div style={{ color: "#E96300" }} className="state">
          已逾期
        </div>
      );
    } else if (
      task.state != "1" &&
      (task.planEndTime == null || task.pastDates >= 0)
    ) {
      //待审核
      return (
        <div style={{ color: "#58c582" }} className="state">
          进行中
        </div>
      );
    } else if (
      task.state == "1" &&
      task.planEndTime != null &&
      task.realityEndTime != null &&
      this.CompareDate(task.planEndTime, task.realityEndTime)
    ) {
      //已完成、但实际完成较计划完成迟
      return (
        <div style={{ color: "#3299CC" }} className="state">
          提前完成
        </div>
      );
    } else if (
      task.state == "1" &&
      (task.planEndTime != null &&
        task.realityEndTime != null &&
        this.CompareDate(task.realityEndTime, task.planEndTime))
    ) {
      //已完成、实际完成与计划完成一致
      return (
        <div style={{ color: "#0a74ca" }} className="state">
          逾期完成
        </div>
      );
    } else if (
      task.state == "1" &&
      (task.planEndTime == null ||
        (task.planEndTime != null &&
          task.realityEndTime != null &&
          task.planEndTime.trim() == task.realityEndTime.trim()))
    ) {
      return (
        <div style={{ color: "#108ee9" }} className="state">
          按时完成
        </div>
      );
    }
  }

  // 设置状态样式
  static stateColor(stateId, className = "") {
    // 0未完成  1正常完成  2待确认  3未指派  4已终止 8逾期完成 9提前完成
    let classname = "";
    let name = "";
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
    return <div className={classname}>{name}</div>;
  }

  // 根据名字返回nickName
  static getNickNameByName(name) {
    let str = name.replace(/[^\u4e00-\u9fa5]/gi, "");
    let nickname = str.substr(str.length - 2);
    return nickname;
  }

  static CompareDate(d1, d2) {
    let date1 = new Date(d1.replace(/-/g, "/"));
    let date2 = new Date(d2.replace(/-/g, "/"));
    if (date1 > date2 || date1 - date2 == 0) {
      return true;
    } else {
      return false;
    }
  }

  // 返回日期颜色
  static dateColor(planEndTime, state, realityEndTime) {
    let taskdate = "";
    if (planEndTime) {
      taskdate = new Date(planEndTime);
    }
    let now = new Date();
    if ((taskdate == now || taskdate < now) && state == "0") {
      return (
        <font style={{ color: "#ff8900" }}>
          {planEndTime && planEndTime.slice(0, 10)}
        </font>
      );
    } else if (state == "1" && new Date(realityEndTime) > taskdate) {
      return (
        <font style={{ color: "#ff8900" }}>
          {realityEndTime && realityEndTime.slice(0, 10)}
        </font>
      );
    } else {
      if (realityEndTime) {
        return (
          <font style={{ color: "#9599a2" }}>
            {realityEndTime && realityEndTime.slice(0, 10)}
          </font>
        );
      } else {
        return (
          <font style={{ color: "#9599a2" }}>
            {planEndTime && planEndTime.slice(0, 10)}
          </font>
        );
      }
    }
  }

  // 版本到期判断
  static getTeamInfoWithMoney(type, user) {
    let data = {
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
      // nextProps.user.data.antIsvCorpSuite.probation = true;
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
    let returnTxt = "";

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
        returnTxt =
          new Date(data.createDate).getTime() -
            new Date("2018-10-12").getTime() <
            0
            ? false
            : true;
        break;
      case "probation":
        returnTxt = data.probation;
        break;
      case "购买日期":
        returnTxt = data.buyDate;
        break;
      case "到期日期":
        returnTxt = data.endDate;
        break;
      case "是否超限": // 表示人数是否超限
        if (data.synUserCount > data.buyUserCount) {
          returnTxt = [true, data.buyUserCount, data.synUserCount];
        } else {
          returnTxt = [false, data.buyUserCount, data.synUserCount];
        }
        break;
      case "是否可用": // 表示高级功能是否可用
        console.log(data.buyVersion, '当前版本信息')
        switch (data.buyVersion) {
          case "SYB":
            returnTxt = true;
            break;
          case "JCB":
            returnTxt = false;
            break;
          case "ZSBSY":
            console.log("当前版本ZSBSY")
            returnTxt = true;
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
          case "ZSBSY":
            returnTxt = "正式版试用";
            break;
          case "MFB":
            returnTxt = "免费版";
            break;
        }
        returnTxt = "正式版试用";
        break;
      case "剩余天数":
        returnTxt = data.remainderDays;
        returnTxt = 1;
        break;
      case "专业版提示":
        returnTxt = [
          "专业版功能",
          "图表化项目管理、批量便捷操作、多维度数据统计、WBS文件系统等都为专业版功能，同时还有更多高级功能将陆续开放。您可以通过以下方式来升级到专业版。"
        ];
        break;
      case "续费提示":
        let name = "";
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
        returnTxt = [
          "续费升级",
          `您公司当前使用的是蚂蚁分工${name}，当前的授权有效期截止于${
          data.endDate
          }。您可以通过以下方式来进行提前续费，或升级到更高版本。`
        ];
        break;
      case "人数超限提示":
        returnTxt = `您公司管理员授权的使用人数已经超出了版本上限，当前版本最大可授权人数为<b>${
          data.buyUserCount
          }</b>人，目前已授权<b>${
          data.synUserCount
          }</b>人。请管理员及时在钉钉后台进行团队的授权管理，或升级到可容纳更多人员的规格。`;
        break;
      case "人数超限提示":
        returnTxt = [
          "使用人数超限",
          `您公司管理员授权的使用人数已经超出了版本上限，当前版本最大可授权人数为<b>${
          data.buyUserCount
          }</b>人，目前已授权<b>${
          data.synUserCount
          }</b>人。请管理员及时在钉钉后台进行团队的授权管理，或升级到可容纳更多人员的规格。。`
        ];
        break;
      case "即将到期提示":
        debugger;
        if (data.buyVersion === "SYB") {
          returnTxt = `<div class='freeText'>您公司于<b>${
            data.buyDate
            }</b>开始试用的蚂蚁分工专业版将在<b>${
            data.remainderDays == 0 ? "明天" : data.remainderDays + "天后"
            }</b>到期，请及时购买升级。</div>
                    `;
        } else if (data.buyVersion === "JCB") {
          returnTxt = `您公司于<b>${
            data.buyDate
            }</b>购买的蚂蚁分工基础版将在<b>${
            data.remainderDays == 0 ? "明天" : data.remainderDays + "天后"
            }</b>到期，为了不影响您公司的正常使用，请您提前进行续费或购买其他规格。`;
        } else if (data.buyVersion === "ZYB") {
          returnTxt = `您公司于<b>${
            data.buyDate
            }</b>购买的蚂蚁分工专业版将在<b>${
            data.remainderDays == 0 ? "明天" : data.remainderDays + "天后"
            }</b>到期，为了不影响您公司的正常使用，请您提前进行续费或购买其他规格。</div>`;
        } else if (data.buyVersion === "ZSBSY") {
          returnTxt = `<div class='freeText'>您公司于<b>${
            data.buyDate
            }</b>开始试用的蚂蚁分工专业版将在<b>${
            data.remainderDays == 0 ? "明天" : data.remainderDays + "天后"
            }</b>到期，请及时购买升级。</div>
                    `;
        }
        break;
      case "已到期提示":
        if (data.buyVersion === "ZYB") {
          returnTxt = `您公司于<b>${
            data.buyDate
            }</b>购买的蚂蚁分工专业版已经到期，感谢您的支持和信任，请您及时续费或购买其他规格。`;
        } else if (data.buyVersion === "JCB") {
          returnTxt = `您公司于<b>${
            data.buyDate
            }</b>购买的蚂蚁分工基础版已经到期，感谢您的支持和信任，请您及时续费或升级到功能更加全面的专业版。`;
        } else if (
          data.buyVersion === "SYB" &&
          new Date(data.createDate).getTime() -
          new Date("2018-10-12").getTime() <
          0
        ) {
          returnTxt = `<div class='freeText'><b>蚂蚁分工免费版</b>，免费版包含任务协作的完整功能，可轻度用于日常工作中任务的有序指派和跟进。</div>
								 <div class='basicsText'><b>蚂蚁分工基础版</b>，经济实惠的基础版在满足任务协作功能的同时，不限使用人数、不限项目数量、不限任务数量。</div>
								 <div class='majorText'><b>蚂蚁分工专业版</b>，功能强大的专业版具有批量任务操作、甘特图、多维度数据统计图表等专业功能，助您提高协同工作效率、量化员工绩效、提升项目管理。</div>`;
        } else if (
          data.buyVersion === "SYB" &&
          new Date(data.createDate).getTime() -
          new Date("2018-10-12").getTime() >=
          0
        ) {
          returnTxt = `<div class='freeText'>您公司于<b>${
            data.buyDate
            }</b>开始体验试用的蚂蚁分工专业版已到期，请及时购买升级。</div>
								<div class='basicsText'>如您需要轻量化的任务协同，可购买经济实惠的<b>蚂蚁分工基础版</b>，基础版不限使用人数、不限项目数量、不限任务数量。</div>
								<div class='majorText'>我们建议您升级到功能强大的<b>蚂蚁分工专业版</b>，专业版具有批量任务操作、甘特图、多维度数据统计图表等专业功能，助您提高协同工作效率、量化员工绩效、提升项目管理。</div>`;
        }
        break;

    }

    return returnTxt;
  }

  // 只允许输入正整数和浮点数
  static onlyNumber(obj) {
    obj.value = obj.value
      .replace(/[^\d\.]/g, "")
      .replace(".", "a")
      .replace(/\./g, "")
      .replace("a", ".");
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
  static arrItemSort(arrObj, keyName, type, isDate) {
    //这里如果 直接等于arrObj，相当于只是对对象的引用，改变排序会同时影响原有对象的排序，而通过arrObj.slice(0)，
    //表示把对象复制给另一个对象，两者间互不影响
    if (!arrObj) {
      return [];
    }
    var tempArrObj = arrObj.slice(0);
    var compare = function (keyName, type) {
      return function (obj1, obj2) {
        var val1 = obj1[keyName];
        var val2 = obj2[keyName];
        if (isDate) {
          val1 = new Date(obj1[keyName].replace(/-/g, "/")).getTime();
          val2 = new Date(obj2[keyName].replace(/-/g, "/")).getTime();
          //console.log(val1, "val1", val2, "val2");
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
  static createFileIcon(fileType) {
    let initfileType = new String(fileType);
    if (initfileType.length > 1) {
      initfileType = initfileType.substr(0, 1) + initfileType.substr(1);
    } else {
      initfileType = initfileType;
    }
    let audioArr = [
      "wav",
      "mp3",
      "au",
      "aif",
      "aiff",
      "ram",
      "wma",
      "mmf",
      "amr",
      "aac",
      "flac"
    ];
    let radioArr = [
      "avi",
      "mov",
      "asf",
      "wmv",
      "navi",
      "3gp",
      "ra",
      "ram",
      "mkv",
      "flv",
      "f4v",
      "rmvb",
      "webm",
      "mp4"
    ];
    let imageArr = [
      "jpg",
      "png",
      "jpeg",
      "bmp",
      "pcx",
      "tif",
      "tga",
      "exif",
      "fpx",
      "svg",
      "cdr",
      "pcd",
      "dxf",
      "ufo",
      "esp",
      "ai",
      "hdri",
      "raw",
      "wmf",
      "flic",
      "emp",
      "ico"
    ];
    let excelArr = ["xlsx", "xls"];
    let wordArr = ["doc", "docx"];
    let nomalArr = ["zip", "word"];
    let newAddArr = ["pdf", "ppt", "dwg", "rar", "ps", "zip", "word"];
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
    } else if (this.oneOfIcon(fileType, nomalArr)) {
    } else if (this.oneOfIcon(fileType, newAddArr)) {
    } else {
      fileType = "others";
    }
    //此处要做判断，看是什么类型
    if (fileType === "others") {
      return (
        <div className="download downloadOthers">
          <div>{initfileType.substr(0, 1)}</div>
        </div>
      );
    } else {
      return <Icon type={`anticon-${fileType}`} className="download" />;
    }
  }
  static oneOfIcon(value, validList) {
    for (let i = 0; i < validList.length; i++) {
      if (value == validList[i]) {
        return true;
      }
    }
    return false;
  }

  static descToString(string) {
    let aDom = document.createElement("div");
    aDom.innerHTML = string;
    return aDom.innerText;
  }
}
