import React, { Component } from "react";
import withRedux from "next-redux-wrapper";
import Router from "next/router";
import { Icon, Button } from "antd-mobile";
import { bindActionCreators } from "redux";
import { getLimtTask, getLimtProject, getFreeLimit } from "../actions/version";
import mobileStyle from "antd-mobile/dist/antd-mobile.min.css";

import { initStore } from "../store";
import stylesheet from "styles/pages/version.scss";
import Layout from "../components/Layout";
import Dingtalk from "../utils/dingtalk";
import Storage from "../utils/storage";
import utils from "../utils/utils";

import * as userAction from "../actions/user";

class Version extends Component {
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
			user: "",
			loading: true
		};
	}

	componentWillMount() {
		Dingtalk.setTitle("续费升级");
		Dingtalk.setMenuHome();
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
	freeEdition() {
		getFreeLimit(data => {
			if (data.err) {
				return false;
			}
			let user = data.data;
			Storage.removeSession("user");
			Storage.setSession("user", JSON.stringify(user));
			Router.push(Dingtalk.setDdNavColor("/mo_dingHome"));
		});
	}

	render() {
		const { language } = this.props;
		const { loading } = this.state;
		return (
			<Layout language={language}>
				<div className="pubLayout version">
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
					<div className="imgBox">
						<div className="version2">
							<h3>版本对比</h3>
							<table>
								<tr>
									<td>
										功能
									</td>
									<td
										style={{
											color:
												"#199fd8"
										}}
									>
										免费版
									</td>
									<td>
										基础版
									</td>
									<td>
										专业版
									</td>
								</tr>
								<tr>
									<td>
										自动同步钉钉组织架构
									</td>
									<td>
										<Icon type="check" />
									</td>
									<td>
										<Icon type="check" />
									</td>
									<td>
										<Icon type="check" />
									</td>
								</tr>
								<tr>
									<td>
										钉钉实时工作通知
									</td>
									<td>
										<Icon type="check" />
									</td>
									<td>
										<Icon type="check" />
									</td>
									<td>
										<Icon type="check" />
									</td>
								</tr>
								<tr>
									<td>
										4W1H多维度定义任务
									</td>
									<td>
										<Icon type="check" />
									</td>
									<td>
										<Icon type="check" />
									</td>
									<td>
										<Icon type="check" />
									</td>
								</tr>
								<tr>
									<td>
										无限分解子任务
									</td>
									<td>
										<Icon type="check" />
									</td>
									<td>
										<Icon type="check" />
									</td>
									<td>
										<Icon type="check" />
									</td>
								</tr>
								<tr>
									<td>
										钉盘存储分类任务附件
									</td>
									<td>
										<Icon type="check" />
									</td>
									<td>
										<Icon type="check" />
									</td>
									<td>
										<Icon type="check" />
									</td>
								</tr>
								<tr>
									<td>
										关联前后工序任务
									</td>
									<td />
									<td />
									<td>
										<Icon type="check" />
									</td>
								</tr>
								<tr>
									<td>
										任务导入导出
									</td>
									<td />
									<td />
									<td>
										<Icon type="check" />
									</td>
								</tr>
								<tr>
									<td>
										批量修改任务
									</td>
									<td />
									<td />
									<td>
										<Icon type="check" />
									</td>
								</tr>
								<tr>
									<td>
										跨项目复制移动任务
									</td>
									<td />
									<td />
									<td>
										<Icon type="check" />
									</td>
								</tr>
								<tr>
									<td>
										WBS条理化汇总文件
									</td>
									<td />
									<td />
									<td>
										<Icon type="check" />
									</td>
								</tr>
								<tr>
									<td>
										甘特图管理时间序列
									</td>
									<td />
									<td />
									<td>
										<Icon type="check" />
									</td>
								</tr>
								<tr>
									<td>
										多维度项目数据统计
									</td>
									<td />
									<td />
									<td>
										<Icon type="check" />
									</td>
								</tr>
								<tr>
									<td>
										精准工作动态
									</td>
									<td>
										<Icon type="check" />
									</td>
									<td>
										<Icon type="check" />
									</td>
									<td>
										<Icon type="check" />
									</td>
								</tr>
								<tr>
									<td>
										多维度筛选跟进任务
									</td>
									<td />
									<td />
									<td>
										<Icon type="check" />
									</td>
								</tr>
							</table>
						</div>
						<div className="version1">
							<table>
								<tr>
									<td>
										资源
									</td>
									<td
										style={{
											color:
												"#199fd8"
										}}
									>
										免费版
									</td>
									<td>
										基础版
									</td>
									<td>
										专业版
									</td>
								</tr>
								<tr>
									<td>
										团队总人数
									</td>
									<td>
										不限
									</td>
									<td>
										不限
									</td>
									<td>
										不限
									</td>
								</tr>
								<tr>
									<td>
										应用授权人数
									</td>
									<td>
										不限
									</td>
									<td>
										不限
									</td>
									<td>
										不限
									</td>
								</tr>
								<tr>
									<td>
										项目总数量
									</td>
									<td>
										不限
									</td>
									<td>
										不限
									</td>
									<td>
										不限
									</td>
								</tr>
								<tr>
									<td>
										任务总数量
									</td>
									<td>
										200条/月
									</td>
									<td>
										不限
									</td>
									<td>
										不限
									</td>
								</tr>
							</table>
						</div>
					</div>

					<div className="towButton">
						<Button
							className="but aniBut blue"
							onClick={() => {
								Router.push(
									Dingtalk.setDdNavColor(
										"/mo_customer"
									)
								);
							}}
						>
							升级版本
						</Button>
						{/* <div className="but aniBut blue" onClick={()=>{this.freeEdition()}}>开始使用</div> */}
						<Button
							className="but aniBut blue"
							onClick={() => {
								this.freeEdition();
							}}
						>
							开始使用
						</Button>
					</div>
				</div>
			</Layout>
		);
	}
}
function mapStateToProps(state) {
	return {
		urlData: state.user.urlData
	};
}
const mapDispatchToProps = dispatch => {
	return {
		setUrlData: bindActionCreators(userAction.setUrlData, dispatch)
	};
};
export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(
	Version
);
