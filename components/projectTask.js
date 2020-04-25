import React, { Component } from "react";
import { bindActionCreators } from "redux";
import withRedux from "next-redux-wrapper";
import { Icon, Toast } from "antd-mobile";
import Router from "next/router";

import { initStore } from "../store";
import * as taskAction from "../actions/task";
import * as cacheAction from "../actions/cache";
import utils from "../utils/utils";
import stylesheet from "styles/components/projectTask.scss";
import Loading from "../components/Loading";
import Friendly from "../components/Friendly";
import Dingtalk from "../utils/dingtalk";
import { ListView } from "antd-mobile";
/*
 * （必填）projectId:''            // 项目ID
 * （必填）projectName:''          // 项目name
 * （选填）parentId:''             // 父级ID
 */

class projectTask extends Component {
  static getInitialProps({ req }) {
    const language = req ? req.headers["accept-language"] : navigator.language;
    return {
      language
    };
  }

  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    });
    this.state = {
      projectId: "",
      parentId: "",

      taskList: [],
      taskListParent: [],
      taskListLoading: false,
      taskListMoreLoading: false,
      taskListAllPage: 0,
      taskListNowPage: 1,
      dataSource,
      nullData: {
        alertTxt: "没有任务哦，赶快去创建一个吧",
        Icon: "anticon-wushuju",
        ButTxt: "创建任务"
        // ButUrl: ""
      },
      asPath: "",
      pageLoading: true,
      isLoading: false
    };
  }

  componentDidMount() {
    const asPath = Router.router.asPath;
    const { dataSource } = this.state;
    this.setState({
      projectId: this.props.projectId,
      parentId: this.props.parentId,
      asPath: asPath
    });
    let { nullData } = this.state;
    nullData.ButUrl =
      "/mo_taskCreate?newTask=true&selectedProId=" +
      this.props.projectId +
      "&selectedProName=" +
      this.props.projectName;
    this.setState({ nullData: nullData });
    console.log(this.props);
    if (this.props.projectTaskList && this.props.projectTaskList.length > 0) {
      this.setState(
        {
          taskList: this.props.projectTaskList,
          taskListAllPage: this.props.projectTaskAllCount,
          pageLoading: false,
          taskListParent: this.props.taskList.data.parentList
        },
        () => {
          this.rData = this.genData();
          this.setState({
            dataSource: dataSource.cloneWithRows(this.rData)
          });
        }
      );
    } else {
      this.getTaskList(1, this.props.projectId, this.props.parentId);
    }

    if (this.props.projectTaskScroll > 0) {
      setTimeout(() => {
        this.refs.proTask.scrollTop = this.props.projectTaskScroll;
      });
    }
    utils.butAnimate();
  }
  genData() {
    const { taskList } = this.state;
    const dataArr = [];
    for (let i = 0; i < taskList.length; i++) {
      dataArr.push(`row - ${taskList[i].id}`);
    }
    return dataArr;
  }
  componentWillReceiveProps(nextProps) {
    const { asPath, dataSource } = this.state;
    const newPath = Router.router.asPath;
    console.log(asPath, "asPath");
    console.log(newPath, "newPath");
    if (asPath != newPath) {
      console.log(nextProps);
    }
    console.log(nextProps);
    if (
      nextProps.projectId !== this.props.projectId &&
      nextProps.parentId !== this.props.parentId
    ) {
      this.setState({
        projectId: nextProps.projectId,
        parentId: nextProps.parentId
      });
      this.getTaskList(1, nextProps.projectId, nextProps.parentId);
    } else if (nextProps.projectId !== this.props.projectId) {
      this.setState({ projectId: nextProps.projectId });
      this.getTaskList(1, nextProps.projectId);
    } else if (nextProps.parentId !== this.props.parentId) {
      this.setState({ parentId: nextProps.parentId });
      this.getTaskList(1, "", nextProps.parentId);
    }
    if (
      nextProps.taskList &&
      (this.state.taskListLoading || this.state.taskListMoreLoading)
    ) {
      if (!nextProps.taskList.success) {
        return false;
      }
      if (nextProps.taskList.data.taskPage.pageNo === 1) {
        if (nextProps.taskList.data.taskPage.list) {
          this.setState(
            {
              taskList: nextProps.taskList.data.taskPage.list,
              pageLoading: false
            },
            () => {
              this.rData = this.genData();
              this.setState({
                dataSource: dataSource.cloneWithRows(this.rData)
              });
            }
          );
        } else {
          this.setState({ taskList: [] }, () => {
            this.rData = this.genData();
            this.setState({
              dataSource: dataSource.cloneWithRows(this.rData)
            });
          });
        }
      } else {
        if (nextProps.taskList.data.taskPage.list) {
          let taskList = JSON.parse(JSON.stringify(this.state.taskList));
          nextProps.taskList.data.taskPage.list.map(item => {
            taskList.push(item);
          });
          this.setState({ taskList: taskList }, () => {
            this.rData = this.genData();
            this.setState({
              dataSource: dataSource.cloneWithRows(this.rData)
            });
          });
        }
      }
      this.setState({
        taskListLoading: false,
        taskListParent: nextProps.taskList.data.parentList,
        taskListMoreLoading: false,
        taskListNowPage: nextProps.taskList.data.taskPage.pageNo,
        taskListAllPage: nextProps.taskList.data.taskPage.last,
        pageLoading: false,
        isLoading: false
      });
    }
  }

  componentDidUpdate() {
    utils.butAnimate();
  }

  componentWillUnmount() {
    if (
      Router.router &&
      Router.router.pathname &&
      Router.router.pathname !== "/mo_taskDetails"
    ) {
      this.props.saveProjectTaskList([]);
      this.props.saveProjectTaskScroll(0);
    }
  }
  onEndReached = event => {
    const {
      taskListNowPage,
      taskListAllPage,
      refreshing,
      isLoading
    } = this.state;
    if (refreshing || isLoading) {
      return false;
    }
    if (taskListNowPage >= taskListAllPage) {
      return false;
    }
    this.setState({ isLoading: true });
    this.getTaskList(taskListNowPage + 1);
  };
  getTaskList(pageNo = 1, projectId, parentId) {
    if (!projectId) {
      projectId = this.state.projectId;
    }
    if (!parentId) {
      parentId = this.state.parentId;
    }
    // 根据页数判断 应该显示哪个加载进度效果
    if (pageNo == 1) {
      this.props.getTaskListByPro(projectId, parentId, pageNo, 20, data => {
        this.setState({
          taskListLoading: true
        });
      });
    } else {
      this.setState({ taskListMoreLoading: true });
      this.props.getTaskListByPro(projectId, parentId, pageNo, 20, () => {});
    }
  }

  // scrollBottom(e) {
  //   const isOnBottom = utils.listScroll(e);
  //   const { taskListAllPage, taskListNowPage } = this.state;
  //   if (isOnBottom && taskListNowPage < taskListAllPage) {
  //     this.getTaskList(taskListNowPage + 1);
  //   }
  // }
  urlChange(item) {
    const { taskListAllPage, taskList } = this.state;
    this.props.saveProjectTaskList(taskList);
    this.props.saveProjectTaskAllCount(taskListAllPage);
    this.props.saveProjectTaskScroll(this.refs.proTask.scrollTop);
    Router.push(
      Dingtalk.setDdNavColor("/mo_taskDetails?id=" + item.taskinfo.id)
    );
  }
  /**
   *
   * @param {*项目名称} taskInfo
   * @description处理项目名称过长
   */
  subTaskName(projectName) {
    return projectName && projectName.length > 11
      ? projectName.substring(0, 5) +
          "..." +
          projectName.substring(projectName.length - 6, projectName.length - 1)
      : projectName;
  }
  render() {
    const {
      taskList,
      taskListLoading,
      taskListParent,
      nullData,
      taskListAllPage,
      taskListNowPage,
      taskListMoreLoading,
      taskListLoadingCount,
      pageLoading,
      dataSource,
      isLoading
    } = this.state;
    const { projectId } = this.props;

    const row = (rowData, sectionID, rowID) => {
      let item = taskList[rowID];
      if (!item) {
        return <div />;
      }
      let taskinfo = item.taskinfo;
      let labels = item.labels;
      let labelsbox;
      if (labels && labels.length > 0) {
        labelsbox = labels.map((lab, i) => {
          if (i <= 2) {
            return (
              <p
                style={{
                  color: "#" + lab.color
                }}
                key={"tag" + lab.id + i}
                className={
                  "tag " +
                  utils.getTagColorByColorCode("1", lab.color) +
                  " textMore"
                }
              >
                {lab.labelname}
              </p>
            );
          }
        });
      }
      return (
        <div className="taskList pubDiv white aniBut" key={rowID}>
          <div className="stateStyle">
            {utils.stateColor(item.taskinfo.stateName)}
          </div>
          <div
            className="taskCon"
            onClick={() => {
              this.urlChange(item, "1");
            }}
          >
            <div className="top">
              <span>
                {item.taskinfo.taskinfoNumber &&
                item.taskinfo.taskinfoNumber.numberS
                  ? item.taskinfo.taskinfoNumber.numberS + "."
                  : ""}
                {item.taskinfo.rank}
              </span>
              <p className="textMore">{item.taskinfo.taskname}</p>
            </div>
            <div className="middle">
              <p className="person">
                <Icon type="anticon-ren2" />
                {taskinfo.userResponse && taskinfo.userResponse.name
                  ? taskinfo.userResponse.name
                  : "未指派"}
              </p>
              {taskinfo.planEndTime || taskinfo.realityEndTime ? (
                <p className="time">
                  <Icon type="anticon-shijian" />
                  {utils.dateColor(
                    taskinfo.planEndTime,
                    taskinfo.state,
                    taskinfo.realityEndTime
                  )}
                </p>
              ) : (
                ""
              )}
              <p className="child">
                <Icon
                  type="anticon-lvzhou_fenzhichangsuo"
                  style={{
                    margin: "4px 5px 0 0"
                  }}
                />
                <span>{taskinfo.childSuccess}</span>/
                <i>{taskinfo.childCount}</i>
              </p>
              <p className="info">
                <Icon
                  type="anticon-discuss"
                  style={{
                    margin: "4px 5px 0 0"
                  }}
                />
                {taskinfo.leaveCount}
              </p>
            </div>
            {item.labels && item.labels.length > 0 ? (
              <div
                className="bottom"
                style={{
                  margin: "10px 0 0 0",
                  height: "20px"
                }}
              >
                {labelsbox}
              </div>
            ) : (
              ""
            )}
          </div>
          {taskinfo.childCount > 0 || taskinfo.collect === "1" ? (
            <div className="taskChild">
              {taskinfo.collect === "1" ? (
                <Icon type="anticon-shoucang1" className="att" />
              ) : (
                ""
              )}
              {taskinfo.childCount > 0 ? (
                <Icon
                  type="anticon-lvzhou_fenzhichangsuo"
                  className="aniButGray"
                  onClick={() => {
                    Router.push(
                      Dingtalk.setDdNavColor(
                        "/mo_projectDetails1?projectId=" +
                          item.project.id +
                          "&parentId=" +
                          taskinfo.id
                      )
                    );
                  }}
                />
              ) : (
                ""
              )}
            </div>
          ) : (
            ""
          )}
        </div>
      );
    };
    return (
      <div className="projectTask">
        <style
          dangerouslySetInnerHTML={{
            __html: stylesheet
          }}
        />

        {taskListParent.length > 0 && (
          <div className="bread">
            {taskListParent.map((item, i) => {
              if (i < taskListParent.length - 1) {
                return (
                  <label
                    key={item.id}
                    onClick={() => {
                      Router.replace(
                        Dingtalk.setDdNavColor(
                          "/mo_projectDetails?projectId=" +
                            projectId +
                            "&parentId=" +
                            item.id +
                            "&page=0"
                        )
                      );
                    }}
                  >
                    <span className="textMore">{item.taskname}</span>
                    <Icon type="right" />
                  </label>
                );
              } else {
                return (
                  <span
                    className="textMore"
                    key={item.id}
                    style={{
                      color: "#666"
                    }}
                  >
                    {item.taskname}
                  </span>
                );
              }
            })}
          </div>
        )}
        {/* {taskList.length > 0 ? (
          <div
            className="list"
            ref="proTask"
            onScroll={e => {
              this.scrollBottom(e);
						}}
						 <div
            className="list"
            ref="proTask"
          >
            {taskList.map((item, i) => {
              let taskinfo = item.taskinfo;
              let labels = item.labels;
              let labelsbox;
              if (labels && labels.length > 0) {
                labelsbox = labels.map((lab, i) => {
                  if (i <= 2) {
                    return (
                      <p
                        style={{
                          color: "#" + lab.color
                        }}
                        key={"tag" + lab.id + i}
                        className={
                          "tag " +
                          utils.getTagColorByColorCode("1", lab.color) +
                          " textMore"
                        }
                      >
                        {lab.labelname}
                      </p>
                    );
                  }
                });
              }
              return (
                <div className="taskList pubDiv white aniBut" key={i}>
                  <div className="stateStyle">
                    {utils.stateColor(item.taskinfo.stateName)}
                  </div>
                  <div
                    className="taskCon"
                    onClick={() => {
                      this.urlChange(item, "1");
                    }}
                  >
                    <div className="top">
                      <span>
                        {item.taskinfo.taskinfoNumber &&
                        item.taskinfo.taskinfoNumber.numberS
                          ? item.taskinfo.taskinfoNumber.numberS + "."
                          : ""}
                        {item.taskinfo.rank}
                      </span>
                      <p className="textMore">{item.taskinfo.taskname}</p>
                    </div>
                    <div className="middle">
                      <p className="person">
                        <Icon type="anticon-ren2" />
                        {taskinfo.userResponse && taskinfo.userResponse.name
                          ? taskinfo.userResponse.name
                          : "未指派"}
                      </p>
                      {taskinfo.planEndTime || taskinfo.realityEndTime ? (
                        <p className="time">
                          <Icon type="anticon-shijian" />
                          {utils.dateColor(
                            taskinfo.planEndTime,
                            taskinfo.state,
                            taskinfo.realityEndTime
                          )}
                        </p>
                      ) : (
                        ""
                      )}
                      <p className="child">
                        <Icon
                          type="anticon-lvzhou_fenzhichangsuo"
                          style={{
                            margin: "4px 5px 0 0"
                          }}
                        />
                        <span>{taskinfo.childSuccess}</span>/
                        <i>{taskinfo.childCount}</i>
                      </p>
                      <p className="info">
                        <Icon
                          type="anticon-discuss"
                          style={{
                            margin: "4px 5px 0 0"
                          }}
                        />
                        {taskinfo.leaveCount}
                      </p>
                    </div>
                    {item.labels && item.labels.length > 0 ? (
                      <div
                        className="bottom"
                        style={{
                          margin: "10px 0 0 0",
                          height: "20px"
                        }}
                      >
                        {labelsbox}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  {taskinfo.childCount > 0 || taskinfo.collect === "1" ? (
                    <div className="taskChild">
                      {taskinfo.collect === "1" ? (
                        <Icon type="anticon-shoucang1" className="att" />
                      ) : (
                        ""
                      )}
                      {taskinfo.childCount > 0 ? (
                        <Icon
                          type="anticon-lvzhou_fenzhichangsuo"
                          className="aniButGray"
                          onClick={() => {
                            Router.push(
                              Dingtalk.setDdNavColor(
                                "/mo_projectDetails1?projectId=" +
                                  item.project.id +
                                  "&parentId=" +
                                  taskinfo.id
                              )
                            );
                          }}
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              );
            })}
            {!taskListMoreLoading && taskListNowPage < taskListAllPage ? (
              <div className="moreLoadingRow">下拉加载更多</div>
            ) : (
              ""
            )}
            {!taskListMoreLoading &&
            (taskListNowPage > taskListAllPage ||
              taskListNowPage === taskListAllPage) ? (
              <div className="moreLoadingRow">已经是最后一页喽</div>
            ) : (
              ""
            )}
            {taskListMoreLoading ? (
              <div className="moreLoadingRow">
                <Loading show={true} classStr="loading_minSize" />
              </div>
            ) : (
              ""
            )}
          </div>
        ) : (
          ""
				)} */}

        {pageLoading ? (
          <Loading show={true} />
        ) : taskList && taskList.length <= 0 ? (
          <Friendly
            data={nullData}
            hasJus={true}
            createPermission={this.props.taskList.data.createPermission}
            projectName={this.props.projectName}
          />
        ) : (
          <div className="list" ref="proTask">
            <ListView
              dataSource={dataSource}
              renderFooter={() => (
                <div style={{ textAlign: "center" }}>
                  {isLoading ? (
                    <div
                      style={{
                        height: "25px",
                        position: "relative",
                        color: "#a9b5b9",
                        lineHeight: "25px",
                        fontSize: "12px"
                      }}
                    >
                      <Loading
                        show={true}
                        classStr="loading_minSize"
                        style={{
                          position: "inherit",
                          display: "inline-block",
                          width: "auto",
                          height: "25px",
                          minHeight: "20px",
                          background: "none",
                          margin: "1px 10px 0 0"
                        }}
                      />
                    </div>
                  ) : taskListAllPage <= taskListNowPage ? (
                    <div
                      style={{
                        height: "25px",
                        position: "relative",
                        color: "#a9b5b9",
                        lineHeight: "25px",
                        fontSize: "12px",
                        textAlign: "center"
                      }}
                    >
                      已经到底了
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              )}
              renderRow={row}
              // useBodyScroll={this.state.useBodyScroll}
              style={{
                height: "100%"
              }}
              onEndReached={this.onEndReached}
              pageSize={5}
            />
          </div>
        )}
        {/* {taskListLoadingCount > 0 && taskList.length === 0 && (
          <Friendly
            data={nullData}
            hasJus={true}
            createPermission={this.props.taskList.data.createPermission}
            projectName={this.props.projectName}
          />
        )} */}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    taskList: state.task.taskProjectList, //项目详情
    projectTaskList: state.cache.projectTaskList,
    projectTaskAllCount: state.cache.projectTaskAllCount,
    projectTaskScroll: state.cache.projectTaskScroll
  };
}
const mapDispatchToProps = dispatch => {
  return {
    getTaskListByPro: bindActionCreators(taskAction.getTaskListByPro, dispatch),
    saveProjectTaskList: bindActionCreators(
      cacheAction.saveProjectTaskList,
      dispatch
    ),
    saveProjectTaskAllCount: bindActionCreators(
      cacheAction.saveProjectTaskAllCount,
      dispatch
    ),
    saveProjectTaskScroll: bindActionCreators(
      cacheAction.saveProjectTaskScroll,
      dispatch
    )
  };
};
export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(
  projectTask
);
