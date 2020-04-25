import React, { Component } from "react";
import { bindActionCreators } from "redux";
import withRedux from "next-redux-wrapper";
import {
  Icon,
  Toast,
  TextareaItem,
  Button,
  Accordion,
  List
} from "antd-mobile";

import { initStore } from "../store";
import * as labelAction from "../actions/label";
import Loading from "./Loading";
import stylesheet from "styles/components/tag.scss";
import utils from "../utils/utils";
import Friendly from "./Friendly";

/*
 * （选填）selectList:[{id:'',labelname:'',color:'',...}] 选中的标签ID，数组格式，可以传多个
 * （必填）closedCallBack()：当点击关闭按钮时的回调
 * （必填）selectedCallBack(labs)  选中后的回调，labs:[{id:'',labelname:'',color:''}]
 * （选填）type:'2'  默认为2，2为标签，如果传3，则为项目分类
 * （选填）canAdd:false 是否可以创建标签，默认不能新创建
 * */

class Tag extends Component {
  constructor(props) {
    super(props);
    this.state = {
      labeLoading: false,
      projectTypeLoading: false,
      addLabelLoading: false,
      addProjectLoading: false,
      labelData: [],
      labelIndex: "0",
      tagListShow: false,

      alertModalShow: false,
      alertModal: {
        txt: "",
        inputTxt: "",
        yesBut: "",
        noBut: ""
      },
      tagList: []
    };
  }

  componentWillMount() {
    if (this.props.type == "3") {
      this.props.getProjectTypeList(() => {
        this.setState({ projectTypeLoading: true });
      });
    } else {
      this.props.getLabelListByUser(() => {
        this.setState({ labeLoading: true });
      });
    }
  }

