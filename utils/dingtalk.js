import React from "react";
import Storage from "./storage";
const appType = "dingtalk";
const isISV = false; //是否isv
import HttpClient from "../api/httpClient";
import { Toast } from "antd-mobile";
import Router from "next/router";

export default class Dingtalk extends React.Component {
  static isISV() {
    return isISV;
  }
  static getAppType() {
    return appType;
  }

  //设置标题
  static setTitle(name) {
    if (typeof dd != "undefined" && appType == "dingtalk") {
      let title = "蚂蚁分工";
      if (name) {
        title = name;
      }
      dd.biz.navigation.setTitle({
        title: title, //控制标题文本，空字符串表示显示默认文本
        onSuccess: function(result) {},
        onFail: function(err) {}
      });
    }
  }
  //dd打点
  static actionDing(type) {
    if (typeof dd != "undefined" && appType == "dingtalk") {
      dd.biz.util.ut({
        key: "open_micro_general_operat", //打点名
        value: {
          corpId: Storage.getSession("corpId"),
          agentId: Storage.getSession("agentId"),
          type: type
        }, //打点传值
        onSuccess: function(e) {
          console.log(e, "*********打点onSuccess***************");
        },
        onFail: function(err) {
          console.log(err, "*********onFail***************");
        }
      });
    }
  }
  // 上传图片 multiple：是否上传多个，默认一次上传一个
  static uploadImage(onSuccess, onFail, multiple = true) {
    HttpClient.AjaxPost("/uploadAttachment/getUploadMethod", {}, result => {
      if (result.success) {
        let data = result.data;
        if (data.state) {
          dd.biz.util.uploadImage({
            multiple: multiple, //是否多选，默认false
            max: 9, //最多可选个数
            onSuccess: function(result) {
              if (onSuccess) onSuccess(result);
            },
            onFail: function(err) {
              onFail(err);
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
            onSuccess: function(result) {
              // console.log(result);
              if (onSuccess) {
                onSuccess(result);
              }
            },
            onFail: function(err) {
              onFail(err);
            }
          });
        }
      }
    });
  }
  //预览图片
  static previewImage(files) {
    if (files.fileId) {
      HttpClient.AjaxPost(
        "/uploadAttachment/authDingFilePreview",
        files,
        result => {
          if (result.success) {
            dd.biz.cspace.preview({
              corpId: Storage.getSession("corpId"),
              spaceId: files.spaceId,
              fileId: files.fileId,
              fileName: files.fileName,
              fileSize: files.fileSize,
              fileType: files.fileType,
              onSuccess: function() {
                //无，直接在弹窗页面显示文件详细信息
              },
              onFail: function(err) {
                // console.log(err);
              }
            });
          }
        }
      );
    } else {
      let date = [];
      const url = files.fileUrlAbsolute
        ? files.fileUrlAbsolute.replace(/\\/g, "/")
        : files;
      let suffixIndex = url.lastIndexOf(".");
      let suffix = url.substring(suffixIndex + 1).toUpperCase();
      if (
        suffix != "BMP" &&
        suffix != "JPG" &&
        suffix != "JPEG" &&
        suffix != "PNG" &&
        suffix != "GIF"
      ) {
        Toast.fail("非图片文件不能查看");
        return;
      }
      if (date.length == 0) {
        date.push(url);
      }
      dd.biz.util.previewImage({
        urls: date, //图片地址列表
        current: url, //当前显示的图片链接
        onSuccess: function(result) {
          /**/
          //   console.log(result, "---------result----------------");
        },
        onFail: function(err) {
          //   console.log(err, "---------err----------------");
        }
      });
    }
  }
  //弹框
  static aletDing(message, title, buttonName, onOk) {
    if (typeof dd != "undefined" && appType == "dingtalk") {
      dd.device.notification.alert({
        message: message,
        title: title ? title : "提示", //可传空
        buttonName: buttonName ? buttonName : "确定",
        onSuccess: function() {
          if (onOk) {
            onOk();
          }
        },
        onFail: function(err) {}
      });
    }
  }

  //设置菜单
  static setMenu(items, success, fail) {
    if (typeof dd != "undefined" && appType == "dingtalk") {
      dd.biz.navigation.setMenu({
        items: items,
        onSuccess: function(data) {
          if (success) {
            success(data);
          }
        },
        onFail: function(err) {
          fail(err);
        }
      });
    }
  }
  //首页菜单
  static setMenuHome() {
    this.setMenu(
      [{ id: "more", text: "更多" }],
      () => {
        this.actionSheet(
          "",
          ["续费升级", "联系服务商", "功能引导", "帮助中心"],
          index => {
            if (index == 0) {
              Router.push("/mo_version");
            } else if (index == 1) {
              Router.push("/mo_feedback");
            } else if (index == 2) {
              Router.push("/mo_guidePage");
            } else if (index == 3) {
              Router.push("/mo_help");
            }
          }
        );
      },
      () => {}
    );
  }
  //右侧设置按钮
  static setMenuRight() {
    if (typeof dd != "undefined" && appType == "dingtalk") {
      dd.biz.navigation.setRight({
        show: true,
        control: true,
        text: "设置",
        onSuccess: function(result) {
          if (result.success) {
            Router.push(
              this.setDdNavColor("/mo_setUp?id=" + this.props.url.query.proId)
            );
          }
        },
        onFail: function(err) {
          fail(err);
        }
      });
    }
  }
  //选人
  static selectUser(
    selectUser = [],
    title,
    onSuccess,
    onFail,
    multiple = false
  ) {
    let users = [];
    if (selectUser && selectUser.length > 0) {
      selectUser.map(item => {
        users.push(item.userid);
      });
    }
    let _this = this;
    if (typeof dd != "undefined" && appType == "dingtalk") {
      dd.biz.contact.complexPicker({
        startWithDepartmentId: 0, //-1表示打开的通讯录从自己所在部门开始展示, 0表示从企业最上层开始，(其他数字表示从该部门开始:暂时不支持)
        multiple: multiple ? true : false, //是否多选： true多选 false单选； 默认true
        pickedUsers: users, //默认选中的用户列表，userid；成功回调中应包含该信息
        disabledUsers: [], // 不能选中的用户列表，员工userid
        corpId: Storage.getSession("corpId"), //企业id
        max: multiple ? 100 : 1, //人数限制，当multiple为true才生效，可选范围1-1500
        limitTips: "", //超过人数限制的提示语可以用这个字段自定义
        isNeedSearch: true, // 是否需要搜索功能
        title: title, // 如果你需要修改选人页面的title，可以在这里赋值
        responseUserOnly: true, //返回人，或者返回人和部门
        local: "true", // 是否显示本地联系人，默认false
        onSuccess: function(data) {
          let userId = data.users;
          console.log(
            JSON.stringify(data.users),
            " data.users data.users data.users data.users data.users"
          );
          HttpClient.AjaxPost("/user/isAuth", userId, result => {
            // console.log(result);
            if (!result) {
              return;
            }
            if (result.data.type == "0") {
              onSuccess(result.data.users1);
            } else if (result.data.type == "1") {
              dd.device.notification.confirm({
                message: result.data.message,
                title: "提示",
                buttonLabels: [result.data.label],
                onSuccess: function(resultData) {
                  onSuccess(result.data.users);
                },
                onFail: function(err) {}
              });
            } else if (result.data.type == "2") {
              dd.device.notification.confirm({
                message: result.data.message,
                title: "提示",
                buttonLabels: [result.data.label, "取消"],
                onSuccess: function(result) {
                  if (result.buttonIndex == 0) {
                    _this.selectUser(
                      selectUser,
                      title,
                      onSuccess,
                      onFail,
                      multiple
                    );
                  }
                },
                onFail: function(err) {}
              });
            }
          });
        },
        onFail: function(err) {
          onFail(err);
        }
      });
    }
  }
  //获取手机型号
  static getPhoneInfo(fn, error) {
    if (typeof dd != "undefined" && appType == "dingtalk") {
      dd.device.base.getPhoneInfo({
        onSuccess: function(data) {
          if (data.brand) {
            Storage.setPhoneVersion(data.brand);
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
        onFail: function(err) {
          if (error) {
            error();
          }
        }
      });
    }
  }
  //判断是否ios
  static isIos() {
    if (
      Storage.getSession("phoneVersion") == "ios" ||
      Storage.getSession("phoneVersion") == "iPhone"
    ) {
      return true;
    } else {
      return false;
    }
  }
  //判断是否android
  static isAndroid() {
    if (
      Storage.getSession("phoneVersion") == "android" ||
      Storage.getSession("phoneVersion") != "iPhone"
    ) {
      return true;
    } else {
      return false;
    }
  }
  //单选列表
  static actionSheet(title, butts, fn, error) {
    if (typeof dd != "undefined" && appType == "dingtalk") {
      if (butts && butts.length > 0) {
        dd.device.notification.actionSheet({
          title: title, //标题
          cancelButton: "取消", //取消按钮文本
          otherButtons: butts,
          onSuccess: function(result) {
            if (fn) {
              fn(result.buttonIndex);
            }
            //onSuccess将在点击button之后回调
            /*{
                            buttonIndex: 0 //被点击按钮的索引值，Number，从0开始, 取消按钮为-1
                        }*/
          },
          onFail: function(err) {
            if (error) {
              error();
            }
          }
        });
      }
    }
  }
  //单选列表
  static openLink(url) {
    if (typeof dd != "undefined" && appType == "dingtalk") {
      dd.biz.util.openLink({
        url: url,
        onSuccess: function() {
          //   console.log("-----------onSuccess--------");
        },
        onFail: function() {
          //   console.log("-----------onFail-------s-");
          window.open(url);
        }
      });
    }
  }
  //获取钉钉免登 code
  static getLoginCode(corpid, success, fail) {
    if (typeof dd != "undefined" && appType == "dingtalk") {
      dd.runtime.permission.requestAuthCode({
        corpId: corpid,
        onSuccess: function(result) {
          if (success) {
            success(result.code);
          }
        },
        onFail: function(err) {
          fail(err);
        }
      });
    }
  }
  //钉钉关闭页面
  static dingtalkClosePage() {
    if (typeof dd != "undefined" && appType == "dingtalk") {
      dd.biz.navigation.close({
        onSuccess: function(result) {
          //   console.log(result, "-----------closePage.result----------");
        },
        onFail: function(err) {
          //   console.log(result, "-----------closePage.result----------");
        }
      });
    }
  }
  //退出关闭页面方法
  static closePage() {
    //退出到最后关闭页面
    if (
      Router.router &&
      Router.router.asPath &&
      Router.router.asPath.indexOf("/dingTalkLogin") != -1
    ) {
      this.dingtalkClosePage();
    }
  }
  static setQuestionUrl(url) {
    return (
      visitUrl + "/static/react-static/mobile-1.1.4/question" + url + ".png"
    );
  }
  //设置钉钉头部颜色
  static setDdNavColor(url) {
    if (url) {
      url =
        url.indexOf("?") != -1
          ? url + "&dd_nav_bgcolor=FF108EE9"
          : url + "?dd_nav_bgcolor=FF108EE9";
    }
    return url;
  }
  //授权JsApi接口
  static authDingJsApi(onSuccess, urlData) {
    let corpId = Storage.getSession("corpId");
    //var urlData = encodeURIComponent(location.href.split('#')[0]);
    //var urlData = encodeURIComponent("https://ddy.antbim.net/mo_dingTalkLogin?SuiteKey=suitegj2w3dxicczbxdfe&corpid="+corpId+"&dd_nav_bgcolor=FF108EE9");
    if (!urlData) {
      urlData = encodeURIComponent(location.href.split("#")[0]);
    }
    corpId = corpId ? corpId : "";
    HttpClient.AjaxPost(
      "/dingTalk/mobilejs?urlData=" + urlData + "&corpid=" + corpId,
      "",
      result => {
        // console.log(result, urlData);
        if (result.success) {
          let data = result.data;
          if (data) {
            Storage.setSession("corpId", data.corpid);
            Storage.setSession("agentId", data.appid);
          }
          dd.config({
            agentId: data.appid, // 必填，微应用ID
            corpId: data.corpid, //必填，企业ID
            timeStamp: data.timeStamp, // 必填，生成签名的时间戳
            nonceStr: data.nonceStr, // 必填，生成签名的随机串
            signature: data.signature, // 必填，签名
            type: 0, //选填。0表示微应用的jsapi,1表示服务窗的jsapi。不填默认为0。该参数从dingtalk.js的0.8.3版本开始支持
            jsApiList: [
              "runtime.info",
              "biz.contact.complexPicker",
              "biz.util.ut",
              "biz.util.uploadImage",
              "biz.util.previewImage",
              "biz.navigation.setTitle",
              "runtime.permission.requestAuthCode",
              "biz.util.uploadAttachment",
              "biz.cspace.preview",
              "biz.navigation.setRight"
            ] // 必填，需要使用的jsapi列表，注意：不要带dd。
          });
          dd.error(function(error) {
            // console.log("dingtalk error: " + JSON.stringify(error));
            let url = "urlData为空";
            if (urlData) {
              url = JSON.stringify(urlData);
            }
            HttpClient.AjaxPost(
              "/dingTalk/saveDdconfigError",
              {
                remarks:
                  "dingtalk:" +
                  JSON.stringify(error) +
                  ",corpId:" +
                  corpId +
                  ",urlData:" +
                  decodeURIComponent(urlData) +
                  ",isIos:" +
                  dd.ios +
                  ",urlJSON:" +
                  url
              },
              list => {
                // console.log("保存DD.CONFIG错误成功");
              }
            );
            if (onSuccess) {
              onSuccess();
            }
          });
          dd.ready(function() {
            // console.log("***************ready**********************");
            if (onSuccess) {
              onSuccess();
            }
          });
        }
      }
    );
  }
}
