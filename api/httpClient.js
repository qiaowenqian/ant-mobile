import React from "react";
import FetchFn from "./fetchFn";
export const visitUrl = "http://localhost:3000";

// export const visitUrl = "www.antbim.cn";
const baseURI = visitUrl + "/antvip/ant-cgi";
import Dingtalk from "../utils/dingtalk";
import Storage from "../utils/storage";
import Router from "next/router";

let flag = true;
const version = "2.1.0";

export default class HttpClient extends React.Component {
  static getVersion() {
    return version;
  }

  static AjaxGet(url, cb) {
    let opt = {
      type: "get",
      url: baseURI + url
    };
    FetchFn.fetchFn(opt, cb, err => {
      cb();
    });
  }
  static AjaxPostSync(url, data, cb, funErr) {
    if (flag) {
      flag = false;
      setTimeout(function() {
        flag = true;
      }, 500);
      let opt = {
        type: "post",
        url: baseURI + url,
        data: data
      };

      FetchFn.fetchFn(opt, cb, err => {
        if (err == "404") {
          const corpId = Storage.getSession("corpId");
          this.httpPostError(corpId).then(
            () => {
              FetchFn.fetchFn(opt, cb, err => {
                //Router.push('/mo_login');
                console.log(err);
              });
            },
            err => {
              //再次请求失败后 从新登陆
              //Router.push('/mo_login');
              console.log(err);
            }
          );
        }
      });
    }
  }
  static AjaxPost(url, data, cb, funErr) {
    let opt = {
      type: "post",
      url: baseURI + url,
      data: data
    };
    FetchFn.fetchFn(opt, cb, err => {
      if (err == "404") {
        const corpId = Storage.getSession("corpId");
        this.httpPostError(corpId).then(
          () => {
            FetchFn.fetchFn(opt, cb, err => {
              //Router.push('/mo_login');
              console.log(err);
            });
          },
          () => {
            //再次请求失败后 从新登陆
            //Router.push('/mo_login');
            console.log(err);
          }
        );
      }
    });
  }
  //登陆失败再次登陆
  static httpPostError(corpId) {
    const p = new Promise(function(resolve, reject) {
      //做一些异步操作
      Dingtalk.getLoginCode(
        corpId,
        code => {
          let opt = {
            type: "post",
            url:
              baseURI +
              "/user/dingtalkMobileCodeLogin?code=" +
              code +
              "&corpid=" +
              corpId,
            data: ""
          };
          FetchFn.fetchFn(
            opt,
            data => {
              Storage.login(data.data);
              resolve();
            },
            err => {
              console.log(err, "---------------getLoginCode-error------");
              reject(err);
              //Router.push('/mo_login')
            }
          );
        },
        err => {
          console.log(err, "---------------getAgainLogin-error------");
          reject(err);
          //Router.push('/mo_login');
        }
      );
    });
    return p;
  }
}
