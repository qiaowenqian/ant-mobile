import React, { Component } from "react";
import { bindActionCreators } from "redux";
import withRedux from "next-redux-wrapper";
import Router from "next/router";
import {
  Icon,
  InputItem,
  Switch,
  Toast,
  DatePicker,
  Picker,
  Button,
  TextareaItem,
  List,
  Modal
} from "antd-mobile";
import mobileStyle from "antd-mobile/dist/antd-mobile.min.css";

import ContentEditable from "react-contenteditable";
import { getLimtTask } from "../actions/version";
import Alert from "../components/alert";

import { initStore } from "../store";
import stylesheet from "styles/pages/taskDetails.scss";
import Layout from "../components/Layout";
import Loading from "../components/Loading";
import TagSelect from "../components/Tag";
import * as taskAction from "../actions/task";
import * as userAction from "../actions/user";
import * as cacheAction from "../actions/cache";
import * as projectAction from "../actions/project";
import utils from "../utils/utils";
import Storage from "../utils/storage";
import Dingtalk from "../utils/dingtalk";
const antAlert = Modal.alert;
let atRegRuler = /\!\#\$(\@([\u4E00-\u9FA5A-Za-z0-9\S]+)\$\#\$([\u4E00-\u9FA5A-Za-z0-9]+))\$\#\:/gi;
class taskDetails extends Component {
  static getInitialProps({ req, store, isServer }) {
    const language = req ? req.headers["accept-language"] : navigator.language;
    return {
      language
    };
  }
  constructor(props) {
    super(props);
    this.state = {
      repeatAlertShow: false,
      attstr01: 0,
      taskId: "",
      taskDetailsLoading: false,
      taskInfoCopy: {}, // 备份数据 做保存对比
      taskInfo: {},
      jurisdiction: false,
      taskNameLength: 0,
      taskDescLength: 0,
      descImgList: [],
      openList: ["前序任务", "后序任务", "子任务"],
      repeatType: "",
      taskChildLoading: false,
      taskChildList: [],

      taskReLevanceLoading: false,
      taskReLevanList: {},

      taskFilesList: {
        frontFileList: [],
        leaveFiles: [],
        taskinfoFiles: []
      },
      taskFilesLoading: false,

      logShow: false,

      saveLoading: false,
      editData: [], // 记录编辑了哪些字段

      upFilesWithChengGuoLoading: false,
      deleteFileWithChengGuoLoading: false,

      tagSeling: false,
      selectedTags: [],

      addTalkShow: false,
      talkHtml: "",
      talkTextLength: 0,
      talkFiles: [],
      talkReplyUserId: "",
      addTalkLoading: false,
      deleteTalkLoading: false,

      menuItems: [{ id: "more", text: "更多" }],
      moreButton: [],

      taskUpdateStateLoading: false,

      nowUser: {},

      alertModalShow: false,
      alertModal: {
        tit: "",
        inputTxt: "",
        alert: "",
        yesButName: "",
        yes2ButName: "",
        noButName: ""
      },
      upState: "",
      upText: "",

      titleEditing: false,
      descEditing: false,

      cuibanLoading: false,
      collectLoading: false,
      cancelLoading: false,
      taskFree: "",
      taskLimit: "",
      tasAlertShow: false,
      taskMax: "",
      taskPlanDate: "",
      taskPlanTime: "",
      modifyPermission: false,
      createPermission: false,
      deletePermission: false,
      isManager: false,
      parentProjectId: "",
      projectName: "",
      flag: true,
      isMember: false
    };
  }
  showModalforCollect(cancleCallback, successCallback) {
    antAlert("", "是否将刚刚添加的关注人加入项目成员？", [
      { text: "不加入", onPress: () => cancleCallback() },
      { text: "加入", onPress: () => successCallback() }
    ]);
  }
  showModalforCollect2(propleNum, cancleCallback, successCallback) {
    antAlert(
      "",
      "您刚刚选择了" + propleNum + "个人，是否要全部添加为关注人？",
      [
        { text: "取消", onPress: () => cancleCallback() },
        { text: "添加", onPress: () => successCallback() }
      ]
    );
  }
  componentWillMount() {
    Dingtalk.setTitle("任务详情");
  }

  componentDidMount() {
    utils.butAnimate();
    let nowUser = Storage.getSession("user");
    if (nowUser && nowUser.userid) {
      if (!this.props.urlData) {
        this.props.setUrlData(encodeURIComponent(location.href.split("#")[0]));
      }
      Dingtalk.authDingJsApi("", this.props.urlData);
      if (this.props.url.query.id) {
        this.setState({
          taskId: this.props.url.query.id
        });
        this.getTaskDetails(this.props.url.query.id);
      }
      this.setState({ nowUser: nowUser });
    }
  }

  componentWillReceiveProps(nextProps) {
    this.refs.detailScroll.scrollTop = 0;
    const { flag } = this.state;

    if (nextProps.url.query.id !== this.state.taskId) {
      this.setState({ taskId: nextProps.url.query.id });
      this.getTaskDetails(nextProps.url.query.id);
    }

    if (this.state.taskDetailsLoading && nextProps.taskDetails) {
      if (nextProps.taskDetails.success) {
        this.setState({
          taskInfo: nextProps.taskDetails.data
        });

        // 设置按钮
        let info = nextProps.taskDetails.data.antTaskinfo;
        this.setState({ moreButton: [] });
        this.setMoreButs(nextProps.taskDetails.data);

        // 提取选中的标签ID
        let selectedTags = [];
        if (
          nextProps.taskDetails.data.label &&
          nextProps.taskDetails.data.label.length > 0
        ) {
          nextProps.taskDetails.data.label.map((item, i) => {
            selectedTags.push({
              id: item.label.id,
              labelname: item.label.labelname,
              color: item.label.color,
              type: item.label.type
            });
          });
        }

        // 备份数据
        let data = nextProps.taskDetails.data;
        let copy = {
          taskname: data.antTaskinfo.taskname,
          description: data.antTaskinfo.description,
          planEndTime: data.antTaskinfo.planEndTime,
          workTime: data.antTaskinfo.workTime,
          flowConten: data.antTaskinfo.flowConten,
          coefficienttype: data.antTaskinfo.coefficienttype,
          shr: data.antTaskinfo.userFlow ? data.antTaskinfo.userFlow.id : "",
          fzr: data.antTaskinfo.userResponse
            ? data.antTaskinfo.userResponse.id
            : "",
          label: JSON.parse(JSON.stringify(selectedTags))
        };

        this.setState({
          taskInfoCopy: copy,
          selectedTags: selectedTags
        });
        if (nextProps.taskDetails.data.antTaskinfo.attstr01) {
          this.setState({
            attstr01: 1,
            antCyclicTaskinfo: nextProps.taskDetails.data.antCyclicTaskinfo
          });
        } else {
          this.setState({
            attstr01: 0,
            antCyclicTaskinfo: nextProps.taskDetails.data.antCyclicTaskinfo
          });
        }
        // 判断是否有编辑权限
        if (
          nextProps.taskDetails.data.antTaskinfo.state == 0 ||
          nextProps.taskDetails.data.antTaskinfo.state == 3
        ) {
          this.setState({ jurisdiction: true });
        } else {
          this.setState({ jurisdiction: false });
        }
        if (nextProps.taskDetails.data.isMember) {
          this.setState({ isMember: true });
        } else {
          this.setState({ isMember: false });
        }

        // 判断标题文字长度
        let taskNameLength = utils.getByteLen(
          nextProps.taskDetails.data.antTaskinfo.taskname
        );
        this.setState({
          taskNameLength: taskNameLength
        });

        let taskDescLength = utils.getByteLen(
          utils.getTextFromString(
            nextProps.taskDetails.data.antTaskinfo.description
          )
        );
        this.setState({
          taskDescLength: taskDescLength
        });

        // 提取描述文字里的img作为附件
        let descImgList = utils.GetImgListFromString(
          nextProps.taskDetails.data.antTaskinfo.description
        );
        let newList = [];
        for (let i = 0; i < descImgList.length; i++) {
          newList.push(descImgList[i]);
        }
        this.setState({ descImgList: newList });

        // 加载子任务数据
        if (this.state.openList.indexOf("子任务") !== -1) {
          this.props.getChildListById(
            nextProps.taskDetails.data.antTaskinfo.id,
            () => {
              this.setState({
                taskChildLoading: true
              });
            }
          );
        }

        // 加载协作任务数据
        if (
          this.state.openList.indexOf("前序任务") !== -1 ||
          this.state.openList.indexOf("后序任务") !== -1
        ) {
          this.props.getReLevanceTaskListById(
            nextProps.taskDetails.data.antTaskinfo.id,
            () => {
              this.setState({
                taskReLevanceLoading: true
              });
            }
          );
        }

        // 加载文件数据
        this.props.getTaskFilesListById(
          nextProps.taskDetails.data.antTaskinfo.id,
          () => {
            this.setState({
              taskFilesLoading: true
            });
          }
        );

        //增加权限控制，删除修改创建和项目管理员，负责人权限

        this.setState(
          {
            modifyPermission: nextProps.taskDetails.data.modifyPermission,
            deletePermission: nextProps.taskDetails.data.deletePermission,
            createPermission: nextProps.taskDetails.data.createPermission,
            isManager:
              nextProps.taskDetails.data.project &&
              nextProps.taskDetails.data.project.jurisdiction,
            projectName: nextProps.taskDetails.data.project.proname,

            parentProjectId: nextProps.taskDetails.data.project.id
          },
          () => {
            const { modifyPermission } = this.state;
            if (flag) {
              this.setState({
                flag: false
              });
              if (!modifyPermission) {
                Toast.fail(`您没有修改这条任务的权限`);
              }
            }
          }
        );
      } else {
        // setTimeout(() => {
        // Router.push(Dingtalk.setDdNavColor('/mo_dingHome'))
        // Toast.info(nextProps.taskDetails.errmsg);
        // }, 1000);
      }
      this.setState({ taskDetailsLoading: false });
    } else if (this.state.taskChildLoading && nextProps.taskChildList) {
      if (nextProps.taskChildList.success) {
        this.setState({
          taskChildList: nextProps.taskChildList.data
        });
      } else {
      }
      this.setState({ taskChildLoading: false });
    } else if (this.state.taskReLevanceLoading && nextProps.taskRelevanceList) {
      if (nextProps.taskRelevanceList.success) {
        this.setState({
          taskReLevanList: nextProps.taskRelevanceList.data
        });
      } else {
      }
      this.setState({ taskReLevanceLoading: false });
    } else if (this.state.taskFilesLoading && nextProps.taskFilesList) {
      if (nextProps.taskFilesList.success) {
        this.setState({
          taskFilesList: nextProps.taskFilesList.data
        });
      } else {
      }
      this.setState({ taskFilesLoading: false });
    } else if (this.state.saveLoading && nextProps.taskInfoUpdateData) {
      if (nextProps.taskFilesList.success) {
        this.setState({ editData: [] });
        this.getTaskDetails(this.state.taskId);
      } else {
        Toast.fail("任务编辑失败");
      }
      this.setState({ saveLoading: false });
    } else if (
      this.state.upFilesWithChengGuoLoading &&
      nextProps.taskInfoUpdateFiles
    ) {
      if (nextProps.taskInfoUpdateFiles.success) {
        // 加载文件数据
        this.props.getTaskFilesListById(
          nextProps.taskDetails.data.antTaskinfo.id,
          () => {
            this.setState({
              taskFilesLoading: true
            });
          }
        );
      } else {
        Toast.fail("添加成果文件失败");
      }
      this.setState({ upFilesWithChengGuoLoading: false });
    } else if (
      this.state.deleteFileWithChengGuoLoading &&
      nextProps.taskDeleteFile
    ) {
      if (nextProps.taskDeleteFile.success) {
        // 加载文件数据
        this.props.getTaskFilesListById(
          nextProps.taskDetails.data.antTaskinfo.id,
          () => {
            this.setState({
              taskFilesLoading: true
            });
          }
        );
      } else {
        Toast.fail("删除成果文件失败");
      }
      this.setState({ deleteFileWithChengGuoLoading: false });
    } else if (this.state.addTalkLoading && nextProps.taskAddTalk) {
      if (nextProps.taskAddTalk.success) {
        this.setState({
          editData: [],
          addTalkShow: false,
          talkHtml: "",
          talkTextLength: 0,
          talkFiles: [],
          talkReplyUserId: ""
        });
        this.getTaskDetails(this.state.taskId);
      } else {
        Toast.fail("发布讨论失败");
      }
      this.setState({ addTalkLoading: false });
    } else if (this.state.deleteTalkLoading && nextProps.taskDeleteTalk) {
      if (nextProps.taskDeleteTalk.success) {
        this.setState({ editData: [] });
        this.getTaskDetails(this.state.taskId);
      } else {
        Toast.fail("删除讨论失败");
      }
      this.setState({ deleteTalkLoading: false });
    } else if (this.state.deleteTaskLoading && nextProps.taskDelete) {
      console.log(
        JSON.stringify(this.state.deleteTaskLoading),
        JSON.stringify(nextProps.taskDelete)
      );
      if (nextProps.taskDelete.success) {
        Router.push(Dingtalk.setDdNavColor("/mo_task"));
      } else {
        Toast.fail("删除失败");
      }
      this.setState({ deleteTaskLoading: false });
    } else if (this.state.taskUpdateStateLoading && nextProps.taskUpdateState) {
      if (nextProps.taskUpdateState.success) {
        if (this.state.upState === "子任务") {
          // this.alertModal("标记完成", "可填写完成说明", "完成", "取消");
          this.biaoji();
          // this.setState({
          //   editData: [],
          //   alertModalShow: false
          // });
          // this.getTaskDetails(this.state.taskId);
        } else {
          this.setState({
            editData: [],
            alertModalShow: false
          });
          this.getTaskDetails(this.state.taskId);
        }
      } else {
        Toast.fail("操作失败");
      }
      this.setState({ taskUpdateStateLoading: false });
    } else if (this.state.cuibanLoading && nextProps.taskCuiBan) {
      if (nextProps.taskCuiBan.success) {
        Toast.info("催办成功");
      } else {
        let errmsg = "催办失败";
        if (nextProps.taskCuiBan.errmsg) {
          errmsg = nextProps.taskCuiBan.errmsg;
        }
        Toast.info(errmsg);
      }
      this.setState({ cuibanLoading: false });
    }
  }

