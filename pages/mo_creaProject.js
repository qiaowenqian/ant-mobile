import React, { Component } from "react";
import {
	List,
	Picker,
	InputItem,
	Icon,
	TextareaItem,
	Toast
} from "antd-mobile";
import { bindActionCreators } from "redux";
import withRedux from "next-redux-wrapper";
import Router from "next/router";
import mobileStyle from "antd-mobile/dist/antd-mobile.min.css";

import { initStore } from "../store";
import * as projectAction from "../actions/project";
import * as cacheAction from "../actions/cache";
import stylesheet from "styles/pages/creaProject.scss";
import Dingtalk from "../utils/dingtalk";
import Layout from "../components/Layout";
import Loading from "../components/Loading";
import utils from "../utils/utils";
import Storage from "../utils/storage";

const proPower = [
	{
		label: "团队所有人可见",
		value: "团队所有人可见"
	},
	{
		label: "项目成员可见",
		value: "项目成员可见"
	}
];

const Item = List.Item;
const Brief = Item.Brief;
/**
 * 创建项目
 */
class creaProject extends Component {
	static getInitialProps({ req }) {
		const language = req
			? req.headers["accept-language"]
			: navigator.language;
		const userAgent = req
			? req.headers["user-agent"]
			: navigator.userAgent;
		const android = /android/i.test(userAgent);
		const platform = android ? "android" : "ios";

		return {
			language
		};
	}
	constructor(props) {
		super(props);
		this.state = {
			proNameLength: 0,
			projectInfo: {
				proname: "",
				proremark: "", // 项目描述
				opentype: "0",
				userFlow: "1",
				memberofpros: [], //项目成员（0：成员 1：管理员 2：负责人）
				category: "1"
			},
			condition: {
				group: "evolve",
				menuType: "allperson" // 默认公开所有人可见的
			},
			allper: "项目成员可见"
		};
	}
	componentWillReceiveProps(nextProps) {}
	componentWillMount() {
		Dingtalk.setTitle("创建项目");
		Dingtalk.setMenuHome();
	}

	componentDidMount() {
		// 默认管理员 成员 负责人都是自己
		let { projectInfo } = this.state;
		let nowUser = Storage.getSession("user");
		if (!this.props.urlData) {
			this.props.setUrlData(
				encodeURIComponent(location.href.split("#")[0])
			);
		}
		if (nowUser && nowUser.userid) {
			if (projectInfo.memberofpros.length == 0) {
				projectInfo.memberofpros = [
					{
						rtype: "0",
						user: nowUser
					},
					{
						rtype: "1",
						user: nowUser
					},
					{
						rtype: "2",
						user: nowUser
					}
				];
				this.setState({ projectInfo: projectInfo });
			}
		}
	}
	valChange(type, text) {
		let { projectInfo, proNameLength } = this.state;
		projectInfo[type] = text;
		if (type == "proname") {
			proNameLength = utils.getByteLen(text);
			this.setState({ proNameLength: proNameLength });
		}
		this.setState({ projectInfo: projectInfo });
	}

	// 保存项目
	saveProject() {
		const { projectInfo } = this.state;
		Dingtalk.actionDing("createProject");
		this.props.createProject(projectInfo, result => {
			if (result.success) {
				Router.push(
					Dingtalk.setDdNavColor("/mo_project")
				);
				this.props.saveProjectListAtCache([]);
			} else {
				Toast.fail("已存在相同的项目名称");
			}
		});
	}

	conditionChange(type, val) {
		let { condition } = this.state;
		if (type == "withMe") {
			condition.menuType = val;
			this.setState({ allper: val, condition: condition });
		}
	}

	//选负责人，管理员，成员
	dingSelectUser(type, tit, multiple) {
		let { projectInfo } = this.state;
		let memberofpros = projectInfo.memberofpros
			? projectInfo.memberofpros
			: [];
		let selectUser = [];
		let newMemberofpros = [];
		if (memberofpros && memberofpros.length > 0) {
			console.log("传到钉钉的选中人有：");
			memberofpros.map(item => {
				if (item.rtype == type) {
					selectUser.push(item.user);
					console.log(item.user.name);
				} else {
					newMemberofpros.push(item);
				}
			});
		}

		const _this = this;
		Dingtalk.selectUser(
			selectUser,
			tit,
			data => {
				if (data && data.length > 0) {
					console.log("钉钉返回的人员有：");
					data.map(item => {
						console.log(item.name);
						newMemberofpros.push({
							user: {
								userid:
									item.emplId,
								phone:
									item.avatar,
								name: item.name
							},
							rtype: type
						});
					});
				}
				projectInfo.memberofpros = newMemberofpros;
				_this.setState({ projectInfo: projectInfo });
			},
			err => {
				Toast.fail(err);
			},
			multiple
		);
	}

