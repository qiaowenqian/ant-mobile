import React, { Component } from "react";
import { List, Toast } from "antd-mobile";
import { bindActionCreators } from "redux";
import withRedux from "next-redux-wrapper";
import { Icon } from "antd-mobile";
import mobileStyle from "antd-mobile/dist/antd-mobile.min.css";
import Router from "next/router";

import { initStore } from "../store";
import * as taskAction from "../actions/task";
import stylesheet from "styles/pages/proTask.scss";
import Dingtalk from "../utils/dingtalk";
import Layout from "../components/Layout";
import MenuBar from "../components/MenuBar";
import ProTaskBar from "../components/ProTaskBar";
import Loading from "../components/Loading";
import Friendly from "../components/Friendly";
import SetUp from "../components/SetUp";
import ProjectChart from "../components/ProjectChart";
import utils from "../utils/utils";

class proTask extends Component {
	static getInitialProps({ req }) {
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
			objProTask: [],
			parentBreadList: [],
			taskProListLoading: false,
			proTaskLoadType: false,
			taskProListMoreLoading: false,
			parent: {},
			nowPage: 1,
			pageCount: 1,
			//prevTaskId:'', //父任务id
			loaded: false,
			actBar: "任务",

			fileList: [],
			parentList: [],
			pageSize: 20,
			pageNo: 1,
			fileLoading: false,
			fileMoreLoading: false,
			isNull: false,
			treeDataList: [],
			total: 0,
			pid: 0,
			checkAll: false,
			checkId: [],
			lookCheck: [],
			projectName: "",

			countData: [],
			countLoading: false, //项目统计
			tableLoading: false, //任务列表统计
			projectId: "",
			taskTable: [],
			tableParams: {
				projectId: ""
			},
			allCount: 0,
			now: 0,
			finish: 0,
			cadence: 0,
			newAdd: 0,
			exportTeamStatistics: ""
		};
	}

	componentWillMount() {
		this.getproTaskList(1, this.props.url.query.pid);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.url.query.pid !== this.state.prevTaskId) {
			this.setState({ prevTaskId: nextProps.url.query.pid });
			this.getproTaskList(1, nextProps.url.query.pid);
		}
		if (
			(this.state.taskProListLoading ||
				this.state.taskProListMoreLoading) &&
			nextProps.taskProjectList
		) {
			if (nextProps.taskProjectList.success) {
				// 总页数, 总条数, 当前页数 更新
				let pro =
					nextProps.taskProjectList.data.count
						.project;
				this.setState({
					proName: pro.proname,
					pageCount:
						nextProps.taskProjectList.data
							.taskPage.last,
					Listcount:
						nextProps.taskProjectList.data
							.taskPage.count,
					nowPage:
						nextProps.taskProjectList.data
							.taskPage.pageNo
				});

				// 根据返回的页数判断是 直接替换数据 还是追加数据
				if (
					nextProps.taskProjectList.data.taskPage
						.pageNo == 1
				) {
					if (
						nextProps.taskProjectList.data
							.taskPage.list
					) {
						this.setState({
							objProTask:
								nextProps
									.taskProjectList
									.data
									.taskPage
									.list
						});
						this.refs.taskListBox.scrollTop = 0;
					} else {
						this.setState({
							objProTask: []
						});
					}
				} else {
					let data =
						nextProps.taskProjectList.data
							.taskPage.list;
					let { objProTask } = this.state;
					data.map((item, i) => {
						objProTask.push(item);
					});
					this.setState({
						objProTask: objProTask
					});
				}
			} else {
				if (this.state.nowPage == 1) {
					this.setState({ objProTask: [] });
				} else {
					Toast.fail("网络好像不给力哦", 1);
				}
			}
			this.setState({
				taskProListLoading: false,
				taskProListMoreLoading: false,
				loaded: true,
				parentBreadList:
					nextProps.taskProjectList.data
						.parentList
			});
			//加载文件列表
		} else if (
			nextProps.fileList &&
			(this.state.fileLoading || this.state.fileMoreLoading)
		) {
			if (nextProps.fileList.success) {
				// 总页数, 总条数, 当前页数 更新
				let dataTree = nextProps.fileList.data.treeData;
				let fileList = nextProps.fileList.data.fileList;
				let isNull = true;
				this.setState({
					pageCount:
						nextProps.fileList.data.treeData
							.last,
					Listcount:
						nextProps.fileList.data.treeData
							.count,
					nowPage:
						nextProps.fileList.data.treeData
							.pageNo
				});
				if (
					dataTree &&
					dataTree.count == 0 &&
					fileList.length == 0
				) {
					isNull = false;
				}
				if (nextProps.fileList.data.count) {
					this.props.projectCount(
						nextProps.fileList.data.count
					);
				}
				// 根据返回的页数判断是 直接替换数据 还是追加数据
				if (
					nextProps.fileList.data.treeData
						.pageNo == 1
				) {
					if (
						nextProps.fileList.data.treeData
							.list
					) {
						this.setState({
							treeDataList:
								nextProps
									.fileList
									.data
									.treeData
									.list
						});
					} else {
						this.setState({
							treeDataList: []
						});
					}
				} else {
					let data =
						nextProps.fileList.data.treeData
							.list;
					let { treeDataList } = this.state;
					data.map((item, i) => {
						treeDataList.push(item);
					});
					this.setState({
						treeDataList: treeDataList
					});
				}
				this.setState({
					total:
						nextProps.fileList.data.treeData
							.count,
					isNull: isNull,
					fileList: fileList,
					parentList:
						nextProps.fileList.data
							.parentList,
					projectName:
						nextProps.fileList.data.count
				});
			} else {
				if (this.state.nowPage == 1) {
					this.setState({ treeDataList: [] });
				} else {
					Toast.fail("网络好像不给力哦", 1);
				}
			}
			this.setState({
				fileLoading: false,
				fileMoreLoading: false,
				loaded: true
			});
			//项目统计
		} else if (nextProps.countProject && this.state.countLoading) {
			if (nextProps.countProject.success) {
				const taskNum =
					nextProps.countProject.data.data;
				this.setState({
					allCount: taskNum.all,
					now: taskNum.jinxz,
					finish: taskNum.yiwc,
					cadence: taskNum.yizz,
					newAdd: taskNum.jirxz
				});
				if (nextProps.countProject.data.count) {
					this.props.projectCount(
						nextProps.countProject.data
							.count
					);
				}
				this.setState({
					countData: taskNum,
					countLoading: false,
					loaded: true,
					tableLoading: true
				});
			} else {
				if (nextProps.countProject.errmsg) {
					Toast.fail(
						nextProps.countProject.errmsg
					);
				} else {
					Toast.fail("获取数据失败");
				}
			}
		} else if (this.state.tableLoading && nextProps.countTaskList) {
			if (nextProps.countTaskList.success) {
				let data = nextProps.countTaskList.data;
				let { taskTable } = this.state;
				if (
					data.tasktableData &&
					data.tasktableData.length > 0
				) {
					data.tasktableData.map((tim, i) => {
						tim.key = i;
						taskTable.push(tim);
					});
				}
				this.setState({
					taskTable: data.tasktableData,
					tableLoading: false
				});
				if (nextProps.refresh) {
					this.props.refreshTime(false);
				}
			} else {
				if (nextProps.countTaskList.errmsg) {
					Toast.fail(
						nextProps.countTaskList.errmsg
					);
				} else {
					Toast.fail("获取数据失败");
				}
			}
		} else if (nextProps.refresh) {
			const { tableParams } = this.state;
			this.props.getTasktableData(tableParams, () => {
				this.setState({ tableLoading: true });
			});
		}
	}

	componentDidMount() {
		Dingtalk.setTitle("项目详情");
		Dingtalk.setMenuHome();
		utils.butAnimate();
		if (!this.props.urlData) {
			this.props.setUrlData(
				encodeURIComponent(location.href.split("#")[0])
			);
		}
	}

	componentWillUnmount() {
		Dingtalk.closePage();
	}
	componentDidUpdate() {
		utils.butAnimate();
	}

	//获取任务列表
	getproTaskList(getPageNo, pid) {
		// 根据页数判断 应该显示哪个加载进度效果
		if (getPageNo == 1) {
			this.props.getTaskListByPro(
				this.props.url.query.proId,
				pid ? pid : "",
				1,
				20,
				() => {
					this.setState({
						taskProListLoading: true
					});
				}
			);
		} else {
			this.setState({ taskProListMoreLoading: true });
			this.props.getTaskListByPro(
				this.props.url.query.proId,
				pid ? pid : "",
				getPageNo,
				20,
				() => {}
			);
		}
	}
	//获取任务文件列表
	getFileList(getPageNo, pid) {
		// 根据页数判断 应该显示哪个加载进度效果
		if (getPageNo == 1) {
			this.props.getTaskFileByPro(
				this.props.url.query.proId,
				pid ? pid : "0",
				20,
				1,
				() => {
					this.setState({ fileLoading: true });
				}
			);
		} else {
			this.setState({ fileMoreLoading: true });
			this.props.getTaskFileByPro(
				this.props.url.query.proId,
				pid ? pid : "0",
				20,
				getPageNo,
				() => {}
			);
		}
	}
	//上拉加载
	listScroll(e) {
		let scrollTop = Math.ceil(Math.round(e.target.scrollTop));
		let clientHeight = Math.ceil(Math.round(e.target.clientHeight));
		let scrollHeight = Math.ceil(Math.round(e.target.scrollHeight));
		let { nowPage, pageCount } = this.state;
		if (
			nowPage < pageCount &&
			(scrollTop + clientHeight == scrollHeight ||
				scrollTop + clientHeight == scrollHeight - 1 ||
				scrollTop + clientHeight == scrollHeight + 1)
		) {
			if (this.props.url.query.pid) {
				this.getproTaskList(
					nowPage + 1,
					this.props.url.query.pid
				);
			} else {
				this.getproTaskList(nowPage + 1, "");
			}
		}
	}

	//文件上拉加载
	listFileScroll(e) {
		let scrollTop = Math.ceil(Math.round(e.target.scrollTop));
		let clientHeight = Math.ceil(Math.round(e.target.clientHeight));
		let scrollHeight = Math.ceil(Math.round(e.target.scrollHeight));
		let { nowPage, pageCount } = this.state;
		if (
			nowPage < pageCount &&
			(scrollTop + clientHeight == scrollHeight ||
				scrollTop + clientHeight == scrollHeight - 1 ||
				scrollTop + clientHeight == scrollHeight + 1)
		) {
			this.getFileList(nowPage + 1, this.state.prevTaskId);
		}
	}

	onLoadData = treeNode => {
		if (this.props.url.query.proId) {
			this.props.getTaskFileByPro(
				this.props.url.query.proId,
				treeNode,
				this.state.pageSize,
				1,
				() => {
					this.setState({
						projectId: this.props.url.query
							.proId,
						fileLoading: true,
						pid: treeNode,
						checkAll: false
					});
				}
			);
		}
	};
	onTaskData = treeNode => {
		if (this.props.url.query.proId) {
			Router.push(
				Dingtalk.setDdNavColor(
					"/mo_proTask?proId=" +
						this.props.url.query.proId +
						"&pid=" +
						treeNode
				)
			);
		}
	};
	// 截取文件扩展名
	getCaption(obj) {
		var index = obj.lastIndexOf(".");
		obj = obj.substring(index + 1, obj.length);
		return obj;
	}
	//任务列表渲染
	taskListRender() {
		const {
			objProTask,
			proName,
			proTaskLoading,
			taskProListMoreLoading,
			nowPage,
			pageCount,
			taskId,
			labelStrs,
			loaded,
			actBar,
			parent,
			parentBreadList
		} = this.state;
		let data = {
			ButTxt: "创建任务",
			ButUrl:
				"/mo_taskCreate?isChild=false&newTask=true&selectedProId=" +
				this.props.url.query.proId +
				"&selectedProName=" +
				proName,
			Icon: "",
			alertTxt: "没有任务哦，赶快去创建一个吧"
		};
		if (objProTask && objProTask.length == 0 && loaded) {
			return (
				<div className="content proTask">
					<div className="taskListBox">
						<Friendly data={data} />
					</div>
				</div>
			);
		} else {
			return (
				<div className="content proTask">
					<Loading show={proTaskLoading} />
					{/* <h3>
						{proName}
						<Icon type="right"/>
					</h3> */}
					<div className="bread">
						{parentBreadList.length > 0 ? (
							parentBreadList.map(
								(item, i) => {
									if (
										i ==
										0
									) {
										return (
											<div
												key={
													item.id
												}
												className="bo"
											>
												<span
													className="textMore"
													onClick={() => {
														this.onTaskData(
															item.id
														);
													}}
												>
													{
														item.taskname
													}
												</span>
												<Icon type="right" />
											</div>
										);
									} else if (
										i ==
										parentBreadList.length -
											1
									) {
										return (
											<span
												className="textMore"
												key={
													item.id
												}
												style={{
													color:
														"#333"
												}}
												onClick={() => {
													this.onTaskData(
														item.id
													);
												}}
											>
												{
													item.taskname
												}
											</span>
										);
									} else {
										return (
											<div
												key={
													item.id
												}
												className="bo"
											>
												<span
													className="textMore"
													onClick={() => {
														this.onTaskData(
															item.id
														);
													}}
												>
													{
														item.taskname
													}
												</span>
												<Icon type="right" />
											</div>
										);
									}
								}
							)
						) : (
							<div className="bo">
								<span className="textMore">
									{
										proName
									}
								</span>
								<Icon type="right" />
							</div>
						)}
					</div>
					<div
						className="taskListBox"
						onScroll={e =>
							this.listScroll(e)
						}
						ref="taskListBox"
					>
						{objProTask &&
						objProTask.length > 0
							? objProTask.map(
									(
										item,
										i
									) => {
										let taskinfo =
											item.taskinfo;
										let labelGroups =
											item.labelGroups;
										let labelsbox;
										let labelStrs;
										if (
											labelGroups &&
											labelGroups.length >
												0
										) {
											labelStrs = eval(
												labelGroups
											);
											labelsbox = labelStrs.map(
												(
													lab,
													i
												) => {
													if (
														i <=
														2
													) {
														return (
															<p
																className="tag textMore"
																style={{
																	color:
																		"#" +
																		lab.color
																}}
																key={
																	"tag" +
																	lab.id +
																	i
																}
															>
																{
																	lab.labelname
																}
															</p>
														);
													}
												}
											);
										}
										return (
											<div
												className="taskList pubDiv white aniBut"
												key={
													item.id
												}
											>
												<div className="stateStyle">
													{utils.stateColor(
														item
															.taskinfo
															.stateName
													)}
												</div>
												<div
													className="taskCon"
													onClick={() => {
														Router.push(
															Dingtalk.setDdNavColor(
																"/mo_taskDetails?id=" +
																	item
																		.taskinfo
																		.id
															)
														);
													}}
												>
													<div className="top">
														<span>
															{item
																.taskinfo
																.taskinfoNumber &&
															item
																.taskinfo
																.taskinfoNumber
																.numberS
																? item
																		.taskinfo
																		.taskinfoNumber
																		.numberS +
																  "."
																: ""}
															{
																item
																	.taskinfo
																	.rank
															}
														</span>
														<p className="textMore">
															{
																item
																	.taskinfo
																	.taskname
															}
														</p>
													</div>
													<div className="middle">
														<p className="person">
															<Icon type="anticon-ren2" />
															{taskinfo.userResponse &&
															taskinfo
																.userResponse
																.name
																? taskinfo
																		.userResponse
																		.name
																: "未指派"}
														</p>
														{taskinfo.planEndTime ||
														taskinfo.realityEndTime ? (
															<p className="time">
																<Icon type="anticon-shijian" />
																{utils.dateColor(
																	taskinfo.planEndTime,
																	taskinfo.state,
																	taskinfo.realityEndTime
																)}
															</p>
														) : (
															""
														)}
														<p className="child">
															<Icon type="anticon-lvzhou_fenzhichangsuo" />
															<span>
																{
																	taskinfo.childSuccess
																}
															</span>

															/
															<i>
																{
																	taskinfo.childCount
																}
															</i>
														</p>
														<p className="info">
															<Icon type="anticon-discuss" />
															{
																taskinfo.leaveCount
															}
														</p>
													</div>
													{labelStrs.length >
													0 ? (
														<div
															className="bottom"
															style={{
																margin:
																	"10px 0 0 0",
																height:
																	"20px"
															}}
														>
															{
																labelsbox
															}
														</div>
													) : (
														""
													)}
												</div>
												{taskinfo.childCount >
												0 ? (
													<div className="taskChild">
														{taskinfo.childCount >
														0 ? (
															<Icon
																type="anticon-lvzhou_fenzhichangsuo"
																className="aniButGray"
																onClick={() => {
																	Router.push(
																		Dingtalk.setDdNavColor(
																			"/mo_proTask?proId=" +
																				item
																					.project
																					.id +
																				"&pid=" +
																				taskinfo.id
																		)
																	);
																}}
															/>
														) : (
															""
														)}
													</div>
												) : (
													""
												)}
											</div>
										);
									}
							  )
							: ""}
						{loaded ? (
							<div className="p">
								<Loading
									show={
										taskProListMoreLoading
									}
									classStr="loading_minSize"
								/>
								{nowPage ==
								pageCount
									? "已经到底喽"
									: "下拉加载更多哦"}
							</div>
						) : (
							""
						)}
					</div>
				</div>
			);
		}
	}
	//文件列表渲染
	fileListRender() {
		const {
			isNull,
			fileList,
			treeDataList,
			nowPage,
			pageCount,
			fileLoading,
			fileMoreLoading,
			loaded,
			parentList,
			projectName
		} = this.state;
		if (
			treeDataList &&
			treeDataList.length == 0 &&
			fileList &&
			fileList.length == 0 &&
			loaded
		) {
			return (
				<div className="content fileContent">
					<Friendly data="" />
				</div>
			);
		} else {
			return (
				<div
					className="content fileContent"
					onScroll={e => this.listFileScroll(e)}
				>
					<Loading show={fileLoading} />
					<div className="bread">
						{parentList &&
						parentList.length > 0 ? (
							parentList.map(
								(item, i) => {
									if (
										i ==
										0
									) {
										return (
											<div
												key={
													item.id
												}
												className="bo"
											>
												<span
													className="textMore"
													onClick={() => {
														this.onLoadData(
															item.id
														);
													}}
												>
													{
														item.taskname
													}
												</span>
												<Icon type="right" />
											</div>
										);
									} else if (
										i ==
										parentList.length -
											1
									) {
										return (
											<span
												className="textMore"
												key={
													item.id
												}
												style={{
													color:
														"#333"
												}}
												onClick={() => {
													this.onLoadData(
														item.id
													);
												}}
											>
												{
													item.taskname
												}
											</span>
										);
									} else {
										return (
											<div
												key={
													item.id
												}
												className="bo"
											>
												<span
													className="textMore"
													onClick={() => {
														this.onLoadData(
															item.id
														);
													}}
												>
													{
														item.taskname
													}
												</span>
												<Icon type="right" />
											</div>
										);
									}
								}
							)
						) : (
							<div className="bo">
								<span className="textMore">
									{projectName &&
									projectName.project
										? projectName
												.project
												.proname
										: ""}
								</span>
								<Icon type="right" />
							</div>
						)}
					</div>
					<div className="fileListBox">
						<div className="fileBox">
							{isNull
								? treeDataList &&
								  treeDataList.length >
										0
									? treeDataList.map(
											(
												tim,
												i
											) => {
												return (
													<div
														className="file"
														key={
															tim.id
														}
													>
														<Icon type="anticon-wenjian1" />
														<div>
															{tim.taskinfoNumber
																? tim
																		.taskinfoNumber
																		.numberS +
																  "."
																: null}
															{
																tim.rank
															}
														</div>
														<div
															className="proName textMore"
															onClick={() => {
																this.onLoadData(
																	tim.id
																);
															}}
														>
															{tim
																.taskname
																.length >
															30
																? tim.taskname.slice(
																		0,
																		30
																  )
																: tim.taskname}
														</div>
														{/* <div className="fileNum">共<span>23</span>个文件</div> */}
													</div>
												);
											}
									  )
									: ""
								: ""}
						</div>
						<div className="fileText">
							{fileList &&
							fileList.length > 0
								? fileList.map(
										(
											file,
											i
										) => {
											return (
												<div
													className="paper"
													key={
														file.id
													}
												>
													<div
														className="paperIcon"
														onClick={() => {
															Dingtalk.previewImage(
																file
															);
														}}
													>
														{this.getCaption(
															file.fileName
														)}
													</div>
													<div className="text textMore">
														{
															file.fileName
														}
													</div>
													<Icon
														type="anticon-chakanyanjingshishifenxi"
														onClick={() => {
															Dingtalk.previewImage(
																file
															);
														}}
													/>
												</div>
											);
										}
								  )
								: ""}
						</div>
						{loaded ? (
							<div className="p">
								<Loading
									show={
										fileMoreLoading
									}
									classStr="loading_minSize"
								/>
								{nowPage ==
								pageCount
									? "已经到底喽"
									: "下拉加载更多哦"}
							</div>
						) : (
							""
						)}
					</div>
				</div>
			);
		}
	}
	//统计列表渲染
	countRender() {
		const {
			countLoading,
			tableLoading,
			taskTable,
			countData,
			allCount,
			now,
			finish,
			cadence,
			newAdd
		} = this.state;
		return (
			<div className="content count">
				<Loading show={tableLoading} />
				<div className="countTop pubDiv">
					<div className="allTask">
						<font>{allCount}</font>
						<span>总任务</span>
					</div>
					<div className="nowState">
						<div>
							<font>{now}</font>
							<span
								style={{
									color:
										"#78c06e"
								}}
							>
								进行中
							</span>
						</div>
						<div>
							<font>{finish}</font>
							<span
								style={{
									color:
										"#5c6bc0"
								}}
							>
								已完成
							</span>
						</div>
						<div>
							<font>{cadence}</font>
							<span
								style={{
									color:
										"#fd943e"
								}}
							>
								已终止
							</span>
						</div>
						<div>
							<font>{newAdd}</font>
							<span
								style={{
									color:
										"#f77575"
								}}
							>
								今日新增
							</span>
						</div>
					</div>
				</div>
				<div className="countBottom">
					<div className="countTitle">
						<span>负责人</span>
						<span>任务数</span>
						<span>已完成</span>
						<span>未完成</span>
					</div>
					<div className="countData">
						{taskTable &&
						taskTable.length > 0 ? (
							taskTable.map(
								(item, i) => {
									return (
										<div
											className="dataContent"
											key={
												item.id
											}
										>
											<span>
												{
													item.name
												}
											</span>
											<span>
												{
													item.allCount
												}
											</span>
											<span>
												{
													item.wcCount
												}
											</span>
											<span>
												{
													item.jxCount
												}
											</span>
										</div>
									);
								}
							)
						) : (
							<Friendly data="" />
						)}
					</div>
				</div>
			</div>
		);
	}
	barChange(val) {
		this.setState({ actBar: val });
		if (val === "任务") {
			this.getproTaskList(1, this.props.url.query.pid);
		} else if (val === "文件") {
			this.getFileList(1, "0");
		} else if (val === "统计") {
			if (this.props.url.query.proId) {
				this.props.getProjectCount(
					this.props.url.query.proId,
					() => {
						this.setState({
							countLoading: true,
							projectId: this.props
								.url.query.proId
						});
					}
				);
				let { tableParams } = this.state;
				tableParams.projectId = this.props.url.query.proId;
				this.props.getTasktableData(tableParams, () => {
					this.setState({
						tableLoading: true,
						tableParams: tableParams
					});
				});
			}
		}
	}

	render() {
		const { language } = this.props;
		const { actBar } = this.state;

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
					<div className="topBar">
						<ProTaskBar
							actingCallBack={val =>
								this.barChange(
									val
								)
							}
						/>
					</div>
					{actBar === "任务"
						? this.taskListRender()
						: ""}
					{actBar === "文件"
						? this.fileListRender()
						: ""}
					{actBar === "统计" ? (
						<ProjectChart
							projectId={
								this.props.url
									.query
									.proId
							}
						/>
					) : (
						""
					)}
					{actBar === "设置" ? (
						<SetUp
							id={
								this.props.url
									.query
									.proId
							}
						/>
					) : (
						""
					)}
					<div className="menuBox">
						<MenuBar pathName="/mo_project" />
					</div>
				</div>
			</Layout>
		);
	}
}
function mapStateToProps(state) {
	return {
		taskProjectList: state.task.taskProjectList,
		fileList: state.task.fileList,
		countProject: state.task.countProject,
		countTaskList: state.task.countTaskList,
		refresh: state.task.refresh,
		projectId: state.task.projectId
	};
}
const mapDispatchToProps = dispatch => {
	return {
		getTaskListByPro: bindActionCreators(
			taskAction.getTaskListByPro,
			dispatch
		),
		getTaskFileByPro: bindActionCreators(
			taskAction.getTaskFileByPro,
			dispatch
		),
		getProjectCount: bindActionCreators(
			taskAction.getProjectCount,
			dispatch
		),
		getTasktableData: bindActionCreators(
			taskAction.getTasktableData,
			dispatch
		),
		refreshTime: bindActionCreators(
			taskAction.refreshTime,
			dispatch
		),
		projectCount: bindActionCreators(
			taskAction.projectCount,
			dispatch
		)
	};
};
export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(
	proTask
);
