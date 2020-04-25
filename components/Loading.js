import React, { Component } from 'react'

import stylesheet from 'styles/components/loading.scss'


/*
 *  ( 必填 ) show: 是否渲染loading组件
 *  ( 选填 ) classStr：尺寸样式，默认没有，可选择 loading_minSize
 */
export default class Loading extends Component {
	constructor(props) {
		super(props)
		this.state = {
			show:false,
			classStr:"load_loading"
		};
	}
	
	componentWillMount() {
		if(this.props.show){
			this.setState({show:true});
		}else{
			const _this = this;
			setTimeout(function(){
			  _this.setState({show:false});
			}, 50);
		}
		
		if(this.props.classStr){
			this.setState({classStr:"load_loading "+this.props.classStr});
		}
	}
	
	componentDidMount() {
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.show){
			this.setState({show:true});
		}else{
			const _this = this;
			setTimeout(function(){
			  _this.setState({show:false});
			}, 50);
		}
		
		if(nextProps.classStr){
			this.setState({classStr:"load_loading "+nextProps.classStr});
		}
	}

	render() {
		if(this.state.show){			
			return (
				<div className={this.state.classStr}>
					<style dangerouslySetInnerHTML={{ __html: stylesheet }} />
					<div className="ant-spin ant-spin-spinning">
						<span className="ant-spin-dot ant-spin-dot-spin">
							<i></i><i></i><i></i><i></i>
						</span>
					</div>
				</div>
			)
		}else{
			return null	
		}		
	}
}