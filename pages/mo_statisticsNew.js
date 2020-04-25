import React, { Component, PureComponent } from "react";
import withRedux from "next-redux-wrapper";
import Router from "next/router";
import {
  Icon,
  Popover,
  Modal,
  List,
  DatePickerView,
  Button,
  Toast,
  Drawer,
  SearchBar
} from "antd-mobile";
import { bindActionCreators } from "redux";
// import Pie from "../components/common/Echarts/Pie";
import Pie from "../components/statistics/pie.js";
import G1 from "../components/statistics/test.js";
import { initStore } from "../store";
import stylesheet from "styles/pages/statistics.scss";
import Layout from "../components/Layout";
import * as statisticsAction from "../actions/statistics";
import Loading from "../components/Loading";
import MenuBar from "../components/MenuBar";
import mobileStyle from "antd-mobile/dist/antd-mobile.min.css";
import _ from "lodash";
import Dingtalk from "../utils/dingtalk";

const Item = Popover.Item;

class Statistics extends Component {
  static getInitialProps({ req, store, isServer }) {
    const language = req ? req.headers["accept-language"] : navigator.language;
    return {
      language
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      visible: false,
      selected: "task",
      monthVisible: false,
      monthSelectd: "nowMonth",
      attdate01: new Date("2016-1-1"),
      attdate02: new Date("2016-1-1"),
      timeVisible: false,
      open: false,
      projectType: 1,
      value: undefined,
      projectIds: [],
      projectList: [],
      projectLoading: true,
      timeline: "",
      maskType: ""
    };
  }

  componentDidMount() {
    const {
      pieData,
      penPerson,
      taskNumsPerson,
      performType,
      monthType,
      projectType,
      projectList,
      projectIds,
      nowProjectIds
    } = this.props;
    Dingtalk.setTitle("统计");
    Dingtalk.setMenuHome();
    // if (!(this.props && this.props.urlData)) {
    // 	this.props.setUrlData(
    // 		encodeURIComponent(location.href.split("#")[0])
    // 	);
    // }
    if (!pieData && !penPerson.taskPendList && !taskNumsPerson.taskNumList) {
      this.initPage();
    } else {
      this.setState(
        {
          selected: performType,
          monthSelectd: monthType.type,
          attdate01: monthType.value ? monthType.value.attdate01 : "",
          attdate02: monthType.value ? monthType.value.attdate02 : "",
          timeline: monthType.value ? monthType.value.timeline : "",
          loading: false,
          projectType: projectType,
          projectIds,
          projectList,
          nowProjectIds: projectIds
        },
        () => {
          this.setBarChartPosition("personPending");
          if (performType == "task") {
            this.setBarChartPosition("personPerform");
          } else {
            this.setBarChartPosition("projectPerform");
          }
        }
      );
    }
    const _this = this;

    document.getElementById("statistics").addEventListener(
      "touchstart",
      e => {
        _this.hideShowData(e);
      },
      false
    );
    document.addEventListener(
      "scroll",
      e => {
        _this.hideShowData(e);
      },
      false
    );
  }

  hideShowData = e => {
    const name = e.target.className;
    const names = [
      "going",
      "confirmed",
      "unassigned",
      "cj",
      "wcrw",
      "item",
      "bar-title",
      "item clearfloat",
      "hoverStyle",
      "hoverStyleSec"
    ];

    if (!(names.indexOf(name) > -1) && name != "") {
      this.setState({ mousePos: null, showData: null });
      return;
    }
  };

  componentWillUnmount() {
    const _this = this;
    document
      .getElementById("statistics")
      .removeEventListener("touchstart", e => {
        _this.hideShowData(e);
      });
    document.removeEventListener(
      "scroll",
      e => {
        _this.hideShowData(e);
      },
      false
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.penPerson && nextProps.penPerson.taskPendList) {
      this.setState({ loading: false }, () => {
        this.setBarChartPosition("personPending");
      });
    }
    if (nextProps.taskNumsPerson && nextProps.taskNumsPerson.tasContentList) {
      this.setState({ loading: false }, () => {
        this.setBarChartPosition("personPerform");
      });
    }
    if (nextProps.taskNumsProject && nextProps.taskNumsProject.taskNumList) {
      this.setState({ loading: false }, () => {
        this.setBarChartPosition("projectPerform");
      });
    }
    if (nextProps.projectIds) {
      this.setState({ nowProjectIds: nextProps.projectIds });
    }
  }

