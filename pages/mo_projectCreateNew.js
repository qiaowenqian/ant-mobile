import React, { Component } from "react";
import { bindActionCreators } from "redux";
import {
  List,
  Picker,
  InputItem,
  Icon,
  TextareaItem,
  ImagePicker,
  Toast
} from "antd-mobile";
import withRedux from "next-redux-wrapper";
import Router from "next/router";
import mobileStyle from "antd-mobile/dist/antd-mobile.min.css";

import { initStore } from "../store";

import * as projectAction from "../actions/project";
import * as userAction from "../actions/user";
import * as cacheAction from "../actions/cache";
import stylesheet from "styles/pages/projectCreateNew.scss";
import utils from "../utils/utils";
import Dingtalk from "../utils/dingtalk";
import Storage from "../utils/storage";
import Tag from "../components/Tag";
function isEqual(arr1, arr2) {
  return JSON.stringify(arr1.sort()) === JSON.stringify(arr2.sort());
}

const Item = List.Item;
const Brief = Item.Brief;
// 图标
const iconList = [
  "1000",
  "1001",
  "1002",
  "1003",
  "1004",
  "1005",
  "1006",
  "1007",
  "1008",
  "1009",
  "1010",
  "1011",
  "1012",
  "1013",
  "1014",
  "1015",
  "1016",
  "1017",
  "1018",
  "1019",
  "1020"
];
const proPower = [
  {
    label: "团队所有人可见",
    value: "1"
  },
  {
    label: "项目成员可见",
    value: "0"
  }
];
/*
 * （选填） projectId:''                         // 如果没传，就是新创建项目，如果传了，就是项目设置
 * （必填）jurisdiction          // 是否有权限
 */

class projectCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectCreateInfo: {
        category: "0",
        id: "",
        memberofpros: [],
        opentype: "0",
        proname: "",
        proremark: "",
        attstr04: "#pro-myfg-1020", //项目图标
        antPrefType: {
          assignPerf: "0",
          confirmPerf: "0",
          createPerf: "0",
          delFlag: "0",
          finishPerf: "100.00",
          finishTqPerf: "100.00",
          overDiscount: "100.00"
        },
        jurisdiction: false,
        createPer: ["1", "2", "3"], // 创建任务权限  0团队所有人 1项目负责人 2项目管理员 3项目成员 4任务创建人 5指派人 6负责人 7确认人
        modifyPer: ["1", "2", "3"], // 编辑任务权限  0团队所有人 1项目负责人 2项目管理员 3项目成员 4任务创建人 5指派人 6负责人 7确认人
        deletePer: ["1", "2"], // 删除任务权限  0团队所有人 1项目负责人 2项目管理员 3项目成员 4任务创建人 5指派人 6负责人 7确认人
        labelIds: [] //[id,id] 项目分类id集合(数组)
      },
      condition: {
        group: "evolve",
        menuType: "allperson" // 默认公开所有人可见的
      },
      allper: "项目成员可见",
      moreProPicShow: false,
      proNameLength: 0,
      projectId: "",
      projectInfoLoading: false,
      createProjectAllLoading: false,
      tagSelect: false,
      tagList: [],
      files: []
    };
  }
  onChange = (files, type, index) => {
    console.log(files, type, index);
    this.setState({
      files
    });
  };
  componentDidMount() {
    const user = Storage.getSession("user");
    if (user && user.userid) {
      if (this.props.url.query.projectId) {
        this.setState({
          projectId: this.props.url.query.projectId,
          projectInfoLoading: true
        });
        this.getProjectCreateInfo(this.props.url.query.projectId, () => {});
      }
      if (!this.props.urlData) {
        this.props.setUrlData(encodeURIComponent(location.href.split("#")[0]));
      }
    }
    Dingtalk.authDingJsApi("", this.props.urlData);
    let { projectCreateInfo } = this.state;
    projectCreateInfo.memberofpros = [
      // {
      // 	user: user,
      // 	rtype: "0"
      // },
      // {
      // 	user: user,
      // 	rtype: "1"
      // },
      {
        user: user,
        rtype: "2"
      }
    ];
    this.setState({ projectCreateInfo: projectCreateInfo });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.projectCrateInfo && this.state.projectInfoLoading) {
      if (nextProps.projectCrateInfo.success) {
        const { projectCreateInfo, tagList } = this.state;
        projectCreateInfo.id = nextProps.projectCrateInfo.data.ant.id;
        projectCreateInfo.proname = nextProps.projectCrateInfo.data.ant.proname;
        projectCreateInfo.proremark =
          nextProps.projectCrateInfo.data.ant.proremark;
        projectCreateInfo.memberofpros = nextProps.projectCrateInfo.data.users;
        projectCreateInfo.opentype =
          nextProps.projectCrateInfo.data.ant.opentype;
        if (nextProps.projectCrateInfo.data.ant.opentype == "1") {
          this.setState({
            allper: "团队所有人可见"
          });
        }
        if (projectCreateInfo.attstr04 === "") {
          projectCreateInfo.attstr04 = "#pro-myfg-1020";
        } else {
          projectCreateInfo.attstr04 =
            nextProps.projectCrateInfo.data.ant.attstr04;
        }
        //jurisdiction
        projectCreateInfo.jurisdiction =
          nextProps.projectCrateInfo.data.ant.setUpButton;
        //保存pc权限值
        projectCreateInfo.createPer =
          nextProps.projectCrateInfo.data.ant.createPer;
        projectCreateInfo.modifyPer =
          nextProps.projectCrateInfo.data.ant.modifyPer;
        projectCreateInfo.deletePer =
          nextProps.projectCrateInfo.data.ant.deletePer;
        //保存pc绩效值
        projectCreateInfo.antPrefType =
          nextProps.projectCrateInfo.data.antPrefType;

        let proNameLength = utils.getByteLen(
          nextProps.projectCrateInfo.data.ant.proname
        );
        this.setState({
          projectCreateInfo: projectCreateInfo,
          proNameLength: proNameLength,
          tagList: nextProps.projectCrateInfo.data.label
        });
        this.setState({ projectInfoLoading: false });
      } else {
        Toast.fail("网络好像不给力哦", 1);
        this.setState({ projectInfoLoading: false });
      }
    } else if (
      nextProps.createProjectAll &&
      this.state.createProjectAllLoading
    ) {
      if (nextProps.createProjectAll.success) {
        const { projectId } = this.state;
        if (projectId === "") {
          Toast.success("创建成功");
        } else {
          Toast.success("保存成功");
        }
      }
      this.setState({ createProjectAllLoading: false });
    }
  }
  componentDidUpdate() {}
  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }
  conditionChange(type, val) {
    let { condition, valContent, projectCreateInfo } = this.state;
    if (type == "opentype") {
      const { projectCreateInfo } = this.state;
      if (val == 0) {
        //选择了项目内成员，先判断用户的选择是不是默认值在做改变
        if (isEqual(projectCreateInfo.createPer, ["0"])) {
          projectCreateInfo.createPer = ["1", "2", "3"];
        }
        if (isEqual(projectCreateInfo.modifyPer, ["0"])) {
          projectCreateInfo.modifyPer = ["1", "2", "3"];
        }
        if (isEqual(projectCreateInfo.deletePer, ["1", "2"])) {
          projectCreateInfo.deletePer = ["1", "2"];
        }
      } else {
        //选择了全部成员先判断用户的选择是不是默认值在做改变
        if (isEqual(projectCreateInfo.createPer, ["1", "2", "3"])) {
          projectCreateInfo.createPer = ["0"];
        }
        if (isEqual(projectCreateInfo.modifyPer, ["1", "2", "3"])) {
          projectCreateInfo.modifyPer = ["0"];
        }
        if (isEqual(projectCreateInfo.deletePer, ["1", "2"])) {
          projectCreateInfo.deletePer = ["1", "2"];
        }
      }
      projectCreateInfo[type] = val;
      if (val == "0") {
        valContent = "项目成员可见";
      } else {
        valContent = "团队所有人可见";
      }
      this.setState({
        allper: valContent,
        condition: condition,
        projectCreateInfo: projectCreateInfo
      });
    }
  }
  // 选择项目图标
  onChoosePic(val) {
    const { projectCreateInfo } = this.state;
    projectCreateInfo.attstr04 = val;
    this.setState({
      projectCreateInfo: projectCreateInfo,
      moreProPicShow: false
    });
  }
  // 点击展开收起图标
  swithProPic() {
    const { moreProPicShow } = this.state;
    this.setState({ moreProPicShow: !moreProPicShow });
  }
  projectUpate(text, type) {
    let { projectCreateInfo, proNameLength } = this.state;
    projectCreateInfo[type] = text;
    if (type === "proname") {
      proNameLength = utils.getByteLen(text.substring(0, 30));
      this.setState({ proNameLength: proNameLength });
    }
    this.setState({ projectCreateInfo: projectCreateInfo });
  }
  // 保存项目
  saveProject() {
    const { projectCreateInfo, projectId } = this.state;
    this.setState({ createProjectAllLoading: true });
    this.props.createProject(projectCreateInfo, data => {
      // this.props.sav
      if (data.success) {
        if (data.data) {
          // debugger;
          if (projectId == "") {
            this.updataProjectInfo(data.data.id, 1);
          } else {
            this.updataProjectInfo(data.data.id, 0);
          }
        }
      } else {
        Toast.fail(data.errmsg);
      }
      this.setState({ projectCreateInfo: projectCreateInfo });
    });
  }
  updataProjectInfo(projectId, isadd) {
    this.props.getProjectCreateInfoById2(projectId, data => {
      if (data.success) {
        if (data.data) {
          this.props.setUpdataProjectListAtCache({
            projectId: isadd ? "" : projectId,
            data: data.data
          });
          Router.push(Dingtalk.setDdNavColor("/mo_project?onload=true"));
        }
      }
    });
  }
  // 根据ID查询数据
  getProjectCreateInfo(id) {
    this.setState({ projectInfoLoading: true });
    this.props.getProjectCreateInfoById(id);
  }

  //选人
  setPerson(title, type, multiple) {
    title = "请选择" + title;
    let { projectCreateInfo } = this.state;
    let selectUsers = [];
    let oldSelectUserIds = [];
    projectCreateInfo.memberofpros.map((item, i) => {
      if (item.rtype === type && item.delete != "1") {
        selectUsers.push(item.user);
        oldSelectUserIds.push(item.user.userid);
      }
    });
    console.log("本来选中的人:", selectUsers);
    Dingtalk.selectUser(
      selectUsers,
      title,
      users => {
        if (users && users.length > 0) {
          if (type == "2") {
            let bb = true;
            projectCreateInfo.memberofpros.map((item, i) => {
              if (item.rtype == "2") {
                projectCreateInfo.memberofpros[i].user = {
                  userid: users[0].emplId,
                  name: users[0].name
                };
                bb = false;
              }
            });
            if (bb) {
              projectCreateInfo.memberofpros.push({
                user: {
                  userid: item.emplId,
                  name: item.name
                },
                rtype: type
              });
            }
          } else {
            let selectUserIds = [];
            if (users && users.length > 0) {
              console.log(oldSelectUserIds, "oldSelectUserIds");
              users.map(item => {
                selectUserIds.push(item.emplId);
                if (oldSelectUserIds.indexOf(item.emplId) === -1) {
                  projectCreateInfo.memberofpros.push({
                    user: {
                      userid: item.emplId,
                      name: item.name
                    },
                    rtype: type
                  });
                  console.log(item, "添加的user");
                } else {
                  projectCreateInfo.memberofpros.map(it => {
                    if (
                      it.userid == item.emplId &&
                      type == it.rtype &&
                      it.delete == "1"
                    ) {
                      it.delete = "";
                      console.log(it, "删除后添加的user");
                    }
                  });
                }
              });
            }
            console.log(selectUserIds, "selectUserIds");
            projectCreateInfo.memberofpros.map(item => {
              if (
                selectUserIds.indexOf(item.user.userid) == -1 &&
                type == item.rtype
              ) {
                item.delete = "1";
                console.log(item, "要删除的user");
              }
            });
          }
          this.setState({
            projectCreateInfo: projectCreateInfo
          });
        } else {
          Toast.fail("请选择人员", 3);
        }
      },
      err => {
        console.log(err);
      },
      multiple
    );
  }

  deletePerson(delUser, type) {
    let { projectCreateInfo } = this.state;
    projectCreateInfo.memberofpros.map((item, i) => {
      if (item.rtype === type && delUser.user.userid == item.user.userid) {
        item.delete = "1";
      }
    });
    this.setState({ projectCreateInfo: projectCreateInfo });
  }
  selectTagChange(labs) {
    const { projectCreateInfo, tagList } = this.state;
    let labelIds = labs.map((item, i) => {
      return {
        label: {
          id: item.id,
          labelname: item.labelname,
          color: item.color
        }
      };
    });

    this.setState({
      projectCreateInfo: projectCreateInfo,
      tagList: labelIds
    });
  }

  render() {
    const {
      projectCreateInfo,
      allper,
      moreProPicShow,
      proNameLength,
      projectId,
      createProjectAllLoading,
      tagSelect,
      tagList,
      labelIds,
      files
    } = this.state;
    // let { jurisdiction } = this.props.url.query;
    let reg = /^https/;
    let reg2 = /^http/;
    let jurisdiction = false;
    if (!projectId) {
      jurisdiction = true;
    } else {
      jurisdiction = projectCreateInfo.jurisdiction;
    }
    if (
      !projectCreateInfo.memberofpros ||
      projectCreateInfo.memberofpros.length == 0
    ) {
      projectCreateInfo.memberofpros = [];
    }

    let tagSelectList = [];
    tagList.map((item, i) => {
      tagSelectList.push({
        id: item.label.id,
        labelname: item.label.labelname,
        color: item.label.color
      });
    });
    let projectCreateInfolabelIds = [];
    tagList.map(lab => {
      if (lab.label) {
        projectCreateInfolabelIds.push(lab.label.id);
      }
    });
    projectCreateInfo.labelIds = projectCreateInfolabelIds;
    let newLabelIds = projectCreateInfo.labelIds.filter(
      (element, index, array) => {
        return array.indexOf(element) === index;
      }
    );
    projectCreateInfo.labelIds = newLabelIds;
    return (
      <div className="projectCreate">
        <style
          dangerouslySetInnerHTML={{
            __html: stylesheet
          }}
        />
        <style
          dangerouslySetInnerHTML={{
            __html: mobileStyle
          }}
        />
        {tagSelect ? (
          <Tag
            type="3"
            selectList={tagSelectList}
            closedCallBack={() => {
              this.setState({
                tagSelect: false
              });
            }}
            selectedCallBack={val => {
              this.selectTagChange(val);
            }}
          />
        ) : (
          ""
        )}

        <div className="projectCreateNew">
          <div className="margin_top_16">
            <List multipleLine="true">
              <Item arrow="horizontal">
                <ImagePicker
                  files={files}
                  onChange={this.onChange}
                  onImageClick={(index, fs) => console.log(index, fs)}
                  selectable={files.length < 1}
                  accept="image/gif,image/jpeg,image/jpg,image/png"
                  multiple={false}
                  length="1"
                />
                <TextareaItem rows="3" style={{ paddingLeft: "100px" }} />
              </Item>
              <Item
                thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                arrow="horizontal"
                onClick={() => {}}
              >
                My wallet
              </Item>
            </List>
          </div>
          <div className="margin_top_16">
            <List>
              <Item
                thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                arrow="horizontal"
                onClick={() => {}}
              >
                My wallet
              </Item>
              <Item
                thumb="https://zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png"
                onClick={() => {}}
                arrow="horizontal"
              >
                My Cost Ratio
              </Item>
              <Item
                thumb="https://zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png"
                onClick={() => {}}
                arrow="horizontal"
              >
                My Cost Ratio
              </Item>
            </List>
          </div>
          <div className="margin_top_16">
            <List>
              <Item
                thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                arrow="horizontal"
                onClick={() => {}}
              >
                My wallet
              </Item>
            </List>
          </div>
        </div>
        {/* <div className="createProject">
          <div className="content creaProject">
            <List>
              {jurisdiction ? (
                <div className="projectcount">
                  <InputItem
                    placeholder="填写项目名称"
                    className="projectName"
                    maxLength="100"
                    value={projectCreateInfo.proname.substring(0, 30)}
                    onChange={e => this.projectUpate(e, "proname")}
                  />
                  <span className="count">{proNameLength}</span>
                  <i className="countEnd">/30</i>
                </div>
              ) : (
                <div className="projectcount proNameLook">
                  {projectCreateInfo.attstr04 ? (
                    reg.test(projectCreateInfo.attstr04) ||
                    reg2.test(projectCreateInfo.attstr04) ? (
                      <img
                        src={projectCreateInfo.attstr04}
                        className="pro-icon"
                        style={{
                          borderRadius: "50%",
                          marginTop: "14px"
                        }}
                      />
                    ) : (
                      <svg className="pro-icon" aria-hidden="true">
                        <use xlinkHref={projectCreateInfo.attstr04} />
                      </svg>
                    )
                  ) : (
                    <svg className="pro-icon" aria-hidden="true">
                      <use xlinkHref="#pro-myfg-1020" />
                    </svg>
                  )}
                  <span>{projectCreateInfo.proname}</span>
                </div>
              )}
              {jurisdiction ? (
                <div className="select person">
                  <div className="pic">
                    {projectCreateInfo.attstr04 ? (
                      reg.test(projectCreateInfo.attstr04) ||
                      reg2.test(projectCreateInfo.attstr04) ? (
                        <img
                          src={projectCreateInfo.attstr04}
                          className="pro-icon"
                          style={{
                            borderRadius: "50%",
                            marginTop: "14px"
                          }}
                        />
                      ) : (
                        <svg className="pro-icon" aria-hidden="true">
                          <use xlinkHref={projectCreateInfo.attstr04} />
                        </svg>
                      )
                    ) : (
                      <svg className="pro-icon" aria-hidden="true">
                        <use xlinkHref="#pro-myfg-1020" />
                      </svg>
                    )}
                  </div>
                  <span className="title">&nbsp;</span>
                  <div className="action" />
                  <div className="iconSvg" onClick={e => this.swithProPic()}>
                    {moreProPicShow ? <Icon type="up" /> : <Icon type="down" />}
                  </div>
                </div>
              ) : (
                ""
              )}
              {moreProPicShow ? (
                <div className="moreProPic">
                  <div className="svnGroup">
                    {iconList && iconList.length > 0
                      ? iconList.map((item, i) => {
                          return (
                            <span
                              key={item}
                              onClick={e =>
                                this.onChoosePic("#pro-myfg-" + item)
                              }
                            >
                              <svg className="pro-icon" aria-hidden="true">
                                <use xlinkHref={"#pro-myfg-" + item} />
                              </svg>
                            </span>
                          );
                        })
                      : ""}
                  </div>
                </div>
              ) : (
                ""
              )}
              <div className="textareacount">
                {jurisdiction ? (
                  <TextareaItem
                    placeholder="请填写项目描述"
                    rows={5}
                    className="textarea"
                    value={projectCreateInfo.proremark}
                    onChange={e => this.projectUpate(e, "proremark")}
                  />
                ) : (
                  <TextareaItem
                    placeholder="请填写项目描述"
                    rows={5}
                    disabled
                    className="textarea"
                    style={{
                      color: "#ddd"
                    }}
                    value={
                      projectCreateInfo.proremark
                        ? projectCreateInfo.proremark
                        : "该项目未填写描述"
                    }
                    onChange={e => this.projectUpate(e, "proremark")}
                  />
                )}
              </div>
              {jurisdiction ? (
                <div
                  className="projectType"
                  onClick={() => {
                    this.setState({
                      tagSelect: true
                    });
                  }}
                >
                  <Icon type="anticon-biaoqian" className="icon" />
                  <div className="tit">项目分类</div>
                  <div
                    className="text"
                    style={{
                      height: "auto",
                      display: "block"
                    }}
                  >
                    {tagList.length > 0
                      ? tagList.map((item, i) => {
                          return (
                            <span
                              key={item.id}
                              className={
                                "tag " +
                                utils.getTagColorByColorCode(
                                  "1",
                                  item.label.color
                                )
                              }
                            >
                              {item.label.labelname}
                            </span>
                          );
                        })
                      : "添加"}
                  </div>
                  <Icon
                    type="right"
                    className="iconSvg i aniButGray"
                    onClick={() => {
                      this.setState({
                        tagSelect: true
                      });
                    }}
                  />
                </div>
              ) : (
                <div className="projectType">
                  <Icon type="anticon-biaoqian" className="icon" />
                  <div className="tit">项目分类</div>
                  <div
                    className="text"
                    style={{
                      height: "auto",
                      display: "block"
                    }}
                  >
                    {tagList.length > 0
                      ? tagList.map((item, i) => {
                          return (
                            <span
                              key={item.id}
                              className={
                                "tag " +
                                utils.getTagColorByColorCode(
                                  "1",
                                  item.label.color
                                )
                              }
                            >
                              {item.label.name}
                            </span>
                          );
                        })
                      : ""}
                  </div>
                </div>
              )}
              <div className="select power">
                <Icon type="anticon-ren2" />
                {jurisdiction ? (
                  <Picker
                    data={proPower}
                    extra={allper}
                    onOk={e => this.conditionChange("opentype", e[0])}
                    cols={1}
                    val={projectCreateInfo.opentype}
                    onChange={e => {
                      this.setState({
                        allper: e
                      });
                    }}
                  >
                    <Item arrow="horizontal">项目权限</Item>
                  </Picker>
                ) : (
                  <div
                    style={{
                      flex: "1",
                      textAlign: "right"
                    }}
                  >
                    <span className="projectPower">项目权限</span>
                    {allper}
                  </div>
                )}
              </div>
              <div className="select person">
                <Icon type="anticon-ren2" />
                <span className="title">负责人</span>
                <div className="action">
                  {projectCreateInfo.memberofpros.map((item, i) => {
                    if (item.rtype == "2" && item.delete !== "1") {
                      return (
                        <div
                          className="choosePeople"
                          key={item.user.id + "fzr"}
                        >
                          <span className="textMore">{item.user.name}</span>
                        </div>
                      );
                    }
                  })}
                </div>
                {jurisdiction && (
                  <div
                    className="iconSvg"
                    onClick={() => {
                      if (jurisdiction) {
                        this.setPerson("负责人", "2", false);
                      }
                    }}
                  >
                    <Icon type="right" />
                  </div>
                )}
              </div>
              <div className="select person">
                <Icon type="anticon-ren2" />
                <span className="title">管理员</span>
                <div className="action">
                  {projectCreateInfo.memberofpros.map((item, i) => {
                    if (item.rtype == "1" && item.delete !== "1") {
                      return (
                        <div
                          className="choosePeople"
                          onClick={() => {
                            if (jurisdiction) {
                              this.deletePerson(item, "1");
                            }
                          }}
                          key={item.user.id + "gly"}
                        >
                          <span className="textMore">{item.user.name}</span>
                          {jurisdiction ? <Icon type="cross" /> : ""}
                        </div>
                      );
                    }
                  })}
                </div>
                {jurisdiction ? (
                  <div
                    className="iconSvg"
                    onClick={() => {
                      if (jurisdiction) {
                        this.setPerson("管理员", "1", true);
                      }
                    }}
                  >
                    <Icon type="right" />
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="select person">
                <Icon type="anticon-ren2" />
                <span className="title">成员</span>
                <div className="action">
                  {projectCreateInfo.memberofpros.map((item, i) => {
                    if (item.rtype == "0" && item.delete !== "1") {
                      return (
                        <div
                          className="choosePeople"
                          onClick={() => {
                            if (jurisdiction) {
                              this.deletePerson(item, "0");
                            }
                          }}
                          key={item.user.id + "cy"}
                        >
                          <span className="textMore">{item.user.name}</span>
                          {jurisdiction ? <Icon type="cross" /> : ""}
                        </div>
                      );
                    }
                  })}
                </div>
                {jurisdiction ? (
                  <div
                    className="iconSvg"
                    onClick={() => {
                      if (jurisdiction) {
                        this.setPerson("成员", "0", true);
                      }
                    }}
                  >
                    <Icon type="right" />
                  </div>
                ) : (
                  ""
                )}
              </div>
            </List>
          </div>
          {jurisdiction ? (
            <div className="button">
              <div
                className={
                  projectCreateInfo.proname !== "" && !createProjectAllLoading
                    ? "save-project"
                    : "save-noproject"
                }
                onClick={() => {
                  if (
                    projectCreateInfo.proname !== "" &&
                    !createProjectAllLoading
                  ) {
                    this.saveProject();
                  }
                }}
              >
                {projectId ? "保存项目" : "创建项目"}
              </div>
            </div>
          ) : (
            ""
          )}
        </div> */}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    projectCrateInfo: state.project.getProjectCreateInfo,
    createProjectAll: state.project.createProjectAll,
    projectDetails: state.project.projectDetails,
    urlData: state.user.urlData
  };
}
const mapDispatchToProps = dispatch => {
  return {
    getProjectCreateInfoById: bindActionCreators(
      projectAction.getProjectCreateInfoById,
      dispatch
    ),
    createProject: bindActionCreators(projectAction.createProject, dispatch),
    projectUpdateAll: bindActionCreators(
      projectAction.projectUpdateAll,
      dispatch
    ),
    setUrlData: bindActionCreators(userAction.setUrlData, dispatch),
    setUpdataProjectListAtCache: bindActionCreators(
      cacheAction.setUpdataProjectListAtCache,
      dispatch
    ),
    getProjectCreateInfoById2: bindActionCreators(
      projectAction.getProjectCreateInfoById2,
      dispatch
    )
  };
};
export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(
  projectCreate
);
