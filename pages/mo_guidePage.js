import { Component } from "react";
import { bindActionCreators } from "redux";
import withRedux from "next-redux-wrapper";
import { Icon, Switch } from "antd-mobile";
import Router from "next/router";
import mobileStyle from "antd-mobile/dist/antd-mobile.min.css";

import { initStore } from "../store";
import stylesheet from "styles/pages/guidePage.scss";
import stylesheet1 from "styles/pages/dingHome.scss";
import stylesheet2 from "styles/pages/projectCreate.scss";
import stylesheet3 from "styles/pages/taskCreate.scss";
import stylesheet4 from "styles/pages/taskDetails.scss";
import MenuBar from "../components/MenuBar";
import Dingtalk from "../utils/dingtalk";
import utils from "../utils/utils";
import * as userAction from "../actions/user";
import Storage from "../utils/storage";

const menuItems = [{ id: "more", text: "？" }];

class guidePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nowPage: "1"
    };
  }

  componentWillMount() {
    Dingtalk.setTitle("蚂蚁分工");
  }

  componentDidMount() {
    const user = Storage.getSession("user");
    if (user && user.userid) {
      if (!this.props.urlData) {
        this.props.setUrlData(encodeURIComponent(location.href.split("#")[0]));
      }
    }
  }

  componentWillUnmount() {}

  componentWillReceiveProps(nextProps) {}

  componentDidUpdate() {}
  blackClick(Page) {
    const { nowPage } = this.state;
    this.setState({ nowPage: Page + 1 });
    if (Page == "4") {
      this.props.guidePage(() => {
        Router.push(Dingtalk.setDdNavColor("/mo_dingHome"));
      });
    }
  }
  closedClick(e) {
    e.stopPropagation();
    e.preventDefault();
    this.props.guidePage(() => {
      Router.push(Dingtalk.setDdNavColor("/mo_dingHome"));
    });
  }
  render() {
    const { nowPage } = this.state;
    if (nowPage == "1") {
      return (
        <div className="pubLayout dingHome">
          <style dangerouslySetInnerHTML={{ __html: stylesheet1 }} />
          <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
          <style dangerouslySetInnerHTML={{ __html: mobileStyle }} />

          <div
            className="black"
            onClick={() => {
              this.blackClick(1);
            }}
          >
            <div className="start">
              <span>1.开始</span>
              <span
                onClick={e => {
                  this.closedClick(e);
                }}
              >
                关闭
              </span>
            </div>
            <div className="create">
              <span>创建任务</span>
              <span>创建项目</span>
              <div className="line" />
              <div className="box" />
            </div>
          </div>
          <div>
            <div className="content dingHome-box">
              <div className="dingHome-top">
                <div className="wait">
                  <div>
                    我的待办
                    <p>
                      共<span>135</span>项
                    </p>
                  </div>
                </div>
                <div className="wait-pm">
                  <p>
                    待完成
                    <span className="span-one">67</span>
                  </p>
                  <p className="wait-pm-center">
                    待确认
                    <span className="span-two">23</span>
                  </p>
                  <p className="wait-pm-last">
                    待指派
                    <span className="span-three">45</span>
                  </p>
                </div>
              </div>
              <div className="dingHome-bottom">
                <div className="bottom-title">
                  <p>我的通知</p>
                  <font>
                    未读<span>0</span>条
                  </font>
                  <Icon type="anticon-shuaxin" />
                </div>
                <div className="talkbox">
                  <div className="pp">暂无通知</div>
                </div>
              </div>
            </div>
            <div className="menuBox">
              <MenuBar pathName="/mo_dingHome" />
            </div>
          </div>
        </div>
      );
    } else if (nowPage == "2") {
      return (
        <div className="projectCreate">
          <style dangerouslySetInnerHTML={{ __html: stylesheet2 }} />
          <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
          <style dangerouslySetInnerHTML={{ __html: mobileStyle }} />

          <div
            className="black"
            onClick={() => {
              this.blackClick(2);
            }}
          >
            <div className="start">
              <span>2.创建项目</span>
              <span
                onClick={e => {
                  this.closedClick(e);
                }}
              >
                关闭
              </span>
            </div>
            <div className="project1">填写项目名称等信息</div>
            <div className="project2">点“创建项目”完成创建</div>
          </div>
          <div className="createProject">
            <div className="content creaProject">
              <div className="projectcount">
                <div
                  className="projectName"
                  style={{ color: "#666", padding: "0 0 0 15px" }}
                >
                  示例项目
                </div>
                <span className="count">4</span>
                <i className="countEnd">/50</i>
              </div>
              <div className="select person">
                <div className="pic">
                  <svg className="pro-icon" aria-hidden="true">
                    <use xlinkHref="#pro-myfg-1020" />
                  </svg>
                </div>
                <span className="title">&nbsp;</span>
                <div className="action" />
                <div className="iconSvg">
                  <Icon type="down" />
                </div>
              </div>
              <div className="textareacount">
                <div className="descLook" style={{ color: "#c7c7c7" }}>
                  请填写项目描述
                </div>
              </div>

              <div className="projectType">
                <Icon type="anticon-biaoqian" className="icon" />
                <div className="tit">项目分类</div>
                <div
                  className="text"
                  style={{ height: "auto", display: "block" }}
                >
                  添加
                </div>
                <Icon type="right" className="iconSvg i aniButGray" />
              </div>
              <div className="select power" style={{ display: "flex" }}>
                <Icon type="anticon-ren2" />
                <div style={{ flex: "1", textAlign: "right" }}>
                  <span className="projectPower">项目权限</span>
                  项目成员可见
                </div>
                <Icon
                  type="right"
                  style={{
                    float: "right",
                    color: "#c7c7c7",
                    width: "20px",
                    height: "20px",
                    marginTop: "11px"
                  }}
                />
              </div>
              <div className="select person">
                <Icon type="anticon-ren2" />
                <span className="title">负责人</span>
                <div className="action">
                  <div className="choosePeople">
                    <span className="textMore">高海洋</span>
                  </div>
                </div>
                <div className="iconSvg">
                  <Icon type="right" />
                </div>
              </div>
              <div className="select person">
                <Icon type="anticon-ren2" />
                <span className="title">管理员</span>
                <div className="action">
                  <div className="choosePeople">
                    <span className="textMore">高海洋</span>
                    <Icon type="cross" />
                  </div>
                </div>
                <div className="iconSvg">
                  <Icon type="right" />
                </div>
              </div>
              <div className="select person">
                <Icon type="anticon-ren2" />
                <span className="title">成员</span>
                <div className="action">
                  <div className="choosePeople">
                    <span className="textMore">高海洋</span>
                    <Icon type="cross" />
                  </div>
                </div>
                <div className="iconSvg">
                  <Icon type="right" />
                </div>
              </div>
            </div>
            <div className="button">
              <div className="save-project">创建项目</div>
            </div>
          </div>
        </div>
      );
    } else if (nowPage == "3") {
      return (
        <div className="pubLayout taskCreate">
          <style dangerouslySetInnerHTML={{ __html: stylesheet3 }} />
          <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
          <style dangerouslySetInnerHTML={{ __html: mobileStyle }} />

          <div
            className="black"
            onClick={() => {
              this.blackClick(3);
            }}
          >
            <div className="start">
              <span>3.创建任务</span>
              <span
                onClick={e => {
                  this.closedClick(e);
                }}
              >
                关闭
              </span>
            </div>
            <div className="task">填写任务标题、负责人、确认人等</div>
            <div className="project2">点“保存任务”完成创建</div>
          </div>
          <div className="from">
            <div className="pubDiv">
              <Icon type="anticon-xiangmuguanli" className="icon" />
              <div className="tit">项目</div>
              <div className="text" style={{ margin: "0 5px 0 15px" }}>
                <span className="proName textMore">示例项目</span>
              </div>
              <Icon type="right" className="icon i aniButGray" />
            </div>
            <div className="pubDiv">
              <div className="inputDiv input">示例项目</div>
              <div
                className="textCount"
                style={{ height: "30px", lineHeight: "30px" }}
              >
                <span>4</span>/100
              </div>
            </div>
            <div className="pubDiv">
              <div style={{ color: "#c7c7c7", flex: "1", height: "140px" }}>
                请填写任务描述
              </div>
              <Icon type="anticon-tianjia" className="addFileIcon aniButGray" />
              <span
                style={{
                  position: "absolute",
                  top: "137px",
                  right: "52px",
                  color: "#fc4142"
                }}
              >
                0
              </span>
              <span
                style={{
                  position: "absolute",
                  top: "137px",
                  right: "20px",
                  color: "#ececec"
                }}
              >
                /100
              </span>
            </div>
            <div className="pubDiv">
              <Icon type="anticon-biaoqian" className="icon" />
              <div className="tit">标签</div>
              <div
                className="text"
                style={{ height: "auto", display: "block" }}
              >
                添加
              </div>
              <Icon type="right" className="icon i aniButGray" />
            </div>
            <div className="pubDiv">
              <Icon
                type="anticon-ren2"
                className="icon"
                style={{ margin: "6px 10px 0 0" }}
              />
              <div
                className="tit"
                style={{ height: "30px", lineHeight: "30px" }}
              >
                负责人
              </div>
              <div
                className="text"
                style={{ height: "30px", lineHeight: "30px" }}
              >
                <span className="user">海洋</span>
              </div>
              <Icon type="right" className="icon i aniButGray" />
            </div>
            <div className="pubDiv">
              <Icon
                type="anticon-ren2"
                className="icon"
                style={{ margin: "6px 10px 0 0" }}
              />
              <div
                className="tit"
                style={{ height: "30px", lineHeight: "30px" }}
              >
                确认人
              </div>
              <div
                className="text"
                style={{ height: "30px", lineHeight: "30px" }}
              >
                <span
                  onClick={() => {
                    this.selectUser([], "确认人");
                  }}
                >
                  未安排
                </span>
              </div>
              <Icon
                type="right"
                className="icon i aniButGray"
                style={{ margin: "6px 0 0 0" }}
                onClick={() => {
                  this.selectUser([], "确认人");
                }}
              />
            </div>
            <div className="pubDiv">
              <Icon type="anticon-xuanzeriqi" className="icon" />
              <div className="tit">完成日期</div>
              <div className="text" style={{ padding: "0" }}>
                <div>
                  请选择
                  <Icon
                    type="right"
                    className="icon i aniButGray"
                    style={{ float: "right" }}
                  />
                </div>
              </div>
            </div>
            <div className="pubDiv">
              <Icon type="anticon-xuanzeriqi" className="icon" />
              <div className="tit">计划工期</div>
              <div className="text">
                <div className="editable">1</div>
                <span>天</span>
              </div>
            </div>
            <div className="pubDiv">
              <Icon type="anticon-jixiao" className="icon" />
              <div className="tit">任务绩效</div>
              <div className="text">
                <div className="editable">0</div>
              </div>
            </div>
            <div className="pubDiv">
              <Icon type="anticon-icon-class-a" className="icon" />
              <div className="tit">优先级</div>
              <div className="text" style={{ padding: "0" }}>
                中
              </div>
            </div>
            <div style={{ clear: "both" }} />
          </div>
          <div className="bigBut blue aniBut">保存任务</div>
        </div>
      );
    } else if (nowPage == "4") {
      return (
        <div className="pubLayout taskDetails">
          <style dangerouslySetInnerHTML={{ __html: stylesheet4 }} />
          <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
          <style dangerouslySetInnerHTML={{ __html: mobileStyle }} />

          <div
            className="black"
            onClick={() => {
              this.blackClick(4);
            }}
          >
            <div className="start">
              <span>4.任务操作</span>
              <span
                onClick={e => {
                  this.closedClick(e);
                }}
              >
                关闭
              </span>
            </div>
            <div className="task1">创建好的任务可以对任务进行编辑</div>
            <div className="project2">对任务进行“标记完成”</div>
          </div>
          <div className="bread">示例项目</div>
          <div className="from" ref="detailScroll">
            <div className="pubDiv" style={{ padding: "15px 15px 15px 40px" }}>
              <div className="stateNo">1</div>
              <div className="stateStyle">{utils.stateColor("0")}</div>
              <div className="taskName textMore">任务名</div>
              <div className="collect">
                <Icon type="anticon-shoucang" className="collectIcon" />
              </div>
            </div>
            <div className="pubDiv desc cont">
              <div className="descBox">
                <div style={{ color: "#c7c7cc" }}>请填写任务描述</div>
              </div>
              <div className="descTextCount">
                <Icon type="anticon-fujian" className="aniButGray" />
              </div>
            </div>
            <div className="pubDiv">
              <Icon type="anticon-biaoqian" className="icon" />
              <div className="tit">标签</div>
              <div
                className="text"
                style={{
                  height: "auto",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  flexFlow: "wrap"
                }}
              >
                添加
              </div>
              <Icon type="right" className="icon i aniButGray" />
            </div>
            <div className="pubDiv">
              <Icon
                type="anticon-ren2"
                className="icon"
                style={{ margin: "0 10px 0 0" }}
              />
              <div
                className="tit"
                style={{ height: "30px", lineHeight: "30px" }}
              >
                负责人
              </div>
              <div
                className="text"
                style={{ height: "30px", lineHeight: "30px" }}
                onClick={() => {
                  this.selectUser("负责人", "请选择负责人");
                }}
              >
                <span className="user">海洋</span>
                <Icon
                  type="right"
                  className="icon i aniButGray"
                  style={{ margin: "7px 0 0 0", float: "right" }}
                />
              </div>
            </div>
            <div className="pubDiv">
              <Icon
                type="anticon-ren2"
                className="icon"
                style={{ margin: "0 10px 0 0" }}
              />
              <div
                className="tit"
                style={{ height: "30px", lineHeight: "30px" }}
              >
                确认人
              </div>
              <div
                className="text"
                style={{ height: "30px", lineHeight: "30px" }}
              >
                未安排
              </div>
            </div>
            <div className="pubDiv">
              <Icon
                type="anticon-ren2"
                className="icon"
                style={{ margin: "0 10px 0 0" }}
              />
              <div
                className="tit"
                style={{ height: "30px", lineHeight: "30px" }}
              >
                关注人
              </div>
              <div
                className="text"
                style={{ height: "30px", lineHeight: "30px" }}
              >
                点击邀请关注
                <Icon
                  type="right"
                  className="icon i aniButGray"
                  style={{ margin: "7px 0 0 0", float: "right" }}
                />
              </div>
            </div>
            <div className="pubDiv">
              <Icon type="anticon-xuanzeriqi" className="icon" />
              <div className="tit">截止日期</div>
              <div style={{ height: "25px" }} className="text">
                请选择
                <Icon
                  type="right"
                  className="icon i aniButGray"
                  style={{ float: "right" }}
                />
              </div>
            </div>
            <div className="pubDiv">
              <Icon type="anticon-xuanzeriqi" className="icon" />
              <div className="tit">计划工期</div>
              <div className="text">0</div>
              <div
                style={{
                  flex: "0 0 auto",
                  margin: "0 0 0 5px",
                  height: "25px",
                  lineHeight: "24px"
                }}
              >
                天
              </div>
            </div>
            <div className="pubDiv">
              <Icon type="anticon-jixiao" className="icon" />
              <div className="tit">任务绩效</div>
              <div className="text">0</div>
            </div>
            <div className="pubDiv">
              <Icon type="anticon-icon-class-a" className="icon" />
              <div className="tit">优先级</div>
              <div className="text">中</div>
            </div>
            <div className="pubDiv cont">
              <div className="top">
                <Icon type="anticon-lvzhou_fenzhichangsuo" className="icon" />
                <div className="tit">子任务</div>
                <div className="text">
                  0/0
                  <Icon type="right" className="icon i aniButGray" />
                </div>
              </div>
              <div className="addshow">
                <Icon type="anticon-tianjia" className="aniButGray" />
                <div className="cuiban aniButGray">全部催办</div>
                <span>PC端可批量导入创建子任务</span>
              </div>
            </div>
            <div className="pubDiv cont">
              <div className="top">
                <Icon type="anticon--qianzhi" className="icon" />
                <div className="tit">前序任务</div>
                <div className="text" />
                <Icon type="right" className="icon i aniButGray" />
              </div>
              <div className="add" style={{ padding: "15px 0 0 0" }}>
                <span className="cuiban" style={{ float: "left" }}>
                  全部催办
                </span>
                PC端可添加或移除前序任务
              </div>
            </div>
            <div className="pubDiv cont">
              <div className="top">
                <Icon type="anticon--houzhi" className="icon" />
                <div className="tit">后序任务</div>
                <div className="text" />
                <Icon type="right" className="icon i aniButGray" />
              </div>
              <div className="add" style={{ padding: "15px 0 0 0" }}>
                PC端可添加或移除后序任务
              </div>
            </div>
            <div className="pubDiv cont">
              <div className="top">
                <Icon type="anticon-fujian" className="icon" />
                <div className="tit">文件</div>
                <div className="text">
                  <span className="aniButGray">添加</span>
                  <Icon type="right" className="icon i aniButGray" />
                </div>
              </div>
            </div>
            <div className="pubDiv">
              <Icon type="anticon-xiaoshoudongtai" className="icon" />
              <div className="tit">讨论</div>
              <div className="talkNum" style={{ padding: "1px 10px 0 10px" }}>
                <span>0条</span>
                <span className="daily">日志</span>
              </div>
              <Switch color="#1296db" />
            </div>
          </div>
          <div className="buts">
            <div className="but aniBut">
              <Icon type="anticon-discuss" />
              <p>参与讨论</p>
            </div>
            <div className="but aniBut">
              <Icon type="check-circle" />
              <p>标记完成</p>
            </div>
          </div>
        </div>
      );
    } else {
      return <div />;
    }
  }
}

function mapStateToProps(state) {
  return {
    urlData: state.user.urlData
  };
}
const mapDispatchToProps = dispatch => {
  return {
    guidePage: bindActionCreators(userAction.guidePage, dispatch),
    setUrlData: bindActionCreators(userAction.setUrlData, dispatch)
  };
};
export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(
  guidePage
);
