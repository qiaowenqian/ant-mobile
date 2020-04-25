import React, { Component } from "react";
import { bindActionCreators } from "redux";
import withRedux from "next-redux-wrapper";
import {
  Icon,
  Toast,
  SearchBar,
  Tabs,
  Drawer,
  PullToRefresh,
  ListView
} from "antd-mobile";
import mobileStyle from "antd-mobile/dist/antd-mobile.min.css";

import Router from "next/router";
import Storage from "../utils/storage";

import { initStore } from "../store";
import stylesheet from "styles/pages/project.scss";
import Layout from "../components/Layout";
import MenuBar from "../components/MenuBar";
import * as projectAction from "../actions/project";
import * as cacheAction from "../actions/cache";
import * as userAction from "../actions/user";
import Dingtalk from "../utils/dingtalk";
import Loading from "../components/Loading";
import Friendly from "../components/Friendly";
import DrawerPage from "../components/DrawerPage";
import utils from "../utils/utils";

/**
 * 项目列表
 * (选填)onload:     是否重新加载，不用缓存。url传参
 */
class project extends Component {
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
      tagList: [],
      objProjectList: [],
      projectLoading: false,
      projectListMoreLoading: false,
      condition: {
        type: "1", // 默认团队所有项目
        orderBy: "DESC", // 默认时间降序
        labelId: [], //标签筛选
        search: "",
        userId: ""
      },
      rowType: "",
      tagSelect: [],
      proOneSelecting: false,
      proTwoSelecting: false,
      loaded: false,

      startY: 0,
      endY: 0,
      proListTopLoading: false,

      pageCount: 0,
      Listcount: 0,
      nowPage: 1,

