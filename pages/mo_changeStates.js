import { Component } from "react";
import { List, Icon, Toast, Button, TextareaItem } from "antd-mobile";
import Router from "next/router";
import Dingtalk from "../utils/dingtalk";
import stylesheet from "styles/pages/changeStates.scss";
import mobileStyle from "antd-mobile/dist/antd-mobile.min.css";
import utils from "../utils/utils";
import Loading from "../components/Loading";
import * as taskAction from "../actions/task";
/*
 *  (选填) data： 显示的参数
 *              {
 * 					alertTxt:'',
 * 					Icon:'',
 *                  ButTxt:'',
 *                  ButUrl:''              // 如果没有传url，按钮就不显示
 * 				}
 */
export default class StateSuccess extends Component {
  static getInitialProps({ req, store, isServer }) {
    const language = req ? req.headers["accept-language"] : navigator.language;
    return {
      language
    };
  }
  constructor(props) {
    super(props);
    this.state = {
      id: "", //任务Id
      projectId: "", //项目Id
      state: 4, //状态
      taskSignRemarks: "", //信息
      title: "", //标题
      rank: "", //编号
      numbers: "", //编号2
      fileList: [],
      changeStatesLoading: false
    };
  }
  componentWillMount() {}
  componentDidMount() {
    this.setState({
      id: Router.router.query.id,
      projectId: Router.router.query.projectId,
      taskSignRemarks: "",
      title: Router.router.query.title,
      numbers: Router.router.query.numbers,
      rank: Router.router.query.rank
    });
    Dingtalk.setTitle("标记完成");
  }
  // 上传文件 type 0描述文件 3成果文件 1评论文件
  upFiles() {
    let { fileList } = this.state;
    const _this = this;
    Dingtalk.uploadImage(
      result => {
        result.data.map((item, i) => {
          fileList.push(item);
        });
        _this.setState({
          fileList: fileList
        });
      },
      err => {
        Toast.fail(err);
      }
    );
  }
  //附件预览删除组件
  renderPriviewAndDelete() {
    const { fileList } = this.state;
    return (
      <div className="fileSection2">
        {fileList.map(item => {
          return (
            <div className="fileItem" key={item.id}>
              {utils.createFileIcon(item.fileType)}
              <span
                className="fileInfo pointer"
                onClick={() => {
                  Dingtalk.previewImage(item);
                }}
              >
                {item.fileName}
              </span>

              {/* <Icon
                type="delete"
                className="pointer"
                style={{
                  position: "absolute",
                  top: "8px",
                  right: "8px",
                  fontSize: "14px",
                  color: "#bdbdbd"
                }}
                onClick={() => {
                  this.dellTaskOkFile(item.fileId);
                }}
              /> */}
              <Icon
                type="anticon-shanchu"
                className="pointer"
                style={{
                  position: "absolute",
                  top: "7px",
                  right: "8px",
                  color: "#bdbdbd",
                  width: "16px",
                  height: "16px"
                }}
                onClick={() => {
                  this.dellTaskOkFile(item.fileId);
                }}
              />
            </div>
          );
        })}
      </div>
    );
  }
  //删除文件
  dellTaskOkFile(id) {
    let { fileList } = this.state;
    fileList.map((item, i) => {
      if (item.fileId === id) {
        fileList.splice(i, 1);
        this.setState({ fileList: fileList });
        return false;
      }
    });
  }
  //更改状态
  changeState = () => {
    const { id, projectId, taskSignRemarks, fileList } = this.state;
    let data = {
      id: id,
      projectId: projectId,
      state: "1",
      taskSignRemarks: taskSignRemarks,
      fileList: fileList
    };
    this.setState({
      changeStatesLoading: true
    });
    taskAction.updateTaskStateById2(data, () => {
      this.setState(
        {
          changeStatesLoading: false
        },
        () => {
          Router.replace(Dingtalk.setDdNavColor("/mo_taskDetails?id=" + id));
          console.log(Router, "cancle");
        }
      );
    });
  };
  cancleChange() {
    const { id } = this.state;
    Router.replace(Dingtalk.setDdNavColor("/mo_taskDetails?id=" + id));
    console.log(Router, "cancle");
  }
  render() {
    const {
      taskSignRemarks,
      id,
      projectId,
      state,
      title,
      rank,
      numbers,
      changeStatesLoading
    } = this.state;
    return (
      <div className="stateChangeSuccess">
        <Loading show={changeStatesLoading} />
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
        <div className="stateChangeSuccess-content">
          <div className="stateChangeSuccess-content-title">
            <span>
              #{numbers}
              {rank}
            </span>
            <span>{title}</span>
          </div>
          <div className="stateChangeSuccess-content-line" />
          <div className="stateChangeSuccess-content-areatext">
            <TextareaItem
              style={{
                height: "120px"
              }}
              value={taskSignRemarks}
              placeholder="输入完成情况说明"
              rows="5"
              onChange={value => {
                this.setState({
                  taskSignRemarks: value
                });
              }}
              prefixListCls="stateChangeSuccess-content-areatext"
            />
          </div>
          <div className="stateChangeSuccess-content-line2" />
          <div
            className="stateChangeSuccess-content-listinfo"
            onClick={() => {
              this.upFiles();
            }}
          >
            添加成果文件
          </div>
          <div className="stateChangeSuccess-content-listdetail">
            {this.renderPriviewAndDelete()}
          </div>
        </div>
        <div className="stateChangeSuccess-foot">
          <Button
            className="stateChangeSuccess-foot-button stateChangeSuccess-foot-buttonLeft forbiddenCopy"
            onClick={() => {
              this.cancleChange();
            }}
          >
            取消
          </Button>
          <Button
            type="primary"
            className="stateChangeSuccess-foot-button stateChangeSuccess-foot-buttonRight forbiddenCopy"
            onClick={this.changeState}
          >
            标记完成
          </Button>
        </div>
      </div>
    );
  }
}