  componentDidMount() {
    utils.butAnimate();
    if (this.props.selectList) {
      this.setState({
        tagList: JSON.parse(JSON.stringify(this.props.selectList))
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectList) {
      this.setState({
        tagList: JSON.parse(JSON.stringify(nextProps.selectList))
      });
    }
    if (this.state.labeLoading && nextProps.labelList) {
      if (nextProps.labelList.success) {
        let data = nextProps.labelList.data;
        this.setState({ labeLoading: false, labelData: data });
      } else {
        Toast.fail(nextProps.labelList.errmsg);
      }
    } else if (this.state.addLabelLoading && nextProps.addLabelList) {
      if (nextProps.addLabelList.success) {
        Toast.success("添加成功");
        this.setState({ addLabelLoading: false });
      } else {
        Toast.fail(nextProps.addLabelList.errmsg);
      }
    } else if (this.state.projectTypeLoading && nextProps.projectTypeList) {
      if (nextProps.projectTypeList.success) {
        let data = nextProps.projectTypeList.data;
        this.setState({ projectTypeLoading: false, labelData: data.labels });
      } else {
        Toast.fail(nextProps.projectTypeList.errmsg);
      }
    } else if (this.state.addProjectLoading && nextProps.addProjectTypeList) {
      if (nextProps.addProjectTypeList.success) {
        Toast.success("添加成功");
        this.setState({ addProjectLoading: false });
      } else {
        Toast.fail(nextProps.addProjectTypeList.errmsg);
      }
    }
  }

  componentDidUpdate() {
    utils.butAnimate();
  }
  //点击返回一级下标
  labelClickTwo(id, Index) {
    const { labelData } = this.state;
    var that = this;
    for (let i = 0; i < labelData.length; i++) {
      let item = labelData[i];
      if (item.id == id) {
        that.setState({ labelIndex: i });
        break;
      }
    }
  }
  //点击标签返回标签
  tagClick(lab, color) {
    const { tagList } = this.state;
    let index = -1;
    tagList.map((item, i) => {
      if (item.id === lab.id) {
        index = i;
        return false;
      }
    });
    if (index !== -1) {
      tagList.splice(index, 1);
    } else {
      tagList.push(lab);
      lab.color = color;
    }
    this.setState({ tagList: tagList });
  }
  //添加标签弹框
  alertModal(txt, alertTxt, yesBut, noBut) {
    let { alertModalShow, alertModal } = this.state;
    alertModal.txt = txt;
    alertModal.alertTxt = alertTxt;
    alertModal.yesBut = yesBut;
    alertModal.noBut = noBut;
    alertModalShow = true;
    this.setState({ alertModalShow: alertModalShow, alertModal: alertModal });
  }
  //添加标签
  addLabel() {
    const { labelData, labelIndex, greateLabelName } = this.state;
    let pid = labelData[labelIndex].id;
    let name = greateLabelName;
    let data = { labelname: name, color: "" };
    if (this.props.type == "3") {
      this.props.addProjectType(data, pid, () => {
        this.setState({ addProjectLoading: true });
        this.props.getProjectTypeList(() => {
          this.setState({ projectTypeLoading: true });
        });
      });
    } else {
      this.props.addLabel(data, pid, () => {
        this.setState({ addLabelLoading: true });
        this.props.getLabelListByUser(() => {
          this.setState({ labeLoading: true });
        });
      });
    }
  }

  clearTag() {
    this.setState({ tagList: [] });
  }

  render() {
    const {
      labelData,
      tagList,
      labeLoading,
      alertModalShow,
      alertModal,
      greateLabelName,
      projectTypeLoading
    } = this.state;
    let { canAdd } = this.props;
    if (!canAdd) {
      canAdd = false;
    }
    return (
      <div className="tagSelect">
        <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
        <Loading show={labeLoading || projectTypeLoading} />
        <div className="label">
          {labelData && labelData.length > 0 ? (
            labelData.map((item, i) => {
              return (
                <div className="labelBox" key={item.id}>
                  <div className="title">
                    <span
                      className={
                        "square " +
                        utils.getTagColorByColorCode("1", item.color)
                      }
                    />
                    {item.parentList && item.parentList.length > 0 ? (
                      <h3>{item.labelname}</h3>
                    ) : (
                      ""
                    )}
                    {/* {canAdd ?
										<Icon type="plus" className="plus" onClick={() => { this.labelClickTwo(item.id, i); this.alertModal(item.labelname, '填写内容', '保存', '取消') }} />
										:
										<Icon type="down" className="down" />
									} */}
                  </div>
                  <div className="tagBox">
                    <ul>
                      {item.parentList
                        ? item.parentList.map((tim, index) => {
                            return (
                              <li key={index}>
                                <span
                                  className="textMore"
                                  className={
                                    tagList.filter(val => val.id === tim.id)
                                      .length > 0
                                      ? "textMore " +
                                        utils.getTagColorByColorCode(
                                          "1",
                                          item.color
                                        )
                                      : "textMore " +
                                        utils.getTagColorByColorCode(
                                          "2",
                                          item.color
                                        )
                                  }
                                  onClick={() => {
                                    this.tagClick(tim, item.color);
                                  }}
                                >
                                  {tim.labelname}
                                </span>
                              </li>
                            );
                          })
                        : ""}
                    </ul>
                  </div>
                </div>
              );
            })
          ) : (
            <Friendly />
          )}
        </div>
        <div className="button">
          <div
            className="cancel"
            onClick={() => {
              this.clearTag();
              this.props.closedCallBack();
            }}
          >
            取消
          </div>
          <div
            className="ok"
            onClick={() => {
              this.props.closedCallBack();
              this.props.selectedCallBack(tagList);
            }}
          >
            确定
          </div>
        </div>
        {alertModalShow ? (
          <div className="alertModal">
            <div className="modal">
              <div className="tit">{alertModal.txt}</div>
              <TextareaItem
                placeholder={alertModal.alertTxt}
                autoHeight
                value={greateLabelName}
                onChange={e => {
                  this.setState({ greateLabelName: e });
                }}
              />
              <Button
                type="primary"
                onClick={() => {
                  this.addLabel();
                  this.setState({ alertModalShow: false });
                }}
              >
                {alertModal.yesBut}
              </Button>
              <Button
                onClick={() => {
                  this.setState({ alertModalShow: false });
                }}
              >
                {alertModal.noBut}
              </Button>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    labelList: state.label.labelList,
    addLabelList: state.label.addLabel,
    projectTypeList: state.label.projectTypeList,
    addProjectTypeList: state.label.addProjectType
  };
}
const mapDispatchToProps = dispatch => {
  return {
    getLabelListByUser: bindActionCreators(
      labelAction.getLabelListByUser,
      dispatch
    ),
    addLabel: bindActionCreators(labelAction.addLabel, dispatch),
    getProjectTypeList: bindActionCreators(
      labelAction.getProjectTypeList,
      dispatch
    ),
    addProjectType: bindActionCreators(labelAction.addProjectType, dispatch)
  };
};
export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(Tag);
