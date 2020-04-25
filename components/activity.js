import { Component } from 'react'
import { Icon } from 'antd-mobile'
import Router from 'next/router'
import Dingtalk from '../utils/dingtalk'

import stylesheet from 'styles/components/activity.scss'

/*
 * （必填）msg:''               // 提示内容
 * （必填）okCallBack()         // 确定回调
 * （选填）closeIconClickCallBack() // 关闭图标点击回调
 */

export default class Activity extends Component {
  constructor(props) {
    super(props)
    this.state = {
    };
  }

  componentWillMount() {
  }

  componentUnMount() {
  }

  componentWillReceiveProps(nextProps) {
  }

  render() {
    const { closeIconShow, msg, okButTxt } = this.props;
    return (
      <div className="activityAlert" >
        <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
        <div className="antActivity">
          {closeIconShow ? <div className="ActivityBtnCloseBox"> <span className="ActivityNoWarn" onClick={() => { this.props.closeIcon2ClickCallBack() }}>不再提醒</span> <Icon className="ActivityBtnClose" type="cross" onClick={() => { this.props.closeIconClickCallBack() }} /></div> : ''}
          <p dangerouslySetInnerHTML={{ __html: msg }}></p>
          <div className='ActivityBtnBox'>
            <div className="ActivityBtn" onClick={() => { this.props.okCallBack() }}>{okButTxt ? okButTxt : '确定'}</div>
          </div>
        </div>
      </div>
    )
  }
}