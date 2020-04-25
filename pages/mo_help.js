import React, { Component } from "react";
import {
  Icon,
  Button,
  InputItem,
  Toast,
  List,
  TextareaItem,
  WhiteSpace
} from "antd-mobile";
import mobileStyle from "antd-mobile/dist/antd-mobile.min.css";

import Link from "next/link";
import Router from "next/router";
import Layout from "../components/Layout";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import withRedux from "next-redux-wrapper";
import { initStore } from "../store";
import * as helpAction from "../actions/help";
import * as userAction from "../actions/user";
import Storage from "../utils/storage";
import stylesheet from "../styles/pages/help.scss";
import Dingtalk from "../utils/dingtalk";
import NProgress from "nprogress";
const Item = List.Item;
const Brief = Item.Brief;
/**
 * 帮助中心
 */
class Help1 extends Component {
  static getInitialProps({ req }) {
    const language = req ? req.headers["accept-language"] : navigator.language;
    return {
      language
    };
  }
  constructor(props) {
    super(props);
    this.state = {
      typeList: [],
      typeLoading: false,
      questionListLoading: false,
      questionDescLoading: false,
      helpDesc: {},
      typeShow: true,
      descShow: false,
      alertTxt: "请选择相关分类"
    };
  }
  componentWillReceiveProps(nextProps) {
    if (
      !nextProps.url.query.typeName &&
      !nextProps.url.query.queId &&
      this.state.typeLoading == false
    ) {
      this.props.findTypeList({}, () => {
        this.setState({ typeLoading: true });
      });
    } else if (
      nextProps.url.query.typeName &&
      this.state.questionListLoading == false
    ) {
      let name = nextProps.url.query.typeName;
      this.props.findList(1, { type: name }, () => {
        this.setState({ questionListLoading: true });
      });
    } else if (
      nextProps.url.query.queId &&
      this.state.questionDescLoading == false
    ) {
      let id = nextProps.url.query.queId;
      this.props.getDetailById(id, () => {
        this.setState({ questionDescLoading: true });
      });
    } else if (this.state.typeLoading && nextProps.typeList) {
      if (nextProps.typeList.success) {
        this.setState({
          typeList: nextProps.typeList.data,
          typeShow: true,
          descShow: false,
          alertTxt: "请选择相关分类"
        });
        NProgress.done();
      } else {
        Toast.fail(nextProps.typeList.errmsg);
      }
      this.setState({ typeLoading: false });
    } else if (this.state.questionListLoading && nextProps.list) {
      if (nextProps.list.success) {
        this.setState({
          typeList: nextProps.list.data.list,
          typeShow: true,
          descShow: false,
          alertTxt: "请选择相关问题"
        });
        NProgress.done();
      } else {
        Toast.fail(nextProps.list.errmsg);
      }
      this.setState({ questionListLoading: false });
    } else if (this.state.questionDescLoading && nextProps.helps) {
      if (nextProps.helps.success) {
        this.setState({
          helpDesc: nextProps.helps.data,
          descShow: true,
          typeShow: false,
          alertTxt: nextProps.helps.data.title
        });
        NProgress.done();
      } else {
        Toast.fail(nextProps.helps.errmsg);
      }
      this.setState({ questionDescLoading: false });
    }
  }
  componentWillMount() {
    Dingtalk.setTitle("帮助中心");
  }

  componentDidMount() {
    const user = Storage.getSession("user");
    if (user && user.userid) {
      if (!this.props.url.query.typeName && !this.props.url.query.queId) {
        this.props.findTypeList({}, () => {
          this.setState({ typeLoading: true });
        });
      }
      if (!this.props.urlData) {
        this.props.setUrlData(encodeURIComponent(location.href.split("#")[0]));
      }
    }
  }

  HTMLDecode(text) {
    let temp = document.createElement("div");
    temp.innerHTML = text;
    let output = temp.innerText || temp.textContent;
    temp = null;
    return output;
  }
  showImg(e) {
    if (e.target.nodeName == "IMG") {
      const img = { fileUrlAbsolute: e.target.src };
      Dingtalk.previewImage(img);
    }
  }
  render() {
    const { language } = this.props;
    const { typeList, helpDesc, typeShow, descShow, alertTxt } = this.state;
    let html = "";
    /*if(descShow){
  			html = this.HTMLDecode(helpDesc.content);
  		}  	*/

    return (
      <Layout language={language}>
        <List renderHeader={alertTxt} target="_blank">
          <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
          <style dangerouslySetInnerHTML={{ __html: mobileStyle }} />

          {typeShow
            ? typeList.map((item, i) => {
                if (item.title) {
                  return (
                    <Link
                      href={Dingtalk.setDdNavColor("/mo_help?queId=" + item.id)}
                      key={item.id}
                    >
                      <Item extra="" arrow="horizontal">
                        {item.title}
                      </Item>
                    </Link>
                  );
                } else {
                  return (
                    <Link
                      href={Dingtalk.setDdNavColor(
                        "/mo_help?typeName=" + item.type
                      )}
                      key={item.type}
                    >
                      <Item extra="" arrow="horizontal">
                        {item.type}
                        <span className="lab">({item.count})</span>
                      </Item>
                    </Link>
                  );
                }
              })
            : ""}
          {descShow ? (
            <div
              className="help"
              dangerouslySetInnerHTML={{ __html: helpDesc.content }}
              onClick={e => {
                this.showImg(e);
              }}
            />
          ) : (
            ""
          )}
        </List>
      </Layout>
    );
  }
}
function mapStateToProps(state) {
  return {
    list: state.help.list,
    typeList: state.help.typeList,
    helps: state.help.helps,
    urlData: state.user.urlData
  };
}
const mapDispatchToProps = dispatch => {
  return {
    findList: bindActionCreators(helpAction.findList, dispatch),
    findTypeList: bindActionCreators(helpAction.findTypeList, dispatch),
    getDetailById: bindActionCreators(helpAction.getDetail, dispatch),
    setUrlData: bindActionCreators(userAction.setUrlData, dispatch)
  };
};
export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(Help1);
