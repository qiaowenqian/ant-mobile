import React, {Component} from 'react'
import {List,Picker,InputItem,Icon,TextareaItem,Toast} from 'antd-mobile'
import ContentEditable from 'react-contenteditable'
import { bindActionCreators } from 'redux'
import withRedux from 'next-redux-wrapper'
import Router from 'next/router'

import { initStore } from '../store'
import * as projectAction from '../actions/project'
import * as cacheAction from '../actions/cache'
import stylesheet from 'styles/components/setUp.scss'
import Dingtalk from '../utils/dingtalk'
import Layout from '../components/Layout'
import Loading from '../components/Loading'
import utils from '../utils/utils'

const proPower=[{
	'label':'团队所有人可见',
	'value':'1'
},{
	'label':'项目成员可见',
	'value':'0'
}]

const Item = List.Item;
const Brief = Item.Brief;
/**
 * (必填)id:''   //项目id
 */
class setUpProject extends Component {
  	static getInitialProps ({ req}) {
	    const language = req ? req.headers['accept-language'] : navigator.language
	    const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
	    const android = /android/i.test(userAgent)
	    const platform = android ? 'android' : 'ios'
	  
	    return {
	      language
	    }
  	}
   	constructor(props) {
	   	super(props)
	    this.state = {
	    	proNameLength:0,
	    	projectInfo:{           
    			proname: '', 
    			proremark: '',             // 项目描述
    			opentype:'0',				//公开权限
    			userFlow: '1',				//审核人
				memberofpros:[],			 //项目成员（0：成员 1：管理员 2：负责人）
    			category: '1' 
			},
			projectInfoNew:{},
		    condition:{
    			'group':'evolve',       
    			'menuType':'allperson',     // 默认公开所有人可见的
    		},
			allper:'项目成员可见',
			titleEditing:false,//标题编辑状态
			descEditing:false,//描述编辑状态

			getProLoading:false, //获取项目内容
			updateProLoading:false,//更新内容
			editData:[],            //编辑的数据

			id:'',    //项目id
	    }
  	}
  	componentWillReceiveProps(nextProps) {
		if(this.state.getProLoading && nextProps.project){
			this.setState({projectInfoNew:nextProps.project.data});
			if(nextProps.project.success){
				//备份数据
				let data = nextProps.project.data;
				let projectInfo={
					id:this.props.id,
					proname:data.ant.proname,
					proremark:data.ant.proremark,           
					category:data.ant.category,       
					opentype:data.ant.opentype,
					memberofpros:[],			 //项目成员（0：成员 1：管理员 2：负责人）
				};
				let fzrHtml = [];
				let glyHtml = [];
				let cyHtml = []; 
				for(let i=0; i<data.users.length; i++){
					projectInfo.memberofpros.push({id:data.users[i].id,user:data.users[i].user,rtype:data.users[i].rtype});
					if(projectInfo.memberofpros.length>0){
						projectInfo.memberofpros.map((item,i)=>{
							if(item.rtype=='2'){
								fzrHtml.push({id:item.id,user:item.user,rtype:item.rtype});
							}else if(item.rtype=='1'){
								glyHtml.push({id:item.id,user:item.user,rtype:item.rtype});
							}else if(item.rtype=='0'){
								cyHtml.push({id:item.id,user:item.user,rtype:item.rtype});
							}
						});
					}
				}
				console.log(projectInfo.memberofpros,'render*****memberofpros********');
				// 计算录入的文字长度
				  let proNameCount = utils.getByteLen(nextProps.project.data.ant.proname);
				  let proDescCount = utils.getByteLen(nextProps.project.data.ant.proremark);
				  this.setState({proNameLength:proNameCount,proDescLength:proDescCount});
				this.setState({projectInfo:projectInfo});
			}else{
				Toast.fail(nextProps.project.errmsg)
			}
			this.setState({getProLoading:false});
		}else if(this.state.updateProLoading && nextProps.project){
			if(nextProps.project.success){
				this.setState({editData:[]});
  				this.getProject(this.props.id);
				Toast.success('保存成功')	
			}else{
				Toast.fail(nextProps.project.errmsg)
			}			
			this.setState({updateProLoading:false});				
		}
  	}
	componentWillMount(){
	    Dingtalk.setMenuHome();
	}
	
