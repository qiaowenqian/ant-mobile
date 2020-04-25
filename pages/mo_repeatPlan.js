import { Component } from "react";
import { Toast, Button, Radio, Stepper, DatePicker, Icon } from "antd-mobile";
import { bindActionCreators } from "redux";
import withRedux from "next-redux-wrapper";
import { initStore } from "../store";
import Router from "next/router";
import Dingtalk from "../utils/dingtalk";
import stylesheet from "styles/pages/repeatPlan.scss";
import mobileStyle from "antd-mobile/dist/antd-mobile.min.css";
import Loading from "../components/Loading";
import * as taskAction from "../actions/task";
import moment from "moment";
import * as userAction from "../actions/user";
import Storage from "../utils/storage";
import utils from "../utils/utils";
/**
 *
 */
class RePeatPlan extends Component {
  static getInitialProps({ req, store, isServer }) {
    const language = req ? req.headers["accept-language"] : navigator.language;
    return {
      language
    };
  }
  constructor(props) {
    super(props);
    this.state = {
      isSure: false,
      repeat: -1,
      typeList: [
        {
          type: "1",
          name: "按天"
        },
        {
          type: "2",
          name: "按周"
        },
        {
          type: "3",
          name: "按月"
        }
      ],
      selectedProName: "",
      selectedProId: "",
      nextExecutionTimeString: null,
      orangalExecutionTimeString: null,
      disabled: 0,
      planLoading: 1,
      repeatType: "", //重复类型  1天 2周 3月份,
      dayCount: 1, //每？天，
      weekCount: 1, //每？周,
      weekList: [
        { checked: 1, week: "周一", weeknum: 1 },
        { checked: 1, week: "周二", weeknum: 2 },
        { checked: 1, week: "周三", weeknum: 3 },
        { checked: 1, week: "周四", weeknum: 4 },
        { checked: 1, week: "周五", weeknum: 5 },
        { checked: 0, week: "周六", weeknum: 6 },
        { checked: 0, week: "周日", weeknum: 7 }
      ],
      monthDays: 1,
      weekRepeat: 1,
      firstSkip: 0, //是否跳过第一次
      skipWeekend: 0, //默认不跳过周末
      monthCount: 1 //每？月
    };
  }
  transfromWeek() {
    const { weekList } = this.state;
    let arr = [];
    weekList
      .filter(item => item.checked)
      .map(item2 => {
        arr.push(item2.week);
      });
    return arr.join("、");
  }
  componentWillMount() {
    this.setState({
      nextExecutionTimeString: moment(),
      orangalExecutionTimeString: moment()
    });
  }
  componentDidMount() {
    this.setState(
      {
        repeatType: Router.router.query.repeatType,
        selectedProId: Router.router.query.selectedProId,
        selectedProName: Router.router.query.selectedProName,
        planLoading: 0
      },
      () => {
        if (this.props.taskCreateVals && this.props.taskCreateVals.repeatObj) {
          this.initData();
        }
        // else {
        //   this.updatanextExecutionTimeString();
        // }
      }
    );

    // if (this.props && this.props.taskCreateVals) {
    //   this.setState({
    //     taskInfo: {
    //       id: this.props.taskCreateVals.id,
    //       taskname: this.props.taskCreateVals.taskname,
    //       description: this.props.taskCreateVals.description,
    //       userResponse: this.props.taskCreateVals.userResponse,
    //       planEndTimeString: this.props.taskCreateVals.planEndTimeString,
    //       userFlow: this.props.taskCreateVals.userFlow,
    //       flowConten: this.props.taskCreateVals.flowConten,
    //       coefficienttype: this.props.taskCreateVals.coefficienttype,
    //       workTime: this.props.taskCreateVals.workTime,
    //       labels: this.props.taskCreateVals.labels,
    //       mobileFile: this.props.taskCreateVals.mobileFile,
    //       category: this.props.taskCreateVals.category
    //     }
    //   });
    // }
    let nowUser = Storage.getSession("user");
    utils.butAnimate();
    if (nowUser && nowUser.userid) {
      if (!this.props.urlData) {
        this.props.setUrlData(encodeURIComponent(location.href.split("#")[0]));
      }
    }
    Dingtalk.authDingJsApi("", this.props.urlData);
    Dingtalk.setTitle("创建计划");
  }
  initData() {
    const { repeatType } = this.state;
    this.setState(
      {
        isSure: false,
        typeList: [
          {
            type: "1",
            name: "按天"
          },
          {
            type: "2",
            name: "按周"
          },
          {
            type: "3",
            name: "按月"
          }
        ],
        nextExecutionTimeString: moment(),
        orangalExecutionTimeString: moment(),
        disabled: 0,
        dayCount: 1, //每？天，
        weekCount: 2, //每？周,
        weekList: [
          { checked: 1, week: "周一", weeknum: 1 },
          { checked: 1, week: "周二", weeknum: 2 },
          { checked: 1, week: "周三", weeknum: 3 },
          { checked: 1, week: "周四", weeknum: 4 },
          { checked: 1, week: "周五", weeknum: 5 },
          { checked: 0, week: "周六", weeknum: 6 },
          { checked: 0, week: "周日", weeknum: 7 }
        ],
        monthDays: 1,
        firstSkip: 0, //是否跳过第一次
        skipWeekend: 0, //默认不跳过周末
        monthCount: 1 //每？月
      },
      () => {
        const { weekList } = this.state;
        if (repeatType == "1") {
          this.setState({
            orangalExecutionTimeString: this.props.taskCreateVals.repeatObj
              .nextExecutionTimeString,
            dayCount: this.props.taskCreateVals.repeatObj.day,
            repeat: this.props.taskCreateVals.repeatObj.repeat, //-1表示无限循环
            skipWeekend: this.props.taskCreateVals.repeatObj.isWeekend, //	是否跳过周六周日  0不跳过 1跳过
            nextExecutionTimeString: this.props.taskCreateVals.repeatObj
              .nextExecutionTimeString //	下次执行时间
          });
        } else if (repeatType == "2") {
          weekList &&
            weekList.map(item => {
              item.checked = 0;
            });
          this.props.taskCreateVals.repeatObj.weekDay &&
            this.props.taskCreateVals.repeatObj.weekDay.map(item2 => {
              weekList[item2 - 1].checked = 1;
            });
          this.setState({
            orangalExecutionTimeString: this.props.taskCreateVals.repeatObj
              .nextExecutionTimeString,
            repeat: this.props.taskCreateVals.repeatObj.repeat,
            weekCount: this.props.taskCreateVals.repeatObj.week,
            weekDay: this.props.taskCreateVals.repeatObj.weekDay,
            weekRepeat: this.props.taskCreateVals.repeatObj.weekRepeat,
            nextExecutionTimeString: this.props.taskCreateVals.repeatObj
              .nextExecutionTimeString //	下次执行时间
          });
        } else if (repeatType == "3") {
          this.setState({
            orangalExecutionTimeString: this.props.taskCreateVals.repeatObj
              .nextExecutionTimeString,
            repeat: this.props.taskCreateVals.repeatObj.repeat,
            monthDays: this.props.taskCreateVals.repeatObj.monthDay,
            monthCount: this.props.taskCreateVals.repeatObj.month,
            skipWeekend: this.props.taskCreateVals.repeatObj.isWeekend,
            nextExecutionTimeString: this.props.taskCreateVals.repeatObj
              .nextExecutionTimeString //	下次执行时间
          });
        }
      }
    );
  }
  updatanextExecutionTimeString() {
    const { repeatType } = this.state;
    if (repeatType == "1") {
      this.setState({
        nextExecutionTimeString: this.computedDay()
      });
    } else if (repeatType == "2") {
      this.setState({
        nextExecutionTimeString: this.computedWeekDay()
      });
    } else if (repeatType == "3") {
      this.setState({
        nextExecutionTimeString: this.computedMonth()
      });
    }
  }
  getNumOfWeek() {
    const { skipWeekend, orangalExecutionTimeString } = this.state;
    let newTime = new Date(orangalExecutionTimeString);
    if (skipWeekend) {
      if (moment(newTime).weekday() == "6") {
        return 2;
      } else if (moment(newTime).weekday() == "0") {
        return 1;
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  }
  computedDay() {
    const { dayCount, orangalExecutionTimeString } = this.state;
    if (this.getNumOfWeek() == "1") {
      console.log(
        "跳过周日",
        moment(orangalExecutionTimeString).format("YYYY年MM月DD日")
      );
      // this.setState({
      //   nextExecutionTimeString: 1
      // });
      return moment(orangalExecutionTimeString).add(1, "day");
    } else if (this.getNumOfWeek() == "2") {
      console.log(
        "跳过周六",
        moment(orangalExecutionTimeString)
          .add(2, "day")
          .format("YYYY年MM月DD日")
      );
      return moment(orangalExecutionTimeString).add(2, "day");
    } else {
      console.log(
        "不在周六周日",
        moment(orangalExecutionTimeString).format("YYYY年MM月DD日")
      );
      return moment(orangalExecutionTimeString);
    }
  }
  computedWeekDay() {
    const { weekList, orangalExecutionTimeString } = this.state;

    let nowWeekday =
      moment(orangalExecutionTimeString).weekday() == "0"
        ? 7
        : moment(orangalExecutionTimeString).weekday();
    console.log(
      orangalExecutionTimeString.format("YYYY年MM月DD日"),
      nowWeekday
    );
    let arr = weekList.filter(itemweek => itemweek.checked);

    // if (arr.includes(nowWeekday)) {
    //   return moment(nextExecutionTimeString);
    // }else{

    // }

    let initnum = 0;
    // 默认不在规则之内
    let falg = true; //
    let falg2 = true; //等于
    // //判断是否都比当前星期数小1 3

    //判断当前日期是否再规则之内
    try {
      arr.forEach((item, index) => {
        if (nowWeekday < item.weeknum) {
          initnum = item.weeknum - nowWeekday;
          this.setState({
            weekRepeat: index + 1
          });
          falg = false;
          throw new Error(JSON.stringify({ initnum, falg }));
        }
        if (nowWeekday == item.weeknum) {
          this.setState({
            weekRepeat: index + 1
          });
          falg = false;
          throw new Error(JSON.stringify({ initnum, falg }));
        }
      });
    } catch (error) {
      console.log("initnum1" + error);
    }
    // //如果都比当前星期数小，那么下次生效间隔就是7减当前星期数
    if (falg) {
      initnum = 7 + (arr[0].weeknum - nowWeekday);
      this.setState({
        weekRepeat: 1
      });
    }
    return moment(orangalExecutionTimeString).add(initnum, "day");
    // if (falg2) {
    //   console.log(
    //     "周生效日期",
    //     initnum,
    //     moment(nextExecutionTimeString).add(initnum, "day")
    //   );
    //   return moment(nextExecutionTimeString).add(initnum, "day");
    // } else {
    //   console.log("周生效日期和今天相同。所以采用今天", moment());
    //   return moment(nextExecutionTimeString);
    // }
  }
  checkMonthDay(newDate) {
    console.log(newDate);
    const { monthDays } = this.state;
    let month = newDate.month();
    let lastDayMonth = newDate.endOf("month").date();
    if (lastDayMonth >= monthDays) {
      return newDate.date(monthDays);
      // return newDate.date(monthDays);
    } else {
      newDate = newDate.month(month + 1);
      this.checkMonthDay(newDate, monthDays);
    }
  }
  computedMonth() {
    const { monthDays, orangalExecutionTimeString } = this.state;
    let currentDate = moment(orangalExecutionTimeString).date();
    let currentMonth = moment(orangalExecutionTimeString).month();

    //是否设置最后一天
    // yes
    //   当前日期是不是本月最后一天
    //     是
    //         是不是跳过第一次
    //             是 下下月最后一天
    //             否 下月最后一天
    //     不是
    //         是不是跳过第一次
    //             是  下月最后一天
    //             否 本月最后一天
    // no
    //       是不是跳过第一次
    //         是 下下月最后一天
    //         否 下月最后一天
    console.log(orangalExecutionTimeString);
    let newDate = "";
    if (monthDays == 31) {
      newDate = moment(orangalExecutionTimeString)
        .month(currentMonth)
        .endOf("month");
    } else {
      if (currentDate > monthDays) {
        newDate = this.checkMonthDay(
          moment(orangalExecutionTimeString).month(currentMonth + 1)
        );
      } else if (currentDate == monthDays) {
        newDate = moment(orangalExecutionTimeString);
      } else {
        newDate = this.checkMonthDay(
          moment(orangalExecutionTimeString).month(currentMonth)
        );
      }
    }
    if (this.getNumOfWeek(moment(newDate), "day") == "1") {
      newDate = newDate.add(1, "day");
    } else if (this.getNumOfWeek(moment(newDate), "day") == "2") {
      newDate = newDate.add(2, "day");
    }
    return newDate;
  }
  //更改状态并重置相关状态
  changeRadio = type => {
    // console.log(this.state.nextExecutionTimeString.format("YYYY年MM月DD日"));

    if (type == "1") {
      this.setState({
        monthCount: 1,
        weekCount: 1,
        weekList: [
          { checked: 1, week: "周一", weeknum: 1 },
          { checked: 1, week: "周二", weeknum: 2 },
          { checked: 1, week: "周三", weeknum: 3 },
          { checked: 1, week: "周四", weeknum: 4 },
          { checked: 1, week: "周五", weeknum: 5 },
          { checked: 0, week: "周六", weeknum: 6 },
          { checked: 0, week: "周日", weeknum: 7 }
        ],
        weekRepeat: 1
      });
    } else if (type == "2") {
      this.setState({
        dayCount: 1,
        monthCount: 1,
        weekRepeat: 0
      });
    } else if (type == "3") {
      this.setState({
        dayCount: 1,
        weekCount: 1,
        weekList: [
          { checked: 1, week: "周一", weeknum: 1 },
          { checked: 1, week: "周二", weeknum: 2 },
          { checked: 1, week: "周三", weeknum: 3 },
          { checked: 1, week: "周四", weeknum: 4 },
          { checked: 1, week: "周五", weeknum: 5 },
          { checked: 0, week: "周六", weeknum: 6 },
          { checked: 0, week: "周日", weeknum: 7 }
        ],
        weekRepeat: 1
      });
    }
    this.setState(
      {
        repeatType: type
      },
      () => {
        this.updatanextExecutionTimeString();
      }
    );
  };
  //更改天的计划规则
  onChangeDay = val => {
    this.setState(
      {
        dayCount: val ? Math.floor(val) : 1
      },
      () => {
        this.updatanextExecutionTimeString();
      }
    );
  };
  //更改周的计划

  onChangeWeek = val => {
    this.setState(
      {
        weekCount: val ? Math.floor(val) : 1
      },
      () => {
        this.updatanextExecutionTimeString();
      }
    );
  };
  //更改月份
  onChangeCount = val => {
    this.setState(
      {
        monthCount: val ? Math.floor(val) : 1
      },
      () => {
        this.updatanextExecutionTimeString();
      }
    );
  };
  changeState = () => {
    const { repeatType, selectedProName, selectedProId } = this.state;
    this.saveData(1);
    Router.replace(
      Dingtalk.setDdNavColor(
        "/mo_taskCreate?newTask=false&isrepeat=1&repeatType=" +
        repeatType +
        "&selectedProId=" +
        selectedProId +
        "&selectedProName=" +
        selectedProName
      )
    );
  };
  saveData(flag) {
    const {
      dayCount,
      weekCount,
      weekList,
      monthCount,
      monthDays,
      skipWeekend,
      nextExecutionTimeString,
      repeatType,
      weekRepeat
    } = this.state;
    let arr = [];
    weekList
      .filter(item => item.checked)
      .map(item2 => {
        arr.push(item2.weeknum);
      });

    let obj = {};
    if (repeatType == "1") {
      obj = {
        repeat: -1, //-1表示无限循环
        day: dayCount, //	天数 1表示每天循环，大于1表示没几天执行一次
        isWeekend: skipWeekend ? 1 : 0, //	是否跳过周六周日  0不跳过 1跳过
        nextExecutionTimeString: nextExecutionTimeString //	下次执行时间
      };
    } else if (repeatType == "2") {
      obj = {
        repeat: -1, //-1表示无限循环
        week: weekCount, //	1表示每周执行 大于1表示没几周执行一次
        weekDay: arr, //	这周周一 周二 周三执行  1, 2, 3
        repeatType: repeatType,
        weekRepeat: weekRepeat,
        isWeekend:  0,
        nextExecutionTimeString: nextExecutionTimeString //	下次执行时间
      };
    } else if (repeatType == "3") {
      obj = {
        repeat: -1, //-1表示无限循环
        month: monthCount, //	月份  1表示每月执行，大于1表示每个几月执行
        monthDay: monthDays, //	本月 1号2号3号执行  1, 2, 3
        isWeekend: skipWeekend ? 1 : 0, //	是否跳过周六周日  0不跳过 1跳过
        repeatType: repeatType,
        nextExecutionTimeString: nextExecutionTimeString //	下次执行时间
      };
    }
    let taskInfo = {
      // id: this.props.taskCreateVals.id,
      taskname: this.props.taskCreateVals.taskname,
      description: this.props.taskCreateVals.description,
      userResponse: this.props.taskCreateVals.userResponse,
      planEndTimeString: this.props.taskCreateVals.planEndTimeString,
      userFlow: this.props.taskCreateVals.userFlow,
      flowConten: this.props.taskCreateVals.flowConten,
      coefficienttype: this.props.taskCreateVals.coefficienttype,
      workTime: this.props.taskCreateVals.workTime,
      labels: this.props.taskCreateVals.labels,
      mobileFile: this.props.taskCreateVals.mobileFile,
      category: this.props.taskCreateVals.category
    };
    if (flag) {
      taskInfo.repeatObj = obj;
    } else {
      taskInfo.repeatObj = this.props.taskCreateVals.repeatObj;
    }

    this.props.setCreateTaskVals(taskInfo);
  }
  cancleChange = () => {
    const { repeatType, selectedProName, selectedProId } = this.state;
    this.saveData(0);
    Router.replace(
      Dingtalk.setDdNavColor(
        "/mo_taskCreate?newTask=false&isrepeat=1&repeatType=" +
        Router.router.query.repeatType +
        "&selectedProId=" +
        selectedProId +
        "&selectedProName=" +
        selectedProName
      )
    );
  };
  changeSkipWeek = () => {
    const { skipWeekend, repeatType } = this.state;
    if (repeatType&&repeatType!='2') {
      this.setState(
        {
          skipWeekend: !skipWeekend
        },
        () => {
          this.updatanextExecutionTimeString();
        }
      );
    }
  };
  selectWeek(itemobj, i) {
    const { weekList } = this.state;
    if (weekList.filter(item => item.checked).length > 1) {
      weekList[i].checked = !weekList[i].checked;
    } else {
      if (itemobj.checked) {
        Toast.info("请选择至少一天");
      } else {
        weekList[i].checked = !weekList[i].checked;
      }
    }
    this.setState({ weekList }, () => {
      this.updatanextExecutionTimeString();
    });
  }
  onChangeMonthDays = val => {
    // var reg = /(^[\-0-9][0-9]*(.[0-9]+)?)$/;
    // var pattern = new RegExp(reg);
    // if (pattern.test(val)) {
    
    this.setState(
      {
        monthDays: val?val>31 ?31:val<1?1: Math.floor(val) : 1
      },
      () => {
        console.log(val ? Math.floor(val) : 1)
        this.updatanextExecutionTimeString();
      }
    );
    // } else {
    //   this.setState({
    //     monthDays: monthDays
    //   });
    // }
  };
  render() {
    const {
      planLoading,
      repeatType,
      typeList,
      dayCount,
      firstSkip,
      skipWeekend,
      weekCount,
      weekList,
    
      monthCount,
      monthDays,
      disabled,
      nextExecutionTimeString
    } = this.state;
    return (
      <div className="repeatPlanPage">
        <Loading show={planLoading} />
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
        <div className="repeatPlanPage-content">
          {/* 选择天月周 START*/}
          <div className="selectList">
            {typeList &&
              typeList.map((item, index) => {
                return (
                  <Radio
                    className="list-radio"
                    onChange={() => this.changeRadio(item.type)}
                    checked={item.type == repeatType}
                    key={`planselect` + index}
                  >
                    {item.name}
                  </Radio>
                );
              })}
          </div>
          {/* 选择天月周END  */}
          {/* 选择天 START*/}
          {repeatType == "1" ? (
            <div className="selectCount">
              <span className="font">每</span>
              <Stepper
                style={{ width: "92px", border: "1px solid #ddd", padding: 0 }}
                showNumber
                max={31}
                min={1}

                value={dayCount}
                onChange={this.onChangeDay}
              />

              <span className="font">天</span>
            </div>
          ) : (
              ""
            )}
          {/* 选择天END */}
          {/* 选择周 START*/}
          {repeatType == "2" ? (
            <div className="selectCount">
              <div className="weekCount">
                <span className="font">每</span>
                <Stepper
                  style={{
                    width: "92px",
                    border: "1px solid #ddd",
                    padding: 0
                  }}
                  showNumber
                  max={4}
                  min={1}
                  value={weekCount}
                  onChange={this.onChangeWeek}
                />
                <span className="font">周</span>
              </div>
              <ul className="Num">
                {weekList.map((item, i) => {
                  return (
                    <li
                      key={i}
                      className={item.checked ? "selected" : ""}
                      onClick={() => {
                        this.selectWeek(item, i);
                      }}
                    >
                      {item.week.substr(1, 1)}
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : (
              ""
            )}
          {/* 选择周 END */}
          {/* 选择月Start */}
          {repeatType == "3" ? (
            <div className="selectCount">
              <span className="font">每</span>
              <Stepper
                style={{ width: "92px", border: "1px solid #ddd", padding: 0 }}
                showNumber
                max={12}
                min={1}
                value={monthCount}
                onChange={this.onChangeCount}
              />
              <span className="font" style={{ marginRight: "20px" }}>
                月
              </span>

              <span className="clearfix" />
              <div className="monthSelectCount">
                <Stepper
                  style={{
                    width: "140px",
                    border: "1px solid #ddd",
                    padding: 0
                  }}
                  showNumber
                  max={31}
                  min={1}
                  value={monthDays}
                  // value={monthDays > 30 ? monthDays + "日" : "最后一日"}
                  onChange={this.onChangeMonthDays}
                />
                {monthDays <= 30 ? (
                  <span className="monthDayfont">日</span>
                ) : (
                    ""
                  )}
                {monthDays > 30 ? (
                  <div
                    style={{
                      position: "absolute",
                      lineHeight: "30px",
                      height: "28px",
                      left: "48px",
                      top: "1px",
                      width: "56px",
                      zIndex: "10",
                      background: "#fff",
                      textAlign: "center"
                    }}
                  >
                    最后一天
                  </div>
                ) : (
                    ""
                  )}
              </div>
            </div>
          ) : (
              ""
            )}
          {/* 选择月End */}
          <div className="skipSection">
            <div
              className={
                repeatType !== "2" ? "skiplabel" : "skiplabel disabled"
              }
              onClick={this.changeSkipWeek}
            >
              {skipWeekend && repeatType !== "2" ? (
                <span className="skipIcon" />
              ) : (
                  ""
                )}
            </div>
            <span
              className={repeatType !== "2" ? "skipfont" : "skipfont disabled"}
              onClick={this.changeSkipWeek}
            >
              跳过周六周日
            </span>
          </div>
          <div className="selectDate">
            <div>第一次执行时间</div>
            {nextExecutionTimeString && (
              <DatePicker
                mode="date"
                title="选择时间"
                minDate={new Date()}
                value={new Date(nextExecutionTimeString)}
                onChange={date => {
                  this.setState(
                    {
                      orangalExecutionTimeString: moment(date)
                    },
                    () => {
                      this.updatanextExecutionTimeString();
                    }
                  );
                }}
              >
                <div className="dateMore">
                  {nextExecutionTimeString.format("YYYY年MM月DD日")}
                  <Icon type="right" />
                </div>
              </DatePicker>
            )}
          </div>
          {repeatType == 1 ? (
            <div className="warningInfo">
              *该任务将于每{dayCount}天自动创建。{skipWeekend?"如遇周六、周日则自动顺延至下周一。":""}如需修改规则，可在电脑端可在设置-自动化规则中修改
            </div>
          ) : (
              ""
            )}
          {repeatType == 2 ? (
            <div className="warningInfo">
              *该任务将于每{weekCount}周的{this.transfromWeek()}自动创建。如需修改规则，可在电脑端设置-自动化规则中修改
            </div>
          ) : (
              ""
            )}
          {repeatType == 3 ? (
            <div className="warningInfo">
              *该任务将于每{monthCount}月的{monthDays}日自动创建。{skipWeekend?"如遇周六、周日则自动顺延至下周一。":""}如需修改规则，可在电脑端设置-自动化规则中修改
            </div>
          ) : (
              ""
            )}
        </div>

        <div className="repeatPlanPage-foot">
          <Button
            className="repeatPlanPage-foot-button repeatPlanPage-foot-buttonLeft forbiddenCopy"
            onClick={this.cancleChange}
          >
            清除
          </Button>
          <Button
            type="primary"
            className="repeatPlanPage-foot-button repeatPlanPage-foot-buttonRight forbiddenCopy"
            onClick={this.changeState}
            disabled={disabled}
          >
            保存
          </Button>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    taskCreateVals: state.task.taskCreateVals,
    urlData: state.user.urlData
  };
}
const mapDispatchToProps = dispatch => {
  return {
    setCreateTaskVals: bindActionCreators(
      taskAction.setCreateTaskVals,
      dispatch
    ),
    setUrlData: bindActionCreators(userAction.setUrlData, dispatch)
  };
};
export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(
  RePeatPlan
);
