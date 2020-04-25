import React, { Component } from "react";
import { Button, InputItem, Toast, List, TextareaItem } from "antd-mobile";
import mobileStyle from "antd-mobile/dist/antd-mobile.min.css";

import Router from "next/router";
import Layout from "../components/Layout";
import { bindActionCreators } from "redux";
import withRedux from "next-redux-wrapper";
import { initStore } from "../store";
import * as feedbackAction from "../actions/feedback";
import * as taskinfoAction from "../actions/task";
import * as userAction from "../actions/user";
import stylesheet from "styles/pages/feedback.scss";
import Dingtalk from "../utils/dingtalk";
import NProgress from "nprogress";
import Storage from "../utils/storage";

/**
 * 意见反馈
 */
class Feedback extends Component {
  static getInitialProps({ req }) {
    const language = req ? req.headers["accept-language"] : navigator.language;
    return {
      language
    };
  }
  constructor(props) {
    super(props);
    this.state = {
      mail: "",
      remarks: "",
      loading: false
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.backResut && nextProps.backResut == true) {
      this.props.backFn(false);
      Router.back();
    }
    if (this.state.loading && nextProps.add) {
      if (nextProps.add.success) {
        Toast.info("感谢您提出的宝贵意见");
        setTimeout(() => {
          Router.back();
        }, 1000);
      } else {
        let mess = nextProps.add.errmsg;
        if (!mess) {
          mess = "系统错误";
        }
        Toast.fail(mess);
        this.setState({ refreshing: false });
      }
    }
  }
  componentDidMount() {
    const user = Storage.getSession("user");
    Dingtalk.setTitle("联系服务商");
    NProgress.done();
    if (user && user.userid) {
      if (!this.props.urlData) {
        this.props.setUrlData(encodeURIComponent(location.href.split("#")[0]));
      }
    }
  }
  add = () => {
    /*const reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;*/
    const { mail, remarks } = this.state;
    if (!remarks) {
      Toast.info("请输入您的建议或疑问");
    } else if (!mail) {
      Toast.info("请输入您的联系方式");
    } /*else if (!reg.test(mail)) {
            Toast.info('请填正确输入电子邮箱');
        }*/ else {
      this.props.save(mail, remarks);
      this.setState({ loading: true });
    }
  };
  cancel = () => {
    Router.back();
  };
  render() {
    const { language, platform } = this.props;
    const { mail, loading, remarks } = this.state;
    return (
      <Layout language={language}>
        <div className="feedBack">
          <style dangerouslySetInnerHTML={{ __html: mobileStyle }} />
          <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
          <div className="ewm">
            <div className="info">
              <b>电话：</b>
              <br />
              029-85798790
              <br />
              <b>邮箱：</b>
              <br />
              1001@antbim.com
              <br />
              <b>官方网站：</b>
              <br />
              http://www.antbim.com
            </div>
            <div className="pic">
              <img src="../static/imgs/ewmDing.png" />
              <p>扫一扫与客服沟通</p>
            </div>
          </div>
          <List className="list">
            <List.Item>
              <TextareaItem
                placeholder="您在使用蚂蚁分工的过程中，有任何的建议或疑问，都可以随时提交给我们"
                autoHeight
                labelNumber={5}
                onChange={e => {
                  this.setState({ remarks: e });
                }}
                value={remarks}
                rows={5}
                className="feedTextarea"
              />
            </List.Item>
            <List.Item className="box_align">
              <InputItem
                className="feedEmail"
                placeholder="您的联系方式，如手机号"
                onChange={e => {
                  this.setState({ mail: e });
                }}
                value={mail}
              />
            </List.Item>
          </List>
          <div className="button-box">
            <Button
              loading={loading}
              onClick={this.add}
              className="button-right"
              size="small"
              inline
              type="primary"
            >
              提交留言
            </Button>
          </div>
        </div>
      </Layout>
    );
  }
}
function mapStateToProps(state) {
  return {
    add: state.feedback.add,
    backResut: state.task.backResut,
    urlData: state.user.urlData
  };
}
const mapDispatchToProps = dispatch => {
  return {
    save: bindActionCreators(feedbackAction.save, dispatch),
    backFn: bindActionCreators(taskinfoAction.backFn, dispatch),
    setUrlData: bindActionCreators(userAction.setUrlData, dispatch)
  };
};
export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(
  Feedback
);
