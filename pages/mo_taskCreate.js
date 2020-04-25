import React, { Component } from "react";
import { bindActionCreators } from "redux";
import withRedux from "next-redux-wrapper";
import {
  Icon,
  TextareaItem,
  DatePicker,
  Picker,
  Toast,
  List
} from "antd-mobile";
import Alert from "../components/alert";
import mobileStyle from "antd-mobile/dist/antd-mobile.min.css";

import Router from "next/router";
import ContentEditable from "react-contenteditable";
import moment from "moment";

import { initStore } from "../store";
import stylesheet from "styles/pages/taskCreate.scss";
import Layout from "../components/Layout";
import Loading from "../components/Loading";
import TagSelect from "../components/Tag";
import * as taskAction from "../actions/task";
import * as cacheAction from "../actions/cache";
import * as userAction from "../actions/user";
import * as projectAction from "../actions/project";
import utils from "../utils/utils";
import Dingtalk from "../utils/dingtalk";
import Storage from "../utils/storage";
import ProjectSelect from "../components/ProjectSelect";

class taskCreate extends Component {
  static getInitialProps({ req, store, isServer }) {
    const language = req ? req.headers["accept-language"] : navigator.language;
    return {
      language
    };
  }
  constructor(props) {
    super(props);
    this.state = {
      selectedPro: {
        id: "",
        name: ""
      },
      parentId: "",
      priorityList: [],
      priorityLoading: false,
      repeatAlertShow: false,
      taskInfo: {
        id: "",
        taskname: "",
        description: "", // 任务描述
        userResponse: {},
        planEndTimeString: "",
        userFlow: {},
        flowConten: "",
        coefficienttype: "",
        workTime: "1",
        labels: [],
        mobileFile: [], // 描述文件
        category: "1",
        repeatObj: null
      },
      taskCreateLoading: false,
      titleLength: 0,

      tagSeling: false,
      isChild: false,
      taskCreateBread: [],
      backUrl: "/mo_task",

      projectSelectShow: false,
      desboolen: true,
      taskPlanDate: "",
      taskPlanTime: "",
      repeatObj: null,
      isrepeat: false,
      repeatType: 1
    };
  }

  componentWillMount() {
    //console.log(this.props.url);
    // 选中的项目
    if (this.props.url.query.selectedProId) {
      let id = this.props.url.query.selectedProId;
      let name = this.props.url.query.selectedProName;
      this.setState({ selectedPro: { id: id, name: name } });
    }

    if (this.props.url.query.isChild == "true") {
      Dingtalk.setTitle("创建子任务");
    } else {
      Dingtalk.setTitle("创建任务");
    }

    Dingtalk.setMenuHome();
    // 记录输入的值
    if (this.props.taskCreateVals && this.props.url.query.newTask != "true") {
      let taskInfo = {
        id: this.props.taskCreateVals.id,
        taskname: this.props.taskCreateVals.taskname,
        description: this.props.taskCreateVals.description,
        userResponse: this.props.taskCreateVals.userResponse,
        planEndTimeString: this.props.taskCreateVals.planEndTimeString,
        userFlow: this.props.taskCreateVals.userFlow,
        flowConten: this.props.taskCreateVals.flowConten,
        coefficienttype: this.props.taskCreateVals.coefficienttype,
        workTime: this.props.taskCreateVals.workTime,
        labels: this.props.taskCreateVals.labels,
        mobileFile: this.props.taskCreateVals.mobileFile,
        category: this.props.taskCreateVals.category,
        repeatObj:
          this.props.taskCreateVals && this.props.url.query.repeatType
            ? this.props.taskCreateVals.repeatObj
            : null
      };
      this.setState({
        repeatObj: this.props.url.query.repeatType
          ? this.props.taskCreateVals && this.props.taskCreateVals.repeatObj
          : null,
        taskInfo: taskInfo
      });
      //console.log("taskINfo", taskInfo);
      // this.setState({ taskInfo: taskInfo });
    }

    // 是否是创建子任务
    if (this.props.url.query.isChild) {
      this.setState({ isChild: true });
    }
    // 是否是创建子任务
    if (this.props.url.query.isChild) {
      this.setState({ isChild: true });
    }

    // 重复任务类型
    if (this.props.url.query.isrepeat && this.props.url.query.repeatType) {
      this.setState({ repeatType: this.props.url.query.repeatType });
    }
    if (this.props.url.query.isrepeat) {
      this.setState({ isrepeat: this.props.url.query.isrepeat });
    }
    // 创建成功后 返回的页面地址
    if (this.props.url.query.backUrl) {
      this.setState({
        backUrl: this.props.url.query.backUrl
      });
    }

    // 子任务的面包屑
    if (
      this.props.taskCreateBread instanceof Array &&
      this.props.taskCreateBread.length > 0 &&
      this.props.url.query.newTask != "true"
    ) {
      let selectedPro = {
        id: this.props.taskCreateBread[0].id,
        name: this.props.taskCreateBread[0].taskname
      };
      let parentId = "";
      if (this.props.taskCreateBread.length == 1) {
        parentId = "";
      } else {
        parentId = this.props.taskCreateBread[
          this.props.taskCreateBread.length - 1
        ].id;
      }
      this.setState({
        taskCreateBread: this.props.taskCreateBread,
        selectedPro: selectedPro,
        parentId: parentId
      });
    }

    this.props.getPriorityList(() => {
      this.setState({ priorityLoading: true });
    });
  }