  handleCompute = () => {
    const { projectIds, projectList, projectType } = this.state;
    const {
      getPieChartData,
      getPendStatisticsData,
      saveProjectResult
    } = this.props;
    if (projectIds.length > 0) {
      getPieChartData({ projectIds });
      getPendStatisticsData({ projectIds });
      this.selectPerformData();
      saveProjectResult({
        projectIds,
        projectList,
        projectType
      });
      this.setState({ open: false });
    } else {
      Toast.info("请选择项目后计算");
    }
  };

  initPage = () => {
    const {
      getPieChartData,
      getPendStatisticsData,
      getProjectResult,
      saveProjectResult
    } = this.props;
    const { projectType } = this.state;
    getProjectResult({ type: projectType, labelId: [] }, projectList => {
      const projectIds = [];
      const nowProjectIds = [];
      projectList &&
        projectList.forEach(item => {
          projectIds.push(item.id);
          nowProjectIds.push(item.id);
        });
      this.setState(
        {
          projectIds,
          projectList,
          nowProjectIds: nowProjectIds
        },
        () => {
          getPieChartData({ projectIds });
          getPendStatisticsData({
            projectIds
          });
          this.selectPerformData();
          saveProjectResult({
            projectIds,
            projectList,
            projectType
          });
        }
      );
    });
  };

  onOpenChange = () => {
    this.setState({ open: !this.state.open });
  };

  renderDrawer = () => {
    const { open } = this.state;
    return (
      open && (
        <Drawer
          className="my-drawer"
          style={{
            minHeight: document.documentElement.clientHeight
          }}
          enableDragHandle
          contentStyle={{
            color: "#A6A6A6",
            textAlign: "center",
            paddingTop: 42
          }}
          position={"right"}
          sidebar={this.renderProjectList()}
          open={open}
          onOpenChange={this.onOpenChange}
        >
          <div />
        </Drawer>
      )
    );
  };

  onSearchChange = value => {
    this.setState({ value });
  };

  clear = () => {
    this.setState({ value: undefined });
  };

  handleProjectList = id => {
    let { projectIds } = this.state;
    const index = projectIds.indexOf(id);
    if (index > -1) {
      projectIds.splice(index, 1);
    } else {
      projectIds.push(id);
    }
    this.setState({ projectIds });
  };

  handleSelectAll = () => {
    const projectIds = [];
    let { projectList } = this.state;
    if (projectList && projectList.length > 0) {
      projectList.forEach(item => {
        projectIds.push(item.id);
      });
    }
    this.setState({ projectIds });
  };

  handleSelectReverse = () => {
    let { projectIds, projectList } = this.state;
    let newProjectIds = [];
    if (projectList && projectList.length > 0) {
      projectList.forEach(item => {
        if (!(projectIds.indexOf(item.id) > -1)) {
          newProjectIds.push(item.id);
        }
      });
    }
    this.setState({ projectIds: newProjectIds });
  };

  handleChangeProjectType = index => {
    this.setState({ projectType: index });
    statisticsAction.getProjectList({ type: index, labelId: [] }, data => {
      const projectIds = [];
      data &&
        data.forEach(item => {
          projectIds.push(item.id);
        });
      this.setState({
        projectList: data,
        projectIds
      });
    });
  };

  renderProjectList = () => {
    const { projectType, projectIds, value, projectList } = this.state;

    return (
      <div className="project-wrap">
        <div className="head">
          <div className="title">选择项目</div>
          <ul className="tap-list">
            <li
              className={projectType == 0 ? "active" : ""}
              onClick={() => {
                this.handleChangeProjectType(0);
              }}
            >
              全部
            </li>
            <li
              className={projectType == 1 ? "active" : ""}
              onClick={() => {
                this.handleChangeProjectType(1);
              }}
            >
              我参与
            </li>
            <li
              className={projectType == 2 ? "active" : ""}
              onClick={() => {
                this.handleChangeProjectType(2);
              }}
            >
              我负责
            </li>
            <li
              className={projectType == 3 ? "active" : ""}
              onClick={() => {
                this.handleChangeProjectType(3);
              }}
            >
              我关注
            </li>
          </ul>
          <div className="search">
            <SearchBar
              value={value}
              placeholder="输入搜索"
              onClear={value =>
                this.setState({
                  value: undefined
                })
              }
              showCancelButton={false}
              onChange={this.onSearchChange}
            />
          </div>
        </div>
        <ul className="project-list">
          {projectList &&
            projectList.map((item, index) => {
              const className =
                projectIds.indexOf(item.id) > -1 ? "active" : "";

              if (!value || item.proName.indexOf(value) !== -1) {
                return (
                  <li
                    className={className}
                    onClick={() => {
                      this.handleProjectList(item.id);
                    }}
                    key={item.id}
                  >
                    {item.proName}
                    <Icon type="anticon-check-s" />
                  </li>
                );
              }
            })}
        </ul>
        <div className="btn-wrap">
          <a className="all" onClick={this.handleSelectAll}>
            全选
          </a>
          <a className="none" onClick={this.handleSelectReverse}>
            反选
          </a>
          <a className="compute" onClick={this.handleCompute}>
            计算
          </a>
        </div>
      </div>
    );
  };

