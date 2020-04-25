import React, { Component } from "react";
import { bindActionCreators } from "redux";
import withRedux from "next-redux-wrapper";
import { Icon, ListView, Toast, PullToRefresh } from "antd-mobile";
import Router from "next/router";
import mobileStyle from "antd-mobile/dist/antd-mobile.min.css";

import { initStore } from "../store";
import stylesheet from "styles/pages/dynamic.scss";
import Loading from "../components/Loading";
import Dingtalk from "../utils/dingtalk";
import Friendly from "../components/Friendly";
import Layout from "../components/Layout";
import MenuBar from "../components/MenuBar";
import SelectDownList from "../components/SelectDownList";
import * as dynamicAction from "../actions/dynamic";
import * as cacheAction from "../actions/cache";
import utils from "../utils/utils";
import ProjectSelect from "../components/ProjectSelect";
import * as userAction from "../actions/user";
import Storage from "../utils/storage";

import _ from "lodash";

const oneSearch = [
  {
    value: "",
    label: "不限"
  },
  {
    value: utils.dateToString(new Date(), "date"),
    label: "今天"
  },
  {
    value: utils.dateToStringLast(new Date(), "date"),
    label: "昨天"
  },
  {
    value: utils.dateToStringLasts(new Date(), "date"),
    label: "前天"
  },
  { value: utils.dateToStringLastWeek(new Date(), "date"), label: "本周" },
  {
    value: utils.dateToStringLastMonth(new Date(), "date"),
    label: "一个月内"
  }
];

