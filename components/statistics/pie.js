import React, { Component } from "react";
import utils from "../../utils/utils";
const F2 = require("@antv/f2");
class Pie extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

  componentWillMount() {
    console.log(this.props.data);
    this.setState({
      data: this.props.data
    });
  }

  componentDidMount() {
    utils.butAnimate();
    if (this.props.selectList) {
      this.setState({
        tagList: JSON.parse(JSON.stringify(this.props.selectList))
      });
    }
    const { data } = this.state;
    console.log(data, 1111111)
    //组装颜色数据
    let colorList = [];
    let allCount = 0;
    data.map(item => {
      let color = "";
      if (item.name == "已完成") {
        color = "rgba(120, 144, 156,1)";
      }
      if (item.name == "进行中") {
        color = "rgba(165, 214, 167,1)";
      }
      if (item.name == "待确认") {
        color = "rgba(129, 212, 250,1)";
      }
      if (item.name == "未指派") {
        color = "rgba(206, 147, 216,1)";
      }
      if (item.name == "已终止") {
        color = "rgba(211, 196, 189,1)";
      }
      colorList.push(color);
      allCount = allCount + item.value;
    });
    var chart = new F2.Chart({
      id: "mountNode",
      pixelRatio: window.devicePixelRatio
    });
    chart.source(data, {
      value: {
        formatter: function formatter(val) {
          return val;
        }
      }
    });
    // tooltip 和图例的联动
    console.log(chart.tooltip);
    chart.tooltip({
      custom: true,
      showCrosshairs: false,
      onChange: function (ev) {
        let tooltipEl = document.getElementById("pie");
        var currentData = ev.items[0];
        if (currentData.name == "已完成") {
          tooltipEl.innerHTML = ` 
          <div  style="text-align: right;position:relative;padding-left:16px;font-size:12px;color:#fff;line-height:16px;">
            <div><span  style='display:inline-block;width:10px;height:10px; border-radius: 50%;  position: absolute;top:2px;left:0;background:${
            currentData.origin.itemStyle.color
            }'></span>${currentData.name}:</div>
            <div>提前:</div>
            <div>逾期:</div>
          </div>
          <div style='text-align: right;font-size:12px;color:#fff;line-height:16px;'>
            <div> ${currentData.value}</div>
            <div> ${currentData.value}</div>
            <div> ${currentData.value}</div>
          </div>`;
        } else {
          tooltipEl.innerHTML = ` <div style="text-align: right;position:relative;padding-left:16px;font-size:12px;color:#fff;line-height:16px;">
            <div><span  style='display:inline-block;width:10px;height:10px; border-radius: 50%;  position: absolute;top:2px;left:0;background:${
            currentData.origin.itemStyle.color
            }'></span>${currentData.name}:</div>
            <div>已逾期:</div>
          </div>
          <div style='text-align: right;font-size:12px;color:#fff;line-height:16px;'>
            <div> ${currentData.value}</div>
            <div> ${currentData.value}</div>
          </div>`;
        }

        console.log(currentData);
        tooltipEl.style.opacity = 1;
        tooltipEl.style.left =
          currentData.x[1] - tooltipEl.offsetWidth / 2 + "px";

        tooltipEl.style.top =
          currentData.y - tooltipEl.offsetHeight - 15 + "px";
        // tooltipEl.css({
        //   opacity: 1,
        //   left:
        //     canvasOffsetLeft +
        //     currentData.x -
        //     tooltipEl.outerWidth() / 2 +
        //     "px",
        //   top:
        //     canvasOffsetTop +
        //     currentData.y -
        //     tooltipEl.outerHeight() -
        //     15 +
        //     "px"
        // });
      }
    });
    chart.legend({
      position: "right",
      itemFormatter: function itemFormatter(val) {
        let str = "";
        data.map(item => {
          if (item.name == val) {
            str = val + "  " + item.value;
          }
        });
        return str;
      }
    });
    console.log(chart);
    chart.coord("polar", {
      transposed: true,
      radius: 0.85
    });
    chart.axis(false);
    chart
      .interval()
      .position("a*value")
      .color("name", colorList)
      .adjust("stack")
      .style({
        lineWidth: 1,
        stroke: "#fff",
        lineJoin: "round",
        lineCap: "round"
      })
      .animate({
        appear: {
          duration: 1200,
          easing: "bounceOut"
        }
      });

    chart.render();
  }

  componentWillReceiveProps(nextProps) { }

  componentDidUpdate() {
    utils.butAnimate();
  }

  render() {
    return (
      <div class="chart-wrapper" style={{ position: "relative" }}>
        <canvas id="mountNode" style={{ width: "100%" }} />
        <div
          ref="pie"
          id="pie"
          style={{
            position: "absolute",
            zIndex: 99,
            display: "flex",
            padding: "5px",
            background: "rgba(50, 50, 50, 0.7)",
            borderColor: "rgb(51, 51, 51)",
            borderRadius: "4px",
            opacity: 0
          }}
        />
      </div>
    );
  }
}
export default Pie;