  selectPerformData = () => {
    let {
      attdate01,
      attdate02,
      selected,
      monthSelectd,
      projectIds
    } = this.state;

    const type =
      monthSelectd != "time" ? (monthSelectd == "nowMonth" ? 0 : 1) : "";
    if (monthSelectd != "time") {
      attdate01 = "";
      attdate02 = "";
      this.props.saveMonthType({
        type: monthSelectd
      });
    } else {
      this.props.saveMonthType({
        type: "time",
        value: {
          attdate01,
          attdate02,
          timeline: `${this.dateFtt(attdate01)}~${this.dateFtt(attdate02)}`
        }
      });
    }
    attdate01 = _.isDate(attdate01) ? this.dateFtt(attdate01) : "";
    attdate02 = _.isDate(attdate02) ? this.dateFtt(attdate02) : "";
    if (selected == "task") {
      this.props.getNumByPersonData({
        type,
        attdate01,
        attdate02,
        projectIds
      });
    } else {
      this.props.getNumByProjectData({
        type,
        attdate01,
        attdate02,
        projectIds
      });
    }
  };

  onSelect = opt => {
    this.setState(
      {
        visible: false,
        selected: opt.props.value
      },
      () => {
        this.props.savePerformType(opt.props.value);
        this.selectPerformData();
      }
    );
  };

  handleMonthSelect = opt => {
    const { selected, monthSelectd } = this.state;
    if (opt.props.value == "time") {
      this.setState({
        timeVisible: true,
        monthVisible: false
      });
      return;
    }

    this.setState(
      {
        monthVisible: false,
        monthSelectd: opt.props.value
      },
      () => {
        this.selectPerformData();
      }
    );
  };

  monthVisibleChange = visible => {
    this.setState({
      monthVisible: visible
    });
  };

  setBarChartPosition = id => {
    const personPending = document.getElementById(id);
    if (personPending) {
      personPending.style.left =
        (personPending.clientHeight - personPending.clientWidth) / 2 + 5 + "px";
      personPending.style.top =
        (personPending.clientHeight - personPending.clientWidth) / 2 - 6 + "px";
    }
  };

  renderPendingBarChat = (data, typeName = "name") => {
    if (!data[0]) {
      return false;
    }
    const total = data[0].daizp + data[0].jinxz + data[0].daiqr;
    const barChatData = data.map(item => {
      return {
        title: item[typeName],
        unassigned: item.daizp,
        assignPercent: (item.daizp / total) * 100 + "%",
        going: item.jinxz,
        goingPercent: (item.jinxz / total) * 100 + "%",
        confirmed: item.daiqr,
        confirmedPercent: (item.daiqr / total) * 100 + "%",
        overduegoing: item.jxzyq,
        overdueconfirmed: item.dqryq,
        overdueunassigned: item.dzpyq
      };
    });

    return (
      <div className="barChat" id="personPending">
        {barChatData.map((item, index) => {
          if (index > 8) {
            return false;
          }
          return (
            <div
              className="item clearfloat"
              key={index}
              // onMouseOut={this.handleMouseOut.bind(this)}
              onClick={this.handleMouseOver.bind(this, item, 1)}
            >
              <div className="bar-title">{item.title}</div>
              <div
                className="unassigned"
                style={{
                  width: item.assignPercent
                }}
              />
              <div
                className="going"
                style={{
                  width: item.goingPercent
                }}
              />
              <div
                className="confirmed"
                style={{
                  width: item.confirmedPercent
                }}
              />
            </div>
          );
        })}
      </div>
    );
  };

