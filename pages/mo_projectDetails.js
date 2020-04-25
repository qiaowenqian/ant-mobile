import React, { Component } from "react";
import { Tabs, Icon, Toast } from "antd-mobile";
import withRedux from "next-redux-wrapper";
import Router from "next/router";
import { bindActionCreators } from "redux";
import mobileStyle from "antd-mobile/dist/antd-mobile.min.css";

import { initStore } from "../store";
import Layout from "../components/Layout";
import Dingtalk from "../utils/dingtalk";
import utils from "../utils/utils";
import MenuBar from "../components/MenuBar";
import stylesheet from "styles/pages/projectDetails.scss";
import ProjectTask from "../components/projectTask";
import ProjectFile from "../components/projectFile";
import ProjectChart from "../components/ProjectChart";
import Alert from "../components/alert";
import Storage from "../utils/storage";

import * as userAction from "../actions/user";

/*
 * （必填）projectId:''          // 项目ID，在url里面拼接
 * （必填）projectName:''        // 项目名字，在url里面拼接
 * （选填）parentId:''           // 任务列表的父级ID，在url里面拼接
 * （选填）page:0                // 默认打开的组件页 0任务 1文件 2统计
 * （必填）jurisdiction          // 是否有权限
 */

class projectDetails extends Component {
  static getInitialProps({ req }) {
    const language = req ? req.headers["accept-language"] : navigator.language;
    return {
      language
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      switchPage: 0,
      alertShow: false
    };
  }

  componentDidMount() {
    Dingtalk.setTitle(this.props.url.query.projectName);
    Dingtalk.setMenuHome();
    utils.butAnimate();
    if (!this.props.urlData) {
      this.props.setUrlData(encodeURIComponent(location.href.split("#")[0]));
    }
  }

  componentWillReceiveProps(nextProps) { }

  componentDidUpdate() {
    utils.butAnimate();
  }

  componentWillUnmount() {
    Dingtalk.closePage();
  }

  switchChange(key) {
    const { projectId, jurisdiction } = this.props.url.query;
    const user = Storage.getSession("user");
    if (key === 1 || key === 2) {
      if (utils.getTeamInfoWithMoney("是否可用", user)) {
        this.setState({ switchPage: key });
      } else {
        this.setState({ alertShow: true });
      }
    } else {
      this.setState({ switchPage: key });
      Router.push(
        Dingtalk.setDdNavColor(
          "/mo_projectDetails?projectId=" +
          projectId +
          "&parentId=" +
          "&jurisdiction=" +
          jurisdiction
        )
      );
    }
  }

  render() {
    const { language } = this.props;
    let {
      projectId,
      parentId,
      page,
      projectName,
      jurisdiction
    } = this.props.url.query;

    let { switchPage, alertShow } = this.state;
    if (!parentId) {
      parentId = "";
    }
    if (page || page == 0) {
      switchPage = parseInt(page);
    }
    const tabs = [{ title: "任务" }, { title: "文件" }, { title: "统计" }];

    return (
      <Layout language={language}>
        <div className="pubLayout">
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
          {alertShow && (
            <Alert
              title="专业版功能"
              msg="图表化项目管理、批量便捷操作、多维度数据统计、WBS文件系统等都为蚂蚁分工专业版功能，同时还有更多高级功能将陆续开放。"
              okButTxt="升级专业版"
              butIsOne={true}
              closeIconShow={true}
              okCallBack={() => {
                Router.push("/mo_version");
              }}
              // calCallBack={() => { this.setState({ alertShow: false }) }}
              closeIconClickCallBack={() => {
                this.setState({
                  alertShow: false
                });
              }}
            />
          )}
          <Icon
            className="setIcon aniButGray"
            type="anticon-shezhi"
            onClick={() => {
              Router.push(
                "/mo_projectCreate?projectId=" +
                projectId +
                "&jurisdiction=" +
                jurisdiction
              );
            }}
          />
          <div className="content projectDetails">
            <div
              className="createTask"
              onClick={() => {
                debugger;
                if (!this.props.taskList.data.createPermission) {
                  Toast.fail(`您在该项目中没有创建任务的权限`);
                  return false;
                }

                Router.push(
                  Dingtalk.setDdNavColor(
                    "/mo_taskCreate?selectedProId=" +
                    projectId +
                    "&selectedProName=" +
                    projectName
                  )
                );
              }}
            >
              <Icon type="anticon-add" />
            </div>

            <Tabs
              tabs={tabs}
              page={switchPage}
              animated={false}
              useOnPan={false}
              onTabClick={(e, key) => {
                this.switchChange(key);
              }}
            >
              <div style={{ height: "auto" }}>
                {switchPage === 0 ? (
                  <ProjectTask
                    projectId={projectId}
                    parentId={parentId}
                    projectName={projectName}
                  />
                ) : (
                    ""
                  )}
              </div>
              <div>
                {switchPage === 1 ? (
                  <ProjectFile projectId={projectId} parentId={parentId} />
                ) : (
                    ""
                  )}
              </div>
              <div>
                {switchPage === 2 ? <ProjectChart projectId={projectId} /> : ""}
              </div>
            </Tabs>
          </div>
          <div className="menuBox">
            <MenuBar pathName="/mo_project" />
          </div>
        </div>
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  return {
    urlData: state.user.urlData,
    taskList: state.task.taskProjectList //项目详情
  };
}
const mapDispatchToProps = dispatch => {
  return {
    setUrlData: bindActionCreators(userAction.setUrlData, dispatch)
  };
};
export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(
  projectDetails
);
