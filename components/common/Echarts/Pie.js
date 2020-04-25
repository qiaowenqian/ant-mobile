import React, { PureComponent } from "react";
import echarts from "echarts";

class Pie extends PureComponent {
  static getInitialProps({ req, store, isServer }) {
    const language = req ? req.headers["accept-language"] : navigator.language;
    return {
      language
    };
  }
  constructor(props) {
    super(props);
    this.state = {
      user: ""
    };
  }

  componentDidMount() {
    if (this.props.data) {
      this.initChart(this.props.data);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data) {
      this.initChart(nextProps.data);
    }
  }

  initChart = data => {
    const myChart = echarts.init(document.getElementById("pie"), "light");
    const option = {
      tooltip: {
        trigger: "item",
        formatter: function(params, ticket, callback) {
          var res = "";
          res =
            `<div style="width:10px;height:10px;display:inline-block;margin-right:10px;border-radius:50%;background:${
              params.color
            }"></div>` +
            `<div style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;word-break:normal;display: inline-block;max-width:200px;line-height:12px;">${
              params.name
            }</div>` +
            "：" +
            params.value +
            `${
              params.name == "已完成"
                ? "<br/>" +
                  `<div style="padding-left:33px;display:inline-block;">提前：</div>` +
                  `${params.data.key1}`
                : ""
            }` +
            `${
              params.name == "已终止"
                ? ""
                : "<br/>" +
                  `<div style="padding-left:33px;display:inline-block;">逾期：</div>` +
                  `${params.data.key}`
            }` +
            "<br/>";
          return res;
        }
      },
      series: [
        {
          type: "pie",
          radius: "75%",
          center: ["50%", "50%"],
          clockwise: "true",
          label: {
            show: false
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: data,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        }
      ]
    };
    myChart.setOption(option);
  };

  render() {
    return <div id="pie" className="pie" />;
  }
}

export default Pie;
