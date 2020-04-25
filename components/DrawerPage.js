import React, { Component } from "react";
import utils from "../utils/utils";
import Dingtalk from "../utils/dingtalk";
import TagSelect from "../components/Tag";
import Storage from "../utils/storage";

import { Tabs, Drawer, List, Radio, Icon, Toast } from "antd-mobile";
import stylesheet from "styles/components/DrawerPage.scss";
class DrawerPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			defaultVal: "DESC",
			tagList: [],
			labelData: [],
			labeLoading: true,
			Listcount: 0,
			userInfo: {
				userid: "",
				photo: "",
				nickname: "",
				name: ""
			},
			check: "ASC"
		};
	}

	componentDidMount() {
		if (this.props.check) {
			this.setState({ check: this.props.check });
		} else {
			let checks = Storage.getLocal("orderBy");
			this.setState({ check: checks });
		}
		if (this.props.tagList) {
			this.setState({
				tagList: this.props.tagList
			});
		}
		if (this.props.userInfo) {
			this.setState({
				userInfo: this.props.userInfo
			});
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.check) {
			this.setState({ check: nextProps.check });
		} else {
			let checks = Storage.getLocal("orderBy");
			this.setState({ check: checks });
		}
		if (nextProps.tagList) {
			this.setState({
				tagList: nextProps.tagList
			});
		}
		if (nextProps.userInfo) {
			this.setState({
				userInfo: nextProps.userInfo
			});
		}
	}

	componentDidUpdate() {}

	sortPro(value) {
		this.setState({ defaultVal: value });
		this.props.saveSort(value);
		this.setState({ check: value });
	}

	// 钉钉选人组件
	selectUser(selectedUser = [], userType) {
		const _this = this;
		const { userInfo } = this.state;
		Dingtalk.selectUser(
			selectedUser,
			userType,
			data => {
				if (data && data.length > 0) {
					userInfo.userid = data[0].emplId;
					userInfo.photo = data[0].avatar;
					userInfo.name = data[0].name;
					userInfo.nickname = utils.getNickNameByName(
						data[0].name
					);
					_this.setState({ userInfo: userInfo });
					_this.props.userSort(userInfo);
				}
			},
			err => {
				Toast.fail(
					"选择" +
						userType +
						"失败,失败原因：" +
						err
				);
			}
		);
	}
	chooseTags(val) {
		this.props.tagSelect(val);

		this.setState({ open: false, tagList: val });
	}
	saveSortPro() {
		const { defaultVal } = this.state;
		Storage.setLocal("orderBy", defaultVal);
		Toast.info("保存成功", 1);
	}
	render() {
		const tabs = [{ title: "筛选" }, { title: "排序" }];
		const data = [
			{ value: "DESC", label: "按创建时间最晚" },
			{ value: "ASC", label: "按创建时间最早" },
			{ value: "name", label: "按项目名称A-Z" }
		];
		const tabsStyle = {
			width: "10px",
			marginLeft: "20px",
			borderRadius: "1px"
		};
		const { tagList, userInfo, check } = this.state;
		const sidebar = (
			<div className="selectBox">
				<div className="selectText">
					<span>选择标签</span>
				</div>
				<TagSelect
					type="3"
					selectList={tagList}
					closedCallBack={() => {
						this.setState({ open: false });
					}}
					selectedCallBack={val => {
						this.chooseTags(val);
					}}
				/>
			</div>
		);
		return (
			<div className="DrawerPage">
				<style
					dangerouslySetInnerHTML={{
						__html: stylesheet
					}}
				/>
				<Drawer
					className="dranwerTagSelect"
					enableDragHandle
					sidebar={sidebar}
					open={this.state.open}
					onOpenChange={() => {
						this.setState({ open: !open });
					}}
				/>
				<div className="box">
					<Tabs
						className="sorts"
						tabs={tabs}
						initialPage={0}
						animated={true}
						useOnPan={false}
						tabBarUnderlineStyle={tabsStyle}
					>
						<div className="tab1">
							<div className="projectTag">
								项目标签
							</div>
							<div
								className="tagBox"
								onClick={() => {
									this.setState(
										{
											open: true
										}
									);
								}}
							>
								{tagList &&
								tagList.length >
									0 ? (
									tagList.map(
										(
											tim,
											index
										) => {
											return (
												<li
													key={
														index
													}
													className="selectedTag"
												>
													<span
														className="textMore"
														className={
															tagList.filter(
																val =>
																	val.id ===
																	tim.id
															)
																.length >
															0
																? "textMore " +
																  utils.getTagColorByColorCode(
																		"1",
																		tim.color
																  )
																: "textMore " +
																  utils.getTagColorByColorCode(
																		"2",
																		tim.color
																  )
														}
													>
														{
															tim.labelname
														}
													</span>
												</li>
											);
										}
									)
								) : (
									<div className="nullTag">
										未选择项目标签
										<Icon
											type="right"
											className="iconRight"
										/>
									</div>
								)}
							</div>
							<div className="projectTag">
								负责人
							</div>
							<div
								className="tagBox"
								onClick={() => {
									this.selectUser(
										[],
										"负责人"
									);
								}}
							>
								{userInfo.userid !==
								"" ? (
									<div>
										{userInfo.photo ? (
											<img
												className="userPhoto"
												src={
													userInfo.photo
												}
											/>
										) : (
											<span className="userNickName">
												{
													userInfo.nickname
												}
											</span>
										)}
										<span className="userName">
											{
												userInfo.name
											}
										</span>
									</div>
								) : (
									<div className="nullTag">
										未选择负责人
										<Icon
											type="right"
											className="iconRight smallIcon"
										/>
									</div>
								)}
							</div>
							<div className="bottomButton">
								<div
									className="sure"
									onClick={() => {
										this.props.clearAll();
										this.setState(
											{
												tagList: [],
												userInfo: {
													userid:
														""
												}
											}
										);
									}}
								>
									清除筛选
								</div>
								<div className="cancel">
									筛选出
									{
										this
											.props
											.Listcount
									}
									个项目
								</div>
							</div>
						</div>
						<div className="tab2">
							<div className="sortList">
								{data.map(i => (
									<li
										key={
											i.value
										}
										onClick={() => {
											this.sortPro(
												i.value
											);
										}}
									>
										{i.value ==
										check ? (
											<Icon
												type="anticon-Icon"
												className="iconSize"
											/>
										) : (
											<Icon
												type="anticon-dianxuan"
												className="iconSize"
											/>
										)}
										<span>
											{
												i.label
											}
										</span>
									</li>
								))}
							</div>
							<div className="myBorder" />
							<div
								className="save"
								onClick={() => {
									this.saveSortPro();
								}}
							>
								<Icon
									className="saveIcon"
									type="anticon-save"
								/>
								<span>
									保存为默认排序
								</span>
							</div>
						</div>
					</Tabs>
				</div>
			</div>
		);
	}
}
export default DrawerPage;
