import React, { Component } from "react";
import { bindActionCreators } from "redux";
import {
  DatePicker,
  Icon,
  Picker,
  Toast,
  InputItem,
  Drawer,
  Spin
} from "antd-mobile";
import withRedux from "next-redux-wrapper";
import Router from "next/router";

import { initStore } from "../store";
import stylesheet from "styles/pages/taskNew.scss";
import Layout from "../components/Layout";
import Loading from "../components/Loading";
import MenuBar from "../components/MenuBar";
import Friendly from "../components/Friendly";
import * as taskAction from "../actions/task";
import * as cacheAction from "../actions/cache";
import * as userAction from "../actions/user";
import Dingtalk from "../utils/dingtalk";
import utils from "../utils/utils";
import ProjectSelect from "../components/ProjectSelect";
import Tag from "../components/Tag";
import FetchFn from "../api/fetchFn";
import Storage from "../utils/storage";

let scrollFlag = true;
let timeOutEvent = 0; //定时器
class task extends Component {
  static getInitialProps({ req, store, isServer }) {
    const language = req ? req.headers["accept-language"] : navigator.language;
    return {
      language
    };
  }
  constructor(props) {
    super(props);
    this.state = {
      menuBar: "1",
      childMenuBar: "",
      taskList: [],
      drawerShow: false,
      topMenu: "1",
      taskNowPage: 1,
      taskAllPage: 0,
      taskLoading: false,
      taskMoreLoading: false,
      taskListErrLoading: false,
      sortType: "0",
      taskSelDrawerShow: false,
      taskChooseType: "",
      projectList: [],
      tagList: [],
      userResponse: {},
      dateShow: false,
      weekShow: false,
      monthShow: false,
      planTimeStart: "",
      planTimeEnd: "",
      planStartTime: "",
      planEndTime: "",
      taskFlowStart: "",
      taskFlowEnd: "",
      flowStart: "",
      flowEnd: "",
      flowList: [],
      flowIndex: "0",
      taskFlowListShow: false,
      taskWorkStart: "",
      taskWorkEnd: "",
      workStart: "",
      workEnd: "",
      workList: [],
      workIndex: "0",
      taskWorkListShow: false,
      taskCount: "",
      longMenuShow: false,
      taskSearch: {
        // 任务查询
        group: "evolve",
        labelId: [],
        menuType: "sub1",
        panelId: [],
        projectIds: [],
        search: "",
        planTimeSear: {
          start: "",
          end: ""
        },
        worktimeSear: {
          min: "",
          max: ""
        },
        flowContenSear: {
          min: "",
          max: ""
        },
        planTime: "",
        flowConten: "",
        taskPlanTime: "",
        userResponse: {},
        userFlow: {},
        userCreate: {},
        userAssign: {},
        userSear: {
          type: "0" /* 负责人0 确认人1 关注人2 指派人3 创建人4          */,
          userIds: []
        },
        sortType: "1"
      }
    };
  }

  componentWillMount() {
    Dingtalk.setTitle("任务");
    Dingtalk.setMenuHome();
  }

  componentDidMount() {
    utils.butAnimate();
    if (!this.props.urlData) {
      this.props.setUrlData(encodeURIComponent(location.href.split("#")[0]));
    }
    const { taskSearch } = this.state;
    let saveSort = Storage && Storage.getLocal("saveSortType");
    if (saveSort !== null) {
      taskSearch.sortType = saveSort;
      this.setState({ sortType: saveSort, taskSearch: taskSearch });
    }
    let flowVal = Storage && Storage.getLocal("flowValue");
    if (flowVal !== null) {
      this.setState({ flowList: JSON.parse(flowVal) });
    }
    let workVal = Storage && Storage.getLocal("workValue");
    if (workVal !== null) {
      this.setState({ workList: JSON.parse(workVal) });
    }
    this.getTaskList(1, 30, taskSearch);
  }

  componentWillReceiveProps(nextProps) {}

