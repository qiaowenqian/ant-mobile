import React, { Component } from "react";
import { bindActionCreators } from "redux";
import {
  DatePicker,
  Icon,
  Picker,
  Toast,
  InputItem,
  PullToRefresh,
  ListView
} from "antd-mobile";
import withRedux from "next-redux-wrapper";
import Router from "next/router";
import mobileStyle from "antd-mobile/dist/antd-mobile.min.css";

import { initStore } from "../store";
import stylesheet from "styles/pages/task.scss";
import Layout from "../components/Layout";
import Loading from "../components/Loading";
import MenuBar from "../components/MenuBar";
import Friendly from "../components/Friendly";
import SelectDownList from "../components/SelectDownList";
import * as taskAction from "../actions/task";
import * as cacheAction from "../actions/cache";
import * as userAction from "../actions/user";
import Dingtalk from "../utils/dingtalk";
import utils from "../utils/utils";
import ProjectSelect from "../components/ProjectSelect";
import Tag from "../components/Tag";
import Storage from "../utils/storage";
import _ from "lodash";
let scrollFlag = true;
const oneSearch = [
  {
    value: "all",
    label: "全部"
  },
  {
    value: "sub1",
    label: "我负责的"
  },
  {
    value: "my_succeed",
    label: "我确认的"
  },
  {
    value: "my_add",
    label: "我创建的"
  },
  { value: "my_be", label: "我指派的" },
  {
    value: "my_attention",
    label: "我关注的"
  }
];

let twoSearch = [
  {
    value: "",
    label: "全部"
  },
  {
    value: "0",
    label: "进行中的"
  },
  {
    value: "2",
    label: "待确认的"
  },
  {
    value: "1",
    label: "已完成的"
  },
  {
    value: "4",
    label: "已终止的"
  }
];

/*
   {
    'value':2,
    'label':'关注人',
    'children':[]
   },
 */
const userTypeList = [
  {
    value: 0,
    label: "负责人",
    children: []
  },
  {
    value: 1,
    label: "确认人",
    children: []
  },
  {
    value: 3,
    label: "指派人",
    children: []
  },
  {
    value: 4,
    label: "创建人",
    children: []
  }
];

const threeSearch = [
  {
    value: "降序排列",
    label: "降序排列"
  },
  {
    value: "升序排列",
    label: "升序排列"
  }
];

