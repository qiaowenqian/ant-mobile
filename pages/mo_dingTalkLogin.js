import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import withRedux from "next-redux-wrapper";
import Router from "next/router";
import { initStore } from "../store";
import * as userAction from "../actions/user";
import * as taskinfoAction from "../actions/task";
import Dingtalk from "../utils/dingtalk";
import Utils from "../utils/utils";
import Storage from "../utils/storage";
import HttpClient from "../api/httpClient";
import Layout from "../components/Layout";
import stylesheet from "styles/pages/dingTalkLogin.scss";

class DingTalkLogin extends Component {
  static getInitialProps({ req }) {
    const language = req ? req.headers["accept-language"] : navigator.language;
    const userAgent = req ? req.headers["user-agent"] : navigator.userAgent;
    const android = /android/i.test(userAgent);
    const platform = android ? "android" : "ios";
    return {
      language,
      platform
    };
  }
  constructor(props) {
    super(props);
    this.state = {
      suiteKey: "",
      corpid: "",
      code: "",
      url: "",
      loadingCode: false,
      loadingMessage: false,
      data: null,
      backLogin: false
    };
  }
  componentWillMount() {}
  componentDidMount() {
    if (!this.props.urlData) {
      this.props.setUrlData(encodeURIComponent(location.href.split("#")[0]));
    }
    const url = window.location.href;
    if (url) {
      if (!url.indexOf("antbim") > -1) {
        HttpClient.AjaxGet("/test/test", function() {});
        setTimeout(() => {
          this.iniLogin();
        }, 100);
      }
    }
  }
  iniLogin() {
    const corpid = Utils.getQueryString("corpid");
    const suiteKey = Utils.getQueryString("SuiteKey");
    const url = Utils.getQueryString("url");
    if (corpid && suiteKey) {
      console.log(corpid, suiteKey, url);
      var urlData = encodeURIComponent(location.href.split("#")[0]);
      this.props.setUrlData(urlData);
      this.props.mobilejs(corpid, suiteKey, urlData);
      this.setState({
        corpid: corpid,
        suiteKey: suiteKey,
        loading: true,
        url: url
      });
    } else {
      //Router.push(Dingtalk.setDdNavColor('/mo_login'));
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.dingtakCode && this.state.loading) {
      if (nextProps.dingtakCode.success) {
        const data = nextProps.dingtakCode.data;
        this.setState({ loading: false });
        if (data) {
          Storage.setSession("corpId", data.corpid);
          Storage.setSession("agentId", data.appid);
          this.dingJs(data);
        }
        console.log(data, "dataaaaaaaa");
      } else {
        let mess = nextProps.dingtakCode.errmsg;
        if (!mess) {
          mess = "系统错误";
        }
        this.setState({ loading: false });
        this.error(mess);
      }
    } else if (nextProps.dingtakLogin && this.state.loadingCode) {
      if (nextProps.dingtakLogin.success) {
        this.setState({ loadingCode: false });
        Storage.login(nextProps.dingtakLogin.data);
        if (
          nextProps.dingtakLogin.data &&
          nextProps.dingtakLogin.data.sex != HttpClient.getVersion()
        ) {
          Router.push(Dingtalk.setDdNavColor("/mo_guidePage"));
        } else {
          let taskId = Utils.getQueryString("taskId");
          let taskinfoId = Utils.getQueryString("taskinfoId");
          console.log('taskId' + taskId)
          if (taskId) {
            console.log('taskId为' + taskId + '链接地址' + Dingtalk.setDdNavColor("/mo_taskDetails?id=" + taskId))
            Router.push(Dingtalk.setDdNavColor("/mo_taskDetails?id=" + taskId))
          }else{
            if (taskinfoId) {
              this.props.getDingMessageDetails(taskinfoId);
              this.setState({
                loadingMessage: true
              });
            } else {
              if (this.state.url) {
                Router.push("/" + this.state.url);
              } else {
                Router.push(Dingtalk.setDdNavColor("/mo_dingHome"));
              }
            }
          }
          
        }
      } else {
        let mess = nextProps.dingtakLogin.errmsg;
        if (!mess) {
          mess = "系统错误";
        }
        this.error(mess);
        this.setState({ loadingCode: false });
      }
    } else if (this.state.loadingMessage && nextProps.dingtakMessage) {
      if (nextProps.dingtakMessage.success) {
        if (nextProps.dingtakMessage.data.taskinfoId) {
          this.props.selectTaskinfoId(nextProps.dingtakMessage.data.taskinfoId);
          Router.push(
            Dingtalk.setDdNavColor(
              "/mo_taskDetails?id=" + nextProps.dingtakMessage.data.taskinfoId
            )
          );
        } else {
          if (this.state.url) {
            Router.push(Dingtalk.setDdNavColor("/" + this.state.url));
          } else {
            Router.push(Dingtalk.setDdNavColor("/mo_dingHome"));
          }
        }
      } else {
        let mess = nextProps.dingtakMessage.errmsg;
        if (!mess) {
          mess = "系统错误";
        }
        // this.error(mess);
        this.setState({ loadingMessage: false });
        if (this.state.url) {
          Router.push(Dingtalk.setDdNavColor("/" + this.state.url));
        } else {
          Router.push(Dingtalk.setDdNavColor("/mo_dingHome"));
        }
      }
    }
  }
  //钉钉代码
  dingJs(data) {
    const { corpid } = this.state;
    if (data) {
      let _this = this;
      dd.config({
        agentId: data.appid, // 必填，微应用ID
        corpId: data.corpid, //必填，企业ID
        timeStamp: data.timeStamp, // 必填，生成签名的时间戳
        nonceStr: data.nonceStr, // 必填，生成签名的随机串
        signature: data.signature, // 必填，签名
        type: 0, //选填。0表示微应用的jsapi,1表示服务窗的jsapi。不填默认为0。该参数从dingtalk.js的0.8.3版本开始支持
        jsApiList: [
          "biz.util.ut",
          "biz.contact.complexPicker",
          "biz.util.uploadImage",
          "biz.util.previewImage",
          "runtime.permission.requestAuthCode",
          "biz.util.uploadAttachment",
          "biz.cspace.preview"
        ] // 必填，需要使用的jsapi列表，注意：不要带dd。
      });
      dd.error(function(error) {
        // if (this.porps.saveDdconfigError) {
        //   this.porps.saveDdconfigError(
        //     "dingtalk:" +
        //       JSON.stringify(error) +
        //       ",corpId:" +
        //       corpId +
        //       ",urlData:" +
        //       urlData
        //   );
        //   console.log("dd error: " + JSON.stringify(error));
        // }
        console.log("dd error: " + JSON.stringify(error));
      });

      dd.ready(function() {
        //获取设备信息
        Dingtalk.getPhoneInfo(
          () => {
            _this.iphoenDisable();
          },
          () => {
            const { platform } = _this.props;
            if (platform) {
              Storage.setPhoneVersion(platform);
            }
            _this.iphoenDisable();
          }
        );
        //设置标题
        Dingtalk.setTitle("蚂蚁分工");
        Dingtalk.getLoginCode(
          corpid,
          code => {
            _this.props.dingtalkCodeLogin(code, corpid);
            _this.setState({
              code: code,
              loadingCode: true
            });
          },
          err => {
            _this.error();
          }
        );
      });
    } else {
      this.error();
    }
  }
  //错误处理
  error(message) {
    let mes = "网络超时，请重新尝试登录";
    if (message == "10000") {
      mes = "您团队的管理员正在设置本应用，请您稍后重试或联系管理员";
    }
    Dingtalk.aletDing(mes);
  }
  // ios 设置
  iphoenDisable() {
    setTimeout(() => {
      if (Dingtalk.isIos()) {
        dd.ui.webViewBounce.disable(); //禁用iOS webview弹性效果
      }
      //后退事件
      // this.back();
    }, 10);
  }