class dynamic extends Component {
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
    this.timeer = false;
    this.state = {
      pageLoading: true,
      loading: false,
      dataSource,
      dynamicListMoreLoading: false,
      listData: [],
      pageCount: 0,
      nowPage: 1,
      search: {
        projectIds: [],
        date: utils.dateToString(new Date(), "date"),
        persons: [],
        projectsName: []
      },
      data: {
        butTxt: "",
        butRouter: "",
        icon: "",
        alertTxt: "当前没有动态哦"
      },
      dateSelecting: false,
      loaded: false,

      startY: 0,
      endY: 0,
      dynListTopLoading: false,
      projectCreateShow: false,
      isLast: "0"
    };
  }
  genData() {
    const { listData } = this.state;
    const dataArr = [];
    for (let i = 0; i < listData.length; i++) {
      dataArr.push(`row - ${listData[i].id}`);
    }
    return dataArr;
  }
  componentWillMount() {
    Dingtalk.setTitle("动态");
    Dingtalk.setMenuHome();
    const { dataSource } = this.state;
    let { search } = this.state;
    if (this.props.url.query.selectedProId) {
      (search.projectIds[0] = this.props.url.query.selectedProId),
        this.setState({ search: search });
    }

    const { antProject, date, persons } = search;

    if (this.props.taskLogListGroup && this.props.taskLogListGroup.data) {
      this.setState(
        {
          listData: this.props.taskLogListGroup.data.result.list || [],
          pageCount: this.props.taskLogListGroup.data.result.last,
          nowPage: this.props.taskLogListGroup.data.result.pageNo,
          search: this.props.search,
          isLast: this.props.taskLogListGroup.data.result.isLast,
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
      this.getDynamicList(1, search);
    }
  }

  componentWillReceiveProps(nextProps) {
    /*if(nextProps.url.query.selectedProId){
	    	let {search} = this.state;
	    	search.antProject ={
	    		id:nextProps.url.query.selectedProId,
	    		name:nextProps.url.query.selectedProName
	    	}
  			this.setState({search:search});
  		}*/
    // console.log(stort.getState())
    //     console.log(nextProps);

    const { dataSource } = this.state;
    if (nextProps.taskLogListGroup.data) {
      let data = nextProps.taskLogListGroup.data.result.list || [];
      if (!_.isEqual(nextProps.taskLogListGroup, this.props.taskLogListGroup)) {
        this.setState(
          {
            listData: data,
            pageCount: nextProps.taskLogListGroup.data.result.last,
            nowPage: nextProps.taskLogListGroup.data.result.pageNo,
            loading: false,
            dynamicListMoreLoading: false,
            dynListTopLoading: false,
            loaded: true,
            isLast: nextProps.taskLogListGroup.data.result.isLast
          },
          () => {
            this.rData = this.genData();
            this.setState({
              dataSource: dataSource.cloneWithRows(this.rData)
            });
          }
        );
      }

      // this.props.saveDynamicListAtCache(JSON.parse(JSON.stringify(data)));
      // this.props.saveDynamicPageCountAtCache(
      //   nextProps.taskLogListGroup.data.result.last
      // );
    }
    if (
      (this.state.loading ||
        this.state.dynamicListMoreLoading ||
        this.state.dynListTopLoading) &&
      nextProps.taskLogListGroup
    ) {
      if (nextProps.taskLogListGroup.success) {
        // 如果是第一条数据 并且 筛选条件是默认的，则存入reducers
        const { antProject, date, persons } = this.state.search;
        // if (
        //   nextProps.taskLogListGroup.data.result.pageNo == 1 &&
        //   antProject.id == "" &&
        //   date == "0" &&
        //   persons.length == 0
        // ) {
        //   if (nextProps.taskLogListGroup.data.result.list) {
        //     let data = nextProps.taskLogListGroup.data.result.list;
        //     this.props.saveDynamicListAtCache(JSON.parse(JSON.stringify(data)));
        //     this.props.saveDynamicPageCountAtCache(
        //       nextProps.taskLogListGroup.data.result.last
        //     );
        //   }
        // }

        // 总页数, 当前页数 更新

        // 根据返回的页数判断是 直接替换数据 还是追加数据
        // if (nextProps.taskLogListGroup.data.result.pageNo == 1) {
        //   if (nextProps.taskLogListGroup.data.result.list) {
        //     this.setState({
        //       listData: nextProps.taskLogListGroup.data.result.list
        //     });
        //   } else {
        //     this.setState({ listData: [], loaded: true });
        //   }
        // } else {
        //   let data = nextProps.taskLogListGroup.data.result.list;
        //   let { listData } = this.state;
        //   data.map((item, i) => {
        //     listData.push(item);
        //   });
        //   this.setState({ listData: listData });
        // }
      } else {
        if (this.state.nowPage == 1) {
          this.setState({ listData: [] }, () => {
            this.rData = this.genData();
            this.setState({
              dataSource: dataSource.cloneWithRows(this.rData)
            });
          });
        }
      }
    }
  }

  componentDidMount() {
    const user = Storage.getSession("user");
    if (user && user.userid) {
      if (!this.props.urlData) {
        this.props.setUrlData(encodeURIComponent(location.href.split("#")[0]));
      }
    }

    if (this.props.dynamicScrollTop > 0) {
      this.refs.dynListScroll.scrollTop = this.props.dynamicScrollTop;
    }

    Dingtalk.authDingJsApi("", this.props.urlData);
  }

  getDynamicList(pageNo, search, onRefresh) {
    const { refreshing } = this.state;
    // 根据页数判断 应该显示哪个加载进度效果
    if (!refreshing && pageNo == 1) {
      this.setState({
        pageLoading: true
      });
    }
    search.data === "0"
      ? (search.data = utils.dateToString(new Date(), "date"))
      : search.data;
    let searchs = search;
    searchs.data === "0"
      ? (search.data = utils.dateToString(new Date(), "date"))
      : search.data;
    // if (onRefresh) {
    //   this.setState({ dynListTopLoading: true });
    //   this.props.findGroupPageIndex(1, 20, search, () => {
    //     this.setState({ dynListTopLoading: false });
    //   });
    // } else if (pageNo == 1) {
    //   this.setState({ loading: true });
    //   this.props.findGroupPageIndex(1, 20, search, () => {
    //     this.setState({ loading: false });
    //   });
    // } else {
    this.setState({ dynamicListMoreLoading: true });
    this.props.findGroupPageIndex(pageNo, 20, search, () => {
      this.setState({
        pageLoading: false,
        isLoading: false,
        refreshing: false
      });
    });
    // }
  }

  dateSelecting(date) {
    let { search } = this.state;
    search.date = date;
    this.setState({ search: search });
    this.getDynamicList(1, search);
  }
  //选人
  selectUser(tit) {
    const _this = this;
    let { search } = this.state;
    Dingtalk.selectUser(
      search.persons,
      tit,
      data => {
        if (data && data.length > 0) {
          let item = data[0];
          search.persons = [];
          search.persons.push({
            userid: item.emplId,
            phone: item.avatar,
            name: utils.getNickNameByName(item.name)
          });
          _this.setState({ search: search });
          _this.getDynamicList(1, search);
        }
      },
      err => {
        Toast.fail("选择成员失败,请重试");
      }
    );
  }

  clear() {
    let { search } = this.state;
    search = {
      projectIds: [],
      projectsName: [],
      date: "",
      persons: []
    };
    this.setState({ search: search });
    this.getDynamicList(1, search);
    //Router.push(Dingtalk.setDdNavColor('/mo_dynamic'));
  }
  onRefresh = () => {
    const { refreshing, isLoading, search } = this.state;
    if (refreshing || isLoading) {
      return false;
    }
    this.setState({ refreshing: true });
    this.getDynamicList(1, search);
  };

  onEndReached = event => {
    const { isLast, refreshing, isLoading, search, nowPage } = this.state;
    if (refreshing || isLoading) {
      return false;
    }
    if (isLast == "1") {
      return false;
    }
    this.setState({ isLoading: true });
    this.getDynamicList(nowPage + 1, search);
  };
  render() {
    const { language } = this.props;
    const {
      listData,
      loading,
      nowPage,
      pageCount,
      dynamicListMoreLoading,
      data,
      dateSelecting,
      loaded,
      endY,
      startY,
      dynListTopLoading,
      projectCreateShow,
      refreshing,
      isLoading,
      dataSource,
      pageLoading,
      isLast
    } = this.state;
    let { search } = this.state;

    // 判断筛选条件
    let color = "rgb(255, 154, 68)";
    const { projectIds, date, persons, projectsName } = search;
    if (projectIds.length == 0 && date == "" && persons.length == 0) {
      color = "";
    }
    const row = (rowData, sectionID, rowID) => {
      const item = listData[rowID];
      if (!item) {
        return <div />;
      }
      let i = rowID;
      return (
        <div className="contentBox" key={sectionID}>
          {i > 0 &&
            item.date == listData[i - 1].date &&
            item.antProject.id == listData[i - 1].antProject.id ? (
              ""
            ) : (
              <div className="dynamic-top">
                {i > 0 && item.date == listData[i - 1].date ? (
                  ""
                ) : (
                    <div className="day">{item.date}</div>
                  )}
                <div className="projectName textMore">
                  {item.antProject.proname}
                </div>
              </div>
            )}
          {/* {console.log(item.taskDelflag)} */}
          {item.taskinfo && item.taskinfo.taskname ? (
            <div
              className="dynamic-bottom"
              onClick={() => {
                if (item.taskDelflag == "1") {
                  Toast.info("该任务已删除");
                } else {
                  Router.push(
                    Dingtalk.setDdNavColor(
                      "/mo_taskDetails?id=" + item.objectId
                    )
                  );
                }
              }}
            >
              <div className="proBox">
                <p className="nameImg">
                  {item.createBy && item.createBy.nickname
                    ? item.createBy.nickname
                    : ""}
                </p>
                <p className="perName">
                  {item.createBy && item.createBy.name
                    ? item.createBy.name
                    : ""}
                </p>
                <p className="proTime">{item.creatDate}</p>
              </div>
              <p className="creatPro">
                {item.description}
                {item.taskinfo && item.taskinfo.taskname ? (
                  <span>
                    任务: <b>{item.taskinfo.taskname}</b>
                  </span>
                ) : (
                    <span>
                      项目: <b>{item.antProject.proname}</b>
                    </span>
                  )}
              </p>
            </div>
          ) : (
              <div
                className="dynamic-bottom"
                onClick={() => {
                  if (item.antProject.delFlag == "1") {
                    Toast.info("该项目已删除");
                  } else {
                    Router.push(
                      Dingtalk.setDdNavColor(
                        "/mo_projectDetails?projectId=" +
                        item.objectId +
                        "&projectName=" +
                        item.antProject.proname
                      )
                    );
                  }
                }}
              >
                <div className="proBox">
                  <p className="nameImg">
                    {item.createBy && item.createBy.nickname
                      ? item.createBy.nickname
                      : ""}
                  </p>
                  <p className="perName">
                    {item.createBy && item.createBy.name
                      ? item.createBy.name
                      : ""}
                  </p>
                  <p className="proTime">{item.creatDate}</p>
                </div>
                <p className="creatPro">
                  {item.description}
                  {item.taskinfo && item.taskinfo.taskname ? (
                    <span>
                      任务: <b>{item.taskinfo.taskname}</b>
                    </span>
                  ) : (
                      <span>
                        项目: <b>{item.antProject.proname}</b>
                      </span>
                    )}
                </p>
              </div>
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
          {projectCreateShow ? (
            <ProjectSelect
              selectedPros={[projectIds]}
              selingCallBack={val => {
                console.log(val);
                search.projectIds[0] = val.id;
                search.projectsName[0] = val.name;
                this.setState({
                  search: search,
                  projectCreateShow: false
                });
                this.getDynamicList(1, search);
              }}
              closeCallBack={() => {
                this.setState({
                  projectCreateShow: false
                });
              }}
              add={false}
              isRadio={true}
            />
          ) : (
              ""
            )}
          <div className="content dynamic">
            <div className="dynamic-top">
              <div
                className="select top"
                onClick={() => {
                  this.setState({
                    projectCreateShow: true
                  });
                }}
              >
                <span className="textMore">
                  {search.projectIds.length === 0
                    ? "所有项目"
                    : search.projectsName[0]}
                </span>
                <Icon type="anticon-jiantouarrow486" />
              </div>
              <div
                className="select top"
                onClick={() => {
                  this.selectUser("选择成员");
                }}
              >
                <span>
                  {search.persons.length > 0 && search.persons[0].name
                    ? search.persons[0].name
                    : "所有成员"}
                </span>
                <Icon type="anticon-jiantouarrow486" />
              </div>
              <div className="dynamic-time">
                {console.log(oneSearch)}
                <SelectDownList
                  selected={search.date}
                  selectList={oneSearch}
                  listShow={dateSelecting}
                  icon={"anticon-rili"}
                  iconLeft={true}
                  titleClick={val => {
                    this.setState({
                      dateSelecting: val
                    });
                  }}
                  selectingBack={val => {
                    this.dateSelecting(val);
                    this.setState({
                      dateSelecting: false
                    });
                  }}
                />
              </div>
              {color ? (
                <div className="dynamic-time">
                  <Icon
                    type="anticon-qingkong"
                    style={{
                      color: color
                    }}
                    className="clearIcon"
                    onClick={() => {
                      this.clear();
                    }}
                  />
                </div>
              ) : (
                  ""
                )}
            </div>

            {pageLoading ? (
              <div className="dynamic-content">
                <Loading show={true} />
              </div>
            ) : listData.length == 0 && loaded ? (
              <div className="dynamic-content">
                <Friendly data={data} />
              </div>
            ) : (
                  <div className="dynamic-content" ref="dynListScroll">
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
                          ) : isLast == "1" ? (
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
          </div>
          <div className="menuBox">
            <MenuBar pathName="/mo_dynamic" />
          </div>
        </div>
      </Layout>
    );
  }
}
function mapStateToProps(state) {
  return {
    taskLogListGroup: state.dynamic.taskLogListGroup,
    dynamicListFromCache: state.cache.dynamicListFromCache,
    dynamicPageCountFromCache: state.cache.dynamicPageCountFromCache,
    urlData: state.user.urlData,
    dynamicScrollTop: state.cache.dynamicScrollTop,
    search: state.dynamic.search
  };
}
const mapDispatchToProps = dispatch => {
  return {
    findGroupPageIndex: bindActionCreators(
      dynamicAction.findGroupPageIndex,
      dispatch
    ),
    saveDynamicListAtCache: bindActionCreators(
      cacheAction.saveDynamicListAtCache,
      dispatch
    ),
    saveDynamicPageCountAtCache: bindActionCreators(
      cacheAction.saveDynamicPageCountAtCache,
      dispatch
    ),
    setUrlData: bindActionCreators(userAction.setUrlData, dispatch),
    saveDynamicScrollTop: bindActionCreators(
      cacheAction.saveDynamicScrollTop,
      dispatch
    )
  };
};
export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(
  dynamic
);
