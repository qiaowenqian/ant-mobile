import { Component } from "react";
import { Icon, Toast } from "antd-mobile";
import Router from "next/router";
import Dingtalk from "../utils/dingtalk";
import stylesheet from "styles/components/friendly.scss";

/*
 *  (选填) data： 显示的参数
 *              {
 * 					alertTxt:'',
 * 					Icon:'',
 *                  ButTxt:'',
 *                  ButUrl:''              // 如果没有传url，按钮就不显示
 * 				}
 */
export default class friendly extends Component {
	constructor(props) {
		super(props);
		this.state = {
			butShow: false,
			data: {
				alertTxt: "没有数据哦",
				Icon: "anticon-wushuju",
				ButTxt: "",
				ButUrl: ""
			}
		};
	}

	componentDidMount() {
		if (this.props.data) {
			let data = this.props.data;
			if (data.ButUrl) {
				this.setState({ butShow: true });
			}
			let newData = {
				alertTxt: data.alertTxt
					? data.alertTxt
					: "没有数据哦",
				Icon: data.Icon ? data.Icon : "anticon-wushuju",
				ButTxt: data.ButTxt,
				ButUrl: data.ButUrl
			};
			this.setState({ data: newData });
		}
	}

	componentUnMount() {}

	componentWillReceiveProps(nextProps) {
		if (nextProps.data) {
			let data = nextProps.data;
			if (data.ButUrl) {
				this.setState({ butShow: true });
			}
			let newData = {
				alertTxt: data.alertTxt
					? data.alertTxt
					: "没有数据哦",
				Icon: data.Icon ? data.Icon : "anticon-wushuju",
				ButTxt: data.ButTxt,
				ButUrl: data.ButUrl
			};
			this.setState({ data: newData });
		}
	}

	butClick() {
		const { data } = this.state;
		Router.push(Dingtalk.setDdNavColor(data.ButUrl));
	}
	/**
	 *
	 * @param {*项目名称} taskInfo
	 * @description处理项目名称过长
	 */
	subTaskName(projectName) {
		return projectName && projectName.length > 11
			? projectName.substring(0, 5) +
					"..." +
					projectName.substring(
						projectName.length - 6,
						projectName.length - 1
					)
			: projectName;
	}
	render() {
		const { data, butShow } = this.state;
		return (
			<div className="friendly">
				<style
					dangerouslySetInnerHTML={{
						__html: stylesheet
					}}
				/>
				<div className="friData">
					<Icon type={data.Icon} />
					<span>{data.alertTxt}</span>
				</div>
				{butShow ? (
					<div
						className="friBut textMore"
						onClick={() => {
							if (this.props.hasJus) {
								if (
									!this
										.props
										.createPermission
								) {
									Toast.fail(
										`您在该项目中没有创建任务的权限`,
										1
									);
									return false;
								}
							}
							this.butClick();
						}}
					>
						{data.ButTxt}
					</div>
				) : (
					""
				)}
			</div>
		);
	}
}
