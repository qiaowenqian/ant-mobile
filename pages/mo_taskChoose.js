import React, { Component } from "react";
import { bindActionCreators } from "redux";
import withRedux from "next-redux-wrapper";
import { Icon } from "antd-mobile";
import Router from "next/router";
import mobileStyle from "antd-mobile/dist/antd-mobile.min.css";

import { initStore } from "../store";
import * as labelAction from "../actions/label";
import Dingtalk from "../utils/dingtalk";
import Loading from "../components/Loading";
import Tag from "../components/Tag";
import stylesheet from "styles/pages/taskChoose.scss";
import utils from "../utils/utils";

/*
 *
 * */

class TaskChoose extends Component {
	constructor(props) {
		super(props);
		this.state = {
			search: {
				antProject: { id: "" },
				selectTag: [],
				fzr: { userid: "", name: "" },
				qrr: { userid: "", name: "" },
				zpr: { userid: "", name: "" },
				cjr: { userid: "", name: "" },
				finishDataOne: "",
				finishDataTwo: "",
				planTimeOne: "",
				planTimeTwo: "",
				taskPerformanceOne: "",
				taskPerformanceTwo: ""
			},
			tagShow: false
		};
	}

	componentWillMount() {
		let { search } = this.state;
		if (this.props.url.query.selectedProId) {
			search.antProject = {
				id: this.props.url.query.selectedProId,
				name: this.props.url.query.selectedProName
			};
			this.setState({ search: search });
		}
	}

	componentDidMount() {
		utils.butAnimate();
		if (!this.props.urlData) {
			this.props.setUrlData(
				encodeURIComponent(location.href.split("#")[0])
			);
		}
	}

	componentWillReceiveProps(nextProps) {}

