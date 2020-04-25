import { Component } from 'react'
import { Icon } from 'antd-mobile'
import Router from 'next/router'
import Dingtalk from '../utils/dingtalk'

import stylesheet from 'styles/components/alert.scss'

/*
 * （必填）title:''             // 提示标题
 * （必填）msg:''               // 提示内容
 * （选填）okButTxt             // 确定按钮名称
 * （选填）butIsOne:false       // 是否是一个按钮
 * （必填）okCallBack()         // 确定回调
 * （选填）calButTxt:''         // 取消按钮名称
 * （必填）calCallBack()        // 取消回调
 * （选填）closeIconShow:false  // 是否需要关闭图标
 * （选填）closeIconClickCallBack() // 关闭图标点击回调
 */

export default class Alert extends Component {
	constructor(props) {
		super(props)
		this.state = {
		};
	}
	
	componentWillMount() {
	}
	
	componentUnMount(){
	}

	componentWillReceiveProps(nextProps) {
	}
	
	render() {
		const {title,msg,okButTxt,calButTxt,butIsOne} = this.props;
		let { closeIconShow } = this.props;
		if(!closeIconShow){
			closeIconShow = false;
		}
		return (
			<div className="alert">
				<style dangerouslySetInnerHTML={{ __html: stylesheet }} />				
				<div className="alertBox">
					{closeIconShow?<Icon className="colse" type="cross" onClick={()=>{this.props.closeIconClickCallBack()}} />:''}
					<div className='topName'><span className='title'>{title}</span><span style={{textDecoration: 'underline'}} onClick={() =>{Router.push(Dingtalk.setDdNavColor('/mo_version'))}}>版本介绍</span></div>
					<p dangerouslySetInnerHTML={{__html:msg}}></p>
					{butIsOne?
						<div className="butOne" onClick={()=>{this.props.okCallBack()}}>{okButTxt?okButTxt:'确定'}</div>
					:
						<div className="butTwo">
							<div className="but1" onClick={()=>{this.props.calCallBack()}}>{calButTxt?calButTxt:'取消'}</div>
							<div className="but2" onClick={()=>{this.props.okCallBack()}}>{okButTxt?okButTxt:'确定'}</div>
						</div>
					}
				</div>
			</div>
		)
	}
}