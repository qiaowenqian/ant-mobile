import React from "react";
import { DatePicker, List, Toast, Tabs, WhiteSpace, Badge } from "antd-mobile";
import echarts from "echarts/lib/echarts";
import "echarts/lib/chart/bar";
import "echarts/lib/chart/pie";
import "echarts/lib/chart/line";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
import "echarts/lib/component/legend";
import moment from "moment";
import stylesheet from "../styles/components/projectChart.scss";
import {
  getChartByUserTask,
  getChartByUserMoney,
  getChartByTaskSituation,
  getChartByProjectProgress
} from "../actions/project.js";
import Loading from "../components/Loading";
import utils from "../utils/utils";
import NullView from "../components/Friendly";

const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);

/*
 * （必填）projectId:''                   // 项目ID
 */

export default class ProjectChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chart1DataInfo: [],
      chart1Loading: false,
      chart2Loading: false,
      chart3Loading: false,
      chart4Loading: false,
      chart1Render: true,
      chart2Render: true,
      chart3Render: true,
      chart4Render: true,

      calculationModel: false,
      FormulaList: {
        id: "", //计算公式id
        // delFlag:'0',          //
        projectId: "", //项目id
        createPerf: "10", //创建任务绩效占比
        assignPerf: "5", //指派任务绩效占比
        confirmPerf: "15", //确认任务绩效占比
        finishPerf: "70", //完成任务绩效占比
        finishZcPerf: "100", //正常完成任务绩效占比
        finishTqPerf: "110", //提前完成任务绩效占比
        finishYqPerf: "90" //逾期完成任务绩效占比
        // hyPerf: '3'           //合计绩效
      },

      date: now,
      chart3Start: "",
      chart3End: "",
      chart4Start: "",
      chart4End: "",
      chart4searchType: "1"
    };
  }

  componentWillMount() {
    if (this.props.projectId) {
      this.setState({ projectIds: this.props.projectId });
    }
  }

  componentDidMount() {
    if (this.props.projectId) {
      this.chart1(this.props.projectId);
      this.chart2(this.props.projectId);
      this.chart3(this.props.projectId);
      this.chart4(this.props.projectId);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.projectId !== this.props.projectId) {
      this.chart1(nextProps.projectId);
      this.chart2(nextProps.projectId);
      this.chart3(nextProps.projectId);
      this.chart4(nextProps.projectId);
    }
  }

  chart1(id) {
    this.setState({ chart1Loading: true });
    getChartByTaskSituation(id, result => {
      if (result.success) {
        if (result.data.count.count === 0) {
          this.setState({ chart1Render: false });
        } else {
          this.setState({ chart1Render: true });
          let res = result.data;
          const chart1Datas = [];
          if (res.data) {
            chart1Datas.push(
              {
                value: res.data.weizp,
                name: "待指派",
                itemStyle: {
                  color: "#a695f4"
                },
                key: res.data.dzpyq
              },
              {
                value: res.data.jinxz,
                name: "进行中",
                itemStyle: {
                  color: "#a1d685"
                },
                key: res.data.jxzyq
              },
              {
                value: res.data.weish,
                name: "待确认",
                itemStyle: {
                  color: " #81d4fa"
                },
                key: res.data.dqryq
              },
              {
                value: res.data.yiwc,
                name: "已完成",
                itemStyle: {
                  color: "#90a4ae "
                },
                key: res.data.yuqwc
              },
              {
                value: res.data.yizz,
                name: "已终止",
                itemStyle: {
                  color: "#dbdcdc"
                }
              }
            );
          }
          if (chart1Datas.length > 0) {
            this.setState({
              chart1DataInfo: chart1Datas
            });
          } else {
            this.setState({
              chart1DataInfo: []
            });
          }

          var chart1 = echarts.init(document.getElementById("main1"));
          var option1 = {
            tooltip: {
              trigger: "item",
              formatter: function(params, ticket, callback) {
                var res = "";
                res =
                  `<div style="width:10px;height:10px;display:inline-block;margin-right:10px;border-radius:50%;background:${
                    params.color
                  }"></div>` +
                  params.name +
                  " : " +
                  params.value +
                  `${
                    params.name == "已终止"
                      ? ""
                      : "<br/>" +
                        `<div style="display:inline-block;padding-left:20px;">逾期:</div>` +
                        `${params.data.key}`
                  }` +
                  "<br/>";
                return res;
              }
            },
            series: [
              {
                name: "任务概述",
                type: "pie",
                radius: ["50%", "70%"],
                avoidLabelOverlap: false,
                label: {
                  normal: {
                    show: false,
                    position: "center"
                  },
                  emphasis: {
                    show: false,
                    textStyle: {
                      fontSize: "30",
                      fontWeight: "bold"
                    }
                  }
                },
                labelLine: {
                  normal: {
                    show: false
                  }
                },
                data: chart1Datas
              }
            ]
          };
          chart1.setOption(option1);
        }
        this.setState({ chart1Loading: false });
      }
    });
  }

  chart2(id) {
    this.setState({ chart2Loading: true });
    const data = { projectId: id };
    getChartByProjectProgress(data, result => {
      if (result.success) {
        if (result.data.length === 0) {
          this.setState({ chart2Render: false });
        } else {
          this.setState({ chart2Render: true });
          let res = result.data;
          const dates = [];
          const data_wwc = [];
          const data_dqr = [];
          const data_wzp = [];
          const data_ywc = [];
          res.map(item => {
            dates.push(item.date);
            data_wwc.push(item.wwcCount);
            data_dqr.push(item.dqrCount);
            data_wzp.push(item.wzpCount);
            data_ywc.push(item.ywcCount);
          });

          var chart2 = echarts.init(document.getElementById("main2"));
          var option2 = {
            tooltip: {
              trigger: "axis",
              axisPointer: {
                type: "cross"
              }
            },
            legend: {
              data: ["未指派", "进行中", "待确认", "已完成"],
              bottom: 0
            },
            toolbox: {
              // feature: {
              // 	saveAsImage: {}
              // }
              show: false
            },
            grid: {
              left: "0",
              right: "16",
              bottom: "40",
              top: "10",
              containLabel: true
            },
            xAxis: [
              {
                type: "category",
                boundaryGap: false,
                data: dates,
                axisLine: {
                  lineStyle: {
                    color: "#666"
                  }
                },
                axisLabel: {
                  formatter: function(value) {
                    let valuestr = moment(value.split("-").join("/")).format(
                      "YYYY"
                    );
                    let valuestr2 = moment(value.split("-").join("/")).format(
                      "DD/MM"
                    );
                    // value = arr[0] + "年" + "\n" + arr[1] + "/" + arr[2];
                    return valuestr + "\n" + valuestr2;
                  }
                }
              }
            ],
            yAxis: [
              {
                type: "value",
                axisLine: {
                  lineStyle: {
                    color: "#666"
                  }
                }
              }
            ],
            series: [
              {
                name: "未指派",
                type: "line",
                stack: "总量",
                itemStyle: {
                  color: "#a695f4"
                },
                areaStyle: {
                  normal: {}
                },
                data: data_wzp
              },
              {
                name: "进行中",
                type: "line",
                stack: "总量",
                itemStyle: {
                  color: "#a1d685"
                },
                areaStyle: {
                  normal: {}
                },
                data: data_wwc
              },
              {
                name: "待确认",
                type: "line",
                stack: "总量",
                itemStyle: {
                  color: " #81d4fa"
                },
                areaStyle: {
                  normal: {}
                },
                data: data_dqr
              },
              {
                name: "已完成",
                type: "line",
                stack: "总量",
                itemStyle: {
                  color: "#90a4ae"
                },
                areaStyle: {
                  normal: {}
                },
                data: data_ywc
              }
            ]
          };
          chart2.setOption(option2);
        }
        this.setState({ chart2Loading: false });
      } else {
        Toast.fail(result.errmsg);
        this.setState({ chart2Loading: false });
      }
    });
  }

  chart3(id, start, end) {
    this.setState({ chart3Loading: true });
    const data = {
      projectId: id,
      attdate01: start ? start : "",
      attdate02: end ? end : ""
    };
    getChartByUserTask(data, result => {
      if (result.data.tasktableData.length === 0) {
        this.setState({ chart3Render: false });
      } else {
        this.setState({ chart3Render: true });
        let res = result.data;
        const chart3names = [];
        const chart3Datas_zcwc = [];
        const chart3Datas_tqwc = [];
        const chart3Datas_yqwc = [];
        const chart3Datas_zprw = [];
        const chart3Datas_qrrw = [];
        const chart3Datas_cjrw = [];
        res.tasktableData.map((item, i) => {
          chart3names.push(item.name);
          chart3Datas_zprw.push(item.dzprw);
          chart3Datas_cjrw.push(item.dwcrw);
          chart3Datas_qrrw.push(item.dqrrw);
          // chart3Datas_zcwc.push(item.zcwc);
          // chart3Datas_tqwc.push(item.tqwc);
          // chart3Datas_yqwc.push(item.yqwc);
        });
        var chart3 = echarts.init(document.getElementById("main3"));
        var option3 = {
          tooltip: {
            trigger: "axis",
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            data: ["待指派", "待完成", "待确认"],
            bottom: 0
          },
          grid: {
            left: "0",
            right: "0",
            bottom: "60",
            top: "0",
            containLabel: true
          },
          xAxis: {
            type: "value",
            // show: false,
            axisLine: {
              lineStyle: {
                color: "#666"
              }
            }
          },
          yAxis: {
            type: "category",
            data: chart3names,
            axisLine: {
              lineStyle: {
                color: "#666"
              }
            }
          },
          series: [
            {
              name: "待指派",
              type: "bar",
              stack: "总量",
              label: {
                show: false
              },
              itemStyle: {
                color: "#a695f4"
              },
              data: chart3Datas_zprw
            },
            {
              name: "待完成",
              type: "bar",
              stack: "总量",
              label: {
                show: false
              },
              itemStyle: {
                color: "#a1d685"
              },
              data: chart3Datas_cjrw
            },
            {
              name: "待确认",
              type: "bar",
              stack: "总量",
              label: {
                show: false
              },
              itemStyle: {
                color: "#81d4fa"
              },
              data: chart3Datas_qrrw
            }
          ]
        };
        chart3.setOption(option3);
      }
      this.setState({ chart3Loading: false });
    });
  }

  chart4(id, start, end, search = "1") {
    this.setState({ chart4Loading: true });
    const data = {
      projectId: id,
      attdate01: start ? start : "",
      attdate02: end ? end : "",
      type: search ? search : "1"
    };
    getChartByUserMoney(data, result => {
      if (result.success) {
        if (
          (result.data.contenTableData &&
            result.data.contenTableData.length === 0) ||
          (result.data.tasktableData && result.data.tasktableData.length === 0)
        ) {
          this.setState({ chart4Render: false });
        } else {
          this.setState({ chart4Render: true });
          let res = result.data;
          const chart4names = [];
          const chart4data_wcrw = [];
          const chart4data_zprw = [];
          const chart4data_qrrw = [];
          const chart4data_cjrw = [];
          if (search == "1") {
            res.contenTableData.map(item => {
              chart4names.push(item.name);
              chart4data_wcrw.push(item.zcwcjx + item.yqwcjx);
              chart4data_zprw.push(item.zprwjx);
              chart4data_qrrw.push(item.qrrwjx);
              chart4data_cjrw.push(item.cjrwjx);
            });
          } else if (search == "2") {
            res.tasktableData.map((item, i) => {
              chart4names.push(item.name);
              chart4data_wcrw.push(item.zcwc + item.yqwc);
              chart4data_zprw.push(item.zprw);
              chart4data_qrrw.push(item.qrrw);
              chart4data_cjrw.push(item.cjrw);
            });
          }
          if (search == "1") {
            var chart4 = echarts.init(document.getElementById("main4"));
          } else if (search == "2") {
            var chart5 = echarts.init(document.getElementById("main5"));
          }
          var option4 = {
            tooltip: {
              trigger: "axis",
              axisPointer: {
                // 坐标轴指示器，坐标轴触发有效
                type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            legend: {
              data: ["创建任务", "指派任务", "确认任务", "完成任务"],
              bottom: 0
            },
            grid: {
              top: "0",
              left: "0",
              right: "0",
              bottom: "60",
              containLabel: true
            },
            xAxis: {
              type: "value",
              axisLine: {
                lineStyle: {
                  color: "#666"
                }
              }
            },
            yAxis: {
              type: "category",
              data: chart4names,
              axisLine: {
                lineStyle: {
                  color: "#666"
                }
              }
            },
            series: [
              {
                name: "创建任务",
                type: "bar",
                stack: "总量",
                label: {
                  show: false
                },
                itemStyle: {
                  color: "#d3c4bd"
                },
                data: chart4data_cjrw
              },
              {
                name: "指派任务",
                type: "bar",
                stack: "总量",
                label: {
                  show: false
                },
                itemStyle: {
                  color: "#a695f4"
                },
                data: chart4data_zprw
              },
              {
                name: "确认任务",
                type: "bar",
                stack: "总量",
                label: {
                  show: false
                },
                itemStyle: {
                  color: "#81d4fa"
                },
                data: chart4data_qrrw
              },
              {
                name: "完成任务",
                type: "bar",
                stack: "总量",
                label: {
                  show: false
                },
                itemStyle: {
                  color: "#90a4ae"
                },
                data: chart4data_wcrw
              }
            ]
          };
          if (search == "1") {
            chart4.setOption(option4);
          } else if (search == "2") {
            chart5.setOption(option4);
          }
        }
        this.setState({ chart4Loading: false });
      }
    });
  }

  // 人员任务和人员绩效筛选
  selectTime(type, name, date) {
    let {
      chart3Start,
      chart3End,
      chart4Start,
      chart4End,
      chart4searchType
    } = this.state;
    if (type === "人员任务统计" && name === "start") {
      const start = utils.dateToString(date, "date");
      this.setState({ chart3Start: start });
      if (start !== chart3Start && chart3End !== "") {
        this.chart3(this.props.projectId, start, chart3End);
      }
    } else if (type === "人员任务统计" && name === "end") {
      const end = utils.dateToString(date, "date");
      this.setState({ chart3End: end });
      if (end !== chart3End && chart3Start !== "") {
        this.chart3(this.props.projectId, chart3Start, end);
      }
    } else if (type === "人员绩效统计" && name === "start") {
      const start = utils.dateToString(date, "date");
      this.setState({ chart4Start: start });
      if (start !== chart4Start && chart4End !== "") {
        this.chart4(this.props.projectId, start, chart4End, chart4searchType);
      }
    } else if (type === "人员绩效统计" && name === "end") {
      const end = utils.dateToString(date, "date");
      this.setState({ chart4End: end });
      if (end !== chart4End && chart4Start !== "") {
        this.chart4(this.props.projectId, chart4Start, end, chart4searchType);
      }
    }
  }

  //人员绩效按类型筛选
  selectType(type) {
    const { chart4Start, chart4End, chart4searchType } = this.state;
    this.chart4(this.props.projectId, chart4Start, chart4End, type);
    this.setState({ chart4searchType: type });
  }
  render() {
    const {
      chart1Loading,
      chart2Loading,
      chart3Loading,
      chart4Loading,
      chart3Start,
      chart3End,
      chart4Start,
      chart4End,
      chart1DataInfo,
      chart1Render,
      chart2Render,
      chart3Render,
      chart4Render,
      chart4searchType
    } = this.state;
    const nullData = {
      alertTxt: "当前还没有可统计的数据",
      Icon: "anticon-Warning"
    };
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
    const tabs = [
      { title: <Badge>按绩效值</Badge> },
      { title: <Badge>按任务数</Badge> }
    ];

    return (
      <div className="projectChart">
        <style
          dangerouslySetInnerHTML={{
            __html: stylesheet
          }}
        />
        <div className="chartBox pubDiv">
          <div className="chart_title">任务概述</div>
          <div className="chartBox" style={{ height: "150px" }}>
            <Loading show={chart1Loading} />
            {chart1Render ? (
              <div className="chart" id="main1" />
            ) : (
              <NullView data={nullData} />
            )}
            {chart1Render ? (
              <div className="taskDesc">
                {chart1DataInfo && chart1DataInfo.length > 0
                  ? chart1DataInfo.map((item, i) => {
                      return (
                        <div className="li" key={i + "chart1DataInfo"}>
                          <div
                            className="round"
                            style={{
                              background: item.itemStyle.color
                            }}
                          />
                          <div className="charType">{item.name}</div>
                          <div className="baifenbi">{item.value}</div>
                        </div>
                      );
                    })
                  : ""}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="chartBox pubDiv">
          <div className="chart_title">项目进展</div>
          <div
            className="chartBox2"
            style={
              chart2Render
                ? {
                    height: "200px"
                  }
                : {
                    height: "150px"
                  }
            }
          >
            <Loading show={chart2Loading} />
            {chart2Render ? (
              <div className="chart" id="main2" />
            ) : (
              <NullView data={nullData} />
            )}
          </div>
        </div>
        <div className="chartBox pubDiv">
          <div className="chart_title">人员待办统计</div>
          {chart3Render ? (
            <div className="chart_search">
              <div className="search">
                <div className="date">
                  <div
                    style={
                      chart3Start
                        ? {}
                        : {
                            opacity: "0"
                          }
                    }
                  >
                    <DatePicker
                      mode="date"
                      extra="请选择"
                      value={chart3Start ? new Date(chart3Start) : new Date()}
                      onChange={date => {
                        this.selectTime("人员任务统计", "start", date);
                      }}
                    >
                      <CustomChildren />
                    </DatePicker>
                  </div>
                  {!chart3Start ? (
                    <span className="defaultTxt">请选择</span>
                  ) : (
                    ""
                  )}
                </div>
                <div className="icon">-</div>
                <div className="date">
                  <div
                    style={
                      chart3End
                        ? {}
                        : {
                            opacity: "0"
                          }
                    }
                  >
                    <DatePicker
                      mode="date"
                      extra="请选择"
                      value={chart3End ? new Date(chart3End) : new Date()}
                      onChange={date => {
                        this.selectTime("人员任务统计", "end", date);
                      }}
                    >
                      <CustomChildren />
                    </DatePicker>
                  </div>
                  {!chart3End ? <span className="defaultTxt">请选择</span> : ""}
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
          <div
            className="chartBox"
            style={
              chart3Render
                ? {}
                : {
                    height: "150px"
                  }
            }
          >
            <Loading show={chart3Loading} />
            {chart3Render ? (
              <div className="chart" id="main3" />
            ) : (
              <NullView data={nullData} />
            )}
          </div>
        </div>
        <div className="chartBox pubDiv">
          <div className="chart_title">人员绩效统计</div>
          <div className="chart_tabs">
            <Tabs
              tabs={tabs}
              initialPage={0}
              onChange={(tab, index) => {
                this.selectType((index + 1).toString());
              }}
              onTabClick={(tab, index) => {
                this.setState({
                  chart4searchType: index + 1
                });
              }}
            >
              <div
                style={{
                  height: "320px"
                }}
              >
                {chart4Render ? (
                  <div className="chart_search">
                    <div className="search">
                      <div className="date">
                        <div
                          style={
                            chart4Start
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
                              chart4Start ? new Date(chart4Start) : new Date()
                            }
                            onChange={date => {
                              this.selectTime("人员绩效统计", "start", date);
                            }}
                          >
                            <CustomChildren />
                          </DatePicker>
                        </div>
                        {!chart4Start ? (
                          <span className="defaultTxt">请选择</span>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="icon">-</div>
                      <div className="date">
                        <div
                          style={
                            chart4End
                              ? {}
                              : {
                                  opacity: "0"
                                }
                          }
                        >
                          <DatePicker
                            mode="date"
                            extra="请选择"
                            value={chart4End ? new Date(chart4End) : new Date()}
                            onChange={date => {
                              this.selectTime("人员绩效统计", "end", date);
                            }}
                          >
                            <CustomChildren />
                          </DatePicker>
                        </div>
                        {!chart4End ? (
                          <span className="defaultTxt">请选择</span>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                <div
                  className="chartBox"
                  style={
                    chart4Render
                      ? {}
                      : {
                          height: "150px"
                        }
                  }
                >
                  <Loading show={chart4Loading} />
                  {chart4Render ? (
                    <div className="chart" id="main4" />
                  ) : (
                    <NullView data={nullData} />
                  )}
                </div>
              </div>
              <div
                style={{
                  height: "320px"
                }}
              >
                {chart4Render ? (
                  <div className="chart_search">
                    <div className="search">
                      <div className="date">
                        <div
                          style={
                            chart4Start
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
                              chart4Start ? new Date(chart4Start) : new Date()
                            }
                            onChange={date => {
                              this.selectTime("人员绩效统计", "start", date);
                            }}
                          >
                            <CustomChildren />
                          </DatePicker>
                        </div>
                        {!chart4Start ? (
                          <span className="defaultTxt">请选择</span>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="icon">-</div>
                      <div className="date">
                        <div
                          style={
                            chart4End
                              ? {}
                              : {
                                  opacity: "0"
                                }
                          }
                        >
                          <DatePicker
                            mode="date"
                            extra="请选择"
                            value={chart4End ? new Date(chart4End) : new Date()}
                            onChange={date => {
                              this.selectTime("人员绩效统计", "end", date);
                            }}
                          >
                            <CustomChildren />
                          </DatePicker>
                        </div>
                        {!chart4End ? (
                          <span className="defaultTxt">请选择</span>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                <div
                  className="chartBox"
                  style={
                    chart4Render
                      ? {}
                      : {
                          height: "150px"
                        }
                  }
                >
                  <Loading show={chart4Loading} />
                  {chart4Render ? (
                    <div className="chart" id="main5" />
                  ) : (
                    <NullView data={nullData} />
                  )}
                </div>
              </div>
            </Tabs>
            <WhiteSpace />
          </div>
        </div>
      </div>
    );
  }
}