      followLoading: false,
      cancelFollowLoading: false,
      projectId: "",
      tagShow: false,
      search: "",
      openSear: false,
      titleType: "全部",
      tagListId: [],
      sortType: "",
      userId: "",
      orderBy: "",
      placeholder: "请输入项目名称",
      searchLog: "",
      tabIndex: 0,
      userInfo: null,
      dataSource,
      refreshing: true,
      isLoading: false,
      // nowPage: 0,
      NUM_ROWS: 30,
      pageLoading: true
    };
  }

  componentDidMount() {
    let cacheOrder = Storage.getLocal("orderBy") || "";
    Dingtalk.setTitle("项目");
    Dingtalk.setMenuHome();
    const {
      projectConditionFromCache,
      projectTagList,
      projectUserInfo
    } = this.props;
    const { dataSource } = this.state;
    if (!this.props.urlData) {
      this.props.setUrlData(encodeURIComponent(location.href.split("#")[0]));
    }
    //页面生成将筛选条件统一
    if (projectConditionFromCache.orderBy) {
      this.setState(
        {
          condition: projectConditionFromCache,
          tagListId: projectConditionFromCache.labelId,
          search: projectConditionFromCache.search,
          userId: projectConditionFromCache.userId,
          orderBy: projectConditionFromCache.orderBy,
          tagList: projectTagList,
          userInfo: projectUserInfo,
          objProjectList: this.props.projectListFromCache,
          // pageCount: this.props.projectPageCountFromCache,
          // search: this.props.projectText,
          pageCount: this.props.projectAllPage,
          condition: this.props.projectConditionFromCache,
          loaded: true,
          nowPage: this.props.projectNowPage,
          Listcount: this.props.projectSelectCount
        },
        () => {
          this.rData = this.genData();
          this.setState({
            dataSource: dataSource.cloneWithRows(this.rData),
            pageLoading: false
          });
        }
      );
    } else {
      const { condition } = this.state;
      condition.orderBy = cacheOrder !== "" ? cacheOrder : "DESC";
      this.props.saveProjectConditionAtCache(condition);
      this.getProjectList(1, condition);
      this.setState({
        orderBy: cacheOrder !== "" ? cacheOrder : "DESC"
      });
    }

    //更新显示
    if (projectConditionFromCache.type === "1") {
      this.setState({
        tabIndex: 0,
        sortType: "全部",
        titleType: "全部"
      });
    } else if (projectConditionFromCache.type === "2") {
      this.setState({
        tabIndex: 1,
        sortType: "我参与的",
        titleType: "我参与的"
      });
    } else if (projectConditionFromCache.type === "4") {
      this.setState({
        tabIndex: 2,
        sortType: "我负责的",
        titleType: "我负责的"
      });
    } else if (projectConditionFromCache.type === "3") {
      this.setState({
        tabIndex: 3,
        sortType: "我关注的",
        titleType: "我关注的"
      });
    }
    //如果没有缓存，先获取数据存到缓存中
    utils.butAnimate();
    const user = Storage.getSession("user");
    if (user && user.userid) {
      if (!this.props.urlData) {
        this.props.setUrlData(encodeURIComponent(location.href.split("#")[0]));
      }
    }
    const _this = this;
    if (this.props.projectScroll > 0) {
      setTimeout(() => {
        if (_this.refs.proListScroll) {
          _this.refs.proListScroll.scrollTop = this.props.projectScroll;
        }
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { dataSource } = this.state;

    //优化一下，减少不必要的渲染
    if (
      !_.isEqual(nextProps.projectSelectCount, this.props.projectSelectCount)
    ) {
      this.setState({
        Listcount: nextProps.projectSelectCount
      });
    }
    if (
      !_.isEqual(
        nextProps.projectConditionFromCache,
        this.props.projectConditionFromCache
      )
    ) {
      this.setState({
        condition: nextProps.projectConditionFromCache,
        tagListId: nextProps.projectConditionFromCache.labelId,
        search: nextProps.projectConditionFromCache.search,
        userId: nextProps.projectConditionFromCache.userId,
        orderBy: nextProps.projectConditionFromCache.orderBy
      });
    }
    if (
      !_.isEqual(
        nextProps.projectListFromCache,
        this.props.projectListFromCache
      )
    ) {
      this.setState(
        {
          objProjectList: nextProps.projectListFromCache
        },
        () => {
          this.rData = this.genData();
          this.setState({
            dataSource: dataSource.cloneWithRows(this.rData)
          });
        }
      );
    }
    if (!_.isEqual(nextProps.projectTagList, this.props.projectTagList)) {
      this.setState({
        tagList: nextProps.projectTagList
      });
    }
    if (!_.isEqual(nextProps.projectUserInfo, this.props.projectUserInfo)) {
      this.setState({
        userInfo: nextProps.projectUserInfo
      });
    }
    if (!_.isEqual(nextProps.projectNowPage, this.props.projectNowPage)) {
      this.setState({
        nowPage: nextProps.projectNowPage
      });
    }
  }
  componentWillUnmount() {
    this.savePageInfo();
  }
  getProjectList(pageNo, condition, topScroll) {
    const { refreshing } = this.state;
    console.log(JSON.stringify(condition), "********************");
    if (!refreshing && pageNo == 1) {
      this.setState({
        pageLoading: true
      });
    }
    this.props.getProjectListByType(condition, pageNo, 10, data => {
      this.getListCallBack(data);
    });
  }
  getListCallBack(data) {
    const { objProjectList, dataSource } = this.state;
    if (!data) {
      this.setState({
        projectLoading: false,
        projectListMoreLoading: false,
        proListTopLoading: false,
        loaded: true,
        refreshing: false,
        isLoading: false,
        pageLoading: false
      });
      return false;
    }
    if (data.success) {
      // //总页数, 总条数, 当前页数 更新
      this.setState({
        pageCount: data.data.last,
        Listcount: data.data.count,
        nowPage: data.data.pageNo
      });

      // 根据返回的页数判断是 直接替换数据 还是追加数据
      if (data.data.pageNo == 1) {
        if (data.data.projects) {
          //核心代码 处理数据源

          this.setState(
            {
              objProjectList: data.data.projects,
              projectLoading: false,
              projectListMoreLoading: false,
              proListTopLoading: false,
              loaded: true,
              refreshing: false,
              isLoading: false,
              pageLoading: false
            },
            () => {
              this.rData = this.genData();
              this.setState({
                dataSource: dataSource.cloneWithRows(this.rData)
              });
            }
          );
          this.savePageInfo();
        }
      } else {
        let newArr = data.data.projects;
        newArr &&
          newArr.map((item, i) => {
            objProjectList.push(item);
          });

        //核心代码 处理数据源

        this.setState(
          {
            objProjectList: objProjectList,
            projectLoading: false,
            projectListMoreLoading: false,
            proListTopLoading: false,
            loaded: true,
            refreshing: false,
            isLoading: false,
            pageLoading: false
          },
          () => {
            this.rData = this.genData();
            this.setState({
              dataSource: dataSource.cloneWithRows(this.rData)
            });
          }
        );
        this.savePageInfo();
      }
    }
  }

  //条件筛选
  conditionChange(typ, val) {
    let { condition } = this.state;
    if (typ == "withMe") {
      condition.type = val;
      this.setState({ condition: condition });
    } else if (typ == "withState") {
      condition.orderBy = val;
      this.setState({ condition: condition });
    } else if (typ == "withOut") {
      const lbs = [];
      val.map(item => {
        lbs.push(item.id);
      });
      condition.labelId = lbs;
      this.setState({ condition: condition });
    }
    this.getProjectList(1, condition);
  }
  // 取消&关注
  attention(type, proId, index) {
    const { objProjectList, dataSource, condition, rowType } = this.state;

    if (type === "1") {
      this.setState({ cancelFollowLoading: true });
      this.props.cancelAttentionWitchProject(proId, data => {
        if (data.success) {
          Toast.success("取消成功");
          if (condition.type == "3") {
            objProjectList.splice(index, 1);
          } else {
            objProjectList[index].collect = "0";
          }

          // objProjectList.splice(index, 1);
          this.setState(
            {
              cancelFollowLoading: false,
              objProjectList: objProjectList
            },
            () => {
              this.rData = this.genData(rowType);
              this.setState({
                dataSource: dataSource.cloneWithRows(this.rData),
                rowType: rowType == "a" ? "b" : "a"
              });
            }
          );
        } else {
          Toast.fail("网络好像不给力哦", 1);
        }
      });
    } else {
      this.setState({ followLoading: true });
      this.props.addAttentionWitchProject(proId, data => {
        if (data.success) {
          Toast.success("关注成功");
          objProjectList[index].collect = "1";
          this.setState(
            {
              followLoading: false,
              objProjectList: objProjectList
            },
            () => {
              this.rData = this.genData("b");
              this.setState({
                dataSource: dataSource.cloneWithRows(this.rData)
              });
            }
          );
        } else {
          Toast.fail("网络好像不给力哦", 1);
        }
      });
    }
  }
  clearSearch() {
    const condition = {
      type: "2", // 默认团队所有项目
      orderBy: "DESC", // 默认时间降序
      labelId: [] //标签筛选
    };
    this.setState({ condition: condition, tagSelect: [] });
    this.getProjectList(1, condition);
  }
  searchProject(search) {
    const { condition } = this.state;
    condition.search = search;
    this.setState({
      search: search,
      searchLog: search,
      condition: condition
    });
    this.props.saveProjectConditionAtCache(condition);
    this.getProjectList(1, condition);
  }
  searchClear(val) {
    const { condition } = this.state;
    condition.search = val;
    this.setState({
      search: val,
      condition: condition
    });
  }
  cancelSearch() {
    const { condition } = this.state;
    condition.search = "";
    this.setState({ search: "", placeholder: "请输入项目名称" });
    this.setState({
      condition: condition
    });
    this.props.saveProjectConditionAtCache(condition);
    this.getProjectList(1, condition);
  }
  projectTabs(e) {
    const type = e.title;
    const { condition } = this.state;
    condition.type =
      type === "全部"
        ? "1"
        : type === "我参与的"
          ? "2"
          : type === "我负责的"
            ? "4"
            : type === "我关注的"
              ? "3"
              : "1"; // 默认团队所有项目
    const tabKey =
      type === "全部"
        ? 0
        : type === "我参与的"
          ? 1
          : type === "我负责的"
            ? 2
            : type === "我关注的"
              ? 3
              : 0;
    this.setState({
      sortType: e.title,
      condition: condition,
      tabIndex: tabKey
    });

    this.props.saveProjectConditionAtCache(condition);
    this.getProjectList(1, condition);
    if (this.refs.proListScroll && this.refs.proListScroll.scrollTop) {
      this.refs.proListScroll.scrollTop = 0;
    }
  }
  onOpenChange() {
    this.setState({ openSear: !this.state.openSear });
  }
  saveSortNow(defaultVal) {
    const { condition } = this.state;
    condition.orderBy = defaultVal;
    this.setState({ orderBy: defaultVal, condition: condition });
    this.props.saveProjectConditionAtCache(condition);
    this.getProjectList(1, condition);
  }
  tagSelect(tagList) {
    const { condition } = this.state;
    // const { titleType, search, userId, orderBy } = this.state;
    const labId = [];
    tagList.map(item => {
      labId.push(item.id);
    });
    condition.labelId = labId;
    this.props.saveProjectConditionAtCache(condition);
    this.props.saveProjectTagListAtCache(tagList);
    this.setState({
      tagListId: labId,
      condition: condition,
      tagList: tagList
    });
    this.getProjectList(1, condition);
  }
  userSort(userInfo) {
    const { condition } = this.state;
    condition.userId = userInfo.userid;
    this.props.saveProjectConditionAtCache(condition);
    this.props.saveProjectUserInfo(userInfo);
    this.getProjectList(1, condition);
  }
  clearAll() {
    const { condition } = this.state;
    condition.labelId = [];
    condition.userId = "";
    this.setState({
      tagListId: [],
      userId: "",
      userInfo: null,
      condition: condition,
      tagList: []
    });
    this.props.saveProjectConditionAtCache(condition);
    this.props.saveProjectTagListAtCache([]);
    this.props.saveProjectUserInfo(null);
    this.getProjectList(1, condition);
  }
  onBlurPlacehoder() {
    const { search, searchLog } = this.state;
    if (search == "") {
      this.setState({ search: searchLog });
    }
  }
  savePageInfo() {
    const {
      search,
      condition,
      objProjectList,
      pageCount,
      tagList,
      nowPage,
      Listcount
    } = this.state;

    this.props.saveProjectListAtCache(objProjectList);
    // this.props.saveProjectTypeCondition(condition);
    this.props.saveProjectTextAtCache(search);
    this.props.saveProjectConditionAtCache(condition);
    this.props.saveProjectAllCountAtCache(pageCount);
    this.props.saveProjectNowPageAtCache(nowPage);
    this.props.saveProjectTagListAtCache(tagList);
    this.props.saveProjectSelectListCount(Listcount);
    if (this.refs.proListScroll) {
      this.props.saveProjectScrollAtCache(
        this.refs.proListScroll && this.refs.proListScroll.scrollTop
      );
    }
  }
  toProjectDetail(item) {
    this.savePageInfo();
    Router.push(
      Dingtalk.setDdNavColor(
        "/mo_projectDetails?projectId=" +
        item.id +
        "&projectName=" +
        item.proname +
        "&jurisdiction=" +
        item.setUpButton
      )
    );
  }
  onRefresh = () => {
    const { condition, refreshing, isLoading } = this.state;
    if (refreshing || isLoading) {
      this.setState({ refreshing: false, isLoading: false });
      return false;
    }
    this.setState({ refreshing: true });
    this.getProjectList(1, condition);
  };

  onEndReached = event => {
    const { pageCount, nowPage, condition, refreshing, isLoading } = this.state;
    if (refreshing || isLoading) {
      this.setState({ refreshing: false, isLoading: false });
      return false;
    }
    if (nowPage >= pageCount) {
      return false;
    }
    this.setState({ isLoading: true });
    this.getProjectList(nowPage + 1, condition);
  };
  genData(str = "") {
    const { objProjectList } = this.state;
    const dataArr = [];
    for (let i = 0; i < objProjectList.length; i++) {
      dataArr.push(`row ${str}- ${objProjectList[i].id}`);
    }

    return dataArr;
  }
  render() {
    const { language } = this.props;
    const {
      placeholder,
      tagListId,
      userId,
      openSear,
      Listcount,
      search,
      objProjectList,
      projectLoading,
      projectListMoreLoading,
      condition,
      tagSelect,
      tagShow,
      nowPage,
      pageCount,
      proOneSelecting,
      proTwoSelecting,
      loaded,
      tabIndex,
      endY,
      startY,
      proListTopLoading,
      projectId,
      tagList,
      userInfo,
      dataSource,
      refreshing,
      isLoading,
      pageLoading
    } = this.state;
    let data = {
      // ButTxt: "创建项目",
      // ButUrl: "/mo_projectCreate",
      Icon: "",
      alertTxt: "没有项目哦，去创建吧！"
    };
    const this_ = this;
    const tabs = [
      { title: "全部" },
      { title: "我参与的" },
      { title: "我负责的" },
      { title: "我关注的" }
    ];
    const tabsStyle = {
      marginLeft: "9%",
      width: "7%",
      borderRadius: "1px"
    };
    let isSearch = false;
    if (
      condition.type !== "2" ||
      condition.orderBy !== "DESC" ||
      condition.labelId.length > 0
    ) {
      isSearch = true;
    }

    const sidebar = (
      <DrawerPage
        saveSort={defaultVal => {
          this.saveSortNow(defaultVal);
        }}
        tagSelect={tagList => {
          this.tagSelect(tagList);
        }}
        clearAll={() => {
          this.clearAll();
        }}
        userSort={userInfo => {
          this.userSort(userInfo);
        }}
        Listcount={Listcount}
        check={condition.orderBy}
        tagList={tagList}
        userInfo={userInfo}
      />
    );
    let reg = /^https/;
    let reg2 = /^http/;
    console.log(dataSource, objProjectList);

    const row = (rowData, sectionID, rowID) => {
      const item = objProjectList[rowID];
      if (!item) {
        return <div />;
      }
      return (
        <div
          className="projectBox white aniBut"
          key={rowData}
          onClick={() => {
            this.props.setOpenProject({
              id: item.id,
              name: item.proname
            });
            this.toProjectDetail(item);
          }}
        >
          <div className="left">
            {item && item.attstr04 && item.attstr04 != "#pro-myfg-1020" ? (
              reg.test(item.attstr04) || reg2.test(item.attstr04) ? (
                <img
                  src={item.attstr04}
                  className="pro-icon"
                  style={{
                    width: "51px",
                    height: "51px"
                  }}
                />
              ) : (
                  <svg className="pro-icon" aria-hidden="true">
                    <use xlinkHref={item.attstr04} />
                  </svg>
                )
            ) : (
                <div className="pro-icon-null">
                  <Icon type="anticon-project1" style={{ height: "33px" }} />
                </div>
              )}
          </div>
          <div className="center">
            <div className="textMore h3">
              {item.proname}
              {isLoading}
            </div>
            <div className="labels">
              {item.labelList && item.labelList.length > 0 ? (
                item.labelList.map((lab, i) => {
                  if (i < 3) {
                    return (
                      <label
                        key={lab.id}
                        className={
                          "textMore " +
                          utils.getTagColorByColorCode("1", lab.color)
                        }
                      >
                        {lab.labelname}
                      </label>
                    );
                  }
                })
              ) : (
                  <label>未分类</label>
                )}
            </div>
          </div>
          <div className="right">
            <Icon
              className={item.collect === "1" ? "colled" : ""}
              type={
                item.collect === "1" ? "anticon-shoucang1" : "anticon-shoucang"
              }
              onClick={e => {
                e.stopPropagation();
                this.attention(item.collect, item.id, rowID);
              }}
            />
          </div>
          <div className="clearfix" />
          <div className="bottom">
            <div className="desc">
              <span>
                {item.child == 0
                  ? "0%"
                  : ((item.ywcCount * 100) / item.child).toFixed(2) + "%"}
              </span>
              <span>（</span>
              <span className="color_tt_4">{item.ywcCount}</span>
              <span style={{ padding: "0 3px" }}>/</span>
              <span>{item.child}）</span>
              <span style={{ margin: "0 0 0 15px" }}>逾期：</span>
              <span className="yq">{item.yyqCount}</span>
            </div>
            <div className="userRightBox">
              {item.user && item.user.photo ? (
                <img className="userImg" src={item.user.photo} />
              ) : (
                  // <svg className="iconfont" ariaHidden="true">
                  //   <use xlinkHref="#icon-file-avatar" />
                  // </svg>
                  <Icon type="anticon-file-avatar" className="userImg" />
                )}
              <span className="userName textMore">
                {item.user && item.user.name}
              </span>
            </div>
          </div>

          <div className="progress">
            <div
              style={{
                position: "relative",
                background:
                  item.child == 0
                    ? "#639EFD"
                    : (item.ywcCount / item.child).toFixed(2) * 100 < 100
                      ? "rgba(165, 214, 167,1)"
                      : "#639EFD",
                width:
                  item.child == 0
                    ? 0
                    : (item.ywcCount / item.child).toFixed(2) * 100 + "%",
                borderRadius: "1.5px",
                height: "3px"
              }}
            >
              <div className="progressColor" />
            </div>

            <div
              style={{
                background: "#eeeeee",
                width:
                  100 -
                  (item.child == 0
                    ? 0
                    : (item.ywcCount / item.child).toFixed(2) * 100) +
                  "%",
                borderRadius: "1.5px",
                height: "3px"
              }}
            />
          </div>
        </div>
      );
    };
    return (
      <Layout language={language}>
        <div style={{ width: "100%", height: "100%" }}>
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

          {tagShow ? (
            ""
          ) : (
              <div className="pubLayout">
                <Drawer
                  className="projectSort"
                  enableDragHandle
                  sidebar={sidebar}
                  open={openSear}
                  onOpenChange={() => {
                    this.onOpenChange();
                  }}
                  position={"right"}
                />
                <div className="content project">
                  <div
                    className="createProject"
                    onClick={() => {
                      Router.push(Dingtalk.setDdNavColor("/mo_projectCreate"));
                    }}
                  >
                    <Icon type="anticon-add" />
                  </div>
                  <SearchBar
                    placeholder={placeholder}
                    value={search}
                    onSubmit={() => {
                      this.searchProject(search);
                    }}
                    onClear={() => {
                      this.searchClear("");
                    }}
                    defaultValue={search}
                    onFocus={() => {
                      this.setState({
                        placeholder: ""
                      });
                    }}
                    onBlur={() => {
                      this.onBlurPlacehoder();
                    }}
                    onCancel={() => {
                      this.cancelSearch();
                    }}
                    onChange={val => {
                      this.setState({
                        search: val
                      });
                    }}
                  />
                  <div className="proTop">
                    <Tabs
                      tabs={tabs}
                      tabBarUnderlineStyle={tabsStyle}
                      page={tabIndex}
                      animated={true}
                      useOnPan={false}
                      onTabClick={e => {
                        this.projectTabs(e);
                      }}
                    />
                    <Icon
                      type={
                        tagListId.length == 0 && userId === ""
                          ? "anticon-filter"
                          : "anticon-filtered"
                      }
                      onClick={() => {
                        this.onOpenChange();
                      }}
                      style={{
                        width: "17px",
                        height: "17px",
                        zIndex: 100,
                        position: "absolute",
                        top: "58px",
                        right: "24px",
                        color: "#ccc"
                      }}
                    />
                  </div>
                  {pageLoading ? (
                    <Loading show={true} />
                  ) : objProjectList.length == 0 ? (
                    <div
                      className="proContent"
                      style={{ height: "calc(100% - 83px)" }}
                    >
                      <Friendly data={data} />
                    </div>
                  ) : (
                        <div
                          className="proContent"
                          ref="proListScroll"
                          style={{ height: "calc(100% - 83px)" }}
                        >
                          {/* <Loading show={projectLoading} /> */}
                          {objProjectList.length > 0 ? (
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
                                  ) : pageCount <= nowPage ? (
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
                          ) : (
                              ""
                            )}
                        </div>
                      )}
                </div>
                <div className="menuBox">
                  <MenuBar pathName="/mo_project" />
                </div>
              </div>
            )}
        </div>
      </Layout>
    );
  }
}
function mapStateToProps(state) {
  return {
    projectList: state.project.projectList,
    projectListFromCache: state.cache.projectListFromCache, //缓存的列表
    projectText: state.cache.projectText,
    projectType: state.cache.projectType,
    projectScroll: state.cache.projectScroll,
    projectAllPage: state.cache.projectAllPage,
    projectPageCountFromCache: state.cache.projectPageCountFromCache,
    addWitchProject: state.project.addWitchProject,
    cancelWitchProject: state.project.cancelWitchProject,
    urlData: state.user.urlData,
    projectConditionFromCache: state.cache.projectConditionFromCache,
    projectTagList: state.cache.projectTagList,
    projectNowPage: state.cache.projectNowPage,
    projectUserInfo: state.project.projectUserInfo,
    projectSelectCount: state.project.projectSelectCount
  };
}
const mapDispatchToProps = dispatch => {
  return {
    getProjectListByType: bindActionCreators(
      projectAction.getProjectListByType,
      dispatch
    ),
    saveProjectListAtCache: bindActionCreators(
      cacheAction.saveProjectListAtCache,
      dispatch
    ),
    saveProjectPageCountAtCache: bindActionCreators(
      cacheAction.saveProjectPageCountAtCache,
      dispatch
    ),
    saveProjectTextAtCache: bindActionCreators(
      cacheAction.saveProjectTextAtCache,
      dispatch
    ),
    saveProjectTypeAtCache: bindActionCreators(
      cacheAction.saveProjectTypeAtCache,
      dispatch
    ),
    saveProjectScrollAtCache: bindActionCreators(
      cacheAction.saveProjectScrollAtCache,
      dispatch
    ),
    saveProjectAllCountAtCache: bindActionCreators(
      cacheAction.saveProjectAllCountAtCache,
      dispatch
    ),
    addAttentionWitchProject: bindActionCreators(
      projectAction.addAttentionWitchProject,
      dispatch
    ),
    cancelAttentionWitchProject: bindActionCreators(
      projectAction.cancelAttentionWitchProject,
      dispatch
    ),
    setOpenProject: bindActionCreators(projectAction.setOpenProject, dispatch),
    setUrlData: bindActionCreators(userAction.setUrlData, dispatch),
    //新增保存用户的项目筛选条件
    saveProjectConditionAtCache: bindActionCreators(
      cacheAction.saveProjectConditionAtCache,
      dispatch
    ),
    saveProjectUserInfo: bindActionCreators(
      projectAction.saveProjectUserInfo,
      dispatch
    ),
    saveProjectTagListAtCache: bindActionCreators(
      cacheAction.saveProjectTagListAtCache,
      dispatch
    ),
    saveProjectNowPageAtCache: bindActionCreators(
      cacheAction.saveProjectNowPageAtCache,
      dispatch
    ),
    saveProjectSelectListCount: bindActionCreators(
      projectAction.saveProjectSelectListCount,
      dispatch
    )
  };
};
export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(
  project
);
