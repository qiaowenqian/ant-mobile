import { Component, PureComponent } from "react";
import { bindActionCreators } from "redux";
import withRedux from "next-redux-wrapper";
import Link from "next/link";
import Router from "next/router";
import { Icon, Toast } from "antd-mobile";

import { initStore } from "../store";
import stylesheet from "styles/pages/dingHome.scss";
import Layout from "../components/Layout";
import Alert from "../components/alert";
import Loading from "../components/Loading";
import MenuBar from "../components/MenuBar";
import * as taskAction from "../actions/task";
import * as userAction from "../actions/user";
import Dingtalk from "../utils/dingtalk";
import utils from "../utils/utils";
import Storage from "../utils/storage";
import { getTaskDetailsByIds } from "../actions/task";

/**
 * 首页
 */

class dingHome extends PureComponent {
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

      end15DaysShow: false,
      user: {},
      checked: false
    };
  }

  componentWillMount() {
    // 获取顶部数据
    this.props.findHomeDataByPageSize(6, () => {
      this.setState({ homeDataLoading: true });
    });
  }

  componentDidMount() {
    Dingtalk.setTitle("首页");
    Dingtalk.setMenuHome();
    const user = Storage.getSession("user");
    this.setState({ user: user });
    const end15DaysShowDate = Storage.getLocal("end15DaysShowDate");
    if (
      utils.getTeamInfoWithMoney("剩余天数", user) < 15 &&
      utils.dateToString(new Date()) !== end15DaysShowDate &&
      (utils.getTeamInfoWithMoney("剩余天数", user) > 0 ||
        utils.getTeamInfoWithMoney("剩余天数", user) === 0)
    ) {
      this.setState({ end15DaysShow: true });
    }

    // 获取通知数据
    this.getMessageList(this.state.msgNowPage);

    utils.butAnimate();
    if (!this.props.urlData) {
      this.props.setUrlData(encodeURIComponent(location.href.split("#")[0]));
    }
  }

  componentWillUnmount() {
    // 关闭页面
    Dingtalk.closePage();
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.homeDataLoading && nextProps.homeData) {
      if (nextProps.homeData.success) {
        let data = nextProps.homeData.data;
        this.setState({
          one: data.db.dwc,
          two: data.db.dqr,
          three: data.db.dzp,
          objTalklist: data.dt
        });
      } else {
        Toast.fail(nextProps.homeData.errmsg);
      }
      this.setState({ homeDataLoading: false });
    } else if (
      (this.state.messageMoreLoading || this.state.messageLoading) &&
      nextProps.messageListByUser
    ) {
      if (nextProps.messageListByUser.success) {
        // 更新页数 和 总量等数据
        let { msgLastPage, msgNowPage, messageCount } = this.state;
        msgLastPage = nextProps.messageListByUser.data.last;
        msgNowPage = nextProps.messageListByUser.data.page;
        messageCount = nextProps.messageListByUser.data.messageCount;
        this.setState({ msgLastPage: msgLastPage, msgNowPage: msgNowPage });
        if (msgNowPage == 1) {
          this.setState({
            messageList: nextProps.messageListByUser.data.list,
            messageCount: messageCount
          });
        } else {
          let data = nextProps.messageListByUser.data.list;
          let { messageList } = this.state;
          data.map((item, i) => {
            messageList.push(item);
          });
          this.setState({ messageList: messageList });
        }
      } else {
      }
      this.setState({ messageMoreLoading: false, messageLoading: false });
    }
  }

  componentDidUpdate() {
    utils.butAnimate();
  }

  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }

  getMessageList(pageNo) {
    if (pageNo == 1) {
      this.setState({ messageLoading: true });
    } else {
      this.setState({ messageMoreLoading: true });
    }
    this.props.getMessageByUser(pageNo);
  }
  urlGo(type, id, msgId, subject) {
    getTaskDetailsByIds(id, list => {
      if (list.errmsg === "该任务已被删除") {
        Toast.info(list.errmsg);
      } else if (subject.indexOf("批量修改") != -1) {
      } else {
        this.props.getDingMessageDetails(msgId);
        if (type == "c" || type == "f") {
          Router.push(Dingtalk.setDdNavColor("/mo_taskDetails?id=" + id));
        } else {
          Router.push(
            Dingtalk.setDdNavColor("/mo_projectDetails?projectId=" + id)
          );
        }
      }
    });
  }

  listScroll(e) {
    let scrollTop = Math.ceil(Math.round(e.target.scrollTop));
    let clientHeight = Math.ceil(Math.round(e.target.clientHeight));
    let scrollHeight = Math.ceil(Math.round(e.target.scrollHeight));
    let { msgNowPage, msgLastPage } = this.state;
    if (
      msgNowPage < msgLastPage &&
      (scrollTop + clientHeight == scrollHeight ||
        scrollTop + clientHeight == scrollHeight - 1 ||
        scrollTop + clientHeight == scrollHeight + 1)
    ) {
      this.getMessageList(msgNowPage + 1);
    }
  }

  SelectMyNotice = param => {
    this.setState({ checked: !param });
  };

  ShowTime = time => {
    if (!time) return;
    let result = "";
    time = time.substring(0, 19);
    time = time.replace(/-/g, "/");
    time = new Date(time);
    const now = new Date();
    const nowYear = now.getFullYear(); //得到年份
    const timeYear = time.getFullYear(); //得到年份
    var timeMonth = time.getMonth(); //得到月份
    var timeDate = time.getDate(); //得到日期
    var timeHour = time.getHours(); //得到小时
    var timeMinu = time.getMinutes(); //得到分钟
    const nowDate = now.getDate();
    const yesterday = now.setDate(now.getDate() - 1);
    const yesterdayDate = now.getDate();
    if (nowDate == timeDate) {
      result += `今天 ${timeHour}-${timeMinu}`;
    } else if (yesterdayDate == timeDate) {
      result += `昨天 ${timeHour}:${timeMinu}`;
    } else if (nowYear == timeYear) {
      result += `${timeMonth}-${timeDate} ${timeHour}:${timeMinu}`;
    } else {
      result += `${timeYear}-${timeMonth}-${timeDate} ${timeHour}:${timeMinu}`;
    }
    return result;
  };

  formatDescription = description => {
    if (!description) return;
    description = JSON.parse(description);
    return description["修改内容"] || description["讨论内容"];
  };

  render() {
    const {
      one,
      two,
      three,
      messageList,
      messageCount,
      messageLoading,
      messageMoreLoading,
      msgLastPage,
      msgNowPage,
      user,
      end15DaysShow,
      checked
    } = this.state;
    const { language } = this.props;
    return (
      <Layout language={language}>
        <div className="pubLayout dingHome">
          <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
          {end15DaysShow ? (
            <Alert
              className="endV"
              title={utils.getTeamInfoWithMoney("版本名称", user) + "即将到期"}
              msg={utils.getTeamInfoWithMoney("即将到期提示", user)}
              okButTxt={"续费升级"}
              butIsOne={true}
              closeIconShow={true}
              closeIconClickCallBack={() => {
                this.setState({ end15DaysShow: false });
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
          utils.getTeamInfoWithMoney("版本名称", user) === "试用版" &&
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
          utils.getTeamInfoWithMoney("版本名称", user) === "试用版" &&
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
          utils.getTeamInfoWithMoney("版本名称", user) !== "试用版" ? (
            <Alert
              className="endV"
              title={utils.getTeamInfoWithMoney("版本名称", user) + "已到期"}
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
          <div
            className="content dingHome-box"
            style={end15DaysShow ? { top: "40px" } : {}}
          >
            <div className="dingHome-top">
              <div className="wait">
                <div>
                  我的待办
                  {/* <p>
                    共<span>{one + two + three}</span>项
                  </p> */}
                </div>
              </div>
              <div className="wait-pm">
                <p>
                  待指派
                  <Link
                    href={Dingtalk.setDdNavColor(
                      `/mo_task?menuType=my_add&panelId=3`
                    )}
                  >
                    <span className="span-one">{three}</span>
                  </Link>
                </p>
                <p>
                  待完成
                  <Link
                    href={Dingtalk.setDdNavColor(
                      `/mo_task?menuType=sub1&panelId=0`
                    )}
                  >
                    <span className="span-two">{one}</span>
                  </Link>
                </p>
                <p className="wait-pm-center">
                  待确认
                  <Link
                    href={Dingtalk.setDdNavColor(
                      `/mo_task?menuType=my_succeed&panelId=2`
                    )}
                  >
                    <span className="span-three">{two}</span>
                  </Link>
                </p>

                <p className="wait-pm-last">
                  已逾期
                  <Link
                    href={Dingtalk.setDdNavColor(
                      `/mo_task?menuType=my_add&panelId=3`
                    )}
                  >
                    <span className="span">{three}</span>
                  </Link>
                </p>
              </div>
            </div>
            <div className="dingHome-bottom">
              <div className="bottom-title">
                <p>我的通知</p>
                {/*<Link href={Dingtalk.setDdNavColor(`/mo_dynamic`)}>
		    						<font>更多</font> 
		    					</Link>*/}
                {/* <font>
                  未读<span>{messageCount}</span>条
                </font> */}
                {/* <Icon
                  type="anticon-shuaxin"
                  onClick={() => {
                    this.getMessageList(1);
                  }}
                /> */}
                <div
                  className="notice"
                  onClick={() => {
                    Router.push("/mo_dynamic");
                  }}
                >
                  {/* <Icon
                    type={
                      checked
                        ? "anticon-fuxuankuang_xuanzhong"
                        : "anticon-fuxuankuang_weixuanzhong"
                    }
                  /> */}
                  <label>团队动态</label>
                  <Icon type="anticon-more" />
                </div>
              </div>
              <div className="talkbox" onScroll={e => this.listScroll(e)}>
                <Loading show={messageLoading} />
                {messageList.length > 0 ? (
                  messageList.map((item, i) => {
                    let str = item.description;
                    let obj = eval("(" + str + ")");
                    let objName = "";
                    let pageUrl = "";
                    if (item.type == "c") {
                      objName = obj["任务名称"];
                      pageUrl = "/mo_taskDetails";
                    } else {
                      objName = obj["项目名称"];
                      pageUrl = "/mo_projectDetails";
                    }
                    return (
                      <div
                        className={
                          item.read == "0"
                            ? "talklist white aniBut"
                            : "talklist white aniBut read"
                        }
                        key={item.id}
                        onClick={() => {
                          this.urlGo(
                            item.type,
                            item.taskinfoId,
                            item.id,
                            item.subject
                          );
                        }}
                      >
                        <div className="icon">
                          {item.createBy.nickname
                            ? item.createBy.nickname.charAt(0)
                            : ""}
                        </div>
                        <div className="tasklist">
                          <div className="dd">
                            {this.ShowTime(item.updateDate)}
                          </div>
                          <p className="tasklist-first subject textMore">
                            <span>{item.subject}</span>
                          </p>
                          <p className="textMore name">{objName}</p>
                          <p className="tasklist-first textMore description">
                            <span>
                              {this.formatDescription(item.description)}
                            </span>
                          </p>
                          {/* <p className="textMore">{item.updateDate}</p> */}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="pp">暂无通知</div>
                )}
                {messageList.length > 0 ? (
                  <div className="p">
                    <Loading
                      show={messageMoreLoading}
                      classStr="loading_minSize"
                    />
                    {msgLastPage > msgNowPage ? "下拉加载更多" : "已经到底喽"}
                  </div>
                ) : (
                  ""
                )}
                <div style={{ clear: "both" }} />
              </div>
            </div>
          </div>
          <div className="menuBox">
            <MenuBar pathName={Dingtalk.setDdNavColor("/mo_dingHome")} />
          </div>
        </div>
      </Layout>
    );
  }
}
function mapStateToProps(state) {
  return {
    homeData: state.task.homeData,
    messageListByUser: state.user.messageListByUser,
    urlData: state.user.urlData
  };
}
const mapDispatchToProps = dispatch => {
  return {
    findHomeDataByPageSize: bindActionCreators(
      taskAction.findHomeDataByPageSize,
      dispatch
    ),
    getMessageByUser: bindActionCreators(userAction.getMessageByUser, dispatch),
    getDingMessageDetails: bindActionCreators(
      taskAction.getDingMessageDetails,
      dispatch
    ),
    setUrlData: bindActionCreators(userAction.setUrlData, dispatch)
  };
};
export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(
  dingHome
);
