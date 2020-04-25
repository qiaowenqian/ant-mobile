import React, { Component } from "react";
import { Icon, Toast } from "antd-mobile";
import Router from "next/router";
import { initStore } from "../store";
import withRedux from "next-redux-wrapper";
import Alert from "../components/alert";
import * as versionAction from "../actions/version";
import { getLimtTask, getLimtProject, getTimeList } from "../actions/version";
import { bindActionCreators } from "redux";
import Storage from "../utils/storage";
import * as userAction from "../actions/user";

import stylesheet from "styles/components/menuBar.scss";
import utils from "../utils/utils";
import Dingtalk from "../utils/dingtalk";
// import user from '../reducers/user';
/*
 *  ( 必填 ) pathName: 路径名称
 */
class menuBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pathName: "",
      addShow: false, // 添加层是否显示
      taskFree: "",
      projectFree: false,
      taskLimit: "",
      projectMax: 0,
      proAlertShow: false,
      tasAlertShow: false,
      statisticAlertShow: false,
      taskMax: "",
      user: {},
      projectMax: ""
    };
  }

  componentWillMount() {
    this.setState({ pathName: this.props.pathName });
  }

  componentDidMount() {
    utils.butAnimate();
    const user = Storage.getSession("user");
    this.setState({ user: user });
    // console.log(nowUser,3495278589402)
    // if (!this.props.urlData) {
    // 	this.props.setUrlData(
    // 		encodeURIComponent(location.href.split("#")[0])
    // 	);
    // }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ pathName: nextProps.pathName });
    if (nextProps.isreload) {
      this.setState({ user: Storage.getSession("user") });
    }
    if (Router.query.addShow == "true") {
      this.setState({ addShow: true });
    } else if (
      Router.query.addShow == undefined ||
      Router.query.addShow == "false"
    ) {
      this.setState({ addShow: false });
    }
  }
  componentDidUpdate() {
    utils.butAnimate();
  }
  componentWillUnmount() {
    this.setState({ addShow: false });
  }

  routerPush(url) {
    Router.push(Dingtalk.setDdNavColor(url));
  }

  addShow() {
    this.setState({ addShow: true });
  }

  // 创建任务
  taskCreateShow() {
    const { taskFree, user } = this.state;
    if (utils.getTeamInfoWithMoney("版本名称", user) === "免费版") {
      getLimtTask(data => {
        this.setState({
          taskFree: data.data.success,
          taskMax: data.data.projectMax
        });
        if (!data.data.success) {
          this.setState({ tasAlertShow: true });
        }
        if (data.data.success) {
          const pathName = Router.router.pathname;
          if (pathName.indexOf("/mo_projectDetails") !== -1) {
            const openProject = this.props.openProject;
            this.routerPush(
              "/mo_taskCreate?newTask=true&selectedProId=" +
              openProject.id +
              "&selectedProName=" +
              openProject.name
            );
          } else {
            this.routerPush("/mo_taskCreate?newTask=true");
          }
        }
      });
    } else {
      const pathName = Router.router.pathname;
      if (pathName.indexOf("/mo_projectDetails") !== -1) {
        const openProject = this.props.openProject;
        this.routerPush(
          "/mo_taskCreate?newTask=true&selectedProId=" +
          openProject.id +
          "&selectedProName=" +
          openProject.name
        );
      } else {
        this.routerPush("/mo_taskCreate?newTask=true");
      }
    }
  }
  //创建项目
  projectCreate() {
    const { projectFree, user } = this.state;
    if (utils.getTeamInfoWithMoney("版本名称", user) === "免费版") {
      getLimtProject(data => {
        this.setState({
          projectMax: data.data.projectMax,
          projectFree: data.data.success
        });
        if (!data.data.success) {
          this.setState({ proAlertShow: true });
        }
        if (data.data.success) {
          this.routerPush("/mo_projectCreate");
        }
      });
    } else {
      this.routerPush("/mo_projectCreate");
    }
  }

  redirect = url => {
    const { user } = this.state;
    if (url == "/mo_statistics") {
      if (utils.getTeamInfoWithMoney("是否可用", user)) {

        // getTimeList(data => {
        //   if (data.data && data.data.tiem.isAdmin === "1") {
        //     this.routerPush(url);
        //   } else {
        //     utils.getTeamInfoWithMoney("版本名称", user) === "试用版" || utils.getTeamInfoWithMoney("版本名称", user) === "正式版试用"
        //       ? this.routerPush(url)
        //       : Toast.info("跨项目统计功能仅团队管理员可用", 1);
        //   }
        // });
        if (user && user.isAdmin) {
          this.routerPush(url);
        } else {
          utils.getTeamInfoWithMoney("版本名称", user) === "试用版" || utils.getTeamInfoWithMoney("版本名称", user) === "正式版试用"
            ? this.routerPush(url)
            : Toast.info("跨项目统计功能仅团队管理员可用", 1);
        }
      } else {
        this.setState({
          statisticAlertShow: true
        });
      }
    } else {
      this.routerPush(url);
    }
  };

  render() {
    const {
      pathName,
      addShow,
      user,
      proAlertShow,
      tasAlertShow,
      projectMax,
      taskMax,
      statisticAlertShow
    } = this.state;
    // console.log(pathName, "pathNamepathName");

    const tasMax = ` <div class='textLimit'>您正在使用的是<b> 蚂蚁分工免费版</b>，免费版每月可创建<b> 200 </b>条任务，本月任务用量已达版本上限。</div>
							<div class='textLimit'>如您的团队项目和任务数量较多，可升级为经济实惠的<b> 蚂蚁分工基础版</b>，基础版不限使用人数、不限项目数量、不限任务数量。</div>
							<div class='textLimit1'>我们更建议您升级到功能强大的<b> 蚂蚁分工专业版</b>，专业版具有批量任务操作、甘特图、多维度数据统计图表等专业功能，助您提高协同工作效率、提升项目管理水平。</div>`;
    return (
      <div className="menuBar">
        <style
          dangerouslySetInnerHTML={{
            __html: stylesheet
          }}
        />
        <div
          className={
            pathName.indexOf("/mo_dingHome") !== -1
              ? "but act aniBut"
              : "but aniBut"
          }
          onClick={() => this.redirect("/mo_dingHome")}
        >
          <Icon
            type={
              pathName.indexOf("/mo_dingHome") !== -1
                ? "anticon-home-selected"
                : "anticon-home"
            }
          />
          <span>首页</span>
        </div>
        <div
          className={pathName == "/mo_task" ? "but act aniBut" : "but aniBut"}
          onClick={() => this.redirect("/mo_task")}
        >
          <Icon
            type={
              pathName == "/mo_task" ? "anticon-task-seleted" : "anticon-task"
            }
          />
          <span>任务</span>
        </div>
        {/* <div className="but cen">
          <div className="cenBut blue aniBut" onClick={() => this.addShow()}>
            <Icon type="plus" />
          </div>
        </div> */}
        <div
          className={
            pathName == "/mo_project" ? "but act aniBut" : "but aniBut"
          }
          onClick={() => this.redirect("/mo_project")}
        >
          <Icon
            type={
              pathName == "/mo_project"
                ? "anticon-project-selected"
                : "anticon-project"
            }
          />
          <span>项目</span>
        </div>
        {/* <div
          className={
            pathName == "/mo_dynamic" ? "but act aniBut" : "but aniBut"
          }
          onClick={() => this.routerPush("/mo_dynamic")}
        >
          <Icon type="anticon-xiaoshoudongtai" />
          <span>统计</span>
        </div> */}
        <div
          className={
            pathName == "/mo_statistics" ? "but act aniBut" : "but aniBut"
          }
          onClick={() => this.redirect("/mo_statistics")}
        >
          <Icon
            type={
              pathName == "/mo_statistics"
                ? "anticon-stats-selected"
                : "anticon-stats"
            }
          />
          <span>统计</span>
        </div>
        <div
          className={
            pathName == "/mo_dynamic" ? "but act aniBut" : "but aniBut"
          }
          onClick={() => this.routerPush("/mo_dynamic")}
        >
          <Icon
            type={
              pathName == "/mo_dynamic"
                ? "anticon-activitys-copy"
                : "anticon-activity"
            }
          />
          <span>动态</span>
        </div>
        {/* <div
          className={pathName == "/mo_center" ? "but act aniBut" : "but aniBut"}
          onClick={() => this.redirect("/mo_center")}
        >
          <Icon
            type={
              pathName == "/mo_center" ? "anticon-me-selected" : "anticon-me"
            }
          />
          <span>我的</span>
        </div> */}

        {/*添加层*/}
        {addShow ? (
          <div className="addBox">
            <ul className="list">
              <li
                onClick={() => {
                  this.taskCreateShow();
                }}
                className="iconBlue_txtGray aniBut"
              >
                <Icon type="anticon-jinrirenwu" />
                <span>创建任务</span>
              </li>
              <li
                className="iconBlue_txtGray aniBut"
                onClick={() => {
                  this.projectCreate();
                }}
              >
                <Icon type="anticon-xiangmuguangliwq" />
                <span>创建项目</span>
              </li>
            </ul>
            <div
              className="cancel aniButBlue"
              onClick={() => {
                this.setState({
                  addShow: false
                });
              }}
            >
              取消
            </div>
          </div>
        ) : (
            ""
          )}
        {utils.getTeamInfoWithMoney("版本名称", user) === "免费版" &&
          tasAlertShow ? (
            <Alert
              title="用量限制"
              msg={tasMax}
              butIsOne="false"
              okButTxt="升级版本"
              closeIconShow={true}
              closeIconClickCallBack={() => {
                this.setState({
                  tasAlertShow: false
                });
              }}
              okCallBack={() => {
                this.setState({
                  tasAlertShow: false
                }),
                  Router.push(Dingtalk.setDdNavColor("/mo_version"));
              }}
            />
          ) : (
            ""
          )}
        {statisticAlertShow && (
          <Alert
            title="专业版功能"
            msg="图表化项目管理、批量便捷操作、多维度数据统计、WBS文件系统等都为蚂蚁分工专业版功能，同时还有更多高级功能将陆续开放。"
            okButTxt="升级专业版"
            butIsOne={true}
            closeIconShow={true}
            okCallBack={() => {
              this.setState({
                statisticAlertShow: false
              }),
                Router.push(Dingtalk.setDdNavColor("/mo_version"));
            }}
            calCallBack={() => { }}
            closeIconClickCallBack={() => {
              this.setState({
                statisticAlertShow: false
              });
            }}
          />
        )}
        {utils.getTeamInfoWithMoney("版本名称", user) === "免费版" &&
          proAlertShow ? (
            <Alert
              style={{ textAlign: "center" }}
              title="用量限制"
              msg={tasMax}
              okButTxt="继续创建项目>"
              calButTxt="升级版本"
              closeIconShow={true}
              okCallBack={() => {
                this.routerPush("/mo_projectCreate");
              }}
              calCallBack={() => {
                this.setState({
                  tasAlertShow: false
                }),
                  Router.push(Dingtalk.setDdNavColor("/mo_version"));
              }}
              closeIconClickCallBack={() => {
                this.setState({
                  proAlertShow: false
                });
              }}
            />
          ) : (
            ""
          )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    openProject: state.project.openProject,
    urlData: state.user.urlData
  };
}
const mapDispatchToProps = dispatch => {
  return {
    setUrlData: bindActionCreators(userAction.setUrlData, dispatch),
    getLimtTask: bindActionCreators(versionAction.getLimtTask, dispatch)
  };
};
export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(
  menuBar
);
