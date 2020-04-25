import React, { Component } from "react";
import { WingBlank, Icon, Button, InputItem, Toast, Result } from "antd-mobile";
import mobileStyle from "antd-mobile/dist/antd-mobile.min.css";

import Router from "next/router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import withRedux from "next-redux-wrapper";
import { initStore } from "../store";
import * as userAction from "../actions/user";
import Storage from "../utils/storage";
import HttpClient from "../api/httpClient";
import stylesheet from "styles/pages/login.scss";
import NProgress from "nprogress";
import Dingtalk from "../utils/dingtalk";
class Login extends Component {
  static getInitialProps({ req }) {
    const language = req ? req.headers["accept-language"] : navigator.language;
    return {
      language
    };
  }
  constructor(props) {
    super(props);
    this.state = {
      name: "18838207584",
      password: "123456",
      loading: false
    };
  }
  componentWillMount() {
    NProgress.done();
    //获取session
    HttpClient.AjaxGet("/taskHome/taskIni", function () { });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.user && this.state.loading) {
      if (nextProps.user.success) {

        Storage.login(nextProps.user.data);
        Router.push(Dingtalk.setDdNavColor("/mo_dingHome"));
      } else {
        let mess = nextProps.user.errmsg;
        if (!mess) {
          mess = "系统错误";
        }
        Toast.fail(mess);
      }
      this.setState({ loading: false });
    }
  }
  login = () => {
    const { name, password } = this.state;
    if (name && password) {
      this.setState({ loading: true });
      this.props.login(name, password);
    }
  };

  upDate(e, type) {
    if (type == "name") {
      this.setState({ name: e });
    } else if (type == "password") {
      this.setState({ password: e });
    }
  }
  render() {
    const { language } = this.props;

    const { name, password, loading } = this.state;
    return (
      <div>
        {Dingtalk.isISV() ? (
          <Result
            className="errormain"
            title="系统错误"
            message="系统出现了异常请重新尝试"
            img={<Icon type="anticon-icon-error" className="error-icon" />}
          />
        ) : (
            <div className="login">
              <style
                dangerouslySetInnerHTML={{
                  __html: stylesheet
                }}
              />
              <style
                dangerouslySetInnerHTML={{
                  __html: mobileStyle
                }}
              />

              <div className="icon_box">
                <Icon type="anticon-geren" />
              </div>
              <div className="user_box">
                <WingBlank className="user_login">
                  <div className="headline">用户名:</div>
                  <div className="content">
                    <InputItem
                      type="text"
                      value={name}
                      onChange={e => this.upDate(e, "name")}
                    />
                  </div>
                </WingBlank>

                <WingBlank className="user_login">
                  <div className="headline">密码:</div>
                  <div className="content">
                    <InputItem
                      type="password"
                      value={password}
                      onChange={e => this.upDate(e, "password")}
                    />
                  </div>
                </WingBlank>
                <WingBlank className="user_buttom">
                  <Button type="primary" loading={loading} onClick={this.login}>
                    登录
                </Button>
                </WingBlank>
              </div>
            </div>
          )}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    user: state.user.user
  };
}
const mapDispatchToProps = dispatch => {
  return {
    login: bindActionCreators(userAction.login, dispatch)
  };
};
export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(Login);