  componentDidMount() {
    // 默认负责人是自己
    let { taskInfo, isrepeat } = this.state;
    let nowUser = Storage.getSession("user");
    this.setState({
      nowUser: nowUser
    })
    if (!(taskInfo.userResponse && taskInfo.userResponse.userid)) {
      taskInfo.userResponse = nowUser ? nowUser : taskInfo.userResponse;
      this.setState({ taskInfo: taskInfo });
    }
    utils.butAnimate();
    if (nowUser && nowUser.userid) {
      if (!this.props.urlData) {
        this.props.setUrlData(encodeURIComponent(location.href.split("#")[0]));
      }
    }
    if (isrepeat) {
      if (Router.router.query.selectedProId) {
        let id = Router.router.query.selectedProId;
        let name = Router.router.query.selectedProName;
        this.setState({ selectedPro: { id: id, name: name } });
      }
    }
    Dingtalk.authDingJsApi("", this.props.urlData);
  }

  componentDidUpdate() {
    utils.butAnimate();
  }

  componentWillUnmount() {
    //     this.props.setTaskCreateBread([]);
  }

  componentWillReceiveProps(nextProps) {
    const { taskInfo } = this.state;
    if (this.state.priorityLoading && nextProps.taskPriorityList) {
      //console.log("taskCreate componentWillReceiveProps1");
      if (nextProps.taskPriorityList.success) {
        this.setState({
          priorityList: nextProps.taskPriorityList.data.coefficienttypes
        });
      } else {
        Toast.fail("获取初始数据失败，请检查网络后重试", 1);
      }

      this.setState({ priorityLoading: false });
    } else if (this.state.taskCreateLoading && nextProps.taskCreate) {
      //console.log("taskCreate componentWillReceiveProps2");
      if (nextProps.taskCreate.success) {
        this.props.setCreateTaskVals({
          id: "",
          taskname: "",
          description: "", // 任务描述
          userResponse: {},
          planEndTimeString: "",
          userFlow: {},
          flowConten: "",
          coefficienttype: "",
          workTime: "",
          labels: [],
          mobileFile: [], // 描述文件
          category: "1",
          repeatObj: null
        });
        // Router.push(
        // 	Dingtalk.setDdNavColor(
        // 		this.state.backUrl
        // 	)
        // );
      } else {
        Toast.fail(nextProps.taskCreate.errmsg, 1);
      }
      this.setState({ taskCreateLoading: false });
    }
  }

  valChange(type, text) {
    let { taskInfo, titleLength } = this.state;
    if (type == "workTime" || type == "flowConten") {
      text = text;
    }
    taskInfo[type] = text;
    if (type == "taskname") {
      titleLength = utils.getByteLen(text.slice(0, 50));
      this.setState({ titleLength: titleLength });
    }
    //console.log(taskInfo, "valChange");
    this.setState({ taskInfo: taskInfo });
    this.props.setCreateTaskVals(taskInfo);
  }

