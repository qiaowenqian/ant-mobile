import React, { Component } from "react";
import withRedux from "next-redux-wrapper";
import { bindActionCreators } from "redux";

import { initStore } from "../store";
import Layout from "../components/Layout";
import Dingtalk from "../utils/dingtalk";
import utils from "../utils/utils";
import Storage from "../utils/storage";

import * as userAction from "../actions/user";

class Customer extends Component {
  static getInitialProps({ req, store, isServer }) {
    const language = req ? req.headers["accept-language"] : navigator.language;
    return {
      language
    };
  }
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    Dingtalk.setTitle("联系客服");
    Dingtalk.setMenuHome();
  }

  componentDidMount() {
    utils.butAnimate();
    const user = Storage.getSession("user");
    if (user && user.userid) {
      if (!this.props.urlData) {
        this.props.setUrlData(encodeURIComponent(location.href.split("#")[0]));
      }
    }
  }

  componentWillReceiveProps(nextProps) {}

  componentDidUpdate() {
    utils.butAnimate();
  }

  render() {
    const { language } = this.props;
    return (
      <Layout language={language}>
        <div
          className="pubLayout"
          style={{
            background: "#fff",
            padding: "125px 0 0 0",
            textAlign: "center"
          }}
        >
          <img src="../static/imgs/ewmDing.png" style={{ maxWidth: "80%" }} />
          <div style={{ position: "fixed", bottom: "15px", width: "100%" }}>
            <div style={{ display: "flex", margin: "0 0 15px 0" }}>
              <div
                style={{
                  flex: "1",
                  borderBottom: "1px solid #ccc",
                  height: "8px",
                  margin: "0 12px"
                }}
              />
              <div style={{ flex: "0 0 auto", color: "#9c9c9c" }}>
                其它联系方式
              </div>
              <div
                style={{
                  flex: "1",
                  borderBottom: "1px solid #ccc",
                  height: "8px",
                  margin: "0 12px"
                }}
              />
            </div>
            <div style={{ margin: "5px 0 0 0", color: "#666" }}>
              电话：029-85798790
            </div>
            <div style={{ margin: "5px 0 0 0", color: "#666" }}>
              邮箱：1001@antbim.com
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}
function mapStateToProps(state) {
  return {
    urlData: state.user.urlData
  };
}
const mapDispatchToProps = dispatch => {
  return {
    setUrlData: bindActionCreators(userAction.setUrlData, dispatch)
  };
};
export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(
  Customer
);