  renderPerformBarChat = (data, typeName = "name") => {
    const { selected } = this.state;
    if (!data[0]) {
      return false;
    }
    const total = data[0].cjrw + data[0].zprw + data[0].qrrw + data[0].wcrw;
    const barChatData = data.map(item => {
      if (total === 0) {
        return {
          title: item[typeName],
          cjrw: item.cjrw,
          cjrwPercent: "0%",
          zprw: item.zprw,
          zprwPercent: "0%",
          qrrw: item.qrrw,
          qrrwPercent: "0%",
          wcrw: item.wcrw,
          wcrwPercent: "0%",
          yqwc: 0,
          yqqr: 0,
          yqzp: 0
        };
      }
      return {
        title: item[typeName],
        cjrw: item.cjrw,
        cjrwPercent: (item.cjrw / total) * 100 + "%",
        zprw: item.zprw,
        zprwPercent: (item.zprw / total) * 100 + "%",
        qrrw: item.qrrw,
        qrrwPercent: (item.qrrw / total) * 100 + "%",
        wcrw: item.wcrw,
        wcrwPercent: (item.wcrw / total) * 100 + "%",
        yqqr: item.yqqr,
        yqzp: item.yqzp,
        yqwc: item.yqwc
      };
    });

    return (
      <div
        className="barChat"
        id={selected == "task" ? "personPerform" : "projectPerform"}
      >
        {barChatData.map((item, index) => {
          if (index > 8) {
            return false;
            l;
          }
          return (
            <div
              className="item clearfloat"
              key={index}
              // onMouseOut={this.handleMouseOut.bind(this)}
              onClick={this.handleMouseOver.bind(this, item, 2)}
            >
              <div className="bar-title">{item.title}</div>
              <div
                className="cj"
                style={{
                  width: item.cjrwPercent
                }}
              />
              <div
                className="unassigned"
                style={{
                  width: item.zprwPercent
                }}
              />
              <div
                className="confirmed"
                style={{
                  width: item.qrrwPercent
                }}
              />
              <div
                className="wcrw"
                style={{
                  width: item.wcrwPercent
                }}
              />
            </div>
          );
        })}
      </div>
    );
  };

  renderPerformValueBarChat = (data, typeName = "name") => {
    const { selected } = this.state;
    if (!data[0]) {
      return false;
    }
    const total =
      data[0].cjrwjx + data[0].qrrwjx + data[0].wcrwjx + data[0].zprwjx;

    const barChatData = data.map(item => {
      if (total === 0) {
        return {
          title: item[typeName],
          cjrw: item.cjrwjx,
          cjrwPercent: "0%",
          zprw: item.zprwjx,
          zprwPercent: "0%",
          qrrw: item.qrrwjx,
          qrrwPercent: "0%",
          wcrw: item.wcrwjx,
          wcrwPercent: "0%",
          yqwcjx: 0,
          yqqrjx: 0,
          yqzpjx: 0
        };
      }
      return {
        title: item[typeName],
        cjrw: item.cjrwjx,
        cjrwPercent: (item.cjrwjx / total) * 100 + "%",
        zprw: item.zprwjx,
        zprwPercent: (item.zprwjx / total) * 100 + "%",
        qrrw: item.qrrwjx,
        qrrwPercent: (item.qrrwjx / total) * 100 + "%",
        wcrw: item.wcrwjx,
        wcrwPercent: (item.wcrwjx / total) * 100 + "%",
        yqwcjx: item.yqwcjx,
        yqqrjx: item.yqqrjx,
        yqzpjx: item.yqzpjx
      };
    });

    //     console.log(barChatData, "barChatData");

    return (
      <div
        className="barChat"
        id={selected == "task" ? "personPerform" : "projectPerform"}
      >
        {barChatData.map((item, index) => {
          if (index > 8) {
            return false;
            l;
          }
          return (
            <div
              className="item clearfloat"
              key={index}
              // onMouseOut={this.handleMouseOut.bind(this)}
              onClick={this.handleMouseOver.bind(this, item, 2)}
            >
              <div className="bar-title">{item.title}</div>
              <div
                className="cj"
                style={{
                  width: item.cjrwPercent
                }}
              />
              <div
                className="unassigned"
                style={{
                  width: item.zprwPercent
                }}
              />
              <div
                className="confirmed"
                style={{
                  width: item.qrrwPercent
                }}
              />
              <div
                className="wcrw"
                style={{
                  width: item.wcrwPercent
                }}
              />
            </div>
          );
        })}
      </div>
    );
  };