  componentDidUpdate() {
    utils.butAnimate();
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
  // 设置更多里面的按钮
  setMoreButs(data) {
    let info = {};
    if (data) {
      info = data.antTaskinfo;
    }
    let project = data.project;
    let { moreButton, menuItems } = this.state;
    moreButton = [];
    if (project && project.jurisdiction) {
      moreButton.push("删除任务");
    }
    if (info.state !== "1" && info.state !== "4") {
      moreButton.push("终止任务");
    }
    this.setState({ moreButton: moreButton });

    //设置菜单
    const _this = this;
    Dingtalk.setMenu(menuItems, () => {
      Dingtalk.actionSheet("", moreButton, index => {
        switch (moreButton[index]) {
          case "删除任务":
            _this.taskDelete();
            break;
          case "终止任务":
            _this.taskUpdateState("4");

            break;
        }
      });
    });
  }

  // 删除任务
  taskDelete() {
    const {
      taskId,
      deletePermission,
      projectName,
      parentProjectId
    } = this.state;
    if (deletePermission) {
      this.props.deleteTaskById(
        taskId,
        () => {
          this.setState({ deleteTaskLoading: true });
          this.props.setTaskLisToDateltAtCache(taskId);
          this.props.setTaskCountToDatelAtCache(0);
          //更新所属的项目
          this.updataProjectInfo(parentProjectId);
        },
        parentProjectId
      );
    } else {
      Toast.fail(`您没有删除这条任务的权限`);
    }
  }

  // 更新任务状态
  taskUpdateState(state, upTxt) {
    let { taskInfo, modifyPermission, parentProjectId, taskId } = this.state;
    let data;
    //终止任务判断权限
    if (!modifyPermission && state == 4) {
      Toast.fail(`您没有修改这条任务的权限`);
      return false;
    }
    if (state === "子任务") {
      data = {
        id: taskInfo.antTaskinfo.id,
        projectId: taskInfo.project.id,
        state: "1",
        taskIds: ["模拟子任务ID"]
      };
    } else {
      data = {
        id: taskInfo.antTaskinfo.id,
        projectId: taskInfo.project.id,
        state: state,
        taskSignRemarks: upTxt ? upTxt : "",
        mobileFile: []
      };
    }
    let _this = this;
    this.props.updateTaskStateById(data, () => {
      this.setState({ taskUpdateStateLoading: true });
      //保存成功之后重新获取详情
      this.props.getTaskDetailsById2(taskId, data2 => {
        // debugger;
        if (data2.success) {
          if (data2.data) {
            if (
              data2.data &&
              data2.data.taskPage &&
              data2.data.taskPage.list[0]
            ) {
              _this.props.editTaskLisToDateltAtCache(
                data2.data.taskPage.list[0]
              );
            }
            //更新所属的项目
            this.updataProjectInfo(parentProjectId);
          }
        }
      });
    });
  }

  // 加载详情数据
  getTaskDetails(id) {
    this.props.getTaskDetailsById(id, () => {
      this.setState({ taskDetailsLoading: true });
    });
  }

  //标记完成，没有子任务时直接跳转到标记页面
  biaoji() {
    const { taskInfo } = this.state;
    let numbers =
      taskInfo.antTaskinfo.taskinfoNumber &&
        taskInfo.antTaskinfo.taskinfoNumber.numberS
        ? taskInfo.antTaskinfo.taskinfoNumber.numberS
        : "";
    let rank =
      taskInfo.antTaskinfo.taskinfoNumber &&
        taskInfo.antTaskinfo.taskinfoNumber.rank
        ? taskInfo.antTaskinfo.taskinfoNumber.rank
        : taskInfo.antTaskinfo.rank;
    Router.push(
      Dingtalk.setDdNavColor(
        "/mo_changeStates?" +
        "projectId=" +
        taskInfo.project.id +
        "&id=" +
        taskInfo.antTaskinfo.id +
        "&numbers=" +
        numbers +
        "&rank=" +
        rank +
        "&title=" +
        taskInfo.antTaskinfo.taskname
      )
    );
  }
  // 展开关闭对应层
  setOpenListVal(name) {
    let { openList, taskId } = this.state;
    if (openList.indexOf(name) !== -1) {
      let index = openList.indexOf(name);
      openList.splice(index, 1);
    } else {
      openList.push(name);
      switch (name) {
        case "子任务":
          this.props.getChildListById(taskId, () => {
            this.setState({
              taskChildLoading: true
            });
          });
          break;
        case "前序任务":
          this.props.getReLevanceTaskListById(taskId, () => {
            this.setState({
              taskReLevanceLoading: true
            });
          });
          break;
        case "后序任务":
          this.props.getReLevanceTaskListById(taskId, () => {
            this.setState({
              taskReLevanceLoading: true
            });
          });
          break;
      }
    }
    this.setState({ openList: openList });
  }
  //点击跳转到循环任务界面
  goPlanPage = () => {
    const { attstr01, taskId, taskInfo, parentProjectId, nowUser, repeatAlertShow } = this.state;
    console.log(taskInfo)
    let parentIds = ["0"]
    taskInfo.parentList && taskInfo.parentList.map((item, index) => {
      if (index > 0) {
        parentIds.push(item.id)
      }
    })
    if (!utils.getTeamInfoWithMoney("是否可用", nowUser)) {
      this.setState({
        repeatAlertShow: true
      })
    } else {
      if (!attstr01) {
        let parentIdStrs = parentIds.join('-')
        this.props.setReapactTaskinfo(taskInfo);
        Router.replace(
          Dingtalk.setDdNavColor(
            "/mo_planBydetail?id=" +
            taskId +
            "&repeatType=" +
            1 +
            "&projectId=" +
            parentProjectId +
            "&parentIds=" + parentIdStrs
          )
        );
        //保存一下循环任务要用的数据存储到reduce 然后取出来提交
      }
    }

  };
  // 编辑对应值
  editVal(type, val) {
    let { taskInfo, editData } = this.state;

    if (type == "taskname") {
      // 判断标题文字长度
      let taskNameLength = utils.getByteLen(val);
      this.setState({ taskNameLength: taskNameLength });
    } else if (type == "description") {
      // 判断标题文字长度
      let taskDescLength = utils.getByteLen(val);
      this.setState({ taskDescLength: taskDescLength });
    }
    if (type == "workTime" || type == "flowConten") {
      val = parseInt(val);
    }

    taskInfo.antTaskinfo[type] = val;
    this.setState({ taskInfo: taskInfo, editData: editData });
    this.contrastDataByType(type);
  }

  // 标签处理
  tagChange(val) {
    this.setState({ selectedTags: val });
    let { taskInfo } = this.state;
    const labels = [];
    if (val && val.length > 0) {
      val.map(item => {
        labels.push({
          label: item
        });
      });
    }
    taskInfo.label = labels;
    this.setState({ taskInfo: taskInfo });
    this.contrastDataByType("label");
  }

  // 对比是否编辑了数据
  contrastDataByType(type, newTaskInfo) {
    let { editData, taskInfo, taskInfoCopy } = this.state;
    if (newTaskInfo) {
      taskInfo = newTaskInfo;
      if (!taskInfo.taskinfoFiles) {
        taskInfo.taskinfoFiles = [];
      }
    }
    switch (type) {
      case "taskname":
        if (taskInfo.antTaskinfo.taskname !== taskInfoCopy.taskname) {
          editData[0] = true;
        } else {
          editData[0] = false;
        }
        break;
      case "description":
        if (taskInfo.antTaskinfo.description !== taskInfoCopy.description) {
          editData[1] = true;
        } else {
          editData[1] = false;
        }
        break;
      case "descFiles":
        let bb = false;
        for (let i = 0; i < taskInfo.taskinfoFiles.length; i++) {
          let item = taskInfo.taskinfoFiles[i];
          if (item.type == "DELL" || item.type == "ADD") {
            bb = true;
          }
        }
        editData[2] = bb;
        break;
      case "planEndTime":
        if (taskInfo.antTaskinfo.planEndTime !== taskInfoCopy.planEndTime) {
          editData[3] = true;
        } else {
          editData[3] = false;
        }
        break;
      case "workTime":
        if (taskInfo.antTaskinfo.workTime !== taskInfoCopy.workTime) {
          editData[4] = true;
        } else {
          editData[4] = false;
        }
        break;
      case "flowConten":
        if (taskInfo.antTaskinfo.flowConten !== taskInfoCopy.flowConten) {
          editData[5] = true;
        } else {
          editData[5] = false;
        }
        break;
      case "coefficienttype":
        if (
          taskInfo.antTaskinfo.coefficienttype !== taskInfoCopy.coefficienttype
        ) {
          editData[6] = true;
        } else {
          editData[6] = false;
        }
        break;
      case "label":
        let addArr = 0;
        if (taskInfo.label && taskInfo.label.length > 0) {
          taskInfo.label.map(item => {
            if (item.label.createBy) {
              // 如果是从标签内点过来的数据，就包含createBy属性
              addArr = addArr + 1;
            }
          });
        }
        if (addArr > 0 || taskInfo.label.length < taskInfoCopy.label.length) {
          editData[7] = true;
        } else {
          editData[7] = false;
        }
        break;
      case "userResponse":
        if (taskInfo.antTaskinfo.userResponse.id !== taskInfoCopy.fzr) {
          editData[8] = true;
        } else {
          editData[8] = false;
        }
        break;
      case "userFlow":
        if (taskInfo.antTaskinfo.userFlow.id !== taskInfoCopy.shr) {
          editData[9] = true;
        } else {
          editData[9] = false;
        }
        break;
    }
    this.setState({ editData: editData });
  }

  // 保存
  updateTaskInfo() {
    const {
      taskId,
      taskInfo,
      taskInfoCopy,
      isManager,
      parentProjectId,
      joinProject
    } = this.state;
    let data = {
      id: taskId
    };
    if (taskInfo.antTaskinfo.taskname !== taskInfoCopy.taskname) {
      data.taskname = taskInfo.antTaskinfo.taskname;
    }
    data.description = taskInfo.antTaskinfo.description;
    console.log(taskInfo.antTaskinfo.joinProject, "是否要请加入项目");
    data.joinProject = taskInfo.antTaskinfo.joinProject ? 1 : 0;
    // 判断描述文件
    data.fileList = [];
    if (taskInfo.taskinfoFiles && taskInfo.taskinfoFiles.length > 0) {
      taskInfo.taskinfoFiles.map(item => {
        if (item.type == "DELL" || item.type == "ADD") {
          data.fileList.push(item);
        }
      });
    }

    // 判断标签
    if (taskInfo.label) {
      data.labelrelations = taskInfo.label;
    }

    // 判断负责人
    if (taskInfo.antTaskinfo.userResponse) {
      if (taskInfo.antTaskinfo.userResponse.id === null) {
        data.userResponse = {};
        data.userResponse.id = "DELL";
      } else if (taskInfoCopy.fzr !== taskInfo.antTaskinfo.userResponse.id) {
        data.userResponse = {};
        data.userResponse.userid = taskInfo.antTaskinfo.userResponse.id;
      }
    }

    // 判断确认人
    if (taskInfo.antTaskinfo.userFlow) {
      if (taskInfo.antTaskinfo.userFlow.id === null) {
        data.userFlow = {};
        data.userFlow.id = "DELL";
      } else if (taskInfoCopy.shr !== taskInfo.antTaskinfo.userFlow.id) {
        data.userFlow = {};
        data.userFlow.userid = taskInfo.antTaskinfo.userFlow.id;
      }
    }

    // 完成日期
    if (taskInfo.antTaskinfo.planEndTime !== taskInfoCopy.planEndTime) {
      data.planEndTimeString = taskInfo.antTaskinfo.planEndTime;
    }

    // 预计工期
    if (taskInfo.antTaskinfo.workTime !== taskInfoCopy.workTime) {
      data.workTime = taskInfo.antTaskinfo.workTime;
    }

    // 绩效
    if (taskInfo.antTaskinfo.flowConten !== taskInfoCopy.flowConten) {
      data.flowConten = taskInfo.antTaskinfo.flowConten;
    }

    // 优先级
    if (taskInfo.antTaskinfo.coefficienttype !== taskInfoCopy.coefficienttype) {
      data.coefficienttype = taskInfo.antTaskinfo.coefficienttype;
    }

    // 关注人
    data.collectUserList = [];
    if (taskInfo.collectList && taskInfo.collectList.length > 0) {
      taskInfo.collectList.map(gzr => {
        data.collectUserList.push(gzr.user.userid);
      });
    }
    //任务所属项目Id和本人在项目内的权限
    data.projectId = parentProjectId;
    data.jurisdiction = isManager;
    let _this = this;
    this.props.updateTaskinfo(data, data => {
      if (data.success) {
        //保存成功之后重新获取详情
        this.props.getTaskDetailsById2(taskId, data2 => {
          if (data2.success) {
            if (data2.data) {
              if (
                data2.data &&
                data2.data.taskPage &&
                data2.data.taskPage.list[0]
              ) {
                _this.props.editTaskLisToDateltAtCache(
                  data2.data.taskPage.list[0]
                );
              }
              //更新所属的项目
              this.updataProjectInfo(parentProjectId);
            }
          }
        });
      }
      this.setState({ saveLoading: true });
    });
  }
  updataProjectInfo(projectId) {
    this.props.getProjectCreateInfoById2(projectId, data => {
      if (data.success) {
        if (data.data) {
          this.props.setUpdataProjectListAtCache({
            projectId: projectId,
            data: data.data
          });
        }
      }
    });
  }
  // 取消保存
  cancelSave() {
    this.setState({
      editData: [],
      taskPlanDate: "",
      taskPlanTime: ""
    });
    this.getTaskDetails(this.state.taskId);
  }

  // 上传文件 type 0描述文件 3成果文件 1评论文件
  upFiles(type) {
    let { taskId, taskInfo, talkFiles } = this.state;
    const _this = this;
    Dingtalk.uploadImage(
      result => {
        if (type == "0") {
          if (result.data && result.data.length > 0) {
            result.data.map((item, i) => {
              item.type = "ADD";
              taskInfo.taskinfoFiles.push(item);
            });
          }
          _this.setState({ taskInfo: taskInfo });
          _this.contrastDataByType("descFiles", taskInfo);
        } else if (type == "3") {
          _this.props.upFilesByType(taskId, type, result.data, () => {
            _this.setState({
              upFilesWithChengGuoLoading: true
            });
          });
        } else if (type == "1") {
          if (result.data && result.data.length > 0) {
            result.data.map((item, i) => {
              item.type = "ADD";
              talkFiles.push(item);
            });
          }
          _this.setState({
            talkFiles: talkFiles
          });
        }
      },
      err => {
        Toast.fail(err);
      }
    );
  }

  //预览文件
  previewImage(file) {
    Dingtalk.previewImage(file);
  }

  // 删除文件
  delFile(type, val) {
    let { taskInfo, descImgList, talkFiles } = this.state;
    switch (type) {
      case "描述文件":
        if (val.id) {
          // 原本有的描述文件
          if (taskInfo && taskInfo.taskinfoFiles) {
            for (let i = 0; i < taskInfo.taskinfoFiles.length; i++) {
              if (taskInfo.taskinfoFiles[i].id == val.id) {
                taskInfo.taskinfoFiles[i].type = "DELL";
                break;
              }
            }
          }
          this.setState({ taskInfo: taskInfo });
          this.contrastDataByType("descFiles");
        } else if (val.style) {
          // 图文里提取的图片
          if (descImgList) {
            for (let i = 0; i < descImgList.length; i++) {
              if (descImgList[i] && descImgList[i].src == val.src) {
                delete descImgList[i];
                break;
              }
            }
          }
          this.setState({
            descImgList: descImgList
          });
          // 更新描述内容
          let newDesc = utils.delImgStringBySrc(
            val.src,
            taskInfo.antTaskinfo.description
          );
          taskInfo.antTaskinfo.description = newDesc;
          this.setState({ taskInfo: taskInfo });
          this.contrastDataByType("description");
        } else if (val.fileId) {
          // 通过钉钉上传的，未保存的图片
          if (taskInfo && taskInfo.taskinfoFiles) {
            for (let i = 0; i < taskInfo.taskinfoFiles.length; i++) {
              if (taskInfo.taskinfoFiles[i].fileId == val.fileId) {
                taskInfo.taskinfoFiles.splice(i, 1);
                break;
              }
            }
          }
          this.setState({ taskInfo: taskInfo });
          this.contrastDataByType("descFiles");
        }
        break;
      case "成果文件":
        this.props.deleteFileByType(val, () => {
          this.setState({
            deleteFileWithChengGuoLoading: true
          });
        });
        break;
      case "评论文件":
        if (talkFiles) {
          for (let i = 0; i < talkFiles.length; i++) {
            if (talkFiles[i].fileId == val) {
              talkFiles.splice(i, 1);
              break;
            }
          }
        }
        this.setState({ talkFiles: talkFiles });
        break;
    }
  }

  selectUser(type, tit, selectedUsers = [], isCheck = false) {
    let { taskInfo, isManager } = this.state;
    const _this = this;

    if (type === "关注人") {
      if (taskInfo.collectList && taskInfo.collectList.length > 0) {
        taskInfo.collectList.map(gzr => {
          selectedUsers.push(gzr.user);
        });
      }
      isCheck = true;
    }

    Dingtalk.selectUser(
      selectedUsers,
      tit,
      data => {
        if (data && data.length > 0) {
          let dingdingUserId = data[0].emplId;
          let dingdingUserPhoto = data[0].avatar;
          let dingdingUserName = data[0].name;
          if (type == "负责人") {
            taskInfo.antTaskinfo.userResponse = {};
            taskInfo.antTaskinfo.userResponse.id = dingdingUserId;
            taskInfo.antTaskinfo.userResponse.nickname = utils.getNickNameByName(
              dingdingUserName
            );
            taskInfo.antTaskinfo.userResponse.photo = dingdingUserPhoto;
            _this.contrastDataByType("userResponse");
            _this.setState({
              taskInfo: taskInfo
            });
          } else if (type == "确认人") {
            taskInfo.antTaskinfo.userFlow = {};
            taskInfo.antTaskinfo.userFlow.id = dingdingUserId;
            taskInfo.antTaskinfo.userFlow.nickname = utils.getNickNameByName(
              dingdingUserName
            );
            taskInfo.antTaskinfo.userFlow.photo = dingdingUserPhoto;
            _this.contrastDataByType("userFlow");
            _this.setState({
              taskInfo: taskInfo
            });
          }
        }
        if (type == "关注人") {
          function addGuanzhu() {
            if (isManager) {
              _this.showModalforCollect(
                () => {
                  taskInfo.antTaskinfo.joinProject = 0;
                  const gzrs = [];
                  data &&
                    data.map(gzr => {
                      gzrs.push({
                        user: {
                          userid: gzr.emplId,
                          name: gzr.name,
                          nickname: utils.getNickNameByName(gzr.name)
                        }
                      });
                    });
                  taskInfo.collectList = gzrs;
                  const { editData } = _this.state;
                  editData.push(true);
                  _this.setState({
                    editData: editData,
                    taskInfo: taskInfo
                  });
                },
                () => {
                  taskInfo.antTaskinfo.joinProject = 1;
                  const gzrs = [];
                  data &&
                    data.map(gzr => {
                      gzrs.push({
                        user: {
                          userid: gzr.emplId,
                          name: gzr.name,
                          nickname: utils.getNickNameByName(gzr.name)
                        }
                      });
                    });
                  taskInfo.collectList = gzrs;
                  const { editData } = _this.state;
                  editData.push(true);
                  console.log("kdkkd");
                  _this.setState({
                    editData: editData,
                    taskInfo: taskInfo
                  });
                }
              );
            } else {
              taskInfo.antTaskinfo.joinProject = 0;
              const gzrs = [];
              data.map(gzr => {
                gzrs.push({
                  user: {
                    userid: gzr.emplId,
                    name: gzr.name,
                    nickname: utils.getNickNameByName(gzr.name)
                  }
                });
              });
              taskInfo.collectList = gzrs;
              const { editData } = _this.state;
              editData.push(true);
              console.log("kdkkd2222222");
              _this.setState({
                editData: editData,
                taskInfo: taskInfo
              });
            }
          }
          if (data && data.length > 0) {
            if (data && data.length > 20) {
              _this.showModalforCollect2(
                data.length,
                () => {
                  taskInfo.antTaskinfo.joinProject = 0;
                  _this.setState({
                    taskInfo: taskInfo
                  });
                },
                () => {
                  addGuanzhu();
                }
              );
            } else {
              addGuanzhu();
            }
          }
        }

        /*
				const gzrs = [];
				if(data && data.length>0){
					data.map((gzr)=>{
						gzrs.push(gzr.emplId);
					});
				}
				taskAction.attentionUsers(_this.state.taskId,gzrs,(res)=>{
					if(res.success){
						Toast.info('设置关注人成功', 1);
						_this.getTaskDetails(_this.state.taskId);						
					}else{
						const errmsg = "设置关注人失败";
						if(res.errmsg){
							Toast.info(res.errmsg, 1);
						}else{
							Toast.info(errmsg, 1);
						}							
					}
				});*/
        // }
      },
      err => {
        Toast.fail("选择" + type + "失败,请重试");
      },
      isCheck
    );
  }

  userPhoto(user) {
    if (user.photo) {
      return <img src={user.photo} />;
    } else {
      return <span className="user">{user.nickname}</span>;
    }
  }

  talkChange(text) {
    console.log(text);
    let { talkTextLength } = this.state;
    let len = utils.getByteLen(text);
    this.setState({ talkHtml: text, talkTextLength: len });
  }

  addTalk() {
    let { talkHtml, taskId, talkFiles, talkReplyUserId } = this.state;
    if (!talkHtml) {
      Toast.info("请输入讨论内容");
      return;
    }
    this.props.addTalkByTaskId(
      taskId,
      talkHtml,
      talkFiles,
      talkReplyUserId,
      () => {
        this.setState({ addTalkLoading: true });
      }
    );
  }

  talkDelete(id) {
    this.props.deleteTalkById(id, () => {
      this.setState({ deleteTalkLoading: true });
    });
  }

  createTaskChild() {
    const { taskFree, nowUser, taskInfo } = this.state;
    if (utils.getTeamInfoWithMoney("版本名称", nowUser) === "免费版") {
      getLimtTask(data => {
        this.setState({
          taskFree: data.data.success,
          taskMax: data.data.projectMax
        });
        if (!data.data.success) {
          this.setState({ tasAlertShow: true });
        }
        if (data.data.success) {
          taskInfo.parentList.push({
            id: taskInfo.antTaskinfo.id,
            taskname: taskInfo.antTaskinfo.taskname
          });
          this.props.setTaskCreateBread(taskInfo.parentList);
          Router.push(
            Dingtalk.setDdNavColor(
              "/mo_taskCreate?isChild=true&backUrl=" + Router.asPath
            )
          );
        }
      });
    } else {
      taskInfo.parentList.push({
        id: taskInfo.antTaskinfo.id,
        taskname: taskInfo.antTaskinfo.taskname
      });
      this.props.setTaskCreateBread(taskInfo.parentList);
      Router.push(
        Dingtalk.setDdNavColor(
          "/mo_taskCreate?isChild=true&backUrl=" + Router.asPath
        )
      );
    }
  }

  // 弹窗调用
  alertModal(tit, inputTxt, yesBut, noBut, yes2But = "", alert = "") {
    let { alertModalShow, alertModal, upState, upText } = this.state;
    alertModal.tit = tit;
    alertModal.inputTxt = inputTxt;
    alertModal.alert = alert;
    alertModal.yesButName = yesBut;
    alertModal.yes2ButName = yes2But;
    alertModal.noButName = noBut;
    alertModalShow = true;
    switch (tit) {
      case "任务驳回":
        upState = "0";
        break;
      case "确认任务":
        upState = "1";
        break;
      case "标记完成":
        upState = "1";
        break;
      case "标记完成子任务":
        upState = "子任务";
        break;
    }

    upText = "";
    this.setState({
      alertModalShow: alertModalShow,
      alertModal: alertModal,
      upState: upState,
      upText: upText
    });
  }

  descFocus() {
    this.setState({ descEditing: true });
    let desc = this.refs.desc.props.html;
    let { taskInfo } = this.state;
    if (desc == '<text style="color:#c7c7cc">描述</text>') {
      taskInfo.antTaskinfo.description = " ";
      this.setState({ taskInfo: taskInfo });
    }
  }
  descBlur() {
    this.setState({ descEditing: false });
    let desc = this.refs.desc.props.html;
    let { taskInfo } = this.state;
    if (desc == "" || desc == " ") {
      taskInfo.antTaskinfo.description =
        '<text style="color:#c7c7cc">描述</text>';
      this.setState({ taskInfo: taskInfo });
    }
  }

  titleFocus() {
    this.setState({ titleEditing: true });
    let title = this.refs.title.props.html;
    let { taskInfo } = this.state;
    if (title == "") {
      taskInfo.antTaskinfo.taskname = " ";
      this.setState({ taskInfo: taskInfo });
    }
  }
  titleBlur() {
    this.setState({ titleEditing: false });
    let title = this.refs.title.props.html;
    let { taskInfo } = this.state;
    if (title == "" || title == " ") {
      taskInfo.antTaskinfo.taskname = "";
      this.setState({ taskInfo: taskInfo });
    }
  }

  //截断日期
  getDate(date) {
    let str = date.slice(5, 16);
    return str;
  }

  // 循环标签值
  labelsMap(labels) {
    let delCount = 0;
    let dom;
    dom =
      labels &&
      labels.length > 0 &&
      labels.map((item, i) => {
        if (item.delete !== "1") {
          return (
            <span
              key={"tagLi" + i}
              className={
                "tag textMore " +
                utils.getTagColorByColorCode("1", item.label.color)
              }
            >
              {item.label.labelname}
            </span>
          );
        } else {
          delCount = delCount + 1;
        }
        if (delCount == labels.length) {
          return "添加";
        }
      });
    return dom;
  }

  // 催办
  cuiban(ids, type) {
    let taskId = this.state.taskInfo.antTaskinfo.id;
    let idArr = [];
    if (ids == "子任务") {
      this.state.taskChildList &&
        this.state.taskChildList.length > 0 &&
        this.state.taskChildList.map(item => {
          idArr.push(item.id);
        });
    } else {
      idArr = ids;
    }
    this.props.expedite(idArr, taskId, type, () => {
      this.setState({ cuibanLoading: true });
    });
  }

  // 催办子任务
  cuibanTaskChild() {
    taskAction.cuibanChildTask(this.state.taskInfo.antTaskinfo.id, data => {
      if (data.success) {
        Toast.info("催办成功");
      } else {
        Toast.fail("催办失败");
      }
      this.setState({ alertModalShow: false });
    });
  }

  //关注任务
  collectTask(type, taskId) {
    if (type === "1") {
      this.props.cancelAttentionWitchProject(taskId, () => {
        Toast.success("取消关注成功");
        this.getTaskDetails(taskId);
      });
    } else {
      this.props.addAttentionWitchProject(taskId, () => {
        Toast.success("关注成功");
        this.getTaskDetails(taskId);
      });
    }
  }
  timeChange(date) {
    let newHour = date.getHours();

    let newMinute = date.getMinutes();
    if (newHour <= 9) {
      newHour = "0" + date.getHours();
    }
    if (newMinute <= 9) {
      newMinute = "0" + date.getMinutes();
    }
    let newTime = newHour + ":" + newMinute;
    return newTime;
  }
  dateTimeChange(date, time) {
    const { taskInfo } = this.state;
    if (time === "") {
      taskInfo.antTaskinfo.planEndTime = date + " 00:00:02";
    } else {
      taskInfo.antTaskinfo.planEndTime = date + " " + time + ":00";
    }
    let newTime = "";
    if (date === "") {
      time = "";
      taskInfo.antTaskinfo.planEndTime = "";
      newTime = "";
    } else if (time === "" && date !== "") {
      taskInfo.antTaskinfo.planEndTime = date + " 00:00:00";
      newTime = "";
    } else if (time === "00:00" && date !== "") {
      taskInfo.antTaskinfo.planEndTime = date + " 00:00:02";
      newTime = "00:00";
    } else if (date !== "" && time !== "") {
      if (
        taskInfo.antTaskinfo &&
        taskInfo.antTaskinfo.planEndTime &&
        (taskInfo.antTaskinfo.planEndTime.slice(11, 19) == "23:59:59" ||
          taskInfo.antTaskinfo.planEndTime.slice(11, 19) == "00:00:00")
      ) {
        newTime = "";
      } else if (
        taskInfo.antTaskinfo.planEndTime &&
        taskInfo.antTaskinfo.planEndTime.slice(11, 19) == "00:00:02"
      ) {
        newTime = "00:00";
      } else {
        newTime = time;
      }
      taskInfo.antTaskinfo.planEndTime = date + " " + time + ":00";
    }
    this.setState({
      taskInfo: taskInfo,
      taskPlanDate: date,
      taskPlanTime: newTime
    });
    this.contrastDataByType("planEndTime");
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
      taskInfo,
      attstr01,
      jurisdiction,
      taskNameLength,
      taskDescLength,
      openList,
      taskChildList,
      taskReLevanList,
      taskFilesList,
      logShow,
      taskDetailsLoading,
      taskFilesLoading,
      editData,
      descImgList,
      taskId,
      taskReLevanceLoading,
      taskChildLoading,
      tagSeling,
      selectedTags,
      talkTextLength,
      talkHtml,
      addTalkShow,
      talkFiles,
      nowUser,
      alertModal,
      alertModalShow,
      upState,
      upText,
      titleEditing,
      descEditing,
      tasAlertShow,
      taskPlanDate,
      taskPlanTime,
      modifyPermission,
      createPermission,
      deletePermission,
      isManager,
      projectName,
      repeatType,
      isMember,
      antCyclicTaskinfo,
      repeatAlertShow
    } = this.state;

    const tasMax = `<div class='textLimit'>您正在使用的是<b> 蚂蚁分工免费版</b>，免费版每月可创建<b> 200 </b>条任务，本月任务用量已达版本上限。</div>
		<div class='textLimit'>如您的团队项目和任务数量较多，可升级为经济实惠的<b> 蚂蚁分工基础版</b>，基础版不限使用人数、不限项目数量、不限任务数量。</div>
		<div class='textLimit1'>我们更建议您升级到功能强大的<b> 蚂蚁分工专业版</b>，专业版具有批量任务操作、甘特图、多维度数据统计图表等专业功能，助您提高协同工作效率、提升项目管理水平。</div>`;
    let desc = '<text style="color:#c7c7cc">描述</text>';
    // if (!jurisdiction) {
    //   desc = '<text style="color:#c7c7cc">该任务未填写描述</text>';
    // }
    if (taskInfo && taskInfo.antTaskinfo && taskInfo.antTaskinfo.description) {
      desc = utils.HTMLDecode(
        taskInfo.antTaskinfo.description.split("\n").join("<br />")
      );
    }

    // let titText = '<text style="color:#c7c7cc">标题</text>';
    // if (taskInfo && taskInfo.antTaskinfo && taskInfo.antTaskinfo.taskname) {
    //   titText = utils.HTMLDecode(taskInfo.antTaskinfo.taskname);
    // }

    // 优先级处理
    let youXianJiData = [];
    let selLabel = "请选择",
      selVal = "";
    if (taskInfo.coefficienttype && taskInfo.coefficienttype.length > 0) {
      taskInfo.coefficienttype.map((item, i) => {
        youXianJiData.push({
          value: item && item.value,
          label: item && item.label
        });
        // 选中
        if (
          taskInfo.antTaskinfo &&
          taskInfo.antTaskinfo.coefficienttype &&
          taskInfo.antTaskinfo.coefficienttype == item.value
        ) {
          selLabel = item && item.label;
          selVal = item && item.value;
        }
      });
    }
    let logLength = 0; //讨论条数
    if (taskInfo && taskInfo.leaveList && taskInfo.leaveList.length > 0) {
      taskInfo.leaveList.map((item, i) => {
        if (item.type == "0") {
          logLength++;
        }
      });
    }

    // 协作任务 催办数
    let xieZuoids = [];
    if (
      taskReLevanList.frontTaskinfo &&
      taskReLevanList.frontTaskinfo.length > 0
    ) {
      taskReLevanList.frontTaskinfo.map((item, i) => {
        let task = item.antTaskrelation;
        if (task.state == "0" || task.state == "2") {
          xieZuoids.push(item.antTaskrelation.id);
        }
      });
    }

    // 子任务 催办数
    let Childids = [];
    if (taskChildList && taskChildList.length > 0) {
      taskChildList.map((task, i) => {
        if (task.state == "0" || task.state == "2") {
          Childids.push(task.id);
        }
      });
    }
    let newDateTime = taskPlanDate + " " + taskPlanTime;
    let planDate = "";
    let planTime = "";
    if (
      (taskInfo.antTaskinfo &&
        taskInfo.antTaskinfo.planEndTime &&
        taskInfo.antTaskinfo.planEndTime.slice(11, 19) == "00:00:00") ||
      (taskInfo.antTaskinfo &&
        taskInfo.antTaskinfo.planEndTime &&
        taskInfo.antTaskinfo.planEndTime.slice(11, 19) == "23:59:59")
    ) {
      planDate = taskInfo.antTaskinfo.planEndTime.slice(0, 10);
      planTime = "";
    } else if (
      taskInfo.antTaskinfo &&
      taskInfo.antTaskinfo.planEndTime &&
      taskInfo.antTaskinfo.planEndTime.slice(11, 19) == "02"
    ) {
      planDate = taskInfo.antTaskinfo.planEndTime.slice(0, 10);
      planTime = "00:00";
    } else if (taskInfo.antTaskinfo && taskInfo.antTaskinfo.planEndTime) {
      planDate = taskInfo.antTaskinfo.planEndTime.slice(0, 10);
      planTime = taskInfo.antTaskinfo.planEndTime.slice(11, 16);
    }

    this.state.taskPlanDate = planDate;
    this.state.taskPlanTime = planTime;
    let newYear = new Date(taskPlanDate).getFullYear();
    let newMonth = new Date(taskPlanDate).getMonth() + 1;
    let newDay = new Date(taskPlanDate).getDate();

    const newTaskRealTime =
      taskInfo && taskInfo.antTaskinfo && taskInfo.antTaskinfo.realityEndTime;
    const newTaskPlanTime =
      taskInfo && taskInfo.antTaskinfo && taskInfo.antTaskinfo.planEndTime;
    const _this = this;
    let myClassName = "";
    if (
      taskInfo &&
      taskInfo.taskinfoFiles &&
      taskInfo.taskinfoFiles.length > 0
    ) {
      myClassName = "taskList";
    }
    if (descImgList && descImgList.length > 0) {
      myClassName = "taskList";
    } // (taskInfo &&
    //   taskInfo.taskinfoFiles &&
    //   taskInfo.taskinfoFiles.length > 0) ||
    // descImgList.length > 0
    //   ? "taskList"
    //   : ""

    return (
      <Layout language={language}>
        <div className="pubLayout taskDetails">
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
          <Loading show={taskDetailsLoading} />
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
          {tagSeling ? (
            <TagSelect
              selectList={selectedTags}
              closedCallBack={() => {
                this.setState({
                  tagSeling: false
                });
              }}
              selectedCallBack={val => {
                _this.tagChange(val);
              }}
              canAdd={true}
            />
          ) : (
              ""
            )}
          {utils.getTeamInfoWithMoney("版本名称", nowUser) === "免费版" &&
            tasAlertShow ? (
              <Alert
                style={{
                  textAlign: "center"
                }}
                title="用量限制"
                msg={tasMax}
                butIsOne="false"
                okButTxt="升级版本"
                closeIconShow={true}
                calCallBack={() => { }}
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
          <div className="bread">
            {taskInfo && taskInfo.parentList && taskInfo.parentList.length > 0
              ? taskInfo.parentList.map((item, i) => {
                if (i == 0) {
                  return (
                    <div key={item.id} className="bo">
                      <span
                        className="textMore"
                        style={{
                          color: "#333"
                        }}
                        onClick={() => {
                          if (isMember) {
                            Router.push(
                              Dingtalk.setDdNavColor(
                                "/mo_projectDetails?projectId=" + item.id
                              )
                            );
                          }
                        }}
                      >
                        {item.taskname}
                      </span>
                      <Icon type="right" />
                    </div>
                  );
                } else if (i == taskInfo.parentList.length - 1) {
                  return (
                    <span
                      className="textMore"
                      key={item.id}
                      onClick={() => {
                        if (isMember) {
                          this.setState({
                            flag: true
                          });
                          Router.push(
                            Dingtalk.setDdNavColor(
                              "/mo_taskDetails?id=" + item.id
                            )
                          );
                        }
                      }}
                    >
                      {item.taskname}
                    </span>
                  );
                } else {
                  return (
                    <div key={item.id} className="bo">
                      <span
                        className="textMore"
                        onClick={() => {
                          if (isMember) {
                            this.setState({
                              flag: true
                            });
                            Router.push(
                              Dingtalk.setDdNavColor(
                                "/mo_taskDetails?id=" + item.id
                              )
                            );
                          }
                        }}
                      >
                        {item.taskname}
                      </span>
                      <Icon type="right" />
                    </div>
                  );
                }
              })
              : ""}
          </div>
          <div className="from" ref="detailScroll">
            {/* 任务名称 */}
            <div
              className="pubDiv"
              style={{
                padding: "15px 15px 15px 40px"
              }}
            >
              <div className="stateNo">
                {taskInfo &&
                  taskInfo.antTaskinfo &&
                  taskInfo.antTaskinfo.taskinfoNumber
                  ? taskInfo.antTaskinfo.taskinfoNumber.numberS + "."
                  : null}
                {taskInfo && taskInfo.antTaskinfo && taskInfo.antTaskinfo.rank
                  ? taskInfo.antTaskinfo.rank
                  : ""}
              </div>
              {taskInfo.antTaskinfo ? (
                <div className="stateStyle">
                  {utils.stateColor(taskInfo.antTaskinfo.stateName)}
                </div>
              ) : (
                  ""
                )}
              {jurisdiction ? (
                <TextareaItem
                  className="input divInput"
                  value={
                    taskInfo &&
                    taskInfo.antTaskinfo &&
                    utils.descToString(taskInfo.antTaskinfo.taskname)
                  }
                  placeholder="标题"
                  count={100}
                  onFocus={() => {
                    _this.titleFocus();
                  }}
                  onBlur={() => {
                    _this.titleBlur();
                  }}
                  disabled={!modifyPermission}
                  ref="title"
                  onChange={e => {
                    _this.editVal("taskname", e);
                  }}
                  autoHeight={true}
                />
              ) : (
                  <div className="taskName textMore">
                    {taskInfo && taskInfo.antTaskinfo
                      ? taskInfo.antTaskinfo.taskname
                      : ""}
                  </div>
                )}
              {jurisdiction ? (
                <div className="collect">
                  {taskInfo &&
                    taskInfo.antTaskinfo &&
                    taskInfo.antTaskinfo.collect ? (
                      <Icon
                        type="anticon-shoucang1"
                        className="collectIcon"
                        onClick={() => {
                          _this.collectTask("1", taskInfo.antTaskinfo.id);
                        }}
                      />
                    ) : (
                      <Icon
                        type="anticon-shoucang"
                        className="collectIcon"
                        onClick={() => {
                          _this.collectTask("0", taskInfo.antTaskinfo.id);
                        }}
                      />
                    )}
                </div>
              ) : (
                  <div className="collect">
                    {taskInfo &&
                      taskInfo.antTaskinfo &&
                      taskInfo.antTaskinfo.collect ? (
                        <Icon type="anticon-shoucang1" className="collectIcon" />
                      ) : (
                        <Icon type="anticon-shoucang" className="collectIcon" />
                      )}
                  </div>
                )}
              {jurisdiction && titleEditing ? (
                <div
                  className="textCount"
                  style={{
                    height: "30px",
                    lineHeight: "30px",
                    position: "absolute",
                    bottom: "5px",
                    right: "16px"
                  }}
                >
                  <span>{taskNameLength}</span>
                  /100
                </div>
              ) : (
                  ""
                )}
            </div>
            {/* 详细信息 */}
            <div className="pubDiv desc cont">
              {jurisdiction ? (
                <TextareaItem
                  className="descBox"
                  value={
                    taskInfo &&
                    taskInfo.antTaskinfo &&
                    utils.descToString(taskInfo.antTaskinfo.description)
                  }
                  onFocus={() => {
                    _this.descFocus();
                  }}
                  onBlur={() => {
                    _this.descBlur();
                  }}
                  placeholder="任务描述"
                  disabled={!modifyPermission}
                  ref="desc"
                  onChange={e => {
                    _this.editVal("description", e);
                  }}
                  autoHeight={true}
                />
              ) : (
                  <div
                    className="descBox"
                    dangerouslySetInnerHTML={{
                      __html: desc
                    }}
                  />
                )}
              <ul className={myClassName}>
                {taskInfo &&
                  taskInfo.taskinfoFiles &&
                  taskInfo.taskinfoFiles.length > 0
                  ? taskInfo.taskinfoFiles.map((item, i) => {
                    if (item.type !== "DELL") {
                      return (
                        <li key={item.id ? item.id : item.fileId}>
                          <div
                            className="name textMore"
                            onClick={() => {
                              _this.previewImage(item);
                            }}
                          >
                            {item.fileName}
                          </div>
                          {jurisdiction && modifyPermission ? (
                            <Icon
                              type="anticon-shanchu"
                              className="del aniButRed"
                              onClick={() => {
                                _this.delFile("描述文件", item);
                              }}
                            />
                          ) : (
                              ""
                            )}
                        </li>
                      );
                    }
                  })
                  : ""}
                {descImgList && descImgList.length > 0
                  ? descImgList.map((item, i) => {
                    if (item.type !== "DELL") {
                      return (
                        <li key={"edscStrImg" + i}>
                          <div
                            className="name textMore"
                            onClick={() => {
                              _this.previewImage(item.src);
                            }}
                          >
                            {utils.getFileNameByUrl(item.src)}
                          </div>
                          {jurisdiction && modifyPermission ? (
                            <Icon
                              type="anticon-shanchu"
                              className="del aniButRed"
                              onClick={() => {
                                _this.delFile("描述文件", item);
                              }}
                            />
                          ) : (
                              ""
                            )}
                        </li>
                      );
                    }
                  })
                  : ""}
              </ul>
              {jurisdiction ? (
                modifyPermission ? (
                  <div className="descTextCount">
                    <Icon
                      type="anticon-fujian"
                      className="aniButGray"
                      onClick={() => {
                        _this.upFiles("0");
                      }}
                    />
                  </div>
                ) : (
                    ""
                  )
              ) : (
                  ""
                )}
            </div>
            {/* 添加标签 */}
            <div className="pubDiv">
              <Icon type="anticon-biaoqian" className="icon" />
              <div className="tit">标签</div>
              <div
                className="text"
                style={{
                  height: "auto",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  flexFlow: "wrap"
                }}
              >
                {taskInfo.label && taskInfo.label.length > 0
                  ? _this.labelsMap(taskInfo.label)
                  : "添加"}
              </div>
              {jurisdiction ? (
                modifyPermission ? (
                  <Icon
                    type="right"
                    className="icon i aniButGray"
                    onClick={() => {
                      this.setState({
                        tagSeling: true
                      });
                    }}
                  />
                ) : (
                    ""
                  )
              ) : (
                  ""
                )}
            </div>
            {/* 负责人 */}
            <div className="pubDiv">
              <Icon
                type="anticon-ren2"
                className="icon"
                style={{
                  margin: "0 10px 0 0"
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

              {jurisdiction && modifyPermission ? (
                <div
                  className="text"
                  style={{
                    height: "30px",
                    lineHeight: "30px"
                  }}
                  onClick={() => {
                    _this.selectUser("负责人", "请选择负责人");
                  }}
                >
                  {taskInfo &&
                    taskInfo.antTaskinfo &&
                    taskInfo.antTaskinfo.userResponse ? (
                      <span className="user">
                        {taskInfo.antTaskinfo.userResponse.nickname}
                      </span>
                    ) : (
                      <span>未安排</span>
                    )}
                  <Icon
                    type="right"
                    className="icon i aniButGray"
                    style={{
                      margin: "7px 0 0 0",
                      float: "right"
                    }}
                  />
                </div>
              ) : (
                  <div
                    className="text"
                    style={{
                      height: "30px",
                      lineHeight: "30px"
                    }}
                  >
                    {taskInfo &&
                      taskInfo.antTaskinfo &&
                      taskInfo.antTaskinfo.userResponse ? (
                        <span className="user">
                          {taskInfo.antTaskinfo.userResponse.nickname}
                        </span>
                      ) : (
                        "未安排"
                      )}
                  </div>
                )}
            </div>
            {/* 确认人 */}
            <div className="pubDiv">
              <Icon
                type="anticon-ren2"
                className="icon"
                style={{
                  margin: "0 10px 0 0"
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
              {jurisdiction && modifyPermission ? (
                <div
                  className="text"
                  style={{
                    height: "30px",
                    lineHeight: "30px"
                  }}
                  onClick={() => {
                    _this.selectUser("确认人", "请选择确认人");
                  }}
                >
                  {taskInfo &&
                    taskInfo.antTaskinfo &&
                    taskInfo.antTaskinfo.userFlow ? (
                      <span className="user">
                        {taskInfo.antTaskinfo.userFlow.nickname}
                      </span>
                    ) : (
                      <span>未安排</span>
                    )}
                  <Icon
                    type="right"
                    className="icon i aniButGray"
                    style={{
                      margin: "7px 0 0 0",
                      float: "right"
                    }}
                  />
                </div>
              ) : (
                  <div
                    className="text"
                    style={{
                      height: "30px",
                      lineHeight: "30px"
                    }}
                  >
                    {taskInfo &&
                      taskInfo.antTaskinfo &&
                      taskInfo.antTaskinfo.userFlow ? (
                        <span className="user">
                          {taskInfo.antTaskinfo.userFlow.nickname}
                        </span>
                      ) : (
                        "未安排"
                      )}
                  </div>
                )}
            </div>
            <div className="pubDiv">
              <Icon
                type="anticon-ren2"
                className="icon"
                style={{
                  margin: "0 10px 0 0"
                }}
              />
              <div
                className="tit"
                style={{
                  height: "30px",
                  lineHeight: "30px"
                }}
              >
                关注人
              </div>
              {jurisdiction && isMember ? (
                <div
                  className="text"
                  style={{
                    height: "30px",
                    lineHeight: "30px"
                  }}
                >
                  {taskInfo &&
                    taskInfo.collectList &&
                    taskInfo.collectList.length > 0
                    ? taskInfo.collectList.map((gzr, i) => {
                      if (i < 3) {
                        return (
                          <span
                            className="user"
                            style={{
                              margin: "0 0 0 3px"
                            }}
                            key={"gzr" + gzr.user.userid}
                          >
                            {gzr.user.nickname}
                          </span>
                        );
                      }
                    })
                    : "点击邀请关注"}
                  {taskInfo &&
                    taskInfo.collectList &&
                    taskInfo.collectList.length > 3 ? (
                      <span>…</span>
                    ) : (
                      ""
                    )}
                  <Icon
                    type="right"
                    className="icon i aniButGray"
                    style={{
                      margin: "7px 0 0 0",
                      float: "right"
                    }}
                    onClick={() => {
                      _this.selectUser("关注人", "邀请关注");
                    }}
                  />
                </div>
              ) : (
                  <div
                    className="text"
                    style={{
                      height: "30px",
                      lineHeight: "30px"
                    }}
                  >
                    {taskInfo &&
                      taskInfo.collectList &&
                      taskInfo.collectList.length > 0
                      ? taskInfo.collectList.map((gzr, i) => {
                        if (i < 3) {
                          return (
                            <span
                              className="user"
                              style={{
                                margin: "0 0 0 3px"
                              }}
                              key={"gzr" + gzr.user.userid}
                            >
                              {gzr.user.nickname}
                            </span>
                          );
                        }
                      })
                      : "没有关注人"}
                    {taskInfo &&
                      taskInfo.collectList &&
                      taskInfo.collectList.length > 3 ? (
                        <span>…</span>
                      ) : (
                        ""
                      )}
                  </div>
                )}
            </div>
            <div className="pubDiv">
              <Icon type="anticon-xuanzeriqi" className="icon" />
              <div className="tit">
                {taskInfo &&
                  taskInfo.antTaskinfo &&
                  (taskInfo.antTaskinfo.stateName === "1" ||
                    taskInfo.antTaskinfo.stateName === "8" ||
                    taskInfo.antTaskinfo.stateName === "9")
                  ? "完成时间"
                  : "截止时间"}
              </div>
              {jurisdiction && modifyPermission ? (
                <div className="text">
                  <div className="dateTimeBox">
                    <div className="dateBox">
                      <DatePicker
                        mode="date"
                        title={
                          taskInfo &&
                            taskInfo.antTaskinfo &&
                            (taskInfo.antTaskinfo.stateName === "1" ||
                              taskInfo.antTaskinfo.stateName === "8" ||
                              taskInfo.antTaskinfo.stateName === "9")
                            ? "完成时间"
                            : "截止时间"
                        }
                        value={
                          taskPlanDate !== ""
                            ? new Date(taskPlanDate)
                            : new Date()
                        }
                        format="YYYY-MM-DD"
                        onChange={date => {
                          _this.dateTimeChange(
                            utils.dateToString(date),
                            taskPlanTime
                          );
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
                    </div>
                    <div className="timeBox">
                      <DatePicker
                        mode="time"
                        title={
                          taskInfo &&
                            taskInfo.antTaskinfo &&
                            (taskInfo.antTaskinfo.stateName === "1" ||
                              taskInfo.antTaskinfo.stateName === "8" ||
                              taskInfo.antTaskinfo.stateName === "9")
                            ? "完成时间"
                            : "截止时间"
                        }
                        disabled={taskPlanDate === "" ? true : false}
                        format="HH:mm"
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
                          _this.dateTimeChange(
                            taskPlanDate,
                            _this.timeChange(date)
                          );
                        }}
                      >
                        <List.Item
                          className="listStyle"
                          onClick={() => {
                            _this.disableTime();
                            console.log(345);
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
                </div>
              ) : taskInfo &&
                taskInfo.antTaskinfo &&
                (taskInfo.antTaskinfo.state === "1" ||
                  taskInfo.antTaskinfo.state === "8" ||
                  taskInfo.antTaskinfo.state === "9") ? (
                    <div className="text">
                      {newTaskRealTime
                        ? newTaskRealTime.slice(11, 19) == "23:59:59" ||
                          newTaskRealTime.slice(11, 16) == "00:00"
                          ? newTaskRealTime.slice(0, 10)
                          : newTaskRealTime.slice(0, 16)
                        : "未设定"}
                    </div>
                  ) : (
                    <div className="text">
                      {newTaskPlanTime
                        ? newTaskPlanTime.slice(11, 19) == "23:59:59" ||
                          newTaskPlanTime.slice(11, 16) == "00:00"
                          ? newTaskPlanTime.slice(0, 10)
                          : newTaskPlanTime.slice(0, 16)
                        : "未设定"}
                    </div>
                  )}
            </div>
            <div className="pubDiv">
              <Icon type="anticon-xuanzeriqi" className="icon" />
              <div className="tit">计划工期</div>
              {jurisdiction && modifyPermission ? (
                <div className="text">
                  <div className="editable">
                    <InputItem
                      value={
                        taskInfo.antTaskinfo && taskInfo.antTaskinfo.workTime
                          ? taskInfo.antTaskinfo.workTime
                          : ""
                      }
                      onChange={e => {
                        _this.editVal("workTime", e);
                      }}
                      type="number"
                      placeholder="0"
                    />
                  </div>
                </div>
              ) : (
                  <div className="text">
                    {taskInfo.antTaskinfo && taskInfo.antTaskinfo.workTime
                      ? taskInfo.antTaskinfo.workTime + "天"
                      : "0"}
                  </div>
                )}
              {jurisdiction && modifyPermission ? (
                <div
                  style={{
                    flex: "0 0 auto",
                    margin: "0 0 0 5px",
                    height: "25px",
                    lineHeight: "24px"
                  }}
                >
                  天
                </div>
              ) : (
                  ""
                )}
            </div>
            <div className="pubDiv">
              <Icon type="anticon-jixiao" className="icon" />
              <div className="tit">任务绩效</div>
              {taskInfo.antTaskinfo &&
                taskInfo.antTaskinfo.stateName !== "4" ? (
                  isManager ? (
                    <div className="text">
                      <div className="editable">
                        <InputItem
                          value={
                            taskInfo.antTaskinfo &&
                              taskInfo.antTaskinfo.flowConten
                              ? taskInfo.antTaskinfo.flowConten
                              : ""
                          }
                          onChange={e => {
                            _this.editVal("flowConten", e);
                          }}
                          type="number"
                          placeholder="0"
                        />
                      </div>
                    </div>
                  ) : jurisdiction ? (
                    modifyPermission ? (
                      <div className="text">
                        <div className="editable">
                          <InputItem
                            value={
                              taskInfo.antTaskinfo &&
                                taskInfo.antTaskinfo.flowConten
                                ? taskInfo.antTaskinfo.flowConten
                                : ""
                            }
                            onChange={e => {
                              _this.editVal("flowConten", e);
                            }}
                            type="number"
                            placeholder="0"
                          />
                        </div>
                      </div>
                    ) : (
                        <div className="text">
                          {taskInfo.antTaskinfo && taskInfo.antTaskinfo.flowConten
                            ? taskInfo.antTaskinfo.flowConten
                            : "0"}
                        </div>
                      )
                  ) : (
                        <div className="text">
                          {taskInfo.antTaskinfo && taskInfo.antTaskinfo.flowConten
                            ? taskInfo.antTaskinfo.flowConten
                            : "0"}
                        </div>
                      )
                ) : (
                  ""
                )}
            </div>
            <div className="pubDiv">
              <Icon type="anticon-icon-class-a" className="icon" />
              <div className="tit">优先级</div>
              {jurisdiction && modifyPermission ? (
                <div className="text">
                  <Picker
                    data={youXianJiData}
                    cols={1}
                    // extra={selLabel}
                    onOk={e => {
                      _this.editVal("coefficienttype", e[0]);
                    }}
                    value={[selVal]}
                  >
                    <List.Item className="listStyle">
                      <Icon
                        type="right"
                        className="icon i aniButGray"
                        style={{
                          float: "right"
                        }}
                      />
                      {selLabel}
                    </List.Item>
                  </Picker>
                </div>
              ) : (
                  <div className="text">{selLabel}</div>
                )}
            </div>
            {/* {repeatType == "1" &&
              this.props.repeatPlanObj &&
              this.props.repeatPlanObj.repeatObj &&
              this.props.repeatPlanObj.repeatObj.day
              ? `每${this.props.repeatPlanObj.repeatObj.day}天重复`
              : ""}
            {repeatType == "2" &&
              this.props.repeatPlanObj &&
              this.props.repeatPlanObj.repeatObj &&
              this.props.repeatPlanObj.repeatObj.week
              ? `每${this.props.repeatPlanObj.repeatObj.week}周${this
                .props.repeatPlanObj.repeatObj.weekDay &&
              this.props.repeatPlanObj.repeatObj.weekDay.join(
                ","
              )}重复`
              : ""}
            {repeatType == "3" &&
              this.props.repeatPlanObj &&
              this.props.repeatPlanObj.repeatObj &&
              this.props.repeatPlanObj.repeatObj.month
              ? `每${this.props.repeatPlanObj.repeatObj.month}月重复`
              : ""}
            {this.props.repeatPlanObj &&
              this.props.repeatPlanObj.repeatObj &&
              this.props.repeatPlanObj.repeatObj.isWeekend
              ? "-跳过周六、周日"
              : ""}  */}
            <div className="pubDiv cont">
              <div className="top">
                <Icon type="anticon-xunhuan" className="icon" />
                <div className="tit">重复规则</div>
                <div className="text">
                  {attstr01 ? "" : "请选择"}
                  {attstr01 && antCyclicTaskinfo && antCyclicTaskinfo.day ? `每${antCyclicTaskinfo.day}天重复`
                    : ""}
                  {attstr01 && antCyclicTaskinfo && antCyclicTaskinfo.week ? `每${antCyclicTaskinfo.week}周${antCyclicTaskinfo.weekDay}重复`
                    : ""}
                  {attstr01 && antCyclicTaskinfo && antCyclicTaskinfo.month ? `每${antCyclicTaskinfo.month}月重复`
                    : ""}
                  {attstr01 && antCyclicTaskinfo && antCyclicTaskinfo.isWeekend && antCyclicTaskinfo.isWeekend != '0' ? "-跳过周六、周日" : ""}
                </div>
                <Icon
                  type="right"
                  className="icon i aniButGray"
                  onClick={this.goPlanPage}
                />
              </div>

              <div
                className="add"
                style={{
                  padding: "15px 0 0 0"
                }}
              >
                仅PC端可修改重复规则
              </div>
            </div>
            <div className="pubDiv cont">
              <div className="top">
                <Icon type="anticon-lvzhou_fenzhichangsuo" className="icon" />
                <div className="tit">子任务</div>
                {createPermission ? (
                  <div
                    className="text"
                    onClick={() => _this.setOpenListVal("子任务")}
                  >
                    {taskInfo && taskInfo.antTaskinfo && taskInfo.antTaskinfo
                      ? taskInfo.antTaskinfo.childSuccess
                      : ""}
                    /
                    {taskInfo && taskInfo.antTaskinfo && taskInfo.antTaskinfo
                      ? taskInfo.antTaskinfo.childCount
                      : ""}
                    <Icon type="right" className="icon i aniButGray" />
                  </div>
                ) : (
                    <div className="text">
                      {taskInfo && taskInfo.antTaskinfo && taskInfo.antTaskinfo
                        ? taskInfo.antTaskinfo.childSuccess
                        : ""}
                      /
                    {taskInfo && taskInfo.antTaskinfo && taskInfo.antTaskinfo
                        ? taskInfo.antTaskinfo.childCount
                        : ""}
                      <Icon type="right" className="icon i aniButGray" />
                    </div>
                  )}
              </div>
              {openList.indexOf("子任务") !== -1 ? (
                <ul className={taskChildList.length ? "taskList" : ""}>
                  <Loading show={taskChildLoading} classStr="loading_minSize" />
                  {taskChildList && taskChildList.length > 0
                    ? taskChildList.map((item, i) => {
                      return (
                        <li
                          key={item.id}
                          onClick={() => {
                            this.setState({
                              flag: true
                            });
                            Router.push(
                              Dingtalk.setDdNavColor(
                                "/mo_taskDetails?id=" + item.id
                              )
                            );
                          }}
                        >
                          <div className="name textMore">{item.taskname}</div>
                          <div className="user">
                            {item.userResponse
                              ? item.userResponse.nickname
                              : "无"}
                          </div>
                          {utils.getStateNameByNo(item)}
                        </li>
                      );
                    })
                    : ""}
                </ul>
              ) : (
                  ""
                )}
              {openList.indexOf("子任务") !== -1 ? (
                <div className="addshow">
                  {taskInfo.antTaskinfo &&
                    taskInfo.antTaskinfo.stateName !== "1" &&
                    taskInfo.antTaskinfo.stateName !== "8" &&
                    taskInfo.antTaskinfo.stateName !== "9" &&
                    taskInfo.antTaskinfo.stateName !== "4" ? (
                      createPermission ? (
                        <Icon
                          type="anticon-tianjia"
                          className="aniButGray"
                          onClick={() => {
                            _this.createTaskChild();
                          }}
                        />
                      ) : (
                          ""
                        )
                    ) : (
                      ""
                    )}
                  {Childids.length > 0 ? (
                    <div
                      className="cuiban aniButGray"
                      onClick={() => {
                        _this.cuiban(Childids, "1");
                      }}
                    >
                      全部催办
                    </div>
                  ) : (
                      ""
                    )}
                  <span>PC端可批量导入创建子任务</span>
                </div>
              ) : (
                  ""
                )}
            </div>
            <div className="pubDiv cont">
              <div className="top">
                <Icon type="anticon--qianzhi" className="icon" />
                <div className="tit">前序任务</div>
                <div className="text" />
                <Icon
                  type="right"
                  className="icon i aniButGray"
                  onClick={() => _this.setOpenListVal("前序任务")}
                />
              </div>
              {openList.indexOf("前序任务") !== -1 ? (
                <ul
                  className={
                    taskReLevanList.frontTaskinfo &&
                      taskReLevanList.frontTaskinfo.length > 0
                      ? "taskList"
                      : ""
                  }
                >
                  <Loading
                    show={taskReLevanceLoading}
                    classStr="loading_minSize"
                  />
                  {taskReLevanList.frontTaskinfo &&
                    taskReLevanList.frontTaskinfo.length > 0
                    ? taskReLevanList.frontTaskinfo.map((item, i) => {
                      return (
                        <li
                          key={item.antTaskrelation.id}
                          onClick={() => {
                            if (isMember) {
                              this.setState({
                                flag: true
                              });

                              Router.push(
                                Dingtalk.setDdNavColor(
                                  "/mo_taskDetails?id=" +
                                  item.antTaskrelation.id
                                )
                              );
                            }
                          }}
                        >
                          <div className="name textMore">
                            {item.antTaskrelation.taskname}
                          </div>
                          <div className="user textMore">
                            {item.antTaskrelation.userResponse
                              ? item.antTaskrelation.userResponse.nickname
                              : "无"}
                          </div>
                          {utils.getStateNameByNo(item.antTaskrelation)}
                        </li>
                      );
                    })
                    : ""}
                </ul>
              ) : (
                  ""
                )}
              {openList.indexOf("前序任务") !== -1 ? (
                <div
                  className="add"
                  style={{
                    padding: "15px 0 0 0"
                  }}
                >
                  {xieZuoids.length > 0 ? (
                    <span
                      className="cuiban"
                      style={{
                        float: "left"
                      }}
                      onClick={() => {
                        if (isMember) {
                          _this.cuiban(xieZuoids, "2");
                        }
                      }}
                    >
                      全部催办
                    </span>
                  ) : (
                      ""
                    )}
                  PC端可添加或移除前序任务
                </div>
              ) : (
                  ""
                )}
            </div>
            <div className="pubDiv cont">
              <div className="top">
                <Icon type="anticon--houzhi" className="icon" />
                <div className="tit">后序任务</div>
                <div className="text" />
                <Icon
                  type="right"
                  className="icon i aniButGray"
                  onClick={() => _this.setOpenListVal("后序任务")}
                />
              </div>
              {openList.indexOf("后序任务") !== -1 ? (
                <ul
                  className={
                    taskReLevanList.nextTaskinfo &&
                      taskReLevanList.nextTaskinfo.length > 0
                      ? "taskList"
                      : ""
                  }
                >
                  <Loading
                    show={taskReLevanceLoading}
                    classStr="loading_minSize"
                  />
                  {taskReLevanList.nextTaskinfo &&
                    taskReLevanList.nextTaskinfo.length > 0
                    ? taskReLevanList.nextTaskinfo.map((item, i) => {
                      return (
                        <li
                          key={item.antTaskrelation.id}
                          onClick={() => {
                            if (isMember) {
                              this.setState({
                                flag: true
                              });
                              Router.push(
                                Dingtalk.setDdNavColor(
                                  "/mo_taskDetails?id=" +
                                  item.antTaskrelation.id
                                )
                              );
                            }
                          }}
                        >
                          <div className="name textMore">
                            {item.antTaskrelation.taskname}
                          </div>
                          <div className="user textMore">
                            {item.antTaskrelation.userResponse
                              ? item.antTaskrelation.userResponse.nickname
                              : "无"}
                          </div>
                          {utils.getStateNameByNo(item.antTaskrelation)}
                        </li>
                      );
                    })
                    : ""}
                </ul>
              ) : (
                  ""
                )}
              {openList.indexOf("后序任务") !== -1 ? (
                <div
                  className="add"
                  style={{
                    padding: "15px 0 0 0"
                  }}
                >
                  PC端可添加或移除后序任务
                </div>
              ) : (
                  ""
                )}
            </div>

            <div className="pubDiv cont">
              <div className="top">
                <Icon type="anticon-fujian" className="icon" />
                <div className="tit">文件</div>
                {taskInfo.antTaskinfo &&
                  taskInfo.antTaskinfo.state == "0" &&
                  modifyPermission ? (
                    <div
                      className="text"
                      onClick={() => {
                        _this.upFiles("3");
                      }}
                    >
                      <span className="aniButGray">添加</span>
                      <Icon type="right" className="icon i aniButGray" />
                    </div>
                  ) : (
                    ""
                  )}
              </div>
              <ul
                className={
                  taskFilesList.frontFileList.length > 0 ||
                    taskFilesList.taskinfoFiles.length > 0
                    ? "taskList"
                    : ""
                }
              >
                <Loading show={taskFilesLoading} />
                {taskFilesList.frontFileList &&
                  taskFilesList.frontFileList.length > 0
                  ? taskFilesList.frontFileList.map((item, i) => {
                    return (
                      <li key={item.id}>
                        <div
                          className="name textMore"
                          onClick={() => {
                            _this.previewImage(item);
                          }}
                        >
                          {item.fileName}
                        </div>
                        <div className="type qxColor">前序成果</div>
                        <span className="down" />
                      </li>
                    );
                  })
                  : ""}
                {taskFilesList.taskinfoFiles &&
                  taskFilesList.taskinfoFiles.length > 0
                  ? taskFilesList.taskinfoFiles.map((item, i) => {
                    return (
                      <li key={item.id}>
                        <div
                          className="name textMore"
                          onClick={() => {
                            _this.previewImage(item);
                          }}
                        >
                          {item.fileName}
                        </div>
                        <div className="type">成果文件</div>
                        {taskInfo.antTaskinfo &&
                          taskInfo.antTaskinfo.state == "0" &&
                          modifyPermission ? (
                            <Icon
                              type="anticon-shanchu"
                              className="del aniButRed"
                              onClick={() => {
                                _this.delFile("成果文件", item.id);
                              }}
                            />
                          ) : (
                            <span className="down" />
                          )}
                      </li>
                    );
                  })
                  : ""}
              </ul>
            </div>
            <div className="pubDiv">
              <Icon type="anticon-xiaoshoudongtai" className="icon" />
              <div className="tit">讨论</div>
              <div
                className="talkNum"
                style={{
                  padding: "1px 10px 0 10px"
                }}
              >
                <span>{logLength}条</span>
                <span className="daily">日志</span>
              </div>
              <Switch
                checked={logShow}
                color="#1296db"
                onClick={checked => {
                  this.setState({
                    logShow: checked
                  });
                }}
              />
            </div>
            {taskInfo.leaveList && taskInfo.leaveList.length > 0
              ? utils
                .arrItemSort(taskInfo.leaveList, "createDate", 1, 1)
                .map((item, i) => {
                  let desc =
                    item.description &&
                    item.description.split("\n").join("<br>");
                  if (item.type == "1") {
                    if (logShow) {
                      return (
                        <div className="pubDiv talk" key={taskId + "log" + i}>
                          <div className="dateNew">
                            {_this.getDate(item.createDate)}
                          </div>
                          <div className="logText">
                            <div className="logLogo" />
                            <div
                              className="centerLog"
                              dangerouslySetInnerHTML={{
                                __html: desc
                              }}
                            />
                          </div>
                        </div>
                      );
                    }
                  } else {
                    let desc = item.description
                      .replace(
                        atRegRuler,
                        "<span className='markLeft' style='color: rgba(255, 167, 38, 1);font - size: 14px;text - align: left;'>@" +
                        "$2" +
                        "</span>"
                      )
                      .split("</div>")
                      .join("");
                    let desc1 = desc.split("<div>").join("<br>");
                    let desc2 = desc1.split("\n").join("<br>");
                    return (
                      <div className="pubDiv talk" key={taskId + "log" + i}>
                        <div className="top">
                          <div className="user textMore">
                            {item.createBy && item.createBy.photo
                              ? _this.userPhoto(item.createBy)
                              : item.createBy.nickname}
                          </div>
                          <div className="name textMore">
                            {item.createBy.name}
                          </div>
                          <div className="date">
                            {_this.getDate(item.createDate)}
                          </div>
                        </div>
                        <div
                          className="center"
                          dangerouslySetInnerHTML={{
                            __html: desc2
                          }}
                        />
                        <div className="bottom">
                          {item.files && item.files.length > 0
                            ? item.files.map((ite, i) => {
                              return (
                                <div
                                  style={{
                                    textAlign: "left"
                                  }}
                                  key={ite.id}
                                  onClick={() => {
                                    Dingtalk.previewImage(ite);
                                  }}
                                >
                                  <div className="fileName textMore white aniBut">
                                    <Icon type="anticon-fujian" />
                                    {ite.fileName}
                                  </div>
                                </div>
                              );
                            })
                            : ""}
                          <Icon
                            type="anticon-ai207"
                            className="back"
                            onClick={() => {
                              this.setState({
                                addTalkShow: true,
                                talkHtml: "@" + item.createBy.name + "&nbsp",
                                talkReplyUserId: item.createBy.id
                              });
                            }}
                          />
                          {nowUser &&
                            item.createBy &&
                            nowUser.id == item.createBy.id ? (
                              <Icon
                                type="anticon-shanchu"
                                className="del aniButRed"
                                onClick={() => {
                                  _this.talkDelete(item.id);
                                }}
                              />
                            ) : (
                              ""
                            )}
                        </div>
                      </div>
                    );
                  }
                })
              : ""}
          </div>
          {editData.indexOf(true) !== -1 ? (
            <div className="buts twoButs">
              <div
                className="but aniBut"
                onClick={() => {
                  _this.cancelSave();
                }}
              >
                取消
              </div>
              <div
                className="but blue aniBut"
                onClick={() => {
                  _this.updateTaskInfo();
                }}
              >
                保存
              </div>
            </div>
          ) : (
              ""
            )}
          <div className="buts">
            <div
              className="but aniBut"
              onClick={e => {
                console.log("123");
                this.setState({
                  addTalkShow: true
                });
              }}
            >
              <Icon type="anticon-discuss" />
              <p>参与讨论</p>
            </div>
            {taskInfo.antTaskinfo &&
              taskInfo.antTaskinfo.state == "0" &&
              (taskInfo.antTaskinfo.userResponse &&
                nowUser &&
                taskInfo.antTaskinfo.userResponse.id == nowUser.id) ? (
                <div
                  className="but aniBut"
                  onClick={() => {
                    if (
                      taskInfo.antTaskinfo.childCount >
                      taskInfo.antTaskinfo.childSuccess
                    ) {
                      _this.alertModal(
                        "标记完成子任务",
                        "",
                        "完成子任务，并继续",
                        "取消",
                        "催办子任务",
                        `共包含（${taskInfo.antTaskinfo.childCount -
                        taskInfo.antTaskinfo.childSuccess}）个未完成的子任务`
                      );
                    } else {
                      //标记完成功能
                      // _this.alertModal(
                      //   "标记完成",
                      //   "可填写完成说明",
                      //   "完成",
                      //   "取消"
                      // );
                      this.biaoji();
                    }
                  }}
                >
                  <Icon type="check-circle" />
                  <p>标记完成</p>
                </div>
              ) : (
                ""
              )}
            {taskInfo.antTaskinfo &&
              taskInfo.antTaskinfo.state == "0" &&
              (taskInfo.antTaskinfo.userResponse &&
                nowUser &&
                taskInfo.antTaskinfo.userResponse.id !== nowUser.id) ? (
                <div
                  className="but aniBut"
                  onClick={() => {
                    _this.cuiban([taskInfo.antTaskinfo.id], "");
                  }}
                >
                  <Icon type="anticon-tixing" />
                  <p>催办</p>
                </div>
              ) : (
                ""
              )}
            {taskInfo.antTaskinfo &&
              (taskInfo.antTaskinfo.state == "2" &&
                (taskInfo.antTaskinfo.userFlow &&
                  nowUser &&
                  taskInfo.antTaskinfo.userFlow.id == nowUser.id)) ? (
                <div
                  className="but aniBut"
                  onClick={() => {
                    _this.alertModal(
                      "确认任务",
                      "可填写通过说明",
                      "确认完成",
                      "取消"
                    );
                  }}
                >
                  <Icon type="check-circle" />
                  <p>确认完成</p>
                </div>
              ) : (
                ""
              )}
            {taskInfo.antTaskinfo &&
              (taskInfo.antTaskinfo.state == "2" &&
                (taskInfo.antTaskinfo.userFlow &&
                  nowUser &&
                  taskInfo.antTaskinfo.userFlow.id == nowUser.id &&
                  taskInfo.antTaskinfo.userResponse.id !== nowUser.id)) ? (
                <div
                  className="but aniBut"
                  onClick={() => {
                    _this.alertModal(
                      "任务驳回",
                      "可填写驳回说明",
                      "驳回重做",
                      "取消"
                    );
                  }}
                >
                  <Icon type="cross-circle-o" />
                  <p>驳回重做</p>
                </div>
              ) : (
                ""
              )}
            {taskInfo.antTaskinfo &&
              (taskInfo.antTaskinfo.state == "2" &&
                (taskInfo.antTaskinfo.userResponse &&
                  nowUser &&
                  taskInfo.antTaskinfo.userResponse.id == nowUser.id)) ? (
                <div
                  className="but aniBut"
                  onClick={() => {
                    _this.taskUpdateState("0");
                  }}
                >
                  <Icon type="anticon-chehui" />
                  <p>撤回</p>
                </div>
              ) : (
                ""
              )}
            {taskInfo.antTaskinfo && taskInfo.antTaskinfo.beginButton ? (
              <div
                className="but aniBut"
                onClick={() => {
                  if (modifyPermission) {
                    _this.taskUpdateState("0");
                  } else {
                    Toast.fail(`您没有修改这条任务的权限`);
                  }
                }}
              >
                <Icon type="anticon-kuangjizhongqi" />
                <p>重启任务</p>
              </div>
            ) : (
                ""
              )}
            {taskInfo.antTaskinfo && taskInfo.antTaskinfo.state == "3" ? (
              <div
                className="but aniBut"
                onClick={() => {
                  _this.taskUpdateState("0");
                }}
              >
                <Icon type="anticon-renling" />
                <p>认领任务</p>
              </div>
            ) : (
                ""
              )}
          </div>
          {addTalkShow ? (
            <div
              className="pushTalk"
              onClick={() => {
                this.setState({
                  addTalkShow: false
                });
              }}
            >
              <div
                className="talkFrom"
                onClick={e => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
              >
                <div className="pubDiv">
                  <ContentEditable
                    className="text"
                    html={talkHtml}
                    onChange={e => {
                      _this.talkChange(e.target.value);
                    }}
                  />
                  <div className="p">
                    <Icon
                      type="anticon-fujian"
                      onClick={() => {
                        _this.upFiles("1");
                      }}
                    />
                    <span>{talkTextLength}</span>
                    /100
                  </div>
                </div>
                {talkFiles.length > 0 ? (
                  <ul>
                    {talkFiles.map((item, i) => {
                      return (
                        <li key={item.fileId}>
                          <Icon type="anticon-fujian" />
                          <span className="textMore">{item.fileName}</span>
                          {modifyPermission ? (
                            <Icon
                              className="del aniButRed"
                              type="anticon-shanchu"
                              onClick={() => {
                                _this.delFile("评论文件", item.fileId);
                              }}
                            />
                          ) : (
                              ""
                            )}
                        </li>
                      );
                    })}
                    <div
                      style={{
                        clear: "both"
                      }}
                    />
                  </ul>
                ) : (
                    ""
                  )}
                <Button
                  size="small"
                  type="primary"
                  className="forbiddenCopy"
                  onClick={() => {
                    _this.addTalk();
                  }}
                >
                  发布
                </Button>
                <Button
                  size="small"
                  className="forbiddenCopy"
                  onClick={() => {
                    this.setState({
                      addTalkShow: false
                    });
                  }}
                >
                  取消
                </Button>
              </div>
            </div>
          ) : (
              ""
            )}
          {alertModalShow ? (
            <div className="alertModal">
              <div className="modal">
                <div className="tit">{alertModal.tit}</div>
                {alertModal.inputTxt ? (
                  <TextareaItem
                    placeholder={alertModal.inputTxt}
                    onChange={val => {
                      this.setState({
                        upText: val
                      });
                    }}
                    autoHeight
                  />
                ) : (
                    ""
                  )}
                {alertModal.alert ? <p>{alertModal.alert}</p> : ""}
                <Button
                  type="primary"
                  className="forbiddenCopy"
                  onClick={() => {
                    _this.taskUpdateState(upState, upText);
                  }}
                >
                  {alertModal.yesButName}
                </Button>
                {alertModal.yes2ButName ? (
                  <Button
                    className="forbiddenCopy"
                    type="primary"
                    onClick={() => {
                      _this.cuibanTaskChild();
                    }}
                  >
                    {alertModal.yes2ButName}
                  </Button>
                ) : (
                    ""
                  )}
                <Button
                  className="forbiddenCopy"
                  onClick={() => {
                    this.setState({
                      alertModalShow: false
                    });
                  }}
                >
                  {alertModal.noButName}
                </Button>
              </div>
            </div>
          ) : (
              ""
            )}
        </div>
      </Layout>
    );
  }
}
function mapStateToProps(state) {
  return {
    taskDetails: state.task.taskDetails,
    taskChildList: state.task.taskChildList,
    taskRelevanceList: state.task.taskRelevanceList,
    taskFilesList: state.task.taskFilesList,
    taskInfoUpdateData: state.task.taskInfoUpdateData,
    taskInfoUpdateFiles: state.task.taskInfoUpdateFiles,
    taskDeleteFile: state.task.taskDeleteFile,
    taskAddTalk: state.task.taskAddTalk,
    taskDeleteTalk: state.task.taskDeleteTalk,
    taskDelete: state.task.taskDelete,
    taskUpdateState: state.task.taskUpdateState,
    taskCuiBan: state.task.taskCuiBan,
    urlData: state.user.urlData,
    repeatPlanObj: state.task.repeatPlanObj
  };
}
const mapDispatchToProps = dispatch => {
  return {
    getTaskDetailsById: bindActionCreators(
      taskAction.getTaskDetailsById,
      dispatch
    ),
    getTaskDetailsById2: bindActionCreators(
      taskAction.getTaskDetailsById2,
      dispatch
    ),
    getChildListById: bindActionCreators(taskAction.getChildListById, dispatch),
    getReLevanceTaskListById: bindActionCreators(
      taskAction.getReLevanceTaskListById,
      dispatch
    ),
    getTaskFilesListById: bindActionCreators(
      taskAction.getTaskFilesListById,
      dispatch
    ),
    updateTaskinfo: bindActionCreators(taskAction.updateTaskinfo, dispatch),
    upFilesByType: bindActionCreators(taskAction.upFilesByType, dispatch),
    deleteFileByType: bindActionCreators(taskAction.deleteFileByType, dispatch),
    addTalkByTaskId: bindActionCreators(taskAction.addTalkByTaskId, dispatch),
    deleteTalkById: bindActionCreators(taskAction.deleteTalkById, dispatch),
    setTaskCreateBread: bindActionCreators(
      taskAction.setTaskCreateBread,
      dispatch
    ),
    updateTaskStateById: bindActionCreators(
      taskAction.updateTaskStateById,
      dispatch
    ),
    deleteTaskById: bindActionCreators(taskAction.deleteTaskById, dispatch),
    expedite: bindActionCreators(taskAction.expedite, dispatch),
    addAttentionWitchProject: bindActionCreators(
      taskAction.addAttentionWitchProject,
      dispatch
    ),
    cancelAttentionWitchProject: bindActionCreators(
      taskAction.cancelAttentionWitchProject,
      dispatch
    ),
    setUrlData: bindActionCreators(userAction.setUrlData, dispatch),
    setTaskLisToDateltAtCache: bindActionCreators(
      cacheAction.setTaskLisToDateltAtCache,
      dispatch
    ),
    setTaskCountToDatelAtCache: bindActionCreators(
      cacheAction.setTaskCountToDatelAtCache,
      dispatch
    ),
    editTaskLisToDateltAtCache: bindActionCreators(
      cacheAction.editTaskLisToDateltAtCache,
      dispatch
    ),
    getProjectCreateInfoById2: bindActionCreators(
      projectAction.getProjectCreateInfoById2,
      dispatch
    ),
    setReapactTaskinfo: bindActionCreators(
      taskAction.setReapactTaskinfo,
      dispatch
    ),
    setUpdataProjectListAtCache: bindActionCreators(
      cacheAction.setUpdataProjectListAtCache,
      dispatch
    )
  };
};
export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(
  taskDetails
);