  componentDidUpdate() {
    utils.butAnimate();
  }
  //获取任务列表
  getTaskList(pageNo = 1, pageSize, search) {
    const data = {};
    if (pageNo === 1) {
      this.setState({ taskLoading: true, taskListErrLoading: true });
    } else {
      this.setState({ taskMoreLoading: true, taskListErrLoading: true });
    }
    if (!search) {
      search = this.state.taskSearch;
    }
    if (search.menuType === "all") {
      search.menuType = "";
      search.searchType = "1";
    }
    taskAction.getTaskListByCondition(pageNo, pageSize, search, data => {
      if (data.err) {
        this.setState({
          taskLoading: false,
          taskMoreLoading: false
        });
        return false;
      }
      if (
        data.data &&
        data.data.taskinfos &&
        data.data.taskinfos.pageNo === 1
      ) {
        this.setState({
          taskList: data.data.taskinfos && data.data.taskinfos.list
        });
      } else {
        const taskList = JSON.parse(JSON.stringify(this.state.taskList));
        if (data.data && data.data.taskinfos) {
          data.data.taskinfos.list.map((item, i) => {
            taskList.push(item);
          });
          this.setState({ taskList: taskList });
        }
      }
      this.setState({
        taskCount: data.data.taskinfos && data.data.taskinfos.count,
        taskNowPage: data.data.taskinfos && data.data.taskinfos.pageNo,
        taskAllPage: data.data.taskinfos && data.data.taskinfos.last,
        taskLoading: false,
        taskMoreLoading: false,
        taskListErrLoading: false
      });
    });
  }
  //下拉加载
  scrollOnBottom(e) {
    const isOnButtom = utils.listScroll(e);
    const { taskAllPage, taskNowPage } = this.state;
    if (isOnButtom && taskNowPage < taskAllPage) {
      this.getTaskList(taskNowPage + 1);
    }
  }
  //筛选菜单切换
  taskSelMenuChange(type) {
    switch (type) {
      case type:
        this.setState({ topMenu: type });
        break;
    }
  }
  //排序菜单
  sortChange(type) {
    const { taskSearch } = this.state;
    switch (type) {
      case type:
        taskSearch.sortType = type;
        this.setState({ sortType: type, taskSearch: taskSearch });
        this.getTaskList(1, 30, taskSearch);
        this.refs.taskList.scrollTop = 0;
        break;
    }
  }
  //保存默认排序
  saveSort() {
    const { sortType } = this.state;
    Storage.setLocal("saveSortType", sortType);
    Toast.info("保存成功");
  }
  projectChange(val) {
    const { taskSearch } = this.state;
    let proListIds = [];
    if (val.length > 0) {
      val.map((item, i) => {
        proListIds.push(item.id);
      });
    }
    taskSearch.projectIds = proListIds;
    this.setState({ projectList: val, taskSearch: taskSearch }, () => {});
    this.getTaskList(1, 30, taskSearch);
    this.refs.taskList.scrollTop = 0;
  }
  tagChange(val) {
    const { taskSearch } = this.state;
    let tagIds = [];
    if (val.length > 0) {
      val.map((item, i) => {
        tagIds.push(item.id);
      });
    }
    taskSearch.labelId = tagIds;
    this.setState({ tagList: val, taskSearch: taskSearch });
    this.getTaskList(1, 30, taskSearch);
    this.refs.taskList.scrollTop = 0;
  }
  dateChange(type) {
    const { taskSearch, dateShow, weekShow, monthShow } = this.state;
    this.setState({ planTimeStart: "", planTimeEnd: "" });
    switch (type) {
      case "date":
        if (dateShow) {
          this.setState({ dateShow: false });
        } else {
          taskSearch.taskPlanTime = "";
          this.setState({
            dateShow: true,
            weekShow: false,
            monthShow: false,
            taskSearch: taskSearch
          });
        }
        this.timeChange("day");
        break;
      case "week":
        if (weekShow) {
          this.setState({ weekShow: false });
        } else {
          taskSearch.taskPlanTime = "";
          this.setState({
            dateShow: false,
            weekShow: true,
            monthShow: false,
            taskSearch: taskSearch
          });
        }
        this.timeChange("week");
        break;
      case "month":
        if (monthShow) {
          this.setState({ monthShow: false });
        } else {
          taskSearch.taskPlanTime = "";
          this.setState({
            dateShow: false,
            weekShow: false,
            monthShow: true,
            taskSearch: taskSearch
          });
        }
        this.timeChange("month");
        break;
      case "none":
        if (taskSearch.taskPlanTime === "5") {
          taskSearch.taskPlanTime = "";
        } else {
          taskSearch.taskPlanTime = "5";
        }
        this.setState({
          taskSearch: taskSearch,
          dateShow: false,
          weekShow: false,
          monthShow: false
        });
        break;
    }
  }
  valDateChange(date, type) {
    const { taskSearch } = this.state;
    let time = utils.dateToString(date);
    taskSearch.taskPlanTime = "";
    this.setState({
      taskSearch: taskSearch,
      dateShow: false,
      weekShow: false,
      monthShow: false
    });
    if (type === "start") {
      this.setState({ planTimeStart: time });
    } else if (type === "end") {
      this.setState({ planTimeEnd: time });
    }
  }
  timeChange(timeType) {
    const { taskSearch } = this.state;
    let day = new Date();
    switch (timeType) {
      case "day":
        let dayStart = utils.dateToString(new Date());
        let dayEnd = utils.dateToString(new Date());
        this.setState({ planStartTime: dayStart, planEndTime: dayEnd });
        break;
      case "week":
        let num = day.getDay() - 1;
        let weekStart = utils.dateToString(
          new Date(day.setDate(day.getDate() - num))
        );
        let weekEnd = utils.dateToString(
          new Date(day.setDate(day.getDate() + 6))
        );
        this.setState({ planStartTime: weekStart, planEndTime: weekEnd });
        break;
      case "month":
        day.setDate(1);
        let monthStart = utils.dateToString(new Date(day));
        day.setMonth(day.getMonth() + 1);
        day.setDate(day.getDate() - 1);
        let monthEnd = utils.dateToString(new Date(day));
        this.setState({ planStartTime: monthStart, planEndTime: monthEnd });
        break;
    }
  }
  planTimeChange() {
    const {
      taskSearch,
      planEndTime,
      planStartTime,
      planTimeStart,
      planTimeEnd
    } = this.state;
    if (
      (planStartTime !== "" && planEndTime !== "") ||
      (planTimeStart !== "" && planTimeEnd !== "") ||
      taskSearch.taskPlanTime !== ""
    ) {
      taskSearch.planTimeSear.start = planStartTime
        ? planStartTime
        : planTimeStart;
      taskSearch.planTimeSear.end = planEndTime ? planEndTime : planTimeEnd;
      this.setState({
        taskSearch: taskSearch,
        taskSelDrawerShow: false,
        taskChooseType: ""
      });
      this.getTaskList(1, 30, taskSearch);
      this.refs.taskList.scrollTop = 0;
    } else {
      Toast.info("请选择截止时间");
    }
  }
  flowValChange(type, val) {
    if (type === "start") {
      this.setState({ taskFlowStart: val });
    } else if (type === "end") {
      this.setState({ taskFlowEnd: val });
    }
  }
  workValChange(type, val) {
    if (type === "start") {
      this.setState({ taskWorkStart: val });
    } else if (type === "end") {
      this.setState({ taskWorkEnd: val });
    }
  }
  findIndex(type, min, max) {
    const { flowList, workList } = this.state;
    if (type == "flow") {
      for (let i = 0; i < flowList.length; i++) {
        let item = flowList[i];
        if (item.min == min && item.max == max) {
          this.setState({ flowIndex: i });
          break;
        }
      }
    } else if (type == "work") {
      for (let i = 0; i < workList.length; i++) {
        let item = workList[i];
        if (item.min == min && item.max == max) {
          this.setState({ workIndex: i });
          break;
        }
      }
    }
  }
  flowWorkList(type, start, end) {
    this.findIndex(type, start, end);
    const {
      taskSearch,
      flowList,
      taskFlowListShow,
      flowIndex,
      workList,
      workIndex,
      taskWorkListShow
    } = this.state;
    switch (type) {
      case "flow":
        if (flowList.length > 0) {
          flowList.map((item, i) => {
            if (start === item.min && end === item.max) {
              if (taskFlowListShow && flowIndex === i) {
                this.setState({ taskFlowListShow: false });
              } else {
                this.setState({ taskFlowListShow: true });
              }
              this.setState({ flowStart: start, flowEnd: end });
            }
          });
        }
        taskSearch.flowConten = "";
        this.setState({ taskSearch: taskSearch });
        break;
      case "work":
        if (workList.length > 0) {
          workList.map((item, i) => {
            if (start === item.min && end === item.max) {
              if (taskWorkListShow && workIndex === i) {
                this.setState({ taskWorkListShow: false });
              } else {
                this.setState({ taskWorkListShow: true });
              }
              this.setState({ workStart: start, workEnd: end });
            }
          });
        }
        taskSearch.planTime = "";
        this.setState({ taskSearch: taskSearch });
        break;
    }
  }
  flowOk(type, start, end) {
    const {
      taskFlowStart,
      taskFlowEnd,
      taskSearch,
      flowList,
      taskWorkStart,
      taskWorkEnd,
      workList
    } = this.state;
    switch (type) {
      case "flow":
        if (
          (taskFlowStart !== "" && taskFlowEnd !== "") ||
          (start !== "" && end !== "")
        ) {
          if (taskFlowStart !== "" && taskFlowEnd !== "") {
            flowList.push({
              min: taskFlowStart,
              max: taskFlowEnd
            });
          }
          if (flowList.length <= 3 && flowList.length > 0) {
            Storage.setLocal("flowValue", JSON.stringify(flowList));
          } else if (flowList.length > 3) {
            let flowData = flowList.slice(flowList.length - 3, flowList.length);
            Storage.setLocal("flowValue", JSON.stringify(flowData));
            this.setState({ flowList: flowData });
          }

          if (start !== "" && end !== "") {
            if (start > end) {
              taskSearch.flowContenSear.min = end;
              taskSearch.flowContenSear.max = start;
            } else {
              taskSearch.flowContenSear.min = start;
              taskSearch.flowContenSear.max = end;
            }
          } else {
            if (taskFlowStart > taskFlowEnd) {
              taskSearch.flowContenSear.min = taskFlowEnd;
              taskSearch.flowContenSear.max = taskFlowStart;
            } else {
              taskSearch.flowContenSear.min = taskFlowStart;
              taskSearch.flowContenSear.max = taskFlowEnd;
            }
          }
          this.setState({
            taskSearch: taskSearch,
            taskSelDrawerShow: false,
            taskChooseType: ""
          });
          this.getTaskList(1, 30, taskSearch);
          this.refs.taskList.scrollTop = 0;
        } else if (taskSearch.flowConten !== "") {
          taskSearch.flowConten = "4";
          this.setState({
            taskSearch: taskSearch,
            taskSelDrawerShow: false,
            taskChooseType: ""
          });
          this.getTaskList(1, 30, taskSearch);
          this.refs.taskList.scrollTop = 0;
        } else {
          Toast.info("请选择或输入绩效范围");
        }

        break;
      case "work":
        if (
          (taskWorkStart !== "" && taskWorkEnd !== "") ||
          (start !== "" && end !== "")
        ) {
          if (taskWorkStart !== "" && taskWorkEnd !== "") {
            workList.push({
              min: taskWorkStart,
              max: taskWorkEnd
            });
          }
          if (workList.length <= 3 && workList.length > 0) {
            Storage.setLocal("workValue", JSON.stringify(workList));
          } else if (workList.length > 3) {
            let workData = workList.slice(workList.length - 3, workList.length);
            Storage.setLocal("workValue", JSON.stringify(workData));
            this.setState({ workList: workData });
          }
          if (start !== "" && end !== "") {
            if (start > end) {
              taskSearch.worktimeSear.min = end;
              taskSearch.worktimeSear.max = start;
            } else {
              taskSearch.worktimeSear.min = start;
              taskSearch.worktimeSear.max = end;
            }
          } else {
            if (taskWorkStart > taskWorkEnd) {
              taskSearch.worktimeSear.min = taskWorkEnd;
              taskSearch.worktimeSear.max = taskWorkStart;
            } else {
              taskSearch.worktimeSear.min = taskWorkStart;
              taskSearch.worktimeSear.max = taskWorkEnd;
            }
          }
          this.setState({
            taskSearch: taskSearch,
            taskSelDrawerShow: false,
            taskChooseType: ""
          });
          this.getTaskList(1, 30, taskSearch);
          this.refs.taskList.scrollTop = 0;
        } else if (taskSearch.planTime !== "") {
          taskSearch.planTime = "4";
          this.setState({
            taskSearch: taskSearch,
            taskSelDrawerShow: false,
            taskChooseType: ""
          });
          this.getTaskList(1, 30, taskSearch);
          this.refs.taskList.scrollTop = 0;
        } else {
          Toast.info("请选择或输入工期范围");
        }
        break;
    }
  }
  setUpNo(type) {
    const { taskSearch } = this.state;
    switch (type) {
      case "flow":
        if (taskSearch.flowConten === "4") {
          taskSearch.flowConten = "";
          taskSearch.flowContenSear.min = "";
          taskSearch.flowContenSear.max = "";
          this.setState({ taskSearch: taskSearch, flowStart: "", flowEnd: "" });
        } else {
          taskSearch.flowConten = "4";
          this.setState({ taskSearch: taskSearch, flowStart: "", flowEnd: "" });
        }
        break;
      case "work":
        if (taskSearch.planTime === "4") {
          taskSearch.planTime = "";
          taskSearch.worktimeSear.min = "";
          taskSearch.worktimeSear.max = "";
          this.setState({ taskSearch: taskSearch, workStart: "", workEnd: "" });
        } else {
          taskSearch.planTime = "4";
          this.setState({ taskSearch: taskSearch, workStart: "", workEnd: "" });
        }
        break;
    }
  }
  backChange(type) {
    const { taskSearch } = this.state;
    switch (type) {
      case "date":
        taskSearch.planTimeSear.start = "";
        taskSearch.planTimeSear.end = "";
        taskSearch.taskPlanTime = "";
        this.setState({
          taskSearch: taskSearch,
          dateShow: false,
          weekShow: false,
          monthShow: false,
          taskSelDrawerShow: false,
          taskChooseType: ""
        });
        break;
      case "flow":
        taskSearch.flowContenSear.min = "";
        taskSearch.flowContenSear.max = "";
        taskSearch.flowConten = "";
        this.setState({
          taskSearch: taskSearch,
          taskSelDrawerShow: false,
          taskChooseType: ""
        });
        break;
      case "work":
        taskSearch.worktimeSear.min = "";
        taskSearch.worktimeSear.max = "";
        taskSearch.planTime = "";
        this.setState({
          taskSearch: taskSearch,
          taskSelDrawerShow: false,
          taskChooseType: ""
        });
        break;
    }
  }
  taskChildRender() {
    const {
      taskChooseType,
      projectList,
      tagList,
      taskSearch,
      dateShow,
      weekShow,
      monthShow,
      planTimeStart,
      planTimeEnd,
      taskFlowStart,
      taskFlowEnd,
      flowStart,
      flowEnd,
      flowList,
      taskFlowListShow,
      flowIndex,
      taskWorkStart,
      taskWorkEnd,
      workStart,
      workEnd,
      workList,
      taskWorkListShow,
      workIndex
    } = this.state;
    const CustomChildren = ({ extra, onClick, children }) => (
      <div onClick={onClick}>{extra}</div>
    );

    switch (taskChooseType) {
      case "1":
        return (
          <div className="taskChooseContent">
            <p style={{ border: "none" }}>选择项目</p>
            <div className="project">
              <ProjectSelect
                add={false}
                selectedPros={JSON.parse(JSON.stringify(projectList))}
                closeCallBack={() => {
                  this.setState({
                    taskSelDrawerShow: false,
                    taskChooseType: ""
                  });
                }}
                selingCallBack={val => {
                  this.projectChange(JSON.parse(JSON.stringify(val)));
                }}
              />
            </div>
          </div>
        );
        break;
      case "2":
        return (
          <div className="taskChooseContent">
            <p>选择标签</p>
            <div className="tag">
              <Tag
                selectList={JSON.parse(JSON.stringify(tagList))}
                closedCallBack={() => {
                  this.setState({
                    taskSelDrawerShow: false,
                    taskChooseType: ""
                  });
                }}
                selectedCallBack={val => {
                  this.tagChange(JSON.parse(JSON.stringify(val)));
                }}
              />
            </div>
          </div>
        );
        break;
      case "3":
        return (
          <div className="taskChooseContent">
            <p>选择截止时间</p>
            <div className="planDate">
              <ul>
                <li
                  onClick={() => {
                    this.dateChange("none");
                  }}
                >
                  <span
                    className={taskSearch.taskPlanTime !== "" ? "lColor" : ""}
                  >
                    未设置
                  </span>
                  {taskSearch.taskPlanTime !== "" ? <Icon type="check" /> : ""}
                </li>
                <li
                  onClick={() => {
                    this.dateChange("date");
                  }}
                >
                  <span className={dateShow ? "lColor" : ""}>截止今天</span>
                  {dateShow ? <Icon type="check" /> : ""}
                </li>
                <li
                  onClick={() => {
                    this.dateChange("week");
                  }}
                >
                  <span className={weekShow ? "lColor" : ""}>截止本周</span>
                  {weekShow ? <Icon type="check" /> : ""}
                </li>
                <li
                  onClick={() => {
                    this.dateChange("month");
                  }}
                >
                  <span className={monthShow ? "lColor" : ""}>截止本月</span>
                  {monthShow ? <Icon type="check" /> : ""}
                </li>
              </ul>
              <div className="chooseDateBox">
                <p className="chooseBox">
                  <font>自定义</font>
                  {planTimeStart !== "" && planTimeEnd !== "" ? (
                    <span>
                      <i>({planTimeStart}</i>
                      <em>~</em>
                      <i>{planTimeEnd})</i>
                    </span>
                  ) : (
                    ""
                  )}
                </p>
                <p className="start">
                  <font>从</font>
                  <span>
                    {planTimeStart !== "" ? planTimeStart : "选择时间"}
                    <div className="dateBox">
                      <DatePicker
                        mode="date"
                        title="选择时间"
                        extra="选择时间"
                        value={
                          planTimeStart !== ""
                            ? new Date(planTimeStart)
                            : new Date()
                        }
                        onChange={date => this.valDateChange(date, "start")}
                      >
                        <CustomChildren />
                      </DatePicker>
                    </div>
                  </span>
                </p>
                <p className="end">
                  <font>到</font>
                  <span>
                    {planTimeEnd !== "" ? planTimeEnd : "选择时间"}
                    <div className="dateBox">
                      <DatePicker
                        mode="date"
                        title="选择时间"
                        extra="选择时间"
                        value={
                          planTimeEnd !== ""
                            ? new Date(planTimeEnd)
                            : new Date()
                        }
                        onChange={date => this.valDateChange(date, "end")}
                      >
                        <CustomChildren />
                      </DatePicker>
                    </div>
                  </span>
                </p>
              </div>
              <div className="buttonBox">
                <span
                  className="back"
                  onClick={() => {
                    this.backChange("date");
                  }}
                >
                  返回
                </span>
                <span
                  className="ok"
                  onClick={() => {
                    this.planTimeChange();
                  }}
                >
                  确定
                </span>
              </div>
            </div>
          </div>
        );
        break;
      case "4":
        return (
          <div className="taskChooseContent">
            <p>选择绩效范围</p>
            <div className="taskFlow">
              <ul>
                <li
                  onClick={() => {
                    this.setUpNo("flow");
                  }}
                  className={taskSearch.flowConten !== "" ? "lColor" : ""}
                >
                  未设置
                  {taskSearch.flowConten !== "" ? <Icon type="check" /> : ""}
                </li>
                {flowList.length > 0
                  ? flowList.map((item, i) => {
                      return (
                        <li
                          key={i}
                          className={
                            item.min === flowStart &&
                            item.max === flowEnd &&
                            taskFlowListShow &&
                            flowIndex === i
                              ? "lColor"
                              : ""
                          }
                          onClick={() => {
                            this.flowWorkList("flow", item.min, item.max);
                          }}
                        >
                          {item.min} ~ {item.max}
                          {item.min === flowStart &&
                          item.max === flowEnd &&
                          taskFlowListShow &&
                          flowIndex === i ? (
                            <Icon type="check" />
                          ) : (
                            ""
                          )}
                        </li>
                      );
                    })
                  : ""}
              </ul>
              <div className="chooseDateBox">
                <p className="chooseBox">
                  <font>自定义</font>
                  {taskFlowStart !== "" && taskFlowEnd !== "" ? (
                    <span>
                      <i>({taskFlowStart}</i>
                      <em>~</em>
                      <i>{taskFlowEnd})</i>
                    </span>
                  ) : (
                    ""
                  )}
                </p>
                <p className="start">
                  <font>从</font>
                  <span>
                    <input
                      placeholder="输入绩效值"
                      value={taskFlowStart}
                      onChange={e => {
                        utils.onlyNumber(e.target);
                        this.flowValChange("start", e.target.value);
                      }}
                    />
                  </span>
                </p>
                <p className="end">
                  <font>到</font>
                  <span>
                    <input
                      placeholder="输入绩效值"
                      value={taskFlowEnd}
                      onChange={e => {
                        utils.onlyNumber(e.target);
                        this.flowValChange("end", e.target.value);
                      }}
                    />
                  </span>
                </p>
              </div>
              <div className="buttonBox">
                <span
                  className="back"
                  onClick={() => {
                    this.backChange("flow");
                  }}
                >
                  返回
                </span>
                <span
                  className="ok"
                  onClick={() => {
                    this.flowOk(
                      "flow",
                      flowStart !== "" ? flowStart : "",
                      flowEnd !== "" ? flowEnd : ""
                    );
                  }}
                >
                  确定
                </span>
              </div>
            </div>
          </div>
        );
        break;
      case "5":
        return (
          <div className="taskChooseContent">
            <p>选择工期范围</p>
            <div className="taskWork">
              <ul>
                <li
                  onClick={() => {
                    this.setUpNo("work");
                  }}
                  className={taskSearch.planTime !== "" ? "lColor" : ""}
                >
                  未设置
                  {taskSearch.planTime !== "" ? <Icon type="check" /> : ""}
                </li>
                {workList.length > 0
                  ? workList.map((item, i) => {
                      return (
                        <li
                          key={i}
                          className={
                            item.min === workStart &&
                            item.max === workEnd &&
                            taskWorkListShow &&
                            workIndex === i
                              ? "lColor"
                              : ""
                          }
                          onClick={() => {
                            this.flowWorkList("work", item.min, item.max);
                          }}
                        >
                          {item.min} ~ {item.max}
                          {item.min === workStart &&
                          item.max === workEnd &&
                          taskWorkListShow &&
                          workIndex === i ? (
                            <Icon type="check" />
                          ) : (
                            ""
                          )}
                        </li>
                      );
                    })
                  : ""}
              </ul>
              <div className="chooseDateBox">
                <p className="chooseBox">
                  <font>自定义</font>
                  {taskWorkStart !== "" && taskWorkEnd !== "" ? (
                    <span>
                      <i>({taskWorkStart}</i>
                      <em>~</em>
                      <i>{taskWorkEnd})</i>
                    </span>
                  ) : (
                    ""
                  )}
                </p>
                <p className="start">
                  <font>从</font>
                  <span>
                    <input
                      placeholder="输入工期"
                      value={taskWorkStart}
                      onChange={e => {
                        utils.onlyNumber(e.target);
                        this.workValChange("start", e.target.value);
                      }}
                    />
                  </span>
                </p>
                <p className="end">
                  <font>到</font>
                  <span>
                    <input
                      placeholder="输入工期"
                      value={taskWorkEnd}
                      onChange={e => {
                        utils.onlyNumber(e.target);
                        this.workValChange("end", e.target.value);
                      }}
                    />
                  </span>
                </p>
              </div>
              <div className="buttonBox">
                <span
                  className="back"
                  onClick={() => {
                    this.backChange("work");
                  }}
                >
                  返回
                </span>
                <span
                  className="ok"
                  onClick={() => {
                    this.flowOk(
                      "work",
                      workStart !== "" ? workStart : "",
                      workEnd !== "" ? workEnd : ""
                    );
                  }}
                >
                  确定
                </span>
              </div>
            </div>
          </div>
        );
        break;
    }
  }
  chooseChange(type) {
    this.openChange("2");
    const { taskSearch } = this.state;
    switch (type) {
      case type:
        taskSearch.taskPlanTime = "";
        taskSearch.flowConten = "";
        taskSearch.planTime = "";
        this.setState({
          taskChooseType: type,
          dateShow: false,
          weekShow: false,
          monthShow: false,
          planEndTime: "",
          planStartTime: "",
          planTimeStart: "",
          planTimeEnd: "",
          taskFlowStart: "",
          taskFlowEnd: "",
          flowStart: "",
          flowEnd: "",
          flowIndex: "0",
          taskFlowListShow: false,
          taskWorkStart: "",
          taskWorkEnd: "",
          WorkStart: "",
          WorkEnd: "",
          WorkIndex: "0",
          taskWorkListShow: false,
          taskSearch: taskSearch
        });
        break;
    }
  }

