import { Component } from "react";
import { bindActionCreators } from "redux";
import withRedux from "next-redux-wrapper";
import Link from "next/link";
import Router from "next/router";
import { Icon, Toast } from "antd-mobile";

import iconStyle from "antd-mobile/lib/icon/style/index.css";
import toastStyle from "antd-mobile/lib/toast/style/index.css";
import { initStore } from "../store";
import stylesheet from "styles/pages/dingHome.scss";
import Layout from "../components/Layout";
import Alert from "../components/alert";
import Activity from "../components/activity";

import Loading from "../components/Loading";
import MenuBar from "../components/MenuBar";
import * as taskAction from "../actions/task";
import * as userAction from "../actions/user";
import Dingtalk from "../utils/dingtalk";
import utils from "../utils/utils";
import Storage from "../utils/storage";
import * as cacheAction from "../actions/cache";
import { getTaskDetailsByIds } from "../actions/task";
import {
  findHomeDataByPageSize,
  getRecentlyCompleted,
  getPerformanceGrowth,
  updateStopTime,
  probationOrder
} from "../actions/home";

import _ from "lodash";
import echarts from "echarts";
import home from "../reducers/home";
/**
 * 首页
 */

class dingHome extends Component {
  static getInitialProps({ req, store, isServer }) {
    const language = req ? req.headers["accept-language"] : navigator.language;
    return {
      language
    };
  }
  constructor(props) {
    super(props);
    this.state = {
      one: 0,
      two: 0,
      three: 0,
      all: 0,
      objTalklist: [],
      homeDataLoading: false,

      messageMoreLoading: false,
      messageLoading: false,
      msgNowPage: 1,
      msgLastPage: 0,
      messageCount: 0,
      messageList: [],

      showChart1: false,
      showChart2: false,

      end15DaysShow: false,
      user: {},
      homeNumber: null,
      barType: 0,//0一周1月
      isShowActivity: false,
      isreload: 0
    };
  }

  componentDidMount() {
    console.log("homecomponentDidMount");
    Dingtalk.setTitle("首页");
    Dingtalk.setMenuHome();
    if (!this.props.urlData) {
      this.props.setUrlData(encodeURIComponent(location.href.split("#")[0]));
    }
    const user = Storage.getSession("user");
    this.setState({ user: user });
    console.log(user)
    const end15DaysShowDate = Storage.getLocal("end15DaysShowDate");
    if (
      utils.getTeamInfoWithMoney("剩余天数", user) < 15 &&
      utils.dateToString(new Date()) !== end15DaysShowDate &&
      utils.getTeamInfoWithMoney("剩余天数", user) >= 0
    ) {
      if (utils.getTeamInfoWithMoney("版本名称", user) === '正式版试用') {
        if (utils.getTeamInfoWithMoney("剩余天数", user) == '1') {
          this.setState({ end15DaysShow: true });
        }
      } else {
        this.setState({ end15DaysShow: true });
      }
    }
    //判断是否显示活动页面
    if (utils.getTeamInfoWithMoney("probation", user) && user && user.isAdmin == '1') {
      this.setState({ isShowActivity: true });
    }
    //判断是不是管理员
    // 获取顶部数据

    this.getTopNumber();

    this.renchart(true);
    this.renchart2(true);
    if (!this.props.urlData) {
      this.props.setUrlData(encodeURIComponent(location.href.split("#")[0]));
    }

    utils.butAnimate();
  }
  getTopNumber() {
    findHomeDataByPageSize(6, data => {
      this.setState({
        homeDataLoading: true,
        one: data.db.dwc,
        two: data.db.dqr,
        three: data.db.dzp
      });
    });
  }
  renchart(flag) {
    if (flag) {
      this.chartBar = echarts.init(
        document.getElementById("homePageBar"),
        "light"
      );
    }
    getRecentlyCompleted(
      {
        type: "0"
      },
      data => {
        this.Chart1upData(data);
      }
    );
  }
  renchart2(flag) {
    const { barType } = this.state;
    if (flag) {
      this.homeChartLine = echarts.init(
        document.getElementById("homePageLine"),
        "light"
      );
    }
    getPerformanceGrowth(
      {
        type: barType
      },
      data => {
        this.Chart2upData(data);
      }
    );
  }
  componentWillMount() { }

  componentWillUnmount() {
    // 关闭页面
    Dingtalk.closePage();
  }

  componentWillReceiveProps(nextProps) { }

