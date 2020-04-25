import { Component } from 'react'
import { Icon } from 'antd-mobile'
import Router from 'next/router'
import stylesheet from 'styles/components/SelectDownList.scss'
import utils from '../utils/utils'

/*
 * （必填）selected：默认选中，跟selectList里面的vlaue匹配
 * （必填）selectList：选项列表,格式：[{label:'',value:''}]
 * （必填）listShow：是否显示选项
 * （必填）titleClick()：点击标题的回调
 * （必填）selectingBack()：选择之后的回调
 * （选填）icon：图标，默认是下拉箭头
 * （选填）iconLeft：图标是否靠左对齐，默认靠右
 * */

export default class SelectDownList extends Component {
	constructor(props) {
		super(props)
		this.state = {
			selected:'0',
			selectList:[],
			listShow:false,
		};
	}
	
	componentWillMount() {
		this.setState({
			selected:this.props.selected,
			selectList:this.props.selectList,
			listShow:this.props.listShow
		});
	}
	
	componentDidMount() {	
		utils.butAnimate();
	}	

	componentWillReceiveProps(nextProps) {
		this.setState({
			selected:nextProps.selected,
			selectList:nextProps.selectList,
			listShow:nextProps.listShow
		});
	}
	
	componentDidUpdate(){
  		utils.butAnimate();
  	}
	
	componentUnMount(){		
	}
	
	titleClick(){
		const {listShow} = this.state;
		if(listShow){
			this.props.titleClick(false);
		}else{
			this.props.titleClick(true);
		}
	}
	
	render() {
		const {selected,selectList,listShow} = this.state;
		let selectName = selectList[0].label; 
		selectList.forEach((item,i)=>{
			if(item.value==selected){
				selectName = item.label;
				return false;
			}
		})
		return (
			<div>
				<style dangerouslySetInnerHTML={{ __html: stylesheet }} />
				<div className="SelectDownList">
					<div className={listShow?"val act aniButBlue":"val aniButGray"} 
						 style={this.props.iconLeft?{float:'right',margin:'0 0 0 5px'}:{}}
						 onClick={()=>{this.titleClick()}}
					>
						{selectName}
					</div>
					{this.props.icon?
						<Icon type={this.props.icon} />	
						:
						<Icon type="anticon-jiantouarrow486" />	
					}
					{listShow?
						<ul className="seList">
							{selectList.map((item,i)=>{
								return (
									<li className="white aniBut" key={item.value} onClick={()=>{this.props.selectingBack(item.value)}}>
										{item.label}
										{item.value == selected?<Icon type="check" />:''}
									</li>
								)
							})}					
						</ul>
					:''}
				</div>
				{listShow?<div className="shadowDiv" onClick={()=>{this.props.titleClick(false)}}></div>:''}
			</div>
		)
	}
}