  // 处理标签
  tagChange(labs) {
    const labels = [];
    let { taskInfo } = this.state;
    labs.map(lab => {
      labels.push({
        id: lab.id,
        name: lab.labelname,
        color: lab.color
      });
    });
    taskInfo.labels = labels;
    this.setState({ taskInfo: taskInfo });
  }

  // 保存任务
  saveTask() {
    const {
      taskInfo,
      parentId,
      selectedPro,
      isrepeat,
      taskCreateBread,
      repeatType
    } = this.state;

    if (isrepeat) {
      let taskNew = Object.assign({}, taskInfo, taskInfo.repeatObj);
      if (taskNew.weekDay) {
        taskNew.weekDay = taskNew.weekDay.join(",");
      }
      if (!taskNew.workTime) {
        taskNew.workTime = "0"
      }
      let arr = ['0']
      taskCreateBread && taskCreateBread.map((item, index) => {
        if (index > 0) {
          arr.push(item.id)
        }
      })
      let parent = arr.join(",")
      taskNew.parentIds = parent;
      taskNew.parent = {
        id: parentId ? parentId : "0"
      };
      taskNew.nextExecutionTimeString = taskNew.nextExecutionTimeString.format(
        "YYYY-MM-DD"
      );

      this.props.createRepeatTask(selectedPro.id, taskNew, (data, iserr) => {
        if (iserr) {
          Toast.fail(data);
        } else {
          Router.push(Dingtalk.setDdNavColor(this.state.backUrl));
        }
      });
    } else {
      this.createTaskList();
    }
  }
  createTaskList() {
    const {
      taskInfo,
      parentId,
      selectedPro,
      isrepeat,
      repeatType
    } = this.state;
    if (!taskInfo.workTime) {
      taskInfo.workTime = "0"
    }
    this.props.createTask(selectedPro.id, parentId, taskInfo, data => {
      this.setState({ taskCreateLoading: true });
      if (data.success) {
        if (data.data) {
          this.props.getTaskDetailsById2(data.data.antTaskinfo.id, newdata => {
            this.props.addTaskLisToDateltAtCache(newdata.data.taskPage.list[0]);
            //更新reduce任务数量
            this.props.setTaskCountToDatelAtCache(1);
            this.updataProjectInfo(data.data.project.id);
          });
        }
      }
      Dingtalk.actionDing("createTaskinfo");
    });
  }
  updataTaskList() {
    this.props.getTaskDetailsByIdsNew();
  }
  updataProjectInfo(projectId) {
    this.props.getProjectCreateInfoById2(projectId, data => {
      if (data.success) {
        if (data.data) {
          this.props.setUpdataProjectListAtCache({
            projectId: projectId,
            data: data.data
          });
          Router.push(Dingtalk.setDdNavColor(this.state.backUrl));
        }
      }
    });
  }
  // 钉钉选人组件
  selectUser(selectedUser = [], userType) {
    let { taskInfo } = this.state;
    const _this = this;
    let type = "userResponse";
    if (userType == "确认人") {
      type = "userFlow";
    }
    Dingtalk.selectUser(
      selectedUser,
      userType,
      data => {
        if (data && data.length > 0) {
          ////console.log('选中的人是'+data[0].name+'     id是'+data[0].emplId);
          let id = data[0].emplId;
          let photo = data[0].avatar;
          let name = data[0].name;
          let nickname = utils.getNickNameByName(name);
          taskInfo[type] = {
            userid: id,
            photo: photo,
            nickname: nickname,
            name: name
          };
          _this.setState({ taskInfo: taskInfo });
          _this.props.setCreateTaskVals(taskInfo);
          ////console.log('type是'+type+'        更新的人是'+taskInfo[type].nickname+'，'+taskInfo[type].id+'，'+taskInfo[type].photo)
        }
      },
      err => {
        Toast.fail("选择" + userType + "失败,失败原因：" + err);
      }
    );
  }

