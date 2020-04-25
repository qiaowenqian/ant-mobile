import React, { Component } from "react";
import { Icon, Toast, PullToRefresh, ListView } from "antd-mobile";
import Router from "next/router";

import * as taskAction from "../actions/task";
import utils from "../utils/utils";
import stylesheet from "styles/components/projectFile.scss";
import Loading from "../components/Loading";
import Friendly from "../components/Friendly";
import Dingtalk from "../utils/dingtalk";

/*
 * （必填）projectId:''          // 项目ID，在url里面拼接
 * （选填）parentId:''           // 父级ID
 */

export default class projectFile extends Component {
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
      dataSource,
      fileList: [],
      fileBoxList: [],
      fileListParent: [],
      fileListLoading: true,
      fileListMoreLoading: false,
      fileListAllPage: 0,
      fileListNowPage: 1,
      fileListLoadingCount: 0,
      pageLoading: true,
      nullData: {
        alertTxt: "没有文件哦"
      }
    };
  }
  genData() {
    const { fileBoxList, fileList } = this.state;
    const dataArr = [];
    const newCloneData = fileBoxList.concat(fileList);
    for (let i = 0; i < newCloneData.length; i++) {
      dataArr.push(`row - ${newCloneData[i].id}`);
    }
    return dataArr;
  }
  onRefresh = () => {
    const { refreshing, isLoading } = this.state;
    if (refreshing || isLoading) {
      return false;
    }
    this.setState({ refreshing: true });
    this.getFileList(1, this.props.projectId, this.props.parentId);
  };

  onEndReached = event => {
    const {
      fileListNowPage,
      fileListAllPage,
      refreshing,
      isLoading
    } = this.state;
    if (refreshing || isLoading) {
      return false;
    }
    if (fileListNowPage >= fileListAllPage) {
      return false;
    }
    this.setState({ isLoading: true });
    this.getFileList(
      fileListNowPage + 1,
      this.props.projectId,
      this.props.parentId
    );
  };
  componentDidMount() {
    if (this.props.projectId && this.props.parentId) {
      this.setState({
        projectId: this.props.projectId,
        parentId: this.props.parentId
      });
      this.getFileList(1, this.props.projectId, this.props.parentId);
    } else if (this.props.projectId) {
      this.setState({ projectId: this.props.projectId, parentId: "" });
      this.getFileList(1, this.props.projectId, "");
    }
    utils.butAnimate();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.projectId && nextProps.parentId) {
      this.setState({
        projectId: nextProps.projectId,
        parentId: nextProps.parentId
      });
      this.getFileList(1, nextProps.projectId, nextProps.parentId);
    } else if (nextProps.projectId) {
      this.setState({ projectId: nextProps.projectId, parentId: "" });
      this.getFileList(1, nextProps.projectId, "");
    }
  }

  componentDidUpdate() {
    utils.butAnimate();
  }

  componentWillUnmount() { }

  getFileList(pageNo = 1, projectId, parentId = "0", fileName = "") {
    const { dataSource, refreshing } = this.state;
    if (!refreshing && pageNo == 1) {
      this.setState({
        pageLoading: true
      });
    }
    if (!projectId) {
      projectId = this.state.projectId;
    }
    if (parentId === "") {
      parentId = "0";
    }
    // 根据页数判断 应该显示哪个加载进度效果

    taskAction.getFileListByProjectId(
      projectId,
      parentId,
      20,
      pageNo,
      fileName,
      res => {
        if (res.success) {
          if (res.data.treeData && res.data.treeData.list) {
            if (res.data.treeData.pageNo === 1) {
              let boxNewArr = [];
              res.data.treeData.list.map(item => {
                item.dataSourceType = "1";
                boxNewArr.push(item);
              });
              this.setState({ fileBoxList: boxNewArr }, () => {
                this.rData = this.genData();
                this.setState({
                  dataSource: dataSource.cloneWithRows(this.rData)
                });
              });
            } else {
              const { fileBoxList } = this.state;
              res.data.treeData.list.map(item => {
                if (
                  fileBoxList.filter(val => val.id === item.id).length === 0
                ) {
                  item.dataSourceType = "1";
                  fileBoxList.push(item);
                }
              });
              this.setState({ fileBoxList: fileBoxList }, () => {
                this.rData = this.genData();
                this.setState({
                  dataSource: dataSource.cloneWithRows(this.rData)
                });
              });
            }
          } else {
            this.setState({ fileBoxList: [] }, () => {
              this.rData = this.genData();
              this.setState({
                dataSource: dataSource.cloneWithRows(this.rData)
              });
            });
          }

          if (pageNo === 1) {
            let fileListArr = [];
            res.data &&
              res.data.fileList.map(item => {
                item.dataSourceType = 0;
                fileListArr.push(item);
              });
            this.setState(
              {
                fileListParent: res.data.parentList ? res.data.parentList : [],
                fileList: fileListArr ? fileListArr : []
              },
              () => {
                this.rData = this.genData();
                this.setState({
                  dataSource: dataSource.cloneWithRows(this.rData)
                });
              }
            );
          } else {
            let { fileList } = this.state;
            if (res.data.fileList && res.data.fileList.length > 0) {
              res.data.fileList.map(item => {
                item.dataSourceType = 0;
                fileList.push(item);
              });
              this.setState({ fileList: fileList }, () => {
                this.rData = this.genData();
                this.setState({
                  dataSource: dataSource.cloneWithRows(this.rData)
                });
              });
            }
          }

          this.setState({
            fileListNowPage: res.data.treeData ? res.data.treeData.pageNo : 1,
            fileListAllPage: res.data.treeData ? res.data.treeData.last : 0
          });
        } else {
          Toast.fail(res.errmsg, 1);
        }
        this.setState({
          fileListLoadingCount: this.state.fileListLoadingCount + 1
        });
        this.setState({
          fileListLoading: false,
          fileListMoreLoading: false,
          pageLoading: false,
          refreshing: false,
          isLoading: false
        });
      }
    );
  }

  scrollBottom(e) {
    const isOnBottom = utils.listScroll(e);
    const { fileListAllPage, fileListNowPage } = this.state;
    if (isOnBottom && fileListNowPage < fileListAllPage) {
      this.getFileList(fileListNowPage + 1);
    }
  }

  render() {
    const {
      fileList,
      fileListLoading,
      fileListParent,
      nullData,
      fileListAllPage,
      fileListNowPage,
      fileListMoreLoading,
      fileListLoadingCount,
      fileBoxList,
      dataSource,
      pageLoading,
      refreshing,
      isLoading
    } = this.state;
    const { projectId } = this.props;
    let arrAll = fileBoxList.concat(fileList);
    console.log(arrAll)
    const row = (rowData, sectionID, rowID) => {
      const item = arrAll[rowID];
      if (!item) {
        return <div />;
      }
      //1代表文件夹//否则是文件
      if (item.dataSourceType == "1") {
        return (
          <div
            className="table_tr pubDiv aniBut white"
            key={item.id}
            onClick={() => {
              this.getFileList(1, "", item.id, "");
            }}
          >
            <Icon type="anticon-wenjian1" />
            <div className="fileName textMore">
              {item.taskinfoNumber ? (
                <span>{item.taskinfoNumber.numberS + "." + item.rank}</span>
              ) : (
                  <span>{item.rank}</span>
                )}
              {item.taskname}
            </div>
            <div className="count">
              共<span>{item.attstr01}</span>个文件
            </div>
          </div>
        );
      } else {
        return (
          <div className="table_tr pubDiv aniBut white" key={item.id}>
            <div className="type">
              {item.fileFormat ? item.fileFormat.replace(".", "") : ""}
              {item.fileType ? item.fileType : ""}
            </div>
            <div className="fileName textMore">{item.fileName}</div>
            <Icon
              type="anticon-chakanyanjingshishifenxi"
              onClick={() => {
                Dingtalk.previewImage(item);
              }}
            />
          </div>
        );
      }
    };
    return (
      <div className="projectFile">
        <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
        <Loading show={fileListLoading} />
        {fileListParent.length > 0 && (
          <div className="bread">
            {fileListParent.map((item, i) => {
              if (i < fileListParent.length - 1) {
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
                          "&page=1"
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
                    style={{ color: "#666" }}
                  >
                    {item.taskname}
                  </span>
                );
              }
            })}
          </div>
        )}
        {pageLoading ? (
          <Loading show={true} />
        ) : fileList.length > 0 || fileBoxList.length > 0 ? (
          <div
            className="list"
          // onScroll={e => {
          //   this.scrollBottom(e);
          // }}
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
                  ) : fileListAllPage <= fileListNowPage ? (
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
            {/* {fileList.map(item => {
              return (
                <div className="table_tr pubDiv aniBut white" key={item.id}>
                  <div className="type">
                    {item.fileFormat ? item.fileFormat.replace(".", "") : ""}
                    {item.fileType ? item.fileType : ""}
                  </div>
                  <div className="fileName textMore">{item.fileName}</div>
                  <Icon
                    type="anticon-chakanyanjingshishifenxi"
                    onClick={() => {
                      Dingtalk.previewImage(item);
                    }}
                  />
                </div>
              );
            })}
            {fileBoxList.map(item => {
              return (
                <div
                  className="table_tr pubDiv aniBut white"
                  key={item.id}
                  onClick={() => {
                    this.getFileList(1, "", item.id, "");
                  }}
                >
                  <Icon type="anticon-wenjian1" />
                  <div className="fileName textMore">
                    {item.taskinfoNumber ? (
                      <span>
                        {item.taskinfoNumber.numberS + "." + item.rank}
                      </span>
                    ) : (
                      <span>{item.rank}</span>
                    )}
                    {item.taskname}
                  </div>
                  <div className="count">
                    共<span>{item.attstr01}</span>个文件
                  </div>
                </div>
              );
            })} */}
          </div>
        ) : (
              <Friendly data={nullData} />
            )}
      </div>
    );
  }
}
