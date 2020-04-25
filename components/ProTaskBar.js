import React, { Component } from 'react'
import Router from 'next/router'

import stylesheet from 'styles/components/proTaskBar.scss'
import utils from '../utils/utils'
import Dingtalk from '../utils/dingtalk'
/*
 *  actingCallBack   选中回调 返回名字
 */
export default class ProTaskBar extends Component {
	constructor(props) {
		super(props)
		this.state = {
			act: '任务'
		};
	}
	
	componentWillMount() {
	}
	
	componentDidMount() {
		 utils.butAnimate();
	}

	componentWillReceiveProps(nextProps) {
	}
	componentDidUpdate(){
  		 utils.butAnimate();
  	}
	componentWillUnmount(){
	}	

	barChange(type){
		this.setState({act:type});
		this.props.actingCallBack(type);
	}

	render() {
		const { act } = this.state; 
		return (
			<div className="proTaskBar">
				<style dangerouslySetInnerHTML={{ __html: stylesheet }} />
				<div className={act === '任务'?"but acts aniBut":"but aniBut"} onClick={()=>this.barChange('任务')}>
					<span>任务</span>
				</div>	
				<div className={act === '文件'?"but acts aniBut":"but aniBut"} onClick={()=>this.barChange('文件')}>
					<span>文件</span>
				</div>
				<div className={act === '统计'?"but acts aniBut":"but aniBut"} onClick={()=>this.barChange('统计')}>
					<span>统计</span>
				</div>
				<div className={act === '设置'?"but acts aniBut":"but aniBut"} onClick={()=>this.barChange('设置')}>
					<span>设置</span>
				</div>
			</div>
		)
	}
}