  // 钉钉上传文件
  updateFiles() {
    let { taskInfo } = this.state;
    const _this = this;
    Dingtalk.uploadImage(
      result => {
        result.data.map((item, i) => {
          item.type = "0";
          taskInfo.mobileFile.push(item);
        });
        _this.setState({ taskInfo: taskInfo });
        _this.props.setCreateTaskVals(taskInfo);
      },
      err => {
        Toast.fail(err);
      }
    );
  }

  dellFiles(id) {
    let { taskInfo } = this.state;
    for (let i = 0; i < taskInfo.mobileFile.length; i++) {
      if (taskInfo.mobileFile[i].fileId == id) {
        taskInfo.mobileFile.splice(i, 1);
        break;
      }
    }
    this.setState({ taskInfo: taskInfo });
  }
  descFocus() {
    this.setState({ desboolen: false });
  }
  timeChange(date) {
    let newHour = date.getHours();
    let newMinute = date.getMinutes();
    newHour = newHour >= 10 ? newHour : "0" + newHour;
    newMinute = newMinute >= 10 ? newMinute : "0" + newMinute;
    let newTime = `${newHour}` + ":" + `${newMinute}`;
    return newTime;
  }
  dateTimeChange(date, time) {
    const { taskInfo } = this.state;
    if (time === "") {
      taskInfo.planEndTimeString = date + " 00:00:00";
    } else if (time == "00:00") {
      taskInfo.planEndTimeString = date + " " + time + ":02";
    } else {
      taskInfo.planEndTimeString = date + " " + time + ":00";
    }
    this.setState({
      taskInfo: taskInfo,
      taskPlanDate: date,
      taskPlanTime: time
    });
  }
  disableTime() {
    const { taskPlanDate } = this.state;
    if (taskPlanDate === "") {
      Toast.info("请先选择日期");
    }
  }
  render() {
    const { language } = this.props;
    const {
      selectedPro,
      taskInfo,
      titleLength,
      projectSelectShow,
      tagSeling,
      priorityList,
      priorityLoading,
      isChild,
      taskCreateBread,
      desboolen,
      taskPlanDate,
      taskPlanTime,
      repeatType,
      repeatObj,
      repeatAlertShow,
      nowUser
    } = this.state;
    const selectedTags = [];
    taskInfo.labels &&
      taskInfo.labels.map(lab => {
        selectedTags.push({
          id: lab.id,
          labelname: lab.name,
          color: lab.color
        });
      });
    let desc = "";
    // let noDesc = "";
    let newDateTime = taskPlanDate + " " + taskPlanTime;
    let newYear = new Date(taskPlanDate).getFullYear();
    let newMonth = new Date(taskPlanDate).getMonth() + 1;
    let newDay = new Date(taskPlanDate).getDate();
    return (
      <Layout language={language}>
        <div className="pubLayout taskCreate">
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
          <Loading show={priorityLoading} />
          {repeatAlertShow && (
            <Alert
              title="专业版功能"
              msg="图表化项目管理、批量便捷操作、多维度数据统计、WBS文件系统等都为蚂蚁分工专业版功能，同时还有更多高级功能将陆续开放。"
              okButTxt="升级专业版"
              butIsOne={true}
              closeIconShow={true}
              okCallBack={() => {
                this.setState({
                  repeatAlertShow: false
                }),
                  Router.push(
                    Dingtalk.setDdNavColor(
                      "/mo_version"
                    )
                  );
              }}
              calCallBack={() => { }}
              closeIconClickCallBack={() => {
                this.setState({
                  repeatAlertShow: false
                });
              }}
            />
          )}
          {projectSelectShow ? (
            <ProjectSelect
              selectedPros={[selectedPro]}
              contral={true}
              isRadio={true}
              selingCallBack={val => {
                this.setState({
                  selectedPro: val,
                  projectSelectShow: false
                });
              }}
              closeCallBack={() => {
                this.setState({
                  projectSelectShow: false
                });
              }}
            />
          ) : (
              ""
            )}
          {tagSeling ? (
            <TagSelect
              selectList={selectedTags}
              closedCallBack={() => {
                this.setState({
                  tagSeling: false
                });
              }}
              selectedCallBack={val => {
                this.tagChange(val);
              }}
            />
          ) : (
              ""
            )}
          {taskCreateBread && taskCreateBread.length > 0 ? (
            <div className="bread">
              {taskCreateBread.map((item, i) => {
                if (i == 0) {
                  return (
                    <div key={item.id}>
                      <span
                        className="textMore"
                        style={{
                          color: "#333"
                        }}
                      >
                        {item.taskname}
                      </span>
                      <Icon type="right" />
                    </div>
                  );
                } else if (i == taskCreateBread.length - 1) {
                  return (
                    <span
                      className="textMore"
                      key={item.id}
                      onClick={() => {
                        Router.push(
                          Dingtalk.setDdNavColor(
                            "/mo_taskDetails?id=" + item.id
                          )
                        );
                      }}
                    >
                      {item.taskname}
                    </span>
                  );
                } else {
                  return (
                    <div key={item.id}>
                      <span
                        className="textMore"
                        onClick={() => {
                          Router.push(
                            Dingtalk.setDdNavColor(
                              "/mo_taskDetails?id=" + item.id
                            )
                          );
                        }}
                      >
                        {item.taskname}
                      </span>
                      <Icon type="right" />
                    </div>
                  );
                }
              })}
              <div
                style={{
                  clear: "both"
                }}
              />
            </div>
          ) : (
              ""
            )}
          <div className="from">
            {!isChild ? (
              <div className="pubDiv">
                <Icon type="anticon-xiangmuguanli" className="icon" />
                <div className="tit">项目</div>
                <div
                  className="text"
                  style={{
                    margin: "0 5px 0 15px"
                  }}
                >
                  {/*onClick={()=>{Router.push(Dingtalk.setDdNavColor('/mo_projectSelect?selectedProId='+selectedPro.id))}}*/}
                  {selectedPro.id ? (
                    <span
                      className="proName textMore"
                      onClick={() => {
                        this.setState({
                          projectSelectShow: true
                        });
                      }}
                    >
                      {selectedPro.name}
                    </span>
                  ) : (
                      <span
                        onClick={() => {
                          this.setState({
                            projectSelectShow: true
                          });
                        }}
                      >
                        请选择
                    </span>
                    )}
                </div>
                <Icon
                  type="right"
                  className="icon i aniButGray"
                  onClick={() => {
                    this.setState({
                      projectSelectShow: true
                    });
                  }}
                />
              </div>
            ) : (
                ""
              )}
            <div className="pubDiv taskName">
              <TextareaItem
                className="input inputDiv"
                value={taskInfo.taskname && taskInfo.taskname.slice(0, 50)}
                disabled={false}
                autoHeight={true}
                onChange={e => {
                  this.valChange("taskname", e);
                }}
                placeholder="标题"
              />
              <div
                className="textCount"
                style={{
                  height: "30px",
                  lineHeight: "30px"
                }}
              >
                <span>{titleLength}</span>
                /50
              </div>
            </div>
            <div
              className="pubDiv"
              style={{
                display: "block"
              }}
            >
              <TextareaItem
                className="descBox"
                value={taskInfo && taskInfo.description}
                placeholder="任务描述"
                onFocus={() => {
                  this.descFocus();
                }}
                ref="desc"
                onChange={e => {
                  this.valChange("description", e);
                }}
              />
              <Icon
                type="anticon-tianjia"
                className="addFileIcon aniButGray"
                onClick={() => {
                  this.updateFiles();
                }}
              />
              <ul
                className={
                  taskInfo &&
                    taskInfo.mobileFile &&
                    taskInfo.mobileFile.length > 0
                    ? "taskList"
                    : ""
                }
              >
                {taskInfo &&
                  taskInfo.mobileFile &&
                  taskInfo.mobileFile.length > 0
                  ? taskInfo.mobileFile.map((item, i) => {
                    if (item.type !== "DELL") {
                      return (
                        <li key={item.fileId}>
                          <div
                            className="name textMore"
                            onClick={() => {
                              Dingtalk.previewImage(item);
                            }}
                          >
                            {item.fileName}
                          </div>
                          <Icon
                            type="anticon-shanchu"
                            className="del aniButRed"
                            onClick={() => {
                              this.dellFiles(item.fileId);
                            }}
                          />
                        </li>
                      );
                    }
                  })
                  : ""}
              </ul>
            </div>
            <div
              className="pubDiv"
              onClick={() => {
                this.setState({
                  tagSeling: true
                });
              }}
            >
              <Icon type="anticon-biaoqian" className="icon" />
              <div className="tit">标签</div>
              <div
                className="text"
                style={{
                  height: "auto",
                  display: "block"
                }}
              >
                {taskInfo.labels && taskInfo.labels.length > 0
                  ? taskInfo.labels.map((item, i) => {
                    return (
                      <span
                        key={item.id}
                        className={
                          "tag " +
                          utils.getTagColorByColorCode("1", item.color)
                        }
                      >
                        {item.name}
                      </span>
                    );
                  })
                  : "添加"}
              </div>
              <Icon
                type="right"
                className="icon i aniButGray"
                onClick={() => {
                  this.setState({
                    tagSeling: true
                  });
                }}
              />
            </div>
            <div className="pubDiv">
              <Icon
                type="anticon-ren2"
                className="icon"
                style={{
                  margin: "6px 10px 0 0"
                }}
              />
              <div
                className="tit"
                style={{
                  height: "30px",
                  lineHeight: "30px"
                }}
              >
                负责人
              </div>
              <div
                className="text"
                style={{
                  height: "30px",
                  lineHeight: "30px"
                }}
              >
                {taskInfo.userResponse &&
                  taskInfo.userResponse.userid &&
                  !taskInfo.userResponse.photo ? (
                    <span
                      onClick={() => {
                        this.selectUser([], "负责人");
                      }}
                      className="user"
                    >
                      {taskInfo.userResponse && taskInfo.userResponse.nickname}
                    </span>
                  ) : (
                    ""
                  )}
                {taskInfo.userResponse && taskInfo.userResponse.photo ? (
                  <img
                    onClick={() => {
                      this.selectUser([], "负责人");
                    }}
                    src={taskInfo.userResponse.photo}
                  />
                ) : (
                    ""
                  )}
                {!(taskInfo.userResponse && taskInfo.userResponse.userid) ? (
                  <span
                    onClick={() => {
                      this.selectUser([], "负责人");
                    }}
                  >
                    未安排
                  </span>
                ) : (
                    ""
                  )}
              </div>
              <Icon
                type="right"
                className="icon i aniButGray"
                style={{
                  margin: "6px 0 0 0"
                }}
                onClick={() => {
                  this.selectUser([], "负责人");
                }}
              />
            </div>
            <div className="pubDiv">
              <Icon
                type="anticon-ren2"
                className="icon"
                style={{
                  margin: "6px 10px 0 0"
                }}
              />
              <div
                className="tit"
                style={{
                  height: "30px",
                  lineHeight: "30px"
                }}
              >
                确认人
              </div>
              <div
                className="text"
                style={{
                  height: "30px",
                  lineHeight: "30px"
                }}
              >
                {taskInfo.userFlow &&
                  taskInfo.userFlow.userid &&
                  !taskInfo.userFlow.photo ? (
                    <span
                      onClick={() => {
                        this.selectUser([], "确认人");
                      }}
                      className="user"
                    >
                      {taskInfo.userFlow.nickname}
                    </span>
                  ) : (
                    ""
                  )}
                {taskInfo.userFlow && taskInfo.userFlow.photo ? (
                  <img
                    onClick={() => {
                      this.selectUser([], "确认人");
                    }}
                    src={taskInfo.userFlow.photo}
                  />
                ) : (
                    ""
                  )}
                {!(taskInfo.userFlow && taskInfo.userFlow.userid) ? (
                  <span
                    onClick={() => {
                      this.selectUser([], "确认人");
                    }}
                  >
                    未安排
                  </span>
                ) : (
                    ""
                  )}
              </div>
              <Icon
                type="right"
                className="icon i aniButGray"
                style={{
                  margin: "6px 0 0 0"
                }}
                onClick={() => {
                  this.selectUser([], "确认人");
                }}
              />
            </div>
            <div className="pubDiv">
              <Icon type="anticon-xuanzeriqi" className="icon" />
              <div className="tit">截止时间</div>
              <div
                className="text dateTimeBigBox"
                style={{
                  padding: "0"
                }}
              >
                <DatePicker
                  mode="date"
                  title="完成日期"
                  className="date"
                  value={
                    taskPlanDate !== "" ? new Date(taskPlanDate) : new Date()
                  }
                  onChange={date => {
                    this.dateTimeChange(utils.dateToString(date), taskPlanTime);
                  }}
                >
                  <List.Item className="listStyle">
                    {taskPlanDate !== "" ? taskPlanDate : "请选择日期"}
                    <Icon
                      type="right"
                      className="icon i aniButGray"
                      style={{
                        float: "right"
                      }}
                    />
                  </List.Item>
                </DatePicker>
                <DatePicker
                  mode="time"
                  title="完成时间"
                  className="time"
                  disabled={taskPlanDate === "" ? true : false}
                  value={
                    taskPlanTime !== ""
                      ? new Date(
                        newYear,
                        newMonth,
                        newDay,
                        parseInt(taskPlanTime.slice(0, 2)),
                        parseInt(taskPlanTime.slice(3, 5))
                      )
                      : new Date()
                  }
                  onChange={date => {
                    this.dateTimeChange(taskPlanDate, this.timeChange(date));
                  }}
                >
                  <List.Item
                    className="listStyle"
                    onClick={() => {
                      this.disableTime();
                    }}
                  >
                    {taskPlanTime !== "" ? taskPlanTime : "请选择时间"}
                    <Icon
                      type="right"
                      className="icon i aniButGray"
                      style={{
                        float: "right"
                      }}
                    />
                  </List.Item>
                </DatePicker>
              </div>
            </div>

            <div className="pubDiv">
              <Icon type="anticon-xuanzeriqi" className="icon" />
              <div className="tit">计划工期</div>
              <div className="text">
                <div className="editable">
                  <input
                    value={taskInfo.workTime ? taskInfo.workTime : ""}
                    onChange={e => {
                      utils.onlyNumber(e.target);
                      this.valChange("workTime", e.target.value);
                    }}
                    placeholder="1"
                  />
                </div>
                <span>天</span>
              </div>
            </div>
            <div className="pubDiv">
              <Icon type="anticon-jixiao" className="icon" />
              <div className="tit">任务绩效</div>
              <div className="text">
                <div className="editable">
                  <input
                    value={taskInfo.flowConten ? taskInfo.flowConten : ""}
                    onChange={e => {
                      utils.onlyNumber(e.target);
                      this.valChange("flowConten", e.target.value);
                    }}
                    placeholder="0"
                  />
                </div>
              </div>
              {/*<Icon type="right" className="icon i" />*/}
            </div>
            <div className="pubDiv">
              <Icon type="anticon-icon-class-a" className="icon" />
              <div className="tit">优先级</div>
              <div
                className="text"
                style={{
                  padding: "0"
                }}
              >
                <Picker
                  data={priorityList}
                  cols={1}
                  onOk={e => {
                    this.valChange("coefficienttype", e[0]);
                  }}
                  value={
                    taskInfo.coefficienttype ? [taskInfo.coefficienttype] : [""]
                  }
                >
                  <List.Item className="listStyle">
                    {taskInfo.coefficienttype === "1"
                      ? "低"
                      : taskInfo.coefficienttype === "2"
                        ? "中"
                        : taskInfo.coefficienttype === "3"
                          ? "高"
                          : "请选择"}
                    <Icon
                      type="right"
                      className="icon i aniButGray"
                      style={{
                        float: "right"
                      }}
                    />
                  </List.Item>
                </Picker>
              </div>
              <div
                style={{
                  clear: "both"
                }}
              />
            </div>

            <div className="pubDiv">
              <Icon type="anticon-xunhuan" className="icon" />
              <div className="tit">重复规则</div>
              <div
                className="text"
                style={{
                  height: "30px",
                  lineHeight: "30px",
                  padding: 0
                }}
                onClick={() => {

                  if (!utils.getTeamInfoWithMoney("是否可用", nowUser)) {

                    this.setState({
                      repeatAlertShow: true
                    })
                  } else {
                    Router.replace(
                      Dingtalk.setDdNavColor(
                        "/mo_repeatPlan?repeatType=" +
                        repeatType +
                        "&selectedProId=" +
                        selectedPro.id +
                        "&selectedProName=" +
                        selectedPro.name
                      )
                    );
                  }

                }}
              >
                {repeatObj ? "" : "请选择"}

                {repeatType == "1" && repeatObj && repeatObj.day
                  ? `每${repeatObj.day}天重复`
                  : ""}
                {repeatType == "2" && repeatObj && repeatObj.week
                  ? `每${repeatObj.week}周${repeatObj.weekDay &&
                  repeatObj.weekDay.join(",")}重复`
                  : ""}
                {repeatType == "3" && repeatObj && repeatObj.month
                  ? `每${repeatObj.month}月重复`
                  : ""}
                {repeatObj && repeatObj.isWeekend ? "-跳过周六、周日" : ""}
              </div>
              <Icon
                type="right"
                className="icon i aniButGray"
                style={{
                  margin: "6px 0 0 0"
                }}

                onClick={() => {

                  if (!utils.getTeamInfoWithMoney("是否可用", nowUser)) {

                    this.setState({
                      repeatAlertShow: true
                    })
                  } else {
                    Router.replace(
                      Dingtalk.setDdNavColor(
                        "/mo_repeatPlan?repeatType=" +
                        repeatType +
                        "&selectedProId=" +
                        selectedPro.id +
                        "&selectedProName=" +
                        selectedPro.name
                      )
                    );
                  }

                }}
              />
              <div
                style={{
                  clear: "both"
                }}
              />
            </div>
          </div>
          <div
            className={
              selectedPro.id && taskInfo.taskname !== ""
                ? "bigBut blue aniBut"
                : "bigBut"
            }
            onClick={() => {
              if (selectedPro.id && taskInfo.taskname !== "") {
                this.saveTask();
              }
            }}
          >
            保存任务
          </div>
        </div>
      </Layout>
    );
  }
}
function mapStateToProps(state) {
  return {
    taskPriorityList: state.task.taskPriorityList,
    taskCreate: state.task.taskCreate,
    taskCreateVals: state.task.taskCreateVals,
    taskCreateBread: state.task.taskCreateBread,
    urlData: state.user.urlData
  };
}
const mapDispatchToProps = dispatch => {
  return {
    createRepeatTask: bindActionCreators(taskAction.createRepeatTask, dispatch),
    getPriorityList: bindActionCreators(taskAction.getPriorityList, dispatch),
    createTask: bindActionCreators(taskAction.createTask, dispatch),
    setCreateTaskVals: bindActionCreators(
      taskAction.setCreateTaskVals,
      dispatch
    ),
    setTaskCreateBread: bindActionCreators(
      taskAction.setTaskCreateBread,
      dispatch
    ),
    saveTaskListAtCache: bindActionCreators(
      cacheAction.saveTaskListAtCache,
      dispatch
    ),
    setUrlData: bindActionCreators(userAction.setUrlData, dispatch),
    addTaskLisToDateltAtCache: bindActionCreators(
      cacheAction.addTaskLisToDateltAtCache,
      dispatch
    ),
    setTaskCountToDatelAtCache: bindActionCreators(
      cacheAction.setTaskCountToDatelAtCache,
      dispatch
    ),
    getProjectCreateInfoById2: bindActionCreators(
      projectAction.getProjectCreateInfoById2,
      dispatch
    ),
    setUpdataProjectListAtCache: bindActionCreators(
      cacheAction.setUpdataProjectListAtCache,
      dispatch
    ),
    getTaskDetailsById2: bindActionCreators(
      taskAction.getTaskDetailsById2,
      dispatch
    )
  };
};
export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(
  taskCreate
);