class task extends Component {
  static getInitialProps({ req, store, isServer }) {
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
      taskList: [],
      taskListLoading: true,
      taskListMoreLoading: false,
      nowPage: 1,
      pageCount: 0,
      Listcount: 0,

      loaded: false,

      oneSearchSelecting: false,
      twoSearchSelecting: false,

      startY: 0,
      endY: 0,
      taskListTopLoading: false,

      searchShow: false,
      projectSelectShow: false,
      tagSelectShow: false,
      closeShow: false,
      selectTags: [],
      selectedPros: [],
      selectedUsers: [],
      taskSearch: {
        group: "evolve", //
        labelId: [], //标签
        menuType: "sub1", //默认是我负责的
        panelId: [], //任务状态
        projectIds: [], //项目id
        search: "", //搜索文本
        planTimeSear: {
          //计划工时
          start: "",
          end: ""
        },
        worktimeSear: {
          //完成时间
          min: "",
          max: ""
        },
        flowContenSear: {
          //任务绩效
          min: "",
          max: ""
        },
        // userResponse: {},//负责人 手机端暂时没用
        // userFlow: {},//确认人手机端暂时没用
        // userCreate: {},//创建人手机端暂时没用
        // userAssign: {},//指派人手机端暂时没用
        userSear: {
          type: "0" /* 负责人0 确认人1 关注人2 指派人3 创建人4 */,
          userIds: []
        }
      },
      comeFrom: 0,
      islast: "0",
      //新的列表功能参数
      dataSource,
      refreshing: false,
      isLoading: false,
      // nowPage: 0,
      NUM_ROWS: 30,
      pageLoading: true
    };
  }
  genData() {
    const { taskList } = this.state;
    const dataArr = [];
    for (let i = 0; i < taskList.length; i++) {
      dataArr.push(`row - ${taskList[i].id}`);
    }
    return dataArr;
  }
  setStateTearchFromRedux() {
    const { taskSearch, dataSource } = this.state;
    const { taskSearchObject } = this.props;

    //加载之前先看redux里有没有保存的值
    // debugger;
    if (taskSearchObject.menuType) {
      if (Router && Router.router && Router.router.query.menuType) {
        taskSearchObject.menuType = Router.router.query.menuType;
        taskSearchObject.panelId = [Router.router.query.panelId];
        this.setState({
          comeFrom: 1,
          pageLoading: true
        });
        // debugger;
        this.props.setTaskSearchObject(taskSearchObject);
        this.getTaskList(this.state.nowPage, taskSearchObject);
      } else {
        this.setState(
          {
            // taskSearch: newSearchObject,
            taskList: JSON.parse(JSON.stringify(this.props.taskListToDel)),
            Listcount: this.props.taskCountToDel,
            pageCount: this.props.taskAllCountToDel,
            taskListLoading: false
          },
          () => {
            this.rData = this.genData();
            this.setState({
              dataSource: dataSource.cloneWithRows(this.rData),
              pageLoading: false
            });
          }
        );
        if (this.props.nowPage) {
          this.setState({
            nowPage: this.props.nowPage
          });
        }
      }

      //这个cancleClick功能 其实就是更新筛选页面初始值的（复用方法）
      this.cancleClick();
      //根据第一个条件更新二及条件联动
      this.switchTwoSearch();
    } else {
      if (Router && Router.router && Router.router.query.menuType) {
        taskSearch.menuType = Router.router.query.menuType;
        taskSearch.panelId = [Router.router.query.panelId];
        this.setState({
          comeFrom: 1,
          pageLoading: true
        });
      }
      let Obj = _.cloneDeep(taskSearch);
      this.props.setTaskSearchObject(Obj);
      //存项目数据

      this.props.setSelectedPros([]);
      //存标签数据
      this.props.setSelectedTag([]);
      //存所选人员详细信息
      this.props.setSelectedUsers([]);
      this.getTaskList(this.state.nowPage, taskSearch);
    }
  }
  //更新reduce二级选择
  switchTwoSearch() {
    const { taskSearchObject } = this.props;
    if (
      taskSearchObject.menuType == "sub1" ||
      taskSearchObject.menuType == "my_be"
    ) {
      twoSearch = [
        {
          value: "",
          label: "全部"
        },
        {
          value: "0",
          label: "进行中的"
        },
        {
          value: "2",
          label: "待确认的"
        },
        {
          value: "1",
          label: "已完成的"
        },
        {
          value: "4",
          label: "已终止的"
        }
      ];
    } else {
      twoSearch = [
        {
          value: "",
          label: "全部"
        },
        {
          value: "3",
          label: "未指派的"
        },
        {
          value: "0",
          label: "进行中的"
        },
        {
          value: "2",
          label: "待确认的"
        },
        {
          value: "1",
          label: "已完成的"
        },
        {
          value: "4",
          label: "已终止的"
        }
      ];
    }
  }

  componentWillMount() {
    Dingtalk.setTitle("任务");
    Dingtalk.setMenuHome();
    //初始化数据校验发起请求
    this.setStateTearchFromRedux();
  }

  componentDidMount() {
    utils.butAnimate();
    const user = Storage.getSession("user");
    if (user && user.userid) {
      if (!this.props.urlData) {
        this.props.setUrlData(encodeURIComponent(location.href.split("#")[0]));
      }
    }

    if (this.props.taskScrollTop > 0) {
      if (this.refs.taskListScroll) {
        this.refs.taskListScroll.scrollTop = this.props.taskScrollTop;
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log("componentWillReceiveProps");
    // this.setStateTearchFromRedux();
  }

  componentDidUpdate() {
    utils.butAnimate();
  }
  //跳转首页，项目，动态页面时，清空筛选后的redux数据，来更新数据
  componentWillUnmount() {
    //只要跳转出这个页面就保存信息
    this.saveTaskListInfo();
  }
  getTaskList(pageNo = 1, search, topScroll, pageSize = 30, flag) {
    const { dataSource, refreshing } = this.state;
    if (pageNo == 1 && !refreshing) {
      this.setState({
        pageLoading: true
      });
    }
    if (search) {
      if (search.userSear.type == '0') {
        search.userResponses = search.userSear.userIds
      }
      if (search.userSear.type == '1') {
        search.userFlows = search.userSear.userIds
      }
      if (search.userSear.type == '3') {
        search.userCreates = search.userSear.userIds
      }
      if (search.userSear.type == '4') {
        search.userAssigns = search.userSear.userIds
      }
      // userResponse: {},//负责人 手机端暂时没用
      // userFlow: {},//确认人手机端暂时没用
      // userCreate: {},//创建人手机端暂时没用
      // userAssign: {},//指派人手机端暂时没用
    }
    taskAction.getTaskListByCondition(pageNo, pageSize, search, res => {
      scrollFlag = true;
      if (res.success) {
        if (res.data.taskinfos) {
          if (res.data.taskinfos.list) {
            let savedata = res.data.taskinfos.list;
            this.props.saveTaskListAtCache(
              JSON.parse(JSON.stringify(savedata))
            );
          }
          // 总页数, 总条数, 当前页数 更新
          this.setState({
            pageCount: res.data.taskinfos.last,
            Listcount: res.data.taskinfos.count,
            nowPage: res.data.taskinfos.pageNo,
            islast: res.data.taskinfos.isLast
          });
          // 根据返回的页数判断是 直接替换数据 还是追加数据
          if (res.data.taskinfos.pageNo == 1) {
            if (res.data.taskinfos.list) {
              this.setState(
                {
                  taskList: res.data.taskinfos.list
                },
                () => {
                  this.rData = this.genData();
                  this.setState({
                    dataSource: dataSource.cloneWithRows(this.rData)
                  });
                }
              );
            } else {
              this.setState(
                {
                  taskList: []
                },
                () => {
                  this.rData = this.genData();
                  this.setState({
                    dataSource: dataSource.cloneWithRows(this.rData)
                  });
                }
              );
            }
            if (this.refs.taskListScroll) {
              this.refs.taskListScroll.scrollTop = 0;
            }
          } else {
            let data = res.data.taskinfos.list;
            let { taskList } = this.state;

            data &&
              data.map((item, i) => {
                taskList.push(item);
              });
            this.setState(
              {
                taskList: taskList
              },
              () => {
                this.rData = this.genData();
                this.setState({
                  dataSource: dataSource.cloneWithRows(this.rData)
                });
              }
            );
          }
        } else {
          if (pageNo == 1) {
            this.setState(
              {
                taskList: []
              },
              () => {
                this.rData = this.genData();
                this.setState({
                  dataSource: dataSource.cloneWithRows(this.rData)
                });
              }
            );
          } else {
            Toast.fail("网络好像不给力哦", 1);
          }
        }
      } else {
        if (pageNo == 1) {
          this.setState(
            {
              taskList: []
            },
            () => {
              this.rData = this.genData();
              this.setState({
                dataSource: dataSource.cloneWithRows(this.rData)
              });
            }
          );
        } else {
          Toast.fail("网络好像不给力哦", 1);
        }
      }
      this.setState({
        taskListLoading: false,
        taskListMoreLoading: false,
        taskListTopLoading: false,
        pageLoading: false,

        refreshing: false,
        isLoading: false
      });
    });
  }

  selectUser() {
    let { taskSearch, selectedUsers } = this.state;
    let { taskSearchObject } = this.props;
    let type = "";
    userTypeList.map(item => {
      if (item.value == taskSearch.userSear.type) {
        type = item.label;
        return false;
      }
    });
    const that = this;
    Dingtalk.selectUser(
      selectedUsers,
      type,
      users => {
        const selectUsers = [];
        const selectUserIds = [];
        users.map(item => {
          selectUsers.push({
            userid: item.emplId,
            name: item.name
          });
          selectUserIds.push(item.emplId);
          taskSearch.userSear.userIds = selectUserIds;
        });
        that.setState({
          selectedUsers: selectUsers,
          taskSearch: taskSearch
        });
      },
      err => {
        Toast.fail(err, 1);
      },
      true
    );
  }

  dellUserByUserId(userid) {
    let { taskSearch, selectedUsers } = this.state;
    taskSearch.userSear.userIds.splice(
      taskSearch.userSear.userIds.indexOf(userid),
      1
    );
    selectedUsers.map((item, i) => {
      if (item.userid === userid) {
        selectedUsers.splice(i, 1);
        return false;
      }
    });
    this.setState({
      taskSearch: taskSearch,
      selectedUsers: selectedUsers
    });
  }

  conditionChange(type, val) {
    const { taskSearchObject } = this.props;
    //更新页面状态
    let { taskSearch } = this.state;
    if (type == "withMe") {
      taskSearch.menuType = val;
      taskSearch.panelId = [""];
      this.setState({ taskSearch: taskSearch });
    } else if (type == "withState") {
      taskSearch.panelId = [val];
      this.setState({ taskSearch: taskSearch });
    }
    //在一二级选择的时候把条件存到reduce
    if (type == "withMe") {
      taskSearchObject.menuType = val;
      taskSearchObject.panelId = [""];
    } else if (type == "withState") {
      taskSearchObject.panelId = [val];
    }
    this.props.setTaskSearchObject(taskSearchObject);

    this.getTaskList(1, taskSearch);
  }

  searchCondSet(val) {
    // 我负责的 我指派的
    if (val == "sub1" || val == "my_be") {
      twoSearch = [
        {
          value: "",
          label: "全部"
        },
        {
          value: "0",
          label: "进行中的"
        },
        {
          value: "2",
          label: "待确认的"
        },
        {
          value: "1",
          label: "已完成的"
        },
        {
          value: "4",
          label: "已终止的"
        }
      ];
    } else {
      twoSearch = [
        {
          value: "",
          label: "全部"
        },
        {
          value: "3",
          label: "未指派的"
        },
        {
          value: "0",
          label: "进行中的"
        },
        {
          value: "2",
          label: "待确认的"
        },
        {
          value: "1",
          label: "已完成的"
        },
        {
          value: "4",
          label: "已终止的"
        }
      ];
    }
    this.conditionChange("withMe", val);
  }

  searchRender() {
    let { taskSearch, selectedPros, selectTags, selectedUsers } = this.state;
    const CustomChildren = ({ extra, onClick, children }) => (
      <div
        onClick={onClick}
        style={{
          backgroundColor: "#fff",
          height: "45px",
          lineHeight: "45px",
          padding: "0 15px"
        }}
      >
        {children}
        <span style={{ float: "right", color: "#888" }}>{extra}</span>
      </div>
    );
    const CustomChildren1 = ({ extra, onClick, children }) => (
      <div className="title">
        <label>{children}</label>
        <span onClick={onClick}>
          {extra}
          <Icon type="right" />
        </span>
      </div>
    );
    return (
      <div className="searchDiv">
        <div className="searchList">
          <div className="title">
            <label>所属项目</label>
            <span
              onClick={() => {
                this.setState({
                  projectSelectShow: true
                });
              }}
            >
              请选择
              <Icon type="right" />
            </span>
          </div>
          <div className="list">
            {selectedPros &&
              selectedPros.map(item => {
                return (
                  <div className="lab" key={item.id}>
                    <div className="pro textMore">{item.name}</div>
                  </div>
                );
              })}
            <div
              style={{
                clear: "both"
              }}
            />
          </div>
          <div className="title">
            <label>分类标签</label>
            <span
              onClick={() => {
                this.setState({
                  tagSelectShow: true
                });
              }}
            >
              请选择
              <Icon type="right" />
            </span>
          </div>
          <div className="list">
            {selectTags &&
              selectTags.map(item => {
                return (
                  <div className="lab" key={item.id}>
                    <div
                      className={
                        "tag textMore " +
                        utils.getTagColorByColorCode(item.type, item.color)
                      }
                    >
                      {item.labelname}
                    </div>
                  </div>
                );
              })}
            <div
              style={{
                clear: "both"
              }}
            />
          </div>
          <Picker
            title="人员角色"
            data={userTypeList}
            value={[parseInt(taskSearch.userSear.type)]}
            cols={1}
            onChange={val => {
              this.peopleChange(val);
            }}
          >
            <CustomChildren1>人员角色</CustomChildren1>
          </Picker>
          <div className="list">
            {selectedUsers &&
              selectedUsers.map(item => {
                return (
                  <div className="peo" key={item.userid}>
                    <span>{item.name}</span>
                    <Icon
                      type="cross"
                      onClick={() => {
                        this.dellUserByUserId(item.userid);
                      }}
                    />
                  </div>
                );
              })}
            <div
              className="peo"
              onClick={() => {
                this.selectUser();
              }}
            >
              <span>添加</span>
            </div>
            <div
              style={{
                clear: "both"
              }}
            />
          </div>
          <div className="title">
            <label>完成时间</label>
          </div>
          <div
            className="list"
            style={{
              padding: "0 10px",
              border: "0"
            }}
          >
            <div className="fromRow">
              <div className="date">
                <div
                  style={
                    taskSearch.planTimeSear.start
                      ? {}
                      : {
                        opacity: "0"
                      }
                  }
                >
                  <DatePicker
                    mode="date"
                    extra="请选择"
                    value={
                      taskSearch.planTimeSear.start
                        ? new Date(taskSearch.planTimeSear.start)
                        : new Date()
                    }
                    onChange={date => {
                      this.datePickerTimeChanged(date);
                    }}
                  >
                    <CustomChildren />
                  </DatePicker>
                </div>
                {!taskSearch.planTimeSear.start ? (
                  <span className="defaultTxt">请选择</span>
                ) : (
                    ""
                  )}
              </div>
              <div className="icon">-</div>
              <div className="date">
                <div
                  style={
                    taskSearch.planTimeSear.end
                      ? {}
                      : {
                        opacity: "0"
                      }
                  }
                >
                  <DatePicker
                    mode="date"
                    extra="请选择"
                    value={
                      taskSearch.planTimeSear.end
                        ? new Date(taskSearch.planTimeSear.end)
                        : new Date()
                    }
                    onChange={date => {
                      this.datePickerEndTimeChanged(date);
                    }}
                  >
                    <CustomChildren />
                  </DatePicker>
                </div>
                {!taskSearch.planTimeSear.end ? (
                  <span className="defaultTxt">请选择</span>
                ) : (
                    ""
                  )}
              </div>
            </div>
          </div>
          <div className="title">
            <label>计划工期</label>
          </div>
          <div
            className="list"
            style={{
              padding: "0 10px",
              border: "0"
            }}
          >
            <div className="fromRow">
              <div className="input">
                <input
                  value={
                    taskSearch.worktimeSear.min
                      ? taskSearch.worktimeSear.min
                      : ""
                  }
                  onChange={e => {
                    this.planTimeChange(e);
                  }}
                  placeholder="0"
                />
              </div>
              <div className="icon">-</div>
              <div className="input">
                <input
                  value={
                    taskSearch.worktimeSear.max
                      ? taskSearch.worktimeSear.max
                      : ""
                  }
                  onChange={e => {
                    this.planEndTimeChange(e);
                  }}
                  placeholder="0"
                />
              </div>
            </div>
          </div>
          <div className="title">
            <label>任务绩效</label>
          </div>
          <div
            className="list"
            style={{
              padding: "0px 10px 10px",
              border: "0"
            }}
          >
            <div className="fromRow">
              <div className="input">
                <input
                  value={
                    taskSearch.flowContenSear.min
                      ? taskSearch.flowContenSear.min
                      : ""
                  }
                  onChange={e => {
                    this.flowContenChange(e);
                  }}
                  placeholder="0"
                />
              </div>
              <div className="icon">-</div>
              <div className="input">
                <input
                  value={
                    taskSearch.flowContenSear.max
                      ? taskSearch.flowContenSear.max
                      : ""
                  }
                  onChange={e => {
                    this.flowEndContenChange(e);
                  }}
                  placeholder="0"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="searchButs">
          <div
            className="but cal"
            onClick={() => {
              this.cancleClick();
            }}
          >
            取消
          </div>
          <div
            className="but ok"
            onClick={e => {
              this.sureClick(e);
            }}
          >
            确定
          </div>
        </div>
      </div>
    );
  }
  //选择项目时更新taskserch和redux 的taskSearchObject
  projectChange(projects) {
    let { taskSearch } = this.state;
    const ids = [];
    projects.map(item => {
      ids.push(item.id);
    });
    taskSearch.projectIds = ids;
    this.setState({
      taskSearch: taskSearch,
      selectedPros: projects,
      projectSelectShow: false
    });
  }
  //选择标签taskserch和redux 的taskSearchObject
  tagChange(tags) {
    let { taskSearch } = this.state;
    const ids = [];
    tags.map(item => {
      ids.push(item.id);
    });
    taskSearch.labelId = ids;
    this.setState({
      selectTags: tags
    });
    this.setState({ taskSearch: taskSearch });
  }

  clearSearch() {
    const taskSearch = {
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
      userResponses: [],
      userFlows: [],
      userCreates: [],
      userAssigns: [],
      userSear: {
        type: "0",
        userIds: []
      }
    };
    this.setState({
      taskSearch: taskSearch,
      selectTags: [],
      selectedPros: [],
      selectedUsers: []
    });
    //清除redux
    this.props.setTaskSearchObject({});
    this.getTaskList(1, taskSearch);
    //滚动条回复为顶部
    if (this.refs && this.refs.taskListScroll) {
      this.refs.taskListScroll.scrollTop = 0;
    }

  }
  searchChange(e) {
    const { taskSearch } = this.state;
    taskSearch.search = e;
    this.setState({ taskSearch: taskSearch });
  }
  //输入文字点击搜索保存search
  searchOk() {
    const { taskSearchObject } = this.props;
    const { taskSearch } = this.state;
    let NewObj = _.cloneDeep(taskSearch);
    //因为点击搜索才是用户想要的，所以在此处更新reduce
    taskSearchObject.search = NewObj.search;
    this.props.setTaskSearchObject(taskSearchObject);
    //更新数据列表
    this.getTaskList(1, taskSearch);
  }
  //清除文字
  clearTxt() {
    const { taskSearchObject } = this.props;
    const { taskSearch } = this.state;
    //更新state
    taskSearch.search = "";
    this.setState({ taskSearch: taskSearch, closeShow: false });
    //更新reduce
    taskSearchObject.search = "";
    this.props.setTaskSearchObject(taskSearchObject);
    //更新数据列表
    this.getTaskList(1, taskSearch);
  }
  saveTaskListInfo() {
    console.log("saveTaskListInfo");
    const {
      Listcount,
      pageCount,
      nowPage,
      taskSearch,
      comeFrom,
      taskList
    } = this.state;
    this.props.saveTaskLisToDateltAtCache(taskList);
    this.props.saveTaskCountToDatelAtCache(taskList.length);
    this.props.saveTaskPageCountToDatelAtCache(pageCount);
    this.props.setNowPage(nowPage);
    if (this.refs.taskListScroll) {
      this.props.saveTaskScrollTopAtCache(this.refs.taskListScroll.scrollTop);
    } else {
      this.props.saveTaskScrollTopAtCache(0);
    }
  }
  urlDetails(item) {
    Router.push(
      Dingtalk.setDdNavColor("/mo_taskDetails?id=" + item.taskinfo.id)
    );
  }
  sureClick() {
    //点击确定，保存所选的项目并重新获取数据
    let { taskSearchObject } = this.props;
    let { taskSearch, selectedPros, selectTags, selectedUsers } = this.state;
    let obj = {
      labelId: [], //标签
      projectIds: [], //项目id
      planTimeSear: {
        //计划工时
        start: "",
        end: ""
      },
      worktimeSear: {
        //完成时间
        min: "",
        max: ""
      },
      flowContenSear: {
        //任务绩效
        min: "",
        max: ""
      },
      // userResponse: {},//负责人 手机端暂时没用
      // userFlow: {},//确认人手机端暂时没用
      // userCreate: {},//创建人手机端暂时没用
      // userAssign: {},//指派人手机端暂时没用
      userSear: {
        type: "0" /* 负责人0 确认人1 关注人2 指派人3 创建人4 */,
        userIds: []
      }
    };

    obj.userSear.type = taskSearch.userSear.type;
    obj.planTimeSear.start = taskSearch.planTimeSear.start;
    obj.planTimeSear.end = taskSearch.planTimeSear.end;
    obj.worktimeSear.min = taskSearch.worktimeSear.min;
    obj.worktimeSear.max = taskSearch.worktimeSear.max;
    obj.flowContenSear.min = taskSearch.flowContenSear.min;
    obj.flowContenSear.max = taskSearch.flowContenSear.max;
    obj.labelId = taskSearch.labelId;
    obj.projectIds = taskSearch.projectIds;
    obj.userSear.userIds = taskSearch.userSear.userIds;

    //存筛选条件
    let NewObj = _.merge({}, taskSearchObject, obj);
    this.props.setTaskSearchObject(NewObj);

    //存项目数据
    this.props.setSelectedPros(selectedPros);
    //存标签数据
    this.props.setSelectedTag(selectTags);
    //存所选人员详细信息
    console.log(JSON.stringify(selectedUsers));
    this.props.setSelectedUsers(selectedUsers);
    this.getTaskList(1, taskSearch);
    this.setState({
      searchShow: false
    });
  }
  cancleClick() {
    let {
      taskSearchObject,
      selectedPros,
      selectTags,
      selectedUsers
    } = this.props;
    console.log(JSON.stringify(selectedUsers), "**********");
    const { taskSearch } = this.state;
    let NewObj = _.cloneDeep(taskSearchObject);
    //点击取消显示原来reduce的东西
    taskSearch.userSear.type = NewObj.userSear.type;
    taskSearch.planTimeSear.start = NewObj.planTimeSear.start;
    taskSearch.planTimeSear.end = NewObj.planTimeSear.end;
    taskSearch.worktimeSear.min = NewObj.worktimeSear.min;
    taskSearch.worktimeSear.max = NewObj.worktimeSear.max;
    taskSearch.flowContenSear.min = NewObj.flowContenSear.min;
    taskSearch.flowContenSear.max = NewObj.flowContenSear.max;
    taskSearch.labelId = NewObj.labelId;
    taskSearch.projectIds = NewObj.projectIds;
    taskSearch.menuType = NewObj.menuType;
    taskSearch.group = NewObj.group;
    taskSearch.panelId = NewObj.panelId;
    taskSearch.search = NewObj.search;
    taskSearch.userSear.userIds = NewObj.userSear.userIds;
    if (Router && Router.router && Router.router.query.menuType) {
      taskSearch.menuType = Router.router.query.menuType;
      taskSearch.panelId = [Router.router.query.panelId];
    }
    this.setState({
      searchShow: false,
      taskSearch: taskSearch,
      selectedPros: selectedPros,
      selectTags: selectTags,
      selectedUsers: selectedUsers
    });
    //点击取消，清空所选的项目
  }
  peopleChange(val) {
    const { taskSearch } = this.state;
    taskSearch.userSear.type = val[0];
    this.setState({
      taskSearch: taskSearch
    });
  }
  datePickerTimeChanged(date) {
    const { taskSearch } = this.state;
    let val = utils.dateToString(date, "date");
    taskSearch.planTimeSear.start = val;
    this.setState({
      taskSearch: taskSearch
    });
  }
  datePickerEndTimeChanged(date) {
    const { taskSearch } = this.state;
    let val = utils.dateToString(date, "date");
    taskSearch.planTimeSear.end = val;
    this.setState({
      taskSearch: taskSearch
    });
  }
  planTimeChange(e) {
    const { taskSearch } = this.state;

    utils.onlyNumber(e.target);
    taskSearch.worktimeSear.min = e.target.value;

    this.setState({
      taskSearch: taskSearch
    });
  }
  planEndTimeChange(e) {
    const { taskSearch } = this.state;

    utils.onlyNumber(e.target);
    taskSearch.worktimeSear.max = e.target.value;

    this.setState({
      taskSearch: taskSearch
    });
  }
  flowContenChange(e) {
    const { taskSearch } = this.state;
    utils.onlyNumber(e.target);
    taskSearch.flowContenSear.min = e.target.value;
    this.setState({
      taskSearch: taskSearch
    });
  }
  flowEndContenChange(e) {
    const { taskSearch } = this.state;
    utils.onlyNumber(e.target);
    taskSearch.flowContenSear.max = e.target.value;
    this.setState({
      taskSearch: taskSearch
    });
  }
  onRefresh = () => {
    const { refreshing, isLoading } = this.state;
    if (refreshing || isLoading) {
      return false;
    }
    this.setState({ refreshing: true });
    this.getTaskList(1, this.state.taskSearch);
  };

  onEndReached = event => {
    const { islast, nowPage, isLoading, refreshing } = this.state;
    if (refreshing || isLoading) {
      return false;
    }
    if (islast == "1") {
      console.log("是最后一页了");
    } else {
      this.setState({ isLoading: true });
      this.getTaskList(nowPage + 1, this.state.taskSearch);
    }
  };

  render() {
    const {
      taskList,
      taskListLoading,
      tagSelectShow,
      taskSearch,
      selectTags,
      searchShow,
      selectedPros,
      pageCount,
      projectSelectShow,
      nowPage,
      Listcount,
      taskListMoreLoading,
      oneSearchSelecting,
      twoSearchSelecting,
      loaded,
      taskListTopLoading,
      endY,
      startY,
      closeShow,
      islast,
      refreshing,
      dataSource,
      isLoading,
      pageLoading
    } = this.state;
    const { language } = this.props;
    let isSearch = false;
    if (
      taskSearch.labelId.length > 0 ||
      taskSearch.projectIds.length > 0 ||
      taskSearch.menuType !== "sub1" ||
      (taskSearch.panelId.length > 0 && taskSearch.panelId[0] !== "") ||
      taskSearch.planTimeSear.start !== "" ||
      taskSearch.planTimeSear.end !== "" ||
      taskSearch.worktimeSear.min !== "" ||
      taskSearch.worktimeSear.max !== "" ||
      taskSearch.flowContenSear.min !== "" ||
      taskSearch.flowContenSear.max !== "" ||
      taskSearch.userSear.userIds.length > 0
    ) {
      isSearch = true;
    }
    const row = (rowData, sectionID, rowID) => {
      const item = taskList[rowID];
      let labels = item && item.labels;
      let labelsbox;
      if (labels && labels.length > 0) {
        labelsbox = labels.map((lab, i) => {
          if (i <= 2) {
            return (
              <div
                key={"taskLab" + i}
                className={
                  "tag " +
                  utils.getTagColorByColorCode("1", lab.color) +
                  " textMore"
                }
              >
                {lab.labelname}
              </div>
            );
          }
        });
      }
      return (
        <div
          key={rowData}
          className="pubDiv white aniBut"
          onClick={() => {
            this.urlDetails(item);
          }}
        >
          <div className="stateStyle">
            {utils.stateColor(item.taskinfo.stateName)}
          </div>
          <div className="row">
            <label>
              {item.taskinfo.taskinfoNumber
                ? item.taskinfo.taskinfoNumber.numberS + "."
                : null}
              {item.taskinfo.rank}
            </label>
            <div className="title textMore">{item.taskinfo.taskname}</div>
            {item.taskinfo.collect === "1" ? (
              <div className="titIcon">
                <Icon type="anticon-shoucang1" />
              </div>
            ) : (
                ""
              )}
          </div>
          <div
            className="row"
            style={{
              margin: "10px 0 0 0"
            }}
          >
            {item.taskinfo.userResponse ? (
              <Icon className="svg" type="anticon-ren2" />
            ) : (
                ""
              )}
            {item.taskinfo.userResponse ? (
              <div className="span text textMore">
                {item.taskinfo.userResponse.name}
              </div>
            ) : (
                ""
              )}
            {item.taskinfo.planEndTime || item.taskinfo.realityEndTime ? (
              <Icon className="svg" type="anticon-shijian" />
            ) : (
                ""
              )}
            {item.taskinfo.planEndTime || item.taskinfo.realityEndTime ? (
              <div className="span">
                {utils.dateColor(
                  item.taskinfo.planEndTime,
                  item.taskinfo.state,
                  item.taskinfo.realityEndTime
                )}
              </div>
            ) : (
                ""
              )}
            {item.project.proname ? (
              <Icon className="svg" type="anticon-xiangmuneirong" />
            ) : (
                ""
              )}
            <div className="span text textMore">{item.project.proname}</div>
            <Icon className="svg" type="anticon-lvzhou_fenzhichangsuo" />
            <div className="span">{item.taskinfo.childCount}</div>
            <Icon className="svg" type="anticon-discuss" />
            <div className="span">{item.taskinfo.leaveCount}</div>
          </div>
          {item.labels && item.labels.length > 0 ? (
            <div
              className="row"
              style={{
                display: "inherit",
                height: "20px",
                margin: "10px 0 0 0"
              }}
            >
              {labelsbox}
            </div>
          ) : (
              ""
            )}
        </div>
      );
    };
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
          {tagSelectShow && (
            <Tag
              selectList={selectTags}
              closedCallBack={() => {
                this.setState({
                  tagSelectShow: false
                });
              }}
              selectedCallBack={tags => {
                this.tagChange(tags);
              }}
            />
          )}
          {projectSelectShow && (
            <ProjectSelect
              selectedPros={JSON.parse(JSON.stringify(selectedPros))}
              closeCallBack={() => {
                this.setState({
                  projectSelectShow: false
                });
              }}
              add={false}
              selingCallBack={pros => {
                this.projectChange(JSON.parse(JSON.stringify(pros)));
              }}
            />
          )}
          {searchShow && this.searchRender()}
          <div className="content task">
            <div
              className="createTask"
              onClick={() => {
                Router.push(Dingtalk.setDdNavColor("/mo_taskCreate"));
              }}
            >
              <Icon type="anticon-add" />
            </div>
            <div className="topSearch">
              <SelectDownList
                selected={taskSearch.menuType}
                selectList={oneSearch}
                listShow={oneSearchSelecting}
                titleClick={val => {
                  this.setState({
                    oneSearchSelecting: val,
                    twoSearchSelecting: false
                  });
                }}
                selectingBack={val => {
                  this.searchCondSet(val);
                  this.setState({
                    oneSearchSelecting: false
                  });
                }}
              />
              <SelectDownList
                selected={taskSearch.panelId[0]}
                selectList={twoSearch}
                listShow={twoSearchSelecting}
                titleClick={val => {
                  this.setState({
                    twoSearchSelecting: val,
                    oneSearchSelecting: false
                  });
                }}
                selectingBack={val => {
                  this.conditionChange("withState", val);
                  this.setState({
                    twoSearchSelecting: false
                  });
                }}
              />
              <div className="search">
                <div
                  className="searchBox"
                  style={{
                    position: "relative"
                  }}
                >
                  <InputItem
                    className="input"
                    placeholder="任务搜索"
                    value={taskSearch.search}
                    onChange={e => {
                      this.searchChange(e);
                    }}
                    onBlur={() => {
                      this.setState({
                        closeShow: true
                      });
                    }}
                    onFocus={() => {
                      this.setState({
                        closeShow: false
                      });
                    }}
                  />
                  {closeShow || taskSearch.search !== "" ? (
                    <Icon
                      type="cross"
                      style={{
                        position: "absolute",
                        right: "25px",
                        color: "#dbdbdb"
                      }}
                      onClick={() => {
                        this.clearTxt();
                      }}
                    />
                  ) : (
                      ""
                    )}
                  <Icon
                    type="anticon-search"
                    className="searchIcon"
                    onClick={() => {
                      this.searchOk();
                    }}
                  />
                </div>
              </div>
              <div className="icon">
                <Icon
                  type="anticon-shaixuan"
                  style={{
                    width: "17px",
                    height: "17px"
                  }}
                  onClick={() => {
                    this.setState({
                      searchShow: true
                    });
                  }}
                />
                {isSearch ? (
                  <Icon
                    type="anticon-qingkong"
                    onClick={() => {
                      this.clearSearch();
                    }}
                    style={{
                      margin: "0 0 0 10px",
                      color: "#fdb277"
                    }}
                  />
                ) : (
                    ""
                  )}
              </div>
            </div>
            <div className="alertTxt">
              共找到
              <span>{taskList.length}</span>
              条结果
            </div>
            {pageLoading ? (
              <Loading show={true} />
            ) : taskList.length <= 0 ? (
              <div
                className="boxList list"
                style={{ height: "calc(100% - 83px)" }}
              >
                <Friendly
                  data={{
                    alertTxt: "当前没有任务数据"
                    // ButTxt: "创建任务",
                    // ButUrl: "/mo_taskCreate"
                  }}
                />
              </div>
            ) : (
                  <div
                    className="boxList list"
                    style={{ height: "calc(100% - 83px)" }}
                  >
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
                          ) : islast == "1" ? (
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
                      pullToRefresh={
                        <PullToRefresh
                          refreshing={refreshing}
                          onRefresh={this.onRefresh}
                          distanceToRefresh={50}
                          indicator={{
                            activate: (
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
                                松开立即刷新
                          </div>
                            ),
                            deactivate: <div> </div>,
                            release: (
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
                            ),
                            finish: <div />
                          }}
                        />
                      }
                      onEndReached={this.onEndReached}
                      pageSize={5}
                    />
                  </div>
                )}

            {/* )} */}
          </div>
          <div className="menuBox">
            <MenuBar pathName="/mo_task" />
          </div>
        </div>
      </Layout>
    );
  }
}
function mapStateToProps(state) {
  return {
    taskListByCondition: state.task.taskListByCondition,
    taskListFromCache: state.cache.taskListFromCache,
    taskCountFromCache: state.cache.taskCountFromCache,
    taskPageCountFromCache: state.cache.taskPageCountFromCache,
    taskTextFromCache: state.cache.taskTextFromCache,
    urlData: state.user.urlData,
    taskListToDel: state.cache.taskListToDel,
    taskCountToDel: state.cache.taskCountToDel,
    taskTextToDel: state.cache.taskTextToDel,
    taskAllCountToDel: state.cache.taskAllCountToDel,
    taskScrollTop: state.cache.taskScrollTop,
    taskCondition: state.cache.taskCondition,
    taskSearchObject: state.task.taskSearchObject,
    selectedPros: state.task.selectedPros,
    selectTags: state.task.selectTags,
    nowPage: state.task.nowPage,
    selectedUsers: state.task.selectedUsers
  };
}
const mapDispatchToProps = dispatch => {
  return {
    getTaskListByCondition: bindActionCreators(
      taskAction.getTaskListByCondition,
      dispatch
    ),
    saveTaskListAtCache: bindActionCreators(
      cacheAction.saveTaskListAtCache,
      dispatch
    ),
    saveTaskCountAtCache: bindActionCreators(
      cacheAction.saveTaskCountAtCache,
      dispatch
    ),
    saveTaskPageCountAtCache: bindActionCreators(
      cacheAction.saveTaskPageCountAtCache,
      dispatch
    ),
    saveTaskTextAtCache: bindActionCreators(
      cacheAction.saveTaskTextAtCache,
      dispatch
    ),
    setUrlData: bindActionCreators(userAction.setUrlData, dispatch),
    saveTaskLisToDateltAtCache: bindActionCreators(
      cacheAction.saveTaskLisToDateltAtCache,
      dispatch
    ),
    saveTaskCountToDatelAtCache: bindActionCreators(
      cacheAction.saveTaskCountToDatelAtCache,
      dispatch
    ),
    saveTaskTextToDatelAtCache: bindActionCreators(
      cacheAction.saveTaskTextToDatelAtCache,
      dispatch
    ),
    saveTaskPageCountToDatelAtCache: bindActionCreators(
      cacheAction.saveTaskPageCountToDatelAtCache,
      dispatch
    ),
    saveTaskScrollTopAtCache: bindActionCreators(
      cacheAction.saveTaskScrollTopAtCache,
      dispatch
    ),
    saveTaskConditionAtCache: bindActionCreators(
      cacheAction.saveTaskConditionAtCache,
      dispatch
    ),
    //保存任务的筛选条件
    setTaskSearchObject: bindActionCreators(
      taskAction.setTaskSearchObject,
      dispatch
    ),
    //任务中的项目数据
    setSelectedPros: bindActionCreators(taskAction.setSelectedPros, dispatch),
    //任务中的标签数据
    setSelectedTag: bindActionCreators(taskAction.setSelectedTag, dispatch),
    setSelectedUsers: bindActionCreators(taskAction.setSelectedUsers, dispatch),
    //存储当前页码数
    setNowPage: bindActionCreators(taskAction.setNowPage, dispatch)
  };
};
export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(task);