  back() {
    const _this = this;
    if (typeof dd != "undefined" && Dingtalk.getAppType() == "dingtalk") {
      if (Dingtalk.isIos()) {
        dd.biz.navigation.setLeft({
          control: true, //是否控制点击事件，true 控制，false 不控制， 默认false
          text: "", //控制显示文本，空字符串表示显示默认文本
          onSuccess: function(result) {
            // _this.props.backFn(true);
            const { router } = Router;
            //ios后退关闭页面
            if (router && router.asPath && router.asPath === "/mo_dingHome") {
              Dingtalk.closePage();
            } else {
              Router.back();
            }
          },
          onFail: function(err) {
            _this.props.backFn(true);
          }
        });
      } else {
        document.addEventListener("backbutton", function(e) {
          const { router } = Router;
          //Android后退关闭页面
          if (router && router.asPath && router.asPath === "/mo_dingHome") {
            Dingtalk.closePage();
          } else {
            Router.back();
          }
          // e.preventDefault(); //backbutton事件的默认行为是回退历史记录，如果你想阻止默认的回退行为，那么可以通过preventDefault()实现
          // _this.props.backFn(true);
        });
      }
    }
  }
  upDate(e, type) {
    if (type == "name") {
      this.setState({ name: e });
    } else if (type == "password") {
      this.setState({ password: e });
    }
  }

  render() {
    const { language, platform } = this.props;
    const { name, password, loading, backLogin } = this.state;
    return (
      <Layout language={language}>
        <div className="dingLoging">
          <style
            dangerouslySetInnerHTML={{
              __html: stylesheet
            }}
          />
          <div className="loadBox">
            <div className="logoTop">
              <img src="../static/imgs/logoLoading.png?t=1.5" />
            </div>
            <div className="logoBott">
              <img src="../static/imgs/logoLoad.png?t=1.5" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}
function mapStateToProps(state) {
  return {
    dingtakCode: state.user.dingtakCode,
    dingtakLogin: state.user.dingtakLogin,
    dingtakMessage: state.task.dingtakMessage
    //userCancellation: state.user.userCancellation,
  };
}
const mapDispatchToProps = dispatch => {
  return {
    mobilejs: bindActionCreators(userAction.mobilejs, dispatch),
    dingtalkCodeLogin: bindActionCreators(
      userAction.dingtalkCodeLogin,
      dispatch
    ),
    getDingMessageDetails: bindActionCreators(
      taskinfoAction.getDingMessageDetails,
      dispatch
    ),
    selectTaskinfoId: bindActionCreators(
      taskinfoAction.selectTaskinfoId,
      dispatch
    ),
    backFn: bindActionCreators(taskinfoAction.backFn, dispatch),
    setUrlData: bindActionCreators(userAction.setUrlData, dispatch),
    saveDdconfigError: bindActionCreators(
      userAction.saveDdconfigError,
      dispatch
    )
    //cancellation: bindActionCreators(userAction.cancellation, dispatch),
  };
};
export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(
  DingTalkLogin
);
