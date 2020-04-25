import React, { Component, PureComponent } from "react";
import stylesheet from "styles/pages/statistics.scss";
import stylesheet1 from "styles/pages/showdata.scss";
import withRedux from "next-redux-wrapper";
import { bindActionCreators } from "redux";
import * as statisticsAction from "../actions/statistics";
import { initStore } from "../store";
import Loading from "../components/Loading";
import _ from "lodash";
import Dingtalk from "../utils/dingtalk";
class MoTable extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			taskDistrData: null,
			personPenData: null,
			performPersonData: null,
			performProjectData: null,
			selected: "task"
		};
	}

	componentWillMount() { }

	componentDidMount() {
		const {
			getAllTaskDistributedByState,
			getAllPendStatistics,
			getAllNumByPerson,
			getAllNumByProject
		} = statisticsAction;
		Dingtalk.setTitle("统计");
		Dingtalk.setMenuHome();
		const projectIds = JSON.parse(
			sessionStorage.getItem("projectIds")
		);
		const {
			type,
			selected,
			attdate01,
			attdate02,
			monthSelectd
		} = this.props.url.query;
		// if (!this.props.urlData) {
		// 	this.props.setUrlData(
		// 		encodeURIComponent(location.href.split("#")[0])
		// 	);
		// }
		if (projectIds) {
			if (type == "type1") {
				getAllTaskDistributedByState(
					{ projectIds, isMobile: 1 },
					data => {
						this.setState(
							{
								taskDistrData: data,
								loading: false
							},
							() => {
								this.initTablePosition();
							}
						);
					}
				);
			} else if (type == "type2") {
				getAllPendStatistics(
					{ projectIds, isMobile: 1 },
					data => {
						this.setState(
							{
								personPenData: data,
								loading: false
							},
							() => {
								this.initTablePosition();
							}
						);
					}
				);
			} else {
				const mtype =
					monthSelectd != "time"
						? monthSelectd == "nowMonth"
							? 0
							: 1
						: "";
				const param = {
					type: mtype,
					attdate01,
					attdate02,
					projectIds,
					isMobile: 1
				};
				if (selected == "task") {
					getAllNumByPerson(param, data => {
						this.setState(
							{
								performPersonData: data,
								loading: false,
								selected
							},
							() => {
								this.initTablePosition();
							}
						);
					});
				} else {
					getAllNumByProject(param, data => {
						this.setState(
							{
								performProjectData: data,
								loading: false,
								selected
							},
							() => {
								this.initTablePosition();
							}
						);
					});
				}
			}
		}
	}

	initTablePosition = () => {
		const mql = window.matchMedia("(orientation: portrait)");
		const width = document.documentElement.clientWidth;
		const height = document.documentElement.clientHeight;
		const tableEle = this.refs.table;
		if (mql.matches) {
			tableEle.style.width = height + "px";
			tableEle.style.height = width + "px";
			tableEle.style.transform = "rotate(90deg)";
			tableEle.style.transformOrigin = "0% 0%";
			tableEle.style.top = 0 + "px";
			tableEle.style.left = width + "px";
		}
		let tbody = document.getElementById("tbody");
		tbody.style.height = width - 90 + "px";
	};

	renderTask = () => {
		const { taskDistrData } = this.state;
		const item = taskDistrData && taskDistrData.data;
		const tablEle = item && (
			<table className="tb1">
				<tbody>
					<tr>
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
						<td>
							{item.daizp +
								item.jinxz +
								item.daiqr +
								item.yiwc +
								item.yizz}
						</td>
					</tr>
				</tbody>
			</table>
		);

		return (
			<div className="table-wrap">
				<div className="thead">
					<table className="tb1">
						<thead>
							<tr>
								<td colSpan="11">
									{" "}
									任务分布表（按状态）
								</td>
							</tr>
							<tr>
								<td colSpan="2">
									待指派
								</td>
								<td colSpan="2">
									待完成
								</td>
								<td colSpan="2">
									待确认
								</td>
								<td colSpan="3">
									已完成
								</td>
								<td rowSpan="2">
									已终止
								</td>
								<td rowSpan="2">
									合计
								</td>
							</tr>
							<tr>
								<td>任务数</td>
								<td>逾期</td>
								<td>任务数</td>
								<td>逾期</td>
								<td>任务数</td>
								<td>逾期</td>
								<td>
									完成总数
								</td>
								<td>
									提前完成
								</td>
								<td>
									逾期完成
								</td>
							</tr>
						</thead>
					</table>
				</div>
				<div className="tbody" id="tbody">
					{tablEle}
				</div>
			</div>
		);
	};

	renderPenPerson = () => {
		const { personPenData } = this.state;
		const tablEle = (
			<table className="table">
				<tbody>
					{personPenData &&
						personPenData.taskPendList &&
						personPenData.taskPendList
							.length > 0 &&
						personPenData.taskPendList.map(
							(item, index) => {
								return (
									<tr
										key={
											index
										}
									>
										<td>
											{item.name ||
												""}
										</td>
										<td>
											{
												item.daizp
											}
										</td>
										<td>
											{
												item.dzpyq
											}
										</td>
										<td>
											{
												item.jinxz
											}
										</td>
										<td>
											{
												item.jxzyq
											}
										</td>
										<td>
											{item.daiqr ||
												0}
										</td>
										<td>
											{item.dqryq ||
												0}
										</td>
										<td>
											{item.total ||
												0}
										</td>
										<td>
											{item.dzpyq +
												item.jxzyq +
												item.dqryq ||
												0}
										</td>
									</tr>
								);
							}
						)}
				</tbody>
			</table>
		);

		return (
			<div className="table-wrap">
				<div className="thead">
					<table>
						<thead>
							<tr>
								<td colSpan="11">
									人员待办统计表
								</td>
							</tr>
							<tr>
								<td rowSpan="3">
									姓名
								</td>
								<td colSpan="2">
									待指派
								</td>
								<td colSpan="2">
									待完成
								</td>
								<td colSpan="2">
									待确认
								</td>
								<td colSpan="2">
									合计
								</td>
							</tr>
							<tr>
								<td>任务数</td>
								<td>逾期</td>
								<td>任务数</td>
								<td>逾期</td>
								<td>任务数</td>
								<td>逾期</td>
								<td>
									待办总数
								</td>
								<td>逾期</td>
							</tr>
						</thead>
					</table>
				</div>
				<div className="tbody" id="tbody">
					{tablEle}
				</div>
			</div>
		);
	};

	renderPerformanValuePerson = () => {
		const { performPersonData } = this.state;
		const { attdate01, attdate02 } = this.props.url.query;
		const tablEle = (
			<table className="table">
				<tbody>
					{performPersonData &&
						performPersonData.tasContentList &&
						performPersonData.tasContentList
							.length > 0 &&
						performPersonData.tasContentList.map(
							(item, index) => {
								return (
									<tr
										key={
											index
										}
									>
										<td>
											{
												item.name
											}
										</td>
										<td>
											{Math.floor(
												item.cjrwjx *
												100
											) /
												100}
										</td>
										<td>
											{Math.floor(
												item.zprwjx *
												100
											) /
												100}
										</td>
										<td>
											{Math.floor(
												item.wcrwjx *
												100
											) /
												100}
										</td>
										<td>
											{Math.floor(
												item.qrrwjx *
												100
											) /
												100}
										</td>

										<td>
											{item.yqzpkc
												? -(
													Math.floor(
														item.yqzpkc *
														100
													) /
													100
												)
												: "-0.0"}
										</td>
										<td>
											{item.yqwckc
												? -(
													Math.floor(
														item.yqwckc *
														100
													) /
													100
												)
												: "-0.0"}
										</td>
										<td>
											{item.yqqrkc
												? -(
													Math.floor(
														item.yqqrkc *
														100
													) /
													100
												)
												: "-0.0"}
										</td>
										<td>
											{item.tqwc
												? +(
													Math.floor(
														item.tqwc *
														100
													) /
													100
												)
												: "+0.0"}
										</td>
										<td>
											{Math.floor(
												item.total *
												100
											) /
												100}
										</td>
									</tr>
								);
							}
						)}
				</tbody>
			</table>
		);

		return (
			<div className="table-wrap">
				<div className="thead">
					<table>
						<thead>
							<tr>
								<td colSpan="11">
									人员绩效统计表（绩效值
									{/* {attdate01 && attdate02 ? `${attdate01} ~ ${attdate02}` : ""} */}
									）
								</td>
							</tr>
							<tr>
								<td rowSpan="2">
									姓名
								</td>
								<td rowSpan="2">
									创建任务
								</td>
								<td rowSpan="2">
									指派任务
								</td>
								<td rowSpan="2">
									完成任务
								</td>
								<td rowSpan="2">
									确认任务
								</td>
								<td colSpan="3">
									逾期扣除
								</td>
								<td rowSpan="2">
									提前完成奖励
								</td>
								<td rowSpan="2">
									实得绩效统计
								</td>
							</tr>
							<tr>
								<td>
									逾期指派扣除
								</td>
								<td>
									逾期完成扣除
								</td>
								<td>
									逾期确认扣除
								</td>
							</tr>
						</thead>
					</table>
				</div>
				<div className="tbody" id="tbody">
					{tablEle}
				</div>
			</div>
		);
	};

	renderPerformanPerson = () => {
		const { performProjectData } = this.state;
		const { attdate01, attdate02 } = this.props.url.query;
		const tablEle = (
			<table className="table">
				<tbody>
					{performProjectData &&
						performProjectData.taskNumList &&
						performProjectData.taskNumList
							.length > 0 &&
						performProjectData.taskNumList.map(
							(item, index) => {
								return (
									<tr
										key={
											index
										}
									>
										<td>
											{
												item.name
											}
										</td>
										<td>
											{
												item.cjrw
											}
										</td>

										<td>
											{
												item.zprw
											}
										</td>
										<td>
											{
												item.yqzp
											}
										</td>

										<td>
											{item.wcrw ||
												0}
										</td>
										<td>
											{item.tqwc ||
												0}
										</td>
										<td>
											{item.yqwc ||
												0}
										</td>

										<td>
											{item.qrrw ||
												0}
										</td>
										<td>
											{item.yqqr ||
												0}
										</td>
									</tr>
								);
							}
						)}
				</tbody>
			</table>
		);

		return (
			<div className="table-wrap">
				<div className="thead">
					<table>
						<thead>
							<tr>
								<td colSpan="11">
									人员绩效统计表（任务数）
								</td>
							</tr>
							<tr>
								<td rowSpan="2">
									姓名
								</td>
								<td rowSpan="2">
									创建任务
								</td>
								<td colSpan="2">
									指派任务
								</td>
								<td colSpan="3">
									完成任务
								</td>
								<td colSpan="2">
									确认任务
								</td>
							</tr>
							<tr>
								<td>
									指派总数
								</td>
								<td>
									指派预期
								</td>
								<td>
									完成总数
								</td>
								<td>
									提前完成
								</td>
								<td>
									逾期完成
								</td>
								<td>
									确认总数
								</td>
								<td>
									逾期确认
								</td>
							</tr>
						</thead>
					</table>
				</div>
				<div className="tbody" id="tbody">
					{tablEle}
				</div>
			</div>
		);
	};

	render() {
		const { loading, selected } = this.state;
		const renderObj = {
			type1: this.renderTask(),
			type2: this.renderPenPerson(),
			type3:
				selected == "task"
					? this.renderPerformanValuePerson()
					: this.renderPerformanPerson()
		};

		const type = this.props.url.query.type;
		return (
			<div>
				<style
					dangerouslySetInnerHTML={{
						__html: stylesheet
					}}
				/>
				<style
					dangerouslySetInnerHTML={{
						__html: stylesheet1
					}}
				/>

				{loading ? (
					<Loading show={loading} />
				) : (
						<div className="wrap" ref="table">
							{type && renderObj[type]}
						</div>
					)}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {};
}
const mapDispatchToProps = dispatch => {
	return {};
};
export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(
	MoTable
);