	componentDidMount() {
		utils.butAnimate();
		// 如果有项目ID，则获取项目的内容
		if(this.props.id){
			this.props.projectDetails(this.props.id,()=>{
			  this.setState({getProLoading:true});
		    });
		}
	}
	componentDidUpdate(){
		utils.butAnimate();
	}
	valChange(type,val){   		
  		let {projectInfo,proNameLength,proDescLength,editData}=this.state;
  		projectInfo[type] = val;
  		if(type=='proname'){
  			proNameLength = utils.getByteLen(val);
  			this.setState({proNameLength:proNameLength})
  		}else if(type=='proremark'){
			proDescLength = utils.getByteLen(val);
			this.setState({proDescLength:proDescLength})
		}  		
		  this.setState({projectInfo:projectInfo,editData:editData});
		  this.contrastDataByType(type);
	  }
	//取消保存
	cancelSave(){
		this.setState({editData:[]});
		this.props.projectDetails(this.props.id,()=>{
			this.setState({getProLoading:true});
		});
	}

	remove(value) {
		var index = this.indexOf(value);
		this.splice(index, 1);
	}
	// 保存项目
  	saveProject(){
		const {projectInfo,projectInfoNew} = this.state;
		let updateData={};
		console.log(projectInfo,'************点保存时projectInfo***********')
		console.log(projectInfo.memberofpros,'************点保存时projectInfo成员***********')
		updateData.proname = projectInfo.proname;
		updateData.proremark = projectInfo.proremark;
		updateData.category = projectInfo.category;
		updateData.opentype = projectInfo.opentype;
		updateData.id = (projectInfo.id?projectInfo.id:'');
		updateData.memberofpros = [];
		if(projectInfo.memberofpros && projectInfo.memberofpros.length>0){
			projectInfo.memberofpros.map((item,i)=>{
				if(item.rtype == '2'){
					updateData.memberofpros.push({
						rtype:'2',
						id:item.id,
						user:item.user,
						delete:(item.delete=='1'?'1':'')
					})
				}
				if(item.rtype == '1'){
					updateData.memberofpros.push({
						rtype:'1',
						id:item.id,
						user:item.user,
						delete:(item.delete=='1'?'1':'')
					})
				}
				if(item.rtype == '0'){
					updateData.memberofpros.push({
						rtype:'0',
						id:item.id,
						user:item.user,
						delete:(item.delete=='1'?'1':'')
					})
				}
			})
		}
			let deleteMemberofpros=[];
			if(projectInfoNew.users && projectInfoNew.users.length>0){
				projectInfoNew.users.map((tim,value)=>{
					if(tim.rtype == '1' || tim.rtype == '0'){
						let bb=true;
						projectInfo.memberofpros.map((item,i)=>{
							if(tim.rtype === item.rtype && tim.user.userid === item.user.userid){
								bb=false;
							}
						});
						if(bb){
							tim.delete = '1';
							deleteMemberofpros.push(tim);
						}
					}
				});
			}
		console.log(deleteMemberofpros,999999999);
		updateData.memberofpros = updateData.memberofpros.concat(deleteMemberofpros);
		Dingtalk.actionDing('projectUpdateAll');
  		this.props.projectUpdateAll(updateData,()=>{
			this.setState({updateProLoading:true});
		})
		console.log(updateData,444444);
	}
	//是否编辑了数据
	contrastDataByType(type,newProInfo){
		let {editData,projectInfoNew,projectInfo} = this.state;
		if(newProInfo) {
			projectInfoNew = newProInfo;
		}
  		switch(type){
  			case 'proname':
  				if(projectInfoNew.ant.proname !== projectInfo.proname){
  					editData[0] = true;
  				}else{
  					editData[0] = false;
  				}
  				break;
  			case 'proremark':
  				if(projectInfoNew.ant.proremark !== projectInfo.proremark){
  					editData[1] = true;
  				}else{
  					editData[1] = false;
  				}
  				break;
  			case 'opentype':
  				if(projectInfoNew.ant.opentype !== projectInfo.opentype){
  					editData[2] = true;
  				}else{
  					editData[2] = false;
  				}
  				break;
  			case 'user':
  				if(projectInfoNew.users[0].user.userid !== projectInfo.memberofpros[0].user.id){
  					editData[3] = true;
  				}else{
  					editData[3] = false;
  				}
  				break;
		  }
		  this.setState({editData:editData});
	}	  
	//获取项目详情
	getProject(proId){
		this.props.projectDetails(proId,()=>{
			this.setState({getProLoading:true});
		});
	}
	conditionChange(type,val){
  		let {condition,projectInfo,valContent,editData} = this.state;
  		if(type=='opentype'){
			projectInfo[type] = val;
			if(val=='0'){
				valContent='项目成员可见';
			}else{
				valContent='团队所有人可见'
			}
			  this.setState({allper:valContent,condition:condition,projectInfo:projectInfo,editData:editData});
			  this.contrastDataByType(type);
  		}
	}
	  

	
	//选负责人，管理员，成员
	dingSelectUser(type,tit,multiple){
    	let {projectInfo} = this.state;
		let memberofpros = projectInfo.memberofpros?projectInfo.memberofpros:[];
		let selectUser = [];
		let newMemberofpros = [];
		if (memberofpros && memberofpros.length > 0) {
			console.log("传到钉钉的选中人有：",memberofpros);
			memberofpros.map((item)=>{
				if(item.rtype == type){
					selectUser.push(item.user);
				}else{
					newMemberofpros.push(item);
				}
			});
		}
    	const _this = this;
    	Dingtalk.selectUser(selectUser,tit,(data)=>{
    		if (data && data.length > 0) {
				console.log("钉钉返回的人员有：",data)
					data.map((item)=>{
						newMemberofpros.push({
							user:{
								userid:item.emplId,
								phone:item.avatar,
								name:item.name
							},
							rtype:type
						})
					})
				}
			projectInfo.memberofpros = newMemberofpros;
			_this.contrastDataByType('user');
			_this.setState({projectInfo:projectInfo});
			console.log(projectInfo,'*****************更新的projectInfo信息********************');
			console.log(projectInfo.memberofpros,'********************钉钉返回的人员信息**********************');
			console.log(selectUser,1111111111111111111);
    	},(err)=>{
    		Toast.fail(err);
    	},multiple);
    }

