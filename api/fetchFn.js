import "isomorphic-fetch";
import React from "react";

export default class FetchFn extends React.Component {
  static fetchFn(opt, cb, error) {
    let type = opt.type;
    let option = { method: "get", credentials: "include" };
    option.headers = new Headers({
      Accept: "application/json,text/plain, */*",
      "Content-Type": "application/json; charset=utf-8",
      Connection: "close",
      type: "getUserData"
    });
    if (type == "post") {
      option.method = "post";
      option.body = JSON.stringify(opt.data);
    }
    if (type == "file") {
      option.method = "post";
      option.body = opt.data;
    }
    fetch(opt.url, option)
      .then(function(response) {
        if (response.status >= 200 && response.status < 300) {
          let data = response.json();
          return data;
        }
        if (error) {
          error(response.statusText);
        } else {
          console.log(response.statusText);
        }
      })
      .then(function(json) {
        if (cb) cb(json);
      })
      .catch(function(ex) {
        if (ex.description == "无效字符") {
          if (error) error();
        }
        if (opt.type == "get") {
          if (error) error();
        }
        if (error) {
          if (error) error(ex);
        }
        if (type == "post") {
          if (error) error("404");
        }
        console.log("通信失败", ex);
      });
  }
}
