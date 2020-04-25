import React, { Component } from "react";
import withRedux from "next-redux-wrapper";
import Router from "next/router";
import { Icon } from "antd-mobile";
import mobileStyle from "antd-mobile/lib/icon/style/index.css";
import { bindActionCreators } from "redux";

import { initStore } from "../store";
import stylesheet from "styles/pages/version.scss";
import Layout from "../components/Layout";
import Dingtalk from "../utils/dingtalk";
import Storage from "../utils/storage";
import utils from "../utils/utils";

import * as userAction from "../actions/user";

class Version extends Component {
  static getInitialProps({ req, store, isServer }) {
    const language = req ? req.headers["accept-language"] : navigator.language;
    return {
      language
    };
  }
  constructor(props) {
    super(props);
    this.state = {
      user: ""
    };
  }

  componentWillMount() {
    Dingtalk.setTitle("续费升级");
    Dingtalk.setMenuHome();
  }

  componentDidMount() {
    utils.butAnimate();
    let nowUser = Storage.getSession("user");

    if (nowUser && nowUser.userid) {
      this.setState({ user: nowUser });
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
    const { user } = this.state;
    const { language } = this.props;
    return (
      <Layout language={language}>
        <div className="pubLayout version">
          <style
            dangerouslySetInnerHTML={{
              __html: mobileStyle
            }}
          />
          <style
            dangerouslySetInnerHTML={{
              __html: stylesheet
            }}
          />
          <div className="imgBox">
            <div className="version1">
              <h3>收费标准</h3>
              <table>
                <tbody>
                  <tr>
                    <td>版本</td>
                    <td>价格/年</td>
                  </tr>
                  <tr>
                    <td>基础版(不限人数)</td>
                    <td>￥298</td>
                  </tr>
                  <tr>
                    <td>专业版(1-10人)</td>
                    <td>￥1980</td>
                  </tr>
                  <tr>
                    <td>专业版(11-20人)</td>
                    <td>￥3980</td>
                  </tr>
                  <tr>
                    <td>专业版(21-50人)</td>
                    <td>￥8980</td>
                  </tr>
                  <tr>
                    <td>专业版(51-100人)</td>
                    <td>￥14980</td>
                  </tr>
                  <tr>
                    <td>专业版(101-200人)</td>
                    <td>￥24980</td>
                  </tr>
                  <tr>
                    <td>专业版(201-500人)</td>
                    <td>￥34980</td>
                  </tr>
                  <tr>
                    <td>专业版(501-800人)</td>
                    <td>￥49980</td>
                  </tr>
                  <tr>
                    <td>专业版(800人以上)</td>
                    <td>￥59980</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="version2">
              <h3>功能对比</h3>
              <table>
                <tbody>
                  <tr>
                    <td>功能</td>
                    <td>基础版</td>
                    <td>专业版</td>
                  </tr>
                  <tr>
                    <td>自动同步钉钉组织架构</td>
                    <td>
                      <Icon type="check" />
                    </td>
                    <td>
                      <Icon type="check" />
                    </td>
                  </tr>
                  <tr>
                    <td>钉钉实时工作通知</td>
                    <td>
                      <Icon type="check" />
                    </td>
                    <td>
                      <Icon type="check" />
                    </td>
                  </tr>
                  <tr>
                    <td>4W1H多维度定义任务</td>
                    <td>
                      <Icon type="check" />
                    </td>
                    <td>
                      <Icon type="check" />
                    </td>
                  </tr>
                  <tr>
                    <td>无限分解子任务</td>
                    <td>
                      <Icon type="check" />
                    </td>
                    <td>
                      <Icon type="check" />
                    </td>
                  </tr>
                  <tr>
                    <td>钉盘存储分类任务附件</td>
                    <td>
                      <Icon type="check" />
                    </td>
                    <td>
                      <Icon type="check" />
                    </td>
                  </tr>
                  <tr>
                    <td>关联前后工序任务</td>
                    <td />
                    <td>
                      <Icon type="check" />
                    </td>
                  </tr>
                  <tr>
                    <td>任务导入导出</td>
                    <td />
                    <td>
                      <Icon type="check" />
                    </td>
                  </tr>
                  <tr>
                    <td>批量修改任务</td>
                    <td />
                    <td>
                      <Icon type="check" />
                    </td>
                  </tr>
                  <tr>
                    <td>跨项目复制移动任务</td>
                    <td />
                    <td>
                      <Icon type="check" />
                    </td>
                  </tr>
                  <tr>
                    <td>WBS条理化汇总文件</td>
                    <td />
                    <td>
                      <Icon type="check" />
                    </td>
                  </tr>
                  <tr>
                    <td>甘特图管理时间序列</td>
                    <td />
                    <td>
                      <Icon type="check" />
                    </td>
                  </tr>
                  <tr>
                    <td>多维度项目数据统计</td>
                    <td />
                    <td>
                      <Icon type="check" />
                    </td>
                  </tr>
                  <tr>
                    <td>精准工作动态</td>
                    <td>
                      <Icon type="check" />
                    </td>
                    <td>
                      <Icon type="check" />
                    </td>
                  </tr>
                  <tr>
                    <td>多维度筛选跟进任务</td>
                    <td />
                    <td>
                      <Icon type="check" />
                    </td>
                  </tr>

                  <tr>
                    <td>基础的任务增删改权限</td>
                    <td>
                      <Icon type="check" />
                    </td>
                    <td>
                      <Icon type="check" />
                    </td>
                  </tr>
                  <tr>
                    <td>跨项目多维度的任务与绩效统计</td>
                    <td />
                    <td>
                      <Icon type="check" />
                    </td>
                  </tr>
                  <tr>
                    <td>项目复制功能</td>
                    <td />
                    <td>
                      <Icon type="check" />
                    </td>
                  </tr>
                  <tr>
                    <td>任务与项目回收站</td>
                    <td />
                    <td>
                      <Icon type="check" />
                    </td>
                  </tr>
                  <tr>
                    <td>项目归档功能</td>
                    <td>
                      <Icon type="check" />
                    </td>
                    <td>
                      <Icon type="check" />
                    </td>
                  </tr>
                  <tr>
                    <td>循环计划</td>
                    <td>
                      <Icon type="check" />
                    </td>
                    <td>
                      <Icon type="check" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <h3>备注：提供21天免费试用，试用版包含全功能</h3>
          </div>
          {user &&
            (utils.getTeamInfoWithMoney("是否钉钉订单", user) ? (
              <div className="towButton">
                <div
                  className="but aniBut blue"
                  onClick={() => {
                    window.open("http://lwurl.to/i9gxi");
                  }}
                >
                  立即续费
                </div>
                <div
                  className="but aniBut blue"
                  onClick={() => {
                    Router.push(Dingtalk.setDdNavColor("/mo_customer"));
                  }}
                >
                  联系客服
                </div>
              </div>
            ) : (
              <div
                className="button aniBut blue"
                onClick={() => {
                  Router.push(Dingtalk.setDdNavColor("/mo_customer"));
                }}
              >
                联系客服
              </div>
            ))}
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
  Version
);