  	render () {
  		const { language } = this.props;
		const {userResponse,creaProjectLoading,getProLoading,updateProLoading,allper,proNameLength,projectInfo,power,titleEditing,descEditing,editData}=this.state;
		console.log(projectInfo,'render*****projectInfo********')
		let memberofpros = projectInfo.memberofpros;
  		let fzrHtml = [];
  		let glyHtml = [];
		let cyHtml = [];
  		if(memberofpros && memberofpros.length>0){
  			memberofpros.map((item)=>{
  				if(item.rtype == '2')	{
  					fzrHtml.push(item)
  				}
  				if(item.rtype == '1')	{
  					glyHtml.push(item)
  				}
  				if(item.rtype == '0')	{
  					cyHtml.push(item)
  				}
  			})
		  }
    	return (
    		<Layout language={language}>
	    		<div className="pubLayout">
	    			<style dangerouslySetInnerHTML={{ __html: stylesheet }}/>
	    			<Loading show={creaProjectLoading || getProLoading || updateProLoading} />
	    			<div className="content projectSetUp">
	    				<List>
	    					<div className="projectcount">
								<InputItem 
								 placeholder="填写项目名称" 
								 className="projectName"  
								 maxLength='100'  
								 value={projectInfo.proname} 
								 onChange={(e)=>{this.valChange('proname',e)}}
								 onFocus={()=>{this.setState({titleEditing:true})}}
								 onBlur={()=>{this.setState({titleEditing:false})}}
								 ></InputItem>
					        	{titleEditing?<div style={{display:'flex'}}><span className="count">{proNameLength}</span><span className="countEnd">/50</span></div>:<Icon type="anticon-bianji"/>}
					        </div>
					        <div className="textareacount">
							{descEditing?
								<TextareaItem 
								 placeholder="请填写项目描述" 
								 rows={5} 
								 count={100} 
								 className="textarea" 
								 value={projectInfo.proremark} 
								 onChange={(e)=>{this.valChange('proremark',e)}}
								 onFocus={()=>{this.setState({descEditing:true})}}
								 onBlur={()=>{this.setState({descEditing:false})}}
								 />
							:<div>
								<TextareaItem 
									placeholder="请填写项目描述" 
									className="textarea" 
									value={projectInfo.proremark} 
									onChange={(e)=>{this.valChange('proremark',e)}}
									onFocus={()=>{this.setState({descEditing:true})}}
									onBlur={()=>{this.setState({descEditing:false})}}
									style={{height:'150px'}}
									/>
								<Icon type="anticon-bianji"/>
							</div>	
							}
								
					        </div>
					        <div className="select power">
					        	<Icon type="anticon-ren2"/>
					        	<Picker data={proPower} 
					        	extra={allper} 
					        	onOk={(e)=>this.conditionChange('opentype',e[0])} cols={1} val={projectInfo.opentype}>
					        		<Item arrow="horizontal">可见范围</Item>
					        	</Picker>
					        </div>
           					<div className="select person">
					        	<Icon type="anticon-ren2"/>
					        	<span className="title">负责人</span>
					        	<div className="action" onClick={() => this.dingSelectUser('2','选择负责人')}>
					        		{
					        			fzrHtml.length>0?fzrHtml.map((item)=>{
					        				return <span key={item.user.userid}>{utils.getNickNameByName(item.user.name)}</span>;
					        			}):<span>无</span>
					        		}
	                            </div>
	                            <div className="iconSvg">
	                            	<Icon type="right"/>
	                            </div>
					        </div>
					        <div className="select person">
					        	<Icon type="anticon-ren2"/>
					        	<span className="title">管理员</span>
					        	<div className="action" onClick={() => this.dingSelectUser('1','选择管理员',true)}>
	                                {
					        			glyHtml.length>0?glyHtml.map((item)=>{
					        				return <span key={item.user.userid}>{utils.getNickNameByName(item.user.name)}</span>;
					        			}):<span>无</span>
					        		}
	                            </div>
	                            <div className="iconSvg">
	                            	<Icon type="right"/>
	                            </div>
					        </div>
					        <div className="select person">
					        	<Icon type="anticon-ren2"/>
					        	<span className="title">成员</span>
					        	<div className="action" onClick={() => this.dingSelectUser('0','选择成员',true)}>
	                                {
					        			cyHtml.length>0?cyHtml.map((item)=>{
					        				return <span key={item.user.userid}>{utils.getNickNameByName(item.user.name)}</span>;
					        			}):<span>无</span>
					        		}	
		                        </div>
		                        <div className="iconSvg">
	                            	<Icon type="right"/>
	                            </div>
					        </div>
					    </List>
					</div>
					 {editData.indexOf(true)!==-1?
					<div className="buttonBox twoButs">
						<div className="noSave aniBut" onClick={()=>{this.cancelSave()}}>取消</div>
						<div className={(projectInfo.proname !== '')?'save-project blue aniBut':"save-noproject"}  onClick={()=>{if(projectInfo.proname !== ''){this.saveProject()}}}>保存项目</div>
					</div>
					:''} 
    			</div>
      		</Layout>
    	)
  	}
}
function mapStateToProps(state) {
	return { 
		project: state.project.projectDetails,   // 获取项目内容的返回值  更新的返回值也是用它
  	};
}
const mapDispatchToProps = (dispatch) => {
  	return {
		saveProjectListAtCache:bindActionCreators(cacheAction.saveProjectListAtCache, dispatch),
		projectDetails: bindActionCreators(projectAction.projectDetails, dispatch),                  // 获取项目内容
    	projectUpdateAll: bindActionCreators(projectAction.projectUpdateAll, dispatch),              // 更新项目设置内容
  	}
}
export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(setUpProject)
