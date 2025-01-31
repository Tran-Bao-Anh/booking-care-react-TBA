import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorExtraInfo.scss";
import { LANGUAGES } from "../../../utils";
import { getExtraInfoDoctorById } from "../../../services/userService";
import { FormattedMessage } from "react-intl";
import NumberFormat from "react-number-format";
import { lang } from "moment";

class DoctorExtraInfo extends Component {
  //hàm tạo constructor
  constructor(Props) {
    super(Props);
    this.state = {
      isShowDetailInfo: false,
      extraInfo: {},
    };
  }

  async componentDidMount() {
    // Chạy ngay sau khi component được render
  }
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }

    if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
      let res = await getExtraInfoDoctorById(this.props.doctorIdFromParent);
      if (res && res.errCode === 0) {
        this.setState({
          extraInfo: res.data,
        });
      }
    }
  }

  showHideDetailInfo = (status) => {
    this.setState({
      isShowDetailInfo: status,
    });
  };
  /* Life cycle
    Run component:
    1.Run construct -> init state
    2. Did mount (set state): born: sinh ra // unmount: dead: chết
    Hàm did mount gọi API lấy giá trị vào và setState cho component, state lưu data, dùng state trong render() để hiển thị data
    3. Render muốn re-render thì dùng hàm setState
    Mỗi lần setState() thì re-render  */
  render() {
    let { isShowDetailInfo, extraInfo } = this.state;
    let { language } = this.props;
    console.log("check state from DoctorExtraInfo: ", this.state);

    return (
      <>
        <div className="doctor-extra-info-container">
          <div className="content-up">
            <div className="text-address">
              <FormattedMessage id="patient.extra-info-doctor.text-address" />
            </div>
            <div className="name-clinic">
              {extraInfo && extraInfo.nameClinic ? extraInfo.nameClinic : ""}
            </div>
            <div className="detail-address">
              {extraInfo && extraInfo.addressClinic
                ? extraInfo.addressClinic
                : ""}
            </div>
          </div>
          <div className="content-down">
            {isShowDetailInfo === false && (
              <div className="short-info">
                <FormattedMessage id="patient.extra-info-doctor.price" />
                {extraInfo &&
                  extraInfo.priceTypeData &&
                  language === LANGUAGES.VI && (
                    <NumberFormat
                      className="currency"
                      value={extraInfo.priceTypeData.valueVi}
                      displayType={"text"}
                      thousandSeparator={true}
                      suffix={"VND"}
                    />
                  )}
                {extraInfo &&
                  extraInfo.priceTypeData &&
                  language === LANGUAGES.EN && (
                    <NumberFormat
                      className="currency"
                      value={extraInfo.priceTypeData.valueEn}
                      displayType={"text"}
                      thousandSeparator={true}
                      suffix={"$"}
                    />
                  )}
                <span
                  className="detail"
                  onClick={() => this.showHideDetailInfo(true)}
                >
                  <FormattedMessage id="patient.extra-info-doctor.detail" />
                </span>
              </div>
            )}
            {isShowDetailInfo === true && (
              <>
                <div className="title-price">
                  <FormattedMessage id="patient.extra-info-doctor.price" />
                </div>
                <div className="detail-info">
                  <div className="price">
                    <span className="left">
                      <FormattedMessage id="patient.extra-info-doctor.price" />
                    </span>
                    <span className="right">
                      {extraInfo &&
                        extraInfo.priceTypeData &&
                        language === LANGUAGES.VI && (
                          <NumberFormat
                            className="currency"
                            value={extraInfo.priceTypeData.valueVi}
                            displayType={"text"}
                            thousandSeparator={true}
                            suffix={"VND"}
                          />
                        )}
                      {extraInfo &&
                        extraInfo.priceTypeData &&
                        language === LANGUAGES.EN && (
                          <NumberFormat
                            className="currency"
                            value={extraInfo.priceTypeData.valueEn}
                            displayType={"text"}
                            thousandSeparator={true}
                            suffix={"$"}
                          />
                        )}
                    </span>
                  </div>
                  <div className="note">
                    {extraInfo && extraInfo.note ? extraInfo.note : ""}
                  </div>
                </div>
                <div className="payment">
                  <FormattedMessage id="patient.extra-info-doctor.payment" />
                  {extraInfo &&
                  extraInfo.paymentTypeData &&
                  language === LANGUAGES.VI
                    ? extraInfo.paymentTypeData.valueVi
                    : ""}
                  {extraInfo &&
                  extraInfo.paymentTypeData &&
                  language === LANGUAGES.EN
                    ? extraInfo.paymentTypeData.valueEn
                    : ""}
                </div>
                <div className="hide-price">
                  <span onClick={() => this.showHideDetailInfo(false)}>
                    <FormattedMessage id='patient.extra-info-doctor.hide-price'/>
                  </span>
                </div>
              </>
            )}
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);
