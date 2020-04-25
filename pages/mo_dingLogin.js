import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import withRedux from "next-redux-wrapper";
import Router from "next/router";
import { Toast } from "antd-mobile";

import stylesheet from "../styles/pages/dingLogin.scss";
import { initStore } from "../store";
import Dingtalk from "../utils/dingtalk";
import Utils from "../utils/utils";
import Storage from "../utils/storage";
import HttpClient from "../api/httpClient";
import Layout from "../components/Layout";
import mobileStyle from "antd-mobile/dist/antd-mobile.min.css";
class dingLogin extends Component {
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
    this.state = {};
  }
  componentWillMount() {}
  componentDidMount() {
    if (!this.props.urlData) {
      this.props.setUrlData(encodeURIComponent(location.href.split("#")[0]));
    }
  }

  componentWillReceiveProps(nextProps) {}

  render() {
    const { language } = this.props;
    return (
      <Layout language={language}>
        <div className="dingLogin">
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
          <div className="myLoginBox">
            <div className="pLogoImg">
              <img src="../static/imgs/logo1.png" />
              <p className="pLogoTitle">蚂蚁分工</p>
            </div>
            <p className="pTitle">请从钉钉工作台进入查看</p>
          </div>
        </div>
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  return {};
}
const mapDispatchToProps = dispatch => {
  return {};
};
export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(
  dingLogin
);
