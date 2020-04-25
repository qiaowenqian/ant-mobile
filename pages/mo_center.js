import React, { Component, PureComponent } from "react";
import withRedux from "next-redux-wrapper";
import Router from "next/router";
import { Icon } from "antd-mobile";
import { bindActionCreators } from "redux";
import Pie from "../components/common/Echarts/Pie";
import { initStore } from "../store";
import stylesheet from "styles/pages/statistics.scss";
import Layout from "../components/Layout";
import * as statisticsAction from "../actions/statistics";
import Loading from "../components/Loading";
import MenuBar from "../components/MenuBar";
class Statistics extends PureComponent {
	static getInitialProps({ req, store, isServer }) {
		const language = req
			? req.headers["accept-language"]
			: navigator.language;
		return {
			language
		};
	}

	constructor(props) {
		super(props);
		this.state = {
			loading: true
		};
	}

	componentWillMount() {
		this.props.getPieChartData({}, () => {
			this.setState({ loading: false });
		});
		this.props.getPendStatisticsData();
		this.props.getPendByProjectData();
		this.props.getNumByProjectData();
		this.props.getNumByPersonData();
	}
	componentDidMount() {
		if (!this.props.urlData) {
			this.props.setUrlData(
				encodeURIComponent(location.href.split("#")[0])
			);
		}
	}
	renderPendingBarChat = (data, typeName = "name") => {
		const total = data[0].daizp + data[0].jinxz + data[0].daiqr;

		const barChatData = data.map(item => {
			return {
				title: item[typeName],
				unassigned: item.daizp,
				assignPercent: (item.daizp / total) * 100 + "%",
				going: item.jinxz,
				goingPercent: (item.jinxz / total) * 100 + "%",
				confirmed: item.daiqr,
				confirmedPercent:
					(item.daiqr / total) * 100 + "%"
			};
		});

		return (
			<div className="barChat">
				{barChatData.map((item, index) => {
					return (
						<div
							className="item clearfloat"
							key={index}
						>
							<div className="bar-title">
								{item.title}
							</div>
							<div
								className="unassigned"
								style={{
									width:
										item.assignPercent
								}}
							/>
							<div
								className="going"
								style={{
									width:
										item.goingPercent
								}}
							/>
							<div
								className="confirmed"
								style={{
									width:
										item.confirmedPercent
								}}
							/>
						</div>
					);
				})}
			</div>
		);
	};

	renderPerformBarChat = (data, typeName = "name") => {
		const total =
			data[0].cjrw +
			data[0].zprw +
			data[0].qrrw +
			data[0].wcrw;
		const barChatData = data.map(item => {
			return {
				title: item[typeName],
				cjrw: item.daizp,
				cjrwPercent: (item.cjrw / total) * 100 + "%",
				zprw: item.jinxz,
				zprwPercent: (item.zprw / total) * 100 + "%",
				qrrw: item.daiqr,
				qrrwPercent: (item.qrrw / total) * 100 + "%",
				wcrw: item.wcrw,
				wcrwPercent: (item.wcrw / total) * 100 + "%"
			};
		});

		return (
			<div className="barChat">
				{barChatData.map((item, index) => {
					return (
						<div
							className="item clearfloat"
							key={index}
						>
							<div className="bar-title">
								{item.title}
							</div>
							<div
								className="cj"
								style={{
									width:
										item.cjrwPercent
								}}
							/>
							<div
								className="unassigned"
								style={{
									width:
										item.zprwPercent
								}}
							/>
							<div
								className="confirmed"
								style={{
									width:
										item.qrrwPercent
								}}
							/>
							<div
								className="wcrw"
								style={{
									width:
										item.wcrwPercent
								}}
							/>
						</div>
					);
				})}
			</div>
		);
	};

	render() {
		const {
			language,
			pieData,
			penProject,
			penPerson,
			taskNumsProject,
			taskNumsPerson
		} = this.props;
		const { loading } = this.state;
		const legendData = [
			{
				name: "已完成",
				value: pieData.yiwc,
				itemStyle: {
					color: "#cfdfe6"
				}
			},
			{
				name: "进行中",
				value: pieData.jinxz,
				itemStyle: {
					color: "#b1deb3"
				}
			},
			{
				name: "待确认",
				value: pieData.daiqr,
				itemStyle: {
					color: "#b3e1f7"
				}
			},
			{
				name: "未指派",
				value: pieData.daizp,
				itemStyle: {
					color: "#b2a4f4"
				}
			},
			{
				name: "已终止",
				value: pieData.yizz,
				itemStyle: {
					color: "#dbdcdc"
				}
			}
		];
		return (
			<Layout language={language}>
				{loading ? (
					<Loading show={loading} />
				) : (
					<div className="pubLayout">
						<div className="statistics">
							<style
								dangerouslySetInnerHTML={{
									__html: stylesheet
								}}
							/>
							<div className="box">
								<div className="title">
									任务分布
								</div>
								<div id="taskChart">
									<Pie
										data={
											legendData
										}
									/>
									<div className="legend">
										{legendData.map(
											(
												item,
												index
											) => {
												return (
													<div
														className="item"
														key={
															index
														}
													>
														<span
															className="circle"
															style={{
																background:
																	item
																		.itemStyle
																		.color
															}}
														/>
														<span className="word">
															{
																item.name
															}
														</span>
														<span className="count">
															{
																item.value
															}
														</span>
													</div>
												);
											}
										)}
									</div>
								</div>
							</div>
							<div className="box">
								<div className="title">
									待办统计（按项目）
									<a>
										完整统计{" "}
										<Icon
											type="anticon-more"
											style={{
												color:
													"#08c"
											}}
										/>
									</a>
								</div>
								{penProject.taskPendList &&
									this.renderPendingBarChat(
										penProject.taskPendList,
										"proName"
									)}
							</div>
							<div className="box">
								<div className="title">
									待办统计（按人员）
									<a>
										完整统计
										<Icon
											type="anticon-more"
											style={{
												color:
													"rgba(66, 66, 66, 1)"
											}}
										/>
									</a>
								</div>
								{penPerson.taskPendList &&
									this.renderPendingBarChat(
										penPerson.taskPendList
									)}
							</div>
							<div className="box">
								<div className="title">
									绩效统计（按项目）
									<a>
										完整统计
										<Icon
											type="anticon-more"
											style={{
												color:
													"rgba(66, 66, 66, 1)"
											}}
										/>
									</a>
								</div>
								{taskNumsProject.taskNumList &&
									this.renderPerformBarChat(
										taskNumsProject.taskNumList,
										"projectName"
									)}
							</div>

							<div className="box">
								<div className="title">
									绩效统计（按人员）
									<a>
										完整统计
										<Icon
											type="anticon-more"
											style={{
												color:
													"rgba(66, 66, 66, 1)"
											}}
										/>
									</a>
								</div>
								{taskNumsPerson.taskNumList &&
									this.renderPerformBarChat(
										taskNumsPerson.taskNumList
									)}
							</div>
							<div className="menuBox">
								<MenuBar pathName="/mo_task" />
							</div>
						</div>
					</div>
				)}
			</Layout>
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
	Statistics
);