  renderHead = () => {
    const { nowProjectIds } = this.state;
    return (
      <div className="head">
        统计项目数：
        {nowProjectIds ? nowProjectIds.length : 0}
        <a onClick={this.onOpenChange}>
          筛选
          <Icon type="anticon-shaixuan" />
        </a>
      </div>
    );
  };

  dateFtt = val => {
    val = new Date(val);
    return val.getFullYear() + "-" + (val.getMonth() + 1) + "-" + val.getDate();
  };

  onChange = value => {
    this.setState({ attdate01: value });
  };

  onChange2 = value => {
    this.setState({ attdate02: value });
  };

  onClose = () => {
    this.setState({ timeVisible: false });
  };

  handleSelect = () => {
    const { attdate01, attdate02, monthSelectd } = this.state;
    if (!attdate01 || !attdate02) {
      Toast.info("请选择时间", 1);
      return;
    }

    if (attdate02 <= attdate01) {
      Toast.info("结束时间不能小于开始时间", 1.5);
      return;
    }
    const timeline =
      attdate01 && attdate02
        ? `${this.dateFtt(attdate01)}~${this.dateFtt(attdate02)}`
        : "";
    this.setState({ monthSelectd: "time", timeline }, () => {
      this.selectPerformData();
    });
    this.onClose();
  };

  renderTimeSelect = () => {
    const { timeVisible, attdate01, attdate02 } = this.state;
    return (
      <Modal
        popup
        visible={timeVisible}
        onClose={() => {
          this.setState({ timeVisible: false });
        }}
        animationType="slide-up"
      >
        <List
          renderHeader={() => (
            <div className="clearfloat">
              <Button
                size="small"
                style={{
                  float: "left",
                  width: 80,
                  position: "relative",
                  bottom: 4
                }}
                onClick={() => {
                  this.onClose();
                }}
              >
                取消
              </Button>
              <span>选择时间段</span>
              <Button
                size="small"
                type="primary"
                style={{
                  float: "right",
                  width: 80,
                  position: "relative",
                  bottom: 4
                }}
                onClick={this.handleSelect}
              >
                确定
              </Button>
            </div>
          )}
          className="popup-list"
        >
          <List.Item>
            <DatePickerView
              mode="date"
              value={attdate01}
              minDate={new Date("2016/1/1")}
              onChange={this.onChange}
            />
          </List.Item>
          <List.Item>
            <DatePickerView
              mode="date"
              value={attdate02}
              minDate={new Date("2016/1/1")}
              onChange={this.onChange2}
            />
          </List.Item>
        </List>
      </Modal>
    );
  };

  handleVisibleChange = visible => {
    const mask = document.getElementsByClassName(".am-popover-mask")[0];
    if (visible) {
      // 遮罩层绑定事件，阻止冒泡
      if (mask) {
        mask.addEventListener(
          "click touchstart",
          function(event) {
            event.stopPropagation();
          },
          false
        );
      }
    } else {
      // 注意解绑事件
      if (mask) {
        mask.removeEventListener(
          "click touchstart",
          function(event) {
            event.stopPropagation();
          },
          false
        );
      }
    }
    this.setState({
      visible
    });
  };

