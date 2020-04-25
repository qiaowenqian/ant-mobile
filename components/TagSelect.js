import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import withRedux from 'next-redux-wrapper'
import { Icon } from 'antd-mobile'

import { initStore } from '../store'
import * as labelAction from '../actions/label'
import Loading from './Loading'
import stylesheet from 'styles/components/tagSelect.scss'
import utils from '../utils/utils'

/*
 * （选填）selectList: 选中的标签ID，数组格式，可以传多个
 * （必填）closedCallBack：当点击关闭按钮时的回调
 * （必填）addCallBack：增加标签
 * （必填）delCallBack：删除标签
 * */

class TagSelect extends Component {
	constructor(props) {
		super(props)
		this.state = {
			labeLoading:false,
			labelData:[],
		};
	}
	
	componentWillMount() {
		this.props.getLabelListByUser(()=>{
			this.setState({labeLoading:true});
		})
	}
	
	componentDidMount() { 
		utils.butAnimate();
		if(this.props.selectList){
			this.setState({selectList:this.props.selectList})
		}
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.selectList){
			this.setState({selectList:nextProps.selectList})
		}
		if(this.state.labeLoading && nextProps.labelList){
			if(nextProps.labelList.success){
				this.setState({labelData:nextProps.labelList.data.labels})
			}else{
				
			}
			this.setState({labeLoading:false});
		}
	}
	
	componentDidUpdate(){
  		utils.butAnimate();
  	}
	
	tagClick(lab){
		const {selectList} = this.state;
		if(selectList.indexOf(lab.id)!==-1){
			this.props.delCallBack(lab.id); 
		}else{
			this.props.addCallBack(lab);    
		}
	}

	render() {
		const {labelData,selectList,labeLoading} = this.state;  
		return (
			<div className="tagSelect">
				<style dangerouslySetInnerHTML={{ __html: stylesheet }} />
				<Loading show={labeLoading} />
				<div className="close" onClick={()=>{this.props.closedCallBack()}}>
					<Icon type="left" className="aniButGray" />
				</div>				
				<div className="tit">请选择标签</div>
				<div className="tagBox">
					{labelData?labelData.map((item,i)=>{
						let list = '';	
						if(item.parentList && item.parentList.length > 0){
							list = item.parentList.map((value,key)=>{
								return( 
									<li key={value.id} className="pubDiv" style={{background:'#'+item.color}} key={value.id} onClick={()=>{this.tagClick(value)}}>
										{value.labelname} 
										{selectList.indexOf(value.id)!==-1?<Icon type="check" />:''}
									</li>
								)
							})
						}
						return (
							<ul key={item.id}>
								<li className="listName">
									{item.labelname}
								</li>
								{list}
							</ul>
						)
					}):''}
				</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return { 
   		labelList:state.label.labelList,
  	};
}
const mapDispatchToProps = (dispatch) => {
  	return {
    	getLabelListByUser:bindActionCreators(labelAction.getLabelListByUser, dispatch),
  	}
}
export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(TagSelect)