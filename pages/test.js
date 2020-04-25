import React, { Component, PureComponent } from "react";
import stylesheet from "styles/pages/statistics.scss";
import withRedux from "next-redux-wrapper";
import { bindActionCreators } from "redux";
import * as statisticsAction from "../actions/statistics";
import { initStore } from "../store";
import Loading from "../components/Loading";
import _ from "lodash";
class MoTable extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  componentWillMount() {
    const { penPerson } = this.props;
    if (_.isEmpty(penPerson)) {
      this.props.getPieChartData({}, () => {
        this.setState({ loading: false });
      });
      this.props.getPendStatisticsData();
      this.props.getPendByProjectData();
      this.props.getNumByProjectData();
      this.props.getNumByPersonData();
    } else {
      this.setState({ loading: false });
    }
  }

  componentDidMount() {
    const mql = window.matchMedia("(orientation: portrait)");
    const width = document.documentElement.clientWidth;
    const height = document.documentElement.clientHeight;
    const tableEle = this.refs.table;
    if (mql.matches) {
      //       tableEle.style.width = height + "px";
      //       tableEle.style.height = width + "px";
      //       tableEle.style.transform = "rotate(90deg)";
      //       tableEle.style.transformOrigin = "0% 0%";
      //       tableEle.style.top = 0 + "px";
      //       tableEle.style.left = width + "px";
    }
  }

  renderTask = () => {
    const { pieData } = this.props;

    return (
      <table className="table" ref="table">
        <thead>
          <tr>
            <td colSpan="11"> 任务分布表（按状态）</td>
          </tr>
          <tr>
            <td colSpan="2">待指派</td>
            <td colSpan="2">待完成</td>
            <td colSpan="2">待确认</td>
            <td colSpan="3">已完成</td>
            <td rowSpan="2">已终止</td>
            <td rowSpan="2">合计</td>
          </tr>
          <tr>
            <td>任务数</td>
            <td>逾期</td>
            <td>任务数</td>
            <td>逾期</td>
            <td>任务数</td>
            <td>逾期</td>
            <td>完成总数</td>
            <td>提前完成</td>
            <td>逾期完成</td>
            <td />
            <td />
          </tr>
        </thead>
        <tbody>
          {pieData.taskPendList &&
            pieData.taskPendList.length > 0 &&
            pieData.taskPendList.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.daizp}</td>
                  <td>{item.dzpyq}</td>
                  <td>{item.jinxz}</td>
                  <td>{item.jxzyq}</td>

                  <td>{item.daiqr || 0}</td>
                  <td>{item.dqryq || 0}</td>

                  <td>{item.yiwc || 0}</td>
                  <td>{item.tqwc || 0}</td>
                  <td>{item.ywcyq || 0}</td>

                  <td>{item.yizz || 0}</td>
                  <td>{item.total}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    );
  };

  renderPenPerson = () => {
    const { penPerson } = this.props;

    //     console.log(penPerson, "penPerson");

    return (
      <table className="table" ref="table">
        <thead>
          <tr>
            <td colSpan="11">人员待办统计表</td>
          </tr>
          <tr>
            <td rowSpan="3">姓名</td>
            <td colSpan="2">待指派</td>
            <td colSpan="2">待完成</td>
            <td colSpan="2">待确认</td>
            <td colSpan="2">合计</td>
          </tr>
          <tr>
            <td>任务数</td>
            <td>逾期</td>
            <td>任务数</td>
            <td>逾期</td>
            <td>任务数</td>
            <td>逾期</td>
            <td>代办总数</td>
            <td>逾期</td>
          </tr>
        </thead>
        <tbody>
          {penPerson.taskPendList &&
            penPerson.taskPendList.length > 0 &&
            penPerson.taskPendList.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.name || ""}</td>
                  <td>{item.daizp}</td>
                  <td>{item.dzpyq}</td>
                  <td>{item.jinxz}</td>
                  <td>{item.jxzyq}</td>

                  <td>{item.daiqr || 0}</td>
                  <td>{item.dqryq || 0}</td>

                  <td>{item.total || 0}</td>
                  <td>{item.tqwc || 0}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    );
  };

  renderPerformanPerson = () => {
    const { taskNumsPerson } = this.props;

    //     console.log(taskNumsPerson, "taskNumsPerson");

    return (
      <table className="table" ref="table">
        <thead>
          <tr>
            <td colSpan="11"> 任务分布表（按状态）</td>
          </tr>
          <tr>
            <td rowSpan="2">姓名</td>
            <td rowSpan="2">创建任务</td>
            <td colSpan="2">指派任务</td>
            <td colSpan="3">完成任务</td>
            <td colSpan="2">确认任务</td>
          </tr>
          <tr>
            <td>指派总数</td>
            <td>指派预期</td>
            <td>完成总数</td>
            <td>提前完成</td>
            <td>逾期完成</td>
            <td>确认总数</td>
            <td>逾期确认</td>
          </tr>
        </thead>
        <tbody>
          {taskNumsPerson.taskNumList &&
            taskNumsPerson.taskNumList.length > 0 &&
            taskNumsPerson.taskNumList.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.cjrw}</td>

                  <td>{item.zprw}</td>
                  <td>{item.yqzp}</td>

                  <td>{item.wcrw || 0}</td>
                  <td>{item.tqwc || 0}</td>
                  <td>{item.yqwc || 0}</td>

                  <td>{item.qrrw || 0}</td>
                  <td>{item.yqqr || 0}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    );
  };

  render() {
    const { loading } = this.state;
    const renderObj = {
      type1: this.renderTask(),
      type2: this.renderPenPerson(),
      type3: this.renderPerformanPerson()
    };

    const type = this.props.url.query.type;
    return (
      <div>
        <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
        {loading ? <Loading show={loading} /> : type && renderObj[type]}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    pieData: state.statistics.pieData,
    penProject: state.statistics.penProject,
    penPerson: state.statistics.penPerson,
    taskNumsProject: state.statistics.taskNumsProject,
    taskNumsPerson: state.statistics.taskNumsPerson
  };
}
const mapDispatchToProps = dispatch => {
  return {
    getPieChartData: bindActionCreators(
      statisticsAction.getTaskDistributedByState,
      dispatch
    ),
    getPendStatisticsData: bindActionCreators(
      statisticsAction.getPendStatistics,
      dispatch
    ),
    getPendByProjectData: bindActionCreators(
      statisticsAction.getPendByProject,
      dispatch
    ),
    getNumByProjectData: bindActionCreators(
      statisticsAction.getNumByProject,
      dispatch
    ),
    getNumByPersonData: bindActionCreators(
      statisticsAction.getNumByPerson,
      dispatch
    )
  };
};
export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(
  MoTable
);
