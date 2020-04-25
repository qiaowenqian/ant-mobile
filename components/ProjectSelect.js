import React, { Component } from "react";
import { bindActionCreators } from "redux";
import withRedux from "next-redux-wrapper";
import { Icon, SearchBar, Toast, InputItem, Button } from "antd-mobile";

import { initStore } from "../store";
import stylesheet from "styles/components/projectSelect.scss";
import Loading from "../components/Loading";
import * as projectAction from "../actions/project";
import * as cacheAction from "../actions/cache";
import Dingtalk from "../utils/dingtalk";
import utils from "../utils/utils";
import Friendly from "../components/Friendly";
import Storage from "../utils/storage";

/*
 * （选填） selectedPros:[{id:'',name:''}]                 // 选中的项目对象 数组格式 允许多个
 * （必填） selingCallBack([{id:'',name:''}])              // 选中回调 回传projectId projectName
 * （选填） closeCallBack()                                // 关闭回调，点击取消的时候调
 * （选填） add:true                                       // 是否显示新增按钮，默认显示 注意:如果为true，就是单选返回数据，因为下面只能放两个按钮或者一个。
 * （选填） isRadio:false                                  // 是否单选 默认多选
 * */

class ProjectSelect extends Component {
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
			projectListLoading: false,
			projectList: [],
			selectedPros: [],
			searchTxt: "",
			addProName: "",
			addProLoading: false,
			addProMoadlShow: false,
			nowPage: 1,
			pageCount: 1,
			projectListMoreLoading: false,
			add: true
		};
	}

	componentWillMount() {
		Dingtalk.setTitle("选择项目");
		Dingtalk.setMenuHome();
		this.props.getProjectListByTypeJurisdiction(
			{ orderBy: "DESC" },
			1,
			50,
			() => {
				this.setState({ projectListLoading: true });
			}
		);

		if (this.props.selectedPros) {
			this.setState({
				selectedPros: this.props.selectedPros
			});
		}

		if (this.props.add == false) {
			this.setState({ add: false });
		}
	}

	componentDidMount() {
		utils.butAnimate();
	}

	componentWillUnmount() {}

	componentWillReceiveProps(nextProps) {
		if (nextProps.selectedPros) {
			this.setState({ selectedPros: nextProps.selectedPros });
		}

		if (
			(this.state.projectListLoading ||
				this.state.projectListMoreLoading) &&
			nextProps.projectList
		) {
			if (nextProps.projectList.success) {
				let pageCount = nextProps.projectList.data.last;
				let nowPage = nextProps.projectList.data.pageNo;
				this.setState({
					pageCount: pageCount,
					nowPage: nowPage
				});

				// 根据返回的页数判断是 直接替换数据 还是追加数据
				if (nowPage == 1) {
					// this.setState({
					// 	projectList:
					// 		nextProps.projectList
					// 			.data.projects
					// });
					//修改权限接口和数据格式改变
					this.setState({
						projectList:
							nextProps.projectList
								.data.list
					});
				} else {
					// let data =
					// 	nextProps.projectList.data
					// 		.projects;
					let data =
						nextProps.projectList.data.list;
					let { projectList } = this.state;
					data.map((item, i) => {
						projectList.push(item);
					});
					this.setState({
						projectList: projectList
					});
				}
			} else {
				Toast.fail(
					"获取任务列表失败，请检查网络后重试",
					1
				);
			}
			this.setState({
				projectListLoading: false,
				projectListMoreLoading: false
			});
		} else if (
			this.state.addProLoading &&
			nextProps.projectCreate
		) {
			if (nextProps.projectCreate.success) {
				let id = nextProps.projectCreate.data.id;
				let name = nextProps.projectCreate.data.proname;
				this.projectListSeling(id, name);
			} else {
				Toast.fail(nextProps.projectCreate.errmsg, 1);
			}
			this.setState({
				addProLoading: false,
				addProMoadlShow: false
			});
		}
	}

	componentDidUpdate() {
		utils.butAnimate();
	}

	projectListSeling(id, name) {
		let { selectedPros } = this.state;
		if (selectedPros.filter(val => val.id === id).length === 0) {
			selectedPros.push({
				id: id,
				name: name
			});
		} else {
			selectedPros.map((item, i) => {
				if (item.id === id) {
					selectedPros.splice(i, 1);
					return false;
				}
			});
		}
		this.setState({ selectedPros: selectedPros });
		if (this.props.isRadio && this.props.selingCallBack) {
			this.props.selingCallBack({ id: id, name: name });
		}
	}

	addProject() {
		this.setState({ addProLoading: true });

		let { addProName } = this.state;
		let nowUser = Storage.getSession("user");
		let data = {
			proname: addProName,
			proremark: "", // 描述
			category: "1", // 类型         0 pc版    1 移动版
			opentype: "0", // 是否公开 1 公开     0 不公开
			memberofpros: [
				{ user: nowUser, rtype: "0" },
				{ user: nowUser, rtype: "1" },
				{ user: nowUser, rtype: "2" }
			] // 负责人 成员 管理员
		};

		this.props.createProject(data, data => {
			// this.props.sav
			if (data.success) {
				if (data.data) {
					this.props.setUpdataProjectListAtCache({
						projectId: "",
						data: data.data
					});
				}
			} else {
				Toast.fail(data.errmsg);
			}

			this.setState({ addProLoading: true });
		});
	}

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
			this.setState({ projectListMoreLoading: true });
			this.props.getProjectListByTypeJurisdiction(
				{ orderBy: "DESC" },
				nowPage + 1,
				50
			);
		}
	}
	/**
	 *
	 * @param {*项目名称} taskInfo
	 * @description处理项目名称过长
	 */
	subTaskName(projectname) {
		return projectname && projectname.length > 11
			? projectname.substring(0, 5) +
					"..." +
					projectname.substring(
						projectname.length - 6,
						projectname.length - 1
					)
			: projectname;
	}
	render() {
		const {
			projectList,
			projectListLoading,
			searchTxt,
			addProMoadlShow,
			nowPage,
			pageCount,
			projectListMoreLoading,
			add,
			selectedPros
		} = this.state;
		return (
			<div className="projectSelect">
				<style
					dangerouslySetInnerHTML={{
						__html: stylesheet
					}}
				/>
				<Loading show={projectListLoading} />
				<SearchBar
					placeholder="搜索"
					value={searchTxt}
					onChange={val => {
						this.setState({
							searchTxt: val
						});
					}}
					onSubmit={val => {
						this.setState({
							searchTxt: val
						});
					}}
					onCancel={() => {
						this.setState({
							searchTxt: ""
						});
					}}
				/>
				{projectList.length > 0 ? (
					<ul
						className="list"
						onScroll={e => {
							this.listScroll(e);
						}}
					>
						{projectList.map((item, i) => {
							if (
								searchTxt ==
									"" ||
								item.proname.indexOf(
									searchTxt
								) !== -1
							) {
								return (
									<li
										className="white aniBut"
										key={
											item.id
										}
										onClick={() => {
											if (
												this
													.props
													.contral
											) {
												if (
													item.create ==
													"true"
												) {
													this.projectListSeling(
														item.id,
														item.proname
													);
												} else {
													Toast.fail(
														`您在“${this.subTaskName(
															item.proname
														)}”中没有创建任务的权限`,
														1
													);
												}
											} else {
												this.projectListSeling(
													item.id,
													item.proname
												);
											}
										}}
									>
										<span className="textMore">
											{
												item.proname
											}
										</span>
										{selectedPros.filter(
											val =>
												val.id ===
												item.id
										)
											.length >
										0 ? (
											<Icon type="check" />
										) : (
											""
										)}
									</li>
								);
							}
						})}
						<li className="p">
							<Loading
								show={
									projectListMoreLoading
								}
								classStr="loading_minSize"
							/>
							{nowPage == pageCount
								? "已经到底喽"
								: "下拉加载更多哦"}
						</li>
					</ul>
				) : (
					<Friendly
						data={{
							alertTxt: "当前没有项目"
						}}
					/>
				)}
				{add ? (
					<div className="bigButBox">
						<div
							className="but cal"
							onClick={() => {
								if (
									this
										.props
										.closeCallBack
								) {
									this.props.closeCallBack();
								}
							}}
						>
							取消
						</div>
						<div
							className="but ok blue aniBut"
							onClick={() => {
								this.setState({
									addProMoadlShow: true
								});
							}}
						>
							添加新项目
						</div>
					</div>
				) : (
					<div className="bigButBox">
						<div
							className="but cal"
							onClick={() => {
								if (
									this
										.props
										.closeCallBack
								) {
									this.props.closeCallBack();
								}
							}}
						>
							取消
						</div>
						<div
							className="but ok blue aniBut"
							onClick={() => {
								this.props.selingCallBack(
									selectedPros
								);
							}}
						>
							确定
						</div>
					</div>
				)}

				{addProMoadlShow ? (
					<div className="alertModal">
						<div className="modal">
							<InputItem
								placeholder="输入项目名称"
								onChange={val => {
									this.setState(
										{
											addProName: val
										}
									);
								}}
							/>
							<Button
								type="primary"
								onClick={() => {
									this.addProject();
								}}
							>
								确定
							</Button>
							<Button
								onClick={() => {
									this.setState(
										{
											addProMoadlShow: false
										}
									);
								}}
							>
								取消
							</Button>
						</div>
					</div>
				) : (
					""
				)}
			</div>
		);
	}
}
function mapStateToProps(state) {
	return {
		projectList: state.project.projectListJurisdiction,
		projectCreate: state.project.createProjectAll
	};
}
const mapDispatchToProps = dispatch => {
	return {
		getProjectListByTypeJurisdiction: bindActionCreators(
			projectAction.getProjectListByTypeJurisdiction,
			dispatch
		),
		createProject: bindActionCreators(
			projectAction.createProject,
			dispatch
		),
		setUpdataProjectListAtCache: bindActionCreators(
			cacheAction.setUpdataProjectListAtCache,
			dispatch
		)
	};
};
export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(
	ProjectSelect
);