  //选人
  selUser() {
    let { userResponse, taskSearch } = this.state;
    let selectUsers = [];
    selectUsers.push(userResponse);
    const that = this;
    Dingtalk.selectUser(
      selectUsers,
      "选择负责人",
      data => {
        const user = data[0];
        if (user.emplId !== userResponse.userid) {
          userResponse.userid = user.emplId;
          userResponse.name = user.name;
          userResponse.photo = user.avatar;
        }
      },
      err => {
        Toast.fail(err, 1);
      }
      // true
    );
    taskSearch.userResponse = userResponse;
    this.setState({ taskSearch: taskSearch });
    this.getTaskList(1, 30, taskSearch);
    this.refs.taskList.scrollTop = 0;
  }
  deleteProjectTag(type, id) {
    const { projectList, tagList, taskSearch } = this.state;
    switch (type) {
      case "1":
        if (projectList && projectList.length > 0) {
          projectList.map((item, index) => {
            if (item.id === id) {
              projectList.splice(index, 1);
              taskSearch.projectIds.splice(index, 1);
            }
            this.setState({ projectList: projectList, taskSearch: taskSearch });
          });
        }
        this.getTaskList(1, 30, taskSearch);
        this.refs.taskList.scrollTop = 0;
        break;
      case "2":
        if (tagList && tagList.length > 0) {
          tagList.map((item, index) => {
            if (item.id === id) {
              tagList.splice(index, 1);
              taskSearch.labelId.splice(index, 1);
            }
            this.setState({ tagList: tagList, taskSearch: taskSearch });
          });
        }
        this.getTaskList(1, 30, taskSearch);
        this.refs.taskList.scrollTop = 0;
        break;
    }
  }
  deleteUser() {
    const { userResponse, taskSearch } = this.state;
    for (var key in userResponse) {
      delete userResponse[key];
    }
    taskSearch.userResponse = userResponse;
    this.setState({ userResponse: userResponse, taskSearch: taskSearch });
    this.getTaskList(1, 30, taskSearch);
    this.refs.taskList.scrollTop = 0;
  }
  clearPlanFlow(type) {
    const { taskSearch } = this.state;
    switch (type) {
      case "planTime":
        taskSearch.planTimeSear.start = "";
        taskSearch.planTimeSear.end = "";
        taskSearch.taskPlanTime = "";
        this.setState({
          taskSearch: taskSearch,
          dateShow: false,
          weekShow: false,
          monthShow: false,
          planEndTime: "",
          planStartTime: "",
          planTimeStart: "",
          planTimeEnd: ""
        });
        this.getTaskList(1, 30, taskSearch);
        this.refs.taskList.scrollTop = 0;
        break;
      case "taskFlow":
        taskSearch.flowContenSear.min = "";
        taskSearch.flowContenSear.max = "";
        taskSearch.flowConten = "";
        this.setState({
          taskSearch: taskSearch,
          taskFlowListShow: false,
          taskFlowStart: "",
          taskFlowEnd: "",
          flowStart: "",
          flowEnd: ""
        });
        this.getTaskList(1, 30, taskSearch);
        this.refs.taskList.scrollTop = 0;
        break;
      case "workTime":
        taskSearch.worktimeSear.min = "";
        taskSearch.worktimeSear.max = "";
        taskSearch.planTime = "";
        this.setState({
          taskSearch: taskSearch,
          taskWorkListShow: false,
          taskWorkStart: "",
          taskWorkEnd: "",
          workStart: "",
          workEnd: ""
        });
        this.getTaskList(1, 30, taskSearch);
        this.refs.taskList.scrollTop = 0;
        break;
    }
  }
  //任务筛选render
  taskSelectRender() {
    const {
      topMenu,
      sortType,
      taskSelDrawerShow,
      taskChooseType,
      projectList,
      tagList,
      userResponse,
      taskSearch,
      taskCount,
      dateShow,
      weekShow,
      monthShow
    } = this.state;
    let fzrUser =
      userResponse && userResponse.name && userResponse.name.slice(0, 3);
    const sidebarChildContent = this.taskChildRender();
    return (
      <div className="taskSelect">
        <div className="taskSelTop">
          <ul>
            <li
              onClick={() => {
                this.taskSelMenuChange("1");
              }}
            >
              <p className={topMenu === "1" ? "pColor" : ""}>筛选</p>
              {topMenu === "1" ? <span /> : ""}
            </li>
            <li
              onClick={() => {
                this.taskSelMenuChange("2");
              }}
            >
              <p className={topMenu === "2" ? "pColor" : ""}>排序</p>
              {topMenu === "2" ? <span /> : ""}
            </li>
          </ul>
          <span>
            <Icon
              type="cross"
              onClick={() => {
                this.setState({ drawerShow: false });
              }}
            />
          </span>
        </div>
        <div className="taskSelContent">
          {topMenu === "2" ? (
            <div className="sortBox">
              <ul>
                <li
                  onClick={() => {
                    this.sortChange("1");
                  }}
                >
                  <Icon
                    type={
                      sortType === "1" ? "anticon-Icon" : "anticon-dianxuan"
                    }
                  />
                  <span>按更新时间最近</span>
                </li>
                {/* <li
                  onClick={() => {
                    this.sortChange("1");
                  }}
                >
                  <Icon
                    type={
                      sortType === "1" ? "anticon-Icon" : "anticon-dianxuan"
                    }
                  />
                  <span>按截止时间最近</span>
                </li> */}
                <li
                  onClick={() => {
                    this.sortChange("3");
                  }}
                >
                  <Icon
                    type={
                      sortType === "3" ? "anticon-Icon" : "anticon-dianxuan"
                    }
                  />
                  <span>按创建时间最早</span>
                </li>
                <li
                  onClick={() => {
                    this.sortChange("4");
                  }}
                >
                  <Icon
                    type={
                      sortType === "4" ? "anticon-Icon" : "anticon-dianxuan"
                    }
                  />
                  <span>按创建时间最晚</span>
                </li>
              </ul>
              <p
                onClick={() => {
                  this.saveSort();
                }}
              >
                <Icon type="anticon-save" />
                <span>保存为默认排序</span>
              </p>
            </div>
          ) : (
            ""
          )}
          {topMenu === "1" ? (
            <div className="selectBox">
              <Drawer
                className={
                  taskChooseType === ""
                    ? "taskSelChild"
                    : "taskSelChild taskSelChildHeight"
                }
                position={"right"}
                open={taskSelDrawerShow}
                onOpenChange={() => {
                  this.openChange("2");
                }}
                sidebar={sidebarChildContent}
              />
              <div className="projectBox selBox">
                <h3>
                  项目
                  {projectList && projectList.length > 0 ? (
                    <span
                      onClick={() => {
                        this.chooseChange("1");
                      }}
                    >
                      <Icon type="plus" />
                    </span>
                  ) : (
                    ""
                  )}
                </h3>
                <ul>
                  {projectList && projectList.length > 0
                    ? projectList.map((item, i) => {
                        return (
                          <li
                            key={item.id}
                            onClick={() => {
                              this.deleteProjectTag("1", item.id);
                            }}
                          >
                            {item.name}
                          </li>
                        );
                      })
                    : ""}
                  {projectList && projectList.length > 0 ? (
                    ""
                  ) : (
                    <li
                      className="null"
                      onClick={() => {
                        this.chooseChange("1");
                      }}
                    >
                      <span>未选项目</span>
                      <Icon type="right" />
                    </li>
                  )}
                </ul>
              </div>
              <div className="tagBox selBox">
                <h3>
                  标签
                  {tagList && tagList.length > 0 ? (
                    <span
                      onClick={() => {
                        this.chooseChange("2");
                      }}
                    >
                      <Icon type="plus" />
                    </span>
                  ) : (
                    ""
                  )}
                </h3>
                <ul>
                  {tagList && tagList.length > 0
                    ? tagList.map((item, i) => {
                        return (
                          <li className="tag" key={item.id}>
                            <span
                              className={
                                "textMore " +
                                utils.getTagColorByColorCode("1", item.color)
                              }
                              onClick={() => {
                                this.deleteProjectTag("2", item.id);
                              }}
                            >
                              {item.labelname}
                            </span>
                          </li>
                        );
                      })
                    : ""}
                  {tagList && tagList.length > 0 ? (
                    ""
                  ) : (
                    <li
                      className="null"
                      onClick={() => {
                        this.chooseChange("2");
                      }}
                    >
                      <span>未选标签</span>
                      <Icon type="right" />
                    </li>
                  )}
                </ul>
              </div>
              <div className="userBox selBox">
                <h3>负责人</h3>
                <div className="userResponseBox">
                  {userResponse.userid ? (
                    <div
                      className="response"
                      onClick={() => {
                        this.deleteUser();
                      }}
                    >
                      {userResponse.photo !== "" ? (
                        <p className="photo">
                          <img src={userResponse.photo} />
                        </p>
                      ) : (
                        <p className="photo">
                          <span>
                            {fzrUser.slice(fzrUser.length - 2, fzrUser.length)}
                          </span>
                        </p>
                      )}
                      <font>{fzrUser}</font>
                    </div>
                  ) : (
                    <p
                      className="null"
                      onClick={() => {
                        this.selUser();
                      }}
                    >
                      <span>未选负责人</span>
                      <Icon type="right" />
                    </p>
                  )}
                </div>
              </div>
              <div className="endTimeBox selBox">
                <h3>截止日期</h3>
                <div className="timeBox">
                  {(taskSearch.planTimeSear.start !== "" &&
                    taskSearch.planTimeSear.end !== "") ||
                  taskSearch.taskPlanTime !== "" ||
                  dateShow ||
                  weekShow ||
                  monthShow ? (
                    <div className="dateBox">
                      {taskSearch.taskPlanTime !== "" ? (
                        <div
                          className="date"
                          onClick={() => {
                            this.chooseChange("3");
                          }}
                        >
                          <span className="dateStart">未设置</span>
                        </div>
                      ) : (
                        ""
                      )}
                      {dateShow ? (
                        <div
                          className="date"
                          onClick={() => {
                            this.chooseChange("3");
                          }}
                        >
                          <span className="dateStart">截止今天</span>
                        </div>
                      ) : (
                        ""
                      )}
                      {weekShow ? (
                        <div
                          className="date"
                          onClick={() => {
                            this.chooseChange("3");
                          }}
                        >
                          <span className="dateStart">截止本周</span>
                        </div>
                      ) : (
                        ""
                      )}
                      {monthShow ? (
                        <div
                          className="date"
                          onClick={() => {
                            this.chooseChange("3");
                          }}
                        >
                          <span className="dateStart">截止本月</span>
                        </div>
                      ) : (
                        ""
                      )}
                      {taskSearch.planTimeSear.start !== "" &&
                      taskSearch.planTimeSear.end !== "" &&
                      !dateShow &&
                      !weekShow &&
                      !monthShow ? (
                        <div
                          className="date"
                          onClick={() => {
                            this.chooseChange("3");
                          }}
                        >
                          <span className="dateStart">
                            {taskSearch.planTimeSear.start}
                          </span>
                          <span className="line">~</span>
                          <span className="dateEnd">
                            {taskSearch.planTimeSear.end}
                          </span>
                        </div>
                      ) : (
                        ""
                      )}
                      <span
                        className="close"
                        onClick={e => {
                          e.stopPropagation();
                          e.preventDefault();
                          this.clearPlanFlow("planTime");
                        }}
                      >
                        <Icon type="cross" />
                      </span>
                    </div>
                  ) : (
                    <p
                      className="null"
                      onClick={() => {
                        this.chooseChange("3");
                      }}
                    >
                      <span>未选日期</span>
                      <Icon type="right" />
                    </p>
                  )}
                </div>
              </div>
              <div className="taskFlowBox selBox">
                <h3>任务绩效</h3>
                <div className="flowBox">
                  {(taskSearch.flowContenSear.min !== "" &&
                    taskSearch.flowContenSear.max !== "") ||
                  taskSearch.flowConten !== "" ? (
                    <div className="dateBox">
                      {taskSearch.flowConten !== "" ? (
                        <div
                          className="date"
                          onClick={() => {
                            this.chooseChange("4");
                          }}
                        >
                          <span className="dateStart">未设置</span>
                        </div>
                      ) : (
                        <div
                          className="date"
                          onClick={() => {
                            this.chooseChange("4");
                          }}
                        >
                          <span className="dateStart">
                            {taskSearch.flowContenSear.min}
                          </span>
                          <span className="line">~</span>
                          <span className="dateEnd">
                            {taskSearch.flowContenSear.max}
                          </span>
                        </div>
                      )}
                      <span
                        className="close"
                        onClick={e => {
                          e.stopPropagation();
                          e.preventDefault();
                          this.clearPlanFlow("taskFlow");
                        }}
                      >
                        <Icon type="cross" />
                      </span>
                    </div>
                  ) : (
                    <p
                      className="null"
                      onClick={() => {
                        this.chooseChange("4");
                      }}
                    >
                      <span>未选绩效</span>
                      <Icon type="right" />
                    </p>
                  )}
                </div>
              </div>
              <div className="workTimeBox selBox">
                <h3>计划工期</h3>
                <div className="workBox">
                  {(taskSearch.worktimeSear.min !== "" &&
                    taskSearch.worktimeSear.max !== "") ||
                  taskSearch.planTime !== "" ? (
                    <div className="dateBox">
                      {taskSearch.planTime !== "" ? (
                        <div
                          className="date"
                          onClick={() => {
                            this.chooseChange("5");
                          }}
                        >
                          <span className="dateStart">未设置</span>
                        </div>
                      ) : (
                        <div
                          className="date"
                          onClick={() => {
                            this.chooseChange("5");
                          }}
                        >
                          <span className="dateStart">
                            {taskSearch.worktimeSear.min}
                          </span>
                          <span className="line">~</span>
                          <span className="dateEnd">
                            {taskSearch.worktimeSear.max}
                          </span>
                        </div>
                      )}
                      <span
                        className="close"
                        onClick={e => {
                          e.stopPropagation();
                          e.preventDefault();
                          this.clearPlanFlow("workTime");
                        }}
                      >
                        <Icon type="cross" />
                      </span>
                    </div>
                  ) : (
                    <p
                      className="null"
                      onClick={() => {
                        this.chooseChange("5");
                      }}
                    >
                      <span>未选工期</span>
                      <Icon type="right" />
                    </p>
                  )}
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
        {topMenu === "1" ? (
          <div className="taskSelClear">
            <div className="clearSel">清除筛选</div>
            <p>已筛选出{taskCount}条</p>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
  //菜单切换
  menuChange(menuType, type) {
    const { childMenuBar } = this.state;
    switch (menuType) {
      case "1":
        this.setState({ menuBar: type, childMenuBar: "" });
        break;
      case "2":
        if (childMenuBar === type) {
          this.setState({ childMenuBar: "" });
        } else {
          this.setState({ childMenuBar: type });
        }
        break;
    }
  }
  //返回菜单render
  menuTopRender(menuList, menuType) {
    const { menuBar, childMenuBar } = this.state;
    if (menuType === "1") {
      return (
        <div className="menuTitle">
          <ul>
            {menuList.length > 0
              ? menuList.map((item, i) => {
                  return (
                    <li
                      key={i}
                      onClick={() => {
                        this.menuChange("1", item.type);
                      }}
                    >
                      <p className={menuBar == item.type ? "pColor" : ""}>
                        {item.name}
                      </p>
                      <span
                        className={menuBar == item.type ? "menuLine" : ""}
                      />
                    </li>
                  );
                })
              : ""}
          </ul>
        </div>
      );
    } else if (menuType === "2") {
      return (
        <div className="menuTitle">
          <ul>
            {menuList.length > 0
              ? menuList.map((item, i) => {
                  return (
                    <li
                      onClick={() => {
                        this.menuChange("2", item.type);
                      }}
                      key={i}
                    >
                      <div
                        className={
                          childMenuBar == item.type
                            ? "childMenu child"
                            : "child"
                        }
                      >
                        {item.name}
                      </div>
                    </li>
                  );
                })
              : ""}
          </ul>
        </div>
      );
    }
  }

  openChange(selType) {
    const { drawerShow, taskSelDrawerShow } = this.state;
    switch (selType) {
      case "1":
        if (drawerShow) {
          this.setState({ drawerShow: false });
        } else {
          this.setState({ drawerShow: true });
        }
        break;
      case "2":
        if (taskSelDrawerShow) {
          this.setState({ taskSelDrawerShow: false, taskChooseType: "" });
        } else {
          this.setState({ taskSelDrawerShow: true });
        }
        break;
    }
  }

  //开始按
  gtouchstart(index) {
    timeOutEvent = setTimeout(() => {
      this.longPress(index);
    }, 500); //这里设置定时器，定义长按500毫秒触发长按事件
    return false;
  }
  //如果在500毫秒内就释放，则取消长按事件，此时可以执行onclick应该执行的事件
  gtouchend() {
    clearTimeout(timeOutEvent); //清除定时器
    return false;
  }
  //滑动事件
  gtouchmove() {
    clearTimeout(timeOutEvent); //清除定时器
    timeOutEvent = 0;
  }
  longPress(index) {
    timeOutEvent = 0;
    this.setState({ longMenuShow: true });
  }
  render() {
    const {
      menuBar,
      taskList,
      drawerShow,
      taskLoading,
      taskMoreLoading,
      taskNowPage,
      taskAllPage,
      taskListErrLoading,
      longMenuShow
    } = this.state;
    const { language } = this.props;
    const menuList = [
      { name: "我的待办", type: "1" },
      { name: "全部任务", type: "2" }
    ];
    const childMenuList1 = [
      { name: "待指派", type: "1" },
      { name: "待完成", type: "2" },
      { name: "待确认", type: "3" },
      { name: "逾期待办", type: "4" }
    ];
    const childMenuList2 = [
      { name: "今日新增", type: "1" },
      { name: "今日完成", type: "2" },
      { name: "我关注的", type: "3" },
      { name: "逾期任务", type: "4" }
    ];
    const data = {
      alertTxt: "当前没有任务数据哦"
    };
    const sidebarContent = this.taskSelectRender();
    return (
      <Layout language={language}>
        <div className="layout">
          <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
          <Drawer
            className="taskSel"
            position={"right"}
            open={drawerShow}
            onOpenChange={() => {
              this.openChange("1");
            }}
            sidebar={sidebarContent}
          />
          <div className="task">
            <nav>
              <div className="menuLeft">
                {this.menuTopRender(menuList, "1")}
              </div>
              <div
                className="choose"
                onClick={() => {
                  this.openChange("1");
                }}
              >
                <span>筛选</span>
                <Icon type="anticon-filter" />
              </div>
            </nav>
            <div className="topState">
              {this.menuTopRender(
                menuBar === "2" ? childMenuList2 : childMenuList1,
                "2"
              )}
            </div>
            <div
              className="content"
              onScroll={e => {
                this.scrollOnBottom(e);
              }}
              ref="taskList"
            >
              <ul>
                {taskLoading ? (
                  <Loading show={true} classStr="loading_minSize" />
                ) : (
                  ""
                )}
                {!taskLoading ? (
                  taskList && taskList.length > 0 && !taskListErrLoading ? (
                    taskList.map((item, i) => {
                      return (
                        <li
                          key={item.id}
                          onClick={() => {
                            Router.push(
                              Dingtalk.setDdNavColor(
                                "/mo_taskDetails?id=" + item.taskinfo.id
                              )
                            );
                          }}
                          onTouchStart={() => {
                            this.gtouchstart(i);
                          }}
                          onTouchMove={() => {
                            this.gtouchmove();
                          }}
                          onTouchEnd={() => {
                            this.gtouchend();
                          }}
                        >
                          {longMenuShow ? (
                            <div className="longMenu">1223321</div>
                          ) : (
                            ""
                          )}
                          <div className="taskName">
                            <font>
                              {item.taskinfo.taskinfoNumber
                                ? item.taskinfo.taskinfoNumber.numberS + "."
                                : null}
                              {item.taskinfo.rank}
                            </font>
                            <span className="textMore">
                              {item.taskinfo.taskname}
                            </span>
                            <em>
                              {utils.stateColor(
                                item.taskinfo.stateName,
                                "stateStyle"
                              )}
                            </em>
                          </div>
                          <div className="taskTimeList">
                            <div className="taskSmall textMore">
                              {menuBar === "2" ? (
                                <div className="createPerson iconCenter">
                                  <strong>
                                    <b>创</b>
                                  </strong>
                                  <span>{item.taskinfo.userResponse.name}</span>
                                </div>
                              ) : (
                                ""
                              )}
                              {menuBar === "2" ? (
                                <div className="responsePerson iconCenter">
                                  <strong>
                                    <b>责</b>
                                  </strong>
                                  <span>{item.taskinfo.userResponse.name}</span>
                                </div>
                              ) : (
                                ""
                              )}
                              {item.taskinfo && item.taskinfo.planEndTime ? (
                                <p className="iconCenter">
                                  <strong>
                                    <b>止</b>
                                  </strong>
                                  {utils.dateToString(new Date()) ===
                                  item.taskinfo.planEndTime.slice(0, 10) ? (
                                    <span>
                                      <i>今天</i>
                                      {item.taskinfo.planEndTime.slice(11, 16)}
                                    </span>
                                  ) : (
                                    <span>
                                      {item.taskinfo.planEndTime.slice(0, 10)}
                                    </span>
                                  )}
                                </p>
                              ) : (
                                ""
                              )}
                              <div className="proName myProName iconCenter">
                                <strong>
                                  <b>项</b>
                                </strong>
                                <span className="textMore">
                                  {item.project.proname}
                                </span>
                              </div>
                              <div className="taskTitle iconCenter">
                                <strong>
                                  <b>标</b>
                                </strong>
                                <span className="textMore">记得记得</span>
                              </div>
                            </div>
                            <div className="taskChildSmall">
                              <div className="collect">
                                {item.taskinfo.collect === "1" ? (
                                  <p className="iconCenter">
                                    <Icon
                                      type="anticon-shoucang1"
                                      className="start"
                                    />
                                    <span>已关注</span>
                                  </p>
                                ) : (
                                  ""
                                )}
                              </div>
                              <div className="numBox">
                                <em className="iconCenter">
                                  <Icon type="anticon-tree" />
                                  <span>{item.taskinfo.child}</span>
                                </em>
                                <font className="iconCenter">
                                  <Icon type="anticon-chat" />
                                  <span>6</span>
                                </font>
                              </div>
                            </div>
                          </div>
                        </li>
                      );
                    })
                  ) : (
                    <Friendly data={data} />
                  )
                ) : (
                  ""
                )}
              </ul>
              <div className="loading">
                {!taskMoreLoading &&
                !taskListErrLoading &&
                taskNowPage < taskAllPage ? (
                  <span>
                    <Loading show={true} classStr="loading_minSize" />
                    下拉加载更多
                  </span>
                ) : (
                  ""
                )}
                {taskMoreLoading && !taskListErrLoading ? (
                  <span>
                    <Loading show={true} classStr="loading_minSize" />
                    正在加载更多
                  </span>
                ) : (
                  ""
                )}
                {!taskMoreLoading &&
                taskNowPage == taskAllPage &&
                !taskListErrLoading ? (
                  <span>已经到底喽</span>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="createTask">
              <Icon
                type="anticon-add"
                onClick={() => {
                  Router.push(Dingtalk.setDdNavColor("/mo_taskCreate"));
                }}
              />
            </div>
          </div>
          <div className="menuBox">
            <MenuBar pathName="/mo_taskNew" />
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
export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(task);