	render() {
		const { language } = this.props;
		const {
			userResponse,
			creaProjectLoading,
			allper,
			proNameLength,
			projectInfo,
			power
		} = this.state;
		let memberofpros = projectInfo.memberofpros;
		let fzrHtml = [];
		let glyHtml = [];
		let cyHtml = [];
		if (memberofpros && memberofpros.length > 0) {
			memberofpros.map(item => {
				if (item.rtype == "2") {
					fzrHtml.push(item);
				}
				if (item.rtype == "1") {
					glyHtml.push(item);
				}
				if (item.rtype == "0") {
					cyHtml.push(item);
				}
			});
		}
		return (
			<Layout language={language}>
				<div className="pubLayout">
					<style
						dangerouslySetInnerHTML={{
							__html: stylesheet
						}}
					/>
					<style
						dangerouslySetInnerHTML={{
							__html: mobileStyle
						}}
					/>

					<Loading show={creaProjectLoading} />
					<div className="content creaProject">
						<List>
							<div className="projectcount">
								<InputItem
									placeholder="填写项目名称"
									className="projectName"
									maxLength="100"
									value={
										projectInfo.proname
									}
									onChange={e => {
										this.valChange(
											"proname",
											e
										);
									}}
								/>
								<span className="count">
									{
										proNameLength
									}
								</span>
								<i className="countEnd">
									/50
								</i>
							</div>
							<div className="textareacount">
								<TextareaItem
									placeholder="请填写项目描述"
									rows={5}
									count={
										100
									}
									className="textarea"
									value={
										projectInfo.proremark
									}
									onChange={e => {
										this.valChange(
											"proremark",
											e
										);
									}}
								/>
							</div>
							<div className="select power">
								<Icon type="anticon-ren2" />
								<Picker
									data={
										proPower
									}
									extra={
										allper
									}
									onOk={e =>
										this.conditionChange(
											"withMe",
											e[0]
										)
									}
									cols={1}
									val={[
										allper
									]}
								>
									<Item arrow="horizontal">
										可见范围
									</Item>
								</Picker>
							</div>
							<div className="select person">
								<Icon type="anticon-ren2" />
								<span className="title">
									负责人
								</span>
								<div
									className="action"
									onClick={() =>
										this.dingSelectUser(
											"2",
											"选择负责人"
										)
									}
								>
									{fzrHtml.length >
									0 ? (
										fzrHtml.map(
											(
												item,
												i
											) => {
												return (
													<span
														key={
															item
																.user
																.userid +
															i
														}
													>
														{utils.getNickNameByName(
															item
																.user
																.name
														)}
													</span>
												);
											}
										)
									) : (
										<span>
											无
										</span>
									)}
								</div>
								<div className="iconSvg">
									<Icon type="right" />
								</div>
							</div>
							<div className="select person">
								<Icon type="anticon-ren2" />
								<span className="title">
									管理员
								</span>
								<div
									className="action"
									onClick={() =>
										this.dingSelectUser(
											"1",
											"选择管理员",
											true
										)
									}
								>
									{glyHtml.length >
									0 ? (
										glyHtml.map(
											(
												item,
												i
											) => {
												return (
													<span
														key={
															item
																.user
																.userid +
															i
														}
													>
														{utils.getNickNameByName(
															item
																.user
																.name
														)}
													</span>
												);
											}
										)
									) : (
										<span>
											无
										</span>
									)}
								</div>
								<div className="iconSvg">
									<Icon type="right" />
								</div>
							</div>
							<div className="select person">
								<Icon type="anticon-ren2" />
								<span className="title">
									成员
								</span>
								<div
									className="action"
									onClick={() =>
										this.dingSelectUser(
											"0",
											"选择成员",
											true
										)
									}
								>
									{cyHtml.length >
									0 ? (
										cyHtml.map(
											(
												item,
												i
											) => {
												return (
													<span
														key={
															item
																.user
																.userid +
															i
														}
													>
														{utils.getNickNameByName(
															item
																.user
																.name
														)}
													</span>
												);
											}
										)
									) : (
										<span>
											无
										</span>
									)}
								</div>
								<div className="iconSvg">
									<Icon type="right" />
								</div>
							</div>
						</List>
					</div>
					<div
						className={
							projectInfo.proname !==
							""
								? "save-project"
								: "save-noproject"
						}
						onClick={() => {
							if (
								projectInfo.proname !==
								""
							) {
								this.saveProject();
							}
						}}
					>
						保存项目
					</div>
				</div>
			</Layout>
		);
	}
}
function mapStateToProps(state) {
	return {
		projectCreate: state.project.projectCreate
	};
}
const mapDispatchToProps = dispatch => {
	return {
		createProject: bindActionCreators(
			projectAction.createProject,
			dispatch
		),
		saveProjectListAtCache: bindActionCreators(
			cacheAction.saveProjectListAtCache,
			dispatch
		)
	};
};
export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(
	creaProject
);
