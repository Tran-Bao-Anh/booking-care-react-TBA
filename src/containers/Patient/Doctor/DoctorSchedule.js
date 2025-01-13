import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorSchedule.scss";
import moment, { lang } from "moment";
import { getScheduleDoctorByDate } from "../../../services/userService";
import localization from "moment/locale/vi"; //để moment hiểu tiếng việt đầu tiên
import { LANGUAGES } from "../../../utils";

class DoctorSchedule extends Component {
  //hàm tạo constructor
  constructor(Props) {
    super(Props);
    this.state = {
      allDays: [],
      allAvailableTime: [],
    };
  }

  async componentDidMount() {
    // Chạy ngay sau khi component được render
    let { language } = this.props;
    console.log("moment vie: ", moment(new Date()).format("dddd - DD/MM"));
    console.log(
      "moment en: ",
      moment(new Date()).locale("en").format("ddd - DD/MM")
    );
    this.setArrDays(language);
  }

  //viết in hoa ký tự đầu tiên
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  setArrDays = (language) => {
    let allDays = [];
    for (let i = 0; i < 7; i++) {
      let object = {};
      if (language === LANGUAGES.VI) {
        //xuất ra ngày bắt đầu từ hôm nay. vd: hôm nay là thứ 4, thì sẽ hiện ra từ thứ 4, thứ 5, ..., thứ 3. Vì
        //new Data là ngày hôm nay. Hàm add là add thêm giá trị i của vòng lặp
        let labelVi = moment(new Date()).add(i, "days").format("dddd - DD/MM"); //nhờ localization nên moment tự hiểu tiếng việt là đầu tiên
        object.label = this.capitalizeFirstLetter(labelVi);
      } else {
        object.label = moment(new Date())
          .add(i, "days")
          .locale("en")
          .format("ddd - DD/MM");
      }
      //startOf("day") lấy đầu ngày lúc 00h00p,
      //valueOf() convert sang mili second ở dạng unix time. vd chuyển ngày 1/1/2025 thành mili giây
      object.value = moment(new Date()).add(i, "days").startOf("day").valueOf();
      allDays.push(object);
    }
    this.setState({
      allDays: allDays,
    });
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
      this.setArrDays(this.props.language);
    }
  }

  handleOnChangeSelect = async (event) => {
    if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
      let doctorId = this.props.doctorIdFromParent;
      let date = event.target.value;
      let res = await getScheduleDoctorByDate(doctorId, date);
      console.log("check res from DoctorSchedule.js: ", res);
      if (res && res.errCode === 0) {
        this.setState({
          allAvailableTime: res.data ? res.data : [],
        });
      }

      console.log("check allAvailableTime: ", this.state.allAvailableTime);
    }
  };

  /* Life cycle
  Run component:
  1.Run construct -> init state
  2. Did mount (set state): born: sinh ra // unmount: dead: chết
  Hàm did mount gọi API lấy giá trị vào và setState cho component, state lưu data, dùng state trong render() để hiển thị data
  3. Render muốn re-render thì dùng hàm setState
  Mỗi lần setState() thì re-render  */
  render() {
    let { allDays, allAvailableTime } = this.state;
    let { language } = this.props;

    return (
      <>
        <div className="doctor-schedule-container">
          <div className="all-schedule">
            <select onChange={(event) => this.handleOnChangeSelect(event)}>
              {allDays &&
                allDays.length > 0 &&
                allDays.map((item, index) => {
                  return (
                    <option value={item.value} key={index}>
                      {item.label}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="all-available-time">
            <div className="text-calendar">
              <i className="fas fa-calendar-alt">
                <span>Lịch khám</span>
              </i>
            </div>
            <div className="time-content">
              {allAvailableTime && allAvailableTime.length > 0 ? (
                allAvailableTime.map((item, index) => {
                  let timeDisplay =
                    language === LANGUAGES.VI
                      ? item.timeTypeData.valueVi
                      : item.timeTypeData.valueEn;
                  return <button key={index}>{timeDisplay}</button>;
                })
              ) : (
                <div>
                  Không có lịch hẹn trong thời gian này, vui lòng chọn thời gian
                  khác!
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