  renderPerform = () => {
    const {
      selected,
      visible,
      monthVisible,
      monthSelectd,
      attdate01,
      attdate02,
      timeline
    } = this.state;

    const mothObj = {
      nowMonth: "本月",
      lastMoth: "上月",
      time: "自定义"
    };
    console.log(selected, "selected");

    const monthArr = ["nowMonth", "lastMoth", "time"];
    const { taskNumsProject, taskNumsPerson } = this.props;

    const value = selected == "task" ? "perform" : "task";
    return (
      <div className="box">
        <div className="title">
          {selected == "task" ? "人员绩效" : "人员绩效"}
          <a
            className="table-btn"
            onClick={() => {
              this.showData("type3");
            }}
          >
            <Icon type="anticon-table" />
          </a>
          <Popover
            mask
            overlayClassName="fortest"
            overlayStyle={{
              color: "currentColor"
            }}
            visible={visible}
            overlay={[
              <Item key="2" value={value} data-seed="logId">
                {selected != "task" ? "绩效值" : "任务数"}
              </Item>
            ]}
            align={{
              overflow: {
                adjustY: 0,
                adjustX: 0
              },
              offset: [-10, 0]
            }}
            onVisibleChange={() => {
              this.handleVisibleChange(visible);
            }}
            onSelect={this.onSelect}
          >
            <a className="per-btn">
              {selected == "task" ? "绩效值" : "任务数"}
              <Icon type="anticon-down" />
            </a>
          </Popover>
          <Popover
            mask
            overlayClassName="fortest"
            overlayStyle={{
              color: "currentColor"
            }}
            visible={monthVisible}
            onVisibleChange={() => {
              this.handleVisibleChange(monthVisible);
            }}
            overlay={monthArr.map((item, index) => {
              if (monthSelectd == item && item != "time") {
                return false;
              }
              return (
                <Item key={index + 6} value={item} data-seed={`mothId${index}`}>
                  {mothObj[item]}
                </Item>
              );
            })}
            align={{
              overflow: {
                adjustY: 0,
                adjustX: 0
              },
              offset: [-10, 0]
            }}
            onVisibleChange={this.monthVisibleChange}
            onSelect={this.handleMonthSelect}
          >
            <a className="month">
              {monthSelectd != "time" ? mothObj[monthSelectd] : timeline}
              <Icon type="anticon-down" />
            </a>
          </Popover>
        </div>
        {selected == "task" ? (
          taskNumsPerson &&
          taskNumsPerson.tasContentList &&
          taskNumsPerson.tasContentList.length > 0 ? (
            this.renderPerformValueBarChat(
              taskNumsPerson.tasContentList,
              "name"
            )
          ) : (
            <div className="nodata">暂无数据</div>
          )
        ) : taskNumsProject && taskNumsProject.taskNumList ? (
          this.renderPerformBarChat(taskNumsProject.taskNumList, "name")
        ) : (
          <div className="nodata">暂无数据</div>
        )}
      </div>
    );
  };

  showData = param => {
    const {
      projectIds,
      monthSelectd,
      selected,
      attdate01,
      attdate02
    } = this.state;

    sessionStorage.setItem("projectIds", JSON.stringify(projectIds));
    let url = `/mo_showData?type=${param}`,
      value1 = "",
      value2 = "";
    if (param == "type3") {
      if (monthSelectd != "time") {
        value1 = "";
        value2 = "";
      } else {
        value1 = this.dateFtt(attdate01);
        value2 = this.dateFtt(attdate02);
      }
      url = `/mo_showData?type=${param}&&selected=${selected}&&attdate01=${value1}&&attdate02=${value2}&&monthSelectd=${monthSelectd}`;
    }
    Router.push(url);
  };
  // handleMouseOverMask = ev => {
  //   let mousePos = this.mousePosition(ev);
  //   const clientWidth = document.body.clientWidth;
  //   const clientHeight = document.body.clientHeight;
  //   if (clientWidth - mousePos.x < 230) {
  //     mousePos.x = mousePos.x - (260 - (clientWidth - mousePos.x));
  //   }
  //   if (clientHeight - mousePos.y < 200) {
  //     mousePos.y = mousePos.y - (200 - (clientHeight - mousePos.y));
  //   }
  //   this.setState({ mousePos });
  // };
  handleMouseOver(item, maskType, ev) {
    var oEvent = ev || event;
    var reltg = oEvent.fromElement || oEvent.relatedTarget;
    const name = oEvent.target.className;
    const names = [
      "going",
      "confirmed",
      "unassigned",
      "cj",
      "wcrw",
      "item",
      "bar-title",
      "item clearfloat"
    ];

    if (!(names.indexOf(name) > -1)) {
      this.setState({ mousePos: null, showData: null });
      return;
    }

    //其中oEvent.fromElement兼容IE，chrome
    //oEvent.relatedTarget;兼容FF。
    if (reltg && !reltg.isEqualNode(ev.target)) {
      reltg = reltg.parentNode;
    }
    if (!(reltg && reltg.isEqualNode(ev.target))) {
      // 这里可以编写 onmouseenter 事件的处理代码
      if (this.timer != null) {
        clearTimeout(this.timer);
      }

      let mousePos = this.mousePosition(ev);
      const clientWidth = document.body.clientWidth;
      const clientHeight = document.body.clientHeight;
      if (clientWidth - mousePos.x < 260) {
        mousePos.x = mousePos.x - (260 - (clientWidth - mousePos.x));
        mousePos.y = mousePos.y - 160;
      }
      if (clientHeight - mousePos.y < 200) {
        mousePos.y = mousePos.y - (200 - (clientHeight - mousePos.y));
      }
      this.setState({ mousePos });
      if (maskType === 1) {
        this.setState({
          maskType: 1,

          showData: {
            showName: item.title,
            zhipai: item.unassigned,
            queren: item.confirmed,
            wancheng: item.going,
            yqzhipai: item.overdueunassigned,
            yqqueren: item.overdueconfirmed,
            yqwancheng: item.overduegoing
          }
        });
      } else if (maskType === 2) {
        this.setState({
          maskType: 2,
          showData: {
            showName: item.title,
            zhipai: item.zprw,
            queren: item.qrrw,
            wancheng: item.wcrw,
            yqzhipai: item.yqzp,
            yqqueren: item.yqqr,
            yqwancheng: item.yqwc,
            chuangjian: item.cjrw
          }
        });
      } else if (maskType === 3) {
        this.setState({
          maskType: 2,
          showData: {
            showName: item.title,
            zhipai: item.zprw,
            queren: item.qrrw,
            wancheng: item.wcrw,
            yqzhipai: item.yqzpjx,
            yqqueren: item.yqqrjx,
            yqwancheng: item.yqwcjx,
            chuangjian: item.cjrw
          }
        });
      }
      this.timer = null;
    }
  }