	componentDidUpdate() {
		utils.butAnimate();
	}
	//添加标签
	tagAdd(lab) {
		let { search, selectTag } = this.state;
		selectTag.push(lab.id);
		if (search.label.length == 0) {
			search.label.push({
				add: "1",
				label: lab
			});
		} else {
			for (let i = 0; i < search.label.length; i++) {
				if (search.label[i].label.id == lab.id) {
					search.label[i].add = "1";
					search.label[i].delete = "";
					break;
				} else if (i == search.label.length - 1) {
					search.label.push({
						add: "1",
						label: lab
					});
				}
			}
		}
		this.setState({ search: search, selectTag: selectTag });
	}
	//删除标签
	tagDel(id) {
		let { search, selectTag } = this.state;
		for (let i = 0; i < search.label.length; i++) {
			if (search.label[i].label.id == id) {
				search.label[i].delete = "1";
				break;
			}
		}
		selectTag.splice(selectTag.indexOf(id), 1);
		this.setState({ search: search, selectTag: selectTag });
	}
	//选人
	selectUser(type, tit) {
		let { search } = this.state;
		const _this = this;
		Dingtalk.selectUser(
			[],
			tit,
			data => {
				if (data && data.length > 0) {
					let dingdingUserId = data[0].emplId;
					let dingdingUserPhoto = data[0].avatar;
					let dingdingUserName = data[0].name;
					if (type == "负责人") {
						search.fzr = {};
						search.fzr.userid = dingdingUserId;
						search.fzr.name = dingdingUserName;
						search.fzr.photo = dingdingUserPhoto;
					} else if (type == "确认人") {
						search.qrr = {};
						search.qrr.userid = dingdingUserId;
						search.qrr.name = dingdingUserName;
						search.qrr.photo = dingdingUserPhoto;
					} else if (type == "指派人") {
						search.zpr = {};
						search.zpr.userid = dingdingUserId;
						search.zpr.name = dingdingUserName;
						search.zpr.photo = dingdingUserPhoto;
					} else if (type == "创建人") {
						search.cjr = {};
						search.cjr.userid = dingdingUserId;
						search.cjr.name = dingdingUserName;
						search.cjr.photo = dingdingUserPhoto;
					}
					_this.setState({ search: search });
				}
			},
			err => {
				Toast.fail("选择" + type + "失败,请重试");
			}
		);
	}
	render() {
		const { search, tagShow } = this.state;
		return (
			<div className="taskChoose">
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
				{/* <Loading show={labeLoading} /> */}
				{tagShow ? (
					<Tag
						type="2"
						closedCallBack={() => {
							this.setState({
								tagShow: false
							});
						}}
						addCallBack={val => {
							this.tagAdd(val);
						}}
						delCallBack={val => {
							this.tagDel(val);
						}}
					/>
				) : (
					""
				)}
				<div className="chooseContent">
					<div className="project selectBox">
						<div
							className="title"
							onClick={() => {
								Router.push(
									Dingtalk.setDdNavColor(
										"/mo_projectSelect?selectedProId=" +
											search
												.antProject
												.id +
											"&backUrl=/mo_taskChoose"
									)
								);
							}}
						>
							<h3>所属项目</h3>
							<div>
								<span>
									请选择
								</span>
								<Icon
									type="down"
									className="icon_down"
								/>
							</div>
						</div>
						<ul className="proName">
							{search.antProject
								.id ? (
								<li>
									{
										search
											.antProject
											.name
									}
								</li>
							) : (
								""
							)}
						</ul>
					</div>
					<div className="tag selectBox">
						<div
							className="title"
							onClick={() => {
								this.setState({
									tagShow: true
								});
							}}
						>
							<h3>标签分类</h3>
							<div>
								<span>
									请选择
								</span>
								<Icon
									type="down"
									className="icon_down"
								/>
							</div>
						</div>
						<ul className="tagList">
							<li>项目名称</li>
							<li>项目名称</li>
							<li>项目名称</li>
							<li>项目名称</li>
							<li>项目名称</li>
							<li>项目名称</li>
						</ul>
					</div>
					<div className="fzr selectBox">
						<div className="title">
							<h3>负责人</h3>
							<div>
								<span>
									请选择
								</span>
								<Icon
									type="down"
									className="icon_down"
								/>
							</div>
						</div>
						<ul className="userList">
							{}
							<li>
								{
									search
										.fzr
										.name
								}
								<Icon type="cross" />
							</li>
						</ul>
					</div>
					<div className="qrr selectBox">
						<div className="title">
							<h3>确认人</h3>
							<div>
								<span>
									请选择
								</span>
								<Icon
									type="down"
									className="icon_down"
								/>
							</div>
						</div>
						<ul className="userList">
							<li>
								项目名
								<Icon type="cross" />
							</li>
						</ul>
					</div>
					<div className="zpr selectBox">
						<div className="title">
							<h3>指派人</h3>
							<div>
								<span>
									请选择
								</span>
								<Icon
									type="down"
									className="icon_down"
								/>
							</div>
						</div>
						<ul className="userList">
							<li>
								项目名
								<Icon type="cross" />
							</li>
						</ul>
					</div>
					<div className="cjr selectBox">
						<div className="title">
							<h3>创建人</h3>
							<div>
								<span>
									请选择
								</span>
								<Icon
									type="down"
									className="icon_down"
								/>
							</div>
						</div>
						<ul className="userList">
							<li>
								项目名
								<Icon type="cross" />
							</li>
						</ul>
					</div>
					<div className="finishTime selectBox">
						<div className="title">
							<h3>完成时间</h3>
							<div>
								<Icon
									type="down"
									className="icon_down"
								/>
							</div>
						</div>
						<div className="finish">
							<li>项目名称</li>
						</div>
					</div>
					<div className="planTime selectBox">
						<div className="title">
							<h3>计划工期</h3>
						</div>
						<div className="plan">
							<li>项目名称</li>
							<li>项目名称</li>
						</div>
					</div>
					<div className="taskPerformance selectBox">
						<div className="title">
							<h3>任务绩效</h3>
						</div>
						<div className="performance">
							<li>项目名称</li>
							<li>项目名称</li>
						</div>
					</div>
				</div>
				<div className="button">
					<div className="cancel">取消</div>
					<div className="clear">重置</div>
					<div className="ok">确定</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		labelList: state.label.labelList
	};
}
const mapDispatchToProps = dispatch => {
	return {
		getLabelListByUser: bindActionCreators(
			labelAction.getLabelListByUser,
			dispatch
		)
	};
};
export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(
	TaskChoose
);