  componentDidUpdate() {
    utils.butAnimate();
  }

  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }

  Chart1upData(homeBar) {
    let labelOption = {
      show: false
    };
    let arrColor = [
      "rgb(83, 211, 146)",
      "rgb(104, 182, 255)",
      "rgb(199, 131, 242)"
    ];
    let xAxisData = [];
    let arrSeries = [];
    let arrSeries2 = [];
    let arrSeries3 = [];
    if (homeBar && homeBar.length > 0) {
      this.setState({
        showChart1: false
      });
      homeBar.map(items => {
        items.dateFull = new Date().getFullYear() + "-" + items.date;
      });
      utils.arrItemSort(homeBar, "dateFull", 0, 1).map(item => {
        xAxisData.push(item.date);
        arrSeries.push(item.completed);
        arrSeries2.push(item.confirm);
        arrSeries3.push(item.assign);
      });
      this.chartBar.setOption({
        color: arrColor,
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        grid: [
          {
            left: "10%",
            right: "10%",
            top: "10"
          }
        ],
        legend: {
          data: ["完成", "确认", "指派"],
          bottom: 0
        },
        xAxis: [
          {
            type: "category",
            axisTick: { show: false },
            data: xAxisData,
            axisLabel: {
              color: "#79828c",
              fontSize: "12px"
            },
            axisLine: {
              lineStyle: {
                color: "#C4C8CD"
              }
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              color: "#79828c",
              fontSize: "12px"
            }
          }
        ],
        series: [
          {
            name: "完成",
            type: "bar",
            barGap: 0,
            label: labelOption,
            data: arrSeries
          },
          {
            name: "确认",
            type: "bar",
            label: labelOption,
            data: arrSeries2
          },
          {
            name: "指派",
            type: "bar",
            label: labelOption,
            data: arrSeries3
          }
        ]
      });
    } else {
      this.setState({
        showChart1: true
      });
    }
  }
  Chart2upData(homeLine) {
    let beginNum = 0;
    if (homeLine && homeLine.length > 0) {
      this.setState({
        showChart2: false
      });
      let xAxisData = [];
      let arrSeries = [];
      homeLine.map(items => {
        items.dateFull = new Date().getFullYear() + "-" + items.date;
      });
      utils.arrItemSort(homeLine, "dateFull", 0, 1).map(item => {
        beginNum = beginNum + item.completed + item.confirm + item.assign;
        xAxisData.push(item.date);
        arrSeries.push(beginNum.toFixed(2));
      });
      this.homeChartLine.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "line"
          }
        },
        xAxis: [
          {
            type: "category",
            axisTick: { show: false },
            data: xAxisData,
            axisLabel: {
              color: "#79828c",
              fontSize: "12px"
            },
            axisLine: {
              lineStyle: {
                color: "#C4C8CD"
              }
            }
          }
        ],
        grid: [
          {
            left: "13%",
            right: "10%",
            top: "10",
            bottom: "30"
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              color: "#79828c",
              fontSize: "12px",
              // 自定义y轴刻度信息
              align: "right",
              formatter: function (value) {
                let a = value;
                if (value > 10000 && value < 1000000) {
                  console.log("fppf");
                  a = (value / 10000).toFixed(1) + "万";
                }
                if (value > 1000000 && value < 10000000) {
                  a = (value / 1000000).toFixed(1) + "百万";
                }
                if (value > 10000000 && value < 100000000) {
                  a = (value / 10000000).toFixed(1) + "千万";
                }
                if (value > 100000000) {
                  a = (value / 100000000).toFixed(1) + "亿";
                }
                return a;
              }
            }
          }
        ],
        series: [
          {
            name: "绩效值",
            data: arrSeries,
            type: "line"
          }
        ]
      });
    } else {
      this.setState({
        showChart2: true
      });
    }
  }

  urlGo(type) {
    let url = "";
    switch (type) {
      case 1:
        url = "/mo_task?menuType=sub1&panelId=0";
        break;
      case 2:
        url = "/mo_task?menuType=my_succeed&panelId=2";
        break;
      case 3:
        url = "/mo_task?menuType=my_add&panelId=3";
        break;
      default:
        break;
    }
    Router.push(Dingtalk.setDdNavColor(url));
  }

  changeType(type) {
    this.setState(
      {
        barType: type
      },
      () => {
        this.renchart2(false);
      }
    );
  }
  updateStopTimeSever = () => {
    this.closeActivity();
    const { user } = this.state;
    if (user && user.antIsvCorpSuite && user.antIsvCorpSuite.corpid) {
      updateStopTime({ buycorpid: user.antIsvCorpSuite.corpid }, () => { })
    }
  }
  probationOrderSever = () => {
    const { user } = this.state;
    if (user && user.antIsvCorpSuite && user.antIsvCorpSuite.corpid) {
      probationOrder({ buycorpid: user.antIsvCorpSuite.corpid }, (data) => {
        Storage.removeSession("user");
        Storage.setSession("user", JSON.stringify(data));
        this.setState({
          isShowActivity: false,
          user: data,
          isreload: 1
        })
      })
    }
  }
  closeActivity = () => {
    const { user } = this.state;
    user.antIsvCorpSuite.probation = 0;
    Storage.setSession(
      "user",
      user
    );
    this.setState({
      isShowActivity: false,
      user: user
    })
  }
  render() {
    const {
      user,
      end15DaysShow,
      barType,
      one,
      two,
      three,
      showChart2,
      showChart1,
      isShowActivity,
      isreload
    } = this.state;

    const { language } = this.props;

    return (
      <Layout language={language}>
        <div className="pubLayout dingHome">
          <style
            dangerouslySetInnerHTML={{
              __html: stylesheet
            }}
          />
          <style
            dangerouslySetInnerHTML={{
              __html: iconStyle
            }}
          />
          <style
            dangerouslySetInnerHTML={{
              __html: toastStyle
            }}
          />

          {isShowActivity ? (<Activity
            msg={`<img src='../static/imgs/activity.png' class='antActivityImg'></img>`}
            okButTxt={"立即试用"}
            closeIconShow={true}
            closeIconClickCallBack={
              this.closeActivity
            }
            closeIcon2ClickCallBack={
              this.updateStopTimeSever
            }
            okCallBack={
              this.probationOrderSever
            }
          />
          ) : (
              ""
            )}
          {end15DaysShow ? (
            <Alert
              className="endV"
              title={utils.getTeamInfoWithMoney("版本名称", user) === "正式版试用" ? utils.getTeamInfoWithMoney("版本名称", user) : "试用版" + "即将到期"}
              msg={utils.getTeamInfoWithMoney("即将到期提示", user)}
              okButTxt={"续费升级"}
              butIsOne={true}
              closeIconShow={true}
              closeIconClickCallBack={() => {
                this.setState({
                  end15DaysShow: false
                });
                Storage.setLocal(
                  "end15DaysShowDate",
                  utils.dateToString(new Date())
                );
              }}
              okCallBack={() => {
                Router.push(Dingtalk.setDdNavColor("/mo_version"));
              }}
            />
          ) : (
              ""
            )}
          {utils.getTeamInfoWithMoney("剩余天数", user) >= 0 &&
            utils.getTeamInfoWithMoney("是否超限", user)[0] ? (
              <Alert
                title="使用人数超限"
                msg={utils.getTeamInfoWithMoney("人数超限提示", user)}
                okButTxt={"续费升级"}
                butIsOne={true}
                okCallBack={() => {
                  Router.push(Dingtalk.setDdNavColor("/mo_version"));
                }}
              />
            ) : (
              ""
            )}
          {utils.getTeamInfoWithMoney("剩余天数", user) < 0 &&
            (utils.getTeamInfoWithMoney("版本名称", user) === "试用版" || utils.getTeamInfoWithMoney("版本名称", user) === "正式版试用") &&
            !utils.getTeamInfoWithMoney("是否钉钉订单", user) ? (
              <Alert
                title="蚂蚁分工"
                msg={utils.getTeamInfoWithMoney("已到期提示", user)}
                okButTxt={"使用免费版 >"}
                calButTxt={"升级版本"}
                butIsOne={false}
                okCallBack={() => {
                  Router.push(Dingtalk.setDdNavColor("/mo_free"));
                }}
                calCallBack={() => {
                  Router.push(Dingtalk.setDdNavColor("/mo_version"));
                }}
              />
            ) : (
              ""
            )}
          {utils.getTeamInfoWithMoney("剩余天数", user) < 0 &&
            (utils.getTeamInfoWithMoney("版本名称", user) === "试用版" || utils.getTeamInfoWithMoney("版本名称", user) === "正式版试用") &&
            utils.getTeamInfoWithMoney("是否钉钉订单", user) ? (
              <Alert
                title="蚂蚁分工"
                msg={utils.getTeamInfoWithMoney("已到期提示", user)}
                okButTxt={"续费升级"}
                butIsOne={true}
                okCallBack={() => {
                  Router.push(Dingtalk.setDdNavColor("/mo_version"));
                }}
              />
            ) : (
              ""
            )}

          {utils.getTeamInfoWithMoney("剩余天数", user) < 0 &&
            (utils.getTeamInfoWithMoney("版本名称", user) !== "试用版" || utils.getTeamInfoWithMoney("版本名称", user) !== "正式版试用")
            ? (
              <Alert
                className="endV"
                title={utils.getTeamInfoWithMoney("版本名称", user) === "正式版试用" ? '试用版' : utils.getTeamInfoWithMoney("版本名称", user) + "已到期"}
                msg={utils.getTeamInfoWithMoney("已到期提示", user)}
                okButTxt={"续费升级"}
                butIsOne={true}
                okCallBack={() => {
                  Router.push(Dingtalk.setDdNavColor("/mo_version"));
                }}
              />
            ) : (
              ""
            )}
          <div className="dingHomeTopSection">
            <div className="dingHome-main1">
              <div className="dingHomeBg">
                <div className="trapleft" />
                <div className="trapright" />
              </div>
              <div className="dingsection1">
                <div className="dingHome-number-title">我的待办</div>
                <div className="dingHome-number">
                  <div
                    className="dingHome-number-box"
                    onClick={() => {
                      this.urlGo(1);
                    }}
                  >
                    <div className="dingHome-number-bottom textMore">{one}</div>
                    <div className="dingHome-number-top"> 待完成</div>
                  </div>
                  <div
                    className="dingHome-number-box"
                    onClick={() => {
                      this.urlGo(2);
                    }}
                  >
                    <div className="dingHome-number-bottom daiqueren textMore">
                      {two}
                    </div>
                    <div className="dingHome-number-top"> 待确认</div>
                  </div>
                  <div
                    className="dingHome-number-box"
                    onClick={() => {
                      this.urlGo(3);
                    }}
                  >
                    <div className="dingHome-number-bottom daizhipai textMore">
                      {three}
                    </div>
                    <div className="dingHome-number-top"> 待指派</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="homechart">
              <div className="chartTitle">
                <div className="chartTitleLeft">最近完成</div>
              </div>
              <div className="chartChartCavans" id="homePageBar">
                {showChart1 && <div className="chartNull">暂无数据</div>}
              </div>
            </div>
            <div className="homechart" style={{ marginBottom: "0px" }}>
              <div className="chartTitle">
                <div className="chartTitleLeft">绩效增长</div>
                <div className="chartTitleRight">
                  <div className="dinghome-tabs">
                    <span
                      className={
                        barType == 0
                          ? "dinghome-tabs-item left active"
                          : "dinghome-tabs-item left"
                      }
                      onClick={() => {
                        this.changeType(0);
                      }}
                    >
                      周
                    </span>
                    <span
                      className={
                        barType == 1
                          ? "dinghome-tabs-item right active"
                          : "dinghome-tabs-item right"
                      }
                      onClick={() => {
                        this.changeType(1);
                      }}
                    >
                      月
                    </span>
                  </div>
                </div>
              </div>
              <div className="chartChartCavans" id="homePageLine">
                {showChart2 && <div className="chartNull">暂无数据</div>}
              </div>
            </div>
          </div>
          <div className="menuBox">
            <MenuBar pathName={Dingtalk.setDdNavColor("/mo_dingHome")} isreload={isreload} />
          </div>
        </div>
      </Layout>
    );
  }
}
function mapStateToProps(state) {
  return {
    homeData: state.task.homeData,
    homeNumber: state.home.homeNumber,
    homeLine: state.home.homeLine,
    homeBar: state.home.homeBar,
    messageListByUser: state.user.messageListByUser,
    urlData: state.user.urlData,
    homeScrollTop: state.cache.homeScrollTop
  };
}
const mapDispatchToProps = dispatch => {
  return {
    getMessageByUser: bindActionCreators(userAction.getMessageByUser, dispatch),
    setMessageCount: bindActionCreators(userAction.setMessageCount, dispatch),
    getDingMessageDetails: bindActionCreators(
      taskAction.getDingMessageDetails,
      dispatch
    ),
    setUrlData: bindActionCreators(userAction.setUrlData, dispatch),
    saveHomeScrollTop: bindActionCreators(
      cacheAction.saveHomeScrollTop,
      dispatch
    )
  };
};
export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(
  dingHome
);