  mousePosition = ev => {
    ev = ev || window.event;
    if (ev.pageX || ev.pageY) {
      return { x: ev.pageX, y: ev.pageY };
    }
    return {
      x: ev.clientX + document.body.scrollLeft - document.body.clientLeft,
      y: ev.clientY + document.body.scrollTop - document.body.clientTop
    };
  };
  render() {
    const {
      language,
      pieData,
      //       penProject,
      penPerson,
      taskNumsProject,
      taskNumsPerson
    } = this.props;
    const {
      loading,
      visible,
      selected,
      projectIds,
      maskType,
      mousePos,
      showData
    } = this.state;

    const legendData = [
      {
        name: "已完成",
        value: pieData && pieData.yiwc,
        itemStyle: {
          color: "#b0bec5",
          opacity: 0.52
        },
        key: pieData && pieData.ywcyq,
        key1: pieData && pieData.tqwc
      },
      {
        name: "进行中",
        value: pieData && pieData.jinxz,
        itemStyle: {
          color: "#A5d6A7",
          opacity: 0.52
        },
        key: pieData && pieData.jxzyq
      },
      {
        name: "待确认",
        value: pieData && pieData.daiqr,
        itemStyle: {
          color: "#81d4fa",
          opacity: 0.52
        },
        key: pieData && pieData.dqryq
      },
      {
        name: "未指派",
        value: pieData && pieData.daizp,
        itemStyle: {
          color: "#CE93D8",
          opacity: 0.52
        },
        key: pieData && pieData.dzpyq
      },
      {
        name: "已终止",
        value: pieData && pieData.yizz,
        itemStyle: {
          color: "#eeeeee",
          opacity: 0.52
        }
      }
    ];
    return (
      <Layout language={language}>
        <div className="pubLayout">
          {this.renderDrawer()}
          <div className="statistics" id="statistics">
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
            {this.renderHead()}
            {this.renderTimeSelect()}
            {loading ? (
              <Loading show={loading} />
            ) : (
              <div>
                <div className="box">
                  <div className="title">
                    任务分布
                    <a
                      onClick={() => {
                        this.showData("type1");
                      }}
                    >
                      <Icon type="anticon-table" />
                    </a>
                  </div>
                  {!_.isEmpty(pieData) ? (
                    <div id="taskChart">
                      <Pie data={legendData} />
                    </div>
                  ) : (
                    <div className="nodata">暂无数据</div>
                  )}
                </div>

                {maskType === 1 ? (
                  <div
                    style={
                      mousePos
                        ? {
                            position: "absolute",
                            left: mousePos.x + 60,
                            top: mousePos.y - 80,
                            zIndex: 999
                          }
                        : {
                            display: "none"
                          }
                    }
                    className="hoverStyle"
                  >
                    <div
                      style={{
                        position: "relative",
                        top: 10,
                        left: 10
                      }}
                    >
                      {showData && showData.showName}
                    </div>
                    <div>
                      <span className="yuandian1" />
                      待指派：
                      {showData && showData.zhipai}
                    </div>
                    <span>逾期</span>：{showData && showData.yqzhipai}
                    <div>
                      <span className="yuandian2" />
                      待完成：
                      {showData && showData.wancheng}
                    </div>
                    <span>逾期</span>：{showData && showData.yqwancheng}
                    <div>
                      <span className="yuandian3" />
                      待确认：
                      {showData && showData.queren}
                    </div>
                    <span>逾期</span>：{showData && showData.yqqueren}
                  </div>
                ) : (
                  <div
                    // onTouchStart={event => event.preventDefault()}
                    style={
                      mousePos
                        ? {
                            position: "absolute",
                            left: mousePos.x + 60,
                            top: mousePos.y - 80,
                            zIndex: 999,
                            height: 185
                          }
                        : {
                            display: "none"
                          }
                    }
                    className="hoverStyleSec"
                  >
                    <div
                      style={{
                        position: "relative",
                        top: 10,
                        left: 10
                      }}
                    >
                      {showData && showData.showName}
                    </div>
                    <div>
                      <span className="yuandian1" />
                      创建：
                      {showData && showData.chuangjian}
                    </div>
                    <div>
                      <span className="yuandian2" />
                      指派：
                      {showData && showData.zhipai}
                    </div>
                    <span>逾期</span>：{(showData && showData.yqzhipai) || 0}
                    <div>
                      <span className="yuandian3" />
                      确认：
                      {showData && showData.queren}
                    </div>
                    <span>逾期</span>：{(showData && showData.yqqueren) || 0}
                    <div>
                      <span className="yuandian4" />
                      完成：
                      {showData && showData.wancheng}
                    </div>
                    <span>逾期</span>：{(showData && showData.yqwancheng) || 0}
                  </div>
                )}
                <div className="box">
                  <div className="title">
                    人员待办
                    <a
                      onClick={() => {
                        this.showData("type2");
                      }}
                    >
                      <Icon type="anticon-table" />
                    </a>
                  </div>
                  {penPerson && penPerson.taskPendList ? (
                    this.renderPendingBarChat(penPerson.taskPendList)
                  ) : (
                    <div className="nodata">暂无数据</div>
                  )}
                </div>
                {this.renderPerform()}
              </div>
            )}
            <div className="menuBox">
              <MenuBar pathName="/mo_statistics" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}
function mapStateToProps(state) {
  return {
    pieData: state.statistics.pieData,
    //     penProject: state.statistics.penProject,
    penPerson: state.statistics.penPerson,
    taskNumsProject: state.statistics.taskNumsProject,
    taskNumsPerson: state.statistics.taskNumsPerson,
    performType: state.statistics.performType,
    monthType: state.statistics.monthType,
    projectList: state.statistics.projectList,
    projectType: state.statistics.projectType,
    projectIds: state.statistics.projectIds
  };
}
const mapDispatchToProps = dispatch => {
  return {
    getPieChartData: bindActionCreators(
      statisticsAction.getTaskDistributedByState,
      dispatch
    ),
    getPendStatisticsData: bindActionCreators(
      statisticsAction.getPendStatistics,
      dispatch
    ),
    //     getPendByProjectData: bindActionCreators(
    //       statisticsAction.getPendByProject,
    //       dispatch
    //     ),
    getNumByProjectData: bindActionCreators(
      statisticsAction.getNumByProject,
      dispatch
    ),
    getNumByPersonData: bindActionCreators(
      statisticsAction.getNumByPerson,
      dispatch
    ),
    saveMonthType: bindActionCreators(statisticsAction.saveMonthType, dispatch),
    savePerformType: bindActionCreators(
      statisticsAction.savePerformType,
      dispatch
    ),
    getProjectResult: bindActionCreators(
      statisticsAction.getProjectResult,
      dispatch
    ),

    saveProjectResult: bindActionCreators(
      statisticsAction.saveProjectResult,
      dispatch
    )
  };
};
export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(
  Statistics
);
