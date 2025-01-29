import React, { Component } from "react";
import { connect } from "react-redux";
import HeaderHome from "../../HomePage/HeaderHome";
import "./DetailDoctor.scss";
import { getDetailInfoDoctor } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import { get } from "lodash";
import DoctorSchedule from "./DoctorSchedule";
import DoctorExtraInfo from "./DoctorExtraInfo";

class DetailDoctor extends Component {
  //hàm tạo constructor
  constructor(Props) {
    super(Props);
    this.state = {
      detailDoctor: {},
      CurrentDoctorId: -1,
    };
  }

  async componentDidMount() {
    // Chạy ngay sau khi component được render
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      this.setState({
        CurrentDoctorId: id,
      });
      let res = await getDetailInfoDoctor(id);
      if (res && res.errCode === 0) {
        this.setState({
          detailDoctor: res.data,
        });
      }
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {}
  /* Life cycle
  Run component:
  1.Run construct -> init state
  2. Did mount (set state): born: sinh ra // unmount: dead: chết
  Hàm did mount gọi API lấy giá trị vào và setState cho component, state lưu data, dùng state trong render() để hiển thị data
  3. Render muốn re-render thì dùng hàm setState
  Mỗi lần setState() thì re-render  */
  render() {
    let { language } = this.props;
    let { detailDoctor } = this.state;
    console.log("check detailDoctor from DetailDoctor.js: ", detailDoctor);

    let nameVi = "",
      nameEn = "";
    if (detailDoctor && detailDoctor.positionData) {
      nameVi = `${detailDoctor.positionData.valueVi}, ${detailDoctor.lastName} ${detailDoctor.firstName}`;
      nameEn = `${detailDoctor.positionData.valueEn}, ${detailDoctor.firstName} ${detailDoctor.lastName}`;
    }
    return (
      <>
        <HeaderHome isShowBanner={false} />
        <div className="doctor-detail-container">
          <div className="intro-doctor">
            <div
              className="content-left"
              style={{
                backgroundImage: `url(${
                  detailDoctor && detailDoctor.image ? detailDoctor.image : ""
                })`,
              }}
            ></div>
            <div className="content-right">
              <div className="up">
                {language === LANGUAGES.VI ? nameVi : nameEn}
              </div>
              <div className="down">
                {detailDoctor &&
                  detailDoctor.Markdown &&
                  detailDoctor.Markdown.description && (
                    <span>{detailDoctor.Markdown.description}</span>
                  )}
              </div>
            </div>
          </div>
          <div className="schedule-doctor">
            <div className="content-left">
              <DoctorSchedule doctorIdFromParent={this.state.CurrentDoctorId} />
            </div>
            <div className="content-right">
              <DoctorExtraInfo
                doctorIdFromParent={this.state.CurrentDoctorId}
              />
            </div>
          </div>
          <div className="detail-info-doctor">
            {detailDoctor &&
              detailDoctor.Markdown &&
              detailDoctor.Markdown.contentHTML && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: detailDoctor.Markdown.contentHTML,
                  }}
                ></div>
              )}
          </div>
          <div className="comment-doctor"></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
