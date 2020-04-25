import React from 'react'
import {Icon} from 'antd-mobile'

export default class IconBox extends React.Component {
    //任务状态图表
    static getTaskIconByState(state) {
        //未完成
        if(state=='0'){
            return <Icon  type="anticon-weiwancheng" className="taskinfo_state_icon state_0" />
        }else if(state=='1'){//已完成
            return <Icon  type="anticon-yiwancheng" className="taskinfo_state_icon state_1" />
        }else if(state=='2'){//待审核
            return <Icon  type="anticon-daishenhe" className="taskinfo_state_icon state_2" />
        }else if(state=='3'){//未指派
            return <Icon  type="anticon-weizhipai" className="taskinfo_state_icon state_3" />
        }else if(state=='4'){//已终止
            return <Icon  type="anticon-yizhongzhi" className="taskinfo_state_icon state_4" />
        }
    }
    static CompareDate(d1,d2){
        return ((new Date(d1.replace(/-/g,"\/"))) >= (new Date(d2.replace(/-/g,"\/"))));
    }
    //任务状态描述
    static getTaskStateDescribe(task) {
        //对应于未指派负责人、已终止两种的任务状态
        if(task.state=='4' || task.userResponse==null || task.userResponse.id==null){
            if(task.state=='0' || task.state=='3'){
                return <span style={{color:'#E96300',fontSize:'12px',marginLeft:'3px'}}>未指派</span>
            }
            if(task.state=='4'){
                return <span style={{color:'#808080',fontSize:'12px',marginLeft:'3px'}}>已终止</span>
            }
            return '';
        }else if(task.state=='2'){
            return <span style={{color:'#238E23',fontSize:'12px',marginLeft:'3px'}}>待确认</span>
        }else if(task.state!='1' && (task.planEndTime!=null && task.pastDates<0)){//已过计划完成日期、尚未完成
            return <span style={{color:'#E96300',fontSize:'12px',marginLeft:'3px'}}>已逾期</span>
        }else if(task.state!='1' && (task.planEndTime==null ||  task.pastDates>=0)){//待审核
            return <span style={{color:'#238E23',fontSize:'12px',marginLeft:'3px'}}>进行中</span>
        }else if(task.state=='1' && task.planEndTime!=null && task.realityEndTime!=null && this.CompareDate(task.planEndTime,task.realityEndTime)){//已完成、但实际完成较计划完成迟
            return <span style={{color:'#3299CC',fontSize:'12px',marginLeft:'3px'}}>提前完成</span>
        }else if(task.state=='1' && (task.planEndTime!=null && task.realityEndTime!=null && this.CompareDate(task.realityEndTime,task.planEndTime)) ){//已完成、实际完成与计划完成一致
            return <span style={{color:'#0a74ca',fontSize:'12px',marginLeft:'3px'}} >逾期完成</span>
        }else if(task.state=='1' && (task.planEndTime==null || (task.planEndTime!=null && task.realityEndTime!=null && task.planEndTime.trim() == task.realityEndTime.trim()))){
            return <span style={{color:'#108ee9',fontSize:'12px',marginLeft:'3px'}} >按期完成</span>
        }
    }
    //完成项目显示实际完成时间，未完成的项目显示计划时间,没有计划时间不显示
    static getListDate(task,cla){
        if(task.state=='1'){
            return <span className={cla} ><Icon type="anticon-daishenhe2" />{task.realityEndTime}</span>
        }else if(task.planEndTime){
            return <span className={(new Date(task.planEndTime).toDateString() === new Date().toDateString()?'today '+cla:cla)} ><Icon type="anticon-daishenhe2" />{task.planEndTime}</span>
        }else{
            return "";
        }
    }
    //文件图标
    static fileIcon(file){
        if(file && file.fileFormat){
            if(file.fileFormat.toLowerCase()=='.png'.toLowerCase() ||file.fileFormat.toLowerCase()=='.jpg'.toLowerCase()
            || file.fileFormat.toLowerCase()=='.jpeg'.toLowerCase() || file.fileFormat.toLowerCase()=='.gif'.toLowerCase()){
                return <img src={file.shrinkUrl}  />
            }else if(file.fileFormat.toLowerCase()=='.txt'.toLowerCase()){
                return <svg  aria-hidden="true"><use xlinkHref="#anticon-TXT"></use></svg>
            }else if(file.fileFormat.toLowerCase()=='.dwg'.toLowerCase()){
                return <svg  aria-hidden="true"><use xlinkHref="#anticon-DWG"></use></svg>
            }else if(file.fileFormat.toLowerCase()=='.sql'.toLowerCase()){
                return <svg  aria-hidden="true"><use xlinkHref="#anticon-sql"></use></svg>
            }else if(file.fileFormat.toLowerCase()=='.psd'.toLowerCase()){
                return <svg  aria-hidden="true"><use xlinkHref="#anticon-psd"></use></svg>
            }else if(file.fileFormat.toLowerCase()=='.rar'.toLowerCase()||
                file.fileFormat.toLowerCase()=='.zip'.toLowerCase() || file.fileFormat.toLowerCase()=='.7z'.toLowerCase()
            || file.fileFormat.toLowerCase()=='.tar'.toLowerCase()){
                return <svg  aria-hidden="true"><use xlinkHref="#anticon-other"></use></svg>
            }else if(file.fileFormat.toLowerCase()=='.pdf'.toLowerCase()){
                return <svg  aria-hidden="true"><use xlinkHref="#anticon-pdf"></use></svg>
            }else if(file.fileFormat.toLowerCase()=='.html'.toLowerCase() || file.fileFormat.toLowerCase()=='.jsp'.toLowerCase()
        ||file.fileFormat.toLowerCase()=='.asp'.toLowerCase()||file.fileFormat.toLowerCase()=='.php'.toLowerCase()){
                return <svg  aria-hidden="true"><use xlinkHref="#anticon-html"></use></svg>
            }else if(file.fileFormat.toLowerCase()=='.exe'.toLowerCase()){
                return <svg  aria-hidden="true"><use xlinkHref="#anticon-exe"></use></svg>
            }else if(file.fileFormat.toLowerCase()=='.dwt'.toLowerCase() ||file.fileFormat.toLowerCase()=='.dwg'.toLowerCase()
            ||file.fileFormat.toLowerCase()=='.dxf'.toLowerCase() ||file.fileFormat.toLowerCase()=='.dws'.toLowerCase()
            ||file.fileFormat.toLowerCase()=='.dws'.toLowerCase()){
                return <svg  aria-hidden="true"><use xlinkHref="#anticon-CAD"></use></svg>
            }else if(file.fileFormat.toLowerCase()=='.doc'.toLowerCase() || file.fileFormat.toLowerCase()=='.docx'.toLowerCase()
        || file.fileFormat.toLowerCase()=='.xls'.toLowerCase() || file.fileFormat.toLowerCase()=='.xlsx'.toLowerCase()){
                return <svg  aria-hidden="true"><use xlinkHref="#anticon-wps"></use></svg>
            }else if(file.fileFormat.toLowerCase()=='.ppt'.toLowerCase() || file.fileFormat.toLowerCase()=='.pptx'.toLowerCase()){
                return <svg  aria-hidden="true"><use xlinkHref="#anticon-ppt"></use></svg>
            }else{
                return <svg  aria-hidden="true"><use xlinkHref="#anticon-wenjian1"></use></svg>
            }
        }
    }
    static userPhoto(user,classname){
        if(user && user.photo){
            return <img className={classname} style={{maxHeight:'2rem',maxWidth:'2rem'}} src={user.photo} />
        }else{
            return user.nickname
        }
    }
}