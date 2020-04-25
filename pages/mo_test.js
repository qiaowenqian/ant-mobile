import React, { Component } from "react";

import Layout from "../components/Layout";
import Loading from "../components/Loading";
/* eslint no-dupe-keys: 0, no-mixed-operators: 0 */
import { PullToRefresh, ListView } from "antd-mobile";

const data = [
  {
    img: "https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png",
    title: "Meet hotel",
    des: "不是所有的兼职汪都需要风吹日晒"
  },
  {
    img: "https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png",
    title: "McDonald's invites you",
    des: "不是所有的兼职汪都需要风吹日晒"
  },
  {
    img: "https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png",
    title: "Eat the week",
    des: "不是所有的兼职汪都需要风吹日晒"
  }
];

export default class moTest extends Component {
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
      dataSource,
      refreshing: true,
      isLoading: true,
      useBodyScroll: false,
      pageIndex: 0,
      NUM_ROWS: 20
    };
  }
  genData(pIndex = 0) {
    const { NUM_ROWS } = this.state;
    const dataArr = [];
    for (let i = 0; i < NUM_ROWS; i++) {
      dataArr.push(`row - ${pIndex * NUM_ROWS + i}`);
    }
    return dataArr;
  }
  componentDidUpdate() {}

  componentDidMount() {
    const { dataSource } = this.state;

    setTimeout(() => {
      this.rData = this.genData();
      console.log(this.genData());
      this.setState({
        dataSource: dataSource.cloneWithRows(this.genData()),
        height: "100%",
        refreshing: false,
        isLoading: false
      });
    }, 1500);
  }

  onRefresh = () => {
    const { dataSource } = this.state;
    this.setState({ refreshing: true, isLoading: true });
    // simulate initial Ajax
    setTimeout(() => {
      this.rData = this.genData();
      console.log(this.genData());
      this.setState({
        dataSource: dataSource.cloneWithRows(this.rData),
        refreshing: false,
        isLoading: false
      });
    }, 600);
  };

  onEndReached = event => {
    // load new data
    // hasMore: from backend data, indicates whether it is the last page, here is false
    const { isLoading, hasMore, dataSource, pageIndex } = this.state;
    if (isLoading && !hasMore) {
      return;
    }
    console.log("reach end", event);
    this.setState({ isLoading: true });
    setTimeout(() => {
      let index = pageIndex + 1;
      this.rData = [...this.rData, ...this.genData(index)];
      console.log(this.genData());
      this.setState({
        dataSource: dataSource.cloneWithRows(this.rData),
        isLoading: false
      });
    }, 1000);
  };

  render() {
    const { language } = this.props;
    const { refreshing, dataSource, isLoading } = this.state;

    let index = data.length - 1;
    const row = (rowData, sectionID, rowID) => {
      if (index < 0) {
        index = data.length - 1;
      }
      const obj = data[index--];
      return (
        <div
          key={rowID}
          style={{
            padding: "0 15px",
            backgroundColor: "white"
          }}
        >
          <div
            style={{ display: "-webkit-box", display: "flex", padding: "15px" }}
          >
            <img
              style={{ height: "63px", width: "63px", marginRight: "15px" }}
              src={obj.img}
              alt=""
            />
            <div style={{ display: "inline-block" }}>
              <div
                style={{
                  marginBottom: "8px",
                  color: "#000",
                  fontSize: "16px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  maxWidth: "250px"
                }}
              >
                {obj.des}-{rowData}
              </div>
              <div style={{ fontSize: "16px" }}>
                <span style={{ fontSize: "30px", color: "#FF6E27" }}>
                  {rowID}
                </span>{" "}
                元/任务
              </div>
            </div>
          </div>
        </div>
      );
    };
    return (
      <Layout language={language}>
        <div className="boxList" style={{ height: "100%", width: "100%" }}>
          <ListView
            // key={this.state.useBodyScroll ? "0" : "1"}
            // ref={el => (this.lv = el)}
            dataSource={dataSource}
            // renderHeader={() => <span>Pull to refresh</span>}
            renderFooter={() => (
              <div style={{ padding: 30, textAlign: "center" }}>
                {isLoading ? (
                  <div
                    style={{
                      height: "50px",
                      position: "relative",
                      color: "#a9b5b9",
                      lineHeight: "50px",
                      fontSize: "12px"
                    }}
                  >
                    <Loading
                      show={true}
                      style={{
                        position: "inherit",
                        display: "inline-block",
                        width: "auto",
                        height: "50px",
                        minHeight: "20px",
                        background: "none",
                        margin: "1px 10px 0 0"
                      }}
                    />
                    加载中
                  </div>
                ) : (
                  <div
                    style={{
                      height: "50px",
                      position: "relative",
                      color: "#a9b5b9",
                      lineHeight: "50px",
                      fontSize: "12px"
                    }}
                  >
                    <Loading
                      show={true}
                      style={{
                        position: "inherit",
                        display: "inline-block",
                        width: "auto",
                        height: "50px",
                        minHeight: "20px",
                        background: "none",
                        margin: "1px 10px 0 0"
                      }}
                    />
                    已经加载全部
                  </div>
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
                distanceToRefresh={40}
                indicator={{
                  activate: (
                    <div
                      style={{
                        height: "50px",
                        position: "relative",
                        color: "#a9b5b9",
                        lineHeight: "50px",
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
                        height: "50px",
                        position: "relative",
                        color: "#a9b5b9",
                        lineHeight: "50px",
                        fontSize: "12px",
                        textAlign: "center"
                      }}
                    >
                      <Loading
                        show={true}
                        style={{
                          position: "inherit",
                          display: "inline-block",
                          width: "auto",
                          height: "50px",
                          minHeight: "20px",
                          background: "none",
                          margin: "1px 10px 0 0"
                        }}
                      />
                      正在刷新
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
      </Layout>
    );
  }
}
